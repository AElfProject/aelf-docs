# AElf.Contracts.Consensus.AEDPoS

## AEDPoS contract

Used to manage block producers and synchronize data. Implements AElf Standards ACS1, ACS4, ACS6, ACS10, and ACS11.

### Contract Methods

| Method Name                        | Request Type                               | Response Type                     | Description                                                              |
| ---------------------------------- | ------------------------------------------ | --------------------------------- | ------------------------------------------------------------------------ |
| InitialAElfConsensusContract       | `AEDPoS.InitialAElfConsensusContractInput` | `google.protobuf.Empty`           | Initialize the consensus contract.                                       |
| FirstRound                         | `AEDPoS.Round`                             | `google.protobuf.Empty`           | Initializes the consensus information in the first round.                |
| UpdateValue                        | `AEDPoS.UpdateValueInput`                  | `google.protobuf.Empty`           | Update consensus information.                                            |
| NextRound                          | `AEDPoS.NextRoundInput`                    | `google.protobuf.Empty`           | Update consensus information, create a new round.                        |
| NextTerm                           | `AEDPoS.NextTermInput`                     | `google.protobuf.Empty`           | Update consensus information, create a new term.                         |
| UpdateTinyBlockInformation         | `AEDPoS.TinyBlockInput`                    | `google.protobuf.Empty`           | Update consensus tiny block information.                                 |
| SetMaximumMinersCount              | `google.protobuf.Int32Value`               | `google.protobuf.Empty`           | Set the maximum count of miners, by default, is unlimited.               |
| ChangeMaximumMinersCountController | `AuthorityInfo`                            | `google.protobuf.Empty`           | Change the authority information for maximum miners count.               |
| RecordCandidateReplacement         | `AEDPoS.RecordCandidateReplacementInput`   | `google.protobuf.Empty`           | Notify AEDPoS Contract of candidate replacement.                         |
| GetCurrentMinerList                | `google.protobuf.Empty`                    | `AEDPoS.MinerList`                | Get the list of current miners.                                          |
| GetCurrentMinerPubkeyList          | `google.protobuf.Empty`                    | `AEDPoS.PubkeyList`               | Get the list of current miners in hexadecimal format.                    |
| GetCurrentMinerListWithRoundNumber | `google.protobuf.Empty`                    | `AEDPoS.MinerListWithRoundNumber` | Get the list of current miners and current round number.                 |
| GetRoundInformation                | `google.protobuf.Int64Value`               | `AEDPoS.Round`                    | Get information of the round according to round number.                  |
| GetCurrentRoundNumber              | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Get the current round number.                                            |
| GetCurrentRoundInformation         | `google.protobuf.Empty`                    | `AEDPoS.Round`                    | Get the current round information.                                       |
| GetPreviousRoundInformation        | `google.protobuf.Empty`                    | `AEDPoS.Round`                    | Get the previous round information.                                      |
| GetCurrentTermNumber               | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Get the current term number.                                             |
| GetCurrentTermMiningReward         | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Get the welfare reward for the current term.                             |
| GetMinerList                       | `AEDPoS.GetMinerListInput`                 | `AEDPoS.MinerList`                | Get the list of miners according to term number.                         |
| GetPreviousMinerList               | `google.protobuf.Empty`                    | `AEDPoS.MinerList`                | Get the list of miners in the previous term.                             |
| GetMinedBlocksOfPreviousTerm       | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Get the amount of mined blocks in the previous term.                     |
| GetNextMinerPubkey                 | `google.protobuf.Empty`                    | `google.protobuf.StringValue`     | Get the miner that produces the next block.                              |
| IsCurrentMiner                     | `aelf.Address`                             | `google.protobuf.BoolValue`       | Check if the account address is on the miner list for the current round. |
| GetNextElectCountDown              | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Get the left time before the next election takes effect (seconds).       |
| GetPreviousTermInformation         | `google.protobuf.Int64Value`               | `AEDPoS.Round`                    | Get term information according to term number.                           |
| GetRandomHash                      | `google.protobuf.Int64Value`               | `aelf.Hash`                       | Get random hash (Compatibility note).                                    |
| GetMaximumBlocksCount              | `google.protobuf.Empty`                    | `google.protobuf.Int32Value`      | Get the maximum of tiny blocks produced by a miner each round.           |
| GetMaximumMinersCount              | `google.protobuf.Empty`                    | `google.protobuf.Int32Value`      | Get the maximum count of miners.                                         |
| GetMaximumMinersCountController    | `google.protobuf.Empty`                    | `AuthorityInfo`                   | Get the authority information for maximum miners count.                  |
| GetMainChainCurrentMinerList       | `google.protobuf.Empty`                    | `AEDPoS.MinerList`                | Get the list of miners in the main chain.                                |
| GetPreviousTermMinerPubkeyList     | `google.protobuf.Empty`                    | `AEDPoS.PubkeyList`               | Get the list of miners in the previous term.                             |
| GetCurrentMiningRewardPerBlock     | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Query the current mining reward for each block.                          |
| SetMinerIncreaseInterval           | `google.protobuf.Int64Value`               | `google.protobuf.Empty`           | Set the current miner growth time interval.                              |
| GetMinerIncreaseInterval           | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Get the current miner growth time interval.                              |

