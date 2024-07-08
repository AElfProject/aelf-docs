The smart contract needs to be deployed on the chain before users can interact with it.

Run the following command to deploy a contract.

```bash title="Terminal"
export CONTRACT_PATH=$(find ~+ . -path "*patched*" | head -n 1)
aelf-deploy -a $WALLET_ADDRESS -p $WALLET_PASSWORD -c $CONTRACT_PATH -e https://tdvw-test-node.aelf.io/
```

Please wait for approximately 1 to 2 minutes. If the deployment is successful, it will provide you with the contract address.

![result](/img/deploy-result.png)

Export your smart contract address:

```bash
export CONTRACT_ADDRESS="YOUR_SMART_CONTRACT_ADDRESS e.g. 2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS"
```