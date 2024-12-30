### Configure Portkey Provider & Write Connect Wallet Function

Now, we'll set up our Portkey wallet provider to allow users to connect their Portkey wallets to the dApp and interact with the smart contract. We'll be interacting with the already deployed Expense Tracker smart contract for this tutorial.

**Step 1. Locate the File:**

- Go to the `src/hooks/useExpenseTrackerSmartContract.ts` file.

**Step 2. Fetch the Smart Contract:**

- Find the comment ` //Step A - Function to fetch a smart contract based on deployed wallet address`

- Replace the existing **`fetchContract`** function with this updated code:

```javascript title="useExpenseTrackerSmartContract.ts"
//Step A - Function to fetch a smart contract based on deployed wallet address
const fetchContract = async () => {
  if (!provider) return null;

  try {
    // 1. get the aelf dAppChain using provider.getChain
    const chain = await provider?.getChain("tDVW");
    if (!chain) throw new Error("No chain");

    //Address of Expense Tracker Smart Contract
    //Replace with Address of Deployed Smart Contract
    const address = "your_deployed_expense_tracker_contract_address";

    // 2. get the Expense Tracker contract
    const contract = chain?.getContract(address);
    setSmartContract(contract);
  } catch (error) {
    console.log(error, "====error");
  }
};
```

:::tip
ℹ️ Note: You are to replace the address placeholder with your deployed Expense Tracker smart contract address from "Deploy Smart Contract" step!

example: Replace with Address of Deployed Smart Contract  
const address = "your_deployed_expense_tracker_contract_address";
:::

**Explanation:**

- **`fetchContract`** **Function**: This function fetches a smart contract based on the given chain symbol (e.g., "AELF" or "tDVW") and the contract address.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Chain** : The function fetches chain information using the provider.
  - **Get Contract** : It retrieves the smart contract instance from the chain.

`AELF` represents the mainnet chain and `tDVW` represents the testnet chain respectively on the aelf blockchain.

**Step 3. Initialize and Fetch the Smart Contracts:**

- Find the comment `// Step B - Effect hook to initialize and fetch the smart contract when the provider changes.`

- Replace the existing **`useEffect`** hook with this updated code:

```javascript title="useSmartContract.ts"
// Step B -  Effect hook to initialize and fetch the smart contract when the provider changes
useEffect(() => {
  fetchContract();
}, [provider]); // Dependency array ensures this runs when the provider changes
```

**Explanation:**

- **`useEffect` Hook** : This hook initializes and fetches the smart contracts when the provider changes.
  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Contracts** : It fetches and sets the smart contracts.

By following these steps, we'll configure the Portkey provider to connect users' wallets to our app and interact with the Expense Tracker smart contract which includes the tracking and management of expenses functionalities. This setup will enable our frontend components to perform actions like **`addNewExpense`** , **`updateExpense`** , **`deleteExpense`** and **`getExpenseData`** etc.

### Configure Connect Wallet Function

**Step 1: Locate the File**

- Go to the `src/components/layout/header/index.tsx` file.

**Step 2: Write the Connect Wallet Function**

- The `header/index.tsx` file is the header of our Expense Tracker dApp. It allows users to connect their Portkey wallet with the Expense Tracker dApp.

- Before users can interact with the smart contract, we need to write the `Connect Wallet` function.

- Find the comment `// Step C - Connect Portkey Wallet`.

- Replace the existing **`connect`** function with this code snippet:

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

In this code, we fetch the Portkey wallet account using the provider and update the wallet address state variable. An alert notifies the user that their wallet is successfully connected.

With the connect wallet function defined, we're ready to write the remaining functions in the next steps.

### Configure Create Expense Form

**Step 1: Locate the File**

- Go to the `src/pages/home/index.tsx` file. This file contains all the functionalities like show user's Expense, AddExpense, UpdateExpense, DeleteExpense, etc.

**Step 2: Prepare Form to Add and Update Expenses**

- Find the comment `// Step D - Configure Expense Form`.

- Replace the form variable with this code snippet:

```javascript title="home/index.tsx"
// Step D - Configure Expense Form
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    description: "",
    amount: "",
  },
});
```

#### Here's what the function does:

1. Initializes a new form variable with default values needed to add a new expense.

2. Fields include: `description` and `amount`.

Now the form is ready for users to fill in the necessary details.

### Check Contract Initialization

**Step 1: Locate the File**

- Go to the `src/pages/home/index.tsx` file. This file contains all the functionalities like **`checkIsContractInitialized`** , **`initializeContract`** , **`addNewExpense`** , **`updateExpense`** , **`deleteExpense`** and **`getExpenseData`**.

**Step 2: Prepare a Function to Check Whether the Contract is Initialized or not**

- Scroll down to find the comment `// step 1 - Check If Contract is Initialized or not `.

- Replace the existing **`checkIsContractInitialized`** function with this code snippet:

```javascript title="home/index.tsx"
// step 1 - Check If Contract is Initialized or not
const checkIsContractInitialized = async () => {
  const result = await smartContract?.callViewMethod("GetInitialStatus", ""); // Call the GetInitialStatus method which is present on Smart Contract
  setIsContractInitialized(result?.data?.value); // Expect value True if it's Initialized otherwise NULL if it's not
};
```

### Initialize Contract

- Scroll down to find the comment `// step 2 - Initialize the smart contract`.

