ACS0 - Contract Deployment Standard
===================================

ACS0 is used to manage the deployment and update of contracts.

Interface
---------

The contract inherited from ACS0 needs to implement the following interfaces:

Methods
~~~~~~~

| Method Name                          | Request Type                                                              | Response Type                                | Description                                                                                                                      |
|--------------------------------------|---------------------------------------------------------------------------|----------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
| DeploySystemSmartContract            | `acs0.SystemContractDeploymentInput <#acs0.SystemContractDeploymentInput>` | `aelf.Address <#aelf.Address>`               | Deploy a system smart contract on chain and return the address of the system contract deployed.                                  |
| DeploySmartContract                  | `acs0.ContractDeploymentInput <#acs0.ContractDeploymentInput>`             | `aelf.Address <#aelf.Address>`               | Deploy a smart contract on chain and return the address of the contract deployed.                                                |
| UpdateSmartContract                  | `acs0.ContractUpdateInput <#acs0.ContractUpdateInput>`                     | `aelf.Address <#aelf.Address>`               | Update a smart contract on chain.                                                                                                |
| ProposeNewContract                   | `acs0.ContractDeploymentInput <#acs0.ContractDeploymentInput>`             | `aelf.Hash <#aelf.Hash>`                     | Create a proposal to deploy a new contract and returns the id of the proposed contract.                                          |
| ProposeContractCodeCheck             | `acs0.ContractCodeCheckInput <#acs0.ContractCodeCheckInput>`               | `aelf.Hash <#aelf.Hash>`                     | Create a proposal to check the code of a contract and return the id of the proposed contract.                                    |
| ProposeUpdateContract                | `acs0.ContractUpdateInput <#acs0.ContractUpdateInput>`                     | `aelf.Hash <#aelf.Hash>`                     | Create a proposal to update the specified contract and return the id of the proposed contract.                                   |
| ReleaseApprovedContract              | `acs0.ReleaseContractInput <#acs0.ReleaseContractInput>`                   | `google.protobuf.Empty <#google.protobuf.Empty>` | Release the contract proposal which has been approved.                                                                           |
| ReleaseCodeCheckedContract           | `acs0.ReleaseContractInput <#acs0.ReleaseContractInput>`                   | `google.protobuf.Empty <#google.protobuf.Empty>` | Release the proposal which has passed the code check.                                                                            |
| ValidateSystemContractAddress        | `acs0.ValidateSystemContractAddressInput <#acs0.ValidateSystemContractAddressInput>` | `google.protobuf.Empty <#google.protobuf.Empty>` | Validate whether the input system contract exists.                                                                               |
| SetContractProposerRequiredState     | `google.protobuf.BoolValue <#google.protobuf.BoolValue>`                   | `google.protobuf.Empty <#google.protobuf.Empty>` | Set authority of contract deployment.                                                                                            |
| CurrentContractSerialNumber          | `google.protobuf.Empty <#google.protobuf.Empty>`                           | `google.protobuf.Int64Value <#google.protobuf.Int64Value>` | Get the current serial number of genesis contract (corresponds to the serial number that will be given to the next deployed contract). |
| GetContractInfo                      | `aelf.Address <#aelf.Address>`                                             | `acs0.ContractInfo <#acs0.ContractInfo>`      | Get detailed information about the specified contract.                                                                           |
| GetContractAuthor                    | `aelf.Address <#aelf.Address>`                                             | `aelf.Address <#aelf.Address>`                | Get author of the specified contract.                                                                                            |
| GetContractHash                      | `aelf.Address <#aelf.Address>`                                             | `aelf.Hash <#aelf.Hash>`                      | Get the code hash of the contract about the specified address.                                                                   |
| GetContractAddressByName             | `aelf.Hash <#aelf.Hash>`                                                   | `aelf.Address <#aelf.Address>`                | Get the address of a system contract by its name.                                                                                |
| GetSmartContractRegistrationByAddress| `aelf.Address <#aelf.Address>`                                             | `aelf.SmartContractRegistration <#aelf.SmartContractRegistration>` | Get the registration of a smart contract by its address.                                                                         |
| GetSmartContractRegistrationByCodeHash | `aelf.Hash <#aelf.Hash>`                                                  | `aelf.SmartContractRegistration <#aelf.SmartContractRegistration>` | Get the registration of a smart contract by code hash.                                                                           |
| DeployUserSmartContract              | `acs0.ContractDeploymentInput <#acs0.ContractDeploymentInput>`             | `acs0.DeployUserSmartContractOutput <#acs0.DeployUserSmartContractOutput>` | Deploy a user smart contract on chain and return the hash of the contract code.                                                  |
| UpdateUserSmartContract              | `acs0.ContractUpdateInput <#acs0.ContractUpdateInput>`                     | `google.protobuf.Empty <#google.protobuf.Empty>` | Update a user smart contract on chain.                                                                                           |
| ReleaseApprovedUserSmartContract     | `acs0.ReleaseContractInput <#acs0.ReleaseContractInput>`                   | `google.protobuf.Empty <#google.protobuf.Empty>` | Release the proposal which has passed the code check.                                                                            |
| PerformDeployUserSmartContract       | `acs0.ContractDeploymentInput <#acs0.ContractDeploymentInput>`             | `aelf.Address <#aelf.Address>`                | Perform user contract deployment.                                                                                                |
| PerformUpdateUserSmartContract       | `acs0.ContractUpdateInput <#acs0.ContractUpdateInput>`                     | `google.protobuf.Empty <#google.protobuf.Empty>` | Perform user contract update.                                                                                                    |
| SetContractAuthor                    | `acs0.SetContractAuthorInput <#acs0.SetContractAuthorInput>`               | `google.protobuf.Empty <#google.protobuf.Empty>` | Set author of the specified contract.                                                                                            |

