---
sidebar_position: 2
title: Run a Mainnet Node
---
## How to Join the Mainnet

There are two ways to run an aelf node: using Docker (recommended) or running binaries from GitHub. Before starting, you need to install some tools and frameworks. Command line instructions are provided for most dependencies. For complex needs, see the Environment setup section.

### Steps to Set Up a Node

1. Execute the snapshot download script and load the snapshot into the database.
2. Download our template setting files and Docker run script.
3. Modify the appsettings according to your needs.
4. Run and check the node.

### Configuration Requirements

## Minimum Configuration:

* c5.xlarge or N2 instance: 4 vCPU, 8GiB RAM, 1TB storage, 5 Mbps bandwidth

## Recommended Configuration:

* c5.2xlarge or N2 instance: 8 vCPU, 16GiB RAM, 1TB storage, 100 Mbps bandwidth

**Note:**

* For non-block producing nodes, there is no requirement on the number of nodes.
* To become a BP, run individual nodes for both MainChain aelf and all SideChains.

**Time Syncing:** Ensure your server is time-synced via NTP to avoid syncing issues.

## Setup the Database

We support Redis and SSDB for storing node data. For mainnet, we provide snapshots for SSDB only. Configure two SSDB instances: one for the chain database and one for the state database (run on different machines for better performance).

### Import the Snapshot Data

1. Create a snapshot directory and navigate to it:

   ```sh title="Terminal"
   mkdir snapshot
   cd snapshot
   ```
2. Fetch the snapshot download script:

   ```sh title="Terminal"
   curl -O -s https://aelf-backup.s3.ap-northeast-2.amazonaws.com/snapshot/mainnet/download-mainchain-db.sh
   ```
3. Execute the script (specify a date if needed):

   ```sh title="Terminal"
   sh download-mainchain-db.sh
   ```
4. Restore the chain database from snapshot:

   ```sh
   tar xvzf aelf-mainnet-mainchain-chaindb-*.tar.gz
   stop your chain database instance (ssdb server)
   cp -r aelf-mainnet-mainchain-chaindb-*/* /path/to/install/chaindb/ssdb/var/
   start your chain database instance
   enter ssdb console (ssdb-cli) use the "info" command to confirm that the data has been imported)
   ```
5. Restore the state database from snapshot:

   ```sh
   tar xvzf aelf-mainnet-mainchain-statedb-*.tar.gz
   stop your state database instance (ssdb server)
   cp -r aelf-mainnet-mainchain-statedb-*/* /path/to/install/statedb/ssdb/var/
   start your state database instance
   enter ssdb console (ssdb-cli) use the "info" command to confirm that the data has been imported)
   ```

## Node Configuration

### Generating the Node's Account

1. Install the `aelf-command` npm package:

   ```sh title="Terminal"
   npm i -g aelf-command
   ```
2. Create an account/key-pair:

   ```sh title="Terminal"
   aelf-command create
   ```

   Follow the prompts to set a password and save the account info.

### Prepare Node Configuration

1. Download the settings template and Docker script:

   ```sh title="Terminal"
   cd /tmp/
   wget https://github.com/aelfProject/aelf/releases/download/v1.6.0/aelf-mainnet-mainchain.zip
   unzip aelf-mainnet-mainchain.zip
   mv aelf-mainnet-mainchain /opt/aelf-node
   ```
2. Update the `appsettings.json` file with your account information:

   ```json title="appsettings.json"
   {
       "Account": {
           "NodeAccount": "2Ue31YTuB5Szy7cnr3SCEGU2gtGi5uMQBYarYUR5oGin1sys6H",
           "NodeAccountPassword": "********"
       },
       "ConnectionStrings": {
           "BlockchainDb": "redis://your chain database server ip address:port",
           "StateDb": "redis://your state database server ip address:port"
       },
       "Network": {
           "BootNodes": [
               "xxx.xxxx.xxx.xxx:6800"
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

## Running a Full Node with Docker

1. Pull aelf’s Docker image and start the node:

   ```sh title="Terminal"
   docker pull aelf/node:mainnet-v1.6.0
   cd /opt/aelf-node
   sh aelf-node.sh start aelf/node:mainnet-v1.6.0
   ```
2. To stop the node:

   ```sh title="Terminal"
   sh aelf-node.sh stop
   ```

## Running a Full Node with the Binary Release

1. Install the .NET Core SDK (version 6.0).
2. Get the latest release and run the node:

   ```sh title="Terminal"
   cd /tmp/
   wget https://github.com/aelfProject/aelf/releases/download/v1.6.0/aelf.zip
   unzip aelf.zip
   mv aelf /opt/aelf-node/
   cd /opt/aelf-node
   dotnet aelf/aelf.Launcher.dll
   ```

## Running a Full Node with the Source

1. Ensure the code version is consistent (aelf v1.6.0).
2. Compile on an Ubuntu Linux machine (recommended Ubuntu 18.04.2 LTS) with .NET Core SDK version 6.0.

## Check the Node

Run the following command to check the node's block height:

```sh title="Terminal"
aelf-command get-blk-height -e http://your node ip address:port
```

### Running Side-Chains

1. **Download and Restore Snapshot Data** (steps are the same as in Setup the Database).
2. **Run Side-Chain Node:**

   ```sh title="Terminal"
   cd /tmp/
   wget https://github.com/aelfProject/aelf/releases/download/v1.6.0/aelf-mainnet-sidechain1.zip
   unzip aelf-mainnet-sidechain1.zip
   mv aelf-mainnet-sidechain1 /opt/aelf-node
   ```
3. **Update appsettings.SideChain.MainNet.json with your node information:**

   ```json title="appsettings.SideChain.MainNet.json"
   {
       "CrossChain": {
           "Grpc": {
               "ParentChainServerPort": 5001,
               "ParentChainServerIp": "your mainchain ip address",
               "ListeningPort": 5011
           },
           "ParentChainId": "aelf",
           "Economic": {
               "SymbolListToPayTxFee": "WRITE,READ,STORAGE,TRAFFIC",
               "SymbolListToPayRental": "CPU,RAM,DISK,NET"
           }
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

Ensure P2P ports are open and configured correctly for node communication.

````
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
````
