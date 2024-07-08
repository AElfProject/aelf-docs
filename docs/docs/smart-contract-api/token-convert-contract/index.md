---
sidebar_position: 14
title: Token Converter Contract
description: Connects aelf token with other tokens
---

# Token Converter Contract

Using this contract can build a connection between the base token and other tokens created on the chain. After building the connection, users can trade tokens with the Bancor model. You can find detailed information about Bancor in the AElf Economic System White Paper. Implement aelf Standards ACS1.

## Contract Methods

| Method Name                     | Request Type                            | Response Type                  | Description                                                                                                     |
| ------------------------------- | --------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| Initialize                      | `TokenConverter.InitializeInput`        | `google.protobuf.Empty`        | Initialize TokenConvert contract.                                                                               |
| SetConnector                    | `TokenConverter.Connector`              | `google.protobuf.Empty`        |                                                                                                                 |
| Buy                             | `TokenConverter.BuyInput`               | `google.protobuf.Empty`        | After establishing Bancor model of token and base token, you can buy token through this method.                 |
| Sell                            | `TokenConverter.SellInput`              | `google.protobuf.Empty`        | After establishing Bancor model of token and base token, you can sell token through this method.                |
| SetFeeRate                      | `google.protobuf.StringValue`           | `google.protobuf.Empty`        | Set the fee rate for buy/sell (fee amount = cost \* feeRate).                                                   |
| UpdateConnector                 | `TokenConverter.Connector`              | `google.protobuf.Empty`        | Before calling the EnableConnector, the connector controller can update the pair connector through this method. |
| AddPairConnector                | `TokenConverter.PairConnectorParam`     | `google.protobuf.Empty`        | Add a pair connector for new token and the base token.                                                          |
| EnableConnector                 | `TokenConverter.ToBeConnectedTokenInfo` | `google.protobuf.Empty`        | After adding a pair, you need to call this method to enable it before buying and selling tokens.                |
| ChangeConnectorController       | `AuthorityInfo`                         | `google.protobuf.Empty`        | Set the governance authority information for TokenConvert contract.                                             |
| GetPairConnector                | `TokenConverter.TokenSymbol`            | `TokenConverter.PairConnector` | Query the pair connector according to token symbol.                                                             |
| GetFeeRate                      | `google.protobuf.Empty`                 | `google.protobuf.StringValue`  | Query the fee rate for buy/sell.                                                                                |
| GetBaseTokenSymbol              | `google.protobuf.Empty`                 | `TokenConverter.TokenSymbol`   | Query the symbol of base token.                                                                                 |
| GetNeededDeposit                | `TokenConverter.ToBeConnectedTokenInfo` | `TokenConverter.DepositInfo`   | Query how much the base token needs to be deposited before enabling the connector.                              |
| GetDepositConnectorBalance      | `google.protobuf.StringValue`           | `google.protobuf.Int64Value`   | Query how much the base token has been deposited.                                                               |
| GetControllerForManageConnector | `google.protobuf.Empty`                 | `AuthorityInfo`                | Query the governance authority information for TokenConvert contract.                                           |
| IsSymbolAbleToSell              | `google.protobuf.StringValue`           | `google.protobuf.BoolValue`    | Query whether the token can be sold.                                                                            |

## AElf.Standards.ACS1

| Method Name               | Request Type                  | Response Type           | Description                                                                                        |
| ------------------------- | ----------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| SetMethodFee              | `acs1.MethodFees`             | `google.protobuf.Empty` | Set the method fees for the specified method. Note that this will override all fees of the method. |
| ChangeMethodFeeController | `AuthorityInfo`               | `google.protobuf.Empty` | Change the method fee controller, the default is parliament and default organization.              |
| GetMethodFee              | `google.protobuf.StringValue` | `acs1.MethodFees`       | Query method fee information by method name.                                                       |
| GetMethodFeeController    | `google.protobuf.Empty`       | `AuthorityInfo`         | Query the method fee controller.                                                                   |

# Contract Types

## AElf.Contracts.TokenConverter

### TokenConverter.BuyInput

| Field     | Type     | Description                                                                                                    | Label |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------- | ----- |
| symbol    | `string` | The token symbol you want to buy.                                                                              |       |
| amount    | `int64`  | The amount you want to buy.                                                                                    |       |
| pay_limit | `int64`  | Limit of cost. If the token required for buy exceeds this value, the buy will be abandoned. And 0 is no limit. |       |

