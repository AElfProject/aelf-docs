### Fetch NFT Data
Let's write the Function for the fetch NFT data from user's Wallet using API.
**Step 1: Locate the File**
- go to the `src/lib/commonFunctions.ts` file.
**Step 2: Write the Helper Functions for fetch the NFT data**
- The `commonFunctions.ts` file is contains the helpers function for fetch NFT and etc.
- Find the comment `// fetch NFT Data from Indexer API`.

- Replace the existing **`fetchUserNftData`** function with this code snippet:

```ts title="commonFunctions.ts"
// fetch NFT Data from Indexer API
export const fetchUserNftData = async (address:string) => {

  const url = 'add_your_aeindexer_api';
  const headers = { 'Content-Type': 'application/json'};

  const body = JSON.stringify({
    query: `
      query {
        account(input: { chainId: "tDVW", address: "${address}" }) {
          symbol
          amount
          address
          tokenName
          metadata {
            chainId
            block {
              blockHeight
            }
          }
        }
      }
    `,
    variables: {},
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data.account;
  } catch (error) {
    console.error('Error fetching data:', error);
    return "error";
  }
};
```
:::info
ℹ️ Note: Ensure that you are updating your aeindexer api with **"add_your_aeindexer_api"** value in **url** variable.
:::
#### Here's what the function does:
1. **Retrieves NFT Data:** The function `fetchUserNftData` fetches the NFT data for a given owner using AeIndexer API.
We have Prepared all necessary function for fetch NFT Data from User's Wallet.
Now, Let's call **`fetchUserNftData`** on necessary page.
**Step 3: Call fetchUserNftData Functions on Home Page**
- go to the `src/pages/home/index.tsx` file.
- The `home/index.tsx` file contains the Home Page of NFT dApp
- Find the comment `// get NFT Data from User's wallet`.

- Replace the existing **`getNFTData`** function with this code snippet:

```tsx title="home/index.tsx"
// get NFT Data from User's wallet
const getNFTData = async () => {
  const result = await fetchUserNftData(currentWalletAddress as string);
  if (result !== "error") {
    setUserNfts(result);
  }
  setLoading(false);
};
```
#### Here's what the function does:
1. **Fetches NFT Data:** The function `getNFTData` retrieves NFT data from the user's wallet.
2. **Calls Fetch Function:** It calls the `fetchUserNftData` function with the `currentWalletAddress` parameters.
3. **Handles Result:** It checks the result:
   - If the result is not "error", it updates the state with the fetched NFT data by calling `setUserNfts(result)`.
4. **Updates Loading State:** Regardless of the result, it sets the loading state to false by calling `setLoading(false)`.
**Step 4: Call fetchUserNftData Functions on Profile Page**
- go to the `src/pages/profile/index.tsx` file.
- The `profile/index.tsx` file contains the Home Page of NFT dApp
- Find the comment `// get NFT Data from User's wallet`.

- Replace the existing **`getNFTData`** function with this code snippet:

```tsx title="profile/index.tsx"
// get NFT Data from User's wallet
const getNFTData = async () => {
  const result = await fetchUserNftData(currentWalletAddress as string);
  if (result !== "error") {
    setUserNfts(result);
  }
  setLoading(false);
};
```
#### Here's what the function does:
1. **Fetches NFT Data:** The function `getNFTData` retrieves NFT data from the user's wallet.
2. **Calls Fetch Function:** It calls the `fetchUserNftData` function with the `currentWalletAddress` parameters.
3. **Handles Result:** It checks the result:
   - If the result is not "error", it updates the state with the fetched NFT data by calling `setUserNfts(result)`.
4. **Updates Loading State:** Regardless of the result, it sets the loading state to false by calling `setLoading(false)`.
