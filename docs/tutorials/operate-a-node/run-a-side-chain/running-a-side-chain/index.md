---
sidebar_position: 1
title: Run a Side Chain
description: Operational details.
---

# Running a Side Chain (After its Release)

This tutorial explains how to run a side chain node after it has been approved by the producers and released by the creator. After creating the side chain, producers need to run a side chain node.

## Prerequisites

- You already have a main-chain node running.
- The creation of the side chain has been approved and released.

## Important Note

The key-pair (account) used for mining on the side chain must be the same as the one used on the main-chain node. Both production nodes need to be launched with the same key-pair.

For more information about side chain creation, refer to the document in the [request-side-chain section](/tutorials/operate-a-node/run-a-side-chain/request-side-chain-creation/).

## Side Chain Configuration

### Configuration Files

Two configuration files must be placed in the configuration folder of the side chain, from which you will launch the node:

- `appsettings.json`
- `appsettings.SideChain.MainNet.json`

### Chain ID and Settings

After the release of the side chain creation request, the ChainId of the new side chain will be accessible in the SideChainCreatedEvent logged by the transaction that released it.

In this example, we will set up the side chain node with ChainId `tDVV` (1866392 converted to base58), connecting to Redis `db2`, and using web API port `1235`. Don’t forget to change the `account`, `password`, and `initial miner`.

#### appsettings.json

```json
{
  "ChainId": "tDVV",
  "ChainType": "SideChain",
  "NetType": "MainNet",
  "ConnectionStrings": {
    "BlockchainDb": "redis://localhost:6379?db=2",
    "StateDb": "redis://localhost:6379?db=2"
  },
  "Account": {
    "NodeAccount": "YOUR PRODUCER ACCOUNT",
    "NodeAccountPassword": "YOUR PRODUCER PASSWORD"
  },
  "Kestrel": {
    "EndPoints": {
      "Http": {
        "Url": "http://*:1235/"
      }
    }
  },
  "Consensus": {
    "MiningInterval": 4000,
    "StartTimestamp": 0
  }
}
```

#### appsettings.SideChain.MainNet.json

```json
{
  "CrossChain": {
    "Grpc": {
      "ParentChainServerPort": 5010,
      "ListeningPort": 5000,
      "ParentChainServerIp": "127.0.0.1"
    },
    "ParentChainId": "AELF"
  }
}
```

Change `ParentChainServerIp` and `ParentChainServerPort` depending on the listening address of your mainchain node.

## Launching the Side Chain Node

Open a terminal and navigate to the folder where you created the side chain configuration:

```bash
dotnet ../AElf.Launcher.dll
```

You can try out a few commands from another terminal to check if everything is fine, for example:

```bash
aelf-command get-blk-height -e http://127.0.0.1:1235
```
