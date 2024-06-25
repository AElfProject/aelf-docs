# AElf.Contracts.Referendum

Referendum contract.

Production nodes or associations cannot determine all decisions. Some extremely important decisions, especially those involving user rights and interests, should involve all users and give full control to the user's voting for governance. The Referendum contract is built for this.

Implement AElf Standards ACS1 and ACS3.

## Contract Methods

| Method Name                        | Request Type                                                                                                   | Response Type                                            | Description                                                        |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| ReclaimVoteToken                   | `aelf.Hash <#aelf.Hash>`\_\_                                                                                   | `google.protobuf.Empty <#google.protobuf.Empty>`\_\_     | Unlock the token used for voting according to proposal id.         |
| CreateOrganization                 | `Referendum.CreateOrganizationInput <#Referendum.CreateOrganizationInput>`\_\_                                 | `aelf.Address <#aelf.Address>`\_\_                       | Create an organization and return its address.                     |
| CreateOrganizationBySystemContract | `Referendum.CreateOrganizationBySystemContractInput <#Referendum.CreateOrganizationBySystemContractInput>`\_\_ | `aelf.Address <#aelf.Address>`\_\_                       | Creates an organization by system contract and return its address. |
| GetOrganization                    | `aelf.Address <#aelf.Address>`\_\_                                                                             | `Referendum.Organization <#Referendum.Organization>`\_\_ | Get the organization according to the organization address.        |
| CalculateOrganizationAddress       | `Referendum.CreateOrganizationInput <#Referendum.CreateOrganizationInput>`\_\_                                 | `aelf.Address <#aelf.Address>`\_\_                       | Calculate the input and return the organization address.           |
| GetProposalVirtualAddress          | `aelf.Hash <#aelf.Hash>`\_\_                                                                                   | `aelf.Address <#aelf.Address>`\_\_                       | Get the virtual address of a proposal based on the proposal id.    |

## AElf.Standards.ACS1

| Method Name               | Request Type                                                     | Response Type                                        | Description                                                                                        |
| ------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| SetMethodFee              | `acs1.MethodFees <#acs1.MethodFees>`\_\_                         | `google.protobuf.Empty <#google.protobuf.Empty>`\_\_ | Set the method fees for the specified method. Note that this will override all fees of the method. |
| ChangeMethodFeeController | `AuthorityInfo <#AuthorityInfo>`\_\_                             | `google.protobuf.Empty <#google.protobuf.Empty>`\_\_ | Change the method fee controller, the default is parliament and default organization.              |
| GetMethodFee              | `google.protobuf.StringValue <#google.protobuf.StringValue>`\_\_ | `acs1.MethodFees <#acs1.MethodFees>`\_\_             | Query method fee information by method name.                                                       |
| GetMethodFeeController    | `google.protobuf.Empty <#google.protobuf.Empty>`\_\_             | `AuthorityInfo <#AuthorityInfo>`\_\_                 | Query the method fee controller.                                                                   |

## AElf.Standards.ACS3