# AElf.Standards.ACS1

## ACS1 Standard Methods

| Method Name               | Request Type                  | Response Type           | Description                                   |
| ------------------------- | ----------------------------- | ----------------------- | --------------------------------------------- |
| SetMethodFee              | `acs1.MethodFees`             | `google.protobuf.Empty` | Set the method fees for the specified method. |
| ChangeMethodFeeController | `AuthorityInfo`               | `google.protobuf.Empty` | Change the method fee controller.             |
| GetMethodFee              | `google.protobuf.StringValue` | `acs1.MethodFees`       | Query method fee information by method name.  |
| GetMethodFeeController    | `google.protobuf.Empty`       | `AuthorityInfo`         | Query the method fee controller.              |

# AElf.Contracts.Consensus.AEDPoS

## AEDPoS contract

Used for managing block producers and synchronizing data.

Implement AElf Standards ACS1, ACS4, ACS6, ACS10, and ACS11.

### Contract Methods

| Method Name                        | Request Type                               | Response Type                     | Description                                                                                                                                   |
| ---------------------------------- | ------------------------------------------ | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| InitialAElfConsensusContract       | `AEDPoS.InitialAElfConsensusContractInput` | `google.protobuf.Empty`           | Initialize the consensus contract.                                                                                                            |
| FirstRound                         | `AEDPoS.Round`                             | `google.protobuf.Empty`           | Initializes the consensus information in the first round.                                                                                     |
| UpdateValue                        | `AEDPoS.UpdateValueInput`                  | `google.protobuf.Empty`           | Update consensus information.                                                                                                                 |
| NextRound                          | `AEDPoS.NextRoundInput`                    | `google.protobuf.Empty`           | Update consensus information, create a new round.                                                                                             |
| NextTerm                           | `AEDPoS.NextTermInput`                     | `google.protobuf.Empty`           | Update consensus information, create a new term.                                                                                              |
| UpdateTinyBlockInformation         | `AEDPoS.TinyBlockInput`                    | `google.protobuf.Empty`           | Update consensus tiny block information.                                                                                                      |
| SetMaximumMinersCount              | `google.protobuf.Int32Value`               | `google.protobuf.Empty`           | Set the maximum count of miners, by default, is unlimited. If you want to control the count of miners, you need to set it through parliament. |
| ChangeMaximumMinersCountController | `AuthorityInfo`                            | `google.protobuf.Empty`           | The authority information for SetMaximumMinersCount, by default, is governed by parliament.                                                   |
| RecordCandidateReplacement         | `AEDPoS.RecordCandidateReplacementInput`   | `google.protobuf.Empty`           | Election Contract can notify AEDPoS Contract to aware candidate replacement happened.                                                         |
| GetCurrentMinerList                | `google.protobuf.Empty`                    | `AEDPoS.MinerList`                | Get the list of current miners.                                                                                                               |
| GetCurrentMinerPubkeyList          | `google.protobuf.Empty`                    | `AEDPoS.PubkeyList`               | Get the list of current miners (hexadecimal format).                                                                                          |
| GetCurrentMinerListWithRoundNumber | `google.protobuf.Empty`                    | `AEDPoS.MinerListWithRoundNumber` | Get the list of current miners and current round number.                                                                                      |
| GetRoundInformation                | `google.protobuf.Int64Value`               | `AEDPoS.Round`                    | Get information of the round according to round number.                                                                                       |
| GetCurrentRoundNumber              | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Get the current round number.                                                                                                                 |
| GetCurrentRoundInformation         | `google.protobuf.Empty`                    | `AEDPoS.Round`                    | Get the current round information.                                                                                                            |
| GetPreviousRoundInformation        | `google.protobuf.Empty`                    | `AEDPoS.Round`                    | Get the previous round information.                                                                                                           |
| GetCurrentTermNumber               | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Get the current term number.                                                                                                                  |
| GetCurrentTermMiningReward         | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Get the welfare reward the current term.                                                                                                      |
| GetMinerList                       | `AEDPoS.GetMinerListInput`                 | `AEDPoS.MinerList`                | Get the list of miners according to term number.                                                                                              |
| GetPreviousMinerList               | `google.protobuf.Empty`                    | `AEDPoS.MinerList`                | Get the list of miner in previous term.                                                                                                       |
| GetMinedBlocksOfPreviousTerm       | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Get the amount of mined blocks in previous term.                                                                                              |
| GetNextMinerPubkey                 | `google.protobuf.Empty`                    | `google.protobuf.StringValue`     | Get the miner that produces the next block.                                                                                                   |
| IsCurrentMiner                     | `aelf.Address`                             | `google.protobuf.BoolValue`       | Check to see if the account address is on the miner list for the current round.                                                               |
| GetNextElectCountDown              | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Query the left time before the next election takes effects (seconds).                                                                         |
| GetPreviousTermInformation         | `google.protobuf.Int64Value`               | `AEDPoS.Round`                    | Get term information according term number.                                                                                                   |
| GetRandomHash                      | `google.protobuf.Int64Value`               | `aelf.Hash`                       | Get random hash (Keep this for compatibility).                                                                                                |
| GetMaximumBlocksCount              | `google.protobuf.Empty`                    | `google.protobuf.Int32Value`      | Get maximum tiny blocks produced by miner each round.                                                                                         |
| GetMaximumMinersCount              | `google.protobuf.Empty`                    | `google.protobuf.Int32Value`      | Get the maximum count of miners.                                                                                                              |
| GetMaximumMinersCountController    | `google.protobuf.Empty`                    | `AuthorityInfo`                   | The authority information for GetMaximumMinersCount, by default, is governed by parliament.                                                   |
| GetMainChainCurrentMinerList       | `google.protobuf.Empty`                    | `AEDPoS.MinerList`                | Get the list of miners in main chain.                                                                                                         |
| GetPreviousTermMinerPubkeyList     | `google.protobuf.Empty`                    | `AEDPoS.PubkeyList`               | Get the list of miners in previous term.                                                                                                      |
| GetCurrentMiningRewardPerBlock     | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Query the current mining reward for each block.                                                                                               |
| SetMinerIncreaseInterval           | `google.protobuf.Int64Value`               | `google.protobuf.Empty`           | Set the current miner growth time interval.                                                                                                   |
| GetMinerIncreaseInterval           | `google.protobuf.Empty`                    | `google.protobuf.Int64Value`      | Get the current miner growth time interval.                                                                                                   |

