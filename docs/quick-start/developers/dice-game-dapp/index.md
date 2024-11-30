---
sidebar_position: 10
title: Dice Game dApp
description: Moderately complex smart contract
---

**Description**: This contract is moderately complex. It demonstrates the use of
state variables, user interactions, and random number generation using Aetherlink VRF to create a dice game where users can bet on the outcome of the dice roll. Aetherlink is a decentralized oracle network on aelf blockchain.

**Purpose**: To introduce you to more advanced concepts such as state management, event handling, and randomization using oracle networks in smart contracts.

**Difficulty Level**: Moderate

<iframe width="100%" style={{"aspect-ratio": "16 / 9"}} src="https://www.youtube.com/embed/sBNfFADQMXg?si=wbCGIIxez-nh0PC-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Step 1 - Setting up your development environment

import Setup from "../\_setup.md"

<Setup />

## Step 2 - Develop Smart Contract

### Start Your Smart Contract Project

- Open your `Terminal`.

- Enter the following command to generate a new project:

```bash title="Terminal"
mkdir dice-game
cd dice-game
dotnet new aelf -n DiceGame
```

### Adding Your Smart Contract Code

Now that we have a template dice game project, we can customise the template to incorporate our own contract logic.
Lets start by implementing methods to provide basic functionality for interacting with the oracle to generate a verifiable random number. Then updating and reading a message stored persistently in the contract state to determine outcome of the game.

- Enter this command in your `Terminal`.

```bash title="Terminal"
cd src
```

#### Defining Methods and Messages

- Rename the file name from `Protobuf/contract/hello_world_contract.proto` to `dice_master_contract.proto`:

```bash title="Terminal"
mv Protobuf/contract/hello_world_contract.proto Protobuf/contract/dice_master_contract.proto
```

- open the project with your IDE.

The implementation of file `src/Protobuf/contract/dice_master_contract.proto` is as follows:

```csharp title="dice_master_contract.proto"
syntax = "proto3";

import "aelf/core.proto";
import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "Protobuf/reference/acs12.proto";
import "Protobuf/message/request_interface.proto";
// The namespace of this class
option csharp_namespace = "AElf.Contracts.DiceMaster";

service DiceMaster {
  // The name of the state class the smart contract is going to use to access blockchain state
  option (aelf.csharp_state) = "AElf.Contracts.DiceMaster.DiceMasterState";
  option (aelf.base) = "Protobuf/reference/acs12.proto";
  option (aelf.base) = "Protobuf/message/request_interface.proto";

  rpc Initialize (google.protobuf.Empty) returns (google.protobuf.Empty) {
  }

  rpc Play (google.protobuf.Int64Value) returns (google.protobuf.Empty) {
  }

  rpc Withdraw (google.protobuf.Int64Value) returns (google.protobuf.Empty) {
  }

  rpc Deposit (google.protobuf.Int64Value) returns (google.protobuf.Empty) {
  }
  
  rpc TransferOwnership (aelf.Address) returns (google.protobuf.Empty) {
  }

  rpc SetSubscriptionId (google.protobuf.Int64Value) returns (google.protobuf.Empty) {
  }

  rpc SetOracleNodeId (google.protobuf.Int32Value) returns (google.protobuf.Empty) {
  }

  rpc GetPlayAmountLimit (google.protobuf.Empty) returns (PlayAmountLimitMessage) {
    option (aelf.is_view) = true;
  }

  rpc GetContractBalance (google.protobuf.Empty) returns (google.protobuf.Int64Value) {
    option (aelf.is_view) = true;
  }
  
  rpc GetOwner (google.protobuf.Empty) returns (google.protobuf.StringValue) {
    option (aelf.is_view) = true;
  }

  rpc GetSubscriptionId (google.protobuf.Empty) returns (google.protobuf.Int64Value) {
    option (aelf.is_view) = true;
  }

  rpc GetOracleNodeId (google.protobuf.Empty) returns (google.protobuf.Int32Value) {
    option (aelf.is_view) = true;
  }

  rpc GetPlayerInfo (aelf.Address) returns (PlayerInfo) {
    option (aelf.is_view) = true;
  }
}

// An event that will be emitted from contract method call when Play is called.
message PlayOutcomeEvent {
  option (aelf.is_event) = true;
  int64 amount = 1;
  int64 won = 2;
  aelf.Address from = 3;
}

// An event that will be emitted from contract method call when Withdraw is called.
message WithdrawEvent {
  option (aelf.is_event) = true;
  int64 amount = 1;
  aelf.Address from = 2;
  aelf.Address to = 3;
}

// An event that will be emitted from contract method call when Deposit is called.
message DepositEvent {
  option (aelf.is_event) = true;
  int64 amount = 1;
  aelf.Address from = 2;
  aelf.Address to = 3;
}

// The message containing the play amount limits
message PlayAmountLimitMessage {
  int64 minimumAmount = 1;
  int64 maximumAmount = 2;
}

message PlayedRecord {
  aelf.Address address = 1;
  int64 blockNumber = 2;
}

message PlayerInfo {
  aelf.Address address = 1;
  int64 dice1 = 2;
  int64 dice2 = 3;
  bool win = 4;
  int64 amount = 5;
  bool pending = 6;
  int64 blockNumber = 7;
}
```

#### Define Contract States

The implementation of file `src/DiceMasterState.cs` is as follows:

```csharp title="src/DiceMasterState.cs"
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.DiceMaster
{
    // The state class is access the blockchain state
    public partial class DiceMasterState : ContractState 
    {
        // A state to check if contract is initialized
        public BoolState Initialized { get; set; }
        // A state to store the owner address
        public SingletonState<Address> Owner { get; set; }
        public MappedState<Hash, PlayedRecord> PlayedRecords { get; set; }
        public SingletonState<int> OracleNodeId { get; set; }
        public SingletonState<long> SubscriptionId { get; set; }
        public MappedState<Address, PlayerInfo> PlayerInfos { get; set; }
    }
}
```

#### Token Contract Reference State

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

#### Oracle Contract Reference State

- Create a new file `oracle_contract.proto` under `src/Protobuf/reference/`.

- Replace this code of implementation file of `oracle_contract.proto`:

```csharp title="oracle_contract.proto"
// the version of the language, use proto3 for contracts
syntax = "proto3";

// some core imports for AElf chain types
import "aelf/core.proto";
import "aelf/options.proto";
import "Protobuf/reference/acs12.proto";
import "Protobuf/reference/oracle_common_message.proto";

// import for using the google.protobuf.* type.
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "google/protobuf/timestamp.proto";

// the name of the C# namespace in which the contract code will be,
// generated code will also be in this namespace.
option csharp_namespace = "AetherLink.Contracts.Oracle";

// the contract definition: a gRPC service definition.
service OracleContract {

    // the full name of the C# class that will contain the state (here <namespace>.<state-class-name> format).
    option (aelf.base) = "Protobuf/reference/acs12.proto";
    option (aelf.csharp_state) = "AetherLink.Contracts.Oracle.OracleContractState";
    
    // Action
    // Admin
    rpc Initialize(InitializeInput) returns (google.protobuf.Empty) {}
    rpc TransferAdmin(aelf.Address) returns (google.protobuf.Empty) {}
    rpc AcceptAdmin(google.protobuf.Empty) returns (google.protobuf.Empty) {}
    rpc Pause (google.protobuf.Empty) returns (google.protobuf.Empty) {}
    rpc Unpause (google.protobuf.Empty) returns (google.protobuf.Empty) {}

    // subscription
    rpc CreateSubscription (google.protobuf.Empty) returns (google.protobuf.Empty) {}
    rpc CreateSubscriptionWithConsumer (aelf.Address) returns (google.protobuf.Empty) {}
    rpc CancelSubscription (CancelSubscriptionInput) returns (google.protobuf.Empty) {}
    rpc AdminCancelSubscription (google.protobuf.Int64Value) returns (google.protobuf.Empty) {}
    rpc ProposeSubscriptionOwnerTransfer (ProposeSubscriptionOwnerTransferInput) returns (google.protobuf.Empty) {}
    rpc AcceptSubscriptionOwnerTransfer (google.protobuf.Int64Value) returns (google.protobuf.Empty) {}
    rpc AddConsumer (AddConsumerInput) returns (google.protobuf.Empty) {}
    rpc RemoveConsumer (RemoveConsumerInput) returns (google.protobuf.Empty) {}

    // Config
    rpc AddCoordinator (aelf.Address) returns (google.protobuf.Empty) {}
    rpc SetCoordinatorStatus (SetCoordinatorStatusInput) returns (google.protobuf.Empty) {}
    rpc SetConfig (SetConfigInput) returns (google.protobuf.Empty) {}
    rpc SetSubscriptionConfig (SubscriptionConfig) returns (google.protobuf.Empty) {}
    rpc SetMaxOracleCount (google.protobuf.Int64Value) returns (google.protobuf.Empty) {}
    
    // PK
    rpc RegisterProvingKey (RegisterProvingKeyInput) returns (google.protobuf.Empty) {}
    rpc DeregisterProvingKey (DeregisterProvingKeyInput) returns (google.protobuf.Empty) {}
    
    // Request
    rpc SendRequest (SendRequestInput) returns (google.protobuf.Empty) {}
    rpc StartRequest (StartRequestInput) returns (google.protobuf.Empty) {}
    rpc Fulfill (FulfillInput) returns (google.protobuf.Empty) {}
    rpc Transmit (TransmitInput) returns (google.protobuf.Empty) {}
    rpc CancelRequest (CancelRequestInput) returns (google.protobuf.Empty) {}
    
    // View
    rpc GetAdmin(google.protobuf.Empty) returns (aelf.Address) { option (aelf.is_view) = true; }
    rpc IsPaused (google.protobuf.Empty) returns (google.protobuf.BoolValue) { option (aelf.is_view) = true; }

    rpc GetConfig (google.protobuf.Empty) returns (GetConfigOutput) { option (aelf.is_view) = true; }
    rpc GetSubscriptionConfig (google.protobuf.Empty) returns (SubscriptionConfig) { option (aelf.is_view) = true; }
    rpc GetCoordinatorByIndex (google.protobuf.Int32Value) returns (Coordinator) { option (aelf.is_view) = true; }
    rpc GetCoordinators (google.protobuf.Empty) returns (CoordinatorList) { option (aelf.is_view) = true; }
    rpc GetMaxOracleCount (google.protobuf.Empty) returns (google.protobuf.Int64Value) { option (aelf.is_view) = true; }
    rpc GetLatestConfigDetails (google.protobuf.Empty) returns (GetLatestConfigDetailsOutput) { option (aelf.is_view) = true; }
    rpc GetLatestRound (google.protobuf.Empty) returns (google.protobuf.Int64Value) { option (aelf.is_view) = true; }
    rpc GetTransmitters (google.protobuf.Empty) returns (AddressList) { option (aelf.is_view) = true; }
    rpc GetOracle (aelf.Address) returns (Oracle) { option (aelf.is_view) = true; }
    
    rpc GetProvingKeyHashes (google.protobuf.Empty) returns (HashList) { option (aelf.is_view) = true; }
    rpc GetOracleByProvingKeyHash (google.protobuf.StringValue) returns (aelf.Address) { option (aelf.is_view) = true; }
    rpc GetHashFromKey (google.protobuf.StringValue) returns (aelf.Hash) { option (aelf.is_view) = true; }

    rpc IsPendingRequestExists (google.protobuf.Int64Value) returns (google.protobuf.BoolValue) { option (aelf.is_view) = true; }
    rpc GetSubscription (google.protobuf.Int64Value) returns (Subscription) { option (aelf.is_view) = true; }
    rpc GetConsumer (GetConsumerInput) returns (Consumer) { option (aelf.is_view) = true; }
    rpc GetSubscriptionCount (google.protobuf.Empty) returns (google.protobuf.Int64Value) { option (aelf.is_view) = true; }
}

// Data structure
message InitializeInput {
    aelf.Address admin = 1;
}

message Coordinator {
    int32 request_type_index = 1;
    aelf.Address coordinator_contract_address = 2;
    bool status = 3;
}

message CoordinatorList {
    repeated Coordinator data = 1;
}

message SetCoordinatorStatusInput {
    int32 request_type_index = 1;
    bool status = 2;
}

message Config {
    aelf.Hash latest_config_digest = 1;
    int32 f = 2;  // // number of faulty oracles the system can tolerate
    int32 n = 3;  // number of signers/transmitters
}

message SetConfigInput {
    repeated aelf.Address signers = 1;
    repeated aelf.Address transmitters = 2;
    int32 f = 3;  // number of faulty oracles the system can tolerate
    int64 off_chain_config_version = 4;  // version of the off-chain configuration
    bytes off_chain_config = 5;  // serialized configuration used by the oracles exclusively and only passed through
}

message ConfigData {
    int32 chain_id = 1;
    aelf.Address contract_address = 2;  // self
    int64 config_count = 3;
    repeated aelf.Address signers = 4;
    repeated aelf.Address transmitters = 5;
    int32 f = 6;
    int64 off_chain_config_version = 7;
    bytes off_chain_config = 8;
}

message Oracle {
    int32 index = 1;  // index of the oracle in the list of signers/transmitters
    Role role = 2;
}

enum Role {
    Unset = 0;
    Signer = 1;
    Transmitter = 2;
}

message AddressList {
    repeated aelf.Address data = 1;
}

message GetLatestConfigDetailsOutput {
    int64 config_count = 1;  // times of config set
    int64 block_number = 2;  // block number when latest config set
    aelf.Hash config_digest = 3;
}

message SendRequestInput {
    int64 subscription_id = 1;
    int32 request_type_index = 2;
    bytes specific_data = 3;
    aelf.Hash trace_id = 4;
}

message StartRequestInput {
    aelf.Hash request_id = 1;
    aelf.Address requesting_contract = 2;
    int64 subscription_id = 3;
    aelf.Address subscription_owner = 4;
    bytes commitment = 5;
    int32 request_type_index = 6;
}

message FulfillInput {
    bytes response = 1;
    bytes err = 2;
    aelf.Address transmitter = 3;
    oracle.Commitment commitment = 4;
}

message TransmitInput {
    repeated aelf.Hash report_context = 1;
    bytes report = 2;
    repeated bytes signatures = 3;
}

message CancelRequestInput {
    aelf.Hash request_id = 1;
    int64 subscription_id = 2;
    aelf.Address consumer = 3;
    int32 request_type_index = 4;
}

message RegisterProvingKeyInput {
    aelf.Address oracle = 1;
    string public_proving_key = 2;
}

message DeregisterProvingKeyInput {
    string public_proving_key = 1;
}

message SubscriptionConfig {
    int64 max_consumers_per_subscription = 1;
}

message Subscription {
    aelf.Address owner = 1;
    aelf.Address proposed_owner = 2;
    repeated aelf.Address consumers = 3;
    int64 balance = 4;
    int64 block_balance = 5;
}

message Consumer {
    bool allowed = 1;
    int64 initiated_requests = 2;
    int64 completed_requests = 3;
}

message ProposeSubscriptionOwnerTransferInput {
    int64 subscription_id = 1;
    aelf.Address to = 2;
}

message CancelSubscriptionInput {
    int64 subscription_id = 1;
    aelf.Address to = 2;
}

message AddConsumerInput {
    int64 subscription_id = 1;
    aelf.Address consumer = 2;
}

message RemoveConsumerInput {
    int64 subscription_id = 1;
    aelf.Address consumer = 2;
}

message GetConsumerInput {
    aelf.Address consumer = 1;
    int64 subscription_id = 2;
}

message HashList {
    repeated aelf.Hash data = 1;
}

message GetConfigOutput {
    Config config = 1;
    repeated aelf.Address signers = 2;
    repeated aelf.Address transmitters = 3;
}

// Log event
message AdminTransferRequested {
    option (aelf.is_event) = true;
    aelf.Address from = 1;
    aelf.Address to = 2;
}

message AdminTransferred {
    option (aelf.is_event) = true;
    aelf.Address from = 1;
    aelf.Address to = 2;
}

message ConfigSet {
    option (aelf.is_event) = true;
    int64 previous_config_block_number = 1;
    aelf.Hash config_digest = 2;
    int64 config_count = 3;
    AddressList signers = 4;
    AddressList transmitters = 5;
    int32 f = 6;
    int64 off_chain_config_version = 7;
    bytes off_chain_config = 8;
}

message ProvingKeyRegistered {
    option (aelf.is_event) = true;
    aelf.Hash key_hash = 1;
    aelf.Address oracle = 2;
}

message ProvingKeyDeregistered {
    option (aelf.is_event) = true;
    aelf.Hash key_hash = 1;
    aelf.Address oracle = 2;
}

message OracleRequestSent {
    option (aelf.is_event) = true;
    int64 subscription_id = 1;
    aelf.Address subscription_owner = 2;
    aelf.Address requesting_contract = 3;
    aelf.Address request_initiator = 4;
    bytes specific_data = 5;
}

message RequestStarted {
    option (aelf.is_event) = true;
    aelf.Hash request_id = 1;
    aelf.Address requesting_contract = 2;   // consumer contract address
    aelf.Address requesting_initiator = 3;  // origin address
    int64 subscription_id = 4;
    aelf.Address subscription_owner = 5;
    bytes commitment = 6;                   // commitment to the request
    int32 request_type_index = 7;
}

message RequestProcessed {
    option (aelf.is_event) = true;
    aelf.Hash request_id = 1;
    int64 subscription_id = 2;
    aelf.Address transmitter = 3;
    bytes response = 4;
    bytes err = 5;
}

message Transmitted {
    option (aelf.is_event) = true;
    aelf.Hash request_id = 1;
    aelf.Hash config_digest = 2;
    int64 epoch_and_round = 3;
    aelf.Address transmitter = 4;
}

message CoordinatorSet {
    option (aelf.is_event) = true;
    aelf.Address coordinator_contract_address = 1;
    int32 request_type_index = 2;
    bool status = 3;
}

message SubscriptionCreated {
    option (aelf.is_event) = true;
    int64 subscription_id = 1;
    aelf.Address owner = 2;
}

message SubscriptionConsumerAdded {
    option (aelf.is_event) = true;
    int64 subscription_id = 1;
    aelf.Address consumer = 2;
}

message SubscriptionCanceled {
    option (aelf.is_event) = true;
    int64 subscription_id = 1;
    aelf.Address funds_recipient = 2;
    int64 funds_amount = 3;
}

message SubscriptionOwnerTransferRequested {
    option (aelf.is_event) = true;
    int64 subscription_id = 1;
    aelf.Address from = 2;
    aelf.Address to = 3;
}

message SubscriptionOwnerTransferred {
    option (aelf.is_event) = true;
    int64 subscription_id = 1;
    aelf.Address from = 2;
    aelf.Address to = 3;
}

message SubscriptionConsumerRemoved {
    option (aelf.is_event) = true;
    int64 subscription_id = 1;
    aelf.Address consumer = 2;
}

message SubscriptionConfigSet {
    option (aelf.is_event) = true;
    SubscriptionConfig config = 1;
}

message Paused {
    option (aelf.is_event) = true;
    aelf.Address account = 1;  // the address called Pause()
}

message Unpaused {
    option (aelf.is_event) = true;
    aelf.Address account = 1;  // the address called Unpause()
}

message RequestCancelled {
    option (aelf.is_event) = true;
    aelf.Hash request_id = 1;
}
```