| Method Name                         | Request Type                                                                               | Response Type                                                | Description                                                                                                                                                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CreateProposal                      | `acs3.CreateProposalInput <#acs3.CreateProposalInput>`\_\_                                 | `aelf.Hash <#aelf.Hash>`\_\_                                 | Create a proposal for which organization members can vote. When the proposal is released, a transaction will be sent to the specified contract. Return id of the newly created proposal.                                            |
| Approve                             | `aelf.Hash <#aelf.Hash>`\_\_                                                               | `google.protobuf.Empty <#google.protobuf.Empty>`\_\_         | Approve a proposal according to the proposal ID.                                                                                                                                                                                    |
| Reject                              | `aelf.Hash <#aelf.Hash>`\_\_                                                               | `google.protobuf.Empty <#google.protobuf.Empty>`\_\_         | Reject a proposal according to the proposal ID.                                                                                                                                                                                     |
| Abstain                             | `aelf.Hash <#aelf.Hash>`\_\_                                                               | `google.protobuf.Empty <#google.protobuf.Empty>`\_\_         | Abstain a proposal according to the proposal ID.                                                                                                                                                                                    |
| Release                             | `aelf.Hash <#aelf.Hash>`\_\_                                                               | `google.protobuf.Empty <#google.protobuf.Empty>`\_\_         | Release a proposal according to the proposal ID and send a transaction to the specified contract.                                                                                                                                   |
| ChangeOrganizationThreshold         | `acs3.ProposalReleaseThreshold <#acs3.ProposalReleaseThreshold>`\_\_                       | `google.protobuf.Empty <#google.protobuf.Empty>`\_\_         | Change the thresholds associated with proposals. All fields will be overwritten by the input value and this will affect all current proposals of the organization. Note: only the organization can execute this through a proposal. |
| ChangeOrganizationProposerWhiteList | `acs3.ProposerWhiteList <#acs3.ProposerWhiteList>`\_\_                                     | `google.protobuf.Empty <#google.protobuf.Empty>`\_\_         | Change the white list of organization proposer. This method overrides the list of whitelisted proposers.                                                                                                                            |
| CreateProposalBySystemContract      | `acs3.CreateProposalBySystemContractInput <#acs3.CreateProposalBySystemContractInput>`\_\_ | `aelf.Hash <#aelf.Hash>`\_\_                                 | Create a proposal by system contracts, and return id of the newly created proposal.                                                                                                                                                 |
| ClearProposal                       | `aelf.Hash <#aelf.Hash>`\_\_                                                               | `google.protobuf.Empty <#google.protobuf.Empty>`\_\_         | Remove the specified proposal. If the proposal is in effect, the cleanup fails.                                                                                                                                                     |
| GetProposal                         | `aelf.Hash <#aelf.Hash>`\_\_                                                               | `acs3.ProposalOutput <#acs3.ProposalOutput>`\_\_             | Get the proposal according to the proposal ID.                                                                                                                                                                                      |
| ValidateOrganizationExist           | `aelf.Address <#aelf.Address>`\_\_                                                         | `google.protobuf.BoolValue <#google.protobuf.BoolValue>`\_\_ | Check the existence of an organization.                                                                                                                                                                                             |
| ValidateProposerInWhiteList         | `acs3.ValidateProposerInWhiteListInput <#acs3.ValidateProposerInWhiteListInput>`\_\_       | `google.protobuf.BoolValue <#google.protobuf.BoolValue>`\_\_ | Check if the proposer is whitelisted.                                                                                                                                                                                               |

# Contract Types

## AElf.Contracts.Referendum

### `Referendum.CreateOrganizationBySystemContractInput`

| Field                                | Type                                                                | Description                                                                                         | Label |
| ------------------------------------ | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----- |
| organization_creation_input          | `CreateOrganizationInput <#Referendum.CreateOrganizationInput>`\_\_ | The parameters of creating organization.                                                            |       |
| organization_address_feedback_method | `string <#string>`\_\_                                              | The organization address callback method which replies the organization address to caller contract. |       |

### `Referendum.CreateOrganizationInput`

| Field                      | Type                            | Description                                                | Label |
| -------------------------- | ------------------------------- | ---------------------------------------------------------- | ----- |
| token_symbol               | `string`                        | The token used during proposal operations.                 |       |
| proposal_release_threshold | `acs3.ProposalReleaseThreshold` | The threshold for releasing the proposal.                  |       |
| proposer_white_list        | `acs3.ProposerWhiteList`        | The proposer whitelist.                                    |       |
| creation_token             | `aelf.Hash`                     | The creation token is for organization address generation. |       |

### `Referendum.Organization`

| Field                      | Type                            | Description                                                | Label |
| -------------------------- | ------------------------------- | ---------------------------------------------------------- | ----- |
| proposal_release_threshold | `acs3.ProposalReleaseThreshold` | The threshold for releasing the proposal.                  |       |
| token_symbol               | `string`                        | The token used during proposal operations.                 |       |
| organization_address       | `aelf.Address`                  | The address of organization.                               |       |
| organization_hash          | `aelf.Hash`                     | The organization's id.                                     |       |
| proposer_white_list        | `acs3.ProposerWhiteList`        | The proposer whitelist.                                    |       |
| creation_token             | `aelf.Hash`                     | The creation token is for organization address generation. |       |

### `Referendum.ProposalInfo`

