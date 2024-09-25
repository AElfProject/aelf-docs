---
sidebar_position: 7
title: Single Pool Staking dApp
description: Moderately difficult DeFi smart contract and dApp
---

**Description**: The Single Pool Staking dApp is a decentralized application built on the aelf blockchain that allows users to stake their tokens in a single staking pool. Users can earn rewards based on the amount and duration of their staked assets, with staking and reward distribution processes fully automated and secured by blockchain technology. The dApp offers a transparent and simple interface for users to monitor their staked assets and track reward accumulation over time.

**Purpose**: The Single Pool Staking dApp aims to demonstrate the seamless integration of staking mechanisms with blockchain, providing users with a secure, transparent, and efficient way to grow their holdings. It serves as an educational tool for learning about staking contracts and their role in decentralized finance (DeFi), while showcasing the potential of blockchain technology for creating decentralized financial services that offer fairness and trustless reward distribution.

**Difficulty Level**: Moderate

<!-- <iframe width="100%" style={{"aspect-ratio": "16 / 9"}} src="https://www.youtube.com/embed/UOcQBH2dGMo?si=rVMSvtziy-UAva80" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> -->

## Step 1 - Setting up your development environment

import Setup from "../\_setup.md"

<Setup />

## Step 2 - Develop Smart Contract

### Start Your Smart Contract Project

- Open your `Terminal`.

- Enter the following command to generate a new project:

```bash title="Terminal"
mkdir single-pool-staking-dapp
cd single-pool-staking-dapp
dotnet new aelf -n SinglePoolStaking
```

### Adding Your Smart Contract Code

Now that we have a template Single Pool Staking project, we can customise the template to incorporate our own contract logic.
Let's start by implementing methods to handle the basic functionality like deposit tokens to the staking pool, withdraw tokens from the staking pool, withdrawing tokens before the lock(stake) period ends (forceWithdraw), get the reward amount for an address from the pool, fetch all the deposits linked to a user and retrieve the total staked amount in the contract. Single Pool Staking dApp includes the below functionalities like:
1. Deposit: Allows users to stake tokens, update the total staked amount and the deposit gets linked to the user.
2. Withdraw: Allows users to withdraw tokens and rewards after the lock period ends.
3. ForceWithdraw: Allows users to withdraw tokens before the lock period ends without rewards.
4. GetReward: Retrieves the reward amount earned from a specific deposit.
5. GetDeposits: Lists all deposits linked to a user.
6. GetTotalStakedAmount: Retrieves the total staked amount

- Enter this command in your `Terminal`.

```bash title="Terminal"
cd src
```

#### Defining Methods and Messages

- Rename the proto file name `hello_world_contract.proto` inside folder `Protobuf/contract/` to `single_pool_staking.proto`:

```bash title="Terminal"
mv Protobuf/contract/hello_world_contract.proto Protobuf/contract/single_pool_staking.proto
```

The `.proto` file defines the structure and serialization of data, ensuring consistent communication and data exchange between the contract and external systems.

- Open the project with your IDE.

The implementation of `single_pool_staking.proto` file inside folder `src/Protobuf/contract/` is as follows:

```csharp title="expense_tracker.proto"
syntax = "proto3";

import "aelf/core.proto";
import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "Protobuf/reference/acs12.proto";
import "google/protobuf/wrappers.proto";

option csharp_namespace = "AElf.Contracts.StakingContract";

service StakingContract {
    option (aelf.csharp_state) = "AElf.Contracts.StakingContract.StakingContractState";
    option (aelf.base) = "Protobuf/reference/acs12.proto";

    rpc Initialize (InitializeInput) returns (google.protobuf.Empty);
    rpc Deposit (DepositInput) returns (google.protobuf.StringValue); 
    rpc Withdraw (WithdrawInput) returns (google.protobuf.Empty);
    rpc ForceWithdraw (google.protobuf.StringValue) returns (google.protobuf.Empty);
    
    rpc GetReward (google.protobuf.StringValue) returns (google.protobuf.Int64Value) {
      option (aelf.is_view) = true;
    }
    rpc GetDeposits (google.protobuf.StringValue) returns (DepositList) {
      option (aelf.is_view) = true;
    }
    
    // New functions
    rpc IfInitialized (google.protobuf.Empty) returns (google.protobuf.BoolValue) {
      option (aelf.is_view) = true;
    }
    rpc GetTotalStakedAmount (google.protobuf.Empty) returns (google.protobuf.Int64Value) {
      option (aelf.is_view) = true;
    }
}

message DepositInput {
    string token_symbol = 1;
    int64 amount = 2;
    int64 lock_time = 3;
}

message InitializeInput {
    aelf.Address token_contract_address = 1;
}

message WithdrawInput {
    string deposit_id = 1;
}

message TransferInput {
    aelf.Address to = 1;
    string symbol = 2;
    int64 amount = 3;
    string memo = 4; // Add this field
}

message StringList {
    repeated string values = 1;
}

message Deposit {
    string deposit_id = 1;
    string address = 2;
    string token_symbol = 3; // The specific FT token symbol
    int64 amount = 4;
    int64 lock_time = 5;
    int64 deposit_time = 6;
}

message DepositList {
    repeated Deposit deposits = 1;
}
```

- `rpc` methods define the callable functions within the contract, allowing external systems to interact with the contract's logic.
- `message` represent the structured data exchanged between the contract and external systems.

#### Define Contract States

The implementation of the Single Pool Staking smart contract state inside file `src/SinglePoolStakingState.cs` is as follows:

```csharp title="src/SinglePoolStakingState.cs"
using AElf.Sdk.CSharp.State;
using AElf.Types;
using AElf.Contracts.MultiToken;

namespace AElf.Contracts.StakingContract
{
    public class StakingContractState : ContractState
    {
        public BoolState Initialized { get; set; }
        public SingletonState<Address> Owner { get; set; }
        public MappedState<string, Deposit> Deposits { get; set; } // Mapping from deposit ID to Deposit
        public MappedState<Address, StringList> UserDeposits { get; set; } // User to deposit IDs
        public Int32State DepositCounter { get; set; }
        public Int64State TotalStakedAmount { get; set; } // New state to track total staked amount

        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
    }
}
```

- The `State.cs` file in the aelf blockchain smart contract holds the variables that store the contract's data, making sure this data is saved and accessible whenever the contract needs it.

#### Implement Single Pool Staking Smart Contract 

The implementation of the Single Pool Staking smart contract inside file `src/SinglePoolStaking.cs` is as follows:

```csharp title="src/SinglePoolStaking.cs"
using Google.Protobuf.WellKnownTypes;
using AElf.Types;
using System.Collections.Generic;
using AElf.Contracts.MultiToken;


namespace AElf.Contracts.StakingContract
{
    public class StakingContract : StakingContractContainer.StakingContractBase
    {
        private const int RewardRate = 10; // 10% reward

        public override Empty Initialize(InitializeInput input)
        {
            if (State.Initialized.Value)
                return new Empty();

            State.Initialized.Value = true;
            State.Owner.Value = Context.Sender;
            State.DepositCounter.Value = 0;
            State.TotalStakedAmount.Value = 0; // Initialize total staked amount

            State.TokenContract.Value = input.TokenContractAddress;

            return new Empty();
        }

        public override StringValue Deposit(DepositInput input)
        {
            var depositId = (State.DepositCounter.Value + 1).ToString();
            State.DepositCounter.Value++;

            var deposit = new Deposit
            {
                DepositId = depositId,
                Address = Context.Sender.ToString(),
                TokenSymbol = input.TokenSymbol,
                Amount = input.Amount,
                LockTime = input.LockTime,
                DepositTime = Context.CurrentBlockTime.Seconds
            };

            State.Deposits[depositId] = deposit;

            var userDeposits = State.UserDeposits[Context.Sender] ?? new StringList();
            userDeposits.Values.Add(depositId);

            State.UserDeposits[Context.Sender] = userDeposits;

            State.TotalStakedAmount.Value += input.Amount; // Update total staked amount

            return new StringValue { Value = depositId };
        }

        public override Empty Withdraw(WithdrawInput input)
        {
            var deposit = State.Deposits[input.DepositId];
            Assert(deposit != null, "Deposit not found.");
            Assert(deposit.Address == Context.Sender.ToString(), "Unauthorized.");
            Assert(Context.CurrentBlockTime.Seconds >= deposit.DepositTime + deposit.LockTime, "Lock period not over.");

            var reward = CalculateReward(deposit.Amount);
            
            TransferFromContract(deposit.TokenSymbol, Context.Sender, deposit.Amount + reward);

            State.TotalStakedAmount.Value -= deposit.Amount; // Update total staked amount

            RemoveDeposit(deposit.DepositId);
            return new Empty();
        }

        public override Empty ForceWithdraw(StringValue input)
        {
            var deposit = State.Deposits[input.Value];
            Assert(deposit != null, "Deposit not found.");
            Assert(deposit.Address == Context.Sender.ToString(), "Unauthorized.");

            TransferFromContract(deposit.TokenSymbol, Context.Sender, deposit.Amount);

            State.TotalStakedAmount.Value -= deposit.Amount; // Update total staked amount

            RemoveDeposit(deposit.DepositId);
            return new Empty();
        }

        public override Int64Value GetReward(StringValue input)
        {
            var deposit = State.Deposits[input.Value];
            Assert(deposit != null, "Deposit not found.");
            return new Int64Value { Value = CalculateReward(deposit.Amount) };
        }

        public override DepositList GetDeposits(StringValue input)
        {
            var deposits = State.UserDeposits[Address.FromBase58(input.Value)];
            var depositList = new DepositList();
    
            foreach (var depositId in deposits.Values)
            {
                var deposit = State.Deposits[depositId];
                if (deposit != null)
                {
                    depositList.Deposits.Add(deposit);
                }
            }

            return depositList;
        }

        // New function to check if initialized
        public override BoolValue IfInitialized(Empty input)
        {
            return new BoolValue { Value = State.Initialized.Value };
        }

        // New function to get the total staked amount
        public override Int64Value GetTotalStakedAmount(Empty input)
        {
            return new Int64Value { Value = State.TotalStakedAmount.Value };
        }

        private long CalculateReward(long amount)
        {
            return (amount * RewardRate) / 100;
        }

        private void TransferFromContract(string symbol, Address to, long amount)
        {
            var virtualAddressHash = GetVirtualAddressHash(Context.Self, symbol);

            State.TokenContract.TransferFrom.Send(
                new TransferFromInput
                {
                    Symbol = symbol,
                    Amount = amount,
                    From = Context.Self,
                    Memo = "Transfer from Staking Contract",
                    To = to
                });
        }

        private static Hash GetVirtualAddressHash(Address contractAddress, string symbol)
        {
            return HashHelper.ConcatAndCompute(HashHelper.ComputeFrom(contractAddress), HashHelper.ComputeFrom(symbol));
        }

        private Address GetVirtualAddress(Hash virtualAddressHash)
        {
            return Context.ConvertVirtualAddressToContractAddress(virtualAddressHash);
        }

        private void RemoveDeposit(string depositId)
        {
            var deposit = State.Deposits[depositId];
            State.Deposits.Remove(depositId);

            var userDeposits = State.UserDeposits[Address.FromBase58(deposit.Address)];
            userDeposits.Values.Remove(depositId);

            State.UserDeposits[Address.FromBase58(deposit.Address)] = userDeposits;
        }
    }
}
```

### Building Smart Contract

- Build the smart contract code with the following command inside `src` folder:

```bash title="Terminal"
dotnet build
```

You should see **SinglePoolStaking.dll.patched** in the directory `SinglePoolStaking/src/bin/Debug/net.6.0`

## Step 3 - Deploy Smart Contract

import Deploy from "../\_deploy_single_pool_staking.md"

<Deploy />

## Step 4 - Getting TOKEN Seed

In order to create an Fungible Token on the aelf blockchain, the deployer wallet must have an **TOKEN SEED**.

