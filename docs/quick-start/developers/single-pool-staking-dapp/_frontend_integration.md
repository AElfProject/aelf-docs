### Configure Portkey Provider & Write Contract Hooks Function

We'll set up our Portkey provider to allow users to connect their Portkey wallets to the dApp and interact with the aelf smart contracts. We'll be interacting with the Stakinng contract and the Multi-token contract.

#### Write Functions for MainChain and dAppChain Contracts

**Step 1. Locate the File:**

- Go to the `src/hooks/useSmartContract.ts` file.

**Step 2. Fetch the Smart Contract:**

- Find the comment `//Step A - Function to fetch a smart contract based on the chain symbol and the contract address`

- Replace the existing **`fetchContract`** function with the below code:

```javascript title="useSmartContract.ts"
//Step A - Function to fetch a smart contract based on the chain symbol and the contract address
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

- **`fetchContract`** **Function**: This function fetches a smart contract based on the given chain symbol (e.g., "AELF" or "tDVW") and the contract address.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Chain** : This function fetches chain information using the provider.
  - **Get Contract** : It retrieves the smart contract instance from the chain.

**Step 3. Initialize and Fetch the Smart Contracts:**

- Find the comment `// Step B - Effect hook to initialize and fetch the smart contracts when the provider changes.`

- Replace the existing **`useEffect`** hook with this updated code:

```javascript title="useStakingContract.ts"
// Step B -  Effect hook to initialize and fetch the smart contracts when the provider changes
  useEffect(() => {
    (async () => {
      // Fetch the MainChain Testnet Contract
      const mainChainContract = await fetchContract(
        "AELF",
        "JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE"
      );
      setMainChainSmartContract(mainChainContract as IContract);

      // Fetch the dAppChain Testnet Contract
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
  - **Fetch Contracts** : It fetches and sets the smart contracts for the main chain, side chain.
  - **MainChain Contract** : Fetches the mainchain testnet contract and sets it in the state.
  - **dAppChain Contract** : Fetches the dAppChain testnet contract and sets it in the state.

#### Write Functions for Staking Contract
  
**Step 4. Locate the File:**

- Go to the `src/hooks/useStakingContract.ts` file.

**Step 5. Fetch the Smart Contract:**

- Find the comment `//Step C - Function to fetch a smart contract based on the chain symbol and the contract address`

- Replace the existing **`fetchContract`** function with this updated code:

```javascript title="useStakingContract.ts"
//Step C - Function to fetch a smart contract based on the chain symbol and the contract address
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

- **`fetchContract`** **Function**: This function fetches a smart contract based on the given chain symbol (e.g., "AELF" or "tDVW") and the contract address.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Chain** : The function fetches chain information using the provider.
  - **Get Contract** : It retrieves the smart contract instance from the chain.

**Step 6. Initialize and Fetch the Smart Contracts:**

- Find the comment `// Step D -  Effect hook to initialize and fetch the smart contracts when the provider changes`

- Replace the existing **`useEffect`** hook with this updated code:

```javascript title="useStakingContract.ts"
// Step D -  Effect hook to initialize and fetch the smart contracts when the provider changes
useEffect(() => {
  (async () => {
    // Fetch the Staking Testnet Contract
    const stakingContract = await fetchContract(
      "tDVW",
      stakingContractAddress
    );
    setStakingSmartContract(stakingContract as IContract);
  })();
}, [provider]); // Dependency array ensures this runs when the provider changes
```

**Explanation:**

- **`useEffect`** **Hook** : This hook initializes and fetches the staking smart contract when the provider changes.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Contracts** : It fetches and sets the smart contract for the staking.

By following these steps, we'll configure the Portkey provider to connect users' wallets to the dApp and interact with the multi-token and staking smart contract including interaction with the fungible token and the staking functionalities. This setup will enable our frontend components to perform actions like `create tokens`, `transfer tokens`, and `stake tokens`, `withdraw tokens`, `emergency withdraw tokens`, etc.

### Configure Connect Wallet Function

**Step 1: Locate the File**

- Go to the `src/components/layout/header/index.tsx` file.

**Step 2: Write the Connect Wallet Function**

- The `header/index.tsx` file is the header of our Staking dApp. It allows users to connect their Portkey wallet with the staking dApp.

- Before users can interact with the smart contract, we need to write the `Connect Wallet` function.

- Find the comment `// Step E - Connect Portkey Wallet`.

- Replace the existing connect function with this code snippet:

```javascript title="header/index.tsx"
// Step E - Connect Portkey Wallet
const connect = async (walletProvider?: IPortkeyProvider) => {
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

- **`connect`** **Function** : This function connects the user's Portkey wallet with the dApp.

  - **Fetch Accounts** : It fetches the wallet accounts using the provider.
  - **Log Accounts** : Logs the accounts to the console for debugging.
  - **Set Wallet Address** : Sets the current wallet address state variable with the fetched account.
  - **Update Connection Status** : Updates the state to indicate that the wallet is connected.  

In this code, we fetch the Portkey wallet account using the provider and update the wallet address state variable. An alert notifies the user that their wallet is successfully connected.

With the `ConnectWallet` function defined, we're ready to write the remaining functions in the next steps.

### Configure Create TOKEN Form

**Step 1: Locate the File**

1. Go to the `src/components/create-token-modal/index.tsx` file. This file is the **Create Fungible TOKEN** popup modal where users can create a new TOKEN by submitting the details like `tokenName`, `symbol` and `totalSupply`.

**Step 2: Prepare Form to Create TOKEN**

1.  Find the comment `// Step F - Configure TOKEN Create Form`.

2.  Replace the form variable with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step F - Configure TOKEN Create Form
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    tokenName: "$TOKEN",
    symbol: "",
    totalSupply: "",
  },
});
```

#### Here's what the function does:

1. Initializes a new form variable with default values needed to create a token.

2. Fields include: `tokenName` , `symbol` and `totalSupply`.

Now the form is ready for users to fill in the necessary details for their token related function interaction.

### Get CrossChain Contract

Let's write the helper function to `Get CrossChain Contract` to fetch the parent chain height later.

**Write the function to Get CrossChain Contract**

- The `create-token-modal/index.tsx` file includes the code to create a fungible token.

- Find the comment `// Step G - Get CrossChain Contract`.

- Replace the existing **`getCrossChainContract`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step G - Get CrossChain Contract
const getCrossChainContract = async (aelf: AElf, wallet: IWalletInfo) => {
  const crossChainContractName = "AElf.ContractNames.CrossChain";

  // get chain status
  const chainStatus = await aelf.chain.getChainStatus();
  // get genesis contract address
  const GenesisContractAddress = chainStatus.GenesisContractAddress;
  // get genesis contract instance
  const zeroContract = await aelf.chain.contractAt(
    GenesisContractAddress,
    wallet
  );
  // Get contract address by the read only method `GetContractAddressByName` of genesis contract
  const crossChainContractAddress = await zeroContract.GetContractAddressByName.call(AElf.utils.sha256(crossChainContractName));

  return await aelf.chain.contractAt(crossChainContractAddress, wallet);
};
```

#### What This Function Does:

1. **Get chainStatus** : It gets chainStatus from getChainStatus function which is there in aelf.

2. **Get GenesisContractAddress** : It gets GenesisContractAddress from chainStatus.

3. **fetch zeroContract** : It fetches zeroContract using GenesisContractAddress and wallet.

4. **fetch crossChainContractAddress** : It fetch crossChainContractAddress by calling GetContractAddressByName method from zeroContract.

Next, we'll write the **Get the parent chain height** function.

### Get the parent chain height

**Write the function to get the parent chain height**

- Scroll down to find the comment `// Step H - Get the parent chain height`.

- Replace the existing **`GetParentChainHeight`** function with the following code snippet:

```javascript title="create-token-modal/index.tsx"
// Step H - Get the parent chain height
// This function fetches the current height of the parent blockchain.
const GetParentChainHeight = async () => {
  try {
    const tdvwCrossChainContract = await getCrossChainContract(tdvw, wallet);
    // Call the smart contract method to get the parent chain height.
    const result = await tdvwCrossChainContract.GetParentChainHeight.call();
    // Return the parent chain height if it exists, otherwise return an empty string.
    return result ? (result.value as string) : "";
  } catch (error) {
    // If there's an error, log it and return an error status.
    console.error(error, "=====error in GetParentChainHeight");
    return "error";
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the side chain smart contract method to fetch the current height of the parent blockchain.

2. **Returns Parent Chain's Height** : It returns the parent chain's height if it exists.

Next, we'll write the **Fetch the Merkle path** function.

### Fetch the Merkle path

**Write the fetch the merkle path function**

- Scroll down to find the comment `// Step I - Fetch the merkle path by transaction Id`.

- Replace the existing **`getMerklePathByTxId`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step I - Fetch the merkle path by transaction Id
const getMerklePathByTxId = async (aelf: AElf, txId: string) => {
  try {
    const { MerklePathNodes } = await aelf.chain.getMerklePathByTxId(txId);

    const formattedMerklePathNodes = MerklePathNodes.map(
      ({
        Hash,
        IsLeftChildNode,
      }: {
        Hash: string;
        IsLeftChildNode: boolean;
      }) => ({
        hash: Hash,
        isLeftChildNode: IsLeftChildNode,
      })
    )
    return { merklePathNodes: formattedMerklePathNodes };
  } catch (error) {
    console.error("Error fetching Merkle path:", error);
    throw new Error("Failed to get Merkle path by transaction ID.");
  }
};
```

#### What This Function Does:

1. **Fetches Merkle Path** : It sends a request to fetch the merkle path using the transaction ID.

2. **Parses Response** : It parses the response from the server as JSON.

3. **Returns Merkle Path Nodes** : It extracts and returns the merkle path of the nodes from the JSON response.


### Get Token Contract

**Write the Get Token Contract function**

- Scroll down to find the comment `// Step J - Get Token Contract`.