### TokenConverter.Connector

| Field                      | Type     | Description                                                                                                              | Label |
| -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------ | ----- |
| symbol                     | `string` | The token symbol.                                                                                                        |       |
| virtual_balance            | `int64`  | The virtual balance for base token.                                                                                      |       |
| weight                     | `string` | The calculated weight value for this Connector.                                                                          |       |
| is_virtual_balance_enabled | `bool`   | Whether to use Virtual Balance.                                                                                          |       |
| is_purchase_enabled        | `bool`   | Whether the connector is enabled.                                                                                        |       |
| related_symbol             | `string` | Indicates its related connector, the pair connector includes a new created token connector and the base token connector. |       |
| is_deposit_account         | `bool`   | Indicates if the connector is base token connector.                                                                      |       |

### TokenConverter.DepositInfo

| Field                       | Type    | Description                                          | Label |
| --------------------------- | ------- | ---------------------------------------------------- | ----- |
| need_amount                 | `int64` | How much more base Token is needed as the deposit.   |       |
| amount_out_of_token_convert | `int64` | How many tokens are not on the TokenConvert address. |       |

### TokenConverter.InitializeInput

| Field             | Type        | Description                                            | Label    |
| ----------------- | ----------- | ------------------------------------------------------ | -------- |
| base_token_symbol | `string`    | Base token symbol, default is the native token symbol. |          |
| fee_rate          | `string`    | The fee rate for buy/sell.                             |          |
| connectors        | `Connector` | The default added connectors.                          | repeated |

### TokenConverter.PairConnector

| Field              | Type        | Description                           | Label |
| ------------------ | ----------- | ------------------------------------- | ----- |
| resource_connector | `Connector` | The connector of the specified token. |       |
| deposit_connector  | `Connector` | The related connector.                |       |

### TokenConverter.PairConnectorParam

| Field                     | Type     | Description                                         | Label |
| ------------------------- | -------- | --------------------------------------------------- | ----- |
| resource_connector_symbol | `string` | The token symbol.                                   |       |
| resource_weight           | `string` | The weight value of this token in the Bancor model. |       |
| native_virtual_balance    | `int64`  | This token corresponds to the value of base token.  |       |
| native_weight             | `string` | The weight value of base token in Bancor model.     |       |

### TokenConverter.SellInput

| Field         | Type     | Description                                                                                                                         | Label |
| ------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----- |
| symbol        | `string` | The token symbol you want to sell.                                                                                                  |       |
| amount        | `int64`  | The amount you want to sell.                                                                                                        |       |
| receive_limit | `int64`  | Limits on tokens obtained by selling. If the token obtained is less than this value, the sale will be abandoned. And 0 is no limit. |       |

### TokenConverter.ToBeConnectedTokenInfo

| Field                   | Type     | Description                                                             | Label |
| ----------------------- | -------- | ----------------------------------------------------------------------- | ----- |
| token_symbol            | `string` | The token symbol.                                                       |       |
| amount_to_token_convert | `int64`  | Specifies the number of tokens to convert to the TokenConvert contract. |       |

### TokenConverter.TokenBought

| Field         | Type     | Description                       | Label |
| ------------- | -------- | --------------------------------- | ----- |
| symbol        | `string` | The token symbol bought.          |       |
| bought_amount | `int64`  | The amount bought.                |       |
| base_amount   | `int64`  | The total cost of the base token. |       |
| fee_amount    | `int64`  | The fee amount.                   |       |

### TokenConverter.TokenSold

| Field       | Type     | Description                           | Label |
| ----------- | -------- | ------------------------------------- | ----- |
| symbol      | `string` | The token symbol sold.                |       |
| sold_amount | `int64`  | The amount sold.                      |       |
| base_amount | `int64`  | The total received of the base token. |       |
| fee_amount  | `int64`  | The fee amount.                       |       |

### TokenConverter.TokenSymbol

| Field  | Type      | Description       | Label |
| ------ | --------- | ----------------- | ----- |
| symbol | `string ` | The token symbol. |       |

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
| is_size_fee_free | `bool`       | Optional based on the implementation of SetMethodFee method. |          |

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
| is_left_child_node | `bool`  | Whether it is a left child node. |       |

### aelf.SInt32Value

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| value | `sint32 ` |             |       |

### aelf.SInt64Value

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| value | `sint64 ` |             |       |

### aelf.ScopedStatePath

