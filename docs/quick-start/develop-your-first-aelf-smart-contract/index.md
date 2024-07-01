---
sidebar_position: 4
title: Smart Contract Developing Demos
description: This document provides you Smart Contract examples
image: /img/Logo.aelf.svg
---

# Smart Contract Developing Demos

### Bingo Game

#### Requirement Analysis

##### Basic Requirement:

There is only one rule: Users can bet a certain amount of ELF tokens on the Bingo contract. Depending on the outcome, users will either win more ELF tokens or lose all the ELF they bet within the specified time.

##### User Operation Steps:

1. **Approve Transaction**:
   - Send an approve transaction through the Token Contract to grant the Bingo Contract a certain amount of ELF tokens.
 

2. **Place a Bet**:
   - Place a bet using the Bingo Contract. The outcome will be revealed at the specified time.


3. **Check Results**:
   - After a certain period or when a specific block height is reached, users can query the Bingo Contract to check the    results.
   - The Bingo Contract will then transfer the appropriate amount of ELF tokens to the user.
      - If the transferred amount is greater than the bet amount, the user wins.
      - If it is less, the user loses.

This simple game demonstrates how to develop and interact with smart contracts on the aelf blockchain, providing a clear, straightforward example for developers.


# API List

Here is a summary of the essential APIs needed for the Bingo Game dApp, along with additional methods to make the Bingo contract more complete:

### Basic APIs

##### 1. Play
- Corresponds to step 2: Place a bet.

##### 2. Bingo
- Corresponds to step 3: Check results

### Additional Action Methods
In order to make the Bingo contract a more complete dApp contract, two additional Action methods are added:

##### 1. Register
- Creates a file for users to save registration time and user-specific values (used in random number calculations for the Bingo game).

##### 2. Quit
- Deletes the user’s file.


### View Methods
These methods are for querying information only:

##### 1. GetAward
- Allows users to query the award information of a bet.

##### 2. GetPlayerInformation
- Used to query a player’s information.

### Method Details

| Method | Parameters | Return Type	| Function |
| ------ | ------ | ------ | ------ |
| Register | Empty | Empty | Register player information |
| Quit | Empty | Empty | Delete player information |
| Play | Int64Value anount you debt	| Int64Value the resulting block height | debt |
| Bingo | Hash the transaction id of Play | Empty True indicates win | query the game’s result |
| GetAward | Hash the transaction id of Play | Int64Value award | query the amount of award |
| GetPlayerInformation| Address player’s address | Player-Information | query player’s information |

This API list ensures that users can easily interact with the Bingo contract, register and quit the game, place bets, check results, and query relevant information efficiently.

# Write Contract

#### Create and Initialize Project

1. Create a new folder named `BingoGame`:

```sh
mkdir BingoGame
cd BingoGame
```

2. Execute the following commands to create and initialize the contract project:

```sh
dotnet new aelf -n BingoGameContract -N AElf.Contracts.BingoGame
```

After successful execution, you will find  `src` and `test` directories within the BingoGame directory. These folders contain the contract module and test case module for the BingoGame contract.

#### Define Proto

Based on the API list from the requirements analysis, the `bingo_contract.proto` file should be defined as follows:

```protobuf
syntax = "proto3";

import "aelf/core.proto";
import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "google/protobuf/timestamp.proto";

option csharp_namespace = "AElf.Contracts.BingoContract";

service BingoContract {
    option (aelf.csharp_state) = "AElf.Contracts.BingoContract.BingoContractState";

    // Actions
    rpc Register (google.protobuf.Empty) returns (google.protobuf.Empty) {}
    rpc Play (google.protobuf.Int64Value) returns (google.protobuf.Int64Value) {}
    rpc Bingo (aelf.Hash) returns (google.protobuf.BoolValue) {}
    rpc Quit (google.protobuf.Empty) returns (google.protobuf.Empty) {}

    // Views
    rpc GetAward (aelf.Hash) returns (google.protobuf.Int64Value) {
        option (aelf.is_view) = true;
    }
    rpc GetPlayerInformation (aelf.Address) returns (PlayerInformation) {
        option (aelf.is_view) = true;
    }
}

message PlayerInformation {
    aelf.Hash seed = 1;
    repeated BoutInformation bouts = 2;
    google.protobuf.Timestamp register_time = 3;
}

message BoutInformation {
    int64 play_block_height = 1;
    int64 amount = 2;
    int64 award = 3;
    bool is_complete = 4;
    aelf.Hash play_id = 5;
    int64 bingo_block_height = 6;
}
```
1. **Remove the** `hello_world_contract.proto` file.
2. **Generate a new proto file** and define its content as shown above.
3. **Ensure proto files are stored in the appropriate directories**. Create necessary folders if they do not exist. Follow these guidelines:
   - For Protobuf files under the `src` folder:
      - **contract**: Store definition proto files for your contract.
      - **message**: Define common properties that can be imported and used by other proto files.
      - **reference**: Store proto files for contracts referenced by your contract.
      - **base**: Store basic proto files, such as ACS (aelf contract standard) proto files.
      
   - For Protobuf files under the test folder:
      - **contract**: Store definition proto files for your contract and any referenced contracts.
      - **message**: Define common properties for import and use by other proto files.
      - **base**: Store basic proto files, including ACS proto files, similar to the src directory.