# AElf.Standards.ACS4

## ACS4 Standard Methods

| Method Name                      | Request Type                 | Response Type                | Description                                                                                                                                                                                              |
| -------------------------------- | ---------------------------- | ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GetConsensusCommand              | `google.protobuf.BytesValue` | `acs4.ConsensusCommand`      | Generate a consensus command based on the consensus contract state and the input public key.                                                                                                             |
| GetConsensusExtraData            | `google.protobuf.BytesValue` | `google.protobuf.BytesValue` | Generate consensus extra data when a block is generated.                                                                                                                                                 |
| GenerateConsensusTransactions    | `google.protobuf.BytesValue` | `acs4.TransactionList`       | Generate consensus system transactions when a block is generated. Each block will contain only one consensus transaction, which is used to write the latest consensus information to the State database. |
| ValidateConsensusBeforeExecution | `google.protobuf.BytesValue` | `acs4.ValidationResult`      | Before executing the block, verify that the consensus information in the block header is correct.                                                                                                        |
| ValidateConsensusAfterExecution  | `google.protobuf.BytesValue` | `acs4.ValidationResult`      | After executing the block, verify that the state information written to the consensus is correct.                                                                                                        |

# AElf.Standards.ACS6

## ACS6 Standard Methods

| Method Name    | Request Type                 | Response Type                | Description                                  |
| -------------- | ---------------------------- | ---------------------------- | -------------------------------------------- |
| GetRandomBytes | `google.protobuf.BytesValue` | `google.protobuf.BytesValue` | Get random number according to block height. |

# AElf.Standards.ACS10

## ACS10 Standard Methods

| Method Name               | Request Type                 | Response Type           | Description                                                                                                                                                 |
| ------------------------- | ---------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Donate                    | `acs10.DonateInput`          | `google.protobuf.Empty` | Donates tokens from the caller to the treasury. If the tokens are not native tokens in the current chain, they will be first converted to the native token. |
| Release                   | `acs10.ReleaseInput`         | `google.protobuf.Empty` | Release dividend pool according the period number.                                                                                                          |
| SetSymbolList             | `acs10.SymbolList`           | `google.protobuf.Empty` | Set the token symbols dividend pool supports.                                                                                                               |
| GetSymbolList             | `google.protobuf.Empty`      | `acs10.SymbolList`      | Query the token symbols dividend pool supports.                                                                                                             |
| GetUndistributedDividends | `google.protobuf.Empty`      | `acs10.Dividends`       | Query the balance of undistributed tokens whose symbols are included in the symbol list.                                                                    |
| GetDividends              | `google.protobuf.Int64Value` | `acs10.Dividends`       | Query the dividend information according to the height.                                                                                                     |

