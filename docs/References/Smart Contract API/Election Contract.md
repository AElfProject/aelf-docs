# AElf.Contracts.Election

## Election contract

Used for voting for Block Producers.Implement AElf Standards ACS1.

## Contract Methods

| Method Name                        | Request Type                                       | Response Type                                    | Description                                                                                                                                                                                                                                                              |
| ---------------------------------- | -------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| InitialElectionContract            | `Election.InitialElectionContractInput`            | `google.protobuf.Empty`                          | Initialize the election contract.                                                                                                                                                                                                                                        |
| RegisterElectionVotingEvent        | `google.protobuf.Empty`                            | `google.protobuf.Empty`                          | Register a new voting item through the vote contract.                                                                                                                                                                                                                    |
| TakeSnapshot                       | `Election.TakeElectionSnapshotInput`               | `google.protobuf.Empty`                          | Take a snapshot according to the term number and distribute profits.                                                                                                                                                                                                     |
| AnnounceElection                   | `aelf.Address`                                     | `google.protobuf.Empty`                          | To be a block producer, a user should first register to be a candidate and lock some tokens as a deposit. If the data center is not full, the user will be added automatically and get one weight for sharing a bonus in the future.                                     |
| QuitElection                       | `google.protobuf.StringValue`                      | `google.protobuf.Empty`                          | A candidate is able to quit the election provided they are not currently elected. If you quit successfully, the candidate will get their locked tokens back and will not receive any more bonus.                                                                         |
| Vote                               | `Election.VoteMinerInput`                          | `aelf.Hash`                                      | Used for voting for a candidate to be elected. The tokens you vote with will be locked until the end time. According to the number of tokens you voted and their lock time, you can get a corresponding weight for sharing the bonus in the future. Returns the vote id. |
| ChangeVotingOption                 | `Election.ChangeVotingOptionInput`                 | `google.protobuf.Empty`                          | Before the end time, you are able to change your vote target to other candidates.                                                                                                                                                                                        |
| Withdraw                           | `aelf.Hash`                                        | `google.protobuf.Empty`                          | After the lock time, your locked tokens will be unlocked, and you can withdraw them according to the vote id.                                                                                                                                                            |
| UpdateCandidateInformation         | `Election.UpdateCandidateInformationInput`         | `google.protobuf.Empty`                          | Update candidate information by the consensus contract.                                                                                                                                                                                                                  |
| UpdateMultipleCandidateInformation | `Election.UpdateMultipleCandidateInformationInput` | `google.protobuf.Empty`                          | Batch update candidate information by the consensus contract.                                                                                                                                                                                                            |
| UpdateMinersCount                  | `Election.UpdateMinersCountInput`                  | `google.protobuf.Empty`                          | Update the count of miners by the consensus contract.                                                                                                                                                                                                                    |
| SetProfitsReceiver                 | `Election.SetProfitsReceiverInput`                 | `google.protobuf.Empty`                          | Set the collect profits receiver address.                                                                                                                                                                                                                                |
| SetTreasurySchemeIds               | `Election.SetTreasurySchemeIdsInput`               | `google.protobuf.Empty`                          | Set the treasury profit ids.                                                                                                                                                                                                                                             |
| SetVoteWeightInterest              | `Election.VoteWeightInterestList`                  | `google.protobuf.Empty`                          | Set the weight of vote interest.                                                                                                                                                                                                                                         |
| SetVoteWeightProportion            | `Election.VoteWeightProportion`                    | `google.protobuf.Empty`                          | Set the weight of lock time and votes in the calculation of voting weight.                                                                                                                                                                                               |
| ChangeVoteWeightInterestController | `AuthorityInfo`                                    | `google.protobuf.Empty`                          | Change the controller for the weight of vote interest.                                                                                                                                                                                                                   |
| ReplaceCandidatePubkey             | `Election.ReplaceCandidatePubkeyInput`             | `google.protobuf.Empty`                          | Candidate admin can replace the candidate pubkey with a new pubkey.                                                                                                                                                                                                      |
| SetCandidateAdmin                  | `Election.SetCandidateAdminInput`                  | `google.protobuf.Empty`                          | Set the admin address of the candidate (mostly supply).                                                                                                                                                                                                                  |
| GetCandidates                      | `google.protobuf.Empty`                            | `Election.PubkeyList`                            | Get all candidates' public keys.                                                                                                                                                                                                                                         |
| GetVotedCandidates                 | `google.protobuf.Empty`                            | `Election.PubkeyList`                            | Get all candidates whose number of votes is greater than 0.                                                                                                                                                                                                              |
|                                    |
| GetCandidateInformation            | `google.protobuf.StringValue`                      | `Election.CandidateInformation`                  | Get a candidate’s information.                                                                                                                                                                                                                                           |
| GetVictories                       | `google.protobuf.Empty`                            | `Election.PubkeyList`                            | Get the victories of the latest term.                                                                                                                                                                                                                                    |
| GetTermSnapshot                    | `Election.GetTermSnapshotInput`                    | `Election.TermSnapshot`                          | Get the snapshot of term according to the term number.                                                                                                                                                                                                                   |
| GetMinersCount                     | `google.protobuf.Empty`                            | `google.protobuf.Int32Value`                     | Get the count of miners.                                                                                                                                                                                                                                                 |
| GetElectionResult                  | `Election.GetElectionResultInput`                  | `Election.ElectionResult`                        | Get the election result according to the term id.                                                                                                                                                                                                                        |
| GetElectorVote                     | `google.protobuf.StringValue`                      | `Election.ElectorVote`                           | Get the voter information according to the voter public key.                                                                                                                                                                                                             |
| GetElectorVoteWithRecords          | `google.protobuf.StringValue`                      | `Election.ElectorVote`                           | Gets the voter information including the active voting records (excluding withdrawn voting records).                                                                                                                                                                     |
| GetElectorVoteWithAllRecords       | `google.protobuf.StringValue`                      | `Election.ElectorVote`                           | Gets the voter information including the active and withdrawn voting records.                                                                                                                                                                                            |
| GetCandidateVote                   | `google.protobuf.StringValue`                      | `Election.CandidateVote`                         | Get voting information for the candidate according to the public key of the candidate.                                                                                                                                                                                   |
| GetCandidateVoteWithRecords        | `google.protobuf.StringValue`                      | `Election.CandidateVote`                         | Get voting information for the candidate according to the public key of the candidate.                                                                                                                                                                                   |
| GetCandidateVoteWithAllRecords     | `google.protobuf.StringValue`                      | `Election.CandidateVote`                         | Get voting information for the candidate according to the public key of the candidate (including the active and withdrawn voting records).                                                                                                                               |
| GetVotersCount                     | `google.protobuf.Empty`                            | `google.protobuf.Int64Value`                     | Get the total number of voters.                                                                                                                                                                                                                                          |
| GetVotesAmount                     | `google.protobuf.Empty`                            | `google.protobuf.Int64Value`                     | Get the total number of vote tokens.                                                                                                                                                                                                                                     |
| GetPageableCandidateInformation    | `Election.PageInformation`                         | `Election.GetPageableCandidateInformationOutput` | Get candidate information according to the index and length.                                                                                                                                                                                                             |
| GetMinerElectionVotingItemId       | `google.protobuf.Empty`                            | `aelf.Hash`                                      | Get the voting item id of miner election.                                                                                                                                                                                                                                |
| GetDataCenterRankingList           | `google.protobuf.Empty`                            | `Election.DataCenterRankingList`                 | Get the data center ranking list.                                                                                                                                                                                                                                        |
| GetVoteWeightSetting               | `google.protobuf.Empty`                            | `Election.VoteWeightInterestList`                | Get the weight of vote interest.                                                                                                                                                                                                                                         |
| GetVoteWeightProportion            | `google.protobuf.Empty`                            | `Election.VoteWeightProportion`                  | Get the weight of lock time and votes in the calculation of voting weight.                                                                                                                                                                                               |
| GetCalculateVoteWeight             | `Election.VoteInformation`                         | `google.protobuf.Int64Value`                     | Used to calculate the bonus weights that users can get by voting.                                                                                                                                                                                                        |
| GetVoteWeightInterestController    | `google.protobuf.Empty`                            | `AuthorityInfo`                                  | Query the controller for the weight of vote interest.                                                                                                                                                                                                                    |
| GetMinerReplacementInformation     | `Election.GetMinerReplacementInformationInput`     | `Election.MinerReplacementInformation`           | Inspect the evil nodes included in the specified miners and return to the replacement node.                                                                                                                                                                              |
| GetCandidateAdmin                  | `google.protobuf.StringValue`                      | `aelf.Address`                                   | Query candidate admin.                                                                                                                                                                                                                                                   |
| GetNewestPubkey                    | `google.protobuf.StringValue`                      | `google.protobuf.StringValue`                    | Query the newest pubkey of an old pubkey.                                                                                                                                                                                                                                |
| GetReplacedPubkey                  | `google.protobuf.StringValue`                      | `google.protobuf.StringValue`                    | Query the old pubkey.                                                                                                                                                                                                                                                    |

