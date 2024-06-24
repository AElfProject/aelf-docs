---
sidebar_position: 2
title: C# SDK
description: C# SDK
---

# aelf-sdk.cs - aelf C# API

`aelf-sdk.cs` is a C# library that facilitates communication with an AElf node over HTTP. Below is a comprehensive guide on how to install and use the `aelf-sdk.cs` package, along with some example usages.


## Introduction

`aelf-sdk.cs` is a collection of libraries designed for interaction with both local and remote AElf nodes via HTTP connections. This documentation provides instructions on how to install and run `aelf-sdk.cs`, and includes API reference documentation with examples. [aelf-sdk.cs](https://github.com/AElfProject/aelf-sdk.cs)


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

Create a new instance of AElfClient and set the URL of an AElf chain node.

```csharp
using AElf.Client.Service;

// Create a new instance of AElfClient
AElfClient client = new AElfClient("http://127.0.0.1:1235");
```


### 2. Test Connection

Check that the AElf chain node is connectable.

```csharp
var isConnected = await client.IsConnectedAsync();
Console.WriteLine($"Connected: {isConnected}");
```


### 3.  Initiate a Transfer Transaction


#### a. Get Token Contract Address

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

#### d. Send Transaction to AElf Chain Node

```csharp
// Send the transfer transaction to AElf chain node.
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
```


## Web API

Here are the examples and code snippets for interacting with the AElf Web API using the `AElfClient` instance.

### 1. Create Instance

Create a new instance of AElfClient and set the URL of an AElf chain node.

```csharp
using AElf.Client.Service;

// Create a new instance of AElfClient, change the URL if needed
AElfClient client = new AElfClient("http://127.0.0.1:1235");
```


### 2. Get Chain Status

Get the current status of the blockchain.

```csharp
var chainStatus = await client.GetChainStatusAsync();
Console.WriteLine($"Chain ID: {chainStatus.ChainId}");
Console.WriteLine($"Best Chain Height: {chainStatus.BestChainHeight}");
```


### 3. Get Contract File Descriptor Set

Get the protobuf definitions related to a contract.

```csharp
string contractAddress = "YOUR_CONTRACT_ADDRESS";
var fileDescriptorSet = await client.GetContractFileDescriptorSetAsync(contractAddress);
Console.WriteLine($"File Descriptor Set: {fileDescriptorSet.Length} bytes");
```


### 4. Get Block Height

Get the current best height of the chain.

```csharp
var blockHeight = await client.GetBlockHeightAsync();
Console.WriteLine($"Block Height: {blockHeight}");
```


### 5. Get Block Information by Block Hash

Get block information by block hash.

```csharp
string blockHash = "YOUR_BLOCK_HASH";
var block = await client.GetBlockByHashAsync(blockHash);
Console.WriteLine($"Block Hash: {block.BlockHash}");
Console.WriteLine($"Block Height: {block.Header.Height}");
```


### 6. Get Block Information by Block Height

Get block information by block height.

```csharp
long height = 100;
var blockByHeight = await client.GetBlockByHeightAsync(height);
Console.WriteLine($"Block Hash: {blockByHeight.BlockHash}");
Console.WriteLine($"Block Height: {blockByHeight.Header.Height}");
```


### 7. Get Transaction Result

Get the result of a transaction.

```csharp
string transactionId = "YOUR_TRANSACTION_ID";
var transactionResult = await client.GetTransactionResultAsync(transactionId);
Console.WriteLine($"Transaction Status: {transactionResult.Status}");
Console.WriteLine($"Block Number: {transactionResult.BlockNumber}");
```


### 8. Get Multiple Transaction Results in a Block

Get multiple transaction results in a block.

```csharp
string blockHashForTransactions = "YOUR_BLOCK_HASH";
var transactionResults = await client.GetTransactionResultsAsync(blockHashForTransactions, 0, 10);
foreach (var result in transactionResults)
{
    Console.WriteLine($"Transaction ID: {result.TransactionId}, Status: {result.Status}");
}
```

### 9. Get Transaction Pool Status

Get the transaction pool status.

```csharp
var transactionPoolStatus = await client.GetTransactionPoolStatusAsync();
Console.WriteLine($"Queued Transactions: {transactionPoolStatus.Queued}");
Console.WriteLine($"Validated Transactions: {transactionPoolStatus.Validated}");
```

### 10. Send Transaction

Broadcast a transaction.

```csharp
var sendTransactionInput = new SendTransactionInput
{
    RawTransaction = "YOUR_RAW_TRANSACTION"
};
var sendTransactionOutput = await client.SendTransactionAsync(sendTransactionInput);
Console.WriteLine($"Transaction ID: {sendTransactionOutput.TransactionId}");
```

### 11. Send Raw Transaction

Broadcast a raw transaction.

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

Broadcast multiple transactions.

```csharp
var sendTransactionsInput = new SendTransactionsInput
{
    RawTransactions = new[] { "RAW_TRANSACTION_1", "RAW_TRANSACTION_2" }
};
var transactionIds = await client.SendTransactionsAsync(sendTransactionsInput);
foreach (var id in transactionIds)
{
    Console.WriteLine($"Transaction ID: {id}");
}
```

### 13. Create Raw Transaction

Creates an unsigned serialized transaction.

```csharp
var createRawTransactionInput = new CreateRawTransactionInput
{
    From = "FROM_ADDRESS",
    To = "TO_ADDRESS",
    RefBlockNumber = 100,
    RefBlockHash = "BLOCK_HASH",
    MethodName = "METHOD_NAME",
    Params = "PARAMETERS"
};
var createRawTransactionOutput = await client.CreateRawTransactionAsync(createRawTransactionInput);
Console.WriteLine($"Raw Transaction: {createRawTransactionOutput.RawTransaction}");
```

### 14. Execute Transaction

Call a read-only method on a contract.

```csharp
var executeTransactionDto = new ExecuteTransactionDto
{
    RawTransaction = "YOUR_RAW_TRANSACTION"
};
var executionResult = await client.ExecuteTransactionAsync(executeTransactionDto);
Console.WriteLine($"Execution Result: {executionResult}");
```

### 15. Execute Raw Transaction

Call a read-only method on a contract with a raw transaction.

```csharp
var executeRawTransactionDto = new ExecuteRawTransactionDto
{
    RawTransaction = "YOUR_RAW_TRANSACTION",
    Signature = "YOUR_SIGNATURE"
};
var executeRawResult = await client.ExecuteRawTransactionAsync(executeRawTransactionDto);
Console.WriteLine($"Execution Result: {executeRawResult}");
```


### 16. Get Peers

Get peer info about the connected network nodes.

```csharp
var peers = await client.GetPeersAsync(false);
foreach (var peer in peers)
{
    Console.WriteLine($"Peer IP: {peer.IpAddress}, Connection Status: {peer.ConnectionStatus}");
}
```


### 17. Add Peer

Attempts to add a node to the connected network nodes.


```csharp
var isPeerAdded = await client.AddPeerAsync("127.0.0.1:7001");
Console.WriteLine($"Peer Added: {isPeerAdded}");
```


### 18. Remove Peer

Attempts to remove a node from the connected network nodes.

```csharp
var isPeerRemoved = await client.RemovePeerAsync("127.0.0.1:7001");
Console.WriteLine($"Peer Removed: {isPeerRemoved}");
```


### 19. Calculate Transaction Fee

```csharp
var calculateTransactionFeeInput = new CalculateTransactionFeeInput
{
    RawTransaction = "YOUR_RAW_TRANSACTION"
};
var transactionFeeResult = await client.CalculateTransactionFeeAsync(calculateTransactionFeeInput);
Console.WriteLine($"Transaction Fee: {transactionFeeResult.TransactionFee}");
```


### 20. Get Network Information

```csharp
var networkInfo = await client.GetNetworkInfoAsync();
Console.WriteLine($"Network Version: {networkInfo.Version}");
Console.WriteLine($"Connections: {networkInfo.Connections}");
```

These examples demonstrate how to use the AElf Web API in C# using the `AElfClient` class to interact with the AElf blockchain, including checking chain status, handling transactions, and managing network peers.


## aelf Client

### 1. IsConnected

Verify whether this SDK successfully connects to the chain.

```csharp
bool isConnected = await client.IsConnectedAsync();
Console.WriteLine($"Is Connected: {isConnected}");
```

### 2. GetGenesisContractAddress

Get the address of the genesis contract.


```csharp
string genesisContractAddress = await client.GetGenesisContractAddressAsync();
Console.WriteLine($"Genesis Contract Address: {genesisContractAddress}");
```

### 3. GetContractAddressByName

Get the address of a contract by the given contract name hash.


```csharp
var contractNameHash = HashHelper.ComputeFrom("AElf.ContractNames.Token");
string contractAddress = await client.GetContractAddressByNameAsync(contractNameHash);
Console.WriteLine($"Contract Address: {contractAddress}");
```

### 4. GenerateTransaction

Build a transaction from the input parameters.


```csharp
string from = "FROM_ADDRESS";
string to = "TO_ADDRESS";
string methodName = "Transfer";
var input = new TransferInput
{
    To = new Address { Value = Address.FromBase58("TO_ADDRESS").Value },
    Symbol = "ELF",
    Amount = 1000000000,
    Memo = "Transfer example"
};

Transaction transaction = await client.GenerateTransactionAsync(from, to, methodName, input);
Console.WriteLine($"Transaction: {transaction}");
```

### 5. GetFormattedAddress

Convert the `Address` to the displayed string format: symbol_base58-string_base58-string_chain-id.

```csharp
Address address = new Address { Value = Address.FromBase58("ADDRESS").Value };
string formattedAddress = await client.GetFormattedAddressAsync(address);
Console.WriteLine($"Formatted Address: {formattedAddress}");
```

### 6. SignTransaction

```csharp
string privateKeyHex = "YOUR_PRIVATE_KEY_HEX";
Transaction signedTransaction = client.SignTransaction(privateKeyHex, transaction);
Console.WriteLine($"Signed Transaction: {signedTransaction}");
```

### 7. GetAddressFromPubKey

Get the account address through the public key.

```csharp
string pubKey = "YOUR_PUBLIC_KEY";
string addressFromPubKey = client.GetAddressFromPubKey(pubKey);
Console.WriteLine($"Address from PubKey: {addressFromPubKey}");
```

### 8. GetAddressFromPrivateKey

Get the account address through the private key.

```csharp
string privateKeyHex = "YOUR_PRIVATE_KEY_HEX";
string addressFromPrivateKey = client.GetAddressFromPrivateKey(privateKeyHex);
Console.WriteLine($"Address from Private Key: {addressFromPrivateKey}");
```

### 9. GenerateKeyPairInfo

Generate a new account key pair.


```csharp
var keyPairInfo = client.GenerateKeyPairInfo();
Console.WriteLine($"Private Key: {keyPairInfo.PrivateKey}");
Console.WriteLine($"Public Key: {keyPairInfo.PublicKey}");
Console.WriteLine($"Address: {keyPairInfo.Address}");
```

## Supports

.NET Standard 2.0