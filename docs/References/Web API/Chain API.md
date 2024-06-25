---
sidebar_position: 1
title: Chain API
description: Chain API
---

# Chain API

## Get information about a given block by block hash. Optionally with the list of its transactions.

```http
GET /api/blockChain/block
```

| Parameter             | Type      | Description                       | Default   |
| :-------------------- | :-------- | :-------------------------------- | :-------- |
| `blockHash`           | `string`  | Block hash _(optional)_           |           |
| `includeTransactions` | `boolean` | Include transactions _(optional)_ | `"false"` |

### Responses

- **200**: Success (`BlockDto`)

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- **BlockChain**

---

## Get information about a given block by block height. Optionally with the list of its transactions.

```http
GET /api/blockChain/blockByHeight
```

| Parameter             | Type      | Description                       | Default   |
| :-------------------- | :-------- | :-------------------------------- | :-------- |
| `blockHeight`         | `integer` | Block height _(optional)_         |           |
| `includeTransactions` | `boolean` | Include transactions _(optional)_ | `"false"` |

### Responses

- **200**: Success (`BlockDto`)

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- **BlockChain**

---

## Get the height of the current chain.

```http
GET /api/blockChain/blockHeight
```

### Responses

- **200**: Success (integer, int64)

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- **BlockChain**

---

## Get the current state about a given block.

```http
GET /api/blockChain/blockState
```

| Parameter   | Type     | Description             |
| :---------- | :------- | :---------------------- |
| `blockHash` | `string` | Block hash _(optional)_ |

### Responses

- **200**: Success (`BlockStateDto`)

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- **BlockChain**

---

## Get the current status of the block chain.

```http
GET /api/blockChain/chainStatus
```

### Responses

- **200**: Success (`ChainStatusDto`)

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- **BlockChain**

---

## Get the protobuf definitions related to a contract.