# AElf.Standards.ACS11

## ACS11 Standard Methods

| Method Name                       | Request Type                 | Response Type                | Description                                                 |
| --------------------------------- | ---------------------------- | ---------------------------- | ----------------------------------------------------------- |
| UpdateInformationFromCrossChain   | `google.protobuf.BytesValue` | `google.protobuf.Empty`      | Update the consensus information of the side chain.         |
| GetChainInitializationInformation | `google.protobuf.BytesValue` | `google.protobuf.BytesValue` | Get the current miner list and consensus round information. |
| CheckCrossChainIndexingPermission | `aelf.Address`               | `google.protobuf.BoolValue`  | Verify that the input address is the current miner.         |

# Contract Types

## AElf.Contracts.Consensus.AEDPoS

### AEDPoS.AElfConsensusHeaderInformation

| Field         | Type                     | Description                 | Label |
| ------------- | ------------------------ | --------------------------- | ----- |
| sender_pubkey | `bytes`                  | The sender public key.      |       |
| round         | `Round`                  | The round information.      |       |
| behaviour     | `AElfConsensusBehaviour` | The behaviour of consensus. |       |

### AEDPoS.AElfConsensusHint

| Field             | Type                     | Description                 | Label |
| ----------------- | ------------------------ | --------------------------- | ----- |
| behaviour         | `AElfConsensusBehaviour` | The behaviour of consensus. |       |
| round_id          | `int64`                  | The round id.               |       |
| previous_round_id | `int64`                  | The previous round id.      |       |

### AEDPoS.AElfConsensusTriggerInformation

| Field              | Type                     | Description                      | Label    |
| ------------------ | ------------------------ | -------------------------------- | -------- |
| pubkey             | `bytes`                  | The miner public key.            |          |
| in_value           | `aelf.Hash`              | The InValue for current round.   |          |
| previous_in_value  | `aelf.Hash`              | The InValue for previous round.  |          |
| behaviour          | `AElfConsensusBehaviour` | The behaviour of consensus.      |          |
| encrypted_pieces   | `EncryptedPiecesEntry`   | The encrypted pieces of InValue. | repeated |
| decrypted_pieces   | `DecryptedPiecesEntry`   | The decrypted pieces of InValue. | repeated |
| revealed_in_values | `RevealedInValuesEntry`  | The revealed InValues.           | repeated |

### AEDPoS.AElfConsensusTriggerInformation.DecryptedPiecesEntry

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `bytes`  |             |       |

### AEDPoS.AElfConsensusTriggerInformation.EncryptedPiecesEntry

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `bytes`  |             |       |

### AEDPoS.AElfConsensusTriggerInformation.RevealedInValuesEntry

| Field | Type        | Description | Label |
| ----- | ----------- | ----------- | ----- |
| key   | `string`    |             |       |
| value | `aelf.Hash` |             |       |

### AEDPoS.Candidates

| Field   | Type    | Description                | Label    |
| ------- | ------- | -------------------------- | -------- |
| pubkeys | `bytes` | The candidate public keys. | repeated |

### AEDPoS.ConsensusInformation

| Field | Type    | Description | Label |
| ----- | ------- | ----------- | ----- |
| value | `bytes` |             |       |

### AEDPoS.GetMinerListInput

| Field       | Type    | Description      | Label |
| ----------- | ------- | ---------------- | ----- |
| term_number | `int64` | The term number. |       |

### AEDPoS.HashList

| Field  | Type        | Description | Label    |
| ------ | ----------- | ----------- | -------- |
| values | `aelf.Hash` |             | repeated |

### AEDPoS.InitialAElfConsensusContractInput

| Field                   | Type    | Description                                | Label |
| ----------------------- | ------- | ------------------------------------------ | ----- |
| is_term_stay_one        | `bool`  | Whether not to change the term.            |       |
| is_side_chain           | `bool`  | Is a side chain.                           |       |
| period_seconds          | `int64` | The number of seconds per term.            |       |
| miner_increase_interval | `int64` | The interval second that increases miners. |       |

### AEDPoS.IrreversibleBlockFound

| Field                     | Type    | Description                          | Label |
| ------------------------- | ------- | ------------------------------------ | ----- |
| irreversible_block_height | `int64` | The irreversible block height found. |       |

### AEDPoS.IrreversibleBlockHeightUnacceptable

