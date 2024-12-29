### Create NFT Collection
Let's write the functions to `Create New NFT Collection` on the aelf mainchain and the dAppChain.

**Step 1: Write the function to `Create New NFT Collection` on the MainChain**

- The `create-nft/index.tsx` file includes the code to create NFTs. It allows users to create new NFTs.

- Find the comment `// step 1 - Create New NFT Collection on the mainchain`.

- Replace the existing **`createNftCollectionOnMainChain`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step - 1 Create New NFT Collection on the mainchain
const createNftCollectionOnMainChain = async (
  values: z.infer<typeof formSchema>
): Promise<INftInput | "error"> => {
  let createLoadingId;
  try {
    createLoadingId = toast.loading("Creating NFT Collection..");

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
  } catch (error) {
    handleError(createLoadingId as number, error);
    return "error";
  }
};
```
:::tip
ℹ️ Note: You need to get **symbol** from the Portkey wallet.
:::
- **Follow Steps to get NFT symbol from Portkey Wallet:**
  - Open Portkey Wallet.
  - Go to the NFTs tab.
  - You will find the SEED that you already got from the above **seed generation** step.
  - Click on the SEED to see details.
  - You will find the **Token Symbol** inside the **Token Creation via This Seed** section.
  - Copy and use that value of the token symbol.
#### What This Function Does:
1. **Creates an Object with NFT Details** : It prepares the data needed to create a new NFT collection.
2. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to create the new NFT collection using the prepared data.
3. **Logs Information** : It logs the result for debugging purposes.
4. **Return Values of Object** : It returns necessary values as a object.
Next, we'll write the **Validate Collection Info Exist** function.
**Step 2: Write the validates collection info exist function**
- Scroll up to find the comment `// step 2 - Validate Collection information exist`.

- Replace the existing **`validateNftCollectionInfo`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 2 - Validate Collection information exist
// This function validates if the token collection information already exists on the main blockchain.
const validateNftCollectionInfo = async (
  values: INftInput
): Promise<ValidationResult | "error"> => {
  let validateLoadingId;
  try {
    // Start loading before initiating the transaction
    validateLoadingId = toast.loading(
      <CustomToast
        title="Transaction is getting validated on aelf blockchain. Please wait!"
        message="Validation means transaction runs through a consensus algorithm to be selected or rejected. Once the status changes, the process will complete. It usually takes some time in distributed systems."
      />
    );

    // Create an object with the necessary information for token validation.
    const validateInput: INftInput = {
      symbol: values.symbol, // Symbol of the token
      tokenName: values.tokenName, // Name of the token
      totalSupply: values.totalSupply, // Total supply of the token
      decimals: values.decimals, // Decimals of the token
      issuer: currentWalletAddress, // Address of the token issuer
      isBurnable: true, // Indicates if the token can be burned
      issueChainId: sidechain_from_chain_id, // ID of the issuing chain
      owner: currentWalletAddress, // Owner's wallet address
    };

    // Get mainnet contract
    const aelfTokenContract = await getTokenContract(aelf, wallet);

    // Prepare to sign the transaction using the contract method
    const signedTx =
      aelfTokenContract.ValidateTokenInfoExists.getSignedTx(validateInput);

    // Send the transaction using the signed transaction
    const { TransactionId: VALIDATE_TXID } = await aelf.chain.sendTransaction(
      signedTx
    );

    // Get the validation result
    let VALIDATE_TXRESULT = await aelf.chain.getTxResult(VALIDATE_TXID);

    // Wait until the latest index height is greater than or equal to the transaction block number
    let heightDone = false;

    while (!heightDone) {
      // Get the latest index height
      const sideIndexMainHeight = await GetParentChainHeight();
      if (Number(sideIndexMainHeight) >= VALIDATE_TXRESULT.Transaction.RefBlockNumber) {
        VALIDATE_TXRESULT = await aelf.chain.getTxResult(VALIDATE_TXID);
        heightDone = true;
      }
    }

    console.log("VALIDATE_TXRESULT", VALIDATE_TXRESULT);

    // Update the loading message
    toast.update(validateLoadingId, {
      render: "Validating Token Successfully Executed",
      type: "success",
      isLoading: false,
    });

    // Remove the loading message
    removeNotification(validateLoadingId);

    // Return necessary details
    return {
      transactionId: VALIDATE_TXID,
      signedTx: signedTx,
      BlockNumber: VALIDATE_TXRESULT.BlockNumber,
    };
  } catch (error) {
    handleError(validateLoadingId as number, error);
    return "error";
  }
};
```
#### What This Function Does:
1. **Creates an Object with Validate Collection Details** : It prepares the data needed to validate the token information.
2. **Calls Smart Contract Method** : It interacts with the multi-token smart contract method to check if the token information already exists using the prepared data.
3. **Return Values** : It returns necessary values as an object.
Next, we'll write the **Get the parent chain height** function.
**Step 3: Write the get the parent chain height function**
- Scroll up to find the comment `// Step 3: Get the parent chain height`.

