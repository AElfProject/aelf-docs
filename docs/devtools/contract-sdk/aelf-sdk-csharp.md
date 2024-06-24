# AElf.Sdk.CSharp

## BoolState `type`
**Namespace:** AElf.Sdk.CSharp.State

Wrapper for boolean values in smart contract state.

## BytesState `type`
**Namespace:** AElf.Sdk.CSharp.State

Wrapper for byte arrays in smart contract state.

## CSharpSmartContractContext `type`
**Namespace:** AElf.Sdk.CSharp

Represents the transaction execution context in a smart contract. Available in the base class for smart contracts (Context property). Provides access to properties and methods useful for implementing smart contract logic.

### ChainId `property`
The chain ID of the chain where the contract runs.

### CurrentBlockTime `property`
The time included in the current block's header.

### CurrentHeight `property`
The height of the block containing the currently executing transaction.

### Origin `property`
The address of the sender (signer) of the transaction. This value is constant, even for nested inline calls. It represents the entity that created the transaction (user or smart contract).

### PreviousBlockHash `property`
The hash of the block preceding the current one in the blockchain.

### Self `property`
The address of the contract currently being executed. This changes with every transaction and inline transaction.

### Sender `property`
The sender of the currently executing transaction.

### StateProvider `property`
Provides access to the underlying state provider.

### TransactionId `property`
The ID of the currently executing transaction.

### Variables `property`
Provides access to variables of the bridge.

### Transaction `property`
Includes transaction info.

### Call(fromAddress, toAddress, methodName, args) `method`
Calls a method on another contract.

**Returns:**  
The result of the call.

**Parameters:**
| Name        | Type                  | Description                                                                |
|-------------|-----------------------|----------------------------------------------------------------------------|
| fromAddress | AElf.Types.Address    | The address to use as sender.                                              |
| toAddress   | AElf.Types.Address    | The address of the contract you’re seeking to interact with.               |
| methodName  | System.String         | The name of the method you want to call.                                   |
| args        | Google.Protobuf.ByteString | The input arguments for calling that method. This is usually generated from the protobuf definition of the input type. |

**Generic Types:**
| Name        | Description                                                                |
|-------------|----------------------------------------------------------------------------|
| T           | The type of the return message                                             |

## ConvertHashToInt64(hash, start, end) `method`
Converts the input hash to a 64-bit signed integer.

### Returns
The 64-bit signed integer.

### Parameters
| Name  | Type              | Description                                      |
|-------|-------------------|--------------------------------------------------|
| hash  | AElf.Types.Hash   | The hash.                                        |
| start | System.Int64      | Inclusive lower bound of the number returned.    |
| end   | System.Int64      | Exclusive upper bound of the number returned.    |

### Exceptions
| Name                     | Description                                        |
|--------------------------|----------------------------------------------------|
| System.ArgumentException | startValue is less than 0 or greater than endValue.|

## ConvertVirtualAddressToContractAddress(virtualAddress) `method`
Converts a virtual address to a contract address.

### Returns
The converted address.

### Parameters
| Name           | Type             | Description                  |
|----------------|------------------|------------------------------|
| virtualAddress | AElf.Types.Hash  | The virtual address to convert.|

## ConvertVirtualAddressToContractAddress(virtualAddress, contractAddress) `method`
Converts a virtual address to a contract address with the contract address.

### Returns
The converted address.

### Parameters
| Name           | Type              | Description                   |
|----------------|-------------------|-------------------------------|
| virtualAddress | AElf.Types.Hash   | The virtual address to convert.|
| contractAddress| AElf.Types.Address| The contract address.         |

## ConvertVirtualAddressToContractAddressWithContractHashName(virtualAddress) `method`
Converts a virtual address to a contract address with the current contract hash name.

### Returns
The converted address.

### Parameters
| Name           | Type             | Description                  |
|----------------|------------------|------------------------------|
| virtualAddress | AElf.Types.Hash  | The virtual address to convert.|

