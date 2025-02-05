### Run Application

In this step, we will run the ToDo dApp application.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

:::info

**Note**: Ensure that you are running this command under the **todo/2-dapp** folder.

:::

- You should observe the following as shown below.

  ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the ToDo dApp landing page as shown below.

:::tip
If you are developing and testing this with github codespace, you can use port forward to test the web server that is running in codespace, here is the link on how to use port forward for codespace https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace
:::

- Usually codespace will automatically forward port, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:

  ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the ToDo dApp in the browser.

  ![todo-home-page](/img/todo-homepage.jpg)

#### Create Portkey Wallet

:::info
Portkey is the first AA wallet from aelf's ecosystem, migrating users, developers and projects from Web2 to Web3 with DID solution.

Users can swiftly log into Portkey via their Web2 social info with no private keys or mnemonics required. Underpinned by social recovery and decentralized guardian design, Portkey safeguards users' assets from centralized control and theft. Portkey has a unique payment delegation mechanism which enables interested parties to function as delegatees to pay for user activities on users' behalf. This means that users can create accounts for free and fees for other usages may also be covered in Portkey.

Portkey also provides crypto on/off-ramp services, allowing users to exchange fiat with crypto freely. It supports the storage and management of various digital assets such as tokens, NFTs, etc. The compatibility with multi-chains and seamless connection to all kinds of DApps makes Portkey a great way to enter the world of Web3.

With DID solution as its core, Portkey provides both Portkey Wallet and Portkey SDKs.

For more information, you may visit the official documentation for Portkey at https://doc.portkey.finance/.
:::


- Download the Chrome extension for Portkey from https://chromewebstore.google.com/detail/portkey-wallet/iglbgmakmggfkoidiagnhknlndljlolb.

:::info
The Portkey extension supports Chrome browser only (for now). Please ensure that you are using Chrome browser.
You may download Chrome from https://www.google.com/intl/en_sg/chrome/.
:::

- Once you have downloaded the extension, you should see the following on your browser as shown below.

   ![welcome-to-portkey](/img/welcome-to-portkey.png)

- Click on `Get Start` and you should see the following interface as shown below.

   ![portkey-login](/img/portkey-login.png)


**Sign up** 

- Switch to **aelf Testnet** network by selecting it:

   ![portkey-switch-to-testnet](/img/portkey-switch-to-testnet.png)

:::danger
Please make sure you are using `aelf Testnet` in order to be able to receive your testnet tokens from the Faucet.
:::

- Proceed to sign up with a Google Account or your preferred login method and complete the necessary accounts creation prompts and you should observe the following interface once you have signed up.

   ![success-login](/img/success-login.png)

With that, you have successfully created your very first Portkey wallet within seconds. How easy was that?

:::info
It is highly recommended to pin the Portkey wallet extension for easier access and navigation to your Portkey wallet!
:::

- Next, click on ‘Open Portkey’ and you should now observe the following as shown below.

   ![portkey-wallet-preview](/img/portkey-wallet-preview.png)

**Connect Portkey Wallet**

- Click on **"Connect Wallet"** to connect your Portkey wallet.

   ![connect-wallet](/img/todo-connect-wallet.jpg)

- The button will change to **"Your Wallet Address"** when the connection is successful.

   ![collect-wallet-success](/img/todo-wallet-connect-success.jpg)

--- 

**Create a New Task**

- Click on **"Add New"** button to create a new task.

   ![create-task](/img/create-task.png)

- You will see the pop-up modal with form to create a new task. Please fill all the necessary fields like `Name`, `Description` and `Category`.

   ![create-task-form](/img/create-task-form.png)

- Click on **Create New Task** Button.

- Now, You will receive a transaction request on your portkey wallet to  **Sign** the transaction.

   ![create-task-sign-request](/img/create-task-sign-request.jpg)

- Click on **Sign** the transaction.

- After the transaction is successfully processed, your first task will be created✅.

   ![create-task-success](/img/create-task-success.jpg)

- Your task item looks like below with the following details -  **`Name`** , **`Description`** , **`Last Updated Time`** , **`Create Date and Time`**,

   ![todo-item.jpg](/img/todo-item.jpg)

- You will be able to perform these following action for a selected task - **`Edit`** , **`Complete`** , and **`Remove`** .

As we have **Created a Task** successfully, let's update the task details.

---

**Edit the Task**

- Click on the **"Edit"** button to edit the task.

   ![update-task](/img/update-task.png)

- You will see the pop-up modal with form to edit the task. Edit the necessary fields according to your need.

   ![edit-task-form](/img/edit-task-form.jpg)

- Click on **Update Task** Button.
 
- Now, You will recieve a transaction request on your portkey wallet to **Sign** the transaction.

   ![update-task-sign-request](/img/update-task-request.jpg)

- Click on **Sign** the transaction.

- After the transaction is successfully processed, your task details will be Updated✅.

   ![update-task-success](/img/update-task-success.jpg)

As we have **Edited a Task** successfully. Let's move that task to completed state.

---

**Complete the Task**

- Click on the **"Complete"** button to move the task to `Completed` status.

   ![complete-task-button](/img/complete-task-button.jpg)

- Now, You will recieve a transaction request on your portkey wallet to **Sign** the transaction.

   ![complete-task-sign-request](/img/complete-task-request.jpg)

- Click on **Sign** the transaction.

- After the transaction is successfully processed, your task will be moved to the completed tab✅.

   ![complete-task-success](/img/complete-task-success.jpg)

As we have performed **Complete Task** successfully. Let's remove the completed task.

---

**Remove the Task**

- Click on **"Remove"** button to remove the task.

   ![remove-task-button](/img/delete-task-button.jpg)
 
- Now, You will recieve a transaction request on your portkey wallet to **Sign** the transaction.

   ![remove-task-sign-request](/img/delete-task-request.jpg)

- Click on **Sign** the transaction.

- After the transaction is successfully processed, your task will be moved to the removed tab✅.

   ![remove-task-success](/img/delete-task-success.jpg)

:::success
🎉 Congratulations Learners! You have successfully built your ToDo dApp.
:::

