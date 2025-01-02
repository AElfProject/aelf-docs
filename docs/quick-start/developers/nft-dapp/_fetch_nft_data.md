### Fetch NFT Data

Let's write the Function for the fetch NFT data from user's Wallet using API.

**Step 1: Locate the File**

- go to the `src/lib/commonFunctions.ts` file.

**Step 2: Write the Helper Functions for fetch the NFT data**

- The `commonFunctions.ts` file is contains the helpers function for fetch NFT and etc.

- Find the comment `// Function to get the balance of a specific NFT`.

- Replace the existing **`getBalanceOfNft`** function with this code snippet:

```javascript title="commonFunctions.ts"
// Function to get the balance of a specific NFT
const getBalanceOfNft = async (
  values: {
    symbol: string,
    owner: string,
  },
  sideChainSmartContract: IContract
): Promise<number> => {
  // @ts-ignore
  const { data }: { data: { balance: number } } =
    await sideChainSmartContract?.callViewMethod("getBalance", values);
  return data.balance;
};
```

#### Here's what the function does:

1. **Retrieves NFT Balance:** The function `getBalanceOfNft` fetches the balance of a specific NFT for a given owner.
2. **Parameters:** It takes two parameters:
   - `values`: An object containing the `symbol` of the NFT and the `owner` address.
   - `sideChainSmartContract`: An instance of the side chain smart contract.
3. **Calls View Method:** It calls the `getBalance` view method on the side chain smart contract with the provided `values`.
4. **Returns Balance:** It extracts the `balance` from the response and returns it as a number.

---

- Find the comment `// Function to fetch balance information for an array of NFTs`.

- Replace the existing **`fetchNftBalances`** function with this code snippet:

```javascript title="commonFunctions.ts"
// Function to fetch balance information for an array of NFTs
const fetchNftBalances = async (
  nfts: Nft[],
  ownerAddress: string,
  sideChainSmartContract: IContract
): Promise<Nft[]> => {
  const nftDataWithBalances = await Promise.all(
    nfts.map(async (nft) => {
      const balance = await getBalanceOfNft(
        {
          symbol: nft.nftSymbol,
          owner: ownerAddress,
        },
        sideChainSmartContract
      );
      return { ...nft, balance };
    })
  );

  return nftDataWithBalances;
};
```

#### Here's what the function does:

1. **Fetches Balances for Multiple NFTs:** The function `fetchNftBalances` retrieves balance information for an array of NFTs for a specific owner.
2. **Parameters:** It takes three parameters:
   - `nfts`: An array of `Nft` objects, each representing an NFT.
   - `ownerAddress`: A string representing the address of the owner.
   - `sideChainSmartContract`: An instance of the side chain smart contract.
3. **Maps NFTs to Balances:** It uses `Promise.all` to concurrently fetch the balance for each NFT by calling the `getBalanceOfNft` function.
4. **Combines NFT Data with Balances:** For each NFT, it combines the existing NFT data with the fetched balance.
5. **Returns Updated NFT Array:** It returns a new array of `Nft` objects, each including its respective balance.

---

- Find the comment `// fetch NFT Data from eforest API`.

- Replace the existing **`fetchUserNftData`** function with this code snippet:

```javascript title="commonFunctions.ts"
// fetch NFT Data from eforest API
export const fetchUserNftData = async (
  currentWalletAddress: string,
  sideChainSmartContract: IContract
) => {
  try {
    const response = await fetch(
      "https://test.eforest.finance/api/app/nft/nft-infos-user-profile/myhold",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ChainList: ["tDVV"],
          hasListingFlag: false,
          hasAuctionFlag: false,
          hasOfferFlag: false,
          collectionIds: [],
          address: currentWalletAddress,
          sorting: "ListingTime DESC",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    const newNftData = await fetchNftBalances(
      responseData.data.items,
      currentWalletAddress as string,
      sideChainSmartContract
    );

    return newNftData;
  } catch (error) {
    console.log(error);
    return "error"
  }
};
```

#### Here's what the function does:

1. **Fetches User NFT Data:** The function `fetchUserNftData` retrieves NFT data for a specific user from the eforest API and fetches balance information for each NFT.
2. **Parameters:** It takes two parameters:
   - `currentWalletAddress`: A string representing the wallet address of the user.
   - `sideChainSmartContract`: An instance of the side chain smart contract.
3. **API Request:** It makes a POST request to the eforest API endpoint `https://test.eforest.finance/api/app/nft/nft-infos-user-profile/myhold` with the user's wallet address and some other parameters.
4. **Checks Response:** It checks if the response from the API is okay. If not, it throws an error.
5. **Parses Response:** It parses the JSON response from the API.
6. **Fetches NFT Balances:** It calls `fetchNftBalances` to get the balance for each NFT in the response data.
7. **Returns Updated NFT Data:** It returns the updated NFT data, each including its respective balance.
8. **Handles Errors:** If any error occurs during the process, it logs the error and returns the string "error".

We have Prepared all necessary function for fetch NFT Data from User's Wallet.

Now, Let's call **`fetchUserNftData`** on necessary page.

**Step 3: Call fetchUserNftData Functions on Home Page**

- go to the `src/pages/home/index.tsx` file.

- The `home/index.tsx` file contains the Home Page of NFT dApp

- Find the comment `// get NFT Data from User's wallet`.

- Replace the existing **`getNFTData`** function with this code snippet:

```javascript title="home/index.tsx"
// get NFT Data from User's wallet
const getNFTData = async () => {
  const result = await fetchUserNftData(
    currentWalletAddress as string,
    sideChainSmartContract as IContract
  );
  if (result !== "error") {
    setUserNfts(result);
  }
  setLoading(false);
};
```

#### Here's what the function does:

1. **Fetches NFT Data:** The function `getNFTData` retrieves NFT data from the user's wallet.
2. **Calls Fetch Function:** It calls the `fetchUserNftData` function with the `currentWalletAddress` and `sideChainSmartContract` parameters.
3. **Handles Result:** It checks the result:
   - If the result is not "error", it updates the state with the fetched NFT data by calling `setUserNfts(result)`.
4. **Updates Loading State:** Regardless of the result, it sets the loading state to false by calling `setLoading(false)`.

**Step 4: Call fetchUserNftData Functions on Profile Page**

- go to the `src/pages/profile/index.tsx` file.

- The `profile/index.tsx` file contains the Home Page of NFT dApp

- Find the comment `// get NFT Data from User's wallet`.

- Replace the existing **`getNFTData`** function with this code snippet:

```javascript title="profile/index.tsx"
// get NFT Data from User's wallet
const getNFTData = async () => {
  const result = await fetchUserNftData(
    currentWalletAddress as string,
    sideChainSmartContract as IContract
  );
  if (result !== "error") {
    setUserNfts(result);
  }
  setLoading(false);
};
```

#### Here's what the function does:

1. **Fetches NFT Data:** The function `getNFTData` retrieves NFT data from the user's wallet.
2. **Calls Fetch Function:** It calls the `fetchUserNftData` function with `currentWalletAddress` and `sideChainSmartContract` as arguments.
3. **Handles Successful Result:** If the result from `fetchUserNftData` is not "error":
   - It updates the user's NFTs by calling `setUserNfts(result)`.
4. **Updates Loading State:** It sets the loading state to false by calling `setLoading(false)`, regardless of whether the fetch was successful or not.
