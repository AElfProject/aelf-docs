---
sidebar_position: 4
title: Creating a dApp
description: Creating a dApp
---

### Project Setup

Let's start by cloning the frontend project repository from GitHub. 

- Run the following command in the `capstone_aelf` directory:

```bash title="Terminal"
git clone https://github.com/AElfProject/vote-contract-frontend.git
```

- Next, navigate to the frontend project directory with this command:

```bash title="Terminal"
cd Developer_DAO
```

- Once you're in the `Developer_DAO` directory, open the project with your preferred IDE (e.g., VSCode). You should see the project structure as shown below.

   ![result](/img/vote-fe-directory.png)

#### Install necessary libraries

- Run this command in the terminal:

```bash title="Terminal"
npm install
```

We are now ready to build the frontend components of our Voting dApp.


### Configure Portkey Provider & Write Connect Wallet Function

We'll set up our Portkey provider to let users connect their Portkey wallets to our app and interact with our voting smart contract.

1. Go to the `src/useDAOSmartContract.ts` file.

2. In this file, we'll create a component that initializes the Portkey wallet provider and fetches our deployed voting smart contract. This will enable our frontend components to interact with the smart contract for actions like joining the DAO, creating proposals, and more.

3. Locate the comment `Step A - Setup Portkey Wallet Provider` and replace the existing **useEffect** hook with the following code snippet:

```javascript title="src/useDAOSmartContract.ts"
//Step A - Setup Portkey Wallet Provider
useEffect(() => {
  (async () => {
    if (!provider) return null;

    try {
      // 1. get the sidechain tDVW using provider.getChain
      const chain = await provider?.getChain("tDVW");
      if (!chain) throw new Error("No chain");

      //Address of DAO Smart Contract
      //Replace with Address of Deployed Smart Contract
      const address = "2GkJoDicXLqo7cR9YhjCEnCXQt8KUFUTPfCkeJEaAxGFYQo2tb";

      // 2. get the DAO contract
      const daoContract = chain?.getContract(address);
      setSmartContract(daoContract);
    } catch (error) {
      console.log(error, "====error");
    }
  })();
}, [provider]);
```

- Next, go to the `src/HomeDAO.tsx` file.

The `HomeDAO.tsx` file is the landing page of our Voting dApp. It allows users to interact with the deployed smart contract, join the DAO, view proposals, and vote on them.

Before users can interact with the smart contract, we need to write the Connect Wallet function.

Find the comment `Step B - Connect Portkey Wallet`.
Replace the existing connect function with this code snippet:

```javascript title="src/HomeDAO.ts"
const connect = async () => {
  //Step B - Connect Portkey Wallet
  const accounts = await provider?.request({
    method: MethodsBase.REQUEST_ACCOUNTS,
  });
  const account = accounts?.tDVW?.[0];
  setCurrentWalletAddress(account);
  setIsConnected(true);
  alert("Successfully connected");
};
```

In this code, we fetch the Portkey wallet account using the provider and update the wallet address state variable. An alert notifies the user that their wallet is successfully connected.

With the Connect Wallet function defined, we're ready to write the remaining functions in the next steps.


### Write Initialize Smart Contract & Join DAO Functions

Let's write the Initialize and Join DAO functions.

1. Find the comment `Step C - Write Initialize Smart Contract and Join DAO Logic`.

2. Replace the existing `initializeAndJoinDAO` function with this code snippet:


```javascript title="src/HomeDAO.ts"
const initializeAndJoinDAO = async () => {
  //Step C - Write Initialize Smart Contract and Join DAO Logic
  try {
    const accounts = await provider?.request({
      method: MethodsBase.ACCOUNTS,
    });
    if (!accounts) throw new Error("No accounts");

    const account = accounts?.tDVW?.[0];
    if (!account) throw new Error("No account");

    if (!initialized) {
      await DAOContract?.callSendMethod("Initialize", account, {});
      setInitialized(true);
      alert("DAO Contract Successfully Initialized");
    }

    await DAOContract?.callSendMethod("JoinDAO", account, account);
    setJoinedDAO(true);
    alert("Successfully Joined DAO");
  } catch (error) {
    console.error(error, "====error");
  }
};
```

#### Here's what the function does:

1. Fetches your wallet account using the Portkey wallet provider.

