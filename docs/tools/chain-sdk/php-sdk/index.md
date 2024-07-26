---
sidebar_position: 5
title: PHP SDK
description: PHP SDK
image: /img/Logo.aelf.svg
---

# aelf-sdk.php - aelf PHP API

## Introduction

aelf-sdk.php for aelf is similar to web.js for Ethereum. It consists of libraries that enable interaction with a local or remote aelf node via HTTP.

This documentation will guide you through the installation and usage of aelf-sdk.php, with examples included. For more information, visit the [aelf-sdk.php repository](https://github.com/AElfProject/aelf-sdk.php).

## Adding aelf PHP SDK

To install the library via Composer, run the following commands in your console:

```sh
composer require aelf/aelf-sdk dev-dev
composer require curl/curl
```

If you cloned the SDK directly, you must install Composer and run it in the root directory:

```json
{
  "require": {
    "aelf/aelf-sdk": "dev-dev"
  }
}
```

## Examples

### 1. Create an Instance

Create a new instance of AElf and connect to an AELF chain node. Using this instance, you can call the AElf APIs.

```php
require_once 'vendor/autoload.php';
use AElf\AElf;

$url = 'http://127.0.0.1:8000';
$aelf = new AElf($url);
```

### 2. Get a System Contract Address

Get a system contract address. For example, to get the address of `AElf.ContractNames.Token`:

```php
require_once 'vendor/autoload.php';
use AElf\AElf;
use AElf\Protobuf\Generated\Hash;

$url = 'http://127.0.0.1:8000';
$aelf = new AElf($url);

$privateKey = 'cd86ab6347d8e52bbbe8532141fc59ce596268143a308d1d40fedf385528b458';
$bytes = new Hash();
$bytes->setValue(hex2bin(hash('sha256', 'AElf.ContractNames.Token')));
$contractAddress = $aelf->GetContractAddressByName($privateKey, $bytes);
```

### 3. Send a Transaction

Get the contract address and then send a transaction.

```php
require_once 'vendor/autoload.php';
use AElf\AElf;
use BitWasp\Bitcoin\Key\PrivateKeyFactory;

$url = 'http://127.0.0.1:8000';
$aelf = new AElf($url);

$privateKey = 'cd86ab6347d8e52bbbe8532141fc59ce596268143a308d1d40fedf385528b458';
$aelfEcdsa = new BitcoinECDSA();
$aelfEcdsa->setPrivateKey($privateKey);
$publicKey = $aelfEcdsa->getUncompressedPubKey();
$address = $aelfEcdsa->hash256(hex2bin($publicKey));
$address = $address . substr($aelfEcdsa->hash256(hex2bin($address)), 0, 8);
$base58Address = $aelfEcdsa->base58_encode($address);

$params = new Hash();
$params->setValue(hex2bin(hash('sha256', 'AElf.ContractNames.Vote')));
$methodName = "GetContractAddressByName";
$toAddress = $aelf->getGenesisContractAddress();

$transactionObj = $aelf->generateTransaction($base58Address, $toAddress, $methodName, $params);
$signature = $aelf->signTransaction($privateKey, $transactionObj);
$transactionObj->setSignature(hex2bin($signature));

$executeTransactionDtoObj = ['RawTransaction' => bin2hex($transactionObj->serializeToString())];
$result = $aelf->sendTransaction($executeTransactionDtoObj);
print_r($result);
```

## Web API

You can access the Web API of your aelf node at:

```base
{chainAddress}/swagger/index.html
```

**Example**: For a local address: `http://127.0.0.1:1235/swagger/index.html`

Before using the methods, make sure you have an instance of AElf:

```php
require_once 'vendor/autoload.php';
use AElf\AElf;
// create a new instance of AElf
$url = '127.0.0.1:8000';
$aelf = new AElf($url);
```

### 1. Get Chain Status

- **API Path**: `/api/blockChain/chainStatus`

- **Parameters**: None

- **Returns**:

  - `Array`
    - `ChainId` - String
    - `Branches` - Array
    - `NotLinkedBlocks` - Array
    - `LongestChainHeight` - Integer
    - `LongestChainHash` - String
    - `GenesisBlockHash` - String
    - `GenesisContractAddress` - String
    - `LastIrreversibleBlockHash` - String
    - `LastIrreversibleBlockHeight` - Integer
    - `BestChainHash` - String
    - `BestChainHeight` - Integer

- **Example** :

```php
// create a new instance of AElf
$aelf = new AElf($url);

$chainStatus = $aelf->getChainStatus();
print_r($chainStatus);
```

### 2. Get Block Height

- **API Path**: `/api/blockChain/blockHeight`

- **Parameters**: None

- **Returns**: Integer

- **Example** :

```php
$aelf = new AElf($url);

$height = $aelf->getBlockHeight();
print($height);
```

### 3. getBlock

- **API Path**: `/api/blockChain/block`

- **Parameters**:

  - `block_hash` (String)
  - `include_transactions` (Boolean)

- **Returns**:

  - `Array`
    - `BlockHash` - String
    - `Header` - Array
      - `PreviousBlockHash` - String
      - `MerkleTreeRootOfTransactions` - String
      - `MerkleTreeRootOfWorldState` - String
      - `Extra` - List
      - `Height` - Integer
      - `Time` - String
      - `ChainId` - String
      - `Bloom` - String
      - `SignerPubkey` - String
    - `Body` - Array
      - `TransactionsCount` - Integer
      - `Transactions` - Array
        - `transactionId` - String

- **Example** :

```php
$aelf = new AElf($url);

$block = $aelf->getBlockByHeight(1, true);
$block2 = $aelf->getBlockByHash($block['BlockHash'], false);
print_r($block2);
```

### 4. Get Block by Height

- **API Path**: `/api/blockChain/blockByHeight`

- **Parameters**:

  - `block_height` (Number)
  - `include_transactions` (Boolean)

- **Returns**:

  - `Array`
    - `BlockHash` - String
    - `Header` - Array
      - `PreviousBlockHash` - String
      - `MerkleTreeRootOfTransactions` - String
      - `MerkleTreeRootOfWorldState` - String
      - `Extra` - List
      - `Height` - Integer
      - `Time` - String
      - `ChainId` - String
      - `Bloom` - String
      - `SignerPubkey` - String
    - `Body` - Array
      - `TransactionsCount` - Integer
      - `Transactions` - Array
        - `transactionId` - String

- **Example** :

```php
$aelf = new AElf($url);

$block = $aelf->getBlockByHeight(1, true);
print_r($block);
```

### 5. Get Transaction Result

- **API Path**: `/api/blockChain/transactionResult`

- **Parameters**:

  - `transactionId` (String)

- **Returns**:

  - `Object`
    - `TransactionId` - String
    - `Status` - String
    - `Logs` - Array
      - `Address` - String
      - `Name` - String
      - `Indexed` - Array
      - `NonIndexed` - String
    - `Bloom` - String
    - `BlockNumber` - Integer
    - `Transaction` - Array
      - `From` - String
      - `To` - String
      - `RefBlockNumber` - Integer
      - `RefBlockPrefix` - String
      - `MethodName` - String
      - `Params` - json
      - `Signature` - String
        - `transactionId` - String
    - `ReadableReturnValue` - String
    - `Error` - String

- **Example** :

```php
$aelf = new AElf($url);

$block = $aelf->getBlockByHeight(1, true);
$transactionResult = $aelf->getTransactionResult($block['Body']['Transactions'][0]);
print_r($transactionResult);
```

### 6. Get Multiple Transaction Results

- **API Path**: `/api/blockChain/transactionResults`

- **Parameters**:

  - `blockHash` (String)
  - `offset` (Number)
  - `limit` (Number)

- **Returns**:

  - `List` - The array of method descriptions:
    - the transaction result object

- **Example** :

```php
$aelf = new AElf($url);

$block = $aelf->getBlockByHeight(1, true);
$transactionResults = $aelf->getTransactionResults($block['Body']);
print_r($transactionResults);
```

### 7. Get Transaction Pool Status

- **API Path**: `/api/blockChain/transactionPoolStatus`

- **Example** :

```php
$aelf = new AElf($url);

$status = $aelf->getTransactionPoolStatus();
print_r($status);
```

### 8. Send Transaction

- **API Path**: `/api/blockChain/sendTransaction`

- **Method**: POST

- **Parameters**:

  - `transaction` (String)

- **Example** :

```php
$params = new Hash();
$params->setValue(hex2bin(hash('sha256', 'AElf.ContractNames.Vote')));
$transaction = buildTransaction($aelf->getGenesisContractAddress(), 'GetContractAddressByName', $params);
$executeTransactionDtoObj = ['RawTransaction' => bin2hex($transaction->serializeToString())];
$result = $aelf->sendTransaction($executeTransactionDtoObj);
print_r($result);
```

### 9. Send Multiple Transactions

- **API Path**: `/api/blockChain/sendTransactions`

- **Method**:POST

- **Parameters**:

  - `transactions` (String)

- **Example** :

```php
$aelf = new AElf($url);

$paramsList = [$params1, $params2];
$rawTransactionsList = [];
foreach ($paramsList as $param) {
    $transactionObj = buildTransaction($toAddress, $methodName, $param);
    $rawTransactions = bin2hex($transactionObj->serializeToString());
    array_push($rawTransactionsList, $rawTransactions);
}
$sendTransactionsInputs = ['RawTransactions' => implode(',', $rawTransactionsList)];
$listString = $aelf->sendTransactions($sendTransactionsInputs);
print_r($listString);
```

### 10. Get Peers

- **API Path**: `/api/net/peers`

- **Example** :

```php
print_r($aelf->getPeers(true));
```

### 11. Add Peer

- **API Path**: `/api/net/peer`

- **Method**: POST

- **Parameters**:

  - `peer_address` (String)

- **Example** :

```php
$aelf->addPeer($url);
```

### 12. Remove Peer

- **API Path**: `/api/net/peer`

- **Parameters**:

  - `peer_address` (String)

- **Example** :

```php
$aelf->removePeer($url);
```

### 13. Create Raw Transaction

- **API Path**: `/api/blockchain/rawTransaction`

- **Method**: POST

- **Parameters**:

  - `transaction` (Array)

- **Returns**:

  - `Array`
    - `RawTransaction` - hex string bytes generated by transaction information

- **Example** :

```php
$aelf = new AElf($url);

$status = $aelf->getChainStatus();
$params = base64_encode(hex2bin(hash('sha256', 'AElf.ContractNames.Consensus')));
$param = array('value' => $params);
$transaction = [
    "from" => $aelf->getAddressFromPrivateKey($privateKey),
    "to" => $aelf->getGenesisContractAddress(),
    "refBlockNumber" => $status['BestChainHeight'],
    "refBlockHash" => $status['BestChainHash'],
    "methodName" => "GetContractAddressByName",
    "params" => json_encode($param)
];
$rawTransaction = $aelf->createRawTransaction($transaction);
print_r($rawTransaction);
```

### 14. Send Raw Transaction

- **API Path**: `/api/blockchain/sendRawTransaction`

- **Parameters**:

  - `Transaction` (raw transaction)
  - `Signature` (signature)
  - `ReturnTransaction` (indicates whether to return transaction)

- **Example** :

```php
$aelf = new AElf($url);

$rawTransaction = $aelf->createRawTransaction($transaction);
$transactionId = hash('sha256', hex2bin($rawTransaction['RawTransaction']));
$sign = $aelf->getSignatureWithPrivateKey($privateKey, $transactionId);
$transaction = array('Transaction' => $rawTransaction['RawTransaction'], 'signature' => $sign, 'returnTransaction' => true);
$execute = $aelf->sendRawTransaction($transaction);
print_r($execute);
```

### 15. Execute Raw Transaction

- **API Path**: `/api/blockchain/executeRawTransaction`

- **Method**: POST

- **Parameters**:

  - `RawTransaction` (raw transaction)
  - `Signature` (signature)

- **Example** :

```php
$aelf = new AElf($url);

$rawTransaction = $aelf->createRawTransaction($transaction);
$transactionId = hash('sha256', hex2bin($rawTransaction['RawTransaction']));
$sign = $aelf->getSignatureWithPrivateKey($privateKey, $transactionId);
$transaction = array('RawTransaction' => $rawTransaction['RawTransaction'], 'signature' => $sign);
$execute = $aelf->executeRawTransaction($transaction);
print_r($execute);
```

### 16. Get Merkle Path by Transaction ID

- **API Path**: `/api/blockchain/merklePathByTransactionId`

- **Parameters**:

  - `transactionId` (String)

- **Example** :

```php
$aelf = new AElf($url);

$block = $aelf->getBlockByHeight(1, true);
$merklePath = $aelf->getMerklePathByTransactionId($block['Body']['Transactions'][0]);
print_r($merklePath);
```

### 17. Calculate Transaction Fee

- **API Path**: `/api/blockChain/calculateTransactionFee`

- **Method**: POST

- **Parameters**:

  - `CalculateTransactionFeeInput` (Object)

- **Returns**:

  - `CalculateTransactionFeeOutput (Object)`

    - `Success` - bool
    - `TransactionFee` - Array
    - `ResourceFee` - Array

- **Example** :

```php
$aelf = new AElf($url);

$calculateTransactionFeeInputParam = [
    "rawTransaction" => $rawTransactionInput,
];
$result = $aelf->calculateTransactionFee($calculateTransactionFeeInputParam);
print_r($result);
```

### 18. Get Network Info

- **API Path**: `/api/net/networkInfo`

- **Example** :

```php
$aelf = new AElf($url);

print_r($aelf->getNetworkInfo());
```

### 19. Get Contract File Descriptor Set

- **API Path**: `/api/blockchain/contractFileDescriptorSet`

- **Example** :

```php
$aelf = new AElf($url);

$blockDto = $aelf->getBlockByHeight($blockHeight, false);
$transactionResultDtoList = $aelf->getTransactionResults($blockDto['BlockHash'], 0, 10);
foreach ($transactionResultDtoList as $v) {
  $request = $aelf->getContractFileDescriptorSet($v['Transaction']['To']);
  print_r($request);
}
```

### 20. Get Task Queue Status

- **API Path**: `/api/blockchain/taskQueueStatus`

- **Example** :

```php
$aelf = new AElf($url);

$taskQueueStatus = $aelf->getTaskQueueStatus();
print_r($taskQueueStatus);
```

### 21. Execute Transaction

- **API Path**: `/api/blockchain/executeTransaction`

- **Example** :

```php
$aelf = new AElf($url);

$methodName = "GetNativeTokenInfo";
$bytes = new Hash();
$bytes->setValue(hex2bin(hash('sha256', 'AElf.ContractNames.Token')));
$toAddress = $aelf->GetContractAddressByName($privateKey, $bytes);
$param = new Hash();
$param->setValue('');
$transaction = $aelf->generateTransaction($fromAddress, $toAddress, $methodName, $param);
$signature = $aelf->signTransaction($privateKey, $transaction);
$transaction->setSignature(hex2bin($signature));
$executeTransactionDtoObj = ['RawTransaction' => bin2hex($transaction->serializeToString())];
$response = $aelf->executeTransaction($executeTransactionDtoObj);
$tokenInfo = new TokenInfo();
$tokenInfo->mergeFromString(hex2bin($response));
```

## Other Tool Kit

aelf supplies some APIs to simplify development.

### 1. Get Chain Id

```php
$aelf = new AElf($url);

$chainId = $aelf->getChainId();
print_r($chainId);
```

### 2. Generate Transaction

```php
$aelf = new AElf($url);

$param = new Hash();
$param->setValue('');
$transaction = $aelf->generateTransaction($fromAddress, $toAddress, $methodName, $param);
```

### 3. Sign Transaction

```php
$aelf = new AElf($url);

$transaction = $aelf->generateTransaction($fromAddress, $toAddress, $methodName, $param);
$signature = $aelf->signTransaction($privateKey, $transaction);
```

### 4. Get Genesis Contract Address

```php
$aelf = new AElf($url);

$genesisContractAddress = $aelf->getGenesisContractAddress();
print_r($genesisContractAddress);
```

### 5. Get Address From PubKey

Calculate the account address according to the public key.

```php
$aelf = new AElf($url);

$pubKeyAddress = $aelf->getAddressFromPubKey('04166cf4be901dee1c21f3d97b9e4818f229bec72a5ecd56b5c4d6ce7abfc3c87e25c36fd279db721acf4258fb489b4a4406e6e6e467935d06990be9d134e5741c');
print_r($pubKeyAddress);
```

### 6. Get Formatted Address

Convert the address to the displayed string: symbol_base58-string_base58-string_chain_id.

```php
$aelf = new AElf($url);

$addressVal = $aelf->getFormattedAddress($privateKey, $base58Address);
print_r($addressVal);
```

### 7. Generate Key Pair Info

Generate a new key pair using ECDSA.

```php
$aelf = new AElf($url);

$pairInfo = $aelf->generateKeyPairInfo();
print_r($pairInfo);
```

### 8. Get Contract Address By Name

```php
$aelf = new AElf($url);

$bytes = new Hash();
$bytes->setValue(hex2bin(hash('sha256', 'AElf.ContractNames.Token')));
$contractAddress = $aelf->GetContractAddressByName($privateKey, $bytes);
print_r($contractAddress);
```

### 9. Get Address From Private Key

```php
$aelf = new AElf($url);

$address = $aelf->getAddressFromPrivateKey($privateKey);
print_r($address);
```

### 10. Get Signature With Private Key

```php
$aelf = new AElf($url);

$sign = $aelf->getSignatureWithPrivateKey($privateKey, $transactionId);
print_r($sign);
```

### 11. Is Connected

```php
$aelf = new AElf($url);

$isConnected = $this->aelf->isConnected();
print_r($isConnected);
```

### 12. Get Transaction Fees

Get the transaction fee from the transaction result.

```php
$aelf = new AElf($url);

$block = $aelf->getBlockByHeight(1, true);
$transactionResult = $aelf->getTransactionResult($block['Body']['Transactions'][0]);
$transactionFees = $aelf->getTransactionFees($transactionResult);
print_r($transactionFees);
```

## AElf.version

```php
Copy code
$aelf = new AElf($url);

$version = $aelf->version;
```

## Requirements

- [**php**](https://php.net)

## About contributing

Read out [contributing guide](../../../resources/contribution/index.md)

## About Version

[https://semver.org/](https://semver.org/)
