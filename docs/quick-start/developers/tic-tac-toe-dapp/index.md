---
sidebar_position: 6
title: Tic-Tac-Toe dApp
description: Moderately difficult smart contract and dApp
---

**Description**: The Tic-Tac-Toe dApp is a decentralized gamify application that allows users to play the classic game of Tic-Tac-Toe on the aelf blockchain. It offers a simple and interactive interface where two players can compete against each other, with game data securely stored and verified on the aelf blockchain.

**Purpose**: The purpose of the Tic-Tac-Toe gamify dApp is to demonstrate how traditional games can be implemented on the aelf blockchain, ensuring transparency and immutability of game outcomes. It serves as an educational tool for learning smart contract development and the basics of decentralized application functionality.

**Difficulty Level**: Moderate

<iframe width="100%" style={{"aspect-ratio": "16 / 9"}} src="https://www.youtube.com/embed/9sefSIWX6Fw?si=2ijoq9jVnUFUohJ5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


## Step 1 - Setting up your development environment

import Setup from "../\_setup.md"

<Setup />

## Step 2 - Develop Smart Contract

### Start Your Smart Contract Project

- Open your `Terminal`.

- Enter the following command to generate a new project:

```bash title="Terminal"
mkdir tic-tac-toe-dapp
cd tic-tac-toe-dapp
dotnet new aelf -n TicTacToe
```

### Adding Your Smart Contract Code

Now that we have a template tic-tac-toe project, we can customise the template to incorporate our own contract logic. Let's start by implementing methods to handle the basic functionality for starting the Tic-Tac-Toe game, allowing players to make moves, retrieving the game board data and current status, and checking if the game has been initialized. Tic-Tac-Toe dApp includes the below functionalities:
1. Start a new game
2. Make a move in the ongoing game
3. Get the board details
4. Get the current status of the board
5. Get the initial status of the board

- Enter this command in your `Terminal`.

```bash title="Terminal"
cd src
```

#### Defining Methods and Messages

- Rename the proto file name `hello_world_contract.proto` inside folder `Protobuf/contract/` to `tic_tac_toe.proto`:

```bash title="Terminal"
mv Protobuf/contract/hello_world_contract.proto Protobuf/contract/tic_tac_toe.proto
```

The `.proto` file defines the structure and serialization of data, ensuring consistent communication and data exchange between the contract and external systems.

- Open the project with your IDE.

The implementation of `tic_tac_toe.proto` file inside folder `src/Protobuf/contract/` is as follows:

```csharp title="tic_tac_toe.proto"
syntax = "proto3";

import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "Protobuf/reference/acs12.proto";
// The namespace of this class
option csharp_namespace = "AElf.Contracts.TicTacToe";

service TicTacToe {
  // The name of the state class the smart contract is going to use to access blockchain state
  option (aelf.csharp_state) = "AElf.Contracts.TicTacToe.TicTacToeState";
  option (aelf.base) = "Protobuf/reference/acs12.proto";

  rpc Initialize (google.protobuf.Empty) returns (google.protobuf.Empty) {}
  
  rpc StartGame (google.protobuf.Empty) returns (google.protobuf.StringValue) {}
  
  rpc MakeMove (MoveInput) returns (google.protobuf.StringValue) {}
  
  rpc GetBoard (google.protobuf.Empty) returns (Board) {
    option (aelf.is_view) = true;
  }
  
  rpc GetGameStatus (google.protobuf.Empty) returns (GameStatus) {
    option (aelf.is_view) = true;
  }
  rpc GetInitialStatus(google.protobuf.Empty) returns(google.protobuf.BoolValue){
    option (aelf.is_view) = true;
  }
}

// Input for making a move
message MoveInput {
  int32 x = 1;
  int32 y = 2;
}

// A message to represent the game board
message Board {
  repeated string rows = 1;
}

// A message to represent the game status
message GameStatus {
  string status = 1;
  string winner = 2;
}
```

- `rpc` methods define the callable functions within the contract, allowing external systems to interact with the contract's logic.
- `message` represent the structured data exchanged between the contract and external systems.

#### Define Contract States

The implementation of the Tic-Tac-Toe dApp state inside file `src/TicTacToeState.cs` is as follows:

```csharp title="src/TicTacToeState.cs"
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.TicTacToe
{
    // The state class is access the blockchain state
    public partial class TicTacToeState : ContractState 
    {
        // A state to check if contract is initialized
        public BoolState Initialized { get; set; }
        public SingletonState<Address> Owner { get; set; }
        public StringState Board { get; set; } // Board state as a concatenated string
        public StringState CurrentPlayer { get; set; } // X or O
        public StringState GameStatus { get; set; } // ongoing, finished, draw
        public StringState Winner { get; set; } // X or O
    }
}
```

- The `State.cs` file in an aelf blockchain smart contract holds the variables that store the contract's data, making sure this data is saved and accessible whenever the contract needs it.

#### Implement Tic-Tac-Toe Smart Contract 

The implementation of the Tic-Tac-Toe dApp smart contract inside file `src/TicTacToe.cs` is as follows:

```csharp title="src/TicTacToe.cs"
using Google.Protobuf.WellKnownTypes;
using System.Collections.Generic;

namespace AElf.Contracts.TicTacToe
{
    // Contract class must inherit the base class generated from the proto file
    public class TicTacToe : TicTacToeContainer.TicTacToeBase
    {
     private const int BoardSize = 3;

        public override Empty Initialize(Empty input)
        {
            if (State.Initialized.Value)
            {
                return new Empty();
            }
            State.Initialized.Value = true;
            State.Owner.Value = Context.Sender;
            ResetBoard();
            return new Empty();
        }

        public override StringValue StartGame(Empty input)
        {
            if (!State.Initialized.Value)
            {
                return new StringValue { Value = "Contract not initialized." };
            }

            ResetBoard();
            State.CurrentPlayer.Value = "X";
            State.GameStatus.Value = "ongoing";
            State.Winner.Value = "";
            return new StringValue { Value = "Game started. Player X's turn." };
        }

        public override StringValue MakeMove(MoveInput input)
        {
            if (State.GameStatus.Value != "ongoing")
            {
                return new StringValue { Value = "Game is not ongoing." };
            }

            var board = GetBoardArray();
            if (board[input.X, input.Y] != "")
            {
                return new StringValue { Value = "Invalid move. Cell is already occupied." };
            }

            board[input.X, input.Y] = State.CurrentPlayer.Value;
            SaveBoard(board);

            if (CheckWinner())
            {
                State.GameStatus.Value = "finished";
                State.Winner.Value = State.CurrentPlayer.Value;
                return new StringValue { Value = $"Player {State.CurrentPlayer.Value} wins!" };
            }

            if (IsBoardFull(board))
            {
                State.GameStatus.Value = "draw";
                return new StringValue { Value = "It's a draw!" };
            }

            State.CurrentPlayer.Value = State.CurrentPlayer.Value == "X" ? "O" : "X";
            return new StringValue { Value = $"Player {State.CurrentPlayer.Value}'s turn." };
        }

        public override Board GetBoard(Empty input)
        {
              var board = GetBoardArray();
              var boardMessage = new Board();
          
              for (var i = 0; i < 3; i++) // Adjusted to 3 for a 3x3 Tic-Tac-Toe board
              {
                  var row = new List<string>();
                  for (var j = 0; j < 3; j++)
                  {
                      row.Add(board[i, j]);
                  }
                  boardMessage.Rows.Add(string.Join(",", row));
              }
          
              return boardMessage;
        }

        public override GameStatus GetGameStatus(Empty input)
        {
            return new GameStatus
            {
                Status = State.GameStatus.Value,
                Winner = State.Winner.Value
            };
        }

        public override BoolValue GetInitialStatus(Empty input){
              return new BoolValue { Value = State.Initialized.Value };
          }

        private void ResetBoard()
        {
            var emptyBoard = new string[BoardSize, BoardSize];
            for (var i = 0; i < BoardSize; i++)
            {
                for (var j = 0; j < BoardSize; j++)
                {
                    emptyBoard[i, j] = "";
                }
            }
            SaveBoard(emptyBoard);
        }

        private string[,] GetBoardArray()
        {
            var boardString = State.Board.Value;
            var rows = boardString.Split(';');
            var board = new string[BoardSize, BoardSize];
            for (var i = 0; i < BoardSize; i++)
            {
                var cells = rows[i].Split(',');
                for (var j = 0; j < BoardSize; j++)
                {
                    board[i, j] = cells[j];
                }
            }
            return board;
        }

        private void SaveBoard(string[,] board)
        {
            var rows = new string[BoardSize];
            for (var i = 0; i < BoardSize; i++)
            {
                rows[i] = string.Join(",", board[i, 0], board[i, 1], board[i, 2]);
            }
            State.Board.Value = string.Join(";", rows);
        }

        private bool CheckWinner()
        {
            var board = GetBoardArray();
            var player = State.CurrentPlayer.Value;

            for (var i = 0; i < BoardSize; i++)
            {
                if (board[i, 0] == player && board[i, 1] == player && board[i, 2] == player) return true;
                if (board[0, i] == player && board[1, i] == player && board[2, i] == player) return true;
            }

            if (board[0, 0] == player && board[1, 1] == player && board[2, 2] == player) return true;
            if (board[0, 2] == player && board[1, 1] == player && board[2, 0] == player) return true;

            return false;
        }

        private bool IsBoardFull(string[,] board)
        {
            for (var i = 0; i < BoardSize; i++)
            {
                for (var j = 0; j < BoardSize; j++)
                {
                    if (board[i, j] == "") return false;
                }
            }
            return true;
        }
    }
    
}
```

