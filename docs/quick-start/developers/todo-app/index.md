---
sidebar_position: 5
title: ToDo Tutorial Contract
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

#### Define Contract States

The implementation of file `src/ToDoAppState.cs` is as follows:

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

#### Implement ToDo Smart Contract 

The implementation of file `src/ToDoApp.cs` is as follows:

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

- Build the new code with the following commands inside `src` folder:

```bash title="Terminal"
dotnet build
```

You should see **ToDoApp.dll.patched** in the directory `ToDoApp/src/bin/Debug/net.6.0`

## Step 3 - Deploy Smart Contract

import Deploy from "../\_deploy.md"

<Deploy />

## Step 4 - Interact with Your Deployed Smart Contract

### Project Setup

Let's start by cloning the frontend project repository from GitHub.

- Run the following command in the `todo_dapp_aelf` directory:

```bash title="Terminal"
git clone 
```

- Next, navigate to the frontend project directory with this command:

```bash title="Terminal"
cd 
```

- Once you're in the `=====` directory, open the project with your preferred IDE (e.g., VSCode). You should see the project structure as shown below.

  ![result](/img/vote-fe-directory.png)

#### Install necessary libraries

- Run this command in the terminal:

```bash title="Terminal"
npm install
```

We are now ready to build the frontend components of our Voting dApp.

### Configure Portkey Provider & Write Connect Wallet Function

We'll set up our Portkey provider to allow users to connect their Portkey wallets to our app and interact with the aelf smart contracts. We'll be interacting with the already deployed multi-token contract for this tutorial.

**Step 1. Locate the File:**

- Go to the `src/hooks/useTodoSmartContract.ts` file.

**Step 2. Fetch the Smart Contract:**

- Find the comment ` //Step A - Function to fetch a Smart Contract based on deployed wallet address`

- Replace the existing **`fetchContract`** function with this updated code:

```javascript title="useTodoSmartContract.ts"
//Step A - Function to fetch a Smart Contract based on deployed wallet address
const fetchContract = async () => {
  if (!provider) return null;

  try {
    // 1. get the sidechain tDVW using provider.getChain
    const chain = await provider?.getChain("tDVW");
    if (!chain) throw new Error("No chain");

    //Address of ToDo Smart Contract
    //Replace with Address of Deployed Smart Contract
    const address = "your_deployed_todo_contract_address";

    // 2. get the ToDo contract
    const todoContract = chain?.getContract(address);
    setSmartContract(todoContract);
  } catch (error) {
    console.log(error, "====error");
  }
}
```

:::tip
ℹ️ Note: You are to replace the address placeholder with your deployed todo contract address from "Building Smart Contract"!

example:
//Replace with Address of Deployed Smart Contract
const address = "your_deployed_todo_contract_address";
:::

**Explanation:**

- **`fetchContract`** **Function**: This function fetches a smart contract based on the given chain symbol (e.g., "AELF" or "tDVW") and the contract address.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Chain** : The function fetches chain information using the provider.
  - **Get Contract** : It retrieves the smart contract instance from the chain.
  - **Error Handling** : If an error occurs, it logs the error to the console.

**Step 3. Initialize and Fetch the Smart Contracts:**

- Find the comment `// Step B - Effect hook to initialize and fetch the smart contracts when the provider changes.`

- Replace the existing **`useEffect`** hook with this updated code:

```javascript title="useTodoSmartContract.ts"
  // Step B -  Effect hook to initialize and fetch the smart contracts when the provider changes
  useEffect(() => {
    fetchContract();
  }, [provider]); // Dependency array ensures this runs when the provider changes
```

**Explanation:**

- **`useEffect`** **Hook** : This hook initializes and fetches the smart contracts when the provider changes.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Contracts** : It fetches and sets the smart contracts.

By following these steps, we'll configure the Portkey provider to connect users' wallets to your app and interact with the todo smart contract including Task management related functionalities. This setup will enable our frontend components to perform actions like `Create Task`, `Update Task`, and `Delete Task`.

### Configure Connect Wallet Function

**Step 1: Locate the File**

- Go to the `src/components/layout/header/index.tsx` file.