| Field                    | Type                        | Description                                                  | Label |
| ------------------------ | --------------------------- | ------------------------------------------------------------ | ----- |
| proposal_id              | `aelf.Hash`                 | The proposal ID.                                             |       |
| contract_method_name     | `string`                    | The method that this proposal will call when being released. |       |
| to_address               | `aelf.Address`              | The address of the target contract.                          |       |
| params                   | `bytes`                     | The parameters of the release transaction.                   |       |
| expired_time             | `google.protobuf.Timestamp` | The date at which this proposal will expire.                 |       |
| proposer                 | `aelf.Address`              | The address of the proposer of this proposal.                |       |
| organization_address     | `aelf.Address`              | The address of this proposal's organization.                 |       |
| approval_count           | `int64`                     | The count of approved.                                       |       |
| rejection_count          | `int64`                     | The count of rejected.                                       |       |
| abstention_count         | `int64`                     | The count of abstained.                                      |       |
| proposal_description_url | `string`                    | URL used for proposal describing.                            |       |

### `Referendum.Receipt`

| Field        | Type        | Description                 | Label |
| ------------ | ----------- | --------------------------- | ----- |
| amount       | `int64`     | The amount of token locked. |       |
| token_symbol | `string`    | The symbol of token locked. |       |
| lock_id      | `aelf.Hash` | The lock ID.                |       |

### `Referendum.ReferendumReceiptCreated`

| Field                | Type                        | Description                                        | Label |
| -------------------- | --------------------------- | -------------------------------------------------- | ----- |
| proposal_id          | `aelf.Hash`                 | The ID of the proposal.                            |       |
| address              | `aelf.Address`              | The sender address.                                |       |
| symbol               | `string`                    | The symbol of token locked.                        |       |
| amount               | `int64`                     | The amount of token locked.                        |       |
| receipt_type         | `string`                    | The type of receipt (Approve, Reject, or Abstain). |       |
| time                 | `google.protobuf.Timestamp` | The timestamp of this method call.                 |       |
| organization_address | `aelf.Address`              | The address of the organization.                   |       |

## AElf.Standards.ACS1

### `acs1.MethodFee`

| Field     | Type                   | Description                         | Label |
| --------- | ---------------------- | ----------------------------------- | ----- |
| symbol    | `string <#string>`\_\_ | The token symbol of the method fee. |       |
| basic_fee | `int64 <#int64>`\_\_   | The amount of fees to be charged.   |       |

### `acs1.MethodFees`

| Field            | Type                              | Description                           | Label    |
| ---------------- | --------------------------------- | ------------------------------------- | -------- |
| method_name      | `string <#string>`\_\_            | The name of the method to be charged. |          |
| fees             | `MethodFee <#acs1.MethodFee>`\_\_ | List of fees to be charged.           | repeated |
| is_size_fee_free | `bool <#bool>`\_\_                | Optional based on the implementation. |          |

## AElf.Standards.ACS3

### `acs3.CreateProposalBySystemContractInput`

| Field           | Type                                                  | Description                          | Label |
| --------------- | ----------------------------------------------------- | ------------------------------------ | ----- |
| proposal_input  | `CreateProposalInput <#acs3.CreateProposalInput>`\_\_ | The parameters of creating proposal. |       |
| origin_proposer | `aelf.Address <#aelf.Address>`\_\_                    | The actor that triggers the call.    |       |

### `acs3.CreateProposalInput`

| Field                    | Type                                                         | Description                                                 | Label |
| ------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------- | ----- |
| contract_method_name     | `string <#string>`\_\_                                       | The name of the method to call after release.               |       |
| to_address               | `aelf.Address <#aelf.Address>`\_\_                           | The address of the contract to call after release.          |       |
| params                   | `bytes <#bytes>`\_\_                                         | The parameter of the method to be called after the release. |       |
| expired_time             | `google.protobuf.Timestamp <#google.protobuf.Timestamp>`\_\_ | The timestamp at which this proposal will expire.           |       |
| organization_address     | `aelf.Address <#aelf.Address>`\_\_                           | The address of the organization.                            |       |
| proposal_description_url | `string <#string>`\_\_                                       | URL used for proposal description.                          |       |
| token                    | `aelf.Hash <#aelf.Hash>`\_\_                                 | The token for proposal ID generation.                       |       |