- Visit [TOKEN Faucet](https://faucet-ui.aelf.dev/) to get your TOKEN SEED.

---

![result](/img/token-seed.png)

- After the request is successfully processed, the requestor wallet will receive the **SEED**.

---

![result](/img/symbol.png)

---

- Please note this **SEED** symbol value, as it will be needed later while creating the Fungible Token and Staking integration. This will become our **Token Symbol**.

## Step 5 - Interact with aelf's multi-token contract and staking contract

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Project Setup

Let's start by cloning the frontend project repository from GitHub.


- Run the following command your Terminal:

```bash title="Terminal"
git clone https://github.com/AElfProject/aelf-samples.git
```

- Next, navigate to the frontend project directory with this command:

```bash title="Terminal"
cd aelf-samples/staking/2-dapp
```
- Once you're in the `2-dapp` directory, open the project with your preferred IDE (e.g., VSCode). You should see the project structure as shown below.

export const tree = {
  "type": "directory",
  "uri": "2-dapp",
  "expanded": true,
  "children": [
    {
      "type": "directory",
      "uri": "app"
    },
    {
      "type": "directory",
      "uri": "assets"
    },
    {
      "type": "directory",
      "uri": "public"
    },
    {
      "type": "directory",
      "uri": "src"
    },
    {
      "type": "file",
      "uri": ".gitignore"
    },
    {
      "type": "file",
      "uri": "components.json"
    },
    {
      "type": "file",
      "uri": "index.html"
    },
    {
      "type": "file",
      "uri": "package.json"
    },
    {
      "type": "file",
      "uri": "postcss.config.js"
    },
    {
      "type": "file",
      "uri": "README.md"
    },
    {
      "type": "file",
      "uri": "tailwind.config.js"
    },
    {
      "type": "file",
      "uri": "tsconfig.json"
    },
    {
      "type": "file",
      "uri": "tsconfig.node.json"
    },
    {
      "type": "file",
      "uri": "vite.config.ts"
    }
  ]
}

<div style={{height: 500}}><FileTree tree={tree} /></div>

#### Install necessary packages and libraries

- Run teh following command in the terminal:

<Tabs>
<TabItem value="Linux and macOs" label="Linux and macOs" default>
```bash title="Terminal"
sudo npm install
```
</TabItem>

<TabItem value="Windows" label="Windows">
```bash title="Terminal"
npm install
```
</TabItem>
</Tabs>

We are now ready to build the frontend components of our Staking dApp.

### Configure Portkey Provider & Write Contract Hooks Function

We'll set up our Portkey provider to allow users to connect their Portkey wallets to our app and interact with the aelf smart contracts. We'll be interacting with Stakinng contract and the Multi-token contract (Already deployed ) for this tutorial.

#### Write Functions for MainChain and SideChain Contract's.

**Step 1. Locate the File:**

- Go to the `src/hooks/useSmartContract.ts` file.

**Step 2. Fetch the Smart Contract:**

- Find the comment `//Step A - Function to fetch a smart contract based on the chain symbol and the contract address`

- Replace the existing **`fetchContract`** function with this updated code:

```javascript title="useSmartContract.ts"
//Step A - Function to fetch a smart contract based on the chain symbol and the contract address
const fetchContract = async (
  symbol: "AELF" | "tDVW",
  contractAddress: string
) => {
  try {
    // If no provider is available, return null
    if (!provider) return null;

    // Fetch the chain information using the provider
    const chain = await provider.getChain(symbol);
    if (!chain) throw new Error("Chain not found");

    // Get the smart contract instance from the chain
    const contract = chain.getContract(contractAddress);

    // Return the smart contract instance
    return contract;
  } catch (error) {
    console.error("Error in fetchContract", { symbol, contractAddress, error });
  }
};
```

**Explanation:**

- **`fetchContract`** **Function**: This function fetches a smart contract based on the given chain symbol (e.g., "AELF" or "tDVW") and the contract address.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Chain** : The function fetches chain information using the provider.
  - **Get Contract** : It retrieves the smart contract instance from the chain.

**Step 3. Initialize and Fetch the Smart Contracts:**

- Find the comment `// Step B - Effect hook to initialize and fetch the smart contracts when the provider changes.`

- Replace the existing **`useEffect`** hook with this updated code:

```javascript title="useStakingContract.ts"
// Step B -  Effect hook to initialize and fetch the smart contracts when the provider changes
  useEffect(() => {
    (async () => {
      // Fetch the MainChain Testnet Contract
      const mainChainContract = await fetchContract(
        "AELF",
        "JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE"
      );
      setMainChainSmartContract(mainChainContract as IContract);

      // Fetch the SideChain Testnet Contract
      const sideChainContract = await fetchContract(
        "tDVW",
        "ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx"
      );
      setSideChainSmartContract(sideChainContract as IContract);
    })();
  }, [provider]); // Dependency array ensures this runs when the provider changes
```

**Explanation:**

- **`useEffect`** **Hook** : This hook initializes and fetches the smart contracts when the provider changes.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Contracts** : It fetches and sets the smart contracts for the main chain, side chain.
  - **MainChain Contract** : Fetches the MainChain Testnet Contract and sets it in the state.
  - **SideChain Contract** : Fetches the SideChain Testnet Contract and sets it in the state.

#### Write Functions for Staking Contract.
  
**Step 1. Locate the File:**

- Go to the `src/hooks/useStakingContract.ts` file.

**Step 2. Fetch the Smart Contract:**

- Find the comment `//Step C - Function to fetch a smart contract based on the chain symbol and the contract address`

- Replace the existing **`fetchContract`** function with this updated code:

```javascript title="useStakingContract.ts"
//Step C - Function to fetch a smart contract based on the chain symbol and the contract address
const fetchContract = async (
  symbol: "AELF" | "tDVW",
  contractAddress: string
) => {
  try {
    // If no provider is available, return null
    if (!provider) return null;

    // Fetch the chain information using the provider
    const chain = await provider.getChain(symbol);
    if (!chain) throw new Error("Chain not found");

    // Get the smart contract instance from the chain
    const contract = chain.getContract(contractAddress);

    // Return the smart contract instance
    return contract;
  } catch (error) {
    console.error("Error in fetchContract", { symbol, contractAddress, error });
  }
};
```

**Explanation:**

- **`fetchContract`** **Function**: This function fetches a smart contract based on the given chain symbol (e.g., "AELF" or "tDVW") and the contract address.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Chain** : The function fetches chain information using the provider.
  - **Get Contract** : It retrieves the smart contract instance from the chain.

**Step 3. Initialize and Fetch the Smart Contracts:**

- Find the comment `// Step D -  Effect hook to initialize and fetch the smart contracts when the provider changes`

- Replace the existing **`useEffect`** hook with this updated code:

```javascript title="useStakingContract.ts"
// Step D -  Effect hook to initialize and fetch the smart contracts when the provider changes
useEffect(() => {
  (async () => {
    // Fetch the Staking Testnet Contract
    const stakingContract = await fetchContract(
      "tDVW",
      stakingContractAddress
    );
    setStakingSmartContract(stakingContract as IContract);
  })();
}, [provider]); // Dependency array ensures this runs when the provider changes
```

**Explanation:**

- **`useEffect`** **Hook** : This hook initializes and fetches the smart contracts when the provider changes.

  - **Check Provider** : If no provider is available, the function returns null.
  - **Fetch Contracts** : It fetches and sets the smart contracts for the staking.

By following these steps, we'll configure the Portkey provider to connect users' wallets to your app and interact with the multi-token and stainng smart contract including Fungible Token and Staing related functionalities. This setup will enable our frontend components to perform actions like `create Token`, `transfer Token`, and `stakinng Token`, `withdraw Token`, `emergency withdraw Token` and etc.

### Configure Connect Wallet Function

**Step 1: Locate the File**

- Go to the `src/components/layout/header/index.tsx` file.

**Step 2: Write the Connect Wallet Function**

- The `header/index.tsx` file is the header of our Staking dApp. It allows users to connect their Portkey wallet with the Staking dApp.

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

- **`connect`** **Function** : This function connects the user's Portkey wallet with the dApp.

  - **Fetch Accounts** : It fetches the wallet accounts using the provider.
  - **Log Accounts** : Logs the accounts to the console for debugging.
  - **Set Wallet Address** : Sets the current wallet address state variable with the fetched account.
  - **Update Connection Status** : Updates the state to indicate that the wallet is connected.  

In this code, we fetch the Portkey wallet account using the provider and update the wallet address state variable. An alert notifies the user that their wallet is successfully connected.

With the Connect Wallet function defined, we're ready to write the remaining functions in the next steps.

### Configure Create TOKEN Form Code

**Step 1: Locate the File**

1. Go to the `src/components/create-token-modal/index.tsx` file. This file is the **Create Fungible TOKEN** popup modal where users can enter details like the `tokenName`, `symbol` and `totalSupply`.

**Step 2: Prepare Form to Create TOKEN**

1.  Find the comment `// Step F - Configure TOKEN Create Form`.

2.  Replace the form variable with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step F - Configure TOKEN Create Form
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    tokenName: "$TOKEN",
    symbol: "",
    totalSupply: "",
  },
});
```

#### Here's what the function does:

1. Initializes a new form variable with default values needed to create a TOKEN.

2. Fields include: `tokenName` , `symbol` and `totalSupply`.

Now the form is ready for users to fill in the necessary details for their TOKEN function interaction.

### Get CrossChain Contract

Let's write the functions to `Get CrossChain Contract` for Parent chain height.

**Write the function to Get CrossChain Contract**

- The `create-token-modal/index.tsx` file includes the code to create Fungible TOKEN.

- Find the comment `// Step G - Get CrossChain Contract`.

- Replace the existing **`getCrossChainContract`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step G - Get CrossChain Contract
const getCrossChainContract = async (aelf: any, wallet: any) => {
  const crossChainContractName = "AElf.ContractNames.CrossChain";

  // get chain status
  const chainStatus = await aelf.chain.getChainStatus();
  // get genesis contract address
  const GenesisContractAddress = chainStatus.GenesisContractAddress;
  // get genesis contract instance
  const zeroContract = await aelf.chain.contractAt(
    GenesisContractAddress,
    wallet
  );
  // Get contract address by the read only method `GetContractAddressByName` of genesis contract
  const crossChainContractAddress = await zeroContract.GetContractAddressByName.call(AElf.utils.sha256(crossChainContractName));

  return await aelf.chain.contractAt(crossChainContractAddress, wallet);
};
```

#### What This Function Does:

1. **Get chainStatus** : It gets chainStatus from getChainStatus function which is there in aelf.

2. **Get GenesisContractAddress** : It gets GenesisContractAddress from chainStatus.

3. **fetch zeroContract** : It fetch zeroContract using GenesisContractAddress and wallet.

4. **fetch crossChainContractAddress** : It fetch crossChainContractAddress by calling GetContractAddressByName method from zeroContract.

Next, we'll write the **Get the parent chain height** function.

### Get the parent chain height

**Write the get the parent chain height function**

- Scroll down to find the comment `// Step H - Get the parent chain height`.

- Replace the existing **`GetParentChainHeight`** function with the following code snippet:

```javascript title="create-token-modal/index.tsx"
// Step H - Get the parent chain height
// This function fetches the current height of the parent blockchain.
const GetParentChainHeight = async () => {
  try {
    const tdvwCrossChainContract = await getCrossChainContract(tdvw, wallet);
    // Call the smart contract method to get the parent chain height.
    const result = await tdvwCrossChainContract.GetParentChainHeight.call();
    // Return the parent chain height if it exists, otherwise return an empty string.
    return result ? (result.value as string) : "";
  } catch (error: any) {
    // If there's an error, log it and return an error status.
    console.error(error, "=====error in GetParentChainHeight");
    return "error";
  }
};
```

