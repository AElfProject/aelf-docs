---
sidebar_position: 1
title: Introduction to CLI
description: Introduction to the aelf's Command Line Interface
---

# Introduction to the CLI

The **aelf-command** tool is a Command Line Interface (CLI) designed for interacting with an aelf node. This guide will introduce
you to its key features and show you how to install and use the tool.

## Features

- **Configuration Management**: Easily get or set common configurations like `endpoint`, `account`, `data directory`, and
  `password`.
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

## ⚡ Quickstart

### Installation

Install [aelf-command](https://github.com/AElfProject/aelf-command)

```bash
npm i aelf-command -g
```

## General Usage

Note: check out [specific command](#https://docs.aelf.com/tools/aelf-cli/commands/) for more detailed examples!

- Get Balance

```bash
aelf-command call

? Enter the the URI of an AElf node: https://tdvw-test-node.aelf.io/
? Enter a valid wallet address, if you don't have, create one by aelf-command create: GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk
? Enter the password you typed when creating a wallet: 1234*Qwer
? Enter contract name (System contracts only) or the address of contract: AElf.ContractNames.Token
✔ Fetching contract successfully!
? Pick up a contract method: GetBalance
If you need to pass file contents as a parameter, you can enter the relative or absolute path of the file

Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <symbol>: elf
? Enter the required param <owner>: GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk
The params you entered is:
{
  "symbol": "elf",
  "owner": "GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk"
}
✔ Calling method successfully!
AElf [Info]:
Result:
{
  "symbol": "elf",
  "owner": "GyQX6t18kpwaD9XHXe1ToKxfov8mSeTLE9q9NwUAeTE8tULZk",
  "balance": "0"
}
✔ Succeed!
```

## 🔨 Development

### Setup

1. Install dev dependencies

```bash
yarn install
```

2. Create a new file under src/command, which contains the specific logic of your command
3. Import your commands in src/index.js and export them
4. Execute `yarn link` in the root directory, which creates a global symbolic link to this package and stores it in the global node_modules directory
5. Use `yarn link "aelf-command"` in other directories, please make sure the version of the package you link is correct, because sometimes inconsistent node versions may also cause the issue aelf-command version is wrong

Then try to see if the command is correct.

### Lint

```sh
yarn lint
```

### Tests

```sh
# Unit tests
yarn test
```