### `acs3.OrganizationCreated`

| Field                | Type                               | Description                              | Label |
| -------------------- | ---------------------------------- | ---------------------------------------- | ----- |
| organization_address | `aelf.Address <#aelf.Address>`\_\_ | The address of the created organization. |       |

### `acs3.OrganizationHashAddressPair`

| Field                | Type                               | Description                  | Label |
| -------------------- | ---------------------------------- | ---------------------------- | ----- |
| organization_hash    | `aelf.Hash <#aelf.Hash>`\_\_       | The ID of the organization.  |       |
| organization_address | `aelf.Address <#aelf.Address>`\_\_ | The address of organization. |       |

### `acs3.OrganizationThresholdChanged`

| Field                      | Type                                                            | Description                | Label |
| -------------------------- | --------------------------------------------------------------- | -------------------------- | ----- |
| organization_address       | `aelf.Address <#aelf.Address>`\_\_                              | The organization address   |       |
| proposer_release_threshold | `ProposalReleaseThreshold <#acs3.ProposalReleaseThreshold>`\_\_ | The new release threshold. |       |

### `acs3.OrganizationWhiteListChanged`

| Field                | Type                                              | Description                 | Label |
| -------------------- | ------------------------------------------------- | --------------------------- | ----- |
| organization_address | `aelf.Address <#aelf.Address>`\_\_                | The organization address.   |       |
| proposer_white_list  | `ProposerWhiteList <#acs3.ProposerWhiteList>`\_\_ | The new proposer whitelist. |       |

### `acs3.ProposalCreated`

| Field                | Type                               | Description                                       | Label |
| -------------------- | ---------------------------------- | ------------------------------------------------- | ----- |
| proposal_id          | `aelf.Hash <#aelf.Hash>`\_\_       | The ID of the created proposal.                   |       |
| organization_address | `aelf.Address <#aelf.Address>`\_\_ | The organization address of the created proposal. |       |

### `acs3.ProposalOutput`

| Field                | Type                                                         | Description                                                  | Label |
| -------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ----- |
| proposal_id          | `aelf.Hash <#aelf.Hash>`\_\_                                 | The ID of the proposal.                                      |       |
| contract_method_name | `string <#string>`\_\_                                       | The method that this proposal will call when being released. |       |
| to_address           | `aelf.Address <#aelf.Address>`\_\_                           | The address of the target contract.                          |       |
| params               | `bytes <#bytes>`\_\_                                         | The parameters of the release transaction.                   |       |
| expired_time         | `google.protobuf.Timestamp <#google.protobuf.Timestamp>`\_\_ | The date at which this proposal will expire.                 |       |
| organization_address | `aelf.Address <#aelf.Address>`\_\_                           | The address of this proposal's organization.                 |       |
| proposer             | `aelf.Address <#aelf.Address>`\_\_                           | The address of the proposer of this proposal.                |       |
| to_be_released       | `bool <#bool>`\_\_                                           | Indicates if this proposal is releasable.                    |       |
| approval_count       | `int64 <#int64>`\_\_                                         | Approval count for this proposal.                            |       |
| rejection_count      | `int64 <#int64>`\_\_                                         | Rejection count for this proposal.                           |       |
| abstention_count     | `int64 <#int64>`\_\_                                         | Abstention count for this proposal.                          |       |

### `acs3.ProposalReleaseThreshold`

| Field                        | Type                 | Description                                     | Label |
| ---------------------------- | -------------------- | ----------------------------------------------- | ----- |
| minimal_approval_threshold   | `int64 <#int64>`\_\_ | The value for the minimum approval threshold.   |       |
| maximal_rejection_threshold  | `int64 <#int64>`\_\_ | The value for the maximal rejection threshold.  |       |
| maximal_abstention_threshold | `int64 <#int64>`\_\_ | The value for the maximal abstention threshold. |       |
| minimal_vote_threshold       | `int64 <#int64>`\_\_ | The value for the minimal vote threshold.       |       |

## AElf.Standards.ACS1

### `acs1.MethodFee`

| Field     | Type     | Description                         | Label |
| --------- | -------- | ----------------------------------- | ----- |
| symbol    | `string` | The token symbol of the method fee. |       |
| basic_fee | `int64`  | The amount of fees to be charged.   |       |

