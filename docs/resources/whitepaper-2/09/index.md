---
sidebar_position: 9
title: 7. Technology developments beyond AI - A Modular Blockchain
description: ""
---
# aelf as a modular blockchain

A modular blockchain is a design approach that focuses on handling a limited set of responsibilities while outsourcing the rest to one or more independent layers. It decomposes the various tasks or functions of a blockchain into distinct layers or modules. This segregation allows for improved performance, scalability, and customization.

**Execution Layer:** This layer is where transactions and state changes occur, such as modifying wallet balances. Users interact with this layer through transaction operations, currency transfers, and smart contract deployments.

**Settlement Layer:** An optional layer in Modular Blockchain, it is responsible for verifying and settling rollup transactions. Rollup transactions are a technique that bundles multiple transactions into a single one for improved efficiency.

**Consensus Layer:** This layer provides ordering and finality through a network of full nodes. These full nodes download and execute block contents, reaching a consensus on the validity of state transitions.

**Data Availability Layer:** This layer contains data that has already been confirmed as valid. It ensures that the data required for verifying state transitions is available and easily verifiable.

By separating these tasks, a modular blockchain enables independent optimization of each layer, leading to significant improvements across layers. This results in a more scalable, composable, and decentralized system. This is why Modular Blockchain is often considered the future of blockchain technology.

## The present status of aelf

As elaborated before, aelf operates on a mainchain-sidechain architecture. Its sidechains resemble the consumer chains of Cosmos or the parachains of Polkadot. Similar to these platforms, aelf decouples functionality at the code level — a modular or deconstructed approach rooted in software engineering principles. The primary objectives of this architecture are to facilitate the development of modular plugins within the aelf ecosystem and to enable the loading of various modules in a pluggable manner, thereby enhancing aelf's scalability and flexibility. For instance, the consensus functionality can be treated as a pluggable/replaceable code package, making it convenient for developers to customize.

Notwithstanding the aforementioned points, the current mainchain-sidechain architecture of aelf experiences performance bottlenecks, particularly in terms of its TPS capacity. Introducing a new Layer 2 chain utilizing ZK Rollup technology would considerably enhance aelf's performance, scalability, and compatibility with the Ethereum Virtual Machine (EVM). Consequently, we have initiated the Modular + ZK Rollup project to address these challenges.

## The aelf solution

We are building a ZK-rollup on aelf, based on the Polygon CDK, operating in the validium mode. Its primary components include:

**1. Executor/Verifier:** zkEVM / ZKProver

**2. Data Availability:** External DA + Data Availability Committee (DAC)

**3. Consensus:** On-chain Smart Contracts

**4. Sequencer**

**5. Bridge**

### Verification Process

The aelf ZK-rollup utilizes Polygon CDK, an advanced open-source framework designed for rapidly deploying ZK-powered Layer 2 (L2) blockchains on Ethereum, with significant adaptation and optimization efforts. 

Operating in the validium mode while maintaining seamless interoperability with all other EVM chains, aelf ZK-rollup offers a high-performance Layer 2 scaling solution. As transaction data is not stored on the aelf mainnet but executed and stored off-chain, this significantly enhances scalability. Validium, under the premise of ensuring security, reduces L1 gas storage costs, thereby lowering transaction costs for users on Layer 2 while significantly improving user privacy and experience.

Unlike traditional rollups and sidechains, aelf ZK-rollup only shares proofs of validity, which are used to confirm transaction outcomes with Layer 1, rather than the actual executed transaction data. Its operation works as follows: A verifier smart contract is deployed on aelf Layer 1, and validium submits proofs of validity to this contract. These proofs, inherently zero-knowledge, contain transaction results without revealing specific transaction data.

The verifier smart contract assesses the validity of the proofs. Should any batch submitted by validium be found invalid, it will be rejected and not stored on the aelf Layer 1.

### Consensus Contract

ZkEVM.cs is the underlying protocol that ensures the correctness of state changes by using validity proofs. To confirm adherence to specific predefined rules for state transitions, the consensus contract (ZkEVM.cs, deployed on aelf Layer 1) comes into play.

ZkEVM.cs is responsible for verifying validity proofs to confirm that each transaction has been executed correctly, using ZK-SNARK circuits for validation. For the system to function properly, two key processes are involved: **transaction batching** and **transaction verification**. To carry out these processes, aelf ZK-rollup involves two types of participants: **sequencers** and **aggregators**.

**1. Sequencer:** Proposes transaction batches to the network, grouping and adding transaction requests to ZkEVM.cs.

