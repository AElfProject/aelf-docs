---
sidebar_position: 6
title: aelf Testnet Faucet
description: Get your free test aelf tokens.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# aelf Faucet

## 1. Introduction

The aelf Testnet Faucet is a vital resource for developers working on the aelf blockchain. It provides free test tokens, particularly, ELF (native aelf token), Token type SEED token (for creation of new token), NFT type SEED token (for creation of new NFT collection), which are essential for deploying and testing smart contracts, running transactions, and exploring the functionalities of aelf without the risk of losing real assets. By using the faucet, developers can ensure their applications function correctly and efficiently before deploying them to the mainnet.

## 2. Using aelf Faucet

### 2.1 Getting Testnet ELF Tokens
To deploy smart contracts or execute on-chain transactions on aelf, you'll require testnet ELF tokens.

**Get ELF Tokens**

<Tabs>
  <TabItem value="cli" label="CLI" default>

Run the following command to get testnet ELF tokens from faucet. Remember to either export your wallet address or replace $WALLET_ADDRESS with your wallet address.

```bash title="Terminal"
curl -X POST "https://faucet.aelf.dev/api/claim?walletAddress=$WALLET_ADDRESS" -H "accept: application/json" -d ""
```
To check your wallet's current ELF balance:
```bash title="Terminal"
aelf-command call ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io GetBalance
```
You will be prompted for the following:  
Enter the required param \<symbol\>: **ELF**  
Enter the required param \<owner\>: **$WALLET_ADDRESS**

You should see the Result displaying your wallet's ELF balance.

  </TabItem>
  <TabItem value="web" label="Web" default>

Go to this url [https://faucet-ui.aelf.dev](https://faucet-ui.aelf.dev). Enter your address and click `Get Tokens`.

![result](/img/get-token-ui.png)

  </TabItem>
</Tabs>

### 2.2 Getting Testnet Token Type SEED Token

To acquire testnet Token type SEED for creating fungible or non-fungible tokens on aelf testnet.

**Get Token Type Seed Token**

<Tabs>
  <TabItem value="cli" label="CLI" default>

Run the following command to get testnet SEED token from faucet. Remember to either export your wallet address or replace $WALLET_ADDRESS with your wallet address.

```bash title="Terminal"
curl -X POST "https://faucet.aelf.dev/api/claim-seed?walletAddress=$WALLET_ADDRESS" -H "accept: application/json" -d ""
```

  </TabItem>
  <TabItem value="web" label="Web" default>

Go to this url [https://faucet-ui.aelf.dev](https://faucet-ui.aelf.dev). Click on the dropdown to select "Token Seed". Enter your address and click `Get Seed`.

![result](/img/get-testnet-token-seed.png)

  </TabItem>
</Tabs>

### 2.3 Getting Testnet NFT Type SEED Token

To acquire testnet NFT type SEED for creating fungible or non-fungible tokens on aelf testnet.

**Get NFT Type Seed Token**

<Tabs>
  <TabItem value="cli" label="CLI" default>

Run this command to get testnet NFT type SEED token from faucet. Remember to either export your wallet address or replace $WALLET_ADDRESS with your wallet address.

```bash title="Terminal"
curl -X POST "https://faucet.aelf.dev/api/claim-nft-seed?walletAddress=$WALLET_ADDRESS" -H "accept: application/json" -d ""
```

  </TabItem>
  <TabItem value="web" label="Web" default>

Go to this url [https://faucet-ui.aelf.dev](https://faucet-ui.aelf.dev). Click on the dropdown to select "NFT Seed". Enter your address and click `Get Seed`.

![result](/img/get-testnet-nft-seed.png)

  </TabItem>
</Tabs>