**Step 2: Write the Connect Wallet Function**

- The `header/index.tsx` file is the header of our ToDo dApp. It allows users to connect their Portkey wallet with the ToDo dApp.

- Before users can interact with the smart contract, we need to write the `Connect Wallet` function.

- Find the comment `// Step C - Connect Portkey Wallet`.

- Replace the existing connect function with this code snippet:

```javascript title="header/index.tsx"
const connect = async (walletProvider?: IPortkeyProvider) => {
  // Step C - Connect Portkey Wallet
  const accounts = await (walletProvider ? walletProvider : provider)?.request({
    method: MethodsBase.REQUEST_ACCOUNTS,
  });
  const account = accounts?.AELF && accounts?.AELF[0];
  if (account) {
    setCurrentWalletAddress(account.replace(/^ELF_/, "").replace(/_AELF$/, ""));
    setIsConnected(true);
  }
  !walletProvider && toast.success("Successfully connected");
};
```

**Explanation:**

- **`connect`** **Function** : This function connects the user's Portkey wallet with the dApp.

  - **Fetch Accounts** : It fetches the wallet accounts using the provider.
  - **Log Accounts** : Logs the accounts to the console for debugging.
  - **Set Wallet Address** : Sets the current wallet address state variable with the fetched account.
  - **Update Connection Status** : Updates the state to indicate that the wallet is connected.
  - **User Notification** : Displays an alert to notify the user that their wallet is successfully connected.

In this code, we fetch the Portkey wallet account using the provider and update the wallet address state variable. An alert notifies the user that their wallet is successfully connected.

With the Connect Wallet function defined, we're ready to write the remaining functions in the next steps.

### Configure Create Task Form Code

**Step 1: Locate the File**

1. Go to the `src/pages/home/index.tsx` file. This file is contains all the  functionalities like show User's Task, CreateTask, Update Task, Delete task and Filter all Task and etc.

**Step 2: Prepare Form to Creat and Update Tasks**

1.  Find the comment `// Step D - Configure Todo Form`.

2.  Replace the form variable with this code snippet:

```javascript title="home/index.tsx"
// Step D - Configure Todo Form
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    description: "",
  },
});
```

#### Here's what the function does:

1. Initializes a new form variable with default values needed to create a Task.

2. Fields include: `name` and `description`.

Now the form is ready for users to fill in the necessary details for their ToDo function interaction.

### Check Contract Initialization

- Scroll down to find the comment `// step 1 - Check If Contract is Initialized or not`.

- Replace the existing **`checkIsContractInitialized`** function with this code snippet:
 
```javascript title="home/index.tsx"
// step 1 - Check If Contract is Initialized or not 
const checkIsContractInitialized = async () => {
  const result = await smartContract?.callViewMethod("GetInitialStatus", ""); // Call the GetInitialStatus method which is present on Smart Contract
  setIsContractInitialized(result?.data?.value); // Expect value True if it's Initialized otherwise NULL if it's not
};
```

### Initialize Contract

- Scroll down to find the comment `// step 2 - Intitialize The Contract Very First Time`.

- Replace the existing **`checkIsContractInitialized`** function with this code snippet:
 
```javascript title="home/index.tsx"
// step 2 - Intitialize The Contract Very First Time
const initializeContract = async () => {
  let initializeLoadingId;
  try {
    // Start Loading
    initializeLoadingId = toast.loading("Initializing a Contract..");

    await smartContract?.callSendMethod(
      "Initialize", // Function Name
      currentWalletAddress as string, // User Wallet Address 
      {} // No Arguments
    );

    // Update Loading Message with Success
    toast.update(initializeLoadingId, {
      render: "Contract Successfully Initialized",
      type: "success",
      isLoading: false,
    });
  } catch (error: any) {
    // Update Loading Message with Error
    toast.update(initializeLoadingId as Id, {
      render: error.message,
      type: "error",
      isLoading: false,
    });
  } finally {
    // Remove Loading Message
    removeNotification(initializeLoadingId as Id);
  }
};
```

### Create New Task

- Write the function for `Create New Task`**

- The `home/index.tsx` file includes the code to create Taks. It allows users to create new Taks.