#### `acs1.MethodFees`

| Field            | Type        | Description                           | Label    |
| ---------------- | ----------- | ------------------------------------- | -------- |
| method_name      | `string`    | The name of the method to be charged. |          |
| fees             | `MethodFee` | List of fees to be charged.           | repeated |
| is_size_fee_free | `bool`      | Optional based on the implementation. |          |

## AElf.Standards.ACS3

### `acs3.CreateProposalBySystemContractInput`

| Field           | Type                  | Description                          | Label |
| --------------- | --------------------- | ------------------------------------ | ----- |
| proposal_input  | `CreateProposalInput` | The parameters of creating proposal. |       |
| origin_proposer | `aelf.Address`        | The actor that triggers the call.    |       |

### `acs3.CreateProposalInput`

| Field                    | Type                        | Description                                                 | Label |
| ------------------------ | --------------------------- | ----------------------------------------------------------- | ----- |
| contract_method_name     | `string`                    | The name of the method to call after release.               |       |
| to_address               | `aelf.Address`              | The address of the contract to call after release.          |       |
| params                   | `bytes`                     | The parameter of the method to be called after the release. |       |
| expired_time             | `google.protobuf.Timestamp` | The timestamp at which this proposal will expire.           |       |
| organization_address     | `aelf.Address`              | The address of the organization.                            |       |
| proposal_description_url | `string`                    | URL used for proposal description.                          |       |
| token                    | `aelf.Hash`                 | The token for proposal ID generation.                       |       |

### `acs3.OrganizationCreated`

| Field                | Type           | Description                              | Label |
| -------------------- | -------------- | ---------------------------------------- | ----- |
| organization_address | `aelf.Address` | The address of the created organization. |       |

### `acs3.OrganizationHashAddressPair`

| Field                | Type           | Description                  | Label |
| -------------------- | -------------- | ---------------------------- | ----- |
| organization_hash    | `aelf.Hash`    | The ID of organization.      |       |
| organization_address | `aelf.Address` | The address of organization. |       |

### `acs3.OrganizationThresholdChanged`

| Field                      | Type                       | Description                | Label |
| -------------------------- | -------------------------- | -------------------------- | ----- |
| organization_address       | `aelf.Address`             | The organization address   |       |
| proposer_release_threshold | `ProposalReleaseThreshold` | The new release threshold. |       |

### `acs3.OrganizationWhiteListChanged`

| Field                | Type                | Description                 | Label |
| -------------------- | ------------------- | --------------------------- | ----- |
| organization_address | `aelf.Address`      | The organization address.   |       |
| proposer_white_list  | `ProposerWhiteList` | The new proposer whitelist. |       |

### `acs3.ProposalCreated`

| Field                | Type           | Description                     | Label |
| -------------------- | -------------- | ------------------------------- | ----- |
| proposal_id          | `aelf.Hash`    | The ID of the created proposal. |       |
| organization_address | `aelf.Address` | The organization address.       |       |

### `acs3.ProposalOutput`

| Field                | Type                        | Description                                                  | Label |
| -------------------- | --------------------------- | ------------------------------------------------------------ | ----- |
| proposal_id          | `aelf.Hash`                 | The ID of the proposal.                                      |       |
| contract_method_name | `string`                    | The method that this proposal will call when being released. |       |
| to_address           | `aelf.Address`              | The address of the target contract.                          |       |
| params               | `bytes`                     | The parameters of the release transaction.                   |       |
| expired_time         | `google.protobuf.Timestamp` | The date at which this proposal will expire.                 |       |
| organization_address | `aelf.Address`              | The address of this proposal's organization.                 |       |
| proposer             | `aelf.Address`              | The address of the proposer of this proposal.                |       |
| to_be_released       | `bool`                      | Indicates if this proposal is releasable.                    |       |
| approval_count       | `int64`                     | Approval count for this proposal.                            |       |
| rejection_count      | `int64`                     | Rejection count for this proposal.                           |       |
| abstention_count     | `int64`                     | Abstention count for this proposal.                          |       |

### `acs3.ProposalReleaseThreshold`

