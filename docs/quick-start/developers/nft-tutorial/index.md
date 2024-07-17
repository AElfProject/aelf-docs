---
sidebar_position: 4
title: NFT Tutorial Contract
description: Complex smart contract
---

**Description**: This contract is complex. It demonstrates the use of
state variables, user interactions, muti-token contract, nft-creation and nft transfer to eventually create a basic NFT marketplace

**Purpose**: To introduce you to more advanced concepts such as state
management, event handling, multi-token contract, NFt token creation and transfer in smart contracts.

**Difficulty Level**: Complex

## Step 1 - Setting up your development environment

import Setup from "../\_setup.md"

<Setup />

## Step 2 - Develop Smart Contract

### Start Your Smart Contract Project

- Open your `Terminal`.

- Enter the following command to generate a new project:

```bash title="Terminal"
mkdir nft-marketplace
cd nft-marketplace
dotnet new aelf -n NFTMarketplace
```

### Adding Your Smart Contract Code

Now that we have a template NFT marketplace project, we can customise the template to incorporate our own contract logic.
Lets start by implementing methods to provide basic functionality for updating and reading a message stored persistently in the contract state.

- Enter this command in your `Terminal`.

```bash title="Terminal"
cd src
```

#### Defining Methods and Messages

- Rename the file name from `Protobuf/contract/hello_world_contract.proto` to `nft_marketplace_contract.proto`:

```bash title="Terminal"
mv Protobuf/contract/hello_world_contract.proto Protobuf/contract/nft_marketplace_contract.proto
```

- open the project with your IDE.

The implementation of file `src/Protobuf/contract/nft_marketplace_contract.proto` is as follows:

```csharp title="nft_marketplace_contract.proto"
syntax = "proto3";

import "aelf/core.proto";
import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "Protobuf/reference/acs12.proto";
// The namespace of this class
option csharp_namespace = "AElf.Contracts.NFTMarketplace";

service NFTMarketplace {
  // The name of the state class the smart contract is going to use to access blockchain state
  option (aelf.csharp_state) = "AElf.Contracts.NFTMarketplace.NFTMarketplaceState";
  option (aelf.base) = "Protobuf/reference/acs12.proto";

  rpc Initialize (google.protobuf.Empty) returns (google.protobuf.Empty) {
  }

  rpc CreateNFT (google.protobuf.MessageOptions) returns (google.protobuf.Int64Value) {
  }

  rpc TransferNFT (google.protobuf.Int64Value, aelf.Address) returns (google.protobuf.Empty) {
  }

  rpc BurnNFT (google.protobuf.Int64Value) returns (google.protobuf.Empty) {
  }

  }

  rpc GETNFTDetails (google.protobuf.Int64Value) returns (PlayAmountLimitMessage) {
    option (aelf.is_view) = true;
  }

  rpc GetNFTBalance (aelf.Address) returns (google.protobuf.Int64Value) {
    option (aelf.is_view) = true;
  }

  rpc GetOwner (google.protobuf.Int64Value) returns (google.protobuf.StringValue) {
    option (aelf.is_view) = true;
  }
}

// An event that will be emitted from contract method call when CreateNFT is called.
message NFTCreated {
  option (aelf.is_event) = true;
  int64 nft_id = 1;
  int64 details = 2;
}

// An event that will be emitted from contract method call when TransferNFT is called.
message NFTTransferred {
  option (aelf.is_event) = true;
  int64 amount = 1;
  aelf.Address from = 2;
  aelf.Address to = 3;
}

// An event that will be emitted from contract method call when BurnNFT is called.
message NFTBurned {
  option (aelf.is_event) = true;
  int64 amount = 1;
  aelf.Address from = 2;
  aelf.Address to = 3;
}
```

#### Define Contract States

The implementation of file `src/NFTMarketplaceState.cs` is as follows:

```csharp title="src/NFTMarketplaceState.cs"
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.NFTMarketplace
{
    // The state class is access the blockchain state
    public partial class NFTMarketplace : ContractState
    {
        // A state to check if contract is initialized
        public BoolState Initialized { get; set; }
        // A state to store the owner address
        public SingletonState<Address> Owner { get; set; }
    }
}
```

#### Contract Reference State

- Create a new file `token_contract.proto` under `src/Protobuf/reference/`.

- Replace this code of implementation file of `token_contract.proto`:

```csharp title="token_contract.proto"
/**
 * MultiToken contract.
 */
syntax = "proto3";

package token;

import "aelf/core.proto";
import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";

option csharp_namespace = "AElf.Contracts.MultiToken";

service TokenContract {
  // Create a new token.
  rpc Create (CreateInput) returns (google.protobuf.Empty) {
  }

  // Issuing some amount of tokens to an address is the action of increasing that addresses balance
  // for the given token. The total amount of issued tokens must not exceed the total supply of the token
  // and only the issuer (creator) of the token can issue tokens.
  // Issuing tokens effectively increases the circulating supply.
  rpc Issue (IssueInput) returns (google.protobuf.Empty) {
  }

  // Transferring tokens simply is the action of transferring a given amount of tokens from one address to another.
  // The origin or source address is the signer of the transaction.
  // The balance of the sender must be higher than the amount that is transferred.
  rpc Transfer (TransferInput) returns (google.protobuf.Empty) {
  }

  // The TransferFrom action will transfer a specified amount of tokens from one address to another.
  // For this operation to succeed the from address needs to have approved (see allowances) enough tokens
  // to Sender of this transaction. If successful the amount will be removed from the allowance.
  rpc TransferFrom (TransferFromInput) returns (google.protobuf.Empty) {
  }

  // The approve action increases the allowance from the Sender to the Spender address,
  // enabling the Spender to call TransferFrom.
  rpc Approve (ApproveInput) returns (google.protobuf.Empty) {
  }

  rpc BatchApprove (BatchApproveInput) returns (google.protobuf.Empty) {
  }

  // This is the reverse operation for Approve, it will decrease the allowance.
  rpc UnApprove (UnApproveInput) returns (google.protobuf.Empty) {
  }

  // This method can be used to lock tokens.
  rpc Lock (LockInput) returns (google.protobuf.Empty) {
  }

  // This is the reverse operation of locking, it un-locks some previously locked tokens.
  rpc Unlock (UnlockInput) returns (google.protobuf.Empty) {
  }

  // This action will burn the specified amount of tokens, removing them from the token’s Supply.
  rpc Burn (BurnInput) returns (google.protobuf.Empty) {
  }

  // Set the primary token of side chain.
  rpc SetPrimaryTokenSymbol (SetPrimaryTokenSymbolInput) returns (google.protobuf.Empty) {
  }

  // This interface is used for cross-chain transfer.
  rpc CrossChainTransfer (CrossChainTransferInput) returns (google.protobuf.Empty) {
  }

  // This method is used to receive cross-chain transfers.
  rpc CrossChainReceiveToken (CrossChainReceiveTokenInput) returns (google.protobuf.Empty) {
  }

  // The side chain creates tokens.
  rpc CrossChainCreateToken(CrossChainCreateTokenInput) returns (google.protobuf.Empty) {
  }

  // When the side chain is started, the side chain is initialized with the parent chain information.
  rpc InitializeFromParentChain (InitializeFromParentChainInput) returns (google.protobuf.Empty) {
  }

  // Handle the transaction fees charged by ChargeTransactionFees.
  rpc ClaimTransactionFees (TotalTransactionFeesMap) returns (google.protobuf.Empty) {
  }

  // Used to collect transaction fees.
  rpc ChargeTransactionFees (ChargeTransactionFeesInput) returns (ChargeTransactionFeesOutput) {
  }

  rpc ChargeUserContractTransactionFees(ChargeTransactionFeesInput) returns(ChargeTransactionFeesOutput){

  }

  // Check the token threshold.
  rpc CheckThreshold (CheckThresholdInput) returns (google.protobuf.Empty) {
  }

  // Initialize coefficients of every type of tokens supporting charging fee.
  rpc InitialCoefficients (google.protobuf.Empty) returns (google.protobuf.Empty){
  }

  // Processing resource token received.
  rpc DonateResourceToken (TotalResourceTokensMaps) returns (google.protobuf.Empty) {
  }

  // A transaction resource fee is charged to implement the ACS8 standards.
  rpc ChargeResourceToken (ChargeResourceTokenInput) returns (google.protobuf.Empty) {
  }

  // Verify that the resource token are sufficient.
  rpc CheckResourceToken (google.protobuf.Empty) returns (google.protobuf.Empty) {
  }

  // Set the list of tokens to pay transaction fees.
  rpc SetSymbolsToPayTxSizeFee (SymbolListToPayTxSizeFee) returns (google.protobuf.Empty){
  }

  // Update the coefficient of the transaction fee calculation formula.
  rpc UpdateCoefficientsForSender (UpdateCoefficientsInput) returns (google.protobuf.Empty) {
  }

  // Update the coefficient of the transaction fee calculation formula.
  rpc UpdateCoefficientsForContract (UpdateCoefficientsInput) returns (google.protobuf.Empty) {
  }

  // This method is used to initialize the governance organization for some functions,
  // including: the coefficient of the user transaction fee calculation formula,
  // the coefficient of the contract developer resource fee calculation formula, and the side chain rental fee.
  rpc InitializeAuthorizedController (google.protobuf.Empty) returns (google.protobuf.Empty){
  }

  rpc AddAddressToCreateTokenWhiteList (aelf.Address) returns (google.protobuf.Empty) {
  }
  rpc RemoveAddressFromCreateTokenWhiteList (aelf.Address) returns (google.protobuf.Empty) {
  }

  rpc SetTransactionFeeDelegations (SetTransactionFeeDelegationsInput) returns (SetTransactionFeeDelegationsOutput){
  }

  rpc RemoveTransactionFeeDelegator (RemoveTransactionFeeDelegatorInput) returns (google.protobuf.Empty){
  }

  rpc RemoveTransactionFeeDelegatee (RemoveTransactionFeeDelegateeInput) returns (google.protobuf.Empty){
  }

  rpc SetSymbolAlias (SetSymbolAliasInput) returns (google.protobuf.Empty){
  }

  // Get all delegatees' address of delegator from input
  rpc GetTransactionFeeDelegatees (GetTransactionFeeDelegateesInput) returns (GetTransactionFeeDelegateesOutput) {
    option (aelf.is_view) = true;
  }

  // Query token information.
  rpc GetTokenInfo (GetTokenInfoInput) returns (TokenInfo) {
    option (aelf.is_view) = true;
  }

  // Query native token information.
  rpc GetNativeTokenInfo (google.protobuf.Empty) returns (TokenInfo) {
    option (aelf.is_view) = true;
  }

  // Query resource token information.
  rpc GetResourceTokenInfo (google.protobuf.Empty) returns (TokenInfoList) {
    option (aelf.is_view) = true;
  }

  // Query the balance at the specified address.
  rpc GetBalance (GetBalanceInput) returns (GetBalanceOutput) {
    option (aelf.is_view) = true;
  }

  // Query the account's allowance for other addresses
  rpc GetAllowance (GetAllowanceInput) returns (GetAllowanceOutput) {
    option (aelf.is_view) = true;
  }

  // Query the account's available allowance for other addresses
  rpc GetAvailableAllowance (GetAllowanceInput) returns (GetAllowanceOutput) {
    option (aelf.is_view) = true;
  }

  // Check whether the token is in the whitelist of an address,
  // which can be called TransferFrom to transfer the token under the condition of not being credited.
  rpc IsInWhiteList (IsInWhiteListInput) returns (google.protobuf.BoolValue) {
    option (aelf.is_view) = true;
  }

  // Query the information for a lock.
  rpc GetLockedAmount (GetLockedAmountInput) returns (GetLockedAmountOutput) {
    option (aelf.is_view) = true;
  }

  // Query the address of receiving token in cross-chain transfer.
  rpc GetCrossChainTransferTokenContractAddress (GetCrossChainTransferTokenContractAddressInput) returns (aelf.Address) {
    option (aelf.is_view) = true;
  }

  // Query the name of the primary Token.
  rpc GetPrimaryTokenSymbol (google.protobuf.Empty) returns (google.protobuf.StringValue) {
    option (aelf.is_view) = true;
  }

  // Query the coefficient of the transaction fee calculation formula.
  rpc GetCalculateFeeCoefficientsForContract (google.protobuf.Int32Value) returns (CalculateFeeCoefficients) {
    option (aelf.is_view) = true;
  }

  // Query the coefficient of the transaction fee calculation formula.
  rpc GetCalculateFeeCoefficientsForSender (google.protobuf.Empty) returns (CalculateFeeCoefficients) {
    option (aelf.is_view) = true;
  }

  // Query tokens that can pay transaction fees.
  rpc GetSymbolsToPayTxSizeFee (google.protobuf.Empty) returns (SymbolListToPayTxSizeFee){
    option (aelf.is_view) = true;
  }

  // Query the hash of the last input of ClaimTransactionFees.
  rpc GetLatestTotalTransactionFeesMapHash (google.protobuf.Empty) returns (aelf.Hash){
    option (aelf.is_view) = true;
  }

  // Query the hash of the last input of DonateResourceToken.
  rpc GetLatestTotalResourceTokensMapsHash (google.protobuf.Empty) returns (aelf.Hash){
    option (aelf.is_view) = true;
  }
  rpc IsTokenAvailableForMethodFee (google.protobuf.StringValue) returns (google.protobuf.BoolValue) {
    option (aelf.is_view) = true;
  }
  rpc GetReservedExternalInfoKeyList (google.protobuf.Empty) returns (StringList) {
    option (aelf.is_view) = true;
  }

  rpc GetTransactionFeeDelegationsOfADelegatee(GetTransactionFeeDelegationsOfADelegateeInput) returns(TransactionFeeDelegations){
    option (aelf.is_view) = true;
  }

  rpc GetTokenAlias (google.protobuf.StringValue) returns (google.protobuf.StringValue) {
    option (aelf.is_view) = true;
  }

  rpc GetSymbolByAlias (google.protobuf.StringValue) returns (google.protobuf.StringValue) {
    option (aelf.is_view) = true;
  }
}

message TokenInfo {
  // The symbol of the token.f
  string symbol = 1;
  // The full name of the token.
  string token_name = 2;
  // The current supply of the token.
  int64 supply = 3;
  // The total supply of the token.
  int64 total_supply = 4;
  // The precision of the token.
  int32 decimals = 5;
  // The address that has permission to issue the token.
  aelf.Address issuer = 6;
  // A flag indicating if this token is burnable.
  bool is_burnable = 7;
  // The chain id of the token.
  int32 issue_chain_id = 8;
  // The amount of issued tokens.
  int64 issued = 9;
  // The external information of the token.
  ExternalInfo external_info = 10;
  // The address that owns the token.
  aelf.Address owner = 11;
}

message ExternalInfo {
  map<string, string> value = 1;
}

message CreateInput {
  // The symbol of the token.
  string symbol = 1;
  // The full name of the token.
  string token_name = 2;
  // The total supply of the token.
  int64 total_supply = 3;
  // The precision of the token
  int32 decimals = 4;
  // The address that has permission to issue the token.
  aelf.Address issuer = 5;
  // A flag indicating if this token is burnable.
  bool is_burnable = 6;
  // A whitelist address list used to lock tokens.
  repeated aelf.Address lock_white_list = 7;
  // The chain id of the token.
  int32 issue_chain_id = 8;
  // The external information of the token.
  ExternalInfo external_info = 9;
  // The address that owns the token.
  aelf.Address owner = 10;
}

message SetPrimaryTokenSymbolInput {
  // The symbol of the token.
  string symbol = 1;
}

message IssueInput {
  // The token symbol to issue.
  string symbol = 1;
  // The token amount to issue.
  int64 amount = 2;
  // The memo.
  string memo = 3;
  // The target address to issue.
  aelf.Address to = 4;
}

message TransferInput {
  // The receiver of the token.
  aelf.Address to = 1;
  // The token symbol to transfer.
  string symbol = 2;
  // The amount to to transfer.
  int64 amount = 3;
  // The memo.
  string memo = 4;
}

message LockInput {
  // The one want to lock his token.
  aelf.Address address = 1;
  // Id of the lock.
  aelf.Hash lock_id = 2;
  // The symbol of the token to lock.
  string symbol = 3;
  // a memo.
  string usage = 4;
  // The amount of tokens to lock.
  int64 amount = 5;
}

message UnlockInput {
  // The one want to un-lock his token.
  aelf.Address address = 1;
  // Id of the lock.
  aelf.Hash lock_id = 2;
  // The symbol of the token to un-lock.
  string symbol = 3;
  // a memo.
  string usage = 4;
  // The amount of tokens to un-lock.
  int64 amount = 5;
}

message TransferFromInput {
  // The source address of the token.
  aelf.Address from = 1;
  // The destination address of the token.
  aelf.Address to = 2;
  // The symbol of the token to transfer.
  string symbol = 3;
  // The amount to transfer.
  int64 amount = 4;
  // The memo.
  string memo = 5;
}

message ApproveInput {
  // The address that allowance will be increased.
  aelf.Address spender = 1;
  // The symbol of token to approve.
  string symbol = 2;
  // The amount of token to approve.
  int64 amount = 3;
}
message BatchApproveInput {
  repeated ApproveInput value = 1;
}

message UnApproveInput {
  // The address that allowance will be decreased.
  aelf.Address spender = 1;
  // The symbol of token to un-approve.
  string symbol = 2;
  // The amount of token to un-approve.
  int64 amount = 3;
}

message BurnInput {
  // The symbol of token to burn.
  string symbol = 1;
  // The amount of token to burn.
  int64 amount = 2;
}

message ChargeResourceTokenInput {
  // Collection of charge resource token, Symbol->Amount.
  map<string, int64> cost_dic = 1;
  // The sender of the transaction.
  aelf.Address caller = 2;
}

message TransactionFeeBill {
  // The transaction fee dictionary, Symbol->fee.
  map<string, int64> fees_map = 1;
}

message TransactionFreeFeeAllowanceBill {
  // The transaction free fee allowance dictionary, Symbol->fee.
  map<string, int64> free_fee_allowances_map = 1;
}

message CheckThresholdInput {
  // The sender of the transaction.
  aelf.Address sender = 1;
  // The threshold to set, Symbol->Threshold.
  map<string, int64> symbol_to_threshold = 2;
  // Whether to check the allowance.
  bool is_check_allowance = 3;
}

message GetTokenInfoInput {
  // The symbol of token.
  string symbol = 1;
}

message GetBalanceInput {
  // The symbol of token.
  string symbol = 1;
  // The target address of the query.
  aelf.Address owner = 2;
}

message GetBalanceOutput {
  // The symbol of token.
  string symbol = 1;
  // The target address of the query.
  aelf.Address owner = 2;
  // The balance of the owner.
  int64 balance = 3;
}

message GetAllowanceInput {
  // The symbol of token.
  string symbol = 1;
  // The address of the token owner.
  aelf.Address owner = 2;
  // The address of the spender.
  aelf.Address spender = 3;
}

message GetAllowanceOutput {
  // The symbol of token.
  string symbol = 1;
  // The address of the token owner.
  aelf.Address owner = 2;
  // The address of the spender.
  aelf.Address spender = 3;
  // The amount of allowance.
  int64 allowance = 4;
}

message CrossChainTransferInput {
  // The receiver of transfer.
  aelf.Address to = 1;
  // The symbol of token.
  string symbol = 2;
  // The amount of token to transfer.
  int64 amount = 3;
  // The memo.
  string memo = 4;
  // The destination chain id.
  int32 to_chain_id = 5;
  // The chain id of the token.
  int32 issue_chain_id = 6;
}

message CrossChainReceiveTokenInput {
  // The source chain id.
  int32 from_chain_id = 1;
  // The height of the transfer transaction.
  int64 parent_chain_height = 2;
  // The raw bytes of the transfer transaction.
  bytes transfer_transaction_bytes = 3;
  // The merkle path created from the transfer transaction.
  aelf.MerklePath merkle_path = 4;
}

message IsInWhiteListInput {
  // The symbol of token.
  string symbol = 1;
  // The address to check.
  aelf.Address address = 2;
}

message SymbolToPayTxSizeFee{
  // The symbol of token.
  string token_symbol = 1;
  // The charge weight of primary token.
  int32 base_token_weight = 2;
  // The new added token charge weight. For example, the charge weight of primary Token is set to 1.
  // The newly added token charge weight is set to 10. If the transaction requires 1 unit of primary token,
  // the user can also pay for 10 newly added tokens.
  int32 added_token_weight = 3;
}

message SymbolListToPayTxSizeFee{
  // Transaction fee token information.
  repeated SymbolToPayTxSizeFee symbols_to_pay_tx_size_fee = 1;
}

message ChargeTransactionFeesInput {
  // The method name of transaction.
  string method_name = 1;
  // The contract address of transaction.
  aelf.Address contract_address = 2;
  // The amount of transaction size fee.
  int64 transaction_size_fee = 3;
  // Transaction fee token information.
  repeated SymbolToPayTxSizeFee symbols_to_pay_tx_size_fee = 4;
}

message ChargeTransactionFeesOutput {
  // Whether the charge was successful.
  bool success = 1;
  // The charging information.
  string charging_information = 2;
}

message CallbackInfo {
  aelf.Address contract_address = 1;
  string method_name = 2;
}

message ExtraTokenListModified {
  option (aelf.is_event) = true;
  // Transaction fee token information.
  SymbolListToPayTxSizeFee symbol_list_to_pay_tx_size_fee = 1;
}

message GetLockedAmountInput {
  // The address of the lock.
  aelf.Address address = 1;
  // The token symbol.
  string symbol = 2;
  // The id of the lock.
  aelf.Hash lock_id = 3;
}

message GetLockedAmountOutput {
  // The address of the lock.
  aelf.Address address = 1;
  // The token symbol.
  string symbol = 2;
  // The id of the lock.
  aelf.Hash lock_id = 3;
  // The locked amount.
  int64 amount = 4;
}

message TokenInfoList {
  // List of token information.
  repeated TokenInfo value = 1;
}

message GetCrossChainTransferTokenContractAddressInput {
  // The chain id.
  int32 chainId = 1;
}

message CrossChainCreateTokenInput {
  // The chain id of the chain on which the token was created.
  int32 from_chain_id = 1;
  // The height of the transaction that created the token.
  int64 parent_chain_height = 2;
  // The transaction that created the token.
  bytes transaction_bytes = 3;
  // The merkle path created from the transaction that created the transaction.
  aelf.MerklePath merkle_path = 4;
}

message InitializeFromParentChainInput {
  // The amount of resource.
  map<string, int32> resource_amount = 1;
  // The token contract addresses.
  map<int32, aelf.Address> registered_other_token_contract_addresses = 2;
  // The creator the side chain.
  aelf.Address creator = 3;
}

message UpdateCoefficientsInput {
  // The specify pieces gonna update.
  repeated int32 piece_numbers = 1;
  // Coefficients of one single type.
  CalculateFeeCoefficients coefficients = 2;
}

enum FeeTypeEnum {
  READ = 0;
  STORAGE = 1;
  WRITE = 2;
  TRAFFIC = 3;
  TX = 4;
}

message CalculateFeePieceCoefficients {
  // Coefficients of one single piece.
  // The first char is its type: liner / power.
  // The second char is its piece upper bound.
  repeated int32 value = 1;
}

message CalculateFeeCoefficients {
  // The resource fee type, like READ, WRITE, etc.
  int32 fee_token_type = 1;
  // Coefficients of one single piece.
  repeated CalculateFeePieceCoefficients piece_coefficients_list = 2;
}

message AllCalculateFeeCoefficients {
  // The coefficients of fee Calculation.
  repeated CalculateFeeCoefficients value = 1;
}

message TotalTransactionFeesMap
{
  // Token dictionary that charge transaction fee, Symbol->Amount.
  map<string, int64> value = 1;
  // The hash of the block processing the transaction.
  aelf.Hash block_hash = 2;
  // The height of the block processing the transaction.
  int64 block_height = 3;
}

message TotalResourceTokensMaps {
  // Resource tokens to charge.
  repeated ContractTotalResourceTokens value = 1;
  // The hash of the block processing the transaction.
  aelf.Hash block_hash = 2;
  // The height of the block processing the transaction.
  int64 block_height = 3;
}

message ContractTotalResourceTokens {
  // The contract address.
  aelf.Address contract_address = 1;
  // Resource tokens to charge.
  TotalResourceTokensMap tokens_map = 2;
}

message TotalResourceTokensMap
{
  // Resource token dictionary, Symbol->Amount.
  map<string, int64> value = 1;
}

message StringList {
  repeated string value = 1;
}

message TransactionFeeDelegations{
  // delegation, symbols and its' amount
  map<string, int64> delegations = 1;
  // height when added
  int64 block_height = 2;
  //Whether to pay transaction fee continuously
  bool isUnlimitedDelegate = 3;
}

message TransactionFeeDelegatees{
  map<string,TransactionFeeDelegations> delegatees = 1;
}

message SetTransactionFeeDelegationsInput {
  // the delegator address
  aelf.Address delegator_address = 1;
  // delegation, symbols and its' amount
  map<string, int64> delegations = 2;
}

message SetTransactionFeeDelegationsOutput {
  bool success = 1;
}

message RemoveTransactionFeeDelegatorInput{
  // the delegator address
  aelf.Address delegator_address = 1;
}

message RemoveTransactionFeeDelegateeInput {
  // the delegatee address
  aelf.Address delegatee_address = 1;
}

message GetTransactionFeeDelegationsOfADelegateeInput {
  aelf.Address delegatee_address = 1;
  aelf.Address delegator_address = 2;
}

message GetTransactionFeeDelegateesInput {
  aelf.Address delegator_address = 1;
}

message GetTransactionFeeDelegateesOutput {
  repeated aelf.Address delegatee_addresses = 1;
}

message SetSymbolAliasInput {
  string symbol = 1;
  string alias = 2;
}

// Events

message Transferred {
  option (aelf.is_event) = true;
  // The source address of the transferred token.
  aelf.Address from = 1 [(aelf.is_indexed) = true];
  // The destination address of the transferred token.
  aelf.Address to = 2 [(aelf.is_indexed) = true];
  // The symbol of the transferred token.
  string symbol = 3 [(aelf.is_indexed) = true];
  // The amount of the transferred token.
  int64 amount = 4;
  // The memo.
  string memo = 5;
}

message Approved {
  option (aelf.is_event) = true;
  // The address of the token owner.
  aelf.Address owner = 1 [(aelf.is_indexed) = true];
  // The address that allowance be increased.
  aelf.Address spender = 2 [(aelf.is_indexed) = true];
  // The symbol of approved token.
  string symbol = 3 [(aelf.is_indexed) = true];
  // The amount of approved token.
  int64 amount = 4;
}

message UnApproved {
  option (aelf.is_event) = true;
  // The address of the token owner.
  aelf.Address owner = 1 [(aelf.is_indexed) = true];
  // The address that allowance be decreased.
  aelf.Address spender = 2 [(aelf.is_indexed) = true];
  // The symbol of un-approved token.
  string symbol = 3 [(aelf.is_indexed) = true];
  // The amount of un-approved token.
  int64 amount = 4;
}

message Burned
{
  option (aelf.is_event) = true;
  // The address who wants to burn token.
  aelf.Address burner = 1 [(aelf.is_indexed) = true];
  // The symbol of burned token.
  string symbol = 2 [(aelf.is_indexed) = true];
  // The amount of burned token.
  int64 amount = 3;
}

message ChainPrimaryTokenSymbolSet {
  option (aelf.is_event) = true;
  // The symbol of token.
  string token_symbol = 1;
}

message CalculateFeeAlgorithmUpdated {
  option (aelf.is_event) = true;
  // All calculate fee coefficients after modification.
  AllCalculateFeeCoefficients all_type_fee_coefficients = 1;
}

message RentalCharged {
  option (aelf.is_event) = true;
  // The symbol of rental fee charged.
  string symbol = 1;
  // The amount of rental fee charged.
  int64 amount = 2;
  // The payer of rental fee.
  aelf.Address payer = 3;
  // The receiver of rental fee.
  aelf.Address receiver = 4;
}

message RentalAccountBalanceInsufficient {
  option (aelf.is_event) = true;
  // The symbol of insufficient rental account balance.
  string symbol = 1;
  // The balance of the account.
  int64 amount = 2;
}

message TokenCreated {
  option (aelf.is_event) = true;
  // The symbol of the token.
  string symbol = 1;
  // The full name of the token.
  string token_name = 2;
  // The total supply of the token.
  int64 total_supply = 3;
  // The precision of the token.
  int32 decimals = 4;
  // The address that has permission to issue the token.
  aelf.Address issuer = 5;
  // A flag indicating if this token is burnable.
  bool is_burnable = 6;
  // The chain id of the token.
  int32 issue_chain_id = 7;
  // The external information of the token.
  ExternalInfo external_info = 8;
  // The address that owns the token.
  aelf.Address owner = 9;
}

message Issued {
  option (aelf.is_event) = true;
  // The symbol of issued token.
  string symbol = 1;
  // The amount of issued token.
  int64 amount = 2;
  // The memo.
  string memo = 3;
  // The issued target address.
  aelf.Address to = 4;
}

message CrossChainTransferred {
  option (aelf.is_event) = true;
  // The source address of the transferred token.
  aelf.Address from = 1;
  // The destination address of the transferred token.
  aelf.Address to = 2;
  // The symbol of the transferred token.
  string symbol = 3;
  // The amount of the transferred token.
  int64 amount = 4;
  // The memo.
  string memo = 5;
  // The destination chain id.
  int32 to_chain_id = 6;
  // The chain id of the token.
  int32 issue_chain_id = 7;
}

message CrossChainReceived {
  option (aelf.is_event) = true;
  // The source address of the transferred token.
  aelf.Address from = 1;
  // The destination address of the transferred token.
  aelf.Address to = 2;
  // The symbol of the received token.
  string symbol = 3;
  // The amount of the received token.
  int64 amount = 4;
  // The memo.
  string memo = 5;
  // The destination chain id.
  int32 from_chain_id = 6;
  // The chain id of the token.
  int32 issue_chain_id = 7;
  // The parent chain height of the transfer transaction.
  int64 parent_chain_height = 8;
  // The id of transfer transaction.
  aelf.Hash transfer_transaction_id =9;
}

message TransactionFeeDelegationAdded {
  option (aelf.is_event) = true;
  aelf.Address delegator = 1 [(aelf.is_indexed) = true];
  aelf.Address delegatee = 2 [(aelf.is_indexed) = true];
  aelf.Address caller = 3 [(aelf.is_indexed) = true];
}

message TransactionFeeDelegationCancelled {
  option (aelf.is_event) = true;
  aelf.Address delegator = 1 [(aelf.is_indexed) = true];
  aelf.Address delegatee = 2 [(aelf.is_indexed) = true];
  aelf.Address caller = 3 [(aelf.is_indexed) = true];
}

message SymbolAliasAdded {
  option (aelf.is_event) = true;
  string symbol = 1 [(aelf.is_indexed) = true];
  string alias = 2 [(aelf.is_indexed) = true];
}

message SymbolAliasDeleted {
  option (aelf.is_event) = true;
  string symbol = 1 [(aelf.is_indexed) = true];
  string alias = 2 [(aelf.is_indexed) = true];
}
```

