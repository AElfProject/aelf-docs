---
sidebar_position: 2
title: aelf Deploy Tool
description: aelf-deploy simplifies contract updates.
---

# aelf Deploy Tool

## 1. Introduction

The aelf-deploy tool simplifies the deployment and updating of aelf contracts using your command prompt.

## 2. Setting up

To install the aelf-deploy tool globally, use the following command:
```bash title="Terminal"
dotnet tool install --global aelf.deploy
```

## 3. Using aelf-deploy

### Example Usage

Deploy a contract with the following command:
```bash title="Terminal"
aelf-deploy -a $WALLET_ADDRESS -p $WALLET_PASSWORD -c $CONTRACT_PATH/$CONTRACT_FILE.dll.patched -e https://tdvw-test-node.aelf.io/
```

### Command Options

-a: Address of the wallet.  
-p: Password of keystore file.    
-c: Location of the contract DLL.   
-u: Update contract (true/false). Default is false.    
-e: Endpoint. Default is 127.0.0.1:8000.   
-i: Include audit (true/false). Default is false (deploy without audit).  
-s: Salt, used to calculate contract addresses. If not provided, it defaults to the hash of the contract code.   
-o: Set to false if the deployer is an EOA address. Default is false.  
-t: Specify the contract address to update.  
-k: Private Key.  

By following these instructions, you can easily deploy and manage aelf contracts using the aelf-deploy tool.