### Setting Up the Dice Game Smart Contract

Let’s configure your deployed Dice Game smart contract so you can interact with its functionality in this tutorial.

**Step 1. Locate the Configuration File**

- Navigate to the file located at: `src/config/configTest.ts`

**Step 2. Update the Smart Contract Address**

- Find the comment `// Step A - Configure Dice Contract`

- Replace the placeholder value `add_your_deployed_dice_contract` with the address of your deployed smart contract.

**Example:**

```typescript
// Replace with the address of your deployed smart contract
const DICE_CONTRACT_ADDRESS = "your_deployed_contract_address";
```

:::tip
Make sure to use the smart contract address from the "Deploy Smart Contract" step. Double-check for accuracy to avoid errors later!
:::

### Setting Up Wallet Integration

Let’s configure wallet connection, disconnection, and display wallet information so you can seamlessly interact with the Dice Game.

**Step 1. Locate the Wallet Configuration File**

- Navigate to the file located at: `src/app/dice/Account.tsx`

**Step 2. Update the Wallet Connection Handler**

- Find the comment `// Step B - Connect wallet handler`

- Replace the existing **`onConnectBtnClickHandler`** function with the updated code below:

```javascript title="Account.tsx"
// Step B - Connect wallet handler
export const onConnectBtnClickHandler = async (connectWallet: () => void) => {
  try {
    const rs = await connectWallet();
    console.log('walletConnected rs: ', rs);
  } catch (e) {
    console.log(e.message);
  }
};
```

**Step 3. Update the Wallet Disconnection Handler**

- Find the comment `// Step C - Disconnect wallet handler`

- Replace the existing **`onDisConnectBtnClickHandler`** function with the updated code below:

```javascript title="Account.tsx"
// Step C - Disconnect wallet handler
export const onDisConnectBtnClickHandler = async (
  disConnectWallet: () => void
) => {
  await disConnectWallet();
};
```

**Step 4. Update the Wallet Info Component**

- Find the comment `// Step D - Wallet info component`

- Replace the existing **`WalletConnectWithRTK`** function with the updated code below:

```javascript title="Account.tsx"
// Step D - Wallet info component
export const WalletConnectWithRTK = () => {
  const dispatch = useAppDispatch();
  const walletConnected = useAppSelector(getWalletInfo);
  const { disConnectWallet, walletInfo } = useConnectWallet();
  useEffect(() => {
    if (walletInfo) {
      dispatch(setWalletInfo(formatWalletInfo(walletInfo)));
    }
  }, [dispatch, walletInfo]);
  if (!walletInfo) {
    return "";
  }
  if (walletConnected && walletConnected?.address) {
    return (
      <div className="flex items-start">
        <div className="tron-glow mr-2 bg-gradient-to-r from-teal-300 to-teal-500 bg-clip-text text-2xl font-bold text-transparent">
          Hello, {walletConnected.name}
        </div>
        <div
          className="cursor-pointer text-teal-400 text-opacity-50"
          onClick={() => onDisConnectBtnClickHandler(disConnectWallet)}
        >
          Logout
        </div>
      </div>
    );
  }

  return "";
};
```

**Explanation:**

- **Wallet Connection Handler (`connectWallet`):** Initiates the wallet connection process and logs the connection status.

- **Wallet Disconnection Handler (`disConnectWallet`):** Safely disconnects the wallet when triggered.

- **Wallet Info Component:**
  - Displays the connected wallet’s information, including a friendly greeting.
  - Offers a logout option to disconnect the wallet.
  - Keeps wallet information up to date using React hooks and Redux Toolkit.

we will use these handlers and components to ensure a smooth wallet experience for your Dice Game.
You're all set to integrate wallet functionality into your project! 🚀

### Setting Up Token Contract Methods

We’ll set up token contract methods to **get allowance**, **set allowance**, and combine them into a reusable hook for streamlined functionality.

**Step 1: Locate the File**

- Go to the `src/app/dice/useDiceMethods.ts` file.

**Step 2: Write the Get Allowance Functions**

- Find the comment `// Step E - Check Get Token Alowance`.

- Replace the existing `getAllowance` function with this code snippet:

```javascript title="useDiceMethods.ts"
// Step E - Check Get Token Alowance
const getAllowance = async () => {
  if (!walletInfo) {
    message.error("Please login");
    return;
  }
  const res = await callViewMethod({
    chainId: CHAIN_ID,
    contractAddress: TOKEN_CONTRACT_ADDRESS,
    methodName: "GetAllowance",
    args: {
      symbol: "ELF",
      owner: walletInfo.address,
      spender: DICE_CONTRACT_ADDRESS,
    },
  });
  console.log("GetAllowance: ", res);
  return res.data.allowance;
};
```

**Step 3: Write the Set Allowance Functions**

- Find the comment `// Step F - Set Token Alowance`.

- Replace the existing `setAllowance` function with this code snippet:

```javascript title="useDiceMethods.ts"
// Step F - Set Token Alowance
const setAllowance = async () => {
  const allowance: string = await getAllowance();
  if (new Bignumber(allowance).div(1e8).isGreaterThan(10)) {
    return;
  }
  const res = await callSendMethod({
    chainId: CHAIN_ID,
    contractAddress: TOKEN_CONTRACT_ADDRESS,
    methodName: "Approve",
    args: {
      symbol: "ELF",
      amount: new Bignumber(100).multipliedBy(1e8).toString(),
      spender: DICE_CONTRACT_ADDRESS,
    },
  });
  const txResult = await getTxResultRetry(res.transactionId, EXPLORE_URL);
  return res;
};
```

**Explanation:**

- **`getAllowance` Function**

  - Retrieves the current token allowance for the Dice Game smart contract.
  - Ensures the wallet is connected before proceeding.

- **`setAllowance` Function**
  - Checks the current allowance using `getAllowance`.
  - If the allowance is less than 10 tokens, it sends a request to approve 100 tokens.
  - Waits for the transaction result and returns the response.

Combining these functions into a custom hook simplifies token allowance management and ensures smooth interactions with the Dice Game.
You're now ready to handle token allowances efficiently! 🚀

### Setting Up Dice Contract Methods

Let’s create the methods needed to **get player info**, **play the game**, and put them together into a single, easy-to-use hook.

**Step 1: Create the Get Player Info Function**

- Scroll down and find the comment `// Step G - Get Player Info From Dice Contract`.

- Replace the existing `getPlayerInfo` function with this code snippet:

```javascript title="useDiceMethods.ts"
// Step G - Get Player Info From Dice Contract
const getPlayerInfo = async () => {
  if (!walletInfo) {
    message.error("Please login");
    return {};
  }
  try {
    // Call the contract's "GetPlayerInfo" method with the player's wallet address
    const res = await callViewMethod({
      chainId: CHAIN_ID,
      contractAddress: DICE_CONTRACT_ADDRESS,
      methodName: "GetPlayerInfo",
      args: walletInfo.address,
    });
    // Update playerInfo state with the retrieved data
    setPlayerInfo(res.data);
    return res.data;
  } catch (e) {
    // Log an error if no information is available yet
    console.log("getPlayerInfo:", "no info yet");
    return {};
  }
};
```

**Step 2: Automatically Fetch Player Info**

Set up the code to automatically get player details whenever the wallet is connected.

- Scroll down and find the comment `// Step H - Fetch player information when the wallet is connected.`.

- Replace the existing `useEffect` with this code snippet:

```javascript title="useDiceMethods.ts"
// Step H - Fetch player information when the wallet is connected.
useEffect(() => {
  if (!walletInfo) {
    return;
  }

  // Define and invoke an asynchronous function to get player info
  const main = async () => {
    await getPlayerInfo();
  };
  main();
}, [walletInfo]); // Dependency array ensures this effect runs when walletInfo changes
```

**Step 3: Create the Play Game Function**

This function lets the user play the Dice game by interacting with the contract.

- Scroll down and find the comment `// Step I - Play Game`.

- Replace the existing `useEffect` with this code snippet:

```javascript title="useDiceMethods.ts"
// Step I - Play Game
const play = async (multiplier = 1) => {
  // Ensure the required token allowance is set
  await setAllowance();

  // Call the contract's "Play" method with the calculated value
  const res = await callSendMethod({
    chainId: CHAIN_ID,
    contractAddress: DICE_CONTRACT_ADDRESS,
    methodName: "Play",
    args: {
      value: new Bignumber(BASE_NUMBER)
        .multipliedBy(10 ** 8)
        .multipliedBy(multiplier),
    },
  });
  // Wait for the transaction result to be confirmed
  await getTxResultRetry(res.transactionId, EXPLORE_URL);
  // Refresh the player's information after the game
  await getPlayerInfo();
};
```

