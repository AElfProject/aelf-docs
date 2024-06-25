---
sidebar_position: 2
title: Net API
description: Net API
---

# Net API

## Get Network Information

```http
GET /api/net/networkInfo
```

### Responses

| HTTP Code | Description | Schema                 |
| --------- | ----------- | ---------------------- |
| **200**   | Success     | `GetNetworkInfoOutput` |

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- Net

---

## Add Peer

```http
POST /api/net/peer
```

#### Parameters

| Type     | Name    | Schema         |
| -------- | ------- | -------------- |
| **Body** | `input` | `AddPeerInput` |

### Responses

| HTTP Code | Description  | Schema  |
| --------- | ------------ | ------- |
| **200**   | Success      | boolean |
| **401**   | Unauthorized |         |

### Security

- Basic Authentication

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

- Net

---

## Remove Peer

**DELETE** `/api/net/peer`

### Parameters

| Type      | Name      | Description | Schema |
| --------- | --------- | ----------- | ------ |
| **Query** | `address` | ip address  | string |

### Responses

| HTTP Code | Description  | Schema  |
| --------- | ------------ | ------- |
| **200**   | Success      | boolean |
| **401**   | Unauthorized |         |

### Security

- Basic Authentication

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- Net

---

## Get Peers Info

**GET** `/api/net/peers`

### Parameters

| Type      | Name          | Description | Schema | Default   |
| --------- | ------------- | ----------- | ------ | --------- |
| **Query** | `withMetrics` | boolean     |        | `"false"` |

### Responses

| HTTP Code | Description | Schema          |
| --------- | ----------- | --------------- |
| **200**   | Success     | `PeerDto` array |

### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

### Tags

- BlockChain

---

## Get the Current Status of a Transaction

**GET** `/api/blockChain/transactionResult`

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

## Definitions

#### AddPeerInput

| Name        | Schema | Description             |
| ----------- | ------ | ----------------------- |
| **Address** | string | ip address _(optional)_ |

---

#### BlockBodyDto

| Name                  | Schema          | Description                   |
| --------------------- | --------------- | ----------------------------- |
| **Transactions**      | string[]        | array of strings _(optional)_ |
| **TransactionsCount** | integer (int32) | integer _(optional)_          |

---

#### BlockDto

