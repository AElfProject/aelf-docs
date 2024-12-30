### Run Application

In this step, we will run the Allowance dApp application.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

:::info

**Note**: Ensure that you are running this command under the **allowance/2-dapp** folder.

:::

- You should observe the following as shown below.

  ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the Allowance dApp landing page as shown below.

:::tip
If you are developing and testing this with github codespace, you can use port forward to test the web server that is running in codespace, here is the link on how to use port forward for codespace https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace
:::

- Usually codespace will automatically forward port, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:

  ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the Allowance dApp in the browser.

  ![allowance-home-page](/img/allowance-home-page.png)

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

  ![connect-wallet](/img/allowance-connect-wallet.png)

- The button will change to **"Your Wallet Address"** when the connection is successful.

  ![collect-wallet-success](/img/allowance-wallet-connect-success.png)
Now we have  successfully connected our portkey wallet with Allowance dApp so let's move into set Roles functionality throgh Admin wallet.
---

**Set Roles**

- Click on **"Set Admin"** button to assign the admin role.

  ![step-1-allowance](/img/step-1-allowance.png)

- A pop-up form will appear to set the admin role. Please enter the wallet address you want to assign as admin address. You can then use this wallet to perform other admin functions.

  ![step-2-allowance](/img/step-2-allowance.png)

- Click on the **Set Admin** button.

- You will now receive two transaction requests in your Portkey wallet to **sign**. The first request is to initialize the role contract, and the second is to set the admin role.

- Click on **Sign** for both the transaction.

  ![step-3-allowance](/img/step-3-allowance.png)
  ![step-4-allowance](/img/step-4-allowance.png)

- After the transaction is successfully processed, you will be able to see the wallet address of the **Admin role**.

  ![step-5-allowance](/img/step-5-allowance.png)

- As Admin role has been assigned, Please follow same steps to assign the **Parent** and **Child** roles.

  ![step-6-allowance](/img/step-6-allowance.png)

- After assigning the Parent and Child roles, you will be able to see the wallet addresses for each of the roles.

  ![step-7-allowance](/img/step-7-allowance.png)

We have now assigned the role using the role contract, and as an Admin, you can update all the roles. Next, we need to work with the allowance contract. To access the parent front end components, connect the *Parent* address portkey wallet, and you will automatically switch to the Parent role.

---

**Set Allowance (Parent)**

As a Parent, you can manage child role functions, such as set a child address, edit the child's address, and set an allowance for the child. 

  ![step-8-allowance](/img/step-8-allowance.png)

- Click on **Set Allowance** button to set the allowance for child.

  ![step-9-allowance](/img/step-9-allowance.png)

- A pop-up form will appear to set the allowance. Please enter the amount you want to set as an allowance and click on the **Set Allowance** button.

  ![step-10-allowance](/img/step-10-allowance.png)

- You will now receive two transaction requests in your Portkey wallet to **sign** . The first request is to initialize the allowance contract, and the second is to set the allowance.

- Click on **Sign** for both the transaction.

  ![step-11-allowance](/img/step-11-allowance.png)
  ![step-12-allowance](/img/step-12-allowance.png)

- After the transaction is successfully processed, allowance value will be appear as shown below.

  ![step-13-allowance](/img/step-13-allowance.png)

As we hav completed **Set Allowance** functionality successfully. Let's move to the other functionalities for the child role. To access the child role's front end components, connect the assigned child's Portkey wallet, and you will automatically switch to the child role.

---

**Spend Funds**

As a Child, the allowance amount will be visible and the child can spend funds within the assigned allowance limit.

  ![step-14-allowance](/img/step-14-allowance.png)

- Enter the amount you want to spend and click on the **Spend** button.

  ![step-15-allowance](/img/step-15-allowance.png)

- Now, You will receive a transaction request on your portkey wallet to **Sign** the transaction.

  ![step-16-allowance](/img/step-16-allowance.png)

- Click on **Sign** the transaction.

- After the transaction is successfully processed, your allowance value will be updated.

  ![step-17-allowance](/img/step-17-allowance.png)

:::success
🎉 Congratulations Learners! You have successfully built your Allowance dApp.
:::
