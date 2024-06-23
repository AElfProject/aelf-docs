# Smart Contract Events

## Event Option

Events in AElf smart contracts are used to represent occurrences during execution. These events are logged in the transaction traces.

Example of an event definition:

```cs
message Transferred {
    option (aelf.is_event) = true;
    aelf.Address from = 1 [(aelf.is_indexed) = true];
    aelf.Address to = 2 [(aelf.is_indexed) = true];
    string symbol = 3 [(aelf.is_indexed) = true];
    sint64 amount = 4;
    string memo = 5;
}
```
- option (aelf.is_event) = true; indicates that Transferred is an event.

To trigger this event in a contract:
```cs
Context.Fire(new Transferred()
{
    From = from,
    To = to,
    ...
});
```

External code can monitor this event after the transaction execution.