#### Coordinator Contract Reference State

- Create a new file `coordinator_contract.proto` under `src/Protobuf/reference/`.

- Replace this code of implementation file of `coordinator_contract.proto`:

```csharp title="coordinator_contract.proto"
// the version of the language, use proto3 for contracts
syntax = "proto3";

// some core imports for AElf chain types
import "aelf/core.proto";
import "aelf/options.proto";
import "Protobuf/reference/acs12.proto";
import "Protobuf/reference/oracle_common_message.proto";

package coordinator;

// import for using the google.protobuf.* type.
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "google/protobuf/timestamp.proto";

// the contract definition: a gRPC service definition.
service CoordinatorInterface {

  // Action
  // Admin
  rpc Initialize(InitializeInput) returns (google.protobuf.Empty) {}
  rpc TransferAdmin(aelf.Address) returns (google.protobuf.Empty) {}
  rpc AcceptAdmin(google.protobuf.Empty) returns (google.protobuf.Empty) {}
  rpc Pause (google.protobuf.Empty) returns (google.protobuf.Empty) {}
  rpc Unpause (google.protobuf.Empty) returns (google.protobuf.Empty) {}

  // Config
  rpc SetOracleContractAddress (aelf.Address) returns (google.protobuf.Empty) {}
  rpc SetRequestTypeIndex(google.protobuf.Int32Value) returns (google.protobuf.Empty) {}

  // Request
  rpc SendRequest (Request) returns (google.protobuf.Empty) {}
  rpc Report (ReportInput) returns (google.protobuf.Empty) {}
  rpc DeleteCommitment (aelf.Hash) returns (google.protobuf.Empty) {}

  // View
  rpc GetAdmin (google.protobuf.Empty) returns (aelf.Address) { option (aelf.is_view) = true; }
  rpc IsPaused (google.protobuf.Empty) returns (google.protobuf.BoolValue) { option (aelf.is_view) = true; }
  rpc GetOracleContractAddress (google.protobuf.Empty) returns (aelf.Address) { option (aelf.is_view) = true; }
  rpc GetRequestTypeIndex (google.protobuf.Empty) returns (google.protobuf.Int32Value) { option (aelf.is_view) = true; }
  rpc GetCommitmentHash (aelf.Hash) returns (aelf.Hash) { option (aelf.is_view) = true; }
}

//Data structure
message InitializeInput {
  aelf.Address admin = 1;
  aelf.Address oracle = 2;
  int32 request_type_index = 3;
}

message Request {
  aelf.Address requesting_contract = 1;
  int64 subscription_id = 2;
  int64 initiated_requests = 3;
  int64 completed_requests = 4;
  aelf.Address subscription_owner = 5;
  bytes specific_data = 6;
  aelf.Hash trace_id = 7;
}

message RequestInfo {
  aelf.Address coordinator = 1;
  aelf.Address requesting_contract = 2;
  int64 subscription_id = 3;
  int64 nonce = 4;
  google.protobuf.Timestamp timeout_timestamp = 5;
  aelf.Address request_initiator = 6;
  aelf.Hash trace_id = 7;
}

message ReportInput {
  aelf.Address transmitter = 1;
  repeated aelf.Hash report_context = 2;
  bytes report = 3;
  repeated bytes signatures = 4;
}

// log event
message AdminTransferRequested {
  option (aelf.is_event) = true;
  aelf.Address from = 1;
  aelf.Address to = 2;
}

message AdminTransferred {
  option (aelf.is_event) = true;
  aelf.Address from = 1;
  aelf.Address to = 2;
}

message Paused {
  option (aelf.is_event) = true;
  aelf.Address account = 1;  // the address called Pause()
}

message Unpaused {
  option (aelf.is_event) = true;
  aelf.Address account = 1;  // the address called Unpause()
}

message RequestSent {
  option (aelf.is_event) = true;
  aelf.Hash request_id = 1;
  aelf.Address requesting_contract = 2;
  aelf.Address requesting_initiator = 3;
  bytes commitment = 4;
}

message Reported {
  option (aelf.is_event) = true;
  aelf.Hash request_id = 1;
  aelf.Address transmitter = 2;
}

message RequestTypeIndexSet {
  option (aelf.is_event) = true;
  int32 request_type_index = 1;
}

message CommitmentDeleted {
  option (aelf.is_event) = true;
  aelf.Hash request_id = 1;
}
```

#### Oracle Common Message Contract Reference State

- Create a new file `oracle_common_message.proto` under `src/Protobuf/reference/`.

- Replace this code of implementation file of `oracle_common_message.proto`:

```csharp title="oracle_common_message.proto"
// the version of the language, use proto3 for contracts
syntax = "proto3";

// some core imports for AElf chain types
import "aelf/core.proto";
import "aelf/options.proto";
import "Protobuf/reference/acs12.proto";

package oracle;

// import for using the google.protobuf.* type.
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "google/protobuf/timestamp.proto";

// the name of the C# namespace in which the contract code will be,

message Commitment {
  aelf.Hash request_id = 1;                         
  aelf.Address coordinator = 2;                     // coordinator contract address
  aelf.Address client = 3;                          // consumer contract address
  int64 subscription_id = 4;
  google.protobuf.Timestamp timeout_timestamp = 5;
  bytes specific_data = 6;
  int32 request_type_index = 7;
  aelf.Hash trace_id = 8;
}

message Report {
  bytes result = 1;
  bytes error = 2;
  bytes on_chain_metadata = 3;   // serialized Commitment
  bytes off_chain_metadata = 4;  // TODO use in getDonFee() for dynamic billing
}
```