- Find the comment `// step 3 - Create a New Task using Smart Contract`.

- Replace the existing **`createNewTask`** function with this code snippet:

```javascript title="home/index.tsx"
// step 3 - Create a New Task using Smart Contract
const createNewTask = async (values: {
  name: string;
  description: string;
}) => {
  let createLoadingId;
  try {
    // Start Loading
    createLoadingId = toast.loading("Creating a New Task..");
    setFormLoading(true);

    // Prepare Arguments for Create a New Task
    const sendData = {
      name: values.name,
      description: values.description,
      category: selectedCategory?.value,
      status: TASK_STATUS.pending,
    };

    // Call CreateTask Function of Smart Contract
    await smartContract?.callSendMethod(
      "CreateTask",
      currentWalletAddress as string,
      sendData
    );

    // Update Loading Message with Success
    toast.update(createLoadingId, {
      render: "New Task Successfully Created",
      type: "success",
      isLoading: false,
    });      

    // Get New Data from Contract
    getTodoData();
  } catch (error: any) {
    // Update Loading Message with Error
    toast.update(createLoadingId as Id, {
      render: error.message,
      type: "error",
      isLoading: false,
    });
  } finally {
    // Close Form Modal
    handleCloseModal();

    // Remove Loading Message
    removeNotification(createLoadingId as Id);
    setFormLoading(false);
  }
};
```

#### What This Function Does:

1. **Creates an Object with Task Details** : It prepares the data needed to create a new Task.

2. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to create the new Task using the prepared data.

Next, we'll write the **Update Task** function.

### Update the Task

Write the function for Update the Existing Task.

- Scroll down to find the comment `// step 4 - Update the Task`.

- Replace the existing **`updateTask`** function with this code snippet:

```javascript title="home/index.tsx"
// step 4 - Update the Task
const updateTask = async (values: { name: string; description: string }) => {
  let updateLoadingId;
  try {
    // Start Loading
    updateLoadingId = toast.loading("Updating a Task..");
    setFormLoading(true);

    // Prepare Arguments for Update the Task
    const sendData = {
      taskId: updateId,
      name: values.name,
      description: values.description,
      category: selectedCategory?.value,
      status: TASK_STATUS.pending,
    };

    // Call UpdateTask Function of Smart Contract
    await smartContract?.callSendMethod(
      "UpdateTask",
      currentWalletAddress as string,
      sendData
    );

    // Update Loading Message with Success
    toast.update(updateLoadingId, {
      render: "Task Successfully Updated",
      type: "success",
      isLoading: false,
    });

    // Get New Data from Contract
    getTodoData();
  } catch (error: any) {
    // Update Loading Message with Error
    toast.update(updateLoadingId as Id, {
      render: error.message,
      type: "error",
      isLoading: false,
    });
  } finally {
    // Close Form Modal
    handleCloseModal();
    // Remove Loading Message
    removeNotification(updateLoadingId as Id);
    setFormLoading(false);
  }
};
```

#### What This Function Does:

1. **Creates an Object with Updated Task Details** : It prepares the data needed to Updated Task Details

2. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to update the existing Task using the prepared data.

Next, we'll write the **Update Task Status (completeTask)** function.

### Update the Task Status

Write the Function for Update Task Status (completeTask).

- Scroll down to find the comment `// step 5- Update Status from Pending to Completed of the Taskt`.

- Replace the existing **`completeTask`** function with the following code snippet:

```javascript title="home/index.tsx"
// step 5- Update Status from Pending to Completed of the Task
const completeTask = async (data: ITodoObject) => {
  let completeLoadingId;
  try {
    // Start Loading
    completeLoadingId = toast.loading("Moving to Completed Task..");
    setUpdateId(data.taskId); // set Update Id for Loading on Button

    // Call UpdateTask Function of Smart Contract
    await smartContract?.callSendMethod(
      "UpdateTask",
      currentWalletAddress as string,
      { ...data, status: TASK_STATUS.completed }
    );

    // Update Loading Message with Success
    toast.update(completeLoadingId, {
      render: "Task Moved to Completed",
      type: "success",
      isLoading: false,
    });

    // Get New Data from Contract
    await getTodoData();
  } catch (error: any) {
    // Update Loading Message with Error
    toast.update(completeLoadingId as Id, {
      render: error.message,
      type: "error",
      isLoading: false,
    });
  } finally {
    setUpdateId(null);
    // Remove Loading Message
    removeNotification(completeLoadingId as Id);
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to update the task Status by pass the `completed` status as an Argument.

Next, we'll write the **Delete the Task** function.

### Delete the Task

Write Function for Delete the existing Task.

- Scroll down to find the comment `// step 6 - Delete the Task`.