### Building Smart Contract

- Build the smart contract code with the following command inside `src` folder:

```bash title="Terminal"
dotnet build
```

You should see **TicTacToe.dll.patched** in the directory `1-smart-contract/src/bin/Debug/net.6.0`

## Step 3 - Deploy Smart Contract

import Deploy from "../\_deploy_tic_tac_toe.md"

<Deploy />

## Step 4 - Interact with Your Deployed Smart Contract through dApp

### Project Setup

Let's start by cloning the frontend project repository from github.

```bash title="Terminal"
git clone https://github.com/AElfProject/aelf-samples.git
```

- Next, navigate to the frontend project directory with this command:

```bash title="Terminal"
cd aelf-samples/tic-tac-toe/2-dapp
```

- Once you're inside the `2-dapp` directory, open the project with your preferred IDE (e.g., VSCode). You should see the project structure as shown below.

export const tree = {
  "type": "directory",
  "uri": "2-dapp",
  "expanded": true,
  "children": [
    {
      "type": "directory",
      "uri": "app"
    },
    {
      "type": "directory",
      "uri": "assets"
    },
    {
      "type": "directory",
      "uri": "public"
    },
    {
      "type": "directory",
      "uri": "src"
    },
    {
      "type": "file",
      "uri": ".gitignore"
    },
    {
      "type": "file",
      "uri": "components.json"
    },
    {
      "type": "file",
      "uri": "index.html"
    },
    {
      "type": "file",
      "uri": "package.json"
    },
    {
      "type": "file",
      "uri": "postcss.config.js"
    },
    {
      "type": "file",
      "uri": "README.md"
    },
    {
      "type": "file",
      "uri": "tailwind.config.js"
    },
    {
      "type": "file",
      "uri": "tsconfig.json"
    },
    {
      "type": "file",
      "uri": "tsconfig.node.json"
    },
    {
      "type": "file",
      "uri": "vite.config.ts"
    }
  ]
}

<div style={{height: 500}}><FileTree tree={tree} /></div>

#### Install necessary libraries

- Run this command in the terminal to install all necessary packages and libraries:

```bash title="Terminal"
npm install
```

We are now ready to build the frontend components of our Tic-Tac-Toe dApp.

### Configure Portkey Provider & Write Connect Wallet Function

Now, we'll set up our Portkey wallet provider to allow users to connect their Portkey wallets to the dApp and interact with the smart contract. We'll be interacting with the already deployed Tic-Tac-Toe smart contract for this tutorial.

**Step 1. Locate the File:**

- Go to the `src/hooks/useSmartContract.ts` file.

**Step 2. Fetch the Smart Contract:**

- Find the comment ` //Step A - Function to fetch a smart contract based on deployed wallet address`

- Replace the existing **`fetchContract`** function with this updated code:

```javascript title="useSmartContract.ts"
//Step A - Function to fetch a smart contract based on deployed wallet address
const fetchContract = async () => {
  if (!provider) return null;

  try {
    // 1. get the sidechain tDVW using provider.getChain
    const chain = await provider?.getChain("tDVW");
    if (!chain) throw new Error("No chain");

    //Address of TicTacToe Smart Contract
    //Replace with Address of Deployed Smart Contract
    const address = "your_deployed_tic_tac_toe_contract_address";

    // 2. get the TicTacToe contract
    const contract = chain?.getContract(address);
    setSmartContract(contract);
  } catch (error) {
    console.log(error, "====error");
  }
}
```

:::tip
ℹ️ Note: You are to replace the address placeholder with your deployed Tic Tac Toe smart contract address from "Deploy Smart Contract" step!

example: Replace with Address of Deployed Smart Contract  
const address = "your_deployed_tic_tac_toe_contract_address";
:::

**Explanation:**

- **`fetchContract`** **Function**: This function fetches a smart contract based on the given chain symbol (e.g., "AELF" or "tDVW") and the contract address.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Chain** : The function fetches chain information using the provider.
  - **Get Contract** : It retrieves the smart contract instance from the chain.
   
`AELF` represents the mainnet chain and `tDVW` represents the testnet chain respectively on the aelf blockchain.

**Step 3. Initialize and Fetch the Smart Contracts:**

- Find the comment `// Step B - Effect hook to initialize and fetch the smart contract when the provider changes.`

- Replace the existing **`useEffect`** hook with this updated code:

```javascript title="useSmartContract.ts"
  // Step B -  Effect hook to initialize and fetch the smart contract when the provider changes
  useEffect(() => {
    fetchContract();
  }, [provider]); // Dependency array ensures this runs when the provider changes
```

**Explanation:**
- **`useEffect` Hook** : This hook initializes and fetches the smart contracts when the provider changes.
  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Contracts** : It fetches and sets the smart contracts.

By following these steps, we'll configure the Portkey provider to connect users' wallets to our app and interact with the Tic-Tac-Toe smart contract including Tic-Tac-Toe Game Play related functionalities. This setup will enable our frontend components to perform actions like `initializeContract`, `startGame`, `makeMove`, `getGameStatus` and `getLatestBoard` etc.

### Configure Connect Wallet Function

**Step 1: Locate the File**

- Go to the `src/components/layout/header/index.tsx` file.

**Step 2: Write the Connect Wallet Function**

- The `header/index.tsx` file is the header of our Tic-Tac-Toe dApp. It allows users to connect their Portkey wallet with the Tic-Tac-Toe dApp.

- Before users can interact with the smart contract, we need to write the `Connect Wallet` function.

- Find the comment `// Step C - Connect Portkey Wallet`.

- Replace the existing **`connect`** function with this code snippet:

```javascript title="header/index.tsx"
const connect = async (walletProvider?: IPortkeyProvider) => {
  // Step C - Connect Portkey Wallet
  const accounts = await (walletProvider ? walletProvider : provider)?.request({
    method: MethodsBase.REQUEST_ACCOUNTS,
  });
  const account = accounts?.AELF && accounts?.AELF[0];
  if (account) {
    setCurrentWalletAddress(account.replace(/^ELF_/, "").replace(/_AELF$/, ""));
    setIsConnected(true);
  }
  !walletProvider && toast.success("Successfully connected");
};
```

**Explanation:**

- **`connect` Function** : This function connects the user's Portkey wallet with the dApp.
  - **Fetch Accounts** : It fetches the wallet accounts using the provider.
  - **Log Accounts** : Logs the accounts to the console for debugging.
  - **Set Wallet Address** : Sets the current wallet address state variable with the fetched account.

In this code, we fetch the Portkey wallet account using the provider and update the wallet address state variable. An alert notifies the user that their wallet is successfully connected.

With the connect wallet function defined, we're ready to write the remaining functions in the next steps.

### Check Contract Initialization

**Step 1: Locate the File**

- Go to the `src/pages/home/index.tsx` file. This file contains all the  functionalities like show `initializeContract`, `startGame`, `makeMove`, `getGameStatus` and `getLatestBoard` etc.

**Step 2: Prepare a Function to Check Whether the Contract is Initialized or not**

- Scroll down to find the comment `// step 1 - Check If Contract is Initialized or not `.

- Replace the existing **`checkIsContractInitialized`** function with this code snippet:
 
