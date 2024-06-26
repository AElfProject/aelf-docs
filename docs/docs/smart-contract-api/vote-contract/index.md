---
sidebar_position: 11
title: Vote Contract
---

# Vote contract.

The Vote contract is an abstract layer for voting. Developers implement
concrete voting activities by calling this contract.

Implements aelf Standards ACS1.

## Contract Methods

| Method Name           | Request Type                  | Response Type                                    | Description                                                                           |
| --------------------- | ----------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Register              | `Vote.VotingRegisterInput `   | `google.protobuf.Empty <#google.protobuf.Empty>` | Create a voting activity.                                                             |
| Vote                  | `Vote.VoteInput `             | `google.protobuf.Empty <#google.protobuf.Empty>` | After successfully creating a voting activity, others are able to vote.               |
| Withdraw              | `Vote.WithdrawInput `         | `google.protobuf.Empty <#google.protobuf.Empty>` | A voter can withdraw the token after the lock time.                                   |
| TakeSnapshot          | `Vote.TakeSnapshotInput `     | `google.protobuf.Empty <#google.protobuf.Empty>` | Save the result of the specified number of votes and generates a new round of votes.  |
| AddOption             | `Vote.AddOptionInput `        | `google.protobuf.Empty <#google.protobuf.Empty>` | Add an option to a voting activity.                                                   |
| RemoveOption          | `Vote.RemoveOptionInput `     | `google.protobuf.Empty <#google.protobuf.Empty>` | Remove an option from a voting activity.                                              |
| AddOptions            | `Vote.AddOptionsInput `       | `google.protobuf.Empty <#google.protobuf.Empty>` | Add multiple options to a voting activity.                                            |
| RemoveOptions         | `Vote.RemoveOptionsInput `    | `google.protobuf.Empty <#google.protobuf.Empty>` | Remove multiple options from a voting activity.                                       |
| GetVotingItem         | `Vote.GetVotingItemInput `    | `Vote.VotingItem `                               | Get a voting activity information.                                                    |
| GetVotingResult       | `Vote.GetVotingResultInput `  | `Vote.VotingResult `                             | Get a voting result according to the provided voting activity id and snapshot number. |
| GetLatestVotingResult | `aelf.Hash `                  | `Vote.VotingResult `                             | Gets the latest result according to the voting activity id.                           |
| GetVotingRecord       | `aelf.Hash `                  | `Vote.VotingRecord `                             | Get the voting record according to vote id.                                           |
| GetVotingRecords      | `Vote.GetVotingRecordsInput ` | `Vote.VotingRecords <#Vote.VotingRecords>`       | Get the voting record according to vote ids.                                          |
| GetVotedItems         | `aelf.Address `               | `Vote.VotedItems <#Vote.VotedItems>`             | Get all voted information according to voter address.                                 |
| GetVotingIds          | `Vote.GetVotingIdsInput `     | `Vote.VotedIds `                                 | Get the vote ids according to voting activity id.                                     |

## AElf.Standards.ACS1

| Method Name               | Request Type                   | Response Type            | Description                                                                                        |
| ------------------------- | ------------------------------ | ------------------------ | -------------------------------------------------------------------------------------------------- |
| SetMethodFee              | `acs1.MethodFees `             | `google.protobuf.Empty ` | Set the method fees for the specified method. Note that this will override all fees of the method. |
| ChangeMethodFeeController | `AuthorityInfo`                | `google.protobuf.Empty ` | Change the method fee controller, the default is parliament and default organization.              |
| GetMethodFee              | `google.protobuf.StringValue ` | `acs1.MethodFees `       | Query method fee information by method name.                                                       |
| GetMethodFeeController    | `google.protobuf.Empty `       | `AuthorityInfo`          | Query the method fee controller.                                                                   |

 **Contract Types**

## AElf.Contracts.Vote

### Vote.AddOptionInput

| Field          | Type         | Description             | Label |
| -------------- | ------------ | ----------------------- | ----- |
| voting_item_id | `aelf.Hash ` | The voting activity id. |       |
| option         | `string `    | The new option to add.  |       |

