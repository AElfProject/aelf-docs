### Run Application

In this step, we will run the Tic-Tac-Toe dApp application.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

:::info

**Note**: Ensure that you are running this command under the **tic-tac-toe/2-dapp** folder.

:::

- You should observe the following as shown below.

  ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the Tic-Tac-Toe dApp landing page as shown below.

:::tip
If you are developing and testing this with github codespace, you can use `port forward` to test the web server that is running in codespace, here is the link on how to use `port forward` for codespace https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace
:::

- Usually codespaces automatically forward ports, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:

  ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the Tic-Tac-Toe dApp in the browser.

  ![tic-tac-toe-home-page](/img/tic-tac-toe-home-page.png)

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

   ![connect-wallet](/img/tic-tac-toe-connect-wallet.png)

- The button will change to **"Your Wallet Address"** when the connection is successful.

   ![collect-wallet-success](/img/tic-tac-toe-wallet-connect-success.png)

--- 

**Start The Game**

- Click on **"Start The Game"** button to Start The Tic Tac Toe Game.

   ![start-game](/img/start-game-button.png)

- You will receive a transaction request on your portkey wallet to  **Sign** the transaction.

   ![start-game-sign-request](/img/start-game-sign-request.png)

- Click on **Sign** the transaction.

- After the transaction is successfully processed, your game will start ✅.

   ![start-game-success](/img/start-game-success.png)

As we have **Started the Game** successfully, let's start to perform the moves and enjoy the game.

---

**Perform the Move**

  Let's start to make the moves and play the game.

:::tip
Your first move will always be **"X"** as shown in the picture below.
:::

- Click on the first square of the board, as shown in the picture below.

   ![make-move](/img/make-move.png)

- You will receive a transaction request on your Portkey wallet to **Sign** for making the move.

   ![make-move-sign-request](/img/make-move-sign-request.png)

- After the transaction is successfully processed, your first move will be submitted to blockchain ✅.

- Now it's turn of move by the opponent and the move sign will change from **"X"** to **"O"**. Your active turn is **"O"** now, as shown in the picture below.

- Click on the middle square of the board for **"O"**, as shown in the picture below.

   ![second-move](/img/second-move.png)

- You will receive a transaction request on your Portkey wallet to **Sign** for the second move.

   ![second-move-request](/img/second-move-request.png)

- Click on **Sign** the transaction.

- After the transaction is successfully processed, your second move will be submitted to the blockchain ✅.

- Now you can continue making other moves as demonstrated above.

- After winning the game, you will see this winning screen with the corresponding move (**X** or **O**).

   ![winner-view](/img/winner-view.png)

- Click on the **Start Again** button to continue playing the Tic-Tac-Toe game with aelf blockchain. Enjoy!

   ![start-again](/img/start-again.png)

- You will  be redirected again to the **Welcome screen** of the Game.

   ![welcome-screen](/img/welcome-screen.png)

:::success
🎉 Congratulations Learners! You have successfully built your Tic-Tac-Toe dApp with aelf Blockchain.
:::

