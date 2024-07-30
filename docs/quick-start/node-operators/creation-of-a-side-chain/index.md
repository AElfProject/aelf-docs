---
sidebar_position: 4
title: Creation of a Side Chain
description: How to create a side chain ?
---
# Creation of a Side Chain

**Description**: 
Detailed guidelines and API documentation for creating and managing side chains in the aelf blockchain ecosystem.

**Purpose**: To provide developers with step-by-step instructions and code examples for proposing, approving, and deploying side chains, enhancing scalability and customization within the aelf network.

Side chains can be created in the aelf ecosystem to enable scalability. This section introduces the process in detail.

## Side Chain Creation API

Anyone can request the creation of a side chain in the aelf ecosystem. The proposer/creator of a new side chain needs to request the creation through the cross-chain contract on the main chain. The request contains fields that determine the type of side chain to be created.

### API for Proposing Side Chain Creation

The fields in the `SideChainCreationRequest` determine the type of side chain that is created. For more details, follow `RequestSideChainCreation` in the [Crosschain contract documentation](/tools/smart-contract-api/cross-chain-contract/).

Upon creating a new proposal for the side chain, the `ProposalCreated` event containing the proposal ID will be fired. A parliament organization, specified since the chain's launch, will approve this proposal within 24 hours (refer to the [Parliament contract documentation](/tools/smart-contract-api/parliament-contract/) for details). The proposer can release the side chain creation request with the proposal ID once it can be released. Refer to `ReleaseSideChainCreation` in the [Crosschain contract documentation](/tools/smart-contract-api/cross-chain-contract/).

Once the side chain is created, the `SideChainCreatedEvent` containing the chain ID will be fired.

The side chain node can be launched once it is created on the main chain. Ensure the side chain ID from the creation result is configured correctly before launching the side chain node. Make sure the cross-chain communication context is correctly set, as the side chain node will request main chain node for chain initialization data. For more details, check the [side chain node running tutorial](/quick-start/node-operators/running-a-side-chain/).

## Side Chain Types

Two types of side chains currently exist: **exclusive** and **shared**. An **exclusive** side chain allows developers to choose the transaction fee model and set the transaction fee price. Only the creator of an **exclusive** side chain can propose deploying a new contract.

## Paying for Side Chain

### Indexing Fee

The indexing fee is paid for side chain indexing. You can specify the indexing fee price and prepayments amount when requesting side chain creation. The cross-chain contract charges prepayments once the side chain is created and pays the miner who indexes the side chain block every time.

### Resource Fee

Developers of an exclusive side chain pay producers for running it by paying CPU, RAM, DISK, and NET resource tokens. This model is called *charge-by-time*. The amount the side chain creator must share with the producers is set after the chain's creation. The **exclusive** side chain is priced according to the time used. The unit price of the fee is determined through negotiation between the production node and the developer.

## Simple Demo for Side Chain Creation Request

When a user (usually a developer) feels the need to create a new side chain on aelf, they must call the cross-chain contract and request a side chain creation. After the request, parliament organization members will either approve or reject the creation. If the request is approved, the developer must then release the proposal.

### Step-by-Step Code Snippets

We'll use the [aelf-js-sdk](https://github.com/AElfProject/aelf-sdk.js/tree/master) to create a new side chain. The full script will be provided at the end.

This creation of a side chain (logical, on-chain creation) is done in four steps:

1. The developer must *allow/approve* some tokens to the cross-chain contract of the main chain.
2. The developer calls the cross-chain contract of the main chain to *request* the creation.
3. The parliament organization members must *approve* this request.
4. Finally, the developer must *release* the request to finalize the creation.

### Set-Up

To test the creation process, you will need a producer node running and the following:

* A key-pair (account) created; this will be your Producer (also used to create the creation request in this tutorial).
* The node needs to be configured with an API endpoint, account, and miner list that correspond to what is in the script.

Here is the initialization code:

```javascript
const AElf = require('aelf-sdk');
const Wallet = AElf.wallet;

const { sha256 } = AElf.utils;

// set the private key of the block producer.
// REPLACE
const defaultPrivateKey = 'e119487fea0658badc42f089fbaa56de23d8c0e8d999c5f76ac12ad8ae897d76';
const defaultPrivateKeyAddress = 'HEtBQStfqu53cHVC3PxJU6iGP3RGxiNUfQGvAPTjfrF3ZWH3U';

// load the wallet associated with your block producer's account.
const wallet = Wallet.getWalletByPrivateKey(defaultPrivateKey);

// API link to the node
// REPLACE
const aelf = new AElf(new AElf.providers.HttpProvider('http://127.0.0.1:1234'));

// names of the contracts that will be used.
const tokenContractName = 'AElf.ContractNames.Token';
const parliamentContractName = 'AElf.ContractNames.Parliament';
const crossChainContractName = 'AElf.ContractNames.CrossChain';

...

const createSideChain = async () => {
    // check the chain status to make sure the node is running
    const chainStatus = await aelf.chain.getChainStatus({sync: true});
    const genesisContract = await aelf.chain.contractAt(chainStatus.GenesisContractAddress, wallet)
        .catch((err) => {
        console.log(err);
        });

    // get the addresses of the contracts that we'll need to call
    const tokenContractAddress = await genesisContract.GetContractAddressByName.call(sha256(tokenContractName));
    const parliamentContractAddress = await genesisContract.GetContractAddressByName.call(sha256(parliamentContractName));
    const crossChainContractAddress = await genesisContract.GetContractAddressByName.call(sha256(crossChainContractName));

    // build the aelf-sdk contract instance objects
    const parliamentContract = await aelf.chain.contractAt(parliamentContractAddress, wallet);
    const tokenContract = await aelf.chain.contractAt(tokenContractAddress, wallet);
    const crossChainContract = await aelf.chain.contractAt(crossChainContractAddress, wallet);

    ...
}
```

When running the script, the **createSideChain** function will be executed and will run through the full process of creating the side chain.

### Creation of the Side Chain

#### Set the Allowance

First, the developer must approve some ELF tokens for use by the cross-chain contract.

```javascript
var setAllowance = async function (tokenContract, crossChainContractAddress) {
  // set some allowance to the cross-chain contract
  const approvalResult = await tokenContract.Approve({
    symbol: "ELF",
    spender: crossChainContractAddress,
    amount: 20000,
  });

  let approveTransactionResult = await pollMining(approvalResult.TransactionId);
};
```

#### Creation Request

To request a side chain creation, the developer must call **RequestSideChainCreation** on the cross-chain contract. This creates a proposal with the **Parliament** contract. After calling this method, a **ProposalCreated** log will be created containing the **ProposalId**.

```protobuf
rpc RequestSideChainCreation(SideChainCreationRequest) returns (google.protobuf.Empty){}

message SideChainCreationRequest {
    int64 indexing_price = 1; // The cross chain indexing price.
    int64 locked_token_amount = 2; // Initial locked balance for a new side chain.
    bool is_privilege_preserved = 3; // Creator privilege boolean flag.
    SideChainTokenCreationRequest side_chain_token_creation_request = 4; // Side chain token information.
    repeated SideChainTokenInitialIssue side_chain_token_initial_issue_list = 5; // A list of accounts and amounts that will be issued when the chain starts.
    map<string, int32> initial_resource_amount = 6; // The initial rent resources.
}

message SideChainTokenCreationRequest{
    string side_chain_token_symbol = 1; // Token symbol of the side chain to be created.
    string side_chain_token_name = 2; // Token name of the side chain to be created.
    int64 side_chain_token_total_supply = 3; // Token total supply of the side chain to be created.
    int32 side_chain_token_decimals = 4; // Token decimals of the side chain to be created.
}

message SideChainTokenInitialIssue{
    aelf.Address address = 1; // The account that will be issued.
    int64 amount = 2; // The amount that will be issued.
}
```

In order for the creation request to succeed, some assertions must pass:

* The Sender can only have one pending request at any time.
* The `locked_token_amount` cannot be lower than the indexing price.
* If `is_privilege_preserved` is true (exclusive side chain), the token initial issue list cannot be empty and all with an `amount` greater than 0.
* If `is_privilege_preserved` is true (exclusive side chain), the `initial_resource_amount` must contain all resource tokens of the chain, and the value must be greater than 0.
* The allowance approved to cross-chain contract from the proposer (Sender of the transaction) cannot be lower than the `locked_token_amount`.
* No need to provide data about side chain token if `is_privilege_preserved` is false.

