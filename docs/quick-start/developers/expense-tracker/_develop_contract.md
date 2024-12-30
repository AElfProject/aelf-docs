### Start Your Smart Contract Project

- Open your `Terminal`.

- Enter the following command to generate a new project:

```bash title="Terminal"
mkdir expense-tracker-dapp
cd expense-tracker-dapp
dotnet new aelf -n ExpenseTracker
```

### Adding Your Smart Contract Code

Now that we have a template Expense Tracker project, we can customise the template to incorporate our own contract logic.
Let's start by implementing methods to handle the basic functionality of adding an expense, updating a selected expense, deleting a selected expense, list all the expenses, and retrieves the details of a specific expense within the contract state. Expense tracker dApp includes the below functionalities like:
1. AddExpense: Adds a new expense to the contract state.
2. UpdateExpense: Updates an existing expense’s details such as description, category, amount, and currency.
3. DeleteExpense: Deletes an expense based on the given expense ID.
4. ListExpenses: Lists all expenses associated with a specific owner.
5. GetExpense: Retrieves the details of a specific expense based on the provided expense ID.

- Enter this command in your `Terminal`.

```bash title="Terminal"
cd src
```

#### Defining Methods and Messages

- Rename the proto file name `hello_world_contract.proto` inside folder `Protobuf/contract/` to `expense_tracker.proto`:

```bash title="Terminal"
mv Protobuf/contract/hello_world_contract.proto Protobuf/contract/expense_tracker.proto
```

The `.proto` file defines the structure and serialization of data, ensuring consistent communication and data exchange between the contract and external systems.

- Open the project with your IDE.

The implementation of `expense_tracker.proto` file inside folder `src/Protobuf/contract/` is as follows:

```csharp title="expense_tracker.proto"
syntax = "proto3";
import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "Protobuf/reference/acs12.proto";
// The namespace of this class
option csharp_namespace = "AElf.Contracts.ExpenseTracker";
service ExpenseTracker {
  option (aelf.csharp_state) = "AElf.Contracts.ExpenseTracker.ExpenseTrackerState";
  option (aelf.base) = "Protobuf/reference/acs12.proto";
  rpc Initialize (google.protobuf.Empty) returns (google.protobuf.Empty) {
  }
  rpc AddExpense (ExpenseInput) returns (google.protobuf.StringValue) {
  }
  rpc UpdateExpense (ExpenseUpdateInput) returns (google.protobuf.Empty) {
  }
  rpc DeleteExpense (google.protobuf.StringValue) returns (google.protobuf.Empty) {
  }
  rpc ListExpenses (google.protobuf.StringValue) returns (ExpenseList) {
    option (aelf.is_view) = true;
  }
  rpc GetExpense (google.protobuf.StringValue) returns (Expense) {
    option (aelf.is_view) = true;
  }
  rpc GetInitialStatus (google.protobuf.Empty) returns (google.protobuf.BoolValue) {
    option (aelf.is_view) = true;
  }
}

message Expense {
  string expense_id = 1;
  string description = 2;
  string category = 3;
  int64 amount = 4; // Store as cents
  string currency = 5;
  string owner = 6;
  int64 created_at = 7;
  int64 updated_at = 8;
}

message ExpenseInput {
  string description = 1;
  string category = 2;
  int64 amount = 3; // Store as cents
  string currency = 4;
}

message ExpenseUpdateInput {
  string expense_id = 1;
  string description = 2;
  string category = 3;
  int64 amount = 4; // Store as cents
  string currency = 5;
}

message ExpenseList {
  repeated Expense expenses = 1;
}
```

- `rpc` methods define the callable functions within the contract, allowing external systems to interact with the contract's logic.
- `message` represent the structured data exchanged between the contract and external systems.

#### Define Contract States

The implementation of the Expense Tracker smart contract state inside file `src/ExpenseTrackerState.cs` is as follows:

```csharp title="src/ExpenseTrackerState.cs"
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.ExpenseTracker
{
    public class ExpenseTrackerState : ContractState
    {
        public BoolState Initialized { get; set; }
        public SingletonState<Address> Owner { get; set; }
        public MappedState<string, Expense> Expenses { get; set; } // Mapping of expense ID to Expense
        public MappedState<string, bool> ExpenseExistence { get; set; } // Mapping to track expense existence
        public StringState ExpenseIds { get; set; } // Concatenated string of expense IDs
        public Int32State ExpenseCounter { get; set; } // Counter for generating unique IDs
    }
}
```

