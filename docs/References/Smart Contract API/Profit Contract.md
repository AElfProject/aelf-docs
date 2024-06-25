# AElf.Contracts.Profit

## Profit contract

The Profit contract is an abstract layer for creating a scheme to share bonuses. Developers can build a system to distribute bonuses by calling this contract.

Implement AElf Standards ACS1.

### Contract Methods

| Method Name               | Request Type                     | Response Type                 | Description                                                                                                                     |
| ------------------------- | -------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| CreateScheme              | Profit.CreateSchemeInput         | aelf.Hash                     | Create a scheme for profit distribution and return the created scheme id.                                                       |
| AddBeneficiary            | Profit.AddBeneficiaryInput       | google.protobuf.Empty         | Add beneficiary to scheme.                                                                                                      |
| RemoveBeneficiary         | Profit.RemoveBeneficiaryInput    | google.protobuf.Empty         | Remove beneficiary from scheme.                                                                                                 |
| AddBeneficiaries          | Profit.AddBeneficiariesInput     | google.protobuf.Empty         | Batch add beneficiaries to scheme.                                                                                              |
| RemoveBeneficiaries       | Profit.RemoveBeneficiariesInput  | google.protobuf.Empty         | Batch remove beneficiaries from scheme.                                                                                         |
| ContributeProfits         | Profit.ContributeProfitsInput    | google.protobuf.Empty         | Contribute profit to a scheme.                                                                                                  |
| ClaimProfits              | Profit.ClaimProfitsInput         | google.protobuf.Empty         | The beneficiary draws tokens from the scheme.                                                                                   |
| DistributeProfits         | Profit.DistributeProfitsInput    | google.protobuf.Empty         | Distribute profits to schemes, including its sub-schemes according to period and token symbol; should be called by the manager. |
| AddSubScheme              | Profit.AddSubSchemeInput         | google.protobuf.Empty         | Add sub-scheme to a scheme. This effectively adds the specified sub-scheme as a beneficiary of the parent scheme.               |
| RemoveSubScheme           | Profit.RemoveSubSchemeInput      | google.protobuf.Empty         | Remove sub-scheme from a scheme.                                                                                                |
| ResetManager              | Profit.ResetManagerInput         | google.protobuf.Empty         | Reset the manager of a scheme.                                                                                                  |
| GetManagingSchemeIds      | Profit.GetManagingSchemeIdsInput | Profit.CreatedSchemeIds       | Get all schemes managed by the specified manager.                                                                               |
| GetScheme                 | aelf.Hash                        | Profit.Scheme                 | Get scheme according to scheme id.                                                                                              |
| GetSchemeAddress          | Profit.SchemePeriod              | aelf.Address                  | Get the virtual address of the number of periods of the scheme.                                                                 |
| GetDistributedProfitsInfo | Profit.SchemePeriod              | Profit.DistributedProfitsInfo | Query the distributed profit information for the specified period.                                                              |
| GetProfitDetails          | Profit.GetProfitDetailsInput     | Profit.ProfitDetails          | Query the beneficiary's profit information on the scheme.                                                                       |
| GetProfitAmount           | Profit.GetProfitAmountInput      | google.protobuf.Int64Value    | Query the amount of profit according to token symbol (up to 10 periods).                                                        |
| GetProfitsMap             | Profit.ClaimProfitsInput         | Profit.ReceivedProfitsMap     | Query all profit (up to 10 periods).                                                                                            |

### AElf.Standards.ACS1

| Method Name               | Request Type                | Response Type         | Description                                                                                        |
| ------------------------- | --------------------------- | --------------------- | -------------------------------------------------------------------------------------------------- |
| SetMethodFee              | acs1.MethodFees             | google.protobuf.Empty | Set the method fees for the specified method. Note that this will override all fees of the method. |
| ChangeMethodFeeController | AuthorityInfo               | google.protobuf.Empty | Change the method fee controller; the default is parliament and default organization.              |
| GetMethodFee              | google.protobuf.StringValue | acs1.MethodFees       | Query method fee information by method name.                                                       |
| GetMethodFeeController    | google.protobuf.Empty       | AuthorityInfo         | Query the method fee controller.                                                                   |

# Contract Types

## AElf.Contracts.Profit

### Profit.AddBeneficiariesInput

