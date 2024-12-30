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
    // 1. get the dAppChain tDVW using provider.getChain
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
  } catch (error) {
    // Update Loading Message with Error
    if (error instanceof Error) {
      toast.update(initializeLoadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
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
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
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

- Scroll down to find the comment `// step 4 - Fetch Latest Board Data from Contract`.

- Replace the existing **`getLatestBoard`** function with this code snippet:

```javascript title="home/index.tsx"
// step 4 - Fetch Latest Board Data from Contract 
const getLatestBoard = async () => {
  try {
    const result = await smartContract?.callViewMethod("GetBoard", "");
    const arrayData = result?.data.rows.map((rowData: string) => rowData.split(",").map((item: string) => (item === "" ? null : item))).flat();
    getNextTurn(arrayData);
    setBoard(arrayData);
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
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
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to start the game by using the `startGame` Function.

Next, we'll write the **Make the Move** function.

### Perform the Move

Write a function to make the move.

- Scroll down to find the comment `// step 6 - Perform the Make Move Function`.

- Replace the existing **`makeMove`** function with this code snippet:

```javascript title="home/index.tsx"
// step 6 - Perform the Make Move Function 
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
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  } finally {
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to make the move by an input from a player using `makeMove` function by passing **X** and **Y** value of the Board.

Now that we've written all the necessary frontend functions and components for play the Tic-Tac-Toe page, we're ready to run the Tic-Tac-Toe dApp application in the next step.
