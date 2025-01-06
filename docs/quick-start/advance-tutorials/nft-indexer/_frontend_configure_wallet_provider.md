### Configure Portkey Provider & Write Connect Wallet Function

We'll set up our Portkey provider to allow users to connect their Portkey wallets to our app and interact with the aelf smart contracts. We'll be interacting with the already deployed multi-token contract for this tutorial.

**Step 1. Locate the File:**

- Go to the `src/hooks/useNFTSmartContract.ts` file.

**Step 2. Fetch the Smart Contract:**

- Find the comment `//Step A - Function to fetch a smart contract based on the chain symbol and the contract address.`

- Replace the existing **`fetchContract`** function with this updated code:

```ts title="useNFTSmartContract.ts"
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
  - **Fetch Chain** : The function fetches chain information using the provider.
  - **Get Contract** : It retrieves the smart contract instance from the chain.
  - **Error Handling** : If an error occurs, it logs the error to the console.

**Step 3. Initialize and Fetch the Smart Contracts:**

- Find the comment `// Step B - Effect hook to initialize and fetch the smart contracts when the provider changes.`

- Replace the existing **`useEffect`** hook with this updated code:

```ts title="useNFTSmartContract.ts"
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
  - **Fetch Contracts** : It fetches and sets the smart contracts for the main chain, side chain, and cross chain.
    - **MainChain Contract** : Fetches the MainChain Testnet Contract and sets it in the state.
    - **dAppChain Contract** : Fetches the dAppChain Testnet Contract and sets it in the state.

By following these steps, we'll configure the Portkey provider to connect users' wallets to your app and interact with the multi-token smart contract including NFT related functionalities. This setup will enable our frontend components to perform actions like `create NFTs`, `validate NFTs`, and `transfer NFTs`.