- Replace the existing **`deleteTask`** function with this code snippet:

```javascript title="home/index.tsx"
// step 6 - Delete the Task
const deleteTask = async (data: ITodoObject) => {
  let deleteLoadingId;
  try {
    // Start Loading
    deleteLoadingId = toast.loading("Removing a Task..");
    setDeletingId(data.taskId); // set Deleting Id for Loading on Button

    // Call UpdateTask Function of Smart Contract and update the status as "Removed"
    await smartContract?.callSendMethod(
      "UpdateTask",
      currentWalletAddress as string,
      { ...data, status: TASK_STATUS.removed }
    );
    
    // Update Loading Message with Success
    toast.update(deleteLoadingId, {
      render: "Task Successfully Removed",
      type: "success",
      isLoading: false,
    });

    // Get New Data from Contract
    await getTodoData();
  } catch (error: any) {
    // Update Loading Message with Error
    toast.update(deleteLoadingId as Id, {
      render: error.message,
      type: "error",
      isLoading: false,
    });
  } finally {
    setDeletingId(null);
    // Remove Loading Message
    removeNotification(deleteLoadingId as Id);
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to Delete the existing task by passing Status as "removed".

Next, we'll write the **Handle Submit Form** function.

### Configure Submit Form

- Scroll down to find the comment `// step 7 - Handle Submit Form`.

- Replace the existing **`onSubmit`** function with this code snippet:

```javascript title="home/index.tsx"
// step 7 - Handle Submit Form
const onSubmit = async (values: { name: string; description: string }) => {
  
  // Check Whether Contract Initialized or not
  if (isContractInitialized !== true) {
    await initializeContract(); // initialize the contract if it's not initialized before
  }
  
  // Check Whether Form is for Create or Update the Task
  if (!!updateId) {
    await updateTask(values); // Call updateTask for Update the task
  } else {
    await createNewTask(values); // Call createNewTask for Create a new task
  }
};
```

#### What This Function Does:

1. **Check initialized contract**: It's Checks Whether Contract Initialized or not buy using `initializeContract` function.

2. **Update Task**: Call the `updateTask` function if updatedId has any value.

3. **Create Task**: Call the `createNewTask` function if updatedId has not any value.

So we completed functions for **Create Task**, **Update Task** and **Delete Task** and now it's time to write Function for the **Fetch Tasks** from Contract so Let's write that.

### Fetch Task Data

- Scroll up to find the comment `// step 8 - Get Todo Data from User's wallet using contract`.

- Replace the existing **`getTodoData`** function with this code snippet:

```javascript title="home/index.tsx"
// step 8 - Get Todo Data from User's wallet using contract
const getTodoData = async () => {
  try {
    const result = await smartContract?.callViewMethod("ListTasks", {
      value: currentWalletAddress,
    });
    console.log("result", result?.data);
    setTodoData(result?.data ? result?.data.tasks : []);
  } catch (error) {
    console.log("error======", error);
  } finally {
    setLoading(false);
  }
};
```
#### Here's what the function does:

1. **Fetches Task Data:** It calls `ListTasks` to get List of Task data from the ToDo contract.
2. **Set Tasks on State:** Get the Result data from Contract and Set Array of Data into `todoData` State.

We have Prepared necessary function for fetch Tasks Data from User's Wallet.

Now that we've written all the necessary frontend functions and components, we're ready to run the ToDo dApp application in the next step.

### Run Application

In this step, we will run the ToDo dApp application.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

:::info

**Note**: Ensure that you are running this command under the **AXXXXX** folder.

