---
sidebar_position: 1
title: Introduction to the CLI
description: Introduction to the CLI
---

# Introduction to the CLI

The **aelf-command** tool is a Command Line Interface (CLI) designed for interacting with an aelf node. This guide will introduce you to its key features and show you how to install and use the tool.

## Features

- **Configuration Management**: Easily get or set common configurations like `endpoint`, `account`, `data directory`, and `password`.
- **User-Friendly Prompts**: For new users, missing parameters will be prompted interactively.
- **Account Management**: Create new `accounts` or load existing ones using a private key or mnemonic.
- **Wallet Information**: Display `wallet` details including private key, address, public key, and mnemonic.
- **Encryption**: Encrypt account information into `keyStore` format and save it to a file.
- **Blockchain Interaction**: 
  - Retrieve the current `best height` of the chain.
  - Get `block information` by `height` or `block hash`.
  - Get `transaction results` by `transaction ID`.
  - Send `transactions` or call `read-only methods` on smart `contracts`.
  - Deploy smart `contracts`.
  - Open a `REPL` (Read-Eval-Print Loop) for using `JavaScript` to interact with the chain.
- **Friendly UI**: Enhanced user interactions with chalk and ora for a better visual experience.
- **Chain Status**: Retrieve the current chain status.
- **Proposal Management**: Create proposals on any contract method.
- **Transaction Deserialization**: Deserialize results returned by executing a transaction.
- **Socket.io Server**: Start a socket.io server to provide services for dApps.

## Installation

To install the aelf-command tool globally, use npm:

```bash
npm install aelf-command -g
```

## Using aelf-command

### First Step

You need to create a new account or load an existing account using a `private key` or `mnemonic`.

**Create a New Wallet**

```sql
aelf-command create
```

Output example:

```
Your wallet info is:
Mnemonic:            great mushroom loan crisp ... door juice embrace
Private Key:         e038eea7e151eb451ba2901f7...b08ba5b76d8f288
Public Key:          0478903d96aa2c8c0...6a3e7d810cacd136117ea7b13d2c9337e1ec88288111955b76ea
Address:             2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H
✔ Save account info into a file? … no / yes
✔ Enter a password … ********
✔ Confirm password … ********
✔
Account info has been saved to "/Users/young/.local/share/aelf/keys/2Ue31YTuB5Szy7cnr...Gi5uMQBYarYUR5oGin1sys6H.json"
```

**Load Wallet from Private Key**

```sql
aelf-command load e038eea7e151eb451ba2901f7...b08ba5b76d8f288
```

Output example:

```
Your wallet info is:
Private Key:         e038eea7e151eb451ba2901f7...b08ba5b76d8f288
Public Key:          0478903d96aa2c8c0...6a3e7d810cacd136117ea7b13d2c9337e1ec88288111955b76ea
Address:             2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H
✔ Save account info into a file?
✔ Enter a password … ********
✔ Confirm password … ********
✔
Account info has been saved to "/Users/young/.local/share/aelf/keys/2Ue31YTuB5Szy7cnr...Gi5uMQBYarYUR5oGin1sys6H.json"
```

**Show Wallet Info**

```sql
aelf-command wallet -a 2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H
```

Output example:

```
Your wallet info is:
Private Key:         e038eea7e151eb451ba2901f7...b08ba5b76d8f288
Public Key:          0478903d96aa2c8c0...6a3e7d810cacd136117ea7b13d2c9337e1ec88288111955b76ea
Address:             2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H
```

Here you can decide whether to encrypt the account info and save it to a file.

## Examples

**Interactive Console**

```sql
aelf-command console -a 2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H
✔ Enter the URI of an AElf node: http://127.0.0.1:8000
✔ Enter the password you typed when creating a wallet … ********
✔ Succeed!
Welcome to aelf interactive console. Ctrl + C to terminate the program. Double tap Tab to list objects

   ╔═══════════════════════════════════════════════════════════╗
   ║                                                           ║
   ║   NAME       | DESCRIPTION                                ║
   ║   AElf       | imported from aelf-sdk                     ║
   ║   aelf       | the instance of an aelf-sdk, connect to    ║
   ║              | http://127.0.0.1:8000                      ║
   ║   _account   | the instance of an AElf wallet, address    ║
   ║              | is                                         ║
   ║              | 2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR…   ║
   ║              | 5oGin1sys6H                                ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝
   
``` 

**Default Parameters**

```sql
aelf-command console
✔ Enter the URI of an AElf node: http://127.0.0.1:8000
✔ Enter a valid wallet address, if you don't have, create one by aelf-command create … 2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H
✔ Enter the password you typed when creating a wallet … ********
✔ Succeed!
Welcome to aelf interactive console. Ctrl + C to terminate the program. Double tap Tab to list objects

   ╔═══════════════════════════════════════════════════════════╗
   ║                                                           ║
   ║   NAME       | DESCRIPTION                                ║
   ║   AElf       | imported from aelf-sdk                     ║
   ║   aelf       | the instance of an aelf-sdk, connect to    ║
   ║              | http://13.231.179.27:8000                  ║
   ║   _account   | the instance of an AElf wallet, address    ║
   ║              | is                                         ║
   ║              | 2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR…   ║
   ║              | 5oGin1sys6H                                ║
   ║                                                           ║
   ╚═══════════════════════════════════════════════════════════╝
```

## Help

To get help, use:

```sql
aelf-command -h
```

Output example:

```
Usage: aelf-command [command] [options]

Options:
  -v, --version                                            output the version number
  -e, --endpoint <URI>                                     The URI of an aelf node. Eg: http://127.0.0.1:8000
  -a, --account <account>                                  The address of aelf wallet
  -p, --password <password>                                The password of encrypted keyStore
  -d, --datadir <directory>                                The directory that contains the aelf related files. Defaults to {home}/.local/share/aelf
  -h, --help                                               output usage information

Commands:
  call [contract-address|contract-name] [method] [params]     Call a read-only method on a contract.
  send [contract-address|contract-name] [method] [params]     Execute a method on a contract.
  get-blk-height                                              Get the current block height of specified chain
  get-chain-status                                            Get the current chain status
  get-blk-info [height|block-hash] [include-txs]              Get a block info
  get-tx-result [tx-id]                                       Get a transaction result
  console                                                     Open a node REPL
  create [options] [save-to-file]                             Create a new account
  wallet                                                      Show wallet details which include private key, address, public key and mnemonic
  load [private-key|mnemonic] [save-to-file]                  Load wallet from a private key or mnemonic
  proposal [proposal-contract] [organization] [expired-time]  Send a proposal to an origination with a specific contract method
  deploy [category] [code-path]                               Deprecated! Please use  `aelf-command send` , check details in aelf-command `README.md`
  config <flag> [key] [value]                                 Get, set, delete or list aelf-command config
  event [tx-id]                                               Deserialize the result returned by executing a transaction
  dapp-server [options]                                       Start a dAPP SOCKET.IO server
```

To get help for a sub-command, such as call, use:

```sql
aelf-command call -h
```

Output example:

```sql
Usage: aelf-command call [options] [contract-address|contract-name] [method] [params]

Call a read-only method on a contract.

Options:
  -h, --help  output usage information

Examples:

aelf-command call <contractName|contractAddress> <method> <params>
aelf-command call <contractName|contractAddress> <method>
aelf-command call <contractName|contractAddress>
aelf-command call
```

For the interactive console:

```sql
aelf-command console -h
```

Output example:

```sql
Usage: aelf-command console [options]

Open a node REPL

Options:
  -h, --help  output usage information

Examples:

aelf-command console
```