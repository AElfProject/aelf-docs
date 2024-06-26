---
sidebar_position: 1
title: Javascript SDK
description: Javascript SDK
---

# aelf-sdk.js - aelf JavaScript API

## Introduction

The `aelf-sdk.js` library for aelf is similar to web3.js for Ethereum. It allows you to interact with a local or remote aelf node using an HTTP connection.

This guide will help you install and use `aelf-sdk.js`, with an API reference and examples.

For more details, check out the repository: [aelf-sdk.js](https://github.com/AElfProject/aelf-web3.js).


## Adding aelf-sdk.js

First, you need to add `aelf-sdk.js` to your project. You can do this using the following methods


### Using npm

```base
npm install aelf-sdk
```

### Pure JS

Add the script link in your HTML: 

```javascript
<script src="https://unpkg.com/aelf-sdk@latest/dist/aelf.umd.js"></script>
```

Then, create an aelf instance and set a provider.

```javascript
// In Node.js
const AElf = require('aelf-sdk');
const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:8000'));

// In browser
// <script src="https://unpkg.com/aelf-sdk@latest/dist/aelf.umd.js"></script>
```


## Examples

You can find more examples in the `./examples` directory.

### Create Instance

```javascript
import AElf from 'aelf-sdk';

// Create a new instance of AElf
const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));
```

### Create or Load a Wallet

```javascript
// Create a new wallet
const newWallet = AElf.wallet.createNewWallet();

// Load a wallet by private key
const privateKeyWallet = AElf.wallet.getWalletByPrivateKey('your-private-key');

// Load a wallet by mnemonic
const mnemonicWallet = AElf.wallet.getWalletByMnemonic('your-mnemonic');
```


### Get a System Contract Address

```javascript
const tokenContractName = 'AElf.ContractNames.Token';
let tokenContractAddress;

(async () => {
  // Get chain status
  const chainStatus = await aelf.chain.getChainStatus();
  // Get genesis contract address
  const GenesisContractAddress = chainStatus.GenesisContractAddress;
  // Get genesis contract instance
  const zeroContract = await aelf.chain.contractAt(GenesisContractAddress, newWallet);
  // Get contract address by the read-only method 'GetContractAddressByName' of genesis contract
  tokenContractAddress = await zeroContract.GetContractAddressByName.call(AElf.utils.sha256(tokenContractName));
})();
```


### Get a Contract Instance

```javascript
const wallet = AElf.wallet.createNewWallet();
let tokenContract;

// Async method
(async () => {
  tokenContract = await aelf.chain.contractAt(tokenContractAddress, wallet);
})();

// Promise method
aelf.chain.contractAt(tokenContractAddress, wallet)
  .then(result => {
    tokenContract = result;
  });

// Callback method
aelf.chain.contractAt(tokenContractAddress, wallet, (error, result) => {
  if (error) throw error;
  tokenContract = result;
});
```


### Use Contract Instance

How to use a contract instance. You can call methods in two ways: read-only and send transaction.

```javascript
(async () => {
  // Read-only method: Get the balance of an address
  const balanceResult = await tokenContract.GetBalance.call({
    symbol: "ELF",
    owner: "7s4XoUHfPuqoZAwnTV7pHWZAaivMiL8aZrDSnY9brE1woa8vz"
  });
  console.log(balanceResult);
  /**
  {
    "symbol": "ELF",
    "owner": "7s4XoUHfPuqoZAwnTV7pHWZAaivMiL8aZrDSnY9brE1woa8vz",
    "balance": "1000000000000"
  }
  */

  // Send transaction method: Transfer tokens
  const transactionId = await tokenContract.Transfer({
    symbol: "ELF",
    to: "7s4XoUHfPuqoZAwnTV7pHWZAaivMiL8aZrDSnY9brE1woa8vz",
    amount: "1000000000",
    memo: "transfer in demo"
  });
  console.log(transactionId);
  /**
  {
    "TransactionId": "123123"
  }
  */
})();
```


### Change the Node Endpoint

```javascript
import AElf from 'aelf-sdk';

const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));
aelf.setProvider(new AElf.providers.HttpProvider('http://127.0.0.1:8000'));
```


## Web API

You can access the Web API of your aelf node at `{chainAddress}/swagger/index.html`. 

For example, if your local node address is `http://127.0.0.1:1235`, you can view the Web API at `http://127.0.0.1:1235/swagger/index.html`.

The methods below use an instance of aelf. If you don't have one, create it as shown:

```javascript
import AElf from 'aelf-sdk';

// Create a new instance of AElf, change the URL if needed
const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1235'));
```

### 1. Get Chain Status

Get the current status of the blockchain.

- **Web API Path**: `/api/blockChain/chainStatus`
- **Method**: GET
- **Parameters**: None
- **Returns**: Object with details like ChainId, LongestChainHeight, GenesisContractAddress, etc.


#### Example:

```javascript
aelf.chain.getChainStatus()
  .then(res => {
    console.log(res);
  });
```


### 2. Get Contract File Descriptor Set

Get the protobuf definitions related to a contract.

- **Web API Path**: `/api/blockChain/contractFileDescriptorSet`
- **Method**: GET
- **Parameters**: `contractAddress` (String)
- **Returns**: String.


#### Example:

```javascript
aelf.chain.getContractFileDescriptorSet(contractAddress)
  .then(res => {
    console.log(res);
  });
```


### 3. Get Block Height

Get the current best height of the chain.


- **Web API Path**: `/api/blockChain/blockHeight`
- **Method**: GET
- **Parameters**: None
- **Returns**: Number.


#### Example:

```javascript
aelf.chain.getBlockHeight()
  .then(res => {
    console.log(res);
  });
```


### 4. Get Block

Get block information by block hash.

- **Web API Path**: `/api/blockChain/block`
- **Method**: GET
- **Parameters**: `contractAddress` (String)
   - **`blockHash`** (String)
   - **`includeTransactions`** (Boolean)
- **Returns**: object with block details


#### Example:

```javascript
aelf.chain.getBlock(blockHash, false)
  .then(res => {
    console.log(res);
  });
```


### 5. Get Block By Height

Get block information by block height.

- **Web API Path**: `/api/blockChain/blockByHeight`
- **Method**: GET
- **Parameters**:
   - **`blockHash`** (String)
   - **`includeTransactions`** (Boolean)
- **Returns**: Object with block details


#### Example:

```javascript
aelf.chain.getBlockByHeight(12, false)
  .then(res => {
    console.log(res);
  });
```

### 6. Get Transaction Result


- **Web API Path**: `/api/blockChain/transactionResult`
- **Method**: GET
- **Parameters**: `transactionId` (String)
- **Returns**: Object with transaction details


#### Example:

```javascript
aelf.chain.getTxResult(transactionId)
  .then(res => {
    console.log(res);
  });
```

### 7. Get Multiple Transaction Results


- **Web API Path**: `/api/blockChain/transactionResults`
- **Method**: GET
- **Parameters**:
   - **`blockHash`** (String)
   - **`offset`** (Number)
   - **`limit`** (Number)
- **Returns**: Array of transaction result objects


#### Example:

```javascript
aelf.chain.getTxResults(blockHash, 0, 2)
  .then(res => {
    console.log(res);
  });
```

### 8. Get Transaction Pool Status


- **Web API Path**: `/api/blockChain/transactionPoolStatus`
- **Method**: GET
- **Parameters**: None
- **Returns**: Object with transaction pool status


### 9. Send Transaction


- **Web API Path**: `/api/blockChain/sendTransaction`
- **Method**: POST
- **Parameters**: `Object` (Serialized protobuf data with RawTransaction string)
- **Returns**: Transaction ID


### 10. Send Multiple Transactions


- **Web API Path**: `/api/blockChain/sendTransactions`
- **Method**: POST
- **Parameters**: `Object` (Serialized protobuf data with RawTransaction string)
- **Returns**: Transaction IDs


### 11. Call Read-Only Method


- **Web API Path**: `/api/blockChain/callReadOnly`
- **Method**: POST
- **Parameters**: `Object` (Serialized protobuf data with RawTransaction string)
- **Returns**: Method call result


### 12. Get Peers


- **Web API Path**: `/api/net/peers`
- **Method**: GET
- **Parameters**: `withMetrics` (Boolean)
- **Returns**: Array of peer info


### 13. Add Peer


- **Web API Path**: `/api/net/peer`
- **Method**: POST
- **Parameters**: `Object` (Address string)
- **Returns**: Status


### 14. Remove Peer


- **Web API Path**: `/api/net/peer`
- **Method**: DELETE
- **Parameters**: `address` (String)
- **Returns**: Status


### 15. Send Multiple Transactions


- **Web API Path**: `/api/blockChain/calculateTransactionFee`
- **Method**: POST
- **Parameters**:  `CalculateTransactionFeeInput` (Object with RawTransaction string)
- **Returns**: `CalculateTransactionFeeOutput` (Object with fee details)

#### Example

```javascript
aelf.chain.calculateTransactionFee(rawTransaction)
   .then(res => {
      console.log(res);
   });
```

### 16. Network Info


- **Web API Path**: `/api/net/networkInfo`
- **Method**: GET
- **Parameters**: None
- **Returns**: Network connection info



## AElf.wallet

`AElf.wallet` is a static property of `AElf`.


### 1. createNewWallet

**Returns:**

- **Object**

   - **`mnemonic - String`**: The mnemonic phrase for the wallet.
   - **`BIP44Path - String`**: The BIP44 path, formatted as m/purpose’/coin_type’/account’/change/address_index.
   - **`childWallet - Object`**: The Hierarchical Deterministic (HD) wallet object.
   - **`keyPair - String`**: The elliptic curve (EC) key pair.
   - **`privateKey - String`**: The private key for the wallet.
   - **`address - String`**: The wallet address.

#### Example:

```javascript
import AElf from 'aelf-sdk';
const wallet = AElf.wallet.createNewWallet();
console.log(wallet);
```


### 2. getWalletByMnemonic

Retrieves a wallet using a mnemonic phrase.


**Parameters:**

- **`mnemonic - String`**: The mnemonic phrase of the wallet.

**Returns:**

- **`Object`**: The complete wallet object.


#### Example:

```javascript
const wallet = AElf.wallet.getWalletByMnemonic(mnemonic);
console.log(wallet);
```


### 3. getWalletByPrivateKey

Retrieves a wallet using a private key.

**Parameters:**

- **`privateKey - String`**: The mnemonic phrase of the wallet.

**Returns:**

- **`Object`**: The complete wallet object, with an empty mnemonic.


#### Example:

```javascript
const wallet = AElf.wallet.getWalletByPrivateKey(privateKey);
console.log(wallet);
```


### 4. signTransaction

Signs a transaction using the wallet's key pair.

**Parameters:**

- **`rawTxn - String`**: The raw transaction data.
- **`keyPair - String`**: The key pair to sign the transaction.

**Returns:**

- **`Object`**: The signed transaction object.


#### Example:

```javascript
const result = AElf.wallet.signTransaction(rawTxn, keyPair);
console.log(result);
```


### 5. AESEncrypt

Encrypts a string using the AES algorithm.

**Parameters:**

- **`input - String`**: The input string to encrypt.
- **`password - String`**: The password to use for encryption.

**Returns:**

- **`String`**: The encrypted string.



### 6. AESDecrypt

Decrypts a string using the AES algorithm.

**Parameters:**

- **`input - String`**: The encrypted string.
- **`password - String`**: The password used for encryption.

**Returns:**

- **`String`**: The decrypted string.

These are the detailed functions and their usages for the AElf.wallet API. If you have any specific questions or need further clarification, feel free to ask!



## AElf.pbjs

Reference to protobuf.js. For detailed usage, refer to the [protobuf.js documentation](https://github.com/protobufjs/protobuf.js).


## AElf.pbUtils

Provides basic format methods for aelf. For detailed code, see `src/utils/proto.js`.


### AElf.utils

Contains utility methods for aelf. For detailed code, see `src/utils/utils.js`.


### Check address

Example to check if an address is valid using `base58` utility from aelf.

#### Example:

```javascript
const AElf = require('aelf-sdk');
const { base58 } = AElf.utils;

try {
  base58.decode('$address'); // replace '$address' with actual address
  console.log('Valid address');
} catch (error) {
  console.error('Invalid address', error);
}
```

## AElf.version

```javascript
import AElf from 'aelf-sdk';
console.log(AElf.version); // outputs the version, e.g., 3.2.23
```


## Requirements

To use aelf SDK, you need:

- [Node.js](https://nodejs.org/en)
- [NPM](https://www.npmjs.com/)


## Support

![browsers](https://img.shields.io/badge/browsers-latest%202%20versions-brightgreen.svg)
![node](https://img.shields.io/badge/node-%3E=10-green.svg)



## About contributing

Read out [contributing guide]


## About Version

AElf SDK follows Semantic Versioning. For more details, refer to [semver.org](https://semver.org/).
