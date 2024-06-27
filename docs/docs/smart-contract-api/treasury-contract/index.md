---
sidebar_position: 10
title: Treasury Contract
---

# Treasury Contract

Used for distributing bonuses to voters and candidates during the election process. Implement aelf Standards ACS1 and ACS10.

## Contract Methods

| Method Name                     | Request Type                                    | Response Type                                 | Description                                                                              |
| ------------------------------- | ----------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| InitialTreasuryContract         | `google.protobuf.Empty`                         | `google.protobuf.Empty`                       | Initialize treasury contract.                                                            |
| InitialMiningRewardProfitItem   | `google.protobuf.Empty`                         | `google.protobuf.Empty`                       | Initialize the sub-item of the bonus scheme.                                             |
| DonateAll                       | `Treasury.DonateAllInput`                       | `google.protobuf.Empty`                       | Donate all tokens owned by the sender.                                                   |
| SetDividendPoolWeightSetting    | `Treasury.DividendPoolWeightSetting`            | `google.protobuf.Empty`                       | Set the dividend weight of the sub-item of the dividend item.                            |
| SetMinerRewardWeightSetting     | `Treasury.MinerRewardWeightSetting`             | `google.protobuf.Empty`                       | Set the miner reward weight.                                                             |
| SetProfitsReceiver              | `Treasury.SetProfitsReceiverInput`              | `google.protobuf.Empty`                       | Set collect profits receiver address.                                                    |
| UpdateMiningReward              | `google.protobuf.Int64Value`                    | `google.protobuf.Empty`                       | Set the reward for mining.                                                               |
| ChangeTreasuryController        | `AuthorityInfo`                                 | `google.protobuf.Empty`                       | Change the governance authority information for the treasury contract.                   |
| RecordMinerReplacement          | `Treasury.RecordMinerReplacementInput`          | `google.protobuf.Empty`                       | AEDPoS Contract can notify Treasury Contract to be aware of miner replacement happening. |
| GetWelfareRewardAmountSample    | `Treasury.GetWelfareRewardAmountSampleInput`    | `Treasury.GetWelfareRewardAmountSampleOutput` | Used to estimate the revenue weight of 10000 tokens voted by users.                      |
| GetTreasurySchemeId             | `google.protobuf.Empty`                         | `aelf.Hash`                                   | Get the scheme id of treasury.                                                           |
| GetDividendPoolWeightProportion | `google.protobuf.Empty`                         | `Treasury.DividendPoolWeightProportion`       | Query the weight percentage of dividend pool items.                                      |
| GetMinerRewardWeightProportion  | `google.protobuf.Empty`                         | `Treasury.MinerRewardWeightProportion`        | Query the weight percentage of the dividend item for miners.                             |
| GetTreasuryController           | `google.protobuf.Empty`                         | `AuthorityInfo`                               | Query the governance authority information.                                              |
| GetProfitsReceiver              | `google.protobuf.StringValue`                   | `aelf.Address`                                | Get profits receiver. If not set, return the candidate's address.                        |
| GetProfitsReceiverOrDefault     | `google.protobuf.StringValue`                   | `aelf.Address`                                | Get profits receiver. If not set, return null.                                           |
| ReplaceCandidateProfitsReceiver | `Treasury.ReplaceCandidateProfitsReceiverInput` | `google.protobuf.Empty`                       | Query the governance authority information.                                              |

## AElf.Standards.ACS1

| Method Name               | Request Type                  | Response Type           | Description                                                                                        |
| ------------------------- | ----------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| SetMethodFee              | `acs1.MethodFees`             | `google.protobuf.Empty` | Set the method fees for the specified method. Note that this will override all fees of the method. |
| ChangeMethodFeeController | `AuthorityInfo`               | `google.protobuf.Empty` | Change the method fee controller, the default is parliament and default organization.              |
| GetMethodFee              | `google.protobuf.StringValue` | `acs1.MethodFees`       | Query method fee information by method name.                                                       |
| GetMethodFeeController    | `google.protobuf.Empty`       | `AuthorityInfo`         | Query the method fee controller.                                                                   |

