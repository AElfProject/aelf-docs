### Run Application

In this step, we will run the Expense Tracker dApp application.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

:::info

**Note**: Ensure that you are running this command under the **expense-tracker/2-dapp** folder.

:::

- You should observe the following as shown below.

  ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the Expense Tracker dApp landing page as shown below.

:::tip
If you are developing and testing this with github codespace, you can use `port forward` to test the web server that is running in codespace, here is the link on how to use `port forward` for codespace https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace
:::

- Usually codespaces automatically forward ports, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:

  ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the Expense Tracker dApp in the browser.

  ![expense-tracker-home-page](/img/expense-tracker-home.png)

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

- Proceed to sign up with a Google account or your preferred login method and complete the necessary accounts creation prompts and you should observe the following interface once you have signed up.

  ![success-login](/img/success-login.png)

With that, you have successfully created your very first Portkey wallet within seconds. How easy was that?

:::info
It is highly recommended to pin the Portkey wallet extension for easier access and navigation to your Portkey wallet!
:::

- Next, click on ‘Open Portkey’ and you should now observe the following as shown below.

  ![portkey-wallet-preview](/img/portkey-wallet-preview.png)

**Connect Portkey Wallet**

- Click on **"Connect Wallet"** to connect your Portkey wallet.

  ![connect-wallet](/img/expense-tracker-connect-button.png)

- You will be get below connect wallet request on your Portkey wallet. 
- Click on **Approve** button.

  ![connect-wallet](/img/expense-tracker-connet-wallet-request.png)

- The button will change to **"Your Wallet Address"** when the connection is successful.

  ![collect-wallet-success](/img/expense-tracker-connet-wallet-success.png)

---

**Add New Expense**

- Click on **"Add Expense"** button to add a new expense.

  ![add-expense](/img/expense-tracker-add-expense-button.png)

- You will see the pop-up modal with form to add a new expense. Please fill all the necessary fields like **`Description`**, **`Amount`** and **`Select Category`**.

   ![add-expense-form](/img/expense-tracker-add-expense-form.png)

- Click on **Add New Expense** button as shown below.

   ![add-expense-form](/img/expense-tracker-add-expense-form-submit-button.png)

- You will receive a transaction request on your portkey wallet to **Sign** the transaction.

  ![add-expense-sign-request](/img/expense-tracker-add-expense-request.png)

- Click on **Sign** the transaction.

- After the transaction is successfully processed, Your first expense will be added ✅.

  ![add-expense-success](/img/expense-tracker-add-expense-success.png)

As we have **Added an Expense** successfully, You will be able to see the expense card and the total Amount of the **Outcome**.

---

**Edit the Expense**

- Click on the **"Edit"** button to edit a selected expense.

   ![edit-expense](/img/expense-tracker-edit-expense-button.png)

- You will see the pop-up modal with form to edit the expense. Edit the necessary fields according to your need.

   ![edit-expense-form](/img/expense-tracker-edit-expense-form.png)

- Click on **Update Expense** Button.
 
- Now, You will recieve a transaction request on your portkey wallet to **Sign** the transaction.

   ![update-expense-sign-request](/img/expense-tracker-edit-expense-request.png)

- Click on **Sign** the transaction.

- After the transaction is successfully processed, your expense details will be updated✅.

   ![update-expense-success](/img/expense-tracker-edit-expense-success.png)

As we have **Edited an Expense** successfully. Let's test remove expense functionality.

---

**Remove the Expense**

- Click on **"Remove"** button to remove the selected expense.

   ![remove-expense-button](/img/expense-tracker-remove-expense-button.png)
 
- Now, You will recieve a transaction request on your portkey wallet to **Sign** the transaction.

   ![remove-expense-sign-request](/img/expense-tracker-remove-expense-request.png)

- Click on **Sign** the transaction.

- After the transaction is successfully processed, your expense will be removed from the list.

   ![remove-expense-success](/img/expense-tracker-remove-expense-success.png)

:::success
🎉 Congratulations Learners! You have successfully built your Expense Tracker dApp.
:::
