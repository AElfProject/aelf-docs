
### Start Your Smart Contract Project

- Open your `Terminal`.

- Enter the following command to generate a new RoleContract project:

```bash title="Terminal"
mkdir role-contract
cd role-contract
dotnet new aelf -n RoleContract
```

### Adding Your Smart Contract Code

Now that we have a RoleContract template, we can customize it to implement role-based permissions for various use cases. Below are the core functionalities of the RoleContract:

1. Set Admin: Allows the current admin to assign a new admin address.
2. Set Parent/Child: Grants parent or child roles with appropriate permissions.
3. Retrieve Role Addresses: Methods to fetch the current admin, parent, and child addresses.
4. Role-based Access Control: Ensures only admins or parents can assign roles using access validation logic.

This template provides a foundation for building secure systems where role management and hierarchical permissions are essential.

- Enter this command in your `Terminal`.

```bash title="Terminal"
cd src
```

#### Defining Methods and Messages

- Rename the file name from `Protobuf/contract/hello_world_contract.proto` to `role_contract.proto` manually or by using the following command:

```bash title="Terminal"
mv Protobuf/contract/hello_world_contract.proto Protobuf/contract/role_contract.proto
```

- Open the project with your IDE.

The implementation of file `src/Protobuf/contract/role_contract.proto` is as follows:

```csharp title="role_contract.proto"
syntax = "proto3";

import "aelf/core.proto"; 

import "google/protobuf/empty.proto";
import "Protobuf/reference/acs12.proto";
import "aelf/options.proto";  
import "google/protobuf/wrappers.proto"; 

// The namespace of this class
option csharp_namespace = "AElf.Contracts.RoleContract";

service RoleContract {

  // The name of the state class the smart contract is going to use to access blockchain state
  option (aelf.csharp_state) = "AElf.Contracts.RoleContract.RoleContractState";
  option (aelf.base) = "Protobuf/reference/acs12.proto";

  rpc Initialize (google.protobuf.Empty) returns (google.protobuf.Empty){

  }

  rpc SetAdmin (aelf.Address) returns (google.protobuf.Empty) {
  }

  rpc GetAdmin (google.protobuf.Empty) returns (google.protobuf.StringValue) {
    option (aelf.is_view) = true;
  }

  rpc SetParent (aelf.Address) returns (google.protobuf.Empty) {
  }

  rpc GetParent (google.protobuf.Empty) returns (google.protobuf.StringValue) {
    option (aelf.is_view) = true;
  }

  rpc SetChild (aelf.Address) returns (google.protobuf.Empty) {
  }

  rpc GetChild (google.protobuf.Empty) returns (google.protobuf.StringValue) {
    option (aelf.is_view) = true;
  }

}
```

- `rpc` methods define the callable functions within the contract, allowing external systems to interact with the contract's logic.
- `message` represent the structured data exchanged between the contract and external systems.

#### Define Contract States

The implementation of the role contract's state inside file `src/RoleContractState.cs` is as follows:

```csharp title="src/RoleContractState.cs"
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.RoleContract
{
    public class RoleContractState : ContractState
    {
        public BoolState Initialized { get; set; }

        public SingletonState<Address> AdminAddress { get; set; }

        public SingletonState<Address> ParentAddress { get; set; }

        public SingletonState<Address> ChildAddress { get; set; }

    }
}
```

- The `State.cs` file on the aelf blockchain smart contract holds the variables that store the contract's data, making sure this data is saved and accessible whenever the contract needs it.

#### Implement Role Smart Contract

The implementation of the role contract inside file `src/RoleContract.cs` is as follows:

```csharp title="src/RoleContract.cs"
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.RoleContract
{
    public class RoleContract : RoleContractContainer.RoleContractBase
    {

      private const string DefaultAdmin = "ENTER_YOUR_PORTKEY_ADDRESS";

      public override Empty Initialize(Empty input)
        {
            if (State.Initialized.Value)
            {
                return new Empty();
            }
            State.Initialized.Value = true;
            State.AdminAddress.Value = Context.Sender; //Can set Deployer as admin
            State.AdminAddress.Value = Address.FromBase58(DefaultAdmin); // Can set YOUR_PORTKEY_ADDRESS as admin 
            return new Empty();
        }

        public override Empty SetAdmin(Address input)
        {
            AssertIsAdmin();

            // Set the new admin address
            State.AdminAddress.Value = input;

            return new Empty();
        }

       public override Empty SetParent(Address input)
        {
            AssertIsAdminOrParent();

            // Set the parent address
            State.ParentAddress.Value = input;

            return new Empty();
        }

        public override Empty SetChild(Address input)
        {
            AssertIsAdminOrParent();

            // Set the chlid address
            State.ChildAddress.Value = input;

            return new Empty();
        }


        // Get the current admin address
        public override StringValue GetAdmin(Empty input)
        {
            return State.AdminAddress.Value == null ? new StringValue() : new StringValue {Value = State.AdminAddress.Value.ToBase58()};
        }

         // Get the current parent address
        public override StringValue GetParent(Empty input)
        {
            return State.ParentAddress.Value == null ? new StringValue() : new StringValue {Value = State.ParentAddress.Value.ToBase58()};
        }

         // Get the current child address
        public override StringValue GetChild(Empty input)
        {
            return State.ChildAddress.Value == null ? new StringValue() : new StringValue {Value = State.ChildAddress.Value.ToBase58()};
        }


        private void AssertIsAdmin()
        {
            Assert(Context.Sender == State.AdminAddress.Value, "Unauthorized(Not Admin) to perform the action.");
        }

        private void AssertIsAdminOrParent()
        {
            Assert(Context.Sender == State.AdminAddress.Value || Context.Sender == State.ParentAddress.Value, "Unauthorized (Not Parent or Admin) to perform the action.");
        }


    }
}
```

### Building Role Smart Contract

- Build the smart contract code with the following command inside `src` folder:

```bash title="Terminal"
dotnet build
```

You should see **RoleContract.dll.patched** in the directory `RoleContract/src/bin/Debug/net.6.0`