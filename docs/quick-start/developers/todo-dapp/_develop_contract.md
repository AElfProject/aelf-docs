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
Let's start by implementing methods to handle the basic functionality of creating, editing, listing, deleting, and marking tasks as complete within the contract state. ToDo dApp includes the below functionalities like:
1. Create a task (Name, category, description, createAt, updatedAt)
2. Mark task as completed 
3. Delete a task 
4. List all the tasks
5. Edit a task

- Enter this command in your `Terminal`.

```bash title="Terminal"
cd src
```

#### Defining Methods and Messages

- Rename the proto file name `hello_world_contract.proto` inside folder `Protobuf/contract/` to `todo_app.proto`:

```bash title="Terminal"
mv Protobuf/contract/hello_world_contract.proto Protobuf/contract/todo_app.proto
```

The `.proto` file defines the structure and serialization of data, ensuring consistent communication and data exchange between the contract and external systems.

- Open the project with your IDE.

The implementation of `todo_app.proto` file inside folder `src/Protobuf/contract/` is as follows:

```csharp title="todo_app.proto"
syntax = "proto3";
import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "Protobuf/reference/acs12.proto";
// The namespace of this class
option csharp_namespace = "AElf.Contracts.ToDo";
service ToDo {
  // The name of the state class the smart contract is going to use to access blockchain state
  option (aelf.csharp_state) = "AElf.Contracts.ToDo.ToDoState";
  option (aelf.base) = "Protobuf/reference/acs12.proto";
  rpc Initialize (google.protobuf.Empty) returns (google.protobuf.Empty) {
  }
  rpc CreateTask (TaskInput) returns (google.protobuf.StringValue) {
  }
  rpc UpdateTask (TaskUpdateInput) returns (google.protobuf.Empty) {
  }
  rpc DeleteTask (google.protobuf.StringValue) returns (google.protobuf.Empty) {
  }
  rpc ListTasks (google.protobuf.StringValue) returns (TaskList) {
    option (aelf.is_view) = true;
  }
  rpc GetTask (google.protobuf.StringValue) returns (Task) {
    option (aelf.is_view) = true;
  }
  rpc GetInitialStatus (google.protobuf.Empty) returns (google.protobuf.BoolValue) {
    option (aelf.is_view) = true;
  }
}
// A message to represent a task
message Task {
  string task_id = 1;
  string name = 2;
  string description = 3;
  string category = 4;
  string status = 5;
  string owner = 6;
  int64 created_at = 7;
  int64 updated_at = 8;
}
// Input for creating a task
message TaskInput {
  string name = 1;
  string description = 2;
  string category = 3;
}
// Input for updating a task
message TaskUpdateInput {
  string task_id = 1;
  string name = 2;
  string description = 3;
  string category = 4;
  string status = 5;
}
// List of tasks
message TaskList {
  repeated Task tasks = 1;
}
```

- `rpc` methods define the callable functions within the contract, allowing external systems to interact with the contract's logic.
- `message` represent the structured data exchanged between the contract and external systems.

#### Define Contract States

The implementation of the ToDo app state inside file `src/ToDoAppState.cs` is as follows:

```csharp title="src/ToDoAppState.cs"
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.ToDo
{
    public class ToDoState : ContractState
    {
        public BoolState Initialized { get; set; }
        public SingletonState<Address> Owner { get; set; }
        public MappedState<string, Task> Tasks { get; set; } // Mapping of task ID to Task
        public MappedState<string, bool> TaskExistence { get; set; } // Mapping to track task existence
        public StringState TaskIds { get; set; } // Concatenated string of task IDs
        public Int32State TaskCounter { get; set; } // Counter for generating unique IDs
    }
}
```

- The `State.cs` file in an aelf blockchain smart contract holds the variables that store the contract's data, making sure this data is saved and accessible whenever the contract needs it.

#### Implement ToDo Smart Contract 

