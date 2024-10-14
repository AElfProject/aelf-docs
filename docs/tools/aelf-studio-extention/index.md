---
sidebar_position: 2
title: aelf-Studio
description: A tool to simplify building, testing, and deploying smart contracts on aelf blockchain.
---

# aelf-Studio

## 1. Introduction

**aelf Studio** is a VS code IDE extension to minimise the efforts required in developing and deploying aelf blockchain's smart contract. aelf-Studio helps developers in buiding, testing and deploying smart contracts on the aelf blockchain. It also has other features like Ai audit, check transaction status, get testnet tokens, etc. This guide will help you in understanding the usage of the aelf-Studio.

## 2. aelf-Studio Features

| Feature Name              | Description                                                                                   | Command Option                                    |
|---------------------------|-----------------------------------------------------------------------------------------------|--------------------------------------------------|
| Build Smart Contracts     | Compile aelf smart contracts within VS Code.                                                  | `Build aelf smart contract`                |
| Test Smart Contracts      | Run tests to validate contract functionality before deployment.                               | `Test aelf smart contract`                 |
| Get Testnet Tokens        | Claim testnet ELF tokens for testing directly in the development environment.                 | `Get testnet tokens from faucet`           |
| Deploy Smart Contracts    | Deploy smart contracts to the aelf testnet.                                                   | `Deploy aelf smart contract`               |
| Check Transaction Status  | Track deployment and blockchain transaction statuses directly from the extension.             | `Check status of transaction`              |
| AI Audits                 | Use AI tools to audit smart contracts for vulnerabilities and potential issues.               | `Audit aelf smart contract`                |
| Deploy from Local         | Deploy locally built smart contracts to the aelf blockchain.                                  | `Deploy aelf smart contract from a local dll` |

## 3. Setting Up aelf-Studio

