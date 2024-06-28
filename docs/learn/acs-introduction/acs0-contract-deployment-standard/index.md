---
sidebar_position: 0
title: ACS0 - Contract Deployment Standard
description: ACS0 manages contract deployment and updates.
---

# ACS0 - Contract Deployment Standard

ACS0 manages contract deployment and updates.

## Interface

Contracts using ACS0 need to implement these methods:

### Methods

| Method Name                        | Request                             | Response                          | Description                                      |
|------------------------------------|-------------------------------------|-----------------------------------|--------------------------------------------------|
| DeploySystemSmartContract          | `acs0.SystemContractDeploymentInput`| `aelf.Address`                    | Deploys a system smart contract and returns its address. |
| DeploySmartContract                | `acs0.ContractDeploymentInput`      | `aelf.Address`                    | Deploys a smart contract and returns its address. |
| UpdateSmartContract                | `acs0.ContractUpdateInput`          | `aelf.Address`                    | Updates a smart contract.                        |
| ProposeNewContract                 | `acs0.ContractDeploymentInput`      | `aelf.Hash`                       | Creates a proposal to deploy a new contract and returns its ID. |
| ProposeContractCodeCheck           | `acs0.ContractCodeCheckInput`       | `aelf.Hash`                       | Creates a proposal to check contract code and returns its ID. |
| ProposeUpdateContract              | `acs0.ContractUpdateInput`          | `aelf.Hash`                       | Creates a proposal to update a contract and returns its ID. |
| ReleaseApprovedContract            | `acs0.ReleaseContractInput`         | `google.protobuf.Empty`           | Releases an approved contract proposal.          |
| ReleaseCodeCheckedContract         | `acs0.ReleaseContractInput`         | `google.protobuf.Empty`           | Releases a proposal that passed the code check.  |
| ValidateSystemContractAddress      | `acs0.ValidateSystemContractAddressInput` | `google.protobuf.Empty`     | Validates if the input system contract exists.   |
| SetContractProposerRequiredState   | `google.protobuf.BoolValue`         | `google.protobuf.Empty`           | Sets contract deployment authority.              |
| CurrentContractSerialNumber        | `google.protobuf.Empty`             | `google.protobuf.Int64Value`      | Gets the current serial number of the genesis contract. |
| GetContractInfo                    | `aelf.Address`                      | `acs0.ContractInfo`               | Gets information about a contract.               |
| GetContractAuthor                  | `aelf.Address`                      | `aelf.Address`                    | Gets the author of a contract.                   |
| GetContractHash                    | `aelf.Address`                      | `aelf.Hash`                       | Gets the code hash of a contract by address.     |
| GetContractAddressByName           | `aelf.Hash`                         | `aelf.Address`                    | Gets the address of a system contract by name.   |
| GetSmartContractRegistrationByAddress | `aelf.Address`                   | `aelf.SmartContractRegistration`  | Gets the registration of a smart contract by address. |
| GetSmartContractRegistrationByCodeHash | `aelf.Hash`                     | `aelf.SmartContractRegistration`  | Gets the registration of a smart contract by code hash. |
| DeployUserSmartContract            | `acs0.ContractDeploymentInput`      | `acs0.DeployUserSmartContractOutput` | Deploys a user smart contract and returns the contract code hash. |
| UpdateUserSmartContract            | `acs0.ContractUpdateInput`          | `google.protobuf.Empty`           | Updates a user smart contract.                   |
| ReleaseApprovedUserSmartContract   | `acs0.ReleaseContractInput`         | `google.protobuf.Empty`           | Releases a proposal that passed the code check.  |
| PerformDeployUserSmartContract     | `acs0.ContractDeploymentInput`      | `aelf.Address`                    | Deploys a user contract.                         |
| PerformUpdateUserSmartContract     | `acs0.ContractUpdateInput`          | `google.protobuf.Empty`           | Updates a user contract.                         |
| SetContractAuthor                  | `acs0.SetContractAuthorInput`       | `google.protobuf.Empty`           | Sets the author of a contract.                   |

### Types

#### acs0.AuthorUpdated