# AElf.Standards.ACS1

| Method Name               | Request Type                  | Response Type           | Description                                                                                        |
| ------------------------- | ----------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| SetMethodFee              | `acs1.MethodFees`             | `google.protobuf.Empty` | Set the method fees for the specified method. Note that this will override all fees of the method. |
| ChangeMethodFeeController | `AuthorityInfo`               | `google.protobuf.Empty` | Change the method fee controller, the default is parliament and default organization.              |
| GetMethodFee              | `google.protobuf.StringValue` | `acs1.MethodFees`       | Query method fee information by method name.                                                       |
| GetMethodFeeController    | `google.protobuf.Empty`       | `AuthorityInfo`         | Query the method fee controller.                                                                   |

# Contract Types

## AElf.Contracts.Election

### Election.CandidateDetail

| Field                 | Type                   | Description                                   | Label |
| --------------------- | ---------------------- | --------------------------------------------- | ----- |
| candidate_information | `CandidateInformation` | The candidate information.                    |       |
| obtained_votes_amount | `int64`                | The number of votes a candidate has obtained. |       |

### Election.CandidateInformation

| Field                       | Type        | Description                                                        | Label    |
| --------------------------- | ----------- | ------------------------------------------------------------------ | -------- |
| pubkey                      | `string`    | Candidate’s public key.                                            |          |
| terms                       | `int64`     | The number of terms that the candidate is elected.                 | repeated |
| produced_blocks             | `int64`     | The number of blocks the candidate has produced.                   |          |
| missed_time_slots           | `int64`     | The time slot for which the candidate failed to produce blocks.    |          |
| continual_appointment_count | `int64`     | The count of continual appointment.                                |          |
| announcement_transaction_id | `aelf.Hash` | The transaction id when the candidate announced.                   |          |
| is_current_candidate        | `bool`      | Indicate whether the candidate can be elected in the current term. |          |