| Field              | Type             | Description                             | Label    |
| ------------------ | ---------------- | --------------------------------------- | -------- |
| scheme_id          | aelf.Hash        | The scheme id.                          |          |
| beneficiary_shares | BeneficiaryShare | The beneficiary information.            | repeated |
| end_period         | int64            | The end period for beneficiary profits. |          |

### Profit.AddBeneficiaryInput

| Field             | Type             | Description                             | Label |
| ----------------- | ---------------- | --------------------------------------- | ----- |
| scheme_id         | aelf.Hash        | The scheme id.                          |       |
| beneficiary_share | BeneficiaryShare | The beneficiary information.            |       |
| end_period        | int64            | The end period for beneficiary profits. |       |

### Profit.AddSubSchemeInput

| Field             | Type      | Description                      | Label |
| ----------------- | --------- | -------------------------------- | ----- |
| scheme_id         | aelf.Hash | The parent scheme id.            |       |
| sub_scheme_id     | aelf.Hash | The sub scheme id.               |       |
| sub_scheme_shares | int64     | The profit weight of sub scheme. |       |

### Profit.BeneficiaryShare

| Field       | Type         | Description                           | Label |
| ----------- | ------------ | ------------------------------------- | ----- |
| beneficiary | aelf.Address | The beneficiary's address.            |       |
| shares      | int64        | The profit weight of the beneficiary. |       |

### Profit.ClaimProfitsInput

| Field       | Type         | Description                | Label |
| ----------- | ------------ | -------------------------- | ----- |
| scheme_id   | aelf.Hash    | The scheme id.             |       |
| beneficiary | aelf.Address | The beneficiary's address. |       |

### Profit.ContributeProfitsInput

| Field     | Type      | Description                          | Label |
| --------- | --------- | ------------------------------------ | ----- |
| scheme_id | aelf.Hash | The scheme id to contribute.         |       |
| amount    | int64     | The amount to contribute.            |       |
| period    | int64     | The number of periods for dividends. |       |
| symbol    | string    | The token symbol to contribute.      |       |

### Profit.CreateSchemeInput

| Field                                        | Type         | Description                                                | Label |
| -------------------------------------------- | ------------ | ---------------------------------------------------------- | ----- |
| profit_receiving_due_period_count            | int64        | Period of profit distribution.                             |       |
| is_release_all_balance_every_time_by_default | bool         | Whether all the scheme balance is distributed each period. |       |
| delay_distribute_period_count                | int32        | Delay distribute period.                                   |       |
| manager                                      | aelf.Address | The manager of the scheme.                                 |       |
| can_remove_beneficiary_directly              | bool         | Whether you can directly remove beneficiaries.             |       |
| token                                        | aelf.Hash    | Used to generate scheme id.                                |       |

### Profit.CreatedSchemeIds

| Field      | Type      | Description     | Label    |
| ---------- | --------- | --------------- | -------- |
| scheme_ids | aelf.Hash | The scheme ids. | repeated |

Here's the content converted to Markdown format with the information presented in boxes:

### Profit.DistributeProfitsInput

| Field       | Type            | Description                                      | Label    |
| ----------- | --------------- | ------------------------------------------------ | -------- |
| scheme_id   | aelf.Hash       | The scheme id to distribute.                     |          |
| period      | int64           | The period number to distribute, current period. |          |
| amounts_map | AmountsMapEntry | The amount to distribute, symbol -> amount.      | repeated |

#### Profit.DistributeProfitsInput.AmountsMapEntry

| Field | Type   | Description | Label |
| ----- | ------ | ----------- | ----- |
| key   | string |             |       |
| value | int64  |             |       |

### Profit.DistributedProfitsInfo

| Field        | Type            | Description                                              | Label    |
| ------------ | --------------- | -------------------------------------------------------- | -------- |
| total_shares | int64           | Total shares in this scheme at the current period.       |          |
| amounts_map  | AmountsMapEntry | Contributed amount in this scheme at the current period. | repeated |
| is_released  | bool            | Whether released.                                        |          |

#### Profit.DistributedProfitsInfo.AmountsMapEntry

| Field | Type   | Description | Label |
| ----- | ------ | ----------- | ----- |
| key   | string |             |       |
| value | sint64 |             |       |

### Profit.GetManagingSchemeIdsInput