**Explanation:**

- **Get Player Info**: Fetches player stats from the blockchain and updates the app.
- **Auto Fetch Player Info**: Ensures player details are always synced when the wallet is connected.
- **Play Game**: Handles the gameplay logic by setting allowances, interacting with the contract, and updating the player’s stats.

Now you have a well-structured hook to manage all Dice game methods in one place.


### Setting Up Game Features and Effects

Let’s create the functions needed to **fetch player information**, **spawn particle effects**, **display game results**, and **handle dice rolls**.

1. **Fetching Player Information:**
   We’ll start by creating a function that fetches player data when the wallet is connected. This function will automatically update the player’s information so you can access their stats and game status seamlessly.

2. **Creating and Spawning Particle Effects:**
   To add some excitement and interactivity to the game, we’ll set up particle effects triggered by player actions. This includes creating individual particle effects (e.g., stars, sparks) and spawning multiple particles at a specific position on the screen.

3. **Displaying Game Results:**
   After each game round, we’ll handle displaying the result to the player. Whether they win or lose, the result message will update accordingly, including any ELF rewards earned.

4. **Handling Dice Rolls:**
   We’ll implement the logic for rolling the dice, interacting with the game contract, and managing animations. The dice roll will trigger specific visual effects and update the player’s information once the game round concludes.

By the end of this setup, these functions will be integrated into a cohesive experience that allows players to interact with the game smoothly, see real-time updates, and enjoy engaging visual effects.

**Step 1: Locate the File**

- Go to the `src/app/dice/page.tsx` file.

**Step 2: Call Get Player Info Funcation**

- Find the comment `// Step J - Fetch player information when wallet is connected`.

- Replace the existing `useEffect` with this code snippet:

```javascript title="page.tsx"
// Step J - Fetch player information when wallet is connected
useEffect(() => {
  if (!walletInfo) {
    return;
  }
  const loopGetPlayInfo = async () => {
    const result = await getPlayerInfo();
    setPlayerInfo({
      ...playerInfo,
      ...result,
    });
  };
  loopGetPlayInfo();
}, [walletInfo]);
```

**Step 3: Creates a single particle effect**

- Find the comment `// Step K - Creates a single particle effect.`.

- Replace the existing `createParticle` fucntion with this code snippet:

```javascript title="page.tsx"
  // Step K - Creates a single particle effect.
  const createParticle = useCallback(
    (x: number, y: number, container: HTMLDivElement, type: string) => {
      const particle = document.createElement('div');
      particle.className = `particle ${type}`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      // Random spread for different directions
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 100 + 50;
      particle.style.setProperty(
        '--spread-x',
        `${Math.cos(angle) * distance}px`,
      );
      particle.style.setProperty(
        '--spread-y',
        `${Math.sin(angle) * distance}px`,
      );

      // Random trail effect
      particle.style.setProperty(
        '--trail-x',
        `${(Math.random() - 0.5) * 100}px`,
      );
      particle.style.setProperty('--trail-y', `${-Math.random() * 100 - 50}px`);

      container.appendChild(particle);

      // Define animations for different particle types
      const animations = {
        'particle-basic': [
          { transform: 'scale(1) translate(0, 0)', opacity: 1 },
          {
            transform: `scale(0) translate(${Math.random() * 100 - 50}px, ${-Math.random() * 100}px)`,
            opacity: 0,
          },
        ],
        'particle-star': [
          { transform: 'rotate(0deg) scale(1)', opacity: 1 },
          { transform: 'rotate(360deg) scale(0)', opacity: 0 },
        ],
        'particle-spark': [
          {
            transform: `rotate(${Math.random() * 360}deg) translateX(0)`,
            opacity: 1,
          },
          {
            transform: `rotate(${Math.random() * 360}deg) translateX(${Math.random() * 100 + 50}px)`,
            opacity: 0,
          },
        ],
        'particle-ring': [
          { transform: 'scale(1)', opacity: 1, borderWidth: '2px' },
          { transform: 'scale(2)', opacity: 0, borderWidth: '0px' },
        ],
        'particle-trail': {
          duration: 1000,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
          iterations: 1,
        },
      };

      // Apply animation and remove particle after animation ends
      const animation = particle.animate(
        animations[type as keyof typeof animations] ||
          animations['particle-basic'],
        {
          duration: 1000 + Math.random() * 500,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
        },
      );

      animation.onfinish = () => particle.remove();
    },
    [],
  );
```

