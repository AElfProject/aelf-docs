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

## Step 3 - Interact with Your Deployed Smart Contract

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
      setMainChainSmartContract(mainChainContract as IContract);

      // Fetch the SideChain Testnet Contract
      const sideChainContract = await fetchContract(
        "tDVW",
        "ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx"
      );
      setSideChainSmartContract(sideChainContract as IContract);
    })();
  }, [provider]); // Dependency array ensures this runs when the provider changes
```

**Explanation:**

- **`useEffect`** **Hook** : This hook initializes and fetches the smart contracts when the provider changes.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Contracts** : It fetches and sets the smart contracts for the main chain, side chain, and cross chain.
    - **MainChain Contract** : Fetches the MainChain Testnet Contract and sets it in the state.
    - **SideChain Contract** : Fetches the SideChain Testnet Contract and sets it in the state.

By following these steps, you'll configure the Portkey provider to connect users' wallets to your app and interact with the NFT smart contract. This setup will enable our frontend components to perform actions like creating NFTs, validating NFTs, and transferring NFTs.

### Configure Connect Wallet Function

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
  const accounts = await (walletProvider
    ? walletProvider
    : provider
  )?.request({
    method: MethodsBase.REQUEST_ACCOUNTS,
  });
  const account = accounts?.AELF && accounts?.AELF[0];
  if (account) {
    setCurrentWalletAddress(account.replace(/^ELF_/, '').replace(/_AELF$/, ''));
    setIsConnected(true);
  }
  !walletProvider && toast.success("Successfully connected");
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

### Configure Create NFT Form Code

**Step 1: Locate the File**


1. go to the `src/pages/create-nft/index.tsx` file. This file is the **Create NFTs** page where users can enter details like the `tokenName`, `symbol`, `totalSupply` and `decimals`.

**Step 2: Write the Create New NFT Collection on MainChain Function**

1.  Find the comment `// Step D - Configure NFT Form`.

2.  Replace the form variable with this code snippet:

```javascript title="create-nft/index.tsx"
// Step D - Configure NFT Form
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    tokenName: "",
    symbol: "",
    totalSupply: "",
    decimals: "",
  },
});
```

#### Here's what the function does:

1. Initializes a new form variable with default values needed to create a nft.

2. Fields include: `tokenName` , `symbol` , `totalSupply` , and `decimals`.

Now your form is ready for users to fill in the necessary details for their NFTs function Interaction.

### Create NFT Collection

Let's write the Create New NFT Collection on MainChain and SideChain Functions

**Step 1: Locate the File**

- go to the `src/pages/create-nft/index.tsx` file.

**Step 2: Write the Create New NFT Collection on MainChain Function**

- The `create-nft/index.tsx` file is create page of our NFT dApp. It allows users to create a new NFTs.

- Find the comment `// step 1 - Create New NFT Collection on MainChain Function`.

- Replace the existing **`createNftCollectionOnMainChain`** function with this code snippet:

```javascript title="create-nft/index.tsx"
 // step - 1 Create New NFT Collection on MainChain Function
const createNftCollectionOnMainChain = async (values: {
  tokenName: string;
  symbol: string;
  totalSupply: string;
  decimals: string;
}) => {
  try {
    const createLoadingId = toast.loading("Creating NFT Collection..");

    // Create an object with the necessary information for the new NFT collection.
    const createNtfInput: INftInput = {
      tokenName: values.tokenName, // Name of the nft Collection
      symbol: values.symbol, // Symbol of the token (You have to get it from your PortKey wallet on NFT seed from NFT section)
      totalSupply: values.totalSupply, // Total supply of the token
      decimals: values.decimals, // Decimals of the token
      issuer: currentWalletAddress, // Address of the token issuer
      isBurnable: true, // Indicates if the token can be burned
      issueChainId: sidechain_from_chain_id, // ID of the issuing chain
      owner: currentWalletAddress, // Owner's wallet address
    };

    // Call the smart contract method to create the new NFT collection on the main chain.
    const result = await mainChainSmartContract?.callSendMethod(
      "Create",
      currentWalletAddress,
      createNtfInput
    );

    // Log the result of the creation for debugging purposes.
    console.log("========= result of createNewNft =========", result);

    toast.update(createLoadingId, {
      render: "NFT Collection Created Successfully On MainChain",
      type: "success",
      isLoading: false,
    });
    removeNotification(createLoadingId);

    // Return the input data for further use.
    return createNtfInput;
  } catch (error: any) {
    // If there's an error, log it and alert the user.
    console.error(error.message, "=====error");
    toast.error(error.message);
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

3. **Logs Information** : It logs the result for debugging purposes.

4. **Return Values of Object** : It returns necessary values as a object.

Next, we'll write the **Validate Collection Info Exist** function.

**Step 3: Write the Validates Collection Info Exist Function**

- Scroll up to find the comment `// step 2 - Validate Collection information existence`.

