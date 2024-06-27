---
sidebar_position: 6
title: Genesis Contract
---

# Genesis Contract

Used to manage the deployment and update of contracts. Implement aelf Standards ACS0 and ACS1.

## Contract Methods

| Method Name                                    | Request Type                                        | Response Type           | Description                                                 |
| ---------------------------------------------- | --------------------------------------------------- | ----------------------- | ----------------------------------------------------------- |
| Initialize                                     | `Zero.InitializeInput`                              | `google.protobuf.Empty` | Initializes the genesis contract.                           |
| SetInitialControllerAddress                    | `aelf.Address`                                      | `google.protobuf.Empty` | Sets the initial controller address.                        |
| ChangeContractDeploymentController             | `AuthorityInfo`                                     | `google.protobuf.Empty` | Modifies the contract deployment controller authority.      |
| ChangeCodeCheckController                      | `AuthorityInfo`                                     | `google.protobuf.Empty` | Modifies the contract code check controller authority.      |
| GetContractDeploymentController                | `google.protobuf.Empty`                             | `AuthorityInfo`         | Queries the ContractDeploymentController authority info.    |
| GetCodeCheckController                         | `google.protobuf.Empty`                             | `AuthorityInfo`         | Queries the CodeCheckController authority info.             |
| SetContractProposalExpirationTimePeriod        | `Zero.SetContractProposalExpirationTimePeriodInput` | `google.protobuf.Empty` | Sets expiration time for contract proposals.                |
| GetCurrentContractProposalExpirationTimePeriod | `google.protobuf.Empty`                             | `int32`                 | Gets the expiration time for the current contract proposal. |

## AElf.Standards.ACS0

### Contract Methods

| Method Name                            | Request Type                              | Response Type                        | Description                                               |
| -------------------------------------- | ----------------------------------------- | ------------------------------------ | --------------------------------------------------------- |
| DeploySystemSmartContract              | `acs0.SystemContractDeploymentInput`      | `aelf.Address`                       | Deploys a system smart contract and returns the address.  |
| DeploySmartContract                    | `acs0.ContractDeploymentInput`            | `aelf.Address`                       | Deploys a smart contract and returns the address.         |
| UpdateSmartContract                    | `acs0.ContractUpdateInput`                | `aelf.Address`                       | Updates a smart contract on chain.                        |
| ProposeNewContract                     | `acs0.ContractDeploymentInput`            | `aelf.Hash`                          | Creates a proposal to deploy a new contract.              |
| ProposeContractCodeCheck               | `acs0.ContractCodeCheckInput`             | `aelf.Hash`                          | Creates a proposal to check the code of a contract.       |
| ProposeUpdateContract                  | `acs0.ContractUpdateInput`                | `aelf.Hash`                          | Creates a proposal to update a contract.                  |
| ReleaseApprovedContract                | `acs0.ReleaseContractInput`               | `google.protobuf.Empty`              | Releases an approved contract proposal.                   |
| ReleaseCodeCheckedContract             | `acs0.ReleaseContractInput`               | `google.protobuf.Empty`              | Releases a code-checked contract proposal.                |
| ValidateSystemContractAddress          | `acs0.ValidateSystemContractAddressInput` | `google.protobuf.Empty`              | Validates the existence of an input system contract.      |
| SetContractProposerRequiredState       | `google.protobuf.BoolValue`               | `google.protobuf.Empty`              | Sets authority of contract deployment.                    |
| CurrentContractSerialNumber            | `google.protobuf.Empty`                   | `google.protobuf.Int64Value`         | Gets the current serial number of the genesis contract.   |
| GetContractInfo                        | `aelf.Address`                            | `acs0.ContractInfo`                  | Gets detailed information about a contract.               |
| GetContractAuthor                      | `aelf.Address`                            | `aelf.Address`                       | Gets the author of a contract.                            |
| GetContractHash                        | `aelf.Address`                            | `aelf.Hash`                          | Gets the code hash of a contract.                         |
| GetContractAddressByName               | `aelf.Hash`                               | `aelf.Address`                       | Gets the address of a system contract by its name.        |
| GetSmartContractRegistrationByAddress  | `aelf.Address`                            | `aelf.SmartContractRegistration`     | Gets the registration of a smart contract by its address. |
| GetSmartContractRegistrationByCodeHash | `aelf.Hash`                               | `aelf.SmartContractRegistration`     | Gets the registration of a smart contract by code hash.   |
| DeployUserSmartContract                | `acs0.UserContractDeploymentInput`        | `acs0.DeployUserSmartContractOutput` | Deploys a user smart contract and returns the code hash.  |
| UpdateUserSmartContract                | `acs0.UserContractUpdateInput`            | `google.protobuf.Empty`              | Updates a user smart contract on chain.                   |
| ReleaseApprovedUserSmartContract       | `acs0.ReleaseContractInput`               | `google.protobuf.Empty`              | Releases an approved user smart contract proposal.        |
| PerformDeployUserSmartContract         | `acs0.UserContractDeploymentInput`        | `aelf.Address`                       | Performs user contract deployment.                        |
| PerformUpdateUserSmartContract         | `acs0.UserContractUpdateInput`            | `google.protobuf.Empty`              | Performs user contract update.                            |
| SetContractAuthor                      | `acs0.SetContractAuthorInput`             | `google.protobuf.Empty`              | Sets the author of a contract.                            |
| SetSigner                              | `aelf.Address`                            | `google.protobuf.Empty`              | Sets proxy signer for contract deployment/update.         |
| RemoveSigner                           | `google.protobuf.Empty`                   | `google.protobuf.Empty`              | Removes proxy signer for contract deployment/update.      |
| GetSigner                              | `aelf.Address`                            | `aelf.Address`                       | Queries signer of specified address.                      |

