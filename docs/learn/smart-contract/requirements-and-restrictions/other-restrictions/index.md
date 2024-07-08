---
sidebar_position: 4
title: Other Restrictions
description: Method, contract patcher & state size 
---

# Other Restrictions

## GetHashCode Usage
The GetHashCode method can only be called within other GetHashCode methods. Calling GetHashCode from other methods is not permitted. This restriction allows developers to implement custom GetHashCode methods for their own types and also supports protobuf-generated message types.

It is prohibited to modify any field within GetHashCode methods.

## Execution Observer
aelf's contract patcher automatically includes a method call count observer for your contract. This feature prevents infinite method calls, such as recursion. During transaction execution, the observer counts the number of methods called. If this count exceeds 15,000, transaction execution pauses. Adjustments to this limit are managed by Parliament.

Additionally, aelf's contract patcher includes a method branch count observer for your contract. This prevents infinite loop scenarios by counting control transfers within your contract code during transaction execution. If the number of control transfers exceeds 15,000, transaction execution pauses. The control transfer opcodes in C# contracts are listed below.

| Opcode           | Description     |
|------------------|-----------------|
| OpCodes.Beq      | Branch if equal |
| OpCodes.Beq_S    | Branch if equal (short form) |
| OpCodes.Bge      | Branch if greater than or equal |
| OpCodes.Bge_S    | Branch if greater than or equal (short form) |
| OpCodes.Bge_Un   | Branch if greater than or equal (unsigned) |
| OpCodes.Bge_Un_S | Branch if greater than or equal (unsigned, short form) |
| OpCodes.Bgt      | Branch if greater than |
| OpCodes.Bgt_S    | Branch if greater than (short form) |
| OpCodes.Ble      | Branch if less than or equal |
| OpCodes.Ble_S    | Branch if less than or equal (short form) |
| OpCodes.Ble_Un   | Branch if less than or equal (unsigned) |
| OpCodes.Blt      | Branch if less than |
| OpCodes.Bne_Un   | Branch if not equal (unsigned) |
| OpCodes.Bne_Un_S | Branch if not equal (unsigned, short form) |
| OpCodes.Br       | Branch unconditional |
| OpCodes.Brfalse  | Branch if false |
| OpCodes.Brfalse_S| Branch if false (short form) |
| OpCodes.Brtrue   | Branch if true |
| OpCodes.Brtrue_S | Branch if true (short form) |
| OpCodes.Br_S     | Branch unconditional (short form) |

## State Size Limit
Data written to State is subject to a size limit enforced by aelf's contract patcher, set at 128 KB by default. This ensures contracts cannot store excessively large data. Any adjustments to this limit are decided by Parliament.