## AElf.Standards.ACS10

| Method Name               | Request Type                 | Response Type           | Description                                                                                                                                                 |
| ------------------------- | ---------------------------- | ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Donate                    | `acs10.DonateInput`          | `google.protobuf.Empty` | Donates tokens from the caller to the treasury. If the tokens are not native tokens in the current chain, they will be first converted to the native token. |
| Release                   | `acs10.ReleaseInput`         | `google.protobuf.Empty` | Release dividend pool according to the period number.                                                                                                       |
| SetSymbolList             | `acs10.SymbolList`           | `google.protobuf.Empty` | Set the token symbols dividend pool supports.                                                                                                               |
| GetSymbolList             | `google.protobuf.Empty`      | `acs10.SymbolList`      | Query the token symbols dividend pool supports.                                                                                                             |
| GetUndistributedDividends | `google.protobuf.Empty`      | `acs10.Dividends`       | Query the balance of undistributed tokens whose symbols are included in the symbol list.                                                                    |
| GetDividends              | `google.protobuf.Int64Value` | `acs10.Dividends`       | Query the dividend information according to the height.                                                                                                     |

**Contract Types**

## AElf.Contracts.Treasury

### Treasury.DividendPoolWeightProportion

| Field                           | Type                   | Description                        | Label |
| ------------------------------- | ---------------------- | ---------------------------------- | ----- |
| citizen_welfare_proportion_info | `SchemeProportionInfo` | The proportion of citizen welfare. |       |
| backup_subsidy_proportion_info  | `SchemeProportionInfo` | The proportion of candidate nodes. |       |
| miner_reward_proportion_info    | `SchemeProportionInfo` | The proportion of miner            |       |

### Treasury.DividendPoolWeightSetting

| Field                  | Type    | Description                             | Label |
| ---------------------- | ------- | --------------------------------------- | ----- |
| citizen_welfare_weight | `int32` | The dividend weight of citizen welfare. |       |
| backup_subsidy_weight  | `int32` | The dividend weight of candidate nodes. |       |
| miner_reward_weight    | `int32` | The dividend weight of miner.           |       |

### Treasury.DonateAllInput

| Field  | Type     | Description                 | Label |
| ------ | -------- | --------------------------- | ----- |
| symbol | `string` | The token symbol to donate. |       |

### Treasury.GetWelfareRewardAmountSampleInput

| Field | Type    | Description      | Label    |
| ----- | ------- | ---------------- | -------- |
| value | `int64` | Token lock time. | repeated |

### Treasury.GetWelfareRewardAmountSampleOutput

| Field | Type    | Description            | Label    |
| ----- | ------- | ---------------------- | -------- |
| value | `int64` | The weight calculated. | repeated |

### Treasury.MinerReElectionInformation

| Field                       | Type                                                        | Description                              | Label    |
| --------------------------- | ----------------------------------------------------------- | ---------------------------------------- | -------- |
| continual_appointment_times | `MinerReElectionInformation.ContinualAppointmentTimesEntry` | The reappointment information for miner. | repeated |

### Treasury.MinerReElectionInformation.ContinualAppointmentTimesEntry

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `int64`  |             |       |

### Treasury.MinerRewardWeightProportion

| Field                               | Type                   | Description                                       | Label |
| ----------------------------------- | ---------------------- | ------------------------------------------------- | ----- |
| basic_miner_reward_proportion_info  | `SchemeProportionInfo` | The proportion of the basic income of the miner.  |       |
| votes_weight_reward_proportion_info | `SchemeProportionInfo` | The proportion of the vote of the miner.          |       |
| re_election_reward_proportion_info  | `SchemeProportionInfo` | The proportion of the reappointment of the miner. |       |

