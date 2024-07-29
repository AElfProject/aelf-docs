---
sidebar_position: 1
title: Hello World Contract
description: Simplest contract to get you started
---
# Creating your first contract

**Description**: This is the simplest contract to get you started. It introduces the
basic structure of a smart contract and shows how to deploy and interact with
it.

**Purpose**: To familiarize you with the basic syntax and deployment process of
smart contracts on aelf blockchain.

**Difficulty Level**: Easy

<iframe width="100%" style={{"aspect-ratio": "16 / 9"}} src="https://www.youtube.com/embed/ZowLZFIACzA?si=eytSa5h9CrWLLoRE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Step 1 - Setting up your development environment

import Setup from "../_setup.md"

<Setup />

## Step 2 - Develop Smart Contract

### Start Your Smart Contract Project

- Open your `Terminal`.

- Enter the following command to generate a new project:

```bash title="Terminal"
mkdir hello-world
cd hello-world
dotnet new aelf -n HelloWorld
```

### Adding Your Smart Contract Code

Now Hello World template ready, let's customize it to add our own contract logic. We'll start by creating methods to update and read a message stored in the contract.

- Enter this command in your `Terminal`.

```bash title="Terminal"
cd src
```

The implementation of file `src/HelloWorldState.cs` is as follows:

```csharp title="HelloWorldState.cs"
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

```csharp title="HelloWorld.cs"
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

### Building Smart Contract

Build the new code with the following commands inside src folder:

```bash title="Terminal"
dotnet build
```

## Step 3 - Deploy Smart Contract

import Deploy from "../_deploy.md"

<Deploy />

## Step 4 - Interact with Your Deployed Smart Contract

Lets try to call methods on your newly-deployed smart contract using `aelf-command`.

Firstly, we will set a message using the `Update` method. Run the following command,
and enter the message argument as `test`. This will set `test` into the Message contract state.
Remember to export CONTRACT_ADDRESS equals to your deployed contract address.

```bash title="Terminal"
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Update
```

After that, we can use `Read` method to retrieve the value previously set for the Message contract state.
Running the following command should yield `test`.

```bash title="Terminal"
aelf-command call $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Read
```

## 🎯 Conclusion

#### 🎊 Congratulations!

You've successfully completed the Hello World Contract tutorial!
Awesome job sticking with it until the end. 🌟

#### 📚 What You've Learned

In this tutorial, you've discovered:

- 🛠️ How to set up your development environment for aelf.
- 💻 The basics of writing a smart contract in C# for the aelf blockchain.
- 🚀 How to deploy and interact with your Hello World Contract on the aelf network.

#### 🔍 Final Output

By now, you should have:

- 📜 A deployed Hello World Contract on the aelf blockchain.
- 🎉 Successfully invoked the contract to set and read a message.

To verify, you should have seen the **`test`** message returned when you called the Read method after setting it using the Update method. If you see this message, you've nailed it! 🏆

#### ➡️ What's Next?

Now that you've got the basics down, why not dive into more advanced topics or other tutorials like the Lottery Game Contract or Voting Contract? 

Keep experimenting and building to level up your aelf blockchain development skills. 🚀

Happy coding! 😊
