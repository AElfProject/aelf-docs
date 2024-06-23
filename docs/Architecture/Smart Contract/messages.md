# Smart Contract Messages

In AElf, we use protobuf messages to call smart contracts and serialize their state. Here's a simple example of a message definition:

```cs
message CreateInput {
    string symbol = 1;
    sint64 totalSupply = 2;
    sint32 decimals = 3;
}
```

This message has three fields: 
- symbol (string)
- totalSupply (sint64)
- decimals (sint32). 

You can use any protobuf-supported types, including composite messages (messages containing other messages).

We use the proto3 version of protobuf for message and service definitions. You can refer to the full protobuf language reference for more details.