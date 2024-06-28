---
sidebar_position: 1
title: Run a Testnet Node
---

# How to Join the Testnet

You can run an aelf node using Docker (recommended) or GitHub binaries. 
Before starting, install the necessary tools and frameworks. Detailed instructions are in the environment setup section.

## Steps to Set Up a Node:

1. Download and load the database snapshot.
2. Download template settings and Docker run script.
3. Modify appsettings as needed.
4. Run and check the node.

## Minimum Configuration:

- c5.large or N2 instance: 2 vCPU, 4GiB RAM, 800GiB storage, 5 Mbps internet bandwidth

## Recommended Configuration:

- c5.xlarge or N2 instance: 4 vCPU, 8GiB RAM, 800GiB storage, 100 Mbps internet bandwidth

**Note:** For testing or dApp deployment, run a SideChain node only. Use the same configuration for multiple nodes on both MainChain and SideChain.

**Time Syncing:** Ensure your server is time-synced via NTP to avoid syncing issues.

## Setup the Database

We support Redis and SSDB. For testnet, we use SSDB snapshots. Configure two SSDB instances: one for chain database and one for state database.

## Import the Snapshot Data

1. **Download Snapshot:**

    ```sh
    mkdir snapshot
    cd snapshot
    curl -O -s https://aelf-node.s3-ap-southeast-1.amazonaws.com/snapshot/testnet/download-mainchain-db.sh
    sh download-mainchain-db.sh
    ```

2. **Restore Chain Database:**

    ```sh
    tar xvzf aelf-testnet-mainchain-chaindb-*.tar.gz
    stop your chain database instance (ssdb server)
    cp -r aelf-testnet-mainchain-chaindb-*/* /path/to/install/chaindb/ssdb/var/
    start your chain database instance
    ssdb-cli info
    ```

3. **Restore State Database:**

    ```sh
    tar xvzf aelf-testnet-mainchain-statedb-*.tar.gz
    stop your state database instance (ssdb server)
    cp -r aelf-testnet-mainchain-statedb-*/* /path/to/install/statedb/ssdb/var/
    start your state database instance
    ssdb-cli info
    ```

## Node Configuration

### Generate Node Account

1. **Install aelf-command:**

    ```sh
    npm i -g aelf-command
    ```

2. **Create Account:**

    ```sh
    aelf-command create
    ```

    Follow the prompts and save the account info.

### Prepare Node Configuration

1. **Download Settings Template and Docker Script:**

    ```sh
    cd /tmp/
    wget https://github.com/aelfProject/aelf/releases/download/v1.0.0-rc1/aelf-testnet-mainchain.zip
    unzip aelf-testnet-mainchain.zip
    mv aelf-testnet-mainchain /opt/aelf-node
    ```

2. **Update appsettings.json:**

    ```json
    {
        "Account": {
            "NodeAccount": "your-node-account",
            "NodeAccountPassword": "your-password"
        },
        "ConnectionStrings": {
            "BlockchainDb": "redis://chain-db-server:port",
            "StateDb": "redis://state-db-server:port"
        },
        "Network": {
            "BootNodes": [
                "node-ip:6800"
            ],
            "ListeningPort": 6800
        },
        "CrossChain": {
            "Grpc": {
                "LocalServerPort": 5000
            }
        }
    }
    ```

## Running a Full Node

### With Docker

1. **Run Node:**

    ```sh
    docker pull aelf/node:testnet-v1.6.0
    cd /opt/aelf-node
    sh aelf-node.sh start aelf/node:testnet-v1.6.0
    ```

2. **Stop Node:**

    ```sh
    sh aelf-node.sh stop
    ```

### With Binary Release

1. **Install .NET Core SDK 6.0.**
2. **Download and Run Node:**

    ```sh
    cd /tmp/
    wget https://github.com/aelfProject/aelf/releases/download/v1.0.0-rc1/aelf.zip
    unzip aelf.zip
    mv aelf /opt/aelf-node/
    cd /opt/aelf-node
    dotnet aelf/aelf.Launcher.dll
    ```

## Check the Node

To check the node, query its current block height:

```sh
aelf-command get-blk-height -e http://your-node-ip:port
```

## Running Side-Chains

1. **Download and Restore Snapshot Data.**
2. **Run Side-Chain Node:**

    ```sh
    cd /tmp/
    wget https://github.com/aelfProject/aelf/releases/download/v1.0.0-rc1/aelf-testnet-sidechain1.zip
    unzip aelf-testnet-sidechain1.zip
    mv aelf-testnet-sidechain1 /opt/aelf-node
    ```

3. **Update appsettings.SideChain.TestNet.json with your node information:**

    ```json
    {
        "CrossChain": {
            "Grpc": {
                "ParentChainServerPort": 5000,
                "ParentChainServerIp": "mainchain-ip",
                "ListeningPort": 5001
            },
            "ParentChainId": "aelf"
        },
        "Network": {
            "BootNodes": [
                "sidechain-bootnode-ip:6800"
            ],
            "ListeningPort": 6800
        }
    }
    ```

### Note

Each side chain has its own P2P network, add the mainnet sidechain nodes as peer:

    ```sh
    bootnode → ["xxx.xxxx.xxx.xxx:6800", "..."]
    ```

    ```json
    {
        "Network": {
            "BootNodes": [
                "Add the right boot node according to sidechain"
            ],
            "ListeningPort": 6800
        }
    }
    ```