- Replace the existing **`getTokenContract`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step J - Get Token Contract
const getTokenContract = async (aelf: AElf, wallet: IWalletInfo) => {
  const tokenContractName = "AElf.ContractNames.Token";
  // get chain status
  const chainStatus = await aelf.chain.getChainStatus();
  // get genesis contract address
  const GenesisContractAddress = chainStatus.GenesisContractAddress;
  // get genesis contract instance
  const zeroContract = await aelf.chain.contractAt(
    GenesisContractAddress,
    wallet
  );
  // Get contract address by the read only method `GetContractAddressByName` of genesis contract
  const tokenContractAddress =
    await zeroContract.GetContractAddressByName.call(
      AElf.utils.sha256(tokenContractName)
    );
 
  return await aelf.chain.contractAt(tokenContractAddress, wallet);
};
```

#### What This Function Does:

1. **Get chainStatus** : It gets chainStatus from getChainStatus function.

2. **Get GenesisContractAddress** : It gets GenesisContractAddress from chainStatus.

3. **fetch zeroContract** : It fetches zeroContract using GenesisContractAddress and wallet.

4. **fetch tokenContractAddress** : It fetches tokenContractAddress by calling GetContractAddressByName method from zeroContract.

### Create Fungible Token on the MainChain

**Write a function to Create a new Fungible Token on the MainChain**

- Scroll down to find the comment `// Step K - Create Token on MainChain`.

