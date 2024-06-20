# Cross Chain Transaction Verification

This section provides guidance on verifying transactions across different blockchain chains, assuming that a side chain has already been deployed and indexed by the main chain.

## Sending a Transaction

Any transaction with the status "Mined" can be verified, provided that the transaction has been indexed.

## Verifying the Transaction

There are two scenarios for verification:

- Verifying a transaction on the main chain.
- Verifying a transaction on a side chain.

```protobuf
rpc VerifyTransaction (VerifyTransactionInput) returns (google.protobuf.BoolValue) {
  option (aelf.is_view) = true;
}

message VerifyTransactionInput {
    aelf.Hash transaction_id = 1;
    aelf.MerklePath path = 2;
    int64 parent_chain_height = 3;
    int32 verified_chain_id = 4;
}
```

The **VerifyTransaction** method is used for verification and returns whether the transaction was mined and indexed by the destination chain. The method is the same for both scenarios; only the input values differ.

### Verifying a Main Chain Transaction

To verify a main chain transaction on a side chain, use the **VerifyTransaction** method on the side chain with the following input values:

- `parent_chain_height`: The height of the block on the main chain where the transaction was packed.
- `transaction_id`: The ID of the transaction to verify.
- `path`: The Merkle path obtained from the main chain's API using **GetMerklePathByTransactionIdAsync** with the transaction ID.
- `verified_chain_id`: The chain ID of the main chain.

You can retrieve the Merkle path of a transaction in a block by using the chain's API method **GetMerklePathByTransactionIdAsync**.

### Verifying a Side Chain Transaction

For verifying a side chain transaction:

1. Obtain the Merkle path using **GetMerklePathByTransactionIdAsync**, similar to main chain verification.
2. Retrieve the `CrossChainMerkleProofContext` of the transaction from the source chain using **GetBoundParentChainHeightAndMerklePathByHeight**.

```protobuf
rpc GetBoundParentChainHeightAndMerklePathByHeight (google.protobuf.Int64Value) returns (CrossChainMerkleProofContext) {
    option (aelf.is_view) = true;
}

message CrossChainMerkleProofContext {
    int64 bound_parent_chain_height = 1;
    aelf.MerklePath merkle_path_from_parent_chain = 2;
}
```

Using the result from the above API, call **VerifyTransaction** on the target chain with:

- `transaction_id`: The ID of the transaction to verify.
- `parent_chain_height`: Use the `bound_parent_chain_height` field from `CrossChainMerkleProofContext`.
- `path`: Concatenate the two Merkle paths in order:
  - The Merkle path of the transaction (obtained from **GetMerklePathByTransactionIdAsync**).
  - The `merkle_path_from_parent_chain` field from `CrossChainMerkleProofContext`.
- `verified_chain_id`: The chain ID of the side chain where the transaction was mined.