```javascript
var sideChainCreationRequest = async function (crossChainContract) {
  // call the cross-chain contract to request the creation
  const creationRequestResult =
    await crossChainContract.RequestSideChainCreation({
      indexing_price: 1,
      locked_token_amount: 20000,
      is_privilege_preserved: true,
      side_chain_token_creation_request: {
        side_chain_token_symbol: "MEGA",
        side_chain_token_name: "MEGA",
        side_chain_token_total_supply: 100000000,
        side_chain_token_decimals: 8,
      },
      side_chain_token_initial_issue_list: [
        {
          address: defaultPrivateKeyAddress,
          amount: 10000000,
        },
      ],
      initial_resource_amount: {
        CPU: 100,
        RAM: 100,
        DISK: 100,
        NET: 100,
      },
    });

  let sideChainProposalResult = await pollMining(
    creationRequestResult.TransactionId
  );
  let logs = parseLogs(sideChainProposalResult.Logs);
  let proposalId = logs.ProposalId;
};
```

The **cross-chain** contract emits an event containing the **ProposalId**. This is needed for the last step.

#### Approve the Proposal

This is where the parliament organization members approve the proposal:

```protobuf
var proposalApproveTx = await parliamentContract.Approve(deserializedLogs[0].proposalId);

await pollMining(proposalApproveTx.TransactionId);
```

**Note**: when calling **Approve** it will be the *Sender* of the transaction that approves. Here the script is set to use the key of one parliament organization member, see full script at the end.

#### Release the Proposal

This part of the script releases the proposal:

```protobuf
var releaseResult = await crossChainContract.ReleaseSideChainCreation({
    proposalId: deserializedLogs[0].proposalId
});

let releaseTxResult = await pollMining(releaseResult.TransactionId);

// Parse the logs to get the chain id.
let sideChainCreationEvent = crossChainContract.deserializeLog(releaseTxResult.Logs, 'SideChainCreatedEvent');
```

This is the last step involved in creating a side chain, after this the chain id of the new side chain is accessible in the **SideChainCreatedEvent** event log.

### Complete Script

This script demonstrates the essential steps to create a side chain in the aelf ecosystem. The developer must approve some ELF tokens, request the side chain creation, get approval from the parliament organization, and finally release the proposal to create the side chain. Ensure to set the proper configurations and values as per your blockchain environment.

