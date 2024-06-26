---
sidebar_position: 15
title: Configuration Contract
---

# Configuration contract. 

Used to manage the configuration on the blockchain. Implements AElf Standards ACS1.

## Contract Methods

| Method Name                   | Request Type                          | Response Type                | Description                                                  |
| ----------------------------- | ------------------------------------- | ---------------------------- | ------------------------------------------------------------ |
| SetConfiguration              | `Configuration.SetConfigurationInput` | `google.protobuf.Empty`      | Add or update configuration.                                 |
| ChangeConfigurationController | `AuthorityInfo`                       | `google.protobuf.Empty`      | Change the method fee controller, the default is Parliament. |
| GetConfiguration              | `google.protobuf.StringValue`         | `google.protobuf.BytesValue` | Query the configuration by configuration’s key.              |
| GetConfigurationController    | `google.protobuf.Empty`               | `AuthorityInfo`              | Query the controller information.                            |

## AElf.Standards.ACS1

| Method Name               | Request Type                  | Response Type           | Description                                                                                        |
| ------------------------- | ----------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| SetMethodFee              | `acs1.MethodFees`             | `google.protobuf.Empty` | Set the method fees for the specified method. Note that this will override all fees of the method. |
| ChangeMethodFeeController | `AuthorityInfo`               | `google.protobuf.Empty` | Change the method fee controller, the default is parliament and default organization.              |
| GetMethodFee              | `google.protobuf.StringValue` | `acs1.MethodFees`       | Query method fee information by method name.                                                       |
| GetMethodFeeController    | `google.protobuf.Empty`       | `AuthorityInfo`         | Query the method fee controller.                                                                   |

**Contract Types**

## AElf.Contracts.Configuration

### Configuration.ConfigurationSet

| Field | Type     | Description                              | Label |
| ----- | -------- | ---------------------------------------- | ----- |
| key   | `string` | The configuration’s key.                 |       |
| value | `bytes`  | The configuration’s value (binary data). |       |

### Configuration.SetConfigurationInput

| Field | Type     | Description                              | Label |
| ----- | -------- | ---------------------------------------- | ----- |
| key   | `string` | The configuration’s key.                 |       |
| value | `bytes`  | The configuration’s value (binary data). |       |

## AElf.Standards.ACS1

### acs1.MethodFee

| Field     | Type     | Description                         | Label |
| --------- | -------- | ----------------------------------- | ----- |
| symbol    | `string` | The token symbol of the method fee. |       |
| basic_fee | `int64`  | The amount of fees to be charged.   |       |

### acs1.MethodFees

| Field            | Type        | Description                                                  | Label    |
| ---------------- | ----------- | ------------------------------------------------------------ | -------- |
| method_name      | `string`    | The name of the method to be charged.                        |          |
| fees             | `MethodFee` | List of fees to be charged.                                  | repeated |
| is_size_fee_free | `bool`      | Optional based on the implementation of SetMethodFee method. |          |

## AElf.Types

### aelf.Address

| Field | Type    | Description | Label |
| ----- | ------- | ----------- | ----- |
| value | `bytes` |             |       |

### aelf.BinaryMerkleTree

| Field      | Type    | Description             | Label    |
| ---------- | ------- | ----------------------- | -------- |
| nodes      | `Hash`  | The leaf nodes.         | repeated |
| root       | `Hash`  | The root node hash.     |          |
| leaf_count | `int32` | The count of leaf node. |          |

### aelf.Hash

| Field | Type    | Description | Label |
| ----- | ------- | ----------- | ----- |
| value | `bytes` |             |       |

### aelf.LogEvent

| Field       | Type                     | Description                                | Label    |
| ----------- | ------------------------ | ------------------------------------------ | -------- |
| address     | `Address` | The contract address.                      |          |
| name        | `string`        | The name of the log event.                 |          |
| indexed     | `bytes`          | The indexed data, used to calculate bloom. | repeated |
| non_indexed | `bytes`          | The non indexed data.                      |          |

### aelf.MerklePath

| Field             | Type                                   | Description            | Label    |
| ----------------- | -------------------------------------- | ---------------------- | -------- |
| merkle_path_nodes | `MerklePathNode` | The merkle path nodes. | repeated |

### aelf.MerklePathNode

| Field              | Type               | Description                      | Label |
| ------------------ | ------------------ | -------------------------------- | ----- |
| hash               | `Hash` | The node hash.                   |       |
| is_left_child_node | `bool`      | Whether it is a left child node. |       |

### aelf.SInt32Value

| Field | Type              | Description | Label |
| ----- | ----------------- | ----------- | ----- |
| value | `sint32` |             |       |

### aelf.SInt64Value

| Field | Type              | Description | Label |
| ----- | ----------------- | ----------- | ----- |
| value | `sint64` |             |       |

### aelf.ScopedStatePath

| Field   | Type                         | Description                                            | Label |
| ------- | ---------------------------- | ------------------------------------------------------ | ----- |
| address | `Address`     | The scope address, which will be the contract address. |       |
| path    | `StatePath` | The path of contract state.                            |       |