#### VRF Coordinator Contract Reference State

- Create a new file `vrf_coordinator_contract.proto` under `src/Protobuf/reference/`.

- Replace this code of implementation file of `vrf_coordinator_contract.proto`:

```csharp title="vrf_coordinator_contract.proto"
// the version of the language, use proto3 for contracts
syntax = "proto3";

package vrf;

// some core imports for AElf chain types
import "aelf/core.proto";
import "aelf/options.proto";
import "Protobuf/reference/acs12.proto";
import "Protobuf/reference/oracle_common_message.proto";
import "Protobuf/reference/coordinator_contract.proto";

// import for using the google.protobuf.* type.
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "google/protobuf/timestamp.proto";

// the name of the C# namespace in which the contract code will be,
// generated code will also be in this namespace.
option csharp_namespace = "AetherLink.Contracts.VRF.Coordinator";

// the contract definition: a gRPC service definition.
service VrfCoordinatorContract {

  // the full name of the C# class that will contain the state (here <namespace>.<state-class-name> format).
  option (aelf.base) = "Protobuf/reference/acs12.proto";
  option (aelf.base) = "Protobuf/reference/coordinator_contract.proto";
  option (aelf.csharp_state) = "AetherLink.Contracts.VRF.Coordinator.VrfCoordinatorContractState";

  rpc SetConfig (Config) returns (google.protobuf.Empty) {}
  rpc GetConfig (google.protobuf.Empty) returns (Config) { option (aelf.is_view) = true; }
}

message Config {
  int64 request_timeout_seconds = 1;
  int64 minimum_request_confirmations = 2;
  int64 max_request_confirmations = 3;
  int64 max_num_words = 4;
}

message SpecificData {
  int64 block_number = 1;
  int64 num_words = 2;              // amount of random values
  aelf.Hash key_hash = 3;           // hash of the public key
  int64 request_confirmations = 4;  // amount of blocks to wait
  aelf.Hash pre_seed = 5;
}

// log event
message ConfigSet {
  option (aelf.is_event) = true;
  Config config = 1;
}
```

#### Message Request Interface Contract State

- Create a new file `request_interface.proto` under `src/Protobuf/message/`.

- Replace this code of implementation file of `request_interface.proto`:

```csharp title="request_interface.proto"
// the version of the language, use proto3 for contracts
syntax = "proto3";

// some core imports for AElf chain types
import "aelf/core.proto";
import "aelf/options.proto";
import "Protobuf/reference/acs12.proto";

package oracle;

// import for using the google.protobuf.* type.
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "google/protobuf/timestamp.proto";

// the name of the C# namespace in which the contract code will be,
// generated code will also be in this namespace.
option csharp_namespace = "AetherLink.Contracts.Consumer";

// the contract definition: a gRPC service definition.
service RequestInterface {

  // the full name of the C# class that will contain the state (here <namespace>.<state-class-name> format).
  rpc StartOracleRequest(StartOracleRequestInput) returns (google.protobuf.Empty);
  rpc HandleOracleFulfillment(HandleOracleFulfillmentInput) returns (google.protobuf.Empty);
}

message StartOracleRequestInput {
  int64 subscription_id = 1;
  int32 request_type_index = 2;
  bytes specific_data = 3;
  aelf.Hash trace_id = 4;
}

message HandleOracleFulfillmentInput {
  aelf.Hash request_id = 1;
  bytes response = 2;
  bytes err = 3;
  int32 request_type_index = 4;
  aelf.Hash trace_id = 5;
}

message OracleResponse {
  bytes response = 1;
  bytes err = 2;
}
```

#### Contract Reference State

- Navigate to `src`. 

- create a **new file** `ContractReferences.cs`.

The implementation of file `src/ContractReferences.cs` is as follows:

```csharp title="ContractReferences.cs"
using AElf.Contracts.MultiToken;
using AetherLink.Contracts.Oracle;

namespace AElf.Contracts.DiceMaster
{
    public partial class DiceMasterState
    {
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
        internal OracleContractContainer.OracleContractReferenceState OracleContract { get; set; }
    }
}
```

#### Implement dice Game Smart Contract

- Navigate to `src/DiceMaster.cs`

