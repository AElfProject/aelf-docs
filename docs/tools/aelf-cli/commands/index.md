---
sidebar_position: 2
title: Commands
description: aelf CLI Commands
---

# Commands Overview

## 具体配置

### Common Options

**datadir**: Directory containing `aelf-command` files, including encrypted account info keyStore files. Default:
`{home}/.local/share/aelf`

**endpoint**: The RPC service endpoint.

**account**: The account used to interact with the blockchain endpoint.

**password**: The password to unlock the given account.

You can set these options in several ways, in order of priority from low to high:

1. **Environment Variables**

   ```sh
   # Set datadir
   $ export AELF_CLI_DATADIR=/Users/{you}/.local/share/aelf

   # Set endpoint
   $ export AELF_CLI_ENDPOINT=https://tdvw-test-node.aelf.io

   # Set account
   $ export AELF_CLI_ACCOUNT=2Ue31YTuB5Szy7c...gtGi5uMQBYarYUR5oGin1sys6H
   ```

2. **Global Config File**
   - The global config file is located in `<datadir>/.aelfrc`. Avoid modifying this file manually.
   - Use the `aelf-command config` to modify the global config file.

### Config Command

**set**: Save configuration in the global `.aelfrc` file.

```bash
$ aelf-command config set endpoint https://tdvw-test-node.aelf.io
✔ Succeed!
```

**get**: Retrieve a value from the global `.aelfrc` file.

```bash
$ aelf-command config get endpoint https://tdvw-test-node.aelf.io
```

**delete**: Remove a key-value pair from the global `.aelfrc` file.

```bash
$ aelf-command config delete endpoint
✔ Succeed!
```

**list**: List all configurations stored in the global `.aelfrc` file.

```bash
$ aelf-command config list
endpoint=https://tdvw-test-node.aelf.io
password=yourpassword
```

**Usage:**

```bash
$ aelf-command config -h
Usage: aelf-command config [options] <flag> [key] [value]

Get, set, delete or list aelf-command config

Options:
  -h, --help  output usage information

Examples:

aelf-command config get <key>
aelf-command config set <key> <value>
aelf-command config delete <key>
aelf-command config list
```

### Working Directory Config File

The current working directory can also have a `.aelfrc` file. The format is the same as the global `.aelfrc` file:

```
endpoint https://tdvw-test-node.aelf.io
password yourpassword
```

Each line contains a `<key, value>` pair separated by a whitespace.

### CLI Parameters

You can pass common options directly as CLI parameters:

```sh
$ aelf-command console -a sadaf -p yourpassword -e https://tdvw-test-node.aelf.io
```

Options given in higher priority (e.g., CLI parameters) will overwrite those with lower priority (e.g., environment variables).

## 具体命令(#command-details)

### Create a New Account

Use the `create` command to create a new account.

```sh
$ aelf-command create -h
Usage: aelf-command create [options] [save-to-file]

Options:
  -c, --cipher [cipher]  Cipher algorithm to use (default: aes-128-ctr)
  -h, --help             Output usage information
```

**Examples:**

```sh
$ aelf-command create
$ aelf-command create <save-to-file>
$ aelf-command create -c aes-128-cbc
```

By following this guide, you should be able to easily set up and use aelf for your Web3 applications. For more detailed
information, please refer to the full aelf documentation.

### Load - Load an Account by a Given `Private Key` or `Mnemonic`

This command allows you to load an account from a backup.

**Load from Mnemonic:**

```sh
$ aelf-command load 'impact fork bulk museum swap design draw arctic load option ticket across'
```

**Load from Private Key:**

```sh
$ aelf-command load '9a2c6023e8b2221f4b02f4ccc5128392c1bd968ae45a42fa62848d793fff148f'
```

**Load from Prompting:**

```sh
$ aelf-command load
? Enter a private key or mnemonic › 9a2c6023e8b2221f4b02f4ccc5128392c1bd968ae45a42fa62848d793fff148f
```

### Wallet - Show Wallet Details

This command allows you to print wallet information, including the `private key`, `address`, `public key`, and `mnemonic`.

**Examples:**