### Election.CandidatePubkeyReplaced

| Field      | Type     | Description | Label |
| ---------- | -------- | ----------- | ----- |
| old_pubkey | `string` |             |       |
| new_pubkey | `string` |             |       |

### Election.CandidateVote

| Field                                | Type                   | Description                                       | Label    |
| ------------------------------------ | ---------------------- | ------------------------------------------------- | -------- |
| obtained_active_voting_record_ids    | `aelf.Hash`            | The active voting record ids obtained.            | repeated |
| obtained_withdrawn_voting_record_ids | `aelf.Hash`            | The active voting record ids that were withdrawn. | repeated |
| obtained_active_voted_votes_amount   | `int64`                | The total number of active votes obtained.        |          |
| all_obtained_voted_votes_amount      | `int64`                | The total number of votes obtained.               |          |
| obtained_active_voting_records       | `ElectionVotingRecord` | The active voting records.                        | repeated |
| obtained_withdrawn_votes_records     | `ElectionVotingRecord` | The voting records that were withdrawn.           | repeated |
| pubkey                               | `bytes`                | Public key for candidate.                         |          |

### Election.ChangeVotingOptionInput

| Field            | Type        | Description                   | Label |
| ---------------- | ----------- | ----------------------------- | ----- |
| vote_id          | `aelf.Hash` | The vote id to change.        |       |
| candidate_pubkey | `string`    | The new candidate public key. |       |

### Election.DataCenterRankingList

| Field        | Type                                     | Description                                                                      | Label    |
| ------------ | ---------------------------------------- | -------------------------------------------------------------------------------- | -------- |
| data_centers | `DataCenterRankingList.DataCentersEntry` | The top n \* 5 candidates with vote amount, candidate public key -> vote amount. | repeated |

