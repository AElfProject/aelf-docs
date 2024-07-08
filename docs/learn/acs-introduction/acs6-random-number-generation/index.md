---
sidebar_position: 6
title: Random Number
description: ACS6
---

# ACS6 - Random Number Provider Standard
To generate a random number in your contract, use ACS6.

## Interface
To provide a random number based on input, implement this interface:

### Methods
| Method Name     | Request Type               | Response Type              | Description                               |
|-----------------|----------------------------|----------------------------|-------------------------------------------|
| GetRandomBytes  | google.protobuf.BytesValue | google.protobuf.BytesValue | Get the random number provided by the contract. |

## Usage
Override the `GetRandomBytes` method to return a random number based on the given input. The logic for generating the random number is up to you. Ensure you return a `BytesValue` type so the caller can deserialize the output.

## Implementation
The simplest implementation:

```cs
public override BytesValue GetRandomBytes(BytesValue input)
{
    var serializedInput = new GetRandomBytesInput();
    serializedInput.MergeFrom(input.Value);
    var value = new Hash();
    value.MergeFrom(serializedInput.Value);
    var randomHashFromContext = Context.GetRandomHash(value);

    return new BytesValue
    {
        Value = serializedInput.Kind == 1
            ? new BytesValue {Value = randomHashFromContext.Value}.ToByteString()
            : new Int64Value {Value = Context.ConvertHashToInt64(randomHashFromContext, 1, 10000)}.ToByteString()
    };
}
```