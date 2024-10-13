---
sidebar_position: 2
title: aelf Studio
description: A brief guide to installing, creating, and deploying aelf smart contracts in VS Code.
---

# aelf Studio

## 1. Introduction

**aelf Studio** is an extension for Visual Studio Code (VS Code). It helps you write and deploy smart contracts (which are like programs) on the AElf blockchain. This guide will show you how to set it up, create a simple contract, and deploy it.

## 2. Setting Up aelf Studio

### What you need before you start:

- **VS Code**: Make sure you have VS Code installed. You can download it [here](https://code.visualstudio.com/).
- **.NET SDK**: You also need the .NET SDK to write smart contracts. Download it [here](https://dotnet.microsoft.com/en-us/download).

### Steps to install aelf Studio:

- **Open VS Code:**
   - Start the Visual Studio Code program.

   ![vs-code-aelf-studio](/img/vs-code-aelf-studio.png)

- **Install the AElf Studio Extension:**
   - On the left side of VS Code, click the Extensions icon.

   ![click-extention-aelf-studio](/img/click-extention-aelf-studio.png)


   - In the search box, type **“aelf-studio”**.

   ![search-extention-aelf-studio](/img/search-extention-aelf-studio.png)


   - Find the extension and click **Install**.

   ![click-install-aelf-studio](/img/click-install-aelf-studio.png)


   - If VS Code asks you to reload, click Reload.

- **Check if it’s installed**:

   - You should see the aelf icon at the bottom right corner of the screen in VS Code.

   ![bottom-icon-aelf-studio](/img/bottom-icon-aelf-studio.png)

## 3. How to Use aelf Studio

### Creating a new project:


- **Make a new folder:**
  - Open the terminal in VS Code (Click **Terminal** at the top and choose **New Terminal**). 
  - Type `mkdir hello-world` and press enter. This makes a new folder called "hello-world".
  
    ![mk-dir-aelf-studio](/img/mk-dir-aelf-studio.png)

  - Type `cd hello-world` and press enter. This will change the directory to hello-world folder.

    ![cd-aelf-studio](/img/cd-aelf-studio.png)

  - Then type `code .` to open that folder in VS Code.

    ![code-aelf-studio](/img/code-aelf-studio.png)

- **Create a new smart contract:**
  - In the terminal, type `dotnet new aelf -n HelloWorld` and press enter. This will create a basic smart contract project for you.

    ![create-hello-world-aelf-studio](/img/create-hello-world-aelf-studio.png)

- **Build the contract:**
  - Go to the source folder by typing `cd src`.
  - Then type `dotnet build` to build (compile) the contract.

    ![create-build-aelf-studio](/img/create-build-aelf-studio.png)

### Get test tokens:

- **Get tokens:**

  - Click the **aelf icon** in the bottom right corner.
  - Select **Get Testnet Tokens** from the menu.
    
    ![get-token-menu-aelf-studio](/img/get-token-menu-aelf-studio.png)

  - Follow the steps on the screen to get some tokens for testing.


### Deploy the smart contract:

- **Deploy the contract:**

  - Click the **aelf icon** again in the bottom right corner.
  - Select **Deploy from Local** from the menu.

    ![deploy-from-local-aelf-studio](/img/deploy-from-local-aelf-studio.png)

  - Follow the instructions to deploy your contract to the testnet (this is like a sandbox for testing).
  
- **See the contract on aelf Scan:**

  - After deploying, you can view your contract on [aelf Scan](https://explorer-test-side02.aelf.io/), which shows information about contracts on the blockchain.



## 4. aelf Studio Features

- **Contract Templates:** Quickly create smart contracts with built-in templates.
- **Easy Build & Deploy:** Build and deploy contracts directly from VS Code.
- **Testnet Tokens:** Get test tokens for free to try out your contract.
- **View Contracts:** After deploying, you can check your contract on the AElf blockchain using AElf Scan.

### Conclusion

aelf Studio makes it easy to create and deploy smart contracts on the AElf blockchain. Follow this guide to get started quickly and explore the AElf platform!