### Election.DataCenterRankingList.DataCentersEntry

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `int64`  |             |       |

### Election.ElectionResult

| Field       | Type                          | Description                                                     | Label    |
| ----------- | ----------------------------- | --------------------------------------------------------------- | -------- |
| term_number | `int64`                       | The term number                                                 |          |
| results     | `ElectionResult.ResultsEntry` | The election result, candidates’ public key -> number of votes. | repeated |
| is_active   | `bool`                        | Whether an election is currently being held.                    |          |

### Election.ElectionResult.ResultsEntry

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `int64`  |             |       |

### Election.ElectionVotingRecord

| Field              | Type                        | Description                               | Label |
| ------------------ | --------------------------- | ----------------------------------------- | ----- |
| voter              | `aelf.Address`              | The address of voter.                     |       |
| candidate          | `string`                    | The public key of candidate.              |       |
| amount             | `int64`                     | Amount of voting.                         |       |
| term_number        | `int64`                     | The term number of voting.                |       |
| vote_id            | `aelf.Hash`                 | The vote id.                              |       |
| lock_time          | `int64`                     | Vote lock time.                           |       |
| unlock_timestamp   | `google.protobuf.Timestamp` | The unlock timestamp.                     |       |
| withdraw_timestamp | `google.protobuf.Timestamp` | The withdraw timestamp.                   |       |
| vote_timestamp     | `google.protobuf.Timestamp` | The vote timestamp.                       |       |
| is_withdrawn       | `bool`                      | Indicates if the vote has been withdrawn. |       |
| weight             | `int64`                     | Vote weight for sharing bonus.            |       |
| is_change_target   | `bool`                      | Whether vote others.                      |       |

### Election.ElectorVote

| Field                       | Type                   | Description                                                          | Label    |
| --------------------------- | ---------------------- | -------------------------------------------------------------------- | -------- |
| active_voting_record_ids    | `aelf.Hash`            | The active voting record ids.                                        | repeated |
| withdrawn_voting_record_ids | `aelf.Hash`            | The voting record ids that were withdrawn.                           | repeated |
| active_voted_votes_amount   | `int64`                | The total number of active votes.                                    |          |
| all_voted_votes_amount      | `int64`                | The total number of votes (including the number of votes withdrawn). |          |
| active_voting_records       | `ElectionVotingRecord` | The active voting records.                                           | repeated |
| withdrawn_votes_records     | `ElectionVotingRecord` | The voting records that were withdrawn.                              | repeated |
| pubkey                      | `bytes`                | Public key for voter.                                                |          |
| address                     | `aelf.Address`         | Address for voter.                                                   |          |

### Election.EvilMinerDetected

| Field  | Type     | Description                   | Label |
| ------ | -------- | ----------------------------- | ----- |
| pubkey | `string` | The public key of evil miner. |       |

### Election.GetElectionResultInput

| Field       | Type    | Description      | Label |
| ----------- | ------- | ---------------- | ----- |
| term_number | `int64` | The term number. |       |

### Election.GetMinerReplacementInformationInput

| Field              | Type     | Description                        | Label    |
| ------------------ | -------- | ---------------------------------- | -------- |
| current_miner_list | `string` | The current miner list to inspect. | repeated |

### Election.GetPageableCandidateInformationOutput

| Field | Type              | Description                    | Label    |
| ----- | ----------------- | ------------------------------ | -------- |
| value | `CandidateDetail` | The details of the candidates. | repeated |

### Election.GetTermSnapshotInput

| Field       | Type    | Description      | Label |
| ----------- | ------- | ---------------- | ----- |
| term_number | `int64` | The term number. |       |

### Election.InitialElectionContractInput

| Field                   | Type     | Description                                              | Label    |
| ----------------------- | -------- | -------------------------------------------------------- | -------- |
| minimum_lock_time       | `int64`  | Minimum number of seconds for locking.                   |          |
| maximum_lock_time       | `int64`  | Maximum number of seconds for locking.                   |          |
| miner_list              | `string` | The current miner list.                                  | repeated |
| time_each_term          | `int64`  | The number of seconds per term.                          |          |
| miner_increase_interval | `int64`  | The interval second that increases the number of miners. |          |

### Election.MinerReplacementInformation