| Field        | Type         | Description                      |
|--------------|--------------|----------------------------------|
| `address`    | `aelf.address` | Contract code byte array.        |
| `old_author` | `aelf.address` | Contract code category (0: C#). |

#### acs0.CodeCheckRequired

| Field                         | Type         | Description                    |
|-------------------------------|--------------|--------------------------------|
| `code`                        | `bytes`      | Contract code byte array.      |
| `proposed_contract_input_hash`| `aelf.Hash`  | Proposed contract ID.          |
| `category`                    | `sint32`     | Contract code category (0: C#).|
| `is_system_contract`          | `bool`       | Is it a system contract?       |
| `is_user_contract`            | `bool`       | Is it a user contract?         |

#### acs0.CodeUpdated

| Field           | Type         | Description                    |
|-----------------|--------------|--------------------------------|
| `address`       | `aelf.Address` | Contract address.              |
| `old_code_hash` | `aelf.Hash`    | Old contract code byte array.  |
| `new_code_hash` | `aelf.Hash`    | New contract code byte array.  |
| `version`       | `int32`        | Contract version.              |

### acs0.ContractCodeCheckInput#

| Field                         | Type         | Description                                           |
|-------------------------------|--------------|-------------------------------------------------------|
| `contract_input`              | `bytes`      | Contract code byte array.                             |
| `is_contract_deployment`      | `bool`       | Is the contract being deployed or updated?            |
| `code_check_release_method`   | `string`     | Method to call after code check (DeploySmartContract or UpdateSmartContract). |
| `proposed_contract_input_hash`| `aelf.Hash`  | Proposed contract ID.                                 |
| `category`                    | `sint32`     | Contract code category (0: C#).                       |
| `is_system_contract`          | `bool`       | Is it a system contract?                              |

#### acs0.ContractDeployed

| Field               | Type         | Description                      |
|---------------------|--------------|----------------------------------|
| `author`            | `aelf.Address` | Contract author.                |
| `code_hash`         | `aelf.Hash`    | Contract code hash.             |
| `address`           | `aelf.Address` | Contract address.               |
| `version`           | `int32`        | Contract version.               |
| `name`              | `aelf.Hash`    | Contract name (must be unique). |
| `contract_version`  | `string`       | Contract version.               |

#### acs0.ContractDeploymentInput

| Field     | Type    | Description                        |
|-----------|---------|------------------------------------|
| `category`| `sint32`| Contract code category (0: C#).    |
| `code`    | `bytes` | Contract code byte array.          |

#### acs0.DeployUserSmartContractOutput

| Field      | Type       | Description                     |
|------------|------------|---------------------------------|
| `code_hash`| `aelf.Hash`| Deployed/updated contract code hash. |

#### acs0.ContractInfo

| Field              | Type         | Description                      |
|--------------------|--------------|----------------------------------|
| `serial_number`    | `int64`      | Contract serial number.          |
| `author`           | `aelf.Address` | Contract author.                |
| `category`         | `sint32`     | Contract code category (0: C#).  |
| `code_hash`        | `aelf.Hash`  | Contract code hash.              |
| `is_system_contract`| `bool`       | Is it a system contract?         |
| `version`          | `int32`      | Contract version.                |
| `contract_version` | `string`     | Contract version.                |
| `contract_type`    | `string`     | Contract type.                   |
| `deployed_by`      | `aelf.Address` | Deployer address.              |
| `deployed_on`      | `google.protobuf.Timestamp` | Deployment time.         |

#### acs0.ContractUpdateInput

| Field               | Type         | Description                      |
|---------------------|--------------|----------------------------------|
| `address`           | `aelf.Address` | Contract address.              |
| `code`              | `bytes`      | Contract code byte array.       |
| `category`          | `sint32`     | Contract code category (0: C#). |
| `is_system_contract`| `bool`       | Is it a system contract?        |
| `is_user_contract`  | `bool`       | Is it a user contract?          |

#### acs0.ReleaseContractInput

| Field       | Type       | Description                    |
|-------------|------------|--------------------------------|
| `proposal_id` | `aelf.Hash` | Proposal ID to be released. |

#### acs0.SetContractAuthorInput

| Field           | Type         | Description                      |
|-----------------|--------------|----------------------------------|
| `address`       | `aelf.Address` | Contract address.              |
| `author`        | `aelf.Address` | New author address.            |

#### acs0.SystemContractDeploymentInput

| Field           | Type         | Description                      |
|-----------------|--------------|----------------------------------|
| `category`      | `sint32`     | Contract code category (0: C#). |
| `code`          | `bytes`      | Contract code byte array.       |
| `name`          | `aelf.Hash`  | Contract name (must be unique). |

#### acs0.ValidateSystemContractAddressInput

| Field                  | Type         | Description                      |
|------------------------|--------------|----------------------------------|
| `system_contract_hash_name` | `aelf.Hash` | Contract name hash.            |
| `address`              | `aelf.Address` | Contract address.              |

#### aelf.Address

| Field     | Type    | Description                |
|-----------|---------|----------------------------|
| `value`   | `bytes` | Address value in bytes.    |

#### aelf.BinaryMerkleTree

| Field       | Type     | Description                      |
|-------------|----------|----------------------------------|
| `nodes`     | `Hash`   | Leaf nodes.                      |
| `root`      | `Hash`   | Root node hash.                  |
| `leaf_count`| `int32`  | Number of leaf nodes.            |

#### aelf.Hash

| Field     | Type    | Description                |
|-----------|---------|----------------------------|
| `value`   | `bytes` | Hash value in bytes.       |

#### aelf.LogEvent

| Field       | Type     | Description                      |
|-------------|----------|----------------------------------|
| `address`   | `Address`| Contract address.                |
| `name`      | `string` | Log event name.                  |
| `indexed`   | `bytes`  | Indexed data for bloom filter.   |
| `non_indexed`| `bytes` | Non-indexed data.                |

#### aelf.MerklePath

| Field                | Type            | Description                      |
|----------------------|-----------------|----------------------------------|
| `merkle_path_nodes`  | `MerklePathNode`| Merkle path nodes.               |

#### aelf.MerklePathNode

| Field              | Type     | Description                    |
|--------------------|----------|--------------------------------|
| `hash`             | `Hash`   | Node hash.                     |
| `is_left_child_node`| `bool`  | Is it a left child node?       |

#### aelf.SInt32Value

| Field   | Type    | Description                  |
|---------|---------|------------------------------|
| `value` | `sint32`| Signed 32-bit integer value. |

#### aelf.SInt64Value

| Field   | Type    | Description                  |
|---------|---------|------------------------------|
| `value` | `sint64`| Signed 64-bit integer value. |

#### aelf.ScopedStatePath

| Field     | Type    | Description                        |
|-----------|---------|------------------------------------|
| `address` | `Address` | Scope address (contract address). |
| `path`    | `StatePath` | Contract state path.           |

#### aelf.SmartContractRegistration

| Field              | Type     | Description                      |
|--------------------|----------|----------------------------------|
| `category`         | `sint32` | Contract code category (0: C#).  |
| `code`             | `bytes`  | Contract code byte array.        |
| `code_hash`        | `Hash`   | Contract code hash.              |
| `is_system_contract`| `bool`  | Is it a system contract?         |
| `version`          | `int32`  | Contract version.                |

#### aelf.StatePath

| Field   | Type    | Description                          |
|---------|---------|--------------------------------------|
| `parts` | `string`| State path parts.                    |

#### aelf.Transaction

| Field            | Type         | Description                        |
|------------------|--------------|------------------------------------|
| `from`           | `Address`    | Sender address.                    |
| `to`             | `Address`    | Contract address.                  |
| `ref_block_number`| `int64`     | Referenced block height.           |
| `ref_block_prefix`| `bytes`     | Referenced block hash prefix.      |
| `method_name`    | `string`     | Smart contract method name.        |
| `params`         | `bytes`      | Smart contract method parameters.  |
| `signature`      | `bytes`      | Transaction signature.             |

#### aelf.TransactionExecutingStateSet

| Field   | Type                             | Description                     |
|---------|----------------------------------|---------------------------------|
| `writes`| `TransactionExecutingStateSet.WritesEntry`| Changed states.             |
| `reads` | `TransactionExecutingStateSet.ReadsEntry` | Read states.                |
| `deletes`| `TransactionExecutingStateSet.DeletesEntry` | Deleted states.            |

#### aelf.TransactionExecutingStateSet.DeletesEntry

| Field   | Type    | Description               |
|---------|---------|---------------------------|
| `key`   | `string`| State key.                |
| `value` | `bool`  | Deletion state (true/false).|

#### aelf.TransactionExecutingStateSet.ReadsEntry

| Field   | Type    | Description               |
|---------|---------|---------------------------|
| `key`   | `string`| State key.                |
| `value` | `bool`  | Read state (true/false).  |

#### aelf.TransactionExecutingStateSet.WritesEntry

| Field   | Type    | Description               |
|---------|---------|---------------------------|
| `key`   | `string`| State key.                |
| `value` | `bytes` | Written state value.      |

#### aelf.TransactionResult

| Field           | Type         | Description                        |
|-----------------|--------------|------------------------------------|
| `transaction_id`| `Hash`       | Transaction ID.                    |
| `status`        | `TransactionResultStatus` | Transaction result status.  |
| `logs`          | `LogEvent`   | Log events.                        |
| `bloom`         | `bytes`      | Bloom filter for logs.             |
| `return_value`  | `bytes`      | Transaction execution return value.|
| `block_number`  | `int64`      | Block height.                      |
| `block_hash`    | `Hash`       | Block hash.                        |
| `error`         | `string`     | Error message.                     |

#### aelf.TransactionResultStatus

| Name                   | Value | Description                                             |
|------------------------|-------|---------------------------------------------------------|
| `NOT_EXISTED`          | 0     | Transaction result does not exist.                      |
| `PENDING`              | 1     | Transaction in pool waiting to be packaged.             |
| `FAILED`               | 2     | Transaction execution failed.                           |
| `MINED`                | 3     | Transaction successfully executed and packaged.         |
| `CONFLICT`             | 4     | Conflicts with other transactions during parallel execution.|
| `PENDING_VALIDATION`   | 5     | Waiting for validation.                                 |
| `NODE_VALIDATION_FAILED`| 6    | Validation failed.                                      |

## Example

ACS0 defines methods for contract deployment and updates. aelf provides the Genesis Contract as an implementation of ACS0.