### Vote.AddOptionsInput

| Field          | Type         | Description             | Label    |
| -------------- | ------------ | ----------------------- | -------- |
| voting_item_id | `aelf.Hash ` | The voting activity id. |          |
| options        | `string `    | The new options to add. | repeated |

### Vote.GetVotingIdsInput

| Field          | Type            | Description             | Label |
| -------------- | --------------- | ----------------------- | ----- |
| voter          | `aelf.Address ` | The address of voter.   |       |
| voting_item_id | `aelf.Hash `    | The voting activity id. |       |

### Vote.GetVotingItemInput

| Field          | Type         | Description             | Label |
| -------------- | ------------ | ----------------------- | ----- |
| voting_item_id | `aelf.Hash ` | The voting activity id. |       |

### Vote.GetVotingRecordsInput

| Field | Type         | Description   | Label    |
| ----- | ------------ | ------------- | -------- |
| ids   | `aelf.Hash ` | The vote ids. | repeated |

### Vote.GetVotingResultInput

| Field           | Type         | Description             | Label |
| --------------- | ------------ | ----------------------- | ----- |
| voting_item_id  | `aelf.Hash ` | The voting activity id. |       |
| snapshot_number | `int64 `     | The snapshot number.    |       |

### Vote.RemoveOptionInput

| Field          | Type         | Description             | Label |
| -------------- | ------------ | ----------------------- | ----- |
| voting_item_id | `aelf.Hash ` | The voting activity id. |       |
| option         | `string `    | The option to remove.   |       |

### Vote.RemoveOptionsInput

| Field          | Type         | Description             | Label    |
| -------------- | ------------ | ----------------------- | -------- |
| voting_item_id | `aelf.Hash ` | The voting activity id. |          |
| options        | `string `    | The options to remove.  | repeated |

### Vote.TakeSnapshotInput

| Field           | Type         | Description                  | Label |
| --------------- | ------------ | ---------------------------- | ----- |
| voting_item_id  | `aelf.Hash ` | The voting activity id.      |       |
| snapshot_number | `int64 `     | The snapshot number to take. |       |

### Vote.VoteInput

| Field            | Type            | Description             | Label |
| ---------------- | --------------- | ----------------------- | ----- |
| voting_item_id   | `aelf.Hash `    | The voting activity id. |       |
| voter            | `aelf.Address ` | The address of voter.   |       |
| amount           | `int64 `        | The amount of vote.     |       |
| option           | `string `       | The option to vote.     |       |
| vote_id          | `aelf.Hash `    | The vote id.            |       |
| is_change_target | `bool `         | Whether vote others.    |       |

### Vote.Voted

| Field           | Type                                                     | Description             | Label |
| --------------- | -------------------------------------------------------- | ----------------------- | ----- |
| voting_item_id  | `aelf.Hash `                                             | The voting activity id. |       |
| voter           | `aelf.Address `                                          | The address of voter.   |       |
| snapshot_number | `int64 `                                                 | The snapshot number.    |       |
| amount          | `int64 `                                                 | The amount of vote.     |       |
| vote_timestamp  | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The time of vote.       |       |
| option          | `string `                                                | The option voted.       |       |
| vote_id         | `aelf.Hash `                                             | The vote id.            |       |

### Vote.VotedIds

| Field           | Type         | Description             | Label    |
| --------------- | ------------ | ----------------------- | -------- |
| active_votes    | `aelf.Hash ` | The active vote ids.    | repeated |
| withdrawn_votes | `aelf.Hash ` | The withdrawn vote ids. | repeated |

### Vote.VotedItems

| Field               | Type                                | Description    | Label    |
| ------------------- | ----------------------------------- | -------------- | -------- |
| voted_item_vote_ids | `VotedItems.VotedItemVoteIdsEntry ` | The voted ids. | repeated |

### Vote.VotedItems.VotedItemVoteIdsEntry

