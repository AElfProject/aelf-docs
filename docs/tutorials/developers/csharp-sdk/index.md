---
sidebar_position: 2
title: C# SDK
description: C# SDK
image: /img/Logo.aelf.svg
---

# aelf-sdk.cs - aelf C# API

`aelf-sdk.cs` is a C# library that facilitates communication with an aelf node over HTTP. Below is a comprehensive guide on how to install and use the `aelf-sdk.cs` package, along with some example usages.


## Introduction

`aelf-sdk.cs` is a collection of libraries designed for interaction with both local and remote aelf nodes via HTTP connections. This documentation provides instructions on how to install and run `aelf-sdk.cs`, and includes API reference documentation with examples. [aelf-sdk.cs](https://github.com/AElfProject/aelf-sdk.cs)


## Adding aelf-sdk.cs package

To use `aelf-sdk.cs`, you need to add the AElf.Client package to your project. This can be done using various methods:


### Using Package Manager

Open the Package Manager Console in Visual Studio and run:

```sh
PM> Install-Package AElf.Client
```


### Using .NET CLI

Run the following command in your terminal:

```sh
dotnet add package AElf.Client
```


### Using PackageReference

Add the following line to your `.csproj` file:

```sh
<PackageReference Include="AElf.Client" Version="X.X.X" />
```

Replace `X.X.X` with the desired version of the `AElf.Client` package.


## Examples


### 1. Create Instance

Create a new instance of AElfClient and set the URL of an aelf chain node.

```csharp
using AElf.Client.Service;

// Create a new instance of AElfClient
AElfClient client = new AElfClient("http://127.0.0.1:1235");
```


### 2. Test Connection

Check that the aelf chain node is connectable.

```csharp
var isConnected = await client.IsConnectedAsync();
Console.WriteLine($"Connected: {isConnected}");
```


### 3.  Initiate a Transfer Transaction


```csharp
// Get token contract address.
var tokenContractAddress = await client.GetContractAddressByNameAsync(HashHelper.ComputeFrom("AElf.ContractNames.Token"));

var methodName = "Transfer";
var param = new TransferInput
{
    To = new Address {Value = Address.FromBase58("7s4XoUHfPuqoZAwnTV7pHWZAaivMiL8aZrDSnY9brE1woa8vz").Value},
    Symbol = "ELF",
    Amount = 1000000000,
    Memo = "transfer in demo"
};
var ownerAddress = client.GetAddressFromPrivateKey(PrivateKey);

// Generate a transfer transaction.
var transaction = await client.GenerateTransaction(ownerAddress, tokenContractAddress.ToBase58(), methodName, param);
var txWithSign = client.SignTransaction(PrivateKey, transaction);

// Send the transfer transaction to AElf chain node.
var result = await client.SendTransactionAsync(new SendTransactionInput
{
    RawTransaction = txWithSign.ToByteArray().ToHex()
});

await Task.Delay(4000);
// After the transaction is mined, query the execution results.
var transactionResult = await client.GetTransactionResultAsync(result.TransactionId);
Console.WriteLine(transactionResult.Status);

// Query account balance.
var paramGetBalance = new GetBalanceInput
{
    Symbol = "ELF",
    Owner = new Address {Value = Address.FromBase58(ownerAddress).Value}
};
var transactionGetBalance =await client.GenerateTransaction(ownerAddress, tokenContractAddress.ToBase58(), "GetBalance", paramGetBalance);
var txWithSignGetBalance = client.SignTransaction(PrivateKey, transactionGetBalance);

var transactionGetBalanceResult = await client.ExecuteTransactionAsync(new ExecuteTransactionDto
{
    RawTransaction = txWithSignGetBalance.ToByteArray().ToHex()
});

var balance = GetBalanceOutput.Parser.ParseFrom(ByteArrayHelper.HexstringToByteArray(transactionGetBalanceResult));
Console.WriteLine(balance.Balance);
```

<!-- #### a. Get Token Contract Address

```csharp
using AElf.Client.Helpers;
using AElf.Types;
using Google.Protobuf;
using AElf.Client.Dto;
using AElf.Contracts.MultiToken.Messages;

// Get token contract address.
var tokenContractAddress = await client.GetContractAddressByNameAsync(HashHelper.ComputeFrom("AElf.ContractNames.Token"));
```

#### b. Prepare Transfer Parameters

```csharp
var methodName = "Transfer";
var param = new TransferInput
{
    To = new Address {Value = Address.FromBase58("7s4XoUHfPuqoZAwnTV7pHWZAaivMiL8aZrDSnY9brE1woa8vz").Value},
    Symbol = "ELF",
    Amount = 1000000000, // 10 ELF with 8 decimal places
    Memo = "transfer in demo"
};
var ownerAddress = client.GetAddressFromPrivateKey(PrivateKey);
```

#### c. Generate and Sign Transaction

```csharp
// Generate a transfer transaction.
var transaction = await client.GenerateTransaction(ownerAddress, tokenContractAddress.ToBase58(), methodName, param);
var txWithSign = client.SignTransaction(PrivateKey, transaction);
```

#### d. Send Transaction to aelf Chain Node

```csharp
// Send the transfer transaction to aelf chain node.
var result = await client.SendTransactionAsync(new SendTransactionInput
{
    RawTransaction = txWithSign.ToByteArray().ToHex()
});

// Wait for the transaction to be mined
await Task.Delay(4000);

// After the transaction is mined, query the execution results.
var transactionResult = await client.GetTransactionResultAsync(result.TransactionId);
Console.WriteLine($"Transaction Status: {transactionResult.Status}");
``` 


### 4. Query Account Balance

#### a. Prepare Get Balance Parameters

```csharp
var paramGetBalance = new GetBalanceInput
{
    Symbol = "ELF",
    Owner = new Address {Value = Address.FromBase58(ownerAddress).Value}
};
```

#### b. Generate and Sign Get Balance Transaction

```csharp
var transactionGetBalance = await client.GenerateTransaction(ownerAddress, tokenContractAddress.ToBase58(), "GetBalance", paramGetBalance);
var txWithSignGetBalance = client.SignTransaction(PrivateKey, transactionGetBalance);
```

#### c. Execute Get Balance Transaction

```csharp
var transactionGetBalanceResult = await client.ExecuteTransactionAsync(new ExecuteTransactionDto
{
    RawTransaction = txWithSignGetBalance.ToByteArray().ToHex()
});

var balance = GetBalanceOutput.Parser.ParseFrom(ByteArrayHelper.HexstringToByteArray(transactionGetBalanceResult));
Console.WriteLine($"Account Balance: {balance.Balance}");
```-->


## Web API

You can see how the Web API of the node works at `{chainAddress}/swagger/index.html`. For example, on a local address: `http://127.0.0.1:1235/swagger/index.html`.

Here are the examples and code snippets for interacting with the aelf Web API using the `AElfClient` instance.

### 1. Create Instance

Create a new instance of AElfClient and set the URL of an aelf chain node.

```csharp
using AElf.Client.Service;

// Create a new instance of AElfClient, change the URL if needed
AElfClient client = new AElfClient("http://127.0.0.1:1235");
```


### 2. Get Chain Status

- **Web API path**: `/api/blockChain/chainStatus`

- **Parameters** : None

- **Returns**: `ChainStatusDto`
   - ChainId - string
   - Branches - Dictionary`<string,long>`
   - NotLinkedBlocks - Dictionary`<string,string>`
   - LongestChainHeight - long
   - LongestChainHash - string
   - GenesisBlockHash - string
   - GenesisContractAddress - string
   - LastIrreversibleBlockHash - string
   - LastIrreversibleBlockHeight - long
   - BestChainHash - string
   - BestChainHeight - long

#### Example:

```csharp
await client.GetChainStatusAsync();
```


### 3. Get Contract File Descriptor Set

- **Web API path**: `/api/blockChain/contractFileDescriptorSet`

- **Parameters** :
    - contractAddress - string

- **Returns**: `[]byte`


#### Example:

```csharp
await client.GetContractFileDescriptorSetAsync(address);
```


### 4. Get Block Height

- **Web API path**: `/api/blockChain/blockHeight`

- **Parameters** : None

- **Returns**: `long`


#### Example:

```csharp
await client.GetBlockHeightAsync();
```


### 5. Get Block Information by Block Hash

- **Web API path**: `/api/blockChain/block`

- **Parameters** : 
   - blockHash - string
   - includeTransactions - bool

- **Returns**: `BlockDto`

   - BlockHash - string
   - Header - BlockHeaderDto
      - PreviousBlockHash - string
      - MerkleTreeRootOfTransactions - string
      - MerkleTreeRootOfWorldState - string
      - Extra - string
      - Height - long
      - Time - string
      - ChainId - string
      - Bloom - string
      - SignerPubkey - string
   - Body - BlockBodyDto
      - TransactionsCount - int
      - Transactions - []string

#### Example:

```csharp
await client.GetBlockByHashAsync(blockHash);
```


### 6. Get Block Information by Block Height

- **Web API path**: `/api/blockChain/blockByHeight`

- **Parameters** : 
   - blockHeight - long
   - includeTransactions - bool

- **Returns**: `BlockDto`

   - BlockHash - string
   - Header - BlockHeaderDto
      - PreviousBlockHash - string
      - MerkleTreeRootOfTransactions - string
      - MerkleTreeRootOfWorldState - string
      - Extra - string
      - Height - long
      - Time - string
      - ChainId - string
      - Bloom - string
      - SignerPubkey - string
   - Body - BlockBodyDto
      - TransactionsCount - int
      - Transactions - []string


#### Example:

```csharp
await client.GetBlockByHeightAsync(height);
```


### 7. Get Transaction Result

- **Web API path**: `/api/blockChain/transactionResult`

- **Parameters** : 
   - transactionId - string

- **Returns**: `TransactionResultDto`

   - TransactionId - string
   - Status - string
   - Logs - []LogEventDto
      - Address - string
      - Name - string
      - Indexed - []string
      - NonIndexed - string
   - Bloom - string
   - BlockNumber - long
   - BlockHash - string
   - Transaction - TransactionDto
       - From - string
       - To - string
       - RefBlockNumber - long
       - RefBlockPrefix - string
       - MethodName - string
       - Params - string
       - Signature - string
   - Error - string


#### Example:

```csharp
await client.GetTransactionResultAsync(transactionId);
```


### 8. Get Multiple Transaction Results in a Block

- **Web API path**: `/api/blockChain/transactionResults`

- **Parameters** : 
   - blockHash - string
   - offset - int
   - limit - int

- **Returns**: `List<TransactionResultDto>` - The array of transaction result:
   - the transaction result object


#### Example:

```csharp
await client.GetTransactionResultsAsync(blockHash, 0, 10);
```

### 9. Get Transaction Pool Status

- **Web API path**: `/api/blockChain/transactionPoolStatus`

- **Parameters** : None

- **Returns**: `TransactionPoolStatusOutput`
   - Queued - int
   - Validated - int


#### Example:

```csharp
var transactionPoolStatus = await client.GetTransactionPoolStatusAsync();
```

### 10. Send Transaction

- **Web API path**: `/api/blockChain/sendTransaction` (POST)

- **Parameters** : 
   - `SendRawTransactionInput` - Serialization of data into protobuf data:
       -`RawTransaction` - string

- **Returns**: `SendRawTransactionOutput`
   - TransactionId - string


#### Example:

```csharp
var sendTransactionOutput = await client.SendTransactionAsync(sendTransactionInput);
```

### 11. Send Raw Transaction

- **Web API path**: `/api/blockChain/sendTransaction` (POST)

- **Parameters** : 
    - SendRawTransactionInput - Serialization of data into protobuf data:
       - `Transaction` - string
       - `Signature` - string
       - `ReturnTransaction` - bool

- **Returns**: `SendRawTransactionOutput`
    - TransactionId - string
    - Transaction - TransactionDto


#### Example:

```csharp
var sendRawTransactionInput = new SendRawTransactionInput
{
    Transaction = "YOUR_RAW_TRANSACTION",
    Signature = "YOUR_SIGNATURE",
    ReturnTransaction = true
};
var sendRawTransactionOutput = await client.SendRawTransactionAsync(sendRawTransactionInput);
Console.WriteLine($"Transaction ID: {sendRawTransactionOutput.TransactionId}");
```

### 12. Send Multiple Transactions

- **Web API path**: `/api/blockChain/sendTransactions` (POST)

- **Parameters** : 
   - `SendTransactionsInput`  - Serialization of data into protobuf data:
       - `SendTransactionsInput`  - string

- **Returns**: `string[]`


#### Example:

```csharp
await client.SendTransactionsAsync(input);
```

### 13. Create Raw Transaction

- **Web API path**: `/api/blockChain/rawTransaction` (POST)

- **Parameters** : 
   - `CreateRawTransactionInput`  
       - `From` - string
       - `To`  - string
       - `RefBlockNumber` - long
       - `RefBlockHash` - string
       - `MethodName` - string
       - `Params` - string

- **Returns**: 
    - `CreateRawTransactionOutput`
        - `RawTransactions` - string


#### Example:

```csharp
await client.CreateRawTransactionAsync(input);
```

### 14. Execute Transaction

- **Web API path**: `/api/blockChain/executeTransaction` (POST)

- **Parameters** : 
   - `ExecuteRawTransactionDto` - Serialization of data into protobuf data:
       - `RawTransaction` - string

- **Returns**: `string`


#### Example:

```csharp
await client.ExecuteRawTransactionAsync(input);
```

### 15. Execute Raw Transaction

- **Web API path**: `/api/blockChain/executeRawTransaction` (POST)

- **Parameters** : 
   - `ExecuteRawTransactionDto` - Serialization of data into protobuf data:
       - `RawTransaction` - string
       - `Signature` - string

- **Returns**: `string`


#### Example:
```csharp
await client.ExecuteRawTransactionAsync(input);
```


### 16. Get Peers

- **Web API path**: `/api/net/peers`

- **Parameters** : 
   - `withMetrics` - bool

- **Returns**: `List<PeerDto>`

   - `IpAddress` - string
   - `ProtocolVersion` - int
   - `ConnectionTime` - long
   - `ConnectionStatus` - string
   - `Inbound` - bool
   - `BufferedTransactionsCount` - int
   - `BufferedBlocksCount` - int
   - `BufferedAnnouncementsCount` - int
   - `NodeVersion` - string
   - `RequestMetrics` - List`<RequestMetric>`
       - `RoundTripTime` - long
       - `MethodName` - string
       - `Info` - string
       - `RequestTime` - string



#### Example:

```csharp
await client.GetPeersAsync(false);
```


### 17. Add Peer

Attempts to remove a node from the connected network nodes.

- **Web API path**: `/api/net/peer` (POST)

- **Parameters** : 
   - `ipAddress` - string

- **Returns**: `bool`

#### Example:

```csharp
await client.AddPeerAsync("127.0.0.1:7001");
```


### 18. Remove Peer

Attempts to remove a node from the connected network nodes.

- **Web API path**: `/api/net/peer` (DELETE)

- **Parameters** : 
   - `ipAddress` - string

- **Returns**: `bool`

```csharp
await client.RemovePeerAsync("127.0.0.1:7001");
```


### 19. Calculate Transaction Fee

- **Web API path**: `/api/blockChain/calculateTransactionFee` (POST)

- **Parameters** : 
   - `CalculateTransactionFeeInput` - The object with the following structure :
       - `RawTrasaction` - string

- **Returns**: 
   - `TransactionFeeResultOutput`
       - `Success` - bool
       - `TransactionFee` - map[string]interface{}
       - `ResourceFee` - map[string]interface{}

#### Example:

```csharp
var input = new CalculateTransactionFeeInput{
    RawTransaction = RawTransaction
};
await Client.CalculateTransactionFeeAsync(input);
```


### 20. Get Network Information

- **Web API path**: `/api/net/networkInfo`

- **Parameters** : Empty

- **Returns**: 
   - `NetworkInfoOutput`
       - `Version` - string
       - `ProtocolVersion` - int
       - `Connections` - int

#### Example:

```csharp
await client.GetNetworkInfoAsync();
```

These examples demonstrate how to use the aelf Web API in C# using the `AElfClient` class to interact with the aelf blockchain, including checking chain status, handling transactions, and managing network peers.


## aelf Client

### 1. IsConnected

Verify whether this SDK successfully connects to the chain.

- **Parameters**: None

- **Returns** :
   - `bool`: Connection status

#### Example:

```csharp
bool isConnected = await client.IsConnectedAsync();
Console.WriteLine($"Is Connected: {isConnected}");
```

### 2. GetGenesisContractAddress

Get the address of the genesis contract.

- **Parameters**: None

- **Returns** :
   - `string`: Genesis contract address

#### Example:

```csharp
await client.GetGenesisContractAddressAsync();
```

### 3. GetContractAddressByName

Get the address of a contract by the given contract name hash.

- **Parameters**:
   - `contractNameHash` (string): Hash of the contract name

- **Returns** :
   - `string`: Contract address

#### Example:

```csharp
await client.GetContractAddressByNameAsync(contractNameHash);
```

### 4. GenerateTransaction

Build a transaction from the input parameters.

- **Parameters**:
   - `from` (string): Sender's address
   - `to` (string): Recipient's address
   - `methodName` (string): Method name
   - `input` IMessage

- **Returns** :
   - `Transaction`: Built transaction

#### Example:

```csharp
await client.GenerateTransactionAsync(from, to, methodName, input);
```

### 5. GetFormattedAddress

Convert the `Address` to the displayed string format: symbol_base58-string_base58-string_chain-id.

- **Parameters**:
   - `address` (string): Address to format

- **Returns** :
   - `string`: Formatted address

#### Example:

```csharp
await client.GetFormattedAddressAsync(address);
```

### 6. SignTransaction

- **Parameters**:
   - `privateKey` (string): Address to format
   - `transaction` (string): Address to format

- **Returns** :
   - `Transaction`

#### Example:

```csharp
client.SignTransaction(privateKeyHex, transaction);
```

### 7. GetAddressFromPubKey

Get the account address through the public key.

- **Parameters**:
   - `pubKey` (string): Public key

- **Returns** :
   - `string`: Account address

#### Example:

```csharp
client.GetAddressFromPubKey(pubKey);
```

### 8. GetAddressFromPrivateKey

Get the account address through the private key.

- **Parameters**:
   - `privateKey` (string): Private key

- **Returns** :
   - `string`: Account address

#### Example:

```csharp
client.GetAddressFromPrivateKey(privateKeyHex);
```

### 9. GenerateKeyPairInfo

Generate a new account key pair.

- **Parameters**: None

- **Returns** :
   - `KeyPairInfo`
       - `PrivateKey` - string
       - `PublicKey` - string
       - `Address` - string

#### Example:

```csharp
client.GenerateKeyPairInfo();
```

## Supports

.NET Standard 2.0