## ConvertVirtualAddressToContractAddressWithContractHashName(virtualAddress, contractAddress) `method`
Converts a virtual address to a contract address with the contract hash name.

### Returns
The converted address.

### Parameters
| Name           | Type              | Description                   |
|----------------|-------------------|-------------------------------|
| virtualAddress | AElf.Types.Hash   | The virtual address to convert.|
| contractAddress| AElf.Types.Address| The contract address.         |

## DeployContract(address, registration, name) `method`
Deploy a new smart contract (only the genesis contract can call it).

### Parameters
| Name         | Type                               | Description                         |
|--------------|------------------------------------|-------------------------------------|
| address      | AElf.Types.Address                 | The address of the new smart contract.|
| registration | AElf.Types.SmartContractRegistration| The registration of the new smart contract.|
| name         | AElf.Types.Hash                    | The hash value of the smart contract name.|

## FireLogEvent(logEvent) `method`
This method is used to produce logs that can be found in the transaction result after execution.

### Parameters
| Name     | Type               | Description         |
|----------|--------------------|---------------------|
| logEvent | AElf.Types.LogEvent| The event to fire.  |

## GenerateId(contractAddress, bytes) `method`
Generate a hash type id based on the contract address and the bytes.

### Returns
The generated hash type id.

### Parameters
| Name           | Type                                       | Description                              |
|----------------|--------------------------------------------|------------------------------------------|
| contractAddress| AElf.Types.Address                         | The contract address for id generation.  |
| bytes          | System.Collections.Generic.IEnumerable<Byte>| The bytes for id generation.             |

## GetContractAddressByName(hash) `method`
Get the address of a system contract by its name hash. These hashes are in the SmartContractConstants.cs file.

### Returns
The address of the system contract.

### Parameters
| Name | Type             | Description               |
|------|------------------|---------------------------|
| hash | AElf.Types.Hash  | The hash of the name.     |

## GetPreviousBlockTransactions() `method`
Returns the transactions included in the previous block.

### Returns
A list of transactions.

## GetRandomHash(fromHash) `method`
Gets a random hash based on the input hash.

### Returns
Random hash.

### Parameters
| Name     | Type            | Description |
|----------|-----------------|-------------|
| fromHash | AElf.Types.Hash | Hash.       |

## GetSystemContractNameToAddressMapping() `method`
Get the mapping of system contract addresses to their name hashes.

### Returns
The addresses with their hashes.

## GetZeroSmartContractAddress() `method`
Returns the address of the Genesis contract (smart contract zero) of the current chain.

### Returns
The address of the genesis contract.

## GetZeroSmartContractAddress(chainId) `method`
Returns the address of the Genesis contract (smart contract zero) of the specified chain.

### Returns
The address of the genesis contract for the given chain.

### Parameters
| Name    | Type         | Description     |
|---------|--------------|-----------------|
| chainId | System.Int32 | The chain’s ID. |

## LogDebug(func) `method`
Logs information for debugging. Visible only when the node is in debug mode.

### Parameters
| Name | Type                       | Description                             |
|------|----------------------------|-----------------------------------------|
| func | System.Func<System.String> | The logic for logging purposes.         |

## RecoverPublicKey() `method`
Recovers the public key of the transaction sender.

### Returns
A byte array representing the public key.

## SendInline(toAddress, methodName, args) `method`
Sends an inline transaction to another contract.

### Parameters
| Name       | Type                    | Description                                             |
|------------|-------------------------|---------------------------------------------------------|
| toAddress  | AElf.Types.Address      | The address of the contract to interact with.           |
| methodName | System.String           | The name of the method to call.                         |
| args       | Google.Protobuf.ByteString | The input arguments, usually generated from protobuf.  |

## SendVirtualInline(fromVirtualAddress, toAddress, methodName, args) `method`
Sends a virtual inline transaction to another contract.

