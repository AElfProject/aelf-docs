---
sidebar_position: 7
title: Multi Token Contract
---

# MultiToken Contract

The MultiToken contract is mainly used to manage the user's account and transaction fees related settings. Implements aelf Standards ACS1 and ACS2.

## Contract Methods

| Method Name                                         | Request Type                                                                                                      | Response Type                                                                          | Description                                                                                                                                                                                                                                                                                                                                                               |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | 
| AdvanceResourceToken                                | [`tokenimpl.AdvanceResourceTokenInput`](#tokenimpl.AdvanceResourceTokenInput)                                     | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Transfer resource tokens to designated contract address.                                                                                                                                                                                                                                                                                                                  |
| TakeResourceTokenBack                               | [`tokenimpl.TakeResourceTokenBackInput`](#tokenimpl.TakeResourceTokenBackInput)                                   | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Take token from contract address.                                                                                                                                                                                                                                                                                                                                         |
| RegisterCrossChainTokenContractAddress              | [`tokenimpl.RegisterCrossChainTokenContractAddressInput`](#tokenimpl.RegisterCrossChainTokenContractAddressInput) | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Register the token contract address for cross chain.                                                                                                                                                                                                                                                                                                                      |
| SetFeeReceiver                                      | [`aelf.Address`](#aelf.Address)                                                                                   | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Set the receiver address of the side chain transaction fee.                                                                                                                                                                                                                                                                                                               |
| ValidateTokenInfoExists                             | [`tokenimpl.ValidateTokenInfoExistsInput`](#tokenimpl.ValidateTokenInfoExistsInput)                               | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Validates if the token exist.                                                                                                                                                                                                                                                                                                                                             |
| UpdateRental                                        | [`tokenimpl.UpdateRentalInput`](#tokenimpl.UpdateRentalInput)                                                     | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Update the rental unit price of the side chain.                                                                                                                                                                                                                                                                                                                           |
| UpdateRentedResources                               | [`tokenimpl.UpdateRentedResourcesInput`](#tokenimpl.UpdateRentedResourcesInput)                                   | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Set the amount of resources fee per minute for the side chain.                                                                                                                                                                                                                                                                                                            |
| TransferToContract                                  | [`tokenimpl.TransferToContractInput`](#tokenimpl.TransferToContractInput)                                         | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Transfer Token to the specified contract.                                                                                                                                                                                                                                                                                                                                 |
| ChangeSideChainRentalController                     | [`AuthorityInfo`](#AuthorityInfo)                                                                                 | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Change the governance organization of side chain rental.                                                                                                                                                                                                                                                                                                                  |
| ChangeSymbolsToPayTXSizeFeeController               | [`AuthorityInfo`](#AuthorityInfo)                                                                                 | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Change the governance organization for tokens to pay transaction fees.                                                                                                                                                                                                                                                                                                    |
| ChangeCrossChainTokenContractRegistrationController | [`AuthorityInfo`](#AuthorityInfo)                                                                                 | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Change the governance organization for cross-chain token contract address registration.                                                                                                                                                                                                                                                                                   |
| ChangeUserFeeController                             | [`AuthorityInfo`](#AuthorityInfo)                                                                                 | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Change the governance organization of the coefficient of the user transaction fee calculation formula.                                                                                                                                                                                                                                                                    |
| ChangeDeveloperController                           | [`AuthorityInfo`](#AuthorityInfo)                                                                                 | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Change the governance organization of the coefficient of the developer's transaction resource fee calculation formula.                                                                                                                                                                                                                                                    |
| ConfigTransactionFeeFreeAllowances                  | [`token.ConfigTransactionFeeFreeAllowancesInput`](#token.ConfigTransactionFeeFreeAllowancesInput)                 | [`google.protobuf.Empty`](#google.protobuf.Empty)                                      | Set allowance configurations for transaction fee exemption.                                                                                                                                                                                                                                                                                                               |
| GetFeeReceiver                                      | [`google.protobuf.Empty`](#google.protobuf.Empty)                                                                 | [`aelf.Address`](#aelf.Address)                                                        | Get the address of fee receiver.                                                                                                                                                                                                                                                                                                                                          |
| GetResourceUsage                                    | `google.protobuf.Empty `                                                                                          | `tokenimpl.ResourceUsage `                                                             | Query the amount of resources usage currently.                                                                                                                                                                                                                                                                                                                            |
| GetSymbolsToPayTXSizeFeeController                  | `google.protobuf.Empty `                                                                                          | `AuthorityInfo `                                                                       | Query the governance organization for tokens to pay transaction fees.                                                                                                                                                                                                                                                                                                     |
| GetCrossChainTokenContractRegistrationController    | `google.protobuf.Empty `                                                                                          | `AuthorityInfo `                                                                       | Query the governance organization of the                                                                                                                                                                                                                                                                                                                                  |
| GetUserFeeController                                | `google.protobuf.Empty `                                                                                          | `tokenimpl.UserFeeController `                                                         | Query the governance organization that calculates the formula coefficient for the transaction cost the user sends the contract.                                                                                                                                                                                                                                           |
| GetDeveloperFeeController                           | `google.protobuf.Empty `                                                                                          | `tokenimpl.DeveloperFeeController `                                                    | Query the governing organization of the formula coefficients for calculating developer contract transaction fee.                                                                                                                                                                                                                                                          |
| GetSideChainRentalControllerCreateInfo              | `google.protobuf.Empty `                                                                                          | `AuthorityInfo `                                                                       | Query the organization that governs the side chain rental fee.                                                                                                                                                                                                                                                                                                            |
| GetTransactionFeeFreeAllowances                     | `aelf.Address `                                                                                                   | `token.TransactionFeeFreeAllowancesMap >`                                              | Get the allowances for transaction fee exemption.                                                                                                                                                                                                                                                                                                                         |
| GetTransactionFeeFreeAllowancesConfig               | `google.protobuf.Empty `                                                                                          | `token.GetTransactionFeeFreeAllowancesConfigOutput `                                   | Query allowance configurations for transaction fee exemption.                                                                                                                                                                                                                                                                                                             |
| GetTransactionFeeDelegatees                         | `token.GetTransactionFeeDelegateesInput `                                                                         | `token.GetTransactionFeeDelegateesOutput `                                             | Retrieve a list of proxy addresses corresponding to a given address.                                                                                                                                                                                                                                                                                                      |
| GetVirtualAddressForLocking                         | `tokenimpl.GetVirtualAddressForLockingInput `                                                                     | `aelf.Address `                                                                        | Compute the virtual address for locking.                                                                                                                                                                                                                                                                                                                                  |
| GetOwningRental                                     | `google.protobuf.Empty `                                                                                          | `tokenimpl.OwningRental `                                                              | Query how much resource tokens should be paid currently.                                                                                                                                                                                                                                                                                                                  |
| GetOwningRentalUnitValue                            | `google.protobuf.Empty `                                                                                          | `tokenimpl.OwningRentalUnitValue `                                                     | Query the unit price of the side chain resource cost resource cost = unit price \* quantity the quantity can be queried through GetResourceUsage.                                                                                                                                                                                                                         |
| Create                                              | `token.CreateInput `                                                                                              | `google.protobuf.Empty `                                                               | Create a new token/collection/nft.                                                                                                                                                                                                                                                                                                                                        |
| Issue                                               | `token.IssueInput `                                                                                               | `google.protobuf.Empty `                                                               | Issuing some amount of tokens/collection/nft to an address is the action of increasing that addresses balance for the given token. The total amount of issued tokens must not exceed the total supply of the token and only the issuer (creator) of the token/collection/nft can issue tokens. Issuing token/collection/nft effectively increases the circulating supply. |
| Transfer                                            | `token.TransferInput `                                                                                            | `google.protobuf.Empty `                                                               | Transferring tokens simply is the action of transferring a given amount of tokens from one address to another. The origin or source address is the signer of the transaction. The balance of the sender must be higher than the amount that is transferred.                                                                                                               |
| TransferFrom                                        | `token.TransferFromInput `                                                                                        | `google.protobuf.Empty `                                                               | The TransferFrom action will transfer a specified amount of tokens from one address to another. For this operation to succeed the from address needs to have approved (see allowances) enough tokens to Sender of this transaction. If successful the amount will be removed from the allowance.                                                                          |
| Approve                                             | `token.ApproveInput `                                                                                             | `google.protobuf.Empty `                                                               | The approve action increases the allowance from the Sender to the Spender address enabling the Spender to call TransferFrom.                                                                                                                                                                                                                                              |
| UnApprove                                           | `token.UnApproveInput `                                                                                           | `google.protobuf.Empty `                                                               | This is the reverse operation for Approve it will decrease the allowance.                                                                                                                                                                                                                                                                                                 |
| Lock                                                | `token.LockInput `                                                                                                | `google.protobuf.Empty `                                                               | This method can be used to lock tokens.                                                                                                                                                                                                                                                                                                                                   |
| Unlock                                              | `token.UnlockInput `                                                                                              | `google.protobuf.Empty `                                                               | This is the reverse operation of locking it un-locks some previously locked tokens.                                                                                                                                                                                                                                                                                       |
| Burn                                                | `token.BurnInput `                                                                                                | `google.protobuf.Empty `                                                               | This action will burn the specified amount of tokens removing them from the token’s Supply.                                                                                                                                                                                                                                                                               |
| SetPrimaryTokenSymbol                               | `token.SetPrimaryTokenSymbolInput `                                                                               | `google.protobuf.Empty `                                                               | Set the primary token of side chain.                                                                                                                                                                                                                                                                                                                                      |
| CrossChainTransfer                                  | `token.CrossChainTransferInput `                                                                                  | `google.protobuf.Empty `                                                               | This interface is used for cross-chain transfer.                                                                                                                                                                                                                                                                                                                          |
| CrossChainReceiveToken                              | `token.CrossChainReceiveTokenInput `                                                                              | `google.protobuf.Empty `                                                               | This method is used to receive cross-chain transfers.                                                                                                                                                                                                                                                                                                                     |
| CrossChainCreateToken                               | `token.CrossChainCreateTokenInput `                                                                               | `google.protobuf.Empty `                                                               | Create token/collection/nft on the other chain. Collection must be created before creating nft.                                                                                                                                                                                                                                                                           |
| InitializeFromParentChain                           | `token.InitializeFromParentChainInput `                                                                           | `google.protobuf.Empty `                                                               | When the side chain is started the side chain is initialized with the parent chain information.                                                                                                                                                                                                                                                                           |
| ClaimTransactionFees                                | `token.TotalTransactionFeesMap  `                                                                                 | `google.protobuf.Empty `                                                               | Handle the transaction fees charged by ChargeTransactionFees.                                                                                                                                                                                                                                                                                                             |
| ChargeTransactionFees                               | `token.ChargeTransactionFeesInput`                                                                                | `token.ChargeTransactionFeesOutput `                                                   | Used to collect transaction fees.                                                                                                                                                                                                                                                                                                                                         |
| ChargeUserContractTransactionFees                   | `token.ChargeTransactionFeesInput`                                                                                | `token.ChargeTransactionFeesOutput `                                                   | Used to collect transaction fees of user contract .                                                                                                                                                                                                                                                                                                                       |
| CheckThreshold                                      | `token.CheckThresholdInput `                                                                                      | `google.protobuf.Empty `                                                               | Check the token threshold.                                                                                                                                                                                                                                                                                                                                                |
| InitialCoefficients                                 | `google.protobuf.Empty `                                                                                          | `google.protobuf.Empty `                                                               | Initialize coefficients of every type of tokens supporting charging fee.                                                                                                                                                                                                                                                                                                  |
| DonateResourceToken                                 | `token.TotalResourceTokensMaps `                                                                                  | `google.protobuf.Empty `                                                               | Processing resource token received.                                                                                                                                                                                                                                                                                                                                       |
| ChargeResourceToken                                 | `token.ChargeResourceTokenInput `                                                                                 | `google.protobuf.Empty `                                                               | A transaction resource fee is charged to implement the ACS8 standards.                                                                                                                                                                                                                                                                                                    |
| CheckResourceToken                                  | `google.protobuf.Empty `                                                                                          | `google.protobuf.Empty `                                                               | Verify that the resource token are sufficient.                                                                                                                                                                                                                                                                                                                            |
| SetSymbolsToPayTxSizeFee                            | `token.SymbolListToPayTxSizeFee `                                                                                 | `google.protobuf.Empty `                                                               | Set the list of tokens to pay transaction fees.                                                                                                                                                                                                                                                                                                                           |
| UpdateCoefficientsForSender                         | `token.UpdateCoefficientsInput `                                                                                  | `google.protobuf.Empty `                                                               | Update the coefficient of the transaction fee calculation formula.                                                                                                                                                                                                                                                                                                        |     |
| UpdateCoefficientsForContract                       | `token.UpdateCoefficientsInput `                                                                                  | `google.protobuf.Empty `                                                               | Update the coefficient of the transaction fee calculation formula.                                                                                                                                                                                                                                                                                                        |
| InitializeAuthorizedController                      | `google.protobuf.Empty `                                                                                          | `google.protobuf.Empty `                                                               | This method is used to initialize the governance organization for some functions including: the coefficient of the user transaction fee calculation formula the coefficient of the contract developer resource fee calculation formula and the side chain rental fee.                                                                                                     |
| GetTokenInfo                                        | `token.GetTokenInfoInput `                                                                                        | `token.TokenInfo `                                                                     | Query token information.                                                                                                                                                                                                                                                                                                                                                  |
| GetNativeTokenInfo                                  | `google.protobuf.Empty `                                                                                          | `token.TokenInfo `                                                                     | Query native token information.                                                                                                                                                                                                                                                                                                                                           |
| GetResourceTokenInfo                                | `google.protobuf.Empty `                                                                                          | `token.TokenInfoList <#token.TokenInfoList>`                                           | Query resource token information.                                                                                                                                                                                                                                                                                                                                         |
| GetBalance                                          | `token.GetBalanceInput `                                                                                          | `token.GetBalanceOutput `                                                              | Query the balance at the specified address.                                                                                                                                                                                                                                                                                                                               |
| GetAllowance                                        | `token.GetAllowanceInput `                                                                                        | `token.GetAllowanceOutput `                                                            | Query the account's allowance for other addresses                                                                                                                                                                                                                                                                                                                         |
| IsInWhiteList                                       | `token.IsInWhiteListInput `                                                                                       | `google.protobuf.BoolValue `                                                           | Check whether the token is in the whitelist of an address which can be called TransferFrom to transfer the token under the condition of not being credited.                                                                                                                                                                                                               |
| GetLockedAmount                                     | `token.GetLockedAmountInput `                                                                                     | `token.GetLockedAmountOutput <#token.GetLockedAmountOutput>`                           | Query the information for a lock.                                                                                                                                                                                                                                                                                                                                         |
| GetCrossChainTransferTokenContractAddress           | `token.GetCrossChainTransferTokenContractAddressInput <#token.GetCrossChainTransferTokenContractAddressInput>`    | `aelf.Address `                                                                        | Query the address of receiving token in cross-chain transfer.                                                                                                                                                                                                                                                                                                             |
| GetPrimaryTokenSymbol                               | `google.protobuf.Empty `                                                                                          | `google.protobuf.StringValue `                                                         | Query the name of the primary Token.                                                                                                                                                                                                                                                                                                                                      |
| GetCalculateFeeCoefficientsForContract              | `google.protobuf.Int32Value `                                                                                     | `token.CalculateFeeCoefficients `                                                      | Query the coefficient of the transaction fee calculation formula.                                                                                                                                                                                                                                                                                                         |
| UpdateCoefficientsForContract                       | `token.UpdateCoefficientsInput `                                                                                  | `google.protobuf.Empty `                                                               | Update the coefficient of the transaction fee calculation formula.                                                                                                                                                                                                                                                                                                        |
| InitializeAuthorizedController                      | `google.protobuf.Empty `                                                                                          | `google.protobuf.Empty `                                                               | This method is used to initialize the governance organization for some functions including: the coefficient of the user transaction fee calculation formula the coefficient of the contract developer resource fee calculation formula and the side chain rental fee.                                                                                                     |
| GetTokenInfo                                        | `token.GetTokenInfoInput `                                                                                        | `token.TokenInfo `                                                                     | Query token information.                                                                                                                                                                                                                                                                                                                                                  |
| GetNativeTokenInfo                                  | `google.protobuf.Empty `                                                                                          | `token.TokenInfo `                                                                     | Query native token information.                                                                                                                                                                                                                                                                                                                                           |
| GetResourceTokenInfo                                | `google.protobuf.Empty `                                                                                          | `token.TokenInfoList `                                                                 | Query resource token information.                                                                                                                                                                                                                                                                                                                                         |
| GetBalance                                          | `token.GetBalanceInput `                                                                                          | `token.GetBalanceOutput`                                                               | Query the balance at the specified address.                                                                                                                                                                                                                                                                                                                               |
| GetAllowance                                        | `token.GetAllowanceInput `                                                                                        | `token.GetAllowanceOutput `                                                            | Query the account's allowance for other addresses                                                                                                                                                                                                                                                                                                                         |
| IsInWhiteList                                       | `token.IsInWhiteListInput `                                                                                       | `google.protobuf.BoolValue `                                                           | Check whether the token is in the whitelist of an address which can be called TransferFrom to transfer the token under the condition of not being credited.                                                                                                                                                                                                               |
| GetLockedAmount                                     | `token.GetLockedAmountInput `                                                                                     | `token.GetLockedAmountOutput `                                                         | Query the information for a lock.                                                                                                                                                                                                                                                                                                                                         |
| GetCrossChainTransferTokenContractAddress           | `token.GetCrossChainTransferTokenContractAddressInput `                                                           | `aelf.Address `                                                                        | Query the address of receiving token in cross-chain transfer.                                                                                                                                                                                                                                                                                                             |
| GetPrimaryTokenSymbol                               | `google.protobuf.Empty `                                                                                          | `google.protobuf.StringValue `                                                         | Query the name of the primary Token.                                                                                                                                                                                                                                                                                                                                      |
| GetCalculateFeeCoefficientsForContract              | `google.protobuf.Int32Value `                                                                                     | `token.CalculateFeeCoefficients `                                                      | Query the coefficient of the transaction fee calculation formula.                                                                                                                                                                                                                                                                                                         |
| GetCalculateFeeCoefficientsForSender                | `google.protobuf.Empty `                                                                                          | `token.CalculateFeeCoefficients `                                                      | Query the coefficient of the transaction fee calculation formula.                                                                                                                                                                                                                                                                                                         |
| GetSymbolsToPayTxSizeFee                            | `google.protobuf.Empty `                                                                                          | `token.SymbolListToPayTxSizeFee `                                                      | Query tokens that can pay transaction fees.                                                                                                                                                                                                                                                                                                                               |
| GetLatestTotalTransactionFeesMapHash                | `google.protobuf.Empty `                                                                                          | `aelf.Hash `                                                                           | Query the hash of the last input of ClaimTransactionFees.                                                                                                                                                                                                                                                                                                                 |
| GetLatestTotalResourceTokensMapsHash                | `google.protobuf.Empty `                                                                                          | `aelf.Hash `                                                                           | Query the hash of the last input of DonateResourceToken.                                                                                                                                                                                                                                                                                                                  |
| IsTokenAvailableForMethodFee                        | `google.protobuf.StringValue `                                                                                    | `google.protobuf.BoolValue `                                                           |                                                                                                                                                                                                                                                                                                                                                                           |
| SetTransactionFeeDelegations                        | `token.SetTransactionFeeDelegationsInput `                                                                        | `token.SetTransactionFeeDelegationsOutput <#token.SetTransactionFeeDelegationsOutput>` | Set delegation of transaction fee payment.                                                                                                                                                                                                                                                                                                                                |
| SetTransactionFeeDelegateInfos                      | `token.SetTransactionFeeDelegateInfosInput `                                                                      | `google.protobuf.Empty `                                                               | Set delegate info to pay transaction fee.                                                                                                                                                                                                                                                                                                                                 |
| RemoveTransactionFeeFreeAllowancesConfig            | `token.RemoveTransactionFeeFreeAllowancesConfigInput `                                                            | `google.protobuf.Empty `                                                               | Remove allowance configurations for transaction fee exemption.                                                                                                                                                                                                                                                                                                            |
| RemoveTransactionFeeDelegator                       | `token.RemoveTransactionFeeDelegatorInput `                                                                       | `google.protobuf.Empty `                                                               | Remove transaction fee delegator.                                                                                                                                                                                                                                                                                                                                         |
| RemoveTransactionFeeDelegatorInfos                  | `token.RemoveTransactionFeeDelegatorInfosInput `                                                                  | `google.protobuf.Empty `                                                               | Remove delegator info of the delegatee.                                                                                                                                                                                                                                                                                                                                   |
| RemoveTransactionFeeDelegatee                       | `token.RemoveTransactionFeeDelegateeInput `                                                                       | `google.protobuf.Empty `                                                               | Remove transaction fee delegatee.                                                                                                                                                                                                                                                                                                                                         |
| RemoveTransactionFeeDelegateeInfos                  | `token.RemoveTransactionFeeDelegateeInfosInput`                                                                   | `google.protobuf.Empty `                                                               | Remove delegatee info of the delegator.                                                                                                                                                                                                                                                                                                                                   |
| GetTransactionFeeDelegationsOfADelegatee            | `token.GetTransactionFeeDelegationsOfADelegateeInput `                                                            | `token.TransactionFeeDelegations `                                                     | Get the delegation of transaction fee payment of a delegatee.                                                                                                                                                                                                                                                                                                             |
| GetTransactionFeeDelegateeList                      | `token.GetTransactionFeeDelegateeListInput `                                                                      | `token.GetTransactionFeeDelegateeListOutput `                                          | Get all delegatee list of a delegator.                                                                                                                                                                                                                                                                                                                                    |
| GetTransactionFeeDelegateInfo                       | `token.GetTransactionFeeDelegateInfoInput `                                                                       | `token.TransactionFeeDelegations `                                                     | Get delegate info for transaction fee.                                                                                                                                                                                                                                                                                                                                    |     |

## AElf.Standards.ACS1

| Method Name               | Request Type                   | Response Type            | Description                                                                                        |
| ------------------------- | ------------------------------ | ------------------------ | -------------------------------------------------------------------------------------------------- |
| SetMethodFee              | `acs1.MethodFees `             | `google.protobuf.Empty ` | Set the method fees for the specified method. Note that this will override all fees of the method. |
| ChangeMethodFeeController | `AuthorityInfo `               | `google.protobuf.Empty ` | Change the method fee controller the default is parliament and default organization.               |
| GetMethodFee              | `google.protobuf.StringValue ` | `acs1.MethodFees `       | Query method fee information by method name.                                                       |
| GetMethodFeeController    | `google.protobuf.Empty `       | `AuthorityInfo `         | Query the method fee controller.                                                                   |

## AElf.Standards.ACS2

| Method Name     | Request Type                           | Response Type        | Description                                                              |
| --------------- | -------------------------------------- | -------------------- | ------------------------------------------------------------------------ |
| GetResourceInfo | `aelf.Transaction <#aelf.Transaction>` | `acs2.ResourceInfo ` | Gets the resource information that the transaction execution depends on. |

**Contract Types**

## AElf.Contracts.MultiToken

### tokenimpl.AdvanceResourceTokenInput

| Field                 | Type            | Description                               | Label |
| --------------------- | --------------- | ----------------------------------------- | ----- |
| contract_address      | `aelf.Address ` | The contract address to transfer.         |       |
| resource_token_symbol | `string `       | The resource token symbol to transfer.    |       |
| amount                | `int64 `        | The amount of resource token to transfer. |       |

### tokenimpl.DeveloperFeeController

| Field                 | Type             | Description                                    | Label |
| --------------------- | ---------------- | ---------------------------------------------- | ----- |
| root_controller       | `AuthorityInfo ` | The association that governs the organization. |       |
| parliament_controller | `AuthorityInfo ` | The parliament organization of members.        |       |
| developer_controller  | `AuthorityInfo ` | The developer organization of members.         |       |

### tokenimpl.GetVirtualAddressForLockingInput

| Field   | Type            | Description              | Label |
| ------- | --------------- | ------------------------ | ----- |
| address | `aelf.Address ` | The address of the lock. |       |
| lock_id | `aelf.Hash `    | The id of the lock.      |       |

### tokenimpl.OwningRental

| Field           | Type                                | Description                                          | Label    |
| --------------- | ----------------------------------- | ---------------------------------------------------- | -------- |
| resource_amount | `OwningRental.ResourceAmountEntry ` | The amount of resource tokens owed symbol -> amount. | repeated |

### tokenimpl.OwningRental.ResourceAmountEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `int64 `  |             |       |

### tokenimpl.OwningRentalUnitValue

| Field               | Type                                            | Description                               | Label    |
| ------------------- | ----------------------------------------------- | ----------------------------------------- | -------- |
| resource_unit_value | `OwningRentalUnitValue.ResourceUnitValueEntry ` | Resource unit price symbol -> unit price. | repeated |

### tokenimpl.OwningRentalUnitValue.ResourceUnitValueEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `int64 `  |             |       |

## AElf.Standards.ACS1

| Method Name               | Request Type                  | Response Type           | Description                                                                                        |
| ------------------------- | ----------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| SetMethodFee              | `acs1.MethodFees`             | `google.protobuf.Empty` | Set the method fees for the specified method. Note that this will override all fees of the method. |
| ChangeMethodFeeController | `AuthorityInfo`               | `google.protobuf.Empty` | Change the method fee controller the default is parliament and default organization.               |
| GetMethodFee              | `google.protobuf.StringValue` | `acs1.MethodFees`       | Query method fee information by method name.                                                       |
| GetMethodFeeController    | `google.protobuf.Empty`       | `AuthorityInfo`         | Query the method fee controller.                                                                   |

## AElf.Standards.ACS2

| Method Name     | Request Type       | Response Type       | Description                                                              |
| --------------- | ------------------ | ------------------- | ------------------------------------------------------------------------ |
| GetResourceInfo | `aelf.Transaction` | `acs2.ResourceInfo` | Gets the resource information that the transaction execution depends on. |

## AElf.Contracts.MultiToken - tokenimpl.AdvanceResourceTokenInput

| Field                 | Type           | Description                               | Label |
| --------------------- | -------------- | ----------------------------------------- | ----- |
| contract_address      | `aelf.Address` | The contract address to transfer.         |       |
| resource_token_symbol | `string`       | The resource token symbol to transfer.    |       |
| amount                | `int64`        | The amount of resource token to transfer. |       |


### tokenimpl.RegisterCrossChainTokenContractAddressInput

| Field                  | Type              | Description                                   | Label |
| ---------------------- | ----------------- | --------------------------------------------- | ----- |
| from_chain_id          | `int32`           | The source chain id.                          |       |
| parent_chain_height    | `int64`           | The parent chain height of the transaction.   |       |
| transaction_bytes      | `bytes`           | The raw bytes of the transfer transaction.    |       |
| merkle_path            | `aelf.MerklePath` | The merkle path created from the transaction. |       |
| token_contract_address | `aelf.Address`    | The token contract address.                   |       |


### tokenimpl.ValidateTokenInfoExistsInput

| Field          | Type                | Description                                                        | Label |
| -------------- | ------------------- | ------------------------------------------------------------------ | ----- |
| symbol         | `string`            | The symbol of the token.                                           |       |
| token_name     | `string`            | The full name of the token.                                        |       |
| total_supply   | `int64`             | The total supply of the token.                                     |       |
| decimals       | `int32`             | The precision of the token.                                        |       |
| issuer         | `aelf.Address`      | The address that has permission to issue the token/collection/nft. |       |
| is_burnable    | `bool`              | A flag indicating if this token is burnable.                       |       |
| issue_chain_id | `int32`             | The chain id of the token.                                         |       |
| external_info  | `map<stringstring>` | Attributes or description of the token/collection/nft.             |       |
| owner          | `aelf.Address`      | The address that has permission to create nft.                     |       |

### token.AllCalculateFeeCoefficients

| Field | Type                       | Description                          | Label    |
| ----- | -------------------------- | ------------------------------------ | -------- |
| value | `CalculateFeeCoefficients` | The coefficients of fee Calculation. | repeated |

### token.ApproveInput

| Field   | Type           | Description                                   | Label |
| ------- | -------------- | --------------------------------------------- | ----- |
| spender | `aelf.Address` | The address that allowance will be increased. |       |
| symbol  | `string`       | The symbol of token to approve.               |       |
| amount  | `int64`        | The amount of token to approve.               |       |

### token.Approved

| Field   | Type           | Description                              | Label |
| ------- | -------------- | ---------------------------------------- | ----- |
| owner   | `aelf.Address` | The address of the token owner.          |       |
| spender | `aelf.Address` | The address that allowance be increased. |       |
| symbol  | `string`       | The symbol of approved token.            |       |
| amount  | `int64`        | The amount of approved token.            |       |

### token.BurnInput

| Field  | Type     | Description                  | Label |
| ------ | -------- | ---------------------------- | ----- |
| symbol | `string` | The symbol of token to burn. |       |
| amount | `int64`  | The amount of token to burn. |       |

### token.Burned

| Field  | Type           | Description                          | Label |
| ------ | -------------- | ------------------------------------ | ----- |
| burner | `aelf.Address` | The address who wants to burn token. |       |
| symbol | `string`       | The symbol of burned token.          |       |
| amount | `int64`        | The amount of burned token.          |       |

### token.CalculateFeeAlgorithmUpdated

| Field                     | Type                          | Description                                        | Label |
| ------------------------- | ----------------------------- | -------------------------------------------------- | ----- |
| all_type_fee_coefficients | `AllCalculateFeeCoefficients` | All calculate fee coefficients after modification. |       |

### token.CalculateFeeCoefficients

| Field                   | Type                            | Description                                | Label    |
| ----------------------- | ------------------------------- | ------------------------------------------ | -------- |
| fee_token_type          | `int32`                         | The resource fee type like READ WRITE etc. |          |
| piece_coefficients_list | `CalculateFeePieceCoefficients` | Coefficients of one single piece.          | repeated |

### token.CalculateFeePieceCoefficients

| Field | Type    | Description                                                                                                            | Label    |
| ----- | ------- | ---------------------------------------------------------------------------------------------------------------------- | -------- |
| value | `int32` | Coefficients of one single piece. The first char is its type: liner / power. The second char is its piece upper bound. | repeated |

### token.ChainPrimaryTokenSymbolSet

| Field        | Type     | Description          | Label |
| ------------ | -------- | -------------------- | ----- |
| token_symbol | `string` | The symbol of token. |       |

### token.ChargeResourceTokenInput

| Field    | Type                                    | Description                                         | Label    |
| -------- | --------------------------------------- | --------------------------------------------------- | -------- |
| cost_dic | `ChargeResourceTokenInput.CostDicEntry` | Collection of charge resource token Symbol->Amount. | repeated |
| caller   | `aelf.Address`                          | The sender of the transaction.                      |          |

### token.ChargeResourceTokenInput.CostDicEntry

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `int64`  |             |       |

### token.ChargeTransactionFeesInput

| Field                      | Type                   | Description                          | Label    |
| -------------------------- | ---------------------- | ------------------------------------ | -------- |
| method_name                | `string`               | The method name of transaction.      |          |
| contract_address           | `aelf.Address`         | The contract address of transaction. |          |
| transaction_size_fee       | `int64`                | The amount of transaction size fee.  |          |
| symbols_to_pay_tx_size_fee | `SymbolToPayTxSizeFee` | Transaction fee token information.   | repeated |

### token.ChargeTransactionFeesOutput

| Field                | Type     | Description                        |
| -------------------- | -------- | ---------------------------------- |
| success              | `bool`   | Whether the charge was successful. |
| charging_information | `string` | The charging information.          |

### token.CheckThresholdInput

| Field               | Type                     | Description                             |
| ------------------- | ------------------------ | --------------------------------------- |
| sender              | `aelf.Address`           | The sender of the transaction.          |
| symbol_to_threshold | `SymbolToThresholdEntry` | The threshold to set Symbol->Threshold. |
| is_check_allowance  | `bool`                   | Whether to check the allowance.         |

### token.CheckThresholdInput.SymbolToThresholdEntry

| Field | Type     | Description |
| ----- | -------- | ----------- |
| key   | `string` |             |
| value | `int64`  |             |

### token.ConfigTransactionFeeFreeAllowancesInput

| Field | Type                                | Description                          |
| ----- | ----------------------------------- | ------------------------------------ |
| value | `ConfigTransactionFeeFreeAllowance` | The configuration of free allowance. |

### token.ConfigTransactionFeeFreeAllowance

| Field                           | Type                           | Description                                                                                         |
| ------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------------- |
| symbol                          | `string`                       | The symbol of threshold token.                                                                      |
| transaction_fee_free_allowances | `TransactionFeeFreeAllowances` | The allowance of each token when a user gets his allowance of the full amount.                      |
| refresh_seconds                 | `int64`                        | The time needed for a user’s allowance to be refreshed back to the full amount. Unit: second        |
| threshold                       | `int64`                        | The required amount of Token in possession for a user to be eligible for transaction fee exemption. |

### token.TransactionFeeFreeAllowances

| Field | Type                          | Description                 |
| ----- | ----------------------------- | --------------------------- |
| value | `TransactionFeeFreeAllowance` | The allowance of the token. |

### token.TransactionFeeFreeAllowance

| Field  | Type     | Description                       |
| ------ | -------- | --------------------------------- |
| symbol | `string` | Token symbol.                     |
| amount | `int64`  | The amount of fee free allowance. |

### token.TransactionFeeFreeAllowanceConfig

| Field           | Type                             | Description                                                                                         |
| --------------- | -------------------------------- | --------------------------------------------------------------------------------------------------- |
| symbol          | `string`                         | The symbol of threshold token.                                                                      |
| free_allowances | `TransactionFeeFreeAllowanceMap` | The allowance of each token when a user gets his allowance of the full amount.                      |
| refresh_seconds | `int64`                          | The time needed for a user’s allowance to be refreshed back to the full amount. Unit: second        |
| threshold       | `int64`                          | The required amount of Token in possession for a user to be eligible for transaction fee exemption. |

### token.TransactionFeeFreeAllowanceMap

| Field | Type                                      | Description                          |
| ----- | ----------------------------------------- | ------------------------------------ |
| map   | `map<string TransactionFeeFreeAllowance>` | free allowance symbol free allowance |

### token.ContractTotalResourceTokens

| Field            | Type                     | Description                |
| ---------------- | ------------------------ | -------------------------- |
| contract_address | `aelf.Address`           | The contract address.      |
| tokens_map       | `TotalResourceTokensMap` | Resource tokens to charge. |

### token.CreateInput

| Field           | Type                | Description                                                                                                                                                                                                              |
| --------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol          | `string`            | The symbol of the token/collection/nft.                                                                                                                                                                                  |
| token_name      | `string`            | The full name of the token/collection/nft.                                                                                                                                                                               |
| total_supply    | `int64`             | The total supply of the token/collection/nft.                                                                                                                                                                            |
| decimals        | `int32`             | The precision of the toke/collection/nft.                                                                                                                                                                                |
| issuer          | `aelf.Address`      | The address that has permission to issue the token/collection/nft.                                                                                                                                                       |
| is_burnable     | `bool`              | A flag indicating if this token/collection/nft is burnable.                                                                                                                                                              |
| lock_white_list | `aelf.Address`      | A whitelist address list used to lock tokens/collection/nft.                                                                                                                                                             |
| issue_chain_id  | `int32`             | The chain id of the token/collection/nft.                                                                                                                                                                                |
| external_info   | `map<stringstring>` | Attributes or description of the token/collcection/nft. There is no mandatory constraint on the naming of the key. But it is recommended to use **nft as the prefix key to set the nft attribute such as**nft_image_url. |
| owner           | `aelf.Address`      | The address that has permission to create nft.                                                                                                                                                                           |

### token.CrossChainCreateTokenInput

| Field               | Type              | Description                                                                | Label |
| ------------------- | ----------------- | -------------------------------------------------------------------------- | ----- |
| from_chain_id       | `int32`           | The chain id of the chain on which the token was created.                  |       |
| parent_chain_height | `int64`           | The height of the transaction that created the token/collection/nft.       |       |
| transaction_bytes   | `bytes`           | The transaction that created the token/collection/nft.                     |       |
| merkle_path         | `aelf.MerklePath` | The merkle path created from the transaction that created the transaction. |       |

### token.CrossChainReceiveTokenInput

| Field                      | Type              | Description                                            | Label |
| -------------------------- | ----------------- | ------------------------------------------------------ | ----- |
| from_chain_id              | `int32`           | The source chain id.                                   |       |
| parent_chain_height        | `int64`           | The height of the transfer transaction.                |       |
| transfer_transaction_bytes | `bytes`           | The raw bytes of the transfer transaction.             |       |
| merkle_path                | `aelf.MerklePath` | The merkle path created from the transfer transaction. |       |

### token.CrossChainReceived

| Field                   | Type           | Description                                          | Label |
| ----------------------- | -------------- | ---------------------------------------------------- | ----- |
| from                    | `aelf.Address` | The source address of the transferred token.         |       |
| to                      | `aelf.Address` | The destination address of the transferred token.    |       |
| symbol                  | `string`       | The symbol of the received token.                    |       |
| amount                  | `int64`        | The amount of the received token.                    |       |
| memo                    | `string`       | The memo.                                            |       |
| from_chain_id           | `int32`        | The destination chain id.                            |       |
| issue_chain_id          | `int32`        | The chain id of the token.                           |       |
| parent_chain_height     | `int64`        | The parent chain height of the transfer transaction. |       |
| transfer_transaction_id | `aelf.Hash`    | The id of transfer transaction.                      |       |

### token.CrossChainTransferInput

| Field          | Type           | Description                      | Label |
| -------------- | -------------- | -------------------------------- | ----- |
| to             | `aelf.Address` | The receiver of transfer.        |       |
| symbol         | `string`       | The symbol of token.             |       |
| amount         | `int64`        | The amount of token to transfer. |       |
| memo           | `string`       | The memo.                        |       |
| to_chain_id    | `int32`        | The destination chain id.        |       |
| issue_chain_id | `int32`        | The chain id of the token.       |       |

### token.CrossChainTransferred

| Field          | Type           | Description                                       | Label |
| -------------- | -------------- | ------------------------------------------------- | ----- |
| from           | `aelf.Address` | The source address of the transferred token.      |       |
| to             | `aelf.Address` | The destination address of the transferred token. |       |
| symbol         | `string`       | The symbol of the transferred token.              |       |
| amount         | `int64`        | The amount of the transferred token.              |       |
| memo           | `string`       | The memo.                                         |       |
| to_chain_id    | `int32`        | The destination chain id.                         |       |
| issue_chain_id | `int32`        | The chain id of the token.                        |       |

### token.ExtraTokenListModified

| Field                          | Type                       | Description                        | Label |
| ------------------------------ | -------------------------- | ---------------------------------- | ----- |
| symbol_list_to_pay_tx_size_fee | `SymbolListToPayTxSizeFee` | Transaction fee token information. |       |

### token.GetAllowanceInput

| Field   | Type           | Description                     | Label |
| ------- | -------------- | ------------------------------- | ----- |
| symbol  | `string`       | The symbol of token.            |       |
| owner   | `aelf.Address` | The address of the token owner. |       |
| spender | `aelf.Address` | The address of the spender.     |       |

### token.GetAllowanceOutput

| Field     | Type           | Description                     | Label |
| --------- | -------------- | ------------------------------- | ----- |
| symbol    | `string`       | The symbol of token.            |       |
| owner     | `aelf.Address` | The address of the token owner. |       |
| spender   | `aelf.Address` | The address of the spender.     |       |
| allowance | `int64`        | The amount of allowance.        |       |

### token.GetBalanceInput

| Field  | Type           | Description                      | Label |
| ------ | -------------- | -------------------------------- | ----- |
| symbol | `string`       | The symbol of token.             |       |
| owner  | `aelf.Address` | The target address of the query. |       |

### token.GetBalanceOutput

| Field   | Type           | Description                      | Label |
| ------- | -------------- | -------------------------------- | ----- |
| symbol  | `string`       | The symbol of token.             |       |
| owner   | `aelf.Address` | The target address of the query. |       |
| balance | `int64`        | The balance of the owner.        |       |

### token.GetCrossChainTransferTokenContractAddressInput

| Field   | Type    | Description   | Label |
| ------- | ------- | ------------- | ----- |
| chainId | `int32` | The chain id. |       |

### token.GetLockedAmountInput

| Field   | Type           | Description              | Label |
| ------- | -------------- | ------------------------ | ----- |
| address | `aelf.Address` | The address of the lock. |       |
| symbol  | `string`       | The token symbol.        |       |
| lock_id | `aelf.Hash`    | The id of the lock.      |       |

### token.GetLockedAmountOutput

| Field   | Type           | Description              | Label |
| ------- | -------------- | ------------------------ | ----- |
| address | `aelf.Address` | The address of the lock. |       |
| symbol  | `string`       | The token symbol.        |       |
| lock_id | `aelf.Hash`    | The id of the lock.      |       |
| amount  | `int64`        | The locked amount.       |       |

### token.GetTokenInfoInput

| Field  | Type     | Description          | Label |
| ------ | -------- | -------------------- | ----- |
| symbol | `string` | The symbol of token. |       |

### token.GetTransactionFeeDelegateesInput

| Field             | Type           | Description               | Label |
| ----------------- | -------------- | ------------------------- | ----- |
| delegator_address | `aelf.Address` | The address of delegator. |       |

### token.GetTransactionFeeDelegateeListInput

| Field             | Type           | Description               | Label |
| ----------------- | -------------- | ------------------------- | ----- |
| delegator_address | `aelf.Address` | The address of delegator. |       |
| contract_address  | `aelf.Address` | The contract address.     |       |
| method_name       | `string`       | The method name.          |       |

### token.GetTransactionFeeDelegateeListOutput

| Field               | Type           | Description                    | Label    |
| ------------------- | -------------- | ------------------------------ | -------- |
| delegatee_addresses | `aelf.Address` | The address list of delegatee. | repeated |

### token.GetTransactionFeeDelegateInfoInput

| Field             | Type           | Description               | Label |
| ----------------- | -------------- | ------------------------- | ----- |
| delegator_address | `aelf.Address` | The address of delegator. |       |
| delegatee_address | `aelf.Address` | The address of delegatee. |       |
| contract_address  | `aelf.Address` | The contract address.     |       |
| method_name       | `string`       | The method name.          |       |

### token.GetTransactionFeeFreeAllowancesConfigOutput

| Field | Type                                       | Description                                          | Label    |
| ----- | ------------------------------------------ | ---------------------------------------------------- | -------- |
| value | `token.TransactionFeeFreeAllowanceConfigs` | The configuration of transaction fee free allowance. | repeated |

### token.InitializeFromParentChainInput

| Field                                     | Type                                                                        | Description                    | Label    |
| ----------------------------------------- | --------------------------------------------------------------------------- | ------------------------------ | -------- |
| resource_amount                           | `InitializeFromParentChainInput.ResourceAmountEntry`                        | The amount of resource.        | repeated |
| registered_other_token_contract_addresses | `InitializeFromParentChainInput.RegisteredOtherTokenContractAddressesEntry` | The token contract addresses.  | repeated |
| creator                                   | `aelf.Address`                                                              | The creator of the side chain. |          |

### token.InitializeFromParentChainInput.RegisteredOtherTokenContractAddressesEntry

| Field | Type           | Description | Label |
| ----- | -------------- | ----------- | ----- |
| key   | `int32`        |             |       |
| value | `aelf.Address` |             |       |

### token.InitializeFromParentChainInput.ResourceAmountEntry

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| key   | `string` |             |       |
| value | `int32`  |             |       |

### token.IsInWhiteListInput

| Field   | Type           | Description           | Label |
| ------- | -------------- | --------------------- | ----- |
| symbol  | `string`       | The symbol of token.  |       |
| address | `aelf.Address` | The address to check. |       |

### token.IssueInput

| Field  | Type           | Description                               | Label |
| ------ | -------------- | ----------------------------------------- | ----- |
| symbol | `string`       | The token/collection/nft symbol to issue. |       |
| amount | `int64`        | The token/collection/nft amount to issue. |       |
| memo   | `string`       | The memo.                                 |       |
| to     | `aelf.Address` | The target address to issue.              |       |

### token.Issued

| Field  | Type           | Description                 | Label |
| ------ | -------------- | --------------------------- | ----- |
| symbol | `string`       | The symbol of issued token. |       |
| amount | `int64`        | The amount of issued token. |       |
| memo   | `string`       | The memo.                   |       |
| to     | `aelf.Address` | The issued target address.  |       |

### token.LockInput

| Field   | Type           | Description                            | Label |
| ------- | -------------- | -------------------------------------- | ----- |
| address | `aelf.Address` | The one who wants to lock their token. |       |
| lock_id | `aelf.Hash`    | The id of the lock.                    |       |
| symbol  | `string`       | The symbol of the token to lock.       |       |
| usage   | `string`       | A memo.                                |       |
| amount  | `int64`        | The amount of tokens to lock.          |       |

### token.RemoveTransactionFeeDelegatorInfosInput

| Field                     | Type                        | Description                       | Label    |
| ------------------------- | --------------------------- | --------------------------------- | -------- |
| delegator_address         | `aelf.Address`              | The address of delegator.         |          |
| delegate_transaction_list | `token.DelegateTransaction` | The transaction list of delegate. | repeated |

### token.RemoveTransactionFeeDelegateeInfosInput

| Field                     | Type                        | Description                       | Label    |
| ------------------------- | --------------------------- | --------------------------------- | -------- |
| delegator_address         | `aelf.Address`              | The address of delegatee.         |          |
| delegate_transaction_list | `token.DelegateTransaction` | The transaction list of delegate. | repeated |

### token.DelegateTransaction

| Field            | Type            | Description           | Label |
| ---------------- | --------------- | --------------------- | ----- |
| contract_address | `aelf.Address ` | The contract address. |       |
| method_name      | `string `       | The method name.      |       |

### token.RentalAccountBalanceInsufficient

| Field  | Type      | Description                                        | Label |
| ------ | --------- | -------------------------------------------------- | ----- |
| symbol | `string ` | The symbol of insufficient rental account balance. |       |
| amount | `int64 `  | The balance of the account.                        |       |

### token.RentalCharged

| Field    | Type            | Description                       | Label |
| -------- | --------------- | --------------------------------- | ----- |
| symbol   | `string `       | The symbol of rental fee charged. |       |
| amount   | `int64 `        | The amount of rental fee charged. |       |
| payer    | `aelf.Address ` | The payer of rental fee.          |       |
| receiver | `aelf.Address ` | The receiver of rental fee.       |       |

### token.RemoveTransactionFeeFreeAllowancesConfigInput

| Field   | Type      | Description                                                                     | Label    |
| ------- | --------- | ------------------------------------------------------------------------------- | -------- |
| symbols | `string ` | List of symbols to remove from configuration of transaction fee free allowance. | repeated |

### token.ResourceTokenClaimed

| Field    | Type            | Description                | Label |
| -------- | --------------- | -------------------------- | ----- |
| symbol   | `string `       | The symbol of fee claimed. |       |
| amount   | `int64 `        | The amount of fee claimed. |       |
| payer    | `aelf.Address ` | The payer of fee.          |       |
| receiver | `aelf.Address ` | The receiver of fee.       |       |

### token.SetTransactionFeeDelegateInfos

| Field              | Type                  | Description                                   | Label    |
| ------------------ | --------------------- | --------------------------------------------- | -------- |
| delegator_address  | `aelf.Address `       | The address of delegator.                     |          |
| delegate_info_list | `token.DelegateInfo ` | The delegate information for the transaction. | repeated |

### token.DelegateInfo

| Field               | Type                 | Description                                                     | Label |
| ------------------- | -------------------- | --------------------------------------------------------------- | ----- |
| delegations         | `map<string int64> ` | token symbol amount                                             |       |
| contract_address    | `aelf.Address `      | The contract address.                                           |       |
| method_name         | `string `            | The method name.                                                |       |
| isUnlimitedDelegate | `bool `              | Whether to pay transaction fee continuously without limitation. |       |

### token.SetPrimaryTokenSymbolInput

| Field  | Type      | Description              | Label |
| ------ | --------- | ------------------------ | ----- |
| symbol | `string ` | The symbol of the token. |       |

### token.SymbolListToPayTxSizeFee

| Field                      | Type                    | Description                        | Label    |
| -------------------------- | ----------------------- | ---------------------------------- | -------- |
| symbols_to_pay_tx_size_fee | `SymbolToPayTxSizeFee ` | Transaction fee token information. | repeated |

### token.SymbolToPayTxSizeFee

| Field              | Type      | Description                         | Label |
| ------------------ | --------- | ----------------------------------- | ----- |
| token_symbol       | `string ` | The symbol of token.                |       |
| base_token_weight  | `int32 `  | The charge weight of primary token. |       |
| added_token_weight | `int32 `  | The new added token charge weight.  |       |

### token.TransactionFeeClaimed

| Field    | Type            | Description                | Label |
| -------- | --------------- | -------------------------- | ----- |
| symbol   | `string `       | The symbol of fee claimed. |       |
| amount   | `int64 `        | The amount of fee claimed. |       |
| receiver | `aelf.Address ` | The receiver of fee.       |       |

### token.TransactionFeeFreeAllowancesMap

| Field | Type                                          | Description                      | Label |
| ----- | --------------------------------------------- | -------------------------------- | ----- |
| map   | `map<string TransactionFeeFreeAllowanceMap> ` | threshold symbol free allowances |       |

### token.TokenCreated

| Field          | Type            | Description                                  | Label |
| -------------- | --------------- | -------------------------------------------- | ----- |
| symbol         | `string `       | The symbol of the token.                     |       |
| token_name     | `string `       | The full name of the token.                  |       |
| total_supply   | `int64 `        | The total supply of the token.               |       |
| decimals       | `int32 `        | The precision of the token.                  |       |
| issuer         | `aelf.Address ` | The address that created the token.          |       |
| is_burnable    | `bool `         | A flag indicating if this token is burnable. |       |
| issue_chain_id | `int32 `        | The chain id of the token.                   |       |

### token.TokenInfo

| Field          | Type            | Description                                  | Label |
| -------------- | --------------- | -------------------------------------------- | ----- |
| symbol         | `string `       | The symbol of the token.                     |       |
| token_name     | `string `       | The full name of the token.                  |       |
| supply         | `int64 `        | The current supply of the token.             |       |
| total_supply   | `int64 `        | The total supply of the token.               |       |
| decimals       | `int32 `        | The precision of the token.                  |       |
| issuer         | `aelf.Address ` | The address that created the token.          |       |
| is_burnable    | `bool `         | A flag indicating if this token is burnable. |       |
| issue_chain_id | `int32 `        | The chain id of the token.                   |       |
| issued         | `int64 `        | The amount of issued tokens.                 |       |

### token.TokenInfoList

| Field | Type         | Description                | Label    |
| ----- | ------------ | -------------------------- | -------- |
| value | `TokenInfo ` | List of token information. | repeated |

### token.TotalResourceTokensMap

| Field | Type                                 | Description                               | Label    |
| ----- | ------------------------------------ | ----------------------------------------- | -------- |
| value | `TotalResourceTokensMap.ValueEntry ` | Resource token dictionary Symbol->Amount. | repeated |

### token.TotalResourceTokensMap.ValueEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `int64 `  |             |       |

### token.TotalResourceTokensMaps

| Field        | Type                           | Description                                         | Label    |
| ------------ | ------------------------------ | --------------------------------------------------- | -------- |
| value        | `ContractTotalResourceTokens ` | Resource tokens to charge.                          | repeated |
| block_hash   | `aelf.Hash `                   | The hash of the block processing the transaction.   |          |
| block_height | `int64 `                       | The height of the block processing the transaction. |          |

### token.TotalTransactionFeesMap

| Field        | Type                                  | Description                                                  | Label    |
| ------------ | ------------------------------------- | ------------------------------------------------------------ | -------- |
| value        | `TotalTransactionFeesMap.ValueEntry ` | Token dictionary that charge transaction fee Symbol->Amount. | repeated |
| block_hash   | `aelf.Hash `                          | The hash of the block processing the transaction.            |          |
| block_height | `int64 `                              | The height of the block processing the transaction.          |          |

### token.TransactionFeeCharged

| Field           | Type         | Description                                         | Label    |
| --------------- | ------------ | --------------------------------------------------- | -------- |
| symbol          | `string `    | Resource tokens to charge.                          | repeated |
| amount          | `int64 `     | The hash of the block processing the transaction.   |          |
| chargingAddress | `aelf.Hash ` | The height of the block processing the transaction. |          |

### token.TotalTransactionFeesMap.ValueEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `int64 `  |             |       |

### token.TransactionFeeBill

| Field    | Type                               | Description                                 | Label    |
| -------- | ---------------------------------- | ------------------------------------------- | -------- |
| fees_map | `TransactionFeeBill.FeesMapEntry ` | The transaction fee dictionary Symbol->fee. | repeated |

### token.TransactionFeeBill.FeesMapEntry

| Field | Type      | Description | Label |
| ----- | --------- | ----------- | ----- |
| key   | `string ` |             |       |
| value | `int64 `  |             |       |

### token.TransferFromInput

| Field  | Type            | Description                           | Label |
| ------ | --------------- | ------------------------------------- | ----- |
| from   | `aelf.Address ` | The source address of the token.      |       |
| to     | `aelf.Address ` | The destination address of the token. |       |
| symbol | `string `       | The symbol of the token to transfer.  |       |
| amount | `int64 `        | The amount to transfer.               |       |
| memo   | `string `       | The memo.                             |       |

### token.TransferInput

| Field  | Type            | Description                   | Label |
| ------ | --------------- | ----------------------------- | ----- |
| to     | `aelf.Address ` | The receiver of the token.    |       |
| symbol | `string `       | The token symbol to transfer. |       |
| amount | `int64 `        | The amount to transfer.       |       |
| memo   | `string `       | The memo.                     |       |

### token.Transferred

| Field  | Type            | Description                                       | Label |
| ------ | --------------- | ------------------------------------------------- | ----- |
| from   | `aelf.Address ` | The source address of the transferred token.      |       |
| to     | `aelf.Address ` | The destination address of the transferred token. |       |
| symbol | `string `       | The symbol of the transferred token.              |       |
| amount | `int64 `        | The amount of the transferred token.              |       |
| memo   | `string `       | The memo.                                         |       |

### token.UnApproveInput

| Field   | Type            | Description                                   | Label |
| ------- | --------------- | --------------------------------------------- | ----- |
| spender | `aelf.Address ` | The address that allowance will be decreased. |       |
| symbol  | `string `       | The symbol of token to un-approve.            |       |
| amount  | `int64 `        | The amount of token to un-approve.            |       |

### token.UnApproved

| Field   | Type            | Description                              | Label |
| ------- | --------------- | ---------------------------------------- | ----- |
| owner   | `aelf.Address ` | The address of the token owner.          |       |
| spender | `aelf.Address ` | The address that allowance be decreased. |       |
| symbol  | `string `       | The symbol of un-approved token.         |       |
| amount  | `int64 `        | The amount of un-approved token.         |       |

### token.UnlockInput

| Field   | Type            | Description                         | Label |
| ------- | --------------- | ----------------------------------- | ----- |
| address | `aelf.Address ` | The one want to un-lock his token.  |       |
| lock_id | `aelf.Hash `    | Id of the lock.                     |       |
| symbol  | `string `       | The symbol of the token to un-lock. |       |
| usage   | `string `\*\*   | A memo.                             |       |
| amount  | `int64 `\*\*    | The amount of tokens to un-lock.    |       |

### token.UpdateCoefficientsInput

| Field         | Type                        | Description                      | Label    |
| ------------- | --------------------------- | -------------------------------- | -------- |
| piece_numbers | `int32 `                    | The specify pieces gonna update. | repeated |
| coefficients  | `CalculateFeeCoefficients ` | Coefficients of one single type. |          |

### token.FeeTypeEnum

| Name    | Number | Description |
| ------- | ------ | ----------- |
| READ    | 0      |             |
| STORAGE | 1      |             |
| WRITE   | 2      |             |
| TRAFFIC | 3      |             |
| TX      | 4      |             |

### token.SetTransactionFeeDelegationsInput

| Field             | Type                 | Description                | Label |
| ----------------- | -------------------- | -------------------------- | ----- |
| delegator_address | `aelf.Addresss `     | The address of delegator.  |       |
| delegations       | `map<string int64> ` | \<token symbol delegation> |       |

### token.SetTransactionFeeDelegationsOutput

| Field   | Type    | Description                     | Label |
| ------- | ------- | ------------------------------- | ----- |
| success | `bool ` | Whether set delegation success. |       |

### token.RemoveTransactionFeeDelegatorInput

| Field             | Type             | Description               | Label |
| ----------------- | ---------------- | ------------------------- | ----- |
| delegator_address | `aelf.Addresss ` | The address of delegator. |       |

### token.RemoveTransactionFeeDelegateeInput

| Field             | Type             | Description               | Label |
| ----------------- | ---------------- | ------------------------- | ----- |
| delegatee_address | `aelf.Addresss ` | The address of delegatee. |       |

### token.MethodFeeFreeAllowance

| Field  | Type      | Description                      | Label |
| ------ | --------- | -------------------------------- | ----- |
| symbol | `string ` | Token symbol                     |       |
| amount | `int64 `  | The amount of fee free allowance |       |

### token.GetTransactionFeeDelegationsOfADelegateeInput

| Field             | Type             | Description               | Label |
| ----------------- | ---------------- | ------------------------- | ----- |
| delegatee_address | `aelf.Addresss ` | The address of delegatee. |       |
| delegator_address | `aelf.Addresss ` | The address of delegator. |       |

### token.TransactionFeeDelegations

| Field        | Type                 | Description                                                  | Label |
| ------------ | -------------------- | ------------------------------------------------------------ | ----- |
| delegations  | `map<string int64> ` | The number of tokens allowed to be delegated                 |       |
| block_height | `int64 `             | The block height when the information of delegation is added |       |

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

## AElf.Standards.ACS2

### acs2.ResourceInfo

| Field              | Type                    | Description                                          | Label    |
| ------------------ | ----------------------- | ---------------------------------------------------- | -------- |
| write_paths        | `aelf.ScopedStatePath ` | The state path that depends on when writing.         | repeated |
| read_paths         | `aelf.ScopedStatePath ` | The state path that depends on when reading.         | repeated |
| non_parallelizable | `bool `                 | Whether the transaction is not executed in parallel. |          |

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

| Field       | Type       | Description                               | Label    |
| ----------- | ---------- | ----------------------------------------- | -------- |
| address     | `Address ` | The contract address.                     |          |
| name        | `string `  | The name of the log event.                |          |
| indexed     | `bytes `   | The indexed data used to calculate bloom. | repeated |
| non_indexed | `bytes `   | The non indexed data.                     |          |

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

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| value | `sint32` |             |       |

### aelf.SInt64Value

| Field | Type     | Description | Label |
| ----- | -------- | ----------- | ----- |
| value | `sint64` |             |       |

### aelf.ScopedStatePath

| Field   | Type         | Description                                           | Label |
| ------- | ------------ | ----------------------------------------------------- | ----- |
| address | `Address `   | The scope address which will be the contract address. |       |
| path    | `StatePath ` | The path of contract state.                           |       |

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

| Field   | Type                                          | Description         | Label    |
| ------- | --------------------------------------------- | ------------------- | -------- |
| writes  | `TransactionExecutingStateSet.WritesEntry `   | The changed states. | repeated |
| reads   | `TransactionExecutingStateSet.ReadsEntry `    | The read states.    | repeated |
| deletes | `TransactionExecutingStateSet.DeletesEntry >` | The deleted states. | repeated |

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

| Field          | Type                       | Description                                                                                                                                                                                                                                                             | Label    |
| -------------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| transaction_id | `Hash `                    | The transaction id.                                                                                                                                                                                                                                                     |          |
| status         | `TransactionResultStatus ` | The transaction result status.                                                                                                                                                                                                                                          |          |
| logs           | `LogEvent `                | The log events.                                                                                                                                                                                                                                                         | repeated |
| bloom          | `bytes `                   | Bloom filter for transaction logs. A transaction log event can be defined in the contract and stored in the bloom filter after the transaction is executed. Through this filter we can quickly search for and determine whether a log exists in the transaction result. |          |
| return_value   | `bytes `                   | The return value of the transaction execution.                                                                                                                                                                                                                          |          |
| block_number   | `int64 `                   | The height of the block that packages the transaction.                                                                                                                                                                                                                  |          |
| block_hash     | `Hash `                    | The hash of the block that packages the transaction.                                                                                                                                                                                                                    |          |
| error          | `string `                  | Failed execution error message.                                                                                                                                                                                                                                         |          |

### aelf.TransactionResultStatus

| Name                   | Number | Description                                                                       |
| ---------------------- | ------ | --------------------------------------------------------------------------------- |
| NOT_EXISTED            | 0      | The execution result of the transaction does not exist.                           |
| PENDING                | 1      | The transaction is in the transaction pool waiting to be packaged.                |
| FAILED                 | 2      | Transaction execution failed.                                                     |
| MINED                  | 3      | The transaction was successfully executed and successfully packaged into a block. |
| CONFLICT               | 4      | When executed in parallel there are conflicts with other transactions.            |
| PENDING_VALIDATION     | 5      | The transaction is waiting for validation.                                        |
| NODE_VALIDATION_FAILED | 6      | Transaction validation failed.                                                    |

## AuthorityInfo

| Field            | Type            | Description                               | Label |
| ---------------- | --------------- | ----------------------------------------- | ----- |
| contract_address | `aelf.Address ` | The contract address of the controller.   |       |
| owner_address    | `aelf.Address ` | The address of the owner of the contract. |       |
