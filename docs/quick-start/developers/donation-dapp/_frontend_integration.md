### Fetch smart contracts and token balance

Let's create common function for fetch smartcontract using `provider` and `contract address`.

**Step 1 : Locate the File:**

- Go to the `src/lib/contract.ts` file.

**Step 2 : Prepare fetch smart contract function:**

- Find the comment `// Step 1 - Function to fetch a smart contract based on address`

- Replace the existing **`fetchContract`** function with this updated code:

```ts title="contract.ts"
// Step 1 - Function to fetch a smart contract based on address
export const fetchContract = async (
  provider: IPortkeyProvider | null,
  address: string
) => {
  if (!provider) return null;

  try {
    // get the dAppChain tDVW using provider.getChain
    const chain = await provider?.getChain("tDVW");
    if (!chain) throw new Error("No chain");

    // get the smart contract
    const contract = chain?.getContract(address);

    return contract;
  } catch (error) {
    console.log(error, "====error");
    return
  }
};
```

**Explanation**

The `fetchContract` function retrieves a smart contract instance using a blockchain provider and a specific address. Here's a breakdown:

1. **Provider Check**: Ensures a valid provider is available; otherwise, returns null.
2. **Fetch Chain**: Uses provider.getChain("tDVW") to get chain details for the testnet (or other specified chain). Throws an error if the chain is unavailable.
3. **Get Contract**: Retrieves the contract instance using chain.getContract(address) with the given address.
4. **Error Handling**: Logs errors and safely exits if any issue arises.

Next, we’ll fetch the donation smart contract to enable interaction with it from the frontend, as well as the token contract to access details about the user’s ELF tokens.

**Step 3 : Fetch Donation contract**

- Go to the `src/hooks/useDonationSmartContract.ts` file.

- Find the comment `// Step 3 - Replace with Address of Deployed Smart Contract`

- Replace the your donation contract address with this value : `your_deployed_donation_smart_contract_address`

- Find the comment `// Step 4 - Function to fetch a smart contract based on deployed contract address`

- Replace the existing **fetchDonationContract** function with this updated code:

```ts title="useDonationSmartContract.ts"
// Step 4 - Function to fetch a smart contract based on deployed contract address
const fetchDonationContract = async () => {
  const contract = await fetchContract(provider, donationContractAddress);
  contract && setSmartContract(contract);
};
```

- Find the comment `// Step 5 - Effect hook to initialize and fetch the smart contract when the provider changes`

- Replace the existing **useEffect** hook with this updated code:

```ts title="useDonationSmartContract.ts"
// Step 5 - Effect hook to initialize and fetch the smart contract when the provider changes
useEffect(() => {
  fetchDonationContract();
}, [provider]); // Dependency array ensures this runs when the provider changes
```

**Step 4 : Fetch Token contract**

- Go to the `src/hooks/useTokenContract.ts` file.

- Find the comment `// Step 6 - Function to fetch the ELF token contract on dApp chain`

- Replace the existing **fetchTokenContract** function with this updated code:

```ts title="useTokenContract.ts"
// Step 6 - Function to fetch the ELF token contract on dApp chain
const fetchTokenContract = async () => {
  // token address of dApp chain
  const contract = await fetchContract(
    provider,
    "ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx"
  );
  contract && setTokenContract(contract);
};
```

- Find the comment `// Step 7 -  Effect hook to initialize and fetch the smart contract when the provider changes`

- Replace the existing **useEffect** hook with this updated code:

```ts title="useTokenContract.ts"
// Step 7 -  Effect hook to initialize and fetch the smart contract when the provider changes
useEffect(() => {
 fetchTokenContract();
}, [provider]); // Dependency array ensures this runs when the provider changes
```

**Step 5 : Get Token Balance**

- Go to the `src/hooks/userBalance.ts` file.

- Find the comment `// Step 8 -  Function to get ELF token balance`

- Replace the existing **getTokenBalance** function with this updated code:

```ts title="useTokenContract.ts"
// Step 8 -  Function to get ELF token balance
const getTokenBalance = async () => {
  if (!tokencontract || !currentWalletAddress) return;

  try {
    setLoading(true);
    const { data } = await tokencontract.callViewMethod("GetBalance", {
      symbol: "ELF",
      owner: currentWalletAddress,
    });
    data?.balance && setBalance(convertTokenToAmount(data.balance));
  } catch (error) {
    console.log("==== balance fetch error", error);
  } finally {
    setLoading(false);
  }
};
```

- Find the comment `// Step 9 -  Effect hook to fetch the token balance when tokencontract and currentWalletAddress change`

- Replace the existing **useEffect** hook with this updated code:

```ts title="useTokenContract.ts"
// Step 9 -  Effect hook to fetch the token balance when tokencontract and currentWalletAddress change
useEffect(() => {
  getTokenBalance();
}, [tokencontract, currentWalletAddress]);
```

Now, we have completed step with fetch smart contracts and token balance.

### Configure Connect Wallet Function

**Step 1 : Locate the File**

- Go to the `src/components/layout/header/index.tsx` file.

**Step 2 : Write the Connect Wallet Function**

- The `header/index.tsx` file is the header of our Donation dApp. It allows users to connect their Portkey wallet with the Donation dApp.

- Before users can interact with the smart contract, we need to write the `Connect Wallet` function.

- Find the comment `// Step 10 - Connect Portkey Wallet`.

- Replace the existing **connect** function with this code snippet:

```ts title="header/index.tsx"
// Step 10 - Connect Portkey Wallet
const connect = async (walletProvider?: IPortkeyProvider) => {
  const accounts = await (walletProvider
    ? walletProvider
    : provider
  )?.request({
    method: MethodsBase.REQUEST_ACCOUNTS,
  });
  const account = accounts?.AELF && accounts?.AELF[0];
  if (account) {
    setCurrentWalletAddress(
      account.replace(/^ELF_/, "").replace(/_AELF$/, "")
    );
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


### Configure Create and Edit Campaign Form 

**Step 1 : Locate the File**

- Go to the `src/pages/create-campaign/index.tsx` file. 

**Step 2 : Prepare Form to Create and Edit Campaign**

- Find the comment `// Step 11 - Configure campaign form`.

- Replace the form variable with this code snippet:

```ts title="header/index.tsx"
// Step 11 - Configure campaign form
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    title: "",
    description: "",
    selectedCategory: undefined,
    goal: 0,
    endDate: "",
  },
});
```

#### Here's what the function does:

1. Initializes a new form variable with default values needed to create or edit campaign.

2. Fields include: `title`, `description`, `selectedCategory`, `goal` and `endDate`.

Now the form is ready for users to fill in the necessary details.

### Check Contract Initialization

- Scroll down to find the comment `// step 12 - Check if the smart contract is initialized`.

- Replace the existing **`checkIsContractInitialized`** function with this code snippet:
 
```ts title="create-campaign/index.tsx"
// step 12 - Check if the smart contract is initialized
const checkIsContractInitialized = async () => {
  const result = await smartContract?.callViewMethod(
    "IsContractInitialized",
    ""
  );
  IsContractInitialized(result?.data?.value);
};
```

### Initialize Contract

- Scroll down to find the comment `// step 13 - Initialize the smart contract if not already initialized`.

- Replace the existing **`initializeContract`** function with this code snippet:

```ts title="create-campaign/index.tsx"
// step 13 - Initialize the smart contract if not already initialized
const initializeContract = async () => {
  return await smartContract?.callSendMethod("Initialize", "");
};
```

### Create a New Campaign

- Write the function to **`Create a New Campaign`**

- The `create-campaign/index.tsx` file includes the code to create campaigns. It allows users to create new campaign.

- Find the comment `// step 14 - Function to create a new campaign`.

- Replace the existing **`createCampaign`** function with this code snippet:

```ts title="create-campaign/index.tsx"
// step 14 - Function to create a new campaign
const createCampaign = async (values: z.infer<typeof formSchema>) => {
  let createLoading: Id;
  createLoading = toast.loading("Creating Campaign...");
  setFormLoading(true);

try {
  // Initialize contract if required
  if (!isContractInitialized) {
    await initializeContract();
  }

  // Prepare data for creating the campaign
  const campaignData = {
    title: values.title,
    description: values.description,
    imageUrl: values.imageUrl,
    type: values.selectedCategory.value,
    goalAmount: convertAmountToToken(values.goal),
    duration:
      new Date(values.endDate).getTime() / 1000 -
      Number((new Date().getTime() / 1000).toFixed(0)),
  };

  // Call smart contract method to create the campaign
  await smartContract?.callSendMethod(
    "CreateCampaign",
    currentWalletAddress as string,
    campaignData
  );

    // Show success notification
    toast.update(createLoading, {
      render: "Campaign Created successfully",
      type: "success",
      isLoading: false,
    });
    removeNotification(createLoading);
    navigate("/"); // Redirect to home page
  } catch (error) {
    handleError(createLoading, error); // Handle any errors
  } finally {
    setFormLoading(false);
  }
};
```

#### What This Function Does:

1. **Creates an Object with Campaign Details** : It prepares the data needed to create a new campaign.

2. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to create the new campaign using the prepared data.

Next, we'll write the **Edit an Existing Campaign** function.

### Edit an Existing Campaign

Write the function for update an existing campaign.

- Scroll down to find the comment `// step 15 - Function to edit an existing campaign`.

- Replace the existing **`editCampaign`** function with this code snippet:

```ts title="create-campaign/index.tsx"
// step 15 - Function to edit an existing campaign
const editCampaign = async (values: z.infer<typeof formSchema>) => {
  let createLoading: Id;
  createLoading = toast.loading("Updating Campaign...");
  setFormLoading(true);

  try {
    // Prepare data for editing the campaign
    const campaignData = {
      campaignId: editCampaignId,
      newTitle: values.title,
      newDescription: values.description,
      newImageUrl: values.imageUrl,
      newType: values.selectedCategory.value,
      newGoalAmount: convertAmountToToken(values.goal),
      newIsActive: true,
    };

    // Call smart contract method to edit the campaign
    await smartContract?.callSendMethod(
      "EditCampaign",
      currentWalletAddress as string,
      campaignData
    );

    // Show success notification
    toast.update(createLoading, {
      render: "Campaign Updated successfully",
      type: "success",
      isLoading: false,
    });
    removeNotification(createLoading);
    navigate("/"); // Redirect to home page
  } catch (error) {
    handleError(createLoading, error); // Handle any errors
  } finally {
    setFormLoading(false);
  }
};
```

#### What This Function Does:

1. **Creates an Object with Updated Capmaign Details** : It prepares the data needed for the updated capmaign details

2. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to update the existing capmaign using the prepared data.

- Scroll down to find the comment `// step 16 - Handle form submission for creating/editing a campaign`.

- Replace the existing **`onSubmit`** function with this code snippet:

```ts title="create-campaign/index.tsx"
// step 16 - Handle form submission for creating/editing a campaign
const onSubmit = (values: z.infer<typeof formSchema>) => {
  if (editCampaignId) {
    editCampaign(values);
  } else {
    createCampaign(values);
  }
};
```

- Scroll down to find the comment `// step 17 - Set form data for editing an existing campaign`.

- Replace the existing **`setEditFormData`** function with this code snippet:

```ts title="create-campaign/index.tsx"
// step 17 - Set form data for editing an existing campaign
const setEditFormData = async () => {
  try {
    const data = await smartContract?.callViewMethod("GetCampaign", {
      value: editCampaignId,
    });

    // Populate form fields with existing data
    const type = CATEGORY_OPTIONS.find(
      ({ value }) => data?.data?.type === value
    );
    form.setValue("title", data?.data?.title);
    form.setValue("description", data?.data?.description);
    type && form.setValue("selectedCategory", type);
    form.setValue("goal", convertTokenToAmount(data?.data?.goalAmount));
    form.setValue("endDate", data?.data?.endTime);
    form.setValue("imageUrl", data?.data?.imageUrl);
  } catch (error) {
    console.log("error in set edit form data", error); // Log any errors
  }
};
```

### Fetch Campaign Data

**Step 1 : Locate the File**

- Go to the `src/pages/home/index.tsx` file. 

**Step 2 : Fetch Campaign Data**

- Find the comment `// step 18 - Fetch campaign data from the smart contract`.

