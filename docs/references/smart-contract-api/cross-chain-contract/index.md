---
sidebar_position: 9
title: Cross Chain Contract
---


# Cross-Chain contract.

Implement AElf Standards ACS1 and ACS7.

## Contract Methods

| Method Name                                  | Request Type                                           | Response Type                                | Description                                                                                              |
| -------------------------------------------- | ------------------------------------------------------ | -------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Initialize                                   | `CrossChain.InitializeInput`                           | `google.protobuf.Empty`                      | Propose once cross chain indexing.                                                                       |
| SetInitialSideChainLifetimeControllerAddress | `aelf.Address`                                         | `google.protobuf.Empty`                      | Set the initial SideChainLifetimeController address which should be parliament organization by default.  |
| SetInitialIndexingControllerAddress          | `aelf.Address`                                         | `google.protobuf.Empty`                      | Set the initial CrossChainIndexingController address which should be parliament organization by default. |
| ChangeCrossChainIndexingController           | `AuthorityInfo`                                        | `google.protobuf.Empty`                      | Change the cross chain indexing controller.                                                              |
| ChangeSideChainLifetimeController            | `AuthorityInfo`                                        | `google.protobuf.Empty`                      | Change the lifetime controller of the side chain.                                                        |
| ChangeSideChainIndexingFeeController         | `CrossChain.ChangeSideChainIndexingFeeControllerInput` | `google.protobuf.Empty`                      | Change indexing fee adjustment controller for specific side chain.                                       |
| AcceptCrossChainIndexingProposal             | `CrossChain.AcceptCrossChainIndexingProposalInput`     | `google.protobuf.Empty`                      | When the indexing proposal is released, clean up the pending proposal.                                   |
| GetSideChainCreator                          | `google.protobuf.Int32Value`                           | `aelf.Address`                               | Get the side chain creator address according to side chain id.                                           |
| GetChainStatus                               | `google.protobuf.Int32Value`                           | `CrossChain.GetChainStatusOutput`            | Get the current status of side chain according to side chain id.                                         |
| GetSideChainHeight                           | `google.protobuf.Int32Value`                           | `google.protobuf.Int64Value`                 | Get the side chain height according to side chain id.                                                    |
| GetParentChainHeight                         | `google.protobuf.Empty`                                | `google.protobuf.Int64Value`                 | Get the height of parent chain.                                                                          |
| GetParentChainId                             | `google.protobuf.Empty`                                | `google.protobuf.Int32Value`                 | Get the chain id of parent chain.                                                                        |
| GetSideChainBalance                          | `google.protobuf.Int32Value`                           | `google.protobuf.Int64Value`                 | Get the balance of side chain indexing according to side chain id.                                       |
| GetSideChainIndexingFeeDebt                  | `google.protobuf.Int32Value`                           | `google.protobuf.Int64Value`                 | Get the fee debt of side chain indexing according to side chain id.                                      |
| GetIndexingProposalStatus                    | `google.protobuf.Empty`                                | `CrossChain.GetIndexingProposalStatusOutput` | Get the status of the current indexing proposal.                                                         |
| GetSideChainIndexingFeePrice                 | `google.protobuf.Int32Value`                           | `google.protobuf.Int64Value`                 | Get the side chain indexing fee price according to side chain id.                                        |
| GetSideChainLifetimeController               | `google.protobuf.Empty`                                | `AuthorityInfo`                              | Get the lifetime controller of the side chain.                                                           |
| GetCrossChainIndexingController              | `google.protobuf.Empty`                                | `AuthorityInfo`                              | Get the cross chain indexing controller.                                                                 |
| GetSideChainIndexingFeeController            | `google.protobuf.Int32Value`                           | `AuthorityInfo`                              | Get the indexing fee controller of side chain according to side chain id.                                |

## AElf.Standards.ACS1

| Method Name               | Request Type                  | Response Type           | Description                                                                                        |
| ------------------------- | ----------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| SetMethodFee              | `acs1.MethodFees`             | `google.protobuf.Empty` | Set the method fees for the specified method. Note that this will override all fees of the method. |
| ChangeMethodFeeController | `AuthorityInfo`               | `google.protobuf.Empty` | Change the method fee controller, the default is parliament and default organization.              |
| GetMethodFee              | `google.protobuf.StringValue` | `acs1.MethodFees`       | Query method fee information by method name.                                                       |
| GetMethodFeeController    | `google.protobuf.Empty`       | `AuthorityInfo`         | Query the method fee controller.                                                                   |

