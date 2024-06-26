# ACS7 - Contract CrossChain Standard

ACS7 is for implementing cross-chain contracts.

## Interface

This involves methods for chain creation and indexing:

### Methods

| Method Name                         | Request Type                                | Response Type                  | Description                                                         |
|-------------------------------------|---------------------------------------------|--------------------------------|---------------------------------------------------------------------|
| ProposeCrossChainIndexing           | acs7.CrossChainBlockData                    | google.protobuf.Empty          | Propose a cross-chain indexing.                                     |
| ReleaseCrossChainIndexingProposal   | acs7.ReleaseCrossChainIndexingProposalInput | google.protobuf.Empty          | Release the proposed indexing if approved.                          |
| RequestSideChainCreation            | acs7.SideChainCreationRequest               | google.protobuf.Empty          | Request side chain creation.                                        |
| ReleaseSideChainCreation            | acs7.ReleaseSideChainCreationInput          | google.protobuf.Empty          | Release the side chain creation request if approved.                |
| CreateSideChain                     | acs7.CreateSideChainInput                   | google.protobuf.Int32Value     | Create the side chain and return its ID. Only authorized users.     |
| Recharge                            | acs7.RechargeInput                          | google.protobuf.Empty          | Recharge a specified side chain.                                    |
| DisposeSideChain                    | google.protobuf.Int32Value                  | google.protobuf.Int32Value     | Dispose a side chain by ID. Only authorized users.                  |
| AdjustIndexingFeePrice              | acs7.AdjustIndexingFeeInput                 | google.protobuf.Empty          | Adjust side chain indexing fee. Only authorized users.              |
| VerifyTransaction                   | acs7.VerifyTransactionInput                 | google.protobuf.BoolValue      | Verify a cross-chain transaction.                                   |
| GetSideChainIdAndHeight             | google.protobuf.Empty                       | acs7.ChainIdAndHeightDict      | Get all side chain IDs and heights.                                 |
| GetSideChainIndexingInformationList | google.protobuf.Empty                       | acs7.SideChainIndexingInformationList | Get indexing information of side chains.                     |
| GetAllChainsIdAndHeight             | google.protobuf.Empty                       | acs7.ChainIdAndHeightDict      | Get IDs and heights of all chains.                                  |
| GetIndexedSideChainBlockDataByHeight| google.protobuf.Int64Value                  | acs7.IndexedSideChainBlockData | Get block data of indexed side chain by height.                     |
| GetBoundParentChainHeightAndMerklePathByHeight | google.protobuf.Int64Value       | acs7.CrossChainMerkleProofContext | Get Merkle path bound to side chain by height.                |
| GetChainInitializationData          | google.protobuf.Int32Value                  | acs7.ChainInitializationData   | Get initialization data for a specified side chain.                 |

### Types

#### acs7.AdjustIndexingFeeInput
| Field              | Description             | Label    |
|--------------------|-------------------------|----------|
| `side_chain_id` (int32) | The side chain ID       |          |
| `indexing_fee` (int64)  | The new indexing fee    |          |

#### acs7.ChainIdAndHeightDict
| Field                    | Description             | Label     |
|--------------------------|-------------------------|-----------|
| `id_height_dict` (map\<int32, int64\>) | Chain IDs and heights | repeated  |

#### acs7.ChainInitializationData
| Field                                  | Description                        | Label   |
|----------------------------------------|------------------------------------|---------|
| `chain_id` (int32)                     | Side chain ID                       |         |
| `creator` (aelf.Address)               | Creator's address                  |         |
| `creation_timestamp` (google.protobuf.Timestamp) | Creation timestamp        |         |
| `creation_height_on_parent_chain` (int64) | Height on parent chain          |         |
| `chain_creator_privilege_preserved` (bool) | If privilege is preserved     |         |
| `parent_chain_token_contract_address` (aelf.Address) | Token contract address |         |
| `chain_initialization_consensus_info` (ChainInitializationConsensusInfo) | Initial consensus info |         |
| `native_token_info_data` (bytes)       | Native token info                  |         |
| `resource_token_info` (ResourceTokenInfo) | Resource token info             |         |
| `chain_primary_token_info` (ChainPrimaryTokenInfo) | Primary token info       |         |

#### acs7.CreateSideChainInput
| Field                              | Description                     | Label    |
|------------------------------------|---------------------------------|----------|
| `side_chain_creation_request` (SideChainCreationRequest) | Creation request info    |          |
| `proposer` (aelf.Address)          | Proposer's address              |          |

#### acs7.CrossChainBlockData
| Field                               | Description                     | Label     |
|-------------------------------------|---------------------------------|-----------|
| `side_chain_block_data_list` (repeated SideChainBlockData) | List of side chain block data | repeated  |
| `parent_chain_block_data_list` (repeated ParentChainBlockData) | List of parent chain block data | repeated  |

#### acs7.RechargeInput
| Field              | Description             | Label    |
|--------------------|-------------------------|----------|
| `chain_id` (int32) | Side chain ID           |          |
| `amount` (int64)   | Amount to recharge      |          |

#### acs7.ReleaseCrossChainIndexingProposalInput
| Field                      | Description                 | Label     |
|----------------------------|-----------------------------|-----------|
| `chain_id_list` (repeated int32) | List of chain IDs to release | repeated  |

#### acs7.ReleaseSideChainCreationInput
| Field              | Description             | Label    |
|--------------------|-------------------------|----------|
| `proposal_id` (aelf.Hash) | Proposal ID          |          |

#### acs7.SideChainCreationRequest
| Field                                    | Description                        | Label     |
|------------------------------------------|------------------------------------|-----------|
| `indexing_price` (int64)                  | Cross-chain indexing price         |           |
| `locked_token_amount` (int64)             | Initial locked balance             |           |
| `is_privilege_preserved` (bool)           | If privilege is preserved          |           |
| `side_chain_token_creation_request` (SideChainTokenCreationRequest) | Token creation request |           |
| `side_chain_token_initial_issue_list` (repeated SideChainTokenInitialIssue) | Initial token issues list | repeated  |
| `initial_resource_amount` (repeated SideChainCreationRequest.InitialResourceAmountEntry) | Initial resource amounts | repeated  |

### Example
ACS7 defines methods for cross-chain scenarios. aelf provides an implementation for ACS7 called `CrossChainContract`. Refer to this implementation for more details.