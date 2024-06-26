---
sidebar_position: 3
title: Go SDK
description: Go SDK
image: /img/Logo.aelf.svg
---

# aelf-sdk.go - aelf Go API

## Introduction

This document provides information on how to use the AElf Go SDK (aelf-sdk.go) to interact with an AElf node. The SDK allows you to communicate with a local or remote AElf node using HTTP. Here you will find instructions for setting up the SDK, examples of how to use it, and a brief description of its main functions.

For additional information, please visit the repository: [aelf-sdk.go](https://github.com/AElfProject/aelf-sdk.go)

## Installation

To install the `aelf-sdk.go` package, run the following command:

```sh
go get -u github.com/AElfProject/aelf-sdk.go
```

## Examples


### Create instance

Create a new instance of `AElfClient` and set the URL of an AElf chain node:

```go
import ("github.com/AElfProject/aelf-sdk.go/client")

var aelf = client.AElfClient{
    Host:       "http://127.0.0.1:8000",
    Version:    "1.0",
    PrivateKey: "cd86ab6347d8e52bbbe8532141fc59ce596268143a308d1d40fedf385528b458",
}
```

### Initiating a Transfer Transaction

Here is an example of how to initiate a transfer transaction using the aelf Go SDK:


```go
// Get token contract address.
tokenContractAddress, _ := aelf.GetContractAddressByName("AElf.ContractNames.Token")
fromAddress := aelf.GetAddressFromPrivateKey(aelf.PrivateKey)
methodName := "Transfer"
toAddress, _ := util.Base58StringToAddress("7s4XoUHfPuqoZAwnTV7pHWZAaivMiL8aZrDSnY9brE1woa8vz")

params := &pb.TransferInput{
    To:     toAddress,
    Symbol: "ELF",
    Amount: 1000000000,
    Memo:   "transfer in demo",
}
paramsByte, _ := proto.Marshal(params)

// Generate a transfer transaction.
transaction, _ := aelf.CreateTransaction(fromAddress, tokenContractAddress, methodName, paramsByte)
signature, _ := aelf.SignTransaction(aelf.PrivateKey, transaction)
transaction.Signature = signature

// Send the transfer transaction to AElf chain node.
transactionByets, _ := proto.Marshal(transaction)
sendResult, _ := aelf.SendTransaction(hex.EncodeToString(transactionByets))

time.Sleep(time.Duration(4) * time.Second)
transactionResult, _ := aelf.GetTransactionResult(sendResult.TransactionID)
fmt.Println(transactionResult)

// Query account balance.
ownerAddress, _ := util.Base58StringToAddress(fromAddress)
getBalanceInput := &pb.GetBalanceInput{
    Symbol: "ELF",
    Owner:  ownerAddress,
}
getBalanceInputByte, _ := proto.Marshal(getBalanceInput)

getBalanceTransaction, _ := aelf.CreateTransaction(fromAddress, tokenContractAddress, "GetBalance", getBalanceInputByte)
getBalanceTransaction.Params = getBalanceInputByte
getBalanceSignature, _ := aelf.SignTransaction(aelf.PrivateKey, getBalanceTransaction)
getBalanceTransaction.Signature = getBalanceSignature

getBalanceTransactionByets, _ := proto.Marshal(getBalanceTransaction)
getBalanceResult, _ := aelf.ExecuteTransaction(hex.EncodeToString(getBalanceTransactionByets))
balance := &pb.GetBalanceOutput{}
getBalanceResultBytes, _ := hex.DecodeString(getBalanceResult)
proto.Unmarshal(getBalanceResultBytes, balance)
fmt.Println(balance)
```



## Web API

You can see how the Web API of the node works at `{chainAddress}/swagger/index.html`. For example, on a local address: `http://127.0.0.1:1235/swagger/index.html`.

The usage of these methods is based on the `AElfClient` instance. If you don’t have one, please create it:

```go
import ("github.com/AElfProject/aelf-sdk.go/client")

var aelf = client.AElfClient{
    Host:       "http://127.0.0.1:8000",
    Version:    "1.0",
    PrivateKey: "680afd630d82ae5c97942c4141d60b8a9fedfa5b2864fca84072c17ee1f72d9d",
}
```


### GetChainStatus

- **Web API path**: `/api/blockChain/chainStatus`

- **Parameters** : None

- **Returns**: 
   - `ChainStatusDto`

      - `ChainId` - string
      - `Branches` - map[string]interface{}
      - `NotLinkedBlocks` - map[string]interface{}
      - `LongestChainHeight` - int64
      - `LongestChainHash` - string
      - `GenesisBlockHash` - string
      - `GenesisContractAddress` - string
      - `LastIrreversibleBlockHash` - string
      - `LastIrreversibleBlockHeight` - int64
      - `BestChainHash` - string
      - `BestChainHeight` - int64


#### Example:

```go
chainStatus, err := aelf.GetChainStatus()
```

### GetContractFileDescriptorSet

Get the protobuf definitions related to a contract.

- **Web API path**: `/api/blockChain/contractFileDescriptorSet`

- **Parameters** :
    - contractAddress - string

- **Returns**: `[]byte`


#### Example:

```go
contractFile, err := aelf.GetContractFileDescriptorSet("pykr77ft9UUKJZLVq15wCH8PinBSjVRQ12sD1Ayq92mKFsJ1i")
```

### GetBlockHeight

Get the current best height of the chain.

- **Web API path**: `/api/blockChain/blockHeight`

- **Parameters** : None

- **Returns**: `float64`


#### Example:

```go
height, err := aelf.GetBlockHeight()
```

### GetBlock

Get block information by block hash.


- **Web API path**: `/api/blockChain/block`

- **Parameters** : 
   - `blockHash` - string
   - `includeTransactions` - bool

- **Returns**: 

   - `BlockDto`

      - `BlockHash` - string
      - `Header` - BlockHeaderDto
         - `PreviousBlockHash` - string
         - `MerkleTreeRootOfTransactions` - string
         - `MerkleTreeRootOfWorldState` - string
         - `Extra` - string
         - `Height` - int64
         - `Time` - string
         - `ChainId` - string
         - `Bloom` - string
         - `SignerPubkey` - string
      - `Body` - BlockBodyDto
         - `TransactionsCount` - int
         - `Transactions` - []string


#### Example:

```go
block, err := aelf.GetBlockByHash(blockHash, true)
```


### GetBlockByHeight

- **Web API path**: `/api/blockChain/blockByHeight`

- **Parameters** : 
   - `blockHeight` - int64
   - `includeTransactions` - bool

- **Returns**: 

   - `BlockDto`

      - `BlockHash` - string
      - `Header` - BlockHeaderDto
         - `PreviousBlockHash` - string
         - `MerkleTreeRootOfTransactions` - string
         - `MerkleTreeRootOfWorldState` - string
         - `Extra` - string
         - `Height` - int64
         - `Time` - string
         - `ChainId` - string
         - `Bloom` - string
         - `SignerPubkey` - string
      - `Body` - BlockBodyDto
         - `TransactionsCount` - int
         - `Transactions` - []string


#### Example:

```go
block, err := aelf.GetBlockByHeight(100, true)
```

### GetTransactionResult

- **Web API path**: `/api/blockChain/transactionResult`

- **Parameters** : 
   - `transactionId` - string

- **Returns**: 

   - `TransactionResultDto`

      - `TransactionId` - string
      - `Status` - string
      - `Logs` - []LogEventDto
         - `Address` - string
         - `Name` - string
         - `Indexed` - []string
         - `NonIndexed` - string
      - `Bloom` - string
      - `BlockNumber` - int64
      - `BlockHash` - string
      - `Transaction` - TransactionDto
         - `From` - string
         - `To` - string
         - `RefBlockNumber` - int64
         - `RefBlockPrefix` - string
         - `MethodName` - string
         - `Params` - string
         - `Signature` - string
      - `ReturnValue` - string
      - `Error` - string


#### Example:

```go
transactionResult, err := aelf.GetTransactionResult(transactionID)
```


### GetTransactionResults

Get multiple transaction results in a block.

- **Web API path**: `/api/blockChain/transactionResults`

- **Parameters** : 
   - `blockHash` - string
   - `offset` - int
   - `limit` - int

- **Returns**: `[]TransactionResultDto`
   - the transaction result object


#### Example:

```go
transactionResults, err := aelf.GetTransactionResults(blockHash, 0, 10)
```

### GetTransactionPoolStatus

- **Web API path**: `/api/blockChain/transactionPoolStatus`

- **Parameters** : None

- **Returns**: `TransactionPoolStatusOutput`

   - `Queued` - int
   - `Validated` - int


#### Example:

```go
poolStatus, err := aelf.GetTransactionPoolStatus();
```

### SendTransaction

- **Web API path**: `/api/blockChain/sendTransaction` (POST)

- **Parameters** : 
   - `SendRawTransactionInput` - Serialization of data into protobuf data:
      - `RawTransaction` - string

- **Returns**: 

   - `SendTransactionOutput`
      - `TransactionId` - string


#### Example:

```go
sendResult, err := aelf.SendTransaction(input)
```

### SendRawTransaction

- **Web API path**: `/api/blockChain/sendTransaction` (POST)

- **Parameters** : 
   - `SendRawTransactionInput` - Serialization of data into protobuf data:
      - `RawTransaction` - string
      - `Signature` - string
      - `ReturnTransaction` - bool

- **Returns**: 

   - `SendRawTransactionOutput`
      - `TransactionId` - string
      - `Transaction` - TransactionDto


#### Example:

```go
sendRawResult, err := aelf.SendRawTransaction(input)
```



### SendTransactions

- **Web API path**: `/api/blockChain/sendTransactions` (POST)

- **Parameters** : 
   - `rawTransactions` - string - - Serialization of data into protobuf data:

- **Returns**: `[]interface{}`


#### Example:

```go
results, err := aelf.SendTransactions(transactions)
```


### CreateRawTransaction

Creates an unsigned serialized transaction.


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

```go
result, err := aelf.CreateRawTransaction(input)
```


### ExecuteTransaction

Call a read-only method on a contract.


- **Web API path**: `/api/blockChain/executeTransaction` (POST)

- **Parameters** : 
   - `rawTransaction` - string

- **Returns**: `string`


#### Example:

```go
executeresult, err := aelf.ExecuteTransaction(rawTransaction)
```


### ExecuteRawTransaction

Call a read-only method on a contract.


- **Web API path**: `/api/blockChain/executeRawTransaction` (POST)

- **Parameters** : 
   - `ExecuteRawTransactionDto` - Serialization of data into protobuf data:
       - `RawTransaction` - string
       - `Signature` - string

- **Returns**: `string`


#### Example:

```go
executeRawresult, err := aelf.ExecuteRawTransaction(executeRawinput)
```


### GetPeers

Get peer info about the connected network nodes.

- **Web API path**: `/api/net/peers`

- **Parameters** : 
   - `withMetrics` - bool

- **Returns**: 

   - `[]PeerDto`

      - `IpAddress` - string
      - `ProtocolVersion` - int
      - `ConnectionTime` - int64
      - `ConnectionStatus` - string
      - `Inbound` - bool
      - `BufferedTransactionsCount` - int
      - `BufferedBlocksCount` - int
      - `BufferedAnnouncementsCount` - int
      - `NodeVersion` - string
      - `RequestMetrics` - []RequestMetric
         - `RoundTripTime` - int64
         - `MethodName` - string
         - `Info` - string
         - `RequestTime` - string



#### Example:

```go
peers, err := aelf.GetPeers(false)
```


### AddPeer

Attempts to add a node to the connected network nodes.


- **Web API path**: `/api/net/peer` (POST)

- **Parameters** : 

   - `ipAddress` - string

- **Returns**: `bool`

#### Example:

```go
addResult, err := aelf.AddPeer("127.0.0.1:7001")
```


### RemovePeer

Attempts to remove a node from the connected network nodes.


- **Web API path**: `/api/net/peer` (DELETE)

- **Parameters** : 

   - `ipAddress` - string

- **Returns**: `bool`

#### Example:

```go
removeResult, err := aelf.RemovePeer("127.0.0.1:7001")
```


### CalculateTransactionFee

Estimate transaction fee.


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

```go
calculateTransactionFee, err := aelf.CalculateTransactionFee(transactionFeeInput)
```


### GetNetworkInfo

Get the network information of the node.


- **Web API path**: `/api/net/networkInfo`

- **Parameters** : Empty

- **Returns**: 

   - `NetworkInfoOutput`
      - `Version` - string
      - `ProtocolVersion` - int
      - `Connections` - int

#### Example:

```go
networkInfo, err := aelf.GetNetworkInfo()
```



## aelf Client

### IsConnected

Check if the SDK is successfully connected to the blockchain.

- **Parameters**: None

- **Returns** :
   - `bool`: Connection status

#### Example:

```go
isConnected := aelf.IsConnected()
```


### GetGenesisContractAddress

- **Parameters**: None

- **Returns** :
   - `string`: Genesis contract address

#### Example:

```go
contractAddress, err := aelf.GetGenesisContractAddress()
```


### GetContractAddressByName

Get the address of a contract by its name hash.

- **Parameters**:
   - `contractNameHash` (string): Hash of the contract name

- **Returns** :
   - `string`: Contract address

#### Example:

```go
contractAddress, err := aelf.GetContractAddressByName("AElf.ContractNames.Token")
```


### CreateTransaction

Build a transaction with the provided parameters.

- **Parameters**:
   - `from` (string): Sender's address
   - `to` (string): Recipient's address
   - `methodName` (string): Method name
   - `params` ([]byte): Method parameters

- **Returns** :
   - `Transaction`: Built transaction

#### Example:

```go
transaction, err := aelf.CreateTransaction(fromAddress, toAddress, methodName, param)
```


### GetFormattedAddress

Convert an address to a displayable string format: symbol_base58-string_base58-string-chain-id.

- **Parameters**:
   - `address` (string): Address to format

- **Returns** :
   - `string`: Formatted address

#### Example:

```go
formattedAddress, err := aelf.GetFormattedAddress(address)
```

### SignTransaction

Sign a transaction using a private key.

- **Parameters**:
   - `privateKey` (string): Address to format
   - `transaction` (string): Address to format

- **Returns** :
   - `[]byte`: Transaction signature

#### Example:

```go
signature, err := aelf.SignTransaction(privateKey, transaction)
```


### GetAddressFromPubKey

- **Parameters**:
   - `pubKey` (string): Public key

- **Returns** :
   - `string`: Account address

#### Example:

```go
address := aelf.GetAddressFromPubKey(pubKey)
```


### GetAddressFromPrivateKey

- **Parameters**:
   - `privateKey` (string): Private key

- **Returns** :
   - `string`: Account address

#### Example:

```go
address := aelf.GetAddressFromPrivateKey(privateKey)
```


### GenerateKeyPairInfo

- **Parameters**: None

- **Returns** :

   - `KeyPairInfo`
      - `PrivateKey` 
      - `PublicKey` 
      - `Address`

#### Example:

```go
keyPair := aelf.GenerateKeyPairInfo()
```


## Supported Go Version

- Go 1.13
