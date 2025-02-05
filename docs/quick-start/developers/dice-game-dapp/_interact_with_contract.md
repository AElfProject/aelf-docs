### Approving Smart Contract Spending

```bash title="Terminal"
aelf-command send ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Approve
```

:::tip
ℹ️ Note: `ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx` is the contract address of `Multitoken Contract` on aelf Testnet dAppChain (tDVW).
:::

When prompted, enter the following parameters to approve the spending of 90 ELF tokens:

```terminal title="Terminal"
Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <spender>: "INSERT_YOUR_CONTRACT_ADDRESS_HERE"
? Enter the required param <symbol>: ELF
? Enter the required param <amount>: 9000000000
```

### Initializing Dice Game Contract

```bash title="Terminal"
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Initialize
```

- Output:

![result](/img/Initialize.png)

### Depositing funds into the Dice Game Contract

```bash title="Terminal"
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Deposit
```

- You will be prompted for the following:

```terminal title="Terminal"
Enter the params one by one, type `Enter` to skip optional param:
? Enter the required param <value>: 20000
```

- Output:

![result](/img/Deposit.png)

### Playing the Dice Game

```bash title="Terminal"
aelf-command send $CONTRACT_ADDRESS -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io Play
```

- Let's check the `Contract Balance`

```bash title="Terminal"
aelf-command call ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io GetContractBalance
```

### Understanding randomization using Oracle Contract in aelf

In this section, we'll explore how oracle calls work in the aelf blockchain to generate a verifiable random number using the dice game example from the tutorial. This will help you understand how different smart contracts can interact to perform complex operations.

#### 1. **Smart Contract Overview**
   - **Dice Master Contract**: Manages the game, including initialization, token deposit/withdrawal, interaction with oracle for random number generation and decision of win or lose based on dice outcome.
   - **Token Contract**: Handles the token transactions needed for playing dice game.
   - **Oracle Contract**: Handles the generation of verifiable random number needed for playing the dice game.

#### 2. **Game Play Process**
   - **Starting Gameplay**: When a user wants to play the dice game, they interact with the dice master contract to deposit sufficent funds using deposit function. Then the master contract contract calls the oracle contract to generate a random number. The oracle contract calls the dice master contract to decide if the user wins or loses.
   - **Token Transfer Requirement**: The Dice Master Contract must verify that the user has enough tokens and transfer those tokens to the smart contract account to play the game.
   - **Random Number Generation using an Oracle**: The dice master contract connects with Aetherlink VRF oracle to generate a true random number.
   - **Win or Lose Decision**: The decision for win or lose is made by the dice master contract based on random number generated from the Oracle.

#### 3. **Initializing Contract Reference State**
   - **Setting Token and Oracle Contract Address**: The dice game needs to initialize state of the contract, including references to external contracts like the Token Contract and Oracle Contract.

#### 4. **Making an Inter-Contract Call**
   - **Calling Token Contract**: The Dice Master Contract needs to interact with the Token Contract to transfer tokens. 
     - **Method Invocation**: It calls a method in the Token Contract, such as `Transfer`.
     - **Parameters**: The call includes details like the sender’s address, the recipient’s address (the dice game account), and the amount of tokens.
   - **Calling Oracle Contract**: The Dice Master Contract needs to interact with the Oracle Contract to generate a verifiable random number.
   - **Encoding and Sending**: The parameters are encoded into a transaction format and sent to the Token Contract.

#### 5. **Processing in the Token Contract**
   - **Token Transfer**: The Token Contract processes the transfer request by deducting tokens from the user’s account and adding them to the dice game account.
   - **Return Response**: The Token Contract then returns a result indicating whether the transfer was successful or if it failed.

#### 6. **Handling the Response**
   - **Dice Master Contract’s Role**: Once the dice master contract receives the response from the Token Contract, it checks if the transfer was successful.
   - **Next Steps**: If successful, the dice master contract updates the contract balance and continues with the game logic.

#### 7. **Authorization and Security**
   - **Permission Checks**: Ensures that the Dice Game Contract is authorized to invoke methods in the Token and Oracle Contract.
   - **Secure Transactions**: Ensures that token transfers and random number generation are secure and correctly authorized.

#### 8. **Error Handling**
   - **Failure Management**: If the token transfer fails (e.g., due to insufficient funds), the dice contract handles the error by potentially reverting the transaction or notifying the user.

By following these steps, you can see how oracle networks can be used to generate a truly verifiable random number. This modular approach helps in building complex applications like a dice game by ensuring secure and authorized interactions between contracts.