```javascript
const AElf = require("aelf-sdk");
const Wallet = AElf.wallet;

const { sha256 } = AElf.utils;

// set the private key of the block producer
const defaultPrivateKey =
  "e119487fea0658badc42f089fbaa56de23d8c0e8d999c5f76ac12ad8ae897d76";
const defaultPrivateKeyAddress =
  "HEtBQStfqu53cHVC3PxJU6iGP3RGxiNUfQGvAPTjfrF3ZWH3U";

const wallet = Wallet.getWalletByPrivateKey(defaultPrivateKey);

// link to the node
const aelf = new AElf(new AElf.providers.HttpProvider("http://127.0.0.1:8000"));

if (!aelf.isConnected()) {
  console.log("Could not connect to the node.");
}

const tokenContractName = "AElf.ContractNames.Token";
const parliamentContractName = "AElf.ContractNames.Parliament";
const crossChainContractName = "AElf.ContractNames.CrossChain";

var pollMining = async function (transactionId) {
  console.log(`>> Waiting for ${transactionId} the transaction to be mined.`);

  for (i = 0; i < 10; i++) {
    const currentResult = await aelf.chain.getTxResult(transactionId);
    // console.log('transaction status: ' + currentResult.Status);

    if (currentResult.Status === "MINED") return currentResult;

    await new Promise((resolve) => setTimeout(resolve, 2000)).catch(
      function () {
        console.log("Promise Rejected");
      }
    );
  }
};

var setAllowance = async function (tokenContract, crossChainContractAddress) {
  console.log("\n>>>> Setting allowance for the cross-chain contract.");

  // set some allowance to the cross-chain contract
  const approvalResult = await tokenContract.Approve({
    symbol: "ELF",
    spender: crossChainContractAddress,
    amount: 20000,
  });

  await pollMining(approvalResult.TransactionId);
};

var checkAllowance = async function (tokenContract, owner, spender) {
  console.log("\n>>>> Checking the cross-chain contract's allowance");

  const checkAllowanceTx = await tokenContract.GetAllowance.call({
    symbol: "ELF",
    owner: owner,
    spender: spender,
  });

  console.log(
    `>> allowance to the cross-chain contract: ${checkAllowanceTx.allowance} ${checkAllowanceTx.symbol}`
  );
};

const createSideChain = async () => {
  // get the status of the chain in order to get the genesis contract address
  console.log("Starting side chain creation script\n");

  const chainStatus = await aelf.chain.getChainStatus({ sync: true });
  const genesisContract = await aelf.chain
    .contractAt(chainStatus.GenesisContractAddress, wallet)
    .catch((err) => {
      console.log(err);
    });

  // get the addresses of the contracts that we'll need to call
  const tokenContractAddress =
    await genesisContract.GetContractAddressByName.call(
      sha256(tokenContractName)
    );
  const parliamentContractAddress =
    await genesisContract.GetContractAddressByName.call(
      sha256(parliamentContractName)
    );
  const crossChainContractAddress =
    await genesisContract.GetContractAddressByName.call(
      sha256(crossChainContractName)
    );

  // build the aelf-sdk contract object
  const parliamentContract = await aelf.chain.contractAt(
    parliamentContractAddress,
    wallet
  );
  const tokenContract = await aelf.chain.contractAt(
    tokenContractAddress,
    wallet
  );
  const crossChainContract = await aelf.chain.contractAt(
    crossChainContractAddress,
    wallet
  );

  // 1. set and check the allowance, spender is the cross-chain contract
  await setAllowance(tokenContract, crossChainContractAddress);
  await checkAllowance(
    tokenContract,
    defaultPrivateKeyAddress,
    crossChainContractAddress
  );

  // 2. request the creation of the side chain with the cross=chain contract
  console.log("\n>>>> Requesting the side chain creation.");
  const sideChainCreationRequestTx =
    await crossChainContract.RequestSideChainCreation({
      indexingPrice: 1,
      lockedTokenAmount: "20000",
      isPrivilegePreserved: true,
      sideChainTokenCreationRequest: {
        sideChainTokenDecimals: 8,
        sideChainTokenName: "SCATokenName",
        sideChainTokenSymbol: "SCA",
        sideChainTokenTotalSupply: "100000000000000000",
      },
      sideChainTokenInitialIssueList: [
        {
          address: "28Y8JA1i2cN6oHvdv7EraXJr9a1gY6D1PpJXw9QtRMRwKcBQMK",
          amount: "1000000000000000",
        },
      ],
      initialResourceAmount: { CPU: 2, RAM: 4, DISK: 512, NET: 1024 },
    });

  let sideChainCreationRequestTxResult = await pollMining(
    sideChainCreationRequestTx.TransactionId
  );

  // deserialize the log to get the proposal's ID.
  let deserializedLogs = parliamentContract.deserializeLog(
    sideChainCreationRequestTxResult.Logs,
    "ProposalCreated"
  );
  console.log(
    `>> side chain creation request proposal id ${JSON.stringify(
      deserializedLogs[0].proposalId
    )}`
  );

  // 3. Approve the proposal
  console.log("\n>>>> Approving the proposal.");

  var proposalApproveTx = await parliamentContract.Approve(
    deserializedLogs[0].proposalId
  );
  await pollMining(proposalApproveTx.TransactionId);

  // 3. Release the side chain
  console.log("\n>>>> Release the side chain.");

  var releaseResult = await crossChainContract.ReleaseSideChainCreation({
    proposalId: deserializedLogs[0].proposalId,
  });

  let releaseTxResult = await pollMining(releaseResult.TransactionId);

  // Parse the logs to get the chain id.
  let sideChainCreationEvent = crossChainContract.deserializeLog(
    releaseTxResult.Logs,
    "SideChainCreatedEvent"
  );
  console.log("Chain chain created : ");
  console.log(sideChainCreationEvent);
};

createSideChain().then(() => {
  console.log("Done.");
});
```

**Note**: Replace the placeholders in the script with actual values and logic for your use case.



Next, we can move on to [Running a Side Chain](/quick-start/node-operators/running-a-side-chain/).
