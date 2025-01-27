---
sidebar_position: 9
title: Allowance dApp
description: Smart contracts explaining inter-contract calls
---

**Description**: This project demonstrates the integration of two smart contracts, RoleContract and AllowanceContract, focusing on role-based access and fund management. It highlights **inter-contract calls**, where the allowance logic depends on roles retrieved dynamically from the role contract.

**Purpose**: The purpose of this dApp is to teach state management, access control, and inter smart contract calls on the aelf blockchain. This example models how multi-contract systems work together and call each other to securely manage roles and funds in a blockchain environment.
**Difficulty Level**: Moderate

<iframe width="100%" style={{"aspect-ratio": "16 / 9"}} src="https://www.youtube.com/embed/LPWVIlLJY5I?si=nEkHdrWz8UK1Czk0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Step 1 - Setting up your development environment

import Setup from "../\_setup.md"

<Setup />

## Step 2 - Develop Role Smart Contract

import DevelopRoleContract from "./\_develop_role_contract.md"

<DevelopRoleContract />

## Step 3 - Deploy Role Smart Contract

import DeployRoleContract from "./\_deploy_role_contract.md"

<DeployRoleContract />

## Step 4 - Develop Allowance Smart Contract

import DevelopAllowanceContract from "./\_develop_allowance_contract.md"

<DevelopAllowanceContract />

## Step 5 - Deploy Allowance Smart Contract

import DeployAllowanceContract from "./\_deploy_allowance_contract.md"

<DeployAllowanceContract /> 

## Step 6 - Interact with Your Deployed Smart Contract through dApp

import ProjectSetup from "./\_frontend_project_setup.md"
import FrontendIntegration from "./\_frontend_integration.md"
import FrontendRunApplication from "./\_frontend_run_application.md"
import Conclusion from "./\_conclusion.md"

<ProjectSetup />
<FrontendIntegration />
<FrontendRunApplication />
<Conclusion />