## AElf.Standards.ACS1

| Method Name               | Request Type                  | Response Type           | Description                                    |
| ------------------------- | ----------------------------- | ----------------------- | ---------------------------------------------- |
| SetMethodFee              | `acs1.MethodFees`             | `google.protobuf.Empty` | Sets method fees for the specified method.     |
| ChangeMethodFeeController | `AuthorityInfo`               | `google.protobuf.Empty` | Changes the method fee controller.             |
| GetMethodFee              | `google.protobuf.StringValue` | `acs1.MethodFees`       | Queries method fee information by method name. |
| GetMethodFeeController    | `google.protobuf.Empty`       | `AuthorityInfo`         | Queries the method fee controller.             |

 **Contract Types**

## AElf.Contracts.Genesis

### Zero.ContractProposingInput

| Field        | Type                           | Description                                             | Label |
| ------------ | ------------------------------ | ------------------------------------------------------- | ----- |
| proposer     | `aelf.Address`                 | The address of proposer for contract deployment/update. |       |
| status       | `ContractProposingInputStatus` | The status of proposal.                                 |       |
| expired_time | `google.protobuf.Timestamp`    | The expiration time of proposal.                        |       |

### Zero.InitializeInput

| Field                                  | Type   | Description                                            | Label |
| -------------------------------------- | ------ | ------------------------------------------------------ | ----- |
| contract_deployment_authority_required | `bool` | Whether contract deployment/update requires authority. |       |

### Zero.ContractProposingInputStatus

| Name                | Number | Description                         |
| ------------------- | ------ | ----------------------------------- |
| PROPOSED            | 0      | Proposal is proposed.               |
| APPROVED            | 1      | Proposal is approved by parliament. |
| CODE_CHECK_PROPOSED | 2      | Code check is proposed.             |
| CODE_CHECKED        | 3      | Passed code checks.                 |

### Zero.SetContractProposalExpirationTimePeriodInput

| Field                  | Type    | Description                   | Label |
| ---------------------- | ------- | ----------------------------- | ----- |
| expiration_time_period | `int32` | The period of expiration time |       |

## AElf.Standards.ACS0

### acs0.AuthorUpdated