### Parameters
| Name              | Type                    | Description                                             |
|-------------------|-------------------------|---------------------------------------------------------|
| fromVirtualAddress| AElf.Types.Hash         | The hash for generating the virtual address.            |
| toAddress         | AElf.Types.Address      | The address of the contract to interact with.           |
| methodName        | System.String           | The name of the method to call.                         |
| args              | Google.Protobuf.ByteString | The input arguments, usually generated from protobuf.  |

## SendVirtualInline(fromVirtualAddress, toAddress, methodName, args, logTransaction) `method`
Sends a virtual inline transaction to another contract and logs the transaction.

### Parameters
| Name              | Type                    | Description                                             |
|-------------------|-------------------------|---------------------------------------------------------|
| fromVirtualAddress| AElf.Types.Hash         | The hash for generating the virtual address.            |
| toAddress         | AElf.Types.Address      | The address of the contract to interact with.           |
| methodName        | System.String           | The name of the method to call.                         |
| args              | Google.Protobuf.ByteString | The input arguments, usually generated from protobuf.  |
| logTransaction    | System.Boolean          | Whether to log the inline transaction.                  |

## SendVirtualInlineBySystemContract(fromVirtualAddress, toAddress, methodName, args) `method`
Sends a virtual inline transaction using a system smart contract.

### Parameters
| Name              | Type                    | Description                                             |
|-------------------|-------------------------|---------------------------------------------------------|
| fromVirtualAddress| AElf.Types.Hash         | The hash for generating the virtual address.            |
| toAddress         | AElf.Types.Address      | The address of the contract to interact with.           |
| methodName        | System.String           | The name of the method to call.                         |
| args              | Google.Protobuf.ByteString | The input arguments, usually generated from protobuf.  |

## SendVirtualInlineBySystemContract(fromVirtualAddress, toAddress, methodName, args, logTransaction) `method`
Sends a virtual inline transaction using a system smart contract and logs the transaction.

### Parameters
| Name              | Type                    | Description                                             |
|-------------------|-------------------------|---------------------------------------------------------|
| fromVirtualAddress| AElf.Types.Hash         | The hash for generating the virtual address.            |
| toAddress         | AElf.Types.Address      | The address of the contract to interact with.           |
| methodName        | System.String           | The name of the method to call.                         |
| args              | Google.Protobuf.ByteString | The input arguments, usually generated from protobuf.  |
| logTransaction    | System.Boolean          | Whether to log the inline transaction.                  |

## UpdateContract(address, registration, name) `method`
Updates a smart contract (only the genesis contract can call it).

### Parameters
| Name         | Type                              | Description                          |
|--------------|-----------------------------------|--------------------------------------|
| address      | AElf.Types.Address                | The address of the smart contract.   |
| registration | AElf.Types.SmartContractRegistration | The registration of the contract.   |
| name         | AElf.Types.Hash                   | The hash value of the contract name. |

## ValidateStateSize(obj) `method`
Verifies that the state size is within the valid limit.

### Returns
The state.

### Parameters
| Name | Type          | Description |
|------|---------------|-------------|
| obj  | System.Object | The state.  |

### Exceptions
| Name                                     | Description                          |
|------------------------------------------|--------------------------------------|
| AElf.Kernel.SmartContract.StateOverSizeException | The state size exceeds the limit. |

## VerifySignature(tx) `method`
Checks if the transaction is well-formed and the signature is correct.

### Returns
The verification result.

### Parameters
| Name | Type                | Description            |
|------|---------------------|------------------------|
| tx   | AElf.Types.Transaction | The transaction to verify. |

## CheckContractVersion(previousContractVersion, registration) `method`
Checks the contract version when updating the contract (only the genesis contract can call it).

### Returns
| Name                | Type           | Description                         |
|---------------------|----------------|-------------------------------------|
| IsSubsequentVersion | System.Boolean | Whether the contract version is subsequent. |

### Parameters
| Name                  | Type                              | Description                          |
|-----------------------|-----------------------------------|--------------------------------------|
| previousContractVersion | System.String                    | The previous contract version.       |
| registration          | AElf.Types.SmartContractRegistration | The registration of the contract.   |

