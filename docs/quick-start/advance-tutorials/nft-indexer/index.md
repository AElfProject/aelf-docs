---
sidebar_position: 1
title: NFT dApp
description: Advance featured AeIndexer application 
---
# NFT dApp with AeIndexer

**Description**: This application demonstrates how to maintain account balances and transfer records by indexing aelf's NFT issued data.

**Purpose**: Shows you how to create, develop, and deploy your own AeIndexer on AeFinder.

**Difficulty Level**: Easy

<div class="video-container">
<iframe src="https://www.youtube.com/embed/9amvWGMUBs0" title="AeFinder Demo: Use AeFinder to Index, Retrieve, and Manage data on aelf AI Blockchain" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Step 1 - Setting up your development environment
- Install [dotnet 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- Install IDE: Install your favorite IDE, such as: [VS Code](https://code.visualstudio.com/), [Visual Studio](https://visualstudio.microsoft.com/), [Rider](https://www.jetbrains.com/rider/), etc.

## Step 2 - Create AeIndexer in AeFinder
- Log in to the AeFinder website.
    TestNet: [https://test.aefinder.io/login](https://test.aefinder.io/login)

- Enter the AeIndexer Name and other information to create a NFT AeIndexer.
<!-- Commenting out missing image references -->
<!-- ![dashboard](./-nftindexer/img/dashboard.png) -->
<!-- ![create-app](./nft-aeindexer/img/create-app.png) -->

## Step 3 - Develop NFT AeIndexer

### Project Structure
The NFT AeIndexer project consists of the following key components:

```
nftIndexer/
├── Contracts/           # Contract interfaces
├── Entities/           # Data models
│   ├── Account.cs      # NFT account information
│   └── TransferRecord.cs # NFT transfer records
├── Processors/         # Event processors
│   └── NFTTransferredProcessor.cs # Handles NFT transfer events
└── GraphQL/           # GraphQL query definitions
```

### Core Components

#### 1. Entity Models

**Account.cs**
```csharp title="Account.cs"
public class Account: AeFinderEntity, IAeFinderEntity
{
    [Keyword] public string Address { get; set; }
    [Keyword] public string Symbol { get; set; }
    public long Amount { get; set; }
    public string TokenName { get; set; }
    public ExternalInfo ExternalInfo { get; set; }
}
```

**TransferRecord.cs**
```csharp title="TransferRecord.cs"
public class TransferRecord: AeFinderEntity, IAeFinderEntity
{
    [Keyword] public string Symbol { get; set; }
    [Keyword] public string ToAddress { get; set; }
    public long Amount { get; set; }
    [Text] public string Memo { get; set; }
}
```

#### 2. NFT Transfer Processor

The NFTTransferredProcessor handles NFT transfer events and updates account balances:

```csharp title="NFTTransferredProcessor.cs"
using AElf.Contracts.MultiToken;
using AeFinder.Sdk.Logging;
using AeFinder.Sdk.Processor;
using AeFinder.Sdk;
using nftIndexer.Entities;
using Volo.Abp.DependencyInjection;

namespace nftIndexer.Processors;

public class NFTTransferredProcessor : LogEventProcessorBase<Issued>, ITransientDependency
{
    private readonly IBlockChainService _blockChainService;

    public NFTTransferredProcessor(IBlockChainService blockChainService)
    {
        _blockChainService = blockChainService;
    }

    public override string GetContractAddress(string chainId)
    {
        return chainId switch
        {
            "AELF" => "JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE",
            "tDVW" => "ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx",
            _ => string.Empty
        };
    }

    public override async Task ProcessAsync(Issued logEvent, LogEventContext context)
    {
        if (!IsNftTransfer(logEvent))
        {
            return;
        }

        var tokenInfoParam = new GetTokenInfoInput
        {
            Symbol = logEvent.Symbol
        };
        Logger.LogDebug("Fetching TokenInfo: ChainId={0}, Address={1}, Symbol={2}", context.ChainId, GetContractAddress(context.ChainId), logEvent.Symbol);
        var contractAddress = GetContractAddress(context.ChainId);
        Logger.LogDebug("Contract Address resolved to: {0}", contractAddress);
        var tokenInfo = await _blockChainService.ViewContractAsync<TokenInfo>(
            context.ChainId, contractAddress,
            "GetTokenInfo", tokenInfoParam);

        Logger.LogDebug("TokenInfo response: {@TokenInfo}", tokenInfo);

        var nftTransfer = new TransferRecord
        {
            Id = $"{context.ChainId}-{context.Transaction.TransactionId}-{context.LogEvent.Index}",
            ToAddress = logEvent.To.ToBase58(),
            Symbol = logEvent.Symbol,
            Amount = logEvent.Amount,
            Memo = logEvent.Memo
        };
        await SaveEntityAsync(nftTransfer);

        await ChangeNFTBalanceAsync(context.ChainId, logEvent.To.ToBase58(), logEvent.Symbol, logEvent.Amount);
    }

    private async Task ChangeNFTBalanceAsync(string chainId, string address, string symbol, long amount)
    {
        var accountId = $"{chainId}-{address}-{symbol}";
        var account = await GetEntityAsync<Account>(accountId);
        var tokenInfoParam = new GetTokenInfoInput { Symbol = symbol };
        var contractAddress = GetContractAddress(chainId);
        var tokenInfo = await _blockChainService.ViewContractAsync<TokenInfo>(
            chainId, contractAddress,
            "GetTokenInfo", tokenInfoParam);

        if (account == null)
        {
            account = new Account
            {
                Id = accountId,
                Symbol = symbol,
                Amount = amount,
                Address = address,
                TokenName = tokenInfo.TokenName,
                ExternalInfo = tokenInfo.ExternalInfo
            };
        }
        else
        {
            account.Amount += amount;
        }

        Logger.LogDebug("NFT Balance changed: {0} {1} {2} {3}", account.Address, account.Symbol, account.Amount, account.TokenName);

        await SaveEntityAsync(account);
    }

    private bool IsNftTransfer(Issued logEvent)
    {
        return !string.IsNullOrEmpty(logEvent.Symbol) && logEvent.Symbol.Contains("-") &&
            logEvent.Amount > 0 &&
            logEvent.To != null && !string.IsNullOrEmpty(logEvent.To.ToBase58());
    }
}
```

- Add files `AccountDto.cs`, `TransferRecordDto.cs`, `GetAccountInput.cs`, `GetTransferRecordInput.cs` to the directory `src/nftIndexer/GraphQL`.

```csharp title="AccountDto.cs"
using AeFinder.Sdk.Dtos;

namespace nftIndexer.GraphQL;

public class AccountDto : AeFinderEntityDto
{
    public string Address { get; set; }
    public string Symbol { get; set; }
    public long Amount { get; set; }
}
```

```csharp title="TransferRecordDto.cs"
using AeFinder.Sdk.Dtos;

namespace nftIndexer.GraphQL;

public class TransferRecordDto : AeFinderEntityDto
{
    public string Symbol { get; set; }
    public string FromAddress { get; set; }
    public string ToAddress { get; set; }
    public long Amount { get; set; }
}
```

```csharp title="GetAccountInput.cs"
namespace nftIndexer.GraphQL;

public class GetAccountInput
{
    public string ChainId { get; set; }
    public string Address { get; set; }
    public string Symbol { get; set; }
}
```

```csharp title="GetTransferRecordInput.cs"
namespace nftIndexer.GraphQL;

public class GetTransferRecordInput
{
    public string ChainId { get; set; }
    public string Address { get; set; }
    public string Symbol { get; set; }
}
```

  - Modify `src/nftIndexer/GraphQL/Query.cs` to add query logic.

```csharp title="Query.cs"
using AeFinder.Sdk;
using GraphQL;
using nftIndexer.Entities;
using Volo.Abp.ObjectMapping;

namespace nftIndexer.GraphQL;

public class Query
{
    public static async Task<List<AccountDto>> Account(
        [FromServices] IReadOnlyRepository<Account> repository,
        [FromServices] IObjectMapper objectMapper,
        GetAccountInput input)
    {
        var queryable = await repository.GetQueryableAsync();
        
        queryable = queryable.Where(a => a.Metadata.ChainId == input.ChainId);
        
        if (!input.Address.IsNullOrWhiteSpace())
        {
            queryable = queryable.Where(a => a.Address == input.Address);
}
        
        if(!input.Symbol.IsNullOrWhiteSpace())
        {
            queryable = queryable.Where(a => a.Symbol == input.Symbol);
        }
        
        var accounts= queryable.OrderBy(o=>o.Metadata.Block.BlockHeight).ToList();

        return objectMapper.Map<List<Account>, List<AccountDto>>(accounts);
    }
    
    public static async Task<List<TransferRecordDto>> TransferRecord(
        [FromServices] IReadOnlyRepository<TransferRecord> repository,
        [FromServices] IObjectMapper objectMapper,
        GetTransferRecordInput input)
    {
        var queryable = await repository.GetQueryableAsync();
        
        queryable = queryable.Where(a => a.Metadata.ChainId == input.ChainId);
        
        if (!input.Address.IsNullOrWhiteSpace())
        {
            queryable = queryable.Where(a => a.ToAddress == input.Address);
        }
        
        if(!input.Symbol.IsNullOrWhiteSpace())
        {
            queryable = queryable.Where(a => a.Symbol == input.Symbol);
        }
        
        var accounts= queryable.OrderBy(o=>o.Metadata.Block.BlockHeight).ToList();

        return objectMapper.Map<List<TransferRecord>, List<TransferRecordDto>>(accounts);
    }
}
```

- Register log event processor

  Modify `src/nftIndexer/nftIndexerModule.cs` to register NFTTransferredProcessor.

```csharp title="nftIndexerModule.cs"
using AeFinder.Sdk.Processor;
using nftIndexer.GraphQL;
using nftIndexer.Processors;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.AutoMapper;
using Volo.Abp.Modularity;

namespace nftIndexer;

public class nftIndexerModule: AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpAutoMapperOptions>(options => { options.AddMaps<nftIndexerModule>(); });
        context.Services.AddSingleton<ISchema, AeIndexerSchema>();
        
        // Add your LogEventProcessor implementation.
        context.Services.AddSingleton<ILogEventProcessor, NFTTransferredProcessor>();
    }
}
```

- Add entity mapping
  
  Modify `src/nftIndexer/nftIndexerAutoMapperProfile.cs` and add entity mapping code.

```csharp title="nftIndexerAutoMapperProfile.cs"
using nftIndexer.Entities;
using nftIndexer.GraphQL;
using AutoMapper;

namespace nftIndexer;

public class nftIndexerAutoMapperProfile : Profile
{
    public nftIndexerAutoMapperProfile()
    {
        CreateMap<Account, AccountDto>();
        CreateMap<TransferRecord, TransferRecordDto>();
    }
}
```

### Building code
Use the following command in the code directory to compile the code.
```bash
dotnet build -c Release
```

## Step 4 - Deploy AeIndexer
- Open the AeIndexer details page and click Deploy.
<!-- ![deploy](./token-aeindexer/img/deploy.png) -->
- Fill out the subscription manifest and upload the DLL file.
1. Subscription manifest：
```json
{
  "subscriptionItems": [
    {
      "chainId": "tDVW",
      "startBlockNumber": 151018963,
      "onlyConfirmed": false,
      "transactions": [],
      "logEvents": [
        {
          "contractAddress": "ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx",
          "eventNames": [
            "Issued",
            "Issue"
          ]
        }
      ]
    }
  ]
}
```
  2. DLL file location: `src/nftIndexer/bin/Release/net8.0/nftIndexer.dll`
<!-- ![deploy-2](./token-aeindexer/img/deploy-2.png) -->
- Click the deploy button to submit deployment information. When the normal processing block information appears on the Logs page at the bottom of the details page, it means that the deployment has been successful and data indexing has started.
<!-- ![log](./token-aeindexer/img/log.png) -->

## Step 5 - Query indexed data
Through the Playground page below the details page, you can use GraphQL syntax to query the indexed data information. Enter the query statement on the left, and the query results will be displayed on the right.

```GraphQL
query {
  account(input: { 
    chainId: "tDVW", 
    address: "DStUjYn3fH1pbCtz614gQhTurrt4w2WgUY7w8ymzXCggedDHb"
  }) {
    symbol,
    amount,
    address,
    metadata {
      chainId,
      block {
        blockHeight
      }
    }
  }
}
```

## Step 6 - Getting NFT Seed

In order to create an NFT collection on the aelf blockchain, the deployer wallet must have an **NFT SEED**.

- Visit [NFT Faucet](https://faucet-ui.aelf.dev/) to get your NFT SEED.

---

![result](/img/Seed.png)

- After the request is successfully processed, the requestor wallet will receive the **SEED**.

---

![result](/img/symbol.png)

---

- Please note this **SEED** symbol value, as it will be needed later while creating the NFT collection and NFT generation. This will become our **Token Symbol**.


## Step 7 - Interact with Smart Contract through frontend dApp

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
cd aelf-samples/advance/nft/2-dapp
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
```bash title="Command Prompt"
npm install
```
</TabItem>
</Tabs>

We are now ready to build the frontend components of our NFT dApp.

### Configure Portkey Provider & Write Connect Wallet Function

We'll set up our Portkey provider to allow users to connect their Portkey wallets to our app and interact with the aelf smart contracts. We'll be interacting with the already deployed multi-token contract for this tutorial.

**Step 1. Locate the File:**

- Go to the `src/hooks/useNFTSmartContract.ts` file.

**Step 2. Fetch the Smart Contract:**

- Find the comment `//Step A - Function to fetch a smart contract based on the chain symbol and the contract address.`

- Replace the existing **`fetchContract`** function with this updated code:

```javascript title="useNFTSmartContract.ts"
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
  - **Error Handling** : If an error occurs, it logs the error to the console.

**Step 3. Initialize and Fetch the Smart Contracts:**

- Find the comment `// Step B - Effect hook to initialize and fetch the smart contracts when the provider changes.`

- Replace the existing **`useEffect`** hook with this updated code:

```javascript title="useNFTSmartContract.ts"
// Step B -  Effect hook to initialize and fetch the smart contracts when the provider changes
  useEffect(() => {
    (async () => {
      // Fetch the MainChain Testnet Contract
      const mainChainContract = await fetchContract(
        "AELF",
        "JRmBduh4nXWi1aXgdUsj5gJrzeZb2LxmrAbf7W99faZSvoAaE"
      );
      setMainChainSmartContract(mainChainContract as IContract);

      // Fetch the dAppChain Testnet Contract
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
  - **Fetch Contracts** : It fetches and sets the smart contracts for the main chain, side chain, and cross chain.
    - **MainChain Contract** : Fetches the MainChain Testnet Contract and sets it in the state.
    - **dAppChain Contract** : Fetches the dAppChain Testnet Contract and sets it in the state.

By following these steps, we'll configure the Portkey provider to connect users' wallets to your app and interact with the multi-token smart contract including NFT related functionalities. This setup will enable our frontend components to perform actions like `create NFTs`, `validate NFTs`, and `transfer NFTs`.

### Configure Connect Wallet Function

**Step 1: Locate the File**

- Go to the `src/components/layout/header/index.tsx` file.

**Step 2: Write the Connect Wallet Function**

- The `header/index.tsx` file is the header of our NFT dApp. It allows users to connect their Portkey wallet with the NFT dApp.

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

### Configure Create NFT Form Code

**Step 1: Locate the File**

1. Go to the `src/pages/create-nft/index.tsx` file. This file is the **Create NFTs** page where users can enter details like the `tokenName`, `symbol`, `totalSupply` and `decimals`.

**Step 2: Prepare Form to Create NFTs**

1.  Find the comment `// Step D - Configure NFT Form`.

2.  Replace the form variable with this code snippet:

```javascript title="create-nft/index.tsx"
// Step D - Configure NFT Form
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    tokenName: "",
    symbol: "",
    totalSupply: "",
    decimals: "",
  },
});
```

#### Here's what the function does:

1. Initializes a new form variable with default values needed to create a nft.

2. Fields include: `tokenName` , `symbol` , `totalSupply` , and `decimals`.

Now the form is ready for users to fill in the necessary details for their NFT function interaction.

### Create NFT Collection

Let's write the functions to `Create New NFT Collection` on the aelf mainchain and the dAppChain.

**Step 1: Write the function to `Create New NFT Collection` on the MainChain**

- The `create-nft/index.tsx` file includes the code to create NFTs. It allows users to create new NFTs.

- Find the comment `// step 1 - Create New NFT Collection on the mainchain`.

- Replace the existing **`createNftCollectionOnMainChain`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step - 1 Create New NFT Collection on the mainchain
const createNftCollectionOnMainChain = async (
  values: z.infer<typeof formSchema>
): Promise<INftInput | "error"> => {
  let createLoadingId;
  try {
    createLoadingId = toast.loading("Creating NFT Collection..");

    // Create an object with the necessary information for the new NFT collection.
    const createNtfInput: INftInput = {
      tokenName: values.tokenName, // Name of the nft Collection
      symbol: values.symbol, // Symbol of the token (You have to get it from your PortKey wallet on NFT seed from NFT section)
      totalSupply: values.totalSupply, // Total supply of the token
      decimals: values.decimals, // Decimals of the token
      issuer: currentWalletAddress, // Address of the token issuer
      isBurnable: true, // Indicates if the token can be burned
      issueChainId: sidechain_from_chain_id, // ID of the issuing chain
      owner: currentWalletAddress, // Owner's wallet address
    };

    // Call the smart contract method to create the new NFT collection on the main chain.
    const result = await mainChainSmartContract?.callSendMethod(
      "Create",
      currentWalletAddress,
      createNtfInput
    );

    // Log the result of the creation for debugging purposes.
    console.log("========= result of createNewNft =========", result);

    toast.update(createLoadingId, {
      render: "NFT Collection Created Successfully On MainChain",
      type: "success",
      isLoading: false,
    });
    removeNotification(createLoadingId);

    // Return the input data for further use.
    return createNtfInput;
  } catch (error) {
    handleError(createLoadingId as number, error);
    return "error";
  }
};
```

:::tip
ℹ️ Note: You need to get **symbol** from the Portkey wallet.
:::

- **Follow Steps to get NFT symbol from Portkey Wallet:**

  - Open Portkey Wallet.
  - Go to the NFTs tab.
  - You will find the SEED that you already got from the above **seed generation** step.
  - Click on the SEED to see details.
  - You will find the **Token Symbol** inside the **Token Creation via This Seed** section.
  - Copy and use that value of the token symbol.

#### What This Function Does:

1. **Creates an Object with NFT Details** : It prepares the data needed to create a new NFT collection.

2. **Calls Smart Contract Method** : It interacts with the blockchain smart contract to create the new NFT collection using the prepared data.

3. **Logs Information** : It logs the result for debugging purposes.

4. **Return Values of Object** : It returns necessary values as a object.

Next, we'll write the **Validate Collection Info Exist** function.

**Step 2: Write the validates collection info exist function**

- Scroll up to find the comment `// step 2 - Validate Collection information exist`.

- Replace the existing **`validateNftCollectionInfo`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 2 - Validate Collection information exist
// This function validates if the token collection information already exists on the main blockchain.
const validateNftCollectionInfo = async (
  values: INftInput
): Promise<ValidationResult | "error"> => {
  let validateLoadingId;
  try {
    // Start loading before initiating the transaction
    validateLoadingId = toast.loading(
      <CustomToast
        title="Transaction is getting validated on aelf blockchain. Please wait!"
        message="Validation means transaction runs through a consensus algorithm to be selected or rejected. Once the status changes, the process will complete. It usually takes some time in distributed systems."
      />
    );

    // Create an object with the necessary information for token validation.
    const validateInput: INftInput = {
      symbol: values.symbol, // Symbol of the token
      tokenName: values.tokenName, // Name of the token
      totalSupply: values.totalSupply, // Total supply of the token
      decimals: values.decimals, // Decimals of the token
      issuer: currentWalletAddress, // Address of the token issuer
      isBurnable: true, // Indicates if the token can be burned
      issueChainId: sidechain_from_chain_id, // ID of the issuing chain
      owner: currentWalletAddress, // Owner's wallet address
    };

    // Get mainnet contract
    const aelfTokenContract = await getTokenContract(aelf, wallet);

    // Prepare to sign the transaction using the contract method
    const signedTx =
      aelfTokenContract.ValidateTokenInfoExists.getSignedTx(validateInput);

    // Send the transaction using the signed transaction
    const { TransactionId: VALIDATE_TXID } = await aelf.chain.sendTransaction(
      signedTx
    );

    // Get the validation result
    let VALIDATE_TXRESULT = await aelf.chain.getTxResult(VALIDATE_TXID);

    // Wait until the latest index height is greater than or equal to the transaction block number
    let heightDone = false;

    while (!heightDone) {
      // Get the latest index height
      const sideIndexMainHeight = await GetParentChainHeight();
      if (Number(sideIndexMainHeight) >= VALIDATE_TXRESULT.Transaction.RefBlockNumber) {
        VALIDATE_TXRESULT = await aelf.chain.getTxResult(VALIDATE_TXID);
        heightDone = true;
      }
    }

    console.log("VALIDATE_TXRESULT", VALIDATE_TXRESULT);

    // Update the loading message
    toast.update(validateLoadingId, {
      render: "Validating Token Successfully Executed",
      type: "success",
      isLoading: false,
    });

    // Remove the loading message
    removeNotification(validateLoadingId);

    // Return necessary details
    return {
      transactionId: VALIDATE_TXID,
      signedTx: signedTx,
      BlockNumber: VALIDATE_TXRESULT.BlockNumber,
    };
  } catch (error) {
    handleError(validateLoadingId as number, error);
    return "error";
  }
};
```

#### What This Function Does:

1. **Creates an Object with Validate Collection Details** : It prepares the data needed to validate the token information.

2. **Calls Smart Contract Method** : It interacts with the multi-token smart contract method to check if the token information already exists using the prepared data.

3. **Return Values** : It returns necessary values as an object.

Next, we'll write the **Get the parent chain height** function.

**Step 3: Write the get the parent chain height function**

- Scroll up to find the comment `// Step 3: Get the parent chain height`.

- Replace the existing **`GetParentChainHeight`** function with the following code snippet:

```javascript title="create-nft/index.tsx"
// Step 3: Get the parent chain height
// This function fetches the current height of the parent blockchain.
const GetParentChainHeight = async () => {
  try {
    const tdvwCrossChainContract = await getCrossChainContract(tdvw, wallet);
    // Call the smart contract method to get the parent chain height.
    const result = await tdvwCrossChainContract.GetParentChainHeight.call()
    // Return the parent chain height if it exists, otherwise return an empty string.
    return result ? (result.value as string) : "";
  } catch (error) {
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

**Step 4: Write the fetch the merkle path function**

- Scroll up to find the comment `// step 4 - Fetch the merkle path by transaction Id`.

- Replace the existing **`getMerklePathByTxId`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 4 - Fetch the merkle path by transaction Id
const getMerklePathByTxId = async (aelf: AElf, txId: string) => {
  try {
    const { MerklePathNodes } = await aelf.chain.getMerklePathByTxId(txId);

    const formattedMerklePathNodes = MerklePathNodes.map(
      ({
        Hash,
        IsLeftChildNode,
      }: {
        Hash: string,
        IsLeftChildNode: boolean,
      }) => ({
        hash: Hash,
        isLeftChildNode: IsLeftChildNode,
      })
    );

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

4. **Handles Errors** : If an error occurs, it clears the transaction status and logs the error.

Next, we'll write the **Create a Collection on the cross-chain** function.

**Step 5: Write a function to create a collection on the side chain**

- Scroll up to find the comment `// step 5 - Create a collection on the dAppChain`.

- Replace the existing **`createCollectionOnSideChain`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 5 - Create a collection on the dAppChain
const createCollectionOnSideChain = async (
  transactionId: string,
  signedTx: string,
  BlockNumber: number
) => {
  let crossChainLoadingId;
  try {
    crossChainLoadingId = toast.loading(
      "Creating Collection on SideChain..."
    );

    const merklePath = await getMerklePathByTxId(aelf, transactionId);

    const tdvwTokenContract = await getTokenContract(tdvw, wallet);

    const CROSS_CHAIN_CREATE_TOKEN_PARAMS = {
      fromChainId: mainchain_from_chain_id,
      parentChainHeight: "" + BlockNumber,
      // @ts-ignore
      transactionBytes: Buffer.from(signedTx, "hex").toString("base64"),
      merklePath,
    };
    const signedTx2 =
      await tdvwTokenContract.CrossChainCreateToken.getSignedTx(
        CROSS_CHAIN_CREATE_TOKEN_PARAMS
      );

    let done = false;

    while (!done) {
      try {
        await delay(10000);
        const { TransactionId } = await tdvw.chain.sendTransaction(signedTx2);
        const txResult = await tdvw.chain.getTxResult(TransactionId);

        if (txResult.Status === "SUCCESS" || txResult.Status === "MINED") {
          done = true;
          setIsNftCollectionCreated(true);
          toast.update(crossChainLoadingId, {
            render: "Collection was Created Successfully On SideChain",
            type: "success",
            isLoading: false,
          });
          removeNotification(crossChainLoadingId);
          toast.info("You Can Create NFT now");
          setTransactionStatus(false);
        }
      } catch (err) {
        if ((err as { Error: string }).Error.includes("Cross chain verification failed.")) {
          console.log("Exit.");
          done = true;
        } else {
          console.error("An unexpected error occurred:", err);
        }
      }
    }
    return "success";
  } catch (error) {
    handleError(crossChainLoadingId as number, error);
    return "error";
  }
};
```

#### What This Function Does:

1. **Displays Loading Toast**: Shows a notification indicating the creation process of the collection on the dAppChain.

2. **Fetches Merkle Path**: Retrieves the merkle path using the provided transactionId.

3. **Prepares and Signs Transaction**: Constructs parameters for the cross-chain transaction and signs it.

4. **Sends Transaction and Checks Status**: Sends the signed transaction and polls for its status every 10 seconds. Updates the notification and state, if successful.

5. **Handles Errors**: Logs errors and returns "error" if something goes wrong.

6. **Final Return**: Returns "success" upon successful completion.

### Create NFT Token

**Step 1: Write a Function to create NFTs on the mainchain**

Now, let's write the create NFTs on mainchain function.

1. Scroll down to find the comment `// step 6 - Create an NFT on the mainchain`.

2. Replace the existing **`createNFTOnMainChain`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 6 - Create an NFT on the mainchain
const createNFTOnMainChain = async (values: INftParams) => {
  let createMainChainNFTLoadingId;

  try {
    createMainChainNFTLoadingId = toast.loading(
      "Creating NFT on MainChain..."
    );

    // Preparing Parameter for Create Function
    const createNtfMainChainInput = {
      tokenName: values.tokenName,
      symbol: values.symbol,
      totalSupply: values.totalSupply,
      issuer: currentWalletAddress,
      isBurnable: true,
      issueChainId: sidechain_from_chain_id,
      owner: currentWalletAddress,
      externalInfo: {},
    };

    const resultMainchain = await mainChainSmartContract?.callSendMethod(
      "Create",
      currentWalletAddress,
      createNtfMainChainInput
    );

    console.log(
      "========= result of createNewNft =========",
      resultMainchain
    );

    toast.update(createMainChainNFTLoadingId, {
      render: "NFT Created Successfully on MainChain",
      type: "success",
      isLoading: false,
    });
    removeNotification(createMainChainNFTLoadingId);

    return "success";
  } catch (error) {
    handleError(createMainChainNFTLoadingId as number, error);
    return "error";
  }
};
```

#### What this function does:

1. **Displays Loading Toast:** Shows a notification indicating the creation process of the NFT on the mainchain.

2. **Prepares Parameters:** Constructs input parameters for creating the NFT, including token details and the issuer's information.

3. **Calls Smart Contract:** Sends a request to the mainchain smart contract to create the NFT using the prepared parameters.

4. **Handles Success:** Updates the notification to show successful NFT creation.

5. **Handles Errors:** Displays an error message if the operation fails and logs the error.

6. **Final Return:** Returns `"success"` if the NFT is created successfully; otherwise, returns `"error"`.

**Step 2: Write the Function for Validate NFT Info Exist**

Now, let's write the Validate NFT Info Exist function.

1. Scroll down to find the comment `// step 7 - Validate an NFT token on the mainchain`.

2. Replace the existing **`validateNftToken`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 7 - Validate an NFT token on the maincgit stashhain
const validateNftToken = async (values: INftParams) => {
  let validateNFTLoadingId;
  try {
    // Start Loading before initiate the transaction
    validateNFTLoadingId = toast.loading(
      <CustomToast
        title="Transaction is getting validated on aelf blockchain. Please wait!"
        message="Validation means transaction runs through a consensus algorithm to be selected or rejected. Once the status changes process will complete. It usually takes some time in distributed systems."
      />
    );

    // Create an object with the necessary information for token validation.
    const validateInput = {
      symbol: values.symbol,
      tokenName: values.tokenName,
      totalSupply: values.totalSupply,
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

    // if dAppChain index has a MainChain height greater than validateTokenInfoExist's
    let heightDone = false;

    while (!heightDone) {
      // get latest index Hight
      const sideIndexMainHeight = await GetParentChainHeight();
      if (
        // check the latest index Hight is grater than or equal
        Number(sideIndexMainHeight) >= VALIDATE_TXRESULT.Transaction.RefBlockNumber
      ) {
        VALIDATE_TXRESULT = await aelf.chain.getTxResult(VALIDATE_TXID);
        heightDone = true;
      }
    }

    console.log(VALIDATE_TXRESULT, "VALIDATE_TXRESULT=====2");

    const merklePath = await getMerklePathByTxId(aelf, VALIDATE_TXID);

    toast.update(validateNFTLoadingId, {
      render: "Validating NFT Successfully Executed",
      type: "success",
      isLoading: false,
    });
    removeNotification(validateNFTLoadingId);

    // return necessary values
    return {
      parentChainHeight: VALIDATE_TXRESULT.BlockNumber,
      signedTx: signedTx,
      merklePath: merklePath,
    };
  } catch (error) {
    handleError(validateNFTLoadingId as number, error);
    return "error";
  }
};
```

#### Here's what the function does:

1. **Displays Loading Toast:** Shows a notification indicating that the NFT validation is in progress on the blockchain.

2. **Prepares Validation Input:** Constructs the input parameters needed for validating the NFT token.

3. **Gets Token Contract:** Retrieves the token contract instance from the MainChain.

4. **Signs and Sends Transaction:** Signs the transaction to validate the token info and sends it to the blockchain.

5. **Polls for Transaction Result:** Waits for the transaction result and ensures the transaction has reached the required block height.

6. **Fetches Merkle Path:** Retrieves the Merkle path for the validated transaction.

7. **Handles Success:** Updates the notification to show successful validation and returns necessary values.

8. **Handles Errors:** Logs errors and returns `"error"` if something goes wrong.

**Step 3: Write a Function for Create NFT on dAppChain**

Now, let's write the Create NFT on dAppChain function.

1. Scroll down to find the comment `// step 8 - Create a NFT on dAppChain`.

2. Replace the existing **`createNftTokenOnSideChain`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 8 - Create a NFT on dAppChain.
const createNftTokenOnSideChain = async (values: INftValidateResult) => {
  let createSideChainNFTLoadingId;
  try {
    createSideChainNFTLoadingId = toast.loading("Creating NFT on SideChain...");

    const CROSS_CHAIN_CREATE_TOKEN_PARAMS = {
      fromChainId: mainchain_from_chain_id,
      parentChainHeight: values.parentChainHeight,
      transactionBytes: Buffer.from(values.signedTx, "hex").toString("base64"),
      merklePath: values.merklePath,
    };

    await sideChainSmartContract?.callSendMethod(
      "CrossChainCreateToken",
      currentWalletAddress,
      CROSS_CHAIN_CREATE_TOKEN_PARAMS
    );

    toast.update(createSideChainNFTLoadingId, {
      render: "NFT Created Successfully On SideChain",
      type: "success",
      isLoading: false,
    });
    removeNotification(createSideChainNFTLoadingId);
    return "success";
  } catch (error) {
    handleError(createSideChainNFTLoadingId as number, error);
    return "error";
  }
};
```

#### Here's what the function does:

1. **Displays Loading Toast:** Shows a notification indicating that the NFT is being created on the dAppChain.

2. **Prepares Cross-Chain Transaction Parameters:** Constructs the parameters needed for creating the NFT on the dAppChain, including chain IDs, block height, transaction data, and Merkle path.

3. **Calls Smart Contract Method:** Sends the transaction to the dAppChain smart contract to create the NFT.

4. **Handles Success:** Updates the notification to show successful NFT creation on the dAppChain.

5. **Handles Errors:** Logs errors and returns `"error"` if something goes wrong.

**Step 4: Write a Function for Issue NFT Token which has been Created on dAppChain.**

Now, let's write the Issue NFT Function.

1. Scroll down to find the comment `// step 9 - Issue a NFT Function which has been Created on dAppChain`.

2. Replace the existing **`issueNftOnSideChain`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 9 - Issue a NFT Function which has been Created on dAppChain
const issueNftOnSideChain = async (values: {
  symbol: string;
  amount: string;
  memo: string;
}) => {
  let issuingNFTLoadingId
  try {
    issuingNFTLoadingId = toast.loading(
      "Issuing NFT on SideChain..."
    );
    const issueNftInput = {
      symbol: values.symbol,
      amount: values.amount,
      memo: values.memo,
      to: currentWalletAddress,
    };
    const result = await sideChainSmartContract?.callSendMethod(
      "Issue",
      currentWalletAddress,
      issueNftInput
    );
    console.log("========= result of createNewNft =========", result);

    toast.update(issuingNFTLoadingId, {
      render: "NFT Issue Successfully Executed",
      type: "success",
      isLoading: false,
    });
    removeNotification(issuingNFTLoadingId);
    toast.success("You will get NFT on your Wallet! It can take sometimes to get into your wallet");
    handleReturnClick();
    return "success";
  } catch (error) {
    handleError(issuingNFTLoadingId as number, error);
    setTransactionStatus(false);
    return "error";
  }
};
```

#### Here's what the function does:

1. **Displays Loading Toast:** Shows a notification indicating that the NFT is being issued on the dAppChain.

2. **Prepares Issuance Input:** Constructs the input parameters for issuing the NFT, including symbol, amount, memo, and recipient address.

3. **Calls Smart Contract Method:** Sends the transaction to the dAppChain smart contract to issue the NFT.

4. **Handles Success:** Updates the notification to show successful issuance and notifies the user that the NFT will appear in their wallet.

5. **Handles Errors:** Logs and displays any error messages, updates the transaction status, and returns `"error"`.

**Step 5: Create a Function to Call Necessary Functions for NFT Creation**

Now, let's write the createNftToken Function.

1. Scroll down to find the comment `// step 10 - Call Necessary Function for Create NFT`.

2. Replace the existing **`createNftToken`** function with this code snippet:

```javascript title="create-nft/index.tsx"
// step 10 - Call Necessary Function for Create NFT
const createNftToken = async (values: INftParams) => {
  try {
    const mainChainResult = await createNFTOnMainChain(values);

    if (mainChainResult === "error") {
      setTransactionStatus(false);
      return;
    }
    await delay(3000);

    const validateNFTData: INftValidateResult | "error" = await validateNftToken(values);

    if (validateNFTData === "error") {
      setTransactionStatus(false);
      return;
    }

    const sideChainResult = await createNftTokenOnSideChain(validateNFTData);

    if (sideChainResult === "error") {
      setTransactionStatus(false);
      return;
    }

    await issueNftOnSideChain({
      symbol: values.symbol,
      amount: values.totalSupply,
      memo: "We are issuing nftToken",
    });
    setTransactionStatus(false);
  } catch (error) {
    setTransactionStatus(false);
    if (error instanceof Error) {
      toast.error( error.message);
    } else {
      toast.error( "An unexpected error occurred.");
    }
    return "error";
  }
};
```

#### Here's what the function does:

1. **Creates NFT on MainChain:** Calls `createNFTOnMainChain` to create the NFT on the MainChain. If it fails, it updates the transaction status and exits.

2. **Validates NFT Token:** Waits for 3 seconds, then calls `validateNftToken` to validate the NFT. If validation fails, it updates the transaction status and exits.

3. **Creates NFT on dAppChain:** Calls `createNftTokenOnSideChain` to create the NFT on the dAppChain using the validated data. If it fails, it updates the transaction status and exits.

4. **Issues NFT on dAppChain:** Calls `issueNftOnSideChain` to issue the NFT. Updates the transaction status to false after completion.

5. **Handles Errors:** Catches and logs any errors, updates the transaction status, and displays an error notification.

### Configure Submit Form

Now, let's Write a Function to Call Necessary Functions for NFT Creation.

1. Scroll down to find the comment `// Step 11 - Handle Submit Form`.

2. Replace the existing **`onSubmit`** function with this code snippet:

```javascript title="create-nft/index.tsx"
//Step 11 - Handle Submit Form
const onSubmit = async (values: z.infer<typeof formSchema>) => {
  setTransactionStatus(true);

  if (isNftCollectionCreated) {
    // Already Collection Created
    // create NFT Token
    await createNftToken(values);
  } else {
    // create NFT Collection on MainChain
    const createResult = await createNftCollectionOnMainChain(values);

    if (createResult === "error") {
      setTransactionStatus(false);
      return;
    }
    // Validate NFT Collection
    const validateCollectionResult = await validateNftCollectionInfo(
      createResult
    );

    if (validateCollectionResult === "error") {
      setTransactionStatus(false);
      return;
    }

    // create NFT Collection on dAppChain
    await createCollectionOnSideChain(
      validateCollectionResult.transactionId,
      validateCollectionResult.signedTx,
      validateCollectionResult.BlockNumber
    );
  }
};
```

#### Here's what the function does:

1. **Starts Transaction:** Sets the transaction status to true.

2. **Checks NFT Collection Status:** If the NFT collection is already created, calls `createNftToken` to create the NFT token.

3. **Creates and Validates NFT Collection:** If the collection isn’t created, calls `createNftCollectionOnMainChain` to create it. If successful, validates the NFT collection with `validateNftCollectionInfo`.

4. **Creates Collection on dAppChain:** If validation is successful, calls `createCollectionOnSideChain` to create the collection on the dAppChain.

5. **Handles Errors:** Updates the transaction status to false and exits if any step fails.

### Fetch NFT Data

Let's write the Function for the fetch NFT data from user's Wallet using API.

**Step 1: Locate the File**

- go to the `src/lib/commonFunctions.ts` file.

**Step 2: Write the Helper Functions for fetch the NFT data**

- The `commonFunctions.ts` file is contains the helpers function for fetch NFT and etc.

- Find the comment `// fetch NFT Data from Indexer API`.

- Replace the existing **`fetchUserNftData`** function with this code snippet:

```javascript title="commonFunctions.ts"
// fetch NFT Data from Indexer API
export const fetchUserNftData = async (addres:string) => {

  const url = 'add_your_aeindexer_api';
  const headers = { 'Content-Type': 'application/json'};

  const body = JSON.stringify({
    query: `
      query {
        account(input: { chainId: "tDVW", address: "${addres}" }) {
          symbol
          amount
          address
          tokenName
          metadata {
            chainId
            block {
              blockHeight
            }
          }
        }
      }
    `,
    variables: {},
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data.account;
  } catch (error) {
    console.error('Error fetching data:', error);
    return "error";
  }
};
```

:::info

ℹ️ Note: Ensure that you are updating your aeindexer api with **"add_your_aeindexer_api"** value in **url** variable.

:::

#### Here's what the function does:

1. **Retrieves NFT Data:** The function `fetchUserNftData` fetches the NFT data for a given owner using AeIndexer API.


We have Prepared all necessary function for fetch NFT Data from User's Wallet.

Now, Let's call **`fetchUserNftData`** on necessary page.

**Step 3: Call fetchUserNftData Functions on Home Page**

- go to the `src/pages/home/index.tsx` file.

- The `home/index.tsx` file contains the Home Page of NFT dApp

- Find the comment `// get NFT Data from User's wallet`.

- Replace the existing **`getNFTData`** function with this code snippet:

```javascript title="home/index.tsx"
// get NFT Data from User's wallet
const getNFTData = async () => {
  const result = await fetchUserNftData(currentWalletAddress as string);
  if (result !== "error") {
    setUserNfts(result);
  }
  setLoading(false);
};
```

#### Here's what the function does:

1. **Fetches NFT Data:** The function `getNFTData` retrieves NFT data from the user's wallet.
2. **Calls Fetch Function:** It calls the `fetchUserNftData` function with the `currentWalletAddress` parameters.
3. **Handles Result:** It checks the result:
   - If the result is not "error", it updates the state with the fetched NFT data by calling `setUserNfts(result)`.
4. **Updates Loading State:** Regardless of the result, it sets the loading state to false by calling `setLoading(false)`.

**Step 4: Call fetchUserNftData Functions on Profile Page**

- go to the `src/pages/profile/index.tsx` file.

- The `profile/index.tsx` file contains the Home Page of NFT dApp

- Find the comment `// get NFT Data from User's wallet`.

- Replace the existing **`getNFTData`** function with this code snippet:

```javascript title="profile/index.tsx"
// get NFT Data from User's wallet
const getNFTData = async () => {
  const result = await fetchUserNftData(currentWalletAddress as string);
  if (result !== "error") {
    setUserNfts(result);
  }
  setLoading(false);
};
```

#### Here's what the function does:

1. **Fetches NFT Data:** The function `getNFTData` retrieves NFT data from the user's wallet.
2. **Calls Fetch Function:** It calls the `fetchUserNftData` function with the `currentWalletAddress` parameters.
3. **Handles Result:** It checks the result:
   - If the result is not "error", it updates the state with the fetched NFT data by calling `setUserNfts(result)`.
4. **Updates Loading State:** Regardless of the result, it sets the loading state to false by calling `setLoading(false)`.

### Transfer NFT Token

As we have completed `Create` and `Fetch NFT` so now it's time to `Transfer NFT`.

So now let's **Transfer NFT** to other wallet now.

**Step 1: Locate the File**

1. go to the `src/pages/transfer-nft/index.tsx` file. This file is the **Transfer NFT** page where users can enter details like the `address`, `amount` and `memo`.

**Step 2: Prepare Form for Transfer NFT**

1.  Find the comment `// Configure NFT Transfer Form`.

2.  Replace the form variable with this code snippet:

```javascript title="transfer-nft/index.tsx"
// Configure NFT Transfer Form
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    address: "",
    amount: "0",
    memo: "",
  },
});
```

#### Here's what the function does:

1. Initializes a new form variable with default values needed to transfer a nft.

2. Fields include: `address` , `amount` , and `memo`.

Now your form is ready for users to fill in the necessary details for their NFTs Transfer function Interaction.

**Step 3: Create NFT Transfer Function**

1.  Find the comment `// Transfer NFT to Other Wallet`.

2.  Replace the form variable with this code snippet:

```javascript title="transfer-nft/index.tsx"
// Transfer NFT to Other Wallet
const transferNftToOtherAccount = async (values: {
  address: string;
  amount: string;
  memo: string;
}) => {

  if (Number(values.amount) > Number(nftBalance)) {
    toast.error("Amount must be Less than or Equal to Supply Balance");
    return;
  }

  const transferNFTLoadingId = toast.loading("Transfer Transaction Executing");

  try {
    const transferNtfInput = {
      to: values.address,
      symbol: nftSymbol,
      amount: +values.amount,
      memo: values.memo,
    };

    await sideChainSmartContract?.callSendMethod(
      "Transfer",
      currentWalletAddress,
      transferNtfInput
    );

    toast.update(transferNFTLoadingId, {
      render: "NFT Transferred Successfully!",
      type: "success",
      isLoading: false,
    });
    removeNotification(transferNFTLoadingId);

    await delay(3000);

    handleReturnClick();
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unexpected error occurred.");
    }
  };
};
```

#### Here's what the function does:

1. **Transfers NFT to Another Wallet:** The function `transferNftToOtherAccount` transfers a specified amount of an NFT to another wallet.
2. **Parameters:** It takes a `values` object containing:
   - `address`: The destination wallet address.
   - `amount`: The amount of NFT to transfer.
   - `memo`: An optional memo for the transfer.
3. **Checks Balance:** It checks if the transfer amount is greater than the available `nftBalance`. If it is, it shows an error message and exits the function.
4. **Displays Loading Toast:** It displays a loading toast notification indicating that the transfer transaction is executing.
5. **Prepares Transfer Data:** It prepares the transfer data in the `transferNtfInput` object, which includes the destination address, NFT symbol, transfer amount, and memo.
6. **Executes Transfer:** It calls the `Transfer` method on the side chain smart contract to execute the transfer.
7. **Success Handling:** If the transfer is successful:
   - It updates the toast notification to indicate success.
   - It removes the loading notification.
   - It waits for 3 seconds using `await delay(3000)`.
   - It calls `handleReturnClick` to handle any post-transfer actions.
8. **Error Handling:** If an error occurs during the transfer:
   - It logs the error message to the console.
   - It displays an error toast notification with the error message.

**Step 4: Configure on handle Submit Form**

1.  Find the comment `// Handle Transfer Submit Form`.

2.  Replace the form variable with this code snippet:

```javascript title=""
// Handle Transfer Submit Form
function onSubmit(values: z.infer<typeof formSchema>) {
  transferNftToOtherAccount(values);
}
```

#### Here's what the function does:

1. **Handles Form Submission:** The function `onSubmit` handles the submission of a transfer form.
2. **Parameters:** It takes `values`, which is inferred from the `formSchema` and represents the form's data.
3. **Calls Transfer Function:** It calls the `transferNftToOtherAccount` function with the form values to initiate the NFT transfer.

Now that we've written all the necessary frontend functions and components, we're ready to run the NFT dApp application in the next step.

### Run Application

In this step, we will run the NFT dApp application.

- To begin, run the following command on your terminal.

```bash title="Terminal"
npm run dev
```

:::info

ℹ️ Note: Ensure that you are running this command under the **nft/2-dapp** folder.

:::

- You should observe the following as shown below.

  ![run-app-success](/img/vote-npm-run-console.png)

- Upon clicking on the **localhost URL**, you should be directed to the NFTs landing page as shown below.

:::tip
If you are developing and testing this with GitHub codespace, you can use Port Forward to test the web server that is running in codespace, here is the link on how to use Port forward for codespace https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace
:::

- Usually codespace will automatically forward port, you should see a pop-up message at the bottom right of your codespace browser window as shown in the diagram below:

  ![open-in-browser](/img/codespace-forwarded-port.png)

- Click the link to open the NFT dApp in the browser.

  ![nft-home-page](/img/nft-home-page.png)

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

  ![connect-wallet](/img/connect-wallet.png)

- The button will change to **"Your Wallet Address"** when the connection is successful.

  ![collect-wallet-success](/img/collect-wallet-success.png)

**Create NFT Collection**

- Click on **"Create NFT Collection"** button to create new NFT Collection.

  ![collect-wallet-success](/img/create-collection-button.png)

- You will be redirect this create NFT Collection page

  ![create-collection-form](/img/create-collection-form.png)

- Now you need **NFT Seed** for create the new collection.

- If you Don't have **NFT Seed** then please follow this [steps](#step-2---getting-nft-seed) to get it.

- Open you Portkey Wallet and you will find the **NFT Seed** on **NFT** Tab.

  ![portkey-nft-seed.png](/img/portkey-nft-seed.png)
  ![copy-nft-seed](/img/copy-nft-seed.png)

- Copy the **Token Symbol** and use it on **`Symbol`** field of Form Submission of Create Collection.
- Fill all other Necessary Fields like **`Token Name`** means `(Collection Name)`, **`Total Supply`**, **`Decimals`**.

  ![collection-form-example](/img/collection-form-example.png)

- Click on **Create Collection** Button.

- You will get Transaction Request on your Portkey Wallet so **Sign In** the Transaction.
  ![signin-transaction](/img/signin-transaction.png)
- After **Sign In** the Transaction, Please wait to complete these steps. It will take approx 3-4 minutes.
  - NFT Collection Created Successfully On MainChain.
  - Validating Token Successfully Executed.
  - Collection was Created Successfully On dAppChain.

**Create NFT Token**

- Once you done with create collection process the Now, It's time to Create NFT.

  ![create-nft-form](/img/create-nft-form.png)

:::info
Please make sure the Symbol will be change to `[your_symbol]-id`. ie `VARBFUXYTY-1`, `VARBFUXYTY-2`, `VARBFUXYTY-3` etc. It means you can only create Collection with id 0 like `VARBFUXYTY-0` and for NFT Token Please use another integer as a id in Symbol.
:::

- Fill all Necessary Fields in Create NFT Form like **`Token Name`** means `(Collection Name)`, **`Symbol`** means `(NFT Symbol)`, and **`Total Supply`**.

- Click on **Create NFT** Button.

- You will get Transaction Request on your Portkey Wallet so **Sign In** the Transaction for Create NFT as above you got for Create NFT Collection

- After **Sign In** the Transaction, Please wait to complete these steps. It will take approx 3-4 minutes.

  - NFT Created Successfully on MainChain.
  - Validating NFT Successfully Executed.
  - NFT Created Successfully On dAppChain.
  - You will get NFT on your Wallet! It can take sometimes to get into your wallet.

- After Successfully Create NFT, Now you redirected to Home page and as you can see you will get the NFT in your account. (It' take some time to store your NFT in your wallet so please reload the page multiple times till you get the NFT).

  ![home-nft-page](/img/home-nft-page.png)

- You will also able you access you NFT data on your **Profile Page**.

  ![profile-page](/img/profile-page.png)

**Transfer NFT Token**

- Once you get NFT in your account like above image then it's time to transfer NFT to another account.

- Please Click on **"Transfer NFT"** Button.

  ![transfer-button](/img/transfer-button.png)

- Now you will be redirected to **Transfer NFT page**.

- Please Fill all the Necessary Fields for Transfer NFT to another account like below image 👇.

  ![transfer-nft-page](/img/transfer-nft-page.png)

- Click on **Transfer NFT** button.

- Your NFT Transfer Successfully to another account.

:::success
🎉 Congratulations Learners! You have successfully built your NFT dApp and this is no mean feat!
:::

## 🎯 Conclusion

🎊 Congratulations on successfully setting up your development environment and interacting with your deployed smart contract! 🎊 You've laid a strong foundation for creating innovative applications on the aelf blockchain. 🌟

**📚 What You've Learned**

Throughout this section, you've acquired essential skills in:

- **🛠️ Setting Up Your Development Environment**: You installed necessary tools like the .NET SDK, aelf contract templates, and the aelf deploy tool to prepare for smart contract development.

- **📦 Installing Node.js, Yarn, and aelf-command**: These tools enable efficient interaction with the aelf blockchain, facilitating wallet creation and transaction management.

- **💡 Getting NFT Seed**: You learned how to obtain an NFT seed from the NFT Faucet, a critical step for creating NFT collections.

- **🔧 Configuring Frontend Integration**: You cloned a frontend project and configured it to connect with your smart contract, allowing for seamless user interaction with your dApp.

**🔍 Final Output**

By now, you should have:

- 📜 Successfully set up your development environment and installed all required packages.

- 💻 Configured your frontend to interact with the NFT smart contract, enabling functionalities like creating and transferring NFTs.

**➡️ What's Next?**

With a solid understanding of environment setup and contract interaction, you're ready to explore more advanced aspects of blockchain development. Consider delving into:

- **📊 Advanced Smart Contract Logic**: Enhance your contracts with complex features and security measures.

- **🔒 Security Protocols**: Implement robust security protocols to safeguard your applications and smart contracts.

- **🌐 Cross-Chain Interoperability**: Explore how aelf facilitates communication between different blockchains, broadening your development capabilities.

Keep pushing the boundaries of blockchain technology with aelf. Your journey is just beginning, and the potential for innovation in decentralized applications is vast. 🚀

Happy coding and building on the aelf blockchain! 😊
