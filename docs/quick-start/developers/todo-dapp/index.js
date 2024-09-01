---
sidebar_position: 5
title: ToDo List dApp
description: Moderately difficult smart contract
---

**Description**: This contract is moderately difficult. It demonstrates the use of
state variables, user interactions, and smart contract integration to create a
basic ToDo App.

**Purpose**: To introduce you to more advanced concepts such as state
management, event handling, and randomization in smart contracts.

**Difficulty Level**: Moderate

<iframe width="100%" style={{"aspect-ratio": "16 / 9"}} src="https://www.youtube.com/embed/sBNfFADQMXg?si=wbCGIIxez-nh0PC-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Step 1 - Setting up your development environment

import Setup from "../\_setup.md"

<Setup />

## Step 2 - Develop Smart Contract

### Start Your Smart Contract Project

- Open your `Terminal`.

- Enter the following command to generate a new project:

```bash title="Terminal"
mkdir todo-app
cd todo-app
dotnet new aelf -n ToDoApp
```

### Adding Your Smart Contract Code

Now that we have a template todo list project, we can customise the template to incorporate our own contract logic.
Lets start by implementing methods to provide basic functionality for updating and reading a message stored persistently in the contract state.
ToDoApp includes the below functionalities like:
1. Create a Task (Name, category, description, createAt, updatedAt)
2. Task Completed 
3. Delete a task 
4. List the tasks
5. Edit the task

- Enter this command in your `Terminal`.

```bash title="Terminal"
cd src
```

#### Defining Methods and Messages

- Rename the file name from `Protobuf/contract/hello_world_contract.proto` to `todo_app.proto`:

```bash title="Terminal"
mv Protobuf/contract/hello_world_contract.proto Protobuf/contract/todo_app.proto
```

- open the project with your IDE.

The implementation of file `src/Protobuf/contract/todo_app.proto` is as follows:

```csharp title="todo_app.proto"
syntax = "proto3";

import "aelf/core.proto";
import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "Protobuf/reference/acs12.proto";
// The namespace of this class
option csharp_namespace = "AElf.Contracts.ToDoApp";

service ToDoApp {
  // The name of the state class the smart contract is going to use to access blockchain state
  option (aelf.csharp_state) = "AElf.Contracts.ToDoApp.ToDoAppState";
  option (aelf.base) = "Protobuf/reference/acs12.proto";

  rpc Initialize (google.protobuf.Empty) returns (google.protobuf.Empty) {
  }

  rpc createTask (google.protobuf.Int64Value) returns (google.protobuf.Empty) {
  }

  rpc IsCompleted (google.protobuf.Int64Value) returns (google.protobuf.Empty) {
  }

  rpc deleteTask (google.protobuf.Int64Value) returns (google.protobuf.Empty) {
  }

  rpc editTask (aelf.Address) returns (google.protobuf.Empty) {
  }

  rpc GetAllTasks (google.protobuf.Empty) returns (PlayAmountLimitMessage) {
    option (aelf.is_view) = true;
  }

  rpc GetOwner (google.protobuf.Empty) returns (google.protobuf.StringValue) {
    option (aelf.is_view) = true;
  }
}

// An event that will be emitted from contract method call when Play is called.
message createTaskEvent {
  option (aelf.is_event) = true;
  int64 name = "Finish frontend";
  int64 description = "Finish loader feature of the frontend";
}

// An event that will be emitted from contract method call when Withdraw is called.
message deleteTaskEvent {
  option (aelf.is_event) = true;
  int64 name = "Finish frontend";
  int64 description = "Finish loader feature of the frontend";
}

// An event that will be emitted from contract method call when Deposit is called.
message EditTaskEvent {
  option (aelf.is_event) = true;
  int64 name = "Finish frontend";
  int64 description = "Finish loader feature of the frontend";
}

```

#### Define Contract States

The implementation of file `src/ToDoApp.cs` is as follows:

```csharp title="src/ToDoApp.cs"
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.ToDoApp
{
    // The state class is access the blockchain state
    public partial class ToDoAppState : ContractState
    {
        // A state to check if contract is initialized
        public BoolState Initialized { get; set; }
        // A state to store the owner address
        public SingletonState<Address> Owner { get; set; }
    }
}
```