## AElf.Standards.ACS7

| Method Name                                    | Request Type                                  | Response Type                           | Description                                                                                              |
| ---------------------------------------------- | --------------------------------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| ProposeCrossChainIndexing                      | `acs7.CrossChainBlockData`                    | `google.protobuf.Empty`                 | Propose once cross chain indexing.                                                                       |
| ReleaseCrossChainIndexingProposal              | `acs7.ReleaseCrossChainIndexingProposalInput` | `google.protobuf.Empty`                 | Release the proposed indexing if already approved.                                                       |
| RequestSideChainCreation                       | `acs7.SideChainCreationRequest`               | `google.protobuf.Empty`                 | Request side chain creation.                                                                             |
| ReleaseSideChainCreation                       | `acs7.ReleaseSideChainCreationInput`          | `google.protobuf.Empty`                 | Release the side chain creation request if already approved and it will call the method CreateSideChain. |
| CreateSideChain                                | `acs7.CreateSideChainInput`                   | `google.protobuf.Int32Value`            | Create the side chain and returns the newly created side chain ID.                                       |
| Recharge                                       | `acs7.RechargeInput`                          | `google.protobuf.Empty`                 | Recharge for the specified side chain.                                                                   |
| DisposeSideChain                               | `google.protobuf.Int32Value`                  | `google.protobuf.Int32Value`            | Dispose a side chain according to side chain id.                                                         |
| AdjustIndexingFeePrice                         | `acs7.AdjustIndexingFeeInput`                 | `google.protobuf.Empty`                 | Adjust side chain indexing fee.                                                                          |
| VerifyTransaction                              | `acs7.VerifyTransactionInput`                 | `google.protobuf.BoolValue`             | Verify cross chain transaction.                                                                          |
| GetSideChainIdAndHeight                        | `google.protobuf.Empty`                       | `acs7.ChainIdAndHeightDict`             | Gets all the side chain id and height of the current chain.                                              |
| GetSideChainIndexingInformationList            | `google.protobuf.Empty`                       | `acs7.SideChainIndexingInformationList` | Get indexing information of side chains.                                                                 |
| GetAllChainsIdAndHeight                        | `google.protobuf.Empty`                       | `acs7.ChainIdAndHeightDict`             | Get id and recorded height of all chains.                                                                |
| GetIndexedSideChainBlockDataByHeight           | `google.protobuf.Int64Value`                  | `acs7.IndexedSideChainBlockData`        | Get block data of indexed side chain according to height.                                                |
| GetBoundParentChainHeightAndMerklePathByHeight | `google.protobuf.Int64Value`                  | `acs7.CrossChainMerkleProofContext`     | Get merkle path bound up with side chain according to height.                                            |
| GetChainInitializationData                     | `google.protobuf.Int32Value`                  | `acs7.ChainInitializationData`          | Get initialization data for specified side chain.                                                        |

**Contract Types**
## AElf.Contracts.CrossChain
### CrossChain.AcceptCrossChainIndexingProposalInput

| Field    | Type  | Description                        | Label |
| -------- | ----- | ---------------------------------- | ----- |
| chain_id | int32 | The chain id of accepted indexing. |       |

### CrossChain.ChainIndexingProposal

| Field                           | Type                             | Description                                  | Label |
| ------------------------------- | -------------------------------- | -------------------------------------------- | ----- |
| proposal_id                     | aelf.Hash                        | The id of cross chain indexing proposal.     |       |
| proposer                        | aelf.Address                     | The proposer of cross chain indexing.        |       |
| proposed_cross_chain_block_data | acs7.CrossChainBlockData         | The cross chain data proposed.               |       |
| status                          | CrossChainIndexingProposalStatus | The status of cross chain indexing proposal. |       |
| chain_id                        | int32                            | The chain id of the indexing.                |       |

### CrossChain.ChangeSideChainIndexingFeeControllerInput

| Field          | Type          | Description                             | Label |
| -------------- | ------------- | --------------------------------------- | ----- |
| chain_id       | int32         | The side chain id.                      |       |
| authority_info | AuthorityInfo | The changed controller of indexing fee. |       |

