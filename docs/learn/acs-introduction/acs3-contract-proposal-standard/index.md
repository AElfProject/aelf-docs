# ACS3 - Contract Proposal Standard

ACS3 is used when a method needs multiple approvals. Implement these methods for voting and approval:

## Interface

### Methods

| Method Name                        | Request Type                                   | Response Type                | Description                                                                                      |
| ---------------------------------- | ---------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------ |
| **CreateProposal**                 | acs3.CreateProposalInput                       | aelf.Hash                    | Creates a proposal for voting and returns the proposal ID.                                        |
| **Approve**                        | aelf.Hash                                      | google.protobuf.Empty        | Approves a proposal by its ID.                                                                    |
| **Reject**                         | aelf.Hash                                      | google.protobuf.Empty        | Rejects a proposal by its ID.                                                                     |
| **Abstain**                        | aelf.Hash                                      | google.protobuf.Empty        | Abstains from voting on a proposal by its ID.                                                     |
| **Release**                        | aelf.Hash                                      | google.protobuf.Empty        | Releases a proposal by its ID, triggering the specified contract call.                            |
| **ChangeOrganizationThreshold**    | acs3.ProposalReleaseThreshold                  | google.protobuf.Empty        | Changes the proposal thresholds, affecting all current proposals.                                 |
| **ChangeOrganizationProposerWhiteList** | acs3.ProposerWhiteList                   | google.protobuf.Empty        | Changes the proposer whitelist for the organization.                                              |
| **CreateProposalBySystemContract** | acs3.CreateProposalBySystemContractInput       | aelf.Hash                    | Creates a proposal by system contracts and returns the proposal ID.                               |
| **ClearProposal**                  | aelf.Hash                                      | google.protobuf.Empty        | Removes a specified proposal. If the proposal is active, removal fails.                           |
| **GetProposal**                    | aelf.Hash                                      | acs3.ProposalOutput          | Retrieves a proposal by its ID.                                                                   |
| **ValidateOrganizationExist**      | aelf.Address                                   | google.protobuf.BoolValue    | Checks if an organization exists.                                                                 |
| **ValidateProposerInWhiteList**    | acs3.ValidateProposerInWhiteListInput          | google.protobuf.BoolValue    | Checks if the proposer is in the whitelist.                                                       |

### Types

#### acs3.CreateProposalBySystemContractInput
| Field           | Type             | Description                       | Label   |
| --------------- | ---------------- | --------------------------------- | ------- |
| proposal_input  | CreateProposalInput | Parameters for creating the proposal |         |
| origin_proposer | aelf.Address     | Address of the proposer           |         |

#### acs3.CreateProposalInput
| Field                | Type                       | Description                           | Label |
| -------------------- | -------------------------- | ------------------------------------- | ----- |
| contract_method_name | string                     | Method name to call after release     |       |
| to_address           | aelf.Address               | Contract address to call after release|       |
| params               | bytes                      | Parameters for the method call        |       |
| expired_time         | google.protobuf.Timestamp  | Proposal expiration time              |       |
| organization_address | aelf.Address               | Organization address                  |       |
| proposal_description_url | string                | URL for proposal description          |       |
| token                | aelf.Hash                  | Token for proposal ID generation      |       |

#### acs3.OrganizationCreated
| Field               | Type          | Description              | Label |
| ------------------- | ------------- | ------------------------ | ----- |
| organization_address| aelf.Address  | Created organization address |     |

#### acs3.OrganizationHashAddressPair
| Field               | Type          | Description              | Label |
| ------------------- | ------------- | ------------------------ | ----- |
| organization_hash   | aelf.Hash     | Organization ID          |       |
| organization_address| aelf.Address  | Organization address     |       |

#### acs3.OrganizationThresholdChanged
| Field                     | Type                     | Description              | Label |
| ------------------------- | ------------------------ | ------------------------ | ----- |
| organization_address      | aelf.Address             | Organization address     |       |
| proposer_release_threshold| ProposalReleaseThreshold | New release threshold    |       |

#### acs3.OrganizationWhiteListChanged
| Field               | Type          | Description              | Label |
| ------------------- | ------------- | ------------------------ | ----- |
| organization_address| aelf.Address  | Organization address     |       |
| proposer_white_list | ProposerWhiteList | New proposer whitelist |       |

#### acs3.ProposalCreated
| Field               | Type          | Description              | Label |
| ------------------- | ------------- | ------------------------ | ----- |
| proposal_id         | aelf.Hash     | Created proposal ID      |       |
| organization_address| aelf.Address  | Organization address     |       |

