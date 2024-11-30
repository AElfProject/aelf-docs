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

<Tabs>
<TabItem value="Linux and macOs" label="Linux and macOs" default>
```bash title="Terminal"
export WALLET_PASSWORD="YOUR_WALLET_PASSWORD"
```
</TabItem>

<TabItem value="Windows" label="Windows">
```bash title="Command Prompt"
$env:WALLET_PASSWORD = "YOUR_WALLET_PASSWORD"
```
</TabItem>
</Tabs>

#### Acquire Testnet Tokens (Faucet) for Development

To deploy smart contracts or execute on-chain transactions on aelf, you'll require testnet ELF tokens.

**Get ELF Tokens**

Go to https://faucet-ui.aelf.dev Enter your address and click `Get Tokens`.

![result](/img/get-token-ui.png)

**Deploy Smart Contract:**

The smart contract needs to be deployed on the chain before users can interact with it.

Run the following command to deploy a contract. Remember to export the path of DiceMaster.dll.patched to CONTRACT_PATH.

<Tabs>
<TabItem value="Linux and macOs" label="Linux and macOs" default>
```bash title="Terminal"
export CONTRACT_PATH=$(find ~+ . -path "*patched*" | head -n 1)
```

```bash title="Terminal"
aelf-deploy -a $WALLET_ADDRESS -p $WALLET_PASSWORD -c $CONTRACT_PATH -e https://tdvw-test-node.aelf.io/
```

</TabItem>

<TabItem value="Windows" label="Windows">
```bash title="Command Prompt"
$CONTRACT_PATH = Get-ChildItem -Recurse -Filter "*patched*" | Select-Object -First 1 -ExpandProperty FullName
$env:CONTRACT_PATH = $CONTRACT_PATH
```

```bash title="Command Prompt"
aelf-deploy -a $env:WALLET_ADDRESS -p $env:WALLET_PASSWORD -c $env:CONTRACT_PATH -e https://tdvw-test-node.aelf.io/
```

</TabItem>
</Tabs>

- Please wait for approximately 1 to 2 minutes. If the deployment is successful, it will provide you with the contract address.
  ![result](/img/deploy-result.png)

- Copy the smart contract address from the `address` field
  ![result](/img/Contract_Address.png)

- Export your smart contract address:

<Tabs>
<TabItem value="Linux and macOs" label="Linux and macOs" default>
  ```bash title="Terminal"
  export CONTRACT_ADDRESS="YOUR_SMART_CONTRACT_ADDRESS e.g. 2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS"
  ```
</TabItem>

<TabItem value="Windows" label="Windows">
  ```bash title="Command Prompt"
  $env:CONTRACT_ADDRESS="YOUR_SMART_CONTRACT_ADDRESS e.g. 2LUmicHyH4RXrMjG4beDwuDsiWJESyLkgkwPdGTR8kahRzq5XS"
  ```
</TabItem>
</Tabs>

:::tip
ℹ️ Note: You are to copy the smart contract address as we will be referencing it in the next steps!
:::

:::info
🎉 You have successfully deployed your dApp smart contract on the aelf testnet! In the next steps, we will be building the frontend components that allow us to interact with our deployed smart contract!
:::


