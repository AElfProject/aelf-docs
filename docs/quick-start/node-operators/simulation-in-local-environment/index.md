---
sidebar_position: 3
title: Simulation in the Local Environment
---

**Description**: A guide for simulating a block producer (BP) election and running BP nodes in a local environment within the aelf blockchain ecosystem.

**Purpose**: To instruct developers on how to set up, configure, and manage multiple nodes, participate in BP elections, and perform key operations for local environment simulations.

# Simulation in the Local Environment

## Set up a Full Node

To simulate BP nodes in a local environment, you need to set up at least three nodes, as a single node cannot become a BP. BP elections occur every 7 days, but for this tutorial, we'll change the term to 120 seconds. Follow the steps below:

1. Find the `appsettings.json` file in `/.../src/AElf.Launcher` and configure the public keys of the three nodes:

    ```json title="appsettings.json"
    "Consensus": {
        "InitialMinerList": [
            "04884d9563b3b67a5*****526dd489e3805211cba710d956718*****",
            "045670526219d7315*****8629891b0617ab605e646ae78961c*****",
            "046a5913eae5fee3d*****3826beb2b7109b5141679a1927338*****"
        ],
        "MiningInterval": 4000,
        "StartTimestamp": 0,
        "PeriodSeconds": 120,
        "MinerIncreaseInterval": 31536000
    }
    ```

2. Change `PeriodSeconds` from 604800 to 120 for a 2-minute election term.
3. Shut down nodes and delete all Redis data. Restart your multi-nodes.

# Become a Candidate Node

1. Stake 100,000 ELF to join the node election. Ensure you have enough balance by checking with:

    ```sh title="Terminal"
    aelf-command call AElf.ContractNames.Token GetBalance '{"symbol": "ELF", "owner": "YOUR_ADDRESS"}'
    ```

2. If balance < 100,005 ELF, transfer ELF tokens using:

    ```sh title="Terminal"
    aelf-command send AElf.ContractNames.Token Transfer '{"symbol": "ELF", "to": "YOUR_ADDRESS", "amount": "10000000000000"}'
    ```

3. Announce your candidacy:

    ```sh title="Terminal"
    aelf-command send AElf.ContractNames.Election AnnounceElection '{"value": "YOUR_ADDRESS"}' -a YOUR_ADDRESS
    ```

4. Check candidate information:

    ```sh title="Terminal"
    aelf-command call AElf.ContractNames.Election GetCandidateInformation '{"value":"YOUR_PUBLIC_KEY"}'
    ```

# Users Vote for Nodes

1. Create a user account:

    ```sh title="Terminal"
    aelf-command create
    ```

2. Transfer ELF to the new account for voting (e.g., 2000 ELF):

    ```sh title="Terminal"
    aelf-command send AElf.ContractNames.Token Transfer '{"symbol": "ELF", "to": "USER_ADDRESS", "amount": "200000000000"}'
    ```

3. Check balance of the new account:

    ```sh title="Terminal"
    aelf-command call AElf.ContractNames.Token GetBalance '{"symbol": "ELF", "owner": "USER_ADDRESS"}'
    ```

4. Vote for the candidate node (e.g., 20 ELF):

    ```sh title="Terminal"
    aelf-command send AElf.ContractNames.Election Vote '{"candidatePubkey":"CANDIDATE_PUBLIC_KEY","amount":2000000000,"endTimestamp":{"seconds":1600271999,"nanos":999000}}' -a USER_ADDRESS
    ```

5. Check candidate votes:

    ```sh title="Terminal"
    aelf-command call AElf.ContractNames.Election GetCandidateVote '{"value":"CANDIDATE_PUBLIC_KEY"}'
    ```

# Become a BP

The top 2N+1 candidate nodes are elected as BPs in the next term. Get the list of current BPs:

```sh title="Terminal"
aelf-command call AElf.ContractNames.Consensus GetCurrentMinerPubkeyList '{}'
```

## Add More BPs
Repeat the steps to add more BPs. No need to edit `appsettings.json` again. When candidate nodes exceed the max BPs, they replace genesis nodes, which cannot participate in elections again.

Proceed to [contract deployment](/tools/smart-contract-templates/deploying-contracts-without-bp-approval/) and [DApp development](/quick-start/developers/) guides for more details.