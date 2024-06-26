---
sidebar_position: 2
title: Wallet and Block Explorer
image: /img/Logo.aelf.svg
---

# Wallet and Block Explorer

### Explorer

[Github](https://github.com/AElfProject/aelf-block-explorer)`

#### Overview

Our blockchain explorer lets you do a lot of things easily. You can view blocks and transactions, buy resources, vote, campaign for node roles, and check out contracts.

#### Features

   - **View Blocks and Transactions**: Track the latest blocks and transactions on the network.
   - **Purchase Resources**: Buy necessary resources for your operations.
   - **Voting and Node Campaigning**: Participate in network governance by voting and running for node roles.
   - **View Contracts**: Access and review smart contracts.
   

### iOS/Android Wallet

#### Overview

The mobile wallet app for iOS and Android helps you manage your assets and trade across different blockchains. It also offers a platform for developers to integrate their applications using the wallet SDK.

#### Features

   - **Basic Asset Management**: Easily manage your digital assets.
   - **Cross-Chain Trading**: Trade assets across different blockchains seamlessly.
   - **Developer Platform**: Access the wallet SDK to integrate your applications.
   

## Web Wallet

[Github](https://github.com/AElfProject/aelf-web-wallet)`

#### Overview

The web wallet offers basic functionalities for handling transactions right from your browser.

#### Features

   - Transaction Management: Handle your transactions with ease.



## Explorer API

[To get more information by code](https://github.com/AElfProject/aelf-block-api)

#### Introduction

Our Explorer API allows you to interact with blockchain data. You can get information about blocks, transactions, and TPS (transactions per second). Here’s how you can use it:

#### Blocks

##### Get Block List

**URL**:  `api/all/blocks?limit={limit}&page={page}`
**Method**: `GET`
**Description**: Retrieve a list of blocks.

**Success Response:**


```js
{
    "total": 5850,
    "blocks": [
        {
            "block_hash": "7e1c2fb6d3cc5e8c2cef7d75de9c1adf0e25e9d17d4f22e543fa20f5f23b20e9",
            "pre_block_hash": "6890fa74156b1a88a3ccef1fef72f4f78ff2755ffcd4fb5434ed7b3c153061f5",
            "chain_id": "AELF",
            "block_height": 5719,
            "tx_count": 1,
            "merkle_root_tx": "47eabbc7a499764d0b25c7216ba75fe39717f9866a0716c8a0d1798e64852d84",
            "merkle_root_state": "d14e78dc3c7811b7c17c8b04ebad9e547c35b3faa8bfcc9189b8c12e9f6a4aae",
            "time": "2019-04-27T02:00:34.691118Z"
        },
        {
            "block_hash": "6890fa74156b1a88a3ccef1fef72f4f78ff2755ffcd4fb5434ed7b3c153061f5",
            "pre_block_hash": "f1098bd6df58acf74d8877529702dffc444cb401fc8236519606aa9165d945ae",
            "chain_id": "AELF",
            "block_height": 5718,
            "tx_count": 1,
            "merkle_root_tx": "b29b416148b4fb79060eb80b49bb6ac25a82da2d7a1c5d341e0bf279a7c57362",
            "merkle_root_state": "4dbef401f6d9ed303cf1b5e609a64b1c06a7fb77620b9d13b0e4649719e2fe55",
            "time": "2019-04-27T02:00:34.691118Z"
        },
        {
            "block_hash": "f1098bd6df58acf74d8877529702dffc444cb401fc8236519606aa9165d945ae",
            "pre_block_hash": "1fbdf3a4fb3c41e9ddf25958715815d9d643dfb39e1aaa94631d197e9b1a94bb",
            "chain_id": "AELF",
            "block_height": 5717,
            "tx_count": 1,
            "merkle_root_tx": "776abba03d66127927edc6437d406f708b64c1653a1cc22af9c490aa4f0c22dc",
            "merkle_root_state": "ccc32ab23d619b2b8e0e9b82a53bb66b3a6d168993188b5d3f7f0ac2cb17206f",
            "time": "2019-04-27T02:00:26.690003Z"
        },
    ]
}
```


##### Get Block List By Block Hash

**URL**:  `api/block/transactions?limit={limit}&page={page}&order={order}&block_hash={block_hash}`
**Method**: `GET`
**Description**: Retrieve a list of blocks using a specific block hash.

**Success Response:**

```js
{
    "transactions": [
        {
            "tx_id": "209ceb8ee88eeb2c55db7783c48ec0b1adf6badba89fc7ddb86e968601027cbb",
            "chain_id": "AELF",
            "block_height": 590,
            "address_from": "csoxW4vTJNT9gdvyWS6W7UqEdkSo9pWyJqBoGSnUHXVnj4ykJ",
            "address_to": "2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8",
            "method": "DeploySmartContract",
            "block_hash": "79584a99b7f5da5959a26ff02cbe174d632eb5ef3c6c8d5192de48b6f5584c8d",
            "quantity": 0,
            "tx_status": "Mined",
            "time": "2019-04-26T06:47:00.265604Z"
        },
        ...
    ]
}
```

#### Transactions

##### Get Transactions List

**URL**:  `api/all/transactions?limit={limit}&page={page}`
**Method**: `GET`
**Description**: Retrieve a list of transactions.

**Success Response:**

```js
{
    "total": 1179,
    "transactions": [
        {
            "tx_id": "c65d1206e65aaf2e7e08cc818c372ff2c2947cb6cbec746efe6a5e20b7adefa9",
            "chain_id": "AELF",
            "block_height": 1064,
            "address_from": "grSAEQ5vJ7UfCN2s1v4fJJnk98bu4SHa2hpQkQ9HT88rmaZLz",
            "address_to": "xw6U3FRE5H8rU3z8vAgF9ivnWSkxULK5cibdZzMC9UWf7rPJf",
            "method": "NextRound",
            "block_hash": "8c922b20164ad3774b56d19673154f383ed89656cbd56433d1681c8c3a4dcab9",
            "quantity": 0,
            "tx_status": "Mined",
            "time": "2019-04-26T07:18:36.636701Z"
        },
        ...
    ]
}
```


##### Get Transactions List By Address

**URL**:  `api/address/transactions?contract_address={contract_address}&limit={limit}&page={page}&address={address}`
**Method**: `GET`
**Description**: Retrieve a list of transactions associated with a specific address. 

**Success Response:**

```js
{
    "total": 1179,
    "transactions": [
        {
            "tx_id": "c65d1206e65aaf2e7e08cc818c372ff2c2947cb6cbec746efe6a5e20b7adefa9",
            "chain_id": "AELF",
            "block_height": 1064,
            "address_from": "grSAEQ5vJ7UfCN2s1v4fJJnk98bu4SHa2hpQkQ9HT88rmaZLz",
            "address_to": "xw6U3FRE5H8rU3z8vAgF9ivnWSkxULK5cibdZzMC9UWf7rPJf",
            "method": "NextRound",
            "block_hash": "8c922b20164ad3774b56d19673154f383ed89656cbd56433d1681c8c3a4dcab9",
            "quantity": 0,
            "tx_status": "Mined",
            "time": "2019-04-26T07:18:36.636701Z"
        },
        ...
    ]
}
```

#### TPS (Transactions Per Second)

##### Get TPS Record

**URL**: `api/tps/list?start_time={unix_timestamp}&end_time={unix_timestamp}&order={order}`
**Method**: `GET`
**Description**: Obtain TPS records for performance monitoring.

Success Response:

```js
{
    "total": 178,
    "tps": [
        {
            "id": 12498,
            "start": "2019-11-22T01:12:14Z",
            "end": "2019-11-22T01:13:14Z",
            "txs": 1878,
            "blocks": 120,
            "tps": 31,
            "tpm": 1878,
            "type": 1
        },
        ...
    ]
}
```

