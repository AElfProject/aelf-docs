---
sidebar_position: 2
title: Commands
description: aelf CLI Commands
---

# Commands Overview

### Common Options

**datadir**: Directory containing `aelf-command` files, including encrypted account info keyStore files. Default: `{home}/.local/share/aelf`

**endpoint**: The RPC service endpoint.

**account**: The account used to interact with the blockchain endpoint.

**password**: The password to unlock the given account.

You can set these options in several ways, in order of priority from low to high:

1. **Environment Variables**
    ```sql
    # Set datadir
    $ export AELF_CLI_DATADIR=/Users/{you}/.local/share/aelf
    
    # Set endpoint
    $ export AELF_CLI_ENDPOINT=http://127.0.0.1:8000
    
    # Set account
    $ export AELF_CLI_ACCOUNT=2Ue31YTuB5Szy7c...gtGi5uMQBYarYUR5oGin1sys6H
    ```

2. **Global Config File**
    - The global config file is located in `<datadir>/.aelfrc`. Avoid modifying this file manually.
    - Use the `aelf-command config` to modify the global config file.

### Config Command

**set**: Save configuration in the global `.aelfrc` file.

```sql
$ aelf-command config set endpoint http://127.0.0.1:8000
✔ Succeed!
```

**get**: Retrieve a value from the global `.aelfrc` file.
```sql
$ aelf-command config get endpoint
http://127.0.0.1:8000
```

**delete**: Remove a key-value pair from the global `.aelfrc` file.
```sql
$ aelf-command config delete endpoint
✔ Succeed!
```

**list**: List all configurations stored in the global `.aelfrc` file.
```sql
$ aelf-command config list
endpoint=http://127.0.0.1:8000
password=password
```

**Usage:**
```sql
$ aelf-command config -h
Usage: aelf-command config [options] <flag> [key] [value]

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
endpoint http://127.0.0.1:8000
password yourpassword
```
Each line contains a `<key, value>` pair separated by a whitespace.

### CLI Parameters

You can pass common options directly as CLI parameters:
```sql
$ aelf-command console -a sadaf -p password -e http://127.0.0.1:8000
```
Options given in higher priority (e.g., CLI parameters) will overwrite those with lower priority (e.g., environment variables).

### Create a New Account

Use the `create` command to create a new account.

```sql
$ aelf-command create -h
Usage: aelf-command create [options] [save-to-file]

Options:
  -c, --cipher [cipher]  Cipher algorithm to use (default: aes-128-ctr)
  -h, --help             Output usage information
```

**Examples:**
```sql
$ aelf-command create
$ aelf-command create <save-to-file>
$ aelf-command create -c aes-128-cbc
```

By following this guide, you should be able to easily set up and use aelf for your Web3 applications. For more detailed information, please refer to the full aelf documentation.


## Load - Load an Account by a Given `Private Key` or `Mnemonic`

This command allows you to load an account from a backup.

### Load from Mnemonic

```sql
$ aelf-command load 'great mushroom loan crisp ... door juice embrace'
```

### Load from Private Key

```sql
$ aelf-command load 'e038eea7e151eb451ba2901f7...b08ba5b76d8f288'
```

### Load from Prompting

```sql
$ aelf-command load
? Enter a private key or mnemonic › e038eea7e151eb451ba2901f7...b08ba5b76d8f288
```

## Wallet - Show Wallet Details

This command allows you to print wallet information, including the `private key`, `address`, `public key`, and `mnemonic`.

```sql
$ aelf-command wallet -a C91b1SF5mMbenHZTfdfbJSkJcK7HMjeiuw...8qYjGsESanXR
AElf [Info]: 
Private Key         : 97ca9fbece296231f26bee0e493500810f...cbd984f69a8dc22ec9ec89ebb00
Public Key          : 04c30dd0c3b5abfc85a11b15dabd0de926...74fe04e92eaebf2e4fef6445d9b9b11efe6f4b70c8e86644b72621f9987dc00bb1eab44a9bd7512ea53f93937a5d0
Address             : C91b1SF5mMbenHZTfdfbJSkJcK7HMjeiuw...8qYjGsESanXR
```

## Proposal - Create a Proposal

There are three types of proposal contracts in AElf:

- AElf.ContractNames.Parliament
- AElf.ContractNames.Referendum
- AElf.ContractNames.Association

Depending on your needs, you can choose one and create a proposal.

### Get an Organization Address or Create One

**Get the Default Organization's Address with the Parliament Contract**

```sql
$ aelf-command call AElf.ContractNames.Parliament GetDefaultOrganizationAddress
✔ Fetching contract successfully!
✔ Calling method successfully!
AElf [Info]:
Result:
"BkcXRkykRC2etHp9hgFfbw2ec1edx7ERBxYtbC97z3Q2bNCwc"
✔ Succeed!
```

