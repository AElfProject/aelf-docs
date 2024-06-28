---
sidebar_position: 1
title: Smart Contract Architecture
---

# Smart Contract Architecture

A blockchain platform works like a distributed database that stores all smart contracts. Each contract has a unique address used for state queries and updates. Methods in the contract code handle permission checks and logic.

## Smart Contract Parts in aelf

1. **Interface**: 
   - Supports multiple languages.
   - Uses Protobuf format for cross-language definitions.

2. **State**:
   - Language-specific SDK provides state prototypes.
   - Developers can query and update the state directly through these prototypes.

3. **Business Logic**:
   - Protobuf plugins generate the smart contract skeleton.
   - Developers fill in the logic by overriding methods.

Smart contracts in aelf are divided across the Kernel, the runtime, and the SDK. The Kernel handles core components and execution abstractions. Contracts rely on runtime modules and the SDK.

A smart contract consists of methods that interact with state variables. Transactions trigger these methods to modify the blockchain state.

## Architecture Overview

aelf defines Smart Contracts as micro-services, making them language-independent. For example, the Consensus Protocol is a service defined by a smart contract.

![Smart Contract Architecture](/img/sc-as-service.png)

### Chain Interactions

Smart contracts interact with the chain and access contextual information via a bridge and a bridge host. The SDKs implement features to communicate through the bridge.

Key contextual information provided by the bridge includes:
- `Self`: Address of the current contract.
- `Sender`: Address that sent the transaction.
- `Origin`: Address that signed the transaction.
- `OriginTransactionId` and `TransactionId`: IDs of the transactions involved.

The bridge also allows:
- Firing events (similar to logging).
- Calling methods on other contracts in a read-only manner.
- Sending inline transactions, which can persist state changes.

## State

Smart contracts read and/or modify state. The language SDKs provide state helpers and access through the bridge’s `StateProvider`.

## Runtime and Execution

When a block’s transactions are executed, each transaction generates a trace containing:
- Return value of the called method.
- Error outputs, if any.
- Results from inner calls in `InlineTraces`.
- Events launched in `Logs`.

## SDK

aelf has a native C# SDK for developing smart contracts in C#. It includes:
- Helpers to communicate with the bridge.
- Type infrastructure like `ContractState`, `MappedState`, and `SingletonState`.

Any developer or company can create an SDK and runtime for a specific language by adapting it to communicate with the bridge through gRPC.