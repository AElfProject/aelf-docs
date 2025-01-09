## Step 4 - Deploy AeIndexer
- Open the AeIndexer details page and click Deploy.
![deploy](/img/deploy-nft-indexer-template.png)
- Fill out the subscription manifest and upload the DLL file.
1. Subscription manifest：
```json
{
  "subscriptionItems": [
    {
      "chainId": "tDVW",
      "startBlockNumber": 151018963,
      "onlyConfirmed": false,
      "transactions": [],
      "logEvents": [
        {
          "contractAddress": "ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx",
          "eventNames": [
            "Issued",
            "Issue"
          ]
        }
      ]
    }
  ]
}
```
  2. DLL file location: src/NFTAeIndexer/bin/Release/net8.0/NFTAeIndexer.dll
![deploy-2](/img/subscription-nft-indexer.png)
- Click the deploy button to submit deployment information. When the normal processing block information appears on the Logs page at the bottom of the details page, it means that the deployment has been successful and data indexing has started.
![log](/img/logs-nft-indexer.png)