| Field                         | Type     | Description                            | Label    |
| ----------------------------- | -------- | -------------------------------------- | -------- |
| alternative_candidate_pubkeys | `string` | The alternative candidate public keys. | repeated |
| evil_miner_pubkeys            | `string` | The evil miner public keys.            | repeated |

### Election.PageInformation

| Field  | Type    | Description            | Label |
| ------ | ------- | ---------------------- | ----- |
| start  | `int32` | The start index.       |       |
| length | `int32` | The number of records. |       |

### Election.PubkeyList

| Field | Type    | Description             | Label    |
| ----- | ------- | ----------------------- | -------- |
| value | `bytes` | Candidates’ public keys | repeated |

### Election.ReplaceCandidatePubkeyInput

| Field      | Type     | Description | Label |
| ---------- | -------- | ----------- | ----- |
| old_pubkey | `string` |             |       |
| new_pubkey | `string` |             |       |

### Election.SetCandidateAdminInput

| Field  | Type           | Description | Label |
| ------ | -------------- | ----------- | ----- |
| pubkey | `string`       |             |       |
| admin  | `aelf.Address` |             |       |

### Election.SetProfitsReceiverInput

| Field                     | Type           | Description                               | Label |
| ------------------------- | -------------- | ----------------------------------------- | ----- |
| candidate_pubkey          | `string`       | The candidate's public key.               |       |
| profits_receiver_address  | `aelf.Address` | The address of profits receiver.          |       |
| previous_receiver_address | `aelf.Address` | The previous address of profits receiver. |       |

### Election.SetTreasurySchemeIdsInput

| Field                   | Type        | Description                          | Label |
| ----------------------- | ----------- | ------------------------------------ | ----- |
| treasury_hash           | `aelf.Hash` | The scheme id of treasury reward.    |       |
| welfare_hash            | `aelf.Hash` | The scheme id of welfare reward.     |       |
| subsidy_hash            | `aelf.Hash` | The scheme id of subsidy reward.     |       |
| votes_reward_hash       | `aelf.Hash` | The scheme id of votes reward.       |       |
| re_election_reward_hash | `aelf.Hash` | The scheme id of re-election reward. |       |

### Election.TakeElectionSnapshotInput

| Field        | Type    | Description                              | Label |
| ------------ | ------- | ---------------------------------------- | ----- |
| term_number  | `int64` | The term number to take snapshot.        |       |
| mined_blocks | `int64` | The number of mined blocks of this term. |       |
| round_number | `int64` | The end round number of this term.       |       |

### Election.TermSnapshot

| Field            | Type                                                           | Description                                                     | Label    |
| ---------------- | -------------------------------------------------------------- | --------------------------------------------------------------- | -------- |
| end_round_number | `int64`                                                        | The end round number of this term.                              |          |
| mined_blocks     | `int64`                                                        | The number of blocks mined in this term.                        |          |
| election_result  | `TermSnapshot.ElectionResultEntry` (key: string, value: int64) | The election result, candidates’ public key -> number of votes. | repeated |

### Election.TermSnapshot.ElectionResultEntry

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `int64`  |             |       |

### Election.UpdateCandidateInformationInput

| Field                      | Type     | Description                                             | Label |
| -------------------------- | -------- | ------------------------------------------------------- | ----- |
| pubkey                     | `string` | The candidate public key.                               |       |
| recently_produced_blocks   | `int64`  | The number of blocks recently produced.                 |       |
| recently_missed_time_slots | `int64`  | The number of time slots recently missed.               |       |
| is_evil_node               | `bool`   | Is it an evil node. If true, will remove the candidate. |       |

### Election.UpdateMinersCountInput

| Field        | Type    | Description         | Label |
| ------------ | ------- | ------------------- | ----- |
| miners_count | `int32` | The count of miner. |       |

### Election.UpdateMultipleCandidateInformationInput

| Field | Type                                          | Description                          | Label    |
| ----- | --------------------------------------------- | ------------------------------------ | -------- |
| value | `UpdateCandidateInformationInput` (see below) | The candidate information to update. | repeated |

### UpdateCandidateInformationInput

