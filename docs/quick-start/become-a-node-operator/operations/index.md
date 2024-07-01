---
sidebar_position: 1
title: Operations

---

# Operations

## Steps to Become a  BP (Block Producer)

1. Set up nodes.
2. Participate in BP election using nodes.

**Note:**

- Voters stake ELF tokens to vote for their preferred nodes.

**Outcome of Election:**

- **Block Producer:** Elected based on top 2N+1.
- **Candidate Nodes:** Elected based on top 5*(2N+1).

## Nodes

### Set up Nodes

aelf doesn't have light nodes, so all nodes are full nodes. [Click here](#) to learn how to set up a full node.

**Note:** To become a BP, you need to run individual nodes for both MainChain aelf and all the SideChains.

### Participate in BP Election

Stake 100,000 ELF to join the node election. Ensure you have enough balance.

1. Go to the [Governance page](https://explorer.aelf.io/vote/election).
2. Click "Become a candidate node."
3. Stake 100,000 ELF.

### Users Vote for Nodes

Users can vote for candidate nodes at Governance -> Vote -> Node Table.

- The top 2N+1 nodes become BPs.
- The top 5*(2N+1) nodes become candidate nodes.
- N starts from 8 in 2022 and increases by 1 each year.

### BPs are Elected

BPs are elected every seven days, starting at 7:23 (UTC) every Thursday. If your node ranks in the top 2N+1, it becomes a BP in the next term. If it ranks between top 2N+1 and top 5*(2N+1), it becomes a candidate node. Check the current elected BPs in real-time on the election page.

## Simulate in Local Environment

To try setting up a node and running as a BP locally, follow the instructions to simulate it in the local environment.