**Step 4: Spawns multiple particle effects**

- Find the comment `// Step L - Spawns multiple particle effects at a specified position.`.

- Replace the existing `spawnParticles` fucntion with this code snippet:

```javascript title="page.tsx"
  // Step L - Spawns multiple particle effects at a specified position.
  const spawnParticles = useCallback(
    (x: number, y: number) => {
      const container = document.querySelector(
        '.particle-container',
      ) as HTMLDivElement;
      if (!container) return;

      const particleTypes = [
        'particle-basic',
        'particle-star',
        'particle-spark',
        'particle-ring',
        'particle-trail',
      ];

      // Spawn multiple waves of particles
      for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
          for (let i = 0; i < 8; i++) {
            particleTypes.forEach((type) => {
              const offsetX = (Math.random() - 0.5) * 20;
              const offsetY = (Math.random() - 0.5) * 20;
              createParticle(x + offsetX, y + offsetY, container, type);
            });
          }
        }, wave * 100);
      }
    },
    [createParticle],
  );
```

**Step 5: Displays the result**

- Find the comment `// Step M - Displays the result message based on the game outcome.`.

- Replace the existing `handleGameResult` fucntion with this code snippet:

```javascript title="page.tsx"
// Step M - Displays the result message based on the game outcome.
const handleGameResult = (isWin: boolean, amount: string) => {
  const number = new Bignumber(amount).div(10 ** 8);
  let message = `Lose ${number} ELF. Better luck next time!`;
  if (isWin) {
    message = `Congratulations! You Win ${number.multipliedBy(2)} ELF!`;
  }
  setMessage(message);
};
```

**Step 6: Rolls the dice**

- Find the comment `// Step N - Rolls the dice`.

- Replace the existing `rollDice` fucntion with this code snippet:

```javascript title="page.tsx"
// Step N - Rolls the dice
const rollDice = async (multiplier = 1) => {
  setMessage('');
  if (isRolling) return;

  setIsRolling(true);
  setMessage('');
  const sequenceNumber = Math.floor(Math.random() * 3) + 1;
  setSequence(sequenceNumber);

  new Audio('https://www.soundjay.com/misc/sounds/dice-roll-01.mp3')
    .play()
    .catch(() => {});

  const startTimePlay = Date.now();
  try {
    setIsPlaying(true);
    await play(multiplier);
  } catch (error) {
    console.log('play failed: ', error);
    setIsPlaying(false);
    setIsRolling(false);
    if(error instanceof Error){
      alert(error.message);
    }
    return;
  }
  const startTime = Date.now();
  const getPlayInfoInterval = setInterval(async () => {
    const result = await getPlayerInfo();
    if (result.pending === false) {
      // if (result.score !== prePlayScore) {
      clearInterval(getPlayInfoInterval);
      setPlayerInfo({
        ...playerInfo,
        ...result,
      });
      playerInfoGlobal = result;
      if (result.win) {
        handleGameResult(true, result.amount);
      } else {
        handleGameResult(false, result.amount);
      }

      const finalDice1 = parseInt(playerInfoGlobal.dice1, 10);
      const finalDice2 = parseInt(playerInfoGlobal.dice2, 10);
      setDice1(finalDice1);
      setDice2(finalDice2);
      setIsRolling(false);
      setIsShaking(true);
      setIsPlaying(false);

      // Get dice positions for particle effects
      const dice1El = document.querySelector('.dice-container:first-child');
      const dice2El = document.querySelector('.dice-container:last-child');

      if (dice1El) {
        const rect1 = dice1El.getBoundingClientRect();
        spawnParticles(
          rect1.left + rect1.width / 2,
          rect1.top + rect1.height / 2,
        );
      }

      if (dice2El) {
        const rect2 = dice2El.getBoundingClientRect();
        spawnParticles(
          rect2.left + rect2.width / 2,
          rect2.top + rect2.height / 2,
        );
      }

     // Remove screen shake after animation
     setTimeout(() => setIsShaking(false), 500);

      console.log('Time used: ', Date.now() - startTime);
      console.log('Time used with play: ', Date.now() - startTimePlay);
    }
  }, 500);
};
```

Now that we've written all the necessary frontend functions and hooks, we're ready to run the Dice Game in the next step.
