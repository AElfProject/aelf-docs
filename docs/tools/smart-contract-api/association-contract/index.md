---
sidebar_position: 1
title: Association Contract
description: Transactions handling
---


# Association contract 

Organizations established to achieve specific goals can use this contract to cooperatively handle transactions within the organization.

Implements aelf Standards ACS1 and ACS3.

## Contract Methods

| Method Name                            | Request Type                                                                                                  | Response Type                                           | Description                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------ |
| **CreateOrganization**                 | [`Association.CreateOrganizationInput`](#Association.CreateOrganizationInput)                                 | [`aelf.Address`](#aelf.Address)                         | Create an organization and return its address.                     |
| **CreateOrganizationBySystemContract** | [`Association.CreateOrganizationBySystemContractInput`](#Association.CreateOrganizationBySystemContractInput) | [`aelf.Address`](#aelf.Address)                         | Creates an organization by system contract and return its address. |
| **AddMember**                          | [`aelf.Address`](#aelf.Address)                                                                               | [`google.protobuf.Empty`](#google.protobuf.Empty)       | Add organization members.                                          |
| **RemoveMember**                       | [`aelf.Address`](#aelf.Address)                                                                               | [`google.protobuf.Empty`](#google.protobuf.Empty)       | Remove organization members.                                       |
| **ChangeMember**                       | [`Association.ChangeMemberInput`](#Association.ChangeMemberInput)                                             | [`google.protobuf.Empty`](#google.protobuf.Empty)       | Replace organization member with a new member.                     |
| **GetOrganization**                    | [`aelf.Address`](#aelf.Address)                                                                               | [`Association.Organization`](#Association.Organization) | Get the organization according to the organization address.        |
| **CalculateOrganizationAddress**       | [`Association.CreateOrganizationInput`](#Association.CreateOrganizationInput)                                 | [`aelf.Address`](#aelf.Address)                         | Calculate the input and return the organization address.           |

### AElf.Standards.ACS1

| Method Name                   | Request Type                                                  | Response Type                                     | Description                                                                                        |
| ----------------------------- | ------------------------------------------------------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **SetMethodFee**              | [`acs1.MethodFees`](#acs1.MethodFees)                         | [`google.protobuf.Empty`](#google.protobuf.Empty) | Set the method fees for the specified method. Note that this will override all fees of the method. |
| **ChangeMethodFeeController** | [`AuthorityInfo`](#AuthorityInfo)                             | [`google.protobuf.Empty`](#google.protobuf.Empty) | Change the method fee controller, the default is parliament and default organization.              |
| **GetMethodFee**              | [`google.protobuf.StringValue`](#google.protobuf.StringValue) | [`acs1.MethodFees`](#acs1.MethodFees)             | Query method fee information by method name.                                                       |
| **GetMethodFeeController**    | [`google.protobuf.Empty`](#google.protobuf.Empty)             | [`AuthorityInfo`](#AuthorityInfo)                 | Query the method fee controller.                                                                   |

### AElf.Standards.ACS3

| Method Name                             | Request Type                                                                            | Response Type                                             | Description                                                                                                                                                                                                                         |
| --------------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **CreateProposal**                      | [`acs3.CreateProposalInput`](#acs3.CreateProposalInput)                                 | [`aelf.Hash`](#aelf.Hash)                                 | Create a proposal for which organization members can vote. When the proposal is released, a transaction will be sent to the specified contract. Return id of the newly created proposal.                                            |
| **Approve**                             | [`aelf.Hash`](#aelf.Hash)                                                               | [`google.protobuf.Empty`](#google.protobuf.Empty)         | Approve a proposal according to the proposal ID.                                                                                                                                                                                    |
| **Reject**                              | [`aelf.Hash`](#aelf.Hash)                                                               | [`google.protobuf.Empty`](#google.protobuf.Empty)         | Reject a proposal according to the proposal ID.                                                                                                                                                                                     |
| **Abstain**                             | [`aelf.Hash`](#aelf.Hash)                                                               | [`google.protobuf.Empty`](#google.protobuf.Empty)         | Abstain a proposal according to the proposal ID.                                                                                                                                                                                    |
| **Release**                             | [`aelf.Hash`](#aelf.Hash)                                                               | [`google.protobuf.Empty`](#google.protobuf.Empty)         | Release a proposal according to the proposal ID and send a transaction to the specified contract.                                                                                                                                   |
| **ChangeOrganizationThreshold**         | [`acs3.ProposalReleaseThreshold`](#acs3.ProposalReleaseThreshold)                       | [`google.protobuf.Empty`](#google.protobuf.Empty)         | Change the thresholds associated with proposals. All fields will be overwritten by the input value and this will affect all current proposals of the organization. Note: only the organization can execute this through a proposal. |
| **ChangeOrganizationProposerWhiteList** | [`acs3.ProposerWhiteList`](#acs3.ProposerWhiteList)                                     | [`google.protobuf.Empty`](#google.protobuf.Empty)         | Change the white list of organization proposer. This method overrides the list of whitelisted proposers.                                                                                                                            |
| **CreateProposalBySystemContract**      | [`acs3.CreateProposalBySystemContractInput`](#acs3.CreateProposalBySystemContractInput) | [`aelf.Hash`](#aelf.Hash)                                 | Create a proposal by system contracts, and return id of the newly created proposal.                                                                                                                                                 |
| **ClearProposal**                       | [`aelf.Hash`](#aelf.Hash)                                                               | [`google.protobuf.Empty`](#google.protobuf.Empty)         | Remove the specified proposal. If the proposal is in effect, the cleanup fails.                                                                                                                                                     |
| **GetProposal**                         | [`aelf.Hash`](#aelf.Hash)                                                               | [`acs3.ProposalOutput`](#acs3.ProposalOutput)             | Get the proposal according to the proposal ID.                                                                                                                                                                                      |
| **ValidateOrganizationExist**           | [`aelf.Address`](#aelf.Address)                                                         | [`google.protobuf.BoolValue`](#google.protobuf.BoolValue) | Check the existence of an organization.                                                                                                                                                                                             |
| **ValidateProposerInWhiteList**         | [`acs3.ValidateProposerInWhiteListInput`](#acs3.ValidateProposerInWhiteListInput)       | [`google.protobuf.BoolValue`](#google.protobuf.BoolValue) | Check if the proposer is whitelisted.                                                                                                                                                                                               |

# Contract Types

## AElf.Contracts.Association

### Association.ChangeMemberInput

| Field      | Type                            | Description             | Label |
| ---------- | ------------------------------- | ----------------------- | ----- |
| old_member | [`aelf.Address`](#aelf.Address) | The old member address. |       |
| new_member | [`aelf.Address`](#aelf.Address) | The new member address. |       |

### Association.CreateOrganizationBySystemContractInput

| Field                                | Type                                                              | Description                                                                                         | Label |
| ------------------------------------ | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----- |
| organization_creation_input          | [`CreateOrganizationInput`](#Association.CreateOrganizationInput) | The parameters of creating organization.                                                            |       |
| organization_address_feedback_method | [`string`](#string)                                               | The organization address callback method which replies the organization address to caller contract. |       |

### Association.CreateOrganizationInput

| Field                      | Type                                                              | Description                                                | Label |
| -------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------- | ----- |
| organization_member_list   | [`OrganizationMemberList`](#Association.OrganizationMemberList)   | Initial organization members.                              |       |
| proposal_release_threshold | [`acs3.ProposalReleaseThreshold`](#acs3.ProposalReleaseThreshold) | The threshold for releasing the proposal.                  |       |
| proposer_white_list        | [`acs3.ProposerWhiteList`](#acs3.ProposerWhiteList)               | The proposer whitelist.                                    |       |
| creation_token             | [`aelf.Hash`](#aelf.Hash)                                         | The creation token is for organization address generation. |       |

### Association.MemberAdded

| Field                | Type                            | Description               | Label |
| -------------------- | ------------------------------- | ------------------------- | ----- |
| member               | [`aelf.Address`](#aelf.Address) | The added member address. |       |
| organization_address | [`aelf.Address`](#aelf.Address) | The organization address. |       |

### Association.MemberChanged

| Field                | Type                            | Description               | Label |
| -------------------- | ------------------------------- | ------------------------- | ----- |
| old_member           | [`aelf.Address`](#aelf.Address) | The old member address.   |       |
| new_member           | [`aelf.Address`](#aelf.Address) | The new member address.   |       |
| organization_address | [`aelf.Address`](#aelf.Address) | The organization address. |       |

### Association.MemberRemoved

| Field                | Type                            | Description                 | Label |
| -------------------- | ------------------------------- | --------------------------- | ----- |
| member               | [`aelf.Address`](#aelf.Address) | The removed member address. |       |
| organization_address | [`aelf.Address`](#aelf.Address) | The organization address.   |       |

### Association.Organization

| Field                      | Type                            | Description                                                | Label |
| -------------------------- | ------------------------------- | ---------------------------------------------------------- | ----- |
| organization_member_list   | `OrganizationMemberList`        | The organization members.                                  |       |
| proposal_release_threshold | `acs3.ProposalReleaseThreshold` | The threshold for releasing the proposal.                  |       |
| proposer_white_list        | `acs3.ProposerWhiteList`        | The proposer whitelist.                                    |       |
| organization_address       | `aelf.Address`                  | The address of organization.                               |       |
| organization_hash          | `aelf.Hash`                     | The organizations id.                                      |       |
| creation_token             | `aelf.Hash`                     | The creation token is for organization address generation. |       |

### Association.OrganizationMemberList

| Field                | Type           | Description                          | Label    |
| -------------------- | -------------- | ------------------------------------ | -------- |
| organization_members | `aelf.Address` | The address of organization members. | repeated |

# Association.ProposalInfo

| Field                    | Type                        | Description                                                  | Label    |
| ------------------------ | --------------------------- | ------------------------------------------------------------ | -------- |
| proposal_id              | `aelf.Hash`                 | The proposal ID.                                             |          |
| contract_method_name     | `string`                    | The method that this proposal will call when being released. |          |
| to_address               | `aelf.Address`              | The address of the target contract.                          |          |
| params                   | `bytes`                     | The parameters of the release transaction.                   |          |
| expired_time             | `google.protobuf.Timestamp` | The date at which this proposal will expire.                 |          |
| proposer                 | `aelf.Address`              | The address of the proposer of this proposal.                |          |
| organization_address     | `aelf.Address`              | The address of this proposals organization.                  |          |
| approvals                | `aelf.Address`              | Address list of approved.                                    | repeated |
| rejections               | `aelf.Address`              | Address list of rejected.                                    | repeated |
| abstentions              | `aelf.Address`              | Address list of abstained.                                   | repeated |
| proposal_description_url | `string`                    | Url is used for proposal describing.                         |          |

## ACS1

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

## ACS3

### acs3.CreateProposalBySystemContractInput

| Field           | Type                  | Description                          | Label |
| --------------- | --------------------- | ------------------------------------ | ----- |
| proposal_input  | `CreateProposalInput` | The parameters of creating proposal. |       |
| origin_proposer | `aelf.Address`        | The actor that trigger the call.     |       |

### acs3.CreateProposalInput

| Field                    | Type                        | Description                                                                                                  | Label |
| ------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------ | ----- |
| contract_method_name     | `string`                    | The name of the method to call after release.                                                                |       |
| to_address               | `aelf.Address`              | The address of the contract to call after release.                                                           |       |
| params                   | `bytes`                     | The parameter of the method to be called after the release.                                                  |       |
| expired_time             | `google.protobuf.Timestamp` | The timestamp at which this proposal will expire.                                                            |       |
| organization_address     | `aelf.Address`              | The address of the organization.                                                                             |       |
| proposal_description_url | `string`                    | Url is used for proposal describing.                                                                         |       |
| token                    | `aelf.Hash`                 | The token is for proposal id generation and with this token, proposal id can be calculated before proposing. |       |

### ac3.organizationCreated

| Field                | Type            | Description                          | Label |
| -------------------- | --------------- | ------------------------------------ | ----- |
| organization_address | `aelf.Address ` | Address of the created organization. |       |

### ac3.organizationHashAddressPair

| Field                | Type            | Description                  | Label |
| -------------------- | --------------- | ---------------------------- | ----- |
| organization_hash    | `aelf.Hash `    | ID of the organization.      |       |
| organization_address | `aelf.Address ` | Address of the organization. |       |

### ac3.organizationThresholdChanged

| Field                      | Type                        | Description            | Label |
| -------------------------- | --------------------------- | ---------------------- | ----- |
| organization_address       | `aelf.Address `             | Organization address   |       |
| proposer_release_threshold | `ProposalReleaseThreshold ` | New release threshold. |       |

### ac3.organizationWhiteListChanged

| Field                | Type                | Description             | Label |
| -------------------- | ------------------- | ----------------------- | ----- |
| organization_address | `aelf.Address `     | Organization address    |       |
| proposer_white_list  | `ProposerWhiteList` | New proposer whitelist. |       |

### ac3.proposalCreated

| Field                | Type            | Description                                   | Label |
| -------------------- | --------------- | --------------------------------------------- | ----- |
| proposal_id          | `aelf.Hash `    | ID of the created proposal.                   |       |
| organization_address | `aelf.Address ` | Organization address of the created proposal. |       |

### ac3.proposalOutput

| Field                | Type                         | Description                                  | Label |
| -------------------- | ---------------------------- | -------------------------------------------- | ----- |
| proposal_id          | `aelf.Hash `                 | ID of the proposal.                          |       |
| contract_method_name | `string `                    | Method called when the proposal is released. |       |
| to_address           | `aelf.Address `              | Address of the target contract.              |       |
| params               | `bytes `                     | Parameters of the release transaction.       |       |
| expired_time         | `google.protobuf.Timestamp ` | Expiry date of the proposal.                 |       |
| organization_address | `aelf.Address `              | Organization's address for the proposal.     |       |
| proposer             | `aelf.Address `              | Address of the proposer.                     |       |
| to_be_released       | `bool `                      | Indicates if the proposal is releasable.     |       |
| approval_count       | `int64 `                     | Number of approvals.                         |       |
| rejection_count      | `int64 `                     | Number of rejections.                        |       |
| abstention_count     | `int64 `                     | Number of abstentions.                       |       |

### ac3.proposalReleaseThreshold

| Field                        | Type     | Description                   | Label |
| ---------------------------- | -------- | ----------------------------- | ----- |
| minimal_approval_threshold   | `int64 ` | Minimum approval threshold.   |       |
| maximal_rejection_threshold  | `int64 ` | Maximum rejection threshold.  |       |
| maximal_abstention_threshold | `int64 ` | Maximum abstention threshold. |       |
| minimal_vote_threshold       | `int64 ` | Minimum vote threshold.       |       |

### ac3.proposalReleased

| Field                | Type            | Description                                      | Label |
| -------------------- | --------------- | ------------------------------------------------ | ----- |
| proposal_id          | `aelf.Hash `    | ID of the released proposal.                     |       |
| organization_address | `aelf.Address ` | Organization's address of the released proposal. |       |

### ac3.proposerWhiteList

| Field     | Type            | Description                 | Label    |
| --------- | --------------- | --------------------------- | -------- |
| proposers | `aelf.Address ` | Addresses of the proposers. | repeated |

### ac3.receiptCreated

| Field                | Type                        | Description                                    | Label |
| -------------------- | --------------------------- | ---------------------------------------------- | ----- |
| proposal_id          | `aelf.Hash `                | ID of the proposal.                            |       |
| address              | `aelf.Address `             | Sender's address.                              |       |
| receipt_type         | `string `                   | Type of receipt (Approve, Reject, or Abstain). |       |
| time                 | `google.protobuf.Timestamp` | Timestamp of the method call.                  |       |
| organization_address | `aelf.Address `             | Organization's address.                        |       |

### acs3.ValidateProposerInWhiteListInput

| Field                | Type            | Description                      | Label |
| -------------------- | --------------- | -------------------------------- | ----- |
| proposer             | `aelf.Address ` | The address to search/check.     |       |
| organization_address | `aelf.Address ` | The address of the organization. |       |

## AElf.Types

### aelf.Address

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| value | `bytes ` |             |       |

### aelf.BinaryMerkleTree

| Field      | Type     | Description             | Label    |
| ---------- | -------- | ----------------------- | -------- |
| nodes      | `Hash `  | The leaf nodes.         | repeated |
| root       | `Hash `  | The root node hash.     |          |
| leaf_count | `int32 ` | The count of leaf node. |          |

### aelf.Hash

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| value | `bytes ` |             |       |

### aelf.LogEvent

| Field       | Type       | Description                                | Label    |
| ----------- | ---------- | ------------------------------------------ | -------- |
| address     | `Address ` | The contract address.                      |          |
| name        | `string `  | The name of the log event.                 |          |
| indexed     | `bytes `   | The indexed data, used to calculate bloom. | repeated |
| non_indexed | `bytes `   | The non indexed data.                      |          |

### aelf.MerklePath

| Field             | Type              | Description            | Label    |
| ----------------- | ----------------- | ---------------------- | -------- |
| merkle_path_nodes | `MerklePathNode ` | The merkle path nodes. | repeated |

### aelf.MerklePathNode

| Field              | Type    | Description                      | Label |
| ------------------ | ------- | -------------------------------- | ----- |
| hash               | `Hash ` | The node hash.                   |       |
| is_left_child_node | `bool ` | Whether it is a left child node. |       |

### aelf.SInt32Value

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| value | `sint32 ` |             |       |

### aelf.SInt64Value

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| value | `sint64` |             |       |

### aelf.ScopedStatePath

| Field   | Type         | Description                                            | Label |
| ------- | ------------ | ------------------------------------------------------ | ----- |
| address | `Address `   | The scope address, which will be the contract address. |       |
| path    | `StatePath ` | The path of contract state.                            |       |

### aelf.SmartContractRegistration

| Field              | Type      | Description                           | Label |
| ------------------ | --------- | ------------------------------------- | ----- |
| category           | `sint32 ` | The category of contract code(0: C#). |       |
| code               | `bytes `  | The byte array of the contract code.  |       |
| code_hash          | `Hash `   | The hash of the contract code.        |       |
| is_system_contract | `bool `   | Whether it is a system contract.      |       |
| version            | `int32 `  | The version of the current contract.  |       |

### aelf.StatePath

| Field | Type      | Description                         | Label    |
| ----- | --------- | ----------------------------------- | -------- |
| parts | `string ` | The partial path of the state path. | repeated |

### aelf.Transaction

| Field            | Type       | Description                                                                                                                                                                                      | Label |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| from             | `Address ` | The address of the sender of the transaction.                                                                                                                                                    |       |
| to               | `Address ` | The address of the contract when calling a contract.                                                                                                                                             |       |
| ref_block_number | `int64 `   | The height of the referenced block hash.                                                                                                                                                         |       |
| ref_block_prefix | `bytes `   | The first four bytes of the referenced block hash.                                                                                                                                               |       |
| method_name      | `string `  | The name of a method in the smart contract at the To address.                                                                                                                                    |       |
| params           | `bytes `   | The parameters to pass to the smart contract method.                                                                                                                                             |       |
| signature        | `bytes `   | When signing a transaction it’s actually a subset of the fields: from/to and the target method as well as the parameter that were given. It also contains the reference block number and prefix. |       |

### aelf.TransactionExecutingStateSet

| Field   | Type                                         | Description         | Label    |
| ------- | -------------------------------------------- | ------------------- | -------- |
| writes  | `TransactionExecutingStateSet.WritesEntry `  | The changed states. | repeated |
| reads   | `TransactionExecutingStateSet.ReadsEntry `   | The read states.    | repeated |
| deletes | `TransactionExecutingStateSet.DeletesEntry ` | The deleted states. | repeated |

### aelf.TransactionExecutingStateSet.DeletesEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `bool `   |             |       |


### aelf.TransactionExecutingStateSet.ReadsEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `bool `   |             |       |


### aelf.TransactionExecutingStateSet.WritesEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `bytes `  |             |       |


### aelf.TransactionResult

| Field          | Type                       | Description                                           | Label    |
| -------------- | -------------------------- | ----------------------------------------------------- | -------- |
| transaction_id | `Hash `                    | The transaction id.                                   |          |
| status         | `TransactionResultStatus ` | The transaction result status.                        |          |
| logs           | `LogEvent `                | The log events.                                       | repeated |
| bloom          | `bytes `                   | Bloom filter for transaction logs.                    |          |
| return_value   | `bytes `                   | The return value of the transaction execution.        |          |
| block_number   | `int64 `                   | The height of the block hat packages the transaction. |          |
| block_hash     | `Hash `                    | The hash of the block hat packages the transaction.   |          |
| error          | `string `                  | Failed execution error message.                       |          |



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

| Field            | Type            | Description                               | Label |
| ---------------- | --------------- | ----------------------------------------- | ----- |
| contract_address | `aelf.Address`  | The contract address of the controller.   |       |
| owner_address    | `aelf.Address ` | The address of the owner of the contract. |       |
