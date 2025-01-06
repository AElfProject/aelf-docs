---
sidebar_position: 4
title: NFT dApp
description: Very complex dApp 
---

**Description**: This tutorial provides a comprehensive guide to building an NFT dApp using aelf's multi-token contract. It covers the entire process from creating NFT collections to generating non-fungible tokens and enabling seamless transfers between token holders on the aelf blockchain.

**Purpose**: The tutorial aims to introduce users to the world of NFTs on aelf by demonstrating the use of aelf's multi-token contract for creating NFT collections, minting unique tokens, and performing token transfers. This hands-on approach allows developers to explore and harness the power of aelf's decentralized infrastructure for NFT development.

**Difficulty Level**: Moderate

<iframe width="100%" style={{"aspect-ratio": "16 / 9"}} src="https://www.youtube.com/embed/Y22jpyys-7s?si=ED3I6YASPDALHnn4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Step 1 - Setting up your development environment

import Setup from "../\_setup.md"

<Setup />

## Step 2 - Getting NFT Seed

In order to create an NFT collection on the aelf blockchain, the deployer wallet must have an **NFT SEED**.

- Visit [NFT Faucet](https://faucet-ui.aelf.dev/) to get your NFT SEED.

---

![result](/img/Seed.png)

- After the request is successfully processed, the requestor wallet will receive the **SEED**.

---

![result](/img/symbol.png)

---

- Please note this **SEED** symbol value, as it will be needed later while creating the NFT collection and NFT generation. This will become our **Token Symbol**.

import FrontendProjectSetup from "./\_frontend_project_setup.md"
import ConfigurePortkeyAndConnectWallet from "./\_configure_portkey_and_connect_wallet.md"
import CreateNftCollectionAndNftToken from "./\_create_nft.md"
import FetchNftData from "./\_fetch_nft_data.md";
import TransferNft from "./\_transfer_nft.md";
import RunApplication from "./\_run_application.md";
import Conclusion from "./\_conclusion.md"

<!-- smart contract integration in frontend application -->
## Step 3 - Interact with aelf's multi-token contract
<FrontendProjectSetup />
<ConfigurePortkeyAndConnectWallet />
<CreateNftCollectionAndNftToken />
<FetchNftData />
<TransferNft />
<RunApplication />

<!-- conclusion -->
<Conclusion />