The implementation of the ToDo App smart contract inside file `src/ToDoApp.cs` is as follows:

```csharp title="src/ToDoApp.cs"
using Google.Protobuf.WellKnownTypes;
using System.Collections.Generic;
namespace AElf.Contracts.ToDo
{
    public class ToDo : ToDoContainer.ToDoBase
    {
        public override Empty Initialize(Empty input)
        {
            if (State.Initialized.Value)
            {
                return new Empty();
            }
            State.Initialized.Value = true;
            State.Owner.Value = Context.Sender;
            State.TaskIds.Value = "";
            State.TaskCounter.Value = 0;
            return new Empty();
        }
        public override StringValue CreateTask(TaskInput input)
        {
            if (!State.Initialized.Value)
            {
                return new StringValue { Value = "Contract not initialized." };
            }
            var taskId = (State.TaskCounter.Value + 1).ToString();
            State.TaskCounter.Value++;
            var timestamp = Context.CurrentBlockTime.Seconds;
            // Create task dictionary entry directly in ToDo class
            State.Tasks[taskId] = new Task
            {
                TaskId = taskId,
                Name = input.Name,
                Description = input.Description,
                Category = input.Category,
                Status = "pending",
                CreatedAt = timestamp,
                UpdatedAt = timestamp,
                Owner = Context.Sender.ToString().Trim('"'),
            };
            State.TaskExistence[taskId] = true;
            // Append task ID to the list of IDs
            var existingTaskIds = State.TaskIds.Value;
            existingTaskIds += string.IsNullOrEmpty(existingTaskIds) ? taskId : $",{taskId}";
            State.TaskIds.Value = existingTaskIds;
            return new StringValue { Value = taskId };
        }
        public override Empty UpdateTask(TaskUpdateInput input)
        {
            var task = State.Tasks[input.TaskId];
            if (task == null)
            {
                return new Empty(); // Handle case if task doesn't exist
            }
            task.Name = input.Name ?? task.Name;
            task.Description = input.Description ?? task.Description;
            task.Category = input.Category ?? task.Category;
            task.Status = input.Status ?? task.Status;
            task.UpdatedAt = Context.CurrentBlockTime.Seconds;
            State.Tasks[input.TaskId] = task;
            return new Empty();
        }
        public override Empty DeleteTask(StringValue input)
        {
            State.Tasks.Remove(input.Value);
            State.TaskExistence.Remove(input.Value);
            // Remove task ID from the list of IDs
            var existingTaskIds = State.TaskIds.Value.Split(',');
            var newTaskIds = new List<string>(existingTaskIds.Length);
            foreach (var taskId in existingTaskIds)
            {
                if (taskId != input.Value)
                {
                    newTaskIds.Add(taskId);
                }
            }
            State.TaskIds.Value = string.Join(",", newTaskIds);
            return new Empty();
        }
        public override TaskList ListTasks(StringValue input)
        {
            var owner = input.Value; // Get the owner value from the input
            var taskList = new TaskList();
            var taskIds = State.TaskIds.Value.Split(',');
            foreach (var taskId in taskIds)
            {
                var task = State.Tasks[taskId];
                if (task != null && task.Owner == owner) // Filter tasks by owner
                {
                    taskList.Tasks.Add(task);
                }
            }
            return taskList;
        }
        public override Task GetTask(StringValue input)
        {
            var task = State.Tasks[input.Value];
            if (task == null)
            {
                return new Task { TaskId = input.Value, Name = "Task not found." };
            }
            return task;
        }
        public override BoolValue GetInitialStatus(Empty input)
        {
            return new BoolValue { Value = State.Initialized.Value };
        }
    }
}
```

### Building Smart Contract

- Build the smart contract code with the following command inside `src` folder:

```bash title="Terminal"
dotnet build
```

You should see **ToDoApp.dll.patched** in the directory `ToDoApp/src/bin/Debug/net.6.0`