#### Contract Reference State

- Navigate to `src`. 

- create a **new file** `ContractReferences.cs`.

The implementation of file `src/ContractRefefrence.cs` is as follows:

```csharp title="ContractReferences.cs"
using AElf.Contracts.MultiToken;

namespace AElf.Contracts.NFTMarketplace
{
    public partial class NFTMarketplaceState
    {
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
    }
}
```

#### Implement NFTMarketplace Game Smart Contract

- Navigate to `src/NFTMarketplace.cs`

```csharp title="NFTMarketplace.cs"
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.NFTMarketplace
{
    // Contract class must inherit the base class generated from the proto file
    public class NFTMarketplace : NFTMarketplaceContainer.NFTMarketplaceBase
    {
        private const string TokenContractAddress = "ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx"; // tDVW token contract address
        private const string TokenSymbol = "ELF";
        private const long MinimumPlayAmount = 1_000_000; // 0.01 ELF
        private const long MaximumPlayAmount = 1_000_000_000; // 10 ELF

        // Initializes the contract
        public override Empty Initialize(Empty input)
        {
            // Check if the contract is already initialized
            Assert(State.Initialized.Value == false, "Already initialized.");
            // Set the contract state
            State.Initialized.Value = true;
            // Set the owner address
            State.Owner.Value = Context.Sender;

            // Initialize the token contract
            State.TokenContract.Value = Address.FromBase58(TokenContractAddress);

            return new Empty();
        }

        // Interact with the NFTMarketplace with a specified amount of tokens.
        // The method checks if the play amount is within the limit.
        // If the player wins, tokens are transferred from the contract to the sender and a PlayOutcomeEvent is fired with the won amount.
        // If the player loses, tokens are transferred from the sender to the contract and a PlayOutcomeEvent is fired with the lost amount.
        public override Empty Play(Int64Value input)
        {
            var playAmount = input.Value;

            // Check if input amount is within the limit
            Assert(playAmount is >= MinimumPlayAmount and <= MaximumPlayAmount, "Invalid play amount.");

            // Check if the sender has enough tokens
            var balance = State.TokenContract.GetBalance.Call(new GetBalanceInput
            {
                Owner = Context.Sender,
                Symbol = TokenSymbol
            }).Balance;
            Assert(balance >= playAmount, "Insufficient balance.");

            // Check if the contract has enough tokens
            var contractBalance = State.TokenContract.GetBalance.Call(new GetBalanceInput
            {
                Owner = Context.Self,
                Symbol = TokenSymbol
            }).Balance;
            Assert(contractBalance >= playAmount, "Insufficient contract balance.");

            if(IsWinner())
            {
                // Transfer the token from the contract to the sender
                State.TokenContract.Transfer.Send(new TransferInput
                {
                    To = Context.Sender,
                    Symbol = TokenSymbol,
                    Amount = playAmount
                });

                // Emit an event to notify listeners about the outcome
                Context.Fire(new PlayOutcomeEvent
                {
                    Amount = input.Value,
                    Won = playAmount
                });
            }
            else
            {
                // Transfer the token from the sender to the contract
                State.TokenContract.TransferFrom.Send(new TransferFromInput
                {
                    From = Context.Sender,
                    To = Context.Self,
                    Symbol = TokenSymbol,
                    Amount = playAmount
                });

                // Emit an event to notify listeners about the outcome
                Context.Fire(new PlayOutcomeEvent
                {
                    Amount = input.Value,
                    Won = -playAmount
                });
            }

            return new Empty();
        }

        // Withdraws a specified amount of tokens from the contract.
        // This method can only be called by the owner of the contract.
        // After the tokens are transferred, a WithdrawEvent is fired to notify any listeners about the withdrawal.
        public override Empty Withdraw(Int64Value input)
        {
            AssertIsOwner();

            // Transfer the token from the contract to the sender
            State.TokenContract.Transfer.Send(new TransferInput
            {
                To = Context.Sender,
                Symbol = TokenSymbol,
                Amount = input.Value
            });

            // Emit an event to notify listeners about the withdrawal
            Context.Fire(new WithdrawEvent
            {
                Amount = input.Value,
                From = Context.Self,
                To = State.Owner.Value
            });

            return new Empty();
        }

        // Deposits a specified amount of tokens into the contract.
        // This method can only be called by the owner of the contract.
        // After the tokens are transferred, a DepositEvent is fired to notify any listeners about the deposit.
       public override Empty Deposit(Int64Value input)
        {
            AssertIsOwner();

            // Transfer the token from the sender to the contract
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Symbol = TokenSymbol,
                Amount = input.Value
            });

            // Emit an event to notify listeners about the deposit
            Context.Fire(new DepositEvent
            {
                Amount = input.Value,
                From = Context.Sender,
                To = Context.Self
            });

            return new Empty();
        }

        // Transfers the ownership of the contract to a new owner.
        // This method can only be called by the current owner of the contract.
        public override Empty TransferOwnership(Address input)
        {
            AssertIsOwner();

            // Set the new owner address
            State.Owner.Value = input;

            return new Empty();
        }

        // A method that read the contract's play amount limit
        public override PlayAmountLimitMessage GetPlayAmountLimit(Empty input)
        {
            // Wrap the value in the return type
            return new PlayAmountLimitMessage
            {
                MinimumAmount = MinimumPlayAmount,
                MaximumAmount = MaximumPlayAmount
            };
        }

        // A method that read the contract's current balance
        public override Int64Value GetContractBalance(Empty input)
        {
            // Get the balance of the contract
            var balance = State.TokenContract.GetBalance.Call(new GetBalanceInput
            {
                Owner = Context.Self,
                Symbol = TokenSymbol
            }).Balance;

            // Wrap the value in the return type
            return new Int64Value
            {
                Value = balance
            };
        }

        // A method that read the contract's owner
        public override StringValue GetOwner(Empty input)
        {
            return State.Owner.Value == null ? new StringValue() : new StringValue {Value = State.Owner.Value.ToBase58()};
        }

        // Determines if the player is a winner.
        // This method generates a random number based on the current block height and checks if it's equal to 0.
        // If the random number is 0, the player is considered a winner.
        private bool IsWinner()
        {
            var randomNumber = Context.CurrentHeight % 2;
            return randomNumber == 0;
        }

        // This method is used to ensure that only the owner of the contract can perform certain actions.
        // If the context sender is not the owner, an exception is thrown with the message "Unauthorized to perform the action."
        private void AssertIsOwner()
        {
            Assert(Context.Sender == State.Owner.Value, "Unauthorized to perform the action.");
        }
    }

}
```