#### What This Function Does:

1. **Calls Smart Contract Method** : It interacts with the side chain smart contract method to fetch the current height of the parent blockchain.

2. **Returns Parent Chain's Height** : It returns the parent chain's height if it exists.

Next, we'll write the **Fetch the Merkle path** function.

### Fetch the Merkle path

**Write the fetch the merkle path function**

- Scroll down to find the comment `// Step I - Fetch the merkle path by transaction Id`.

- Replace the existing **`getMerklePathByTxId`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step I - Fetch the merkle path by transaction Id
const getMerklePathByTxId = async (aelf: any, txId: string) => {
  try {
    const { MerklePathNodes } = await aelf.chain.getMerklePathByTxId(txId);

    const formattedMerklePathNodes = MerklePathNodes.map(
      ({
        Hash,
        IsLeftChildNode,
      }: {
        Hash: string;
        IsLeftChildNode: boolean;
      }) => ({
        hash: Hash,
        isLeftChildNode: IsLeftChildNode,
      })
    )
    return { merklePathNodes: formattedMerklePathNodes };
  } catch (error) {
    console.error("Error fetching Merkle path:", error);
    throw new Error("Failed to get Merkle path by transaction ID.");
  }
};
```

#### What This Function Does:

1. **Fetches Merkle Path** : It sends a request to fetch the merkle path using the transaction ID.

2. **Parses Response** : It parses the response from the server as JSON.

3. **Returns Merkle Path Nodes** : It extracts and returns the merkle path of the nodes from the JSON response.


### Get Token Contract

**Write the Get Token Contract function**

- Scroll down to find the comment `// Step J - Get Token Contract`.

- Replace the existing **`getTokenContract`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step J - Get Token Contract
const getTokenContract = async (aelf: any, wallet: any) => {
  const tokenContractName = "AElf.ContractNames.Token";
  // get chain status
  const chainStatus = await aelf.chain.getChainStatus();
  // get genesis contract address
  const GenesisContractAddress = chainStatus.GenesisContractAddress;
  // get genesis contract instance
  const zeroContract = await aelf.chain.contractAt(
    GenesisContractAddress,
    wallet
  );
  // Get contract address by the read only method `GetContractAddressByName` of genesis contract
  const tokenContractAddress =
    await zeroContract.GetContractAddressByName.call(
      AElf.utils.sha256(tokenContractName)
    );

  return await aelf.chain.contractAt(tokenContractAddress, wallet);
};
```

#### What This Function Does:

1. **Get chainStatus** : It gets chainStatus from getChainStatus function which is there in aelf.

2. **Get GenesisContractAddress** : It gets GenesisContractAddress from chainStatus.

3. **fetch zeroContract** : It fetch zeroContract using GenesisContractAddress and wallet.

4. **fetch tokenContractAddress** : It fetch tokenContractAddress by calling GetContractAddressByName method from zeroContract.

### Create Fungible Token on MainChain

**Write a function to Create a new Fungible Token on MainChain**

- Scroll down to find the comment `// Step K - Create Token on MainChain`.

- Replace the existing **`createTokenOnMainChain`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step K - Create Token on MainChain
const createTokenOnMainChain = async (values: {
  tokenName: string;
  symbol: string;
  totalSupply: string;
}) => {
  setFormLoading(true);
  let createMainChainTokenLoadingId;

  try {
    createMainChainTokenLoadingId = toast.loading(
      "Creating $TOKEN on MainChain..."
    );

    // Preparing Parameter for Create Function
    const createTokenMainChainInput = {
      tokenName: values.tokenName,
      symbol: values.symbol,
      totalSupply: Number(values.totalSupply) + Number(extraRewardAmount),
      issuer: currentWalletAddress,
      isBurnable: true,
      issueChainId: sidechain_from_chain_id,
      owner: currentWalletAddress,
      externalInfo: {},
    };
    const resultMainchain = await mainChainSmartContract?.callSendMethod(
      "Create",
      currentWalletAddress as string,
      createTokenMainChainInput
    );

    console.log(
      "========= result of create New $TOKEN =========",
      resultMainchain
    );

    toast.update(createMainChainTokenLoadingId, {
      render: "$TOKEN Created Successfully on MainChain",
      type: "success",
      isLoading: false,
    });

    return "success";
  } catch (error: any) {
    if (!createMainChainTokenLoadingId) {
      return "error";
    }
    handleCloseModal();
    toast.update(createMainChainTokenLoadingId, {
      render: error.message,
      type: "error",
      isLoading: false,
    });
    return "error";
  } finally {
    removeNotification(createMainChainTokenLoadingId as Id, 5000);
  }
};
```

:::tip
ℹ️ Note: You need to get **symbol** from the Portkey wallet.
:::

- **Follow Steps to get TOKEN symbol from Portkey Wallet:**

  - Open Portkey Wallet.
  - Go to the NFTs tab.
  - You will find the SEED that you already got from the above **seed generation** step.
  - Click on the SEED to see details.
  - You will find the **Token Symbol** inside the **Token Creation via This Seed** section.
  - Copy and use that value of the token symbol.

#### What this function does:

1. **Prepares Parameters :** Constructs input parameters for creating the TOKEN, including token details and the issuer's information.

2. **Calls Smart Contract :** Sends a request to the mainchain smart contract to create the TOKEN using the prepared parameters.

3. **Return Status :** Returns `"success"` if the TOKEN is created successfully; otherwise, returns `"error"`.


**Write the Function for Validate TOKEN Info Exist**

Now, let's write the Validate TOKEN Info Exist function.

- Scroll down to find the comment `// Step L - Validate Mainchain Token Create's Transaction`.

- Replace the existing **`validateToken`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step L - Validate Mainchain Token Create's Transaction
const validateToken = async (values: ITokenParams) => {
  let validateTOKENLoadingId;
  try {
    setFormLoading(true);

    // Start Loading before initiate the transaction
    validateTOKENLoadingId = toast.loading(
      <CustomToast
        title="Transaction is getting validated on aelf blockchain. Please wait!"
        message="Validation means transaction runs through a consensus algorithm to be selected or rejected. Once the status changes process will complete. It usually takes some time in distributed systems."
      />
    );

    // Create an object with the necessary information for token validation.
    const validateInput = {
      symbol: values.symbol,
      tokenName: values.tokenName,
      totalSupply: Number(values.totalSupply) + Number(extraRewardAmount),
      issuer: currentWalletAddress,
      isBurnable: true,
      issueChainId: sidechain_from_chain_id,
      owner: currentWalletAddress,
      externalInfo: {},
    };

    // get mainnet contract
    const aelfTokenContract = await getTokenContract(aelf, wallet);
    // prepare Sign the transaction using contract method (ValidateTokenInfoExists Function)
    const signedTx =
      aelfTokenContract.ValidateTokenInfoExists.getSignedTx(validateInput);
    // send the transaction using signed Transaction
    const { TransactionId: VALIDATE_TXID } = await aelf.chain.sendTransaction(
      signedTx
    );

    await delay(3000);
    // get Validate Result
    let VALIDATE_TXRESULT = await aelf.chain.getTxResult(VALIDATE_TXID);

    await delay(3000);

    // if SideChain index has a MainChain height greater than validateTokenInfoExist's
    let heightDone = false;

    while (!heightDone) {
      // get latest index Hight
      const sideIndexMainHeight = await GetParentChainHeight();
      if (
        // check the latest index Hight is grater than or equal
        Number(sideIndexMainHeight) >=
        Number(VALIDATE_TXRESULT.Transaction.RefBlockNumber)
      ) {
        VALIDATE_TXRESULT = await aelf.chain.getTxResult(VALIDATE_TXID);
        heightDone = true;
      }
    }
    console.log(VALIDATE_TXRESULT, "VALIDATE_TXRESULT=====2");

    const merklePath = await getMerklePathByTxId(aelf, VALIDATE_TXID);

    toast.update(validateTOKENLoadingId, {
      render: "Validating $TOKEN Successfully Executed",
      type: "success",
      isLoading: false,
    });
    // return necessary values
    return {
      parentChainHeight: VALIDATE_TXRESULT.BlockNumber,
      signedTx: signedTx,
      merklePath: merklePath,
    };
  } catch (error: any) {
    toast.update(validateTOKENLoadingId as Id, {
      render: error.message,
      type: "error",
      isLoading: false,
    });
    handleCloseModal();
    return "error";
  } finally {
    removeNotification(validateTOKENLoadingId as Id);
  }
};
```

#### Here's what the function does:

1. **Prepares Validation Input:** Constructs the input parameters needed for validating the token.

2. **Gets Token Contract:** Retrieves the token contract instance from the MainChain.

3. **Signs and Sends Transaction:** Signs the transaction to validate the token info and sends it to the blockchain.

4. **Polls for Transaction Result:** Waits for the transaction result and ensures the transaction has reached the required block height.

5. **Fetches Merkle Path:** Retrieves the Merkle path for the validated transaction.

### Create Fungible Token on SideChain

**Write a Function for Create Token on SideChain**

- Scroll down to find the comment `// Step M - Create a Token on SideChain.`.