| Field   | Type         | Description          | Label |
| ------- | ------------ | -------------------- | ----- |
| manager | aelf.Address | The manager address. |       |

### Profit.GetProfitAmountInput

| Field       | Type         | Description            | Label |
| ----------- | ------------ | ---------------------- | ----- |
| scheme_id   | aelf.Hash    | The scheme id.         |       |
| symbol      | string       | The token symbol.      |       |
| beneficiary | aelf.Address | Beneficiary's address. |       |

### Profit.GetProfitDetailsInput

| Field       | Type         | Description            | Label |
| ----------- | ------------ | ---------------------- | ----- |
| scheme_id   | aelf.Hash    | The scheme id.         |       |
| beneficiary | aelf.Address | Beneficiary's address. |       |

### Profit.ProfitDetail

| Field              | Type  | Description                                                      | Label |
| ------------------ | ----- | ---------------------------------------------------------------- | ----- |
| start_period       | int64 | The start period number.                                         |       |
| end_period         | int64 | The end period number.                                           |       |
| shares             | int64 | The weight of the proceeds on the current period of the scheme.  |       |
| last_profit_period | int64 | The last period number that the beneficiary received the profit. |       |
| is_weight_removed  | bool  | Whether the weight has been removed.                             |       |

### Profit.ProfitDetails

| Field   | Type         | Description             | Label    |
| ------- | ------------ | ----------------------- | -------- |
| details | ProfitDetail | The profit information. | repeated |

#### Profit.ProfitDetails.ProfitDetail

| Field              | Type  | Description                 | Label |
| ------------------ | ----- | --------------------------- | ----- |
| start_period       | int64 | The start period number.    |       |
| end_period         | int64 | The end period number.      |       |
| shares             | int64 | The weight of the proceeds. |       |
| last_profit_period | int64 | The last period received.   |       |
| is_weight_removed  | bool  | Whether weight removed.     |       |

### Profit.ProfitsClaimed

| Field          | Type         | Description                     | Label |
| -------------- | ------------ | ------------------------------- | ----- |
| beneficiary    | aelf.Address | Beneficiary's address claimed.  |       |
| symbol         | string       | Token symbol claimed.           |       |
| amount         | int64        | The amount claimed.             |       |
| period         | int64        | The period number claimed.      |       |
| claimer_shares | int64        | Shares of the claimer.          |       |
| total_shares   | int64        | Total shares at current period. |       |

### Profit.ReceivedProfitsMap

| Field | Type                          | Description                                       | Label    |
| ----- | ----------------------------- | ------------------------------------------------- | -------- |
| value | ReceivedProfitsMap.ValueEntry | Collection of profits received, symbol -> amount. | repeated |

#### Profit.ReceivedProfitsMap.ValueEntry

| Field | Type   | Description | Label |
| ----- | ------ | ----------- | ----- |
| key   | string |             |       |
| value | int64  |             |       |

### Profit.RemoveBeneficiariesInput

| Field         | Type         | Description                 | Label    |
| ------------- | ------------ | --------------------------- | -------- |
| beneficiaries | aelf.Address | Addresses of beneficiaries. | repeated |
| scheme_id     | aelf.Hash    | The scheme id.              |          |

### Profit.RemoveBeneficiaryInput

| Field       | Type         | Description            | Label |
| ----------- | ------------ | ---------------------- | ----- |
| beneficiary | aelf.Address | Beneficiary's address. |       |
| scheme_id   | aelf.Hash    | The scheme id.         |       |

### Profit.RemoveSubSchemeInput

| Field         | Type      | Description           | Label |
| ------------- | --------- | --------------------- | ----- |
| scheme_id     | aelf.Hash | The parent scheme id. |       |
| sub_scheme_id | aelf.Hash | The sub scheme id.    |       |

### Profit.ResetManagerInput

| Field       | Type         | Description             | Label |
| ----------- | ------------ | ----------------------- | ----- |
| scheme_id   | aelf.Hash    | The scheme id.          |       |
| new_manager | aelf.Address | Address of new manager. |       |

### Profit.Scheme

