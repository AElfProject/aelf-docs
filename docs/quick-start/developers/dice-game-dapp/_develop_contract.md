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