- Replace the existing **`validateNftCollectionInfo`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 2 - Validate Collection information existence
// This function validates if the token collection information already exists on the main blockchain.
const validateNftCollectionInfo = async (values: INftInput) => {
  try {

    // Start Loading before initiate the transaction
    const validateLoadingId = toast.loading(
      <CustomToast
        title="Transaction is getting validated on aelf blockchain. Please wait!"
        message="Validation means transaction runs through a consensus algorithm to be selected or rejected. Once the status changes process will complete. It usually takes some time in distributed systems."
      />
    );

    // Create an object with the necessary information for token validation.
    const validateInput = {
      symbol: values.symbol, // Symbol of the token
      tokenName: values.tokenName, // Name of the token
      totalSupply: values.totalSupply, // Total supply of the token
      decimals: values.decimals, // Decimals of the token
      issuer: currentWalletAddress, // Address of the token issuer
      isBurnable: true, // Indicates if the token can be burned
      issueChainId: sidechain_from_chain_id, // ID of the issuing chain
      owner: currentWalletAddress, // Owner's wallet address
    };

    // get mainnet contract
    const aelfTokenContract = await getTokenContract(aelf, wallet);

    // prepare Sign the transaction using contract method (ValidateTokenInfoExists Function)
    const signedTx = aelfTokenContract.ValidateTokenInfoExists.getSignedTx(validateInput);

    // send the transaction using signed Transaction
    const { TransactionId: VALIDATE_TXID } = await aelf.chain.sendTransaction(
      signedTx
    );

    // get Validate Result
    let VALIDATE_TXRESULT = await aelf.chain.getTxResult(VALIDATE_TXID);

    // we need to wait till our latest index Hight grater than or equal to our Transaction block number
    let heightDone = false;

    while (!heightDone) {
      // get latest index Hight
      const sideIndexMainHeight = await GetParentChainHeight();
      if (
        // check the latest index Hight is grater than or equal 
        sideIndexMainHeight >= VALIDATE_TXRESULT.Transaction.RefBlockNumber
      ) {
        VALIDATE_TXRESULT = await aelf.chain.getTxResult(VALIDATE_TXID);
        heightDone = true;
      }
    }

    console.log("VALIDATE_TXRESULT", VALIDATE_TXRESULT);
    
    // Update the Loading Message
    toast.update(validateLoadingId, {
      render: "Validating Token Successfully Executed",
      type: "success",
      isLoading: false,
    });

    // Remove the Loading Message
    removeNotification(validateLoadingId);

    // Return necessary details.
    return {
      transactionId: VALIDATE_TXID,
      signedTx: signedTx,
      BlockNumber: VALIDATE_TXRESULT.BlockNumber,
    };

  } catch (error: any) {
    // If there's an error, log it and alert the user.
    console.error(error.message, "=====error in validateTokenInfoExist");
    toast.error(`error in validateTokenInfoExist ${error.message}`);
    return "error";
  }
};
```

#### What This Function Does:

1. **Creates an Object with Validate Collection Details** : It prepares the data needed to validate the token information.

2. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to check if the token information already exists using the prepared data.

3. **Return Values of Object** : It returns necessary values as a object

Next, we'll write the **Get the parent chain height** function.

**Step 4: Write the Get the parent chain height Function**

- Scroll up to find the comment `// Step 3: Get the parent chain height`.

