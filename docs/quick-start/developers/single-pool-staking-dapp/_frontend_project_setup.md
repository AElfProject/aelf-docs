import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Project Setup

Let's start by cloning the frontend project repository from github.


- Run the following command in your Terminal:

```bash title="Terminal"
git clone https://github.com/AElfProject/aelf-samples.git
```

- Next, navigate to the staking frontend project directory with this command:

```bash title="Terminal"
cd aelf-samples/staking/2-dapp
```
- Once you're inside the `2-dapp` directory, open the project with your preferred IDE (e.g., VSCode). You should see the project structure as shown below.

export const tree = {
  "type": "directory",
  "uri": "2-dapp",
  "expanded": true,
  "children": [
    {
      "type": "directory",
      "uri": "app"
    },
    {
      "type": "directory",
      "uri": "assets"
    },
    {
      "type": "directory",
      "uri": "public"
    },
    {
      "type": "directory",
      "uri": "src"
    },
    {
      "type": "file",
      "uri": ".gitignore"
    },
    {
      "type": "file",
      "uri": "components.json"
    },
    {
      "type": "file",
      "uri": "index.html"
    },
    {
      "type": "file",
      "uri": "package.json"
    },
    {
      "type": "file",
      "uri": "postcss.config.js"
    },
    {
      "type": "file",
      "uri": "README.md"
    },
    {
      "type": "file",
      "uri": "tailwind.config.js"
    },
    {
      "type": "file",
      "uri": "tsconfig.json"
    },
    {
      "type": "file",
      "uri": "tsconfig.node.json"
    },
    {
      "type": "file",
      "uri": "vite.config.ts"
    }
  ]
}

<div style={{height: 500}}><FileTree tree={tree} /></div>

#### Install necessary packages and libraries

- Run this command in the terminal to install all necessary packages and libraries.

<Tabs>
<TabItem value="Linux and macOs" label="Linux and macOs" default>
```bash title="Terminal"
sudo npm install
```
</TabItem>

<TabItem value="Windows" label="Windows">
```bash title="Command Prompt"
npm install
```
</TabItem>
</Tabs>

We are now ready to build the frontend components of our Staking dApp.