### CrossChain.CrossChainIndexingControllerChanged

| Field          | Type          | Description                         | Label |
| -------------- | ------------- | ----------------------------------- | ----- |
| authority_info | AuthorityInfo | The changed controller of indexing. |       |

### CrossChain.Disposed

| Field    | Type  | Description                 | Label |
| -------- | ----- | --------------------------- | ----- |
| chain_id | int32 | The disposed side chain id. |       |

### CrossChain.GetChainStatusOutput

| Field  | Type            | Description               | Label |
| ------ | --------------- | ------------------------- | ----- |
| status | SideChainStatus | The status of side chain. |       |

### CrossChain.GetIndexingProposalStatusOutput

| Field                          | Type                                                             | Description                                                       | Label    |
| ------------------------------ | ---------------------------------------------------------------- | ----------------------------------------------------------------- | -------- |
| chain_indexing_proposal_status | GetIndexingProposalStatusOutput.ChainIndexingProposalStatusEntry | The collection of pending indexing proposal, the key is chain id. | repeated |

### CrossChain.GetIndexingProposalStatusOutput.ChainIndexingProposalStatusEntry

| Field | Type                               | Description | Label |
| ----- | ---------------------------------- | ----------- | ----- |
| key   | int32                              |             |       |
| value | PendingChainIndexingProposalStatus |             |       |

### CrossChain.GetPendingCrossChainIndexingProposalOutput

| Field                           | Type                      | Description                                            | Label |
| ------------------------------- | ------------------------- | ------------------------------------------------------ | ----- |
| proposal_id                     | aelf.Hash                 | The proposal id of cross chain indexing.               |       |
| proposer                        | aelf.Address              | The proposer of cross chain indexing proposal.         |       |
| to_be_released                  | bool                      | True if the proposal can be released, otherwise false. |       |
| proposed_cross_chain_block_data | acs7.CrossChainBlockData  | The cross chain data proposed.                         |       |
| expired_time                    | google.protobuf.Timestamp | The proposal expiration time.                          |       |

### CrossChain.InitializeInput

| Field                           | Type  | Description                                       | Label |
| ------------------------------- | ----- | ------------------------------------------------- | ----- |
| parent_chain_id                 | int32 | The id of parent chain.                           |       |
| creation_height_on_parent_chain | int64 | The height of side chain created on parent chain. |       |
| is_privilege_preserved          | bool  | True if chain privilege needed, otherwise false.  |       |

### CrossChain.ParentChainIndexed

| Field          | Type  | Description              | Label |
| -------------- | ----- | ------------------------ | ----- |
| chain_id       | bytes | Indexed parent chain id. |       |
| indexed_height | int64 | Indexed block height.    |       |

### CrossChain.PendingChainIndexingProposalStatus

| Field                           | Type                      | Description                                            | Label |
| ------------------------------- | ------------------------- | ------------------------------------------------------ | ----- |
| proposal_id                     | aelf.Hash                 | The id of cross chain indexing proposal.               |       |
| proposer                        | aelf.Address              | The proposer of cross chain indexing.                  |       |
| to_be_released                  | bool                      | True if the proposal can be released, otherwise false. |       |
| proposed_cross_chain_block_data | acs7.CrossChainBlockData  | The cross chain data proposed.                         |       |
| expired_time                    | google.protobuf.Timestamp | The proposal expiration time.                          |       |

### CrossChain.ProposedCrossChainIndexing

| Field                               | Type                                                             | Description                                                     | Label    |
| ----------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------- | -------- |
| chain_indexing_proposal_collections | ProposedCrossChainIndexing.ChainIndexingProposalCollectionsEntry | The collection of chain indexing proposal, the key is chain id. | repeated |

### CrossChain.ProposedCrossChainIndexing.ChainIndexingProposalCollectionsEntry

| Field | Type                  | Description | Label |
| ----- | --------------------- | ----------- | ----- |
| key   | int32                 |             |       |
| value | ChainIndexingProposal |             |       |

### CrossChain.SideChainCreatedEvent

| Field   | Type         | Description                                        | Label |
| ------- | ------------ | -------------------------------------------------- | ----- |
| creator | aelf.Address | The proposer who propose to create the side chain. |       |
| chainId | int32        | The created side chain id.                         |       |

