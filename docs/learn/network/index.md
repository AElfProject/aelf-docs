---
sidebar_position: 4
title: Network
description: This guide explains the aelf's network layer. 
image: /img/Logo.aelf.svg
---

# Network

## Introduction
The network layer in aelf is vital for maintaining connections and communication between nodes. It supports higher-level logic like synchronization and allows node operators to monitor and manage network operations. aelf uses gRPC for connections to keep the design simple and flexible.

## Architecture
The network consists of three layers:

1. **aelf.OS**
   - Handles network events.
   - Runs background tasks for network operations.

2. **aelf.OS.Core.Network**
   - Provides services to higher levels.
   - Defines infrastructure components and types.

3. **aelf.OS.Network.Grpc**
   - Implements the infrastructure layer using gRPC.
   - Manages low-level functions like serialization and retrying.

### aelf.OS
This layer monitors and handles network-related events:
- **Transaction Accepted Event**: When a transaction is verified.
- **Block Mined Event**: When a block is packaged.
- **Block Accepted Event**: When a block is executed successfully.
- **New Irreversible Block Found Event**: When a new irreversible block is found.

It also performs regular tasks:
- **Peer Health Check**: Ensures connected peers are healthy.
- **Peer Retry Connection**: Attempts to reconnect with unhealthy peers.
- **Network Node Discovery**: Finds new nodes.

### aelf.OS.Core.Network
This core module includes:

- Application layer implementation:
   - **NetworkService**: Manages sending/receiving requests, broadcasting items to peers, and handling network exceptions.

- Infrastructure layer implementation and definition:
   - **IPeerPool/PeerPool**: Manages active peer connections.
   - **IPeer**: Defines peer interactions and metrics.
   - **IaelfNetworkServer**: Manages network lifecycle and connections.

- Definitions of types (network_types.proto and partial).

- Defines the event that should be launched from the infrastructure layer’s implementation.

### aelf.OS.Network.Grpc
Implements the infrastructure layer using gRPC:
- **GrpcPeer**: Implements `IPeer`.
- **GrpcStreamPeer**: Client-side `IPeer` implementation (node version >=1.4.0).
- **GrpcStreamBackPeer**: Server-side `IPeer` implementation (node version >=1.4.0).
- **GrpcNetworkServer**: Implements `IaelfNetworkServer`.
- **GrpcServerService**: Manages network service interfaces and data exchange.

Extra functionalities include:
- Serializing and deserializing requests.
- Implementing request/response mechanisms.
- Authentication.

## Protocol
Nodes use a defined network interface protocol for normal operation and data synchronization.

### Connection

#### DoHandshake
When a node connects, it exchanges handshake information. This includes chain status, current height, and more.

- **Request**: 
    ```cs
    rpc DoHandshake (HandshakeRequest) returns (HandshakeReply) {}
    ```
- **Handshake Message**:
    ```protobuf
    message Handshake {
        HandshakeData handshake_data = 1;
        bytes signature = 2;
        bytes session_id = 3;
    }
    ```

    - **handshake_data**: the data of handshake.
    - **signature**: the signatrue of handshake data.
    - **session_id**: randomly generated ids when nodes connect.


- **HandshakeData Message**:
    ```protobuf
    message HandshakeData {
        int32 chain_id = 1;
        int32 version = 2;
        int32 listening_port = 3;
        bytes pubkey = 4;
        aelf.Hash best_chain_hash = 5;
        int64 best_chain_height = 6;
        aelf.Hash last_irreversible_block_hash = 7;
        int64 last_irreversible_block_height = 8;
        google.protobuf.Timestamp time = 9;
    }
    ```

    -   **chain_id**: the id of current chain.
    -   **version**: current version of the network.
    -   **listening_port**: the port number at which the current node network is listening.
    -   **pubkey**: the public key of the current node used by the receiver to verify the data signature.
    -   **best_chain_hash**: the lastest block hash of the best branch.
    -   **best_chain_height**: the lastest block height of the best branch.
    -   **last_irreversible_block_hash**: the hash of the last irreversible block.
    -   **last_irreversible_block_height**: the height of the last irreversible block.
    -   **time**: the time of handshake.

- **HandshakeRequest Message**

    ```protobuf
    message HandshakeRequest {
        Handshake handshake = 1;
    }
    ```
   
    - **handshake**: complete handshake information, including handshake data and signature.


- **HandshakeReply Message**

    ```protobuf
    message HandshakeReply {
      Handshake handshake = 1;
      HandshakeError error = 2;
    }
    ```
   
    - **handshake**: complete handshake information, including handshake data and signature.
    - **error**: handshake error enum.


