# AElf.CSharp.Core

## Builder `type`
**Namespace:** AElf.CSharp.Core.ServerServiceDefinition

Builder class for ServerServiceDefinition.

## ctor() `constructor`
Creates a new instance of builder.

## AddMethod``2(method, handler) `method`
Adds a definition for a single request - single response method.

### Returns:
This builder instance.

### Parameters:
| Name    | Type                        | Description              |
|---------|-----------------------------|--------------------------|
| method  | AElf.CSharp.Core.Method     | The method.              |
| handler | AElf.CSharp.Core.UnaryServerMethod | The method handler. |

## Build() `method`
Creates an immutable ServerServiceDefinition from this builder.

### Returns 
The ServerServiceDefinition object.

## EncodingHelper `type`
**Namespace:** AElf.CSharp.Core.Utils

Helper class for serializing strings.

## EncodeUtf8(str) `method`
Serializes a UTF-8 string to a byte array.

### Returns 
The serialized string.

### Parameters
| Name | Type              | Description       |
|------|-------------------|-------------------|
| str  | System.String     | The string to encode. |

### IMethod `type`
**Namespace:** AElf.CSharp.Core

A non-generic representation of a remote method.

## FullName `property`
Gets the fully qualified name of the method. On the server side, methods are dispatched based on this name.

## Name `property`
Gets the unqualified name of the method.

## ServiceName `property`
Gets the name of the service to which this method belongs.

## Type `property`
Gets the type of the method.

## Marshaller `type`
**Namespace:** AElf.CSharp.Core

Encapsulates the logic for serializing and deserializing messages.

## ctor(serializer, deserializer) `constructor`
Initializes a new marshaller from simple serialize/deserialize functions.

### Parameters
| Name        | Type                      | Description                           |
|-------------|---------------------------|---------------------------------------|
| serializer  | System.Func               | Function for serializing messages.    |
| deserializer| System.Func               | Function for deserializing messages.  |

## Deserializer `property`
Gets the deserializer function.

## Serializer `property`
Gets the serializer function.

## Marshallers `type`
**Namespace:** AElf.CSharp.Core

Utilities for creating marshallers.

## StringMarshaller `property`
Returns a marshaller for string type. Useful for testing.

## Create() `method`
Creates a marshaller from specified serializer and deserializer.


## MethodType `type`
**Namespace:** AElf.CSharp.Core

Constants for method types.

## Action `constants`
Indicates the method modifies the contract state.

## View `constants`
Indicates the method doesn't modify the contract state.

## Method `type`
**Namespace:** AElf.CSharp.Core

A description of a remote method.

## ctor(type, serviceName, name, requestMarshaller, responseMarshaller) `constructor`
Initializes a new instance of the Method class.

### Parameters
| Name             | Type                      | Description                          |
|------------------|---------------------------|--------------------------------------|
| type             | AElf.CSharp.Core.Method   | Type of method.                       |
| serviceName      | System.String             | Name of service this method belongs to. |
| name             | System.String             | Unqualified name of the method.       |
| requestMarshaller| AElf.CSharp.Core.Marshaller | Marshaller used for request messages. |
| responseMarshaller| AElf.CSharp.Core.Marshaller| Marshaller used for response messages.|

## FullName `property`
Gets the fully qualified name of the method. On the server side, methods are dispatched based on this name.

## Name `property`
Gets the unqualified name of the method.

## RequestMarshaller `property`
Gets the marshaller used for request messages.

## ResponseMarshaller `property`
Gets the marshaller used for response messages.

## ServiceName `property`
Gets the name of the service to which this method belongs.

## Type `property`
Gets the type of the method.

## GetFullName() `method`
Gets the full name of the method including the service name.

## Preconditions `type`
**Namespace:** AElf.CSharp.Core.Utils

Utilities for checking preconditions.

## CheckNotNull(reference) `method`
Throws ArgumentNullException if reference is null.

### Parameters
| Name       | Type          | Description      |
|------------|---------------|------------------|
| reference  | Any           | The reference.   |

## CheckNotNull(reference, paramName) `method`
Throws ArgumentNullException if reference is null.

### Parameters
| Name       | Type          | Description      |
|------------|---------------|------------------|
| reference  | Any           | The reference.   |
| paramName  | System.String | The parameter name. |

