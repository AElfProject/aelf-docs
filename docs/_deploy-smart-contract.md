The smart contract needs to be deployed on the chain before users can interact with it.

Run the following command to deploy a contract.

```bash title="Terminal"
export CONTRACT_PATH=./src/bin/Debug/net6.0
export CONTRACT_FILE=HelloWorld
aelf-deploy -a $WALLET_ADDRESS -p $WALLET_PASSWORD -c $CONTRACT_PATH/$CONTRACT_FILE.dll.patched -e https://tdvw-test-node.aelf.io/
```

Please wait for approximately 1 to 2 minutes. If the deployment is successful, it will provide you with the contract address.

![result](/img/deploy-result.png)