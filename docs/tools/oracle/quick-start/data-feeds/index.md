---
sidebar_position: 1
---

# DataFeeds

AetherLink Datafeeds provide decentralized, real-time data from multiple sources, enabling smart contracts to access highly reliable and accurate off-chain information, such as asset prices, for secure decision-making in decentralized applications.

## 1. Preparation

### 1.1 Import proto

First, you need to import oracle-related proto files into your contract project. You can find the latest proto files through the following link:

- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/oracle_common_message.proto
- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/oracle_contract.proto
- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/request_interface.proto
- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/data_feeds_coordinator_contract.proto
- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/coordinator_contract.proto

### 1.2 Protobuf file

Then you also need to introduce request_interface.proto in the proto file to inherit the oracle callback function to receive the oracle report

```protobuf
syntax = "proto3";

package demo;

import "aelf/core.proto";
import "aelf/options.proto";
import "acs12.proto";
import "request_interface.proto";

// import for using the google.protobuf.* type.
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "google/protobuf/timestamp.proto";

// The namespace of this class
option csharp_namespace = "AElf.Contracts.DataFeedsDemo";

service DataFeedsDemoContract {
  // The name of the state class the smart contract is going to use to access blockchain state
  option (aelf.base) = "acs12.proto";
  option (aelf.base) = "request_interface.proto";
  option (aelf.csharp_state) = "AetherLink.Contracts.DataFeedsDemo.DataFeedsDemoContractState";

  rpc Initialize (google.protobuf.Empty) returns (google.protobuf.Empty) {}
  rpc StartPriceCollection (google.protobuf.Empty) returns (google.protobuf.Empty) {}
  rpc Purchase (PurchaseInput) returns (google.protobuf.Empty) {}
}

message LongList {
    repeated int64 data = 1;
}

message PriceData {
    int64 price = 1;
    string token_pair = 2;
    google.protobuf.Timestamp updated_at = 3;
}

message PurchaseInput {
  string token_symbol_to_buy = 1;
  int64 token_amount = 2;
  Price sell_price = 3;
}

message Price {
  aelf.Hash symbol = 1;
  int64 amount = 2;
}

// log event
message PriceUpdated {
    option (aelf.is_event) = true;
    int64 price = 1;
    string token_pair = 2;
    google.protobuf.Timestamp update_at = 3;
}
```

## 2. Getting Started

### 2.1 Background

Here, we will use the scenario of selling NFTs in a DeFi DApp as the background: NFTs are listed for sale on the platform, and they are priced in USDT. Users can choose to pay with ELF tokens. In this case, the contract needs to know the real-time ELF-USDT exchange rate. Therefore, an oracle task will be used to securely submit the exchange rate from off-chain to the on-chain DApp contract.

### 2.2 How to initiate a Datafeeds oracle request

First, you need to specify the Oracle contract and send a SendRequest transaction to the contract. The transaction input is constructed as follows:

```csharp
State.OracleContract.SendRequest.Send(new SendRequestInput
{
    SubscriptionId = SubscriptionId,
    RequestTypeIndex = 1,
    SpecificData = specificData,
    TraceId = XXXXX // HASH
});
```

- `OracleContract`: This is the target contract address, the oracle contract.
- `SendRequest`: This is the method name for sending the Datafeeds Request to the target contract.
- `SendRequestInput`: This is the input parameter of the method for sending transactions to the target contract

| Param Name       | Explanation                                                        |                             |
| ---------------- | ------------------------------------------------------------------ | --------------------------- |
| SubscriptionId   | manage the service fee based on this `subscription id`             | int32                       |
| RequestTypeIndex | Task Type                                                          | int32, 1=Datafeeds \| 2=VRF |
| SpecificData     | Detailed description of Datafeeds tasks                            | ByteString                  |
| TraceId          | This ID can be used as a unique index to manage your oracle tasks. | Aelf.Hash                   |

### 2.3 Why TraceId?

First, you need to understand that an oracle task is an asynchronous execution process that goes from off-chain to on-chain, back to off-chain, and is finally submitted on-chain by the oracle node. Therefore, you need to store the `traceId` as an index in the first transaction, and then match it with the information in the second transaction. Here, we add a `State` called `PriceDataMap` in the contract. You can use `traceId` as the unique identifier of the currency pair, and store the price of the currency pair as the value.

```csharp
using AElf.Contracts.DataFeedsDemo;
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AetherLink.Contracts.DataFeedsDemo;

public partial class DataFeedsDemoContractState : ContractState
{
// A state to check if contract is initialized
public BoolState Initialized { get; set; }
// A state to store the owner address
public SingletonState<Address> Owner { get; set; }
public MappedState<Hash, PriceData> PriceDataMap { get; set; }
}
```

### 2.4 How to generate DataFeeds SpecificData

Here we take the example of collecting ELF-USTD currency price pairs every 1 minutes.

```json
{
  "Cron": "0 _/1 _ * _ ?",
  "DataFeedsJobSpec": {
    "Type": "PriceFeeds",
    "CurrencyPair": "ELF/USDT"
  }
}
```

