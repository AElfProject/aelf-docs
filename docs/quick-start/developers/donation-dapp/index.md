---
sidebar_position: 11
title: Donation dApp
description: Moderately complex smart contract
---

**Description**: The Donation dApp contract is moderately complex, enabling functionalities such as creating, editing, and deleting donation campaigns, tracking donations, and rewarding contributors. It also supports user-specific data retrieval and ensures secure interactions for managing ELF token-based campaigns.

**Purpose**: To provide a practical understanding of donation management systems using smart contracts, focusing on features like campaign creation, user-specific interactions, secure fund management, and reward distribution to enhance blockchain-based philanthropy. This tutorial also emphasizes unit testing practices for smart contracts to ensure reliability and security.

**Difficulty Level**: Moderate

<iframe width="100%" style={{"aspect-ratio": "16 / 9"}} src="https://www.youtube.com/embed/kwwO2Xn6LOQ?si=KovSOxAwWUecpccL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Step 1 - Setting up your development environment

import Setup from "../\_setup.md"

<Setup />

## Step 2 - Develop Smart Contract

### Start Your Smart Contract Project

- Open your `Terminal`.

- Enter the following command to generate a new project:

```bash title="Terminal"
mkdir donation
cd donation
dotnet new aelf -n DonationApp
```

### Adding Your Smart Contract Code

Now that we have a template donation project, we can customize the template to incorporate our own contract logic.
Let's start by implementing methods to provide basic functionality for managing donation campaigns and handling donations.

- Enter this command in your `Terminal`.

```bash title="Terminal"
cd src
```

#### Defining Methods and Messages

- Rename the file name from `Protobuf/contract/hello_world_contract.proto` to `donation_contract.proto`:

```bash title="Terminal"
mv Protobuf/contract/hello_world_contract.proto Protobuf/contract/donation_contract.proto
```

- Open the project with your IDE.

#### Contract State Definition

Update `DonationAppState.cs` file in the `src` directory:

```csharp title="DonationAppState.cs"
using AElf.Sdk.CSharp.State;
using AElf.Types;
using System.Collections.Generic;

namespace AElf.Contracts.DonationApp
{
    public partial class DonationAppState : ContractState
    {
        // A state to check if contract is initialized
        public BoolState Initialized { get; set; }
        
        // A state to store the owner address
        public SingletonState<Address> Owner { get; set; }
        
        // Maps campaign ID to Campaign
        public MappedState<string, Campaign> Campaigns { get; set; }
        
        // Maps user address to their info (campaigns and donations)
        public MappedState<Address, UserInfo> UserInfos { get; set; }
        
        // Maps campaign ID to list of rewards sent
        public MappedState<string, DonationList> CampaignRewards { get; set; }

        // Store campaign IDs by index
        public MappedState<long, string> CampaignIdsByIndex { get; set; }
        
        // Total number of campaigns
        public SingletonState<long> CampaignCount { get; set; }
    }
}
```

#### Contract References

Create a new file `ContractReferences.cs` in the `src` directory:

```csharp title="ContractReferences.cs"
using AElf.Contracts.MultiToken;

namespace AElf.Contracts.DonationApp
{
    public partial class DonationAppState
    {
        internal TokenContractContainer.TokenContractReferenceState TokenContract { get; set; }
    }
}
```

#### Protocol Definitions

First, let's set up all the necessary protocol files for our donation contract:

1. Replace the content of `donation_contract.proto` with:

```protobuf title="donation_contract.proto"
syntax = "proto3";

import "aelf/core.proto";
import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";
import "Protobuf/reference/acs12.proto";

option csharp_namespace = "AElf.Contracts.DonationApp";

service DonationDApp {
    option (aelf.csharp_state) = "AElf.Contracts.DonationApp.DonationAppState";
    option (aelf.base) = "Protobuf/reference/acs12.proto";
    
    rpc IsContractInitialized (google.protobuf.Empty) returns (google.protobuf.BoolValue) {
        option (aelf.is_view) = true;
    }
    
    rpc Initialize (google.protobuf.Empty) returns (google.protobuf.StringValue) {
    }
    
    rpc CreateCampaign (CampaignInput) returns (google.protobuf.StringValue) {
    }
    
    rpc Donate (DonationInput) returns (google.protobuf.Empty) {
    }
    
    rpc GetCampaign (google.protobuf.StringValue) returns (Campaign) {
        option (aelf.is_view) = true;
    }
    
    rpc GetCampaignsData (google.protobuf.Empty) returns (CampaignList) {
        option (aelf.is_view) = true;
    }
    
    rpc GetUsersCampaigns (aelf.Address) returns (CampaignList) {
        option (aelf.is_view) = true;
    }
    
    rpc EditCampaign (EditCampaignInput) returns (google.protobuf.Empty) {
    }
    
    rpc DeleteCampaign (google.protobuf.StringValue) returns (google.protobuf.Empty) {
    }
    
    rpc WithdrawCampaignAmount (WithdrawCampaignInput) returns (google.protobuf.Empty) {
    }
    
    rpc GetUserDetails (aelf.Address) returns (UserDetails) {
        option (aelf.is_view) = true;
    }
}

message CampaignInput {
    string title = 1;
    string description = 2;
    string imageUrl = 3;
    string type = 4;
    int64 goalAmount = 5;
    int64 duration = 6;
}

message WithdrawCampaignInput {
    string campaignId = 1;
}

message DonationInput {
    string campaignId = 1;
    int64 amount = 2;
}

message EditCampaignInput {
    string campaignId = 1;
    string newTitle = 2;
    string newDescription = 3;
    string newImageUrl = 4;
    string newType = 5;
    int64 newGoalAmount = 6;
    bool newIsActive = 7;
}

message Donation {
    aelf.Address donor = 1;
    int64 amount = 2;
    int64 timestamp = 3;
}

message Campaign {
    string id = 1;
    string title = 2;
    string description = 3;
    string imageUrl = 4;
    string type = 5;
    int64 goalAmount = 6;
    int64 currentAmount = 7;
    aelf.Address creator = 8;
    int64 startTime = 9;
    int64 endTime = 10;
    repeated Donation donators = 11;
    bool isActive = 12;
    bool isWithdrawn = 13;
}

message CampaignList {
    repeated Campaign value = 1;
}

message UserDetails {
    aelf.Address walletAddress = 1;
    repeated Campaign campaigns = 2;
    repeated Campaign donatedCampaigns = 3;
    int64 totalRaisedAmount = 4;
}

message UserInfo {
    repeated string campaigns = 1;
    repeated string donated_campaigns = 2;
    int64 total_raised_amount = 3;
}

message DonationList {
    repeated Donation value = 1;
}

// Events
message CampaignCreatedEvent {
    option (aelf.is_event) = true;
    string campaignId = 1;
    string title = 2;
    aelf.Address creator = 3;
    int64 goalAmount = 4;
}

message DonationMadeEvent {
    option (aelf.is_event) = true;
    string campaignId = 1;
    aelf.Address donor = 2;
    int64 amount = 3;
}

message CampaignWithdrawnEvent {
    option (aelf.is_event) = true;
    string campaignId = 1;
    int64 amount = 2;
    aelf.Address recipient = 3;
}
```

2. Create `src/Protobuf/reference/token_contract.proto`:

