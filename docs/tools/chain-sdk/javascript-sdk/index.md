---
sidebar_position: 1
title: Javascript SDK
description: Javascript SDK
image: /img/Logo.aelf.svg
---

# aelf-web3.js - aelf JavaScript API

## Introduction

The `aelf-web3.js` library for aelf is similar to web3.js for Ethereum. It allows you to interact with a local or remote aelf node using an HTTP connection.

#### This guide will help you:

- Install and use `aelf-web3.js`.

- Understand the available API.

For more details, check out the repository: [aelf-web3.js](https://github.com/AElfProject/aelf-web3.js).

## Quickstart

### 1. Adding aelf-web3.js

Now, You can add `aelf-web3.js` using **npm** or directly in your **HTML**.

- #### Using npm

```bash
npm install aelf-sdk
```

- #### Using Pure js

```bash
link dist/aelf.umd.js
```

### 2. Create an AElf Instance

Set up your AElf instance and connect to a provider.

#### Node.js

```js
const AElf = require("aelf-sdk");
const aelf = new AElf(
  new AElf.providers.HttpProvider("https://tdvw-test-node.aelf.io")
);
```

#### Frontend (Using PureJs)

- Include the script in your HTML file:

```js
<script src="https://unpkg.com/aelf-sdk@latest/dist/aelf.umd.js"></script>
<script>
  const aelf = new AElf(new AElf.providers.HttpProvider('https://tdvw-test-node.aelf.io'));
</script>
```

### 3. Choose the Right Package

You can skip this step, if Adding aelf-web3.js is enough

The `dist` directory provides packages for different environments.

| packages         | usage                                                    |
| ---------------- | -------------------------------------------------------- |
| dist/aelf.cjs.js | For node.js, excludes node built-in modules like crypto. |
| dist/aelf.umd.js | For browsers, includes necessary node built-in modules.  |

#### For Beginner in Frontend

- Add the UMD package to your HTML:

```html
<!-- minified version with UMD module -->
<script src="https://unpkg.com/aelf-sdk@lastest/dist/aelf.umd.js"></script>
```

### 4. Use with Bundlers

If you want to use a bundler like Webpack or Rollup, import the specified version of the package files.

#### For Browser (Using UMD)

- Set up Webpack:

```javascript
module.exports = {
  resolve: {
    alias: {
      "aelf-sdk$": "aelf-sdk/dist/aelf.umd.js",
    },
  },
};
```

- Set up Rollup:

```javascript
const alias = require("rollup-plugin-alias");

rollup({
  // ...
  plugins: [
    alias({
      "aelf-sdk": require.resolve("aelf-sdk/dist/aelf.umd.js"),
    }),
  ],
});
```

#### For Node.js (Using CommonJS)

- Set up Webpack:

```javascript
module.exports = {
  // ...
  resolve: {
    alias: {
      "aelf-sdk$": "aelf-sdk/dist/aelf.cjs.js",
    },
  },
};
```

- Set up Rollup:

```javascript
const alias = require("rollup-plugin-alias");

rollup({
  // ...
  plugins: [
    alias({
      "aelf-sdk": require.resolve("aelf-sdk/dist/aelf.cjs.js"),
    }),
  ],
});
```

#### Note

- `aelf-web3.js` is the same as `aelf-sdk`.
- `aelf-sdk` is the package name on npm.

For more detailed usage and examples, refer to the [aelf-web3.js repository](https://github.com/AElfProject/aelf-web3.js).

## Development 🔨

### 1. Install Development Dependencies

- install the required development dependencies:

```bash
yarn install
```

### 2. Write Your Code

- Create your file under the `src` directory.
- Write your logic in the newly created file.

### 3. Integrate Your Module

- Check `src/index` to see if you need to add your new module as an attribute to the `AElf` instance.

### 4. Link the Package Globally

- Execute `yarn link` in the root directory. This creates a global symbolic link to this package and stores it in the global `node_modules` directory.

```sh
yarn link
```

### 5. Link the Package in Other Directories

- When using `yarn link aelf-sdk` in other directories, ensure the version of the package is correct. Inconsistent node versions can sometimes cause issues with linking the incorrect version of `aelf-web3.js`.

```sh
yarn link aelf-sdk
```

### 6. Test Your Code

- Try out the logic you just wrote to make sure everything works as expected.

### Linting

- To lint your code, run:

```sh
yarn lint
```

### Running Tests

- To run unit tests, execute:

```sh
# Unit tests
yarn test
```

## Basic usage

### Examples

You can also see full example here - [Examples](https://github.com/AElfProject/aelf-web3.js/tree/master/examples)

#### Create Instance

```javascript
import AElf from "aelf-sdk";

// Create a new instance of AElf
const aelf = new AElf(
  new AElf.providers.HttpProvider("https://tdvw-test-node.aelf.io")
);
```

#### Create or Load a Wallet

```javascript
// Create a new wallet
const newWallet = AElf.wallet.createNewWallet();

// Load a wallet by private key
const privateKeyWallet = AElf.wallet.getWalletByPrivateKey("your-private-key");

// Load a wallet by mnemonic
const mnemonicWallet = AElf.wallet.getWalletByMnemonic("your-mnemonic");
```

#### Get a System Contract Address

```javascript
const tokenContractName = "AElf.ContractNames.Token";
let tokenContractAddress;

(async () => {
  // Get chain status
  const chainStatus = await aelf.chain.getChainStatus();
  // Get genesis contract address
  const GenesisContractAddress = chainStatus.GenesisContractAddress;
  // Get genesis contract instance
  const zeroContract = await aelf.chain.contractAt(
    GenesisContractAddress,
    newWallet
  );
  // Get contract address by the read-only method 'GetContractAddressByName' of genesis contract
  tokenContractAddress = await zeroContract.GetContractAddressByName.call(
    AElf.utils.sha256(tokenContractName)
  );
})();
```

#### Get a Contract Instance

```javascript
const wallet = AElf.wallet.createNewWallet();
let tokenContract;

// Async method
(async () => {
  tokenContract = await aelf.chain.contractAt(tokenContractAddress, wallet);
})();

// Promise method
aelf.chain.contractAt(tokenContractAddress, wallet).then((result) => {
  tokenContract = result;
});

// Callback method
aelf.chain.contractAt(tokenContractAddress, wallet, (error, result) => {
  if (error) throw error;
  tokenContract = result;
});
```

#### Use Contract Instance

How to use a contract instance. You can call methods in two ways: read-only and send transaction.

```javascript
(async () => {
  // Read-only method: Get the balance of an address
  const balanceResult = await tokenContract.GetBalance.call({
    symbol: "ELF",
    owner: "7s4XoUHfPuqoZAwnTV7pHWZAaivMiL8aZrDSnY9brE1woa8vz",
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
    memo: "transfer in demo",
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
import AElf from "aelf-sdk";

const aelf = new AElf(
  new AElf.providers.HttpProvider("https://tdvw-test-node.aelf.io")
);
aelf.setProvider(
  new AElf.providers.HttpProvider("https://tdvw-test-node.aelf.io")
);
```

## Web API

Access the Web API of your aelf node at `{chainAddress}/swagger/index.html`

**Examples:**

- Local node: `http://127.0.0.1:1235/swagger/index.html`
- Testnet nodes:
  - **Main Chain**: [https://aelf-test-node.aelf.io/swagger/index.html](https://aelf-test-node.aelf.io/swagger/index.html)
  - **Side Chain**: [https://tdvw-test-node.aelf.io/swagger/index.html](https://tdvw-test-node.aelf.io/swagger/index.html)

**Setup:**

Create an instance of `AElf`:

```javascript
import AElf from "aelf-sdk";

// Change the URL if needed
const aelf = new AElf(new AElf.providers.HttpProvider("http://127.0.0.1:1235"));
```

### 1. Get Chain Status

Get the current status of the blockchain.

- **Web API Path**: `/api/blockChain/chainStatus`
- **Method**: GET
- **Parameters**: None
- **Returns**: `Object`

  - `ChainId` - String
  - `Branches` - Object
  - `NotLinkedBlocks` - Object
  - `LongestChainHeight` - Number
  - `LongestChainHash` - String
  - `GenesisBlockHash` - String
  - `GenesisContractAddress` - String
  - `LastIrreversibleBlockHash` - String
  - `LastIrreversibleBlockHeight` - Number
  - `BestChainHash` - String
  - `BestChainHeight` - Number

#### Example:

```javascript
aelf.chain.getChainStatus().then((res) => {
  console.log(res);
});
```

### 2. Get Contract File Descriptor Set

Get the protobuf definitions related to a contract.

- **Web API Path**: `/api/blockChain/contractFileDescriptorSet`
- **Method**: GET
- **Parameters**: `contractAddress` (String)
- **Returns**: `String`.

#### Example:

```javascript
aelf.chain.getContractFileDescriptorSet(contractAddress).then((res) => {
  console.log(res);
});
```

### 3. Get Block Height

Get the current best height of the chain.

- **Web API Path**: `/api/blockChain/blockHeight`
- **Method**: GET
- **Parameters**: None
- **Returns**: `Number`.

#### Example:

```javascript
aelf.chain.getBlockHeight().then((res) => {
  console.log(res);
});
```

### 4. Get Block

Get block information by block hash.

- **Web API Path**: `/api/blockChain/block`
- **Method**: GET
- **Parameters**:

  - **`blockHash`** (String)
  - **`includeTransactions`** (Boolean)
    - `true` require transaction ids list in the block
    - `false` Doesn’t require transaction ids list in the block

- **Returns**: `Object`

      - `BlockHash` - String

      - `Header` - Object
          - `PreviousBlockHash` - String
          - `MerkleTreeRootOfTransactions` - String
          - `MerkleTreeRootOfWorldState` - String
          - `Extra` - Array
          - `Height` - Number
          - `Time` - google.protobuf.Timestamp
          - `ChainId` - String
          - `Bloom` - String
          - `SignerPubkey` - String

      - `Body` - Object
          - `TransactionsCount` - Number
          - `Transactions` - Array
            - `transactionId` - String

#### Example:

```javascript
aelf.chain.getBlock(blockHash, false).then((res) => {
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
    - `true` require transaction ids list in the block
    - `false` Doesn’t require transaction ids list in the block

- **Returns**: `Object`

      - `BlockHash` - String

      - `Header` - Object
          - `PreviousBlockHash` - String
          - `MerkleTreeRootOfTransactions` - String
          - `MerkleTreeRootOfWorldState` - String
          - `Extra` - Array
          - `Height` - Number
          - `Time` - google.protobuf.Timestamp
          - `ChainId` - String
          - `Bloom` - String
          - `SignerPubkey` - String

      - `Body` - Object
          - `TransactionsCount` - Number
          - `Transactions` - Array
            - `transactionId` - String

#### Example:

```javascript
aelf.chain.getBlockByHeight(12, false).then((res) => {
  console.log(res);
});
```

### 6. Get Contract View Method List

- **Web API Path**: `/api/blockChain/ContractViewMethodList`
- **Method**: GET
- **Parameters**: `address` (String)
- **Returns**: `Array` - The array of view method name

#### Example:

```javascript
aelf.chain
  .getContractViewMethodList("https://tdvw-test-node.aelf.io/")
  .then((res) => {
    console.log(res);
  });
```

### 7. Get Transaction Result

- **Web API Path**: `/api/blockChain/transactionResult`
- **Method**: GET
- **Parameters**: `transactionId` (String)
- **Returns**: `Object`
  - `TransactionId` - String
  - `Status` - String
  - `Logs` - Array
  - `Address` - String
  - `Name` - String
  - `Indexed` - Array
  - `NonIndexed` - Number
  - `Bloom` - String
  - `BlockNumber` - Number
  - `Transaction` - Object
  - `From` - String
  - `To` - String
  - `RefBlockNumber` - Number
  - `RefBlockPrefix` - String
  - `MethodName` - String
  - `Params` - Object
  - `Signature` - String
  - `ReadableReturnValue` - Object
  - `Error` - String

#### Example:

```javascript
aelf.chain.getTxResult(transactionId).then((res) => {
  console.log(res);
});
```

### 8. Get Merkle Path By TxId

- **Web API Path**: `/api/blockChain/merklePathByTransactionId`
- **Method**: GET
- **Parameters**:
  - **`transactionId`** (String)
- **Returns**:
  - `MerklePathNodes` - The array of merklePathNodes:
    - `Hash` - String
    - `IsLeftChildNode` - String

#### Example:

```javascript
aelf.chain.merklePathByTransactionId(txId).then((res) => {
  console.log(res);
});
```

### 9. Get Multiple Transaction Results

- **Web API Path**: `/api/blockChain/transactionResults`
- **Method**: GET
- **Parameters**:
  - **`blockHash`** (String)
  - **`offset`** (Number)
  - **`limit`** (Number)
- **Returns**:
  - `Array` - The array of method descriptions:
    - the transaction result object

#### Example:

```javascript
aelf.chain.getTxResults(blockHash, 0, 2).then((res) => {
  console.log(res);
});
```

### 10. Get Transaction Pool Status

- **Web API Path**: `/api/blockChain/transactionPoolStatus`
- **Method**: GET
- **Parameters**: None

### 11. Send Transaction

- **Web API Path**: `/api/blockChain/sendTransaction`
- **Method**: POST
- **Parameters**: `Object` (Serialized protobuf data with RawTransaction string)
  - `RawTransaction` - String

### 12. Send Multiple Transactions

- **Web API Path**: `/api/blockChain/sendTransactions`
- **Method**: POST
- **Parameters**: `Object` (Serialized protobuf data with RawTransaction string)
  - `RawTransaction` - String

### 13. Call Read-Only Method

Call a read-only method on a contract.

- **Method**: POST
- **Parameters**: `Object` (Serialized protobuf data with RawTransaction string)
  - `RawTransaction` - String
- **Returns**: Method call result

### 14. Get Peers

Get peer info about the connected network nodes.

- **Method**: GET
- **Parameters**: `withMetrics` (Boolean)
  - `true` with metrics
  - `false` without metrics

### 15. Add Peer

Attempts to add a node to the connected network nodes

- **Method**: POST
- **Parameters**: `Object` The object with the following structure :
  - `Address` - String

### 16. Remove Peer

Attempts to remove a node from the connected network nodes

- **Method**: DELETE
- **Parameters**: `address` (String)

### 17. Calculate Transaction Fee

- **Web API Path**: `/api/blockChain/calculateTransactionFee`
- **Method**: POST
- **Parameters**: `CalculateTransactionFeeInput` (Object with RawTransaction string):
  - `RawTransaction` - String
- **Returns**: `CalculateTransactionFeeOutput` (Object with fee details):
  - `Success` - Bool
  - `TransactionFee` - Array
  - `ResourceFee` - Array

#### Example

```javascript
aelf.chain.calculateTransactionFee(rawTransaction).then((res) => {
  console.log(res);
});
```

### 16. Network Info

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
import AElf from "aelf-sdk";
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
const AElf = require("aelf-sdk");
const { base58 } = AElf.utils;

try {
  base58.decode("$address"); // replace '$address' with actual address
  console.log("Valid address");
} catch (error) {
  console.error("Invalid address", error);
}
```

## AElf.version

```javascript
import AElf from "aelf-sdk";
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
