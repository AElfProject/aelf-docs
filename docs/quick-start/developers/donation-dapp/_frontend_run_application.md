### Run Application

In this step, we will run the Donation dApp application.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

:::info

**Note**: Ensure that you are running this command under the **donation/2-dapp** folder.

:::

- You should observe the following as shown below.

  ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the Donation dApp landing page as shown below.

:::tip
If you are developing and testing this with github codespace, you can use port forward to test the web server that is running in codespace, here is the link on how to use port forward for codespace https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace
:::

- Usually codespace will automatically forward port, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:

  ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the Donation dApp in the browser.

  ![donation-home.png](/img/donation-home.png)

---

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

   ![connect-wallet](/img/donation-connect-wallet.png)

- The button will change to **"Your Wallet Address"** when the connection is successful.

   ![collect-wallet-success](/img/donation-wallet-connect-success.png)

--- 

**Create a New Campaign**

- Click on **"Create Campaign"** button to create a new campaign.

   ![create-campaign-btn](/img/create-campaign-btn.png)
  
- You will redirected to create capmpaign page form to create a new capmpaign.

   ![create-campaign-page](/img/create-campaign-page.png)

- Please fill all the necessary fields like `Title` , `Description` , `Category` , `Goal` , `End Date` and `Campaign Image`.

   ![create-campaign-enter-details](/img/create-campaign-enter-details.png)

- Click on **Submit New Campaign** Button.

- You will now receive the first-time initialization request on your Portkey wallet. Please sign the transaction to proceed.

   ![create-campaign-initialize-request](/img/create-campaign-initialize-request.png)

- Now, You will receive a transaction request for create campaign on your portkey wallet to Sign the transaction.

   ![create-campaign-send-request](/img/create-campaign-send-request.png)
  
- Click on **Sign** the transaction.

- After the transaction is successfully processed, your first campaign will be created✅.

   ![create-campaign-success](/img/create-campaign-success.png)
  
- Your campaign will appear in home page with these following details.

  - `Campaign Image`
  - `Category`
  - `Title`
  - `Description`
  - `Raised ELF Tokens`
  - `Remaining Time`
  - `Creator Wallet Address`

   ![created-campaign](/img/created-campaign.png)

---

**Edit Existing Campaign**

- Click on the campaign image to view detailed information about it, as shown below.

   ![click-campaign-image](/img/click-campaign-image.png)
  
- You will redirected to capmpaign detail page with all the information about it with donation widget in right side.

   ![campaign-details](/img/campaign-details.png)

- Click on **Edit** button on detail page, as shown below.

   ![edit-campaign-btn](/img/edit-campaign-btn.png)
   
- You will redirected to edit capmpaign page with prefield all information in form.
   
   ![edit-campaign-page](/img/edit-campaign-page.png)

- Edit campaign accordingly and submit the form.
- Now, You will receive a transaction request for edit the campaign on your portkey wallet to Sign the transaction.
- Click on **Sign** the transaction.

   ![edit-campaign-transaction-request](/img/edit-campaign-transaction-request.png)

- After the transaction is successfully processed, your campaign will updated.

   ![success-edit-campaign](/img/success-edit-campaign.png)

--- 

**Search Campaign**

To test the search campaign feature, follow these steps:

**1. Create Multiple Campaigns**

  - Begin by creating several campaigns to populate the campaign list, as shown below:

   ![campaign-list](/img/campaign-list.png)

**2. Use the Search Input**

  - Navigate to the header's search bar and type your desired keywords. Then click on the search icon, as illustrated below:

   ![search-campaign-input](/img/search-campaign-input.png)

**3. View Filtered Results**

   The campaign list will automatically update and display only the campaigns that match your search query.

   ![search-campaign-data](/img/search-campaign-data.png)
  
---

**Donate Funds to Campaign**

Let's start to donate ELF funds in active campaigns so please follow below steps to perform the donation actions.

**1. Select a Campaign**

- Click the **Donate** button on any campaign you wish to support.

   ![campaign-donate-button](/img/campaign-donate-button.png)

**2. View Campaign Details**

- You’ll be redirected to the campaign details page, which includes a donation widget displaying:

   - **Remaining Time**
   - **Raised Amount**
   - **Total Goal Amount**
   - **Your Donaition**
   - **Your ELF Balance**

   ![donation-widget](/img/donation-widget.png)

**3. Enter Donation Amount**

- Specify the amount you’d like to donate in the input field within the donation widget.

   ![donation-amount-input](/img/donation-amount-input.png)

**4. Initiate Donation**

- Click on **Donate** button.

**5. Approve Token Allowance (First-Time Donation)**

- For your first donation to a campaign, you’ll be prompted to approve a token allowance transaction. This allows the transfer of ELF tokens to the campaign owner.

   ![approve-donation-transaction](/img/approve-donation-transaction.png)

- Authorize the transaction in your Portkey wallet.

**6. Complete Donation**

- After approving the token allowance, you’ll receive another transaction request to finalize your donation.

   ![donation-transaction-request](/img/donation-transaction-request.png)

- Confirm the transaction.

**7. View Updated Campaign Details**

- Once the transaction is successful, the campaign details page will reflect the following updates:
 
   ![post-donation-success](/img/post-donation-success.png)

    - The  **Raised amount** will increase.
    - **Your Donation** amount will updated.
    - Your contribution will appear in the **DONATORS** section.

Congratulations! You’ve successfully donated to the campaign. Thank you for your generosity!

---

**Delete Campaign**

- Click on this user profile button on header to navigate in user profile page.
  
  ![user-profile-click](/img/user-profile-click.png)

- Now, You will redirect to user profile page with certain information like `wallet address` , `your campaigns` and etc.

  ![user-profile](/img/user-profile.png)

- Click on **Delete Campaign** button on campaign card.

  ![delete-campaign-button](/img/delete-campaign-button.png)

- Now, You will receive a transaction request for delete the campaign on your portkey wallet to Sign the transaction.
- Click on **Sign** the transaction.

   ![delete-campaign-request](/img/delete-campaign-request.png)

- After the transaction is successfully processed, your campaign will be removed from the campaign list.

   ![delete-campaign-success](/img/delete-campaign-success.png)

---

**Withdraw Raised Amount**

When the campaign is over, only the owner is eligible to withdraw the amount from their campaign. Let's withdraw the raised amount after the campaign has ended.

- Redirect to user profile page.

- Click on **Withdraw Raised Amount** button on campaign card.

   ![withdraw-raised-amount-btn](/img/withdraw-raised-amount-btn.png)

- Now, You will receive a transaction request for withdraw amount on your portkey wallet to Sign the transaction. 

- Click on **Sign** the transaction.

   ![withdraw-raised-amount-request](/img/withdraw-raised-amount-request.png)

- After the transaction is successfully processed, your token balance will be updated with raised amount and button will be change from **Withdraw Raised Amount** to **Withdrawal Complted**.

   ![withdraw-raised-amount-success](/img/withdraw-raised-amount-success.png)

:::success
🎉 Congratulations Learners! You have successfully built your Donation dApp.
:::