- Replace the existing **`getCampaignData`** function with this code snippet:

```ts title="home/index.tsx"
// step 18 - Fetch campaign data from the smart contract
const getCampaignData = async () => {
  try {
    const data = await smartContract?.callViewMethod("GetCampaignsData", "");
    if (data?.data?.value) {
      setCampaignData(data.data.value.reverse());
    }
  } catch {
  } finally {
    setLoading(false);
  }
};
```

### Search Campaign Data

- Scroll down to find the comment `// step 19 - Filter campaigns based on selected filter and search value`.

- Replace the existing **`filterCampaignsData`** variable with this code snippet:

```ts title="home/index.tsx"
// step 19 - Filter campaigns based on selected filter and search value
const filterCampaignsData = useMemo(() => {
  let data: DonationCampaign[] = [];

  if (campaignData && campaignData.length > 0) {
    if (selectedFilter) {
      // Filter campaigns by category
      data = campaignData.filter(({ type }) => selectedFilter === type);
    } else {
      data = campaignData;
    }

    if (searchValue) {
      // Filter campaigns by search value in title or category
      data = data.filter(
        ({ type, title }) =>
          type.toLowerCase().includes(searchValue.toLowerCase()) ||
          title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }
  return data;
}, [campaignData, selectedFilter, searchValue]);
```

### Get Campaign Details

**Step 1 : Locate the File**

- Go to the `src/pages/campaign-details/index.tsx` file. 

**Step 2 : Fetch Campaign Details**

- Find the comment `// step 20 - Fetch campaign details from the smart contract`.

- Replace the existing **`getCampaignDetails`** function with this code snippet:

```ts title="campaign-details/index.tsx"
// step 20 - Fetch campaign details from the smart contract
const getCampaignDetails = async () => {
  try {
    const data = await smartContract?.callViewMethod("GetCampaign", {
      value: id,
    });
    if (data?.data) {
      setCampaignDetails(data.data); // Set campaign details on success
    }
  } catch (error) {
    console.error("Error fetching campaign details:", error);
  } finally {
    setLoading(false); // Stop loading spinner after the operation
  }
};
```

### Donate Funds

Let's prepare the functions for donate funds in active campaign.

#### Check Allowance

- Scroll down to find the comment `// step 21 - Check if the user's wallet has sufficient allowance to spend tokens`.

- Replace the existing **`checkAllowance`** function with this code snippet:

```ts title="campaign-details/index.tsx"
// step 21 - Check if the user's wallet has sufficient allowance to spend tokens
const checkAllowance = async () => {
  const data = await tokenContract?.callViewMethod("GetAllowance", {
    symbol: "ELF",
    owner: currentWalletAddress,
    spender: donationContractAddress,
  });
  return data?.data?.allowance || 0; // Return allowance or 0 if unavailable
};
```

#### Donate funds to campaign

- Scroll down to find the comment `// step 22 - Function to donate funds`.

- Replace the existing **`donateFunds`** function with this code snippet:

```ts title="campaign-details/index.tsx"
// step 22 - Function to donate funds
const donateFunds = async (amount: number) => {
  let donationLoading: Id;
  donationLoading = toast.loading("Donation In Progress..."); // Show loading toast
  setFormLoading(true); // Show form loader
  try {
    const allowance = await checkAllowance(); // Check current allowance
    if (convertTokenToAmount(Number(allowance)) < amount) {
      // Approve tokens if allowance is insufficient
      await tokenContract?.callSendMethod(
        "Approve",
        currentWalletAddress as string,
        {
          spender: donationContractAddress,
          symbol: "ELF",
          amount: setDefaultAllowance,
        }
      );
    }
    // Donate the specified amount
    await smartContract?.callSendMethod(
      "Donate",
      currentWalletAddress as string,
      {
        campaignId: id,
        amount: convertAmountToToken(amount),
      }
    );
    // Show success toast and refresh campaign details
    toast.update(donationLoading, {
      render: "Your funds successfully donated. Thank you for your generosity!",
      type: "success",
      isLoading: false,
    });
    removeNotification(donationLoading);
    getCampaignDetails(); // Refresh the campaign details after donation
  } catch (error) {
    handleError(donationLoading, error); // Handle errors and show feedback
    console.error("Donation error:", error);
    return "error";
  } finally {
    setFormLoading(false); // Hide form loader
  }
};
```

