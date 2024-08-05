---
sidebar_position: 4
title: NFT Tutorial Contract
description: Moderate smart contract
---

**Description**: This tutorial demonstrates using a multi-token contract for NFT collection creation, NFT creation, NFT transfers, and NFT burning to eventually create a basic NFT.

**Purpose**: To introduce you to multi-token contracts, NFT creation, and transfer in smart contracts.

**Difficulty Level**: Moderate

## Step 1 - Setting up your development environment

import Setup from "../\_setup.md"

<Setup />

## Step 2 - Getting NFT Seed

For creating an NFT collection, the deployer wallet must have an **NFT SEED**.

- Visit [NFT Faucet](https://faucet-ui.aelf.dev/) to get your NFT SEED.

---

![result](/img/Seed.png)

- You will receive the **SEED** in your wallet.

---

![result](/img/symbol.png)

---

- Please note down this symbol value, as we will need it later when creating the NFT collection and NFT. This will become our **Token Symbol**.

## Step 3 - Interact with Deployed Multi-Token Smart Contract

For this NFT contract, you don't need to write a separate contract. Instead, you'll use an already deployed Multi-Token Contract with the following functions.

### 3.1 Creating an NFT Collection on MainChain

Open your terminal and run:

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Create --params '{"tokenName": "NFT Name", "symbol": "ULJVFKQGKX-0", "totalSupply": "1", "decimals": 0, "issuer": "wallet_address", "isBurnable": true, "issueChainId": 1931928, "owner": "wallet_address"}'
```

- Replace the placeholder values with your actual details.

:::tip
ℹ️ Note: `JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE` is the contract address of the Multi-Token Contract on **aelf Testnet Mainchain**.
:::

### 3.2 Validate TokenInfoExist on MainChain

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io ValidateTokenInfoExists --params '{"tokenName": "NFT Name", "symbol": "ULJVFKQGKX-0", "totalSupply": "1", "decimals": 0, "issuer": "address", "isBurnable": true, "issueChainId": 1931928, "owner": "wallet_address"}'
```

:::tip
ℹ️ Note: `transactionId` Note down the trasnactionId from the above transaction will be used in **step 3**.
:::

### 3.3 Create NFT Collection on SideChain

```bash
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io CrossChainCreateToken --params '{"fromChainId":9992731, "parentChainHeight": blocknumber_of_2nd_transaction,"transactionBytes": bytes, "merklePath":{}}'
```

```bash
transactionBytes = Buffer.from(signedTx, "hex").toString("base64")
```

:::tip
ℹ️ Note: Replace the placeholder values with your actual details.
:::

:::tip
ℹ️ Note: `ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx` is the contract address of the Multi-Token Contract on **aelf Testnet Sidechain**.
:::

### 3.4 Create NFT Token on MainChain

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Create --params '{"tokenName": "NFT Name", "symbol": "ULJVFKQGKX-0", "totalSupply": "100", "decimals": 0, "issuer": "wallet_address", "isBurnable": true, "issueChainId": 1931928, "owner": "wallet_address", "externalInfo":{}}'
```

### 3.5 Validate Nft Token on MainChain

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io ValidateTokenInfoExists --params '{"tokenName": "NFT Name", "symbol": "ULJVFKQGKX-0", "totalSupply": "1", "decimals": 0, "issuer": "address", "isBurnable": true, "issueChainId": 1931928, "owner": "wallet_address", "externalInfo":{}}'
```

### 3.6 Create NFT Token on SideChain

```bash
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io CrossChainCreateToken --params '{"fromChainId":9992731, "parentChainHeight": blocknumber_of_5th_transaction,"transactionBytes": bytes, "merklePath":{}}'
```

```bash
transactionBytes = Buffer.from(signedTx, "hex").toString("base64")
```

### 3.7 Issue NFT Token on SideChain

```bash
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Issue --params '{"symbol":"ULJVFKQGKX-2", "amount": 2,"memo": "Testing Issuance", "to":to_address}'
```

### 3.8 Transfer NFT

```bash
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Transfer --params '{"symbol":"ULJVFKQGKX-2", "amount": 2,"memo": "Testing Issuance", "to":to_address}'
```

## Step 4 - Interact with Your Deployed Smart Contract

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Project Setup

Let's start by cloning the frontend project repository from GitHub.

- Run the following command in the `nft_aelf` directory:

```bash title="Terminal"
git clone ---
```

- Next, navigate to the frontend project directory with this command:

```bash title="Terminal"
cd `nft-contract`-frontend
```

- Once you're in the `nft-contract-frontend` directory, open the project with your preferred IDE (e.g., VSCode). You should see the project structure as shown below.

  ![result](/img/vote-fe-directory.png)

#### Install necessary libraries

- Run this command in the terminal:

<Tabs>
<TabItem value="Linux and macOs" label="Linux and macOs" default>
```bash title="Terminal"
sudo npm install
```
</TabItem>

<TabItem value="Windows" label="Windows">
```bash title="Terminal"
npm install
```
</TabItem>
</Tabs>

We are now ready to build the frontend components of our NFT dApp.

### Configure Portkey Provider & Write Connect Wallet Function

We'll set up our Portkey provider to allow users to connect their Portkey wallets to our app and interact with our NFT smart contract.

**Step 1. Locate the File:**

- Go to the `src/hooks/useNFTSmartContract.ts` file.

**Step 2. Fetch the Smart Contract:**

- Find the comment `//Step A - Function to fetch a smart contract based on chain symbol and contract address.`

- Replace the existing **`fetchContract`** function with this updated code:

```javascript title="useNFTSmartContract.ts"
//Step A - Function to fetch a smart contract based on chain symbol and contract address
const fetchContract = async (
  symbol: "AELF" | "tDVW",
  contractAddress: string
) => {
  try {
    // If no provider is available, return null
    if (!provider) return null;

    // Fetch the chain information using the provider
    const chain = await provider.getChain(symbol);
    if (!chain) throw new Error("Chain not found");

    // Get the smart contract instance from the chain
    const contract = chain.getContract(contractAddress);

    // Return the smart contract instance
    return contract;
  } catch (error) {
    console.error("Error in fetchContract", { symbol, contractAddress, error });
  }
};
```

**Explanation:**

- **`fetchContract`** **Function**: This function fetches a smart contract based on the given chain symbol (e.g., "AELF" or "tDVW") and contract address.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Chain** : The function fetches chain information using the provider.
  - **Get Contract** : It retrieves the smart contract instance from the chain.
  - **Error Handling** : If an error occurs, it logs the error to the console.

**Step 3. Initialize and Fetch the Smart Contracts:**

- Find the comment `// Step B - Effect hook to initialize and fetch the smart contracts when the provider changes.`

- Replace the existing **`useEffect`** hook with this updated code:

```javascript title="useNFTSmartContract.ts"
// Step B -  Effect hook to initialize and fetch the smart contracts when the provider changes
useEffect(() => {
  (async () => {
    // Fetch the MainChain Testnet Contract
    const mainChainContract = await fetchContract(
      "AELF",
      "JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE"
    );
    setMainChainSmartContract(mainChainContract);

    // Fetch the SideChain Testnet Contract
    const sideChainContract = await fetchContract(
      "tDVW",
      "2PC7Jhb5V6iZXxz8uQUWvWubYkAoCVhtRGSL7VhTWX85R8DBuN"
    );
    setSideChainSmartContract(sideChainContract);

    // Fetch the CrossChain Testnet Contract
    const crossChainContract = await fetchContract(
      "tDVW",
      "ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx"
    );
    setCrossChainSmartContract(crossChainContract);
  })();
}, [provider]); // Dependency array ensures this runs when the provider changes
```

**Explanation:**

- **`useEffect`** **Hook** : This hook initializes and fetches the smart contracts when the provider changes.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Contracts** : It fetches and sets the smart contracts for the main chain, side chain, and cross chain.
    - **MainChain Contract** : Fetches the MainChain Testnet Contract and sets it in the state.
    - **SideChain Contract** : Fetches the SideChain Testnet Contract and sets it in the state.
    - **CrossChain Contract** : Fetches the CrossChain Testnet Contract and sets it in the state.
  - **Error Handling** : Logs errors if any occur during the fetching process.

By following these steps, you'll configure the Portkey provider to connect users' wallets to your app and interact with the NFT smart contract. This setup will enable our frontend components to perform actions like creating NFTs, validating NFTs, and transferring NFTs.

### Write the Connect Wallet Function

**Step 1: Locate the File**

- go to the `src/components/layout/header/index.tsx` file.

**Step 2: Write the Connect Wallet Function**

- The `header/index.tsx` file is the header of our NFT dApp. It allows users to interact with the wallet connection.

- Before users can interact with the smart contract, we need to write the Connect Wallet function.

- Find the comment `// Step C - Connect Portkey Wallet`.

- Replace the existing connect function with this code snippet:

```javascript title="header/index.tsx"
const connect = async (walletProvider?: IPortkeyProvider) => {
  // Step C - Connect Portkey Wallet
  try {
    // Request accounts from the wallet provider
    const accounts = await (walletProvider
      ? walletProvider
      : provider
    )?.request({
      method: MethodsBase.REQUEST_ACCOUNTS,
    });

    console.log("accounts", accounts);

    // Get the first account from the list of accounts
    const account = accounts?.AELF && accounts?.AELF[0];
    if (account) {
      setCurrentWalletAddress(account);
      setIsConnected(true);
      alert("Successfully connected");
    }
  } catch (error) {
    console.error("Error connecting wallet", error);
  }
};
```

**Explanation:**

- **`connect`** **Function** : This function connects the user's Portkey wallet.

  - **Fetch Accounts** : It fetches the wallet accounts using the provider.
  - **Log Accounts** : Logs the accounts to the console for debugging.
  - **Set Wallet Address** : Sets the current wallet address state variable with the fetched account.
  - **Update Connection Status** : Updates the state to indicate that the wallet is connected.
  - **User Notification** : Displays an alert to notify the user that their wallet is successfully connected.

In this code, we fetch the Portkey wallet account using the provider and update the wallet address state variable. An alert notifies the user that their wallet is successfully connected.

With the Connect Wallet function defined, we're ready to write the remaining functions in the next steps.

### Write Create Proposal Function

**Step 1: Locate the File**

1.  go to the `src/pages/create-nft/index.tsx` file. This file is the "Create NFTs" page where users can enter details like the `tokenName`, `symbol`, `totalSupply` and `decimals`.

**Step 2: Write the Create New NFT Collection on MainChain Function**

1.  Find the comment `// Step D - Configure NFT Form`.

2.  Replace the form variable with this code snippet:

```javascript title="src/CreateProposal.tsx"
// Step D - Configure NFT Form
const form =
  useForm <
  z.infer <
  typeof formSchema >>
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        tokenName: "",
        symbol: "",
        totalSupply: "",
        decimals: "",
      },
    };
```

#### Here's what the function does:

1. Initializes a new form variable with default values needed to create a nft.

2. Fields include: `tokenName` , `symbol` , `totalSupply` , and `decimals`.

Now your form is ready for users to fill in the necessary details for their NFTs functionInteraction.

### Write The Functions for NFT Interaction

Let's write the Create New NFT Collection on MainChain Function

**Step 1: Locate the File**

- go to the `src/pages/create-nft/index.tsx` file.

**Step 2: Write the Create New NFT Collection on MainChain Function**

- The `create-nft/index.tsx` file is create page of our NFT dApp. It allows users to create a new NFTs.

- Find the comment `// step E - Create New NFT Collection on MainChain Function`.

- Replace the existing **`createNewNftCollectionOnMainChain`** function with this code snippet:

```javascript title="create-nft/index.tsx"
  const createNewNftCollectionOnMainChain = async (values: {
    tokenName: string;
    symbol: string;
    totalSupply: string;
    decimals: string;
  }) => {
    try {
	  // Create an object with the necessary information for the new NFT collection.
    const createNtfInput: INftInput = {
      tokenName: values.tokenName, // Name of the nft Collection
      symbol: values.symbol, // Symbol of the token (You have to get it from your wallet on NFT seed from NFT section)
      totalSupply: values.totalSupply, // Total supply of the token
      decimals: values.decimals, // Decimals of the token
      issuer: currentWalletAddress, // Address of the token issuer
      isBurnable: true, // Indicates if the token can be burned
      issueChainId: mainchain_from_chain_id, // ID of the issuing chain
      owner: currentWalletAddress, // Owner's wallet address
    };

    // Log the input data for debugging purposes.
    console.log("createNtfInput", createNtfInput);

	// Call the smart contract method to create the new NFT collection on the main chain.
    const result = await mainChainSmartContract?.callSendMethod(
      "Create",
      currentWalletAddress,
      createNtfInput
    );

	// Log the result of the creation for debugging purposes.
    console.log("========= result of createNewNft =========", result);

	// Alert the user that the new NFT has been created successfully.
    alert("New Nft Created");

	// Return the input data for further use.
    return createNtfInput;

    } catch (error: any) {
	// If there's an error, log it and alert the user.
    console.error(error.message, "=====error");
    alert(error.message);
    return "error";
    }
  };
```

:::tip
ℹ️ Note: You need to get **symbol** from wallet like Portkey.

- **Follow Steps to get NFT symbol from Portkey Wallet:**

  - Open Portkey Wallet.
  - Go to the NFTs tab.
  - You will find the SEED that you already got from above steps.
  - Click on that SEED to see details
  - You will find the **Token Symbol** on **Token Creation via This Seed** section.
  - Copy add use that value of Token Symbol.
    :::

#### What This Function Does:

1. **Creates an Object with NFT Details** : It prepares the data needed to create a new NFT collection.

2. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to create the new NFT collection using the prepared data.

3. **Logs Information** : It logs the input data and the result for debugging purposes.

4. **Alerts the User** : It notifies the user about the successful creation of the NFT or any errors that occur.

Next, we'll write the **Validate Token Info Exist** function.

**Step 3: Write the Validate Token Info Exist Function**

- Scroll up to find the comment `// Step F: Validate token information existence`.

- Replace the existing **`validateTokenInfoExist`** function with this code snippet:

```javascript title="create-nft/index.tsx"
  // Step E: Validate token information existence
  // This function validates if the token information already exists on the main blockchain.
  const validateTokenInfoExist = async (values: INftInput) => {
    try {
      // Create an object with the necessary information for token validation.
      const validateInput = {
        symbol: values.symbol, // Symbol of the token
        tokenName: values.tokenName, // Name of the token
        totalSupply: values.totalSupply, // Total supply of the token
        decimals: values.decimals, // Decimals of the token
        issuer: currentWalletAddress, // Address of the token issuer
        isBurnable: true, // Indicates if the token can be burned
        issueChainId: mainchain_from_chain_id, // ID of the issuing chain
        owner: currentWalletAddress, // Owner's wallet address
      };

      // Call the smart contract method to validate if the token information exists on the main chain.
      const result = await mainChainSmartContract?.callSendMethod(
        "ValidateTokenInfoExists",
        currentWalletAddress,
        validateInput
      );

      // Save the transaction data and transaction ID for further use.
      setTransactionBytes(result?.data && result.data.Transaction);
      setTransactionId(result?.data && result.data.TransactionId);

      // Log the result of the validation for debugging purposes.
      console.log(
        "========= result of validateTokenInfoExist =========",
        result
      );

      // Alert the user that the token validation was successful.
      alert("NFT Validation Successful");

      // Return success status.
      return "success";
    } catch (error: any) {
      // If there's an error, log it and alert the user.
      console.error(error.message, "=====error in validateTokenInfoExist");
      alert(`error in validateTokenInfoExist ${error.message}`);
      return "error";
    }
  };
```

#### What This Function Does:

1. **Creates an Object with NFT Details** : It prepares the data needed to validate the token information.

2. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to check if the token information already exists using the prepared data.

3. **Logs Information** : It logs the validation result for debugging purposes.

4. **Saves Transaction Data** : It saves the transaction bytes and transaction ID for further use.

5. **Alerts the User** : It notifies the user about the successful validation of the token or any errors that occur.

Next, we'll write the **Get the parent chain height** function.

**Step 4: Write the Get the parent chain height Function**

- Scroll up to find the comment `// Step G: Get the parent chain height`.

- Replace the existing **`GetParentChainHeight`** function with this code snippet:

```javascript title="create-nft/index.tsx"

  // Step F: Get the parent chain height
  // This function fetches the current height of the parent blockchain.
  const GetParentChainHeight = async () => {
    try {
      // Set the transaction status to indicate the process of fetching the parent chain height.
      setTransactionStatus("Fetching Parent Chain Height");

      // Log the side chain smart contract for debugging purposes.
      console.log("sideChainSmartContract", sideChainSmartContract);

      // Call the smart contract method to get the parent chain height.
      const result = await sideChainSmartContract?.callViewMethod(
        "GetParentChainHeight",
        ""
      );

      // Log the result of fetching the parent chain height for debugging purposes.
      console.log("========= result of GetParentChainHeight =========", result);

      // Return the parent chain height if it exists, otherwise return an empty string.
      return result ? (result.data.value as string) : "";

    } catch (error: any) {
      // If there's an error, log it and return an error status.
      console.error(error, "=====error in GetParentChainHeight");
      return "error";
    }
};
```

#### What This Function Does:

1. **Sets Transaction Status** : It updates the transaction status to indicate that the process of fetching the parent chain height has started.

2. **Logs Information** : It logs the side chain smart contract for debugging purposes.

3. **Calls Smart Contract Method** : It interacts with the side chain smart contract to fetch the current height of the parent blockchain.

4. **Returns Parent Chain Height** : It returns the parent chain height if it exists, otherwise it returns an empty string.

5. **Handles Errors** : If an error occurs, it logs the error and returns an error status.

Next, we'll write the **Fetch the Merkle path** function.

**Step 5: Write the Fetch the Merkle path Function**

- Scroll up to find the comment `// Step H: Fetch the Merkle path`.

- Replace the existing **`getMarkelPath`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// Step G: Fetch the Merkle path
const getMarkelPath = async () => {
  try {
    // Set the transaction status to indicate the process of fetching the Merkle path.
    setTransactionStatus("Fetching Markel Path");

    // Fetch the Merkle path using the transaction ID.
    const response = await fetch(merkelApiUrl + transactionId);

    // Parse the response as JSON.
    const json = await response.json();

    // Return the Merkle path nodes from the JSON response.
    return json.MerklePathNodes;
  } catch (error) {
    // If there's an error, clear the transaction status and log the error.
    setTransactionStatus("");
    console.error(error, "=====error in getMarkelPath");
    return "error";
  }
};
```

#### What This Function Does:

1. **Fetches Merkle Path** : It sends a request to fetch the Merkle path using the transaction ID.

2. **Parses Response** : It parses the response from the server as JSON.

3. **Returns Merkle Path Nodes** : It extracts and returns the Merkle path nodes from the JSON response.

4. **Handles Errors** : If an error occurs, it clears the transaction status and logs the error.

Next, we'll write the **Create a token on the cross-chain** function.

**Step 5: Create a token on the cross-chain Function**

- Scroll up to find the comment `// Step I: Create a token on the cross-chain`.

- Replace the existing **`createTokenOnCrossChain`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// Step H: Create a token on the cross-chain
const createTokenOnCrossChain = async (
  parentChainHeight: any,
  merklePath: any
) => {
  try {
    // Set the transaction status to indicate the process of creating a token on the cross-chain.
    setTransactionStatus("Creating Token on CrossChain");

    // Convert transaction details object to a JSON string.
    const jsonString = JSON.stringify(transactionDetails);

    // Convert the JSON string to a byte array.
    const byteObj = new TextEncoder().encode(jsonString);
    const byteArray = Object.values(byteObj);

    // Prepare the data object with the necessary parameters for the cross-chain token creation.
    const data = {
      fromChainId: mainchain_from_chain_id,
      parentChainHeight: parentChainHeight,
      transactionBytes: byteArray,
      merklePath: merklePath,
    };

    // Call the smart contract method to create the token on the cross-chain.
    const result = await crossChainSmartContract?.callSendMethod(
      "CrossChainCreateToken",
      currentWalletAddress,
      data
    );

    // Return success if the token creation is successful.
    return "success";
  } catch (error) {
    // If there's an error, clear the transaction status and log the error.
    setTransactionStatus("");
    console.error(error, "=====error in createTokenOnCrossChain");
    return "error";
  }
};
```

#### What This Function Does:

1. **Fetches Merkle Path** : It sends a request to fetch the Merkle path using the transaction ID.

2. **Parses Response** : It parses the response from the server as JSON.

3. **Returns Merkle Path Nodes** : It extracts and returns the Merkle path nodes from the JSON response.

4. **Handles Errors** : If an error occurs, it clears the transaction status and logs the error.

Now, let's write the Create NFT function for the form submission.

1. Scroll down to find the comment `// Step J - Write Create NFT Logic`.

2. Replace the onSubmit function with this code snippet:

```javascript title="src/CreateProposal.tsx"
// Step E: Write Create Proposal Logic
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  // Step 1: Create a new NFT collection on the main chain using the provided form values.
  const createResult = await createNewNftCollectionOnMainChain(values);
  // If the creation fails, return early and do not proceed with the next steps.
  if (createResult === "error") {
    return;
  }

  // Step 2: Validate the created token information exists.
  const validationTokenResult = await validateTokenInfoExist(createResult);
  // If the validation fails, return early and do not proceed with the next steps.
  if (validationTokenResult === "error") {
    return;
  }

  // Step 3: Fetch the parent chain height.
  const chainHightResult = await GetParentChainHeight();
  // If fetching the parent chain height fails, return early and do not proceed with the next steps.
  if (chainHightResult === "error") {
    return;
  }

  // Step 4: Fetch the Merkle path for the transaction.
  const markelResult = await getMarkelPath();
  // If fetching the Merkle path fails, return early and do not proceed with the next steps.
  if (markelResult === "error") {
    return;
  }

  // Step 5: Create the token on the cross-chain using the parent chain height and Merkle path.
  const crossChainNftResult = await createTokenOnCrossChain(
    chainHightResult,
    markelResult
  );
  // If creating the token on the cross-chain fails, return early.
  if (crossChainNftResult === "error") {
    return;
  }
};
```

#### Here's what the function does:

1. **Create New NFT Collection** : It calls `createNewNftCollectionOnMainChain` with the provided form values to create a new NFT collection on the main chain.

   - If the creation fails, the function returns early and does not proceed further.

2. **Validate Token Information** : It calls `validateTokenInfoExist` to validate that the created token information exists.

   - If the validation fails, the function returns early and does not proceed further.

3. **Fetch Parent Chain Height** : It calls `GetParentChainHeight` to get the height of the parent chain.

   - If fetching the parent chain height fails, the function returns early and does not proceed further.

4. **Fetch Merkle Path** : It calls getMarkelPath to fetch the Merkle path for the transaction.

   - If fetching the Merkle path fails, the function returns early and does not proceed further.

5. **Create Token on Cross-Chain** : It calls `createTokenOnCrossChain` with the parent chain height and Merkle path to create the token on the cross-chain.

   - If creating the token on the cross-chain fails, the function returns early.

### Run Application

In this step, we will run the NFT dApp application.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

- You should observe the following as shown below.

  ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the NFTs landing page as shown below.

:::tip
If you are developing and testing this with GitHub codespace, you can use Port Forward to test the web server that is running in codespace, here is the link on how to use Port forward for codespace https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace
:::

- Usually codespace will automatically forward port, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:

  ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the NFT dApp in the browser.
