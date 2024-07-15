---
sidebar_position: 3
title: Vote Contract
description: Slightly more complex contract
---

**Description**: This is the most complex contract in this guide. It covers voting
mechanisms, security considerations, and advanced data structures to
ensure a fair and transparent voting process.

**Purpose**: To teach you about complex logic implementation, security best
practices, and efficient data management in smart contracts.

**Difficulty Level**: Difficult

## Step 1 - Setting up your development environment

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="local" label="Local" default>

* Basic knowledge of terminal commands
* **IDE** - Install [VS Code](https://code.visualstudio.com/)

**Install Required Packages**

* [Install dotnet 6.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
* Install aelf contract templates

```bash title="Terminal"
dotnet new --install AElf.ContractTemplates
```

AELF.ContractTemplates contains various predefined templates for the ease of developing smart contracts on the aelf blockchain.

* Install aelf deploy tool

```bash title="Terminal"
dotnet tool install --global aelf.deploy
```

aelf.deploy is a utility tool for deploying smart contracts on the aelf blockchain.
Please remember to export PATH after installing aelf.deploy.

**Install Node.js and Yarn**

- [Install Node.js](https://nodejs.org/en)
- [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

**Install aelf-command**

<Tabs>
<TabItem value="Linux and macOs" label="Linux and macOs" default>
```bash title="Terminal"
sudo npm i -g aelf-command
```
</TabItem>

<TabItem value="Window" label="Window">
```bash title="Terminal"
npm i -g aelf-command
```
</TabItem>
</Tabs>

aelf-command is a CLI tool for interacting with the aelf blockchain, enabling tasks like creating wallets and managing transactions.
Provide required permissions while installing aelf-command globally.

**Install Git**

* [Install Git](https://git-scm.com/downloads)

As we will be using a ready made project, we will require git to clone from the project.

</TabItem>

<TabItem value="codespaces" label="Codespaces">

1. Visit [aelf-devcontainer-template](https://github.com/AElfProject/aelf-devcontainer-template).
2. Click the `Use this template` button. Choose `Create a new repository`.
3. Enter a suitable repository name. Click `Create repository`.
4. Within the GitHub interface of your new repository, click on `Code`.
   Select `Codespaces`.
5. Click on the `+` sign to create a new Codespace.
6. After some time, your workspace will load with the contents of the repository.
   You can now continue your development using GitHub Codespaces.

</TabItem>
</Tabs>

## Step 2 - Develop Smart Contract

### Project Setup

* Open your `Terminal`.
* Enter the following command to create a new project folder:

```bash title="Terminal"
mkdir capstone_aelf
cd capstone_aelf
```

* Enter this command to create the capstone project.

```bash title="Terminal"
dotnet new aelf -n BuildersDAO
```

### Adding Your Smart Contract Code

* Open your project in your favorite IDE (like VSCode).
* Rename the `src/Protobuf/contract/hello_world_contract.proto` file to `BuildersDAO.proto`.
* After renaming the file, your working directory should look like this.

  ![img](/img/vote-be-project-dir.png)
* That's it! Your project is now set up and ready to go 🚀

### Defining Methods and Messages

Let's add the RPC methods and message definitions to our Voting dApp.

* Open `src/Protobuf/contract/BuildersDAO.proto`
* Replace its contents with this code snippet.

```csharp title="BuildersDAO.proto"
syntax = "proto3";

import "aelf/core.proto";
import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "Protobuf/reference/acs12.proto";

// The namespace of this class
option csharp_namespace = "AElf.Contracts.BuildersDAO";

service BuildersDAO {
  // The name of the state class the smart contract is going to use to access
  // blockchain state
  option (aelf.csharp_state) = "AElf.Contracts.BuildersDAO.BuildersDAOState";
  option (aelf.base) = "Protobuf/reference/acs12.proto";

  // Actions -> Methods that change state of smart contract
  // This method sets up the initial state of our StackUpDAO smart contract
  rpc Initialize(google.protobuf.Empty) returns (google.protobuf.Empty);
  
  // This method allows a user to become a member of the DAO by taking in their
  // address as an input parameter
  rpc JoinDAO(aelf.Address) returns (google.protobuf.Empty);
  
  // This method allows a user to create a proposal for other users to vote on.
  // The method takes in a "CreateProposalInput" message which comprises of an
  // address, a title, description and a vote threshold (i.e how many votes
  // required for the proposal to pass)
  rpc CreateProposal(CreateProposalInput) returns (Proposal);
  
  // This method allows a user to vote on proposals towards a specific proposal.
  // This method takes in a "VoteInput" message which takes in the address of
  // the voter, specific proposal and a boolean which represents their vote
  rpc VoteOnProposal(VoteInput) returns (Proposal);

  // Views -> Methods that does not change state of smart contract
  // This method allows a user to fetch a list of proposals that had been
  // created by members of the DAO
  rpc GetAllProposals(google.protobuf.Empty) returns (ProposalList) {
    option (aelf.is_view) = true;
  }
  
  // aelf requires explicit getter methods to access the state value, 
  // so we provide these three getter methods for accessing the state
  // This method allows a user to fetch a proposal by proposalId
  rpc GetProposal (google.protobuf.StringValue) returns (Proposal) {
    option (aelf.is_view) = true;
  }

  // This method allows a user to fetch the member count that joined DAO
  rpc GetMemberCount (google.protobuf.Empty) returns (google.protobuf.Int32Value) {
    option (aelf.is_view) = true;
  }

  // This method allows a user to check whether this member is exist by address
  rpc GetMemberExist (aelf.Address) returns (google.protobuf.BoolValue) {
    option (aelf.is_view) = true;
  }
}

// Message definitions
message Member {
  aelf.Address address = 1;
}

message Proposal {
  string id = 1;
  string title = 2;
  string description = 3;
  repeated aelf.Address yesVotes = 4;
  repeated aelf.Address noVotes = 5;
  string status = 6;  // e.g., "IN PROGRESS", "PASSED", "DENIED"
  int32 voteThreshold = 7;
}

message CreateProposalInput {
  aelf.Address creator = 1;
  string title = 2;
  string description = 3;
  int32 voteThreshold = 4;
}

message VoteInput {
  aelf.Address voter = 1;
  string proposalId = 2;
  bool vote = 3;  // true for yes, false for no
}

message MemberList {
  repeated Member members = 1;
}

message ProposalList {
  repeated Proposal proposals = 1;
}
```

#### Understanding the Code

##### 1. **Define Syntax & Imports**

* `proto3` version.
* Import necessary Protobuf definitions and libraries.

##### 2. **RPC Methods**

* `Initialize` : Set up initial state
* `JoinDAO` : User joins DAO. User's `address` is the function parameter.
* `CreateProposal` : User creates a proposal. User's `address` , `title` , `description` , `vote threshold` are the function parameter.
* `VoteOnProposal` : User votes on a proposal. User's `address` , `proposal` `vote` is the function parameter.
* `GetAllProposals` : Fetch list of proposals

##### 3. **Getter Methods**

* `GetProposal` : Fetch proposal by ID
* `GetMemberCount` : Fetch member count
* `GetMemberExist` : Check if a member exists by address

##### 4. **Message Definitions**

* `Member` : DAO member (address)
* `Proposal` : Proposal (title, description, votes, status, vote threshold)
* `CreateProposalInput` : Fields for creating a proposal (title, description, vote threshold)
* `VoteInput` : Fields for voting on a proposal (proposal ID, vote)
* `MemberList` : List of DAO members
* `ProposalList` : List of proposals

### Defining Contract State

* Open the `src/BuildersDAOState.cs` file.
* Replace its contents with this code snippet.

```csharp title="BuildersDAOState.proto"
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.BuildersDAO
{
    // The state class is access the blockchain state
    public class BuildersDAOState : ContractState
    {
        public BoolState Initialized { get; set; }
        public MappedState<Address, bool> Members { get; set; }
        public MappedState<string, Proposal> Proposals { get; set; }
        public Int32State MemberCount { get; set; }
        public Int32State NextProposalId { get; set; }
    }
}
```

#### Understanding the Code

##### 3. **State Variables**

* `Members` : Mapping each member to a boolean indicates if they joined the DAO
* `Proposals` : Mapping each proposal to an ID for identification and retrieval
* `MemberCountId` and `NextProposalId` : Track total number of members and proposals

#### Next Step

* Implement the logic of our voting smart contract.

### Implement Voting Smart Contract Logic

#### Checking Smart Contract Logics

* Open `src/BuildersDAO.cs`
* Replace the existing content with this code snippet.

```csharp title="BuildersDAO.proto"
using System.Collections.Generic;
using System.Security.Principal;
using AElf.Sdk.CSharp;
using AElf.Sdk.CSharp.State;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.BuildersDAO
{
    public class BuildersDAO : BuildersDAOContainer.BuildersDAOBase
    {
        const string author = "REPLACE PLACEHOLDER HERE";

        // Implement Initialize Smart Contract Logic
        public override Empty Initialize(Empty input) { }

        // Implement Join DAO Logic
        public override Empty JoinDAO(Address input) { }

        // Implement Create Proposal Logic
        public override Proposal CreateProposal(CreateProposalInput input) { }

        // Implement Vote on Proposal Logic
        public override Proposal VoteOnProposal(VoteInput input) { }

        // Implement Get All Proposals Logic
        public override ProposalList GetAllProposals(Empty input) { }
        
        // Implement Get Proposal Logic
        public override Proposal GetProposal(StringValue input) { }
        
        // Implement Get Member Count Logic
        public override Int32Value GetMemberCount(Empty input) { }
        
        // Implement Get Member Exist Logic
        public override BoolValue GetMemberExist(Address input) { }
    }
}
```

:::danger
Aelf sidechain does not allow duplicate identical smart contracts. Hence, we will be using the author variable as the unique identifier for our voting smart contract in order to deploy the smart contract successfully.
:::

#### Implementing Initialize Function

* Go to the comment `Implement Vote on Proposal Logic`.
* Check if the smart contract is already initialized; return if true.
* Define a hardcoded proposal with necessary parameters.
* Update the Proposals state variable with the hardcoded proposal and increment the proposalId.

```csharp title="BuildersDAO.proto"
// Implement Initialize Smart Contract Logic
public override Empty Initialize(Empty input)
{
    Assert(!State.Initialized.Value, "already initialized");
    var initialProposal = new Proposal
    {
        Id = "0",
        Title = "Proposal #1",
        Description = "This is the first proposal of the DAO",
        Status = "IN PROGRESS",
        VoteThreshold = 1,
    };
    State.Proposals[initialProposal.Id] = initialProposal;
    State.NextProposalId.Value = 1;
    State.MemberCount.Value = 0;
    
    State.Initialized.Value = true;
    
    return new Empty();
}
```

#### Implementing Join DAO Function

* Go to the comment `Implement Join DAO Logic`
* Check if the member already exists in the DAO using the `Members` state variable.
* If not found, update `Members` to include the user's address.
* Increment `membersCount` to reflect the new member added.

You'll implement this function. Once done, you can proceed to the next page to compare your code with the reference implementation.

```csharp title="BuildersDAO.proto"
// Implement Join DAO Logic
public override Empty JoinDAO(Address input)
{
    // Based on the address, determine whether the address has joined the DAO. If it has, throw an exception
    // If the address has not joined the DAO, then join and update the state's value to true
    // Read the value of MemberCount in the state, increment it by 1, and update it in the state
    // Using 'return null' to ensure the contract compiles successfully. Please update it to the correct return value when implementing
    return null;
}
```

#### Implementing Create Proposal Function

* Go to the comment `Implement Create Proposal Logic`
* Check if the user is a DAO member (required to create proposals).
* Create a new proposal object using fields from `CreateProposalInput`.
* `Update` Proposals with the new proposal, increment NextProposalId, and return the created proposal object.

Now, use the provided code snippet to fill in the `CreateProposal` function.

```csharp title="BuildersDAO.proto"
// Implement Create Proposal Logic
public override Proposal CreateProposal(CreateProposalInput input)
{
    Assert(State.Members[input.Creator], "Only DAO members can create proposals");
    var proposalId = State.NextProposalId.Value.ToString();
    var newProposal = new Proposal
    {
        Id = proposalId,
        Title = input.Title,
        Description = input.Description,
        Status = "IN PROGRESS",
        VoteThreshold = input.VoteThreshold,
        YesVotes = { }, // Initialize as empty
        NoVotes = { }, // Initialize as empty
    };
    State.Proposals[proposalId] = newProposal;
    State.NextProposalId.Value += 1;
    return newProposal; // Ensure return
}
```

#### Implementing Vote On Proposal Function

* Go to the comment `Implement Vote on Logic`
* Perform these checks:

  * Verify if the member is a DAO member (required to vote).
  * Confirm if the proposal exists; otherwise, display an error message.
  * Check if the member has already voted on the proposal; members can vote only once.
* If all checks pass, store the member’s vote and update the proposal state.
* Update the proposal status based on vote thresholds:

  * If `yesVotes` reach the threshold, update status to "PASSED".
  * If `noVotes` reach the threshold, update status to "DENIED".

Now, use the provided code snippet to complete the `VoteOnProposal` function.

```csharp title="BuildersDAO.proto"
// Implement Vote on Proposal Logic
public override Proposal VoteOnProposal(VoteInput input)
{
    Assert(State.Members[input.Voter], "Only DAO members can vote");
    var proposal = State.Proposals[input.ProposalId]; // ?? new proposal
    Assert(proposal != null, "Proposal not found");
    Assert(
        !proposal.YesVotes.Contains(input.Voter) && !proposal.NoVotes.Contains(input.Voter),
        "Member already voted"
    );

    // Add the vote to the appropriate list
    if (input.Vote)
    {
        proposal.YesVotes.Add(input.Voter);
    }
    else
    {
        proposal.NoVotes.Add(input.Voter);
    }

    // Update the proposal in state
    State.Proposals[input.ProposalId] = proposal;

    // Check if the proposal has reached its vote threshold
    if (proposal.YesVotes.Count >= proposal.VoteThreshold)
    {
        proposal.Status = "PASSED";
    }
    else if (proposal.NoVotes.Count >= proposal.VoteThreshold)
    {
        proposal.Status = "DENIED";
    }

    return proposal;
}
```

#### Implementing Get All Proposals Function

* Go to the comment `Implement Get All Proposals Logic`
* Create a new `ProposalList` object from the message definition in `BuildersDAO.proto`.
* Fetch and iterate through `Proposals`.
* Update `ProposalList` with proposal objects and return the list of proposals.

  * If `yesVotes` reach the threshold, update status to "PASSED".
  * If `noVotes` reach the threshold, update status to "DENIED".

You'll implement this function. Once done, you can proceed to the next page to compare your code with the reference implementation.

```csharp title="BuildersDAO.proto"
// Implement Get All Proposals Logic
public override ProposalList GetAllProposals(Empty input)
{
    // Create a new list called ProposalList
    // Start iterating through Proposals from index 0 until the value of NextProposalId, read the corresponding proposal, add it to ProposalList, and finally return ProposalList
    // Using 'return null' to ensure the contract compiles successfully. Please update it to the correct return value when implementing
    return null;
}
```

#### Implementing Get Proposal / Get Member Count / Get Member Exist Functions

##### 1. Get Proposal

* Navigate to `Implement Get Proposal Logic`.
* Retrieve a proposal by `proposalId`.
* Use `proposalId` as the key to query `State.Proposals`.
* Return the corresponding proposal value.

##### 2. Get Member Count

* Navigate to `Implement Get Member Count Logic`.
* Retrieve the total member count.
* Return the value of `MemberCount` from `State`.

##### 3. Get Member Exist

* Navigate to `Implement Get Member Exist Logic`.
* Check if a member exists by `address`.
* Use `address` as the key to query `State.Members`.
* Return the corresponding existence value.

Implement these methods to access different states effectively in your smart contract.

```csharp title="BuildersDAO.proto"
// Implement Get Proposal Logic
public override Proposal GetProposal(StringValue input)
{
    var proposal = State.Proposals[input.Value];
    return proposal;
}

// Implement Get Member Count Logic
public override Int32Value GetMemberCount(Empty input)
{
    var memberCount = new Int32Value {Value = State.MemberCount.Value};
    return memberCount;
}

// Implement Get Member Exist Logic
public override BoolValue GetMemberExist(Address input)
{
    var exist = new BoolValue {Value = State.Members[input]};
    return exist;
}
```

With that, we have implemented all the functionalities of our Voting dApp smart contract.

In the next step, we will compile our smart contract and deploy our written smart contract to the aelf sidechain.

<!-- ### Unit Test Voting Smart Contract Logic

#### 1. Importance of Unit Testing

   - It's advisable to create a unit test for the smart contract before deploying it to the aelf blockchain.
   - Unit tests ensure the smart contract is bug-free and provide an opportunity to review the code before deployment.

#### 2. Writing Unit Tests

   - We'll now write unit tests for our Voting Smart Contract in \`test/BuildersDAOTests.cs\`.
   - Replace the current contents of \`test/BuildersDAOTests.cs\` with the following code snippet.


#### Implementing Unit Test for Initialize

The \`Initialize\` method initializes the smart contract by setting up Proposal #1

This process ensures thorough testing and readiness for deployment of our smart contract.


  - \*\*Positive Cases:\*\*

    - Call \`Initialize\` once and verify the proposal title using \`GetProposal\` with \`proposalId = "0"\`. 
    - Check if the title is "Proposal #1" using \`ShouldBe\` method.

\`\`\`csharp
\[Fact]
public async Task InitializeTest_Success()
{
    await BuildersDAOStub.Initialize.SendAsync(new Empty());
    var proposal = await BuildersDAOStub.GetProposal.CallAsync(new StringValue {Value = "0"});
    proposal.Title.ShouldBe("Proposal #1");
}
\`\`\`

  - \*\*Negative cases:\*\*

    - We call the initialize twice, when we make the second call, it will throw an exception containing already initialized.
    - We can use \`ShouldContain\` method to verify the exception message.

\`\`\`csharp
\[Fact]
public async Task InitializeTest_Duplicate()
{
    await BuildersDAOStub.Initialize.SendAsync(new Empty());
    var executionResult = await BuildersDAOStub.Initialize.SendWithExceptionAsync(new Empty());
    executionResult.TransactionResult.Error.ShouldContain("already initialized");
}
\`\`\` -->

### Complete Implementation

#### Implementing Join DAO Function

* **Check Membership** : See if the address has already joined the DAO by checking State.Members. Use the Assert method for this verification.
* **Add New Member** : If the address isn't a member yet, add it to State.Members and set its value to true.
* **Update Member Count** : Increase State.MemberCount by 1 and save the new value.

```csharp title="BuildersDAO.proto"
public override Empty JoinDAO(Address input)
{
    // Based on the address, determine whether the address has joined the DAO. If it has, throw an exception
    Assert(!State.Members[input], "Member is already in the DAO");
    // If the address has not joined the DAO, then join and update the state's value to true
    State.Members[input] = true;
    // Read the value of MemberCount in the state, increment it by 1, and update it in the state
    var currentCount = State.MemberCount.Value;
    State.MemberCount.Value = currentCount + 1;
    return new Empty();
}
```

#### Implementing Get All Proposals Function

* Create a list object called `ProposalList`.
* Loop from 0 to the value of `State.NextProposalId`.
* In each loop iteration, get the values from `State.Proposals` and add them to `ProposalList`.
* Return `ProposalList`.

```csharp title="BuildersDAO.proto"
public override ProposalList GetAllProposals(Empty input)
{
    // Create a new list called ProposalList
    var proposals = new ProposalList();
    // Start iterating through Proposals from index 0 until the value of NextProposalId, read the corresponding proposal, add it to ProposalList, and finally return ProposalList
    for (var i = 0; i < State.NextProposalId.Value; i++)
    {
        var proposalCount = i.ToString();
        var proposal = State.Proposals[proposalCount];
        proposals.Proposals.Add(proposal);
    }
    return proposals;
}
```

Once you've implemented these two methods and run the unit tests again, you should see that all test cases pass.

## Step 3 - Deploy Smart Contract

import Deploy from "../_deploy.md"

<Deploy />

## Step 4 - Interact with Your Deployed Smart Contract

### Project Setup

Let's start by cloning the frontend project repository from GitHub. 

- Run the following command in the `capstone_aelf` directory:

```bash title="Terminal"
git clone https://github.com/AElfProject/vote-contract-frontend.git
```

- Next, navigate to the frontend project directory with this command:

```bash title="Terminal"
cd `vote-contract`-frontend
```

- Once you're in the `vote-contract-frontend` directory, open the project with your preferred IDE (e.g., VSCode). You should see the project structure as shown below.

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

```javascript title="useDAOSmartContract.ts"
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

:::tip
ℹ️ Note: You are to replace the address placeholder with your deployed voting contract address from "Deploy Voting dApp Smart Contract"!

example:
//Replace with Address of Deployed Smart Contract
const address = "your_deployed_voting_contract_address";
:::

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

:::tip
ℹ️ Note: We set `currentWalletAddress` as the default value because the wallet address is passed from the HomeDAO.tsx page when the user clicks "Create Proposal" on the landing page.

Default value:
`address: currentWalletAddress`
:::

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

  const createNewProposal = async () => {
    try {
      await DAOContract?.callSendMethod(
        "CreateProposal",
        currentWalletAddress,
        proposalInput
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

:::info

ℹ️ Note: Ensure that you are running this command under the **Developer_DAO** folder.

:::

- You should observe the following as shown below.

   ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the StackUpDAO landing page as shown below.

:::tip
If you are developing and testing this with GitHub codespace, you can use Port Forward to test the web server that is running in codespace, here is the link on how to use Port forward for codespace https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace
:::

- Usually codespace will automatically forward port, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:

   ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the Voting dApp in the browser.

   ![vote-fe-ui](/img/vote-fe-ui-1.png)


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

- Click on **"Connect Wallet"** to connect your Portkey wallet. The button will change to **"Connected"** when the connection is successful.

- Next, click on **"Join DAO"**. You will be prompted to sign the **"Initialize"** and **"Join DAO"** methods, as shown below.

Once you have successfully joined the DAO, you should observe now that the landing page renders the proposal we have defined in our smart contract as shown below.

   ![vote-fe-ui-joineddao](/img/vote-fe-ui-joineddao.png)

- Proposal #1 as defined in smart contract

:::danger
⚠️ Reminder: This proposal has been hard coded within our smart contract to test our vote functionality and is meant for educational purposes! In actual production settings, proposals should not be hardcoded within your smart contract!
:::

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

:::success
🎉 Congratulations Learners! You have successfully built your Voting dApp and this is no mean feat!
:::