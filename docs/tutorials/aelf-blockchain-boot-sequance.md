# aelf Blockchain Boot Sequence
----------------------------------------------------------------------------

This guide explains how the aelf Blockchain starts from initial nodes and transitions to production nodes through elections, completing the full startup process.

## Start Initial Nodes
----------------------------------------------------------------------------

To begin the aelf Blockchain, you need to start at least one initial node. It’s recommended to start with 1-5 initial nodes.

### Follow these steps to start multiple nodes:

##### Setup Initial Nodes:

- Refer to the "Getting Started" section for detailed steps.
- Use the :doc:`Running multi-nodes with Docker <../getting_started/development-environment/node>` guide to start the initial nodes. This example uses three initial nodes.

##### Election Time Configuration:

- The default election period is 604800 seconds (7 days).
- To see election results faster, modify the configuration file `appsettings.json` to set the `PeriodSeconds` to a smaller value:

```json
{
  "Consensus": {
    "PeriodSeconds": 604800
  }
}
```

By following these steps, you can successfully start the aelf Blockchain with initial nodes and prepare for the election of production nodes.

# Run a Full Node
--------------------------------------------------------------------------------------------

### Create an Account for the Full Node

To create an account for the full node, use the following command:

```bash
aelf-command create
```

You will receive your wallet information, which includes the mnemonic, private key, public key, and address. Here is an example of the output:

```json
AElf [Info]: Your wallet info is:
AElf [Info]: Mnemonic            : major clap hurdle hammer push slogan ranch quantum reunion hope enroll repeat
AElf [Info]: Private Key         : 2229945cf294431183fd1d8101e27b17a1a590d3a1f7f2b9299850b24262ed8a
AElf [Info]: Public Key          : 04eed00eb009ccd283798e3862781cebd25ed6a4641e0e1b7d0e3b6b59025040679fc4dc0edc9de166bd630c7255188a9aeadfc832fdae0828270f77c6ef267905
AElf [Info]: Address             : Q3t34SAEsxAQrSQidTRzDonWNTPpSTgH8bqu8pQUGCSWRPdRC
```
## Start the Full Node
----------------------------------------------------------------------------

Starting the full node involves similar steps to starting the initial nodes. However, ensure that the `InitialMinerList` in your configuration file matches the list from the initial node setup. Here is an example configuration:

```json
{
  "InitialMinerList": [
    "0499d3bb14337961c4d338b9729f46b20de8a49ed38e260a5c19a18da569462b44b820e206df8e848185dac6c139f05392c268effe915c147cde422e69514cc927",
    "048397dfd9e1035fdd7260329d9492d88824f42917c156aef93fd7c2e3ab73b636f482b8ceb5cb435c556bfa067445a86e6f5c3b44ae6853c7f3dd7052609ed40b",
    "041cc962a51e7bbdd829a8855eca8a03fda708fdf31969251321cb31edadd564bf3c6e7ab31b4c1f49f0f206be81dbe68a75c70b293bf9d04d867ee5e415d3bf8a"
  ]
}
```
By following these steps, you can successfully create an account and start your full node, ensuring it is properly configured to participate in the aelf blockchain network.

### Full node started successfully:

After starting the full node, verify its status to ensure it's properly synchronizing with the blockchain.

#### Check Node State
To check the current state of the node, use the following command:

```base
aelf-command get-chain-status
```

This command will output the current status of the blockchain. Here's an example of what you might see:

```json
{
  "ChainId": "AELF",
  "Branches": {
    "fb749177c2f43db8c7d73ea050240b9f870c40584f044b13e7ec146c460b0eff": 2449
  },
  "NotLinkedBlocks": {},
  "LongestChainHeight": 2449,
  "LongestChainHash": "fb749177c2f43db8c7d73ea050240b9f870c40584f044b13e7ec146c460b0eff",
  "GenesisBlockHash": "ea9c0b026bd638ceb38323eb71174814c95333e39c62936a38c4e01a8f18062e",
  "GenesisContractAddress": "pykr77ft9UUKJZLVq15wCH8PinBSjVRQ12sD1Ayq92mKFsJ1i",
  "LastIrreversibleBlockHash": "66638f538038bd56357f3cf205424e7393c5966830ef0d16a75d4a117847e0bc",
  "LastIrreversibleBlockHeight": 2446,
  "BestChainHash": "fb749177c2f43db8c7d73ea050240b9f870c40584f044b13e7ec146c460b0eff",
  "BestChainHeight": 2449
}
```

### Understanding the Output

When running a full node on the aelf blockchain network, the following key information is crucial for monitoring and understanding the node's status:

- **ChainId**: The identifier of the blockchain.
- **Branches**: Current branches in the chain, showing the hash and height.
- **NotLinkedBlocks**: Blocks that are not yet linked to the main chain.
- **LongestChainHeight**: The height of the longest chain.
- **LongestChainHash**: The hash of the longest chain.
- **GenesisBlockHash**: The hash of the genesis block.
- **GenesisContractAddress**: The address of the genesis contract.
- **LastIrreversibleBlockHash**: The hash of the last irreversible block.
- **LastIrreversibleBlockHeight**: The height of the last irreversible block.
- **BestChainHash**: The hash of the best chain.
- **BestChainHeight**: The height of the best chain.

The `BestChainHeight` and `LastIrreversibleBlockHeight` should be increasing as the full node catches up with the initial nodes. Once the heights match, the node is fully synchronized, and you can proceed with further steps.

By following these details, you ensure that your full node is correctly set up and actively participating in the aelf blockchain network.

## Become a Candidate Node
----------------------------------------------------------------------------
To participate in the election process and become a candidate node, full nodes need to interact with the Election contract. Here's a step-by-step guide:

### Step 1: Ensure Sufficient Tokens

Full nodes must stake mortgage 10W ELF tokens to become candidates. Ensure your node's account has enough tokens. For demonstration purposes, you can transfer tokens from the initial node account to the full node account.

#### Transfer Tokens:

```base
aelf-command send AElf.ContractNames.Token Transfer '{"symbol": "ELF", "to": "Q3t34SAEsxAQrSQidTRzDonWNTPpSTgH8bqu8pQUGCSWRPdRC", "amount": "20000000000000"}'
```

#### Check Balance:

```base
aelf-command call AElf.ContractNames.Token GetBalance '{"symbol": "ELF", "owner": "Q3t34SAEsxAQrSQidTRzDonWNTPpSTgH8bqu8pQUGCSWRPdRC"}'
```

#### Expected Result:

```json
{
  "symbol": "ELF",
  "owner": "Q3t34SAEsxAQrSQidTRzDonWNTPpSTgH8bqu8pQUGCSWRPdRC",
  "balance": "20000000000000"
}
```

This result confirms that the full node account has 20W ELF tokens.

### Step 2: Announce Candidacy

Announce your candidacy using the Election contract. The AnnounceElection transaction requires the admin address to be specified.

#### Announce Election:

```base
aelf-command send AElf.ContractNames.Election AnnounceElection '{"value": "Q3t34SAEsxAQrSQidTRzDonWNTPpSTgH8bqu8pQUGCSWRPdRC"}' -a Q3t34SAEsxAQrSQidTRzDonWNTPpSTgH8bqu8pQUGCSWRPdRC
```

### Step 3: Verify Candidacy

Check the candidate information to confirm that your full node is now a candidate.

#### Check Candidate Information::

```base
aelf-command call AElf.ContractNames.Election GetCandidateInformation '{"value":"04eed00eb009ccd283798e3862781cebd25ed6a4641e0e1b7d0e3b6b59025040679fc4dc0edc9de166bd630c7255188a9aeadfc832fdae0828270f77c6ef267905"}'
```

#### Expected Result:

```json
{
  "terms": [],
  "pubkey": "04eed00eb009ccd283798e3862781cebd25ed6a4641e0e1b7d0e3b6b59025040679fc4dc0edc9de166bd630c7255188a9aeadfc832fdae0828270f77c6ef267905",
  "producedBlocks": "0",
  "missedTimeSlots": "0",
  "continualAppointmentCount": "0",
  "announcementTransactionId": "8cc8eb5de35e390e4f7964bbdc7edc433498b041647761361903c6165b9f8659",
  "isCurrentCandidate": true
}
```

This result indicates that the full node is now a candidate for the election, with the `isCurrentCandidate` field set to `true`.

By following these steps, your full node can successfully enter the election process and participate as a candidate node in the aelf blockchain network.



# User vote election

To demonstrate user voting in the election, follow these steps to create a user account, transfer tokens to the account, and then vote for a candidate node.

#### Step 1: Create a User Account

Create a new user account using the command below:

```base
aelf-command create
```

You will receive the following wallet information:

```
AElf [Info]: Your wallet info is :
AElf [Info]: Mnemonic            : walnut market museum play grunt chuckle hybrid accuse relief misery share meadow
AElf [Info]: Private Key         : 919a220fac2d80e674a256f2367ac840845f344269f4dcdd56d37460de17f947
AElf [Info]: Public Key          : 04794948de40ffda2a6c884d7e6a99bb8e42b8b96b9ee5cc4545da3a1d5f7725eec93de62ddbfb598ef6f04fe52aa310acc7d17abeeea3946622573c4b0b2433ac
AElf [Info]: Address             : ZBBPU7DMVQ72YBQNmaKTDPKaAkHNzzA3naH5B6kE7cBm8g1ei
```

#### Step 2: Transfer Tokens to the User Account

After the user account is created successfully, we will first transfer some tokens to the account for voting.

#### Transfer Tokens:

```base
aelf-command send AElf.ContractNames.Token Transfer '{"symbol": "ELF", "to": "ZBBPU7DMVQ72YBQNmaKTDPKaAkHNzzA3naH5B6kE7cBm8g1ei", "amount": "200000000000"}'
```

#### Confirm the Balance:

```base
aelf-command call AElf.ContractNames.Token GetBalance '{"symbol": "ELF", "owner": "ZBBPU7DMVQ72YBQNmaKTDPKaAkHNzzA3naH5B6kE7cBm8g1ei"}'
```

#### Expected Result:

```json
{
  "symbol": "ELF",
  "owner": "ZBBPU7DMVQ72YBQNmaKTDPKaAkHNzzA3naH5B6kE7cBm8g1ei",
  "balance": "200000000000"
}
```

This confirms the user account has received the tokens.

#### Step 3: Vote for a Candidate Node

Use the Election contract to vote for a candidate node. Here, we vote for the node with the public key
`04eed00eb009ccd283798e3862781cebd25ed6a4641e0e1b7d0e3b6b59025040679fc4dc0edc9de166bd630c7255188a9aeadfc832fdae0828270f77c6ef267905`.

#### Cast Vote:

```base
aelf-command send AElf.ContractNames.Election Vote '{"candidatePubkey":"04eed00eb009ccd283798e3862781cebd25ed6a4641e0e1b7d0e3b6b59025040679fc4dc0edc9de166bd630c7255188a9aeadfc832fdae0828270f77c6ef267905","amount":2000000000,"endTimestamp":{"seconds":1600271999,"nanos":999000}}' -a ZBBPU7DMVQ72YBQNmaKTDPKaAkHNzzA3naH5B6kE7cBm8g1ei
```

#### Step 4: Verify the Vote

Check the votes received by the candidate node to ensure your vote has been counted.

#### Check Candidate Votes:

```base
aelf-command call AElf.ContractNames.Election GetCandidateVote '{"value":"04eed00eb009ccd283798e3862781cebd25ed6a4641e0e1b7d0e3b6b59025040679fc4dc0edc9de166bd630c7255188a9aeadfc832fdae0828270f77c6ef267905"}'
```

