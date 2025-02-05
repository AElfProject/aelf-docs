### Configure Portkey Provider & Write Connect Wallet Function

Now, we'll set up our Portkey wallet provider to allow users to connect their Portkey wallets to the dApp and interact with the smart contract. We'll be interacting with the already deployed RoleContract and AllowanceContract for this tutorial.

**Step 1: Locate the File:**

- Go to the `src/hooks/useSmartContract.ts` file.

**Step 2: Fetch the Smart Contract:**

- Find the comment `//Step A - Function to fetch a smart contract based on deployed wallet address`

- Replace the existing **`fetchContract`** function with this updated code:

```javascript title="useSmartContract.ts"
//Step A - Function to fetch a smart contract based on deployed wallet address
const fetchContract = async (address: string) => {
  if (!provider) return null;

  try {
    // 1. get the dAppChain using provider.getChain
    const chain = await provider?.getChain("tDVW");
    if (!chain) throw new Error("No chain");

    // 2. return contract
    return chain?.getContract(address);
  } catch (error) {
    console.log(error, "====error");
    return;
  }
};
```

- Find the comment `// Step B - fetch role-contract`

- Replace the existing **`getRoleContract`** function with this updated code:

```javascript title="useSmartContract.ts"
// Step B - fetch role-contract
const getRoleContract = async () => {
  //Replace with Address of Deployed Role Smart Contract
  const contract = await fetchContract(
    "your_deployed_role_smart_contract_address"
  );
  contract && setRoleContract(contract);
};
```

- Find the comment `// Step C - fetch allowance-contract`

- Replace the existing **`getAllowanceContract`** function with this updated code:

```javascript title="useSmartContract.ts"
// Step C - fetch allowance-contract
const getAllowanceContract = async () => {
  //Replace with Address of Deployed Allowance Smart Contract
  const contract = await fetchContract(
    "your_deployed_allowance_smart_contract_address"
  );
  contract && setAllowanceContract(contract);
};
```

:::tip
ℹ️ Note: You are to replace the address placeholder with your deployed Role and Allowance smart contract address from "Deploy Smart Contract" steps (Step 3 and 5)!

example:
**"your_deployed_role_smart_contract_address"**,
**"your_deployed_allowance_smart_contract_address"**
:::

**Explanation:**

- **`fetchContract`** **Function**: This function fetches a smart contract based on the given chain symbol (e.g., "AELF" or "tDVW") and the contract address.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Chain** : The function fetches chain information using the provider.
  - **Get Contract** : It retrieves the smart contract instance from the chain.

- **`getRoleContract`** **Function**: This function fetches the *role smart contract*.
- **`getAllowanceContract`** **Function**: This function fetches the *allowance smart contract*.

`AELF` represents the mainnet chain and `tDVW` represents the testnet chain respectively on aelf blockchain.

**Step 3. Initialize and Fetch the Smart Contracts:**

- Find the comment `// Step D - Effect hook to initialize and fetch the smart contract when the provider changes`

- Replace the existing **`useEffect`** with this updated code:

```javascript title="useSmartContract.ts"
// Step D - Effect hook to initialize and fetch the smart contract when the provider changes
useEffect(() => {
  getRoleContract();
  getAllowanceContract();
}, [provider]); // Dependency array ensures this runs when the provider changes
```

**Explanation:**

- **`useEffect` Hook** : This hook initializes and fetches the smart contracts when the provider changes.
  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Contracts** : It fetches and sets the smart contracts.

By following these steps, we'll configure the Portkey provider to connect users' wallets to our dApp and interact with the Role and Allowance smart contracts including assigning specific roles and allowance related functionalities. This setup will enable our frontend components to perform actions like `Set Roles` , `Get Roles` , `Set Allowance` , `Get Allowance` and `Spend Allowed Funds`.

### Configure Connect Wallet Function

**Step 1: Locate the File**

- Go to the `src/components/layout/header/index.tsx` file.

**Step 2: Write the Connect Wallet Function**

- The `header/index.tsx` file is the header of our allowance dApp. It allows users to connect their Portkey wallet with the allowance dApp.

- Before users can interact with the smart contract, we need to write the `Connect Wallet` function.

- Find the comment `// Step E - Connect Portkey Wallet`.

- Replace the existing connect function with this code snippet:

```javascript title="header/index.tsx"
// Step E - Connect Portkey Wallet
const connect = async (walletProvider?: IPortkeyProvider) => {
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

### Configure Set Admin Role 

**Step 1: Locate the File**

1. Go to the `src/pages/home/index.tsx` file. This file contains all the functionalities like initialize Contract, SetAdmin, GetAdmin etc.

**Step 2: Prepare Form to set Roles**

1.  Find the comment `// Step F - Configure Role Form`.