After determining the task description, you need to convert it into a bystring type and then put it into the input parameter of the oracle request.

```csharp
private const long ELFUSDTInitPrice = 600000000;
private const long SGRUSDTInitPrice = 600000000;
private const string ELFUSDTTokenPair = "ELF/USDT";
private const string SGRUSDTTokenPair = "SGR/USDT";
private const string ELFUSDTJobSpec = "{\"Cron\": \"0 _/1 \* \* _ ?\",\"DataFeedsJobSpec\": {\"Type\": \"PriceFeeds\",\"CurrencyPair\": \"ELF/USDT\"}}";
private const string SGRUSDTJobSpec = "{\"Cron\": \"0 \_/1 \* \* \* ?\",\"DataFeedsJobSpec\": {\"Type\": \"PriceFeeds\",\"CurrencyPair\": \"SGR/USDT\"}}";

public override Empty StartPriceCollection(Empty input)
{
#region Start elf-usdt price request

    {
        var elfSpecData = new AetherLink.Contracts.DataFeeds.Coordinator.SpecificData
        {
            Data = ByteString.CopyFromUtf8(ELFUSDTJobSpec),
            DataVersion = 0
        }.ToByteString();
        var elfPriceRequestInput = new SendRequestInput
        {
            SubscriptionId = SubscriptionId,
            RequestTypeIndex = RequestTypeIndex,
            SpecificData = elfSpecData
        };
        var elfTraceId = HashHelper.ComputeFrom(elfPriceRequestInput);
        elfPriceRequestInput.TraceId = elfTraceId;
        State.OracleContract.SendRequest.Send(elfPriceRequestInput);
        State.PriceDataMap[elfTraceId] = new() { Price = ELFUSDTInitPrice, TokenPair = ELFUSDTTokenPair };
    }

    #endregion

    #region Start sgr-usdt price request

    {
        var sgrSpecData = new AetherLink.Contracts.DataFeeds.Coordinator.SpecificData
        {
            Data = ByteString.CopyFromUtf8(SGRUSDTJobSpec),
            DataVersion = 0
        }.ToByteString();
        var sgrPriceRequestInput = new SendRequestInput
        {
            SubscriptionId = SubscriptionId,
            RequestTypeIndex = RequestTypeIndex,
            SpecificData = sgrSpecData
        };
        var sgrTraceId = HashHelper.ComputeFrom(sgrPriceRequestInput);
        sgrPriceRequestInput.TraceId = sgrTraceId;
        State.OracleContract.SendRequest.Send(sgrPriceRequestInput);
        State.PriceDataMap[sgrTraceId] = new() { Price = SGRUSDTInitPrice, TokenPair = SGRUSDTTokenPair };
    }

    #endregion

    return new Empty();
}
```

### 2.5 How to handle oracle pricefeeds callbacks

Here you need to override the HandleOracleFulfillment method

```csharp
public override Empty HandleOracleFulfillment(HandleOracleFulfillmentInput input)
{
if (input.Response.IsNullOrEmpty()) return new Empty();
if (input.TraceId == null || State.PriceDataMap[input.TraceId] == null) return new Empty();
var priceList = LongList.Parser.ParseFrom(input.Response);
var longList = new LongList { Data = { priceList.Data } };
var sortedList = longList.Data.ToList().OrderBy(l => l).ToList();
var latestPrice = sortedList[sortedList.Count / 2];
State.PriceDataMap[input.TraceId].Price = latestPrice;

    Context.Fire(new PriceUpdated
    {
        Price = latestPrice,
        TokenPair = State.PriceDataMap[input.TraceId].TokenPair,
        UpdateAt = Context.CurrentBlockTime
    });

    return new Empty();
}
```

### 2.6 How to use coin price

The price is calculated by dividing the USDT price of the NFT by the ELF/USDT currency pair, that is, the number of ELF Tokens required to be paid.

```csharp
public override Empty Purchase(PurchaseInput input)
{
// The price of NFT assets, assuming it is 10U
var price = State.NftPrice.Value;

    // Receive ELF paid by the buyer
    State.TokenContract.TransferFrom.Send(new TransferFromInput
    {
        From = Context.Sender,
        To = Context.Self,
        Symbol = ELFPaymentTokenName,
        // 10 / 0.033 = 10U / (1U / 30ELF)
        Amount = price.Amount.Div(State.PriceDataMap[price.Symbol].Price)
    });

    // Transfer NFT assets to buyers
    State.TokenContract.Transfer.Send(new TransferInput
    {
        To = Context.Sender,
        Symbol = input.TokenSymbolToBuy,
        Amount = input.TokenAmount
    });

    return new Empty();
}
```

### 2.7 Complete code

You can get the complete contract code from github: https://github.com/AetherLinkProject/aetherLink-contracts/tree/feature/aetherlink-datafeeds-demo/contract/AetherLink.Contracts.DataFeedsDemo

