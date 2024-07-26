---
sidebar_position: 4
title: Deploying Contracts with BP Approval
description: Deploy contracts with Block Producer approval
---

# Deploying Contract with BP Approval

Contracts can be deployed or updated via two methods: aelf explorer or aelf-command. Ensure npm and aelf-command are installed before starting. Follow the [Deployment Environment guide](/tools/smart-contract-templates/development-environment) if needed.

## Overview

In these cases, **BP approval is needed for contract updates:**

- Upgrading system contracts on MainChain.
- Upgrading system contracts on exclusive SideChains.
- Upgrading system contracts on shared SideChains.

System contracts can only be deployed in the Genesis block. After launch, only updates are supported. This guide focuses on contract deployment on aelf Mainnet with `ContractDeploymentAuthorityRequired` set to true.

## Deploy / Update through aelf Explorer

To deploy/update contracts on AElf Mainnet with `ContractDeploymentAuthorityRequired` true, create an AElf wallet and have around 100 ELF. When `ContractDeploymentAuthorityRequired` is false, use `DeploySmartContract` and `UpdateSmartContract` in Contract Zero.

[Learn how to deploy contracts through aelf Explorer](#)

## Deploy / Update through aelf-command

![Diagram for deploy through aelf command](/img/BP-approval-required.png)

### Contracts Deployment/Update Procedure

#### Developer: ProposeNewContract / ProposeUpdateContract

**Contract Deployment**

1. Developer initiates `ProposeNewContract`.
2. A `ProposeContractCodeCheck` proposal is created for BP code review.
3. If 2/3 (rounding down) + 1 BPs approve, the developer releases the approved proposal, triggering an automatic `CodeCheck` proposal. If denied, deployment stops.

**Contract Update**

1. Developer initiates `ProposeUpdateContract`.
2. A `ProposeContractCodeCheck` proposal is created for BP code review.
3. If 2/3 (rounding down) + 1 BPs approve, the developer releases the approved proposal, triggering an automatic `CodeCheck` proposal. If denied, the update stops.

#### BP: Parliament.Approve

BPs approve the `ProposeContractCodeCheck` proposal:

- 2/3 (rounding down) + 1 votes in favor.
- No more than 10% votes against.
- No more than 10% abstentions.
- At least 80% BP participation.

#### Developer: ReleaseApprovedContract

If 2/3 (rounding down) + 1 BPs approve, the developer initiates `ReleaseApprovedContract` to release the proposal, creating a `CodeCheck` proposal for automatic code check.

#### BP: Parliament.ApproveMultiProposals (Automatic)

BPs complete the code check. If it passes, an `ApproveMultiProposals` transaction is initiated automatically, approving the `CodeCheck` proposal. If it fails, the process stops.

#### Developer: ReleaseCodeCheckedContract

The developer initiates `ReleaseCodeCheckedContract` to release the `CodeCheck` proposal. The `DeploySmartContract` or `UpdateSmartContract` method is executed, completing the deployment/update.