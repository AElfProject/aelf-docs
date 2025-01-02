
For this NFT contract, you don't need to write a separate contract. Instead, you'll use an already deployed Multi-Token Contract with the following functions.

### 4.1 Creating an NFT Collection on MainChain

Open your terminal and run:

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Create
```

- Replace the placeholder values with your actual details.

:::tip
ℹ️ Note: `JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE` is the contract address of the Multi-Token Contract on **aelf Testnet Mainchain**.
:::

### 4.2 Validate TokenInfoExist on MainChain

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io ValidateTokenInfoExists
```

:::tip
ℹ️ Note: `transactionId` Note down the trasnactionId from the above transaction will be used in **step 3**.
:::

### 4.3 Create NFT Collection on dAppChain

:::tip
ℹ️ Note: This step cannot be executed via the command line interface (CLI).
:::

```bash
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io CrossChainCreateToken
```

```bash
transactionBytes = Buffer.from(signedTx, "hex").toString("base64")
```

:::tip
ℹ️ Note: Replace the placeholder values with your actual details.
:::

:::tip
ℹ️ Note: `ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx` is the contract address of the Multi-Token Contract on **aelf Testnet dAppChain**.
:::

### 4.4 Create NFT Token on MainChain

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Create
```

### 4.5 Validate Nft Token on MainChain

```bash
aelf-command send JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io ValidateTokenInfoExists
```

### 4.6 Create NFT Token on dAppChain

```bash
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io CrossChainCreateToken
```

```bash
transactionBytes = Buffer.from(signedTx, "hex").toString("base64")
```

### 4.7 Issue NFT Token on dAppChain

```bash
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Issue
```

### 4.8 Transfer NFT

```bash
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://aelf-test-node.aelf.io Transfer
```