| Field | Type        | Description | Label |
| ----- | ----------- | ----------- | ----- |
| key   | `string `   |             |       |
| value | `VotedIds ` |             |       |

### Vote.VotingItem

| Field                            | Type                                                     | Description                                    | Label    |
| -------------------------------- | -------------------------------------------------------- | ---------------------------------------------- | -------- |
| voting_item_id                   | `aelf.Hash `                                             | The voting activity id.                        |          |
| accepted_currency                | `string `                                                | The token symbol which will be accepted.       |          |
| is_lock_token                    | `bool `                                                  | Whether the vote will lock token.              |          |
| current_snapshot_number          | `int64 `                                                 | The current snapshot number.                   |          |
| total_snapshot_number            | `int64 `                                                 | The total snapshot number.                     |          |
| options                          | `string `                                                | The list of options.                           | repeated |
| register_timestamp               | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The register time of the voting activity.      |          |
| start_timestamp                  | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The start time of the voting.                  |          |
| end_timestamp                    | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The end time of the voting.                    |          |
| current_snapshot_start_timestamp | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The start time of current round of the voting. |          |
| sponsor                          | `aelf.Address `                                          | The sponsor address of the voting activity.    |          |

### Vote.VotingItemRegistered

| Field                            | Type                                                     | Description                                    | Label |
| -------------------------------- | -------------------------------------------------------- | ---------------------------------------------- | ----- |
| voting_item_id                   | `aelf.Hash `                                             | The voting activity id.                        |       |
| accepted_currency                | `string `                                                | The token symbol which will be accepted.       |       |
| is_lock_token                    | `bool `                                                  | Whether the vote will lock token.              |       |
| current_snapshot_number          | `int64 `                                                 | The current snapshot number.                   |       |
| total_snapshot_number            | `int64 `                                                 | The total number of snapshots of the vote.     |       |
| register_timestamp               | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The register time of the voting activity.      |       |
| start_timestamp                  | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The start time of the voting.                  |       |
| end_timestamp                    | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The end time of the voting.                    |       |
| current_snapshot_start_timestamp | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The start time of current round of the voting. |       |
| sponsor                          | `aelf.Address `                                          | The sponsor address of the voting activity.    |       |

### Vote.VotingRecord

| Field              | Type                                                     | Description                          | Label |
| ------------------ | -------------------------------------------------------- | ------------------------------------ | ----- |
| voting_item_id     | `aelf.Hash `                                             | The voting activity id.              |       |
| voter              | `aelf.Address `                                          | The address of voter.                |       |
| snapshot_number    | `int64 `                                                 | The snapshot number.                 |       |
| amount             | `int64 `                                                 | The amount of vote.                  |       |
| withdraw_timestamp | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The time of withdraw.                |       |
| vote_timestamp     | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The time of vote.                    |       |
| is_withdrawn       | `bool `                                                  | Whether the vote had been withdrawn. |       |
| option             | `string `                                                | The option voted.                    |       |
| is_change_target   | `bool `                                                  | Whether vote others.                 |       |

### Vote.VotingRecords

| Field   | Type            | Description         | Label    |
| ------- | --------------- | ------------------- | -------- |
| records | `VotingRecord ` | The voting records. | repeated |

### Vote.VotingRegisterInput

| Field                 | Type                                                     | Description                                | Label    |
| --------------------- | -------------------------------------------------------- | ------------------------------------------ | -------- |
| start_timestamp       | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The start time of the voting.              |          |
| end_timestamp         | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The end time of the voting.                |          |
| accepted_currency     | `string `                                                | The token symbol which will be accepted.   |          |
| is_lock_token         | `bool `                                                  | Whether the vote will lock token.          |          |
| total_snapshot_number | `int64 `                                                 | The total number of snapshots of the vote. |          |
| options               | `string `                                                | The list of options.                       | repeated |

### Vote.VotingResult