2.  Replace the form variable with this code snippet:

```javascript title="home/index.tsx"
// Step F - Configure Role Form
const form = useForm <z.infer <typeof formSchema>>{
  resolver: zodResolver(formSchema),
  defaultValues: {
    address: "",
  },
};
```

#### Here's what the function does:

1. Initializes a new form variable with default values needed to set roles.

2. Field include: `address`.

Now the form is ready for users to fill in the necessary details.

### Initialize Contract & Set Default Admin

- Scroll down to find the comment `// Step G - Initialize Role Contract`.

- Replace the existing **`initializeContract`** function with this code snippet:

```javascript title="home/index.tsx"
// Step G - Initialize Role Contract
const initializeContract = async () => {
  let loadingId;
  try {
    // Start Loading
    loadingId = toast.loading("Contract Initializing InProgress..");
    await roleContract?.callSendMethod(
      "Initialize", // Function Name
      currentWalletAddress as string, // User Wallet Address
      {} // No Arguments
    );
    // Update Loading Message with Success
    toast.update(loadingId, {
      render: `Contract Initialize Successful`,
      type: "success",
      isLoading: false,
    });
    setIsContractInitialize(true);
  } catch (error) {
    if(error instanceof Error){
      // Update Loading Message with Error
      toast.update(loadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
    return "error";
  } finally {
    // Remove Loading Message
    removeNotification(loadingId as Id);
    return;
  }
};
```

### Set Admin Role

- Write the function to **`Set Users Role`**

- Find the comment `// Step H - Set Differentt Users Role`.

- Replace the existing **`setAuthority`** function with this code snippet:

```javascript title="home/index.tsx"
// Step H - Set Differentt Users Role
const setAuthority = async (values: { address: string }, type: string) => {
  let loadingId;
  try {
    // Start Loading
    loadingId = toast.loading("Set Authority InProgress..");
    setFormLoading(true);

    // Prepare Arguments for set Admin
    const sendData = values.address;

    // Call the appropriate smart contract method based on the type (Admin, Parent, or Child)
    await roleContract?.callSendMethod(
      type === ROLE.admin
        ? "SetAdmin"
        : type === ROLE.parent
        ? "SetParent"
        : "SetChild",
      currentWalletAddress as string,
      sendData // Pass the address as the argument
    );

   // Update Loading Message with Success
   toast.update(loadingId, {
     render: `Set ${type} Successful`,
     type: "success",
     isLoading: false,
   });

    // Fetch and update the role data from the contract after successful execution
    getAuthorityData();
    return "success";
  } catch (error) {
    if(error instanceof Error){
      // Update Loading Message with Error
      toast.update(loadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
    return "error";
  } finally {
    // Close Form Modal
    handleCloseModal();

    // Remove Loading Message
    removeNotification(loadingId as Id);
    setFormLoading(false);
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to set admin, parent and child using their respective wallet address.

Next, we'll **Handle the submit form to set the roles** function.

### Submit Set Admin Role

Write the function to handle the submit form to set the users' role.

- Scroll down to find the comment `// Step I - Handle Submit Form`.

- Replace the existing **`onSubmit`** function with this code snippet:

```javascript title="home/index.tsx"
// Step I - Handle Submit Form
const onSubmit = async (values: { address: string }) => {
  // Set form loading state
  setFormLoading(true);
  // Check if the contract is initialized, if not, initialize it
  if (!isContractInitialize) {
    await initializeContract(); // Initialize the smart contract if not already done
  }
  // Call the setAuthority function to set the authority (Admin/Parent/Child) based on the roleType
  await setAuthority(values, roleType); // Pass the form values and role type (Admin/Parent/Child)
};
```

Next, we'll write the **Get Role Details** function.

### Get Role Details

- Write the function to **`Get Roles Details`**

- Find the comment `// Step J - Get Role Details`.

- Replace the existing **`getAuthorityData`** function with this code snippet:

```javascript title="home/index.tsx"
// Step J - Get Role Details
const getAuthorityData = async () => {
  setLoading(true);
  try {
    // Fetch admin, parent, and child roles simultaneously using Promise.all
    const [admin, parent, child] = await Promise.all([
      roleContract?.callViewMethod("GetAdmin", ""),
      roleContract?.callViewMethod("GetParent", ""),
      roleContract?.callViewMethod("GetChild", ""),
    ]);

    // If all roles are successfully fetched
    if (admin && parent && child) {
      // Set the role state with the retrieved admin, parent, and child values
      setRole({
        Admin: admin?.data?.value,
        Parent: parent?.data?.value,
        Child: child?.data?.value,
      });
    }
  } catch (error) {
    // Log any error that occurs during the process
    console.log("error======", error);
  } finally {
    // Stop the loading indicator, whether or not the request was successful
    setLoading(false);
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Methods** : It interacts with the blockchain smart contract to get the addressess of the admin, parent and child roles respectively. Once the wallet addresses based on the roles are present, FE will display different components for each user role, like Admin, Parent, and Child. Each role has specific actions they can perform:

- **Admin Role** : The *admin* can assign roles to both parent and child.
- **Parent Role** : The *parent* can assign the child role and set an allowance for the child.
- **Child Role** : The *child* can spend money, but only up to the allowance set by the parent.

Now that we've finished integrating the functionality of the RoleContract, let's move on to the functions of the AllowanceContract.

### Configure Set Allowance by Parent

**Step 1: Locate the File**

- Go to the `src/components/parent/index.tsx` file. This file contains functionalities like initialize contract, set allowance and get allowance.

**Step 2: Configure form**

Write the Function of configure the set allowance form.

- Find the comment `// Step K - Configure Set Allowance Form`.

- Replace the existing code snippet:

```javascript title="parent/index.tsx"
// Step K - Configure Set Allowance Form
const form = useForm <z.infer <typeof formSchema>>{
  resolver: zodResolver(formSchema),
  defaultValues: {
    amount: "",
  },
};
```

### Check Contract Initialize Status

Write the Function to check contract initialization status of the **AllowanceContract**.

- Scroll down to find the comment `// step L - Check if Allowance Contract is initialized or not`.

- Replace the existing **`checkIsContractInitialized`** function with this code snippet:

```javascript title="parent/index.tsx"
// step L - Check if Allowance Contract is initialized or not
const checkIsContractInitialized = async () => {
  try {
    const result = await allowanceContract?.callViewMethod("IfInitialized", ""); // Call the IfInitialized method which is present on Smart Contract
    if (result?.data) {
      setIsContractInitialize(true);
    }
  } catch (error) {
    console.log("error", error);
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Methods** : It interacts with the allowance contract to get the initialization status of the allowance contract.

### Initialize Allowance Contract

Write the function to initialize the **AllowanceContract**.

- Scroll down to find the comment `// Step M - Initialize Allowance Contract`.

- Replace the existing **`initializeContract`** function with this code snippet:

```javascript title="parent/index.tsx"
// Step M - Initialize Allowance Contract
const initializeContract = async () => {
  let loadingId;
  try {
    // Start Loading
    loadingId = toast.loading("Contract Initializing InProgress..");
    await allowanceContract?.callSendMethod(
      "Initialize", // Function Name
      currentWalletAddress as string, // User Wallet Address
      {} // No Arguments
    );

    // Update Loading Message with Success
    toast.update(loadingId, {
      render: `Contract Initialize Successful`,
      type: "success",
      isLoading: false,
    });
    setIsContractInitialize(true);
  } catch (error) {
    if(error instanceof Error){
      // Update Loading Message with Error
      toast.update(loadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
    return "error";
  } finally {
    // Remove Loading Message
    removeNotification(loadingId as Id);
    return;
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Methods** : It call the Initialize of the allowance contract.

Now that we've finished the initialize contract functionality. Let's move on to the *set allowance* functionality.

### Set Allowance

Write the function for set the allowance value for child by the parent.

- Scroll down to find the comment `// step N - Set AllowanceValue`.

- Replace the existing **`initializeContract`** function with this code snippet:

```javascript title="parent/index.tsx"
// step N - Set AllowanceValue
const setAllowance = async (value: { amount: string }) => {
  setFormLoading(true);
  let loadingId;
  try {
    // Start Loading
    loadingId = toast.loading("SetAllowance InProgress..");
    await allowanceContract?.callSendMethod(
      "SetAllowance", // Function Name
      currentWalletAddress as string, // User Wallet Address
      { value: value.amount } // Allowance Amount
    );

    // fetch updated allowance value
    getAllowance();

    // Update Loading Message with Success
    toast.update(loadingId, {
      render: `SetAllowance Successful`,
      type: "success",
      isLoading: false,
    });
  } catch (error) {
    if(error instanceof Error){
      // Update Loading Message with Error
      toast.update(loadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
    return "error";
  } finally {
    // Close Form Modal
    handleCloseModal();
    // Remove Loading Message
    removeNotification(loadingId as Id);
    setFormLoading(false);
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Methods** : It call the initialization method of the allowance contract.

Let's handle the submit form for set allowance.

### Submit Set Allowance Form (Parent)

Write the function to handle the set allowance form.

- Scroll down to find the comment `// Step O - Handle Set Allowance Submit Form`.