| Field                 | Type           | Description                                       | Label |
| --------------------- | -------------- | ------------------------------------------------- | ----- |
| address               | `aelf.address` | The byte array of the contract code.              |       |
| old_author            | `aelf.address` | The category of contract code (0: C#).            |       |
| CrossChainCreateToken | `aelf.address` | Indicates if the contract is the system contract. |       |

### acs0.CodeCheckRequired

| Field                        | Type        | Description                                       | Label |
| ---------------------------- | ----------- | ------------------------------------------------- | ----- |
| code                         | `bytes`     | The byte array of the contract code.              |       |
| proposed_contract_input_hash | `aelf.Hash` | The id of the proposed contract.                  |       |
| category                     | `sint32`    | The category of contract code (0: C#).            |       |
| is_system_contract           | `bool`      | Indicates if the contract is the system contract. |       |
| is_user_contract             | `bool`      | Indicates if the contract is the user contract.   |       |

### acs0.CodeUpdated

| Field         | Type           | Description                              | Label |
| ------------- | -------------- | ---------------------------------------- | ----- |
| address       | `aelf.Address` | The address of the updated contract.     |       |
| old_code_hash | `aelf.Hash`    | The byte array of the old contract code. |       |
| new_code_hash | `aelf.Hash`    | The byte array of the new contract code. |       |
| version       | `int32`        | The version of the current contract.     |       |

### acs0.ContractCodeCheckInput

| Field                        | Type        | Description                                                                            | Label |
| ---------------------------- | ----------- | -------------------------------------------------------------------------------------- | ----- |
| contract_input               | `bytes`     | The byte array of the contract code to be checked.                                     |       |
| is_contract_deployment       | `bool`      | Whether the input contract is to be deployed or updated.                               |       |
| code_check_release_method    | `string`    | Method to call after code check complete (DeploySmartContract or UpdateSmartContract). |       |
| proposed_contract_input_hash | `aelf.Hash` | The id of the proposed contract.                                                       |       |
| category                     | `sint32`    | The category of contract code (0: C#).                                                 |       |
| is_system_contract           | `bool`      | Indicates if the contract is the system contract.                                      |       |

### acs0.ContractDeployed

| Field            | Type           | Description                                                | Label |
| ---------------- | -------------- | ---------------------------------------------------------- | ----- |
| author           | `aelf.Address` | The author of the contract.                                |       |
| code_hash        | `aelf.Hash`    | The hash of the contract code.                             |       |
| address          | `aelf.Address` | The address of the contract.                               |       |
| version          | `int32`        | The version of the current contract.                       |       |
| name             | `aelf.Hash`    | The name of the contract.                                  |       |
| contract_version | `string`       | The version of the current contract.                       |       |
| deployer         | `aelf.Address` | The actual address that initiated the contract deployment. |       |

### acs0.ContractDeploymentInput

| Field              | Type                     | Description                                     | Label |
| ------------------ | ------------------------ | ----------------------------------------------- | ----- |
| category           | `sint32`                 | The category of contract code (0: C#).          |       |
| code               | `bytes`                  | The byte array of the contract code.            |       |
| contract_operation | `acs0.ContractOperation` | The information needed for contract deployment. |       |

### acs0.ContractInfo

| Field              | Type           | Description                                                | Label |
| ------------------ | -------------- | ---------------------------------------------------------- | ----- |
| serial_number      | `int64`        | The serial number of the contract.                         |       |
| author             | `aelf.Address` | The author of the contract.                                |       |
| category           | `sint32`       | The category of contract code (0: C#).                     |       |
| code_hash          | `aelf.Hash`    | The hash of the contract code.                             |       |
| is_system_contract | `bool`         | Whether it is a system contract.                           |       |
| version            | `int32`        | The version of the current contract.                       |       |
| contract_version   | `string`       | The version of the current contract.                       |       |
| is_user_contract   | `bool`         | Indicates if the contract is the user contract.            |       |
| deployer           | `aelf.Address` | The actual address that initiated the contract deployment. |       |

### acs0.ContractProposed

| Field                        | Type        | Description                      | Label |
| ---------------------------- | ----------- | -------------------------------- | ----- |
| proposed_contract_input_hash | `aelf.Hash` | The id of the proposed contract. |       |

### acs0.ContractUpdateInput

| Field              | Type                      | Description                                    | Label |
| ------------------ | ------------------------- | ---------------------------------------------- | ----- |
| address            | `aelf.Address    `        | The contract address that needs to be updated. |       |
| code               | `bytes    `               | The byte array of the new contract code.       |       |
| contract_operation | `acs0.ContractOperation ` | The information needed for contract update.    |       |

### acs0.UserContractUpdateInput

| Field   | Type               | Description                                         | Label |
| ------- | ------------------ | --------------------------------------------------- | ----- |
| address | `aelf.Address    ` | The user contract address that needs to be updated. |       |
| code    | `bytes    `        | The byte array of the new user contract code.       |       |

### acs0.ReleaseContractInput

| Field                        | Type            | Description                      | Label |
| ---------------------------- | --------------- | -------------------------------- | ----- |
| proposal_id                  | `aelf.Hash    ` | The hash of the proposal.        |       |
| proposed_contract_input_hash | `aelf.Hash    ` | The id of the proposed contract. |       |

### acs0.SystemContractDeploymentInput

| Field                        | Type                                                             | Description                                                                                                           | Label |
| ---------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----- |
| category                     | `sint32    `                                                     | The category of contract code(0: C#).                                                                                 |       |
| code                         | `bytes    `                                                      | The byte array of the contract code.                                                                                  |       |
| name                         | `aelf.Hash    `                                                  | The name of the contract. It has to be unique.                                                                        |       |
| transaction_method_call_list | `SystemContractDeploymentInput.SystemTransactionMethodCallList ` | An initial list of transactions for the system contract, which is executed in sequence when the contract is deployed. |       |

### acs0.SystemContractDeploymentInput.SystemTransactionMethodCall

| Field       | Type         | Description                              | Label |
| ----------- | ------------ | ---------------------------------------- | ----- |
| method_name | `string    ` | The method name of system transaction.   |       |
| params      | `bytes    `  | The params of system transaction method. |       |

### acs0.SystemContractDeploymentInput.SystemTransactionMethodCallList

| Field | Type                                                         | Description                      | Label    |
| ----- | ------------------------------------------------------------ | -------------------------------- | -------- |
| value | `SystemContractDeploymentInput.SystemTransactionMethodCall ` | The list of system transactions. | repeated |

### acs0.ValidateSystemContractAddressInput

| Field                     | Type               | Description                    | Label |
| ------------------------- | ------------------ | ------------------------------ | ----- |
| system_contract_hash_name | `aelf.Hash    `    | The name hash of the contract. |       |
| address                   | `aelf.Address    ` | The address of the contract.   |       |

### acs0.DeployUserSmartContractOutput

| Field     | Type            | Description                                 | Label |
| --------- | --------------- | ------------------------------------------- | ----- |
| code_hash | `aelf.Hash    ` | The deployed or updated contract code hash. |       |

### acs0.SetContractAuthorInput

| Field            | Type               | Description                                        | Label |
| ---------------- | ------------------ | -------------------------------------------------- | ----- |
| contract_address | `aelf.Address    ` | The author's contract address needs to be updated. |       |
| new_author       | `aelf.Address    ` | The new contract author.                           |       |

### acs0.ContractOperation

| Field     | Type               | Description                                                     | Label |
| --------- | ------------------ | --------------------------------------------------------------- | ----- |
| chain_id  | `int32    `        | The ID of the chain where the contract is deployed/updated.     |       |
| code_hash | `aelf.Hash    `    | The hash of the contract code.                                  |       |
| deployer  | `aelf.Address    ` | The actual address that initiates the contract deployment.      |       |
| salt      | `aelf.Hash    `    | The hash based on which the user contract address is generated. |       |
| version   | `int32    `        | The version of the deployed/updated contract.                   |       |
| signature | `bytes    `        | The signature for deployer verification.                        |       |

### acs0.UserContractDeploymentInput

| Field    | Type            | Description                                                 | Label |
| -------- | --------------- | ----------------------------------------------------------- | ----- |
| category | `sint32    `    | The category of contract code(0: C#).                       |       |
| code     | `bytes    `     | The byte array of the contract code.                        |       |
| salt     | `aelf.Hash    ` | The hash based on which user contract address is generated. |       |

## AElf.Standards.ACS1

### acs1.MethodFee

| Field     | Type     | Description                         | Label |
| --------- | -------- | ----------------------------------- | ----- |
| symbol    | `string` | The token symbol of the method fee. |       |
| basic_fee | `int64`  | The amount of fees to be charged.   |       |

### acs1.MethodFees

| Field            | Type               | Description                                                  | Label    |
| ---------------- | ------------------ | ------------------------------------------------------------ | -------- |
| method_name      | `string`           | The name of the method to be charged.                        |          |
| fees             | `MethodFee` (List) | List of fees to be charged.                                  | repeated |
| is_size_fee_free | `bool`             | Optional based on the implementation of SetMethodFee method. |          |

## AElf.Types

### aelf.Address

| Field | Type    | Description | Label |
| ----- | ------- | ----------- | ----- |
| value | `bytes` |             |       |

### aelf.BinaryMerkleTree

| Field      | Type          | Description             | Label    |
| ---------- | ------------- | ----------------------- | -------- |
| nodes      | `Hash` (List) | The leaf nodes.         | repeated |
| root       | `Hash`        | The root node hash.     |          |
| leaf_count | `int32`       | The count of leaf node. |          |

### aelf.Hash

| Field | Type    | Description | Label |
| ----- | ------- | ----------- | ----- |
| value | `bytes` |             |       |

### aelf.LogEvent

| Field       | Type           | Description                | Label    |
| ----------- | -------------- | -------------------------- | -------- |
| address     | `Address`      | The contract address.      |          |
| name        | `string`       | The name of the log event. |          |
| indexed     | `bytes` (List) | The indexed data.          | repeated |
| non_indexed | `bytes`        | The non indexed data.      |          |

### aelf.MerklePath

| Field             | Type                    | Description            | Label    |
| ----------------- | ----------------------- | ---------------------- | -------- |
| merkle_path_nodes | `MerklePathNode` (List) | The merkle path nodes. | repeated |

### aelf.MerklePathNode

| Field              | Type   | Description                      | Label |
| ------------------ | ------ | -------------------------------- | ----- |
| hash               | `Hash` | The node hash.                   |       |
| is_left_child_node | `bool` | Whether it is a left child node. |       |

### aelf.SInt32Value

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| value | `sint32` |             |       |

### aelf.SInt64Value

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| value | `sint64` |             |       |

### aelf.ScopedStatePath

| Field   | Type        | Description                                            | Label |
| ------- | ----------- | ------------------------------------------------------ | ----- |
| address | `Address`   | The scope address, which will be the contract address. |       |
| path    | `StatePath` | The path of contract state.                            |       |

### aelf.SmartContractRegistration

| Field              | Type     | Description                           | Label |
| ------------------ | -------- | ------------------------------------- | ----- |
| category           | `sint32` | The category of contract code(0: C#). |       |
| code               | `bytes`  | The byte array of the contract code.  |       |
| code_hash          | `Hash`   | The hash of the contract code.        |       |
| is_system_contract | `bool`   | Whether it is a system contract.      |       |
| version            | `int32`  | The version of the current contract.  |       |

### aelf.StatePath

| Field | Type            | Description                         | Label    |
| ----- | --------------- | ----------------------------------- | -------- |
| parts | `string` (List) | The partial path of the state path. | repeated |

### aelf.Transaction

| Field            | Type           | Description                                                                                                                      | Label |
| ---------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----- |
| from             | `aelf.Address` | The address of the sender of the transaction.                                                                                    |       |
| to               | `aelf.Address` | The address of the contract when calling a contract.                                                                             |       |
| ref_block_number | `int64`        | The height of the referenced block hash.                                                                                         |       |
| ref_block_prefix | `bytes`        | The first four bytes of the referenced block hash.                                                                               |       |
| method_name      | `string`       | The name of a method in the smart contract at the To address.                                                                    |       |
| params           | `bytes`        | The parameters to pass to the smart contract method.                                                                             |       |
| signature        | `bytes`        | When signing a transaction, it's a subset of the fields: from/to and the target method as well as the parameter that were given. |       |

### aelf.TransactionExecutingStateSet

| Field   | Type                                                                                                       | Description         | Label    |
| ------- | ---------------------------------------------------------------------------------------------------------- | ------------------- | -------- |
| writes  | `TransactionExecutingStateSet.WritesEntry` ([see details](#aelftransactionexecutingstatesetwritesentry))   | The changed states. | repeated |
| reads   | `TransactionExecutingStateSet.ReadsEntry` ([see details](#aelftransactionexecutingstatesetreadsentry))     | The read states.    | repeated |
| deletes | `TransactionExecutingStateSet.DeletesEntry` ([see details](#aelftransactionexecutingstatesetdeletesentry)) | The deleted states. | repeated |

### aelf.TransactionExecutingStateSet.DeletesEntry

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `bool`   |             |       |

### aelf.TransactionExecutingStateSet.ReadsEntry

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `bool`   |             |       |

### aelf.TransactionExecutingStateSet.WritesEntry

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `bytes`  |             |       |

### aelf.TransactionResult

| Field          | Type                      | Description                                                                                                                                                 | Label    |
| -------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| transaction_id | `aelf.Hash`               | The transaction id.                                                                                                                                         |          |
| status         | `TransactionResultStatus` | The transaction result status.                                                                                                                              |          |
| logs           | `aelf.LogEvent` (List)    | The log events.                                                                                                                                             | repeated |
| bloom          | `bytes`                   | Bloom filter for transaction logs. A transaction log event can be defined in the contract and stored in the bloom filter after the transaction is executed. |          |
| return_value   | `bytes`                   | The return value of the transaction execution.                                                                                                              |          |
| block_number   | `int64`                   | The height of the block that packages the transaction.                                                                                                      |          |
| block_hash     | `aelf.Hash`               | The hash of the block that packages the transaction.                                                                                                        |          |
| error          | `string`                  | Failed execution error message.                                                                                                                             |          |

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

| Field            | Type           | Description                               | Label |
| ---------------- | -------------- | ----------------------------------------- | ----- |
| contract_address | `aelf.Address` | The contract address of the controller.   |       |
| owner_address    | `aelf.Address` | The address of the owner of the contract. |       |