| Field                    | Type                                                     | Description                                               | Label    |
| ------------------------ | -------------------------------------------------------- | --------------------------------------------------------- | -------- |
| voting_item_id           | `aelf.Hash `                                             | The voting activity id.                                   |          |
| results                  | `VotingResult.ResultsEntry `                             | The voting result, option -> amount of votes,             | repeated |
| snapshot_number          | `int64 `                                                 | The snapshot number.                                      |          |
| voters_count             | `int64 `                                                 | The total number of voters.                               |          |
| snapshot_start_timestamp | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The start time of this snapshot.                          |          |
| snapshot_end_timestamp   | `google.protobuf.Timestamp <#google.protobuf.Timestamp>` | The end time of this snapshot.                            |          |
| votes_amount             | `int64 `                                                 | Total votes received during the process of this snapshot. |          |

### Vote.VotingResult.ResultsEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `int64 `  |             |       |

### Vote.WithdrawInput

| Field   | Type         | Description  | Label |
| ------- | ------------ | ------------ | ----- |
| vote_id | `aelf.Hash ` | The vote id. |       |

### Vote.Withdrawn

| Field   | Type         | Description  | Label |
| ------- | ------------ | ------------ | ----- |
| vote_id | `aelf.Hash ` | The vote id. |       |

## AElf.Standards.ACS1

### acs1.MethodFee

| Field     | Type      | Description                         | Label |
| --------- | --------- | ----------------------------------- | ----- |
| symbol    | `string ` | The token symbol of the method fee. |       |
| basic_fee | `int64 `  | The amount of fees to be charged.   |       |

### acs1.MethodFees

| Field            | Type         | Description                                                  | Label    |
| ---------------- | ------------ | ------------------------------------------------------------ | -------- |
| method_name      | `string `    | The name of the method to be charged.                        |          |
| fees             | `MethodFee ` | List of fees to be charged.                                  | repeated |
| is_size_fee_free | `bool `      | Optional based on the implementation of SetMethodFee method. |          |

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

| Field       | Type       | Description                | Label    |
| ----------- | ---------- | -------------------------- | -------- |
| address     | `Address ` | The contract address.      |          |
| name        | `string `  | The name of the log event. |          |
| indexed     | `bytes `   | The indexed data.          | repeated |
| non_indexed | `bytes `   | The non indexed data.      |          |

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

| Field   | Type                          | Description                                            | Label |
| ------- | ----------------------------- | ------------------------------------------------------ | ----- |
| address | `Address `                    | The scope address, which will be the contract address. |       |
| path    | `StatePath <#aelf.StatePath>` | The path of contract state.                            |       |

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

| Field            | Type       | Description                                                                                                                              | Label |
| ---------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| from             | `Address ` | The address of the sender of the transaction.                                                                                            |       |
| to               | `Address ` | The address of the contract when calling a contract.                                                                                     |       |
| ref_block_number | `int64 `   | The height of the referenced block hash.                                                                                                 |       |
| ref_block_prefix | `bytes `   | The first four bytes of the referenced block hash.                                                                                       |       |
| method_name      | `string `  | The name of a method in the smart contract at the To address.                                                                            |       |
| params           | `bytes `   | The parameters to pass to the smart contract method.                                                                                     |       |
| signature        | `bytes `   | When signing a transaction it’s actually a subset of the fields: from/to and the target method as well as the parameter that were given. |       |

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

| Field          | Type                       | Description                                    | Label    |
| -------------- | -------------------------- | ---------------------------------------------- | -------- |
| transaction_id | `Hash `                    | The transaction id.                            |          |
| status         | `TransactionResultStatus ` | The transaction result status.                 |          |
| logs           | `LogEvent `                | The log events.                                | repeated |
| bloom          | `bytes `                   | Bloom filter for transaction logs.             |          |
| return_value   | `bytes `                   | The return value of the transaction execution. |          |            
| block_number | `int64 `** | The height of the block that packages the transaction. | |
| block_hash | `Hash `** | The hash of the block that packages the transaction. | |
| error | `string ` | Failed execution error message. | |

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