| Field                                        | Type                               | Description                                                                                            | Label    |
| -------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------ | -------- |
| virtual_address                              | aelf.Address                       | The virtual address of the scheme.                                                                     |          |
| total_shares                                 | int64                              | The total weight of the scheme.                                                                        |          |
| manager                                      | aelf.Address                       | The manager of the scheme.                                                                             |          |
| current_period                               | int64                              | The current period.                                                                                    |          |
| sub_schemes                                  | SchemeBeneficiaryShare             | Sub schemes information.                                                                               | repeated |
| can_remove_beneficiary_directly              | bool                               | Whether you can directly remove the beneficiary.                                                       |          |
| profit_receiving_due_period_count            | int64                              | Period of profit distribution.                                                                         |          |
| is_release_all_balance_every_time_by_default | bool                               | Whether all the schemes balance will be distributed during distribution each period.                   |          |
| scheme_id                                    | aelf.Hash                          | The is of the scheme.                                                                                  |          |
| delay_distribute_period_count                | int32                              | Delay distribute period.                                                                               |          |
| cached_delay_total_shares                    | Scheme.CachedDelayTotalSharesEntry | Record the scheme's current total share for deferred distribution of benefits, period -> total shares. | repeated |
| received_token_symbols                       | string                             | The received token symbols.                                                                            | repeated |

### Profit.Scheme.CachedDelayTotalSharesEntry

| Field | Type  | Description | Label |
| ----- | ----- | ----------- | ----- |
| key   | int64 |             |       |
| value | int64 |             |       |

### Profit.SchemeBeneficiaryShare

| Field     | Type      | Description                   | Label |
| --------- | --------- | ----------------------------- | ----- |
| scheme_id | aelf.Hash | The id of the sub scheme.     |       |
| shares    | int64     | The weight of the sub scheme. |       |

### Profit.SchemeCreated

| Field                                        | Type         | Description                                                      | Label |
| -------------------------------------------- | ------------ | ---------------------------------------------------------------- | ----- |
| virtual_address                              | aelf.Address | The virtual address of the created scheme.                       |       |
| manager                                      | aelf.Address | The manager of the created scheme.                               |       |
| profit_receiving_due_period_count            | int64        | Period of profit distribution.                                   |       |
| is_release_all_balance_every_time_by_default | bool         | Whether all the schemes balance will be distributed each period. |       |
| scheme_id                                    | aelf.Hash    | The id of the created scheme.                                    |       |

### Profit.SchemePeriod

| Field     | Type      | Description        | Label |
| --------- | --------- | ------------------ | ----- |
| scheme_id | aelf.Hash | The scheme id.     |       |
| period    | int64     | The period number. |       |

## AElf.Standards.ACS1

### acs1.MethodFee

| Field     | Type   | Description                         | Label |
| --------- | ------ | ----------------------------------- | ----- |
| symbol    | string | The token symbol of the method fee. |       |
| basic_fee | int64  | The amount of fees to be charged.   |       |

### acs1.MethodFees

| Field            | Type      | Description                                                  | Label    |
| ---------------- | --------- | ------------------------------------------------------------ | -------- |
| method_name      | string    | The name of the method.                                      |          |
| fees             | MethodFee | List of fees to be charged.                                  | repeated |
| is_size_fee_free | bool      | Optional based on the implementation of SetMethodFee method. |          |

## AElf.Types

### aelf.Address

| Field | Type  | Description | Label |
| ----- | ----- | ----------- | ----- |
| value | bytes |             |       |

### aelf.BinaryMerkleTree

| Field      | Type  | Description             | Label    |
| ---------- | ----- | ----------------------- | -------- |
| nodes      | Hash  | The leaf nodes.         | repeated |
| root       | Hash  | The root node hash.     |          |
| leaf_count | int32 | The count of leaf node. |          |

### aelf.Hash

| Field | Type  | Description | Label |
| ----- | ----- | ----------- | ----- |
| value | bytes |             |       |

### aelf.LogEvent

| Field       | Type    | Description                                | Label    |
| ----------- | ------- | ------------------------------------------ | -------- |
| address     | Address | The contract address.                      |          |
| name        | string  | The name of the log event.                 |          |
| indexed     | bytes   | The indexed data, used to calculate bloom. | repeated |
| non_indexed | bytes   | The non indexed data.                      |          |

### aelf.MerklePath

