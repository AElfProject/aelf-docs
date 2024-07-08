---
sidebar_position: 1
title: Project Requirements
description: Protobuf and Overflow Checks
---


# Contract Project Requirements

## Project Properties

### Add Contract Proto File
Ensure to add a contract proto file in the contract directory of your project. This allows aelf’s contract patcher to process the DLL, enabling necessary injections for code checks during deployment. Without this, deployment will fail.

```tree
src
├── Protobuf 
│ └── contract
│ └── hello_world_contract.proto
```

### Enable Overflow Checks
Enable `CheckForOverflowUnderflow` for both Release and Debug modes. This ensures arithmetic operations that overflow will throw an `OverflowException`, preventing unpredictable results.

```xml
<PropertyGroup Condition=" '$(Configuration)' == 'Debug' ">
  <CheckForOverflowUnderflow>true</CheckForOverflowUnderflow>
</PropertyGroup>

<PropertyGroup Condition=" '$(Configuration)' == 'Release' ">
  <CheckForOverflowUnderflow>true</CheckForOverflowUnderflow>
</PropertyGroup>
```

If your contract has unchecked arithmetic operations, deployment will fail.