:::

- You should observe the following as shown below.

  ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the ToDo landing page as shown below.

:::tip
If you are developing and testing this with GitHub codespace, you can use Port Forward to test the web server that is running in codespace, here is the link on how to use Port forward for codespace https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace
:::

- Usually codespace will automatically forward port, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:

  ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the ToDo dApp in the browser.

  ![todo-home-page](/img/todo-homepage.jpg)

#### Create Portkey Wallet

:::info
Portkey is the first AA wallet from aelf's ecosystem, migrating users, developers and projects from Web2 to Web3 with DID solution.

Users can swiftly log into Portkey via their Web2 social info with no private keys or mnemonics required. Underpinned by social recovery and decentralized guardian design, Portkey safeguards users' assets from centralized control and theft. Portkey has a unique payment delegation mechanism which enables interested parties to function as delegatees to pay for user activities on users' behalf. This means that users can create accounts for free and fees for other usages may also be covered in Portkey.

Portkey also provides crypto on/off-ramp services, allowing users to exchange fiat with crypto freely. It supports the storage and management of various digital assets such as tokens, NFTs, etc. The compatibility with multi-chains and seamless connection to all kinds of DApps makes Portkey a great way to enter the world of Web3.

With DID solution as its core, Portkey provides both Portkey Wallet and Portkey SDKs.

For more information, you may visit the official documentation for Portkey at https://doc.portkey.finance/.
:::


- Download the Chrome extension for Portkey from https://chromewebstore.google.com/detail/portkey-wallet/iglbgmakmggfkoidiagnhknlndljlolb.

:::info
The Portkey extension supports Chrome browser only (for now). Please ensure that you are using Chrome browser.
You may download Chrome from https://www.google.com/intl/en_sg/chrome/.
:::

- Once you have downloaded the extension, you should see the following on your browser as shown below.

   ![welcome-to-portkey](/img/welcome-to-portkey.png)

- Click on `Get Start` and you should see the following interface as shown below.

   ![portkey-login](/img/portkey-login.png)


**Sign up** 

- Switch to **aelf Testnet** network by selecting it:

   ![portkey-switch-to-testnet](/img/portkey-switch-to-testnet.png)

:::danger
Please make sure you are using `aelf Testnet` in order to be able to receive your testnet tokens from the Faucet.
:::

- Proceed to sign up with a Google Account or your preferred login method and complete the necessary accounts creation prompts and you should observe the following interface once you have signed up.

   ![success-login](/img/success-login.png)

With that, you have successfully created your very first Portkey wallet within seconds. How easy was that?

:::info
It is highly recommended to pin the Portkey wallet extension for easier access and navigation to your Portkey wallet!
:::

- Next, click on ‘Open Portkey’ and you should now observe the following as shown below.

   ![portkey-wallet-preview](/img/portkey-wallet-preview.png)

**Connect Portkey Wallet**

- Click on **"Connect Wallet"** to connect your Portkey wallet.

   ![connect-wallet](/img/todo-connect-wallet.jpg)

- The button will change to **"Your Wallet Address"** when the connection is successful.

   ![collect-wallet-success](/img/todo-wallet-connect-success.jpg)

--- 

**Create a New Task**

- Click on **"Add New"** button to create new Task.

   ![create-task](/img/create-task.png)

- You will get this Popup Modal with Form of Create a new Task. so Please Fill all other Necessary Fields like Name, Description and Type of Category.

   ![create-task-form](/img/create-task-form.png)

- Click on **Create New Task** Button.

- Now, You will get Transaction Request on your Portkey Wallet so **Sign In** the Transaction.

   ![create-task-sign-request](/img/create-task-sign-request.jpg)

- Click on **Sign In** the Transaction.

- After Successfull Transaction, Your First Task will be created✅.

   ![create-task-success](/img/create-task-success.jpg)

- Your Task Item Look like below with these following Details -  **`Name`** , **`Description`** , **`Last Updated Time`** , **`Create Date and Time`**,

   ![todo-item.jpg](/img/todo-item.jpg)

- You will be able to perform these following action for perticular task - **`Edit`** , **`Complete`** , and **`Remove`** .

