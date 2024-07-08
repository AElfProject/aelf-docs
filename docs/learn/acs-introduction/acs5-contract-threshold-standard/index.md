---
sidebar_position: 5
title: Contract Threshold
description: ACS5
---

# ACS5 - Contract Threshold Standard
To raise the threshold for using a contract, consider implementing ACS5.

## Interface
To limit calling a method in a contract, implement these interfaces:

### Methods
| Method Name                | Request Type                          | Response Type                 | Description                       |
|----------------------------|---------------------------------------|-------------------------------|-----------------------------------|
| SetMethodCallingThreshold  | acs5.SetMethodCallingThresholdInput   | google.protobuf.Empty         | Set the threshold for method calling. |
| GetMethodCallingThreshold  | google.protobuf.StringValue           | acs5.MethodCallingThreshold   | Get the threshold for method calling. |

### Types

#### acs5.MethodCallingThreshold
| Field                 | Type                                    | Description                       | Label      |
|-----------------------|-----------------------------------------|-----------------------------------|------------|
| symbol_to_amount      | MethodCallingThreshold.SymbolToAmountEntry | The threshold for method calling, token symbol -> amount. | repeated    |
| threshold_check_type  | ThresholdCheckType                      | The type of threshold check.      |            |

#### acs5.MethodCallingThreshold.SymbolToAmountEntry
| Field | Type   | Description | Label |
|-------|--------|-------------|-------|
| key   | string |             |       |
| value | int64  |             |       |

#### acs5.SetMethodCallingThresholdInput
| Field                | Type                                        | Description | Label |
|----------------------|---------------------------------------------|-------------|-------|
| method               | string                                      | The method name to check. |       |
| symbol_to_amount     | SetMethodCallingThresholdInput.SymbolToAmountEntry | The threshold for method calling, token symbol -> amount. | repeated |
| threshold_check_type | ThresholdCheckType                          | The type of threshold check. |       |

#### acs5.SetMethodCallingThresholdInput.SymbolToAmountEntry
| Field | Type   | Description | Label |
|-------|--------|-------------|-------|
| key   | string |             |       |
| value | int64  |             |       |

#### acs5.ThresholdCheckType
| Name     | Number | Description                          |
|----------|--------|--------------------------------------|
| BALANCE  | 0      | Check balance only.                  |
| ALLOWANCE| 1      | Check balance and allowance at the same time. |

## Usage
ACS5 works similarly to ACS1, which uses a pre-plugin transaction called `ChargeTransactionFees` to charge a transaction fee. ACS5 uses a pre-plugin transaction called `CheckThreshold` to ensure the account sending the transaction can invoke the method.

### Implementation of `CheckThreshold`:

```cs
public override Empty CheckThreshold(CheckThresholdInput input)
{
    var meetThreshold = false;
    var meetBalanceSymbolList = new List<string>();
    foreach (var symbolToThreshold in input.SymbolToThreshold)
    {
        if (GetBalance(input.Sender, symbolToThreshold.Key) < symbolToThreshold.Value)
            continue;
        meetBalanceSymbolList.Add(symbolToThreshold.Key);
    }
    if (meetBalanceSymbolList.Count > 0)
    {
        if (input.IsCheckAllowance)
        {
            foreach (var symbol in meetBalanceSymbolList)
            {
                if (State.Allowances[input.Sender][Context.Sender][symbol] <
                    input.SymbolToThreshold[symbol]) continue;
                meetThreshold = true;
                break;
            }
        }
        else
        {
            meetThreshold = true;
        }
    }
    if (input.SymbolToThreshold.Count == 0)
    {
        meetThreshold = true;
    }
    Assert(meetThreshold, "Cannot meet the calling threshold.");
    return new Empty();
}
```

If the sender's token balance or the authorized amount for the target contract doesn't meet the set limit, the pre-plugin transaction throws an exception and prevents the original transaction from executing.

## Implementation
Implement a single `GetMethodCallingThreshold` method like `GetMethodFee` in ACS1. Use `MappedState<string, MethodCallingThreshold>` in the State class:
```cs
public MappedState<string, MethodCallingThreshold> MethodCallingThresholds { get; set; }
```

Configure the call permission of SetMethodCallingThreshold, requiring an Admin in the State:
```cs
public SingletonState<Address> Admin { get; set; }
```
```cs
public override Empty SetMethodCallingThreshold(SetMethodCallingThresholdInput input)
{
    Assert(State.Admin.Value == Context.Sender, "No permission.");
    State.MethodCallingThresholds[input.Method] = new MethodCallingThreshold
    {
        SymbolToAmount = {input.SymbolToAmount}
    };
    return new Empty();
}

public override MethodCallingThreshold GetMethodCallingThreshold(StringValue input)
{
    return State.MethodCallingThresholds[input.Value];
}

public override Empty Foo(Empty input)
{
    return new Empty();
}

message SetMethodCallingThresholdInput {
    string method = 1;
    map<string, int64> symbol_to_amount = 2;// The order matters.
    ThresholdCheckType threshold_check_type = 3;
}
```

## Test
Test the Foo method:

1. Make a Stub
```cs
var keyPair = SampleECKeyPairs.KeyPairs[0];
var acs5DemoContractStub =
    GetTester<ACS5DemoContractContainer.ACS5DemoContractStub>(DAppContractAddress, keyPair);
```

2. Check the current threshold (should be 0):
```cs
var methodResult = await acs5DemoContractStub.GetMethodCallingThreshold.CallAsync(
    new StringValue
    {
        Value = nameof(acs5DemoContractStub.Foo)
    });
methodResult.SymbolToAmount.Count.ShouldBe(0);
```

3. Ensure the caller's ELF balance is greater than 1 ELF:
```cs
await acs5DemoContractStub.SetMethodCallingThreshold.SendAsync(
    new SetMethodCallingThresholdInput
    {
        Method = nameof(acs5DemoContractStub.Foo),
        SymbolToAmount =
        {
            {"ELF", 1_0000_0000}
        },
        ThresholdCheckType = ThresholdCheckType.Balance
    });
```

4. Check the threshold again:
```cs
methodResult = await acs5DemoContractStub.GetMethodCallingThreshold.CallAsync(
    new StringValue
    {
        Value = nameof(acs5DemoContractStub.Foo)
    });
methodResult.SymbolToAmount.Count.ShouldBe(1);
methodResult.ThresholdCheckType.ShouldBe(ThresholdCheckType.Balance);
```

5. Send the Foo transaction with an account that has enough balance:
```cs
// Call with enough balance.
{
    var executionResult = await acs5DemoContractStub.Foo.SendAsync(new Empty());
    executionResult.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);
}
```

6. Send the Foo transaction with an account without ELF:
```cs
// Call without enough balance.
{
    var poorStub =
        GetTester<ACS5DemoContractContainer.ACS5DemoContractStub>(DAppContractAddress,
            SampleECKeyPairs.KeyPairs[1]);
    var executionResult = await poorStub.Foo.SendWithExceptionAsync(new Empty());
    executionResult.TransactionResult.Error.ShouldContain("Cannot meet the calling threshold.");
}
```
