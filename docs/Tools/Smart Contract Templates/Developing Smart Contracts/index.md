---
sidebar_position: 3
title: Developing Smart Contracts
---


# Developing Smart Contracts
This guide shows how to develop a smart contract using the GreeterContract as an example. You’ll learn to create your own basic contract.

## Steps for Developing Smart Contracts
1. **Install template:** Install the aelf smart contract templates using the dotnet command.
2. **Initialize project:** Create the project structure and base contract code.
3. **Define the contract:** Use a protobuf file to define methods and types.
4. **Implement contract code:** Write the logic for the contract methods.
5. **Test smart contracts:** Create unit tests for the contracts.

The Greeter contract includes an `AddGreeters` method to add a new greeter and a `GetGreeters` method to list all greeters.

### Install Template
1. To install the template, run:
```sh
dotnet new install AElf.ContractTemplates
```

2. Verify installation with:
```sh
dotnet new uninstall
```

### Initialize Project
1. Create a project named GreeterContract with:
```sh
dotnet new aelf -n GreeterContract -N AElf.Contracts.Greeter
```
This generates the following structure:
```sh
.
├── src
│   ├── GreeterContract.cs
│   ├── GreeterContract.csproj
│   ├── GreeterContractState.cs
│   └── Protobuf
│       ├── contract
│       │   └── hello_world_contract.proto
│       └── message
│           └── authority_info.proto
└── test
    ├── GreeterContract.Tests.csproj
    ├── GreeterContractTests.cs
    ├── Protobuf
    │   ├── message
    │   │   └── authority_info.proto
    │   └── stub
    │       └── hello_world_contract.proto
    └── _Setup.cs
```

2. Define the Contract
Create a greeter_contract.proto file to define the contract:
```cs
syntax = "proto3";

import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
option csharp_namespace = "AElf.Contracts.Greeter";

service GreeterContract {
  option (aelf.csharp_state) = "AElf.Contracts.Greeter.GreeterContractState";

  rpc AddGreeters (google.protobuf.StringValue) returns (google.protobuf.Empty) {}
  rpc GetGreeters (google.protobuf.Empty) returns (GreeterList) {
    option (aelf.is_view) = true;
  }
}

message GreeterList {
  repeated string greeter = 1;
}
```

3. Implement Contract Code
Run dotnet build in the src folder to compile the proto files. Implement the contract logic in GreeterContract.cs:
```cs
using AElf.Sdk.CSharp;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.Greeter
{
    public class GreeterContract : GreeterContractContainer.GreeterContractBase
    {
        public override Empty AddGreeters(StringValue input)
        {
            Assert(!string.IsNullOrWhiteSpace(input.Value), "Invalid name.");

            var greeterList = State.GreeterList.Value ?? new GreeterList();
            if (!greeterList.Greeter.Contains(input.Value))
            {
                greeterList.Greeter.Add(input.Value);
            }
            State.GreeterList.Value = greeterList;

            return new Empty();
        }

        public override GreeterList GetGreeters(Empty input)
        {
            return State.GreeterList.Value ?? new GreeterList();
        }
    }
}
```

4. Define the contract state in GreeterContractState.cs:
```cs
using AElf.Sdk.CSharp.State;

namespace AElf.Contracts.Greeter
{
    public class GreeterContractState : ContractState
    {
        public SingletonState<GreeterList> GreeterList { get; set; }
    }
}
```

5. Test Smart Contracts
Use the AElf.ContractTestKit for testing. The test folder contains the necessary files for unit testing.

6. Setup the testing context in _Setup.cs:
```cs
using AElf.Cryptography.ECDSA;
using AElf.Testing.TestBase;

namespace AElf.Contracts.Greeter
{
    public class Module : ContractTestModule<GreeterContract> { }

    public class TestBase : ContractTestBase<Module>
    {
        internal readonly GreeterContractContainer.GreeterContractStub GreeterContractStub;
        private ECKeyPair DefaultKeyPair => Accounts[0].KeyPair;

        public TestBase()
        {
            GreeterContractStub = GetGreeterContractContractStub(DefaultKeyPair);
        }

        private GreeterContractContainer.GreeterContractStub GetGreeterContractContractStub(ECKeyPair senderKeyPair)
        {
            return GetTester<GreeterContractContainer.GreeterContractStub>(ContractAddress, senderKeyPair);
        }
    }
}
```

7. Write unit tests in GreeterContractTests.cs:
```cs
using System.Threading.Tasks;
using Google.Protobuf.WellKnownTypes;
using Shouldly;
using Xunit;

namespace AElf.Contracts.Greeter
{
    public class GreeterContractTests : TestBase
    {
        [Fact]
        public async Task AddGreetersTest()
        {
            var user1 = new StringValue { Value = "Tom" };
            var user2 = new StringValue { Value = "Jerry" };
            var expectList = new GreeterList();
            expectList.Greeter.Add(user1.Value);
            expectList.Greeter.Add(user2.Value);

            await GreeterContractStub.AddGreeters.SendAsync(user1);
            await GreeterContractStub.AddGreeters.SendAsync(user2);

            var greeterList = await GreeterContractStub.GetGreeters.CallAsync(new Empty());
            greeterList.ShouldBe(expectList);
        }
    }
}
```