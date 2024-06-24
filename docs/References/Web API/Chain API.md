# AELF API 1.0

## Chain API

### Get information about a given block by block hash. Optionally with the list of its transactions.

```http
GET /api/blockChain/block
```

| Parameter             | Type      | Description                       | Default   |
| :-------------------- | :-------- | :-------------------------------- | :-------- |
| `blockHash`           | `string`  | Block hash _(optional)_           |           |
| `includeTransactions` | `boolean` | Include transactions _(optional)_ | `"false"` |

#### Responses

- **200**: Success (`BlockDto`)

#### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Tags

- **BlockChain**

---

### Get information about a given block by block height. Optionally with the list of its transactions.

```http
GET /api/blockChain/blockByHeight
```

| Parameter             | Type      | Description                       | Default   |
| :-------------------- | :-------- | :-------------------------------- | :-------- |
| `blockHeight`         | `integer` | Block height _(optional)_         |           |
| `includeTransactions` | `boolean` | Include transactions _(optional)_ | `"false"` |

#### Responses

- **200**: Success (`BlockDto`)

#### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Tags

- **BlockChain**

---

### Get the height of the current chain.

```http
GET /api/blockChain/blockHeight
```

#### Responses

- **200**: Success (integer, int64)

#### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Tags

- **BlockChain**

---

### Get the current state about a given block.

```http
GET /api/blockChain/blockState
```

| Parameter   | Type     | Description             |
| :---------- | :------- | :---------------------- |
| `blockHash` | `string` | Block hash _(optional)_ |

#### Responses

- **200**: Success (`BlockStateDto`)

#### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Tags

- **BlockChain**

---

### Get the current status of the block chain.

```http
GET /api/blockChain/chainStatus
```

#### Responses

- **200**: Success (`ChainStatusDto`)

#### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Tags

- **BlockChain**

---

### Get the protobuf definitions related to a contract.