As we have **Created Task** Successfully so Let's Update Task Details and Perform the Edit Task Functionality.

---

**Edit the Task**

- Click on **"Edit"** button to edit the Task.

   ![update-task](/img/update-task.png)

- You will get this Popup Modal with Form of Edit the Task. so Edit the Necessary Fields as per you want.

   ![edit-task-form](/img/edit-task-form.jpg)

- Click on **Update Task** Button.
 
- Now, You will get Transaction Request on your Portkey Wallet so **Sign In** the Transaction.

   ![update-task-sign-request](/img/update-task-request.jpg)

- Click on **Sign In** the Transaction.

- After Successfull Transaction, Your Task details will be Updated✅.

   ![update-task-success](/img/update-task-success.jpg)

As we have **Edit Task** Successfully so Let's Move That Task to Completed and Perform the Complete Task Functionality.

---

**Complete the Task**

- Click on **"Complete"** button to to Move Task to as `Completed`.

   ![complete-task-button](/img/complete-task-button.jpg)

- Now, You will get Transaction Request on your Portkey Wallet so **Sign In** the Transaction.

   ![complete-task-sign-request](/img/complete-task-request.jpg)

- Click on **Sign In** the Transaction.


- After Successfull Transaction, Your Task will be moved to the Completed status✅.

   ![complete-task-success](/img/complete-task-success.jpg)

As we have **Complete Task** Successfully so Let's Move Completed Task to Removed and Perform the Removed Task Functionality.

---

**Remove the Task**

- Click on **"Remove"** button to to Move Task to as `Removed`.

   ![remove-task-button](/img/delete-task-button.jpg)
 
- Now, You will get Transaction Request on your Portkey Wallet so **Sign In** the Transaction.

   ![remove-task-sign-request](/img/delete-task-request.jpg)

- Click on **Sign In** the Transaction.

- After Successfull Transaction, Your Task will be moved to the Removed status✅.

   ![remove-task-success](/img/delete-task-success.jpg)

:::success
🎉 Congratulations Learners! You have successfully built your ToDo dApp and this is no mean feat!
:::


## 🎯 Conclusion

🎉 Congratulations on successfully completing the **ToDo dApp** tutorial! 🎉 You've taken important steps in setting up your development environment, developing and deploying a smart contract, and building a fully functional decentralized application on the aelf blockchain. 🌟

**📚 What You've Learned**

Throughout this tutorial, you've mastered:

  - **🛠️ Setting Up Your Development Environment:** You prepared your workspace by installing and configuring all the necessary tools to kickstart your smart contract project.

  - **💻 Developing Your Smart Contract:** You created the foundation of your ToDo dApp by writing and building the smart contract that manages tasks, from creation to deletion.

  - **🚀 Deploying the Smart Contract:** You deployed your smart contract to the aelf blockchain, enabling its functionalities to be used in a live environment.

  - **🔧 Interacting with Your Deployed Smart Contract:** You connected your frontend to the blockchain, integrated Portkey for wallet connectivity, and implemented functions to manage tasks such as creating, updating, and deleting directly through the dApp.

**🔍 Final Output**

By now, you should have:

   - 📜 A deployed smart contract that powers your ToDo dApp, managing tasks with functionalities for creation, updating, status management, and deletion.

   - 💻 A fully operational ToDo dApp, allowing users to interact with the smart contract to efficiently manage their tasks.

**➡️ What's Next?**

With the basics under your belt, consider exploring more advanced topics:

  - **📈 Enhancing Smart Contract Logic:** Introduce more complex features to your ToDo dApp, such as prioritization, deadlines, or collaboration tools.

  - **🔒 Improving Security:** Ensure your dApp and smart contract are secure by implementing best practices and security measures.

  - **🌍 Exploring Cross-Chain Features:** Expand your dApp’s capabilities by exploring aelf’s cross-chain interoperability, enabling interaction with other blockchains.

The possibilities with blockchain technology and decentralized applications are endless. You're now well-equipped to take your ToDo dApp to the next level. Keep building, innovating, and exploring with aelf. 🚀

Happy coding and expanding your **ToDo dApp! 😊**