| Field                                 | Type    | Description                                            | Label |
| ------------------------------------- | ------- | ------------------------------------------------------ | ----- |
| distance_to_irreversible_block_height | `int64` | Distance to the height of the last irreversible block. |       |

### AEDPoS.LatestPubkeyToTinyBlocksCount

| Field        | Type     | Description                             | Label |
| ------------ | -------- | --------------------------------------- | ----- |
| pubkey       | `string` | The miner public key.                   |       |
| blocks_count | `int64`  | The count of blocks the miner produced. |       |

### AEDPoS.MinerInRound

| Field                             | Type                                | Description                                                                              | Label    |
| --------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------------------- | -------- |
| order                             | `int32`                             | The order of the miner producing a block.                                                |          |
| is_extra_block_producer           | `bool`                              | Is the extra block producer in the current round.                                        |          |
| in_value                          | `aelf.Hash`                         | Generated by secret sharing and used for validation between miners.                      |          |
| out_value                         | `aelf.Hash`                         | Calculated from the current in value.                                                    |          |
| signature                         | `aelf.Hash`                         | Calculated from the current in value and signatures of the previous round.               |          |
| expected_mining_time              | `Timestamp`                         | The expected mining time.                                                                |          |
| produced_blocks                   | `int64`                             | The amount of produced blocks.                                                           |          |
| missed_time_slots                 | `int64`                             | The amount of missed time slots.                                                         |          |
| pubkey                            | `string`                            | The public key of this miner.                                                            |          |
| previous_in_value                 | `aelf.Hash`                         | The InValue of the previous round.                                                       |          |
| supposed_order_of_next_round      | `int32`                             | The supposed order of mining for the next round.                                         |          |
| final_order_of_next_round         | `int32`                             | The final order of mining for the next round.                                            |          |
| actual_mining_times               | `Timestamp`                         | The actual mining time, miners must fill the actual mining time when they do the mining. | repeated |
| encrypted_pieces                  | `MinerInRound.EncryptedPiecesEntry` | The encrypted pieces of InValue.                                                         | repeated |
| decrypted_pieces                  | `MinerInRound.DecryptedPiecesEntry` | The decrypted pieces of InValue.                                                         | repeated |
| produced_tiny_blocks              | `int64`                             | The amount of produced tiny blocks.                                                      |          |
| implied_irreversible_block_height | `int64`                             | The irreversible block height that the current miner recorded.                           |          |

### AEDPoS.MinerInRound.DecryptedPiecesEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `bytes `  |             |       |

### AEDPoS.MinerInRound.EncryptedPiecesEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `bytes `  |             |       |

### AEDPoS.MinerList

| Field   | Type     | Description                 | Label    |
| ------- | -------- | --------------------------- | -------- |
| pubkeys | `bytes ` | The miners public key list. | repeated |

### AEDPoS.MinerListWithRoundNumber

| Field        | Type         | Description         | Label |
| ------------ | ------------ | ------------------- | ----- |
| miner_list   | `MinerList ` | The list of miners. |       |
| round_number | `int64 `     | The round number.   |       |

### AEDPoS.MinerReplaced

| Field            | Type      | Description               | Label |
| ---------------- | --------- | ------------------------- | ----- |
| new_miner_pubkey | `string ` | The new miner public key. |       |

### AEDPoS.MiningInformationUpdated

| Field               | Type                           | Description                 | Label |
| ------------------- | ------------------------------ | --------------------------- | ----- |
| pubkey              | `string `                      | The miner public key.       |       |
| mining_time         | `google.protobuf.Timestamp   ` | The current block time.     |       |
| behaviour           | `string `                      | The behaviour of consensus. |       |
| block_height        | `int64 `                       | The current block height.   |       |
| previous_block_hash | `aelf.Hash   `                 | The previous block hash.    |       |

### AEDPoS.MiningRewardGenerated

| Field       | Type     | Description                                        | Label |
| ----------- | -------- | -------------------------------------------------- | ----- |
| term_number | `int64 ` | The number of term the mining reward is generated. |       |
| amount      | `int64 ` | The amount of mining reward.                       |       |

### AEDPoS.PubkeyList

| Field   | Type      | Description                 | Label    |
| ------- | --------- | --------------------------- | -------- |
| pubkeys | `string ` | The miners public key list. | repeated |

### AEDPoS.RandomNumberRequestInformation

| Field                 | Type     | Description                                            | Label |
| --------------------- | -------- | ------------------------------------------------------ | ----- |
| target_round_number   | `int64 ` | The random hash is likely generated during this round. |       |
| order                 | `int64 ` |                                                        |       |
| expected_block_height | `int64 ` |                                                        |       |

