---
sidebar_position: 4
title: Transactions
description: Transactions
image: /img/Logo.aelf.svg
---

# Overview

Transactions play a critical role in modifying the state of the aelf blockchain through interactions with smart contracts. Here’s how transactions function:

##### 1. Transaction Process:

   - Transactions are initiated by calling methods on smart contracts.
   - They are either sent to a node through RPC (Remote Procedure Call) or received from the network.

##### 2. Transaction Execution:

   - Upon broadcasting a transaction, if it meets validation criteria, it becomes eligible for inclusion in a block.
   - Once included in a block and executed by the node, the transaction potentially alters the state of the involved contracts.

In essence, transactions in AElf blockchain are fundamental actions that drive changes to the blockchain’s state, ensuring secure and efficient operation across the network.

## Smart Contract

In the aelf blockchain, smart contracts consist of two main components:

##### 1. State Definitions:

   - Smart contracts define a set of variables that represent their state.
   - These variables can store data such as account balances, token ownership, or any other relevant information.

##### 2. Methods:

   - Smart contracts include a set of methods designed to interact with and modify these states.
   - These methods are executed when triggered by transactions or external calls.
   - They can update the state variables based on predefined rules and conditions.

Smart contracts in aelf blockchain serve as self-executing contracts with predefined terms and conditions agreed upon by participating parties. They enable automated and trustless execution of agreements and transactions within the blockchain ecosystem.


## Action & View

In the aelf blockchain, smart contract methods are categorized into two types based on their functionality: **actions** and **views**.

##### 1. Action Methods:

   - **Definition**: Action methods are designed to modify the state of a contract.
   - **Execution**: When a transaction containing an action method is included in a block and successfully executed, it can change the internal state of the contract.

##### Example

```protobuf
rpc Vote (VoteInput) returns (google.protobuf.Empty) {
}
```
  - Action methods are typically used for operations that alter data within the blockchain, such as updating balances, transferring tokens, or recording votes.


##### 2. View Methods:

   - **Definition**: View methods retrieve data from the contract but do not modify its state under any circumstances.
   - **Execution**: They are purely read-only operations.

##### Example

```protobuf
rpc GetVotingResult (GetVotingResultInput) returns (VotingResult) {
    option (aelf.is_view) = true;
}
```

   - View methods are annotated with `option (aelf.is_view) = true;` in their protocol buffer (proto) definitions.
   - They are used for querying information stored in the contract, such as retrieving voting results, fetching account details, or checking contract status.
   

These distinctions ensure that smart contracts in AElf blockchain can effectively manage state changes while maintaining secure and efficient data access.



## Transaction Instance

In the aelf blockchain, a **Transaction** is structured as follows:

``` protobuf
option csharp_namespace = "AElf.Types";

message Transaction {
    Address from = 1;
    Address to = 2;
    int64 ref_block_number = 3;
    bytes ref_block_prefix = 4;
    string method_name = 5;
    bytes params = 6;
    bytes signature = 10000;
}
```

#### Working with Transactions in JS SDK

Use the `getTransaction` method to build a transaction object:

```javascript
import Aelf from 'aelf-sdk';

var rawTxn = proto.getTransaction(
  '65dDNxzcd35jESiidFXN5JV8Z7pCwaFnepuYQToNefSgqk9',
  'SomeMethod',
  encodedParams
);
```

This will create a transaction to the contract at address `65dDNxzcd35jESiidFXN5JV8Z7pCwaFnepuYQToNefSgqk9` and call `SomeMethod` with encoded parameters.


#### Key Fields in Transactions

  - **From**: The sender's address. Currently derived from the signature.
  - **To**: The contract address being called.
  - **MethodName**: The name of the method in the smart contract.
  - **Params**: The parameters to pass to the method.
  - **Signature**: The signature of the transaction, which includes fields like from, to, method, parameters, reference block number, and prefix.

Sign a transaction using the JS SDK:

```javascript
import Aelf from 'aelf-sdk';

var txn = Aelf.wallet.signTransaction(rawTxn, wallet.keyPair);
```

   - **RefBlockNumber & RefBlockPrefix**: Ensure the transaction is not expired. These two fields measure whether this transaction has expired. The transaction will be discarded if it is too old.
   - **Transaction Id**: A unique identifier for the transaction, consisting of a cryptographic hash of the essential fields, excluding the signature.

Note that the Transaction Id of transactions will be the same if the sender broadcasted several transactions with the same origin data, and then these transactions will be regarded as one transaction even though broadcasting several times.


## Verification

Before forwarding a transaction to other nodes, it is verified by the node. If the execution fails, the transaction is neither forwarded nor included in a new block.

Validation providers include:

   - **BasicTransactionValidationProvider**: Verifies transaction signature and size.
   - **TransactionExecutionValidationProvider**: Pre-executes the transaction before forwarding or packaging it.
   - **TransactionMethodValidationProvider**: Prevents view-only method transactions from being packaged into new blocks.

## Execution

In aelf, transactions are executed via the .NET reflection mechanism.

#### Execution Plugins

   - **FeeChargePreExecutionPlugin**: Charges method fees from the sender.
   - **MethodCallingThresholdPreExecutionPlugin**: Checks the calling threshold of specific contracts or methods.
   - **ResourceConsumptionPostExecutionPlugin**: Charges resource tokens based on the resources consumed during execution.

## Transaction Result

The data structure for `TransactionResult`:

```protobuf
message TransactionResourceInfo {
    repeated aelf.ScopedStatePath write_paths = 1;
    repeated aelf.ScopedStatePath read_paths = 2;
    ParallelType parallel_type = 3;
    aelf.Hash transaction_id = 4;
    aelf.Hash contract_hash = 5;
    bool is_nonparallel_contract_code = 6;
}
```
