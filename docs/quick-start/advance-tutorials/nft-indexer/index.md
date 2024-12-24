---
sidebar_position: 1
title: NFT AeIndexer
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
    public string NftImageUri { get; set; }
    public string NftAttributes { get; set; }
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
using System;
using System.Threading.Tasks;
using AElf.Sdk.Network.Events;
using AElf.Types;
using AElf.Contracts.Account.Dto;
using AElf.Contracts.Token;
using AElf.Contracts.Token.Dto;
using AElf.Contracts.Account;
using AElf.Contracts.Account.Entity;
using AElf.Sdk.Service;
using Microsoft.Extensions.Logging;
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

        Logger.LogDebug("TokenInfo response: {@TokenInfo}", tokenInfo);

        if (account == null)
        {
            account = new Account
            {
                Id = accountId,
                Symbol = symbol,
                Amount = amount,
                Address = address,
                TokenName = tokenInfo.TokenName,
                NftImageUri = tokenInfo.ExternalInfo?.Value["__nft_image_uri"] ?? tokenInfo.ExternalInfo?.Value["__nft_image_url"],
                NftAttributes = tokenInfo.ExternalInfo?.Value["__nft_attributes"]
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
    public string TokenName { get; set; }
    public string NftImageUri { get; set; }
    public string NftAttributes { get; set; }
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
  
  Modify src/nftIndexer/nftIndexerAutoMapperProfile.cs and add entity mapping code.

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
  2. DLL file location: src/nftIndexer/bin/Release/net8.0/nftIndexer.dll
<!-- ![deploy-2](./token-aeindexer/img/deploy-2.png) -->
- Click the deploy button to submit deployment information. When the normal processing block information appears on the Logs page at the bottom of the details page, it means that the deployment has been successful and data indexing has started.
<!-- ![log](./token-aeindexer/img/log.png) -->

## Step 5 - Query indexed data
Through the Playground page below the details page, you can use GraphQL syntax to query the indexed data information. Enter the query statement on the left, and the query results will be displayed on the right.

```GraphQL
query{
    account(input: { chainId: "tDVW", address: "2AaBGTi2cJLWtEXR7w96hzun4qVz2KnsGZ1XfqErhKTgDj9Q8x"}) {
        symbol,
        amount,
        address,
        tokenName,
        nftImageUri,
        nftAttributes,
        metadata {
          chainId,
          block {
            blockHeight
          }
        }
      }
}