- Replace the existing **`createTokenOnSideChain`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step M - Create a Token on SideChain.
const createTokenOnSideChain = async (values: ITokenValidateResult) => {
  let createSideChainTokenLoadingId;
  try {
    createSideChainTokenLoadingId = toast.loading(
      "Creating $TOKEN on SideChain..."
    );

    // Prepare create Token Parameters
    const CREATE_TOKEN_PARAMS = {
      fromChainId: mainchain_from_chain_id,
      parentChainHeight: values.parentChainHeight,
      transactionBytes: Buffer.from(values.signedTx, "hex").toString(
        "base64"
      ),
      merklePath: values.merklePath,
    };

    // Calling CrossChainCreateToken function on sidechain
    await sideChainSmartContract?.callSendMethod(
      "CrossChainCreateToken",
      currentWalletAddress as string,
      CREATE_TOKEN_PARAMS
    );

    toast.update(createSideChainTokenLoadingId, {
      render: "$TOKEN Created Successfully On SideChain",
      type: "success",
      isLoading: false,
    });
    return "success";
  } catch (error) {
    toast.update(createSideChainTokenLoadingId as Id, {
      render: "$TOKEN Created Successfully On SideChain",
      type: "success",
      isLoading: false,
    });
    console.log("error====", error);
    return "error";
  } finally {
    removeNotification(createSideChainTokenLoadingId as Id);
  }
};
```

#### Here's what the function does:

1. **Prepares Parameters:** Constructs the parameters needed for creating the TOKEN on the SideChain, including chain IDs, block height, transaction data, and Merkle path.

2. **Calls Smart Contract Method:** Sends the transaction to the SideChain smart contract to create the TOKEN.


### Issue the created TOKEN on sidechain

**Write a Function for Issue Token which has been Created on SideChain.**

- Scroll down to find the comment `// Step N - Issue Token on SideChain`.

- Replace the existing **`issueTokenOnSideChain`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step N - Issue Token on SideChain
const issueTokenOnSideChain = async (values: {
  symbol: string;
  amount: string | number;
  memo: string;
}) => {
  let issueTokenLoadingId;

  try {
    setFormLoading(true);
    issueTokenLoadingId = toast.loading("Issuing $TOKEN on SideChain...");

    // prepate parameters
    const issueTokenInput = {
      symbol: values.symbol,
      amount: values.amount,
      memo: values.memo,
      to: currentWalletAddress,
    };

    // call Issue function on sidechain smart contract
    const result = await sideChainSmartContract?.callSendMethod(
      "Issue",
      currentWalletAddress as string,
      issueTokenInput
    );

    console.log(
      "========= result of issue Token Transaction =========",
      result
    );

    toast.update(issueTokenLoadingId, {
      render: "$TOKEN Issue Successfully Executed",
      type: "success",
      isLoading: false,
    });
    toast.success(
      "You will get $TOKEN on your Wallet! It can take sometimes to get into your wallet"
    );
    return result;
  } catch (error: any) {
    handleCloseModal();
    toast.update(issueTokenLoadingId as Id, {
      render: error.message,
      type: "error",
      isLoading: false,
    });
    return "error";
  } finally {
    removeNotification(issueTokenLoadingId as Id);
  }
};
```

#### Here's what the function does:

1. **Prepares Issuance Input:** Constructs the input parameters for issuing the TOKEN, including symbol, amount, memo, and recipient address.

2. **Calls Smart Contract Method:** Sends the transaction to the SideChain smart contract to issue the TOKEN.

3. **Handles Success:** Updates the notification to show successful issuance and notifies the user that the TOKEN will appear in their wallet.


### Transfer TOKEN to Staking Contract

**Create a Function to Transfer TOKEN to Staking Contract for Reward Balance**

- Scroll down to find the comment `// Step O - Transfer TOKEN to Staking Contract`.

- Replace the existing **`transferTokenToStakingContract`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step O - Transfer TOKEN to Staking Contract
const transferTokenToStakingContract = async (
  amount: string,
  symbol: string
) => {
  let transferTokenLoadingId = toast.loading(
    "Transferring $TOKEN to Staking Contract for Reward Balance"
  );

  // prepare parameters
  try {
    const transferNtfInput = {
      to: stakingContractAddress,
      symbol: symbol,
      amount: amount,
      memo: "Transfering Amount to Staking Contract for Reward Balance",
    };

    // call Transfer function on sidechain contract
    await sideChainSmartContract?.callSendMethod(
      "Transfer",
      currentWalletAddress as string,
      transferNtfInput
    );

    toast.update(transferTokenLoadingId, {
      render: "$TOKEN Transfer Successfully!",
      type: "success",
      isLoading: false,
    });
    return "success";
  } catch (error: any) {
    toast.update(transferTokenLoadingId, {
      render: error.message,
      type: "error",
      isLoading: false,
    });
    return "error";
  } finally {
    removeNotification(transferTokenLoadingId as Id);
  }
};
```

#### Here's what the function does:

1. **Prepares Transfer Input:** Constructs the input parameters for transferring the TOKEN, including to address, symbol, amount, memo.

2. **Calls Smart Contract Method:** Sends the transaction to the SideChain smart contract to Transfer the TOKEN.


### Initializing the staking contract

**Create a Function to Initializing the staking contract using Token Address**

- Scroll down to find the comment `// Step P - Initializing the staking contract`.

- Replace the existing **`initializedContract`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step P - Initializing the staking contract
const initializedContract = async (tokenContractAddress: string) => {
  let initializeLoadingId: any;
  try {

    initializeLoadingId = toast.loading("Staking Contract is Initialising...");

    // call Initialize function on Staking contract using token contract
    const result = await stakingContract?.callSendMethod(
      "Initialize",
      currentWalletAddress as string,
      { tokenContractAddress }
    );

    toast.update(initializeLoadingId, {
      render: "Staking Contract Initialised Successful",
      type: "success",
      isLoading: false,
    });
    return "true";
  } catch (error: any) {
    toast.update(initializeLoadingId, {
      render: error.message,
      type: "error",
      isLoading: false,
    });
    return "error";
  } finally {
    removeNotification(initializeLoadingId as Id);
  }
};
```

#### Here's what the function does:

1. **Calls Smart Contract Method:** Sends the transaction to the Staking smart contract to Initialize the contract using Token Address.

### Configure Submit Form

**Create a Function to handle Submit of Create form**

Now, let's write the create Token Function.

1. Scroll down to find the comment `// Step Q - handle Submit of Create Token`.