## SafeMath `type`
**Namespace:** AElf.CSharp.Core

Helper methods for safe math operations that explicitly check for overflow.

## ServerServiceDefinition `type`
**Namespace:** AElf.CSharp.Core

Stores mapping of methods to server call handlers. Normally, created by the BindService factory method.

## BindService() `method`
Forwards all the previously stored AddMethod calls to the service binder.

## CreateBuilder() `method`
Creates a new builder object for ServerServiceDefinition.

### Returns 
The builder object.

## ServiceBinderBase `type`
**Namespace:** AElf.CSharp.Core

Allows binding server-side method implementations in alternative serving stacks.

## AddMethod(method, handler) `method`
Adds a definition for a single request - single response method.

### Parameters
| Name    | Type                        | Description              |
|---------|-----------------------------|--------------------------|
| method  | AElf.CSharp.Core.Method     | The method.              |
| handler | AElf.CSharp.Core.UnaryServerMethod | The method handler. |

## TimestampExtensions `type`
**Namespace:** AElf.CSharp.Core.Extension

Helper methods for dealing with protobuf timestamps.

## AddDays(timestamp, days) `method`
Adds a given amount of days to a timestamp. Returns a new instance.

### Returns 
A new timestamp instance.

### Parameters
  | Name      | Type                               | Description        |
  |-----------|------------------------------------|--------------------|
  | timestamp | Google.Protobuf.WellKnownTypes.Timestamp | The timestamp.     |
  | days      | System.Int64                        | The amount of days.|

## AddHours(timestamp, hours) `method`
Adds a given amount of hours to a timestamp. Returns a new instance.

### Returns 
A new timestamp instance.

### Parameters
  | Name      | Type                               | Description         |
  |-----------|------------------------------------|---------------------|
  | timestamp | Google.Protobuf.WellKnownTypes.Timestamp | The timestamp.      |
  | hours     | System.Int64                        | The amount of hours.|

## AddMilliseconds(timestamp, milliseconds) `method`
Adds a given amount of milliseconds to a timestamp. Returns a new instance.

### Returns 
A new timestamp instance.

### Parameters
| Name           | Type                               | Description              |
|----------------|------------------------------------|--------------------------|
| timestamp      | Google.Protobuf.WellKnownTypes.Timestamp | The timestamp.           |
| milliseconds   | System.Int64                        | The amount of milliseconds.|

## AddMinutes(timestamp, minutes) `method`
Adds a given amount of minutes to a timestamp. Returns a new instance.

### Returns 
A new timestamp instance.

### Parameters
| Name      | Type                               | Description         |
|-----------|------------------------------------|---------------------|
| timestamp | Google.Protobuf.WellKnownTypes.Timestamp | The timestamp.      |
| minutes   | System.Int64                        | The amount of minutes.|

## AddSeconds(timestamp, seconds) `method`
Adds a given amount of seconds to a timestamp. Returns a new instance.

### Returns 
A new timestamp instance.

### Parameters
| Name      | Type                               | Description         |
|-----------|------------------------------------|---------------------|
| timestamp | Google.Protobuf.WellKnownTypes.Timestamp | The timestamp.      |
| seconds   | System.Int64                        | The amount of seconds.|

## Max(timestamp1, timestamp2) `method`
Compares two timestamps and returns the greater one.

### Returns 
The greater timestamp.

### Parameters
| Name         | Type                               | Description           |
|--------------|------------------------------------|-----------------------|
| timestamp1   | Google.Protobuf.WellKnownTypes.Timestamp | The first timestamp.  |
| timestamp2   | Google.Protobuf.WellKnownTypes.Timestamp | The second timestamp. |

## Milliseconds(duration) `method`
Converts a protobuf duration to long.

### Returns 
The duration represented as a long.

### Parameters
| Name      | Type                               | Description        |
|-----------|------------------------------------|--------------------|
| duration  | Google.Protobuf.WellKnownTypes.Duration | The duration to convert. |
  
## UnaryServerMethod `type`
**Namespace:** AElf.CSharp.Core

Handler for a contract method.

## Generic Types
| Name      | Description        |
|-----------|--------------------|
| TRequest  | Request message type for this method |
| TResponse | Response message type for this method |