| Field             | Type           | Description            | Label    |
| ----------------- | -------------- | ---------------------- | -------- |
| merkle_path_nodes | MerklePathNode | The merkle path nodes. | repeated |

### aelf.MerklePathNode

| Field              | Type | Description                      | Label |
| ------------------ | ---- | -------------------------------- | ----- |
| hash               | Hash | The node hash.                   |       |
| is_left_child_node | bool | Whether it is a left child node. |       |

### aelf.SInt32Value

| Field | Type   | Description | Label |
| ----- | ------ | ----------- | ----- |
| value | sint32 |             |       |

### aelf.SInt64Value

| Field | Type   | Description | Label |
| ----- | ------ | ----------- | ----- |
| value | sint64 |             |       |

### aelf.ScopedStatePath

| Field   | Type      | Description                                            | Label |
| ------- | --------- | ------------------------------------------------------ | ----- |
| address | Address   | The scope address, which will be the contract address. |       |
| path    | StatePath | The path of contract state.                            |       |

### aelf.SmartContractRegistration

| Field              | Type   | Description                           | Label |
| ------------------ | ------ | ------------------------------------- | ----- |
| category           | sint32 | The category of contract code(0: C#). |       |
| code               | bytes  | The byte array of the contract code.  |       |
| code_hash          | Hash   | The hash of the contract code.        |       |
| is_system_contract | bool   | Whether it is a system contract.      |       |
| version            | int32  | The version of the current contract.  |       |

### aelf.StatePath

| Field | Type   | Description                         | Label    |
| ----- | ------ | ----------------------------------- | -------- |
| parts | string | The partial path of the state path. | repeated |

### aelf.Transaction

| Field            | Type    | Description                                                                                                                              | Label |
| ---------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| from             | Address | The address of the sender of the transaction.                                                                                            |       |
| to               | Address | The address of the contract when calling a contract.                                                                                     |       |
| ref_block_number | int64   | The height of the referenced block hash.                                                                                                 |       |
| ref_block_prefix | bytes   | The first four bytes of the referenced block hash.                                                                                       |       |
| method_name      | string  | The name of a method in the smart contract at the To address.                                                                            |       |
| params           | bytes   | The parameters to pass to the smart contract method.                                                                                     |       |
| signature        | bytes   | When signing a transaction it’s actually a subset of the fields: from/to and the target method as well as the parameter that were given. |       |

### aelf.TransactionExecutingStateSet

| Field   | Type                                      | Description         | Label    |
| ------- | ----------------------------------------- | ------------------- | -------- |
| writes  | TransactionExecutingStateSet.WritesEntry  | The changed states. | repeated |
| reads   | TransactionExecutingStateSet.ReadsEntry   | The read states.    | repeated |
| deletes | TransactionExecutingStateSet.DeletesEntry | The deleted states. | repeated |

### aelf.TransactionExecutingStateSet.DeletesEntry

| Field | Type   | Description | Label |
| ----- | ------ | ----------- | ----- |
| key   | string |             |       |
| value | bool   |             |       |

### aelf.TransactionExecutingStateSet.ReadsEntry

| Field | Type   | Description | Label |
| ----- | ------ | ----------- | ----- |
| key   | string |             |       |
| value | bool   |             |       |

### aelf.TransactionExecutingStateSet.WritesEntry

| Field | Type   | Description | Label |
| ----- | ------ | ----------- | ----- |
| key   | string |             |       |
| value | bytes  |             |       |

### aelf.TransactionResult

| Field          | Type                    | Description                                            | Label    |
| -------------- | ----------------------- | ------------------------------------------------------ | -------- |
| transaction_id | Hash                    | The transaction id.                                    |          |
| status         | TransactionResultStatus | The transaction result status.                         |          |
| logs           | LogEvent                | The log events.                                        | repeated |
| bloom          | bytes                   | Bloom filter for transaction logs.                     |          |
| return_value   | bytes                   | The return value of the transaction execution.         |          |
| block_number   | int64                   | The height of the block that packages the transaction. |          |
| block_hash     | Hash                    | The hash of the block that packages the transaction.   |          |
| error          | string                  | Failed execution error message.                        |          |

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

# AuthorityInfo

| Field            | Type         | Description                             | Label |
| ---------------- | ------------ | --------------------------------------- | ----- |
| contract_address | aelf.Address | The contract address of the controller. |       |