## DeploySmartContract(address, registration, name) `method`
Deploys a new smart contract with a version (only the genesis contract can call it).

### Returns
| Name                | Type           | Description                         |
|---------------------|----------------|-------------------------------------|
| ContractVersion     | System.String  | The version of the smart contract.  |
| IsSubsequentVersion | System.Boolean | Whether the contract version is subsequent. |

### Parameters
| Name         | Type                              | Description                          |
|--------------|-----------------------------------|--------------------------------------|
| address      | AElf.Types.Address                | The address of the new smart contract. |
| registration | AElf.Types.SmartContractRegistration | The registration of the contract.   |
| name         | AElf.Types.Hash                   | The hash value of the contract name. |

## UpdateSmartContract(address, registration, name, previousContractVersion) `method`
Updates a smart contract with a version (only the genesis contract can call it).

### Returns
| Name                | Type           | Description                         |
|---------------------|----------------|-------------------------------------|
| ContractVersion     | System.String  | The version of the smart contract.  |
| IsSubsequentVersion | System.Boolean | Whether the contract version is subsequent. |

### Parameters
| Name                  | Type                              | Description                          |
|-----------------------|-----------------------------------|--------------------------------------|
| address               | AElf.Types.Address                | The address of the smart contract.   |
| registration          | AElf.Types.SmartContractRegistration | The registration of the contract.   |
| name                  | AElf.Types.Hash                   | The hash value of the contract name. |
| previousContractVersion | System.String                    | The previous contract version.       |

## ECVrfVerify(pubKey, alpha, pi, beta) `method`
Verifies the ECVrf proof.

### Returns
The verification result and the VRF hash output.

### Parameters
| Name   | Type     | Description                |
|--------|----------|----------------------------|
| pubKey | byte[]   | The public key.            |
| alpha  | byte[]   | The VRF hash input.        |
| pi     | byte[]   | The proof to be verified.  |
| beta   | byte[]   | The VRF hash output.       |

## CSharpSmartContract `type`
**Namespace**: AElf.Sdk.CSharp

Base class for contracts written in C#. Generated code from protobuf definitions inherits from this class.

### Generic Types
| Name          | Description                         |
|---------------|-------------------------------------|
| TContractState| Type of the state class defined by the contract author. |

### Context `property`
Represents the transaction execution context in a smart contract. Provides access to properties and methods for implementing the contract logic.

### State `property`
Provides access to the State class instance.

### ContractState `type`
**Namespace**: AElf.Sdk.CSharp.State

Base class for the state class in smart contracts.

### Int32State `type`
**Namespace**: AElf.Sdk.CSharp.State

Wrapper around 32-bit integer values for use in smart contract state.

### Int64State `type`
**Namespace**: AElf.Sdk.CSharp.State

Wrapper around 64-bit integer values for use in smart contract state.

### MappedState `type`

**Namespace**: AElf.Sdk.CSharp.State

Key-value pair data structure used for representing state in contracts.

### Generic Types
| Name  | Description           |
|-------|-----------------------|
| TKey  | The type of the key.  |
| TEntity | The type of the value. |

## SingletonState `type`
**Namespace:** AElf.Sdk.CSharp.State

Represents single values of a given type for use in smart contract state.

## SmartContractBridgeContextExtensions `type`
**Namespace:** AElf.Sdk.CSharp

Extension methods to interact with the smart contract execution context.

## Call(context, address, methodName, message) `method`
Calls a method on another contract.

### Returns:
The result of the call.

### Parameters:
| Name       | Type                                                          | Description                                |
|------------|---------------------------------------------------------------|--------------------------------------------|
| context    | AElf.Kernel.SmartContract.ISmartContractBridgeContext         | The virtual address to use as sender.      |
| address    | AElf.Types.Address                                            | The contract address to interact with.     |
| methodName | System.String                                                 | The name of the method to call.            |
| message    | Google.Protobuf.ByteString                                    | The input arguments for the method.        |

### Generic Types:
| Name | Description           |
|------|-----------------------|
| T    | The return type of the call. |