```csharp title="DiceMaster.cs"
using AElf.Contracts.MultiToken;
using AElf.Sdk.CSharp;
using AElf.Types;
using AetherLink.Contracts.Consumer;
using AetherLink.Contracts.Oracle;
using AetherLink.Contracts.VRF.Coordinator;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.DiceMaster
{
    // Contract class must inherit the base class generated from the proto file
    public class DiceMaster : DiceMasterContainer.DiceMasterBase
    {
        private const string OracleContractAddress = "21Fh7yog1B741yioZhNAFbs3byJ97jvBmbGAPPZKZpHHog5aEg"; // tDVW
        //private const string OracleContractAddress = "BGhrBNTPcLccaxPv6hHJrn4CHHzeMovTsrkhFse5o2nwfvQyG"; // tDVV
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
            State.TokenContract.Value = Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            State.OracleContract.Value =Address.FromBase58(OracleContractAddress);
            
            return new Empty();
        }
        
        public override Empty HandleOracleFulfillment(HandleOracleFulfillmentInput input)
        {
            var playedRecord = State.PlayedRecords[input.TraceId];
            if (playedRecord == null || playedRecord.Address == null) return new Empty();
            var address = playedRecord.Address;
            var blockNumber = playedRecord.BlockNumber;

            if (blockNumber != State.PlayerInfos[address].BlockNumber)
            {
                return new Empty();
            }
            
            var randomHashList = HashList.Parser.ParseFrom(input.Response);
            
            var dice1 = randomHashList.Data[0].ToInt64() % 6;
            var dice2 = randomHashList.Data[1].ToInt64() % 6;
            dice1 = ((dice1 < 0)? dice1 * -1 : dice1) + 1;
            dice2 = ((dice2 < 0)? dice2 * -1 : dice2) + 1;
            
            State.PlayerInfos[address].Dice1 = dice1;
            State.PlayerInfos[address].Dice2 = dice2;
            State.PlayerInfos[address].Pending = false;

            var playAmount = State.PlayerInfos[address].Amount;
            
            if(IsWinner(dice1, dice2))
            {
                // Transfer the token from the contract to the sender
                State.TokenContract.Transfer.Send(new TransferInput
                {
                    To = address,
                    Symbol = TokenSymbol,
                    Amount = playAmount * 2
                });
                
                State.PlayerInfos[address].Win = true;
                
                // Emit an event to notify listeners about the outcome
                Context.Fire(new PlayOutcomeEvent
                {
                    Amount = playAmount,
                    Won = playAmount,
                    From = address
                });
            }
            else
            {
                State.PlayerInfos[address].Win = false;
                
                // Emit an event to notify listeners about the outcome
                Context.Fire(new PlayOutcomeEvent
                {
                    Amount = playAmount,
                    Won = -playAmount,
                    From = address
                });
            }
        
            return new Empty();
        }
        
        // Plays the lottery game with a specified amount of tokens.
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

            if(State.PlayerInfos[Context.Sender] == null)
            {
                State.PlayerInfos[Context.Sender] = new PlayerInfo
                {
                    Pending = false,
                    Win = false,
                    Dice1 = 1,
                    Dice2 = 1,
                    Amount = playAmount,
                    Address = Context.Sender,
                    BlockNumber = Context.CurrentHeight
                };
            }
            Assert(State.PlayerInfos[Context.Sender].Pending == false, "Pending result. Please wait for the result.");
            
            // use VRF to get random number
            var keyHashs = State.OracleContract.GetProvingKeyHashes.Call(new Empty());
            var keyHash = keyHashs.Data[State.OracleNodeId.Value];
            var specificData = new SpecificData
            {
                KeyHash = keyHash,
                NumWords = 2,
                RequestConfirmations = 1
            }.ToByteString();
            
            var request = new SendRequestInput
            {
                SubscriptionId = State.SubscriptionId.Value,
                RequestTypeIndex = 2,
                SpecificData = specificData,
            };

            var traceId = HashHelper.ConcatAndCompute(
                HashHelper.ConcatAndCompute(HashHelper.ComputeFrom(Context.CurrentBlockTime),
                    HashHelper.ComputeFrom(Context.Origin)), HashHelper.ComputeFrom(request));
            request.TraceId = traceId;
            State.OracleContract.SendRequest.Send(request);

            var blockNumber = Context.CurrentHeight;
            
            State.PlayedRecords[traceId] = new PlayedRecord
            {
                Address = Context.Sender,
                BlockNumber = blockNumber,
            };

            State.PlayerInfos[Context.Sender].Pending = true;
            State.PlayerInfos[Context.Sender].Win = false;
            State.PlayerInfos[Context.Sender].Amount = playAmount;
            State.PlayerInfos[Context.Sender].BlockNumber = blockNumber;
            
            // Transfer the token from the sender to the contract
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Symbol = TokenSymbol,
                Amount = playAmount
            });
            
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
        
        public override Empty SetSubscriptionId(Int64Value input)
        {
            AssertIsOwner();
            State.SubscriptionId.Value = input.Value;
            return new Empty();
        }

        public override Empty SetOracleNodeId(Int32Value input)
        {
            AssertIsOwner();
            State.OracleNodeId.Value = input.Value;
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
        
        public override Int64Value GetSubscriptionId(Empty input)
        {
            return new Int64Value{
                Value = State.SubscriptionId.Value
            };
        }

        public override Int32Value GetOracleNodeId(Empty input)
        {
            return new Int32Value{
                Value = State.OracleNodeId.Value
            };
        }
        
        public override PlayerInfo GetPlayerInfo(Address address)
        {
            Assert(State.PlayerInfos[address] != null, "No player info found.");
            return State.PlayerInfos[address];
        }
        
        // Determines if the player is a winner.
        // The player is considered a winner if he has an odd number.
        private bool IsWinner(long dice1, long dice2)
        {
            var result = (dice1 + dice2) % 2;
            return result == 1;
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

You should see **DiceMaster.dll.patched** in the directory `dice-game/src/bin/Debug/net.6.0`

## Step 3 - Deploy Smart Contract

import Deploy from "../\_deploy_dice.md"

<Deploy />

## Step 4 - Interact with Your Deployed Smart Contract

### Approving Smart Contract Spending

```bash title="Terminal"
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Approve
```

:::tip
ℹ️ Note: `ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx` is the contract address of `Multitoken Contract` on aelf Testnet dAppChain (tDVW).
:::

When prompted, enter the following parameters to approve the spending of 90 ELF tokens:

```terminal title="Terminal"
Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <spender>: "INSERT_YOUR_CONTRACT_ADDRESS_HERE"
? Enter the required param <symbol>: ELF
? Enter the required param <amount>: 9000000000
```

### Initializing Dice Game Contract

```bash title="Terminal"
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Initialize
```

- Output:

![result](/img/Initialize.png)

### Depositing funds into the Dice Game Contract

```bash title="Terminal"
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Deposit
```

- You will be prompted for the following:

```terminal title="Terminal"
Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <value>: 20000
```

- Output:

![result](/img/Deposit.png)

### Playing the Dice Game

```bash title="Terminal"
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Play
```

- Let's check the `Contract Balance`

```bash title="Terminal"
aelf-command call ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io GetContractBalance
```

### Understanding randomization using Oracle Contract in aelf

In this section, we'll explore how oracle calls work in the aelf blockchain to generate a verifiable random number using the dice game example from the tutorial. This will help you understand how different smart contracts can interact to perform complex operations.

#### 1. **Smart Contract Overview**
   - **Dice Master Contract**: Manages the game, including initialization, token deposit/withdrawal, interaction with oracle for random number generation and decision of win or lose based on dice outcome.
   - **Token Contract**: Handles the token transactions needed for playing dice game.
   - **Oracle Contract**: Handles the generation of verifiable random number needed for playing the dice game.

#### 2. **Game Play Process**
   - **Starting Gameplay**: When a user wants to play the dice game, they interact with the dice master contract to deposit sufficent funds using deposit function. Then the master contract contract calls the oracle contract to generate a random number. The oracle contract calls the dice master contract to decide if the user wins or loses.
   - **Token Transfer Requirement**: The Dice Master Contract must verify that the user has enough tokens and transfer those tokens to the smart contract account to play the game.
   - **Random Number Generation using an Oracle**: The dice master contract connects with Aetherlink VRF oracle to generate a true random number.
   - **Win or Lose Decision**: The decision for win or lose is made by the dice master contract based on random number generated from the Oracle.

#### 3. **Initializing Contract Reference State**
   - **Setting Token and Oracle Contract Address**: The dice game needs to initialize state of the contract, including references to external contracts like the Token Contract and Oracle Contract.

#### 4. **Making an Inter-Contract Call**
   - **Calling Token Contract**: The Dice Master Contract needs to interact with the Token Contract to transfer tokens. 
     - **Method Invocation**: It calls a method in the Token Contract, such as `Transfer`.
     - **Parameters**: The call includes details like the sender’s address, the recipient’s address (the dice game account), and the amount of tokens.
   - **Calling Oracle Contract**: The Dice Master Contract needs to interact with the Oracle Contract to generate a verifiable random number.
   - **Encoding and Sending**: The parameters are encoded into a transaction format and sent to the Token Contract.

#### 5. **Processing in the Token Contract**
   - **Token Transfer**: The Token Contract processes the transfer request by deducting tokens from the user’s account and adding them to the dice game account.
   - **Return Response**: The Token Contract then returns a result indicating whether the transfer was successful or if it failed.

#### 6. **Handling the Response**
   - **Dice Master Contract’s Role**: Once the dice master contract receives the response from the Token Contract, it checks if the transfer was successful.
   - **Next Steps**: If successful, the dice master contract updates the contract balance and continues with the game logic.

#### 7. **Authorization and Security**
   - **Permission Checks**: Ensures that the Dice Game Contract is authorized to invoke methods in the Token and Oracle Contract.
   - **Secure Transactions**: Ensures that token transfers and random number generation are secure and correctly authorized.

#### 8. **Error Handling**
   - **Failure Management**: If the token transfer fails (e.g., due to insufficient funds), the dice contract handles the error by potentially reverting the transaction or notifying the user.

By following these steps, you can see how oracle networks can be used to generate a truly verifiable random number. This modular approach helps in building complex applications like a dice game by ensuring secure and authorized interactions between contracts.


## Step 5 - Interact Your Deployed Smart Contract With Frontend

### Project Setup

Let's start by cloning the frontend project repository from github.

```
git clone https://github.com/AElfProject/aelf-samples.git

```

- Next, navigate to the frontend project directory with this command:

```bash title="Terminal"
cd aelf-samples/dice/2-dapp
```

- Once you're inside the `2-dapp` directory, open the project with your preferred IDE (e.g., VSCode). You should see the project structure as shown below.

export const tree = {
"type": "directory",
"uri": "2-dapp",
"expanded": true,
"children": [
{
"type": "directory",
"uri": "._tests.__"
},
{
"type": "directory",
"uri": ".github"
},
{
"type": "directory",
"uri": ".husky"
},
{
"type": "directory",
"uri": "public"
},
{
"type": "directory",
"uri": "src"
},
{
"type": "file",
"uri": ".dockerignore"
},
{
"type": "file",
"uri": ".env.development"
},
{
"type": "file",
"uri": ".env.production"
},
{
"type": "file",
"uri": ".eslintrc.json"
},
{
"type": "file",
"uri": ".gitignore"
},
{
"type": "file",
"uri": ".prettierrc"
},
{
"type": "file",
"uri": ".stylelintrc.json"
},
{
"type": "file",
"uri": "appsettings.ts"
},
{
"type": "file",
"uri": "commitlint.config.js"
},
{
"type": "file",
"uri": "docker-compose.yml"
},
{
"type": "file",
"uri": "Dockerfile"
},
{
"type": "file",
"uri": "jest.config.ts"
},
{
"type": "file",
"uri": "jest.setup.ts"
},
{
"type": "file",
"uri": "next.config.mjs"
},
{
"type": "file",
"uri": "nginx-template.conf"
},
{
"type": "file",
"uri": "nginx.template.md"
},
{
"type": "file",
"uri": "package.json"
},
{
"type": "file",
"uri": "pm2.config.js"
},
{
"type": "file",
"uri": "pnpm-lock.yaml"
},
{
"type": "file",
"uri": "postcss.config.mjs"
},
{
"type": "file",
"uri": "README.md"
},
{
"type": "file",
"uri": "sentry.client.config.ts"
},
{
"type": "file",
"uri": "sentry.edge.config.ts"
},
{
"type": "file",
"uri": "sentry.server.config.ts"
},
{
"type": "file",
"uri": "tailwind.config.ts"
},
{
"type": "file",
"uri": "tsconfig.json"
},
]
}

<div style={{height: 1000}}><FileTree tree={tree} /></div>

#### Install necessary libraries

- Run this command in the terminal to install all necessary packages and libraries:

```bash title="Terminal"
npm install
```

We are now ready to build the frontend components of our Dice Game.

### Setting Up the Dice Game Smart Contract

Let’s configure your deployed Dice Game smart contract so you can interact with its functionality in this tutorial.

**Step 1. Locate the Configuration File**

- Navigate to the file located at: `src/config/configTest.ts`

**Step 2. Update the Smart Contract Address**

- Find the comment `// Step A - Configure Dice Contract`

