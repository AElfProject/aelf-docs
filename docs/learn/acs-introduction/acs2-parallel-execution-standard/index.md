---
sidebar_position: 2
title: ACS2 - Parallel Execution Standard
description: ACS2 helps with parallel transaction execution.
---

# ACS2 - Parallel Execution Standard
ACS2 helps with parallel transaction execution.

## Interface
Contracts using ACS2 need to implement one method:

### Methods
| Method Name      | Request Type          | Response Type        | Description                                         |
|------------------|-----------------------|----------------------|-----------------------------------------------------|
| GetResourceInfo  | `aelf.Transaction`    | `acs2.ResourceInfo`  | Gets the resource info that the transaction execution depends on. |

### Types
#### acs2.ResourceInfo
| Field            | Type                    | Description                      |
|------------------|-------------------------|----------------------------------|
| write_paths      | aelf.ScopedStatePath    | State paths for writing.         |
| read_paths       | aelf.ScopedStatePath    | State paths for reading.         |
| non_parallelizable| bool                    | If the transaction isn't parallel.|

#### aelf.Address
| Field | Type  | Description              |
|-------|-------|--------------------------|
| value | bytes |                          |

#### aelf.BinaryMerkleTree
| Field       | Type   | Description        |
|-------------|--------|--------------------|
| nodes       | Hash   | Leaf nodes.        |
| root        | Hash   | Root node hash.    |
| leaf_count  | int32  | Count of leaf nodes.|

#### aelf.Hash
| Field | Type  | Description              |
|-------|-------|--------------------------|
| value | bytes |                          |

#### aelf.LogEvent
| Field        | Type     | Description         |
|--------------|----------|---------------------|
| address      | Address  | Contract address.   |
| name         | string   | Log event name.     |
| indexed      | bytes    | Indexed data.       |
| non_indexed  | bytes    | Non-indexed data.   |

#### aelf.MerklePath
| Field             | Type             | Description             |
|-------------------|------------------|-------------------------|
| merkle_path_nodes | MerklePathNode   | Merkle path nodes.      |

#### aelf.MerklePathNode
| Field             | Type  | Description             |
|-------------------|-------|-------------------------|
| hash              | Hash  | Node hash.              |
| is_left_child_node| bool  | If it's a left child node.|

#### aelf.SInt32Value
| Field | Type  | Description            |
|-------|-------|------------------------|
| value | sint32|                        |

#### aelf.SInt64Value

| Field | Type  | Description            |
|-------|-------|------------------------|
| value | sint64|                        |

#### aelf.ScopedStatePath
| Field    | Type        | Description                          |
|----------|-------------|--------------------------------------|
| address  | Address     | Contract address.                    |
| path     | StatePath   | Path of contract state.              |