| Field                        | Type    | Description                                     | Label |
| ---------------------------- | ------- | ----------------------------------------------- | ----- |
| minimal_approval_threshold   | `int64` | The value for the minimum approval threshold.   |       |
| maximal_rejection_threshold  | `int64` | The value for the maximal rejection threshold.  |       |
| maximal_abstention_threshold | `int64` | The value for the maximal abstention threshold. |       |
| minimal_vote_threshold       | `int64` | The value for the minimal vote threshold.       |       |

### `acs3.ProposalReleased`

| Field                | Type           | Description                                        | Label |
| -------------------- | -------------- | -------------------------------------------------- | ----- |
| proposal_id          | `aelf.Hash`    | The id of the released proposal.                   |       |
| organization_address | `aelf.Address` | The organization address of the released proposal. |       |

### `acs3.ProposerWhiteList`

| Field     | Type           | Description                  | Label    |
| --------- | -------------- | ---------------------------- | -------- |
| proposers | `aelf.Address` | The address of the proposers | repeated |

### `acs3.ReceiptCreated`

| Field                | Type                        | Description                                        | Label |
| -------------------- | --------------------------- | -------------------------------------------------- | ----- |
| proposal_id          | `aelf.Hash`                 | The id of the proposal.                            |       |
| address              | `aelf.Address`              | The sender address.                                |       |
| receipt_type         | `string`                    | The type of receipt (Approve, Reject, or Abstain). |       |
| time                 | `google.protobuf.Timestamp` | The timestamp of this method call.                 |       |
| organization_address | `aelf.Address`              | The address of the organization.                   |       |

### `acs3.ValidateProposerInWhiteListInput`

| Field |

| Type                 | Description    | Label                            |
| -------------------- | -------------- | -------------------------------- | --- |
| proposer             | `aelf.Address` | The address to search/check.     |     |
| organization_address | `aelf.Address` | The address of the organization. |     |

## AElf.Types

### `aelf.Address`

| Field | Type    | Description | Label |
| ----- | ------- | ----------- | ----- |
| value | `bytes` |             |       |

### `aelf.BinaryMerkleTree`

| Field      | Type    | Description             | Label    |
| ---------- | ------- | ----------------------- | -------- |
| nodes      | `Hash`  | The leaf nodes.         | repeated |
| root       | `Hash`  | The root node hash.     |          |
| leaf_count | `int32` | The count of leaf node. |          |

### `aelf.Hash`

| Field | Type    | Description | Label |
| ----- | ------- | ----------- | ----- |
| value | `bytes` |             |       |

### `aelf.LogEvent`

| Field       | Type      | Description                | Label    |
| ----------- | --------- | -------------------------- | -------- |
| address     | `Address` | The contract address.      |          |
| name        | `string`  | The name of the log event. |          |
| indexed     | `bytes`   | The indexed data.          | repeated |
| non_indexed | `bytes`   | The non-indexed data.      |          |

### `aelf.MerklePath`

| Field             | Type             | Description            | Label    |
| ----------------- | ---------------- | ---------------------- | -------- |
| merkle_path_nodes | `MerklePathNode` | The merkle path nodes. | repeated |

### `aelf.MerklePathNode`

| Field              | Type   | Description                      | Label |
| ------------------ | ------ | -------------------------------- | ----- |
| hash               | `Hash` | The node hash.                   |       |
| is_left_child_node | `bool` | Whether it is a left child node. |       |

### `aelf.SInt32Value`

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| value | `sint32` |             |       |

### `aelf.SInt64Value`

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| value | `sint64` |             |       |

### `aelf.ScopedStatePath`

| Field   | Type        | Description                 | Label |
| ------- | ----------- | --------------------------- | ----- |
| address | `Address`   | The scope address.          |       |
| path    | `StatePath` | The path of contract state. |       |

### `aelf.SmartContractRegistration`

