---
sidebar_position: 4
title: Java SDK
description: Java SDK
---

# aelf-sdk.java - aelf Java API

## Introduction

`aelf-sdk.java` is a set of libraries that allow interaction with a local or remote AElf node using an HTTP connection. This documentation guides you through installing and running `aelf-sdk.java`, along with providing API reference documentation and examples.

For more information, you can check out the [repository](https://github.com/AElfProject/aelf-sdk.java).

## Adding aelf-sdk.java Package

To add the `aelf-sdk.java` package to your project, use the following Maven dependency:

```xml
<!-- https://mvnrepository.com/artifact/io.aelf/aelf-sdk -->
<dependency>
    <groupId>io.aelf</groupId>
    <artifactId>aelf-sdk</artifactId>
    <version>0.X.X</version>
</dependency>
```

## Examples

### Create Instance

Create a new instance of `AElfClient`, and set the URL of an AElf chain node.

```java
import AElf.Client.Service;

// Create a new instance of AElfClient, change the URL if needed
AElfClient client = new AElfClient("http://127.0.0.1:1235");
```

### Test Connection

Check if the AElf chain node is connectable.

```java
boolean isConnected = client.isConnected();
```

### Initiate a Transfer Transaction

Initiate a transfer transaction using the following steps:

#### 1. Get Token Contract Address

```java
Copy code
String tokenContractAddress = client.getContractAddressByName(privateKey, Sha256.getBytesSha256("AElf.ContractNames.Token"));
```

#### 2. Set Recipient Address

```java
Client.Address.Builder to = Client.Address.newBuilder();
to.setValue(ByteString.copyFrom(Base58.decodeChecked("7s4XoUHfPuqoZAwnTV7pHWZAaivMiL8aZrDSnY9brE1woa8vz")));
Client.Address toObj = to.build();
```

#### 3. Create Transfer Input

```java
TokenContract.TransferInput.Builder paramTransfer = TokenContract.TransferInput.newBuilder();
paramTransfer.setTo(toObj);
paramTransfer.setSymbol("ELF");
paramTransfer.setAmount(1000000000);
paramTransfer.setMemo("transfer in demo");
TokenContract.TransferInput paramTransferObj = paramTransfer.build();
```

#### 4. Generate and Sign Transaction

```java
String ownerAddress = client.getAddressFromPrivateKey(privateKey);
Transaction.Builder transactionTransfer = client.generateTransaction(ownerAddress, tokenContractAddress, "Transfer", paramTransferObj.toByteArray());
Transaction transactionTransferObj = transactionTransfer.build();
transactionTransfer.setSignature(ByteString.copyFrom(ByteArrayHelper.hexToByteArray(client.signTransaction(privateKey, transactionTransferObj))));
transactionTransferObj = transactionTransfer.build();
```

#### 5. Send Transaction

```java
SendTransactionInput sendTransactionInputObj = new SendTransactionInput();
sendTransactionInputObj.setRawTransaction(Hex.toHexString(transactionTransferObj.toByteArray()));
SendTransactionOutput sendResult = client.sendTransaction(sendTransactionInputObj);
```

#### 6. Query Execution Results

```java
Thread.sleep(4000);
TransactionResultDto transactionResult = client.getTransactionResult(sendResult.getTransactionId());
System.out.println(transactionResult.getStatus());
```

#### 7. Query Account Balance

```java
Client.Address.Builder owner = Client.Address.newBuilder();
owner.setValue(ByteString.copyFrom(Base58.decodeChecked(ownerAddress)));
Client.Address ownerObj = owner.build();

TokenContract.GetBalanceInput.Builder paramGetBalance = TokenContract.GetBalanceInput.newBuilder();
paramGetBalance.setSymbol("ELF");
paramGetBalance.setOwner(ownerObj);
TokenContract.GetBalanceInput paramGetBalanceObj = paramGetBalance.build();

Transaction.Builder transactionGetBalance = client.generateTransaction(ownerAddress, tokenContractAddress, "GetBalance", paramGetBalanceObj.toByteArray());
Transaction transactionGetBalanceObj = transactionGetBalance.build();
String signature = client.signTransaction(privateKey, transactionGetBalanceObj);
transactionGetBalance.setSignature(ByteString.copyFrom(ByteArrayHelper.hexToByteArray(signature)));
transactionGetBalanceObj = transactionGetBalance.build();

ExecuteTransactionDto executeTransactionDto = new ExecuteTransactionDto();
executeTransactionDto.setRawTransaction(Hex.toHexString(transactionGetBalanceObj.toByteArray()));
String transactionGetBalanceResult = client.executeTransaction(executeTransactionDto);

TokenContract.GetBalanceOutput balance = TokenContract.GetBalanceOutput.getDefaultInstance().parseFrom(ByteArrayHelper.hexToByteArray(transactionGetBalanceResult));
System.out.println(balance.getBalance());
```

This guide provides basic steps to interact with an AElf node using the aelf-sdk.java library. For more detailed information and advanced usage, please refer to the repository documentation.



## Web API

You can see how the Web API of the node works at `{chainAddress}/swagger/index.html`. For example, if you are using a local address, it would be: `http://127.0.0.1:1235/swagger/index.html`.

The usage of these methods is based on the AElfClient instance. So, if you don’t have one, please create it:

```java
import AElf.Client.Service;

// Create a new instance of AElfClient, change the URL if needed
AElfClient client = new AElfClient("http://127.0.0.1:1235");
```


### GetChainStatus

Get the current status of the blockchain.

**Web API path**: `/api/blockChain/chainStatus`

**Parameters**: None

**Returns**: ChainStatusDto

- `ChainId` - String
- `Branches` - HashMap `<String, Long>`
- `NotLinkedBlocks` - HashMap `<String, String>`
- `LongestChainHeight` - long
- `LongestChainHash` - String
- `GenesisBlockHash` - String
- `GenesisContractAddress` - String
- `LastIrreversibleBlockHash` - String
- `LastIrreversibleBlockHeight` - long
- `BestChainHash` - String
- `BestChainHeight` - long

**Example**:

```java
client.getChainStatus();
```


### GetContractFileDescriptorSet

Get the protobuf definitions related to a contract.

**Web API path**: `/api/blockChain/contractFileDescriptorSet`

**Parameters:**

- `contractAddress` - String (address of a contract)

**Returns**: `byte[]`

**Example**:

```java
client.getContractFileDescriptorSet(address);
```



### GetBlockHeight

Get the current best height of the chain.


**Web API path**: `/api/blockChain/blockHeight`

**Parameters:**: None

**Returns**: `long`

**Example**:

```java
client.getBlockHeight();
```



### GetBlock

Get block information by block hash.

**Web API path**: `/api/blockChain/block`

**Parameters:**

- `blockHash` - String
- `includeTransactions` - boolean (true to include transaction ids list in the block, false otherwise)

**Returns**: `BlockDto`

  - `json`
    - `BlockHash` - String
    - `Header` - BlockHeaderDto
        - `PreviousBlockHash` - String
        - `MerkleTreeRootOfTransactions` - String
        - `MerkleTreeRootOfWorldState` - String
        - `Extra` - String
        - `Height` - long
        - `Time` - Date
        - `ChainId` - String
        - `Bloom` - String
        - `SignerPubkey` - String
    - `Body` - BlockBodyDto
        - `TransactionsCount` - int
        - `Transactions` -  List
            - `transactionId` -  String


**Example**:

```java
client.getBlockByHash(blockHash);
```


### GetBlockByHeight

**Web API path**: `/api/blockChain/blockByHeight`

**Parameters:**

- `blockHeight` - long
- `includeTransactions` - boolean (true to include transaction ids list in the block, false otherwise)

**Returns**: `BlockDto`

  - `json`
    - `BlockHash` - String
    - `Header` - BlockHeaderDto
        - `PreviousBlockHash` - String
        - `MerkleTreeRootOfTransactions` - String
        - `MerkleTreeRootOfWorldState` - String
        - `Extra` - String
        - `Height` - long
        - `Time` - Date
        - `ChainId` - String
        - `Bloom` - String
        - `SignerPubkey` - String
    - `Body` - BlockBodyDto
        - `TransactionsCount` - int
        - `Transactions` -  List
            - `transactionId` -  String


**Example**:

```java
client.getBlockByHeight(height);
```


### GetTransactionResult

**Web API path**: `/api/blockChain/transactionResult`

**Parameters:**

- `transactionId` - String

**Returns**: `TransactionResultDto`

  - `json`
    - `TransactionId` - String
    - `Status` - String
    - `Logs` - List
        - `Address` - String
        - `Name` - String
        - `Indexed` - List
        - `NonIndexed` - String
    - `Bloom` - String
    - `BlockNumber` - Number
    - `Transaction` - List
        - `From` - String
        - `To` -  String
        - `RefBlockNumber` -  Number
        - `RefBlockPrefix` -  String
        - `MethodName` -  String
        - `Params` -  json
        - `Signature` -  String
    - `ReadableReturnValue` - json    
    - `Error` - String    

**Example**:

```java
client.getTransactionResult(transactionId);
```


### GetTransactionResults

**Web API path**: `/api/blockChain/transactionResults`

**Parameters:**

- `blockHash` - String
- `offset` - int
- `limit` - int

**Returns**: `List<TransactionResultDto>` - The array of transaction results    

**Example**:

```java
client.getTransactionResults(blockHash, 0, 10);
```


### GetTransactionPoolStatus

**Web API path**: `/api/blockChain/transactionPoolStatus`

**Parameters:**: None

**Returns**: `TransactionPoolStatusOutput`

- `Queued` - int
- `Validated` - int

**Example**:

```java
client.getTransactionPoolStatus();
```


### SendTransaction

**Web API path**: `/api/blockChain/sendTransaction`

**Method**: POST

**Parameters:**

- `SendTransactionInput` - Serialization of data into protobuf format:
    - `RawTransaction` - String

**Returns**: `SendTransactionOutput`

- `TransactionId` - String

**Example**:

```java
client.sendTransaction(input);
```


### SendRawTransaction

**Web API path**: `/api/blockChain/sendTransaction`

**Method**: POST

**Parameters:**

- `SendRawTransactionInput` - Serialization of data into protobuf format:
    - `Transaction` - String
    - `Signature` - String
    - `ReturnTransaction` - boolean

**Returns**: `SendRawTransactionOutput`

    - `TransactionId` - String
    - `Transaction` - TransactionDto
    

**Example**:

```java
client.sendRawTransaction(input);
```


### SendTransactions

Broadcast multiple transactions.

**Web API path**: `/api/blockChain/sendTransactions`

**Method**: POST

**Parameters:**

- `SendTransactionsInput` - Serialization of data into protobuf format:
    - `RawTransactions` - String

**Returns**: `List<String>`

**Example**:

```java
client.sendTransactions(input);
```



### CreateRawTransaction

Create an unsigned serialized transaction.

**Web API path**: `/api/blockChain/rawTransaction`

**Method**: POST

**Parameters:**

- `CreateRawTransactionInput`
    - `From` - String
    - `To` - String
    - `RefBlockNumber` - long
    - `RefBlockHash` - String
    - `MethodName` - String
    - `Params` - String

**Returns**: `CreateRawTransactionOutput` - Serialization of data into protobuf format:

- `RawTransaction` - String

**Example**:

```java
client.createRawTransaction(input);
```


### ExecuteTransaction

**Web API path**: `/api/blockChain/executeTransaction`

**Method**: POST

**Parameters:**

- `ExecuteTransactionDto` - Serialization of data into protobuf format:
    - `RawTransaction` - String

**Returns**: `String`

**Example**:

```java
client.executeTransaction(input);
```


### ExecuteRawTransaction

**Web API path**: `/api/blockChain/executeRawTransaction`

**Method**: POST

**Parameters:**

- `ExecuteRawTransactionDto` - Serialization of data into protobuf format:
    - `RawTransaction` - String
    - `Signature` - String

**Returns**: `String`

**Example**:

```java
client.executeRawTransaction(input);
```



### GetPeers

Get peer information about the connected network nodes.

**Web API path**: `/api/net/peers`

**Parameters:**

- `withMetrics` - boolean

**Returns**: `List<PeerDto>`

- `IpAddress` - String
- `ProtocolVersion` - int
- `ConnectionTime` - long
- `ConnectionStatus` - String
- `Inbound` - boolean
- `BufferedTransactionsCount` - int
- `BufferedBlocksCount` - int
- `BufferedAnnouncementsCount` - int
- `NodeVersion` - String
- `RequestMetrics` -  List`<RequestMetric>`
- `RoundTripTime` - long
- `MethodName` - String
- `Info` - String
- `RequestTime` - String


**Example**:

```java
client.getPeers(false);
```


### AddPeer

Attempts to add a node to the connected network nodes.

**Web API path**: `/api/net/peer`

**Method**: POST

**Parameters:**

- `AddPeerInput`
    - `Address` - String

**Returns**: `boolean`

**Example**:

```java
client.addPeer("127.0.0.1:7001");
```



### RemovePeer

Attempts to remove a node from the connected network nodes.

**Web API path**: `/api/net/peer`

**Method**: DELETE

**Parameters:**

- `Address` - String

**Returns**: `boolean`

**Example**:

```java
client.removePeer("127.0.0.1:7001");
```


### CalculateTransactionFee

Estimate transaction fee.

**Web API path**: `/api/blockChain/calculateTransactionFee`

**Method**: POST

**Parameters:**

- `CalculateTransactionFeeInput`
    - `RawTransaction` - String

**Returns**: `CalculateTransactionFeeOutput`

- `Success` - boolean
- `TransactionFee` - HashMap`<String, Long>`
- `ResourceFee` - HashMap`<String, Long>`

**Example**:

```java
CalculateTransactionFeeOutput output = client.calculateTransactionFee(input);
```



### GetNetworkInfo

**Web API path**: `/api/net/networkInfo`

**Parameters:** None

**Returns**: `NetworkInfoOutput`

- `Version` - String
- `ProtocolVersion` - int
- `Connections` - int

**Example**:

```java
client.getNetworkInfo();
```


## AElf Client


### IsConnected

Verify whether this SDK successfully connects to the chain.


**Parameters:** None

**Returns**: `boolean`


**Example**:

```java
client.isConnected();
```


### GetGenesisContractAddress


**Parameters:** None

**Returns**: `String`

**Example**:

```java
client.getGenesisContractAddress();
```


### GetContractAddressByName

Get the address of a contract by the given contract name hash.


**Parameters:**:

- `privateKey` - String
- `contractNameHash` - byte[]


**Returns**: `String`

**Example**:

```java
client.getContractAddressByName(privateKey, contractNameHash);
```


### GenerateTransaction

Build a transaction from the input parameters.

**Parameters:**

- `from` - String
- `to` - String
- `methodName` - String
- `input` - byte[]


**Returns**: `Transaction`

**Example**:

```java
client.generateTransaction(from, to, methodName, input);
```


### GetFormattedAddress

Convert the Address to the displayed string: `symbol_base58-string_base58-String-chain-id`.

**Parameters:**

- `privateKey` - String
- `address` - String

**Returns**: `String`

**Example**:

```java
client.getFormattedAddress(privateKey, address);
```


### SignTransaction

**Parameters:**

- `privateKeyHex` - String
- `transaction` - Transaction

**Returns**: `String`

**Example**:

```java
client.signTransaction(privateKeyHex, transaction);
```


### GetAddressFromPubKey

**Parameters:**

- `pubKey` - String

**Returns**: `String`

**Example**:

```java
client.getAddressFromPubKey(pubKey);
```


### GetAddressFromPrivateKey

**Parameters:**

- `privateKey` - String

**Returns**: `String`

**Example**:

```java
client.getAddressFromPrivateKey(privateKey);
```


### GenerateKeyPairInfo

**Parameters:** None

**Returns**: `KeyPairInfo`

- `PrivateKey` - String
- `PublicKey` - String
- `Address` - String

**Example**:

```java
client.generateKeyPairInfo();
```


## Supports

- JDK1.8+
- Log4j2.6.2