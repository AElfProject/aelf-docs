# ACS10 - Dividend Pool Standard
ACS10 facilitates the creation and management of dividend pools within a contract.

## Interface
To create a dividend pool, implement these optional interfaces:

### Methods
| Method Name              | Request Type          | Response Type           | Description                                                                                       |
|--------------------------|-----------------------|-------------------------|---------------------------------------------------------------------------------------------------|
| Donate                   | `acs10.DonateInput`   | `google.protobuf.Empty` | Transfers tokens from the caller to the dividend pool. Converts non-native tokens to native tokens if required. |
| Release                  | `acs10.ReleaseInput`  | `google.protobuf.Empty` | Releases dividends based on the specified period number.                                           |
| SetSymbolList            | `acs10.SymbolList`    | `google.protobuf.Empty` | Sets the list of token symbols supported by the dividend pool.                                     |
| GetSymbolList            | `google.protobuf.Empty` | `acs10.SymbolList`    | Retrieves the list of token symbols supported by the dividend pool.                                 |
| GetUndistributedDividends| `google.protobuf.Empty` | `acs10.Dividends`     | Queries the balance of undistributed tokens according to the symbol list.                          |
| GetDividends             | `google.protobuf.Int64Value` | `acs10.Dividends` | Queries dividend information based on the specified height.                                        |


### Types

#### `acs10.Dividends`
| Field  | Type               | Description                            | Label  |
|--------|--------------------|----------------------------------------|--------|
| `value`| `Dividends.ValueEntry` | The dividends, symbol -> amount.   | repeated |

#### `acs10.Dividends.ValueEntry`
| Field  | Type     | Description   | Label |
|--------|----------|---------------|-------|
| `key`  | `string` |               |       |
| `value`| `int64`  |               |       |

#### `acs10.DonateInput`
| Field    | Type     | Description                 | Label |
|----------|----------|-----------------------------|-------|
| `symbol` | `string` | The token symbol to donate.  |       |
| `amount` | `int64`  | The amount to donate.        |       |

#### `acs10.DonationReceived`
| Field           | Type            | Description                   | Label  |
|-----------------|-----------------|-------------------------------|--------|
| `from`          | `aelf.Address`  | The address of donors.        |        |
| `pool_contract` | `aelf.Address`  | The address of dividend pool. |        |
| `symbol`        | `string`        | The token symbol Donated.     |        |
| `amount`        | `int64`         | The amount Donated.           |        |

#### `acs10.ReleaseInput`
| Field           | Type    | Description                    | Label  |
|-----------------|---------|--------------------------------|--------|
| `period_number` | `int64` | The period number to release.  |        |

#### `acs10.SymbolList`
| Field  | Type     | Description                    | Label  |
|--------|----------|--------------------------------|--------|
| `value`| `string` | The token symbol list.          | repeated |

#### `aelf.Address`
| Field  | Type   | Description         | Label  |
|--------|--------|---------------------|--------|
| `value`| `bytes`|                     |        |

#### `aelf.BinaryMerkleTree`
| Field  | Type  | Description         | Label  |
|--------|-------|---------------------|--------|
| `nodes`| `Hash`| The leaf nodes.     |        |
| `root` | `Hash`| The root node hash. | repeated |
| `leaf_count` | `int32` | The count of leaf node. |        |

#### `aelf.Hash`
| Field  | Type   | Description         | Label  |
|--------|--------|---------------------|--------|
| `value`| `bytes`|                     |        |

#### `aelf.LogEvent`
| Field       | Type         | Description                     | Label  |
|-------------|--------------|---------------------------------|--------|
| `address`   | `Address`    | The contract address.           |        |
| `name`      | `string`     | The name of the log event.      |        |
| `indexed`   | `bytes`      | The indexed data, used to calculate bloom. | repeated |
| `non_indexed` | `bytes`   | The non indexed data.           | repeated |

#### `aelf.MerklePath`
| Field             | Type                | Description                | Label  |
|-------------------|---------------------|----------------------------|--------|
| `merkle_path_nodes` | `MerklePathNode`   | The merkle path nodes.     | repeated |

#### `aelf.MerklePathNode`
| Field  | Type   | Description          | Label  |
|--------|--------|----------------------|--------|
| `hash` | `Hash` | The node hash.       |        |
| `is_left_child_node` | `bool` | Whether it is a left child node. |        |