```sh
$ aelf-command wallet -a GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk
AElf [Info]: Mnemonic            : impact fork bulk museum swap design draw arctic load option ticket across
AElf [Info]: Private Key         : 9a2c6023e8b2221f4b02f4ccc5128392c1bd968ae45a42fa62848d793fff148f
AElf [Info]: Public Key          : 04703bbe95e986c9d901f28edd60975a7a6c3b2dce41dfec2e7983d293c600e8249642a3da379c4194a6d62bd89afe6753e81acfc2b6bbf3b40736ee0949102071
AElf [Info]: Address             : GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk
```

### Proposal - Create a Proposal

There are three types of proposal contracts in aelf:

- AElf.ContractNames.Parliament
- AElf.ContractNames.Referendum
- AElf.ContractNames.Association

Depending on your needs, you can choose one and create a proposal.

#### Get an Organization Address or Create One

**Get the Default Organization's Address with the Parliament Contract**

```sh
$ aelf-command call AElf.ContractNames.Parliament GetDefaultOrganizationAddress
✔ Fetching contract successfully!
✔ Calling method successfully!
AElf [Info]:
Result:
"aeXhTqNwLWxCG6AzxwnYKrPMWRrzZBskW3HWVD9YREMx1rJxG"
✔ Succeed!
```

`aeXhTqNwLWxCG6AzxwnYKrPMWRrzZBskW3HWVD9YREMx1rJxG` is the default organization address.

The default organization includes all miners; every proposal under AElf.ContractNames.Parliament requires over 2/3 miner approval
to be released. **Create an Organization with the Referendum Contract**

```sh
$ aelf-command send AElf.ContractNames.Referendum
✔ Fetching contract successfully!
? Pick up a contract method: CreateOrganization

If you need to pass file contents as a parameter, you can enter the relative or absolute path of the file

Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <tokenSymbol>: ELF
? Enter the required param <proposalReleaseThreshold.minimalApprovalThreshold>: 1
? Enter the required param <proposalReleaseThreshold.maximalRejectionThreshold>: 0
? Enter the required param <proposalReleaseThreshold.maximalAbstentionThreshold>: 0
? Enter the required param <proposalReleaseThreshold.minimalVoteThreshold>: 1
? Enter the required param <proposerWhiteList.proposers>: ["GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk"]
? Enter the required param <creationToken>:
The params you entered is:
{
  "tokenSymbol": "ELF",
  "proposalReleaseThreshold": {
    "minimalApprovalThreshold": 1,
    "maximalRejectionThreshold": 0,
    "maximalAbstentionThreshold": 0,
    "minimalVoteThreshold": 1
  },
  "proposerWhiteList": {
    "proposers": [
      "GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk"
    ]
  }
}
✔ Succeed!
AElf [Info]:
Result:
{
  "TransactionId": "0106c04d7918d7634ad0ef9499b5366458d14ce87f735e4d39d3587052840bc1"
}
✔ Succeed!
```

#### Create a Proposal

```sh
$ aelf-command proposal
? Pick up a contract name to create a proposal: AElf.ContractNames.Parliament
? Enter an organization address: aeXhTqNwLWxCG6AzxwnYKrPMWRrzZBskW3HWVD9YREMx1rJxG
? Select the expired time for this proposal: 2222/07/03 13:09
? Optional, input an URL for proposal description:
? Enter a contract address or name: AElf.ContractNames.Token
✔ Fetching contract successfully!
? Pick up a contract method: Transfer

If you need to pass file contents as a parameter, you can enter the relative or absolute path of the file

Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <to>: GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk
? Enter the required param <symbol>: ELF
? Enter the required param <amount>: 100000000
? Enter the required param <memo>: test
AElf [Info]:
 {
  TransactionId: 'b99c63fc8aa2572d1d8c7c65dd52ad01926ed985ce045e3c8ad3dabeb4c6f2ba'
}
✔ loading proposal id...
AElf [Info]: Proposal id: 1df277bca3661cd74443fbbb711fc431cad8ccfd6bb46128d3f9e8b0d885dc3f.
✔ Succeed!
```

You can get the proposal id, then get the proposal’s status.

#### Get Proposal Status