### AEDPoS.RecordCandidateReplacementInput

| Field      | Type      | Description | Label |
| ---------- | --------- | ----------- | ----- |
| old_pubkey | `string ` |             |       |
| new_pubkey | `string ` |             |       |

### AEDPoS.NextRoundInput

| Field                                     | Type                                    | Description                                                                   | Label    |
| ----------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------- | -------- |
| round_number                              | `int64 `                                | The round number.                                                             |          |
| real_time_miners_information              | `Round.RealTimeMinersInformationEntry ` | Current miner information, miner public key -> miner information.             | repeated |
| main_chain_miners_round_number            | `int64 `                                | The round number on the main chain.                                           |          |
| blockchain_age                            | `int64 `                                | The time from chain start to current round (seconds).                         |          |
| extra_block_producer_of_previous_round    | `string `                               | The miner public key that produced the extra block in the previous round.     |          |
| term_number                               | `int64 `                                | The current term number.                                                      |          |
| confirmed_irreversible_block_height       | `int64 `                                | The height of the confirmed irreversible block.                               |          |
| confirmed_irreversible_block_round_number | `int64 `                                | The round number of the confirmed irreversible block.                         |          |
| is_miner_list_just_changed                | `bool `                                 | Is miner list different from the the miner list in the previous round.        |          |
| round_id_for_validation                   | `int64 `                                | The round id, calculated by summing block producers’ expecting time (second). |          |
| random_number                             | `bytes `                                | The random number.                                                            |          |

### AEDPoS.NextTermInput

| Field                                     | Type                                    | Description                                                                   | Label    |
| ----------------------------------------- | --------------------------------------- | ----------------------------------------------------------------------------- | -------- |
| round_number                              | `int64 `                                | The round number.                                                             |          |
| real_time_miners_information              | `Round.RealTimeMinersInformationEntry ` | Current miner information, miner public key -> miner information.             | repeated |
| main_chain_miners_round_number            | `int64 `                                | The round number on the main chain.                                           |          |
| blockchain_age                            | `int64 `                                | The time from chain start to current round (seconds).                         |          |
| extra_block_producer_of_previous_round    | `string `                               | The miner public key that produced the extra block in the previous round.     |          |
| term_number                               | `int64 `                                | The current term number.                                                      |          |
| confirmed_irreversible_block_height       | `int64 `                                | The height of the confirmed irreversible block.                               |          |
| confirmed_irreversible_block_round_number | `int64 `                                | The round number of the confirmed irreversible block.                         |          |
| is_miner_list_just_changed                | `bool `                                 | Is miner list different from the the miner list in the previous round.        |          |
| round_id_for_validation                   | `int64 `                                | The round id, calculated by summing block producers’ expecting time (second). |          |
| random_number                             | `bytes `                                | The random number.                                                            |          |

### AEDPoS.Round.RealTimeMinersInformationEntry

| Field | Type            | Description | Label |
| ----- | --------------- | ----------- | ----- |
| key   | `string `       |             |       |
| value | `MinerInRound ` |             |       |

### AEDPoS.SecretSharingInformation

| Field             | Type     | Description                     | Label |
| ----------------- | -------- | ------------------------------- | ----- |
| previous_round    | `Round ` | The previous round information. |       |
| current_round_id  | `int64 ` | The current round id.           |       |
| previous_round_id | `int64 ` | The previous round id.          |       |

### AEDPoS.TermInfo

| Field        | Type     | Description | Label |
| ------------ | -------- | ----------- | ----- |
| term_number  | `int64 ` |             |       |
| round_number | `int64 ` |             |       |

### AEDPoS.TermNumberLookUp

| Field | Type                         | Description                  | Label    |
| ----- | ---------------------------- | ---------------------------- | -------- |
| map   | `TermNumberLookUp.MapEntry ` | Term number -> Round number. | repeated |

<div id="AEDPoS.TermNumberLookUp.MapEntry">
</div>

### AEDPoS.TermNumberLookUp.MapEntry

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| key   | `int64 ` |             |       |
| value | `int64 ` |             |       |

### AEDPoS.TinyBlockInput

| Field              | Type                           | Description               | Label |
| ------------------ | ------------------------------ | ------------------------- | ----- |
| round_id           | `int64 `                       | The round id.             |       |
| actual_mining_time | `google.protobuf.Timestamp   ` | The actual mining time.   |       |
| produced_blocks    | `int64 `                       | Count of blocks produced. |       |

### AEDPoS.UpdateValueInput