## Call(context, address, methodName, message) `method`
Calls a method on another contract.

### Returns:
The result of the call.

### Parameters:
| Name       | Type                                            | Description                            |
|------------|-------------------------------------------------|----------------------------------------|
| context    | AElf.Sdk.CSharp.CSharpSmartContractContext      | An instance of ISmartContractBridgeContext. |
| address    | AElf.Types.Address                              | The contract address to interact with. |
| methodName | System.String                                   | The name of the method to call.        |
| message    | Google.Protobuf.ByteString                      | The input arguments for the method.    |

### Generic Types:
| Name | Description           |
|------|-----------------------|
| T    | The return type of the call. |

## Call(context, fromAddress, toAddress, methodName, message) `method`
Calls a method on another contract.

### Returns:
The result of the call.

### Parameters:
| Name        | Type                                            | Description                                |
|-------------|-------------------------------------------------|--------------------------------------------|
| context     | AElf.Sdk.CSharp.CSharpSmartContractContext      | An instance of ISmartContractBridgeContext. |
| fromAddress | AElf.Types.Address                              | The address to use as sender.              |
| toAddress   | AElf.Types.Address                              | The contract address to interact with.     |
| methodName  | System.String                                   | The name of the method to call.            |
| message     | Google.Protobuf.ByteString                      | The input arguments for the method.        |

### Generic Types:
| Name | Description           |
|------|-----------------------|
| T    | The return type of the call. |

## ConvertToByteString(message) `method`
Serializes a protobuf message to a ByteString.

### Returns: 
ByteString.Empty if the message is null.

### Parameters:
| Name    | Type                       | Description                |
|---------|----------------------------|----------------------------|
| message | Google.Protobuf.IMessage   | The message to serialize.  |

## ConvertVirtualAddressToContractAddress(this, virtualAddress) `method`
Converts a virtual address to a contract address.

### Parameters
| Name          | Type                                                    | Description                                |
|---------------|---------------------------------------------------------|--------------------------------------------|
| this          | AElf.Kernel.SmartContract.ISmartContractBridgeContext   | An instance of ISmartContractBridgeContext. |
| virtualAddress| AElf.Types.Hash Address                                 | The virtual address to convert.            |

## ConvertVirtualAddressToContractAddressWithContractHashName(this, virtualAddress) `method`
Converts a virtual address to a contract address with the current contract address.

### Parameters:
| Name          | Type                                                    | Description                                |
|---------------|---------------------------------------------------------|--------------------------------------------|
| this          | AElf.Kernel.SmartContract.ISmartContractBridgeContext   | An instance of ISmartContractBridgeContext. |
| virtualAddress| AElf.Types.Hash Address                                 | The virtual address to convert.            |

## Fire(context, eventData) `method`
Logs an event during a transaction.

## Parameters:
| Name      | Type                                            | Description                                |
|-----------|-------------------------------------------------|--------------------------------------------|
| context   | AElf.Sdk.CSharp.CSharpSmartContractContext      | An instance of ISmartContractBridgeContext. |
| eventData |                                                | The event to log.                          |

### Generic Types:
| Name | Description           |
|------|-----------------------|
| T    | The type of the event. |

## GenerateId(this, bytes) `method`
Generates a hash type ID based on the current contract address and the bytes.

### Returns: The generated hash type ID.

### Parameters:
| Name  | Type                                                    | Description                                  |
|-------|---------------------------------------------------------|----------------------------------------------|
| this  | AElf.Kernel.SmartContract.ISmartContractBridgeContext   | An instance of ISmartContractBridgeContext.  |
| bytes | System.Collections.Generic.IEnumerable{System.Byte}     | The bytes for ID generation.                 |

## GenerateId(this, token) `method`
Generates a hash type ID based on the current contract address and the token.

### Returns: 
The generated hash type ID.

