---
sidebar_position: 5
title: Cross Chain Transfer
---


# Cross Chain Transfer

Cross chain transfer is one of the most commonly used cases when it comes to cross chain verification. AElf already supports cross chain transfer functionality in its contract. This section will explain how to transfer tokens across chains. It assumes a side chain is already deployed and has been indexed by the main chain.

The transfer process will always use the same contract methods and follow these two steps:

- **Initiate the transfer**
- **Receive the tokens**

## Prepare

There are a few preparation steps required before a cross chain transfer, which need to be done only once for each chain. If these steps are already completed, you can skip this part.

Let's say you want to transfer token **FOO** from chain **A** to chain **B**. Before you start, make sure you understand how cross chain transaction verification works. Any input containing `MerklePath` in the following steps means that cross chain verification is needed. Refer to the [cross chain verification documentation](crosschain-verification) for more details.

- **Validate `Token Contract` address on chain A**

  Send transaction `tx_1` to the `Genesis Contract` with the method `ValidateSystemContractAddress`. You need to provide `system_contract_hash_name` and the address of the `Token Contract`. `tx_1` should be successfully packed in the block.

  ```protobuf
  rpc ValidateSystemContractAddress(ValidateSystemContractAddressInput) returns (google.protobuf.Empty){}

  message ValidateSystemContractAddressInput {
      aelf.Hash system_contract_hash_name = 1;
      aelf.Address address = 2;
  }
  ```

- **Register the token contract address of chain A on chain B**

  Create a proposal for the `RegisterCrossChainTokenContractAddress` for the default parliament organization on chain B. Refer to the [Parliament contract documentation](../../reference/smart-contract-api/parliament) for more details. Apart from cross chain verification context, you also need to provide the origin data of `tx_1` and the `Token Contract` address on chain A.

  ```protobuf
  rpc RegisterCrossChainTokenContractAddress (RegisterCrossChainTokenContractAddressInput) returns (google.protobuf.Empty) {}

  message RegisterCrossChainTokenContractAddressInput {
      int32 from_chain_id = 1;
      int64 parent_chain_height = 2;
      bytes transaction_bytes = 3;
      aelf.MerklePath merkle_path = 4;
      aelf.Address token_contract_address = 5;
  }
  ```

- **Validate `TokenInfo` of FOO on chain A**

  Send transaction `tx_2` to the `Token Contract` with the method `ValidateTokenInfoExists` on chain A. You need to provide `TokenInfo` of FOO. `tx_2` should be successfully packed in the block.

  ```protobuf
  rpc ValidateTokenInfoExists(ValidateTokenInfoExistsInput) returns (google.protobuf.Empty){}

  message ValidateTokenInfoExistsInput {
      string symbol = 1;
      string token_name = 2;
      int64 total_supply = 3;
      int32 decimals = 4;
      aelf.Address issuer = 5;
      bool is_burnable = 6;
      int32 issue_chain_id = 7;
  }
  ```

- **Create token FOO on chain B**

  Send transaction `tx_3` to the `Token Contract` with the method `CrossChainCreateToken` on chain B. You need to provide the origin data of `tx_2` and the cross chain verification context of `tx_2`.

  ```protobuf
  rpc CrossChainCreateToken(CrossChainCreateTokenInput) returns (google.protobuf.Empty) {}

  message CrossChainCreateTokenInput {
      int32 from_chain_id = 1;
      int64 parent_chain_height = 2;
      bytes transaction_bytes = 3;
      aelf.MerklePath merkle_path = 4;
  }
  ```

## Initiate the Transfer

On the token contract of the source chain, the `CrossChainTransfer` method is used to trigger the transfer:

```protobuf
rpc CrossChainTransfer (CrossChainTransferInput) returns (google.protobuf.Empty) { }

message CrossChainTransferInput {
    aelf.Address to = 1;
    string symbol = 2;
    sint64 amount = 3;
    string memo = 4;
    int32 to_chain_id = 5;
    int32 issue_chain_id = 6;
}
```

### The fields of the input:

- `to`: the target address to receive the token
- `symbol`: the symbol of the token to be transferred
- `amount`: the amount of the token to be transferred
- `memo`: a memo field for this transfer
- `to_chain_id`: the destination chain ID where the tokens will be received
- `issue_chain_id`: the chain ID where the token was issued

## Receive on the Destination Chain

On the destination chain where the tokens need to be received, the `CrossChainReceiveToken` method is used to trigger the reception:

```protobuf
rpc CrossChainReceiveToken (CrossChainReceiveTokenInput) returns (google.protobuf.Empty) { }

message CrossChainReceiveTokenInput {
    int32 from_chain_id = 1;
    int64 parent_chain_height = 2;
    bytes transfer_transaction_bytes = 3;
    aelf.MerklePath merkle_path = 4;
}

rpc GetBoundParentChainHeightAndMerklePathByHeight (aelf.Int64Value) returns (CrossChainMerkleProofContext) {
    option (aelf.is_view) = true;
}

message CrossChainMerkleProofContext {
    int64 bound_parent_chain_height = 1;
    aelf.MerklePath merkle_path_from_parent_chain = 2;
}
```

### The fields of the input:

- `from_chain_id`: the source chain ID from which the cross chain transfer was launched

- `parent_chain_height`: the height of the block on the main chain that contains the `CrossChainTransfer` transaction (for main chain to side chain transfer). For side chain to side chain or side chain to main chain transfer, it is the result of `GetBoundParentChainHeightAndMerklePathByHeight` (input is the height of the `CrossChainTransfer`), accessible in the `bound_parent_chain_height` field.

- `transfer_transaction_bytes`: the serialized form of the `CrossChainTransfer` transaction.

- `merkle_path`: obtained from the source chain. The construction of merkle path data differs among cases:
  - **Main chain to side chain transfer**: merkle path from the main chain’s web API `GetMerklePathByTransactionIdAsync` (with `CrossChainTransfer` transaction ID as input).
  - **Side chain to side chain or side chain to main chain transfer**:
    - merkle path from the source chain’s web API `GetMerklePathByTransactionIdAsync` (with `CrossChainTransfer` transaction ID as input).
    - output of `GetBoundParentChainHeightAndMerklePathByHeight` method in the `CrossChain Contract` (with `CrossChainTransfer` transaction’s block height as input). Path nodes are in the `merkle_path_from_parent_chain` field of the `CrossChainMerkleProofContext` object.
    - Concatenate the above two merkle paths.
