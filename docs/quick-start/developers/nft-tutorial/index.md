---
sidebar_position: 4
title: NFT Tutorial Contract
description: Moderate smart contract
---

**Description**: This tutorial demonstrates using a multi-token contract for NFT collection creation, NFT creation, NFT transfers, and NFT burning to eventually create a basic NFT.

**Purpose**: To introduce you to multi-token contracts, NFT creation, and transfer in smart contracts.

**Difficulty Level**: Moderate

## Step 1 - Setting up your development environment

import Setup from "../\_setup.md"

<Setup />

## Step 2 - Getting NFT Seed

For creating an NFT collection, the deployer wallet must have an **NFT SEED**.

- Visit [NFT Faucet](https://faucet-ui.aelf.dev/) to get your NFT SEED.

---

![result](/img/Seed.png)

- You will receive the **SEED** in your wallet.

---

![result](/img/symbol.png)

---

- Please note down this symbol value, as we will need it later when creating the NFT collection and NFT. This will become our **Token Symbol**.

## Step 3 - Interact with Deployed Multi-Token Smart Contract

For this NFT contract, you don't need to write a separate contract. Instead, you'll use an already deployed Multi-Token Contract with the following functions.

### Creating an NFT Collection

Open your terminal and run:

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Create --params '{"tokenName": "NFT Name", "symbol": "ULJVFKQGKX-0", "totalSupply": 1, "decimals": 18, "issuer": "address", "isBurnable": true, "lockWhiteList": [], "issueChainId": AELF, "externalInfo": {}, "owner": "address"}'
```

- Replace the placeholder values with your actual details.

:::tip
ℹ️ Note: `JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE` is the contract address of the Multi-Token Contract on aelf Testnet AELF.
:::

    ### Creating an NFT for the NFT Collection

Run the following command:

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Create --params '{"tokenName": "NFT Name", "symbol": "ULJVFKQGKX-1", "totalSupply": 20000, "decimals": 18, "issuer": "address", "isBurnable": true, "lockWhiteList": [], "issueChainId": AELF, "externalInfo": {}, "owner": "address"}'
```

- Replace the placeholder values with your actual details.

### Issuing an NFT to an Address

Run the following command:

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Issue --params '{"symbol": "ULJVFKQGKX-1", "amount": 12, "memo": "Test", "to": "address"}'
```

### Transferring an NFT

Run the following command:

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Transfer --params '{"symbol": "ULJVFKQGKX-1", "amount": 12, "memo": "Test", "to": "address"}'
```

You will be prompted for the following:

```bash
Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <value>: 20000
```

### NFT Balance for an Address

Run the following command:

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io GetBalance --params '{"symbol": "ULJVFKQGKX-1", "owner": "address"}'
```

### Burning the NFT

Run the following command:

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Burn --params '{"symbol": "ULJVFKQGKX-0", "amount": 12}'
```

### Getting NFT Details

Run the following command:

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io GetTokenInfo --params '{"symbol": "ULJVFKQGKX-0"}'
```