- Replace the existing **`GetParentChainHeight`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// Step 3: Get the parent chain height
// This function fetches the current height of the parent blockchain.
const GetParentChainHeight = async () => {
  try {
    // Call the smart contract method to get the parent chain height.
    const result = await sideChainSmartContract?.callViewMethod("GetParentChainHeight","");  
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

1. **Calls Smart Contract Method** : It interacts with the side chain smart contract to fetch the current height of the parent blockchain.

2. **Returns Parent Chain Height** : It returns the parent chain height if it exists.

Next, we'll write the **Fetch the Merkle path** function.

**Step 5: Write the Fetch the Merkle path Function**

- Scroll up to find the comment `// step 4 - Fetch the Merkle path by Transaction Id`.

- Replace the existing **`getMerklePathByTxId`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 4 - Fetch the Merkle path by Transaction Id
const getMerklePathByTxId = async (aelf: any, txId: string) => {
  try {
    const { MerklePathNodes } = await aelf.chain.getMerklePathByTxId(txId);

    const formattedMerklePathNodes = MerklePathNodes.map(
      ({ Hash, IsLeftChildNode }: { Hash: string; IsLeftChildNode: boolean }) => ({
        hash: Hash,
        isLeftChildNode: IsLeftChildNode,
      })
    );

    return { merklePathNodes: formattedMerklePathNodes };
  } catch (error) {
    console.error('Error fetching Merkle path:', error);
    throw new Error('Failed to get Merkle path by transaction ID.');
  }
};
```

#### What This Function Does:

1. **Fetches Merkle Path** : It sends a request to fetch the Merkle path using the transaction ID.

2. **Parses Response** : It parses the response from the server as JSON.

3. **Returns Merkle Path Nodes** : It extracts and returns the Merkle path nodes from the JSON response.

4. **Handles Errors** : If an error occurs, it clears the transaction status and logs the error.

Next, we'll write the **Create a Collection on the cross-chain** function.

**Step 6: Write a Function for Create Collection on the Side Chain**

- Scroll up to find the comment `// step 5 - Create a Collection on SideChain`.

- Replace the existing **`createCollectionOnSideChain`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 5 - Create a Collection on SideChain
const createCollectionOnSideChain = async (
  transactionId: string,
  signedTx: string,
  BlockNumber: number
) => {
  try {
    const crossChainLoadingId = toast.loading(
      "Creating Collection on SideChain..."
    );

      const merklePath = await getMerklePathByTxId(aelf, transactionId);

      const tdvwTokenContract = await getTokenContract(tdvw, wallet);

      const CROSS_CHAIN_CREATE_TOKEN_PARAMS = {
        fromChainId: mainchain_from_chain_id,
        parentChainHeight: "" + BlockNumber,
        // @ts-ignore
        transactionBytes: Buffer.from(signedTx, "hex").toString("base64"),
        merklePath,
      };
      const signedTx2 =
        await tdvwTokenContract.CrossChainCreateToken.getSignedTx(
          CROSS_CHAIN_CREATE_TOKEN_PARAMS
        );

      let done = false;

      while (!done) {
        try {
          await delay(10000);
          const { TransactionId } = await tdvw.chain.sendTransaction(signedTx2);
          const txResult = await tdvw.chain.getTxResult(TransactionId);

          if (txResult.Status === "SUCCESS" || txResult.Status === "MINED") {
            done = true;
            setIsNftCollectionCreated(true);
            toast.update(crossChainLoadingId, {
              render: "Collection was Created Successfully On SideChain",
              type: "success",
              isLoading: false,
            });
            removeNotification(crossChainLoadingId);
            toast.info("You Can Create NFT now");
            setTransactionStatus(false);
          }
        } catch (err: any) {
          console.log(err);
          if (err.Error.includes("Cross chain verification failed.")) {
            console.log("Exit.");
            done = true;
          }
        }
      }
      return "success";
    } catch (error) {
      console.log("error====", error);
      return "error";
    }
  };
```

#### What This Function Does:

```
---
```

### Create NFT Token

**Step 1: Write a Function for Create NFT on MainChain**

Now, let's write the Create NFT on MainChain function for the form submission.

1. Scroll down to find the comment `// step 6 - Create a NFT on MainChain`.

2. Replace the existing **`createNFTOnMainChain`** function with this code snippet:

```javascript title="src/CreateProposal.tsx"
// step 6 - Create a NFT on MainChain
const createNFTOnMainChain = async (values: {
  tokenName: string;
  symbol: string;
  totalSupply: string;
}) => {
  let createMainChainNFTLoadingId;

  try {
    createMainChainNFTLoadingId = toast.loading(
      "Creating NFT on MainChain..."
    );

    // Preparing Parameter for Create Function
    const createNtfMainChainInput = {
      tokenName: values.tokenName,
      symbol: values.symbol,
      totalSupply: values.totalSupply,
      issuer: currentWalletAddress,
      isBurnable: true,
      issueChainId: sidechain_from_chain_id,
      owner: currentWalletAddress,
      externalInfo: {},
    };

    const resultMainchain = await mainChainSmartContract?.callSendMethod(
      "Create",
      currentWalletAddress,
      createNtfMainChainInput
    );

    console.log(
      "========= result of createNewNft =========",
      resultMainchain
    );

    toast.update(createMainChainNFTLoadingId, {
      render: "NFT Created Successfully on MainChain",
      type: "success",
      isLoading: false,
    });
    removeNotification(createMainChainNFTLoadingId);

    return "success";
  } catch (error: any) {
    if (!createMainChainNFTLoadingId) {
      return "error";
    }
    toast.update(createMainChainNFTLoadingId, {
      render: error.message,
      type: "error",
      isLoading: false,
    });
    removeNotification(createMainChainNFTLoadingId, 5000);
    return "error";
  }
};
```

#### Here's what the function does:

```
---
```

**Step 2: Write the Function for Validate NFT Info Exist**

Now, let's write the Validate NFT Info Exist function.

1. Scroll down to find the comment `// step 7 - Validate a NFT Token on MainChain`.

2. Replace the existing **`validateNftToken`** function with this code snippet:

```javascript title="src/CreateProposal.tsx"
// step 7 - Validate a NFT Token on MainChain
const validateNftToken = async (values: INftParams) => {
  try {

    // Start Loading before initiate the transaction
    const validateNFTLoadingId = toast.loading(
      <CustomToast
        title="Transaction is getting validated on aelf blockchain. Please wait!"
        message="Validation means transaction runs through a consensus algorithm to be selected or rejected. Once the status changes process will complete. It usually takes some time in distributed systems."
      />
    );

  // Create an object with the necessary information for token validation.
  const validateInput = {
    symbol: values.symbol,
    tokenName: values.tokenName,
    totalSupply: values.totalSupply,
    issuer: currentWalletAddress,
    isBurnable: true,
    issueChainId: sidechain_from_chain_id,
    owner: currentWalletAddress,
    externalInfo: {},
  };

  // get mainnet contract
  const aelfTokenContract = await getTokenContract(aelf, wallet);

  // prepare Sign the transaction using contract method (ValidateTokenInfoExists Function)
  const signedTx = aelfTokenContract.ValidateTokenInfoExists.getSignedTx(validateInput);

  // send the transaction using signed Transaction
  const { TransactionId: VALIDATE_TXID } = await aelf.chain.sendTransaction(signedTx);

  await delay(3000);

  // get Validate Result
  let VALIDATE_TXRESULT = await aelf.chain.getTxResult(VALIDATE_TXID);

  await delay(3000);

  // if SideChain index has a MainChain height greater than validateTokenInfoExist's
  let heightDone = false;

  while (!heightDone) {
    // get latest index Hight
    const sideIndexMainHeight = await GetParentChainHeight();
    if (
      // check the latest index Hight is grater than or equal 
      sideIndexMainHeight >= VALIDATE_TXRESULT.Transaction.RefBlockNumber
    ) {
      VALIDATE_TXRESULT = await aelf.chain.getTxResult(VALIDATE_TXID);
      heightDone = true;
    }
  }

  console.log(VALIDATE_TXRESULT, "VALIDATE_TXRESULT=====2");

  const merklePath = await getMerklePathByTxId(aelf, VALIDATE_TXID);

  toast.update(validateNFTLoadingId, {
    render: "Validating NFT Successfully Executed",
    type: "success",
    isLoading: false,
  });
  removeNotification(validateNFTLoadingId);

  // return necessary values
  return {
    parentChainHeight: VALIDATE_TXRESULT.BlockNumber,
    signedTx: signedTx,
    merklePath: merklePath,
  };
  } catch (error) {
    console.log("error======", error);
    return "error";
  }
};
```

#### Here's what the function does:

```
---
```

**Step 3: Write a Function for Create NFT on SideChain**

Now, let's write the Create NFT on SideChain function.

1. Scroll down to find the comment `// step 8 - Create a NFT on SideChain`.

2. Replace the existing **`createNftTokenOnSideChain`** function with this code snippet:

```javascript title="src/CreateProposal.tsx"
// step 8 - Create a NFT on SideChain.
const createNftTokenOnSideChain = async (values: INftValidateResult) => {
  try {
    const createSideChainNFTLoadingId = toast.loading(
      "Creating NFT on SideChain..."
    );

    const CROSS_CHAIN_CREATE_TOKEN_PARAMS = {
      fromChainId: mainchain_from_chain_id,
      parentChainHeight: values.parentChainHeight,
      transactionBytes: Buffer.from(values.signedTx, "hex").toString(
        "base64"
      ),
      merklePath: values.merklePath,
    };

    await sideChainSmartContract?.callSendMethod(
      "CrossChainCreateToken",
      currentWalletAddress,
      CROSS_CHAIN_CREATE_TOKEN_PARAMS
    );

    toast.update(createSideChainNFTLoadingId, {
      render: "NFT Created Successfully On SideChain",
      type: "success",
      isLoading: false,
    });
    removeNotification(createSideChainNFTLoadingId);
    return "success";
  } catch (error) {
    console.log("error====", error);
    return "error";
  }
};
```

#### Here's what the function does:

```
---
```

**Step 4: Write a Function for Issue NFT Token which has been Created on SideChain.**

Now, let's write the Issue NFT Function.

1. Scroll down to find the comment `// step 9 - Issue a NFT Function which has been Created on SideChain`.

2. Replace the existing **`issueNftOnSideChain`** function with this code snippet:

```javascript title="src/CreateProposal.tsx"
// step 9 - Issue a NFT Function which has been Created on SideChain
const issueNftOnSideChain = async (values: {
  symbol: string;
  amount: string;
  memo: string;
}) => {
  try {
    const createSideChainNFTLoadingId = toast.loading(
      "Issuing NFT on SideChain..."
    );
    const issueNftInput = {
      symbol: values.symbol,
      amount: values.amount,
      memo: values.memo,
      to: currentWalletAddress,
    };
    const result = await sideChainSmartContract?.callSendMethod(
      "Issue",
      currentWalletAddress,
      issueNftInput
    );
    console.log("========= result of createNewNft =========", result);

    toast.update(createSideChainNFTLoadingId, {
      render: "NFT Issue Successfully Executed",
      type: "success",
      isLoading: false,
    });
    removeNotification(createSideChainNFTLoadingId);
    toast.success("You will get NFT on your Wallet! It can take sometimes to get into your wallet");
    handleReturnClick();
    return "success";
  } catch (error: any) {
    console.error(error.message, "=====error");
    toast.error(error.message);
    setTransactionStatus(false);
    return "error";
  }
};
```

#### Here's what the function does:

```
---
```

**Step 4: Create a Function to Call Necessary Functions for NFT Creation**

Now, let's write the createNftToken Function.

1. Scroll down to find the comment `// step 10 - Call Necessary Function for Create NFT`.

2. Replace the existing **`createNftToken`** function with this code snippet:

```javascript title="src/CreateProposal.tsx"
// step 10 - Call Necessary Function for Create NFT
const createNftToken = async (values: INftParams) => {
  try {
    const mainChainResult = await createNFTOnMainChain(values);

    if (mainChainResult === "error") {
      setTransactionStatus(false);
      return;
    }
    await delay(3000);

    const validateNFTData: INftValidateResult | "error" = await validateNftToken(values);

    if (validateNFTData === "error") {
      setTransactionStatus(false);
      return;
    }

    const sideChainResult = await createNftTokenOnSideChain(validateNFTData);

    if (sideChainResult === "error") {
      setTransactionStatus(false);
      return;
    }

    await issueNftOnSideChain({
      symbol: values.symbol,
      amount: values.totalSupply,
      memo: "We are issuing nftToken",
    });
    setTransactionStatus(false);
  } catch (error: any) {
    console.error(error, "=====error");
    setTransactionStatus(false);
    toast.error(error);
    return "error";
  }
};
```

#### Here's what the function does:

```
---
```

### Configure Submit Form

Now, let's Write a Function to Call Necessary Functions for NFT Creation.

1. Scroll down to find the comment `// Step 11 - Handle Submit Form`.

2. Replace the existing **`onSubmit`** function with this code snippet:

```javascript title="src/CreateProposal.tsx"
//Step 11 - Handle Submit Form
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  setTransactionStatus(true);

  if (isNftCollectionCreated) { // Already Collection Created
    // create NFT Token
    await createNftToken(values);
      
  } else {
      
    // create NFT Collection on MainChain
    const createResult = await createNftCollectionOnMainChain(values);

    if (createResult === "error") {
      setTransactionStatus(false);
      return;
    }
    // Validate NFT Collection
    const validateCollectionResult = await validateNftCollectionInfo(
      createResult
    );

    if (validateCollectionResult === "error") {
      setTransactionStatus(false);
      return;
    }

    // create NFT Collection on SideChain
    await createCollectionOnSideChain(
      validateCollectionResult.transactionId,
      validateCollectionResult.signedTx,
      validateCollectionResult.BlockNumber
    );
  }
};
```

#### Here's what the function does:

```
---
```


Now that we've written all the necessary frontend functions and components, we're ready to run the NFT dApp application in the next step.


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

## Step 4 - Interact with Deployed Multi-Token Smart Contract

For this NFT contract, you don't need to write a separate contract. Instead, you'll use an already deployed Multi-Token Contract with the following functions.

### 4.1 Creating an NFT Collection on MainChain

Open your terminal and run:

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Create
```

- Replace the placeholder values with your actual details.

:::tip
ℹ️ Note: `JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE` is the contract address of the Multi-Token Contract on **aelf Testnet Mainchain**.
:::

### 4.2 Validate TokenInfoExist on MainChain

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io ValidateTokenInfoExists
```

:::tip
ℹ️ Note: `transactionId` Note down the trasnactionId from the above transaction will be used in **step 3**.
:::

### 4.3 Create NFT Collection on SideChain

```bash
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io CrossChainCreateToken
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

### 4.4 Create NFT Token on MainChain

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Create
```

### 4.5 Validate Nft Token on MainChain

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io ValidateTokenInfoExists
```

### 4.6 Create NFT Token on SideChain

```bash
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io CrossChainCreateToken
```

```bash
transactionBytes = Buffer.from(signedTx, "hex").toString("base64")
```

### 4.7 Issue NFT Token on SideChain

```bash
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Issue
```

### 4.8 Transfer NFT

```bash
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Transfer
```
