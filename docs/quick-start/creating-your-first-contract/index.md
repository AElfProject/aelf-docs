---
sidebar_position: 1
title: Creating your first contract
description: Hello World
---
# Creating your first contract

This guide provides step-by-step instructions to set up your local development environment to get started developing and deploying a simple aelf 'Hello World' smart contract.

## 1. Setup Environment

### Prerequisites

* Basic knowledge of terminal commands
* **IDE** - Install [VS Code](https://code.visualstudio.com/)

### Install Required Packages

* [Install dotnet SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
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

ℹ️ Note: If you have installed aelf.deploy and your terminal says that there is no such command available, please uninstall and install aelf.deploy.

### Install Node.js and Yarn

* [Install Node.js](https://nodejs.org/en)
* Install aelf-command

```bash
sudo npm i -g aelf-command
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

### Adding Your Smart Contract Code

Now that we have a template hello world project, we can customise the template to incorporate our own contract logic.
Lets start by implementing methods to provide basic functionality for updating and reading a message stored persistently in the contract state.

```bash
cd src
```

The implementation of file `src/HelloWorldState.cs` is as follows:

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

To send transactions on the aelf blockchain, you must have a wallet.

Run this command to create aelf wallet.

```bash
aelf-command create
```

![result](/img/create_wallet_output.png)

#### Acquire Testnet Tokens for Development

To deploy smart contracts or execute on-chain transactions on aelf, you'll require testnet ELF tokens.

**Get ELF Tokens**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="cli" label="CLI" default>

Run the following command to get testnet ELF tokens from faucet. Remember to either export your wallet address and wallet password or replace $WALLET_ADDRESS and $WALLET_ADDRESS with your wallet address and wallet password respectively.

```bash
export WALLET_ADDRESS="YOUR_WALLET_ADDRESS"
curl -X POST "https://faucet.aelf.dev/api/claim?walletAddress=$WALLET_ADDRESS" -H "accept: application/json" -d ""
```

To check your wallet's current ELF balance:

```bash
export WALLET_PASSWORD="YOUR_WALLET_PASSWORD"
aelf-command call ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io GetBalance
```

You will be prompted for the following:  

```sh
Enter the required param <symbol>: ELF  
Enter the required param <owner>: **$WALLET_ADDRESS**
```

You should see the Result displaying your wallet's ELF balance.

  </TabItem>
  <TabItem value="web" label="Web" default>

Go to this ![url](https://faucet-ui.aelf.dev). Enter your address and click `Get Tokens`.

![result](/img/get-token-ui.png)

  </TabItem>
</Tabs>

### Deploy Your Smart Contract

The smart contract needs to be deployed on the chain before users can interact with it.

Run the following command to deploy a contract. Remember to export the path of HelloWorld.dll.patched to CONTRACT_PATH.

```bash
export CONTRACT_PATH=$(find ~+ . -path "*patched*" | head -n 1)
```

```bash
aelf-deploy -a $WALLET_ADDRESS -p $WALLET_PASSWORD -c $CONTRACT_PATH -e https://tdvw-test-node.aelf.io/
```

Please wait for approximately 1 to 2 minutes. If the deployment is successful, it will provide you with the contract address.

![result](/img/deploy-result.png)

NOTE: If aelf-deploy command returns "aelf-deploy not found", then uninstall and reinstall aelf.deploy.

Export your smart contract address:

```bash
export CONTRACT_ADDRESS="YOUR_SMART_CONTRACT_ADDRESS e.g. 2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS"
```

## 4. Interact with Your Deployed Smart Contract

Lets try to call methods on your newly-deployed smart contract using `aelf-command`.

Firstly, we will set a message using the `Update` method. Run the following command,
and enter the message argument as `test`. This will set `test` into the Message contract state.
Remember to export CONTRACT_ADDRESS equals to your deployed contract address.

```bash
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Update
```

After that, we can use `Read` method to retrieve the value previously set for the Message contract state.
Running the following command should yield `test`.

```bash
aelf-command call $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Read
```
