---
sidebar_position: 4
title: Interact with the Smart Contract
description: Interacting with the smartcontract
---

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
? Enter the required param <spender>: "INSERT_YOUR_CONTRACT_ADDRESS_HERE"
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