- Replace the existing **`createTokenOnMainChain`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step K - Create Token on MainChain
const createTokenOnMainChain = async (values: {
  tokenName: string;
  symbol: string;
  totalSupply: string;
}) => {
  setFormLoading(true);
  let createMainChainTokenLoadingId;

  try {
    createMainChainTokenLoadingId = toast.loading(
      "Creating $TOKEN on MainChain..."
    );

    // Preparing Parameter for Create Function
    const createTokenMainChainInput = {
      tokenName: values.tokenName,
      symbol: values.symbol,
      totalSupply: Number(values.totalSupply) + Number(extraRewardAmount),
      issuer: currentWalletAddress,
      isBurnable: true,
      issueChainId: sidechain_from_chain_id,
      owner: currentWalletAddress,
      externalInfo: {},
    };
    const resultMainchain = await mainChainSmartContract?.callSendMethod(
      "Create",
      currentWalletAddress as string,
      createTokenMainChainInput
    );

    console.log(
      "========= result of create New $TOKEN =========",
      resultMainchain
    );

    toast.update(createMainChainTokenLoadingId, {
      render: "$TOKEN Created Successfully on MainChain",
      type: "success",
      isLoading: false,
    });

    return "success";
  } catch (error) {
    if (!createMainChainTokenLoadingId) {
      return "error";
    }
    handleCloseModal();
    if (error instanceof Error) {
      toast.update(createMainChainTokenLoadingId, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
    return "error";
  } finally {
    removeNotification(createMainChainTokenLoadingId as Id, 5000);
  }
};
```

:::tip
ℹ️ Note: You need to get **symbol** from the Portkey wallet.
:::

- **Follow Steps to get TOKEN symbol from Portkey Wallet:**

  - Open Portkey Wallet.
  - Go to the NFTs tab.
  - You will find the SEED that you already got from the above **seed generation** step.
  - Click on the SEED to see details.
  - You will find the **Token Symbol** inside the **Token Creation via This Seed** section.
  - Copy and use that value of the token symbol.

#### What this function does:

1. **Prepares Parameters :** Constructs input parameters for creating the token, including token details and the issuer's information.

2. **Calls Smart Contract :** Sends a request to the mainchain smart contract to create the token using the prepared parameters.

3. **Return Status :** Returns `"success"` if the token is created successfully; otherwise, returns `"error"`.


**Write the Function to Validate Token Info**

Now, let's write the Validate TOKEN Info function.

- Scroll down to find the comment `// Step L - Validate Mainchain Token Create's Transaction`.

- Replace the existing **`validateToken`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step L - Validate Mainchain Token Create's Transaction
const validateToken = async (values: ITokenParams) => {
  let validateTOKENLoadingId;
  try {
    setFormLoading(true);

    // Start Loading before initiate the transaction
    validateTOKENLoadingId = toast.loading(
      <CustomToast
        title="Transaction is getting validated on aelf blockchain. Please wait!"
        message="Validation means transaction runs through a consensus algorithm to be selected or rejected. Once the status changes process will complete. It usually takes some time in distributed systems."
      />
    );

    // Create an object with the necessary information for token validation.
    const validateInput = {
      symbol: values.symbol,
      tokenName: values.tokenName,
      totalSupply: Number(values.totalSupply) + Number(extraRewardAmount),
      issuer: currentWalletAddress,
      isBurnable: true,
      issueChainId: sidechain_from_chain_id,
      owner: currentWalletAddress,
      externalInfo: {},
    };

    // get mainnet contract
    const aelfTokenContract = await getTokenContract(aelf, wallet);
    // prepare Sign the transaction using contract method (ValidateTokenInfoExists Function)
    const signedTx =
      aelfTokenContract.ValidateTokenInfoExists.getSignedTx(validateInput);
    // send the transaction using signed Transaction
    const { TransactionId: VALIDATE_TXID } = await aelf.chain.sendTransaction(
      signedTx
    );

    await delay(3000);
    // get Validate Result
    let VALIDATE_TXRESULT = await aelf.chain.getTxResult(VALIDATE_TXID);

    await delay(3000);

    // if dAppChain index has a MainChain height greater than validateTokenInfoExist's
    let heightDone = false;

    while (!heightDone) {
      // get latest index Hight
      const sideIndexMainHeight = await GetParentChainHeight();
      if (
        // check the latest index Hight is grater than or equal
        Number(sideIndexMainHeight) >=
        Number(VALIDATE_TXRESULT.Transaction.RefBlockNumber)
      ) {
        VALIDATE_TXRESULT = await aelf.chain.getTxResult(VALIDATE_TXID);
        heightDone = true;
      }
    }
    console.log(VALIDATE_TXRESULT, "VALIDATE_TXRESULT=====2");

    const merklePath = await getMerklePathByTxId(aelf, VALIDATE_TXID);

    toast.update(validateTOKENLoadingId, {
      render: "Validating $TOKEN Successfully Executed",
      type: "success",
      isLoading: false,
    });
    // return necessary values
    return {
      parentChainHeight: VALIDATE_TXRESULT.BlockNumber,
      signedTx: signedTx,
      merklePath: merklePath,
    };
  } catch (error) {
    if (error instanceof Error) {
      toast.update(validateTOKENLoadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
    handleCloseModal();
    return "error";
  } finally {
    removeNotification(validateTOKENLoadingId as Id);
  }
};
```

#### Here's what the function does:

1. **Prepares Validation Input:** Constructs the input parameters needed for validating the token.

2. **Gets Token Contract:** Retrieves the token contract instance from the MainChain.

3. **Signs and Sends Transaction:** Signs the transaction to validate the token info and sends it to the blockchain.

4. **Polls for Transaction Result:** Waits for the transaction result and ensures that the transaction has reached the required block height.

5. **Fetches Merkle Path:** Retrieves the Merkle path for the validated transaction.

### Create Fungible Token on dAppChain

**Write a Function to Create Token on the dAppChain**

- Scroll down to find the comment `// Step M - Create a Token on the dAppChain.`.

- Replace the existing **`createTokenOnSideChain`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step M - Create a Token on the dAppChain.
const createTokenOnSideChain = async (values: ITokenValidateResult) => {
  let createSideChainTokenLoadingId;
  try {
    createSideChainTokenLoadingId = toast.loading(
      "Creating $TOKEN on SideChain..."
    );

    // Prepare create Token Parameters
    const CREATE_TOKEN_PARAMS = {
      fromChainId: mainchain_from_chain_id,
      parentChainHeight: values.parentChainHeight,
      transactionBytes: Buffer.from(values.signedTx, "hex").toString(
        "base64"
      ),
      merklePath: values.merklePath,
    };

    // Calling CrossChainCreateToken function on dAppChain
    await sideChainSmartContract?.callSendMethod(
      "CrossChainCreateToken",
      currentWalletAddress as string,
      CREATE_TOKEN_PARAMS
    );

    toast.update(createSideChainTokenLoadingId, {
      render: "$TOKEN Created Successfully On SideChain",
      type: "success",
      isLoading: false,
    });
    return "success";
  } catch (error) {
    toast.update(createSideChainTokenLoadingId as Id, {
      render: "$TOKEN Created Successfully On SideChain",
      type: "success",
      isLoading: false,
    });
    console.log("error====", error);
    return "error";
  } finally {
    removeNotification(createSideChainTokenLoadingId as Id);
  }
};
```

#### Here's what the function does:

1. **Prepares Parameters:** Constructs the parameters needed for creating the token on the dAppChain, including chain IDs & block height, transaction data, and Merkle path.

2. **Calls Smart Contract Method:** Sends the transaction to the dAppChain smart contract to create the token.


### Issue the created token on the dAppChain

**Write a Function to Issue Token which has been Created on the dAppChain.**

- Scroll down to find the comment `// Step N - Issue Token on dAppChain`.

- Replace the existing **`issueTokenOnSideChain`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step N - Issue Token on dAppChain
const issueTokenOnSideChain = async (values: {
  symbol: string;
  amount: string | number;
  memo: string;
}): Promise<"error" | IssueResult> => {
  let issueTokenLoadingId;

  try {
    setFormLoading(true);
    issueTokenLoadingId = toast.loading("Issuing $TOKEN on SideChain...");

    // prepate parameters
    const issueTokenInput = {
      symbol: values.symbol,
      amount: values.amount,
      memo: values.memo,
      to: currentWalletAddress,
    };

    // call Issue function on dAppChain smart contract
    const result = await sideChainSmartContract?.callSendMethod(
      "Issue",
      currentWalletAddress as string,
      issueTokenInput
    );

    console.log(
      "========= result of issue Token Transaction =========",
      result
    );

    toast.update(issueTokenLoadingId, {
      render: "$TOKEN Issue Successfully Executed",
      type: "success",
      isLoading: false,
    });
    toast.success(
      "You will get $TOKEN on your Wallet! It can take sometimes to get into your wallet"
    );
    if(result){
      return result as IssueResult;
    } else {
      return "error";
    }
  } catch (error) {
    handleCloseModal();
    if (error instanceof Error) {
      toast.update(issueTokenLoadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
    return "error";
  } finally {
    removeNotification(issueTokenLoadingId as Id);
  }
};
```

#### Here's what the function does:

1. **Prepares Issuance Input:** Constructs the input parameters for issuing the token including symbol, amount, memo, and recipient address.

2. **Calls Smart Contract Method:** Sends the transaction to the dAppChain smart contract to issue the token.

3. **Handles Success:** Updates the notification to show successful issuance and notifies the user that the token will appear in their wallet.


### Transfer Token to Staking Contract

**Create a Function to Transfer Token to the Staking Contract for Reward Balance**

- Scroll down to find the comment `// Step O - Transfer TOKEN to Staking Contract`.

- Replace the existing **`transferTokenToStakingContract`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step O - Transfer TOKEN to Staking Contract
const transferTokenToStakingContract = async (
  amount: string,
  symbol: string
) => {
  let transferTokenLoadingId = toast.loading(
    "Transferring $TOKEN to Staking Contract for Reward Balance"
  );

  // prepare parameters
  try {
    const transferNtfInput = {
      to: stakingContractAddress,
      symbol: symbol,
      amount: amount,
      memo: "Transfering Amount to Staking Contract for Reward Balance",
    };

    // call Transfer function on dAppChain contract
    await sideChainSmartContract?.callSendMethod(
      "Transfer",
      currentWalletAddress as string,
      transferNtfInput
    );

    toast.update(transferTokenLoadingId, {
      render: "$TOKEN Transfer Successfully!",
      type: "success",
      isLoading: false,
    });
    return "success";
  } catch (error) {
    if (error instanceof Error) {
      toast.update(transferTokenLoadingId, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
    return "error";
  } finally {
    removeNotification(transferTokenLoadingId as Id);
  }
};
```

#### Here's what the function does:

1. **Prepares Transfer Input:** Constructs the input parameters to transfer the token including to address, symbol, amount & memo.

2. **Calls Smart Contract Method:** Sends the transaction to the dAppChain smart contract to transfer the token.


### Initialize the staking contract

**Create a Function to Initialize the Staking Contract using Token Address**

- Scroll down to find the comment `// Step P - Initializing the staking contract`.

- Replace the existing **`initializedContract`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step P - Initializing the staking contract
const initializedContract = async (tokenContractAddress: string) => {
  let initializeLoadingId: Id;
  initializeLoadingId = toast.loading("Staking Contract is Initialising...");
  try {
    // call Initialize function on Staking contract using token contract
    const result = await stakingContract?.callSendMethod(
      "Initialize",
      currentWalletAddress as string,
      { tokenContractAddress }
    );

    toast.update(initializeLoadingId, {
      render: "Staking Contract Initialised Successful",
      type: "success",
      isLoading: false,
    });
    return "true";
  } catch (error) {
    if (error instanceof Error) {
      toast.update(initializeLoadingId, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
    return "error";
  } finally {
    removeNotification(initializeLoadingId as Id);
  }
};
```

#### Here's what the function does:

1. **Calls Smart Contract Method:** Sends the transaction to the staking smart contract to initialize the contract using the token address.

### Configure Submit Form

**Create a Function to Handle Submit of Create form**

Now, let's write the create token function.

1. Scroll down to find the comment `// Step Q - handle Submit of Create Token`.

2. Replace the existing **`onSubmit`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step Q - handle Submit of Create Token
const onSubmit = async (values: {
  tokenName: string;
  symbol: string;
  totalSupply: string;
}) => {
  try {
    // creating TOKEN on mainchain
    const mainChainResult = await createTokenOnMainChain(values);

    if (mainChainResult === "error") {
      setFormLoading(false);
      return;
    }
    await delay(3000);

    // Validating Transaction of Create Token on mainchain
    const validateTokenData: ITokenValidateResult | "error" =
      await validateToken(values);
    if (validateTokenData === "error") {
      setFormLoading(false);
      return;
    }

    // creating TOKEN on side chain once Transaction validate
    const sideChainResult = await createTokenOnSideChain(validateTokenData);

    if (sideChainResult === "error") {
      setFormLoading(false);
      return;
    }

    // Issuing TOKEN on side chain once it's created succefully
    const issueTokenResult: IssueResult | "error" =
      await issueTokenOnSideChain({
        symbol: values.symbol,
        amount: Number(values.totalSupply) + Number(extraRewardAmount),
        memo: "We are issuing Token",
      });

    if (issueTokenResult === "error") {
      setFormLoading(false);
      return;
    }

    // get TokenContractDetails from transactio logs on issues Token
    const tokenLog = issueTokenResult.data.Logs.find(
      ({ Name }: { Name: string }) => Name === "Issued"
    );
    if (!tokenLog) {
      toast.error("Error in Token Address");
      return;
    }

    // Transferring Reward Amount on Staking Contract
    await transferTokenToStakingContract(extraRewardAmount, values.symbol);
    // Initializing Staking smart contract using Token Address
    await initializedContract(tokenLog.Address);
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
  } finally {
    setFormLoading(false);
    handleCloseModal();
  }
};
```

#### Here's what the function does:

1. **Creates Token on the MainChain:** Calls `createTokenOnMainChain` to create the token on the mainchain. If it fails, it updates the transaction status and exits.

2. **Validates Create Token Transaction:** Waits for 3 seconds, then calls `validateToken` to validate the token. If validation fails, it updates the transaction status and exits.

3. **Creates Token on the dAppChain:** Calls `createTokenOnSideChain` to create the token on the dAppChain using the validated data. If it fails, it updates the transaction status and exits.

4. **Issues Token on the dAppChain:** Calls `issueTokenOnSideChain` to issue the token. Updates the transaction status to false after completion.

5. **Transferring Reward Amount to the Staking Contract :** Calls `transferTokenToStakingContract` to transfer the reward amount to the staking contract.

6. **Initializing Staking smart contract:** Calls `initializedContract` to initialize the staking smart contract using the token address.


### Fetch Token Data

Let's write the function to fetch the token data from user's wallet using graphql API.

**Step 1: Locate the File**

- go to the `/src/pages/home/index.tsx` file.

**Step 2: Write Function to fetch the fungible token data**

- Find the comment `// Step R - fetch Fungible Token data`.

- Replace the existing **`fetchTokenData`** function with this code snippet:

```javascript title="home/index.tsx"
// Step R - fetch Fungible Token data
const fetchTokenData = async () => {
  if (!currentWalletAddress) {
    return;
  }
  try {
    // Your GraphQL query and variables from the curl command
    const query = `
      query ExampleQuery($dto: GetCAHolderTokenBalanceDto) {
        caHolderTokenBalanceInfo(dto: $dto) {
          data {
            balance
            tokenInfo {
              symbol
            }
          }
        }
      }
    `;

    const variables = {
      dto: {
        chainId: "tDVW", // AELF or tDVW
        skipCount: 0,
        maxResultCount: 100,
        caAddressInfos: [
          {
            caAddress: currentWalletAddress,
          },
        ],
      },
    };

    // Axios POST request to the GraphQL endpoint
    const response = await axios.post(
      "https://dapp-aa-portkey-test.portkey.finance/Portkey_V2_DID/PortKeyIndexerCASchema/graphql",
      {
        query: query,
        variables: variables,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    // Handle the response
    const tokensData = response.data.data.caHolderTokenBalanceInfo.data;

    // find token detilas from API  data
    if (tokensData && tokensData.length > 0) {
      const filterTokenInfo = tokensData.find(
        (data: ITokenInfo) => data.tokenInfo.symbol.length === 10,
        []
      );
      if (filterTokenInfo) {
        setTokenInfo(filterTokenInfo);
      }
    }
    
  } catch (err) {
    console.log("error", err);
  }
};
```
#### Here's what the function does:

1. **Fetch Token balance:** Fetches token balance using graphql api.

2. **Filter Token Details:** It finds the token details from the API response.

Now, it's time to start the implementation of the staking functionality.  

### Deposit Stake Amount on the Staking Contract

As we have completed `Create Token` and `Fetch Token balance` functionality, it's time to acheive `Stake Token` functionality using the staking smart contract.

Now, let's prepare the **Deposit Stake Amount** related functions.

#### Transfer Tokens to the Staking Contract

First, we need to transfer stake amount to the staking contract address using dAppChain contract and then we can call the `GetDeposits` function on the staking contract.

- Scroll down to find the comment `// Step S - Function to transfer TOKEN to the Staking Contract`.

- Replace the existing **`transferTokenToStakingContract`** function with this code snippet:

```javascript title="home/index.tsx"
// Step S - Function to transfer TOKEN to the Staking Contract
const transferTokenToStakingContract = async (amount: string) => {
  // Show a loading toast notification while the transfer is in progress
  let transferTokenLoadingId = toast.loading("$TOKEN Deposit Transaction Executing");

  try {
    // Prepare the transfer input with required parameters
    const transferNtfInput = {
      to: stakingContractAddress, // Address of the staking contract
      symbol: tokenInfo?.tokenInfo.symbol, // Symbol of the token being transferred
      amount: amount, // Amount to be transferred
      memo: "Transferring Amount to Staking Contract for Deposit Token", // Description or memo for the transaction
    };

    // Call the transfer method on the side chain smart contract
    await sideChainSmartContract?.callSendMethod(
      "Transfer",
      currentWalletAddress as string, // Address of the current wallet initiating the transfer
      transferNtfInput
    );

    // Update the toast notification on successful transfer
    toast.update(transferTokenLoadingId, {
      render: "$TOKEN Deposit Successfully!",
      type: "success",
      isLoading: false,
    });
    removeNotification(transferTokenLoadingId); // Remove the notification
    return "success"; // Return success status
  } catch (error) {  
    if (error instanceof Error) {
      // Handle any error during the token transfer and update the toast notification
      toast.update(transferTokenLoadingId, {
        render: error.message, // Display the error message
        type: "error",
        isLoading: false,
      });
    }
    removeNotification(transferTokenLoadingId); // Remove the notification
    return "error"; // Return error status
  }
};
```

#### Create Handle Staking function

Now, let's create the function to handle staking, as we have already completed **`transferTokenToStakingContract`** function.

- Scroll down to find the comment `// Step T - Function to handle staking of the tokens`.

- Replace the existing **`handleStaking`** function with this code snippet:

```javascript title="home/index.tsx"
// Step T - Function to handle staking of the tokens
const handleStaking = async () => {
  // Validate the amount and handle any errors
  const isError = handleAmountError(amount);
  if (isError) {
    return; // Exit if there is an error with the amount
  }
    
  let stakingLoadingId; // Variable to store the loading toast ID
  
  try {
    // Transfer the token to the staking contract before proceeding with staking
    const result: "success" | "error" = await transferTokenToStakingContract(amount);
  
    // Exit if the transfer encountered an error
    if (result === "error") {
      return;
    }
  
   // Show a loading toast notification for the staking process
   stakingLoadingId = toast.loading("Staking $TOKEN on Smart Contract...");
  
    // Prepare the deposit parameters
    const DEPOSIT_PARAMS = {
      tokenSymbol: tokenInfo?.tokenInfo.symbol, // Symbol of the token being staked
      amount: amount, // Amount being staked
      lockTime: 300, // Time for which the tokens are locked
    };
  
    // Call the deposit method on the staking contract
    await stakingContract?.callSendMethod(
      "Deposit",
      currentWalletAddress as string, // Address of the current wallet
      DEPOSIT_PARAMS
    );
  
    // Fetch the updated deposit data and total staked amount after staking
    fetchDepositData();
    fetchTotalStakedAmount();
  
    // Reset the edited status and clear the amount field
    setIsEdited(false);
    setAmount("");
  
    // Update the toast notification for successful staking
    toast.update(stakingLoadingId, {
      render: "$TOKEN Staked Successfully",
      type: "success",
      isLoading: false,
    });
    removeNotification(stakingLoadingId); // Remove the notification
  } catch (error) {
    if (error instanceof Error) {
      // Handle any error during staking and update the toast notification
      setAmount(""); // Clear the amount field in case of an error
      toast.update(stakingLoadingId as Id, {
        render: error.message, // Display the error message
        type: "error",
        isLoading: false,
      });
    }
    removeNotification(stakingLoadingId as Id); // Remove the notification
    return "error"; // Return error status
  }
};
``` 

### Fetch Deposited (Staked) Tokens

- Find the comment `// Step U - Function to fetch deposit data for the current wallet address`.

- Replace the existing **`fetchDepositData`** function with this code snippet:

```javascript title="home/index.tsx"
// Step U - Function to fetch deposit data for the current wallet address
const fetchDepositData = async () => {
  try {
    // Call the "GetDeposits" method on the staking contract to get deposits for the wallet address
    const deposite = await stakingContract?.callViewMethod("GetDeposits",{value: currentWalletAddress as string});

    // Check if there are any deposits in the returned data
    if (deposite && deposite.data.deposits.length > 0) {
      setDepositData(deposite.data.deposits); // Update state with the deposit data
    } else {
        setDepositData([]); // If no deposits, set the data to an empty array
    }
  } catch (error) {
    // Log and handle any errors during the fetch
    console.log("error", error);
    return "error";
  }
};
``` 

### Fetch Total Staked Amount

- Find the comment `// Step V - Function to fetch the total staked amount from the staking contract`.

- Replace the existing **`fetchTotalStakedAmount`** function with this code snippet:

```javascript title="home/index.tsx"
// Step V - Function to fetch the total staked amount from the staking contract
const fetchTotalStakedAmount = async () => {
  try {
    // Call the "GetTotalStakedAmount" method to get the total staked amount
    const amount = await stakingContract?.callViewMethod("GetTotalStakedAmount","");

    // Check if there is valid data for the total staked amount
    if (amount?.data) {
      setTotalStakedAmount(amount.data.value); // Update state with the total staked amount
    } else {
      setTotalStakedAmount("0"); // If no data, set the total staked amount to "0"
    }
  } catch (error) {
    // Log and handle any errors during the fetch
    console.log("error", error);
    return "error";
  }
};
``` 

### Withdraw Staked Tokens

Users can withdraw the staked amount after the staking period is over for a specific deposit.

- Find the comment `// Step W - Function to withdraw staked tokens based on a deposit ID`.

- Replace the existing **`withdrawStake`** function with this code snippet:

```javascript title="home/index.tsx"
// Step W - Function to withdraw staked tokens based on a deposit ID
const withdrawStake = async (depositId: string) => {
  let withdrawLoadingId; // Variable to store the loading toast ID
  setIsWithdrawing(true); // Set the withdrawing state to true

  // Show a loading toast notification while the withdrawal is in progress
  withdrawLoadingId = toast.loading("$TOKEN Withdrawal in Progress...");

  try {

    // Call the "Withdraw" method on the staking contract to withdraw based on deposit ID
    await stakingContract?.callSendMethod(
      "Withdraw",
      currentWalletAddress as string, // Pass the current wallet address
      { depositId } // Pass the deposit ID to withdraw
    );

    // Update the toast notification on successful withdrawal
    toast.update(withdrawLoadingId, {
      render: "$TOKEN Withdraw Successful",
      type: "success",
      isLoading: false,
    });
    removeNotification(withdrawLoadingId); // Remove the loading notification
  } catch (error) {
    if(error instanceof Error){
      // Handle any errors during withdrawal and update the toast notification
      toast.update(withdrawLoadingId, {
        render: error.message, // Display the error message
        type: "error",
        isLoading: false,
      });
    }
    removeNotification(withdrawLoadingId); // Remove the loading notification
    return "error"; // Return error status
  } finally {
    // After withdrawal, fetch updated deposit data and total staked amount
    fetchDepositData();
    fetchTotalStakedAmount();
    setIsWithdrawing(false); // Set the withdrawing state to false
  }
};
``` 

### Emergency Withdraw Staked Tokens

Users can withdraw their staked amount at any time through the `emergency withdrawal` function before the staking period gets over.

- Find the comment `// Step X - Function to perform an emergency withdrawal of staked tokens based on a deposit ID`.

- Replace the existing **`emergencyWithdrawStake`** function with this code snippet:

```javascript title="home/index.tsx"
// Step X - Function to perform an emergency withdrawal of staked tokens based on a deposit ID
const emergencyWithdrawStake = async (depositId: string) => {
  let withdrawLoadingId; // Variable to store the loading toast ID
  setIsWithdrawing(true); // Set the withdrawing state to true
  
  // Show a loading toast notification while the emergency withdrawal is in progress
  withdrawLoadingId = toast.loading("Emergency $TOKEN Withdrawal in Progress...");
  try {
    // Call the "ForceWithdraw" method on the staking contract to forcefully withdraw the deposit
    await stakingContract?.callSendMethod(
      "ForceWithdraw",
      currentWalletAddress as string, // Pass the current wallet address
      { value: depositId } // Pass the deposit ID for the emergency withdrawal
    );

    // Update the toast notification on successful emergency withdrawal
    toast.update(withdrawLoadingId, {
      render: "$TOKEN Withdraw Successful",
      type: "success",
      isLoading: false,
    });
    removeNotification(withdrawLoadingId); // Remove the loading notification
  } catch (error) {
    if(error instanceof Error){
      // Handle any errors during emergency withdrawal and update the toast notification
      toast.update(withdrawLoadingId, {
        render: error.message, // Display the error message
        type: "error",
        isLoading: false,
      });
    }
    removeNotification(withdrawLoadingId); // Remove the loading notification
    return "error"; // Return error status
  } finally {
    // After the emergency withdrawal, fetch updated deposit data
    fetchDepositData();
    setIsWithdrawing(false); // Set the withdrawing state to false
  }
};
``` 

### Set Staking Contract Address

You need to set your deployed Staking contract Address in utils file so let's set it now.

**Step 1: Locate the File**

- Go to the `/src/lib/utils.tsx` file.

**Step 2: Set Deployed Staking Contract Address**

- Find the comment `// Step Y - Staking contract address` on below of page.

- Replace your deployed staking contract with value of **stakingContractAddress** (`your_deployed_stakinng_contract`).

```javascript title="src/lib/utils.tsx"
// Step Y - Staking contract address
export const stakingContractAddress = "your_deployed_staking_contract_address"
```

As we've written all the necessary frontend functions and components, we're ready to run the Staking dApp application in the next step.