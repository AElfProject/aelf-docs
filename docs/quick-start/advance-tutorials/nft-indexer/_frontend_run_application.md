### Run Application

In this step, we will run the NFT dApp application.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

:::info
ℹ️ Note: Ensure that you are running this command under the **nft/2-dapp** folder.
:::

- You should observe the following as shown below.

  ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the NFTs landing page as shown below.

:::tip
If you are developing and testing this with GitHub codespace, you can use Port Forward to test the web server that is running in codespace, here is the link on how to usePort forward for codespace https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace
:::

- Usually codespace will automatically forward port, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:
  
  ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the NFT dApp in the browser.

  ![nft-home-page](/img/nft-home-page.png)

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

  ![connect-wallet](/img/connect-wallet.png)

- The button will change to **"Your Wallet Address"** when the connection is successful.

  ![collect-wallet-success](/img/collect-wallet-success.png)

**Create NFT Collection**

- Click on **"Create NFT Collection"** button to create new NFT Collection.

  ![collect-wallet-success](/img/create-collection-button.png)

- You will be redirect this create NFT Collection page

  ![create-collection-form](/img/create-collection-form.png)

- Now you need **NFT Seed** for create the new collection.

- If you Don't have **NFT Seed** then please follow this [steps](#step-2---getting-nft-seed) to get it.

- Open you Portkey Wallet and you will find the **NFT Seed** on **NFT** Tab.

  ![portkey-nft-seed.png](/img/portkey-nft-seed.png)
  ![copy-nft-seed](/img/copy-nft-seed.png)

- Copy the **Token Symbol** and use it on **`Symbol`** field of Form Submission of Create Collection.

- Fill all other Necessary Fields like **`Token Name`** means `(Collection Name)`, **`Total Supply`**, **`Decimals`**.

  ![collection-form-example](/img/collection-form-example.png)

- Click on **Create Collection** Button.

- You will get Transaction Request on your Portkey Wallet so **Sign In** the Transaction.

  ![signin-transaction](/img/signin-transaction.png)

- After **Sign In** the Transaction, Please wait to complete these steps. It will take approx 3-4 minutes.
  - NFT Collection Created Successfully On MainChain.
  - Validating Token Successfully Executed.
  - Collection was Created Successfully On dAppChain.

**Create NFT Token**

- Once you done with create collection process the Now, It's time to Create NFT.

  ![create-nft-form](/img/create-nft-form.png)
  
:::info
Please make sure the Symbol will be change to `[your_symbol]-id`. ie `VARBFUXYTY-1`, `VARBFUXYTY-2`, `VARBFUXYTY-3` etc. It means you can only create Collection with id 0 like `VARBFUXYTY-0` and for NFT Token Please use another integer as a id in Symbol.
:::

- Fill all Necessary Fields in Create NFT Form like **`Token Name`** means `(Collection Name)`, **`Symbol`** means `(NFT Symbol)`, and **`Total Supply`**.

- Click on **Create NFT** Button.

- You will get Transaction Request on your Portkey Wallet so **Sign In** the Transaction for Create NFT as above you got for Create NFT Collection

- After **Sign In** the Transaction, Please wait to complete these steps. It will take approx 3-4 minutes.
  - NFT Created Successfully on MainChain.
  - Validating NFT Successfully Executed.
  - NFT Created Successfully On dAppChain.
  - You will get NFT on your Wallet! It can take sometimes to get into your wallet.

- After Successfully Create NFT, Now you redirected to Home page and as you can see you will get the NFT in your account. (It' take some time to store your NFT in your wallet so please reload the page multiple times till you get the NFT).

  ![home-nft-page](/img/home-nft-page.png)

- You will also able you access you NFT data on your **Profile Page**.

  ![profile-page](/img/profile-page.png)

**Transfer NFT Token**

- Once you get NFT in your account like above image then it's time to transfer NFT to another account.

- Please Click on **"Transfer NFT"** Button.

  ![transfer-button](/img/transfer-button.png)

- Now you will be redirected to **Transfer NFT page**.

- Please Fill all the Necessary Fields for Transfer NFT to another account like below image 👇.

  ![transfer-nft-page](/img/transfer-nft-page.png)

- Click on **Transfer NFT** button.

- Your NFT Transfer Successfully to another account.

:::success
🎉 Congratulations Learners! You have successfully built your NFT dApp and this is no mean feat!
:::