#### aelf.SmartContractRegistration
| Field             | Type    | Description                      |
|-------------------|---------|----------------------------------|
| category          | sint32  | Contract code category (0: C#).  |
| code              | bytes   | Contract code byte array.        |
| code_hash         | Hash    | Contract code hash.              |
| is_system_contract| bool    | If it's a system contract.       |
| version           | int32   | Current contract version.        |

#### aelf.StatePath
| Field | Type   | Description              |
|-------|--------|--------------------------|
| parts | string | State path parts.        |

#### aelf.Transaction
| Field            | Type   | Description                       |
|------------------|--------|-----------------------------------|
| from             | Address| Sender address.                   |
| to               | Address| Contract address.                 |
| ref_block_number | int64  | Referenced block height.          |
| ref_block_prefix | bytes  | First 4 bytes of referenced block hash. |
| method_name      | string | Method name in the contract.      |
| params           | bytes  | Method parameters.                |
| signature        | bytes  | Signature of the transaction.     |

#### aelf.TransactionExecutingStateSet
| Field    | Type                                      | Description         |
|----------|-------------------------------------------|---------------------|
| writes   | TransactionExecutingStateSet.WritesEntry  | Changed states.     |
| reads    | TransactionExecutingStateSet.ReadsEntry   | Read states.        |
| deletes  | TransactionExecutingStateSet.DeletesEntry | Deleted states.     |

#### aelf.TransactionExecutingStateSet.DeletesEntry
| Field | Type   | Description       |
|-------|--------|-------------------|
| key   | string |                   |
| value | bool   |                   |

#### aelf.TransactionExecutingStateSet.ReadsEntry
| Field | Type   | Description       |
|-------|--------|-------------------|
| key   | string |                   |
| value | bool   |                   |

#### aelf.TransactionExecutingStateSet.WritesEntry
| Field | Type   | Description       |
|-------|--------|-------------------|
| key   | string |                   |
| value | bytes  |                   |

#### aelf.TransactionResult
| Field          | Type                  | Description                                   |
|----------------|-----------------------|-----------------------------------------------|
| transaction_id | Hash                  | Transaction ID.                               |
| status         | TransactionResultStatus| Transaction result status.                    |
| logs           | LogEvent              | Log events.                                   |
| bloom          | bytes                 | Bloom filter for transaction logs.            |
| return_value   | bytes                 | Return value of the transaction execution.    |
| block_number   | int64                 | Block height that packages the transaction.   |
| block_hash     | Hash                  | Block hash that packages the transaction.     |
| error          | string                | Failed execution error message.               |

#### aelf.TransactionResultStatus

| Name                  | Number | Description                                               |
|-----------------------|--------|-----------------------------------------------------------|
| NOT_EXISTED           | 0      | Transaction result does not exist.                        |
| PENDING               | 1      | Transaction is waiting to be packaged.                    |
| FAILED                | 2      | Transaction execution failed.                             |
| MINED                 | 3      | Transaction was successfully executed and packaged.       |
| CONFLICT              | 4      | Transaction has conflicts with other transactions.        |
| PENDING_VALIDATION    | 5      | Transaction is waiting for validation.                    |
| NODE_VALIDATION_FAILED| 6      | Transaction validation failed.                            |

## Usage

aelf uses a key-value database to store data. State Path determines the key for contract execution data.

For example, a Token contract defines a balance property:
```cs
public MappedState<Address, string, long> Balances { get; set; }
```

To access the balance of an address (`2EM5uV6bSJh6xJfZTUa1pZpYsYcCUAdPvZvFUJzMDJEx3rbioz`) for a `Token contract` address (`Nmjj7noTpMqZ522j76SDsFLhiKkThv1u3d4TxqJMD8v89tWmE`), use its key in the database:
```cs
Nmjj7noTpMqZ522j76SDsFLhiKkThv1u3d4TxqJMD8v89tWmE/Balances/2EM5uV6bSJh6xJfZTUa1pZpYsYcCUAdPvZvFUJzMDJEx3rbioz/ELF
```

Parallel execution groups transactions by their State Paths. If two methods don’t access the same `StatePath`, they can be executed in parallel.

If State Paths mismatch, the transaction is canceled and labeled as “cannot be grouped”.

For more details, check the `ITransactionGrouper` and `IParallelTransactionExecutingService` code.

## Implementation
Example: Token Contract
For the Transfer method, notify ITransactionGrouper via GetResourceInfo about the ELF balances of address A and B:
```cs
var args = TransferInput.Parser.ParseFrom(txn.Params);
var resourceInfo = new ResourceInfo
{
    Paths =
    {
        GetPath(nameof(TokenContractState.Balances), txn.From.ToString(), args.Symbol),
        GetPath(nameof(TokenContractState.Balances), args.To.ToString(), args.Symbol),
    }
};
return resourceInfo;
```

The `GetPath` method forms a `ScopedStatePath` from key data:
```cs
private ScopedStatePath GetPath(params string[] parts)
{
    return new ScopedStatePath
    {
        Address = Context.Self,
        Path = new StatePath
        {
            Parts =
            {
                parts
            }
        }
    }
}
```

## Testing
Construct two transactions and pass them to `ITransactionGrouper` to test if they can run in parallel using `GroupAsync`.

Prepare two stubs with different addresses:
```cs
var keyPair1 = SampleECKeyPairs.KeyPairs[0];
var acs2DemoContractStub1 = GetACS2DemoContractStub(keyPair1);
var keyPair2 = SampleECKeyPairs.KeyPairs[1];
var acs2DemoContractStub2 = GetACS2DemoContractStub(keyPair2);
```

```cs
var transactionGrouper = Application.ServiceProvider.GetRequiredService<ITransactionGrouper>();
var blockchainService = Application.ServiceProvider.GetRequiredService<IBlockchainService>();
var chain = await blockchainService.GetChainAsync();
```

Check with transactionGrouper:
```cs
// Situation can be parallel executed.
{
    var groupedTransactions = await transactionGrouper.GroupAsync(new ChainContext
    {
        BlockHash = chain.BestChainHash,
        BlockHeight = chain.BestChainHeight
    }, new List<Transaction>
    {
        acs2DemoContractStub1.TransferCredits.GetTransaction(new TransferCreditsInput
        {
            To = Address.FromPublicKey(SampleECKeyPairs.KeyPairs[2].PublicKey),
            Symbol = "ELF",
            Amount = 1
        }),
        acs2DemoContractStub2.TransferCredits.GetTransaction(new TransferCreditsInput
        {
            To = Address.FromPublicKey(SampleECKeyPairs.KeyPairs[3].PublicKey),
            Symbol = "ELF",
            Amount = 1
        }),
    });
    groupedTransactions.Parallelizables.Count.ShouldBe(2);
}
// Situation cannot.
{
    var groupedTransactions = await transactionGrouper.GroupAsync(new ChainContext
    {
        BlockHash = chain.BestChainHash,
        BlockHeight = chain.BestChainHeight
    }, new List<Transaction>
    {
        acs2DemoContractStub1.TransferCredits.GetTransaction(new TransferCreditsInput
        {
            To = Address.FromPublicKey(SampleECKeyPairs.KeyPairs[2].PublicKey),
            Symbol = "ELF",
            Amount = 1
        }),
        acs2DemoContractStub2.TransferCredits.GetTransaction(new TransferCreditsInput
        {
            To = Address.FromPublicKey(SampleECKeyPairs.KeyPairs[2].PublicKey),
            Symbol = "ELF",
            Amount = 1
        }),
    });
    groupedTransactions.Parallelizables.Count.ShouldBe(1);
}
```

## Example
Refer to the `MultiToken contract` implementation for `GetResourceInfo`. Note that `Transfer` method needs to handle transaction fees along with keys.






ACS2 - Parallel Execution Standard

ACS2 enables parallel execution of transactions by providing necessary resource information.

### Interface

A contract inheriting ACS2 must implement:

#### Methods

| Method Name      | Request Type        | Response Type       | Description                                           |
|------------------|---------------------|---------------------|-------------------------------------------------------|
| GetResourceInfo  | aelf.Transaction    | acs2.ResourceInfo   | Retrieves resource dependencies for transaction exec. |

### Types

#### acs2.ResourceInfo

| Field             | Type                 | Description                        | Label     |
|-------------------|----------------------|------------------------------------|-----------|
| write_paths       | aelf.ScopedStatePath | State paths written during execution| repeated  |
| read_paths        | aelf.ScopedStatePath | State paths read during execution   | repeated  |
| non_parallelizable| bool                  | Indicates if transaction is non-parallelizable.|           |

#### Other Types (Omitted for brevity)

Several other types like `aelf.Address`, `aelf.BinaryMerkleTree`, `aelf.LogEvent`, etc., are used within `acs2.ResourceInfo`.

### Usage

aelf uses State Paths to manage data storage, ensuring transaction grouping based on accessed paths for efficient parallel execution.

### Implementation

Token contract, for example, modifies balances through method Transfer. GetResourceInfo must notify ITransactionGrouper of accessed state paths.

```cs
var args = TransferInput.Parser.ParseFrom(txn.Params);
var resourceInfo = new ResourceInfo
{
    Paths =
    {
        GetPath(nameof(TokenContractState.Balances), txn.From.ToString(), args.Symbol),
        GetPath(nameof(TokenContractState.Balances), args.To.ToString(), args.Symbol),
    }
};
return resourceInfo;
```

### Test
Test transaction parallelizability using ITransactionGrouper's GroupAsync method with sample transactions.

    ```cs
    var keyPair1 = SampleECKeyPairs.KeyPairs[0];
    var acs2DemoContractStub1 = GetACS2DemoContractStub(keyPair1);
    var keyPair2 = SampleECKeyPairs.KeyPairs[1];
    var acs2DemoContractStub2 = GetACS2DemoContractStub(keyPair2);

    var transactionGrouper = Application.ServiceProvider.GetRequiredService<ITransactionGrouper>();
    var blockchainService = Application.ServiceProvider.GetRequiredService<IBlockchainService>();
    var chain = await blockchainService.GetChainAsync();

    // Test parallel execution scenario
    {
        var groupedTransactions = await transactionGrouper.GroupAsync(new ChainContext
        {
            BlockHash = chain.BestChainHash,
            BlockHeight = chain.BestChainHeight
        }, new List<Transaction>
        {
            acs2DemoContractStub1.TransferCredits.GetTransaction(new TransferCreditsInput
            {
                To = Address.FromPublicKey(SampleECKeyPairs.KeyPairs[2].PublicKey),
                Symbol = "ELF",
                Amount = 1
            }),
            acs2DemoContractStub2.TransferCredits.GetTransaction(new TransferCreditsInput
            {
                To = Address.FromPublicKey(SampleECKeyPairs.KeyPairs[3].PublicKey),
                Symbol = "ELF",
                Amount = 1
            }),
        });
        groupedTransactions.Parallelizables.Count.ShouldBe(2);
    }

    // Test non-parallel execution scenario
    {
        var groupedTransactions = await transactionGrouper.GroupAsync(new ChainContext
        {
            BlockHash = chain.BestChainHash,
            BlockHeight = chain.BestChainHeight
        }, new List<Transaction>
        {
            acs2DemoContractStub1.TransferCredits.GetTransaction(new TransferCreditsInput
            {
                To = Address.FromPublicKey(SampleECKeyPairs.KeyPairs[2].PublicKey),
                Symbol = "ELF",
                Amount = 1
            }),
            acs2DemoContractStub2.TransferCredits.GetTransaction(new TransferCreditsInput
            {
                To = Address.FromPublicKey(SampleECKeyPairs.KeyPairs[2].PublicKey),
                Symbol = "ELF",
                Amount = 1
            }),
        });
        groupedTransactions.Parallelizables.Count.ShouldBe(1);
    }
    ```

### Example

For an example of implementing GetResourceInfo, refer to the MultiToken contract, ensuring transaction fees are considered for the keys involved.
