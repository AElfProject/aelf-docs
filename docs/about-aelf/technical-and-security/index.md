---
sidebar_position: 4
title: Technical & Security
description: Keep your ELF safe
---

### 1. Has aelf blockchain and ELF token contract undergone security audit? Who is the auditor? 
The aelf blockchain and ELF token contracts have undergone multiple security audits conducted by world-class Web3 security auditors, with no security issues identified.

For detailed information, please refer to our audit reports [here](https://github.com/AElfProject/aelf-audit-reports), including those by [Certik](https://skynet.certik.com/projects/aelf).

### 2. Has aelf been hacked before? Has aelf experienced any security issues or breaches since it started? 
aelf blockchain has not experienced a security breach and will continue strengthening its network and blockchain security to ensure all assets and data are safe on aelf blockchain. Security is one of our core principles and remains as a top priority.

### 3. I got scammed. Who should I contact? How do I seek help? 
Malicious actors may attempt scams and hacks to steal your crypto tokens and assets. It is crucial to remain vigilant and skeptical, especially if you are asked for your login details or wallet seed phrases.

In the unfortunate event that a scam is successful, you can take the following steps:

**Contact Local Authorities**: Report the scam to your local law enforcement agency. They can guide you on the next steps and may be able to investigate further.

**Notify Your Financial Institution**: If the scam involves financial transactions, inform your bank or credit card company immediately. They may be able to reverse the transactions or offer further assistance.

**Get Professional Advice**: Consider seeking advice from a legal professional who can help you understand your rights and options.

#### For aelf-specific issues or to seek help within our ecosystem:

**Contact Our Support Team**: Reach out to us [here](https://form.aelf.com/contact) for assistance.

We are committed to ensuring a safe and secure environment for our users and will do our best to assist you. Please take these steps immediately to increase the chances of resolving the issue and preventing further losses.

### 4. Does aelf run any nodes? How many are there currently? 
Yes, aelf blockchain runs different types of nodes to support its network. Below are two primary types of nodes:

**Block Producer (BP)**: Participates in the consensus mechanism and produces blocks. Currently, there are 21 BPs and 4 candidate nodes. 

**Candidate Node (CN)**: Maintains a complete copy of the aelf blockchain and facilitates network communication and data propagation. 

For the most current number of nodes and their specific details, you can check the [Network DAO](https://tmrwdao.com/network-dao/vote/election?chainId=AELF).

### 5. What is the purpose of the aelf nodes? 
The nodes on the aelf blockchain serve several critical purposes, contributing to the network’s functionality and stability:

**Block Producers (BPs)**: BPs are responsible for producing new blocks and participating in decision-making processes, such as upgrades to smart contracts. By distributing nodes across various participants, aelf network achieves decentralisation. This reduces the risk of a single point of failure and enhances the robustness and reliability of aelf blockchain.

**Candidate Nodes (CNs)**: CNs maintain a complete copy of the blockchain and help propagate transactions and blocks across the network. They ensure that all participants have access to the latest blockchain data and facilitate network communication.

In summary, aelf nodes play essential roles in maintaining the blockchain’s operation, ensuring its security, decentralisation, and effective performance.

### 6. What is the consensus mechanism used by aelf?
The aelf blockchain utilises a unique Delegated Proof of Stake (DPoS) consensus mechanism called AEDPoS (aelf Delegated Proof of Stake). This mechanism is designed to provide high throughput, scalability, and security for the network.   

ELF token holders would vote to elect a set of 'Core Data Centers', which are also known as miners or block producers. The elected 'Core Data Centers' would then be assigned time slots to produce blocks in a fair manner. The block of transactions produced during the assigned time is broadcast to the network for validation. Other Core Data Centers would validate the block and reach a consensus. Once deemed valid, it is added to the blockchain.

### 7. How are transactions processed on the aelf network?
Transactions on the aelf blockchain are processed through a combination of its AEDPoS (aelf Delegated Proof of Stake) consensus mechanism and sidechain architecture that enables parallel processing. Here's what happens when a user initiates a transaction:
- The transaction is broadcast to the relevant network and sidechain
- The Core Data Center (also known as the miner) of that particular sidechain will validate the transaction and package it into blocks
- Through the AEDPoS, the elected Core Data Centers take turns to produce blocks. The produced blocks are validated by other Core Data Centers to ensure accuracy and integrity.
- Once a block is validated and added to the sidechain's blockchain, the transactions are final and irreversible
- In the event a transaction requires interaction between different sidechains, aelf's interoperability ensures the transfer and synchronisation of data across chains.

### 8. What are the common issues users face with aelf and their solutions?
Some common issues that users may face include network congestion, technical difficulties, security concerns, and user interface challenges. aelf has implemented a variety of solutions to address these potential challenges.

#### Network Congestion
Users might experience delays during peak times. 

**Solution**: aelf's multi-sidechain architecture distributes workload efficiently to minimise congestion.

#### Technical Difficulties
Issues with wallet integration or transaction processing. 

**Solution**: aelf provides detailed documentation and responsive customer support to assist users.

#### Security Concerns
Users might worry about the safety of their assets. 

**Solution**: Regular security audits and robust security protocols are in place to ensure the safety of the network.

#### User Interface Challenges
Navigating the platform might be difficult for new users. 

**Solution**: User-friendly interfaces and tutorials are provided to ease the onboarding process.

### 9. How does aelf's Layer 2 ZK Rollup technology work, and what benefits does it offer?
aelf has been developing new technologies to optimise its blockchain. We are aiming to complete the implementation of Zero-Knowledge (ZK) rollups and we expect the benefits of performance and usability improvements to our blockchain network.

Benefits of implementing ZK rollups on aelf include:
- **Scalability**: ZK rollups significantly increase transaction throughput by bundling multiple transactions into a single batch, which is then processed off-chain. This reduces the load on the main blockchain.
- **Cost Efficiency**: By reducing the number of transactions that need to be processed on-chain, ZK rollups lower the gas fees associated with each transaction, making them more cost-effective.
- **Security**: ZK rollups use zero-knowledge proofs to ensure the validity of off-chain transactions. These proofs are verified on-chain, maintaining the security and integrity of the blockchain.
- **Speed**: Off-chain transaction processing is faster, resulting in quicker transaction finality and improved user experience.
- **Reduced Data Storage**: Since only a small amount of data needs to be stored on-chain (mainly the proof and the batch's final state), it helps in reducing blockchain's storage.
- **Interoperability**: ZK rollups can be designed to work with various layer-1 blockchains, enhancing cross-chain compatibility and communication.

### 10. How does aelf compare to other blockchain platforms in terms of transaction speed and scalability?
aelf stands out in the blockchain landscape with its exceptional transaction speed and scalability. Its multi-sidechain architecture enables parallel processing of transactions, significantly enhancing both speed and scalability compared to traditional single-chain systems. Furthermore, aelf leverages advanced Layer 2 solutions such as ZK Rollups to further improve performance and efficiency. In terms of benchmarking, aelf consistently performs favourably against other leading blockchain platforms in transaction throughput and network efficiency. Additionally, aelf integrates artificial intelligence (AI) to optimise various aspects of its operations, including smart contract execution and network management, which further boosts its performance and scalability. This combination of multi-sidechain architecture, advanced Layer 2 solutions, and AI integration positions aelf as a superior choice in the blockchain arena.

### 11. What is the difference between aelf's MainChain and SideChains?
aelf's MainChain and SideChains serve distinct but complementary roles within its blockchain architecture. The MainChain acts as the backbone of the network, responsible for overall governance, security, and coordination. It manages cross-chain interactions and ensures the integrity of the entire ecosystem. SideChains, on the other hand, are specialised chains that handle specific types of transactions or applications. They operate independently but are connected to the MainChain, allowing for parallel processing of transactions. This design significantly enhances scalability by distributing the workload across multiple SideChains, reducing congestion and improving performance. Each SideChain can be customised for different use cases, providing flexibility and efficiency in handling diverse applications.

### 12. What is the transaction gas fee on the aelf blockchain? Are there any addresses that are exempt from fees?
Since the upgrade in July 2023, aelf has reduced transaction fees from an average of approximately 0.3 ELF to around 0.003 ELF. 

To enjoy a daily exemption of 1 ELF worth of transaction fees, your wallet address needs to:

<ol type="a">
  <li>Hold 10 ELF or more; or</li>
  <li>Hold 5 USDT or more.</li>
</ol>

If an address holds both more than 10 ELF and 5 USDT simultaneously, the exemption is increased to 2 ELF per day.

You may read more here: https://medium.com/aelfblockchain/aelf-contract-upgrade-and-parameter-change-december-2023-19c8668fd2e0

If address A has a balance of 10 ELF or more at 1:00 UTC today, it can enjoy a fee exemption of 1 ELF for the next 24 hours. During this 24-hour cycle, if the 1 ELF fee exemption is used up, subsequent transactions will incur standard fees. The fee exemption will reset to 1 ELF at the beginning of the next 24-hour cycle, regardless of whether the fee exemption is fully utilized during the first 24-hour cycle. 

If address A has a balance of 10 ELF at 1:00 UTC today but transfers out 7 ELF at 2:00 UTC today, the transfer of 7 ELF from address A can still benefit from the fee exemption. However, to continue enjoying the fee exemption in the next 24-hour cycle, the balance must be replenished to at least 10 ELF.

### 13. At what block confirmation number on the aelf blockchain can we consider it unlikely that a chain becomes reversible?

Typically, when the block confirmation number reaches 250~300, it can be considered secure from becoming reversible.

The most accurate method is to follow the calculation based on the LIB (Last Irreversible Block). A transaction is considered irreversible when its status is 'MINED' and the block height is less than the LastIrreversibleBlockHeight in the ChainStatus.

### 14. What is the RPC service address for the SideChain tDVV?
You can access it via the following link: https://tdvv-public-node.aelf.io/

### 15. Is a cross-chain transaction on the aelf blockchain considered a single transaction or two? Are there any examples? 
Cross-chain transactions between the MainChain and SideChain are considered two separate transactions. For example, transferring 1.5 ELF from the SideChain address ELF_75sSRT8rJqrKNF8h169qwwhiFLgXjaoLjthtA6ihnf7TnRDqB_tDVV to the MainChain address ELF_75sSRT8rJqrKNF8h169qwwhiFLgXjaoLjthtA6ihnf7TnRDqB_AELF:

First, a transaction called CrossChainTransfer is initiated on the SideChain: https://tdvv-explorer.aelf.io/tx/2b01a4cac416ae77c6f98c8a7cace66d2fb1edd565a5c0bedb9f44b395103895

Then, a transaction called CrossChainReceiveToken is generated on the MainChain: https://explorer.aelf.io/tx/db29e36851549e3c5650ba853078ab02c6bb31c252ddfd7e0f8a7c33191ca3dd

### 16. How to become a Block Producer (BP)? How to run a full node?
You can refer to the aelf Developer Resources.

Here is a guide on how to apply to be a BP: https://docs.aelf.com/quick-start/node-operators/apply-to-be-a-bp/

Here is a guide on how to set up a node on Mainnet: https://docs.aelf.com/quick-start/node-operators/set-up-a-node-on-mainnet/