2. Replace the existing **`onSubmit`** function with this code snippet:

```javascript title="create-token-modal/index.tsx"
// Step Q - handle Submit of Create Token
const onSubmit = async (values: {
  tokenName: string;
  symbol: string;
  totalSupply: string;
}) => {
  try {
    // creating TOKEN on mainchain
    const mainChainResult = await createTokenOnMainChain(values);

    if (mainChainResult === "error") {
      setFormLoading(false);
      return;
    }
    await delay(3000);

    // Validating Transaction of Create Token on mainchain
    const validateTokenData: ITokenValidateResult | "error" = await validateToken(values);
    if (validateTokenData === "error") {
      setFormLoading(false);
      return;
    }

    // creating TOKEN on side chain once Transaction validate
    const sideChainResult = await createTokenOnSideChain(validateTokenData);

    if (sideChainResult === "error") {
      setFormLoading(false);
      return;
    }

    // Issuing TOKEN on side chain once it's created succefully
    const issueTokenResult: any = await issueTokenOnSideChain({
      symbol: values.symbol,
      amount: Number(values.totalSupply) + Number(extraRewardAmount),
      memo: "We are issuing Token",
    });

    if (issueTokenResult === "error") {
      setFormLoading(false);
      return;
    }

    // get TokenContractDetails from transactio logs on issues Token
    const tokenLog = issueTokenResult.data.Logs.find(({Name}:{Name:string})=>Name === "Issued")
    if(!tokenLog){
        toast.error("Error in Token Address");
        return 
    }

    // Transferring Reward Amount on Staking Contract
    await transferTokenToStakingContract(extraRewardAmount, values.symbol);
    // Initializing Staking smart contract using Token Address
    await initializedContract(tokenLog.Address);
  } catch (error: any) {
    toast.error(error);
  } finally {
    setFormLoading(false);
    handleCloseModal();
  }
};
```

#### Here's what the function does:

1. **Creates TOKEN on MainChain:** Calls `createTokenOnMainChain` to create the TOKEN on the MainChain. If it fails, it updates the transaction status and exits.

2. **Validates Create Token Transaction:** Waits for 3 seconds, then calls `validateToken` to validate the TOKEN. If validation fails, it updates the transaction status and exits.

3. **Creates TOKEN on SideChain:** Calls `createTokenOnSideChain` to create the TOKEN on the SideChain using the validated data. If it fails, it updates the transaction status and exits.

4. **Issues TOKEN on SideChain:** Calls `issueTokenOnSideChain` to issue the TOKEN. Updates the transaction status to false after completion.

5. **Transferring Reward Amount on Staking Contract :** Calls `transferTokenToStakingContract` to Transferring Reward Amount on Staking Contract.

6. **Initializing Staking smart contract:** Calls `initializedContract` to Initializing Staking smart contract using Token Address.


### Fetch TOKEN Data

Let's write the Function for the fetch Token data from user's Wallet using Graphql API.

**Step 1: Locate the File**

- go to the `/src/pages/home/index.tsx` file.

**Step 2: Write Function for fetch the Fungible Token data**

- Find the comment `// Step R - fetch Fungible Token data`.

- Replace the existing **`fetchTokenData`** function with this code snippet:

```javascript title="home/index.tsx"
// Step R - fetch Fungible Token data
const fetchTokenData = async () => {
  if (!currentWalletAddress) {
    return;
  }
  try {
    // Your GraphQL query and variables from the curl command
    const query = `
      query ExampleQuery($dto: GetCAHolderTokenBalanceDto) {
        caHolderTokenBalanceInfo(dto: $dto) {
          data {
            balance
            tokenInfo {
              symbol
            }
          }
        }
      }
    `;

    const variables = {
      dto: {
        chainId: "tDVW", // AELF or tDVW
        skipCount: 0,
        maxResultCount: 100,
        caAddressInfos: [
          {
            caAddress: currentWalletAddress,
          },
        ],
      },
    };

    // Axios POST request to the GraphQL endpoint
    const response = await axios.post(
      "https://dapp-aa-portkey-test.portkey.finance/Portkey_V2_DID/PortKeyIndexerCASchema/graphql",
      {
        query: query,
        variables: variables,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    // Handle the response
    const tokensData = response.data.data.caHolderTokenBalanceInfo.data;

    // find token detilas from API  data
    if (tokensData && tokensData.length > 0) {
      const filterTokenInfo = tokensData.find(
        (data: ITokenInfo) => data.tokenInfo.symbol.length === 10,
        []
      );
      if (filterTokenInfo) {
        setTokenInfo(filterTokenInfo);
      }
    }
    
  } catch (err) {
    console.log("error", err);
  }
};
```
#### Here's what the function does:

1. **Fetch TOKEN balance Data:** Fetching TOKEN balance Data using graphql api.

2. **Filter Token Details:** It finds the Token details from API response.

now' it's time to start to implement the functions for staking functionnlity.

--- 

### Deposit Stake amount on Staking contract

As we have completed `Create TOEKN` and `Fetch TOKEN balane` functionalit so now it's time to achive Stake Token functionality using Staking smartcontract.

So now let's prepare the **Deposit Stake Amount** related functions.

#### Transfer TOKEN to the Staking Contract

First we need to transfer stake amount to Staking address using sidechain contract and then we can call the `GetDeposits` function on Stakking contract.

- Scroll down to find the comment `// Step S - Function to transfer TOKEN to the Staking Contract`.

- Replace the existing **`transferTokenToStakingContract`** function with this code snippet:

```javascript title="home/index.tsx"
// Step S - Function to transfer TOKEN to the Staking Contract
const transferTokenToStakingContract = async (amount: string) => {
  // Show a loading toast notification while the transfer is in progress
  let transferTokenLoadingId = toast.loading("$TOKEN Deposit Transaction Executing");

  try {
    // Prepare the transfer input with required parameters
    const transferNtfInput = {
      to: stakingContractAddress, // Address of the staking contract
      symbol: tokenInfo?.tokenInfo.symbol, // Symbol of the token being transferred
      amount: amount, // Amount to be transferred
      memo: "Transferring Amount to Staking Contract for Deposit Token", // Description or memo for the transaction
    };

    // Call the transfer method on the side chain smart contract
    await sideChainSmartContract?.callSendMethod(
      "Transfer",
      currentWalletAddress as string, // Address of the current wallet initiating the transfer
      transferNtfInput
    );

    // Update the toast notification on successful transfer
    toast.update(transferTokenLoadingId, {
      render: "$TOKEN Deposit Successfully!",
      type: "success",
      isLoading: false,
    });
    removeNotification(transferTokenLoadingId); // Remove the notification
    return "success"; // Return success status
  } catch (error: any) {  
    // Handle any error during the token transfer and update the toast notification
    toast.update(transferTokenLoadingId, {
      render: error.message, // Display the error message
      type: "error",
      isLoading: false,
    });
    removeNotification(transferTokenLoadingId); // Remove the notification
    return "error"; // Return error status
  }
};
```

#### Creat handle Staking function

Now let's create the handle Staking function for staking as we completed **`transferTokenToStakingContract`** function creation.

- Scroll down to find the comment `// Step T - Function to handle staking of the token`.

- Replace the existing **`handleStaking`** function with this code snippet:

```javascript title="home/index.tsx"
// Step T - Function to handle staking of the token
const handleStaking = async () => {
  // Validate the amount and handle any errors
  const isError = handleAmountError(amount);
  if (isError) {
    return; // Exit if there is an error with the amount
  }
  
  let stakingLoadingId: any; // Variable to store the loading toast ID

  try {
    // Transfer the token to the staking contract before proceeding with staking
    const result: "success" | "error" = await transferTokenToStakingContract(amount);

    // Exit if the transfer encountered an error
    if (result === "error") {
      return;
    }

    // Show a loading toast notification for the staking process
    stakingLoadingId = toast.loading("Staking $TOKEN on Smart Contract...");

    // Prepare the deposit parameters
    const DEPOSIT_PARAMS = {
      tokenSymbol: tokenInfo?.tokenInfo.symbol, // Symbol of the token being staked
      amount: amount, // Amount being staked
      lockTime: 3600, // Time for which the tokens are locked
    };

    // Call the deposit method on the staking contract
    await stakingContract?.callSendMethod(
      "Deposit",
      currentWalletAddress as string, // Address of the current wallet
      DEPOSIT_PARAMS
    );

    // Fetch the updated deposit data and total staked amount after staking
    fetchDepositData();
    fetchTotalStakedAmount();

    // Reset the edited status and clear the amount field
    setIsEdited(false);
    setAmount("");

    // Update the toast notification for successful staking
    toast.update(stakingLoadingId, {
      render: "$TOKEN Staked Successfully",
      type: "success",
      isLoading: false,
    });
    removeNotification(stakingLoadingId); // Remove the notification
  } catch (error: any) {
    // Handle any error during staking and update the toast notification
    setAmount(""); // Clear the amount field in case of an error
    toast.update(stakingLoadingId, {
      render: error.message, // Display the error message
      type: "error",
      isLoading: false,
    });
    removeNotification(stakingLoadingId); // Remove the notification
    return "error"; // Return error status
  }
};
```

---

### Fetch Deposit (Staked) Data

- Find the comment `// Step U - Function to fetch deposit data for the current wallet address`.

- Replace the existing **`fetchDepositData`** function with this code snippet:

```javascript title="home/index.tsx"
// Step U - Function to fetch deposit data for the current wallet address
const fetchDepositData = async () => {
  try {
    // Call the "GetDeposits" method on the staking contract to get deposits for the wallet address
    const deposite: any = await stakingContract?.callViewMethod("GetDeposits",{value: currentWalletAddress as string});

    // Check if there are any deposits in the returned data
    if (deposite.data && deposite.data.deposits.length > 0) {
      setDepositData(deposite.data.deposits); // Update state with the deposit data
    } else {
        setDepositData([]); // If no deposits, set the data to an empty array
    }
  } catch (error) {
    // Log and handle any errors during the fetch
    console.log("error", error);
    return "error";
  }
};
```

---

### Fetch Total Staked Amount

- Find the comment `// Step V - Function to fetch the total staked amount from the staking contract`.

- Replace the existing **`fetchTotalStakedAmount`** function with this code snippet:

```javascript title="home/index.tsx"
// Step V - Function to fetch the total staked amount from the staking contract
const fetchTotalStakedAmount = async () => {
  try {
    // Call the "GetTotalStakedAmount" method to get the total staked amount
    const amount: any = await stakingContract?.callViewMethod("GetTotalStakedAmount","");

    // Check if there is valid data for the total staked amount
    if (amount?.data) {
      setTotalStakedAmount(amount.data.value); // Update state with the total staked amount
    } else {
      setTotalStakedAmount("0"); // If no data, set the total staked amount to "0"
    }
  } catch (error) {
    // Log and handle any errors during the fetch
    console.log("error", error);
    return "error";
  }
};
```

---

### Withdraw Staked Tokens

User can withdraw the staked amount after the staking period is over for the specific deposit.

- Find the comment `// Step W - Function to withdraw staked tokens based on a deposit ID`.

- Replace the existing **`withdrawStake`** function with this code snippet:

```javascript title="home/index.tsx"
// Step W - Function to withdraw staked tokens based on a deposit ID
const withdrawStake = async (depositId: string) => {
  let withdrawLoadingId: any; // Variable to store the loading toast ID
  setIsWithdrawing(true); // Set the withdrawing state to true

  try {
    // Show a loading toast notification while the withdrawal is in progress
    withdrawLoadingId = toast.loading("$TOKEN Withdrawal in Progress...");

    // Call the "Withdraw" method on the staking contract to withdraw based on deposit ID
    await stakingContract?.callSendMethod(
      "Withdraw",
      currentWalletAddress as string, // Pass the current wallet address
      { depositId } // Pass the deposit ID to withdraw
    );

    // Update the toast notification on successful withdrawal
    toast.update(withdrawLoadingId, {
      render: "$TOKEN Withdraw Successful",
      type: "success",
      isLoading: false,
    });
    removeNotification(withdrawLoadingId); // Remove the loading notification
  } catch (error: any) {
    // Handle any errors during withdrawal and update the toast notification
    toast.update(withdrawLoadingId, {
      render: error.message, // Display the error message
      type: "error",
      isLoading: false,
    });
    removeNotification(withdrawLoadingId); // Remove the loading notification
    return "error"; // Return error status
  } finally {
    // After withdrawal, fetch updated deposit data and total staked amount
    fetchDepositData();
    fetchTotalStakedAmount();
    setIsWithdrawing(false); // Set the withdrawing state to false
  }
};
```

---

### Emergency Withdraw Staked Tokens

Users can withdraw their staked amount at any time through an Emergency Withdrawal, even before the staking period is over.

- Find the comment `// Step X - Function to perform an emergency withdrawal of staked tokens based on a deposit ID`.

- Replace the existing **`emergencyWithdrawStake`** function with this code snippet:

```javascript title="home/index.tsx"
// Step X - Function to perform an emergency withdrawal of staked tokens based on a deposit ID
const emergencyWithdrawStake = async (depositId: string) => {
  let withdrawLoadingId: any; // Variable to store the loading toast ID
  setIsWithdrawing(true); // Set the withdrawing state to true

  try {
    // Show a loading toast notification while the emergency withdrawal is in progress
    withdrawLoadingId = toast.loading("Emergency $TOKEN Withdrawal in Progress...");

    // Call the "ForceWithdraw" method on the staking contract to forcefully withdraw the deposit
    await stakingContract?.callSendMethod(
      "ForceWithdraw",
      currentWalletAddress as string, // Pass the current wallet address
      { value: depositId } // Pass the deposit ID for the emergency withdrawal
    );

    // Update the toast notification on successful emergency withdrawal
    toast.update(withdrawLoadingId, {
      render: "$TOKEN Withdraw Successful",
      type: "success",
      isLoading: false,
    });
    removeNotification(withdrawLoadingId); // Remove the loading notification
  } catch (error: any) {
    // Handle any errors during emergency withdrawal and update the toast notification
    toast.update(withdrawLoadingId, {
      render: error.message, // Display the error message
      type: "error",
      isLoading: false,
    });
    removeNotification(withdrawLoadingId); // Remove the loading notification
    return "error"; // Return error status
  } finally {
    // After the emergency withdrawal, fetch updated deposit data
    fetchDepositData();
    setIsWithdrawing(false); // Set the withdrawing state to false
  }
};
```

---

### Set Staking Contract Address

You needs to set your deployed Staking contract Address in utils file so let's set it now.

**Step 1: Locate the File**

- go to the `/src/lib/utils.tsx` file.

**Step 2: Set Deployed Staking Contract Address**

- Find the comment `// Step Y - Staking contract` on below of page.

- Replace your deployed staking contract with value of **stakingContractAddress** (`your_deployed_stakinng_contract`).

As we've written all the necessary frontend functions and components, we're ready to run the Staking dApp application in the next step.

### Run Application

In this step, we will run the Staking dApp application.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

:::info

ℹ️ Note: Ensure that you are running this command under the **staking/2-dapp** folder.

:::

- You should observe the following as shown below.

  ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the Staking app landing page as shown below.

:::tip
If you are developing and testing this with GitHub codespace, you can use Port Forward to test the web server that is running in codespace, here is the link on how to use Port forward for codespace https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace
:::

- Usually codespace will automatically forward port, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:

  ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the Staking dApp in the browser.

  ![staking-home-page](/img/staking-home-page.png)

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

   ![connect-wallet](/img/staking-connect-wallet-buton.png)

- You will get Connection Request on Portkey wallet as you can see in below image.
- Click on **Approve** button.

   ![connect-wallet](/img/staking-connect-wallet-request.png)

