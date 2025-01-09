### Create NFT Token
**Step 1: Write a Function to create NFTs on the mainchain**

Now, let's write the **create NFTs on MainChain** function.
1. Scroll down to find the comment `// step 6 - Create an NFT on the mainchain`.

2. Replace the existing **`createNFTOnMainChain`** function with this code snippet:

```tsx title="create-nft/index.tsx"
// step 6 - Create an NFT on the mainchain
const createNFTOnMainChain = async (values: INftParams) => {
  let createMainChainNFTLoadingId;

  try {
    createMainChainNFTLoadingId = toast.loading(
      "Creating NFT on MainChain..."
    );

    // Preparing Parameter for Create Function
    const createNftMainChainInput = {
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
      createNftMainChainInput
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
  } catch (error) {
    handleError(createMainChainNFTLoadingId as number, error);
    return "error";
  }
};
```
#### What this function does:
1. **Displays Loading Toast:** Shows a notification indicating the creation process of the NFT on the mainchain.
2. **Prepares Parameters:** Constructs input parameters for creating the NFT, including token details and the issuer's information.
3. **Calls Smart Contract:** Sends a request to the mainchain smart contract to create the NFT using the prepared parameters.
4. **Handles Success:** Updates the notification to show successful NFT creation.
5. **Handles Errors:** Displays an error message if the operation fails and logs the error.
6. **Final Return:** Returns `"success"` if the NFT is created successfully; otherwise, returns `"error"`.

**Step 2: Write the Function for Validate NFT Info Exist**

Now, let's write the Validate NFT Info Exist function.
1. Scroll down to find the comment `// step 7 - Validate an NFT token on the mainchain`.

2. Replace the existing **`validateNftToken`** function with this code snippet:

```tsx title="create-nft/index.tsx"
// step 7 - Validate an NFT token on the maincgit stashhain
const validateNftToken = async (values: INftParams) => {
  let validateNFTLoadingId;
  try {
    // Start Loading before initiate the transaction
    validateNFTLoadingId = toast.loading(
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
      await delay(5000); // Wait 5 seconds before checking again
      // get latest index Hight
      const sideIndexMainHeight = await GetParentChainHeight();
      if (
        // check the latest index Hight is grater than or equal
        Number(sideIndexMainHeight) >= VALIDATE_TXRESULT.Transaction.RefBlockNumber
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
    handleError(validateNFTLoadingId as number, error);
    return "error";
  }
};
```
#### Here's what the function does:
1. **Displays Loading Toast:** Shows a notification indicating that the NFT validation is in progress on the blockchain.
2. **Prepares Validation Input:** Constructs the input parameters needed for validating the NFT token.
3. **Gets Token Contract:** Retrieves the token contract instance from the MainChain.
4. **Signs and Sends Transaction:** Signs the transaction to validate the token info and sends it to the blockchain.
5. **Polls for Transaction Result:** Waits for the transaction result and ensures the transaction has reached the required block height.
6. **Fetches Merkle Path:** Retrieves the Merkle path for the validated transaction.
7. **Handles Success:** Updates the notification to show successful validation and returns necessary values.
8. **Handles Errors:** Logs errors and returns `"error"` if something goes wrong.

**Step 3: Write a Function for Create NFT on dAppChain**

Now, let's write the Create NFT on dAppChain function.
1. Scroll down to find the comment `// step 8 - Create a NFT on dAppChain`.

2. Replace the existing **`createNftTokenOnSideChain`** function with this code snippet:

```tsx title="create-nft/index.tsx"
// step 8 - Create a NFT on dAppChain.
const createNftTokenOnSideChain = async (values: INftValidateResult) => {
  let createSideChainNFTLoadingId;
  try {
    createSideChainNFTLoadingId = toast.loading("Creating NFT on SideChain...");

    const CROSS_CHAIN_CREATE_TOKEN_PARAMS = {
      fromChainId: mainchain_from_chain_id,
      parentChainHeight: values.parentChainHeight,
      transactionBytes: Buffer.from(values.signedTx, "hex").toString("base64"),
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
    handleError(createSideChainNFTLoadingId as number, error);
    return "error";
  }
};
```
#### Here's what the function does:
1. **Displays Loading Toast:** Shows a notification indicating that the NFT is being created on the dAppChain.
2. **Prepares Cross-Chain Transaction Parameters:** Constructs the parameters needed for creating the NFT on the dAppChain, including chain IDs, block height, transaction data, and Merkle path.
3. **Calls Smart Contract Method:** Sends the transaction to the dAppChain smart contract to create the NFT.
4. **Handles Success:** Updates the notification to show successful NFT creation on the dAppChain.
5. **Handles Errors:** Logs errors and returns `"error"` if something goes wrong.

**Step 4: Write a Function for Issue NFT Token which has been Created on dAppChain.**

Now, let's write the Issue NFT Function.

1. Scroll down to find the comment `// step 9 - Issue a NFT Function which has been Created on dAppChain`.

2. Replace the existing **`issueNftOnSideChain`** function with this code snippet:

```tsx title="create-nft/index.tsx"
// step 9 - Issue a NFT Function which has been Created on dAppChain
const issueNftOnSideChain = async (values: {
  symbol: string;
  amount: string;
  memo: string;
}) => {
  let issuingNFTLoadingId
  try {
    issuingNFTLoadingId = toast.loading(
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

    toast.update(issuingNFTLoadingId, {
      render: "NFT Issue Successfully Executed",
      type: "success",
      isLoading: false,
    });
    removeNotification(issuingNFTLoadingId);
    toast.success("You will get NFT on your Wallet! It can take sometimes to get into your wallet");
    handleReturnClick();
    return "success";
  } catch (error) {
    handleError(issuingNFTLoadingId as number, error);
    setTransactionStatus(false);
    return "error";
  }
};
```
#### Here's what the function does:
1. **Displays Loading Toast:** Shows a notification indicating that the NFT is being issued on the dAppChain.
2. **Prepares Issuance Input:** Constructs the input parameters for issuing the NFT, including symbol, amount, memo, and recipient address.
3. **Calls Smart Contract Method:** Sends the transaction to the dAppChain smart contract to issue the NFT.
4. **Handles Success:** Updates the notification to show successful issuance and notifies the user that the NFT will appear in their wallet.
5. **Handles Errors:** Logs and displays any error messages, updates the transaction status, and returns `"error"`.

**Step 5: Create a Function to Call Necessary Functions for NFT Creation**

Now, let's write the createNftToken Function.

1. Scroll down to find the comment `// step 10 - Call Necessary Function for Create NFT`.

2. Replace the existing **`createNftToken`** function with this code snippet:

```tsx title="create-nft/index.tsx"
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
  } catch (error) {
    setTransactionStatus(false);
    if (error instanceof Error) {
      toast.error( error.message);
    } else {
      toast.error( "An unexpected error occurred.");
    }
    return "error";
  }
};
```
#### Here's what the function does:
1. **Creates NFT on MainChain:** Calls `createNFTOnMainChain` to create the NFT on the MainChain. If it fails, it updates the transaction status and exits.
2. **Validates NFT Token:** Waits for 3 seconds, then calls `validateNftToken` to validate the NFT. If validation fails, it updates the transaction status and exits.
3. **Creates NFT on dAppChain:** Calls `createNftTokenOnSideChain` to create the NFT on the dAppChain using the validated data. If it fails, it updates the transaction status and exits.
4. **Issues NFT on dAppChain:** Calls `issueNftOnSideChain` to issue the NFT. Updates the transaction status to false after completion.
5. **Handles Errors:** Catches and logs any errors, updates the transaction status, and displays an error notification.