| Field                      | Type     | Description                                             | Label |
| -------------------------- | -------- | ------------------------------------------------------- | ----- |
| pubkey                     | `string` | The candidate public key.                               |       |
| recently_produced_blocks   | `int64`  | The number of blocks recently produced.                 |       |
| recently_missed_time_slots | `int64`  | The number of time slots recently missed.               |       |
| is_evil_node               | `bool`   | Is it an evil node. If true, will remove the candidate. |       |

### Election.UpdateTermNumberInput

| Field       | Type    | Description      | Label |
| ----------- | ------- | ---------------- | ----- |
| term_number | `int64` | The term number. |       |

### Election.VoteInformation

| Field     | Type    | Description       | Label |
| --------- | ------- | ----------------- | ----- |
| amount    | `int64` | Amount of voting. |       |
| lock_time | `int64` | Vote lock time.   |       |

### Election.VoteMinerInput

| Field            | Type                        | Description                     | Label |
| ---------------- | --------------------------- | ------------------------------- | ----- |
| candidate_pubkey | `string`                    | The candidate public key.       |       |
| amount           | `int64`                     | The amount token to vote.       |       |
| end_timestamp    | `google.protobuf.Timestamp` | The end timestamp of this vote. |       |
| token            | `aelf.Hash`                 | Used to generate vote id.       |       |

### Election.VoteWeightInterest

| Field    | Type    | Description            | Label |
| -------- | ------- | ---------------------- | ----- |
| day      | `int32` | Number of days locked. |       |
| interest | `int32` | Locked interest.       |       |
| capital  | `int32` |                        |       |

### Election.VoteWeightInterestList

| Field                      | Type                             | Description                  | Label    |
| -------------------------- | -------------------------------- | ---------------------------- | -------- |
| vote_weight_interest_infos | `VoteWeightInterest` (see above) | The weight of vote interest. | repeated |

### Election.VoteWeightProportion

| Field             | Type    | Description                   | Label |
| ----------------- | ------- | ----------------------------- | ----- |
| time_proportion   | `int32` | The weight of lock time.      |       |
| amount_proportion | `int32` | The weight of the votes cast. |       |

# AElf.Standards.ACS1

### acs1.MethodFee

| Field     | Type     | Description                         | Label |
| --------- | -------- | ----------------------------------- | ----- |
| symbol    | `string` | The token symbol of the method fee. |       |
| basic_fee | `int64`  | The amount of fees to be charged.   |       |

### acs1.MethodFees

| Field            | Type                    | Description                                                  | Label    |
| ---------------- | ----------------------- | ------------------------------------------------------------ | -------- |
| method_name      | `string`                | The name of the method to be charged.                        |          |
| fees             | `MethodFee` (see above) | List of fees to be charged.                                  | repeated |
| is_size_fee_free | `bool`                  | Optional based on the implementation of SetMethodFee method. |          |

## AElf.Types

### aelf.Address

| Field | Type    | Description | Label |
| ----- | ------- | ----------- | ----- |
| value | `bytes` |             |       |

### aelf.BinaryMerkleTree

| Field      | Type               | Description             | Label    |
| ---------- | ------------------ | ----------------------- | -------- |
| nodes      | `Hash` (see below) | The leaf nodes.         | repeated |
| root       | `Hash` (see below) | The root node hash.     |          |
| leaf_count | `int32`            | The count of leaf node. |          |

### aelf.Hash

| Field | Type    | Description | Label |
| ----- | ------- | ----------- | ----- |
| value | `bytes` |             |       |

### aelf.LogEvent

| Field       | Type                  | Description                                | Label    |
| ----------- | --------------------- | ------------------------------------------ | -------- |
| address     | `Address` (see above) | The contract address.                      |          |
| name        | `string`              | The name of the log event.                 |          |
| indexed     | `bytes` (see below)   | The indexed data, used to calculate bloom. | repeated |
| non_indexed | `bytes`               | The non indexed data.                      |          |

### aelf.MerklePath

| Field             | Type                         | Description            | Label    |
| ----------------- | ---------------------------- | ---------------------- | -------- |
| merkle_path_nodes | `MerklePathNode` (see below) | The merkle path nodes. | repeated |

### aelf.MerklePathNode

| Field         | Type   | Description | Label |
| ------------- | ------ | ----------- | ----- |
| hash          | `Hash` |             |       |
| is_left_child | `bool` |             |       |

### aelf.SInt32Value

| Field | Type       | Description | Label |
| ----- | ---------- | ----------- | ----- |
| value | `sint32  ` |             |       |