- **VS Code**: Make sure you have VS Code installed. You can download it from [here](https://code.visualstudio.com/).
- **.NET SDK**: You also need the .NET SDK to write smart contracts. Download it from [here](https://dotnet.microsoft.com/en-us/download).

### Steps to install aelf-Studio:

- **Open VS Code:**
   - Start the visual studio code program.

   ![vs-code-aelf-studio](/img/vs-code-aelf-studio.png)

- **Install the aelf-Studio Extension:**
   - On the left side of VS Code, click the `Extensions` icon.

   ![click-extention-aelf-studio](/img/click-extention-aelf-studio.png)


   - In the search box, type **“aelf-studio”**.

   ![search-extention-aelf-studio](/img/search-extention-aelf-studio.png)


   - Find the extension and click **Install**.

   ![click-install-aelf-studio](/img/click-install-aelf-studio.png)


   - If VS code asks to reload, click reload.

- **Check if it’s installed**:

   - `aelf` icon will be visible at the bottom right corner of the screen after successful installation.

   ![bottom-icon-aelf-studio](/img/bottom-icon-aelf-studio.png)

## 4. How to Use aelf Studio

### Create a new project:


- **Make a new folder:**
  - Open the terminal in VS Code (Click **Terminal** at the top and choose **New Terminal**). 
  - Type `mkdir hello-world` and press enter. This makes a new folder called "hello-world".
  
    ![mk-dir-aelf-studio](/img/mk-dir-aelf-studio.png)

  - Type `cd hello-world` and press enter. This will change the directory to "hello-world" folder.

    ![cd-aelf-studio](/img/cd-aelf-studio.png)

- **Create a new smart contract:**
  - In the terminal, type `dotnet new aelf -n HelloWorld` and press enter. This will create a `HelloWorld` smart contract template project.

    ![create-hello-world-aelf-studio](/img/create-hello-world-aelf-studio.png)

### Build the contract:

  - Go to the "src" folder by typing `cd src`.
  - Click the **aelf icon** in the bottom right corner.
  - Select **Build Smart Contract** from the menu to build (compile) the smart contract

    ![create-build-aelf-studio](/img/create-build-aelf-studio.png)
  
  - Notification will appear with preferance question. Click on **"No"** option.

    ![create-build-ask-notification-aelf-studio](/img/create-build-ask-notification-aelf-studio.png)

  - You will again get one more select menu option. Please select respective file for Build the project.

    ![select-file-create-build-aelf-studio](/img/select-file-create-build-aelf-studio.png)

  - You will see the success message below after the build is created successfully.

    ![build-success-aelf-studio](/img/build-success-aelf-studio.png)

### Test Smart Contract:

  - Click the **aelf icon** in the bottom right corner.
  - Select **Test Smart Contract** from the menu.
    
    ![test-build-aelf-studio](/img/test-build-aelf-studio.png)

  - You will again get one more select menu option. Please select respective test file for Testing the contract.

    ![text-build-select-file-aelf-studio](/img/text-build-select-file-aelf-studio.png)

  - Once test is completed, you will get below result in output tab.

    ![test-build-success-report-aelf-studio](/img/test-build-success-report-aelf-studio.png)

### Get testnet tokens:

  - Click the **aelf icon** in the bottom right corner.
  - Select **Get Testnet Tokens** from the menu.
    
    ![get-token-menu-aelf-studio](/img/get-token-menu-aelf-studio.png)

  - Follow the steps on the screen to get some ELF tokens for testing.

### Generate AI Audit Report:

  - Click the **aelf icon** in the bottom right corner.
  - Select **AI Audit** from the menu.
    
    ![select-ai-audit-aelf-studio](/img/select-ai-audit-aelf-studio.png)

  - Please select respective file to generate the audit report. Testnet token might be required to perform the audit. Claim the testnet tokens by selecting **Get Testnet Tokens** menu option if the tokens are not claimed already.

    ![select-file-ai-audit-aelf-studio](/img/select-file-ai-audit-aelf-studio.png)

  - When the audit report is ready, a notification will appear on the bottom right of the screen with option to click **Check Audit Report** button.

    ![check-ai-audit-report-aelf-studio](/img/check-ai-audit-report-aelf-studio.png)

  - It's advised to wait for sometime and click on **Check Audit Report** button to see the audit report.
<<<<<<< HEAD
=======

>>>>>>> 1e77459 (fix: Reviewed and updated aelf-Studio tutorial)

### Deploy the smart contract:

  - Click the **aelf icon** again in the bottom right corner.
  - Select **Deploy from Local** or **Deploy Smart Contract** from the menu.

    ![deploy-from-local-aelf-studio](/img/deploy-from-local-aelf-studio.png)

  - Follow the instructions to deploy the smart contract. Blockchains take sometime to deploy the smart contract.

### Check Transaction Status:

  - After deploying the smart contract, wait for sometime and click the **aelf icon** in the bottom right corner.
  - Select **Check Transaction Status** from the menu.
    
    ![select-check-transaction-aelf-studio](/img/select-check-transaction-aelf-studio.png)

  - Click on **Check proposal status** button from the notification in the bottom right of the screen.

    ![check-proposal-status-aelf-studio](/img/check-proposal-status-aelf-studio.png)
  
  - Then click on **View on aelf Scan** button from the notification.

    ![view-aelf-scan-aelf-studio](/img/view-aelf-scan-aelf-studio.png)

  - It will redirect you to aelf blockchain explorer for the deployment transaction. The explorer page will reflect the details of the deployment transaction.

    ![aelf-sacn-result-aelf-studio](/img/aelf-sacn-result-aelf-studio.png)

### Conclusion

<<<<<<< HEAD
aelf-Studio simplifies the process of developing, testing, and deploying smart contracts on the aelf blockchain, offering an intuitive in-IDE experience. With features like AI audits, transaction tracking, and testnet token retrieval, it ensures developers can efficiently manage the entire smart contract lifecycle without leaving VS Code.
=======
aelf-Studio simplifies the process of developing, testing, and deploying smart contracts on the aelf blockchain, offering an intuitive in-IDE experience. With features like AI audits, transaction tracking, and testnet token retrieval, it ensures developers can efficiently manage the entire smart contract lifecycle without leaving VS Code.
>>>>>>> 1e77459 (fix: Reviewed and updated aelf-Studio tutorial)