### CrossChain.SideChainCreationRequestState

| Field                       | Type                          | Description                                         | Label |
| --------------------------- | ----------------------------- | --------------------------------------------------- | ----- |
| side_chain_creation_request | acs7.SideChainCreationRequest | The parameters of creating side chain.              |       |
| expired_time                | google.protobuf.Timestamp     | The expiration date of the proposal.                |       |
| proposer                    | aelf.Address                  | The proposer who proposed to create the side chain. |       |

### CrossChain.SideChainIndexed

| Field          | Type  | Description            | Label |
| -------------- | ----- | ---------------------- | ----- |
| chain_id       | bytes | Indexed side chain id. |       |
| indexed_height | int64 | Indexed block height.  |       |

### CrossChain.SideChainIndexingFeeControllerChanged

| Field          | Type          | Description                                        | Label |
| -------------- | ------------- | -------------------------------------------------- | ----- |
| chain_id       | int32         | The side chain id.                                 |       |
| authority_info | AuthorityInfo | The changed controller of side chain indexing fee. |       |

### CrossChain.SideChainInfo

| Field                           | Type                                      | Description                                          | Label    |
| ------------------------------- | ----------------------------------------- | ---------------------------------------------------- | -------- |
| proposer                        | aelf.Address                              | The proposer who propose to create the side chain.   |          |
| side_chain_status               | CrossChain.SideChainStatus                | The status of side chain.                            |          |
| side_chain_id                   | int32                                     | The side chain id.                                   |          |
| creation_timestamp              | google.protobuf.Timestamp                 | The time of side chain created.                      |          |
| creation_height_on_parent_chain | int64                                     | The height of side chain created on parent chain.    |          |
| indexing_price                  | int64                                     | The price of indexing fee.                           |          |
| is_privilege_preserved          | bool                                      | True if chain privilege needed, otherwise false.     |          |
| arrears_info                    | CrossChain.SideChainInfo.ArrearsInfoEntry | Creditor and amounts for the chain indexing fee debt | repeated |
| indexing_fee_controller         | AuthorityInfo                             | The controller of indexing fee.                      |          |

### CrossChain.SideChainInfo.ArrearsInfoEntry

| Field | Type   | Description | Label |
| ----- | ------ | ----------- | ----- |
| key   | string |             |       |
| value | int64  |             |       |

### CrossChain.SideChainLifetimeControllerChanged

| Field          | Type          | Description                                    | Label |
| -------------- | ------------- | ---------------------------------------------- | ----- |
| authority_info | AuthorityInfo | The changed controller of side chain lifetime. |       |

### CrossChain.CrossChainIndexingProposalStatus

| Name         | Number | Description                     |
| ------------ | ------ | ------------------------------- |
| NON_PROPOSED | 0      |                                 |
| PENDING      | 1      | The proposal is pending.        |
| ACCEPTED     | 2      | The proposal has been released. |

### CrossChain.SideChainStatus

| Name              | Number | Description                                 |
| ----------------- | ------ | ------------------------------------------- |
| FATAL             | 0      | Currently no meaning.                       |
| ACTIVE            | 1      | The side chain is being indexed.            |
| INDEXING_FEE_DEBT | 2      | The side chain is in debt for indexing fee. |
| TERMINATED        | 3      | The side chain is disposed.                 |

## AElf.Standards.ACS1

### acs1.MethodFee

| Field     | Type   | Description                         | Label |
| --------- | ------ | ----------------------------------- | ----- |
| symbol    | string | The token symbol of the method fee. |       |
| basic_fee | int64  | The amount of fees to be charged.   |       |

### acs1.MethodFees

| Field            | Type           | Description                                                  | Label    |
| ---------------- | -------------- | ------------------------------------------------------------ | -------- |
| method_name      | string         | The name of the method to be charged.                        |          |
| fees             | acs1.MethodFee | List of fees to be charged.                                  | repeated |
| is_size_fee_free | bool           | Optional based on the implementation of SetMethodFee method. |          |

## AElf.Standards.ACS7

### acs7.AdjustIndexingFeeInput