`BkcXRkykRC2etHp9hgFfbw2ec1edx7ERBxYtbC97z3Q2bNCwc` is the default organization address.

The default organization includes all miners; every proposal under AElf.ContractNames.Parliament requires over 2/3 miner approval to be released.

**Create an Organization with the Referendum Contract**

```sql
$ aelf-command send AElf.ContractNames.Referendum
✔ Fetching contract successfully!
? Pick up a contract method: CreateOrganization

If you need to pass file contents as a parameter, you can enter the relative or absolute path of the file.

Enter the params one by one, type `Enter` to skip optional parameters:
? Enter the required param <tokenSymbol>: ELF
? Enter the required param <proposalReleaseThreshold.minimalApprovalThreshold>: 666
? Enter the required param <proposalReleaseThreshold.maximalRejectionThreshold>: 666
? Enter the required param <proposalReleaseThreshold.maximalAbstentionThreshold>: 666
? Enter the required param <proposalReleaseThreshold.minimalVoteThreshold>: 666
? Enter the required param <proposerWhiteList.proposers>: ["2hxkDg6Pd2d4yU1A16PTZVMMrEDYEPR8oQojMDwWdax5LsBaxX"]
The params you entered is:
{
  "tokenSymbol": "ELF",
  "proposalReleaseThreshold": {
    "minimalApprovalThreshold": 666,
    "maximalRejectionThreshold": 666,
    "maximalAbstentionThreshold": 666,
    "minimalVoteThreshold": 666
  },
  "proposerWhiteList": {
    "proposers": [
      "2hxkDg6Pd2d4yU1A16PTZVMMrEDYEPR8oQojMDwWdax5LsBaxX"
    ]
  }
}
✔ Succeed!
AElf [Info]:
Result:
{
  "TransactionId": "273285c7e8825a0af5291dd5d9295f746f2bb079b30f915422564de7a64fc874"
}
✔ Succeed!
```

### Create a Proposal

```sql
$ aelf-command proposal
? Pick up a contract name to create a proposal: AElf.ContractNames.Parliament
? Enter an organization address: BkcXRkykRC2etHp9hgFfbw2ec1edx7ERBxYtbC97z3Q2bNCwc
? Select the expired time for this proposal: 2022/09/23 22:06
? Optional, input a URL for proposal description:
? Enter a contract address or name: AElf.ContractNames.Token
✔ Fetching contract successfully!
? Pick up a contract method: Transfer

If you need to pass file contents to the contract method, you can enter the relative or absolute path of the file instead.

Enter required params one by one:
? Enter the required param <to>: 2hxkDg6Pd2d4yU1A16PTZVMMrEDYEPR8oQojMDwWdax5LsBaxX
? Enter the required param <symbol>: ELF
? Enter the required param <amount>: 100000000
? Enter the required param <memo>: test
AElf [Info]:
 { TransactionId:
   '09c8c824d2e3aea1d6cd15b7bb6cefe4e236c5b818d6a01d4f7ca0b60fe99535' }
✔ loading proposal id...
AElf [Info]: Proposal id: "bafe83ca4ec5b2a2f1e8016d09b21362c9345954a014379375f1a90b7afb43fb".
✔ Succeed!
```

You can get the proposal id, then get the proposal’s status.


### Get Proposal Status

```sql
$ aelf-command call AElf.ContractNames.Parliament GetProposal bafe83ca4ec5b2a2f1e8016d09b21362c9345954a014379375f1a90b7afb43fb
{
  ...
  "expiredTime": {
    "seconds": "1663942010",
    "nanos": 496000
  },
  "organizationAddress": "BkcXRkykRC2etHp9hgFfbw2ec1edx7ERBxYtbC97z3Q2bNCwc",
  "proposer": "2tj7Ea67fuQfVAtQZ3WBmTv7AAJ8S9D2L4g6PpRRJei6JXk7RG",
  "toBeReleased": false
}
✔ Succeed!
```

`toBeReleased` indicates whether you can release this proposal. By default, a proposal needs over 2/3 BP nodes' approval.

### Release a Proposal

You can release a proposal when it gets approved.

```sql
$ aelf-command send AElf.ContractNames.Parliament Release bafe83ca4ec5b2a2f1e8016d09b21362c9345954a014379375f1a90b7afb43fb
AElf [Info]:
 { TransactionId:
   '09c8c824d2e3aea1d...cefe4e236c5b818d6a01d4f7ca0b60fe99535' }
```

### Get the Transaction Result

Use the `get-tx-result` command to retrieve the details of the transaction:

```sql
$ aelf-command get-tx-result 09c8c824d2e3aea1d...cefe4e236c5b818d6a01d4f7ca0b60fe99535
AElf [Info]: {
  "TransactionId": "09c8c824d2e3aea1d...cefe4e236c5b818d6a01d4f7ca0b60fe99535",
  "Status": "MINED",
  "Logs": [
    {
    "Address": "25CecrU94dmMdbhC3LWMKxtoaL4Wv8PChGvVJM6PxkHAyvXEhB",
    "Name": "Transferred",
    "Indexed": [
      "CiIKIJTPGZ24g4eHwSVNLit8jgjFJeeYCEEYLDpFiCeCT0Bf",
      "EiIKIO0jJRxjHdRQmUTby8klRVSqYpwhOyUsnXYV3IrQg8N1",
      "GgNFTEY="
    ],
    "NonIndexed": "IICgt4fpBSomVC00MzFkMjc0Yi0zNWJjLTRjYzgtOGExZC1iODhhZTgxYzU2Zjc="
    }
  ],
  "Bloom": "AAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAACAAAAAAAAAAACAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAQAAA==",
  "BlockNumber": 28411,
  "BlockHash": "fa22e4eddff12a728895a608db99d40a4b21894f7c07df1a4fa8f0625eb914a2",
  "Transaction": {
    "From": "2tj7Ea67fuQfVAtQZ3WBmTv7AAJ8S9D2L4g6PpRRJei6JXk7RG",
    "To": "29RDBXTqwnpWPSPHGatYsQXW2E17YrQUCj7QhcEZDnhPb6ThHW",
    "RefBlockNumber": 28410,
    "RefBlockPrefix": "0P+eTw==",
    "MethodName": "Release",
    "Params": "\"ad868c1e0d74127dd746ccdf3443a09459c55cf07d247df053ddf718df258c86\"",
    "Signature": "DQcv55EBWunEFPXAbqZG20OLO5T0Sq/s0A+/iuwv1TdQqIV4318HrqFLsGpx9m3+sp5mzhAnMlrG7CSxM6EuIgA="
  },
  "ReturnValue": "",
  "Error": null
}
```
The command outputs detailed information about the transaction, including its status, logs, and related block information.


###  Decode the Logs for Readable Result

```sql
$ aelf-command event 09c8c824d2e3aea1d...cefe4e236c5b818d6a01d4f7ca0b60fe99535
```

This command provides a readable format of the events logged by the transaction. The output includes details such as the address, event name, indexed data, non-indexed data, and a decoded result.

#### Example Breakdown

Here is a sample output from the `get-tx-result` command:

```sql
{
  "TransactionId": "09c8c824d2e3aea1d...cefe4e236c5b818d6a01d4f7ca0b60fe99535",
  "Status": "MINED",
  "Logs": [
    {
      "Address": "25CecrU94dmMdbhC3LWMKxtoaL4Wv8PChGvVJM6PxkHAyvXEhB",
      "Name": "Transferred",
      "Indexed": [
        "CiIKIJTPGZ24g4eHwSVNLit8jgjFJeeYCEEYLDpFiCeCT0Bf",
        "EiIKIO0jJRxjHdRQmUTby8klRVSqYpwhOyUsnXYV3IrQg8N1",
        "GgNFTEY="
      ],
      "NonIndexed": "IICgt4fpBSomVC00MzFkMjc0Yi0zNWJjLTRjYzgtOGExZC1iODhhZTgxYzU2Zjc="
    }
  ],
  "BlockNumber": 28411,
  "BlockHash": "fa22e4eddff12a728895a608db99d40a4b21894f7c07df1a4fa8f0625eb914a2",
  "Transaction": {
    "From": "2tj7Ea67fuQfVAtQZ3WBmTv7AAJ8S9D2L4g6PpRRJei6JXk7RG",
    "To": "29RDBXTqwnpWPSPHGatYsQXW2E17YrQUCj7QhcEZDnhPb6ThHW",
    "RefBlockNumber": 28410,
    "RefBlockPrefix": "0P+eTw==",
    "MethodName": "Release",
    "Params": "\"ad868c1e0d74127dd746ccdf3443a09459c55cf07d247df053ddf718df258c86\"",
    "Signature": "DQcv55EBWunEFPXAbqZG20OLO5T0Sq/s0A+/iuwv1TdQqIV4318HrqFLsGpx9m3+sp5mzhAnMlrG7CSxM6EuIgA="
  },
  "ReturnValue": "",
  "Error": null
}
```

### Understand the Decoded Event

After running the `event` command, the decoded event output is as follows:

```sql
{
  "Address": "25CecrU94dmMdbhC3LWMKxtoaL4Wv8PChGvVJM6PxkHAyvXEhB",
  "Name": "Transferred",
  "Indexed": [
    "CiIKIJTPGZ24g4eHwSVNLit8jgjFJeeYCEEYLDpFiCeCT0Bf",
    "EiIKIO0jJRxjHdRQmUTby8klRVSqYpwhOyUsnXYV3IrQg8N1",
    "GgNFTEY="
  ],
  "NonIndexed": "IICgt4fpBSomVC00MzFkMjc0Yi0zNWJjLTRjYzgtOGExZC1iODhhZTgxYzU2Zjc=",
  "Result": {
    "from": "28Y8JA1i2cN6oHvdv7EraXJr9a1gY6D1PpJXw9QtRMRwKcBQMK",
    "to": "2oSMWm1tjRqVdfmrdL8dgrRvhWu1FP8wcZidjS6wPbuoVtxhEz",
    "symbol": "ELF",
    "amount": "200000000000",
    "memo": "T-431d274b-35bc-4cc8-8a1d-b88ae81c56f7"
  }
}
```