```csharp
using System.Linq;
using AElf;
using AElf.Contracts.DataFeedsDemo;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AElf.Types;
using AetherLink.Contracts.Consumer;
using AetherLink.Contracts.Oracle;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AetherLink.Contracts.DataFeedsDemo;

public class DataFeedsDemoContract : DataFeedsDemoContractContainer.DataFeedsDemoContractBase
{
private const long ELFUSDTInitPrice = 600000000;
private const long SGRUSDTInitPrice = 600000000;
private const string ELFUSDTTokenPair = "ELF/USDT";
private const string SGRUSDTTokenPair = "SGR/USDT";
private const string ELFPaymentTokenName = "ELF";
private const long SubscriptionId = 1; // input your subscriptionId
private const int RequestTypeIndex = 1;

    private const string
        OracleContractAddress = "21Fh7yog1B741yioZhNAFbs3byJ97jvBmbGAPPZKZpHHog5aEg"; // tDVW oracle contract address

    private const string ELFUSDTJobSpec =
        "{\"Cron\": \"0 */1 * * * ?\",\"DataFeedsJobSpec\": {\"Type\": \"PriceFeeds\",\"CurrencyPair\": \"ELF/USDT\"}}";

    private const string SGRUSDTJobSpec =
        "{\"Cron\": \"0 */1 * * * ?\",\"DataFeedsJobSpec\": {\"Type\": \"PriceFeeds\",\"CurrencyPair\": \"SGR/USDT\"}}";

    // Initializes the contract
    public override Empty Initialize(Empty input)
    {
        Assert(State.Initialized.Value == false, "Already initialized.");
        State.Initialized.Value = true;
        State.TokenContract.Value = Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
        State.OracleContract.Value = Address.FromBase58(OracleContractAddress);
        return new Empty();
    }

    public override Empty StartPriceCollection(Empty input)
    {
        #region Start elf-usdt price request

        {
            var elfSpecData = new AetherLink.Contracts.DataFeeds.Coordinator.SpecificData
            {
                Data = ByteString.CopyFromUtf8(ELFUSDTJobSpec),
                DataVersion = 0
            }.ToByteString();
            var elfPriceRequestInput = new SendRequestInput
            {
                SubscriptionId = SubscriptionId,
                RequestTypeIndex = RequestTypeIndex,
                SpecificData = elfSpecData
            };
            var elfTraceId = HashHelper.ComputeFrom(elfPriceRequestInput);
            elfPriceRequestInput.TraceId = elfTraceId;
            State.OracleContract.SendRequest.Send(elfPriceRequestInput);
            State.PriceDataMap[elfTraceId] = new() { Price = ELFUSDTInitPrice, TokenPair = ELFUSDTTokenPair };
        }

        #endregion

        #region Start sgr-usdt price request

        {
            var sgrSpecData = new AetherLink.Contracts.DataFeeds.Coordinator.SpecificData
            {
                Data = ByteString.CopyFromUtf8(SGRUSDTJobSpec),
                DataVersion = 0
            }.ToByteString();
            var sgrPriceRequestInput = new SendRequestInput
            {
                SubscriptionId = SubscriptionId,
                RequestTypeIndex = RequestTypeIndex,
                SpecificData = sgrSpecData
            };
            var sgrTraceId = HashHelper.ComputeFrom(sgrPriceRequestInput);
            sgrPriceRequestInput.TraceId = sgrTraceId;
            State.OracleContract.SendRequest.Send(sgrPriceRequestInput);
            State.PriceDataMap[sgrTraceId] = new() { Price = SGRUSDTInitPrice, TokenPair = SGRUSDTTokenPair };
        }

        #endregion

        return new Empty();
    }

    public override Empty HandleOracleFulfillment(HandleOracleFulfillmentInput input)
    {
        if (input.Response.IsNullOrEmpty()) return new Empty();
        if (input.TraceId == null || State.PriceDataMap[input.TraceId] == null) return new Empty();
        var priceList = LongList.Parser.ParseFrom(input.Response);
        var longList = new LongList { Data = { priceList.Data } };
        var sortedList = longList.Data.ToList().OrderBy(l => l).ToList();
        var latestPrice = sortedList[sortedList.Count / 2];
        State.PriceDataMap[input.TraceId].Price = latestPrice;

        Context.Fire(new PriceUpdated
        {
            Price = latestPrice,
            TokenPair = State.PriceDataMap[input.TraceId].TokenPair,
            UpdateAt = Context.CurrentBlockTime
        });

        return new Empty();
    }

    // transfer nft
    public override Empty Purchase(PurchaseInput input)
    {
        // The price of NFT assets, assuming it is 10U
        var price = State.NftPrice.Value;

        // Receive ELF paid by the buyer
        State.TokenContract.TransferFrom.Send(new TransferFromInput
        {
            From = Context.Sender,
            To = Context.Self,
            Symbol = ELFPaymentTokenName,
            // 10 / 0.033 = 10U / (1U / 30ELF)
            Amount = price.Amount.Div(State.PriceDataMap[price.Symbol].Price)
        });

        // Transfer NFT assets to buyers
        State.TokenContract.Transfer.Send(new TransferInput
        {
            To = Context.Sender,
            Symbol = input.TokenSymbolToBuy,
            Amount = input.TokenAmount
        });

        return new Empty();
    }

}
```
