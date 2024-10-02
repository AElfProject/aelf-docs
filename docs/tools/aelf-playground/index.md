---
sidebar_position: 1
title: Playground
description: Play with aelf in your browser.
---

# aelf Playground

## 1. Introduction

aelf Playground is a sandbox for new developers who want to experience smart contract development with aelf without installing any tools on their local computer.

## 2. Setting up

No setup is needed. Simply visit [aelf Playground](https://playground.aelf.com) in your browser.

## 3. Using aelf Playground

### Create a New Project on aelf-playground

- Click on one of the templates:

  ![playground-templates](/img/playground-1.png)

- Enter a project name and click Submit.

  ![create-workspace](/img/playground-2.png)

- After a short while, the workspace will load:

  ![load-project](/img/playground-3.png)

The interaction with the workspace project code inside `src` and `test` folders will be demonstated in the next steps. The next steps will cover writing and building the smart contract.

- An existing template can also be used. Use the drag and drop feature to upload the local files. Upload files button can also be used select files from the local system.

  ![drag-and-drop-1](/img/playground-4.png)

- Enter the workspace name.

  ![drag-and-drop-2](/img/playground-5.png)

- The new workspace will have src and test folders with the following file tree structure.

  ![drag-and-drop-3](/img/playground-6.png)

- Alternatively, the existing workspace can also be chosen

  ![drag-and-drop-3](/img/playground-7.png)

- Also, you can choose to import the project directly from the github. 
  1. Click on `enter a GitHub repo url`. 
  2. Enter the github URL. 
  3. Choose the required `.csproj` file. 
  4. Enter the workspace name and click Submit. 

  ![drag-and-drop-3](/img/playground-8.png)

### Features of the aelf-playground

Now as the workspace setup is done and project is setup inside aelf's playground. The user can now edit the smart contract logic according to the user needs. The changes will majorly takes place inside the below files:
- src/Protobuf/contract/`contract_proto_file_name`.proto file
- src/`ContractName`.cs
- src/`ContractName`State.cs

Once all the changes are done in the above files and all other required files (whereever nacessary). Then below operations can be performed on the selected workspace project: 
1. AI Audit: Complete the AI audit of the writtwn smart contract. Result similar to below image will be visible once the AI audit completes.
  
  ![AI-Audit](/img/playground-9.png)

2. Save Gas Fee: Optimise the smart contract to save gas fee.  It will suggest to make changes to the smart contract if the smart contract is not optimised. If the smart contract is already optimed then result like below will appear.

  ![Save-Gas-Fee](/img/playground-10.png)

3. Build: Build the smart contract code. It will show `building` status when the user clicks the `Build` button and will output below result including whether build was successful or failed once the build process ends.

  ![Build](/img/playground-11.png)
  
4. Test: Test the smart contract code. It will show `Running Tests` status when the user clicks the `Test` button and will output below result including how many tests have passed and failed once the test process ends.

  ![Test](/img/playground-12.png)
  
5. Deploy: Deploy the smart contract code on the aelf blockchain. It will show `Deploying` status when the user clicks the `Deploy` button and will output below result including `transactionId`, `proposal status` and `contract address` once the build process ends. You can verify the contract address by visiting [aelf testnet explorer](https://testnet.aelfscan.io/tDVW).

  ![Deploy](/img/playground-13.png)
  
6. Export: Export the project in a local directory. It will open an alert to save the workspace in the local directory. Users can rename the local directory.

  ![Export](/img/playground-14.png)
  
7. Share: Share the project with a sharable link. It will show `Generating share link` status when the user clicks the `Share` button and will output below result including the sharable link.

  ![Share](/img/playground-15.png)
  
8. Upload Files: Upload more files to the project when necessary. It will show a `drag and drop files` section to drop files from the local directory.

  ![Upload Files](/img/playground-16.png)
  
9. Add a New File: Manually add a new file in the playground project structure. It will allow users to add a new file in the workspace project structure add smart contract code, new proto files, etc.

  ![Add a New File](/img/playground-17.png)
  

### Conclusion
The aelf Playground offers a seamless and accessible platform for developers to build, test, and deploy smart contracts without the need for any local setup. With built-in features like AI audit, gas fee optimization, and GitHub integration, it simplifies the entire smart contract development process. Whether you're writing new code or modifying existing templates, the aelf Playground provides all the essential tools in one place, making it an ideal sandbox for both beginners and experienced developers.