### Building Smart Contract

- Build the new code with the following commands inside `src` folder:

```bash title="Terminal"
dotnet build
```

You should see **NFTMarketplace.dll.patched** in the directory `nft_marketplace/src/bin/Debug/net.6.0`

## Step 3 - Deploy Smart Contract

import Deploy from "../\_deploy.md"

<Deploy />

## Step 4 - Interact with Your Deployed Smart Contract

### Approving Smart Contract Spending

```bash title="Terminal"
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Approve
```

:::tip
ℹ️ Note: `ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx` is the contract address of `Multitoken Contract` on aelf Testnet Sidechain (tDVW).
:::

When prompted, enter the following parameters to approve the spending of 90 ELF tokens:

```terminal title="Terminal"
Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <spender>: "INSERT_YOUR_CONTRACT_ADDRESS_HERE"
? Enter the required param <symbol>: ELF
? Enter the required param <amount>: 9000000000
```

### Initializing NFT Marketplace Contract

```bash title="Terminal"
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Initialize
```

- Output:

![result](/img/Initialize.png)

### Creating collection into the NFT Marketplace Contract

```bash title="Terminal"
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io CreateNFTCollection
```

### Creating token into the NFT Marketplace Contract

```bash title="Terminal"
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io CreateNFT
```


- You will be prompted for the following:

```terminal title="Terminal"
Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <value>: 20000
```

- Output:

![result](/img/Deposit.png)

### Get the NFT balance for an address

```bash title="Terminal"
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io GetNFTBalance
```

### Get the NFT details of an NFT

```bash title="Terminal"
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io GetNFTDetails
```

### Transfer NFT from one address to other address

```bash title="Terminal"
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io TransferNFT
```