| Field              | Type                    | Description                           | Label |
| ------------------ | ----------------------- | ------------------------------------- | ----- |
| category           | `sint32 <#sint32>`\_\_  | The category of contract code(0: C#). |       |
| code               | `bytes <#bytes>`\_\_    | The byte array of the contract code.  |       |
| code_hash          | `Hash <#aelf.Hash>`\_\_ | The hash of the contract code.        |       |
| is_system_contract | `bool <#bool>`\_\_      | Whether it is a system contract.      |       |
| version            | `int32 <#int32>`\_\_    | The version of the current contract.  |       |

### `aelf.StatePath`

| Field | Type                   | Description                         | Label    |
| ----- | ---------------------- | ----------------------------------- | -------- |
| parts | `string <#string>`\_\_ | The partial path of the state path. | repeated |

### `aelf.Transaction`

| Field            | Type                          | Description                                                      | Label |
| ---------------- | ----------------------------- | ---------------------------------------------------------------- | ----- |
| from             | `Address <#aelf.Address>`\_\_ | The address of the sender of the transaction.                    |       |
| to               | `Address <#aelf.Address>`\_\_ | The address of the contract when calling a contract.             |       |
| ref_block_number | `int64 <#int64>`\_\_          | The height of the referenced block hash.                         |       |
| ref_block_prefix | `bytes <#bytes>`\_\_          | The first four bytes of the referenced block hash.               |       |
| method_name      | `string <#string>`\_\_        | The name of a method in the smart contract at the To address.    |       |
| params           | `bytes <#bytes>`\_\_          | The parameters to pass to the smart contract method.             |       |
| signature        | `bytes <#bytes>`\_\_          | When signing a transaction it’s actually a subset of the fields. |       |

### `aelf.TransactionExecutingStateSet`

| Field   | Type                                                                                              | Description         | Label    |
| ------- | ------------------------------------------------------------------------------------------------- | ------------------- | -------- |
| writes  | `TransactionExecutingStateSet.WritesEntry <#aelf.TransactionExecutingStateSet.WritesEntry>`\_\_   | The changed states. | repeated |
| reads   | `TransactionExecutingStateSet.ReadsEntry <#aelf.TransactionExecutingStateSet.ReadsEntry>`\_\_     | The read states.    | repeated |
| deletes | `TransactionExecutingStateSet.DeletesEntry <#aelf.TransactionExecutingStateSet.DeletesEntry>`\_\_ | The deleted states. | repeated |

### `aelf.TransactionExecutingStateSet.DeletesEntry`

| Field | Type                   | Description | Label |
| ----- | ---------------------- | ----------- | ----- |
| key   | `string <#string>`\_\_ |             |       |
| value | `bool <#bool>`\_\_     |             |       |

### `aelf.TransactionExecutingStateSet.ReadsEntry`

| Field | Type                   | Description | Label |
| ----- | ---------------------- | ----------- | ----- |
| key   | `string <#string>`\_\_ |             |       |
| value | `bool <#bool>`\_\_     |             |       |

### `aelf.TransactionExecutingStateSet.WritesEntry`

| Field | Type                   | Description | Label |
| ----- | ---------------------- | ----------- | ----- |
| key   | `string <#string>`\_\_ |             |       |
| value | `bytes <#bytes>`\_\_   |             |       |

### `aelf.TransactionResult`

| Field          | Type                                                          | Description                                           | Label    |
| -------------- | ------------------------------------------------------------- | ----------------------------------------------------- | -------- |
| transaction_id | `Hash <#aelf.Hash>`\_\_                                       | The transaction id.                                   |          |
| status         | `TransactionResultStatus <#aelf.TransactionResultStatus>`\_\_ | The transaction result status.                        |          |
| logs           | `LogEvent <#aelf.LogEvent>`\_\_                               | The log events.                                       | repeated |
| bloom          | `bytes <#bytes>`\_\_                                          | Bloom filter for transaction logs.                    |          |
| return_value   | `bytes <#bytes>`\_\_                                          | The return value of the transaction execution.        |          |
| block_number   | `int64 <#int64>`\_\_                                          | The height of the block hat packages the transaction. |          |
| block_hash     | `Hash <#aelf.Hash>`\_\_                                       | The hash of the block hat packages the transaction.   |          |
| error          | `string <#string>`\_\_                                        | Failed execution error message.                       |          |

### `aelf.TransactionResultStatus`

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

| Field            | Type                           | Description                               | Label |
| ---------------- | ------------------------------ | ----------------------------------------- | ----- |
| contract_address | `aelf.Address <#aelf.Address>` | The contract address of the controller.   |       |
| owner_address    | `aelf.Address <#aelf.Address>` | The address of the owner of the contract. |       |
