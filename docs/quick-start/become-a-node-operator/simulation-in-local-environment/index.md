---
sidebar_position: 2
title: Simulation in the Local Environment
---

# Simulation in the Local Environment

## Set up a Full Node

To simulate BP nodes in a local environment, you need to set up at least three nodes, as a single node cannot become a BP. BP elections occur every 7 days, but for this tutorial, we'll change the term to 120 seconds. Follow the steps below:

1. Find the `appsettings.json` file in `/.../src/AElf.Launcher` and configure the public keys of the three nodes:

    ```json
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

2. Change `PeriodSeconds` from `604800` to `120` for a 2-minute election term.
3. If you have set up nodes and produced blocks before, Shut down nodes and delete all Redis data via command.the instructions of which can be
   found in Multi-Nodes.  After that, you can restart your multi-nodes again.

# Become a Candidate Node

1. Stake 100,000 ELF to join the node election. Ensure you have enough balance by checking with:

    ```sh
    aelf-command call AElf.ContractNames.Token GetBalance '{"symbol": "ELF", "owner": "YOUR_ADDRESS"}'
    ```

    **Output**

    ```json
    {
       "symbol": "ELF",
       "owner": "Q3t34SAEsxAQrSQidTRzDonWNTPpSTgH8bqu8pQUGCSWRPdRC",
       "balance": "10000000000000"
    }
    ```

2. If balance < 100,005 ELF, transfer ELF tokens using:

    ```sh
    aelf-command send AElf.ContractNames.Token Transfer '{"symbol": "ELF", "to": "YOUR_ADDRESS", "amount": "10000000000000"}'
    ```

3. Announce your candidacy:

    ```sh
    aelf-command send AElf.ContractNames.Election AnnounceElection '{"value": "YOUR_ADDRESS"}' -a YOUR_ADDRESS
    ```

4. Check candidate information:

    ```sh
    aelf-command call AElf.ContractNames.Election GetCandidateInformation '{"value":"YOUR_PUBLIC_KEY"}'
    ```
    When the command is executed, you will see that the public key of the full node is on the candidate list, meaning it’s a candidate node.

    **Output**

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

# Users Vote for Nodes

1. Create a user account:

    ```sh
    aelf-command create
    ```

    The account info is as follows:

    ```base
    AElf [Info]: Your wallet info is :
    AElf [Info]: Mnemonic            : walnut market museum play grunt chuckle hybrid accuse relief misery share meadow
    AElf [Info]: Private Key         : 919a220fac2d80e674a256f2367ac840845f344269f4dcdd56d37460de17f947
    AElf [Info]: Public Key          : 04794948de40ffda2a6c884d7e6a99bb8e42b8b96b9ee5cc4545da3a1d5f7725eec93de62ddbfb598ef6f04fe52aa310acc7d17abeeea3946622573c4b0b2433ac
    AElf [Info]: Address             : ZBBPU7DMVQ72YBQNmaKTDPKaAkHNzzA3naH5B6kE7cBm8g1ei
    ```

2. Transfer ELF to the new account for voting (e.g., 2000 ELF):

    ```sh
    aelf-command send AElf.ContractNames.Token Transfer '{"symbol": "ELF", "to": "USER_ADDRESS", "amount": "200000000000"}'
    ```

3. Check balance of the new account:

    ```sh
    aelf-command call AElf.ContractNames.Token GetBalance '{"symbol": "ELF", "owner": "USER_ADDRESS"}'
    ```

    The result shows that it has a balance of 2000 ELF, meaning the tokens have been received.

    ```json
    {
       "symbol": "ELF",
       "owner": "ZBBPU7DMVQ72YBQNmaKTDPKaAkHNzzA3naH5B6kE7cBm8g1ei",
       "balance": "200000000000"
    }
    ```

4. Vote for the candidate node (e.g., 20 ELF):

    ```sh
    aelf-command send AElf.ContractNames.Election Vote '{"candidatePubkey":"CANDIDATE_PUBLIC_KEY","amount":2000000000,"endTimestamp":{"seconds":1600271999,"nanos":999000}}' -a USER_ADDRESS
    ```

5. Check candidate votes:

    ```sh
    aelf-command call AElf.ContractNames.Election GetCandidateVote '{"value":"CANDIDATE_PUBLIC_KEY"}'
    ```

    After it’s executed, the result will be as follows. Here, the full node has received 20 ELF as votes.

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
       "pubkey": "BO7QDrAJzNKDeY44Yngc69Je1qRkHg4bfQ47a1kCUEBnn8TcDtyd4Wa9YwxyVRiKmurfyDL9rggoJw93xu8meQU="
    }
    ```
# Become a BP

The top 2N+1 candidate nodes are elected as BPs in the next term. Get the list of current BPs:

```sh
aelf-command call AElf.ContractNames.Consensus GetCurrentMinerPubkeyList '{}'
```

Info of the current BPs will be returned:

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

## Add More BPs
Repeat the steps to add more BPs. No need to edit `appsettings.json` again. When candidate nodes exceed the max BPs, they replace genesis nodes, which cannot participate in elections again.

Proceed to contract deployment and DApp development guides for more details.