```http
GET /api/blockChain/contractFileDescriptorSet
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `address` | `string` | Contract address _(optional)_ |

### Responses

- **200**: Success (string, byte)

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- **BlockChain**

---

## Execute a raw transaction.

```http
POST /api/blockChain/executeRawTransaction
```

### Parameters

| Type     | Name    | Schema                                  |
| :------- | :------ | :-------------------------------------- |
| **Body** | `input` | `ExecuteRawTransactionDto` _(optional)_ |

### Responses

| HTTP Code | Description | Schema |
| :-------: | :---------- | :----- |
|  **200**  | Success     | string |

### Consumes

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- **BlockChain**

---

## Call a read-only method on a contract.

```http
POST /api/blockChain/executeTransaction
```

### Parameters

| Type     | Name    | Schema                               |
| :------- | :------ | :----------------------------------- |
| **Body** | `input` | `ExecuteTransactionDto` _(optional)_ |

### Responses

| HTTP Code | Description | Schema |
| :-------: | :---------- | :----- |
|  **200**  | Success     | string |

### Consumes

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- **BlockChain**

---

## Get the merkle path of a transaction.

```http
GET /api/blockChain/merklePathByTransactionId
```

### Parameters

|   Type    | Name            | Schema              |
| :-------: | :-------------- | :------------------ |
| **Query** | `transactionId` | string _(optional)_ |

### Responses

| HTTP Code | Description | Schema          |
| :-------: | :---------- | :-------------- |
|  **200**  | Success     | `MerklePathDto` |

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- **BlockChain**

---

## Creates an unsigned serialized transaction.

```http
POST /api/blockChain/rawTransaction
```

### Parameters

| Type     | Name    | Schema                                   |
| :------- | :------ | :--------------------------------------- |
| **Body** | `input` | `CreateRawTransactionInput` _(optional)_ |

### Responses

| HTTP Code | Description | Schema                       |
| :-------: | :---------- | :--------------------------- |
|  **200**  | Success     | `CreateRawTransactionOutput` |

### Consumes

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- **BlockChain**

---

## Send a transaction.

```http
POST /api/blockChain/sendRawTransaction
```

### Parameters

| Type     | Name    | Schema                                 |
| :------- | :------ | :------------------------------------- |
| **Body** | `input` | `SendRawTransactionInput` _(optional)_ |

### Responses

| HTTP Code | Description | Schema                     |
| :-------: | :---------- | :------------------------- |
|  **200**  | Success     | `SendRawTransactionOutput` |

### Consumes

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- **BlockChain**

---

## Broadcast a Transaction

```http
POST /api/blockChain/sendTransaction
```

### Parameters

| Type     | Name    | Schema                 | Description | Required |
| -------- | ------- | ---------------------- | ----------- | -------- |
| **Body** | `input` | `SendTransactionInput` | -           | No       |

### Responses

| HTTP Code | Description | Schema                  |
| --------- | ----------- | ----------------------- |
| **200**   | Success     | `SendTransactionOutput` |

### Consumes

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

\*\*Tags

- BlockChain

---

## Broadcast Multiple Transactions

```http
POST /api/blockChain/sendTransactions
```

### Parameters

| Type     | Name    | Schema                  | Description | Required |
| -------- | ------- | ----------------------- | ----------- | -------- |
| **Body** | `input` | `SendTransactionsInput` | -           | No       |

### Responses

| HTTP Code | Description | Schema       |
| --------- | ----------- | ------------ |
| **200**   | Success     | `<string[]>` |

### Consumes

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- BlockChain

---

## Estimate Transaction Fee

```http
POST /api/blockChain/calculateTransactionFee
```

### Parameters

| Type     | Name    | Schema                         | Description | Required |
| -------- | ------- | ------------------------------ | ----------- | -------- |
| **Body** | `input` | `CalculateTransactionFeeInput` | -           | No       |

### Responses

| HTTP Code | Description | Schema                          |
| --------- | ----------- | ------------------------------- |
| **200**   | Success     | `CalculateTransactionFeeOutput` |

### Consumes

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- BlockChain

---

## Get the Current Status of a Transaction

```http
GET /api/blockChain/transactionResult
```

### Parameters

| Type      | Name            | Schema   | Description    | Required |
| --------- | --------------- | -------- | -------------- | -------- |
| **Query** | `transactionId` | `string` | Transaction ID | No       |

### Responses

| HTTP Code | Description | Schema                 |
| --------- | ----------- | ---------------------- |
| **200**   | Success     | `TransactionResultDto` |

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- BlockChain

---

## Get the Transaction Pool Status

```http
GET /api/blockChain/transactionPoolStatus
```

### Responses

| HTTP Code | Description | Schema                           |
| --------- | ----------- | -------------------------------- |
| **200**   | Success     | `GetTransactionPoolStatusOutput` |

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- BlockChain

---

## Get the Current Status of a Transaction

```http
GET /api/blockChain/transactionResult
```

**Parameters**

| Type      | Name              | Description                | Schema |
| --------- | ----------------- | -------------------------- | ------ |
| **Query** | **transactionId** | _Optional_. Transaction ID | string |

### Responses

| HTTP Code | Description | Schema                 |
| --------- | ----------- | ---------------------- |
| **200**   | Success     | `TransactionResultDto` |

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- BlockChain

---

## Get Multiple Transaction Results

```http
GET /api/blockChain/transactionResults
```

### Parameters

| Type      | Name          | Description                       | Schema          | Default |
| --------- | ------------- | --------------------------------- | --------------- | ------- |
| **Query** | **blockHash** | _Optional_. Block hash            | string          |         |
| **Query** | **limit**     | _Optional_. Limit results         | integer (int32) | `10`    |
| **Query** | **offset**    | _Optional_. Offset for pagination | integer (int32) | `0`     |

### Responses

| HTTP Code | Description | Schema                   |
| --------- | ----------- | ------------------------ |
| **200**   | Success     | `TransactionResultDto[]` |

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- BlockChain
