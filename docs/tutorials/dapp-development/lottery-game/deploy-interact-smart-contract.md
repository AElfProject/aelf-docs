---
sidebar_position: 3
title: Deploy Your Smart Contract
description: Deploying and Interacting with smartcontract
---

### Preparing for deployment

#### Create A Wallet

To send transactions on the aelf blockchain, you must have a wallet.

Run this command to create aelf wallet.

```bash
aelf-command create
```

![result](/img/create_wallet_output.png)

#### Acquire Testnet Tokens(Faucet) for Development

To deploy smart contracts or execute on-chain transactions on aelf, you'll require testnet ELF tokens.

**Get ELF Tokens**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="cli" label="CLI" default>

Run the following command to get testnet ELF tokens from faucet. Remember to either export your wallet address and wallet password or replace $WALLET_ADDRESS and $WALLET_ADDRESS with your wallet address and wallet password respectively.

```bash
export WALLET_ADDRESS="YOUR_WALLET_ADDRESS"
curl -X POST "https://faucet.aelf.dev/api/claim?walletAddress=$WALLET_ADDRESS" -H "accept: application/json" -d ""
```

To check your wallet's current ELF balance:

```bash
export WALLET_PASSWORD="YOUR_WALLET_PASSWORD"
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

Go to this url `<https://faucet-ui.aelf.dev>`. Enter your address and click `Get Tokens`.

![result](/img/get-token-ui.png)

  </TabItem>
</Tabs>

The smart contract needs to be deployed on the chain before users can interact with it.

Run the following command to deploy a contract. Remember to export the path of LotteryGame.dll.patched to CONTRACT_PATH. For this you need to copy actual path src/bin/Debug/net6.0/LotteryGame.dll.patched of lottery-game directory. For example:

```bash
export CONTRACT_PATH = /Users/mohit/Desktop/aelf/lottery-game/src/bin/Debug/net6.0/LotteryGame.dll.patched
```

```bash
export CONTRACT_PATH="SRC_DIRECTORY_PATH" + /bin/Debug/net6.0/LotteryGame.dll.patched
aelf-deploy -a $WALLET_ADDRESS -p $WALLET_PASSWORD -c $CONTRACT_PATH -e https://tdvw-test-node.aelf.io/
```

Please wait for approximately 1 to 2 minutes. If the deployment is successful, it will provide you with the contract address.

![result](/img/deploy-result.png)

## 4. Interact with Your Deployed Smart Contract

### Approving Smart Contract Spending

```bash
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Approve
```

:::tip
ℹ️ Note: `ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx` is the contract address of `Multitoken Contract` on aelf Testnet Sidechain (tDVW).
:::

When prompted, enter the following parameters to approve the spending of 90 ELF tokens:

```terminal
Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <spender>: $CONTRACT_ADDRESS
? Enter the required param <symbol>: ELF
? Enter the required param <amount>: 9000000000
```

### Initializing Lottery Game Contract

```bash
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Initialize
```

### Depositing funds into the Lottery Game Contract

```bash
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Deposit
```

### Playing the Lottery Game

```bash
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Play
```

Let's check the `balance`

```bash
aelf-command call ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io GetBalance
```

You will be prompted for the following:

```terminal
Enter the required param <symbol>: ELF
Enter the required param <owner>: $WALLET_ADDRESS
```
