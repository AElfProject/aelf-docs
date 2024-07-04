---
sidebar_position: 4
title: Hello Contract
---
# Hello Contract

## 1. Hello Contract

This guide provides step-by-step instructions to set up your local development environment to get started developing and deploying aelf smart contracts.

### Prerequisites

* Basic knowledge of terminal commands
* **IDE** - Install [VS Code](https://code.visualstudio.com/)

### Install Required Packages

* [Install dotnet](https://dotnet.microsoft.com/en-us/download)
* Install aelf contract templates

```bash
dotnet new install AELF.ContractTemplates 
```

AELF.ContractTemplates contains various predefined templates for the ease of developing smart contracts on the aelf blockchain.

* Install aelf deploy tool

```bash
dotnet tool install --global aelf.deploy
```

aelf.deploy is a utility tool for deploying smart contracts on the aelf blockchain. 
Please remember to export PATH after installing aelf.deploy.

### Install Node.js and Yarn

* [Install Node.js](https://nodejs.org/en)
* Install aelf-command

### Install aelf-command

```bash
npm i -g aelf-command
```

aelf-command is a CLI tool for interacting with the aelf blockchain, enabling tasks like creating wallets and managing transactions.
Provide required permissions while installing aelf-command globally.

## 2. Develop Smart Contract

### Start Your Smart Contract Project

Open your `Terminal`.

Enter the following command to generate a new project:

```bash
mkdir hello-world
cd hello-world
dotnet new aelf -n HelloWorld
```

### Install ACS12.proto

```bash
mkdir Protobuf
cd Protobuf
mkdir references
cd ..
export ACS_DIR=Protobuf/references
curl -O --output-dir $ACS_DIR https://raw.githubusercontent.com/AElfProject/AElf/dev/protobuf/acs12.proto
```

### Adding Your Smart Contract Code

Now that we have a template hello world project, we can customize the template to incorporate our own contract logic.
Lets start by implementing methods to provide basic functionality for updating and reading a message stored persistently in the contract state.

```bash
cd src
```

```csharp
using AElf.Sdk.CSharp.State;

namespace AElf.Contracts.HelloWorld
{
    // The state class is access the blockchain state
    public class HelloWorldState : ContractState
    {
        // A state that holds string value
        // highlight-next-line
        public StringState Message { get; set; }
    }
}
```

The implementation of file `src/HelloWorld.cs` is as follows:

```csharp
// contract implementation starts here
namespace AElf.Contracts.HelloWorld
{
    public class HelloWorld : HelloWorldContainer.HelloWorldBase
    {
        // A method that updates the contract state, Message with a user input
        // highlight-start
        public override Empty Update(StringValue input)
        {
            State.Message.Value = input.Value;
            Context.Fire(new UpdatedMessage
            {
                Value = input.Value
            });
            return new Empty();
        }

        // A method that reads the contract state, Message
        public override StringValue Read(Empty input)
        {
            var value = State.Message.Value;
            return new StringValue
            {
                Value = value
            };
        }
        // highlight-end
    }
}
```

Build the new code with the following commands inside src folder:

```bash
dotnet build
```

## 3. Deploy Smart Contract

### Preparing for deployment

#### Create A Wallet

import CreateWallet from '@site/docs/_create-wallet.md';

<CreateWallet/>

#### Acquire Testnet Tokens for Development

import GetTestnetToken from '@site/docs/_get-testnet-token.md';

<GetTestnetToken/>

### Deploy Your Smart Contract

import DeploySmartContract from '@site/docs/_deploy-smart-contract.md';

<DeploySmartContract/>

## 4. Interact with Your Deployed Smart Contract

Lets try to call methods on your newly-deployed smart contract using `aelf-command`.

Firstly, we will set a message using the `Update` method. Run the following command,
and enter the message argument as `test`. This will set `test` into the Message contract state.

```bash
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Update
```

After that, we can use `Read` method to retrieve the value previously set for the Message contract state.
Running the following command should yield `test`.

```bash
aelf-command call $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Read
```
