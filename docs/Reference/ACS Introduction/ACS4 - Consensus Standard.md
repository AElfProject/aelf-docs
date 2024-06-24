# ACS4 - Consensus Standard
ACS4 customizes consensus mechanisms.

## Interface
To customize, implement these five interfaces:

### Methods
| Method Name                    | Request Type                  | Response Type               | Description                                                                                  |
|--------------------------------|-------------------------------|-----------------------------|------------------------------------------------------------------------------------------------|
| GetConsensusCommand            | google.protobuf.BytesValue    | acs4.ConsensusCommand       | Generate a consensus command based on contract state and the input public key.                |
| GetConsensusExtraData          | google.protobuf.BytesValue    | google.protobuf.BytesValue  | Generate extra data when a block is generated.                                               |
| GenerateConsensusTransactions  | google.protobuf.BytesValue    | acs4.TransactionList        | Generate system transactions when a block is generated. Each block has one consensus transaction. |
| ValidateConsensusBeforeExecution | google.protobuf.BytesValue  | acs4.ValidationResult       | Verify consensus info in the block header before execution.                                   |
| ValidateConsensusAfterExecution  | google.protobuf.BytesValue  | acs4.ValidationResult       | Verify the state info written to consensus after execution.                                   |

## Types

### acs4.ConsensusCommand
| Field                         | Type                     | Description                                                      |
|-------------------------------|--------------------------|------------------------------------------------------------------|
| limit_milliseconds_of_mining_block | int32              | Time limit for mining the next block.                            |
| hint                          | bytes                    | Diverse context according to the consensus protocol.             |
| arranged_mining_time          | google.protobuf.Timestamp | The arranged mining time.                                        |
| mining_due_time               | google.protobuf.Timestamp | The expiration time for mining.                                  |

### acs4.TransactionList
| Field        | Type           | Description                 |
|--------------|----------------|-----------------------------|
| transactions | aelf.Transaction | Consensus system transactions. |

### acs4.ValidationResult
| Field        | Type   | Description            |
|--------------|--------|------------------------|
| success      | bool   | Is successful.         |
| message      | string | Error message.         |
| is_re_trigger| bool   | Whether to re-trigger mining. |

### aelf.Address
| Field | Type  | Description |
|-------|-------|-------------|
| value | bytes |             |

### aelf.BinaryMerkleTree
| Field      | Type  | Description       |
|------------|-------|-------------------|
| nodes      | Hash  | Leaf nodes.       |
| root       | Hash  | Root node hash.   |
| leaf_count | int32 | Leaf node count.  |

### aelf.Hash
| Field | Type  | Description |
|-------|-------|-------------|
| value | bytes |             |

### aelf.LogEvent
| Field        | Type    | Description              |
|--------------|---------|--------------------------|
| address      | Address | Contract address.        |
| name         | string  | Name of the log event.   |
| indexed      | bytes   | Indexed data for bloom.  |
| non_indexed  | bytes   | Non-indexed data.        |

### aelf.MerklePath
| Field              | Type             | Description         |
|--------------------|------------------|---------------------|
| merkle_path_nodes  | MerklePathNode   | Merkle path nodes.  |

### aelf.MerklePathNode
| Field              | Type  | Description              |
|--------------------|-------|--------------------------|
| hash               | Hash  | Node hash.               |
| is_left_child_node | bool  | Is it a left child node? |

### aelf.SInt32Value
| Field | Type  | Description |
|-------|-------|-------------|
| value | sint32 |            |

### aelf.SInt64Value
| Field | Type  | Description |
|-------|-------|-------------|
| value | sint64 |            |

### aelf.ScopedStatePath
| Field   | Type    | Description                      |
|---------|---------|----------------------------------|
| address | Address | Scope address (contract address) |
| path    | StatePath | Path of contract state         |