**2. Aggregator:** Reviews the validity of transaction batches and provides necessary validity proofs. Permissionless aggregators can submit these proofs to attest to the accuracy of state transition computations.

### Data Availability

aelf ZK-rollup's validium mode incorporates a secure data availability layer managed by the DAC, which:

1. Verifies the availability of data associated with specific blockchain blocks; and

2. Ensures data robustness and computational efficiency for aelf ZK-rollup.

Advantages of DAC include:

1.  reduce transaction fees; less computation equals lower costs. 

2. state privacy; maintaining secure records of state changes for data integrity.

### aelf ZK-rollup Node

aelf ZK-rollup Node is used to process transactions, synchronizes states, generates, and submits proofs. Sequencers and aggregators manage L2 state and finality on L1. 

#### zkEVM / ZKProver

One of the core functionalities of aelf ZK-rollup's nodes is its zkEVM and ZKProver. The general operation flow is as follows: zkEVM / ZKProver receives a large batch of transactions from Layer 2, executes the transactions, and utilizes ZK (Zero-Knowledge) technology to generate zero-knowledge proofs. The proof generation process is outlined below:

1. The node sends the contents of the Merkle tree to the database for storage.

2. Subsequently, the node sends a batch of transactions to the ZKProver component.

3. ZKProver accesses the database and retrieves necessary information to generate verifiable proofs for the transactions sent by the node. This information includes the Merkle root, keys, and hash values of relevant sibling nodes.

4. Finally, ZKProver generates proofs for the transactions and sends them back to the node.

![](/img/screenshot_2024-07-17_at_10.58.59_am.png)

#### Sequencer

The Sequencer is responsible for ordering transactions and constantly updating the global state:

1. Transaction Ordering: Retrieves transactions from the pool and adds them to the state.

2. State Transition: Collaborates with the Executor to process transactions and update the state.

3. Trustworthy Finality: Once the Sequencer adds a transaction to the state, it shares this information with other nodes, making the transaction final. Other nodes need to trust that the transaction has been added to the state until they receive data availability (DA) and validity (ZKP) confirmations, as detailed in the **aelf ZK-Rollup Transactions section below (Pre-validated State - Committed State - Verified State).**

#### Aggregator

The Aggregator is responsible for submitting proofs of the validity of the Layer 2 state to Layer 1. To achieve this, it takes batches ordered by the Sequencer and interacts with Provers to generate Zero-Knowledge Proofs (ZKPs). To efficiently accomplish this, the Aggregator will:

1. Coordinate with one or more Provers

2. Aggregate proofs for multiple batches, where a single proof can validate multiple batches

#### Bridge

Token asset access and contract invocations (message passing) between aelf's Layer 2 and Layer 1 are facilitated through the zkEVM Bridge smart contract. It achieves network interoperability by utilizing two distinct Global Exit Tree Root managers on Layer 1 and Layer 2, along with the bridging smart contract (ZkEVMBridge.cs).

#### **Gas Fees**

aelf ZK-rollup involves two primary participants who both earn and pay ELF tokens as gas fee.

**Sequencer:**

\- Pays gas fees for creating and proposing batches.

\- Receives fees paid by transaction requesters or network users as rewards when successfully proposing valid batches containing valid transactions.

**Aggregator:**

\- Validates transactions proposed and batched by the Sequencer.

\- Runs on the aelf ZK-rollup's ZKNode software and utilizes ZKProver to create zero-knowledge validity proofs.

\- Provides validity proofs to verify transactions, earning ELF fees paid by the Sequencer for each successful verification.

### Transaction Journey on aelf ZK-rollup

Before conducting Layer 2 transactions, users need to transfer some ELF from L1 to L2 through the aelf ZK-rollup bridge for gas fees. The subsequent steps are as follows:

1. Users initiate a transaction from their wallet (e.g. Portkey) and send it to the Sequencer.

2. Once the Sequencer commits to adding the transaction, it is finalized on L2.

3. At this point, the transaction is settled on L2, but its state has not yet propagated to L1. This state is known as the Pre-validated State.

4. The Sequencer transfers batch data to a smart contract on L1, allowing any node to safely and trustlessly synchronize its state from L1. This state is called the Committed State.

5. The Aggregator collects pending transactions for validation and constructs proofs to achieve finality on L1.

6. Once the proofs are verified, the user's transaction achieves finality on L1, a crucial step for withdrawals and other operations. This state is referred to as the Verified State.
