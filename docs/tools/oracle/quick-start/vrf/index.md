# VRF

AetherLink VRF delivers provably fair and verifiable random numbers, ensuring the randomness used in smart contracts is tamper-proof and transparent. This is particularly useful for gaming, lotteries, and any application that requires trusted randomness.

## 1. Preparation

### 1.1 Import proto

First, you need to import oracle-related proto files into your contract project. You can find the latest proto files through the following links:

- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/oracle_common_message.proto
- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/oracle_contract.proto
- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/request_interface.proto
- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/vrf_coordinator_contract.proto
- https://github.com/AetherLinkProject/aetherLink-contracts/blob/master/protobuf/coordinator_contract.proto

### 1.2 Protobuf file

Then you also need to introduce `request_interface.proto` in the proto file to inherit the oracle callback function to receive the oracle report.

```proto
syntax = "proto3";

package demo;

import "aelf/core.proto";
import "aelf/options.proto";
import "acs12.proto";
import "request_interface.proto";

// The namespace of this class
option csharp_namespace = "AElf.Contracts.VRFDemo";

service VRFDemoContract {
    // The name of the state class the smart contract is going to use to access blockchain state
    option (aelf.base) = "acs12.proto";
    option (aelf.base) = "request_interface.proto";
    option (aelf.csharp_state) = "AetherLink.Contracts.VRFDemo.VRFDemoContractState";

    rpc Initialize (google.protobuf.Empty) returns (google.protobuf.Empty) {  }
    rpc Play (google.protobuf.Int64Value) returns (google.protobuf.Empty) {  }
}

// An event that will be emitted from contract method call when Play is called.
message PlayOutcomeEvent {
    option (aelf.is_event) = true;
    int64 won = 1;
}

message RecordInfo {
    aelf.Address user_address = 1;
    int64 play_amount = 2;
}
```

## 2. Getting Started

### 2.1 Background

Here, we will use the scenario of a guess-the-number game in a Game DApp as the background: After a user initiates a "Play" transaction, the DApp contract needs to generate a true random number and then determine its value. To achieve this, an oracle task will be used to generate a verifiable random number off-chain and submit it on-chain. Based on the result of this random number, the user will either receive rewards or have their bet deducted.

### 2.2 How to initiate a VRF oracle request

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

- **OracleContract**: This is the target contract address, the oracle contract.
- **SendRequest**: This is the method name for sending the VRF Request to the target contract.
- **SendRequestInput**: This is the input parameter of the method for sending transactions to the target contract.

| Param Name       | Explanation                                                        | Type                        |
| ---------------- | ------------------------------------------------------------------ | --------------------------- |
| SubscriptionId   | Manage the service fee based on this subscription id               | int32                       |
| RequestTypeIndex | Task Type                                                          | int32, 1=Datafeeds \| 2=VRF |
| SpecificData     | Detailed description of VRF tasks                                  | ByteString                  |
| TraceId          | This ID can be used as a unique index to manage your oracle tasks. | Aelf.Hash                   |

### 2.3 Why TraceId?

First, you need to understand that an oracle task is an asynchronous execution process that goes from off-chain to on-chain, back to off-chain, and is finally submitted on-chain by the oracle node. Therefore, you need to store the `traceId` as an index in the first transaction, and then match it with the information in the second transaction. Here, we add a State called `playedRecord` in the contract, using `traceId` as the key for the historical record, and storing the metadata of the historical record as the value.

```csharp
using AElf.Sdk.CSharp.State;
using AElf.Types;

namespace AElf.Contracts.aetherlink_demo
{
        // The state class is access the blockchain state
        public partial class aetherlink_demoState : ContractState
        {
                // A state to check if contract is initialized
                public BoolState Initialized { get; set; }
                // A state to store the owner address
                public SingletonState<Address> Owner { get; set; }

                public MappedState<Hash, RecordInfo> PlayedRecords { get; set; }
        }
}
```

### 2.4 How to generate VRF SpecificData

First, you need to specify an oracle node to perform your random number generation task.

```csharp
var keyHashs = State.OracleContract.GetProvingKeyHashes.Call(new Empty());
var keyHash = keyHashs[0];
```

Then bind the oracle node `KeyHash` in your VRF task and specify the number of random numbers to be generated.

```csharp
var specificData = new AetherLink.Contracts.VRF.Coordinator.SpecificData
{
        KeyHash = keyHash,
        NumWords = 1,
        RequestConfirmations = 1
}.ToByteString();
```

| Params               | Explanation                              | Type  |
| -------------------- | ---------------------------------------- | ----- |
| KeyHash              | Oracle Node Public Key Hash              | Hash  |
| NumWords             | Number of Random Hashs Generated         | int32 |
| RequestConfirmations | Number of Blocks to Wait for Transmitted | int32 |

### 2.5 How to handle oracle vrf callbacks

The length of the `HashList` depends on the `NumWords` you specified when creating the oracle task, which is the number of random hashes generated. Next, you can use this random hash for your random number game.

```csharp
public override Empty HandleOracleFulfillment(HandleOracleFulfillmentInput input)
{
        var randomHashList = HashList.Parser.ParseFrom(input.Response);
        ...
}
```

### 2.6 Complete code