- The button will change to **"Your Wallet Address"** when the connection is successful.

   ![collect-wallet-success](/img/staking-connect-wallet-success.png)


**Create Fungible Token**

- Click on **"Create Token"** button to create new Fungible Token.

   ![collect-wallet-success](/img/staking-create-token-button.png)

- The Create Token Popup modal will be appear with prefilled Token name in Form. (You can Modify the Token name)

   ![create-collection-form](/img/staking-create-token-form.png)

- Now you need **TOKEN Seed** for create the new Token. 

- If you Don't have **TOKEN Seed** then please follow this [steps](#step-2---getting-token-seed) to get it.

- Open you Portkey Wallet and you will find the **TOKEN Symbol** on **NFT** Tab.

  ![portkey-token-seed-1.png](/img/staking-portkey-tone-seed-1.png) 
  ![portkey-token-seed-2.png](/img/staking-portkey-tone-seed-2.png) 

- Copy the **Token Symbol** and use it on **`Symbol`** field of Form Submission of Create Token.
- Fill other Necessary like **`Total Supply`**.

  ![staking-create-token-form-button](/img/staking-create-token-form-button.png)

- Click on **Create Token** Button.

- You will get Transaction Request on your Portkey Wallet so **Sign In** the Transaction.

  ![staking-create-token-request](/img/staking-create-token-request.png)
  
- After **Sign In** the Transaction, You will get successful transaction notification.

  ![staking-create-token-success](/img/staking-create-token-success.png)
   
- Now your Transaction will be Validating on aelf blockchain so wait for few minuts. it will take approx 2-3 minutes to complete this validation. 

  ![staking-create-token-validating](/img/staking-create-token-validating.png)

- After Successful Validate your transaction, you will get new **Sign In** Transaction request on Portkey for **Create Token On Side Chain**.

- Click on **Approve** button and wait for the complete the Transaction.

  ![staking-create-token-sidechain-request](/img/staking-create-token-sidechain-request.png)

- After **Created Token on Sidechain** Successfully, you will get new **Sign In** Transaction request on Portkey for **Issue Token On Side Chain**.

- Click on **Approve** button and wait for the complete the Transaction.

  ![staking-issue-token-request](/img/staking-issue-token-request.png)

- After **Issued Token on Sidechain** Successfully, you will get new **Sign In** Transaction request on Portkey for **Transfer $TOKEN to Staking Contract for Reward Balance**.

- Click on **Approve** button and wait for the complete the Transaction.

  ![staking-token-transfer-reward-request](/img/staking-token-transfer-reward-request.png)

- After **Transfer Reward Token** Successfully, you will get last  **Sign In** Transaction request on Portkey for **Staking Contract Initializing**.

- Click on **Approve** button and wait for the complete the Transaction.

  ![staking-contract-initialize-request](/img/staking-contract-initialize-request.png)

- You will get successfull transaction notification and Now you will be also able to see **Token balance** on Staking Widget like below.

  ![staking-contract-initialize-success](/img/staking-contract-initialize-success.png)

---

**Stake Tokens**

- Enter the Amount for Stake the Tokens and Click on **Stake $TOKEN** Button. 

  ![staking-form-button](/img/staking-form-button.png)

- You will get the **$TOKEN Transfer amount to staking contract** Transaction Request on your Portkey Wallet.
- Click on **Sign** Button. 

  ![staking-deposite-amount-request](/img/staking-deposite-amount-request.png)

- Now You will get the another Transaction request for **Deposit $TOKEN on staking contract** (For store the deposit records) on your Portkey Wallet.
- Click on **Sign** Button. 

  ![stake-token-on-smart-contract-request](/img/stake-token-on-smart-contract-request.png)

- You will get notification of **$TOKEN Staked Succesfully** Trasanction and your **Token balance** will be updated.

  ![stake-amount-success](/img/stake-amount-success.png)

As we completed all necessary steps for the Stake Token, now it's time to withdraw the Tokens.

- There are two ways to withdraw Stake amount.

1. **Emergency Withdraw Token** : User can withdraw stake tokens at anytime before Lock time period. 
2. **Withdraw Token** : User can withdraw staked tokens once the lock time period is over.

Let's do **Emergency Withdraw Token** on next Stap.

--- 

**Emergency Withdraw Tokens**

- After Staked Token, You will be get Staked Token Entry on **Staked $TOKEN** Section like below.
- Click on **Emergency Withdraw** Button.

 ![staked-amount-entry](/img/staked-amount-entry.png)

- Now, You will get the transaction request on Portkey Wallet.

 ![staking-emergency-withdraw-request](/img/staking-emergency-withdraw-request.png)

- You will get the Staked amount back without get any rewards and your Token balance will be updated.

 ![post-emergency-withdrawal](/img/staking-post-emergency-withdrawal.png)

As we have completed **Emergency Withdraw Tokens** Functioanlity so now it's time to try **Withdraw Token** Functionality.

--- 

**Withdraw Token**

- First You needs to Stake Tokens on contract as we already completed on **Stake Tokens** step.

- You need to wait till the lock time period is over for Staked Amount **(1 Hour)**.

- After **1 Hour**, You will be able to see your Staked amount in **Available to Withdraw $TOKEN** section as like Below.

- Click on **Withdraw** button to withdraw the Amount with **Rewads (1.1x Tokens)**.

 ![staking-available-withdraw-entery](/img/staking-available-withdraw-entery.png)

- Now, You will get the transaction request on Portkey Wallet for Withdraw the Staked Amount.

- Click on **Sign** request Button.

- Your $TOKEN will be successfully withdraw in your wallet with Rewards.

 ![staking-withdraw-stake-success](/img/staking-withdraw-stake-success.png)

:::success
🎉 Congratulations Learners! You have successfully built your Staking dApp and this is no mean feat!
:::

## 🎯 Conclusion

🎊 Congratulations on setting up your development environment and interacting with both the multi-token and staking smart contracts! 🎊 You've now built a solid foundation for handling advanced token operations and staking functionalities on the aelf blockchain. 🌟

**📚 What You've Learned**

Throughout this section, you've gained vital skills in:

  - **🛠️ Setting Up Your Development Environment**: You installed essential tools like the .NET SDK, aelf contract templates, and the aelf deploy tool to prepare for smart contract development.

  - **📦 Installing Node.js, Yarn, and aelf-command**: These tools enable efficient interaction with the aelf blockchain, facilitating wallet creation and transaction management.

  - **💡 Getting TOKEN Seed**: You learned how to obtain a TOKEN seed from the faucet, a fundamental step in creating fungible tokens.

  - **🔧 Configuring Frontend Integration**: You set up a frontend that interacts with both the multi-token and staking contracts, enabling user-friendly functionality in your dApp.

  - **🔗 Smart Contract Interaction:**: You successfully integrated with aelf’s multi-token contract and staking contract, setting up functions like token creation, token issuance, staking deposits, and withdrawals.

**🔍 Final Output**

By now, you should have:

  - 📜 Successfully set up your development environment and installed all required packages.

  - 💻 Configured your frontend to interact with both the multi-token and staking smart contracts, enabling functionalities like creating tokens, issuing them, staking, and withdrawing tokens.

**➡️ What's Next?**

With a comprehensive understanding of token creation, staking, and contract interaction, you're prepared to explore further aspects of blockchain development. Consider diving into:

  - **📊 Advanced Smart Contract Logic**: Add more complex features and security to your contracts.

  - **Enhanced Staking Protocols**: Learn about advanced staking mechanisms and rewards structures to elevate your dApp.

  - **🌐 Cross-Chain Interoperability**: Explore how aelf’s cross-chain capabilities enable seamless communication between different blockchains.

Keep experimenting and innovating with aelf! Your journey into decentralized finance and blockchain development is just getting started. 🚀

Happy coding and building on the aelf blockchain! 😊

