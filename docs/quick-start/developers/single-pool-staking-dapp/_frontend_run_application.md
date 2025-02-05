### Run Application

In this step, we will run the Staking dApp application.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

:::info

ℹ️ Note: Ensure that you are running this command under the **staking/2-dapp** folder.

:::

- You should observe the following as shown below.

  ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the Staking dApp landing page as shown below.

:::tip
If you are developing and testing this with GitHub codespace, you can use Port Forward to test the web server that is running in codespace, here is the link on how to use Port forward for codespace https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace
:::

- Usually codespace will automatically forward port, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:

  ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the Staking dApp in the browser.

  ![staking-home-page](/img/staking-home-page.png)

#### Create Portkey Wallet

:::info
Portkey is the first AA wallet from aelf's ecosystem, migrating users, developers and projects from Web2 to Web3 with DID solution.

Users can swiftly log into Portkey via their Web2 social info with no private keys or mnemonics required. Underpinned by social recovery and decentralized guardian design, Portkey safeguards users' assets from centralized control and theft. Portkey has a unique payment delegation mechanism which enables interested parties to function as delegates to pay for user activities on users' behalf. This means that users can create accounts for free and fees for other usages may also be covered in Portkey.

Portkey also provides crypto on/off-ramp services, allowing users to exchange fiat with crypto freely. It supports the storage and management of various digital assets such as tokens, NFTs, etc. The compatibility with multi-chains and seamless connection to all kinds of dApps makes Portkey a great way to enter the world of Web3.

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

   ![connect-wallet](/img/staking-connect-wallet-buton.png)

- You will get a connection request on Portkey wallet as you can see in the below image.
- Click on **Approve** button.

   ![connect-wallet](/img/staking-connect-wallet-request.png)

- The button will change to **"Your Wallet Address"** when the connection is successful.

   ![collect-wallet-success](/img/staking-connect-wallet-success.png)


**Create Fungible Token**

- Click on **"Create Token"** button to create new Fungible Token.

   ![collect-wallet-success](/img/staking-create-token-button.png)

- The `Create Token` Popup modal will appear with prefilled token name. (You can modify the token name)

   ![create-collection-form](/img/staking-create-token-form.png)

- Now, you need **Token Seed** to create the new token. 

- If you don't have **Token Seed** then please follow this [steps](#step-2---getting-token-seed) to get it.

- Open your Portkey Wallet and you will find the **TOKEN Symbol** on the **NFT** Tab.

  ![portkey-token-seed-1.png](/img/staking-portkey-tone-seed-1.png) 
  ![portkey-token-seed-2.png](/img/staking-portkey-tone-seed-2.png) 

- Copy the **Token Symbol** and use it inside the **`Symbol`** field of the token creation form.
- Fill other necessary details like **`Total Supply`**.

  ![staking-create-token-form-button](/img/staking-create-token-form-button.png)

- Click on the **Create Token** Button.

- You will get a transaction request on your Portkey wallet. Proceed to **Sign** the transaction.

  ![staking-create-token-request](/img/staking-create-token-request.png)
  
- After transaction is succesfully signed, you will get a successful/failed transaction notification.

  ![staking-create-token-success](/img/staking-create-token-success.png)
   
- Now, the transaction will be validated on the aelf blockchain. Let's wait till the transaction gets validated. 

  ![staking-create-token-validating](/img/staking-create-token-validating.png)

- Once the transaction is successfully validated, a new **Sign** transaction request will pop-up on Portkey to **Create Token on the dAppChain**.

- Click on the **Approve** button and wait for the transaction to complete.

  ![staking-create-token-sidechain-request](/img/staking-create-token-sidechain-request.png)

- After the successful creation of the token on the dAppChain, a new **Sign** transaction request will pop-up on Portkey to **Issue Tokens On the dAppChain**.

- Click on the **Approve** button and wait for the transaction to complete.

  ![staking-issue-token-request](/img/staking-issue-token-request.png)

- Once tokens are issued successfully on the dAppChain, a new **Sign** transaction request will pop-up on Portkey to **Transfer Tokens to the Staking Contract** to distribute future staking rewards.

- Click on the **Approve** button and wait for the transaction to complete.

  ![staking-token-transfer-reward-request](/img/staking-token-transfer-reward-request.png)

- Once the reward tokens are transferred successfully, a new **Sign** transaction request will pop-up on Portkey to **Initialize the Staking Contract**.

- Click on the **Approve** button and wait for the transaction to complete.

  ![staking-contract-initialize-request](/img/staking-contract-initialize-request.png)

- Once the transaction is suceessfully completed, a notification will pop-up and the **Token balance** will be visible on the staking widget like below.

  ![staking-contract-initialize-success](/img/staking-contract-initialize-success.png) 

**Stake Tokens**

- Enter the amount to stake the tokens and click on the **Stake $TOKEN** Button. 

  ![staking-form-button](/img/staking-form-button.png)

- A new **Sign** transaction request will pop-up on Portkey to **Transfer $TOKEN amount to the staking contract**. Click on the **Sign** Button. 

  ![staking-deposite-amount-request](/img/staking-deposite-amount-request.png)

- Now You will get another transaction request to **Deposit $TOKEN on the staking contract** on the Portkey Wallet. Click on the **Sign** Button. 

  ![stake-token-on-smart-contract-request](/img/stake-token-on-smart-contract-request.png)

- A notification will pop-up that the **$TOKEN are Staked Succesfully**. The **Token balance** will be updated.

  ![stake-amount-success](/img/stake-amount-success.png)

As we have completed all the necessary steps to stake the token, now it's time to withdraw the tokens.

- There are two ways to withdraw the staked amount.

1. **Emergency Withdraw Token** : User can withdraw staked tokens at anytime before the staking (lock) time period ends. 
2. **Withdraw Token** : User can withdraw staked tokens once the lock time period is over.

Let's do **Emergency Withdraw Token** in the next step.  

**Emergency Withdraw Tokens**

- After clicking on the staked token, A staked token entry will be visible on the **Staked $TOKEN** section like below.
- Click on **Emergency Withdraw** Button.

 ![staked-amount-entry](/img/staked-amount-entry.png)

- Now, a transaction request will pop-up on the Portkey wallet.

 ![staking-emergency-withdraw-request](/img/staking-emergency-withdraw-request.png)

- The staked amount will be returned without any rewards and the token balance will be updated.

 ![post-emergency-withdrawal](/img/staking-post-emergency-withdrawal.png)

As we have completed **Emergency Withdraw Tokens** functioanlity. It's time to try **Withdraw Token** functionality. 

**Withdraw Token**

- First, the connected wallet needs to stake the tokens on the staking contract as we have already completed this during **Stake Tokens** step.

- You need to wait till the lock time period is over for the staked amount.

- After the lock period is over, you will be able to see your staked amount in **Available to Withdraw $TOKEN** section as shown below.

- Click on **Withdraw** button to withdraw the amount including staking **Rewards**.  1.1 times the amount of the staked tokens.

 ![staking-available-withdraw-entery](/img/staking-available-withdraw-entery.png)

- Now, You will get the transaction request on the Portkey wallet to withdraw the staked amount.

- Click on the **Sign** button.

- Your staked tokens including rewards will be transferred to the connected wallet once the withdrawal request completes.

 ![staking-withdraw-stake-success](/img/staking-withdraw-stake-success.png)

:::success
🎉 Congratulations Learners! You have successfully built your Staking dApp!
:::