### Treasury.MinerRewardWeightSetting

| Field                      | Type    | Description                                            | Label |
| -------------------------- | ------- | ------------------------------------------------------ | ----- |
| basic_miner_reward_weight  | `int32` | The dividend weight of the basic income of the miner.  |       |
| votes_weight_reward_weight | `int32` | The dividend weight of the vote of the miner.          |       |
| re_election_reward_weight  | `int32` | The dividend weight of the reappointment of the miner. |       |

### Treasury.RecordMinerReplacementInput

| Field               | Type     | Description | Label |
| ------------------- | -------- | ----------- | ----- |
| old_pubkey          | `string` |             |       |
| new_pubkey          | `string` |             |       |
| current_term_number | `int64`  |             |       |

### Treasury.SchemeProportionInfo

| Field      | Type        | Description                 | Label |
| ---------- | ----------- | --------------------------- | ----- |
| scheme_id  | `aelf.Hash` | The scheme id.              |       |
| proportion | `int32`     | Dividend weight percentage. |       |

### Treasury.SetProfitsReceiverInput

| Field                    | Type        | Description                      | Label |
| ------------------------ | ----------- | -------------------------------- | ----- |
| pubkey                   | `string`    | The candidate's public key.      |       |
| profits_receiver_address | `aelf.Hash` | The address of profits receiver. |       |

### Treasury.ReplaceCandidateProfitsReceiverInput

| Field      | Type     | Description                     | Label |
| ---------- | -------- | ------------------------------- | ----- |
| old_pubkey | `string` | The old candidate's public key. |       |
| new_pubkey | `string` | The new candidate's public key. |       |


## AElf.Standards.ACS1

### acs1.MethodFee

| Field     | Type      | Description                         | Label |
| --------- | --------- | ----------------------------------- | ----- |
| symbol    | `string ` | The token symbol of the method fee. |       |
| basic_fee | `int64 `  | The amount of fees to be charged.   |       |

### acs1.MethodFees

| Field            | Type         | Description                           | Label    |
| ---------------- | ------------ | ------------------------------------- | -------- |
| method_name      | `string `    | The name of the method to be charged. |          |
| fees             | `MethodFee ` | List of fees to be charged.           | repeated |
| is_size_fee_free | `bool `      | Optional based on the implementation. |          |

## AElf.Standards.ACS10

### acs10.Dividends

| Field | Type                    | Description                      | Label    |
| ----- | ----------------------- | -------------------------------- | -------- |
| value | `Dividends.ValueEntry ` | The dividends, symbol -> amount. | repeated |

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

| Field             | Type              | Description            | Label    |
| ----------------- | ----------------- | ---------------------- | -------- |
| merkle_path_nodes | `MerklePathNode ` | The merkle path nodes. | repeated |

### aelf.MerklePathNode

| Field              | Type    | Description                     | Label |
| ------------------ | ------- | ------------------------------- | ----- |
| hash               | `Hash ` | The node hash.                  |       |
| is_left_child_node | `bool ` | Whether it's a left child node. |       |

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

| Field            | Type       | Description                                                                                                                                                                                        | Label |
| ---------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| from             | `Address ` | The address of the sender of the transaction.                                                                                                                                                      |       |
| to               | `Address ` | The address of the contract when calling a contract.                                                                                                                                               |       |
| ref_block_number | `int64 `   | The height of the referenced block hash.                                                                                                                                                           |       |
| ref_block_prefix | `bytes `   | The first four bytes of the referenced block hash.                                                                                                                                                 |       |
| method_name      | `string `  | The name of a method in the smart contract at the To address.                                                                                                                                      |       |
| params           | `bytes `   | The parameters to pass to the smart contract method.                                                                                                                                               |       |
| signature        | `bytes `   | When signing a transaction, it’s actually a subset of the fields: from/to and the target method, as well as the parameter that were given. It also contains the reference block number and prefix. |       |

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