Types
~~~~~

<div id="acs0.AuthorUpdated"></div>

acs0.AuthorUpdated 
'''''''''''''''''''

| Field       | Type                              | Description                                  | Label   |
|-------------|-----------------------------------|----------------------------------------------|---------|
| address     | `aelf.address <#aelf.address>`    | The byte array of the contract code.         |         |
| old_author  | `aelf.address <#aelf.address>`    | The category of contract code(0: C#).        |         |
| CrossChainCreateToken | `aelf.address <#aelf.address>` | Indicates if the contract is the system contract. |         |

<div id="acs0.CodeCheckRequired"></div>

acs0.CodeCheckRequired
^^^^^^^^^^^^^^^^^^^^^^

| Field                           | Type                         | Description                                              | Label   |
|---------------------------------|------------------------------|----------------------------------------------------------|---------|
| code                            | `bytes <#bytes>`             | The byte array of the contract code.                     |         |
| proposed_contract_input_hash    | `aelf.Hash <#aelf.Hash>`     | The id of the proposed contract.                         |         |
| category                        | `sint32 <#sint32>`           | The category of contract code(0: C#).                    |         |
| is_system_contract              | `bool <#bool>`               | Indicates if the contract is the system contract.        |         |
| is_user_contract                | `bool <#bool>`               | Indicates if the contract is the user contract.          |         |

<div id="acs0.CodeUpdated"></div>

acs0.CodeUpdated
^^^^^^^^^^^^^^^^

| Field            | Type                               | Description                             | Label   |
|------------------|------------------------------------|-----------------------------------------|---------|
| address          | `aelf.Address <#aelf.Address>`     | The address of the updated contract.    |         |
| old_code_hash    | `aelf.Hash <#aelf.Hash>`           | The byte array of the old contract code.|         |
| new_code_hash    | `aelf.Hash <#aelf.Hash>`           | The byte array of the new contract code.|         |
| version          | `int32 <#int32>`                   | The version of the current contract.    |         |

<div id="acs0.ContractCodeCheckInput"></div>

acs0.ContractCodeCheckInput
^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Field                         | Type                         | Description                                                                 | Label   |
|-------------------------------|------------------------------|-----------------------------------------------------------------------------|---------|
| contract_input                | `bytes <#bytes>`             | The byte array of the contract code to be checked.                          |         |
| is_contract_deployment        | `bool <#bool>`               | Whether the input contract is to be deployed or updated.                    |         |
| code_check_release_method     | `string <#string>`           | Method to call after code check complete(DeploySmartContract or UpdateSmartContract). |         |
| proposed_contract_input_hash  | `aelf.Hash <#aelf.Hash>`     | The id of the proposed contract.                                            |         |
| category                      | `sint32 <#sint32>`           | The category of contract code(0: C#).                                       |         |
| is_system_contract            | `bool <#bool>`               | Indicates if the contract is the system contract.                           |         |

<div id="acs0.ContractDeployed"></div>

acs0.ContractDeployed
^^^^^^^^^^^^^^^^^^^^^

| Field                | Type                               | Description                                          | Label   |
|----------------------|------------------------------------|------------------------------------------------------|---------|
| author               | `aelf.Address <#aelf.Address>`     | The author of the contract, this is the person who deployed the contract. |         |
| code_hash            | `aelf.Hash <#aelf.Hash>`           | The hash of the contract code.                       |         |
| address              | `aelf.Address <#aelf.Address>`     | The address of the contract.                         |         |
| version              | `int32 <#int32>`                   | The version of the current contract.                 |         |
| Name                 | `aelf.Hash <#aelf.Hash>`           | The name of the contract. It has to be unique.       |         |
| contract_version     | `string <#string>`                 | The version of the current contract.                 |

<div id="acs0.ContractDeploymentInput"></div>


acs0.ContractDeploymentInput
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Field    | Type                  | Description                             | Label   |
|----------|-----------------------|-----------------------------------------|---------|
| category | `sint32 <#sint32>`    | The category of contract code(0: C#).   |         |
| code     | `bytes <#bytes>`      | The byte array of the contract code.    |         |

<div id="acs0.DeployUserSmartContractOutput"></div>

acs0.DeployUserSmartContractOutput
'''''''''''''''''''''''''''''''''''

| Field      | Type                   | Description                                 | Label   |
|------------|------------------------|---------------------------------------------|---------|
| code_hash  | `aelf.Hash <#aelf.Hash>` | The deployed or updated contract code hash. |         |

<div id="acs0.ContractInfo"></div>

acs0.ContractInfo
^^^^^^^^^^^^^^^^^

| Field              | Type                    | Description                                                                 | Label   |
|--------------------|-------------------------|-----------------------------------------------------------------------------|---------|
| serial_number      | `int64 <#int64>`        | The serial number of the contract.                                          |         |
| author             | `aelf.Address <#aelf.Address>` | The author of the contract, this is the person who deployed the contract.   |         |
| category           | `sint32 <#sint32>`      | The category of contract code(0: C#).                                       |         |
| code_hash          | `aelf.Hash <#aelf.Hash>` | The hash of the contract code.                                              |         |
| is_system_contract | `bool <#bool>`          | Whether it is a system contract.                                            |         |
| version            | `int32 <#int32>`        | The version of the current contract.                                        |         |
| contract_version   | `string <#string>`      | The version of the current contract.                                        |         |
| is_user_contract   | `bool <#bool>`          | Indicates if the contract is the user contract.                             |         |

<div id="acs0.ContractProposed"></div>

acs0.ContractProposed
^^^^^^^^^^^^^^^^^^^^^

| Field                           | Type                    | Description                        | Label   |
|---------------------------------|-------------------------|------------------------------------|---------|
| proposed_contract_input_hash    | `aelf.Hash <#aelf.Hash>` | The id of the proposed contract.   |         |

<div id="acs0.ContractUpdateInput"></div>

acs0.ContractUpdateInput
^^^^^^^^^^^^^^^^^^^^^^^^

| Field    | Type                    | Description                                      | Label   |
|----------|-------------------------|--------------------------------------------------|---------|
| address  | `aelf.Address <#aelf.Address>` | The contract address that needs to be updated.   |         |
| code     | `bytes <#bytes>`        | The byte array of the new contract code.         |         |

<div id="acs0.SetContractAuthorInput"></div>

acs0.SetContractAuthorInput
'''''''''''''''''''''''''''''

| Field             | Type                    | Description                                          | Label   |
|-------------------|-------------------------|------------------------------------------------------|---------|
| contract_address  | `aelf.Address <#aelf.Address>` | The author's contract address needs to be updated.   |         |
| new_author        | `aelf.Address <#aelf.Address>` | The new contract author.                             |         |

<div id="acs0.ReleaseContractInput"></div>

acs0.ReleaseContractInput
^^^^^^^^^^^^^^^^^^^^^^^^^

| Field                           | Type                    | Description                        | Label   |
|---------------------------------|-------------------------|------------------------------------|---------|
| proposal_id                     | `aelf.Hash <#aelf.Hash>` | The hash of the proposal.          |         |
| proposed_contract_input_hash    | `aelf.Hash <#aelf.Hash>` | The id of the proposed contract.   |         |

<div id="acs0.SystemContractDeploymentInput"></div>

acs0.SystemContractDeploymentInput
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Field                          | Type                                                                                                                                  | Description                                                                                                             | Label   |
|--------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|---------|
| category                       | `sint32 <#sint32>`                                                                                                                    | The category of contract code(0: C#).                                                                                   |         |
| code                           | `bytes <#bytes>`                                                                                                                      | The byte array of the contract code.                                                                                    |         |
| name                           | `aelf.Hash <#aelf.Hash>`                                                                                                              | The name of the contract. It has to be unique.                                                                          |         |
| transaction_method_call_list   | `SystemContractDeploymentInput.SystemTransactionMethodCallList <#acs0.SystemContractDeploymentInput.SystemTransactionMethodCallList>` | An initial list of transactions for the system contract, which is executed in sequence when the contract is deployed.   |

<div id="acs0.SystemContractDeploymentInput.SystemTransactionMethodCall"></div>

acs0.SystemContractDeploymentInput.SystemTransactionMethodCall
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Field         | Type                   | Description                               | Label   |
|---------------|------------------------|-------------------------------------------|---------|
| method_name   | `string <#string>`     | The method name of system transaction.    |         |
| params        | `bytes <#bytes>`       | The params of system transaction method.  |         |

<div id="acs0.SystemContractDeploymentInput.SystemTransactionMethodCallList"></div>

acs0.SystemContractDeploymentInput.SystemTransactionMethodCallList
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Field | Type                                                                                                                      | Description                           | Label      |
|-------|---------------------------------------------------------------------------------------------------------------------------|---------------------------------------|------------|
| value | `SystemContractDeploymentInput.SystemTransactionMethodCall <#acs0.SystemContractDeploymentInput.SystemTransactionMethodCall>` | The list of system transactions.       | repeated   |

<div id="acs0.ValidateSystemContractAddressInput"></div>

acs0.ValidateSystemContractAddressInput
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Field                        | Type                           | Description                        | Label   |
|------------------------------|--------------------------------|------------------------------------|---------|
| system_contract_hash_name    | `aelf.Hash <#aelf.Hash>`       | The name hash of the contract.     |         |
| address                      | `aelf.Address <#aelf.Address>` | The address of the contract.       |         |

<div id="aelf.Address"></div>

aelf.Address
^^^^^^^^^^^^

| Field | Type                 | Description   | Label   |
|-------|----------------------|---------------|---------|
| value | `bytes <#bytes>`     |               |         |

<div id="aelf.BinaryMerkleTree"></div>

aelf.BinaryMerkleTree
^^^^^^^^^^^^^^^^^^^^^

| Field       | Type                | Description            | Label      |
|-------------|---------------------|------------------------|------------|
| nodes       | `Hash <#aelf.Hash>` | The leaf nodes.        | repeated   |
| root        | `Hash <#aelf.Hash>` | The root node hash.    |            |
| leaf_count  | `int32 <#int32>`    | The count of leaf node.|            |

<div id="aelf.Hash"></div>

aelf.Hash
^^^^^^^^^

| Field | Type               | Description   | Label   |
|-------|--------------------|---------------|---------|
| value | `bytes <#bytes>`   |               |         |

<div id="aelf.LogEvent"></div>

aelf.LogEvent
^^^^^^^^^^^^^

| Field       | Type                      | Description                          | Label      |
|-------------|---------------------------|--------------------------------------|------------|
| address     | `Address <#aelf.Address>` | The contract address.                |            |
| name        | `string <#string>`        | The name of the log event.           |            |
| indexed     | `bytes <#bytes>`          | The indexed data, used to calculate bloom. | repeated   |
| non_indexed | `bytes <#bytes>`          | The non indexed data.                |            |

<div id="aelf.MerklePath"></div>

aelf.MerklePath
^^^^^^^^^^^^^^^

| Field             | Type                                | Description                  | Label      |
|-------------------|-------------------------------------|------------------------------|------------|
| merkle_path_nodes | `MerklePathNode <#aelf.MerklePathNode>` | The merkle path nodes.      | repeated   |

<div id="aelf.MerklePathNode"></div>

aelf.MerklePathNode
^^^^^^^^^^^^^^^^^^^

| Field                 | Type               | Description         | Label   |
|-----------------------|--------------------|---------------------|---------|
| hash                  | `Hash <#aelf.Hash>`| The node hash.      |         |
| is_left_child_node    | `bool <#bool>`     | Whether it is a left child node. |         |

<div id="aelf.SInt32Value"></div>

aelf.SInt32Value
^^^^^^^^^^^^^^^^

| Field | Type                | Description   | Label   |
|-------|---------------------|---------------|---------|
| value | `sint32 <#sint32>`  |               |         |

<div id="aelf.SInt64Value"></div>

aelf.SInt64Value
^^^^^^^^^^^^^^^^

| Field | Type                | Description   | Label   |
|-------|---------------------|---------------|---------|
| value | `sint64 <#sint64>`  |               |         |

<div id="aelf.ScopedStatePath"></div>

aelf.ScopedStatePath
^^^^^^^^^^^^^^^^^^^^

| Field   | Type                            | Description                                  | Label   |
|---------|---------------------------------|----------------------------------------------|---------|
| address | `Address <#aelf.Address>`       | The scope address, which will be the contract address.   |         |
| path    | `StatePath <#aelf.StatePath>`   | The path of contract state.                  |         |

<div id="aelf.SmartContractRegistration"></div>

aelf.SmartContractRegistration
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Field               | Type                  | Description                               | Label   |
|---------------------|-----------------------|-------------------------------------------|---------|
| category            | `sint32 <#sint32>`    | The category of contract code(0: C#).     |         |
| code                | `bytes <#bytes>`      | The byte array of the contract code.      |         |
| code_hash           | `Hash <#aelf.Hash>`   | The hash of the contract code.            |         |
| is_system_contract  | `bool <#bool>`        | Whether it is a system contract.          |         |
| version             | `int32 <#int32>`      | The version of the current contract.      |         |

<div id="aelf.StatePath"></div>

aelf.StatePath
^^^^^^^^^^^^^^

| Field   | Type                 | Description                           | Label      |
|---------|----------------------|---------------------------------------|------------|
| parts   | `string <#string>`   | The partial path of the state path.    | repeated   |

<div id="aelf.Transaction"></div>

aelf.Transaction
^^^^^^^^^^^^^^^^

| Field               | Type                          | Description                                                                                               | Label   |
|---------------------|-------------------------------|-----------------------------------------------------------------------------------------------------------|---------|
| from                | `Address <#aelf.Address>`     | The address of the sender of the transaction.                                                              |         |
| to                  | `Address <#aelf.Address>`     | The address of the contract when calling a contract.                                                       |         |
| ref_block_number    | `int64 <#int64>`              | The height of the referenced block hash.                                                                   |         |
| ref_block_prefix    | `bytes <#bytes>`              | The first four bytes of the referenced block hash.                                                         |         |
| method_name         | `string <#string>`            | The name of a method in the smart contract at the To address.                                               |         |
| params              | `bytes <#bytes>`              | The parameters to pass to the smart contract method.                                                        |         |
| signature           | `bytes <#bytes>`              | When signing a transaction it's actually a subset of the fields: from/to and the target method as well as the parameter that were given. It also contains the reference block number and prefix.  |         |

<div id="aelf.TransactionExecutingStateSet"></div>

aelf.TransactionExecutingStateSet
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Field   | Type                                                             | Description             | Label      |
|---------|------------------------------------------------------------------|-------------------------|------------|
| writes  | `TransactionExecutingStateSet.WritesEntry <#aelf.TransactionExecutingStateSet.WritesEntry>`   | The changed states.     | repeated   |
| reads   | `TransactionExecutingStateSet.ReadsEntry <#aelf.TransactionExecutingStateSet.ReadsEntry>`     | The read states.        | repeated   |
| deletes | `TransactionExecutingStateSet.DeletesEntry <#aelf.TransactionExecutingStateSet.DeletesEntry>` | The deleted states.     | repeated   |

<div id="aelf.TransactionExecutingStateSet.DeletesEntry"></div>

aelf.TransactionExecutingStateSet.DeletesEntry
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Field   | Type                 | Description   | Label   |
|---------|----------------------|---------------|---------|
| key     | `string <#string>`   |               |         |
| value   | `bool <#bool>`       |               |         |

<div id="aelf.TransactionExecutingStateSet.ReadsEntry"></div>

aelf.TransactionExecutingStateSet.ReadsEntry
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Field   | Type                 | Description   | Label   |
|---------|----------------------|---------------|---------|
| key     | `string <#string>`   |               |         |
| value   | `bool <#bool>`       |               |         |

<div id="aelf.TransactionExecutingStateSet.WritesEntry"></div>

aelf.TransactionExecutingStateSet.WritesEntry
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Field   | Type                 | Description   | Label   |
|---------|----------------------|---------------|---------|
| key     | `string <#string>`   |               |         |
| value   | `bytes <#bytes>`     |               |         |

<div id="aelf.TransactionResult"></div>

aelf.TransactionResult
^^^^^^^^^^^^^^^^^^^^^^

| Field             | Type                          | Description                                                                                       | Label      |
|-------------------|-------------------------------|---------------------------------------------------------------------------------------------------|------------|
| transaction_id    | `Hash <#aelf.Hash>`           | The transaction id.                                                                               |            |
| status            | `TransactionResultStatus <#aelf.TransactionResultStatus>` | The transaction result status.                                                                |            |
| logs              | `LogEvent <#aelf.LogEvent>`   | The log events.                                                                                   | repeated   |
| bloom             | `bytes <#bytes>`              | Bloom filter for transaction logs. A transaction log event can be defined in the contract and stored in the bloom filter after the transaction is executed. |            |
| return_value      | `bytes <#bytes>`              | The return value of the transaction execution.                                                     |            |
| block_number      | `int64 <#int64>`              | The height of the block hat packages the transaction.                                              |            |
| block_hash        | `Hash <#aelf.Hash>`           | The hash of the block hat packages the transaction.                                                |            |
| error             | `string <#string>`            | Failed execution error message.                                                                   |            |

<div id="aelf.TransactionResultStatus"></div>

aelf.TransactionResultStatus
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

| Name                     | Number   | Description                                                                                   |
|--------------------------|----------|-----------------------------------------------------------------------------------------------|
| NOT_EXISTED              | 0        | The execution result of the transaction does not exist.                                       |
| PENDING                  | 1        | The transaction is in the transaction pool waiting to be packaged.                            |
| FAILED                   | 2        | Transaction execution failed.                                                                 |
| MINED                    | 3        | The transaction was successfully executed and successfully packaged into a block.             |
| CONFLICT                 | 4        | When executed in parallel, there are conflicts with other transactions.                       |
| PENDING_VALIDATION       | 5        | The transaction is waiting for validation.                                                    |
| NODE_VALIDATION_FAILED   | 6        | Transaction validation failed.                                                                |

Example
-------

ACS0 declares methods for the scenes about contract deployment and update. AElf provides the implementation for ACS0, ``Genesis Contract``.
You can refer to the implementation of the :doc:`Genesis contract api<../smart-contract-api/genesis>`.
