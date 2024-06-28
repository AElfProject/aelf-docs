---
sidebar_position: 2
title: Smart Contract Service
---

# Smart Contract Service

When writing a smart contract in aelf, the first step is to define it so our tools can generate it. aelf contracts are defined and generated using gRPC and protobuf.

## Example: Multi-Token Contract

Here is a simplified part of our multi-token contract definition:

```cs
syntax = "proto3";

package token;
option csharp_namespace = "AElf.Contracts.MultiToken.Messages";

service TokenContract {
    option (aelf.csharp_state) = "AElf.Contracts.MultiToken.TokenContractState";

    // Actions
    rpc Create (CreateInput) returns (google.protobuf.Empty) { }
    rpc Transfer (TransferInput) returns (google.protobuf.Empty) { }

    // Views
    rpc GetBalance (GetBalanceInput) returns (GetBalanceOutput) {
        option (aelf.is_view) = true;
    }
}
```

## Service Methods
There are two types of methods in a service:

### Actions
- These methods take input and output protobuf messages.
- They usually modify the state of the chain.

Example:
```cs
rpc Create (CreateInput) returns (google.protobuf.Empty) { }
```

- Takes a protobuf message as input and returns a protobuf message.
- google.protobuf.Empty signifies returning nothing.
- Convention: append Input to protobuf types used as parameters.

### Views
- These methods do not modify the state of the chain.
- They are used to query the state.

Example:
```cs
rpc GetBalance (GetBalanceInput) returns (GetBalanceOutput) {
    option (aelf.is_view) = true;
}
```
- Annotated with a view option to indicate it's read-only.