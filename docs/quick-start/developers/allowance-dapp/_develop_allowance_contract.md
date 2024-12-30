### Start Your Smart Contract Project

- Open your `Terminal`.

- Enter the following command to generate a new RoleContract project:

```bash title="Terminal"
cd ../..
mkdir allowance-contract
cd allowance-contract
dotnet new aelf -n AllowanceContract
```

### Adding Your Smart Contract Code

Now that we have an AllowanceContract template, it can be customized to manage funds with role-based permissions. Below are its core functionalities:

1. Set Allowance: Increases the current allowance, with permissions verified through parent and child roles fetched from the RoleContract.
2. Use Funds: Allows a child role to spend funds, reducing the current allowance.
3. Get Allowance: Retrieves the remaining allowance.
4. Role-based Permissions: Ensures only authorized roles, like parent of a child can modify or the child use the allowance.

This contract showcases **inter-contract calls** and role-based fund management, demonstrating how multiple smart contracts work together for secure, controlled financial operations on the aelf blockchain. It helps in understanding *how the AllowanceContract calls the RoleContract* to check which sender (either of Parent, Child & Admin) is calling the methods of the AllowanceContract to put control on the access of the functions.

- Enter this command in your `Terminal`.

```bash title="Terminal"
cd src
```

#### Defining Methods and Messages

- Rename the file name from `Protobuf/contract/hello_world_contract.proto` to `allowance_contract.proto`:

```bash title="Terminal"
mv Protobuf/contract/hello_world_contract.proto Protobuf/contract/allowance_contract.proto
```

- Open the project with your IDE.

The implementation of file `src/Protobuf/contract/allowance_contract.proto` is as follows:

```csharp title="allowance_contract.proto"
syntax = "proto3";

import "aelf/core.proto"; 

import "google/protobuf/empty.proto";
import "Protobuf/reference/acs12.proto";
import "aelf/options.proto"; 
import "google/protobuf/wrappers.proto";

// The namespace of this class
option csharp_namespace = "AElf.Contracts.AllowanceContract";

service AllowanceContract {

  // The name of the state class the smart contract is going to use to access blockchain state
  option (aelf.csharp_state) = "AElf.Contracts.AllowanceContract.AllowanceContractState";
  option (aelf.base) = "Protobuf/reference/acs12.proto";

  rpc Initialize (google.protobuf.Empty) returns (google.protobuf.Empty){

  }

  rpc SetAllowance (google.protobuf.Int64Value) returns (google.protobuf.Empty) {
  }

  rpc GetAllowance (aelf.Address) returns (google.protobuf.Int64Value) {
    option (aelf.is_view) = true;
  }

  rpc useFunds (google.protobuf.Int64Value) returns (google.protobuf.Empty) {
  }

  rpc IfInitialized (google.protobuf.Empty) returns (google.protobuf.BoolValue) {
      option (aelf.is_view) = true;
    }


}
```

- `rpc` methods define the callable functions within the contract, allowing external systems to interact with the contract's logic.
- `message` represent the structured data exchanged between the contract and external systems.

#### Define Contract States

The implementation of the allowance contract state inside file `src/AllowanceContractState.cs` is as follows:

```csharp title="src/AllowanceContractState.cs"
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.AllowanceContract
{
    public partial class AllowanceContractState : ContractState
    {
        public BoolState Initialized { get; set; }

        public SingletonState<Address> AdminAddress { get; set; }

        public SingletonState<Address> ParentAddress { get; set; }

        public SingletonState<Address> ChildAddress { get; set; }

        public Int32State CurrentAllowance { get; set; }

    }
}
```

- The `State.cs` file in an aelf blockchain smart contract holds the variables that store the contract's data, making sure this data is saved and accessible whenever the contract needs it.

#### Implement Allowance Smart Contract

The implementation of the AllowanceContract inside file `src/AllowanceContract.cs` is as follows:

```csharp title="src/AllowanceContract.cs"
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;

namespace AElf.Contracts.AllowanceContract
{
    // Contract class must inherit the base class generated from the proto file
    public class AllowanceContract : AllowanceContractContainer.AllowanceContractBase
    {

        private const string RoleContractAddress = "YOUR_ROLE_CONTRACT_ADDRESS"; // tDVW role contract address

        public override Empty Initialize(Empty input)
        {
            // Check if the contract is already initialized
            Assert(State.Initialized.Value == false, "Already initialized.");
            // Set the contract state
            State.Initialized.Value = true;
            // Set the owner address
            State.AdminAddress.Value = Context.Sender;

            // Initialize the role contract
            State.RoleContract.Value = Address.FromBase58(RoleContractAddress);

            return new Empty();
        }

        public override Empty SetAllowance(Int64Value input)
        {
            State.ParentAddress.Value = Address.FromBase58(State.RoleContract.GetParent.Call(new Empty()).Value);

            Assert(Context.Sender == State.ParentAddress.Value, "Unauthorized(Not Parent) to perform the action.");

            State.ChildAddress.Value = Address.FromBase58(State.RoleContract.GetChild.Call(new Empty()).Value);

            State.CurrentAllowance.Value = (int)(State.CurrentAllowance.Value + input.Value) ;

            return new Empty();
        }

        public override Int64Value GetAllowance(Address input)
        {

            Assert(Context.Sender == State.ChildAddress.Value || Context.Sender == State.ParentAddress.Value, "Unauthorized(Not Parent or Child) to perform the action.");

            var allowance = State.CurrentAllowance.Value;

            return new Int64Value
            {
                Value = allowance
            };
        }

       public override Empty useFunds(Int64Value input)
        {
            State.ChildAddress.Value = Address.FromBase58(State.RoleContract.GetChild.Call(new Empty()).Value);

            Assert(Context.Sender == State.ChildAddress.Value, "Unauthorized(Not Child) to perform the action.");

            State.CurrentAllowance.Value = (int)(State.CurrentAllowance.Value - input.Value) ;

            return new Empty();
        }

      // Function to check if the allowance contract is already initialized or not
      public override BoolValue IfInitialized(Empty input)
      {
            return new BoolValue { Value = State.Initialized.Value };
      }

    }

}
```

### Add Inter-Contract Calls
- Now, AllowanceContract needs to create a reference with the RoleContract. First, AllowanceContract will use the `role_contract.proto` file inside the **Protobuf/reference** folder. Copy the `role_contract.proto` from the role-contract/src/Protobuf/contract folder.

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

  - Now, create a file inside `src` folder and name it as `ContractReferences.cs` and add the following code to establish connection between AllowanceContract and the RoleContract.

```csharp title="ContractReferences.cs"
using AElf.Contracts.RoleContract;

namespace AElf.Contracts.AllowanceContract
{
    public partial class AllowanceContractState
    {
        internal RoleContractContainer.RoleContractReferenceState RoleContract { get; set; }
    }
}
```

### Building Allowance Smart Contract

- Build the smart contract code with the following command inside `src` folder:

```bash title="Terminal"
dotnet build
```

You should see **AllowanceContract.dll.patched** in the directory `AllowanceContract/src/bin/Debug/net.6.0`
