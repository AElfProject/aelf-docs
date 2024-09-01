#### Create A Wallet

To send transactions on the aelf blockchain, you must have a wallet.

- Run this command to create aelf wallet.

```bash title="Terminal"
aelf-command create
```

![result](/img/create_wallet_output.png)

- You will be prompted to save your account, please do **save** your account as shown below:

```bash title="Terminal"
? Save account info into a file? (Y/n) Y
```

**Make sure to choose Y to save your account information.**

:::tip
ℹ️ Note: If you do not save your account information (by selecting n or N), do not export the wallet password. Only **proceed to the next** step if you have saved your account information.
:::

- Next, enter and confirm your password. Then export your wallet password as shown below:

```bash title="Terminal"
export WALLET_PASSWORD="YOUR_WALLET_PASSWORD"
```

#### Acquire Testnet Tokens (Faucet) for Development

To deploy smart contracts or execute on-chain transactions on aelf, you'll require testnet ELF tokens.

**Get ELF Tokens**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="cli" label="CLI" default>

**1. Get Testnet ELF Tokens:**

To receive testnet ELF tokens, run this command after replacing `$WALLET_ADDRESS` and `$WALLET_PASSWORD` with your wallet details:

```bash title="Terminal"
export WALLET_ADDRESS="YOUR_WALLET_ADDRESS"
curl -X POST "https://faucet.aelf.dev/api/claim?walletAddress=$WALLET_ADDRESS" -H "accept: application/json" -d ""
```

**2. Check ELF Balance:**

To check your ELF balance, use:

```bash title="Terminal"
aelf-command call ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io GetBalance
```

You will be prompted for the following:

```sh title="Terminal"
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

**Deploy Smart Contract:**

The smart contract needs to be deployed on the chain before users can interact with it.

Run the following command to deploy a contract. Remember to export the path of ToDoApp.dll.patched to CONTRACT_PATH.

```bash title="Terminal"
export CONTRACT_PATH=$(find ~+ . -path "*patched*" | head -n 1)
```

```bash title="Terminal"
aelf-deploy -a $WALLET_ADDRESS -p $WALLET_PASSWORD -c $CONTRACT_PATH -e https://tdvw-test-node.aelf.io/
```

- Please wait for approximately 1 to 2 minutes. If the deployment is successful, it will provide you with the contract address.
![result](/img/deploy-result.png)

- Copy the smart contract address from the `address` field
![result](/img/Contract_Address.png)

- Export your smart contract address:

    ```bash title="Terminal"
    export CONTRACT_ADDRESS="YOUR_SMART_CONTRACT_ADDRESS e.g. 2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS"
    ```

:::tip
ℹ️ Note: You are to copy the smart contract address as we will be referencing it in the next quest!
:::

:::info
🎉 You have successfully deployed your Voting dApp smart contract on the aelf testnet! In the next quest, we will be building the frontend components that allow us to interact with our deployed smart contract!
:::