2. Initializes the DAO smart contract if it hasn't been done already, updating the state and showing a success alert.

3. Calls the JoinDAO method with your wallet address, updating the state and showing a success alert.

Now, wrap the `initializeAndJoinDAO` function in the "Join DAO" button to trigger both Initialize and JoinDAO when clicked.

   ![jao-button](/img/fe-join-dao-button.png)

Next, we'll write the **Create Proposal** function.


### Write Create Proposal Function

Let's write the Create Proposal function.

1. Go to the `src/CreateProposal.tsx` file. This file is the "Create Proposal" page where users can enter details like the proposal title, description, and vote threshold.

2. Find the comment `Step D - Configure Proposal Form`.

3. Replace the form variable with this code snippet:

```javascript title="src/CreateProposal.tsx"
//Step D - Configure Proposal Form
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    address: currentWalletAddress,
    title: "",
    description: "",
    voteThreshold: 0,
  },
});
```

#### Here's what the function does:

1. Initializes a new form variable with default values needed to create a proposal.

2. Fields include: `address` , `title` , `description` , and `vote threshold`.

Now your form is ready for users to fill in the necessary details for their proposal.


Now, let's write the Create Proposal function for the form submission.

1. Scroll down to find the comment `Step E - Write Create Proposal Logic`.

2. Replace the onSubmit function with this code snippet:

```javascript title="src/CreateProposal.tsx"
// Step E - Write Create Proposal Logic
function onSubmit(values: z.infer<typeof formSchema>) {
  const proposalInput: IProposalInput = {
    creator: currentWalletAddress,
    title: values.title,
    description: values.description,
    voteThreshold: values.voteThreshold,
  };

  setCreateProposalInput(proposalInput);

  const createNewProposal = async () => {
    try {
      await DAOContract?.callSendMethod(
        "CreateProposal",
        currentWalletAddress,
        createProposalInput
      );

      navigate("/");
      alert("Successfully created proposal");
    } catch (error) {
      console.error(error);
    }
  };

  createNewProposal();
}
```

#### Here's what the function does:

1. Creates a new `proposalInput` variable with form fields: `title` , `description` , and `vote threshold`.

2. Invokes the `CreateProposal` function of the deployed smart contract, using the current wallet address and `proposalInput`.

3. If successful, navigates the user to the landing page and shows an alert that the proposal was created.

Next, we'll write the **Vote** and **Fetch Proposal** functions to complete the frontend components of our Voting dApp.



### Write Vote & Fetch Proposals Function

In this step, we'll write the Vote and Fetch Proposals functions to complete our Voting dApp's frontend components.

1. Go to the `src/HomeDAO.tsx` file and scroll to the `Step F - Write Vote Yes Logic comment`.

2. Replace the `voteYes` function with this code snippet:

```javascript title="src/HomeDAO.tsx"
const voteYes = async (index: number) => {
  //Step F - Write Vote Yes Logic
  try {
    const accounts = await provider?.request({
      method: MethodsBase.ACCOUNTS,
    });

    if (!accounts) throw new Error("No accounts");

    const account = accounts?.tDVW?.[0];

    if (!account) throw new Error("No account");

    const createVoteInput: IVoteInput = {
      voter: account,
      proposalId: index,
      vote: true,
    };

    await DAOContract?.callSendMethod(
      "VoteOnProposal",
      account,
      createVoteInput
    );
    alert("Voted on Proposal");
    setHasVoted(true);
  } catch (error) {
    console.error(error, "=====error");
  }
};
```

#### Here's what the function does:

1. Takes an `index` parameter, representing the proposal ID to vote on.

2. Fetches the wallet address using the Portkey provider.

3. Creates a `createVoteInput` parameter with the voter's wallet address, proposal ID, and a `true` value for a Yes vote..

4. Calls the `VoteOnProposal` function from the smart contract.

5. Updates the state and shows an alert upon a successful vote.

The `voteNo` function works similarly but sets the vote to `false`.


- Scroll down to the `Step G - Use Effect to Fetch Proposals` comment and replace the `useEffect` hook with this code snippet:

```javascript title="src/HomeDAO.tsx"
useEffect(() => {
  // Step G - Use Effect to Fetch Proposals
  const fetchProposals = async () => {
    try {
      const accounts = await provider?.request({
        method: MethodsBase.ACCOUNTS,
      });

      if (!accounts) throw new Error("No accounts");

      const account = accounts?.tDVW?.[0];

      if (!account) throw new Error("No account");

      const proposalResponse = await DAOContract?.callViewMethod<IProposals>(
        "GetAllProposals",
        ""
      );

      setProposals(proposalResponse?.data);
      alert("Fetched Proposals");
    } catch (error) {
      console.error(error);
    }
  };

  fetchProposals();
}, [DAOContract, hasVoted, isConnected, joinedDAO]);
```

#### Here's what the function does:

1. Defines the `fetchProposals` function that fetches the wallet address.

2. Calls the `GetAllProposals` function from the smart contract, returning a list of proposals.

3. Updates the state and shows an alert once the proposals are fetched.

Now that we've written all the necessary frontend functions and components, we're ready to run the Voting dApp application in the next step.


### Run Application

In this step, we will run the Voting dApp application.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

- You should observe the following as shown below.

   ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the StackUpDAO landing page as shown below.

- Usually codespace will automatically forward port, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:

   ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the Voting dApp in the browser.

   ![vote-fe-ui](/img/vote-fe-ui-1.png)


#### Create Portkey Wallet

- Download the Chrome extension for Portkey from https://chromewebstore.google.com/detail/portkey-wallet/iglbgmakmggfkoidiagnhknlndljlolb.

- Once you have downloaded the extension, you should see the following on your browser as shown below.

   ![welcome-to-portkey](/img/welcome-to-portkey.png)

- Click on `Get Start` and you should see the following interface as shown below.

   ![portkey-login](/img/portkey-login.png)


**Sign up** 

- Switch to **aelf Testnet** network by selecting it:

   ![portkey-switch-to-testnet](/img/portkey-switch-to-testnet.png)

- Proceed to sign up with a Google Account or your preferred login method and complete the necessary accounts creation prompts and you should observe the following interface once you have signed up.

   ![success-login](/img/success-login.png)

With that, you have successfully created your very first Portkey wallet within seconds. How easy was that?

- Next, click on ‘Open Portkey’ and you should now observe the following as shown below.

   ![portkey-wallet-preview](/img/portkey-wallet-preview.png)


**Connect Portkey Wallet**

- Click on **"Connect Wallet"** to connect your Portkey wallet. The button will change to **"Connected"** when the connection is successful.

- Next, click on **"Join DAO"**. You will be prompted to sign the **"Initialize"** and **"Join DAO"** methods, as shown below.

Once you have successfully joined the DAO, you should observe now that the landing page renders the proposal we have defined in our smart contract as shown below.

   ![vote-fe-ui-joineddao](/img/vote-fe-ui-joineddao.png)

- Proposal #1 as defined in smart contract

- Let’s test our Vote functionality next.

- Proceed to click on **"Vote Yes"** and you should observe the following as shown below prompting you to sign the **"Vote Yes"** transaction.

   ![fe-dapp-trans-sign](/img/fe-dapp-trans-sign.png)

- Proceed to click on **"Sign"**.

Upon a successful vote transaction, you should now observe that the proposal status has been updated to **"PASSED"** as shown below as the Yes vote count has reached the vote threshold.

   ![vote-fe-ui-proposal-voted](/img/vote-fe-ui-proposal-voted.png)

- Proposal status updated to **"PASSED"** Lastly, we will be creating a proposal to wrap up our demonstration of our Voting dApp.

- Click on **"Create Proposal"** for Proceed and you should be directed to the Create Proposal page as shown below.

   ![fe-dapp-create-proposal](/img/fe-dapp-create-proposal.png)

- Proceed to fill in the following fields under the Create Proposal form:
 
   - **Title** - Proposal #2

   - **Description** - Proposal to onboard Developer DAO

   - **Vote Threshold** - 10

- click on **"Submit"** and you should observe the following as shown below.

   ![fe-submit-proposal-verify](/img/fe-submit-proposal-verify.png)

- Click on **"Sign"** to Proceed.

- Upon a successful proposal creation, you should be directed back to the landing page with the newly created proposal rendered on the landing page as shown below.

   ![vote-fe-ui-new-proposal](/img/vote-fe-ui-new-proposal.png)


🎉 Congratulations Learners! You have successfully built your Voting dApp and this is no mean feat.
