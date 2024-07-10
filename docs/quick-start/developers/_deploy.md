#### Create A Wallet

To send transactions on the aelf blockchain, you must have a wallet.

Run this command to create aelf wallet.

```bash
aelf-command create
```

![result](/img/create_wallet_output.png)

You will be prompted to save your account, please do **save** your account as shown below:

```bash
? Save account info into a file? (Y/n) Y
```

Next, enter and confirm your password. Then export your wallet password as shown below:

```bash
export WALLET_PASSWORD="YOUR_WALLET_PASSWORD"
```

#### Acquire Testnet Tokens (Faucet) for Development

To deploy smart contracts or execute on-chain transactions on aelf, you'll require testnet ELF tokens.

**Get ELF Tokens**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="cli" label="CLI" default>

Run the following command to get testnet ELF tokens from faucet. Remember to either export your wallet address and wallet password or replace `$WALLET_ADDRESS` and `$WALLET_PASSWORD` with your wallet address and wallet password respectively.

```bash
export WALLET_ADDRESS="YOUR_WALLET_ADDRESS"
curl -X POST "https://faucet.aelf.dev/api/claim?walletAddress=$WALLET_ADDRESS" -H "accept: application/json" -d ""
```

To check your wallet's current ELF balance:

```bash
aelf-command call ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io GetBalance
```

You will be prompted for the following:

```sh
Enter the required param <symbol>: ELF
Enter the required param <owner>: **$WALLET_ADDRESS**
```

You should see the result displaying your wallet's ELF balance.

  </TabItem>
  <TabItem value="web" label="Web" default>

Go to https://faucet-ui.aelf.dev Enter your address and click `Get Tokens`.

![result](/img/get-token-ui.png)

  </TabItem>
</Tabs>

The smart contract needs to be deployed on the chain before users can interact with it.

Run the following command to deploy a contract. Remember to export the path of LotteryGame.dll.patched to CONTRACT_PATH.

```bash
export CONTRACT_PATH=$(find ~+ . -path "*patched*" | head -n 1)
```

```bash
aelf-deploy -a $WALLET_ADDRESS -p $WALLET_PASSWORD -c $CONTRACT_PATH -e https://tdvw-test-node.aelf.io/
```

Please wait for approximately 1 to 2 minutes. If the deployment is successful, it will provide you with the contract address.

![result](/img/deploy-result.png)

Export your smart contract address:

```bash
export CONTRACT_ADDRESS="YOUR_SMART_CONTRACT_ADDRESS e.g. 2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS"
```
