### Configure Submit Form
Now, let's write a function to call necessary functions for NFT creation.
1. Scroll down to find the comment `// Step 11 - Handle Submit Form`.

2. Replace the existing **`onSubmit`** function with this code snippet:

```tsx title="create-nft/index.tsx"
//Step 11 - Handle Submit Form
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  setTransactionStatus(true);

  if (isNftCollectionCreated) {
    // Already Collection Created
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

    // create NFT Collection on dAppChain
    await createCollectionOnSideChain(
      validateCollectionResult.transactionId,
      validateCollectionResult.signedTx,
      validateCollectionResult.BlockNumber
    );
  }
};
```
#### Here's what the function does:
1. **Starts Transaction:** Sets the transaction status to true.
2. **Checks NFT Collection Status:** If the NFT collection is already created, calls `createNftToken` to create the NFT token.
3. **Creates and Validates NFT Collection:** If the collection isn’t created, calls `createNftCollectionOnMainChain` to create it. If successful, validates the NFT collection with `validateNftCollectionInfo`.
4. **Creates Collection on dAppChain:** If validation is successful, calls `createCollectionOnSideChain` to create the collection on the dAppChain.
5. **Handles Errors:** Updates the transaction status to false and exits if any step fails.
