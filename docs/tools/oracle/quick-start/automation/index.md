---
sidebar_position: 3
---

AetherLink Automation allows developers to automate smart contract functions by triggering actions based on specific events or conditions. This reduces the need for manual intervention and ensures contracts execute efficiently and reliably when certain criteria are met.

## 1. Preparation

### 1.1 Import proto

First, you need to import oracle-related proto files into your contract project. You can find the latest proto files through the following links:

- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/oracle_common_message.proto
- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/oracle_contract.proto
- https://github.com/AetherLinkProject/aetherLink-contracts/blob/feature/automation/protobuf/upkeep_interface.proto
- https://github.com/AetherLinkProject/aetherLink-contracts/blob/feature/automation/protobuf/automation_contract.proto

### 1.2 Protobuf file

Then you also need to introduce `upkeep_interface.proto` in the proto file to inherit the oracle callback function to receive the oracle perform.

```proto
syntax = "proto3";

package upkeep;

import "aelf/core.proto";
import "aelf/options.proto";
import "upkeep_interface.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "google/protobuf/timestamp.proto";

option csharp_namespace = "AetherLink.Contracts.AutomationDemo";

service AutomationDemoContract {
  option (aelf.base) = "upkeep_interface.proto";
  option (aelf.csharp_state) = "AetherLink.Contracts.AutomationDemo.AutomationDemoContractState";

  rpc BuyInvestment(BuyInvestmentInput) returns (google.protobuf.Empty) {}
}

message BuyInvestmentInput {
  aelf.Hash investment_name = 1;
  int64 amount = 2;
}

message InvestmentInfo {
  aelf.Hash investment_name = 1;
  aelf.Hash investment_price = 2;
  string reward_currency_name = 3;
  int64 daily_interest_rate = 4;
}

message OrderRecord {
  aelf.Address consumer = 1;
  aelf.Hash investment_name = 2;
  int64 amount = 3;
  google.protobuf.Timestamp created = 4;
}

message InvestmentBought {
  option (aelf.is_event) = true;
  aelf.Address consumer = 1;
  aelf.Hash investment_name = 2;
  aelf.Hash investment_price = 3;
  string reward_currency_name = 4;
  int64 amount = 5;
}

message RewardsTransferred {
  option (aelf.is_event) = true;
  aelf.Address beneficiary = 1;
  aelf.Hash investment_name = 2;
  int64 amount = 3;
}

message LogEventCreated {
  option (aelf.is_event) = true;
  aelf.Hash mock_data = 1;
}
```

## 2. Getting Started

### 2.1 Background

Here, we will use the scenario of a DeFi investment product as the background: After a user initiates a purchase of an ELF investment product, the DApp contract will transfer the corresponding ELF to the user as interest at an annual rate of 1%. Since on-chain contracts cannot execute timed operations, an oracle task will be used to securely trigger timed transactions through the oracle node, activating the transfer logic within the DApp contract.

### 2.2 How to initiate an Automation request

Creating an Automation task means registering yourself as an upkeep.

```csharp
State.AutomationContract.RegisterUpkeep.Send(new RegisterUpkeepInput
{
  Name = $"{input.InvestmentName}-{Context.Sender}-{Context.CurrentBlockTime}",
  UpkeepContract = Context.Self,
  AdminAddress = State.Admin.Value,
  TriggerType = TriggerType.Cron,
  TriggerData = ByteString.CopyFromUtf8(CronJobSpec),
  PerformData = record.ToByteString()
});
```

#### Parameters

| Name             | Explanation                                                                                                         |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| `Name`           | The name of the upkeep, which can be used to distinguish different upkeeps and insert parameters such as blocktime. |
| `UpkeepContract` | Receive the contract address triggered by the oracle, fill in the contract address itself.                          |
| `AdminAddress`   | Upkeep manager address, who has the management rights of Upkeep.                                                    |
| `TriggerType`    | Trigger type, currently supports timing trigger and log trigger.                                                    |
| `TriggerData`    | Specific trigger information.                                                                                       |
| `PerformData`    | Expected data to be submitted when triggered.                                                                       |

### 2.3 How to generate Automation TriggerData?

Here we take the timing trigger as an example. You can fill in the time interval you expect to trigger according to the crontab expression rules.

```csharp
private const string CronJobSpec =
  "{\"Cron\": \"0 0 0 1/1 * ? \",\"TriggerDataSpec\": {\"TriggerType\": \"Cron\"}}";
var triggerData = ByteString.CopyFromUtf8(CronJobSpec);
```

Here are some examples for your reference:

| Expectation | JobSpec                                                                       |
| ----------- | ----------------------------------------------------------------------------- |
| EveryMinute | `{"Cron": "* * * * * ? * ","TriggerDataSpec": {"TriggerType": "Cron"}}`       |
| EveryHour   | `{"Cron": "* 0/1 * * * ? * ","TriggerDataSpec": {"TriggerType": "Cron"}}`     |
| EveryDay    | `{"Cron": "* 0/1 0/1 * * ? * ","TriggerDataSpec": {"TriggerType": "Cron"}}`   |
| EveryWeek   | `{"Cron": "* 0/1 0/1 1/1 * * * ","TriggerDataSpec": {"TriggerType": "Cron"}}` |

### 2.4 How to handle automation callbacks

First, you need to import the `upkeep_interface.proto` file and rewrite the `PerformUpkeep` method to receive callbacks. `PerformData` is what you specified when you created Upkeep, so you only need to deserialize it when receiving it.

```csharp
public override Empty PerformUpkeep(PerformUpkeepInput input)
{
  var record = OrderRecord.Parser.ParseFrom(input.PerformData);
  var consumer = record.Consumer;
  var purchaseQuantity = State.OrderRecordMap[HashHelper.ComputeFrom(record)];
  var investmentInfo = State.InvestmentInfoMap[record.InvestmentName];
  var transferAmount = purchaseQuantity.Amount.Mul(investmentInfo.DailyInterestRate.Div(100));

  State.TokenContract.Transfer.Send(new TransferInput
  {
    To = consumer,
    Symbol = investmentInfo.RewardCurrencyName,
    Amount = transferAmount
  });

  Context.Fire(new RewardsTransferred
  {
    Beneficiary = consumer,
    InvestmentName = record.InvestmentName,
    Amount = transferAmount
  });

  return new Empty();
}
```

### 2.5 Complete code

You can get the complete contract code from GitHub: https://github.com/AetherLinkProject/aetherLink-contracts/tree/feature/automation-upkeep/contract/AetherLink.Contracts.AutomationDemo

```csharp
using AElf;
using AElf.Contracts.MultiToken;
using AElf.CSharp.Core;
using AElf.Sdk.CSharp;
using AetherLink.Contracts.Automation;
using AetherLink.Contracts.Upkeep;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AetherLink.Contracts.AutomationDemo;

public class AutomationDemoContract : AutomationDemoContractContainer.AutomationDemoContractBase
{
  private const string CronJobSpec =
    "{\"Cron\": \"0 0 0 1/1 * ? \",\"TriggerDataSpec\": {\"TriggerType\": \"Cron\"}}";

  public override Empty PerformUpkeep(PerformUpkeepInput input)
  {
    var record = OrderRecord.Parser.ParseFrom(input.PerformData);
    var consumer = record.Consumer;
    var purchaseQuantity = State.OrderRecordMap[HashHelper.ComputeFrom(record)];
    var investmentInfo = State.InvestmentInfoMap[record.InvestmentName];
    var transferAmount = purchaseQuantity.Amount.Mul(investmentInfo.DailyInterestRate.Div(100));

    State.TokenContract.Transfer.Send(new TransferInput
    {
      To = consumer,
      Symbol = investmentInfo.RewardCurrencyName,
      Amount = transferAmount
    });

    Context.Fire(new RewardsTransferred
    {
      Beneficiary = consumer,
      InvestmentName = record.InvestmentName,
      Amount = transferAmount
    });

    return new Empty();
  }

  public override Empty BuyInvestment(BuyInvestmentInput input)
  {
    var record = new OrderRecord
    {
      Consumer = Context.Sender,
      InvestmentName = input.InvestmentName,
      Amount = input.Amount,
      Created = Context.CurrentBlockTime
    };

    State.AutomationContract.RegisterUpkeep.Send(new RegisterUpkeepInput
    {
      Name = $"{input.InvestmentName}-{Context.Sender}-{Context.CurrentBlockTime}",
      UpkeepContract = Context.Self,
      AdminAddress = State.Admin.Value,
      TriggerType = TriggerType.Cron,
      TriggerData = ByteString.CopyFromUtf8(CronJobSpec),
      PerformData = record.ToByteString()
    });

    State.OrderRecordMap[HashHelper.ComputeFrom(record)] = record;

    Context.Fire(new InvestmentBought
    {
      Consumer = Context.Sender,
      InvestmentName = input.InvestmentName,
      InvestmentPrice = State.InvestmentInfoMap[input.InvestmentName].InvestmentPrice,
      RewardCurrencyName = State.InvestmentInfoMap[input.InvestmentName].RewardCurrencyName,
      Amount = input.Amount
    });

    return new Empty();
  }
}
```