| Field                             | Type                                            | Description                                                                              | Label    |
| --------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------- | -------- |
| out_value                         | `aelf.Hash   `                                  | Calculated from current in value.                                                        |          |
| signature                         | `aelf.Hash   `                                  | Calculated from current in value and signatures of previous round.                       |          |
| round_id                          | `int64 `                                        | To ensure the values to update will apply to the correct round by comparing round id.    |          |
| previous_in_value                 | `aelf.Hash   `                                  | Publishes previous in value for validation of previous signature and previous out value. |          |
| actual_mining_time                | `google.protobuf.Timestamp   `                  | The actual mining time; miners must fill actual mining time when they mine.              |          |
| supposed_order_of_next_round      | `int32 `                                        | The supposed order of mining for the next round.                                         |          |
| tune_order_information            | `UpdateValueInput.TuneOrderInformationEntry `   | The tuning order of mining for the next round, miner public key -> order.                | repeated |
| encrypted_pieces                  | `UpdateValueInput.EncryptedPiecesEntry `        | The encrypted pieces of InValue.                                                         | repeated |
| decrypted_pieces                  | `UpdateValueInput.DecryptedPiecesEntry `        | The decrypted pieces of InValue.                                                         | repeated |
| produced_blocks                   | `int64 `                                        | The amount of produced blocks.                                                           |          |
| miners_previous_in_values         | `UpdateValueInput.MinersPreviousInValuesEntry ` | The InValue in the previous round, miner public key -> InValue.                          | repeated |
| implied_irreversible_block_height | `int64 `                                        | The irreversible block height that the miner recorded.                                   |          |

### AEDPoS.UpdateValueInput.DecryptedPiecesEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `bytes `  |             |       |

### AEDPoS.UpdateValueInput.EncryptedPiecesEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `bytes `  |             |       |

### AEDPoS.UpdateValueInput.MinersPreviousInValuesEntr

| Field | Type           | Description | Label |
| ----- | -------------- | ----------- | ----- |
| key   | `string `      |             |       |
| value | `aelf.Hash   ` |             |       |

### AEDPoS.UpdateValueInput.TuneOrderInformationEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `int32 `  |             |       |

### AEDPoS.VoteMinersCountInput

| Field        | Type     | Description | Label |
| ------------ | -------- | ----------- | ----- |
| miners_count | `int32 ` |             |       |
| amount       | `int64 ` |             |       |

### AEDPoS.AElfConsensusBehaviour

| Name         | Number | Description |
| ------------ | ------ | ----------- |
| UPDATE_VALUE | 0      |             |
| NEXT_ROUND   | 1      |             |
| NEXT_TERM    | 2      |             |
| NOTHING      | 3      |             |
| TINY_BLOCK   | 4      |             |

## AElf.Standards.ACS1

### acs1.MethodFee

| Field     | Type      | Description                         | Label |
| --------- | --------- | ----------------------------------- | ----- |
| symbol    | `string ` | The token symbol of the method fee. |       |
| basic_fee | `int64 `  | The amount of fees to be charged.   |       |

### acs1.MethodFees

| Field            | Type           | Description                                                  | Label    |
| ---------------- | -------------- | ------------------------------------------------------------ | -------- |
| method_name      | `string `      | The name of the method to be charged.                        |          |
| fees             | `MethodFee   ` | List of fees to be charged.                                  | repeated |
| is_size_fee_free | `bool `        | Optional based on the implementation of SetMethodFee method. |          |

### acs4.ConsensusCommand

| Field                              | Type                           | Description                                                                                | Label |
| ---------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------ | ----- |
| limit_milliseconds_of_mining_block | `int32 `                       | Time limit of mining next block.                                                           |       |
| hint                               | `bytes `                       | Context of Hint is diverse according to the consensus protocol we choose, so we use bytes. |       |
| arranged_mining_time               | `google.protobuf.Timestamp   ` | The time of arrange mining.                                                                |       |
| mining_due_time                    | `google.protobuf.Timestamp   ` | The expiration time of mining.                                                             |       |

### acs4.TransactionList

| Field        | Type                  | Description                    | Label    |
| ------------ | --------------------- | ------------------------------ | -------- |
| transactions | `aelf.Transaction   ` | Consensus system transactions. | repeated |

### acs4.ValidationResult

| Field         | Type      | Description                      | Label |
| ------------- | --------- | -------------------------------- | ----- |
| success       | `bool `   | Is successful.                   |       |
| message       | `string ` | The error message.               |       |
| is_re_trigger | `bool `   | Whether to trigger mining again. |       |

### acs10.Dividends

| Field | Type                      | Description                      | Label    |
| ----- | ------------------------- | -------------------------------- | -------- |
| value | `Dividends.ValueEntry   ` | The dividends, symbol -> amount. | repeated |

### acs10.Dividends.ValueEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `int64 `  |             |       |

### acs10.DonateInput

