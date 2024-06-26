# ACS8 - Transaction Resource Token Fee Standard
ACS8 is a transaction fee standard similar to ACS1, but it charges the called contract rather than the user. The fee charged includes four specified tokens: WRITE, READ, NET, and TRAFFIC.

When a contract inherits from ACS8, each transaction within this contract incurs charges in these four resource tokens.

## Interface
The acs8.proto file defines the following method:

### Methods
| Method Name       | Request Type                | Response Type     | Description                                      |
|-------------------|-----------------------------|-------------------|--------------------------------------------------|
| BuyResourceToken  | acs8.BuyResourceTokenInput  | google.protobuf.Empty | Buys one of the four resource tokens. Consumes ELF balance in the contract account. |

### Types

#### acs8.BuyResourceTokenInput
| Field      | Type   | Description                                   | Label     |
|------------|--------|-----------------------------------------------|-----------|
| symbol     | string | The symbol of the token to buy.               |           |
| amount     | int64  | The amount of token to buy.                   |           |
| pay_limit  | int64  | Limit of cost; buying is abandoned if exceeded. 0 means no limit. |           |

## Usage
Contracts inheriting ACS1 use a pre-plugin transaction called ChargeTransactionFees for transaction fee charging. ACS8 introduces a similar post-plugin transaction called ChargeResourceToken, which charges resource tokens based on actual transaction consumption.

The ChargeResourceToken implementation involves calculating token amounts using polynomial coefficients stored in CalculateFeeCoefficients defined in token_contract.proto. Each resource token has a polynomial for fee calculation, which determines the cost based on transaction consumption.
```cs
public override Empty ChargeResourceToken(ChargeResourceTokenInput input)
{
    Context.LogDebug(() => string.Format("Start executing ChargeResourceToken.{0}", input));
    if (input.Equals(new ChargeResourceTokenInput()))
    {
        return new Empty();
    }
    var bill = new TransactionFeeBill();
    foreach (var pair in input.CostDic)
    {
        Context.LogDebug(() => string.Format("Charging {0} {1} tokens.", pair.Value, pair.Key));
        var existingBalance = GetBalance(Context.Sender, pair.Key);
        Assert(existingBalance >= pair.Value,
            string.Format("Insufficient resource of {0}. Need balance: {1}; Current balance: {2}.", pair.Key, pair.Value, existingBalance));
        bill.FeesMap.Add(pair.Key, pair.Value);
    }
    foreach (var pair in bill.FeesMap)
    {
        Context.Fire(new ResourceTokenCharged
        {
            Symbol = pair.Key,
            Amount = pair.Value,
            ContractAddress = Context.Sender
        });
        if (pair.Value == 0)
        {
            Context.LogDebug(() => string.Format("Maybe incorrect charged resource fee of {0}: it's 0.", pair.Key));
        }
    }
    return new Empty();
}
```

Additionally, contracts cannot execute methods if they lack sufficient resource token balance. To enforce this, a pre-plugin transaction CheckResourceToken, similar to ACS5, verifies the contract's resource token balance before method execution.
```cs
public override Empty CheckResourceToken(Empty input)
{
    foreach (var symbol in Context.Variables.GetStringArray(TokenContractConstants.PayTxFeeSymbolListName))
    {
        var balance = GetBalance(Context.Sender, symbol);
        var owningBalance = State.OwningResourceToken[Context.Sender][symbol];
        Assert(balance > owningBalance,
            string.Format("Contract balance of {0} token is not enough. Owning {1}.", symbol, owningBalance));
    }
    return new Empty();
}
```