### Configure Portkey Provider & Write Connect Wallet Function

Now, we'll set up our Portkey wallet provider to allow users to connect their Portkey wallets to the dApp and interact with the smart contract. We'll be interacting with the already deployed ToDo smart contract for this tutorial.

**Step 1. Locate the File:**

- Go to the `src/hooks/useTodoSmartContract.ts` file.

**Step 2. Fetch the Smart Contract:**

- Find the comment ` //Step A - Function to fetch a smart contract based on deployed wallet address`

- Replace the existing **`fetchContract`** function with this updated code:

```javascript title="useTodoSmartContract.ts"
//Step A - Function to fetch a smart contract based on deployed wallet address
const fetchContract = async () => {
  if (!provider) return null;

  try {
    // 1. get the dAppChain tDVW using provider.getChain
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
ℹ️ Note: You are to replace the address placeholder with your deployed ToDo smart contract address from "Deploy Smart Contract" step!

example:
//Replace with Address of Deployed Smart Contract
const address = "your_deployed_todo__smart_contract_address";
:::

**Explanation:**

- **`fetchContract`** **Function**: This function fetches a smart contract based on the given chain symbol (e.g., "AELF" or "tDVW") and the contract address.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Chain** : The function fetches chain information using the provider.
  - **Get Contract** : It retrieves the smart contract instance from the chain.
   
`AELF` represents the mainnet chain and `tDVW` represents the testnet chain respectively on aelf blockchain.

**Step 3. Initialize and Fetch the Smart Contracts:**

- Find the comment `// Step B - Effect hook to initialize and fetch the smart contract when the provider changes.`

- Replace the existing **`useEffect`** hook with this updated code:

```javascript title="useTodoSmartContract.ts"
  // Step B -  Effect hook to initialize and fetch the smart contract when the provider changes
  useEffect(() => {
    fetchContract();
  }, [provider]); // Dependency array ensures this runs when the provider changes
```

**Explanation:**
- **`useEffect` Hook** : This hook initializes and fetches the smart contracts when the provider changes.
  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Contracts** : It fetches and sets the smart contracts.

By following these steps, we'll configure the Portkey provider to connect users' wallets to our app and interact with the ToDo smart contract including task management related functionalities. This setup will enable our frontend components to perform actions like `Create Task`, `Edit Task`, and `Delete Task`.

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

- **`connect` Function** : This function connects the user's Portkey wallet with the dApp.
  - **Fetch Accounts** : It fetches the wallet accounts using the provider.
  - **Log Accounts** : Logs the accounts to the console for debugging.
  - **Set Wallet Address** : Sets the current wallet address state variable with the fetched account.
  - **Update Connection Status** : Updates the state to indicate that the wallet is connected.
  - **User Notification** : Displays an alert to notify the user that their wallet is successfully connected.

In this code, we fetch the Portkey wallet account using the provider and update the wallet address state variable. An alert notifies the user that their wallet is successfully connected.

With the connect wallet function defined, we're ready to write the remaining functions in the next steps.

### Configure Create Task Form 

**Step 1: Locate the File**

1. Go to the `src/pages/home/index.tsx` file. This file contains all the  functionalities like show user's Task, CreateTask, UpdateTask, DeleteTask and Filter all Tasks, etc.

**Step 2: Prepare Form to Create and Update Tasks**

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

1. Initializes a new form variable with default values needed to create a task.

2. Fields include: `name` and `description`.

Now the form is ready for users to fill in the necessary details.

### Check Contract Initialization

- Scroll down to find the comment `// step 1 - Check if contract is initialized or not`.

- Replace the existing **`checkIsContractInitialized`** function with this code snippet:
 
```javascript title="home/index.tsx"
// step 1 - Check if contract is initialized or not
const checkIsContractInitialized = async () => {
  const result = await smartContract?.callViewMethod("GetInitialStatus", ""); // Call the GetInitialStatus method which is present on Smart Contract
  setIsContractInitialized(result?.data?.value); // Expect value True if it's Initialized otherwise NULL if it's not
};
```

### Initialize Contract

- Scroll down to find the comment `// step 2 - Initialize the smart contract`.

- Replace the existing **`initializeContract`** function with this code snippet:

<!-- checkIsContractInitialized and initializeContract are different here -->
 
```javascript title="home/index.tsx"
// step 2 - Initialize the smart contract
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
  } catch (error) {
    // Update Loading Message with Error
    if (error instanceof Error) {
      toast.update(initializeLoadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
  } finally {
    // Remove Loading Message
    removeNotification(initializeLoadingId as Id);
  }
};
```

### Create a New Task

- Write the function to `Create a New Task`**

- The `home/index.tsx` file includes the code to create tasks. It allows users to create new tasks.

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
  } catch (error) {
    // Update Loading Message with Error
    if (error instanceof Error) {
      toast.update(createLoadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
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

1. **Creates an Object with Task Details** : It prepares the data needed to create a new task.

2. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to create the new task using the prepared data.

Next, we'll write the **Update an Existing Task** function.

### Update an Existing Task

Write the function for update an existing task.

- Scroll down to find the comment `// step 4 - Update an Existing Task`.

- Replace the existing **`updateTask`** function with this code snippet:

```javascript title="home/index.tsx"
// step 4 - Update an Existing Task
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
  } catch (error) {
    // Update Loading Message with Error
    if (error instanceof Error) {
      toast.update(updateLoadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
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

1. **Creates an Object with Updated Task Details** : It prepares the data needed for the updated task details

2. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to update the existing task using the prepared data.

Next, we'll write the **Update Task Status (completeTask)** function.

### Update the Task Status

Write the Function to update the task status (completeTask).

- Scroll down to find the comment `// step 5- Update Status from Pending to Completed of the Task`.

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
  } catch (error) {
    // Update Loading Message with Error
    if (error instanceof Error) {
      toast.update(completeLoadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
  } finally {
    setUpdateId(null);
    // Remove Loading Message
    removeNotification(completeLoadingId as Id);
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to update the task status by passind the `completed` status as an argument.

Next, we'll write the **Delete the Task** function.

### Delete the Task

Write a function to delete an existing task.

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
  } catch (error) {
    // Update Loading Message with Error
    if (error instanceof Error) {
      toast.update(deleteLoadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
  } finally {
    setDeletingId(null);
    // Remove Loading Message
    removeNotification(deleteLoadingId as Id);
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to delete the existing task by passing status as "removed".

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

1. **Check initialized contract**: It checks whether the smart contract is initialized or not by using `initializeContract` function.

2. **Update Task**: Call the `updateTask` function if updatedId has any value.

3. **Create Task**: Call the `createNewTask` function if updatedId does not have any value.

Here, we have completed functions to **Create Task**, **Update Task** and **Delete Task** and now it's time to write a function to **Fetch Tasks** from the smart contract.

### Fetch All Tasks

- Scroll up to find the comment `// step 8 - Fetch All Tasks`.

- Replace the existing **`getTodoData`** function with this code snippet:

```javascript title="home/index.tsx"
// step 8 - Fetch All Tasks
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

1. **Fetches Task Data:** It calls `ListTasks` to get the list of all ToDo tasks from the ToDo smart contract.
2. **Set Tasks on State:** Get the result data from the smart contract and set an array of all tasks into `todoData` State.

We have prepared necessary function to fetch all the tasks created from a connected user's wallet.

Now that we've written all the necessary frontend functions and components, we're ready to run the ToDo dApp application in the next step.