You can get the complete contract code from GitHub: https://github.com/AetherLinkProject/aetherLink-contracts/tree/feature/aetherlink-vrf-demo/contract/AetherLink.Contracts.VRFDemo

```csharp
using AElf;
using AElf.Contracts.MultiToken;
using AElf.Contracts.VRFDemo;
using AElf.Sdk.CSharp;
using AElf.Types;
using AetherLink.Contracts.Consumer;
using AetherLink.Contracts.Oracle;
using AetherLink.Contracts.VRF.Coordinator;
using Google.Protobuf;
using Google.Protobuf.WellKnownTypes;

namespace AetherLink.Contracts.VRFDemo;

public partial class VRFDemoContract : VRFDemoContractContainer.VRFDemoContractBase
{
        private const string OracleContractAddress = "21Fh7yog1B741yioZhNAFbs3byJ97jvBmbGAPPZKZpHHog5aEg"; // tDVW oracle contract address
        private const string TokenSymbol = "ELF";
        private const long MinimumPlayAmount = 1_000_000; // 0.01 ELF
        private const long MaximumPlayAmount = 1_000_000_000; // 10 ELF
        private const long SubscriptionId = 1; // input your subscriptionId

        // Initializes the contract
        public override Empty Initialize(Empty input)
        {
                Assert(State.Initialized.Value == false, "Already initialized.");
                State.Initialized.Value = true;
                State.TokenContract.Value = Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
                State.OracleContract.Value = Address.FromBase58(OracleContractAddress);
                return new Empty();
        }

        public override Empty HandleOracleFulfillment(HandleOracleFulfillmentInput input)
        {
                var userRecord = State.PlayedRecords[input.TraceId];
                if (userRecord != null) return new Empty();
                var randomHashList = HashList.Parser.ParseFrom(input.Response);
                var userAddress = userRecord.UserAddress;
                var playAmount = userRecord.PlayAmount;
                if (IsWinner(randomHashList.Data[0]))
                {
                        State.TokenContract.Transfer.Send(new TransferInput
                        {
                                To = userAddress,
                                Symbol = TokenSymbol,
                                Amount = playAmount
                        });

                        Context.Fire(new PlayOutcomeEvent
                        {
                                Won = playAmount
                        });
                }
                else
                {
                        State.TokenContract.TransferFrom.Send(new TransferFromInput
                        {
                                From = userAddress,
                                To = Context.Self,
                                Symbol = TokenSymbol,
                                Amount = playAmount
                        });

                        Context.Fire(new PlayOutcomeEvent
                        {
                                Won = -playAmount
                        });
                }

                return new Empty();
        }

        public override Empty Play(Int64Value input)
        {
                var playAmount = input.Value;
                Assert(playAmount is >= MinimumPlayAmount and <= MaximumPlayAmount, "Invalid play amount.");
                var balance = State.TokenContract.GetBalance.Call(new GetBalanceInput
                {
                        Owner = Context.Sender,
                        Symbol = TokenSymbol
                }).Balance;
                Assert(balance >= playAmount, "Insufficient balance.");

                var contractBalance = State.TokenContract.GetBalance.Call(new GetBalanceInput
                {
                        Owner = Context.Self,
                        Symbol = TokenSymbol
                }).Balance;
                Assert(contractBalance >= playAmount, "Insufficient contract balance.");

                var keyHashs = State.OracleContract.GetProvingKeyHashes.Call(new Empty());
                var keyHash = keyHashs.Data[0];
                var specificData = new SpecificData
                {
                        KeyHash = keyHash,
                        NumWords = 1,
                        RequestConfirmations = 1
                }.ToByteString();

                var request = new SendRequestInput
                {
                        SubscriptionId = SubscriptionId,
                        RequestTypeIndex = 2,
                        SpecificData = specificData,
                };

                var traceId = HashHelper.ConcatAndCompute(
                        HashHelper.ConcatAndCompute(HashHelper.ComputeFrom(Context.CurrentBlockTime),
                                HashHelper.ComputeFrom(Context.Origin)), HashHelper.ComputeFrom(request));
                request.TraceId = traceId;
                State.OracleContract.SendRequest.Send(request);

                State.PlayedRecords[traceId] = new()
                {
                        UserAddress = Context.Sender,
                        PlayAmount = input.Value
                };

                return new Empty();
        }

        private bool IsWinner(Hash randomHash)
                => int.Parse(randomHash.ToHex().Substring(0, 8), System.Globalization.NumberStyles.HexNumber) % 2 == 0;
}
```

### 2.7 Interact with Your Deployed Smart Contract

#### 2.7.1 Playing the Lottery Game

```bash
$ aelf-command send ${CONTRACT_ADDRESS} -a ${WALLET_ADDRESS} -p ${WALLET_PASSWORD} -e https://tdvw-test-node.aelf.io Play
```

- Wait for the off-chain oracle node to execute (approximately 3-9 seconds), then check your `balance`.

```bash
$ aelf-command call ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a ${WALLET_ADDRESS} -p ${WALLET_PASSWORD} -e https://tdvw-test-node.aelf.io GetBalance
```

- You will be prompted for the following:

```bash
    - Enter the required param `<symbol>`: ELF
    - Enter the required param `<owner>`: $WALLET_ADDRESS
```