### aelf.SmartContractRegistration
| Field            | Type  | Description                       |
|------------------|-------|-----------------------------------|
| category         | sint32| Contract code category (0: C#).   |
| code             | bytes | Byte array of the contract code.  |
| code_hash        | Hash  | Hash of the contract code.        |
| is_system_contract | bool | Is it a system contract?          |
| version          | int32 | Current contract version.         |

### aelf.StatePath
| Field | Type   | Description          |
|-------|--------|----------------------|
| parts | string | Partial state path.  |

### aelf.Transaction
| Field             | Type     | Description                                                    |
|-------------------|----------|----------------------------------------------------------------|
| from              | Address  | Sender's address.                                              |
| to                | Address  | Contract address being called.                                 |
| ref_block_number  | int64    | Referenced block number.                                       |
| ref_block_prefix  | bytes    | First four bytes of the referenced block hash.                 |
| method_name       | string   | Method name in the smart contract.                             |
| params            | bytes    | Parameters for the smart contract method.                      |
| signature         | bytes    | Signature including sender, target method, parameters, and block reference. |

### aelf.TransactionExecutingStateSet
| Field   | Type                               | Description     |
|---------|------------------------------------|-----------------|
| writes  | TransactionExecutingStateSet.WritesEntry | Changed states. |
| reads   | TransactionExecutingStateSet.ReadsEntry  | Read states.    |
| deletes | TransactionExecutingStateSet.DeletesEntry | Deleted states. |

### aelf.TransactionExecutingStateSet.DeletesEntry
| Field | Type  | Description |
|-------|-------|-------------|
| key   | string|             |
| value | bool  |             |

### aelf.TransactionExecutingStateSet.ReadsEntry
| Field | Type  | Description |
|-------|-------|-------------|
| key   | string|             |
| value | bool  |             |

### aelf.TransactionExecutingStateSet.WritesEntry
| Field | Type  | Description |
|-------|-------|-------------|
| key   | string|             |
| value | bytes |             |

### aelf.TransactionResult
| Field          | Type                    | Description                                                               |
|----------------|-------------------------|---------------------------------------------------------------------------|
| transaction_id | Hash                    | Transaction ID.                                                           |
| status         | TransactionResultStatus | Transaction result status.                                                |
| logs           | LogEvent                | Log events.                                                               |
| bloom          | bytes                   | Bloom filter for transaction logs.                                        |
| return_value   | bytes                   | Return value of the transaction execution.                                |
| block_number   | int64                   | Block height that packages the transaction.                               |
| block_hash     | Hash                    | Block hash that packages the transaction.                                 |
| error          | string                  | Failed execution error message.                                           |

### aelf.TransactionResultStatus
| Name                 | Number | Description                                                       |
|----------------------|--------|-------------------------------------------------------------------|
| NOT_EXISTED          | 0      | Transaction result does not exist.                                |
| PENDING              | 1      | Transaction is in the pool waiting to be packaged.                |
| FAILED               | 2      | Transaction execution failed.                                     |
| MINED                | 3      | Transaction executed successfully and packaged into a block.      |
| CONFLICT             | 4      | Conflicts with other transactions when executed in parallel.      |
| PENDING_VALIDATION   | 5      | Transaction is waiting for validation.                            |
| NODE_VALIDATION_FAILED | 6    | Transaction validation failed.                                    |

## Usage
ACS4 methods correspond to the IConsensusService interface in the AElf.Kernel.Consensus project:

| ACS4 Method                        | IConsensusService Method          | Methodology                                                                                      | Timing                                                                                                                                                                      |
|------------------------------------|-----------------------------------|--------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| GetConsensusCommand                | Task TriggerConsensusAsync        | When TriggerConsensusAsync is called, it will use the node's configured account to call the GetConsensusCommand method to obtain block information (ConsensusCommand)       | When the node starts; When the BestChainFoundEventData event is thrown; When consensus data validation fails and needs to be triggered again (IsReTrigger field is true).   |
| GetConsensusExtraData              | Task<byte[]> GetConsensusExtraDataAsync | When a node produces a block, it generates block header info via IBlockExtraDataService, which calls GetConsensusExtraData in the consensus contract                          | When a node produces a new block.                                                                                                                                           |
| GenerateConsensusTransactions      | Task<List<Transaction>> GenerateConsensusTransactionsAsync | In the process of generating new blocks, a consensus transaction needs to be generated as one of the system transactions                                                    | When a node produces a new block.                                                                                                                                           |
| ValidateConsensusBeforeExecution   | Task<bool> ValidateConsensusBeforeExecutionAsync | The IBlockValidationProvider interface allows adding a new block validator. The consensus validator, ConsensusValidationProvider, calls ValidateConsensusBeforeExecution     | When a node produces a new block.                                                                                                                                           |
| ValidateConsensusAfterExecution    | Task<bool> ValidateConsensusAfterExecutionAsync | The implementation of ValidateBlockAfterExecuteAsync in ConsensusValidationProvider calls ValidateConsensusAfterExecution in the consensus contract                           | When a node produces a new block.                                                                                                                                           |

### Example
Refer to the AEDPoS contract implementation.