- Replace the existing **`GetParentChainHeight`** function with the following code snippet:

```javascript title="create-nft/index.tsx"
// Step 3: Get the parent chain height
// This function fetches the current height of the parent blockchain.
const GetParentChainHeight = async () => {
  try {
    const tdvwCrossChainContract = await getCrossChainContract(tdvw, wallet);
    // Call the smart contract method to get the parent chain height.
    const result = await tdvwCrossChainContract.GetParentChainHeight.call()
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
**Step 4: Write the fetch the merkle path function**
- Scroll up to find the comment `// step 4 - Fetch the merkle path by transaction Id`.

- Replace the existing **`getMerklePathByTxId`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 4 - Fetch the merkle path by transaction Id
const getMerklePathByTxId = async (aelf: AElf, txId: string) => {
  try {
    const { MerklePathNodes } = await aelf.chain.getMerklePathByTxId(txId);

    const formattedMerklePathNodes = MerklePathNodes.map(
      ({
        Hash,
        IsLeftChildNode,
      }: {
        Hash: string,
        IsLeftChildNode: boolean,
      }) => ({
        hash: Hash,
        isLeftChildNode: IsLeftChildNode,
      })
    );

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
4. **Handles Errors** : If an error occurs, it clears the transaction status and logs the error.
Next, we'll write the **Create a Collection on the cross-chain** function.
**Step 5: Write a function to create a collection on the side chain**
- Scroll up to find the comment `// step 5 - Create a collection on the dAppChain`.

- Replace the existing **`createCollectionOnSideChain`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 5 - Create a collection on the dAppChain
const createCollectionOnSideChain = async (
  transactionId: string,
  signedTx: string,
  BlockNumber: number
) => {
  let crossChainLoadingId;
  try {
    crossChainLoadingId = toast.loading(
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
      } catch (err) {
        if ((err as { Error: string }).Error.includes("Cross chain verification failed.")) {
          console.log("Exit.");
          done = true;
        } else {
          console.error("An unexpected error occurred:", err);
        }
      }
    }
    return "success";
  } catch (error) {
    handleError(crossChainLoadingId as number, error);
    return "error";
  }
};
```
#### What This Function Does:
1. **Displays Loading Toast**: Shows a notification indicating the creation process of the collection on the dAppChain.
2. **Fetches Merkle Path**: Retrieves the merkle path using the provided transactionId.
3. **Prepares and Signs Transaction**: Constructs parameters for the cross-chain transaction and signs it.
4. **Sends Transaction and Checks Status**: Sends the signed transaction and polls for its status every 10 seconds. Updates the notification and state, if successful.
5. **Handles Errors**: Logs errors and returns "error" if something goes wrong.
6. **Final Return**: Returns "success" upon successful completion.