| Field         | Type  | Description                    | Label |
| ------------- | ----- | ------------------------------ | ----- |
| side_chain_id | int32 | The side chain id to adjust.   |       |
| indexing_fee  | int64 | The new price of indexing fee. |       |

### acs7.ChainIdAndHeightDict

| Field          | Type                                   | Description                                                                                       | Label    |
| -------------- | -------------------------------------- | ------------------------------------------------------------------------------------------------- | -------- |
| id_height_dict | ChainIdAndHeightDict.IdHeightDictEntry | A collection of chain ids and heights, where the key is the chain id and the value is the height. | repeated |

### acs7.ChainIdAndHeightDict.IdHeightDictEntry

| Field | Type  | Description | Label |
| ----- | ----- | ----------- | ----- |
| key   | int32 |             |       |
| value | int64 |             |       |

### acs7.ChainInitializationConsensusInfo

| Field                  | Type  | Description             | Label |
| ---------------------- | ----- | ----------------------- | ----- |
| initial_consensus_data | bytes | Initial consensus data. |       |

### acs7.ChainInitializationData

| Field                               | Type                             | Description                                                                                 | Label |
| ----------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------- | ----- |
| chain_id                            | int32                            | The id of side chain.                                                                       |       |
| creator                             | aelf.Address                     | The side chain creator.                                                                     |       |
| creation_timestamp                  | google.protobuf.Timestamp        | The timestamp for side chain creation.                                                      |       |
| creation_height_on_parent_chain     | int64                            | The height of side chain creation on parent chain.                                          |       |
| chain_creator_privilege_preserved   | bool                             | Creator privilege boolean flag: True if chain creator privilege preserved, otherwise false. |       |
| parent_chain_token_contract_address | aelf.Address                     | Parent chain token contract address.                                                        |       |
| chain_initialization_consensus_info | ChainInitializationConsensusInfo | Initial consensus information.                                                              |       |
| native_token_info_data              | bytes                            | The native token info.                                                                      |       |
| resource_token_info                 | ResourceTokenInfo                | The resource token information.                                                             |       |
| chain_primary_token_info            | ChainPrimaryTokenInfo            | The chain primary token information.                                                        |       |

### acs7.ChainPrimaryTokenInfo

| Field                               | Type                       | Description                                      | Label    |
| ----------------------------------- | -------------------------- | ------------------------------------------------ | -------- |
| chain_primary_token_data            | bytes                      | The side chain primary token data.               |          |
| side_chain_token_initial_issue_list | SideChainTokenInitialIssue | The side chain primary token initial issue list. | repeated |

### acs7.CreateSideChainInput

| Field                       | Type                     | Description                                         | Label |
| --------------------------- | ------------------------ | --------------------------------------------------- | ----- |
| side_chain_creation_request | SideChainCreationRequest | The request information of the side chain creation. |       |
| proposer                    | aelf.Address             | The proposer of the side chain creation.            |       |

### acs7.CrossChainBlockData

| Field                        | Type                 | Description                                | Label    |
| ---------------------------- | -------------------- | ------------------------------------------ | -------- |
| side_chain_block_data_list   | SideChainBlockData   | The side chain block data list to index.   | repeated |
| parent_chain_block_data_list | ParentChainBlockData | The parent chain block data list to index. | repeated |

### acs7.CrossChainExtraData

| Field                               | Type      | Description                                                   | Label |
| ----------------------------------- | --------- | ------------------------------------------------------------- | ----- |
| transaction_status_merkle_tree_root | aelf.Hash | Merkle tree root of side chain block transaction status root. |       |

### acs7.CrossChainIndexingDataProposedEvent

| Field                     | Type                | Description                              | Label |
| ------------------------- | ------------------- | ---------------------------------------- | ----- |
| proposed_cross_chain_data | CrossChainBlockData | Proposed cross chain data to be indexed. |       |
| proposal_id               | aelf.Hash           | The proposal id.                         |       |

### acs7.CrossChainMerkleProofContext

| Field                         | Type            | Description                                          | Label |
| ----------------------------- | --------------- | ---------------------------------------------------- | ----- |
| bound_parent_chain_height     | int64           | The height of parent chain bound up with side chain. |       |
| merkle_path_from_parent_chain | aelf.MerklePath | The merkle path generated from parent chain.         |       |

### acs7.IndexedParentChainBlockData

