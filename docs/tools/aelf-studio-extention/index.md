---
sidebar_position: 2
title: aelf Studio
description: A brief guide to installing, creating, and deploying aelf smart contracts in VS Code.
---

# aelf Studio

## 1. Introduction

**aelf Studio** is an extension for Visual Studio Code (VS Code). It helps you write and deploy smart contracts (which are like programs) on the AElf blockchain. This guide will show you how to set it up, create a simple contract, and deploy it.

## 2. aelf Studio Features

- **Build Smart Contracts:** Compile your aelf smart contracts directly within VS Code using simple terminal commands.
- **Test Smart Contracts:** Run tests and validate the functionality of your smart contracts before deployment.
- **Get Testnet Tokens:** Easily claim testnet tokens for testing your contracts without leaving your development environment.
- **Deploy Smart Contracts:** Deploy your contracts to the aelf testnet or mainnet with a few clicks.
- **Check Transaction Status:** Track the status of contract deployment and other blockchain transactions directly from the extension.
- **AI Audits:** Leverage built-in AI tools to audit your smart contracts for vulnerabilities and potential issues before deployment.
- **Deploy from Local:** Deploy your locally built smart contracts directly to the aelf blockchain.

## 3. Setting Up aelf Studio

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

## 4. How to Use aelf Studio

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

### Test Smart Contract:

  - Click the **aelf icon** in the bottom right corner.
  - Select **Test Smart Contract** from the menu.
    
    ![test-build-aelf-studio](/img/test-build-aelf-studio.png)

  - You will again get one more select menu option. Please select respective test file for Testing the contract.

    ![text-build-select-file-aelf-studio](/img/text-build-select-file-aelf-studio.png)

  - Once test is completed, you will get below result in output tab.

    ![test-build-success-report-aelf-studio](/img/test-build-success-report-aelf-studio.png)

### Generate AI Audit Report:

  - Click the **aelf icon** in the bottom right corner.
  - Select **AI Audit** from the menu.
    
    ![select-ai-audit-aelf-studio](/img/select-ai-audit-aelf-studio.png)

  - You will again get one more select menu option. Please select respective file for generate Report.

    ![select-file-ai-audit-aelf-studio](/img/select-file-ai-audit-aelf-studio.png)

  - Once file is uploaded, you will get notification on bottom right of screenin with **Check Audit Report** Button.

    ![check-ai-audit-report-aelf-studio](/img/check-ai-audit-report-aelf-studio.png)

  - wait sometime and click on **Check Audit Report** Button to see the Audit Report.

### Get test tokens:

  - Click the **aelf icon** in the bottom right corner.
  - Select **Get Testnet Tokens** from the menu.
    
    ![get-token-menu-aelf-studio](/img/get-token-menu-aelf-studio.png)

  - Follow the steps on the screen to get some tokens for testing.

### Deploy the smart contract:

  - Click the **aelf icon** again in the bottom right corner.
  - Select **Deploy from Local** from the menu.

    ![deploy-from-local-aelf-studio](/img/deploy-from-local-aelf-studio.png)

  - Follow the instructions to deploy your contract and wait sometimes to deploy contract successfully.

### Check Transaction Status:

  - After deploying contract, wait sometime and Click the **aelf icon** in the bottom right corner.
  - Select **Check Transaction Status** from the menu.
    
    ![select-check-transaction-aelf-studio](/img/select-check-transaction-aelf-studio.png)

  - Click on **Check proposal status** button from bottom right notification.

    ![check-proposal-status-aelf-studio](/img/check-proposal-status-aelf-studio.png)
  
  - After then, Click on **View on aelf Scan** button from on notification.

    ![view-aelf-scan-aelf-studio](/img/view-aelf-scan-aelf-studio.png)

  - After Open it on brower, You will get all the deployment details on aelf Scan.

    ![aelf-sacn-result-aelf-studio](/img/aelf-sacn-result-aelf-studio.png)

### Conclusion

aelf Studio makes it easy to create and deploy smart contracts on the AElf blockchain. Follow this guide to get started quickly and explore the AElf platform!