```sh
$ aelf-command call AElf.ContractNames.Parliament GetProposal 1df277bca3661cd74443fbbb711fc431cad8ccfd6bb46128d3f9e8b0d885dc3f
AElf [Info]:
Result:
{
  "proposalId": "1df277bca3661cd74443fbbb711fc431cad8ccfd6bb46128d3f9e8b0d885dc3f",
  "contractMethodName": "Transfer",
  "toAddress": "ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx",
  "params": "CiIKICREfSjQ2i95I6kXpBdiFAMlQb2j0NGkyBlfPszMA0/HEgNFTEYYgMLXLyIEdGVzdA==",
  "expiredTime": {
    "seconds": "7968172181",
    "nanos": 141000000
  },
  "organizationAddress": "aeXhTqNwLWxCG6AzxwnYKrPMWRrzZBskW3HWVD9YREMx1rJxG",
  "proposer": "GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk",
  "toBeReleased": false,
  "approvalCount": "0",
  "rejectionCount": "0",
  "abstentionCount": "0"
}
✔ Succeed!
```

`toBeReleased` indicates whether you can release this proposal. By default, a proposal needs over 2/3 BP nodes' approval.

#### Release a Proposal

You can release a proposal when it gets approved.

```sh
$ aelf-command send AElf.ContractNames.Parliament Release 1df277bca3661cd74443fbbb711fc431cad8ccfd6bb46128d3f9e8b0d885dc3f
AElf [Info]:
 { TransactionId:
   '09c8c824d2e3aea1d...cefe4e236c5b818d6a01d4f7ca0b60fe99535' }
```

#### Get the Transaction Result

Use the `get-tx-result` command to retrieve the details of the transaction:

```sh
$ aelf-command get-tx-result b99c63fc8aa2572d1d8c7c65dd52ad01926ed985ce045e3c8ad3dabeb4c6f2ba
✔ Succeed!
AElf [Info]: {
  "TransactionId": "b99c63fc8aa2572d1d8c7c65dd52ad01926ed985ce045e3c8ad3dabeb4c6f2ba",
  "Status": "MINED",
  "Logs": [
    {
      "Address": "vcv1qewcsFN2tVWqLuu7DJ5wVFA8YEx5FFgCQBb1jMCbAQHxV",
      "Name": "ProposalCreated",
      "Indexed": [
        "EiIKIExmVoQ5QtJW9cSejVogutsxgut28BnGDCX3Y+Chrlf3"
      ],
      "NonIndexed": "CiIKIB3yd7yjZhzXREP7u3EfxDHK2Mz9a7RhKNP56LDYhdw/"
    }
  ],
  "Bloom": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAACAAAAAAAAAAAAAAAAAAEAAAAIAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAA==",
  "BlockNumber": 126568091,
  "BlockHash": "facc33cd87f39ee1d9ad38ca96c5cea82040f58737ab0a9faa19bf48b8623dc4",
  "Transaction": {
    "From": "GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk",
    "To": "vcv1qewcsFN2tVWqLuu7DJ5wVFA8YEx5FFgCQBb1jMCbAQHxV",
    "RefBlockNumber": 126568085,
    "RefBlockPrefix": "lpdm9g==",
    "MethodName": "CreateProposal",
    "Params": "{ \"contractMethodName\": \"Transfer\", \"toAddress\": \"ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx\", \"params\": \"CiIKICREfSjQ2i95I6kXpBdiFAMlQb2j0NGkyBlfPszMA0/HEgNFTEYYgMLXLyIEdGVzdA==\", \"expiredTime\": \"2222-07-03T05:09:41.141Z\", \"organizationAddress\": \"aeXhTqNwLWxCG6AzxwnYKrPMWRrzZBskW3HWVD9YREMx1rJxG\" }",
    "Signature": "B7RfSxydZK59oU6tqSK+Ojfo/VIvG92SVTUnGzN2bWER3uxuuhQ/axsSLbP28vjWYvPTfu+6i10W7y2Yl0ZrjQE="
  },
  "ReturnValue": "0a201df277bca3661cd74443fbbb711fc431cad8ccfd6bb46128d3f9e8b0d885dc3f",
  "Error": null,
  "TransactionSize": 320
}
```