| Field                        | Type                 | Description                                                   | Label    |
| ---------------------------- | -------------------- | ------------------------------------------------------------- | -------- |
| local_chain_height           | int64                | The height of the local chain when indexing the parent chain. |          |
| parent_chain_block_data_list | ParentChainBlockData | Parent chain block data.                                      | repeated |

### acs7.IndexedSideChainBlockData

| Field                      | Type               | Description            | Label    |
| -------------------------- | ------------------ | ---------------------- | -------- |
| side_chain_block_data_list | SideChainBlockData | Side chain block data. | repeated |

### acs7.ParentChainBlockData

| Field                               | Type                                        | Description                                                                     | Label    |
| ----------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------- | -------- |
| height                              | int64                                       | The height of parent chain.                                                     |          |
| cross_chain_extra_data              | CrossChainExtraData                         | The merkle tree root computing from side chain roots.                           |          |
| chain_id                            | int32                                       | The parent chain id.                                                            |          |
| transaction_status_merkle_tree_root | aelf.Hash                                   | The merkle tree root computing from transactions status in parent chain block.  |          |
| indexed_merkle_path                 | ParentChainBlockData.IndexedMerklePathEntry | Indexed block height from side chain and merkle path for this side chain block. | repeated |
| extra_data                          | ParentChainBlockData.ExtraDataEntry         | Extra data map.                                                                 | repeated |

### acs7.ParentChainBlockData.ExtraDataEntry

| Field | Type   | Description | Label |
| ----- | ------ | ----------- | ----- |
| key   | string |             |       |
| value | bytes  |             |       |

### acs7.ParentChainBlockData.IndexedMerklePathEntry

| Field | Type              | Description | Label |
| ----- | ----------------- | ----------- | ----- |
| key   | `int64 `          |             |       |
| value | `aelf.MerklePath` |             |       |

### acs7.RechargeInput

| Field    | Type     | Description               | Label |
| -------- | -------- | ------------------------- | ----- |
| chain_id | `int32 ` | The chain id to recharge. |       |
| amount   | `int64 ` | The amount to recharge.   |       |

### acs7.ReleaseCrossChainIndexingProposalInput

| Field         | Type     | Description                   | Label    |
| ------------- | -------- | ----------------------------- | -------- |
| chain_id_list | `int32 ` | List of chain ids to release. | repeated |

### acs7.ReleaseSideChainCreationInput

| Field       | Type         | Description                             | Label |
| ----------- | ------------ | --------------------------------------- | ----- |
| proposal_id | `aelf.Hash ` | The proposal id of side chain creation. |       |

### acs7.ResourceTokenInfo

| Field                    | Type                          | Description                        | Label    |
| ------------------------ | ----------------------------- | ---------------------------------- | -------- |
| resource_token_list_data | `bytes `                      | The resource token information.    |          |
| initial_resource_amount  | `InitialResourceAmountEntry ` | The initial resource token amount. | repeated |

### acs7.ResourceTokenInfo.InitialResourceAmountEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `int32 `  |             |       |

### acs7.SideChainBlockData

| Field                               | Type         | Description                                                                  | Label |
| ----------------------------------- | ------------ | ---------------------------------------------------------------------------- | ----- |
| height                              | `int64 `     | The height of side chain block.                                              |       |
| block_header_hash                   | `aelf.Hash ` | The hash of side chain block.                                                |       |
| transaction_status_merkle_tree_root | `aelf.Hash ` | The merkle tree root computing from transactions status in side chain block. |       |
| chain_id                            | `int32 `     | The id of side chain.                                                        |       |

### acs7.SideChainCreationRequest

| Field                               | Type                             | Description                                                                                 | Label    |
| ----------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------------- | -------- |
| indexing_price                      | `int64 `                         | The cross chain indexing price.                                                             |          |
| locked_token_amount                 | `int64 `                         | Initial locked balance for a new side chain.                                                |          |
| is_privilege_preserved              | `bool `                          | Creator privilege boolean flag: True if chain creator privilege preserved, otherwise false. |          |
| side_chain_token_creation_request   | `SideChainTokenCreationRequest ` | Side chain token information.                                                               |          |
| side_chain_token_initial_issue_list | `SideChainTokenInitialIssue `    | A list of accounts and amounts that will be issued when the chain starts.                   | repeated |
| initial_resource_amount             | `InitialResourceAmountEntry `    | The initial rent resources.                                                                 | repeated |