**Explanation**

The `donateFunds` function handles the process of donating ELF tokens to a specific campaign, ensuring proper approval and user feedback. Here's a step-by-step breakdown:

**1. Display Loading Indicators:**

  - Shows a loading toast message ("Donation In Progress...") to inform the user that the process has started.
  - Activates a loading state for the donation form to prevent duplicate actions.

**2. Check Token Allowance:**

  - Calls the checkAllowance function to verify if the user has sufficient approval to transfer the specified amount of tokens.
  - If the allowance is less than the donation amount, the function approves a default token allowance using the Approve method of the token contract.

**3. Donate Tokens:**

  - Calls the Donate method of the smart contract to transfer the specified amount of ELF tokens to the campaign.

**4. Success Handling:**

  - Updates the loading toast to a success message, thanking the user for their donation.
  - Refreshes the campaign details to reflect the updated donation status.

**5. Error Handling:**

  - If an error occurs during the process, it is logged, and an error toast is displayed to inform the user.

**6. Final Cleanup:**

  - Ensures the form loading state is disabled, regardless of success or failure.


### User Profile Details

**Step 1 : Locate the File**

- Go to the `src/pages/user-profile/index.tsx` file. 

**Step 2 : Get User Data**

- Find the comment `// step 23 - Fetch user data from the smart contract using the "GetUserDetails" method.`.

- Replace the existing **`getUserData`** function with this code snippet:

```ts title="user-profile/index.tsx"
// step 23 - Fetch user data from the smart contract using the "GetUserDetails" method.
const getUserData = async () => {
  try {
    const data = await smartContract?.callViewMethod(
      "GetUserDetails",
      currentWalletAddress
    );
    if (data?.data) {
      setUserData(data.data); // Update the state with fetched user data
    }
  } catch (error) {
    console.log("error getUserData", error); // Log error if fetching fails
  } finally {
    setLoading(false); // Set loading to false after fetching is complete
  }
};
```

### Delete Campaign

- Scroll down to find the comment `// step 24 - Delete a specific campaign using the campaign ID`

- Replace the existing **`deleteComapign`** function with this code snippet:

```ts title="user-profile/index.tsx"
// step 24 - Delete a specific campaign using the campaign ID.
const deleteComapign = async (id: string) => {
  let deleteLoading: Id;
  deleteLoading = toast.loading("Deleting Campaign.."); // Show loading toast
  try {
    await smartContract?.callSendMethod(
      "DeleteCampaign",
      currentWalletAddress as string,
      {
        value: id, // Pass the campaign ID to be deleted
      }
    );
    toast.update(deleteLoading, {
      render: "Your Campaign successfully Deleted", // Update toast to success message
      type: "success",
      isLoading: false,
    });
    removeNotification(deleteLoading); // Remove the notification after completion
    getUserData(); // Refresh user data to reflect changes
  } catch (error) {
    handleError(deleteLoading, error); // Handle error using utility function
    console.log("error", error);
    return "error";
  }
};
```

### Withdraw Raised Amount

- Scroll down to find the comment `// step 25 - Withdraw amount of raised amount of campaign`

- Replace the existing **`withdrawAmount`** function with this code snippet:

```ts title="user-profile/index.tsx"
// step 25 - Withdraw amount of raised amount of campaign
const withdrawAmount = async (id: string) => {
  let withdrawLoading: Id;
  withdrawLoading = toast.loading("Withdraw Amount is in progress..");
  try {
    await smartContract?.callSendMethod(
      "WithdrawCampaignAmount",
      currentWalletAddress as string,
      {
        campaignId: id,
      }
    );
    toast.update(withdrawLoading, {
      render: "Your raised amount withdraw successfully",
      type: "success",
      isLoading: false,
    });
    removeNotification(withdrawLoading);
    getUserData();
  } catch (error) {
    handleError(withdrawLoading, error);
    console.log("error", error);
    return "error";
  }
}
```

Now that we've written all the necessary frontend functions and components, we're ready to run the Donation dApp application in the next step.