The command outputs detailed information about the transaction, including its status, logs, and related block information.

#### Decode the Logs for Readable Result

```sh
$ aelf-command event b99c63fc8aa2572d1d8c7c65dd52ad01926ed985ce045e3c8ad3dabeb4c6f2ba

[Info]:
The results returned by
Transaction: b99c63fc8aa2572d1d8c7c65dd52ad01926ed985ce045e3c8ad3dabeb4c6f2ba is:
[
  {
    "Address": "vcv1qewcsFN2tVWqLuu7DJ5wVFA8YEx5FFgCQBb1jMCbAQHxV",
    "Name": "ProposalCreated",
    "Indexed": [
      "EiIKIExmVoQ5QtJW9cSejVogutsxgut28BnGDCX3Y+Chrlf3"
    ],
    "NonIndexed": "CiIKIB3yd7yjZhzXREP7u3EfxDHK2Mz9a7RhKNP56LDYhdw/",
    "Result": {
      "organizationAddress": "aeXhTqNwLWxCG6AzxwnYKrPMWRrzZBskW3HWVD9YREMx1rJxG",
      "proposalId": "1df277bca3661cd74443fbbb711fc431cad8ccfd6bb46128d3f9e8b0d885dc3f"
    }
  }
]
✔ Succeed!
```

This command provides a readable format of the events logged by the transaction. The output includes details such as the address,
event name, indexed data, non-indexed data, and a decoded result.

##### Summary of Decoded Event

**organizationAddress**: aeXhTqNwLWxCG6AzxwnYKrPMWRrzZBskW3HWVD9YREMx1rJxG **proposalId**:
1df277bca3661cd74443fbbb711fc431cad8ccfd6bb46128d3f9e8b0d885dc3f

These steps and commands will help you retrieve and decode the transaction results on the ealf blockchain.