#### Expected Result:

```json
{
  "obtainedActiveVotingRecordIds": [
    "172375e9cee303ce60361aa73d7326920706553e80f4485f97ffefdb904486f1"
  ],
  "obtainedWithdrawnVotingRecordIds": [],
  "obtainedActiveVotingRecords": [],
  "obtainedWithdrawnVotesRecords": [],
  "obtainedActiveVotedVotesAmount": "2000000000",
  "allObtainedVotedVotesAmount": "2000000000",
  "pubkey": "04eed00eb009ccd283798e3862781cebd25ed6a4641e0e1b7d0e3b6b59025040679fc4dc0edc9de166bd630c7255188a9aeadfc832fdae0828270f77c6ef267905"
}
```

This result confirms that the full node has successfully obtained 20 votes from the user account.



# Become production node

In the next election, the candidate nodes with the highest number of votes (up to 17) will automatically be elected as production nodes. You can view the current list of production nodes through the consensus contracts.


#### Viewing the Current Production Nodes

To see the current list of production nodes, use the following command:

```base
aelf-command call AElf.ContractNames.Consensus GetCurrentMinerPubkeyList '{}'
```

#### Expected Result:

```json
{
  "pubkeys": [
    "0499d3bb14337961c4d338b9729f46b20de8a49ed38e260a5c19a18da569462b44b820e206df8e848185dac6c139f05392c268effe915c147cde422e69514cc927",
    "048397dfd9e1035fdd7260329d9492d88824f42917c156aef93fd7c2e3ab73b636f482b8ceb5cb435c556bfa067445a86e6f5c3b44ae6853c7f3dd7052609ed40b",
    "041cc962a51e7bbdd829a8855eca8a03fda708fdf31969251321cb31edadd564bf3c6e7ab31b4c1f49f0f206be81dbe68a75c70b293bf9d04d867ee5e415d3bf8a",
    "04eed00eb009ccd283798e3862781cebd25ed6a4641e0e1b7d0e3b6b59025040679fc4dc0edc9de166bd630c7255188a9aeadfc832fdae0828270f77c6ef267905"
  ]
}
```

In this example, the node with the public key `04eed00eb009ccd283798e3862781cebd25ed6a4641e0e1b7d0e3b6b59025040679fc4dc0edc9de166bd630c7255188a9aeadfc832fdae0828270f77c6ef267905` has been elected as a production node.



# Add more production nodes

To add more production nodes, follow these steps:

1. **Repeat Steps for Creating Full Nodes:** Create additional full nodes by repeating the process described earlier for creating and starting full nodes.
2. **Nominate Additional Nodes:** Follow the process of nominating these full nodes as candidate nodes and ensure they receive sufficient votes.

When the number of initial nodes and candidate nodes exceeds the maximum number of production nodes, the initial nodes will gradually be replaced by the newly elected production nodes. Note that once an initial node is replaced, it cannot run for election again. At this point, the initial node has completed its role in starting the AElf Blockchain.

### Example Workflow:

#### 1. Create Additional Full Nodes:

```base
aelf-command create
```

#### 2. Transfer Tokens to New Nodes:

```base
aelf-command send AElf.ContractNames.Token Transfer '{"symbol": "ELF", "to": "<new_node_address>", "amount": "200000000000"}'
```

#### 3. Nominate New Nodes as Candidates:

```base
aelf-command send AElf.ContractNames.Election AnnounceElection '{"value": "<new_node_address>"}' -a <new_node_address>
```

#### 4. Vote for New Candidates:

```base
aelf-command send AElf.ContractNames.Election Vote '{"candidatePubkey":"<new_node_pubkey>","amount":2000000000,"endTimestamp":{"seconds":<timestamp>,"nanos":999000}}' -a <user_address>
```

By following these steps, you can ensure a smooth transition from initial nodes to production nodes, maintaining the stability and performance of the AElf Blockchain.