- The `State.cs` file in the aelf blockchain smart contract holds the variables that store the contract's data, making sure this data is saved and accessible whenever the contract needs it.

#### Implement Expense Tracker Smart Contract 

The implementation of the Expense Tracker smart contract inside file `src/ExpenseTracker.cs` is as follows:

```csharp title="src/ExpenseTracker.cs"
using Google.Protobuf.WellKnownTypes;
using System.Collections.Generic;

namespace AElf.Contracts.ExpenseTracker
{
    public class ExpenseTracker : ExpenseTrackerContainer.ExpenseTrackerBase
    {
        public override Empty Initialize(Empty input)
        {
            if (State.Initialized.Value)
            {
                return new Empty();
            }
            State.Initialized.Value = true;
            State.Owner.Value = Context.Sender;
            State.ExpenseIds.Value = "";
            State.ExpenseCounter.Value = 0;
            return new Empty();
        }

        public override StringValue AddExpense(ExpenseInput input)
        {
            if (!State.Initialized.Value)
            {
                return new StringValue { Value = "Contract not initialized." };
            }
            var expenseId = (State.ExpenseCounter.Value + 1).ToString();
            State.ExpenseCounter.Value++;
            var timestamp = Context.CurrentBlockTime.Seconds;
            State.Expenses[expenseId] = new Expense
            {
                ExpenseId = expenseId,
                Description = input.Description,
                Category = input.Category,
                Amount = input.Amount, // Now using int64 for amount
                Currency = input.Currency,
                CreatedAt = timestamp,
                UpdatedAt = timestamp,
                Owner = Context.Sender.ToString().Trim('"'),
            };
            State.ExpenseExistence[expenseId] = true;

            var existingExpenseIds = State.ExpenseIds.Value;
            existingExpenseIds += string.IsNullOrEmpty(existingExpenseIds) ? expenseId : $",{expenseId}";
            State.ExpenseIds.Value = existingExpenseIds;

            return new StringValue { Value = expenseId };
        }

        public override Empty UpdateExpense(ExpenseUpdateInput input)
        {
            var expense = State.Expenses[input.ExpenseId];
            if (expense == null)
            {
                return new Empty(); // Handle case if expense doesn't exist
            }
            expense.Description = input.Description ?? expense.Description;
            expense.Category = input.Category ?? expense.Category;
            expense.Amount = input.Amount != 0 ? input.Amount : expense.Amount; // Now using int64 for amount
            expense.Currency = input.Currency ?? expense.Currency;
            expense.UpdatedAt = Context.CurrentBlockTime.Seconds;

            State.Expenses[input.ExpenseId] = expense;
            return new Empty();
        }

        public override Empty DeleteExpense(StringValue input)
        {
            State.Expenses.Remove(input.Value);
            State.ExpenseExistence.Remove(input.Value);

            var existingExpenseIds = State.ExpenseIds.Value.Split(',');
            var newExpenseIds = new List<string>(existingExpenseIds.Length);
            foreach (var expenseId in existingExpenseIds)
            {
                if (expenseId != input.Value)
                {
                    newExpenseIds.Add(expenseId);
                }
            }
            State.ExpenseIds.Value = string.Join(",", newExpenseIds);

            return new Empty();
        }

        public override ExpenseList ListExpenses(StringValue input)
        {
            var owner = input.Value; // Get the owner value from the input
            var expenseList = new ExpenseList();
            var expenseIds = State.ExpenseIds.Value.Split(',');
            foreach (var expenseId in expenseIds)
            {
                var expense = State.Expenses[expenseId];
                if (expense != null && expense.Owner == owner) // Filter expenses by owner
                {
                    expenseList.Expenses.Add(expense);
                }
            }
            return expenseList;
        }

        public override Expense GetExpense(StringValue input)
        {
            var expense = State.Expenses[input.Value];
            if (expense == null)
            {
                return new Expense { ExpenseId = input.Value, Description = "Expense not found." };
            }
            return expense;
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

You should see **ExpenseTracker.dll.patched** in the directory `ExpenseTracker/src/bin/Debug/net.6.0`