- **HandshakeError Enum**

    ```protobuf
     enum HandshakeError {
        HANDSHAKE_OK = 0;
        CHAIN_MISMATCH = 1;
        PROTOCOL_MISMATCH = 2;
        WRONG_SIGNATURE = 3;
        REPEATED_CONNECTION = 4;
        CONNECTION_REFUSED = 5;
        INVALID_CONNECTION = 6;
        SIGNATURE_TIMEOUT = 7;
     }
    ```
   
    - **HAND_SHAKE**: this message is a handshake request.
    - **PING**: this message is a ping request.
    - **CONFIRM_HAND_SHAKE**: this message is a confirm handshake reply.
    - **HEALTH_CHECK**: this message is a health check request or reply.
    - **REQUEST_BLOCK**: this message is a request block request or reply.
    - **REQUEST_BLOCKS**: this message is a request blocks request or reply.
    - **GET_NODES**: this message is a get nodes request or reply.
    - **BLOCK_BROADCAST**: this message is a block broadcast request or reply.
    - **TRANSACTION_BROADCAST**: this message is a transaction broadcast request or reply.
    - **ANNOUNCEMENT_BROADCAST**: this message is a announcement broadcast request or reply.
    - **LIB_ANNOUNCEMENT_BROADCAST**: this message is a lib announcement broadcast request or reply.
    - **DISCONNECT**: this message is a disconnect request or reply.


- **StreamType Enum**

    ```protobuf
     enum StreamType {
        UNKNOWN = 0;
        REQUEST = 1;
        REPLY = 2;
     }
    ```
   
    - **REQUEST**: this is a request.
    - **REPLY**: this is reply.

#### ConfirmHandshake
Confirms the handshake with the target node.

- **Request**:

    ```protobuf
    rpc ConfirmHandshake (ConfirmHandshakeRequest) returns (VoidReply) {}
    ```

    ```protobuf
    message ConfirmHandshakeRequest {
    }
    ```

### Broadcasting

#### BlockBroadcastStream
Receives block information after packaging.
- **Request**:
    ```protobuf
    rpc BlockBroadcastStream (stream BlockWithTransactions) returns (VoidReply) {}
    ```

    ```protobuf
       message BlockWithTransactions {
       aelf.BlockHeader header = 1;
       repeated aelf.Transaction transactions = 2;
    }
    ```
    - **header**
    - **transactions**

#### TransactionBroadcastStream
Receives forwarded transaction information.
- **Request**:
    ```protobuf
    rpc TransactionBroadcastStream (stream aelf.Transaction) returns (VoidReply) {}
    ```

#### AnnouncementBroadcastStream
Receives block announcements.

- **Request**:
    ```protobuf
    rpc AnnouncementBroadcastStream (stream BlockAnnouncement) returns (VoidReply) {}
    ```

    ```protobuf
       message BlockWithTransactions {
       aelf.BlockHeader header = 1;
       repeated aelf.Transaction transactions = 2;
    }
    ```

    - **block_hash**: the announced block hash.
    - **block_height**: the announced block height.


#### LibAnnouncementBroadcastStream
Receives last irreversible block (LIB) announcements.
- **Request**:
    ```protobuf
    rpc LibAnnouncementBroadcastStream (stream LibAnnouncement) returns (VoidReply) {}
    ```

    ```protobuf
    message LibAnnouncement{
        aelf.Hash lib_hash = 1;
        int64 lib_height = 2;
    }
    ```

    - **lib_hash**: the announced last irreversible block hash.
    - **lib_height**: the announced last irreversible block height.

### Block Request

#### RequestBlock
Requests a single block.

    ```protobuf
    rpc RequestBlock (BlockRequest) returns (BlockReply) {}
    ```

    - **BlockRequest Message**
       ```protobuf
            message BlockRequest {
            aelf.Hash hash = 1;
       }
       ```

       - **hash**: the block hash that you want to request.

    - **BlockReply Message**
       ```protobuf
       message BlockReply {
           string error = 1;
           BlockWithTransactions block = 2;
       }
       ```

       - **error**: error message.
       - **block**: the requested block, including complete block and transactions information.


#### RequestBlocks
Requests multiple blocks.
- **Request**:
    ```protobuf
    rpc RequestBlocks (BlocksRequest) returns (BlockList) {}
    ```

    - **BlocksRequest Message**
        ```protobuf
        message BlocksRequest {
            aelf.Hash previous_block_hash = 1;
            int32 count = 2;
        }
        ```

       - **previous_block_hash**: the previous block hash of the request blocks, and the result does not contain this block.
       - **count**: the number of blocks you want to request.

    - **BlockList Message**
        ```protobuf
        message BlockList {
           repeated BlockWithTransactions blocks = 1;
        }
        ```

       - **blocks**: the requested blocks, including complete blocks and transactions information.


### Peer Management

#### Ping
Verifies network availability.
- **Request**:
    ```protobuf
    rpc Ping (PingRequest) returns (PongReply) {}
    ```

#### CheckHealth
Performs health checks on peers.
- **Request**:
    ```protobuf
    rpc CheckHealth (HealthCheckRequest) returns (HealthCheckReply) {}
    ```