For more details, check the descriptions of [`aelf-command event`](#event---deserialize-transaction-result).

### Deploy a smart contract

**Note**: The `deploy` command has been deprecated. Please use `aelf-command` send or `aelf-command proposal` instead.

### event - Deserialize Transaction Result

To view details from a transaction, including events triggered by contract methods, you can use the `aelf-command event` tool.
Here’s how:

```sh
$ aelf-command event ef17ac2078c2b31a702b9edc754bfa56f1c37931f52f9dd8e2b9dc65769966b1

[Info]:
The results returned by
Transaction: ef17ac2078c2b31a702b9edc754bfa56f1c37931f52f9dd8e2b9dc65769966b1 is:
[
  {
    "Address": "ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx",
    "Name": "Transferred",
    "Indexed": [
      "CiIKIKl+hAq40lOArRO+3srxpNVRFOaGZtH4WUSLGW7qDyoI",
      "EiIKINhKsag9MOuJ2sbYwzlGfKCeOcGHu4qPWYp6DeqjrOZw",
      "GgNFTEY="
    ],
    "NonIndexed": "IICglKWNHQ==",
    "Result": {
      "from": "2HeW7S9HZrbRJZeivMppUuUY3djhWdfVnP5zrDsz8wqq6hKMfT",
      "to": "2eFtDbjWBDPJ6oNtRLjYuS5XrtjSzw4CnrCM79U1HjdvKkGYrF",
      "symbol": "ELF",
      "amount": "1000000000000"
    }
  }
]
✔ Succeed!
```

#### Explanation:

When you execute this command, you'll get details about the transaction with ID
fe1974fde291e44e16c55db666f2c747323cdc584d616de05c88c8bae18ecceb. Here's what the output means:

- **from**: 表示发送方的地址，即交易中的发起者
- **to**: 表示接收方的地址，即交易中的接收者
- **symbol**: 表示交易的代币符号
- **amount**: 表示交易的数量或金额.
- **Result**: Decoded information from the event, providing readable details such as author, code hash, and address.

This command helps you understand what happened during a transaction, especially useful when dealing with events triggered by
smart contracts.

### send - Send a transaction

```sh
$ aelf-command send AElf.ContractNames.Referendum
✔ Fetching contract successfully!
? Pick up a contract method: CreateOrganization

If you need to pass file contents as a parameter, you can enter the relative or absolute path of the file

Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <tokenSymbol>: ELF
? Enter the required param <proposalReleaseThreshold.minimalApprovalThreshold>: 1
? Enter the required param <proposalReleaseThreshold.maximalRejectionThreshold>: 0
? Enter the required param <proposalReleaseThreshold.maximalAbstentionThreshold>: 0
? Enter the required param <proposalReleaseThreshold.minimalVoteThreshold>: 1
? Enter the required param <proposerWhiteList.proposers>: ["GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk"]
? Enter the required param <creationToken>:
The params you entered is:
{
  "tokenSymbol": "ELF",
  "proposalReleaseThreshold": {
    "minimalApprovalThreshold": 1,
    "maximalRejectionThreshold": 0,
    "maximalAbstentionThreshold": 0,
    "minimalVoteThreshold": 1
  },
  "proposerWhiteList": {
    "proposers": [
      "GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk"
    ]
  }
}
✔ Succeed!
AElf [Info]:
Result:
{
  "TransactionId": "0106c04d7918d7634ad0ef9499b5366458d14ce87f735e4d39d3587052840bc1"
}
✔ Succeed!
```

You can effectively send transactions on the aelf blockchain using the `aelf-command send` interface. Adjust parameters and
contract names as necessary for different contract methods or system contracts within AElf.

### call - Call a read-only method on a contract

```sh
$ aelf-command call AElf.ContractNames.Parliament GetDefaultOrganizationAddress
✔ Fetching contract successfully!
✔ Calling method successfully!
AElf [Info]:
Result:
"aeXhTqNwLWxCG6AzxwnYKrPMWRrzZBskW3HWVD9YREMx1rJxG"
✔ Succeed!
```

### get-chain-status - Get the current status of the block chain

```sh
$ aelf-command get-chain-status
✔ Succeed
{
  "ChainId": "AELF",
  "Branches": {
    "59937e3c16860dedf0c80955f4995a5604ca43ccf39cd52f936fb4e5a5954445": 4229086
  },
  "NotLinkedBlocks": {},
  "LongestChainHeight": 4229086,
  "LongestChainHash": "59937e3c16860dedf0c80955f4995a5604ca43ccf39cd52f936fb4e5a5954445",
  "GenesisBlockHash": "da5e200259320781a1851081c99984fb853385153991e0f00984a0f5526d121c",
  "GenesisContractAddress": "2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8",
  "LastIrreversibleBlockHash": "497c24ff443f5cbd33da24a430f5c6c5e0be2f31651bd89f4ddf2790bcbb1906",
  "LastIrreversibleBlockHeight": 4229063,
  "BestChainHash": "59937e3c16860dedf0c80955f4995a5604ca43ccf39cd52f936fb4e5a5954445",
  "BestChainHeight": 4229086
}
```

## get-tx-result - Get a transaction result

```sh
$ aelf-command get-tx-result b99c63fc8aa2572d1d8c7c65dd52ad01926ed985ce045e3c8ad3dabeb4c6f2ba

AElf [Info]: {
  "TransactionId": "b99c63fc8aa2572d1d8c7c65dd52ad01926ed985ce045e3c8ad3dabeb4c6f2ba",
  "Status": "MINED",
  "Logs": [
    {
      "Address": "vcv1qewcsFN2tVWqLuu7DJ5wVFA8YEx5FFgCQBb1jMCbAQHxV",
      "Name": "ProposalCreated",
      "Indexed": [
        "EiIKIExmVoQ5QtJW9cSejVogutsxgut28BnGDCX3Y+Chrlf3"
      ],
      "NonIndexed": "CiIKIB3yd7yjZhzXREP7u3EfxDHK2Mz9a7RhKNP56LDYhdw/"
    }
  ],
  "Bloom": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAACAAAAAAAAAAAAAAAAAAEAAAAIAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAA==",
  "BlockNumber": 126568091,
  "BlockHash": "facc33cd87f39ee1d9ad38ca96c5cea82040f58737ab0a9faa19bf48b8623dc4",
  "Transaction": {
    "From": "GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk",
    "To": "vcv1qewcsFN2tVWqLuu7DJ5wVFA8YEx5FFgCQBb1jMCbAQHxV",
    "RefBlockNumber": 126568085,
    "RefBlockPrefix": "lpdm9g==",
    "MethodName": "CreateProposal",
    "Params": "{ \"contractMethodName\": \"Transfer\", \"toAddress\": \"ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx\", \"params\": \"CiIKICREfSjQ2i95I6kXpBdiFAMlQb2j0NGkyBlfPszMA0/HEgNFTEYYgMLXLyIEdGVzdA==\", \"expiredTime\": \"2222-07-03T05:09:41.141Z\", \"organizationAddress\": \"aeXhTqNwLWxCG6AzxwnYKrPMWRrzZBskW3HWVD9YREMx1rJxG\" }",
    "Signature": "B7RfSxydZK59oU6tqSK+Ojfo/VIvG92SVTUnGzN2bWER3uxuuhQ/axsSLbP28vjWYvPTfu+6i10W7y2Yl0ZrjQE="
  },
  "ReturnValue": "0a201df277bca3661cd74443fbbb711fc431cad8ccfd6bb46128d3f9e8b0d885dc3f",
  "Error": null,
  "TransactionSize": 320
}
```

## get-blk-info - Get the block info by a block height or a block hash

Either a block height or a block hash can be provided as an argument to this sub-command.

```sh
$ aelf-command get-blk-info 7900508
✔ Succeed!
AElf [Info]:
 {
  BlockHash: 'e16e08c916765968de862b1358c618817f4ccc5c5c8f10d64e75e8208902f410',
  Header: {
    PreviousBlockHash: '6489ca5330884565b80de5de97cdcef5113bd1f1697b0bb561faabcef6505679',
    MerkleTreeRootOfTransactions: 'e5e8482f2bbf7d9add7408552e34a746a4d6873866b0ac86ffd25d533236c3cd',
    MerkleTreeRootOfWorldState: '7345ea86e722e18aa9eadb5a86ee91cf96fa66c756f72417d93520d3ab3dd5af',
    MerkleTreeRootOfTransactionState: '3de130b601adb26673918126687308d6b37bcae3cba8fbc7bc66d63bbea28ccd',
    Extra: '{ "CrossChain": "", "Consensus": "CkEELSIQWlfBBh3Tz26IuzGb91RXYmnerlhu0QDIR8qx0/G1V3PDH15zlnD1P9Tw2Fn7umvPjSgPFd6Nu8RRGBUXqxKuBwjmpwoS+QIKggEwNDJkMjIxMDVhNTdjMTA2MWRkM2NmNmU4OGJiMzE5YmY3NTQ1NzYyNjlkZWFlNTg2ZWQxMDBjODQ3Y2FiMWQzZjFiNTU3NzNjMzFmNWU3Mzk2NzBmNTNmZDRmMGQ4NTlmYmJhNmJjZjhkMjgwZjE1ZGU4ZGJiYzQ1MTE4MTUxN2FiEvEBOIK7YEqCATA0MmQyMjEwNWE1N2MxMDYxZGQzY2Y2ZTg4YmIzMTliZjc1NDU3NjI2OWRlYWU1ODZlZDEwMGM4NDdjYWIxZDNmMWI1NTc3M2MzMWY1ZTczOTY3MGY1M2ZkNGYwZDg1OWZiYmE2YmNmOGQyODBmMTVkZThkYmJjNDUxMTgxNTE3YWJqCwiA+9mWBhDIgIlvagwIgPvZlgYQlJ2m1QFqDAiA+9mWBhDwhoOcAmoMCID72ZYGELjnzOsCagwIgPvZlgYQoMqgrQNqCwiB+9mWBhCw/KwRagsIgfvZlgYQ3LLFUYABB4gB1priAxKHAQqCATA0ZTgyYjcyMTk4ODZiYTU0YWIwYjU4ZWNlOWMyMzQyMmRlOWVlMDkyZTg5NDExODFjZGJkM2Q4ZDJkMjRlMzY5OGY0YjI2NWFlYmRkM2IwMWQyOWFlODU0ZDYyZWU5NDI3MTk4YTQxZTdmZTNkYjMyMmJlN2M5YzJmNjYyZjc3Y2QSABKHAQqCATA0MzU3YjFhZDhjMDU3NmQyNmFhM2Q2YjJkMDliMmFkMDNiZjVkYmNlMjIzNzMwNjM2MTQ1Y2Y0NDNmZWIzN2ZiMTkxNTZiOTkxOTRmYTQ4YWQ5MjU2NmI5NWM0NTQ5MzlkZjJjYTcxZTliZjUxN2MyNTkwYzJlZWRkZDc2Y2Y5MWUSABKHAQqCATA0Nzc5NGU1YjQyNDE3N2JmMDNmOWQ1ZTU0MWU3YmRhMjgwNTYyMDlkODE0YzY4YWVkMjY3MGU0NmQ5NjNjODVkMDRkYTVmNjllZjgyNDU4ZTg2MTc0ODkwNzQzOTg1ZTI5Nzg0MzQ4NWIxMGQwMjk1ZmMyOGI4ODUzMzU1Y2ZiOGISABKHAQqCATA0NTI3NjJlYzIxZmVkMjlmNGNiODZkZjNmYzA4ZjAyYTIzODVjODRkNDVkZmQ0ZWY1NDAwNTk3M2I0MWY1YWIyNjRlMmU1ZGUwZDQ2ZWM0NWU2NDkxYjk4MTA1MDM4MGIwYWExOTcxNGFmNGYwODc4NTYwMzIxODkzZTYyNjMxZTQSAFDY5sHxHhgE", "SystemTransactionCount": "CAI=" }',
    Height: 7900508,
    Time: '2022-07-19T09:46:41.1710063Z',
    ChainId: 'tDVW',
    Bloom: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
    SignerPubkey: '042d22105a57c1061dd3cf6e88bb319bf754576269deae586ed100c847cab1d3f1b55773c31f5e739670f53fd4f0d859fbba6bcf8d280f15de8dbbc451181517ab'
  },
  Body: {
    TransactionsCount: 2,
    Transactions: [
      '26b346d1042423850627059991fb426a520d43393f8a1b28a58353e18bd9384c',
      '45314ca224418c43a4dc2c0b1a9fe491c0ad1f4e099bade676b219d29f4dcf75'
    ]
  },
  BlockSize: 1456
}
```

## console - Open an interactive console

```sh
$ aelf-command console
✔ Succeed!
Welcome to aelf interactive console. Ctrl + C to terminate the program. Double tap Tab to list objects

   ╔═══════════════════════════════════════════════════════════╗
   ║                                                           ║
   ║   NAME       | DESCRIPTION                                ║
   ║   AElf       | imported from aelf-sdk                     ║
   ║   aelf       | instance of aelf-sdk, connect to           ║
   ║              | http://13.231.179.27:8000                  ║
   ║   _account   | instance of AElf wallet, wallet address    ║
   ║              | is                                         ║
   ║              | 2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR…   ║
   ║              | 5oGin1sys6H                                ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝
```

### dapp-server - Start a socket.io server for supplying services for dApps

Are you developing a dApp and need an environment to manage wallet information and connect to the AElf chain? You can easily start
a local development server using this sub-command.

```shell
$ aelf-command dapp-server
AElf [Info]: DApp server is listening on port 35443
```

Alternatively, you can specify a different port:

```shell
$ aelf-command dapp-server --port 40334
AElf [Info]: DApp server is listening on port 40334
```

This server uses Socket.io to listen on the specified local port. You can use aelf-bridge to connect to this server with the
following code:

```javascript
import AElfBridge from 'aelf-bridge';

const bridgeInstance = new AElfBridge({
  proxyType: 'SOCKET.IO',
  socketUrl: 'http://localhost:35443',
  channelType: 'ENCRYPT'
});

// Connect to dapp-server
bridgeInstance.connect().then(console.log).catch(console.error);
```

For more details, check out the [aelf-bridge](https://github.com/AElfProject/aelf-js-bridge) and
[aelf-bridge-demo](https://github.com/AElfProject/aelf-bridge-demo).