### aelf.SInt64Value

| Field | Type        | Description | Label |
| ----- | ----------- | ----------- | ----- |
| value | `sint64   ` |             |       |

### aelf.ScopedStatePath

| Field   | Type         | Description                                            | Label |
| ------- | ------------ | ------------------------------------------------------ | ----- |
| address | `Address   ` | The scope address, which will be the contract address. |       |
| path    | `StatePath ` | The path of contract state.                            |       |

### aelf.SmartContractRegistration

| Field              | Type       | Description                           | Label |
| ------------------ | ---------- | ------------------------------------- | ----- |
| category           | `sint32  ` | The category of contract code(0: C#). |       |
| code               | `bytes   ` | The byte array of the contract code.  |       |
| code_hash          | `Hash   `  | The hash of the contract code.        |       |
| is_system_contract | `bool   `  | Whether it is a system contract.      |       |
| version            | `int32   ` | The version of the current contract.  |       |

### aelf.StatePath

| Field | Type        | Description                         | Label    |
| ----- | ----------- | ----------------------------------- | -------- |
| parts | `string   ` | The partial path of the state path. | repeated |

### aelf.Transaction

| Field            | Type         | Description                                                                                                                                                                                      | Label |
| ---------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| from             | `Address   ` | The address of the sender of the transaction.                                                                                                                                                    |       |
| to               | `Address   ` | The address of the contract when calling a contract.                                                                                                                                             |       |
| ref_block_number | `int64   `   | The height of the referenced block hash.                                                                                                                                                         |       |
| ref_block_prefix | `bytes   `   | The first four bytes of the referenced block hash.                                                                                                                                               |       |
| method_name      | `string   `  | The name of a method in the smart contract at the To address.                                                                                                                                    |       |
| params           | `bytes   `   | The parameters to pass to the smart contract method.                                                                                                                                             |       |
| signature        | `bytes   `   | When signing a transaction it’s actually a subset of the fields: from/to and the target method as well as the parameter that were given. It also contains the reference block number and prefix. |       |

### aelf.TransactionExecutingStateSet

| Field   | Type                                         | Description         | Label    |
| ------- | -------------------------------------------- | ------------------- | -------- |
| writes  | `TransactionExecutingStateSet.WritesEntry `  | The changed states. | repeated |
| reads   | `TransactionExecutingStateSet.ReadsEntry`    | The read states.    | repeated |
| deletes | `TransactionExecutingStateSet.DeletesEntry ` | The deleted states. | repeated |

### aelf.TransactionExecutingStateSet.DeletesEntry

| Field | Type        | Description | Label |
| ----- | ----------- | ----------- | ----- |
| key   | `string   ` |             |       |
| value | `bool   `   |             |       |

### aelf.TransactionExecutingStateSet.ReadsEntry

| Field | Type        | Description | Label |
| ----- | ----------- | ----------- | ----- |
| key   | `string   ` |             |       |
| value | `bool   `   |             |       |

### aelf.TransactionExecutingStateSet.WritesEntry

| Field | Type        | Description | Label |
| ----- | ----------- | ----------- | ----- |
| key   | `string   ` |             |       |
| value | `bytes   `  |             |       |

### aelf.TransactionResult

| Field          | Type                       | Description                                           | Label    |
| -------------- | -------------------------- | ----------------------------------------------------- | -------- |
| transaction_id | `Hash   `                  | The transaction id.                                   |          |
| status         | `TransactionResultStatus ` | The transaction result status.                        |          |
| logs           | `LogEvent   `              | The log events.                                       | repeated |
| bloom          | `bytes   `                 | Bloom filter for transaction logs.                    |          |
| return_value   | `bytes   `                 | The return value of the transaction execution.        |          |
| block_number   | `int64   `                 | The height of the block hat packages the transaction. |          |
| block_hash     | `Hash   `                  | The hash of the block hat packages the transaction.   |          |
| error          | `string   `                | Failed execution error message.                       |          |

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

| Field            | Type              | Description                               | Label |
| ---------------- | ----------------- | ----------------------------------------- | ----- |
| contract_address | `aelf.Address   ` | The contract address of the controller.   |       |
| owner_address    | `aelf.Address   ` | The address of the owner of the contract. |       |