- Replace the placeholder value `add_your_deployed_dice_contract` with the address of your deployed smart contract.

**Example:**

```typescript
// Replace with the address of your deployed smart contract
const DICE_CONTRACT_ADDRESS = "your_deployed_contract_address";
```

:::tip
Make sure to use the smart contract address from the "Deploy Smart Contract" step. Double-check for accuracy to avoid errors later!
:::

### Setting Up Wallet Integration

Let’s configure wallet connection, disconnection, and display wallet information so you can seamlessly interact with the Dice Game.

**Step 1. Locate the Wallet Configuration File**

- Navigate to the file located at: `src/app/dice/Account.tsx`

**Step 2. Update the Wallet Connection Handler**

- Find the comment `// Step B - Connect wallet handler`

- Replace the existing **`onConnectBtnClickHandler`** function with the updated code below:

```javascript title="Account.tsx"
// Step B - Connect wallet handler
export const onConnectBtnClickHandler = async (connectWallet: () => any) => {
  try {
    const rs = await connectWallet();
    console.log('walletConnected rs: ', rs);
  } catch (e: any) {
    console.log(e.message);
  }
};
```

**Step 3. Update the Wallet Disconnection Handler**

- Find the comment `// Step C - Disconnect wallet handler`

- Replace the existing **`onDisConnectBtnClickHandler`** function with the updated code below:

```javascript title="Account.tsx"
// Step C - Disconnect wallet handler
export const onDisConnectBtnClickHandler = async (
  disConnectWallet: () => any
) => {
  await disConnectWallet();
};
```

**Step 4. Update the Wallet Info Component**

- Find the comment `// Step D - Wallet info component`

- Replace the existing **`WalletConnectWithRTK`** function with the updated code below:

```javascript title="Account.tsx"
// Step D - Wallet info component
export const WalletConnectWithRTK = () => {
  const dispatch = useAppDispatch();
  const walletConnected = useAppSelector(getWalletInfo);
  const { disConnectWallet, walletInfo } = useConnectWallet();
  useEffect(() => {
    if (walletInfo) {
      dispatch(setWalletInfo(formatWalletInfo(walletInfo)));
    }
  }, [dispatch, walletInfo]);
  if (!walletInfo) {
    return "";
  }
  if (walletConnected && walletConnected?.address) {
    return (
      <div className="flex items-start">
        <div className="tron-glow mr-2 bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-2xl font-bold text-transparent">
          Hello, {walletConnected.name}
        </div>
        <div
          className="cursor-pointer text-teal-400 text-opacity-50"
          onClick={() => onDisConnectBtnClickHandler(disConnectWallet)}
        >
          Logout
        </div>
      </div>
    );
  }

  return "";
};
```

**Explanation:**

- **Wallet Connection Handler (`connectWallet`):** Initiates the wallet connection process and logs the connection status.

- **Wallet Disconnection Handler (`disConnectWallet`):** Safely disconnects the wallet when triggered.

- **Wallet Info Component:**
  - Displays the connected wallet’s information, including a friendly greeting.
  - Offers a logout option to disconnect the wallet.
  - Keeps wallet information up to date using React hooks and Redux Toolkit.

we will use these handlers and components to ensure a smooth wallet experience for your Dice Game.
You're all set to integrate wallet functionality into your project! 🚀

### Setting Up Token Contract Methods

We’ll set up token contract methods to **get allowance**, **set allowance**, and combine them into a reusable hook for streamlined functionality.

**Step 1: Locate the File**

- Go to the `src/app/dice/useDiceMethods.ts` file.

**Step 2: Write the Get Allowance Functions**

- Find the comment `// Step E - Check Get Token Alowance`.

- Replace the existing `getAllowance` function with this code snippet:

```javascript title="useDiceMethods.ts"
// Step E - Check Get Token Alowance
const getAllowance = async () => {
  if (!walletInfo) {
    message.error("Please login");
    return;
  }
  const res: any = await callViewMethod({
    chainId: CHAIN_ID,
    contractAddress: TOKEN_CONTRACT_ADDRESS,
    methodName: "GetAllowance",
    args: {
      symbol: "ELF",
      owner: walletInfo.address,
      spender: DICE_CONTRACT_ADDRESS,
    },
  });
  console.log("GetAllowance: ", res);
  return res.data.allowance;
};
```

**Step 3: Write the Set Allowance Functions**

- Find the comment `// Step F - Set Token Alowance`.

- Replace the existing `setAllowance` function with this code snippet:

```javascript title="useDiceMethods.ts"
// Step F - Set Token Alowance
const setAllowance = async () => {
  const allowance: string = await getAllowance();
  if (new Bignumber(allowance).div(1e8).isGreaterThan(10)) {
    return;
  }
  const res: any = await callSendMethod({
    chainId: CHAIN_ID,
    contractAddress: TOKEN_CONTRACT_ADDRESS,
    methodName: "Approve",
    args: {
      symbol: "ELF",
      amount: new Bignumber(100).multipliedBy(1e8).toString(),
      spender: DICE_CONTRACT_ADDRESS,
    },
  });
  const txResult = await getTxResultRetry(res.transactionId, EXPLORE_URL);
  return res;
};
```

**Explanation:**

- **`getAllowance` Function**

  - Retrieves the current token allowance for the Dice Game smart contract.
  - Ensures the wallet is connected before proceeding.

- **`setAllowance` Function**
  - Checks the current allowance using `getAllowance`.
  - If the allowance is less than 10 tokens, it sends a request to approve 100 tokens.
  - Waits for the transaction result and returns the response.

Combining these functions into a custom hook simplifies token allowance management and ensures smooth interactions with the Dice Game.
You're now ready to handle token allowances efficiently! 🚀

### Setting Up Dice Contract Methods

Let’s create the methods needed to **get player info**, **play the game**, and put them together into a single, easy-to-use hook.

**Step 1: Create the Get Player Info Function**

- Scroll down and find the comment `// Step G - Get Player Info From Dice Contract`.

- Replace the existing `getPlayerInfo` function with this code snippet:

```javascript title="useDiceMethods.ts"
// Step G - Get Player Info From Dice Contract
const getPlayerInfo = async () => {
  if (!walletInfo) {
    message.error("Please login");
    return {};
  }
  try {
    // Call the contract's "GetPlayerInfo" method with the player's wallet address
    const res: any = await callViewMethod({
      chainId: CHAIN_ID,
      contractAddress: DICE_CONTRACT_ADDRESS,
      methodName: "GetPlayerInfo",
      args: walletInfo.address,
    });
    // Update playerInfo state with the retrieved data
    setPlayerInfo(res.data);
    return res.data;
  } catch (e) {
    // Log an error if no information is available yet
    console.log("getPlayerInfo:", "no info yet");
    return {};
  }
};
```

**Step 2: Automatically Fetch Player Info**

Set up the code to automatically get player details whenever the wallet is connected.

- Scroll down and find the comment `// Step H - Fetch player information when the wallet is connected.`.

- Replace the existing `useEffect` with this code snippet:

```javascript title="useDiceMethods.ts"
// Step H - Fetch player information when the wallet is connected.
useEffect(() => {
  if (!walletInfo) {
    return;
  }

  // Define and invoke an asynchronous function to get player info
  const main = async () => {
    await getPlayerInfo();
  };
  main();
}, [walletInfo]); // Dependency array ensures this effect runs when walletInfo changes
```

**Step 3: Create the Play Game Function**

This function lets the user play the Dice game by interacting with the contract.

- Scroll down and find the comment `// Step I - Play Game`.

- Replace the existing `useEffect` with this code snippet:

```javascript title="useDiceMethods.ts"
// Step I - Play Game
const play = async (multiplier = 1) => {
  // Ensure the required token allowance is set
  await setAllowance();

  // Call the contract's "Play" method with the calculated value
  const res: any = await callSendMethod({
    chainId: CHAIN_ID,
    contractAddress: DICE_CONTRACT_ADDRESS,
    methodName: "Play",
    args: {
      value: new Bignumber(BASE_NUMBER)
        .multipliedBy(10 ** 8)
        .multipliedBy(multiplier),
    },
  });
  // Wait for the transaction result to be confirmed
  await getTxResultRetry(res.transactionId, EXPLORE_URL);
  // Refresh the player's information after the game
  await getPlayerInfo();
};
```

**Explanation:**

- **Get Player Info**: Fetches player stats from the blockchain and updates the app.
- **Auto Fetch Player Info**: Ensures player details are always synced when the wallet is connected.
- **Play Game**: Handles the gameplay logic by setting allowances, interacting with the contract, and updating the player’s stats.

Now you have a well-structured hook to manage all Dice game methods in one place.


### Setting Up Game Features and Effects

Let’s create the functions needed to **fetch player information**, **spawn particle effects**, **display game results**, and **handle dice rolls**.

1. **Fetching Player Information:**
   We’ll start by creating a function that fetches player data when the wallet is connected. This function will automatically update the player’s information so you can access their stats and game status seamlessly.

2. **Creating and Spawning Particle Effects:**
   To add some excitement and interactivity to the game, we’ll set up particle effects triggered by player actions. This includes creating individual particle effects (e.g., stars, sparks) and spawning multiple particles at a specific position on the screen.

3. **Displaying Game Results:**
   After each game round, we’ll handle displaying the result to the player. Whether they win or lose, the result message will update accordingly, including any ELF rewards earned.

4. **Handling Dice Rolls:**
   We’ll implement the logic for rolling the dice, interacting with the game contract, and managing animations. The dice roll will trigger specific visual effects and update the player’s information once the game round concludes.

By the end of this setup, these functions will be integrated into a cohesive experience that allows players to interact with the game smoothly, see real-time updates, and enjoy engaging visual effects.

**Step 1: Locate the File**

- Go to the `src/app/dice/page.tsx` file.

**Step 2: Call Get Player Info Funcation**

- Find the comment `// Step J - Fetch player information when wallet is connected`.

- Replace the existing `useEffect` with this code snippet:

```javascript title="page.tsx"
// Step J - Fetch player information when wallet is connected
useEffect(() => {
  if (!walletInfo) {
    return;
  }
  const loopGetPlayInfo = async () => {
    const result: any = await getPlayerInfo();
    setPlayerInfo({
      ...playerInfo,
      ...result,
    });
  };
  loopGetPlayInfo();
}, [walletInfo]);
```

**Step 3: Creates a single particle effect**

- Find the comment `// Step K - Creates a single particle effect.`.

- Replace the existing `createParticle` fucntion with this code snippet:

```javascript title="page.tsx"
  // Step K - Creates a single particle effect.
  const createParticle = useCallback(
    (x: number, y: number, container: HTMLDivElement, type: string) => {
      const particle = document.createElement('div');
      particle.className = `particle ${type}`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      // Random spread for different directions
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      particle.style.setProperty(
        '--spread-x',
        `${Math.cos(angle) * distance}px`,
      );
      particle.style.setProperty(
        '--spread-y',
        `${Math.sin(angle) * distance}px`,
      );

      // Random trail effect
      particle.style.setProperty(
        '--trail-x',
        `${(Math.random() - 0.5) * 100}px`,
      );
      particle.style.setProperty('--trail-y', `${-Math.random() * 100 - 50}px`);

      container.appendChild(particle);

      // Define animations for different particle types
      const animations = {
        'particle-basic': [
          { transform: 'scale(1) translate(0, 0)', opacity: 1 },
          {
            transform: `scale(0) translate(${Math.random() * 100 - 50}px, ${-Math.random() * 100}px)`,
            opacity: 0,
          },
        ],
        'particle-star': [
          { transform: 'rotate(0deg) scale(1)', opacity: 1 },
          { transform: 'rotate(360deg) scale(0)', opacity: 0 },
        ],
        'particle-spark': [
          {
            transform: `rotate(${Math.random() * 360}deg) translateX(0)`,
            opacity: 1,
          },
          {
            transform: `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 + 50}px)`,
            opacity: 0,
          },
        ],
        'particle-ring': [
          { transform: 'scale(1)', opacity: 1, borderWidth: '2px' },
          { transform: 'scale(2)', opacity: 0, borderWidth: '0px' },
        ],
        'particle-trail': {
          duration: 1000,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
          iterations: 1,
        },
      };

      // Apply animation and remove particle after animation ends
      const animation = particle.animate(
        animations[type as keyof typeof animations] ||
          animations['particle-basic'],
        {
          duration: 1000 + Math.random() * 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
        },
      );

      animation.onfinish = () => particle.remove();
    },
    [],
  );
```

**Step 4: Spawns multiple particle effects**

- Find the comment `// Step L - Spawns multiple particle effects at a specified position.`.

- Replace the existing `spawnParticles` fucntion with this code snippet:

```javascript title="page.tsx"
  // Step L - Spawns multiple particle effects at a specified position.
  const spawnParticles = useCallback(
    (x: number, y: number) => {
      const container = document.querySelector(
        '.particle-container',
      ) as HTMLDivElement;
      if (!container) return;

      const particleTypes = [
        'particle-basic',
        'particle-star',
        'particle-spark',
        'particle-ring',
        'particle-trail',
      ];

      // Spawn multiple waves of particles
      for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
          for (let i = 0; i < 8; i++) {
            particleTypes.forEach((type) => {
              const offsetX = (Math.random() - 0.5) * 20;
              const offsetY = (Math.random() - 0.5) * 20;
              createParticle(x + offsetX, y + offsetY, container, type);
            });
          }
        }, wave * 100);
      }
    },
    [createParticle],
  );
```

**Step 5: Displays the result**

- Find the comment `// Step M - Displays the result message based on the game outcome.`.

- Replace the existing `handleGameResult` fucntion with this code snippet:

```javascript title="page.tsx"
// Step M - Displays the result message based on the game outcome.
const handleGameResult = (isWin: boolean, amount: string) => {
  const number = new Bignumber(amount).div(10 ** 8);
  let message = `Lose ${number} ELF. Better luck next time!`;
  if (isWin) {
    message = `Congratulations! You Win ${number.multipliedBy(2)} ELF!`;
  }
  setMessage(message);
};
```

**Step 6: Rolls the dice**

- Find the comment `// Step N - Rolls the dice`.

- Replace the existing `rollDice` fucntion with this code snippet:

```javascript title="page.tsx"
  // Step N - Rolls the dice
  const rollDice = async (multiplier = 1) => {
    setMessage('');
    if (isRolling) return;

    setIsRolling(true);
    setMessage('');
    const sequenceNumber = Math.floor(Math.random() * 3) + 1;
    setSequence(sequenceNumber);

    new Audio('https://www.soundjay.com/misc/sounds/dice-roll-01.mp3')
      .play()
      .catch(() => {});

    const startTimePlay = Date.now();
    try {
      setIsPlaying(true);
      await play(multiplier);
    } catch (error: any) {
      console.log('play failed: ', error);
      setIsPlaying(false);
      setIsRolling(false);
      alert(error.message);
      return;
    }
    const startTime = Date.now();
    const getPlayInfoInterval = setInterval(async () => {
      const result = await getPlayerInfo();
      if (result.pending === false) {
        // if (result.score !== prePlayScore) {
        clearInterval(getPlayInfoInterval);
        setPlayerInfo({
          ...playerInfo,
          ...result,
        });
        playerInfoGlobal = result;
        if (result.win) {
          handleGameResult(true, result.amount);
        } else {
          handleGameResult(false, result.amount);
        }

        const finalDice1 = parseInt(playerInfoGlobal.dice1, 10);
        const finalDice2 = parseInt(playerInfoGlobal.dice2, 10);
        setDice1(finalDice1);
        setDice2(finalDice2);
        setIsRolling(false);
        setIsShaking(true);
        setIsPlaying(false);

        // Get dice positions for particle effects
        const dice1El = document.querySelector('.dice-container:first-child');
        const dice2El = document.querySelector('.dice-container:last-child');

        if (dice1El) {
          const rect1 = dice1El.getBoundingClientRect();
          spawnParticles(
            rect1.left + rect1.width / 2,
            rect1.top + rect1.height / 2,
          );
        }

        if (dice2El) {
          const rect2 = dice2El.getBoundingClientRect();
          spawnParticles(
            rect2.left + rect2.width / 2,
            rect2.top + rect2.height / 2,
          );
        }

        // Remove screen shake after animation
        setTimeout(() => setIsShaking(false), 500);

        console.log('Time used: ', Date.now() - startTime);
        console.log('Time used with play: ', Date.now() - startTimePlay);
      }
    }, 500);
  };
```

Now that we've written all the necessary frontend functions and hooks, we're ready to run the Dice Game in the next step.


### Run Application

In this step, we will run the Dice Game dApp.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

:::info
**Note**: Ensure that you are running this command under the **todo/2-dapp** folder.
:::

- You should observe the following as shown below.

  ![run-app-success](/img/dice-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the Dice Game landing page as shown below.

  ![todo-home-page](/img/dice-game-homepage.png)


#### Create Portkey Wallet

:::info
Portkey is the first AA wallet from aelf's ecosystem, migrating users, developers and projects from Web2 to Web3 with DID solution.

Users can swiftly log into Portkey via their Web2 social info with no private keys or mnemonics required. Underpinned by social recovery and decentralized guardian design, Portkey safeguards users' assets from centralized control and theft. Portkey has a unique payment delegation mechanism which enables interested parties to function as delegatees to pay for user activities on users' behalf. This means that users can create accounts for free and fees for other usages may also be covered in Portkey.

Portkey also provides crypto on/off-ramp services, allowing users to exchange fiat with crypto freely. It supports the storage and management of various digital assets such as tokens, NFTs, etc. The compatibility with multi-chains and seamless connection to all kinds of DApps makes Portkey a great way to enter the world of Web3.

With DID solution as its core, Portkey provides both Portkey Wallet and Portkey SDKs.

For more information, you may visit the official documentation for Portkey at https://doc.portkey.finance/.
:::

- Download the Chrome extension for Portkey from https://chromewebstore.google.com/detail/portkey-wallet/iglbgmakmggfkoidiagnhknlndljlolb.
:::info
The Portkey extension supports Chrome browser only (for now). Please ensure that you are using Chrome browser.
You may download Chrome from https://www.google.com/intl/en_sg/chrome/.
:::

- Once you have downloaded the extension, you should see the following on your browser as shown below.

   ![welcome-to-portkey](/img/welcome-to-portkey.png)

- Click on `Get Start` and you should see the following interface as shown below.

   ![portkey-login](/img/portkey-login.png)


**Sign up** 

- Switch to **aelf Testnet** network by selecting it:

   ![portkey-switch-to-testnet](/img/portkey-switch-to-testnet.png)

:::danger
Please make sure you are using `aelf Testnet` in order to be able to receive your testnet tokens from the Faucet.
:::

- Proceed to sign up with a Google Account or your preferred login method and complete the necessary accounts creation prompts and you should observe the following interface once you have signed up.

   ![success-login](/img/success-login.png)

With that, you have successfully created your very first Portkey wallet within seconds. How easy was that?

:::info
It is highly recommended to pin the Portkey wallet extension for easier access and navigation to your Portkey wallet!
:::

- Next, click on ‘Open Portkey’ and you should now observe the following as shown below.

   ![portkey-wallet-preview](/img/portkey-wallet-preview.png)

**Claim Test Token**

- Click on Copy icon in right side in the top as shown in the below image and copy your wallet address.

  ![copy-wallet-address](/img/copy-wallet-address.png)

- Open Faucet site : https://faucet-ui.aelf.dev

- Enter your wallet address and submit the form after verify the captcha.

   ![dice-game-faucet-claim-token](/img/dice-game-faucet-claim-token.png)

- ELF token will be claimed in your account successfully.

   ![token-claim-success](/img/token-claim-success.png).

We’ve completed all the steps to set up the wallet and claim the testnet ELF tokens. Now, let’s move on to the wallet connection process in the next step.

**Connect Portkey Wallet**

- Open your Running project and click on **"Login"** to connect your Portkey wallet.

  ![dice-click-login-button](/img/dice-click-login-button.png)

- You will get login popup so Click on **"Connect Wallet"** option as shown below.

  ![click-login-option](/img/click-login-option.png)

- Next, you will see a list of wallet options. Select the **"Portkey"** wallet from the list.

  ![click-login-portkey](/img/click-login-portkey.png)

- You will get the connection request on your **Portkey** wallet Next.
- Click on **Approve** button on request modal.

  ![dice-approve-login-request](/img/dice-approve-login-request.png)

- After successfully connection with Portkey wallet, you will get the wallet info in Dice game page.

  ![dice-home-page-post-login](/img/dice-home-page-post-login.png)

With the wallet connection setup complete, we’re now ready to start playing the game!


**Play Dice Game**

Let's start to play the dice game with step by step.

As you can see we have 3 token price option to play with ELF token. i.e: 0.1 ELF, 0.2 ELF and 0.4 ELF so let's play with 0.1 ELF tokens.

- Click on **"0.1 ELF"** button to play the game with Token.

  ![dice-select-price-option](/img/dice-select-price-option.png)

- Game will start after click on **"0.1 ELF"** button and **PROCESSING...** message will be appear as below.

  ![dice-game-processing](/img/dice-game-processing.png)

- The first time you perform a transaction with ELF tokens, you will receive a Token Allowance request in your wallet.

- Click on **"Pre-athorize**" button to authenticate and approve the Allowance transaction as shown below.

  ![get-approval-token-request](/img/get-approval-token-request.png)

- After the successfully transaction of Allowance, your will get **Play** transaction request as shown below.

- Click on **Sign** the transaction.

  ![get-game-transaction-request](/img/get-game-transaction-request.png)

- After the successfully transaction of **Play** game, you will get the game result in Dice game.

  ![dice-game-result](/img/dice-game-result.png)

:::success
🎉 Congratulations Learners! You have successfully built the Dice game 🎲🎲
:::


## 🎯 Conclusion

🎉 Congratulations on completing the **Dice Game dApp** tutorial! 🎉 You've learned how to set up your development environment, develop and deploy a smart contract, and build a functional Dice Game on the aelf blockchain. 🌟

**📚 What You've Learned**

Throughout this tutorial, you’ve accomplished:

- **🛠️ Setting Up Your Development Environment:** You prepared your workspace with all necessary tools to start building the Dice Game.

- **🎲 Developing the Dice Game Smart Contract:** You created the core logic for the Dice Game, including dice rolling, reward handling, and managing bets.

- **🚀 Deploying the Smart Contract:** You deployed your smart contract to the aelf blockchain, enabling its functionalities to be used in a live environment.

- **🔧 Building and Running the dApp:** You connected your frontend to the blockchain and implemented key features like:

  - Wallet integration via Portkey.
  - Configuring token and dice contract methods.
  - Adding gameplay logic and user-friendly features.

**🔍 Final Output**

You now have:

- A **deployed smart contract** managing game logic and rewards.

- A **fully operational Dice Game dApp** where users can securely place bets, roll dice, and claim rewards.

**➡️ Next Steps**

Now that you’ve mastered the basics, consider:

- **Enhancing gameplay** with new features like customizable bets or multiplayer options.

- **Strengthening security** with advanced testing and best practices.

- **Exploring cross-chain functionality** to make your game interoperable with other blockchains.

You’ve taken a significant step into blockchain development. Keep building and innovating with aelf! 🚀

Happy coding! 😊