```http
GET /api/blockChain/contractFileDescriptorSet
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `address` | `string` | Contract address _(optional)_ |

#### Responses

- **200**: Success (string, byte)

#### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Tags

- **BlockChain**

---

### Execute a raw transaction.

```http
POST /api/blockChain/executeRawTransaction
```

#### Parameters

| Type     | Name    | Schema                                  |
| :------- | :------ | :-------------------------------------- |
| **Body** | `input` | `ExecuteRawTransactionDto` _(optional)_ |

#### Responses

| HTTP Code | Description | Schema |
| :-------: | :---------- | :----- |
|  **200**  | Success     | string |

#### Consumes

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Tags

- **BlockChain**

---

### Call a read-only method on a contract.

```http
POST /api/blockChain/executeTransaction
```

#### Parameters

| Type     | Name    | Schema                               |
| :------- | :------ | :----------------------------------- |
| **Body** | `input` | `ExecuteTransactionDto` _(optional)_ |

#### Responses

| HTTP Code | Description | Schema |
| :-------: | :---------- | :----- |
|  **200**  | Success     | string |

#### Consumes

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Tags

- **BlockChain**

---

### Get the merkle path of a transaction.

```http
GET /api/blockChain/merklePathByTransactionId
```

#### Parameters

|   Type    | Name            | Schema              |
| :-------: | :-------------- | :------------------ |
| **Query** | `transactionId` | string _(optional)_ |

#### Responses

| HTTP Code | Description | Schema          |
| :-------: | :---------- | :-------------- |
|  **200**  | Success     | `MerklePathDto` |

#### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Tags

- **BlockChain**

---

### Creates an unsigned serialized transaction.

```http
POST /api/blockChain/rawTransaction
```

#### Parameters

| Type     | Name    | Schema                                   |
| :------- | :------ | :--------------------------------------- |
| **Body** | `input` | `CreateRawTransactionInput` _(optional)_ |

#### Responses

| HTTP Code | Description | Schema                       |
| :-------: | :---------- | :--------------------------- |
|  **200**  | Success     | `CreateRawTransactionOutput` |

#### Consumes

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Tags

- **BlockChain**

---

### Send a transaction.

```http
POST /api/blockChain/sendRawTransaction
```

#### Parameters

| Type     | Name    | Schema                                 |
| :------- | :------ | :------------------------------------- |
| **Body** | `input` | `SendRawTransactionInput` _(optional)_ |

#### Responses

| HTTP Code | Description | Schema                     |
| :-------: | :---------- | :------------------------- |
|  **200**  | Success     | `SendRawTransactionOutput` |

#### Consumes

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Produces

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

#### Tags

- **BlockChain**

---

### Broadcast a Transaction

**POST** `/api/blockChain/sendTransaction`

**Parameters**

| Type     | Name    | Schema                 | Description | Required |
| -------- | ------- | ---------------------- | ----------- | -------- |
| **Body** | `input` | `SendTransactionInput` | -           | No       |

**Responses**

| HTTP Code | Description | Schema                  |
| --------- | ----------- | ----------------------- |
| **200**   | Success     | `SendTransactionOutput` |

**Consumes**

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

**Produces**

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

**Tags**

- BlockChain

---

### Broadcast Multiple Transactions

**POST** `/api/blockChain/sendTransactions`

**Parameters**

| Type     | Name    | Schema                  | Description | Required |
| -------- | ------- | ----------------------- | ----------- | -------- |
| **Body** | `input` | `SendTransactionsInput` | -           | No       |

**Responses**

| HTTP Code | Description | Schema       |
| --------- | ----------- | ------------ |
| **200**   | Success     | `<string[]>` |

**Consumes**

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

**Produces**

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

**Tags**

- BlockChain

---

### Estimate Transaction Fee

**POST** `/api/blockChain/calculateTransactionFee`

**Parameters**

| Type     | Name    | Schema                         | Description | Required |
| -------- | ------- | ------------------------------ | ----------- | -------- |
| **Body** | `input` | `CalculateTransactionFeeInput` | -           | No       |

**Responses**

| HTTP Code | Description | Schema                          |
| --------- | ----------- | ------------------------------- |
| **200**   | Success     | `CalculateTransactionFeeOutput` |

**Consumes**

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

**Produces**

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

**Tags**

- BlockChain

---

### Get the Current Status of a Transaction

**GET** `/api/blockChain/transactionResult`

**Parameters**

| Type      | Name            | Schema   | Description    | Required |
| --------- | --------------- | -------- | -------------- | -------- |
| **Query** | `transactionId` | `string` | Transaction ID | No       |

**Responses**

| HTTP Code | Description | Schema                 |
| --------- | ----------- | ---------------------- |
| **200**   | Success     | `TransactionResultDto` |

**Produces**

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

**Tags**

- BlockChain

---

### Get the Transaction Pool Status

**GET** `/api/blockChain/transactionPoolStatus`

**Responses**

| HTTP Code | Description | Schema                           |
| --------- | ----------- | -------------------------------- |
| **200**   | Success     | `GetTransactionPoolStatusOutput` |

**Produces**

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

**Tags**

- BlockChain

---

### Get the Current Status of a Transaction

**GET** `/api/blockChain/transactionResult`

**Parameters**

| Type      | Name              | Description                | Schema |
| --------- | ----------------- | -------------------------- | ------ |
| **Query** | **transactionId** | _Optional_. Transaction ID | string |

**Responses**

| HTTP Code | Description | Schema                 |
| --------- | ----------- | ---------------------- |
| **200**   | Success     | `TransactionResultDto` |

**Produces**

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

**Tags**

- BlockChain

---

### Get Multiple Transaction Results

**GET** `/api/blockChain/transactionResults`

**Parameters**

| Type      | Name          | Description                       | Schema          | Default |
| --------- | ------------- | --------------------------------- | --------------- | ------- |
| **Query** | **blockHash** | _Optional_. Block hash            | string          |         |
| **Query** | **limit**     | _Optional_. Limit results         | integer (int32) | `10`    |
| **Query** | **offset**    | _Optional_. Offset for pagination | integer (int32) | `0`     |

**Responses**

| HTTP Code | Description | Schema                   |
| --------- | ----------- | ------------------------ |
| **200**   | Success     | `TransactionResultDto[]` |

**Produces**

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

**Tags**

- BlockChain

---

### Net API

#### Get Network Information

**GET** `/api/net/networkInfo`

**Responses**

| HTTP Code | Description | Schema                 |
| --------- | ----------- | ---------------------- |
| **200**   | Success     | `GetNetworkInfoOutput` |

**Produces**

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

**Tags**

- Net

---

#### Add a Node to Connected Network Nodes

**POST** `/api/net/peer`

**Parameters**

| Type     | Name      | Description                | Schema         |
| -------- | --------- | -------------------------- | -------------- |
| **Body** | **input** | _Optional_. Add peer input | `AddPeerInput` |

**Responses**

| HTTP Code | Description | Schema  |
| --------- | ----------- | ------- |
| **200**   | Success     | boolean |

| **401** | Unauthorized| |

**Security**

- Basic Authentication

**Consumes**

- `application/json-patch+json; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/*+json; v=1.0`
- `application/x-protobuf; v=1.0`

**Produces**

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

**Tags**

- Net

---

#### Remove a Node from Connected Network Nodes

**DELETE** `/api/net/peer`

**Parameters**

| Type      | Name        | Description            | Schema |
| --------- | ----------- | ---------------------- | ------ |
| **Query** | **address** | _Optional_. IP address | string |

**Responses**

| HTTP Code | Description | Schema  |
| --------- | ----------- | ------- |
| **200**   | Success     | boolean |

| **401** | Unauthorized| |

**Security**

- Basic Authentication

**Produces**

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

**Tags**

- Net

---

#### Get Peer Info about Connected Network Nodes

**GET** `/api/net/peers`

**Parameters**

| Type      | Name            | Description                 | Schema  | Default   |
| --------- | --------------- | --------------------------- | ------- | --------- |
| **Query** | **withMetrics** | _Optional_. Include metrics | boolean | `"false"` |

**Responses**

| HTTP Code | Description | Schema      |
| --------- | ----------- | ----------- |
| **200**   | Success     | `PeerDto[]` |

**Produces**

- `text/plain; v=1.0`
- `application/json; v=1.0`
- `text/json; v=1.0`
- `application/x-protobuf; v=1.0`

**Tags**

- BlockChain

---

## Definitions

### AddPeerInput

##### Description

Represents the input parameters for adding a peer.

#### Schema

| Name      | Description | Schema |
| --------- | ----------- | ------ |
| Address\* | IP address  | string |

### BlockBodyDto

#### Description

Represents the body of a block, including transactions and transaction count.

#### Schema

| Name              | Schema           |
| ----------------- | ---------------- |
| Transactions\*    | < string > array |
| TransactionsCount | integer (int32)  |

### BlockDto

#### Description

Represents a block, including its hash, body, header, and size.

#### Schema

| Name      | Schema           |
| --------- | ---------------- |
| BlockHash | string           |
| Body\*    | `BlockBodyDto`   |
| Header\*  | `BlockHeaderDto` |
| BlockSize | integer (int32)  |

### BlockHeaderDto

#### Description

Represents the header of a block, including various metadata.

#### Schema

| Name                             | Schema             |
| -------------------------------- | ------------------ |
| Bloom                            | string             |
| ChainId                          | string             |
| Extra                            | string             |
| Height                           | integer (int64)    |
| MerkleTreeRootOfTransactions     | string             |
| MerkleTreeRootOfWorldState       | string             |
| MerkleTreeRootOfTransactionState | string             |
| PreviousBlockHash                | string             |
| SignerPubkey                     | string             |
| Time                             | string (date-time) |

### BlockStateDto

#### Description

Represents the state of a block, including hash, height, changes, deletes, and previous hash.

#### Schema

| Name         | Schema                 |
| ------------ | ---------------------- |
| BlockHash    | string                 |
| BlockHeight  | integer (int64)        |
| Changes\*    | < string, string > map |
| Deletes\*    | < string > array       |
| PreviousHash | string                 |

### ChainStatusDto

#### Description

Represents the status of a blockchain network, including chain details and block heights.

#### Schema

| Name                          | Schema                          |
| ----------------------------- | ------------------------------- |
| BestChainHash\*               | string                          |
| BestChainHeight\*             | integer (int64)                 |
| Branches\*                    | < string, integer (int64) > map |
| ChainId\*                     | string                          |
| GenesisBlockHash\*            | string                          |
| GenesisContractAddress        | string                          |
| LastIrreversibleBlockHash\*   | string                          |
| LastIrreversibleBlockHeight\* | integer (int64)                 |
| LongestChainHash\*            | string                          |
| LongestChainHeight\*          | integer (int64)                 |
| NotLinkedBlocks\*             | < string, string > map          |

### CreateRawTransactionInput

#### Description

Represents the input parameters for creating a raw transaction.

#### Schema

| Name             | Description                | Schema          |
| ---------------- | -------------------------- | --------------- |
| From\*           | From address               | string          |
| MethodName\*     | Contract method name       | string          |
| Params\*         | Contract method parameters | string          |
| RefBlockHash\*   | Reference block hash       | string          |
| RefBlockNumber\* | Reference block height     | integer (int64) |
| To\*             | To address                 | string          |

### CreateRawTransactionOutput

#### Description

Represents the output of creating a raw transaction.

#### Schema

| Name           | Schema |
| -------------- | ------ |
| RawTransaction | string |

### ExecuteRawTransactionDto

#### Description

Represents the input parameters for executing a raw transaction.

#### Schema

| Name             | Description     | Schema |
| ---------------- | --------------- | ------ |
| RawTransaction\* | Raw transaction | string |
| Signature\*      | Signature       | string |

### ExecuteTransactionDto

#### Description

Represents the input parameters for executing a transaction.

#### Schema

| Name             | Description     | Schema |
| ---------------- | --------------- | ------ |
| RawTransaction\* | Raw transaction | string |

### GetNetworkInfoOutput

#### Description

Represents the output of getting network information.

#### Schema

| Name              | Description       | Schema          |
| ----------------- | ----------------- | --------------- |
| Connections\*     | Total connections | integer (int32) |
| ProtocolVersion\* | Network protocol  | integer (int32) |
| Version\*         | Node version      | string          |

### GetTransactionPoolStatusOutput

#### Description

Represents the output of getting transaction pool status.

#### Schema

| Name        | Schema          |
| ----------- | --------------- |
| Queued\*    | integer (int32) |
| Validated\* | integer (int32) |

### LogEventDto

#### Description

Represents a log event.

#### Schema

| Name         | Schema           |
| ------------ | ---------------- |
| Address\*    | string           |
| Indexed\*    | < string > array |
| Name\*       | string           |
| NonIndexed\* | string           |

### MerklePathDto

#### Description

Represents a Merkle path.

#### Schema

| Name              | Schema                        |
| ----------------- | ----------------------------- |
| MerklePathNodes\* | < `MerklePathNodeDto` > array |

### MerklePathNodeDto

#### Description

Represents a node in a Merkle path.

#### Schema

| Name              | Schema  |
| ----------------- | ------- |
| Hash\*            | string  |
| IsLeftChildNode\* | boolean |

### MinerInRoundDto

#### Description

Represents information about a miner in a round.

#### Schema

| Name                           | Schema                       |
| ------------------------------ | ---------------------------- |
| ActualMiningTimes\*            | < string (date-time) > array |
| ExpectedMiningTime\*           | string (date-time)           |
| ImpliedIrreversibleBlockHeight | integer (int64)              |
| InValue\*                      | string                       |
| MissedBlocks\*                 | integer (int64)              |
| Order\*                        | integer (int32)              |
| OutValue\*                     | string                       |
| PreviousInValue\*              | string                       |
| ProducedBlocks\*               | integer (int64)              |
| ProducedTinyBlocks\*           | integer (int32)              |

### PeerDto

#### Description

Represents information about a peer node.

#### Schema

| Name                         | Schema                    |
| ---------------------------- | ------------------------- |
| BufferedAnnouncementsCount\* | integer (int32)           |
| BufferedBlocksCount\*        | integer (int32)           |
| BufferedTransactionsCount\*  | integer (int32)           |
| ConnectionTime\*             | integer (int64)           |
| Inbound\*                    | boolean                   |
| IpAddress\*                  | string                    |
| ProtocolVersion\*            | integer (int32)           |
| RequestMetrics\*             | < `RequestMetric` > array |
| ConnectionStatus\*           | string                    |
| NodeVersion\*                | string                    |

### RequestMetric

#### Description

Represents metrics for a request.

#### Schema

| Name            | Schema          |
| --------------- | --------------- |
| Info\*          | string          |
| MethodName\*    | string          |
| RequestTime\*   | `Timestamp`     |
| RoundTripTime\* | integer (int64) |

### RoundDto

#### Description

Represents a round in the blockchain.

#### Schema

| Name                                    | Schema                            |
| --------------------------------------- | --------------------------------- |
| ConfirmedIrreversibleBlockHeight\*      | integer (int64)                   |
| ConfirmedIrreversibleBlockRoundNumber\* | integer (int64)                   |
| ExtraBlockProducerOfPreviousRound\*     | string                            |
| IsMinerListJustChanged\*                | boolean                           |
| RealTimeMinerInformation\*              | < string, `MinerInRoundDto` > map |
| RoundId\*                               | integer (int64)                   |
| RoundNumber\*                           | integer (int64)                   |
| TermNumber\*                            | integer (int64)                   |

### SendRawTransactionInput

#### Description

Represents the input parameters for sending a raw transaction.

#### Schema

| Name                | Description     | Schema  |
| ------------------- | --------------- | ------- |
| ReturnTransaction\* | Return detail   | boolean |
| Signature\*         | Signature       | string  |
| Transaction\*       | Raw transaction | string  |

### SendRawTransactionOutput

#### Description

Represents the output of sending a raw transaction.

#### Schema

| Name            | Schema           |
| --------------- | ---------------- |
| Transaction     | `TransactionDto` |
| TransactionId\* | string           |

### SendTransactionInput

#### Description

Represents the input parameters for sending a transaction.

#### Schema

| Name             | Description     | Schema |
| ---------------- | --------------- | ------ |
| RawTransaction\* | Raw transaction | string |

### SendTransactionOutput

#### Description

Represents the output of sending a transaction.

#### Schema

| Name            | Schema |
| --------------- | ------ |
| TransactionId\* | string |

### SendTransactionsInput

#### Description

Represents the input parameters for sending multiple transactions.

#### Schema

| Name              | Description      | Schema |
| ----------------- | ---------------- | ------ |
| RawTransactions\* | Raw transactions | string |

### TaskQueueInfoDto

#### Description

Represents information about a task queue.

#### Schema

| Name | Schema |
|---------

|-----------------|
| Count* | integer (int32) |
| Time* | string (date-time)|

### Timestamp

#### Description

Represents a timestamp.

#### Schema

| Name      | Schema          |
| --------- | --------------- |
| Seconds\* | integer (int64) |
| Nanos\*   | integer (int32) |

### TransactionDto

#### Description

Represents a transaction.

#### Schema

| Name              | Schema             |
| ----------------- | ------------------ |
| Hash\*            | string             |
| Height\*          | integer (int64)    |
| MethodName\*      | string             |
| Params\*          | string             |
| Receiver\*        | string             |
| RefBlockNumber\*  | integer (int64)    |
| Sender\*          | string             |
| Time\*            | string (date-time) |
| TransactionSize\* | integer (int32)    |
| TxStatus\*        | string             |

### TransactionResultDto

#### Description

Represents the result of a transaction.

#### Schema

| Name            | Description                    | Schema                  |
| --------------- | ------------------------------ | ----------------------- |
| BlockHash       | Block hash (optional)          | string                  |
| BlockNumber     | Block number (optional)        | integer (int64)         |
| Bloom           | Bloom filter (optional)        | string                  |
| Error           | Error message (optional)       | string                  |
| Logs            | Logs (optional)                | < `LogEventDto` > array |
| ReturnValue     | Return value (optional)        | string                  |
| Status          | Transaction status (optional)  | string                  |
| Transaction     | Transaction details (optional) | `TransactionDto`        |
| TransactionId   | Transaction ID (optional)      | string                  |
| TransactionSize | Transaction size (optional)    | integer (int32)         |

### CalculateTransactionFeeInput

#### Description

Represents the input parameters for calculating transaction fees.

#### Schema

| Name           | Description                     | Schema |
| -------------- | ------------------------------- | ------ |
| RawTransaction | Raw transaction data (optional) | string |

### CalculateTransactionFeeOutput

#### Description

Represents the output of calculating transaction fees.

#### Schema

| Name           | Description                        | Schema                     |
| -------------- | ---------------------------------- | ------------------------   |
| Success        | Success flag (optional)            | bool                       |
| TransactionFee | Transaction fee details (optional) | Dictionary`<string, long>` |
| ResourceFee    | Resource fee details (optional)    | Dictionary`<string, long> `|