```javascript title="home/index.tsx"
// step 1 - Check If Contract is Initialized or not 
const checkIsContractInitialized = async () => {
  const result = await smartContract?.callViewMethod("GetInitialStatus", ""); // Call the GetInitialStatus method which is present on Smart Contract
  setIsContractInitialized(result?.data?.value); // Expect value True if it's Initialized otherwise NULL if it's not
};
```

### Initialize Contract

- Scroll down to find the comment `// step 2 - Initialize the smart contract`.

- Replace the existing **`checkIsContractInitialized`** function with this code snippet:

<!-- checkIsContractInitialized and initializeContract are different here -->
 
```javascript title="home/index.tsx"
// step 2 - Initialize the smart contract
const initializeContract = async () => {
  let initializeLoadingId;
  try {
    // Start Loading
    initializeLoadingId = toast.loading("Initializing a Contract..");

    await smartContract?.callSendMethod(
      "Initialize", // Function Name
      currentWalletAddress as string, // User Wallet Address
      {} // No Arguments
    );
    
    // Update Loading Message with Success
    toast.update(initializeLoadingId, {
      render: "Contract Successfully Initialized",
      type: "success",
      isLoading: false,
    });
    
    return;
  } catch (error: any) {

    // Update Loading Message with Error
    toast.update(initializeLoadingId as Id, {
      render: error.message,
      type: "error",
      isLoading: false,
    });
    return;
  } finally {
    // Remove Loading Message
    removeNotification(initializeLoadingId as Id);
  }
};
```

### Fetch Game Status

- Write the function to fetch the game status.

- Find the comment `// step 3 - Fetch Game Status function` on same file.

- Replace the existing **`getGameStatus`** function with this code snippet:

```javascript title="home/index.tsx"
// step 3 - Fetch Game Status function
const getGameStatus = async (isFirstCheck?: boolean) => {
  try {
    const result = await smartContract?.callViewMethod("GetGameStatus", "");
    console.log("result", result);
    if (result?.data.status === "finished") {
      if (!isFirstCheck) {
        toast.success(`${result.data.winner} is Winner 🥳 🏆`);
        setWinner(result.data.winner);
      }
    } else {
      setIsStarted(true);
      getLatestBoard();
    }
  } catch (error: any) {
    toast.error(error.message);
  } finally {
    setLoading(false);
    return;
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to fetch the game status using `getGameStatus` Function.

Next, we'll write the **Fetch Board Data** function.

### Fetch Board Data

Write the function to fetch the board data.

- Scroll down to find the comment `// step 4 - Fetch Latest Board Data from the Contract`.

- Replace the existing **`getLatestBoard`** function with this code snippet:

```javascript title="home/index.tsx"
  // step 4 - Fetch Latest Board Data from the Contract 
  const getLatestBoard = async () => {
    try {
      const result = await smartContract?.callViewMethod("GetBoard", "");
      const arrayData = result?.data.rows
        .map((rowData: any) =>
          rowData.split(",").map((item: string) => (item === "" ? null : item))
        )
        .flat();
      getNextTurn(arrayData);
      setBoard(arrayData);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      return;
    }
  };
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to fetch the latest board data using `getLatestBoard` Function.

3. **Convert Respnose Data into Array** : It converts object of the response data to an array to adjust every move into the UI board.

Next, we'll write the **Start Game** function.

### Start Game

Write the Function to start the Tic-Tac-Toe game.

- Scroll down to find the comment `// step 5 - Start Game function`.

- Replace the existing **`startGame`** function with the following code snippet:

```javascript title="home/index.tsx"
// step 5 - Start Game function
const startGame = async () => {
  try {
    if (!currentWalletAddress) {
      toast.info("Please Login First");
      return;
    }
    if (!isContractInitialized) {
      await initializeContract();
    }
    await smartContract?.callSendMethod("StartGame", currentWalletAddress);
    setTurnType("X");
    setIsStarted(true);
    getLatestBoard();
    toast.success("Game Has been Started ✅");
  } catch (error: any) {
    toast.error(error.message);
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to start the game by using the `startGame` Function.

Next, we'll write the **Make the Move** function.

### Perform the Move

Write a function to make the move.

- Scroll down to find the comment `// step 6 - Make the Move Function`.

- Replace the existing **`makeMove`** function with this code snippet:

```javascript title="home/index.tsx"
// step 6 - Make the Move Function 
const makeMove = async (x: number, y: number) => {
  try {
    if (!currentWalletAddress) {
      toast.info("Please Login First");
      return;
    }
    const moveIndex = getIndexFromPosition(x, y);
    setMoveLoadingIndex(moveIndex as number);
    const params = {
      x: x,
      y: y,
    };
    await smartContract?.callSendMethod(
      "MakeMove",
      currentWalletAddress,
      params
    );
    // toast.success("Your Move Submitted");
    changeTurn();
    await getLatestBoard();
    await getGameStatus();
  } catch (error: any) {
    toast.error(error.message);
  } finally {
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to make the move by an input from a player using `makeMove` function by passing **X** and **Y** value of the Board.

Now that we've written all the necessary frontend functions and components for play the Tic-Tac-Toe page, we're ready to run the Tic-Tac-Toe dApp application in the next step.

### Run Application

In this step, we will run the Tic-Tac-Toe dApp application.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

:::info

**Note**: Ensure that you are running this command under the **tic-tac-toe/2-dapp** folder.

:::

- You should observe the following as shown below.

  ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the Tic-Tac-Toe dApp landing page as shown below.

:::tip
If you are developing and testing this with github codespace, you can use `port forward` to test the web server that is running in codespace, here is the link on how to use `port forward` for codespace https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace
:::

- Usually codespaces automatically forward ports, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:

  ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the Tic-Tac-Toe dApp in the browser.

  ![tic-tac-toe-home-page](/img/tic-tac-toe-home-page.png)

#### Create Portkey Wallet

:::info
Portkey is the first AA wallet from aelf's ecosystem, migrating users, developers and projects from Web2 to Web3 with DID solution.

Users can swiftly log into Portkey via their Web2 social info with no private keys or mnemonics required. Underpinned by social recovery and decentralized guardian design, Portkey safeguards users' assets from centralized control and theft. Portkey has a unique payment delegation mechanism which enables interested parties to function as delegatees to pay for user activities on users' behalf. This means that users can create accounts for free and fees for other usages may also be covered in Portkey.

Portkey also provides crypto on/off-ramp services, allowing users to exchange fiat with crypto freely. It supports the storage and management of various digital assets such as tokens, NFTs, etc. The compatibility with multi-chains and seamless connection to all kinds of DApps makes Portkey a great way to enter the world of Web3.

With DID solution as its core, Portkey provides both Portkey Wallet and Portkey SDKs.

For more information, you may visit the official documentation for Portkey at https://doc.portkey.finance/.
:::


- Download the Chrome extension for Portkey from https://chromewebstore.google.com/detail/portkey-wallet/iglbgmakmggfkoidiagnhknlndljlolb.

:::info
The Portkey extension supports Chrome browser only (for now). Please ensure that you are using Chrome browser.
You may download Chrome from https://www.google.com/intl/en_sg/chrome/.
:::

- Once you have downloaded the extension, you should see the following on your browser as shown below.

   ![welcome-to-portkey](/img/welcome-to-portkey.png)

- Click on `Get Start` and you should see the following interface as shown below.

   ![portkey-login](/img/portkey-login.png)


**Sign up** 

- Switch to **aelf Testnet** network by selecting it:

   ![portkey-switch-to-testnet](/img/portkey-switch-to-testnet.png)

:::danger
Please make sure you are using `aelf Testnet` in order to be able to receive your testnet tokens from the Faucet.
:::

- Proceed to sign up with a Google Account or your preferred login method and complete the necessary accounts creation prompts and you should observe the following interface once you have signed up.

   ![success-login](/img/success-login.png)

With that, you have successfully created your very first Portkey wallet within seconds. How easy was that?

:::info
It is highly recommended to pin the Portkey wallet extension for easier access and navigation to your Portkey wallet!
:::

- Next, click on ‘Open Portkey’ and you should now observe the following as shown below.

   ![portkey-wallet-preview](/img/portkey-wallet-preview.png)

**Connect Portkey Wallet**

- Click on **"Connect Wallet"** to connect your Portkey wallet.

   ![connect-wallet](/img/tic-tac-toe-connect-wallet.png)

- The button will change to **"Your Wallet Address"** when the connection is successful.

   ![collect-wallet-success](/img/tic-tac-toe-wallet-connect-success.png)

--- 

**Start The Game**

- Click on **"Start The Game"** button to Start The Tic Tac Toe Game.

   ![start-game](/img/start-game-button.png)

- You will receive a transaction request on your portkey wallet to  **Sign** the transaction.

   ![start-game-sign-request](/img/start-game-sign-request.png)

- Click on **Sign** the transaction.

- After the transaction is successfully processed, your game will start ✅.

   ![start-game-success](/img/start-game-success.png)

As we have **Started the Game** successfully, let's start to perform the moves and enjoy the game.

---

**Perform the Move**

  Let's start to make the moves and play the game.

:::tip
Your first move will always be **"X"** as shown in the picture below.
:::

- Click on the first square of the board, as shown in the picture below.

   ![make-move](/img/make-move.png)

- You will receive a transaction request on your Portkey wallet to **Sign** for making the move.

   ![make-move-sign-request](/img/make-move-sign-request.png)

- After the transaction is successfully processed, your first move will be submitted to blockchain ✅.

- Now it's turn of move by the opponent and the move sign will change from **"X"** to **"O"**. Your active turn is **"O"** now, as shown in the picture below.

- Click on the middle square of the board for **"O"**, as shown in the picture below.

   ![second-move](/img/second-move.png)

- You will receive a transaction request on your Portkey wallet to **Sign** for the second move.

   ![second-move-request](/img/second-move-request.png)

- Click on **Sign** the transaction.

- After the transaction is successfully processed, your second move will be submitted to the blockchain ✅.

- Now you can continue making other moves as demonstrated above.

- After winning the game, you will see this winning screen with the corresponding move (**X** or **O**).

   ![winner-view](/img/winner-view.png)

- Click on the **Start Again** button to continue playing the Tic-Tac-Toe game with aelf blockchain. Enjoy!

   ![start-again](/img/start-again.png)

- You will  be redirected again to the **Welcome screen** of the Game.

   ![welcome-screen](/img/welcome-screen.png)

:::success
🎉 Congratulations Learners! You have successfully built your Tic-Tac-Toe dApp with aelf Blockchain.
:::


## 🎯 Conclusion

🎉 Congratulations on successfully completing the **Tic Tac Toe dApp** tutorial! 🎉 You've achieved significant milestones, from setting up your development environment to deploying and interacting with your Tic-Tac-Toe smart contract on the aelf blockchain. 🌟

**📚 What You've Learned**

Throughout this tutorial, you've mastered:

  - **🛠️ Setting Up Your Development Environment:** You equipped your workspace by installing and configuring all the necessary tools to get your smart contract project off the ground.

  - **💻 Developing Your Smart Contract:** You built the core logic of your Tic Tac Toe game, writing and compiling the smart contract that manages game states, moves, and outcomes.

  - **🚀 Deploying the Smart Contract:** You successfully deployed your Tic Tac Toe smart contract to the aelf blockchain, making it live and ready for gameplay.

  - **🔧 Interacting with Your Deployed Smart Contract through the dApp:** You connected your frontend to the blockchain, configured the Portkey provider, and implemented essential functions like wallet connectivity, game initialization, and move management.

**🔍 Final Output**

By now, you should have:

  - 📜 A deployed Tic-Tac-Toe smart contract that governs the game's rules and manages players' moves on the blockchain.

  - 💻 A fully functional Tic-Tac-Toe dApp, allowing users to connect their wallets, start a game, make moves, and determine the winner, all in a decentralized manner.

**➡️ What's Next?**

With the foundation laid, consider advancing your Tic-Tac-Toe dApp with more sophisticated features:

  - **📈 Enhancing Game Logic:** Add more features like AI opponents, multiplayer functionality, or scoring systems to make the game more engaging.

  - **🔒 Improving Security:** Secure your game by applying best practices in smart contract security to protect users' data and gameplay integrity.

  - **🌍 Exploring Cross-Chain Capabilities:** Expand your dApp’s reach by exploring aelf’s cross-chain interoperability, enabling interactions with other blockchains.

Blockchain technology and decentralized applications offer limitless possibilities. With your Tic-Tac-Toe dApp, you're now poised to continue innovating and exploring new horizons with aelf. 🚀

Happy coding and expanding your **Tic-Tac-Toe dApp!** 😊