| Name          | Schema                            | Description               |
| ------------- | --------------------------------- | ------------------------- |
| **BlockHash** | string                            | string _(optional)_       |
| **Body**      | [BlockBodyDto](#blockbodydto)     | block body _(optional)_   |
| **Header**    | [BlockHeaderDto](#blockheaderdto) | block header _(optional)_ |
| **BlockSize** | integer (int32)                   | integer _(optional)_      |

---

#### BlockHeaderDto

| Name                                 | Schema             | Description          |
| ------------------------------------ | ------------------ | -------------------- |
| **Bloom**                            | string             | string _(optional)_  |
| **ChainId**                          | string             | string _(optional)_  |
| **Extra**                            | string             | string _(optional)_  |
| **Height**                           | integer (int64)    | integer _(optional)_ |
| **MerkleTreeRootOfTransactions**     | string             | string _(optional)_  |
| **MerkleTreeRootOfWorldState**       | string             | string _(optional)_  |
| **MerkleTreeRootOfTransactionState** | string             | string _(optional)_  |
| **PreviousBlockHash**                | string             | string _(optional)_  |
| **SignerPubkey**                     | string             | string _(optional)_  |
| **Time**                             | string (date-time) | string _(optional)_  |

---

#### BlockStateDto

| Name             | Schema          | Description                   |
| ---------------- | --------------- | ----------------------------- |
| **BlockHash**    | string          | string _(optional)_           |
| **BlockHeight**  | integer (int64) | integer _(optional)_          |
| **Changes**      | map of strings  | map _(optional)_              |
| **Deletes**      | string[]        | array of strings _(optional)_ |
| **PreviousHash** | string          | string _(optional)_           |

---

#### ChainStatusDto

| Name                            | Schema                              | Description          |
| ------------------------------- | ----------------------------------- | -------------------- |
| **BestChainHash**               | string                              | string _(optional)_  |
| **BestChainHeight**             | integer (int64)                     | integer _(optional)_ |
| **Branches**                    | map of strings and integers (int64) | map _(optional)_     |
| **ChainId**                     | string                              | string _(optional)_  |
| **GenesisBlockHash**            | string                              | string _(optional)_  |
| **GenesisContractAddress**      | string                              | string _(optional)_  |
| **LastIrreversibleBlockHash**   | string                              | string _(optional)_  |
| **LastIrreversibleBlockHeight** | integer (int64)                     | integer _(optional)_ |
| **LongestChainHash**            | string                              | string _(optional)_  |
| **LongestChainHeight**          | integer (int64)                     | integer _(optional)_ |
| **NotLinkedBlocks**             | map of strings                      | map _(optional)_     |

---

#### CreateRawTransactionInput

| Name               | Schema          | Description                             |
| ------------------ | --------------- | --------------------------------------- |
| **From**           | string          | from address _(required)_               |
| **MethodName**     | string          | contract method name _(required)_       |
| **Params**         | string          | contract method parameters _(required)_ |
| **RefBlockHash**   | string          | refer block hash _(required)_           |
| **RefBlockNumber** | integer (int64) | refer block height _(required)_         |
| **To**             | string          | to address _(required)_                 |

---

#### CreateRawTransactionOutput

| Name               | Schema | Description         |
| ------------------ | ------ | ------------------- |
| **RawTransaction** | string | string _(optional)_ |

---

#### ExecuteRawTransactionDto

| Name               | Schema | Description                         |
| ------------------ | ------ | ----------------------------------- |
| **RawTransaction** | string | raw transaction string _(optional)_ |
| **Signature**      | string | signature string _(optional)_       |

---

#### ExecuteTransactionDto

| Name               | Schema | Description                         |
| ------------------ | ------ | ----------------------------------- |
| **RawTransaction** | string | raw transaction string _(optional)_ |

---

#### GetNetworkInfoOutput

| Name                | Schema          | Description          |
| ------------------- | --------------- | -------------------- |
| **Connections**     | integer (int32) | integer _(optional)_ |
| **ProtocolVersion** | integer (int32) | integer _(optional)_ |
| **Version**         | string          | string _(optional)_  |

---

#### GetTransactionPoolStatusOutput

| Name          | Schema          | Description          |
| ------------- | --------------- | -------------------- |
| **Queued**    | integer (int32) | integer _(optional)_ |
| **Validated** | integer (int32) | integer _(optional)_ |

---

#### LogEventDto

| Name           | Schema   | Description                   |
| -------------- | -------- | ----------------------------- |
| **Address**    | string   | string _(optional)_           |
| **Indexed**    | string[] | array of strings _(optional)_ |
| **Name**       | string   | string _(optional)_           |
| **NonIndexed** | string   | string _(optional)_           |

---

#### MerklePathDto

| Name                | Schema                                    | Description                                                   |
| ------------------- | ----------------------------------------- | ------------------------------------------------------------- |
| **MerklePathNodes** | [MerklePathNodeDto](#merklepathnodedto)[] | array of [MerklePathNodeDto](#merklepathnodedto) _(optional)_ |

---

#### MerklePathNodeDto

| Name                | Schema  | Description          |
| ------------------- | ------- | -------------------- |
| **Hash**            | string  | string _(optional)_  |
| **IsLeftChildNode** | boolean | boolean _(optional)_ |

---

#### MinerInRoundDto

| Name                               | Schema             | Description                               |
| ---------------------------------- | ------------------ | ----------------------------------------- |
| **ActualMiningTimes**              | string[]           | array of strings (date-time) _(optional)_ |
| **ExpectedMiningTime**             | string (date-time) | string (date-time) _(optional)_           |
| **ImpliedIrreversibleBlockHeight** | integer (int64)    | integer (int64) _(optional)_              |
| **InValue**                        | string             | string _(optional)_                       |
| **MissedBlocks**                   | integer (int64)    | integer (int64) _(optional)_              |
| **Order**                          | integer (int32)    | integer (int32) _(optional)_              |
| **OutValue**                       | string             | string _(optional)_                       |
| **PreviousInValue**                | string             | string _(optional)_                       |
| **ProducedBlocks**                 | integer (int64)    | integer (int64) _(optional)_              |
| **ProducedTinyBlocks**             | integer (int32)    | integer (int32) _(optional)_              |

---

#### PeerDto

| Name                           | Schema                            | Description                                           |
| ------------------------------ | --------------------------------- | ----------------------------------------------------- |
| **BufferedAnnouncementsCount** | integer (int32)                   | integer (int32) _(optional)_                          |
| **BufferedBlocksCount**        | integer (int32)                   | integer (int32) _(optional)_                          |
| **BufferedTransactionsCount**  | integer (int32)                   | integer (int32) _(optional)_                          |
| **ConnectionTime**             | integer (int64)                   | integer (int64) _(optional)_                          |
| **Inbound**                    | boolean                           | boolean _(optional)_                                  |
| **IpAddress**                  | string                            | string _(optional)_                                   |
| **ProtocolVersion**            | integer (int32)                   | integer (int32) _(optional)_                          |
| **RequestMetrics**             | [RequestMetric](#requestmetric)[] | array of [RequestMetric](#requestmetric) _(optional)_ |
| **ConnectionStatus**           | string                            | string _(optional)_                                   |
| **NodeVersion**                | string                            | string _(optional)_                                   |

---

This structure should provide a clear overview of each variable's name, schema, and description. Let me know if you need any further adjustments!

#### RequestMetric

**Name:** RequestMetric

| Name              | Schema            | Description |
| ----------------- | ----------------- | ----------- |
| **Info**          | `string`          | _optional_  |
| **MethodName**    | `string`          | _optional_  |
| **RequestTime**   | `Timestamp`       | _optional_  |
| **RoundTripTime** | `integer (int64)` | _optional_  |

---

#### RoundDto

**Name:** RoundDto

| Name                                      | Schema                        | Description |
| ----------------------------------------- | ----------------------------- | ----------- |
| **ConfirmedIrreversibleBlockHeight**      | `integer (int64)`             | _optional_  |
| **ConfirmedIrreversibleBlockRoundNumber** | `integer (int64)`             | _optional_  |
| **ExtraBlockProducerOfPreviousRound**     | `string`                      | _optional_  |
| **IsMinerListJustChanged**                | `boolean`                     | _optional_  |
| **RealTimeMinerInformation**              | `< string, MinerInRoundDto >` | _optional_  |
| **RoundId**                               | `integer (int64)`             | _optional_  |
| **RoundNumber**                           | `integer (int64)`             | _optional_  |
| **TermNumber**                            | `integer (int64)`             | _optional_  |

---

#### SendRawTransactionInput

**Name:** SendRawTransactionInput

| Name                  | Schema    | Description                          |
| --------------------- | --------- | ------------------------------------ |
| **ReturnTransaction** | `boolean` | return transaction detail _optional_ |
| **Signature**         | `string`  | _optional_                           |
| **Transaction**       | `string`  | raw transaction                      |

---

#### SendRawTransactionOutput

**Name:** SendRawTransactionOutput

| Name              | Schema           | Description |
| ----------------- | ---------------- | ----------- |
| **Transaction**   | `TransactionDto` | _optional_  |
| **TransactionId** | `string`         | _optional_  |

---

#### SendTransactionInput

**Name:** SendTransactionInput

| Name               | Schema   | Description     |
| ------------------ | -------- | --------------- |
| **RawTransaction** | `string` | raw transaction |

---

#### SendTransactionOutput

**Name:** SendTransactionOutput

| Name              | Schema   | Description |
| ----------------- | -------- | ----------- |
| **TransactionId** | `string` | _optional_  |

---

#### SendTransactionsInput

**Name:** SendTransactionsInput

| Name                | Schema   | Description      |
| ------------------- | -------- | ---------------- |
| **RawTransactions** | `string` | raw transactions |

---

#### TaskQueueInfoDto

**Name:** TaskQueueInfoDto

| Name     | Schema            | Description |
| -------- | ----------------- | ----------- |
| **Name** | `string`          | _optional_  |
| **Size** | `integer (int32)` | _optional_  |

---

#### Timestamp

**Name:** Timestamp

| Name        | Schema            | Description |
| ----------- | ----------------- | ----------- |
| **Nanos**   | `integer (int32)` | _optional_  |
| **Seconds** | `integer (int64)` | _optional_  |

---

#### TransactionDto

**Name:** TransactionDto

| Name               | Schema            | Description |
| ------------------ | ----------------- | ----------- |
| **From**           | `string`          | _optional_  |
| **MethodName**     | `string`          | _optional_  |
| **Params**         | `string`          | _optional_  |
| **RefBlockNumber** | `integer (int64)` | _optional_  |
| **RefBlockPrefix** | `string`          | _optional_  |
| **Signature**      | `string`          | _optional_  |
| **To**             | `string`          | _optional_  |

---

#### TransactionResultDto

**Name:** TransactionResultDto

| Name                | Schema            | Description |
| ------------------- | ----------------- | ----------- |
| **BlockHash**       | `string`          | _optional_  |
| **BlockNumber**     | `integer (int64)` | _optional_  |
| **Bloom**           | `string`          | _optional_  |
| **Error**           | `string`          | _optional_  |
| **Logs**            | `< LogEventDto >` | _optional_  |
| **ReturnValue**     | `string`          | _optional_  |
| **Status**          | `string`          | _optional_  |
| **Transaction**     | `TransactionDto`  | _optional_  |
| **TransactionId**   | `string`          | _optional_  |
| **TransactionSize** | `integer (int32)` | _optional_  |

---

#### CalculateTransactionFeeInput

**Name:** CalculateTransactionFeeInput

| Name               | Schema   | Description |
| ------------------ | -------- | ----------- |
| **RawTransaction** | `string` | _optional_  |

---

#### CalculateTransactionFeeOutput

**Name:** CalculateTransactionFeeOutput

| Name               | Schema                     | Description |
| ------------------ | -------------------------- | ----------- |
| **Success**        | `bool`                     | _optional_  |
| **TransactionFee** | `Dictionary<string, long>` | _optional_  |
| **ResourceFee**    | `Dictionary<string, long>` | _optional_  |
