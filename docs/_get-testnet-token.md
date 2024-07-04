To deploy smart contracts or execute on-chain transactions on aelf, you'll require testnet ELF tokens.

**Get ELF Tokens**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="cli" label="CLI" default>

Run the following command to get testnet ELF tokens from faucet. Remember to either export your wallet address or replace $WALLET_ADDRESS with your wallet address.

```bash title="Terminal"
export WALLET_ADDRESS=YOUR_WALLET_ADDRESS
curl -X POST "https://faucet.aelf.dev/api/claim?walletAddress=$WALLET_ADDRESS" -H "accept: application/json" -d ""
```
To check your wallet's current ELF balance:
```bash title="Terminal"
export WALLET_PASSWORD=YOUR_WALLET_PASSWORD
aelf-command call ASh2Wt7nSEmYqnGxPPzp4pnVDU4uhj1XW9Se5VeZcX2UDdyjx -a $WALLET_ADDRESS -p $WALLET_PASSWORD -e https://tdvw-test-node.aelf.io GetBalance
```
You will be prompted for the following:  
Enter the required param <symbol\>: **ELF**  
Enter the required param <owner\>: **$WALLET_ADDRESS**

You should see the Result displaying your wallet's ELF balance.

  </TabItem>
  <TabItem value="web" label="Web" default>

Go to this url [https://faucet-ui.aelf.dev](https://faucet-ui.aelf.dev). Enter your address and click `Get Tokens`.

![result](/img/get-token-ui.png)

  </TabItem>
</Tabs>