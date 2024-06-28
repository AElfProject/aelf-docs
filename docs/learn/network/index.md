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
- **NetworkService**: Manages sending/receiving requests, broadcasting items to peers, and handling network exceptions.
- **IPeerPool/PeerPool**: Manages active peer connections.
- **IPeer**: Defines peer interactions and metrics.
- **IaelfNetworkServer**: Manages network lifecycle and connections.

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
    ```cs
    message Handshake {
        HandshakeData handshake_data = 1;
        bytes signature = 2;
        bytes session_id = 3;
    }
    ```
- **HandshakeData Message**:
    ```cs
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

#### ConfirmHandshake
Confirms the handshake with the target node.
- **Request**:
    ```cs
    rpc ConfirmHandshake (ConfirmHandshakeRequest) returns (VoidReply) {}
    ```

### Broadcasting

#### BlockBroadcastStream
Receives block information after packaging.
- **Request**:
    ```cs
    rpc BlockBroadcastStream (stream BlockWithTransactions) returns (VoidReply) {}
    ```

#### TransactionBroadcastStream
Receives forwarded transaction information.
- **Request**:
    ```cs
    rpc TransactionBroadcastStream (stream aelf.Transaction) returns (VoidReply) {}
    ```

#### AnnouncementBroadcastStream
Receives block announcements.
- **Request**:
    ```cs
    rpc AnnouncementBroadcastStream (stream BlockAnnouncement) returns (VoidReply) {}
    ```

#### LibAnnouncementBroadcastStream
Receives last irreversible block (LIB) announcements.
- **Request**:
    ```cs
    rpc LibAnnouncementBroadcastStream (stream LibAnnouncement) returns (VoidReply) {}
    ```

### Block Request

#### RequestBlock
Requests a single block.
- **Request**:
    ```cs
    rpc RequestBlock (BlockRequest) returns (BlockReply) {}
    ```

#### RequestBlocks
Requests multiple blocks.
- **Request**:
    ```cs
    rpc RequestBlocks (BlocksRequest) returns (BlockList) {}
    ```

### Peer Management

#### Ping
Verifies network availability.
- **Request**:
    ```cs
    rpc Ping (PingRequest) returns (PongReply) {}
    ```

#### CheckHealth
Performs health checks on peers.
- **Request**:
    ```cs
    rpc CheckHealth (HealthCheckRequest) returns (HealthCheckReply) {}
    ```