#### Summary of Decoded Event

**From Address**: 28Y8JA1i2cN6oHvdv7EraXJr9a1gY6D1PpJXw9QtRMRwKcBQMK
**To Address**: 2oSMWm1tjRqVdfmrdL8dgrRvhWu1FP8wcZidjS6wPbuoVtxhEz
**Symbol**: ELF
**Amount**: 200000000000
**Memo**: T-431d274b-35bc-4cc8-8a1d-b88ae81c56f7

These steps and commands will help you retrieve and decode the transaction results on the ealf blockchain.

For more details, check the descriptions of [`aelf-command event`](#event-deserialize-the-result-return-by-executing-a-transaction).


# Deploy a smart contract

**Note**: The `deploy` command has been deprecated. Please use `aelf-command` send or `aelf-command proposal` instead.

#### Example Workflow

#### 1.Check Chain Status

```javascript
$ aelf-command get-chain-status
✔ Succeed
{
  "ChainId": "AELF",
  "Branches": {
    "41a8a1ebf037197b7e2f10a67d81f741d46a6af41775bcc4e52ab855c58c4375": 8681551,
    "ed4012c21a2fbf810db52e9869ef6a3fb0629b36d23c9be2e3692a24703b3112": 8681597,
    "13476b902ef137ed63a4b52b2902bb2b2fa5dbe7c256fa326c024a73dc63bcb3": 8681610
  },
  "NotLinkedBlocks": {},
  "LongestChainHeight": 8681610,
  "LongestChainHash": "13476b902ef137ed63a4b52b2902bb2b2fa5dbe7c256fa326c024a73dc63bcb3",
  "GenesisBlockHash": "cd5ce1bfa0cd97a1dc34f735c57bea2fcb9d88fc8f76bece2592fe7d82d5660c",
  "GenesisContractAddress": "2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8",
  "LastIrreversibleBlockHash": "4ab84cdfe0723b191eedcf4d2ca86b0f64e57105e61486c21d98d562b14f2ab0",
  "LastIrreversibleBlockHeight": 8681483,
  "BestChainHash": "0dbc2176aded950020577552c92c82e66504ea109d4d6588887502251b7e932b",
  "BestChainHeight": 8681609
}
```

#### 2. Deploy Smart Contract

Use the Genesis Contract Address (`GenesisContractAddress`) as a parameter with `aelf-command send`.


```javascript
$ aelf-command send 2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8 DeploySmartContract
✔ Fetching contract successfully!

If you need to pass file contents as a parameter, you can enter the relative or absolute path of the file

Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <category>: 0
? Enter the required param <code>: /Users/test/contract.dll
...

```

#### 3. Propose New Contract

Use `aelf-command send` with `ProposeNewContract` method if required by the chain.

```javascript
$ aelf-command send 2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8 ProposeNewContract
✔ Fetching contract successfully!

If you need to pass file contents as a parameter, you can enter the relative or absolute path of the file

Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <category>: 0
? Enter the required param <code>: /Users/test/contract.dll
...

You must input contract method parameters in the prompting way. Note that you can input a relative or absolute path of a contract file to pass a file to `aelf-command`. It will read the file content and encode it as a base64 string.

After calling `ProposeNewContract`, you can get the proposal id and `proposedContractInputHash` later by running:

$ aelf-command event 34184cbc27c95bbc0a1bd676192c3afc380740ab61626e5d428ae17faf9ea984
[Info]:
The results returned by Transaction: 34184cbc27c95bbc0a1bd676192c3afc380740ab61626e5d428ae17faf9ea984 is:
[
  {
    "Address": "pykr77ft9UUKJZLVq15wCH8PinBSjVRQ12sD1Ayq92mKFsJ1i",
    "Name": "ContractProposed",
    "Indexed": [],
    "NonIndexed": "CiIKIK0dKXkwu/HDpZUf/tzjJSfcZ5XznUrE/C0XMtp4liqo",
    "Result": {
      "proposedContractInputHash": "ad1d297930bbf1c3a5951ffedce32527dc6795f39d4ac4fc2d1732da78962aa8"
    }
  },
  {
    "Address": "2JT8xzjR5zJ8xnBvdgBZdSjfbokFSbF5hDdpUCbXeWaJfPDmsK",
    "Name": "ProposalCreated",
    "Indexed": [
      "EiIKIEknWCUo4/KJS/vDAf7u1R6JmLEfAcapRY1BZ9yogawl"
    ],
    "NonIndexed": "CiIKIFb/RK9tR/SjJn0z7d4AjUvw288KCwTRyXSYMMryQuC2",
    "Result": {
      "organizationAddress": "ZDcYStbBRACaEQh6K1nqPb2SHKPCTggB9E66onthFoGrVnkfi",
      "proposalId": "56ff44af6d47f4a3267d33edde008d4bf0dbcf0a0b04d1c9749830caf242e0b6"
    }
  }
]

Wait for the organization members to approve your proposal, and you can release your proposal by calling `ReleaseApprovedContract`.

```


#### 4. Release Approved Contract

```javascript
$ aelf-command send 2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8
✔ Fetching contract successfully!
? Pick up a contract method: ReleaseApprovedContract

If you need to pass file contents as a parameter, you can enter the relative or absolute path of the file

Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <proposalId>: proposalId
? Enter the required param <proposedContractInputHash>: proposedContractInputHash

The params you entered are:
{
  "proposalId": proposalNewContract proposalId,
  "proposedContractInputHash": proposedContractInputHash
}
✔ Succeed!

And then you can get the code check proposal id from the event of `ReleaseApprovedContract` transaction.

...

{
  "Address": "2JT8xzjR5zJ8xnBvdgBZdSjfbokFSbF5hDdpUCbXeWaJfPDmsK",
  "Name": "ProposalCreated",
  "Indexed": [
    "EiIKIEknWCUo4/KJS/vDAf7u1R6JmLEfAcapRY1BZ9yogawl"
  ],
  "NonIndexed": "CiIKIAfOf/a3zIillggQjSl2N0Y3aEh8bRGK5ppBrc14CKSn",
  "Result": {
    "organizationAddress": "ZDcYStbBRACaEQh6K1nqPb2SHKPCTggB9E66onthFoGrVnkfi",
    "proposalId": "07ce7ff6b7cc88a59608108d297637463768487c6d118ae69a41adcd7808a4a7"
  }
}

Wait for the code check to pass, then you can release the code check proposal by calling `ReleaseCodeCheck`.

```

#### 5. Release Code-Checked Contract

```javascript
$ aelf-command send 2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8 -a 28Y8JA1i2cN6oHvdv7EraXJr9a1gY6D1PpJXw9QtRMRwKcBQMK -p 123
✔ Fetching contract successfully!
? Pick up a contract method: ReleaseCodeCheckedContract

If you need to pass file contents as a parameter, you can enter the relative or absolute path of the file

Enter the params one by one, type `Enter`
```


## event - Deserialize Transaction Result

To view details from a transaction, including events triggered by contract methods, you can use the `aelf-command event` tool. Here’s how:

```javascript
$ aelf-command event fe1974fde291e44e16c55db666f2c747323cdc584d616de05c88c8bae18ecceb

[Info]:
The results returned by
Transaction: fe1974fde291e44e16c55db666f2c747323cdc584d616de05c88c8bae18ecceb is:
[
  {
    "Address": "2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8",
    "Name": "ContractDeployed",
    "Indexed": [
      "CiIKIN2O6lDDGWbgbkomYr6+9+2B0JpHsuses3KfLwzHgSmu",
      "EiIKIDXZGwZLKqm78WpYDXuBlyd6Dv+RMjrgOUEnwamfIA/z"
    ],
    "NonIndexed": "GiIKIN2O6lDDGWbgbkomYr6+9+2B0JpHsuses3KfLwzHgSmu",
    "Result": {
      "author": "2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8",
      "codeHash": "35d91b064b2aa9bbf16a580d7b8197277a0eff91323ae0394127c1a99f200ff3",
      "address": "2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8"
    }
  }
]
✔ Succeed!
````

#### Explanation:

When you execute this command, you'll get details about the transaction with ID fe1974fde291e44e16c55db666f2c747323cdc584d616de05c88c8bae18ecceb. Here's what the output means:

- **Address**: The contract address where the event occurred.
- **Name**: The name of the event triggered by a contract method.
- **Indexed**: Additional data related to the event, encoded in base64 format.
- **NonIndexed**: Further details about the event, also in base64.
- **Result**: Decoded information from the event, providing readable details such as author, code hash, and address.


This command helps you understand what happened during a transaction, especially useful when dealing with events triggered by smart contracts.

## send - Send a transaction

#### 1. Enter AElf Node URI:

```javascript
$ aelf-command send
✔ Enter the URI of an AElf node … http://13.231.179.27:8000
```

You need to specify the URI of an AElf blockchain node to which you will connect.

#### 2. Enter Wallet Address and Password:


```sql
✔ Enter a valid wallet address, if you do not have, create one by aelf-command create … D3vSjRYL8MpeRpvUDy85ktXijnBe2tHn8NTACsggUVteQCNGP
✔ Enter the password you typed when creating a wallet … ********
```

Provide your wallet address and the password associated with it. This is necessary to sign transactions.


#### 3. Enter Contract Information:

```sql
✔ Enter contract name (System contracts only) or the address of contract … AElf.ContractNames.Token
✔ Fetching contract successfully!
```

Specify the contract name or address. In this example, AElf.ContractNames.Token refers to the Token contract.


#### 4. Select Contract Method:

```css
? Pick up a contract method: Transfer
```

Choose the specific method of the contract you want to invoke. Here, `Transfer` is selected.

#### 5. Enter Method Parameters:

```sql
Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <to>: C91b1SF5mMbenHZTfdfbJSkJcK7HMjeiuwfQu8qYjGsESanXR
? Enter the required param <symbol>: ELF
? Enter the required param <amount>: 100000000
? Enter the required param <memo>: 'test command'
```

Input the required parameters for the `Transfer` method: recipient address (`to`), token symbol (`symbol`), amount (`amount`), and an optional memo (`memo`).

#### 6. Confirmation and Execution:

```sql
The params you entered is:
{
  "to": "C91b1SF5mMbenHZTfdfbJSkJcK7HMjeiuwfQu8qYjGsESanXR",
  "symbol": "ELF",
  "amount": 100000000,
  "memo": "'test command'"
}
✔ Succeed!
```

Confirm the parameters you entered and proceed with the transaction.


#### 7. Transaction Result:

```css
AElf [Info]:
Result:
{
  "TransactionId": "85d4684cb6e4721a63893240f73f675ac53768679c291abeb54974ff4e063bb5"
}
✔ Succeed!
```

The transaction is executed successfully, and you receive the `TransactionId` as confirmation.


By following these steps, you can effectively send transactions on the AElf blockchain using the `aelf-command send`   interface. Adjust parameters and contract names as necessary for different contract methods or system contracts within AElf.


## call - Call a read-only method on a contract


```sql
$ aelf-command call
✔ Enter the the URI of an AElf node … http://13.231.179.27:8000
✔ Enter a valid wallet address, if you do not have, create one by aelf-command create … D3vSjRYL8MpeRpvUDy85ktXijnBe2tHn8NTACsggUVteQCNGP
✔ Enter the password you typed when creating a wallet … ********
✔ Enter contract name (System contracts only) or the address of contract … AElf.ContractNames.Token
✔ Fetching contract successfully!
? Pick up a contract method: GetTokenInfo

If you need to pass file contents as a parameter, you can enter the relative or absolute path of the file

Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <symbol>: ELF
The params you entered is:
{
  "symbol": "ELF"
}
✔ Calling method successfully!
AElf [Info]:
Result:
{
  "symbol": "ELF",
  "tokenName": "Native Token",
  "supply": "99732440917954549",
  "totalSupply": "100000000000000000",
  "decimals": 8,
  "issuer": "FAJcKnSpbViZfAufBFzX4nC8HtuT93rxUS4VCMACUwXWYurC2",
  "isBurnable": true,
  "issueChainId": 9992731,
  "burned": "267559132045477"
}
✔ Succeed!
```

```sql
aelf-command call AElf.ContractNames.Token GetTokenInfo '{"symbol":"ELF"}'
```

## get-chain-status - Get the current status of the block chain

```sql
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

```sql
$ aelf-command get-tx-result
✔ Enter the the URI of an AElf node … http://13.231.179.27:8000
✔ Enter a valid transaction id in hex format … 7b620a49ee9666c0c381fdb33f94bd31e1b5eb0fdffa081463c3954e9f734a02
✔ Succeed!
{ TransactionId:
   '7b620a49ee9666c0c381fdb33f94bd31e1b5eb0fdffa081463c3954e9f734a02',
  Status: 'MINED',
  Logs: null,
  Bloom:
   'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==',
  BlockNumber: 7900508,
  BlockHash:
   'a317c5ecf4a22a481f88ab08b8214a8e8c24da76115d9ddcef4afc9531d01b4b',
  Transaction:
   { From: 'D3vSjRYL8MpeRpvUDy85ktXijnBe2tHn8NTACsggUVteQCNGP',
     To: 'WnV9Gv3gioSh3Vgaw8SSB96nV8fWUNxuVozCf6Y14e7RXyGaM',
     RefBlockNumber: 7900503,
     RefBlockPrefix: 'Q6WLSQ==',
     MethodName: 'GetTokenInfo',
     Params: '{ "symbol": "ELF" }',
     Signature:
      'JtSpWbMX13tiJD0klMSJQyPBa0aRNFY4hTh3hltdWqhBpv4IRTbjjZfQj39lbBSCOy68vnLg6rUerEcyCsqwfgE=' },
  ReadableReturnValue:
   '{ "symbol": "ELF", "tokenName": "elf token", "supply": "1000000000", "totalSupply": "1000000000", "decimals": 2, "issuer": "2gaQh4uxg6tzyH1ADLoDxvHA14FMpzEiMqsQ6sDG5iHT8cmjp8", "isBurnable": true }',
  Error: null }
```


## get-blk-height - Get the block height

```sql
$ aelf-command get-blk-height
✔ Enter the the URI of an AElf node … http://13.231.179.27:8000
> 7902091
```

## get-blk-info - Get the block info by a block height or a block hash

Either a block height or a block hash can be provided as an argument to this sub-command.

```sql
$ aelf-command get-blk-info
✔ Enter the the URI of an AElf node: http://13.231.179.27:8000
✔ Enter a valid height or block hash: 123
✔ Include transactions whether or not: no / yes
{ BlockHash:
   '6034db3e02e283d3b81a4528442988d28997d3828f87cca1a89457b294517372',
  Header:
   { PreviousBlockHash:
      '9d6bcc588c0bc10942899e7ec4536665c86f23286029ed45287babf22c582f5a',
     MerkleTreeRootOfTransactions:
      '7ceb349715787ececa647ad48576467d294de6dcc44d14e19f60c4a91a7a9536',
     MerkleTreeRootOfWorldState:
      'b529e2775283edc39cd4e3f685616085b18bd5521a87ea7904ad99cd2dc50910',
     Extra:
      '[ "CkEEJT3FEw+k9cuqv7uruq1fEwQwEjKtYxbXK86wUGrAOH7BgCVkMendLkQZmpEpMgzcz+JXnaVpWtFt3AJcGmGycxL+DggIEvIDCoIBMDQyNTNkYzUxMzBmYTRmNWNiYWFiZmJiYWJiYWFkNWYxMzA0MzAxMjMyYWQ2MzE2ZDcyYmNlYjA1MDZhYzAzODdlYzE4MDI1NjQzMWU5ZGQyZTQ0MTk5YTkxMjkzMjBjZGNjZmUyNTc5ZGE1Njk1YWQxNmRkYzAyNWMxYTYxYjI3MxLqAggCIiIKIOAP2QU8UpM4u9Y3OxdKdI5Ujm3DSyQ4JaRNf7q5ka5mKiIKIH5yNJs87wb/AkWcIrCxvCX/Te3fGHVXFxE8xsnfT1HtMgwIoJro6AUQjOa1pQE4TkqCATA0MjUzZGM1MTMwZmE0ZjVjYmFhYmZiYmFiYmFhZDVmMTMwNDMwMTIzMmFkNjMxNmQ3MmJjZWIwNTA2YWMwMzg3ZWMxODAyNTY0MzFlOWRkMmU0NDE5OWE5MTI5MzIwY2RjY2ZlMjU3OWRhNTY5NWFkMTZkZGMwMjVjMWE2MWIyNzNiIgogHY83adsNje+EtL0lLEte8KfT6X/836zXZTbntbqyjgtoBHAEegwIoJro6AUQzOybpgF6DAigmujoBRCk8MG1AnoLCKGa6OgFEOCvuBF6CwihmujoBRCg/JhzegwIoZro6AUQ9Lml1wF6DAihmujoBRDYyOO7AnoMCKGa6OgFEKy+ip8DkAEOEp8CCoIBMDQ4MWMyOWZmYzVlZjI5NjdlMjViYTJiMDk0NGVmODQzMDk0YmZlOTU0NWFhZGFjMGQ3Nzk3MWM2OTFjZTgyMGQxYjNlYzQxZjNjMDllNDZjNmQxMjM2NzA5ZTE1ZTEyY2U5N2FhZGNjYTBmZGU4NDY2M2M3OTg0OWZiOGYwM2RkMhKXAQgEMgwIpJro6AUQjOa1pQE4IkqCATA0ODFjMjlmZmM1ZWYyOTY3ZTI1YmEyYjA5NDRlZjg0MzA5NGJmZTk1NDVhYWRhYzBkNzc5NzFjNjkxY2U4MjBkMWIzZWM0MWYzYzA5ZTQ2YzZkMTIzNjcwOWUxNWUxMmNlOTdhYWRjY2EwZmRlODQ2NjNjNzk4NDlmYjhmMDNkZDISnwIKggEwNDFiZTQwMzc0NjNjNTdjNWY1MjgzNTBhNjc3ZmRkZmEzMzcxOWVlZjU5NDMwNDY5ZTlmODdkY2IyN2Y0YTQ1NjY0OTI4NmZhNzIxYzljOWVjZDMxMmY0YjdlZDBmZGE4OTJmZTNlZDExZWFjYTBmMzcxOTBkMjAzYTczYTA2YjFmEpcBCAYyDAiomujoBRCM5rWlATgySoIBMDQxYmU0MDM3NDYzYzU3YzVmNTI4MzUwYTY3N2ZkZGZhMzM3MTllZWY1OTQzMDQ2OWU5Zjg3ZGNiMjdmNGE0NTY2NDkyODZmYTcyMWM5YzllY2QzMTJmNGI3ZWQwZmRhODkyZmUzZWQxMWVhY2EwZjM3MTkwZDIwM2E3M2EwNmIxZhKfAgqCATA0OTMzZmYzNDRhNjAxMTdmYzRmYmRmMDU2ODk5YTk0NDllNjE1MzA0M2QxYzE5MWU4NzlkNjlkYzEzZmIyMzM2NWJmNTQxZWM1NTU5MWE2MTQ3YmM1Y2M3ZjUzMjQ0OTY2ZGE5NzA2ZWZmNzZiY2Y2ZjViY2EyOTYzNmVmODNkYzYSlwEICjIMCLCa6OgFEIzmtaUBOCJKggEwNDkzM2ZmMzQ0YTYwMTE3ZmM0ZmJkZjA1Njg5OWE5NDQ5ZTYxNTMwNDNkMWMxOTFlODc5ZDY5ZGMxM2ZiMjMzNjViZjU0MWVjNTU1OTFhNjE0N2JjNWNjN2Y1MzI0NDk2NmRhOTcwNmVmZjc2YmNmNmY1YmNhMjk2MzZlZjgzZGM2EpUDCoIBMDRiNmMwNzcxMWJjMzBjZGY5OGM5ZjA4MWU3MDU5MWY5OGYyYmE3ZmY5NzFlNWExNDZkNDcwMDlhNzU0ZGFjY2ViNDY4MTNmOTJiYzgyYzcwMDk3MWFhOTM5NDVmNzI2YTk2ODY0YTJhYTM2ZGE0MDMwZjA5N2Y4MDZiNWFiZWNhNBKNAggIEAEyDAismujoBRCM5rWlATgwQAJKggEwNGI2YzA3NzExYmMzMGNkZjk4YzlmMDgxZTcwNTkxZjk4ZjJiYTdmZjk3MWU1YTE0NmQ0NzAwOWE3NTRkYWNjZWI0NjgxM2Y5MmJjODJjNzAwOTcxYWE5Mzk0NWY3MjZhOTY4NjRhMmFhMzZkYTQwMzBmMDk3ZjgwNmI1YWJlY2E0egwInJro6AUQjOa1pQF6DAicmujoBRCkz+mjAnoMCJya6OgFEIj8yfECegwInJro6AUQ7KiH0wN6CwidmujoBRCko6hXegwInZro6AUQ6LTNugF6DAidmujoBRCY4NObAnoMCJ2a6OgFEMzWv+oCkAEQIFg6ggEwNGI2YzA3NzExYmMzMGNkZjk4YzlmMDgxZTcwNTkxZjk4ZjJiYTdmZjk3MWU1YTE0NmQ0NzAwOWE3NTRkYWNjZWI0NjgxM2Y5MmJjODJjNzAwOTcxYWE5Mzk0NWY3MjZhOTY4NjRhMmFhMzZkYTQwMzBmMDk3ZjgwNmI1YWJlY2E0QAIYBQ==", "" ]',
     Height: 123,
     Time: '2019-07-01T13:39:45.8704899Z',
     ChainId: 'AELF',
     Bloom:
      '00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
     SignerPubkey:
      '04253dc5130fa4f5cbaabfbbabbaad5f1304301232ad6316d72bceb0506ac0387ec180256431e9dd2e44199a9129320cdccfe2579da5695ad16ddc025c1a61b273' },
  Body:
   { TransactionsCount: 1,
     Transactions:
      [ 'a365a682caf3b586cbd167b81b167979057246a726c7282530554984ec042625' ] } }
```


```sql
aelf-command get-blk-info ca61c7c8f5fc1bc8af0536bc9b51c61a94f39641a93a748e72802b3678fea4a9 true
```


## console - Open an interactive console

```sql
$ aelf-command console
✔ Enter the the URI of an AElf node … http://13.231.179.27:8000
✔ Enter a valid wallet address, if you do not have, create one by aelf-command create … 2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H
✔ Enter the password you typed when creating a wallet … ********
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

## dapp-server - Start a socket.io server for supplying services for dApps

Are you developing a dApp and need an environment to manage wallet information and connect to the AElf chain? You can easily start a local development server using this sub-command.

```shell
$ aelf-command dapp-server
AElf [Info]: DApp server is listening on port 35443
```


Alternatively, you can specify a different port:

```shell
$ aelf-command dapp-server --port 40334
AElf [Info]: DApp server is listening on port 40334
```


This server uses Socket.io to listen on the specified local port. You can use aelf-bridge to connect to this server with the following code:

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


For more details, check out the [aelf-bridge](https://github.com/AElfProject/aelf-js-bridge) and [aelf-bridge-demo](https://github.com/AElfProject/aelf-bridge-demo).