```protobuf title="token_contract.proto"
syntax = "proto3";

package token;

import "aelf/core.proto";
import "aelf/options.proto";
import "google/protobuf/empty.proto";
import "google/protobuf/wrappers.proto";

option csharp_namespace = "AElf.Contracts.MultiToken";

service TokenContract {
    // Create a new token.
    rpc Create (CreateInput) returns (google.protobuf.Empty) { }
    
    // Transfer tokens between accounts
    rpc Transfer (TransferInput) returns (google.protobuf.Empty) { }
    
    // Transfer tokens using allowance
    rpc TransferFrom (TransferFromInput) returns (google.protobuf.Empty) { }
    
    // Approve token spending
    rpc Approve (ApproveInput) returns (google.protobuf.Empty) { }
    
    // Query balance
    rpc GetBalance (GetBalanceInput) returns (GetBalanceOutput) {
        option (aelf.is_view) = true;
    }
    
    // Query allowance
    rpc GetAllowance (GetAllowanceInput) returns (GetAllowanceOutput) {
        option (aelf.is_view) = true;
    }
}

message CreateInput {
    string symbol = 1;
    string token_name = 2;
    int64 total_supply = 3;
    int32 decimals = 4;
    aelf.Address issuer = 5;
    bool is_burnable = 6;
}

message TransferInput {
    aelf.Address to = 1;
    string symbol = 2;
    int64 amount = 3;
    string memo = 4;
}

message TransferFromInput {
    aelf.Address from = 1;
    aelf.Address to = 2;
    string symbol = 3;
    int64 amount = 4;
    string memo = 5;
}

message ApproveInput {
    aelf.Address spender = 1;
    string symbol = 2;
    int64 amount = 3;
}

message GetBalanceInput {
    string symbol = 1;
    aelf.Address owner = 2;
}

message GetBalanceOutput {
    string symbol = 1;
    aelf.Address owner = 2;
    int64 balance = 3;
}

message GetAllowanceInput {
    string symbol = 1;
    aelf.Address owner = 2;
    aelf.Address spender = 3;
}

message GetAllowanceOutput {
    string symbol = 1;
    aelf.Address owner = 2;
    aelf.Address spender = 3;
    int64 allowance = 4;
}
```

#### Main Contract Implementation

Replace the content of `DonationApp.cs` with:

```csharp title="DonationApp.cs"
using AElf.Sdk.CSharp;
using AElf.Types;
using Google.Protobuf.WellKnownTypes;
using System.Linq;
using System.Collections.Generic;
using AElf.Contracts.MultiToken;

namespace AElf.Contracts.DonationApp
{
    public class DonationApp : DonationDAppContainer.DonationDAppBase
    {
        // Token contract constants
        private const string TokenSymbol = "ELF";
        private const long MaximumAmount = 1000_00000000; // 1000 ELF

        public override BoolValue IsContractInitialized(Empty input) 
        {
            return new BoolValue { Value = State.Initialized.Value };
        }

        public override StringValue Initialize(Empty input)
        {
            if (State.Initialized.Value)
            {
                return new StringValue { Value = "failed" };
            }

            State.TokenContract.Value = Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
            Assert(State.TokenContract.Value != null, "Failed to get token contract address");
            
            State.Initialized.Value = true;
            State.Owner.Value = Context.Sender;
            State.CampaignCount.Value = 0;

            return new StringValue { Value = "success" };
        }

        public override StringValue CreateCampaign(CampaignInput input)
        {
            Assert(State.Initialized.Value, "Contract not initialized.");
            Assert(input.GoalAmount <= MaximumAmount, 
                "Goal amount should be less than equal to 1000 ELF");

            var campaignId = HashHelper.ComputeFrom(input.Title + Context.Sender.ToBase58() + Context.CurrentBlockTime.Seconds).ToHex();
            var currentTime = Context.CurrentBlockTime.Seconds;
            var campaign = new Campaign
            {
                Id = campaignId,
                Title = input.Title,
                Description = input.Description,
                ImageUrl = input.ImageUrl,
                Type = input.Type,
                GoalAmount = input.GoalAmount,
                CurrentAmount = 0,
                Creator = Context.Sender,
                StartTime = currentTime,
                EndTime = currentTime + input.Duration,
                IsActive = true,
                IsWithdrawn = false
            };

            State.Campaigns[campaignId] = campaign;

            // Update user's campaign list
            var userInfo = State.UserInfos[Context.Sender] ?? new UserInfo 
            { 
                Campaigns = { campaignId },
                DonatedCampaigns = { },
                TotalRaisedAmount = 0
            };
            if (!userInfo.Campaigns.Contains(campaignId))
            {
                userInfo.Campaigns.Add(campaignId);
            }
            State.UserInfos[Context.Sender] = userInfo;

            // Add to campaign index
            var currentIndex = State.CampaignCount.Value;
            State.CampaignIdsByIndex[currentIndex] = campaignId;
            State.CampaignCount.Value = currentIndex + 1;

            // Fire campaign created event
            Context.Fire(new CampaignCreatedEvent
            {
                CampaignId = campaignId,
                Title = input.Title,
                Creator = Context.Sender,
                GoalAmount = input.GoalAmount
            });

            return new StringValue { Value = campaignId }; 
        }

        public override Empty Donate(DonationInput input)
        {
            Assert(State.Initialized.Value, "Contract not initialized.");
            var campaign = State.Campaigns[input.CampaignId];
            Assert(campaign != null, "Campaign does not exist.");
            Assert(IsCampaignActive(campaign), "Campaign is not active or has ended.");

            // Check if donor has enough tokens
            var balance = State.TokenContract.GetBalance.Call(new GetBalanceInput
            {
                Owner = Context.Sender,
                Symbol = TokenSymbol
            }).Balance;
            Assert(balance >= input.Amount, "Insufficient balance for donation.");

            // Transfer donation amount
            State.TokenContract.TransferFrom.Send(new TransferFromInput
            {
                From = Context.Sender,
                To = Context.Self,
                Symbol = TokenSymbol,
                Amount = input.Amount
            });

            // Record donation
            var donation = new Donation
            {
                Donor = Context.Sender,
                Amount = input.Amount,
                Timestamp = Context.CurrentBlockTime.Seconds
            };
            campaign.Donators.Add(donation);
            campaign.CurrentAmount += input.Amount;

            // Update campaign
            State.Campaigns[input.CampaignId] = campaign;

            // Update user's donation history
            var userInfo = State.UserInfos[Context.Sender] ?? new UserInfo
            {
                Campaigns = { },
                DonatedCampaigns = { input.CampaignId },
                TotalRaisedAmount = input.Amount
            };
            if (!userInfo.DonatedCampaigns.Contains(input.CampaignId))
            {
                userInfo.DonatedCampaigns.Add(input.CampaignId);
                userInfo.TotalRaisedAmount += input.Amount;
            }
            State.UserInfos[Context.Sender] = userInfo;

            // Fire donation made event
            Context.Fire(new DonationMadeEvent
            {
                CampaignId = input.CampaignId,
                Donor = Context.Sender,
                Amount = input.Amount
            });

            return new Empty();
        }

        public override CampaignList GetCampaignsData(Empty input)
        {
            var campaigns = new List<Campaign>();
            var totalCampaigns = State.CampaignCount.Value;
            
            for (var i = 0L; i < totalCampaigns; i++)
            {
                var campaignId = State.CampaignIdsByIndex[i];
                var campaign = State.Campaigns[campaignId];
                if (campaign != null)
                {
                    campaign.IsActive = IsCampaignActive(campaign);
                    campaigns.Add(campaign);
                }
            }

            return new CampaignList { Value = { campaigns } };
        }

        private bool IsCampaignActive(Campaign campaign)
        {
            return campaign.IsActive && 
                   Context.CurrentBlockTime.Seconds <= campaign.EndTime;
        }

        public override Campaign GetCampaign(StringValue campaignId)
        {
            var campaign = State.Campaigns[campaignId.Value];
            campaign.IsActive = IsCampaignActive(campaign);
            return campaign;
        }

        public override CampaignList GetUsersCampaigns(Address input)
        {
            var userInfo = State.UserInfos[input];
            if (userInfo == null || userInfo.Campaigns.Count == 0)
            {
                return new CampaignList();
            }

            var campaigns = new List<Campaign>();
            foreach (var id in userInfo.Campaigns)
            {
                var campaign = State.Campaigns[id];
                if (campaign != null)
                {
                    campaign.IsActive = IsCampaignActive(campaign);
                    campaigns.Add(campaign);
                }
            }

            return new CampaignList { Value = { campaigns } };
        }

        public override Empty EditCampaign(EditCampaignInput input)
        {
            var campaign = State.Campaigns[input.CampaignId];
            Assert(campaign != null, "Campaign does not exist.");
            Assert(campaign.Id == input.CampaignId, "Campaign ID mismatch");
            Assert(campaign.Creator == Context.Sender, "Only the creator can edit the campaign.");

            if (!string.IsNullOrEmpty(input.NewTitle))
                campaign.Title = input.NewTitle;
            if (!string.IsNullOrEmpty(input.NewDescription))
                campaign.Description = input.NewDescription;
            if (!string.IsNullOrEmpty(input.NewImageUrl))
                campaign.ImageUrl = input.NewImageUrl;
            if (!string.IsNullOrEmpty(input.NewType))
                campaign.Type = input.NewType;
            if (input.NewGoalAmount != 0)
                campaign.GoalAmount = input.NewGoalAmount;
            
            campaign.IsActive = input.NewIsActive;

            State.Campaigns[input.CampaignId] = campaign;
            return new Empty();
        }

        public override Empty DeleteCampaign(StringValue input)
        {
            var campaign = State.Campaigns[input.Value];
            Assert(campaign != null, "Campaign does not exist.");
            Assert(campaign.Creator == Context.Sender, "Only the creator can delete the campaign.");

            // Remove campaign
            State.Campaigns.Remove(input.Value);

            // Update user info
            var userInfo = State.UserInfos[Context.Sender];
            if (userInfo != null)
            {
                userInfo.Campaigns.Remove(input.Value);
                State.UserInfos[Context.Sender] = userInfo;
            }

            return new Empty();
        }

        public override Empty WithdrawCampaignAmount(WithdrawCampaignInput input)
        {
            var campaign = State.Campaigns[input.CampaignId];
            Assert(campaign != null, "Campaign does not exist.");
            Assert(campaign.Creator == Context.Sender, "Only the campaign creator can withdraw funds.");
            Assert(Context.CurrentBlockTime.Seconds >= campaign.EndTime, "Campaign duration has not ended yet.");
            Assert(!campaign.IsWithdrawn, "Campaign funds have already been withdrawn.");

            // Transfer campaign amount to creator
            State.TokenContract.Transfer.Send(new TransferInput
            {
                To = campaign.Creator,
                Symbol = TokenSymbol,
                Amount = campaign.CurrentAmount
            });

            // Update withdrawal status
            campaign.IsWithdrawn = true;
            State.Campaigns[input.CampaignId] = campaign;

            // Fire withdrawal event
            Context.Fire(new CampaignWithdrawnEvent
            {
                CampaignId = input.CampaignId,
                Amount = campaign.CurrentAmount,
                Recipient = campaign.Creator
            });

            return new Empty();
        }

        public override UserDetails GetUserDetails(Address input)
        {
            var userInfo = State.UserInfos[input] ?? new UserInfo();
            
            var campaigns = new List<Campaign>();
            foreach (var id in userInfo.Campaigns)
            {
                var campaign = State.Campaigns[id];
                if (campaign != null)
                {
                    campaign.IsActive = IsCampaignActive(campaign);
                    campaigns.Add(campaign);
                }
            }

            var donatedCampaigns = new List<Campaign>();
            foreach (var id in userInfo.DonatedCampaigns)
            {
                var campaign = State.Campaigns[id];
                if (campaign != null)
                {
                    campaign.IsActive = IsCampaignActive(campaign);
                    donatedCampaigns.Add(campaign);
                }
            }

            return new UserDetails
            {
                WalletAddress = input,
                Campaigns = { campaigns },
                DonatedCampaigns = { donatedCampaigns },
                TotalRaisedAmount = userInfo.TotalRaisedAmount
            };
        }
    }
}
```

