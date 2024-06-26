---
sidebar_position: 1
title: Introduction
---

# Introduction

One of the major issues with current blockchain systems is scalability. This is mainly due to **congestion problems** in existing blockchains. The core problem is that when a single chain needs to sequentially order and process transactions, a popular dApp consuming a lot of resources can negatively impact other dApps.

To address this issue, aelf introduced side chains in its initial design. The concept is that each side-chain handles one or more similar business scenarios, distributing different tasks across multiple chains to improve overall processing efficiency.

## Key Points:

- **Independent and Specialized**: Side-chains are designed to be independent and specialized, ensuring that the dApps running on them perform efficiently and smoothly.
- **Network Link**: There is a network link between the main-chain node and side-chain nodes, with communication indirectly facilitated through a Merkle root.

![Introduction Topology](/img/introduction-topology.webp)

_The diagram above illustrates the conceptual idea behind side chains._

Side chains are isolated but still need a way to interact with each other. To enable cross-chain verification scenarios, aelf introduces a communication mechanism through **Merkle roots** and **indexing**.

## Overview

The following sections of this documentation will provide:

- An overview of the architecture of aelf's side chains.
- A guide explaining how to set up a main-chain and a side chain node.