- Replace the existing **`checkIsContractInitialized`** function with this code snippet:

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

    return;
  } catch (error) {
    if (error instanceof Error) {
      // Update Loading Message with Error
      toast.update(initializeLoadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
    return;
  } finally {
    // Remove Loading Message
    removeNotification(initializeLoadingId as Id);
  }
};
```

### Add New Expense

- Write the function to add a new expense.

- Find the comment `// step 3 - Add a New Expense using Smart Contract`.

- Replace the existing **`addNewExpense`** function with this code snippet:

```javascript title="home/index.tsx"
// step 3 - Add a New Expense using Smart Contract
const addNewExpense = async (values: {
  description: string;
  amount: string;
}) => {
  let addLoadingId;
  try {
    // Start Loading
    addLoadingId = toast.loading("Adding a New Expense..");
    setFormLoading(true);

    // Prepare Arguments for Create a New Expense
    const sendData = {
      description: values.description,
      amount: values.amount,
      category: selectedCategory?.value,
      currency: "USD",
    };

    // Call AddExpense Function of Smart Contract
    await smartContract?.callSendMethod(
      "AddExpense",
      currentWalletAddress as string,
      sendData
    );

    // Update Loading Message with Success
    toast.update(addLoadingId, {
      render: "New Expense Successfully Adding",
      type: "success",
      isLoading: false,
    });

    // Get New Data from Contract
    getExpenseData();
  } catch (error) {
    if (error instanceof Error) {
      // Update Loading Message with Error
      toast.update(addLoadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
  } finally {
    // Close Form Modal
    handleCloseModal();
    // Remove Loading Message
    removeNotification(addLoadingId as Id);
    setFormLoading(false);
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the aelf blockchain's smart contract to add a new Expense using `AddExpense` Function.

Next, we'll write the **Update Expense** function.

### Update Expense

Write the function to update a selected expense.

- Scroll down to find the comment `// step 4 - Update the Expense`.

- Replace the existing **`updateExpense`** function with this code snippet:

```javascript title="home/index.tsx"
// step 4 - Update the Expense
const updateExpense = async (values: {
  description: string;
  amount: string;
}) => {
  let updateLoadingId;
  try {
    // Start Loading
    updateLoadingId = toast.loading("Updating a Expense..");
    setFormLoading(true);

    // Prepare Arguments for Update the Expense
    const sendData = {
      expenseId: updateId,
      description: values.description,
      amount: values.amount,
      category: selectedCategory?.value,
      currency: "USD",
    };

    // Call UpdateExpense Function of Smart Contract
    await smartContract?.callSendMethod(
      "UpdateExpense",
      currentWalletAddress as string,
      sendData
    );

    // Update Loading Message with Success
    toast.update(updateLoadingId, {
      render: "Expense Successfully Updated",
      type: "success",
      isLoading: false,
    });

    // Get New Data from Contract
    getExpenseData();
  } catch (error) {
    if (error instanceof Error) {
      // Update Loading Message with Error
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

1. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to Update the existing expense using `UpdateExpense` function.

2. **Get New Data from Contract** : It calls the `getExpenseData` function to get updated data from the smart contract.

Next, we'll write the **Delete Expense** function.

### Delete Expense

Write the Function to delete an existing expense.

- Scroll down to find the comment `// step 5 - Delete the Expense`.

- Replace the existing **`deleteExpense`** function with the following code snippet:

```javascript title="home/index.tsx"
// step 5 - Delete the Expense
const deleteExpense = async (data: IExpenseObject) => {
  let deleteLoadingId;
  try {
    // Start Loading
    deleteLoadingId = toast.loading("Removing a Expense..");
    setDeletingId(data.expenseId); // set Deleting Id for Loading on Button

    // Call DeleteExpense Function of Smart Contract for Delete the Expense
    await smartContract?.callSendMethod(
      "DeleteExpense",
      currentWalletAddress as string,
      { value: data.expenseId }
    );

    // Update Loading Message with Success
    toast.update(deleteLoadingId, {
      render: "Expense Successfully Removed",
      type: "success",
      isLoading: false,
    });

    // Get New Data from Contract
    await getExpenseData();
  } catch (error) {
    if (error instanceof Error) {
      // Update Loading Message with Error
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

1. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to delete an existing expense using the `DeleteExpense` function.

2. **Get New Data from Contract** : It calls the `getExpenseData` function to get updated data from the smart contract.

Next, we'll write the **Handle Submit Form** function.

### Handle Submit Form

Write a function to make the move.

- Scroll down to find the comment `// step 6 - Handle Submit Form`.

- Replace the existing **`onSubmit`** function with this code snippet:

```javascript title="home/index.tsx"
// step 6 - Handle Submit Form
const onSubmit = async (values: { description: string, amount: string }) => {
  // Check Whether Contract Initialized or not
  if (isContractInitialized !== true) {
    await initializeContract(); // initialize the contract if it's not initialized before
  }

  // Check Whether Form is for Create or Update the Expense
  if (!!updateId) {
    await updateExpense(values); // Call updateExpense for Update the Expense
  } else {
    await addNewExpense(values); // Call updateExpense for Create a new Expense
  }
};
```

#### What This Function Does:

1. **Check initialized contract**: It checks whether the smart contract is initialized or not by using `initializeContract` function.

2. **Update Expense**: Call the `updateExpense` function if updatedId has any value.

3. **Add Expense**: Call the `addNewExpense` function if updatedId does not have any value.

Here, we have completed functions to **Add Expense**, **Update Expense** and **Delete Expense** and now it's time to write a function to **Fetch Expense** from the smart contract.

### Fetch All Expenses

- Scroll up to find the comment `// step 7 - Fetch All Expenses`.

- Replace the existing **`getExpenseData`** function with this code snippet:

```javascript title="home/index.tsx"
// step 7 - Fetch All Expenses
const getExpenseData = async () => {
  try {
    const result = await smartContract?.callViewMethod("ListExpenses", {
      value: currentWalletAddress,
    });
    console.log("result", result?.data);
    setExpenseData(result?.data ? result?.data.expenses : []);
  } catch (error) {
    console.log("error======", error);
  } finally {
    setLoading(false);
  }
};
```
#### Here's what the function does:

1. **Fetches Expense Data:** It calls `ListExpenses` to get the list of all expenses from the Expense Tracker smart contract.
2. **Set Expense on State:** Get the result data from the smart contract and set an array of all expenses into `expenseData` State.

We have prepared necessary function to fetch all the expenses created from a connected user's wallet.

Now that we've written all the necessary frontend functions and components, we're ready to run the Expense Tracker dApp application in the next step.