| Field  | Type      | Description                 | Label |
| ------ | --------- | --------------------------- | ----- |
| symbol | `string ` | The token symbol to donate. |       |
| amount | `int64 `  | The amount to donate.       |       |

### acs10.DonationReceived

| Field         | Type            | Description                   | Label |
| ------------- | --------------- | ----------------------------- | ----- |
| from          | `aelf.Address ` | The address of donors.        |       |
| pool_contract | `aelf.Address ` | The address of dividend pool. |       |
| symbol        | `string `       | The token symbol Donated.     |       |
| amount        | `int64 `        | The amount Donated.           |       |

### acs10.ReleaseInput

| Field         | Type     | Description                   | Label |
| ------------- | -------- | ----------------------------- | ----- |
| period_number | `int64 ` | The period number to release. |       |

### acs10.SymbolList

| Field | Type      | Description            | Label    |
| ----- | --------- | ---------------------- | -------- |
| value | `string ` | The token symbol list. | repeated |

### aelf.Address

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| value | `bytes ` |             |       |

### aelf.BinaryMerkleTree

| Field      | Type      | Description             | Label    |
| ---------- | --------- | ----------------------- | -------- |
| nodes      | `Hash   ` | The leaf nodes.         | repeated |
| root       | `Hash   ` | The root node hash.     |          |
| leaf_count | `int32 `  | The count of leaf node. |          |

### aelf.Hash

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| value | `bytes ` |             |       |

### aelf.LogEvent

| Field       | Type       | Description                | Label    |
| ----------- | ---------- | -------------------------- | -------- |
| address     | `Address ` | The contract address.      |          |
| name        | `string `  | The name of the log event. |          |
| indexed     | `bytes `   | The indexed data.          | repeated |
| non_indexed | `bytes `   | The non indexed data.      |          |

### aelf.MerklePath

| Field             | Type             | Description            | Label    |
| ----------------- | ---------------- | ---------------------- | -------- |
| merkle_path_nodes | `MerklePathNode` | The merkle path nodes. | repeated |

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

| Field   | Type        | Description                                            | Label |
| ------- | ----------- | ------------------------------------------------------ | ----- |
| address | `Address `  | The scope address, which will be the contract address. |       |
| path    | `StatePath` | The path of contract state.                            |       |

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

| Field            | Type       | Description                                                        | Label |
| ---------------- | ---------- | ------------------------------------------------------------------ | ----- |
| from             | `Address ` | The address of the sender of the transaction.                      |       |
| to               | `Address ` | The address of the contract when calling a contract.               |       |
| ref_block_number | `int64 `   | The height of the referenced block hash.                           |       |
| ref_block_prefix | `bytes `   | The first four bytes of the referenced block hash.                 |       |
| method_name      | `string `  | The name of a method in the smart contract at the To address.      |       |
| params           | `bytes `   | The parameters to pass to the smart contract method.               |       |
| signature        | `bytes `   | When signing a transaction it’s actually a subset of the fields... |       |

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

| Field          | Type                      | Description                                            | Label    |
| -------------- | ------------------------- | ------------------------------------------------------ | -------- |
| transaction_id | `Hash `                   | The transaction id.                                    |          |
| status         | `TransactionResultStatus` | The transaction result status.                         |          |
| logs           | `LogEvent `               | The log events.                                        | repeated |
| bloom          | `bytes `                  | Bloom filter for transaction logs.                     |          |
| return_value   | `bytes `                  | The return value of the transaction execution.         |          |
| block_number   | `int64 `                  | The height of the block that packages the transaction. |          |
| block_hash     | `Hash `                   | The hash of the block that packages the transaction.   |          |
| error          | `string `                 | Failed execution error message.                        |          |

### aelf.TransactionResultStatus

| Name                   | Number | Description                                                        |
| ---------------------- | ------ | ------------------------------------------------------------------ |
| NOT_EXISTED            | 0      | The execution result of the transaction does not exist.            |
| PENDING                | 1      | The transaction is in the transaction pool waiting to be packaged. |
| FAILED                 | 2      | Transaction execution failed.                                      |
| MINED                  | 3      | The transaction was successfully executed and successfully...      |
| CONFLICT               | 4      | When executed in parallel, there are conflicts with other...       |
| PENDING_VALIDATION     | 5      | The transaction is waiting for validation.                         |
| NODE_VALIDATION_FAILED | 6      | Transaction validation failed.                                     |

### AuthorityInfo

| Field            | Type            | Description                               | Label |
| ---------------- | --------------- | ----------------------------------------- | ----- |
| contract_address | `aelf.Address ` | The contract address of the controller.   |       |
| owner_address    | `aelf.Address ` | The address of the owner of the contract. |       |