| Field   | Type                           | Description                                            | Label |
| ------- | ------------------------------ | ------------------------------------------------------ | ----- |
| address | `Address`     | The scope address, which will be the contract address. |       |
| path    | `StatePath` | The path of contract state.                            |       |

### aelf.SmartContractRegistration

| Field              | Type                 | Description                            | Label |
| ------------------ | -------------------- | -------------------------------------- | ----- |
| category           | `sint32`  | The category of contract code (0: C#). |       |
| code               | `bytes`    | The byte array of the contract code.   |       |
| code_hash          | `Hash` | The hash of the contract code.         |       |
| is_system_contract | `bool`      | Whether it is a system contract.       |       |
| version            | `int32`    | The version of the current contract.   |       |

### aelf.StatePath

| Field | Type                | Description                         | Label    |
| ----- | ------------------- | ----------------------------------- | -------- |
| parts | `string` | The partial path of the state path. | repeated |

### aelf.Transaction

| Field            | Type                       | Description                                                                                                                                                                                      | Label |
| ---------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----- |
| from             | `Address` | The address of the sender of the transaction.                                                                                                                                                    |       |
| to               | `Address` | The address of the contract when calling a contract.                                                                                                                                             |       |
| ref_block_number | `int64`          | The height of the referenced block hash.                                                                                                                                                         |       |
| ref_block_prefix | `bytes`          | The first four bytes of the referenced block hash.                                                                                                                                               |       |
| method_name      | `string`        | The name of a method in the smart contract at the To address.                                                                                                                                    |       |
| params           | `bytes`          | The parameters to pass to the smart contract method.                                                                                                                                             |       |
| signature        | `bytes`          | When signing a transaction it’s actually a subset of the fields: from/to and the target method as well as the parameter that were given. It also contains the reference block number and prefix. |       |

### aelf.TransactionExecutingStateSet

| Field   | Type                                                                                           | Description         | Label    |
| ------- | ---------------------------------------------------------------------------------------------- | ------------------- | -------- |
| writes  | [`TransactionExecutingStateSet.WritesEntry`](#aelf.TransactionExecutingStateSet.WritesEntry)   | The changed states. | repeated |
| reads   | [`TransactionExecutingStateSet.ReadsEntry`](#aelf.TransactionExecutingStateSet.ReadsEntry)     | The read states.    | repeated |
| deletes | [`TransactionExecutingStateSet.DeletesEntry`](#aelf.TransactionExecutingStateSet.DeletesEntry) | The deleted states. | repeated |



### aelf.TransactionExecutingStateSet.DeletesEntry

| Field | Type                | Description | Label |
| ----- | ------------------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `bool`     |             |       |



### aelf.TransactionExecutingStateSet.ReadsEntry

| Field | Type                | Description | Label |
| ----- | ------------------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `bool`     |             |       |

### aelf.TransactionExecutingStateSet.WritesEntry

| Field | Type                | Description | Label |
| ----- | ------------------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `bytes`   |             |       |

### aelf.TransactionResult

| Field          | Type                                                       | Description                                                                                                                                                                                                                                                              | Label    |
| -------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| transaction_id | `Hash`                                    | The transaction id.                                                                                                                                                                                                                                                      |          |
| status         | `TransactionResultStatus` | The transaction result status.                                                                                                                                                                                                                                           |          |
| logs           | `LogEvent`                               | The log events.                                                                                                                                                                                                                                                          | repeated |
| bloom          | `bytes`                                          | Bloom filter for transaction logs. A transaction log event can be defined in the contract and stored in the bloom filter after the transaction is executed. Through this filter, we can quickly search for and determine whether a log exists in the transaction result. |          |
| return_value   | `bytes`                                          | The return value of the transaction execution.                                                                                                                                                                                                                           |          |
| block_number   | `int64`                                          | The height of the block hat packages the transaction.                                                                                                                                                                                                                    |          |
| block_hash     | `Hash`                                       | The hash of the block hat packages the transaction.                                                                                                                                                                                                                      |          |
| error          | `string`                                                 | Failed execution error message.                                                                                                                                                                                                                                          |          |

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

| Field            | Type                            | Description                               | Label |
| ---------------- | ------------------------------- | ----------------------------------------- | ----- |
| contract_address | `aelf.Address` | The contract address of the controller.   |       |
| owner_address    | `aelf.Address` | The address of the owner of the contract. |       |