### acs7.SideChainCreationRequest.InitialResourceAmountEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `int32 `  |             |       |

### acs7.SideChainIndexingInformation

| Field          | Type     | Description         | Label |
| -------------- | -------- | ------------------- | ----- |
| chain_id       | `int32 ` | The side chain id.  |       |
| indexed_height | `int64 ` | The indexed height. |       |

### acs7.SideChainIndexingInformationList

| Field                     | Type                            | Description                                          | Label    |
| ------------------------- | ------------------------------- | ---------------------------------------------------- | -------- |
| indexing_information_list | `SideChainIndexingInformation ` | A list contains indexing information of side chains. | repeated |

### acs7.SideChainTokenCreationRequest

| Field                         | Type      | Description                                        | Label |
| ----------------------------- | --------- | -------------------------------------------------- | ----- |
| side_chain_token_symbol       | `string ` | Token symbol of the side chain to be created       |       |
| side_chain_token_name         | `string ` | Token name of the side chain to be created         |       |
| side_chain_token_total_supply | `int64 `  | Token total supply of the side chain to be created |       |
| side_chain_token_decimals     | `int32  ` | Token decimals of the side chain to be created     |       |

### acs7.SideChainTokenInitialIssue

| Field   | Type            | Description                      | Label |
| ------- | --------------- | -------------------------------- | ----- |
| address | `aelf.Address ` | The account that will be issued. |       |
| amount  | `int64 `        | The amount that will be issued.  |       |

### acs7.VerifyTransactionInput

| Field               | Type                | Description                                                | Label |
| ------------------- | ------------------- | ---------------------------------------------------------- | ----- |
| transaction_id      | `aelf.Hash `        | The cross chain transaction id to verify.                  |       |
| path                | `aelf.MerklePath  ` | The merkle path of the transaction.                        |       |
| parent_chain_height | `int64 `            | The height of parent chain that indexing this transaction. |       |
| verified_chain_id   | `int32 `            | The chain if to verify.                                    |       |

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
| non_indexed | `bytes `   | The non-indexed data.                      |          |

### aelf.MerklePath

| Field             | Type               | Description            | Label    |
| ----------------- | ------------------ | ---------------------- | -------- |
| merkle_path_nodes | `MerklePathNode  ` | The merkle path nodes. | repeated |

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

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| value | `sint64 ` |             |       |

### aelf.ScopedStatePath

| Field   | Type         | Description                                            | Label |
| ------- | ------------ | ------------------------------------------------------ | ----- |
| address | `Address `   | The scope address, which will be the contract address. |       |
| path    | `StatePath ` | The path of contract state.                            |       |

### aelf.SmartContractRegistration

| Field              | Type      | Description                            | Label |
| ------------------ | --------- | -------------------------------------- | ----- |
| category           | `sint32 ` | The category of contract code (0: C#). |       |
| code               | `bytes `  | The byte array of the contract code.   |       |
| code_hash          | `Hash `   | The hash of the contract code.         |       |
| is_system_contract | `bool `   | Whether it is a system contract.       |       |
| version            | `int32 `  | The version of the current contract.   |       |

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

| Field          | Type                       | Description                                                                                                                                                 | Label    |
| -------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| transaction_id | `Hash `                    | The transaction id.                                                                                                                                         |          |
| status         | `TransactionResultStatus ` | The transaction result status.                                                                                                                              |          |
| logs           | `LogEvent `                | The log events.                                                                                                                                             | repeated |
| bloom          | `bytes `                   | Bloom filter for transaction logs. A transaction log event can be defined in the contract and stored in the bloom filter after the transaction is executed. |          |
| return_value   | `bytes `                   | The return value of the transaction execution.                                                                                                              |          |
| block_number   | `int64 `                   | The height of the block that packages the transaction.                                                                                                      |          |
| block_hash     | `Hash `                    | The hash of the block that packages the transaction.                                                                                                        |          |
| error          | `string `                  | Failed execution error message.                                                                                                                             |          |

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
| contract_address | `aelf.Address ` | The contract address of the controller.   |       |
| owner_address    | `aelf.Address ` | The address of the owner of the contract. |       |