### Parameters:
| Name  | Type                                                    | Description                                  |
|-------|---------------------------------------------------------|----------------------------------------------|
| this  | AElf.Kernel.SmartContract.ISmartContractBridgeContext   | An instance of ISmartContractBridgeContext.  |
| token | System.String                                           | The token for ID generation.                 |

## GenerateId(this, token) `method`
Generates a hash type ID based on the current contract address and the hash type token.

### Returns: The generated hash type ID.

### Parameters:
| Name  | Type                                                    | Description                                  |
|-------|---------------------------------------------------------|----------------------------------------------|
| this  | AElf.Kernel.SmartContract.ISmartContractBridgeContext   | An instance of ISmartContractBridgeContext.  |
| token | AElf.Types.Hash                                         | The hash type token for ID generation.       |

## GenerateId(this) `method`
Generates a hash type ID based on the current contract address.

### Returns: The generated hash type ID.

### Parameters:
| Name  | Type                                                    | Description                                  |
|-------|---------------------------------------------------------|----------------------------------------------|
| this  | AElf.Kernel.SmartContract.ISmartContractBridgeContext   | An instance of ISmartContractBridgeContext.  |

## GenerateId(this, address, token) `method`
Generates a hash type ID based on the address and the bytes.

### Returns: 
The generated hash type ID.

### Parameters:
| Name    | Type                                                    | Description                                  |
|---------|---------------------------------------------------------|----------------------------------------------|
| this    | AElf.Kernel.SmartContract.ISmartContractBridgeContext   | An instance of ISmartContractBridgeContext.  |
| address | AElf.Types.Address                                      | The address for ID generation.               |
| token   | AElf.Types.Hash                                         | The hash type token for ID generation.       |

## SendInline(context, toAddress, methodName, message) `method`
Sends an inline transaction to another contract.

### Parameters:
| Name       | Type                                                    | Description                                |
|------------|---------------------------------------------------------|--------------------------------------------|
| context    | AElf.Kernel.SmartContract.ISmartContractBridgeContext   | An instance of ISmartContractBridgeContext. |
| toAddress  | AElf.Types.Address                                      | The contract address to interact with.     |
| methodName | System.String                                           | The name of the method to call.            |
| message    | Google.Protobuf.ByteString                              | The input arguments for the method.        |

## SendInline(context, toAddress, methodName, message) `method`
Sends a virtual inline transaction to another contract.

### Parameters:
| Name       | Type                                                    | Description                                |
|------------|---------------------------------------------------------|--------------------------------------------|
| context    | AElf.Kernel.SmartContract.ISmartContractBridgeContext   | An instance of ISmartContractBridgeContext. |
| toAddress  | AElf.Types.Address                                      | The contract address to interact with.     |
| methodName | System.String                                           | The name of the method to call.            |
| message    | Google.Protobuf.ByteString                              | The input arguments for the method.        |

## SendVirtualInline(context, fromVirtualAddress, toAddress, methodName, message) `method`
Sends a virtual inline transaction to another contract.

### Parameters:
| Name             | Type                                                    | Description                                |
|------------------|---------------------------------------------------------|--------------------------------------------|
| context          | AElf.Kernel.SmartContract.ISmartContractBridgeContext   | An instance of ISmartContractBridgeContext. |
| fromVirtualAddress | AElf.Types.Hash                                        | The virtual address to use as sender.      |
| toAddress        | AElf.Types.Address                                      | The contract address to interact with.     |
| methodName       | System.String                                           | The name of the method to call.            |
| message          | Google.Protobuf.ByteString                              | The input arguments for the method.        |

## SmartContractConstants `type`
**Namespace:** AElf.Sdk.CSharp

Static class containing the hashes built from contract names.

## StringState `type`
**Namespace:** AElf.Sdk.CSharp.State

Wrapper around string values for use in smart contract state.

## UInt32State `type`
**Namespace:** AElf.Sdk.CSharp.State

Wrapper around unsigned 32-bit integer values for use in smart contract state.

## UInt64State `type`
**Namespace:** AElf.Sdk.CSharp.State

Wrapper around unsigned 64-bit integer values for use in smart contract state.