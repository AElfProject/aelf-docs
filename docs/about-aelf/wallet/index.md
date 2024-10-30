---
sidebar_position: 3
title: Wallet
description: Supported wallets
---

<head>
  <html itemscope itemtype="https://schema.org/FAQPage" />
</head>

### 1. Can I use Metamask wallet on aelf blockchain? What wallets are supported on aelf blockchain? 

:::faq[Can I use Metamask wallet on aelf blockchain? What wallets are supported on aelf blockchain?]

As of the latest information, MetaMask does not natively support the aelf blockchain. Currently, aelf is not EVM compatible and MetaMask is primarily designed for Ethereum and Ethereum-compatible chains.

Wallets that support the aelf blockchain include [Portkey Wallet](https://portkey.finance/). As the first account abstraction (AA) wallet in aelf's ecosystem, Portkey Wallet facilitates the migration of users, developers, and projects from Web2 to Web3, utilising a decentralised identity (DID) solution.

For the most accurate and up-to-date information on wallet support, it's recommended to check the official [aelf website](https://www.aelf.com/). 

:::

### 2. What if my wallet is not supported on aelf blockchain?

:::faq[What if my wallet is not supported on aelf blockchain?]

If your wallet is not supported on the aelf blockchain, you have two options—you can either create an account on a supported wallet or use an exchange account.

Use a Supported Wallet:
  - **Create a New Wallet**: You can create a new wallet using [Portkey Wallet](https://portkey.finance/).
  - **Cross-Chain Transfer**: Connect your wallets to [ETransfer](https://app.etransfer.exchange/) or [eBridge](https://ebridge.exchange/) to initiate the cross-chain transfer of your ELF tokens from Ethereum or BSC to the aelf blockchain.

Use an Exchange:
  - **Exchange Account**: You can use an account provided by a centralised exchange that supports aelf. These exchanges included Binance, Bithumb, Upbit, HTX, OKX, Gate.io, or MEXC.

We highly recommend using a supported Web3 wallet like Portkey as it provides a non-custodial solution to token management on aelf blockchain. As they say, not your keys, not your crypto.

:::

### 3. If I want to send ELF from a crypto exchange like Binance and OKEX to my Portkey wallet, should I select MainChain or dAppChain on my Portkey wallet?

:::faq[If I want to send ELF from a crypto exchange like Binance and OKEX to my Portkey wallet, should I select MainChain or dAppChain on my Portkey wallet?]

When sending ELF tokens from a crypto exchange like Binance or OKEX to your Portkey wallet, you should select the MainChain address in your Portkey wallet.

The MainChain is generally where the ELF tokens are held when they are on major exchanges, and selecting the MainChain ensures that the tokens are received correctly in your Portkey wallet.

:::

### 4. What if I erraneously send ELF from a crypto exchange like Binance and OKEX to the dAppChain in my Portkey wallet?

:::faq[What if I erraneously send ELF from a crypto exchange like Binance and OKEX to the dAppChain in my Portkey wallet?]

This is unlikely to happen because exchanges that allow aelf chain mainnet withdrawal of ELF requires the prefix (ie. ELF) and suffix (i.e. AELF for mainchain / tDVV for dappChain) to be first excluded from your aelf chain wallet recipient address before the exchange executes the transfer. If you enter your aelf chain wallet recipient address which includes the prefix (i.e. ELF) and suffix (i.e. AELF for mainchain / tDVV for dAppChain), the exchange will indicate an error in the address format and you will have to input the correct address again before the transfer can be made. 

:::

### 5. Do MainChain and dAppChain in my Portkey wallet have different addresses?

:::faq[Do MainChain and dAppChain in my Portkey wallet have different addresses?]

In your Portkey wallet, the MainChain and dAppChain typically share the same base address, but they differ by the suffix (i.e. AELF for mainchain / tDVV for dAppChain). 

However, if you are still using the deprecated version of Portkey Wallet, the MainChain and dAppChain addresses might be different for the same account.

:::

### 6. Can I send ELF from the dAppChain in my Portkey wallet to a crypto exchange like Binance and OKEX?

:::faq[Can I send ELF from the dAppChain in my Portkey wallet to a crypto exchange like Binance and OKEX?]

No, you cannot directly send ELF from the dAppChain in your Portkey wallet to a crypto exchange like Binance or OKEX. Most exchanges, including Binance and OKEX, only support ELF tokens on the MainChain.

If you have ELF tokens on the dAppChain in your Portkey wallet and wish to transfer them to an exchange, you should first transfer the tokens from the dAppChain to the MainChain within your wallet. Once the tokens are on the MainChain, you can then send them to your exchange account. This ensures that the tokens are correctly received by the exchange.

:::

### 7. What if I erraneously send ELF from the dAppChain in my Portkey wallet to a crypto exchange like Binance and OKEX? What should I do?

:::faq[What if I erraneously send ELF from the dAppChain in my Portkey wallet to a crypto exchange like Binance and OKEX? What should I do?]

If you mistakenly send ELF from the dAppChain in your Portkey wallet to a crypto exchange like Binance or OKEX, the tokens will likely not be credited to your exchange account because these exchanges typically only support ELF on the MainChain. Here's what you should do:

#### Check the Transaction Details:

Verify the transaction on the blockchain explorer to confirm that the tokens were sent to the correct address on the exchange but from the dAppChain.

#### Contact the Exchange's Customer Support:

Immediately contact the customer support team of the exchange (e.g., Binance or OKEX) and explain the situation. Provide them with the transaction ID, address, and other relevant details.

Some exchanges may be able to manually recover the funds, but this process can be complicated and may not always be successful.

#### Prevent Future Mistakes:

Ensure that you always transfer ELF tokens to the MainChain before sending them to an exchange.

Double-check the chain selection and address before confirming any transaction.

By following these steps, you may be able to recover the tokens or at least understand the options available to you.

:::

### 8. What does tDVV or tDVW in dAppChain mean and do I need to care?

:::faq[What does tDVV or tDVW in dAppChain mean and do I need to care?]

In simpler terms, "tDVV" is just a special code that uniquely identifies the first dAppChain in the aelf network. "tDVW" uniquely identifies the second dAppChain. You do not need to care.

:::