#### acs3.ProposalOutput
| Field                | Type                       | Description                           | Label |
| -------------------- | -------------------------- | ------------------------------------- | ----- |
| proposal_id          | aelf.Hash                  | Proposal ID                           |       |
| contract_method_name | string                     | Method name for release               |       |
| to_address           | aelf.Address               | Target contract address               |       |
| params               | bytes                      | Release transaction parameters        |       |
| expired_time         | google.protobuf.Timestamp  | Proposal expiration date              |       |
| organization_address | aelf.Address               | Organization address                  |       |
| proposer             | aelf.Address               | Proposer address                      |       |
| to_be_released       | bool                       | Indicates if releasable               |       |
| approval_count       | int64                      | Approval count                        |       |
| rejection_count      | int64                      | Rejection count                       |       |
| abstention_count     | int64                      | Abstention count                      |       |

#### acs3.ProposalReleaseThreshold
| Field                      | Type  | Description                     | Label |
| -------------------------- | ----- | ------------------------------- | ----- |
| minimal_approval_threshold | int64 | Minimum approval threshold      |       |
| maximal_rejection_threshold| int64 | Maximum rejection threshold     |       |
| maximal_abstention_threshold | int64 | Maximum abstention threshold   |       |
| minimal_vote_threshold     | int64 | Minimum vote threshold          |       |

#### acs3.ProposalReleased
| Field               | Type          | Description              | Label |
| ------------------- | ------------- | ------------------------ | ----- |
| proposal_id         | aelf.Hash     | Released proposal ID     |       |
| organization_address| aelf.Address  | Organization address     |       |

#### acs3.ProposerWhiteList
| Field      | Type          | Description       | Label    |
| ---------- | ------------- | ----------------- | -------- |
| proposers  | aelf.Address  | Proposer addresses| repeated |

#### acs3.ReceiptCreated
| Field               | Type                      | Description              | Label |
| ------------------- | ------------------------- | ------------------------ | ----- |
| proposal_id         | aelf.Hash                 | Proposal ID              |       |
| address             | aelf.Address              | Sender address           |       |
| receipt_type        | string                    | Receipt type (Approve, Reject, Abstain) |  |
| time                | google.protobuf.Timestamp | Timestamp                |       |
| organization_address| aelf.Address              | Organization address     |       |

#### acs3.ValidateProposerInWhiteListInput
| Field               | Type          | Description              | Label |
| ------------------- | ------------- | ------------------------ | ----- |
| proposer            | aelf.Address  | Proposer address         |       |
| organization_address| aelf.Address  | Organization address     |       |

## Implementation

Assume there's only one organization in a contract, so no need to define the Organization type. Voters must use a token to vote. We'll focus on the core methods: CreateProposal, Approve, Reject, Abstain, and Release.

### State Attributes
```cs
public MappedState<Hash, ProposalInfo> Proposals { get; set; }
public SingletonState<ProposalReleaseThreshold> ProposalReleaseThreshold { get; set; }
```

- `Proposals` stores all proposal info.
- `ProposalReleaseThreshold` saves the requirements to release a proposal.

### Initialization
Set the proposal release requirements when the contract initializes:
```cs
public override Empty Initialize(Empty input)
{
    State.TokenContract.Value =
        Context.GetContractAddressByName(SmartContractConstants.TokenContractSystemName);
    State.ProposalReleaseThreshold.Value = new ProposalReleaseThreshold
    {
        MinimalApprovalThreshold = 1,
        MinimalVoteThreshold = 1
    };
    return new Empty();
}
```

Requires at least one vote and one approval.

### Create Proposal
Creates a proposal and stores it with its details.
```cs
public override Hash CreateProposal(CreateProposalInput input)
{
    var proposalId = Context.GenerateId(Context.Self, input.Token);
    Assert(State.Proposals[proposalId] == null, "Proposal with same token already exists.");
    State.Proposals[proposalId] = new ProposalInfo
    {
        ProposalId = proposalId,
        Proposer = Context.Sender,
        ContractMethodName = input.ContractMethodName,
        Params = input.Params,
        ExpiredTime = input.ExpiredTime,
        ToAddress = input.ToAddress,
        ProposalDescriptionUrl = input.ProposalDescriptionUrl
    };
    return proposalId;
}
```

### Voting Methods

#### Abstain
```cs
public override Empty Abstain(Hash input)
{
    Charge();
    var proposal = State.Proposals[input];
    if (proposal == null)
    {
        throw new AssertionException("Proposal not found.");
    }
    proposal.Abstentions.Add(Context.Sender);
    State.Proposals[input] = proposal;
    return new Empty();
}
```

#### Approve
```cs
public override Empty Approve(Hash input)
{
    Charge();
    var proposal = State.Proposals[input];
    if (proposal == null)
    {
        throw new AssertionException("Proposal not found.");
    }
    proposal.Approvals.Add(Context.Sender);
    State.Proposals[input] = proposal;
    return new Empty();
}
```