### aelf.SmartContractRegistration

| Field              | Type               | Description                           | Label |
| ------------------ | ------------------ | ------------------------------------- | ----- |
| category           | `sint32`  | The category of contract code(0: C#). |       |
| code               | `bytes`    | The byte array of the contract code.  |       |
| code_hash          | `Hash` | The hash of the contract code.        |       |
| is_system_contract | `bool`      | Whether it is a system contract.      |       |
| version            | `int32`    | The version of the current contract.  |       |

### aelf.StatePath

| Field | Type              | Description                         | Label    |
| ----- | ----------------- | ----------------------------------- | -------- |
| parts | `string` | The partial path of the state path. | repeated |

### aelf.Transaction

| Field            | Type                     | Description                                                                                                                                                                                      | Label |
| ---------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| from             | `Address` | The address of the sender of the transaction.                                                                                                                                                    |       |
| to               | `Address` | The address of the contract when calling a contract.                                                                                                                                             |       |
| ref_block_number | [int64]          | The height of the referenced block hash.                                                                                                                                                         |       |
| ref_block_prefix | `bytes`          | The first four bytes of the referenced block hash.                                                                                                                                               |       |
| method_name      | `string`        | The name of a method in the smart contract at the To address.                                                                                                                                    |       |
| params           | `bytes`          | The parameters to pass to the smart contract method.                                                                                                                                             |       |
| signature        | `bytes`          | When signing a transaction it’s actually a subset of the fields: from/to and the target method as well as the parameter that were given. It also contains the reference block number and prefix. |       |

### aelf.TransactionExecutingStateSet

| Field   | Type                                                                                         | Description         | Label    |
| ------- | -------------------------------------------------------------------------------------------- | ------------------- | -------- |
| writes  | [TransactionExecutingStateSet.WritesEntry](#aelf.TransactionExecutingStateSet.WritesEntry)   | The changed states. | repeated |
| reads   | [TransactionExecutingStateSet.ReadsEntry](#aelf.TransactionExecutingStateSet.ReadsEntry)     | The read states.    | repeated |
| deletes | [TransactionExecutingStateSet.DeletesEntry](#aelf.TransactionExecutingStateSet.DeletesEntry) | The deleted states. | repeated |

### aelf.TransactionExecutingStateSet.DeletesEntry

| Field | Type              | Description | Label |
| ----- | ----------------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `bool`     |             |       |

### aelf.TransactionExecutingStateSet.ReadsEntry

| Field | Type              | Description | Label |
| ----- | ----------------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `bool`     |             |       |

### aelf.TransactionExecutingStateSet.WritesEntry

| Field | Type              | Description | Label |
| ----- | ----------------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `bytes`   |             |       |

### aelf.TransactionResult

| Field          | Type                                                     | Description                                                                                                                                                                                                                                                              | Label    |
| -------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| transaction_id | `Hash`                                      | The transaction id.                                                                                                                                                                                                                                                      |          |
| status         | `TransactionResultStatus | The transaction result status.                                                                                                                                                                                                                                           |          |
| logs           | `LogEvent`                               | The log events.                                                                                                                                                                                                                                                          | repeated |
| bloom          | `bytes`                                          | Bloom filter for transaction logs. A transaction log event can be defined in the contract and stored in the bloom filter after the transaction is executed. Through this filter, we can quickly search for and determine whether a log exists in the transaction result. |          |
| return_value   | `bytes`                                          | The return value of the transaction execution.                                                                                                                                                                                                                           |          |
| block_number   | `int64`                                          | The height of the block that packages the transaction.                                                                                                                                                                                                                   |          |
| block_hash     | `Hash`                                       | The hash of the block that packages the transaction.                                                                                                                                                                                                                     |          |
| error          | `string`                                        | Failed execution error message.                                                                                                                                                                                                                                          |          |

### aelf.TransactionResultStatus

| Name                   | Number | Description                                                                       |
| ---------------------- | ------ | --------------------------------------------------------------------------------- |
| NOT_EXISTED            | 0      | The execution result of the transaction does not exist.                           |
| PENDING                | 1      | The transaction is in the transaction pool waiting to be packaged.                |
| FAILED                 | 2      | Transaction execution failed.                                                     |
| MINED                  | 3      | The transaction was successfully executed and successfully packaged into a block. |
| CONFLICT               | 4      | When executed in parallel, there are conflicts with other transactions.           |
| PENDING_VALIDATION     | 5      | The transaction is waiting for validation.                                        |
| NODE_VALIDATION_FAILED | 6      | Transaction validation failed.                                                    |

## AuthorityInfo

| Field            | Type                          | Description                               | Label |
| ---------------- | ----------------------------- | ----------------------------------------- | ----- |
| contract_address | `aelf.Address` | The contract address of the controller.   |       |
| owner_address    | `aelf.Address` | The address of the owner of the contract. |       |
