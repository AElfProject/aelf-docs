---
sidebar_position: 4
title: Develop smart contract
description: Develop smart contract
---
### Project Setup

* Open your `Terminal`.
* Enter the following command to create a new project folder:

```bash
mkdir capstone_aelf
cd capstone_aelf
```

* Enter this command to create the capstone project.

```bash
dotnet new aelf -n BuildersDAO
```

### Install ACS12.proto

```bash
mkdir Protobuf
cd Protobuf
mkdir reference
cd ..
export ACS_DIR=Protobuf/reference
curl -O --output-dir $ACS_DIR https://raw.githubusercontent.com/AElfProject/AElf/dev/protobuf/acs12.proto
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

```csharp
syntax = "proto3";

import "aelf/core.proto";
import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "acs12.proto";

// The namespace of this class
option csharp_namespace = "AElf.Contracts.BuildersDAO";

service BuildersDAO {
  // The name of the state class the smart contract is going to use to access
  // blockchain state
  option (aelf.csharp_state) = "AElf.Contracts.BuildersDAO.BuildersDAOState";
  option (aelf.base) = "acs12.proto";

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

```csharp
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

```csharp
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

#### Implementing Initialize Function

* Go to the comment `Implement Initialize Smart Contract Logic.`
* Check if the smart contract is already initialized; return if true.
* Define a hardcoded proposal with necessary parameters.
* Update the Proposals state variable with the hardcoded proposal and increment the proposalId.

```csharp
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

```csharp
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

```csharp
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

```csharp
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

```csharp
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

```csharp
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

```csharp
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

```csharp
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