- Replace the existing **`onSubmit`** function with this code snippet:

```javascript title="parent/index.tsx"
// Step O - Handle Set Allowance Submit Form
const onSubmit = async (value: { amount: string }) => {
  if (!isContractInitialize) {
    await initializeContract();
  }
  setAllowance(value);
};
```

As we have completed the step of setting allowance value, now it's time to get that allowance value form the contract.

### Get Allowance Value

Write the function for get the allowance value.

- Scroll down to find the comment `// step P - Get AllowanceValue`.

- Replace the existing **`getAllowance`** function with this code snippet:

```javascript title="parent/index.tsx"
// step P - Get AllowanceValue
const getAllowance = async () => {
  try {
    // Call the smart contract method "GetAllowance" for the child role
    const result = await allowanceContract?.callViewMethod(
      "GetAllowance",
      role.Child
    );

    // If the result contains a valid allowance value, set it in the state
    if (result?.data?.value) {
      setAllowanceValue(result?.data?.value);
    } else {
      // If no valid allowance is returned, set the allowance value to null
      setAllowanceValue(null);
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.log("error", error);
  }
};
```

At this point, we have completed all the functionalities for the parent role and now it's time to prepare functionalities for the child role.

### Configure Spend Allowance Form

**Step 1: Locate the File**

1. Go to the `src/components/child/index.tsx` file. This file contains functionalities like spend allowance and get allowance value.

**Step 2: Prepare Form for Spend Allowance**

1.  Find the comment `// Step Q - Configure Spend Allowance Form`.

2.  Replace the form variable with this code snippet:

```javascript title="child/index.tsx"
// Step Q - Configure Spend Allowance Form
const form =useForm <z.infer <typeof formSchema>>{
  resolver: zodResolver(formSchema),
  defaultValues: {
    amount: "0",
  },
};
```

### Get Allowance Value (Child)

Write the function for get the allowance value.

- Scroll down to find the comment `// step R - Get AllowanceValue`.

- Replace the existing **`getAllowance`** function with this code snippet:

```javascript title="child/index.tsx"
// step R - Get AllowanceValue
const getAllowance = async () => {
  try {
    // Call the smart contract method "GetAllowance" for the child role
    const result = await allowanceContract?.callViewMethod(
      "GetAllowance",
      currentWalletAddress
    );

    // If the result contains a valid allowance value, set it in the state
    if (result?.data?.value) {
      setAllowanceValue(result?.data?.value);
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.log("error", error);
  }
};
```

### Spend Funds

Write the function to spend the funds by the child.

- Scroll down to find the comment `// step S - Spend Allowance`.

- Replace the existing **`spendFunds`** function with this code snippet:

```javascript title="child/index.tsx"
// step S - Spend Funds
const spendFunds = async (value: { amount: string }) => {
  if(value.amount === "0"){
    return
  }

  let loadingId;
  try {
    if (Number(allowanceValue) < Number(value.amount)) {
      toast.info("Amount should be less then or equal to Allowance value");
      return;
    }

  setFormLoading(true);

    // Start Loading
    loadingId = toast.loading("Spending Funds InProgress..");
    await allowanceContract?.callSendMethod(
      "useFunds", // Function Name
      currentWalletAddress as string, // User Wallet Address
      { value: value.amount } // Allowance Amount
    );

    form.reset();
    getAllowance();

    // Update Loading Message with Success
    toast.update(loadingId, {
      render: `Funds Spent Successful`,
      type: "success",
      isLoading: false,
    });
  } catch (error) {
    if(error instanceof Error){
      // Update Loading Message with Error
      toast.update(loadingId as Id, {
        render: error.message,
        type: "error",
        isLoading: false,
      });
    }
    return "error";
  } finally {
    // Remove Loading Message
    removeNotification(loadingId as Id);
    setFormLoading(false);
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Methods** : It calls the useFunds smart contract method to spend the allowance value.

Let's handle the submit form to spend allowance.

### Submit Spend Funds Form (Child)

Write the function for handle the spend Funds form.

- Scroll down to find the comment `// Step T - Handle Spend Funds Submit Form`.

- Replace the existing **`onSubmit`** function with this code snippet:

```javascript title="child/index.tsx"
// Step T - Handle Spend Funds Submit Form
const onSubmit = (values: { amount: string }) => {
  spendFunds(values);
};
```

Now that we've written all the necessary frontend functions and components, we're ready to run the Allowance dApp application in the next step.
