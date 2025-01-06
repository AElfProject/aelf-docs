## Step 5 - Query indexed data
Through the Playground page below the details page, you can use GraphQL syntax to query the indexed data information. Enter the query statement on the left, and the query results will be displayed on the right.

```
query{
    account(input: { chainId: "tDVW", address: "2AaBGTi2cJLWtEXR7w96hzun4qVz2KnsGZ1XfqErhKTgDj9Q8x"}) {
        symbol,
        amount,
        address,
        tokenName,
        nftImageUri,
        nftAttributes,
        metadata {
          chainId,
          block {
            blockHeight
          }
        }
      }
}
```
![query-graphQL](/img/query-nft-indexer.png)

:::tip
ℹ️ Note: For the complete demo code, please visit AeFinder github to download. https://github.com/AeFinderProject/aefinder/tree/master/samples/TokenAeIndexer
:::

