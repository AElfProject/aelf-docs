---
sidebar_position: 2
title: Local Node Deployment
description: Deploy a local AElf node using Docker
---

# Local Node Deployment

**Description**: This tutorial demonstrates how to deploy and run a local AElf node using Docker for testing and development purposes.

**Purpose**: Shows you how to set up your own local AElf blockchain node for development and testing.

**Difficulty Level**: Easy

<!-- <div class="video-container">
<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="AElf Local Node Deployment Tutorial" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div> -->

## Step 1 - Setting up your development environment

### Prerequisites
- Install [Docker](https://docs.docker.com/get-docker/)
- Ensure you have at least 4GB of available RAM and 10GB of storage space
- **Note for Apple Silicon users:**
Ensure that Rosetta is installed, if it is not, use the following command:
    ```bash
    softwareupdate --install-rosetta
    ```
- Install aelf deploy tool
    ```bash
    dotnet tool install --global aelf.deploy
    ```
    aelf.deploy is a utility tool for deploying smart contracts on the aelf blockchain. Please remember to export PATH after installing aelf.deploy.
    
:::info
ℹ️ Note: If you have installed aelf.deploy and your terminal says that there is no such command available, please uninstall and install aelf.deploy.
:::

- Install aelf-command
<Tabs>
<TabItem value="Linux and macOs" label="Linux and macOs" default>
```bash title="Terminal"
sudo npm i -g aelf-command
```
</TabItem>

<TabItem value="Windows" label="Windows">
```bash title="Command Prompt"
npm i -g aelf-command
```
</TabItem>
</Tabs>

aelf-command is a CLI tool for interacting with the aelf blockchain, enabling tasks like creating wallets and managing transactions.
Provide required permissions while installing aelf-command globally.

## Step 2 - Building the Docker Image

### Clone the AElf Developer Tools Repository
Clone the AElf developer tools repository and navigate into the directory:

```bash
git clone https://github.com/AElfProject/aelf-developer-tools.git
cd aelf-developer-tools/local-test-node
docker build -t aelf/standalone-testing-node .
```

This will create a Docker image based on the AElf testnet node and include all necessary contract packages.

## Step 3 - Running the Node

Launch the node using Docker with the following command:

```bash
docker run --name aelf-node --restart always \
    -e NODE_ACCOUNT="W1ptWN5n5mfdVvh3khTRm9KMJCAUdge9txNyVtyvZaYRYcqc1" \
    -e NODE_ACCOUNT_PASSWORD="admin123" \
    -itd -p 6801:6801 -p 8000:8000 -p 5001:5001 -p 5011:5011 \
    --platform linux/amd64 \
    --ulimit core=-1 \
    --security-opt seccomp=unconfined --privileged=true \
    aelf/standalone-testing-node
```

This command:
- Creates a container named `aelf-node`
- Exposes necessary ports for node operation and API access
- Configures appropriate system settings for the node
- Runs the container in detached mode

### Port Mappings
- 6801: P2P network communication
- 8000: HTTP API endpoint
- 5001: gRPC endpoint
- 5011: Additional services

## Step 4 - Loading the Node Account

The node comes with a pre-configured account. Load it using aelf-command:

```bash
aelf-command load 1111111111111111111111111111111111111111111111111111111111111111
```

## Step 5 - Verifying Node Operation

1. Check if the node is running:
```bash
docker ps
```

2. View node logs:
```bash
docker logs aelf-node
```

3. Test the HTTP API:
```bash
curl http://localhost:8000/api/blockChain/chainStatus
```

## Step 6 - Deploying Your Smart Contract

After building your smart contract DLL, you can deploy it locally using the following command:

```bash
aelf-deploy -a $WALLET_ADDRESS -p $WALLET_PASSWORD -c $CONTRACT_PATH -e http://localhost:8000/
```

Make sure to replace `$WALLET_ADDRESS`, `$WALLET_PASSWORD`, and `$CONTRACT_PATH` with your actual wallet address, wallet password, and the path to your compiled contract DLL, respectively.

For more detailed information on creating and deploying smart contracts, refer to the [Hello World Contract tutorial](https://docs.aelf.com/quick-start/developers/hello-world-contract/).


## Configuration Details

The node uses several configuration files:

1. **appsettings.json**: Main configuration file containing:
   - Network settings
   - Consensus parameters
   - Database configurations
   - Logging settings

2. **appsettings.LocalTestNode.json**: Local environment specific settings
   - Logging levels
   - Database connections

3. **appsettings.MainChain.MainNet.json**: Chain-specific configurations
   - Economic parameters
   - Token settings
   - Cross-chain settings

:::tip
ℹ️ Note: For development purposes, the node uses in-memory databases by default. For production environments, you should configure persistent storage.
:::

## Common Issues and Solutions

1. **Docker Permission Issues**
```bash
# Add your user to the docker group
sudo usermod -aG docker $USER
# Then log out and back in
```

2. **Port Conflicts**
```bash
# Check if ports are in use
netstat -tulpn | grep -E '6801|8000|5001|5011'
# Stop conflicting services or modify port mappings
```

3. **Container Not Starting**
```bash
# Check detailed logs
docker logs aelf-node
# Remove and recreate container if needed
docker rm -f aelf-node
```

:::tip
ℹ️ Remember to wait a few minutes after starting the node for it to fully initialize and begin producing blocks.
:::

For more detailed information about node operation and configuration, please refer to the [AElf documentation](https://github.com/AElfProject/AElf).