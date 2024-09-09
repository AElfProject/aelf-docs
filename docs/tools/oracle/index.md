---
sidebar_position: 4
title: Oracle
description: Transfer tamper-proof data from off-chain to on-chain
---

## 1. Background

There is a growing need for decentralized applications (dApps) to access data feeds that are frequently updated, reliable, and secure. AetherLink Oracles is a leading oracle provider directly fulfilling this need.

## 2. Target

For developers of the AELF ecosystem, this article will provide a complete guide to accessing the AetherLink **VRF** and **Datafeeds** contracts.

## 3. Operational

### 3.1 Preparation

#### 3.1.1 Import proto

First, you need to import oracle-related proto files into your contract csproj file.

```xml
<ItemGroup>
    <CommonMessage Include="..\..\protobuf\oracle_common_message.proto">
        <Link>Protobuf\Proto\oracle_common_message.proto</Link>
    </CommonMessage>
</ItemGroup>
<ItemGroup>
    <ContractReference Include="..\..\protobuf\oracle_contract.proto">
        <Link>Protobuf\Proto\oracle_contract.proto</Link>
    </ContractReference>
</ItemGroup>
<ItemGroup>
    <ContractBase Include="..\..\protobuf\request_interface.proto">
        <Link>Protobuf\Proto\request_interface.proto</Link>
    </ContractBase>
</ItemGroup>
```

You can find the latest proto files through the following link:

- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/oracle_common_message.proto
- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/oracle_contract.proto
- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/request_interface.proto

#### 3.1.2 Protobuf file

Then you also need to introduce request_interface.proto in the proto file to inherit the oracle callback function to receive the oracle report

```protobuf
import "aelf/core.proto";
import "aelf/options.proto";
import "request_interface.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "google/protobuf/timestamp.proto";

service <YOUR CONTRACT NAME> {
        ...

    option (aelf.base) = "request_interface.proto";

        ...
```

#### 3.1.3 Set Oracle Address

Set the Oracle Contract Address in your contract state according to your operating environment.

- MainNet **AELF** Address : `BGhrBNTPcLccaxPv6hHJrn4CHHzeMovTsrkhFse5o2nwfvQyG`
- MainNet **tDVV** Address : `BGhrBNTPcLccaxPv6hHJrn4CHHzeMovTsrkhFse5o2nwfvQyG`
- TestNet **AELF** Address : `21Fh7yog1B741yioZhNAFbs3byJ97jvBmbGAPPZKZpHHog5aEg`
- TestNet **tDVW** Address : `21Fh7yog1B741yioZhNAFbs3byJ97jvBmbGAPPZKZpHHog5aEg`

#### 3.1.4 Apply subscription ID

Before initiating a task to the oracle, you need to contact AetherLink to apply for a subscription number for your task. Later, you can manage the service fee based on this subscription id.Remember that you only have the right to use your own `subscription id`.

:::note

If you have prepared all the above work, we will explain the VRF and Datafeeds scenarios separately. You need to choose the appropriate contract as the entry point for your development scenario

Currently, we provide two oracle capabilities:

- VRF: VRF provides cryptographically secure randomness for your blockchain-based applications.
- Datafeeds: Provide data sources for Web2 asset prices for contracts.

:::

### 3.2 DataFeeds

First, you need to define how to initiate a Datafeeds oracle request in the contract.

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
| SubscriptionId   | manage the service fee based on this subscription id               | int32                       |
| RequestTypeIndex | Task Type                                                          | int32, 1=Datafeeds \| 2=VRF |
| SpecificData     | Detailed description of Datafeeds tasks                            | ByteString                  |
| TraceId          | This ID can be used as a unique index to manage your oracle tasks. | Aelf.Hash                   |

#### 3.2.1 How to generate DataFeeds SpecificData

Here we take the example of collecting ELF-USTD currency price pairs every 10 minutes. Note the red part:

```json
{
  "Cron": "0 */10 * * * ?",
  "DataFeedsJobSpec": {
    "Type": "PriceFeeds",
    "CurrencyPair": "ELF/USDT"
  }
}
```

After determining the task description, you need to convert it into a bystring type and then put it into the input parameter of the oracle request.

```csharp
var jobSpec = "{\"Cron\": \"0 */10 * * * ?\",\"DataFeedsJobSpec\": {\"Type\": \"PriceFeeds\",\"CurrencyPair\": \"ELF/USDT\"}}";

var specificData = new AetherLink.Contracts.DataFeeds.Coordinator.SpecificData
{
    Data = ByteString.CopyFromUtf8(jobSpec),
    DataVersion = 0
}.ToByteString()

var sendRequestInput = new SendRequestInput
{
    SubscriptionId = 1,
    RequestTypeIndex = 1,
    SpecificData = specificData,
    TraceId = HhfWg...Y9kao31 // HASH
}
```

#### 3.2.2 How to handle oracle pricefeeds callbacks

Here you need to override the HandleOracleFulfillment method

```csharp
public override Empty HandleOracleFulfillment(HandleOracleFulfillmentInput input)
{
    ...

    var priceList = LongList.Parser.ParseFrom(input.Response);

    var longList = new LongList { Data = { priceList.Data } };

    var sortedList = longList.Data.ToList().OrderBy(l => l).ToList();

    var round = State.LatestRound.Value.Add(1);

    var newPriceRoundData = new PriceRoundData
    {
        Price = sortedList[sortedList.Count / 2],
        RoundId = round,
        UpdatedAt = Context.CurrentBlockTime
    };
    State.LatestPriceRoundData.Value = newPriceRoundData;
    State.PriceRoundData[round] = newPriceRoundData;
    State.LatestRound.Value = round;
}
```

The above code will parse the oracle callback and record each result in the contract, providing the latest and historical currency price query capabilities.

### 3.3 VRF

First, you need to define how to initiate a VRF oracle request in the contract.

```csharp
State.OracleContract.SendRequest.Send(new SendRequestInput
{
    SubscriptionId = SubscriptionId,
    RequestTypeIndex = 2,
    SpecificData = specificData,
    TraceId = XXXXX // HASH
});
```

- `OracleContract`: This is the target contract address, the oracle contract.
- `SendRequest`: This is the method name for sending the VRF Request to the target contract.
- `SendRequestInput`: This is the input parameter of the method for sending transactions to the target contract

| Param Name       | Explanation                                                        |                             |
| ---------------- | ------------------------------------------------------------------ | --------------------------- |
| SubscriptionId   | manage the service fee based on this subscription id               | int32                       |
| RequestTypeIndex | Task Type                                                          | int32, 1=Datafeeds \| 2=VRF |
| SpecificData     | Detailed description of Datafeeds tasks                            | ByteString                  |
| TraceId          | This ID can be used as a unique index to manage your oracle tasks. | Aelf.Hash                   |

#### 3.3.1 How to generate VRF SpecificData

First, you need to specify an oracle node to perform your random number generation task,

```csharp
var keyHashs = State.OracleContract.GetProvingKeyHashes.Call(new Empty());
var keyHash = keyHashs[0]
```

Then bind the oracle node Keyhash in your VRF task and specify the number of random numbers to be generated.

```csharp
var specificData = new AetherLink.Contracts.VRF.Coordinator.SpecificData
{
    KeyHash = keyHash,
    NumWords = 3,
    RequestConfirmations = 1
}.ToByteString()
```

#### 3.3.2 How to handle oracle pricefeeds callbacks

```csharp
public override Empty HandleOracleFulfillment(HandleOracleFulfillmentInput input)
{
    var randomHashList = HashList.Parser.ParseFrom(input.Response);
    State.RandomHashes[input.RequestId] = randomHashList;
}
```