#### Reject
```cs
public override Empty Reject(Hash input)
{
    Charge();
    var proposal = State.Proposals[input];
    if (proposal == null)
    {
        throw new AssertionException("Proposal not found.");
    }
    proposal.Rejections.Add(Context.Sender);
    State.Proposals[input] = proposal;
    return new Empty();
}
```

#### Charge
```cs
private void Charge()
{
    State.TokenContract.TransferFrom.Send(new TransferFromInput
    {
        From = Context.Sender,
        To = Context.Self,
        Symbol = Context.Variables.NativeSymbol,
        Amount = 1_00000000
    });
}
```

### Release Proposal
Releases a proposal if the vote count meets the threshold:
```cs
public override Empty Release(Hash input)
{
    var proposal = State.Proposals[input];
    if (proposal == null)
    {
        throw new AssertionException("Proposal not found.");
    }
    Assert(IsReleaseThresholdReached(proposal), "Didn't reach release threshold.");
    Context.SendInline(proposal.ToAddress, proposal.ContractMethodName, proposal.Params);
    return new Empty();
}
private bool IsReleaseThresholdReached(ProposalInfo proposal)
{
    var isRejected = IsProposalRejected(proposal);
    if (isRejected)
        return false;
    var isAbstained = IsProposalAbstained(proposal);
    return !isAbstained && CheckEnoughVoteAndApprovals(proposal);
}
private bool IsProposalRejected(ProposalInfo proposal)
{
    var rejectionMemberCount = proposal.Rejections.Count;
    return rejectionMemberCount > State.ProposalReleaseThreshold.Value.MaximalRejectionThreshold;
}
private bool IsProposalAbstained(ProposalInfo proposal)
{
    var abstentionMemberCount = proposal.Abstentions.Count;
    return abstentionMemberCount > State.ProposalReleaseThreshold.Value.MaximalAbstentionThreshold;
}
private bool CheckEnoughVoteAndApprovals(ProposalInfo proposal)
{
    var approvedMemberCount = proposal.Approvals.Count;
    var isApprovalEnough =
        approvedMemberCount >= State.ProposalReleaseThreshold.Value.MinimalApprovalThreshold;
    if (!isApprovalEnough)
        return false;
    var isVoteThresholdReached =
        proposal.Abstentions.Concat(proposal.Approvals).Concat(proposal.Rejections).Count() >=
        State.ProposalReleaseThreshold.Value.MinimalVoteThreshold;
    return isVoteThresholdReached;
}
```

## Test
Add methods to a Dapp contract and test the proposal with these methods.

### State Class
```cs
public StringState Slogan { get; set; }
public SingletonState<Address> Organization { get; set; }
```

#### Set/Get Methods
```cs
public override StringValue GetSlogan(Empty input)
{
    return State.Slogan.Value == null ? new StringValue() : new StringValue {Value = State.Slogan.Value};
}

public override Empty SetSlogan(StringValue input)
{
    Assert(Context.Sender == State.Organization.Value, "No permission.");
    State.Slogan.Value = input.Value;
    return new Empty();
}
```

#### Prepare a Stub
```cs
var keyPair = SampleECKeyPairs.KeyPairs[0];
var acs3DemoContractStub =
    GetTester<ACS3DemoContractContainer.ACS3DemoContractStub>(DAppContractAddress, keyPair);
```

#### Approve Token Transaction
```cs
var tokenContractStub =
    GetTester<TokenContractContainer.TokenContractStub>(
        GetAddress(TokenSmartContractAddressNameProvider.StringName), keyPair);
await tokenContractStub.Approve.SendAsync(new ApproveInput
{
    Spender = DAppContractAddress,
    Symbol = "ELF",
    Amount = long.MaxValue
});
```

#### Create and Test Proposal
Create a proposal to change the Slogan to "aelf":
```cs
var proposalId = (await acs3DemoContractStub.CreateProposal.SendAsync(new CreateProposalInput
{
    OrganizationAddress = OrganizationAddress
    ContractMethodName = nameof(acs3DemoContractStub.SetSlogan),
    ToAddress = DAppContractAddress,
    ExpiredTime = TimestampHelper.GetUtcNow().AddHours(1),
    Params = new StringValue {Value = "aelf"}.ToByteString(),
    Token = HashHelper.ComputeFrom("aelf")
})).Output;
```

#### Check that Slogan is empty, vote, and release:
```cs
// Check slogan
{
    var slogan = await acs3DemoContractStub.GetSlogan.CallAsync(new Empty());
    slogan.Value.ShouldBeEmpty();
}
await acs3DemoContractStub.Approve.SendAsync(proposalId);
```
```cs
await acs3DemoContractStub.Release.SendAsync(proposalId);
// Check slogan
{
    var slogan = await acs3DemoContractStub.GetSlogan.CallAsync(new Empty());
    slogan.Value.ShouldBe("aelf");
}
```
