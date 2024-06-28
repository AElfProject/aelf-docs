---
sidebar_position: 12
title: ACS12 - User Contract Standard
description: Manage user contracts. Required on testnet.
---

# ACS12 - User Contract Standard
ACS12 is a standard used to manage user contracts.

## Types

### `acs12.UserContractMethodFees`
| Field  | Type                    | Label     | Description                            |
|--------|-------------------------|-----------|----------------------------------------|
| `fees` | `acs12.UserContractMethodFee` | repeated | List of fees to be charged.            |
| `is_size_fee_free` | `bool`       |           | Optional based on the implementation of `SetConfiguration` method. |

### `acs12.UserContractMethodFee`
| Field       | Type    | Label     | Description                            |
|-------------|---------|-----------|----------------------------------------|
| `symbol`    | `string`|           | The token symbol of the method fee.     |
| `basic_fee` | `int64` |           | The amount of fees to be charged.       |