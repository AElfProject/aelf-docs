---
sidebar_position: 11
title: Cross Chain Consensus
description: ACS11
---

# ACS11 - Cross Chain Consensus Standard
ACS11 is a standard used to customize consensus mechanisms for cross-chain operations.

## Interface
Contracts inheriting from ACS11 must implement the following interfaces:

### Methods
| Method Name                       | Request Type                     | Response Type        | Description                                     |
|-----------------------------------|----------------------------------|----------------------|-------------------------------------------------|
| `UpdateInformationFromCrossChain` | `google.protobuf.BytesValue`     | `google.protobuf.Empty` | Update the consensus information of the side chain. |
| `GetChainInitializationInformation` | `google.protobuf.BytesValue`  | `google.protobuf.BytesValue` | Get the current miner list and consensus round information. |
| `CheckCrossChainIndexingPermission` | `aelf.Address`               | `google.protobuf.BoolValue` | Verify that the input address is the current miner. |

### Types

#### `aelf.Address`
| Field  | Type   | Description            | Label  |
|--------|--------|------------------------|--------|
| `value`| `bytes`|                        |        |

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
| `non_indexed` | `bytes`   | The non-indexed data.           | repeated |

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
| `signature`       | `bytes`   | Subset of fields: from/to, target method, parameter, reference block number, prefix. |        |

#### `aelf.TransactionExecutingStateSet`
| Field           | Type                | Description                  | Label  |
|-----------------|---------------------|------------------------------|--------|
| `writes`        | `TransactionExecutingStateSet.WritesEntry` | The changed states.     | repeated |
| `reads`         | `TransactionExecutingStateSet.ReadsEntry` | The read states.        | repeated |
| `deletes`       | `TransactionExecutingStateSet.DeletesEntry` | The deleted states.    | repeated |

##### `aelf.TransactionExecutingStateSet.DeletesEntry`
| Field  | Type   | Description         | Label  |
|--------|--------|---------------------|--------|
| `key`  | `string`|                   |        |
| `value`| `bool`  |                   |        |

##### `aelf.TransactionExecutingStateSet.ReadsEntry`
| Field  | Type   | Description         | Label  |
|--------|--------|---------------------|--------|
| `key`  | `string`|                   |        |
| `value`| `bool`  |                   |        |

##### `aelf.TransactionExecutingStateSet.WritesEntry`
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
| `NODE_VALIDATION_FAILED` | `6`| Transaction validation failed.                        |

### Example
ACS11 defines methods for customizing consensus mechanisms for cross-chain scenarios. aelf provides an implementation of ACS11 through the AEDPoS contract. Developers can refer to the AEDPoS contract API for implementation details.