### Building Smart Contract

- Build the new code with the following commands inside `src` folder:

```bash title="Terminal"
dotnet build
```

You should see **DonationApp.dll.patched** in the directory `donation/src/bin/Debug/net6.0`

### Unit Testing Smart Contract

Unit testing is crucial for ensuring the reliability and security of smart contracts. Let's look at some test cases for the critical `Donate` method:

```csharp title="DonationDAppTests.cs"
[Fact]
public async Task Donate_Success()
{
    // Arrange
    await DonationContract.Initialize.SendAsync(new InitializeInput());
    
    var createResult = await DonationContract.CreateCampaign.SendAsync(new CreateCampaignInput
    {
        Title = "Test Campaign",
        Description = "Test Description",
        TargetAmount = 100_00000000,
        StartTime = GetTimestamp(),
        EndTime = GetTimestamp(30)
    });
    var campaignId = createResult.Output.Value;

    // Approve token spending
    await ApproveTokenAsync(DonationContractAddress, DefaultDonationAmount);

    // Act
    var result = await DonationContract.Donate.SendAsync(new DonateInput
    {
        CampaignId = campaignId,
        Amount = DefaultDonationAmount
    });

    // Assert
    result.TransactionResult.Status.ShouldBe(TransactionResultStatus.Mined);

    var campaign = await DonationContract.GetCampaign.CallAsync(new StringValue { Value = campaignId });
    campaign.CurrentAmount.ShouldBe(DefaultDonationAmount);

    var donatorList = await DonationContract.GetDonatorList.CallAsync(new StringValue { Value = campaignId });
    donatorList.Value.Count.ShouldBe(1);
    donatorList.Value[0].Donor.ShouldBe(DefaultAddress);
    donatorList.Value[0].Amount.ShouldBe(DefaultDonationAmount);
}

[Fact]
public async Task Donate_CampaignEnded_ShouldFail()
{
    // Arrange
    await DonationContract.Initialize.SendAsync(new InitializeInput());
    
    var createResult = await DonationContract.CreateCampaign.SendAsync(new CreateCampaignInput
    {
        Title = "Test Campaign",
        Description = "Test Description",
        TargetAmount = 100_00000000,
        StartTime = GetTimestamp(-30),  // Started 30 days ago
        EndTime = GetTimestamp(-1)      // Ended yesterday
    });
    var campaignId = createResult.Output.Value;

    await ApproveTokenAsync(DonationContractAddress, DefaultDonationAmount);

    // Act & Assert
    var exception = await Assert.ThrowsAsync<Exception>(() =>
        DonationContract.Donate.SendAsync(new DonateInput
        {
            CampaignId = campaignId,
            Amount = DefaultDonationAmount
        }));
    exception.Message.ShouldContain("Campaign has ended");
}

[Fact]
public async Task Donate_ExceedTargetAmount_ShouldFail()
{
    // Arrange
    await DonationContract.Initialize.SendAsync(new InitializeInput());
    
    var targetAmount = 10_00000000;  // 10 ELF
    var createResult = await DonationContract.CreateCampaign.SendAsync(new CreateCampaignInput
    {
        Title = "Test Campaign",
        Description = "Test Description",
        TargetAmount = targetAmount,
        StartTime = GetTimestamp(),
        EndTime = GetTimestamp(30)
    });
    var campaignId = createResult.Output.Value;

    // First donation equals target amount
    await ApproveTokenAsync(DonationContractAddress, targetAmount);
    await DonationContract.Donate.SendAsync(new DonateInput
    {
        CampaignId = campaignId,
        Amount = targetAmount
    });

    // Try to donate more
    await ApproveTokenAsync(DonationContractAddress, DefaultDonationAmount);

    // Act & Assert
    var exception = await Assert.ThrowsAsync<Exception>(() =>
        DonationContract.Donate.SendAsync(new DonateInput
        {
            CampaignId = campaignId,
            Amount = DefaultDonationAmount
        }));
    exception.Message.ShouldContain("Campaign target amount reached");
}
```

These test cases demonstrate:

1. **Successful Donation**: Tests a complete donation flow, including:
   - Campaign creation
   - Token approval
   - Donation execution
   - Verification of campaign amount and donor list

2. **Campaign End Date Validation**: Tests that donations cannot be made to expired campaigns

3. **Target Amount Validation**: Tests that donations cannot exceed the campaign's target amount

Each test follows the Arrange-Act-Assert pattern and uses the `Shouldly` assertion library for clear, readable assertions.

:::Note
For a deeper dive into unit testing smart contracts, check out the complete test suite in our [GitHub repository](https://github.com/AElfProject/aelf-samples/tree/master/donation/1-smart-contract/test).
:::

## Step 3 - Deploy Smart Contract

import Deploy from "../\_deploy_donation.md"

<Deploy />

## Step 4 - Interact with Your Deployed Smart Contract through dApp

import FrontendProjectSetup from "./\_frontend_project_setup.md"
import FrontendIntegration from "./\_frontend_integration.md"
import FrontendRunApplication from "./\_frontend_run_application.md"
import Conclusion from "./\_conclusion.md"

<FrontendProjectSetup />
<FrontendIntegration />
<FrontendRunApplication />
<Conclusion />