# Contract Implementation

This section outlines the general idea of the Action methods for the Bingo Game contract. For detailed code implementation, refer to [the BingoGameContract.cs](https://github.com/AElfProject/aelf-boilerplate/blob/dev/chain/contract/AElf.Contracts.BingoGameContract/BingoGameContract.cs) file.

### Register & Quit

#### Register

1. **Determine the User's Seed:**
   - The seed is a hash value unique to each user. It is used in the calculation of random numbers to ensure different users get different results at the same block height.


2. **Record Registration Time:**
   - Save the time when the user registers.


#### Quit:

1. **Delete User Information:**
    - Remove all stored information related to the user.


### Play & Bingo Methods

#### Play

1. **Deduct User’s Bet Amount:**
   - Use `TransferFrom` to deduct the specified bet amount from the user’s account.


2. **Add a Round (Bount) for the User:**
   - Initialize a new Bount and 
     1. **PlayId**: The transaction ID of this transaction to uniquely identify the Bout.
     2. **Amount**: The amount of the bet.
     3. **PlayBlockHeight**: The height of the block in which the Play transaction is packaged.



#### Bingo Method:

1. **Find Corresponding Bout:**
    - Retrieve the Bout using `PlayId`. Check if the current block height is greater than `PlayBlockHeight + number of nodes * 8`.


2. **Calculate Random Number:**
    - Use the current block height and the user’s Seed to generate a random number.
    - Convert the hash value to a bit array and sum the bits to get a number between 0 and 256.
    

2. **Determine Win or Loss:**
    - Check if the number is divisible by 2 to determine if the user wins or loses.
    - The specific range of the number determines the amount of win/loss for the user.

# Write Test

To test the Bingo contract, follow these steps to set up the environment and write the test cases.

#### 1. Set Up the Directory Structure

Ensure the following directory structure for your protobuf files:

```sh
test
├── Protobuf
│   ├── message
│   │   └── authority_info.proto
│   └── stub
│       ├── bingo_game_contract.proto
│       └── token_contract.proto
```

To test the Bingo contract, you'll need to set up two stubs: one for the Bingo contract and one for the Token contract. Follow these steps to write your test code directly in the `BingoContractTest` method:

#### 2. Prepare the Stubs

```cs
// Get a stub for testing.
var keyPair = SampleECKeyPairs.KeyPairs[0];
var stub = GetBingoContractStub(keyPair);
var tokenStub = GetTester<TokenContractContainer.TokenContractStub>(
    GetAddress(TokenSmartContractAddressNameProvider.StringName), keyPair);
```

Here, `stub` is the Bingo contract stub, and `tokenStub` is the Token contract stub.

#### 3. Prepare the Bonus Pool
In the unit test, the keyPair account is preloaded with a large amount of ELF tokens by default. To run the Bingo contract, you'll need to transfer some ELF tokens to the Bingo contract as a bonus pool:

```cs
// Prepare the bonus pool.
await tokenStub.Transfer.SendAsync(new TransferInput
{
    To = dAppContractAddress,
    Symbol = "ELF",
    Amount = 100_00000000
});
```

#### 4.Register the Player

You can now start using the BingoGame contract by registering a player:

```cs
// Register the player.
await stub.Register.SendAsync(new Empty());
```

#### 5.Check Player Information

After registration, retrieve and check the player's information:

```cs
// Retrieve and check player information.
var address = Address.FromPublicKey(keyPair.PublicKey);
var playerInformation = await stub.GetPlayerInformation.CallAsync(address);
playerInformation.Seed.Value.ShouldNotBeEmpty();
playerInformation.RegisterTime.ShouldNotBeNull();
```

#### 6.Approve the Bingo Contract

Before placing a bet, you need to approve the Bingo contract to spend tokens on behalf of the player:

```cs
// Approve the Bingo contract.
await tokenStub.Approve.SendAsync(new ApproveInput
{
    Spender = dAppContractAddress,
    Symbol = "ELF",
    Amount = 10000
});
```

#### 7.Place a Bet

Place a bet using the Play method of the Bingo contract:

```cs
// Place a bet.
await stub.Play.SendAsync(new Int64Value { Value = 10000 });
```

#### 8.Check if Bout is Generated

Verify that a Bout is generated after placing the bet:

```cs
// Check if Bout is generated.
Hash playId;
var playerInformation = await stub.GetPlayerInformation.CallAsync(address);
playerInformation.Bouts.ShouldNotBeEmpty();
playId = playerInformation.Bouts.First().PlayId;
```

#### 9.Increase Block Height

Since determining the outcome requires eight blocks, send seven invalid transactions to increase the block height:

```cs
// Increase block height by mining 7 more blocks.
for (var i = 0; i < 7; i++)
{
    await stub.Bingo.SendWithExceptionAsync(playId);
}
```

#### 10.Check the Award

Finally, check the award. A non-zero award indicates a win:

```cs
// Check the award.
await stub.Bingo.SendAsync(playId);
var award = await stub.GetAward.CallAsync(playId);
award.Value.ShouldNotBe(0);
```

This test ensures that the Bingo contract works correctly, from registering a player to placing a bet and determining the outcome.
