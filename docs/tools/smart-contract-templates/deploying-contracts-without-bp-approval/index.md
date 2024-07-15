---
sidebar_position: 5
title: Deploying Contract without BP Approval
---

# Deploying Contracts without BP Approval

Contracts can be deployed/updated via aelf explorer or aelf-command. Ensure npm and aelf-command are installed before starting. Follow the [Deployment Environment guide](#) if needed.

## Overview

In these 6 cases, **BP approval is not needed for contract deployment/updates:**

- Deploying user contracts on shared SideChains (initiated by users or BPs).
- Updating user contracts on shared SideChains (initiated by contract creators).
- Deploying user contracts on exclusive SideChains (initiated by SideChain creators).
- Updating user contracts on exclusive SideChains (initiated by contract creators).
- Deploying user contracts on MainChain (initiated by BPs, recommended on SideChains).
- Updating user contracts on MainChain (initiated by contract creators).

![Deploying Contract without BP Approval](/img/No-BP-approval-required.webp)

User contracts are non-system contracts. Contracts must implement ACS12 standards. No BP approval is needed; developers initiate 1 transaction to deploy/update contracts.

## Contracts Deployment/Update Procedure

### Developer: DeployUserSmartContract / UpdateUserSmartContract

**Contract Deployment**

1. Developer initiates `DeployUserSmartContract`.
2. A `CodeCheck` proposal is created for BP code review.
3. Transaction returns `CodeHash` of the contract deployment.

**Contract Update**

1. Developer initiates `UpdateUserSmartContract`.
2. A `CodeCheck` proposal is created for BP code review.

### BP: Parliament.ApproveMultiProposals (Automatic)

BPs automatically complete the code check. If it passes, an `ApproveMultiProposals` transaction is initiated, approving the `CodeCheck` proposal.

### BP: ReleaseApprovedUserSmartContract (Automatic)

Once 2/3 (rounding down) + 1 BPs approve the code check, they release the `CodeCheck` proposal by initiating the `ReleaseApprovedUserSmartContract` transaction, completing the deployment/update.

If the code check fails, the process stops.

### Developer: GetSmartContractRegistrationByCodeHash

To get the deployed/updated contract address:

1. Use the `CodeHash` from `DeployUserSmartContract`/`UpdateUserSmartContract` to check the address via `GetSmartContractRegistrationByCodeHash`.

The result is available after at least one round of block production.

If there are errors, the transaction will fail, and error info can be obtained from the transaction results. If the address is not available after 10 minutes, check:

- If the contract implements ACS12 standards.
- If the contract development scaffold is the latest version.