#### `aelf.SInt32Value`
| Field  | Type   | Description         | Label  |
|--------|--------|---------------------|--------|
| `value`| `sint32`|                   |        |

#### `aelf.SInt64Value`
| Field  | Type   | Description         | Label  |
|--------|--------|---------------------|--------|
| `value`| `sint64`|                   |        |

#### `aelf.ScopedStatePath`
| Field    | Type      | Description         | Label  |
|----------|-----------|---------------------|--------|
| `address`| `Address` | The scope address.  |        |
| `path`   | `StatePath`| The path of contract state. |        |

#### `aelf.SmartContractRegistration`
| Field             | Type   | Description                   | Label  |
|-------------------|--------|-------------------------------|--------|
| `category`        | `sint32`| The category of contract code (0: C#). |        |
| `code`            | `bytes`| The byte array of the contract code. |        |
| `code_hash`       | `Hash` | The hash of the contract code. |        |
| `is_system_contract` | `bool`| Whether it is a system contract. |        |
| `version`         | `int32`| The version of the current contract. |        |

#### `aelf.StatePath`
| Field    | Type   | Description                   | Label  |
|----------|--------|-------------------------------|--------|
| `parts`  | `string`| The partial path of the state path. | repeated |

#### `aelf.Transaction`
| Field             | Type      | Description                    | Label  |
|-------------------|-----------|--------------------------------|--------|
| `from`            | `Address` | The address of the sender of the transaction. |        |
| `to`              | `Address` | The address of the contract when calling a contract. |        |
| `ref_block_number`| `int64`   | The height of the referenced block hash. |        |
| `ref_block_prefix`| `bytes`   | The first four bytes of the referenced block hash. |        |
| `method_name`     | `string`  | The name of a method in the smart contract at the To address. |        |
| `params`          | `bytes`   | The parameters to pass to the smart contract method. |        |
| `signature`       | `bytes`   | When signing a transaction, subset of fields: from/to, target method, parameter, reference block number, prefix. |        |

#### `aelf.TransactionExecutingStateSet`
| Field           | Type                | Description                  | Label  |
|-----------------|---------------------|------------------------------|--------|
| `writes`        | `TransactionExecutingStateSet.WritesEntry` | The changed states.     | repeated |
| `reads`         | `TransactionExecutingStateSet.ReadsEntry` | The read states.        | repeated |
| `deletes`       | `TransactionExecutingStateSet.DeletesEntry` | The deleted states.    | repeated |

#### `aelf.TransactionExecutingStateSet.DeletesEntry`
| Field  | Type   | Description         | Label  |
|--------|--------|---------------------|--------|
| `key`  | `string`|                   |        |
| `value`| `bool`  |                   |        |

#### `aelf.TransactionExecutingStateSet.ReadsEntry`
| Field  | Type   | Description         | Label  |
|--------|--------|---------------------|--------|
| `key`  | `string`|                   |        |
| `value`| `bool`  |                   |        |

#### `aelf.TransactionExecutingStateSet.WritesEntry`
| Field  | Type   | Description         | Label  |
|--------|--------|---------------------|--------|
| `key`  | `string`|                   |        |
| `value`| `bytes` |                   |        |

#### `aelf.TransactionResult`
| Field             | Type      | Description                    | Label  |
|-------------------|-----------|--------------------------------|--------|
| `transaction_id`  | `Hash`    | The transaction id.            |        |
| `status`          | `TransactionResultStatus` | The transaction result status. |        |
| `logs`            | `LogEvent`| The log events.                | repeated |
| `bloom`           | `bytes`   | Bloom filter for transaction logs. | repeated |
| `return_value`    | `bytes`   | The return value of the transaction execution. |        |
| `block_number`    | `int64`   | The height of the block that packages the transaction. |        |
| `block_hash`      | `Hash`    | The hash of the block that packages the transaction. |        |
| `error`           | `string`  | Failed execution error message. |        |

#### `aelf.TransactionResultStatus`
| Name                | Number | Description                                           |
|---------------------|--------|-------------------------------------------------------|
| `NOT_EXISTED`       | `0`    | The execution result of the transaction does not exist. |
| `PENDING`           | `1`    | The transaction is in the transaction pool waiting to be packaged. |
| `FAILED`            | `2`    | Transaction execution failed.                         |
| `MINED`             | `3`    | The transaction was successfully executed and packaged into a block. |
| `CONFLICT`          | `4`    | When executed in parallel, there are conflicts with other transactions. |
| `PENDING_VALIDATION`| `5`    | The transaction is waiting for validation.            |
| `NODE_VALIDATION_FAILED` | `6`| Transaction validation failed.                       |

## Usage
ACS10 provides a standardized interface for dividend pools, independent of aelf chain interactions.

### Implementation

- Using the Profit Contract
```cs
State.ProfitContract.Value =
    Context.GetContractAddressByName(SmartContractConstants.ProfitContractSystemName);
var schemeToken = HashHelper.ComputeFrom(Context.Self);
State.ProfitContract.CreateScheme.Send(new CreateSchemeInput
{
    Manager = Context.Self,
    CanRemoveBeneficiaryDirectly = true,
    IsReleaseAllBalanceEveryTimeByDefault = true,
    Token = schemeToken
});
State.ProfitSchemeId.Value = Context.GenerateId(State.ProfitContract.Value, schemeToken);
```

- Using the TokenHolder Contract
```cs
State.TokenHolderContract.Value =
    Context.GetContractAddressByName(SmartContractConstants.TokenHolderContractSystemName);
State.TokenHolderContract.CreateScheme.Send(new CreateTokenHolderProfitSchemeInput
{
    Symbol = Context.Variables.NativeSymbol,
    MinimumLockMinutes = input.MinimumLockMinutes
});
return new Empty();
```

- Donate can be implemented as:
```cs
public override Empty Donate(DonateInput input)
{
    State.TokenContract.TransferFrom.Send(new TransferFromInput
    {
        From = Context.Sender,
        Symbol = input.Symbol,
        Amount = input.Amount,
        To = Context.Self
    });
    State.TokenContract.Approve.Send(new ApproveInput
    {
        Symbol = input.Symbol,
        Amount = input.Amount,
        Spender = State.TokenHolderContract.Value
    });
    State.TokenHolderContract.ContributeProfits.Send(new ContributeProfitsInput
    {
        SchemeManager = Context.Self,
        Symbol = input.Symbol,
        Amount = input.Amount
    });
    Context.Fire(new DonationReceived
    {
        From = Context.Sender,
        Symbol = input.Symbol,
        Amount = input.Amount,
        PoolContract = Context.Self
    });
    var currentReceivedDividends = State.ReceivedDividends[Context.CurrentHeight];
    if (currentReceivedDividends != null && currentReceivedDividends.Value.ContainsKey(input.Symbol))
    {
        currentReceivedDividends.Value[input.Symbol] =
            currentReceivedDividends.Value[input.Symbol].Add(input.Amount);
    }
    else
    {
        currentReceivedDividends = new Dividends
        {
            Value =
            {
                {
                    input.Symbol, input.Amount
                }
            }
        };
    }
    State.ReceivedDividends[Context.CurrentHeight] = currentReceivedDividends;
    Context.LogDebug(() => string.Format("Contributed {0} {1}s to side chain dividends pool.", input.Amount, input.Symbol));
    return new Empty();
}
```

- The method Release directly sends the TokenHolder’s method DistributeProfits transaction:
```cs
public override Empty Release(ReleaseInput input)
{
    State.TokenHolderContract.DistributeProfits.Send(new DistributeProfitsInput
    {
        SchemeManager = Context.Self
    });
    return new Empty();
}
```

- GetSymbolList returns the symbol list recorded in dividend scheme:
```cs
public override SymbolList GetSymbolList(Empty input)
{
    return new SymbolList
    {
        Value =
        {
            GetDividendPoolScheme().ReceivedTokenSymbols
        }
    };
}
private Scheme GetDividendPoolScheme()
{
    if (State.DividendPoolSchemeId.Value == null)
    {
        var tokenHolderScheme = State.TokenHolderContract.GetScheme.Call(Context.Self);
        State.DividendPoolSchemeId.Value = tokenHolderScheme.SchemeId;
    }
    return Context.Call<Scheme>(
        Context.GetContractAddressByName(SmartContractConstants.ProfitContractSystemName),
        nameof(ProfitContractContainer.ProfitContractReferenceState.GetScheme),
        State.DividendPoolSchemeId.Value);
}
```
-  Implementation of GetUndistributedDividends returns the balance (same as previous section):
```cs
public override Dividends GetUndistributedDividends(Empty input)
{
    var scheme = GetDividendPoolScheme();
    return new Dividends
    {
        Value =
        {
            scheme.ReceivedTokenSymbols.Select(s => State.TokenContract.GetBalance.Call(new GetBalanceInput
            {
                Owner = scheme.VirtualAddress,
                Symbol = s
            })).ToDictionary(b => b.Symbol, b => b.Balance)
        }
    };
}
```

### Test
Testing includes sending Donate, Release transactions, and querying operations. Example:

- Define the required Stubs:
```cs
const long amount = 10_00000000;
var keyPair = SampleECKeyPairs.KeyPairs[0];
var address = Address.FromPublicKey(keyPair.PublicKey);
var acs10DemoContractStub =
    GetTester<ACS10DemoContractContainer.ACS10DemoContractStub>(DAppContractAddress, keyPair);
var tokenContractStub =
    GetTester<TokenContractContainer.TokenContractStub>(TokenContractAddress, keyPair);
var tokenHolderContractStub =
    GetTester<TokenHolderContractContainer.TokenHolderContractStub>(TokenHolderContractAddress,
        keyPair);
```

- Approve the TokenHolder contract and the dividend pool contract
```cs
await tokenContractStub.Approve.SendAsync(new ApproveInput
{
    Spender = TokenHolderContractAddress,
    Symbol = "ELF",
    Amount = long.MaxValue
});
await tokenContractStub.Approve.SendAsync(new ApproveInput
{
    Spender = DAppContractAddress,
    Symbol = "ELF",
    Amount = long.MaxValue
});
```

- Lock the position to reducethe account balance by 10 ELF:
```cs
await tokenHolderContractStub.RegisterForProfits.SendAsync(new RegisterForProfitsInput
{
    SchemeManager = DAppContractAddress,
    Amount = amount
});
```

- Implement Donate to reduce the account balance by another 10 ELF:

```cs
await acs10DemoContractStub.Donate.SendAsync(new DonateInput
{
    Symbol = "ELF",
    Amount = amount
});
```

- Test the GetUndistributedDividends and GetDividends:
```cs
// Check undistributed dividends before releasing.
{
    var undistributedDividends =
        await acs10DemoContractStub.GetUndistributedDividends.CallAsync(new Empty());
    undistributedDividends.Value["ELF"].ShouldBe(amount);
}
var blockchainService = Application.ServiceProvider.GetRequiredService<IBlockchainService>();
var currentBlockHeight = (await blockchainService.GetChainAsync()).BestChainHeight;
var dividends =
    await acs10DemoContractStub.GetDividends.CallAsync(new Int64Value {Value = currentBlockHeight});
dividends.Value["ELF"].ShouldBe(amount);
```

- Release bonus, and test GetUndistributedDividends again:
```cs
await acs10DemoContractStub.Release.SendAsync(new ReleaseInput
{
    PeriodNumber = 1
});
// Check undistributed dividends after releasing.
{
    var undistributedDividends =
        await acs10DemoContractStub.GetUndistributedDividends.CallAsync(new Empty());
    undistributedDividends.Value["ELF"].ShouldBe(0);
}
```

- Account will receive the dividend and will change the balance:
```cs
var balanceBeforeClaimForProfits = await tokenContractStub.GetBalance.CallAsync(new GetBalanceInput
{
    Owner = address,
    Symbol = "ELF"
});
await tokenHolderContractStub.ClaimProfits.SendAsync(new ClaimProfitsInput
{
    SchemeManager = DAppContractAddress,
    Beneficiary = address
});
var balanceAfterClaimForProfits = await tokenContractStub.GetBalance.CallAsync(new GetBalanceInput
{
    Owner = address,
    Symbol = "ELF"
});
balanceAfterClaimForProfits.Balance.ShouldBe(balanceBeforeClaimForProfits.Balance + amount);
```

### Example
Implementing ACS10 facilitates building dividend pools on main and side chains.