import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="local" label="Local" default>

- Basic knowledge of terminal commands
- **IDE** - Install [VS Code](https://code.visualstudio.com/)

**Install Required Packages**

- [Install dotnet 8.0.x SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
- Install aelf contract templates

<Tabs>
<TabItem value="Linux and macOs" label="Linux and macOs" default>
```bash title="Terminal"
dotnet new --install AElf.ContractTemplates
```
</TabItem>

<TabItem value="Windows" label="Windows">
```bash title="Terminal"
dotnet new install AElf.ContractTemplates
```
</TabItem>
</Tabs>

AELF.ContractTemplates contains various predefined templates for the ease of developing smart contracts on the aelf blockchain.

- Install aelf deploy tool

```bash title="Terminal"
dotnet tool install --global aelf.deploy
```

aelf.deploy is a utility tool for deploying smart contracts on the aelf blockchain.
Please remember to export PATH after installing aelf.deploy.

:::info
ℹ️ Note: If you have installed aelf.deploy and your terminal says that there is no such command available, please uninstall and install aelf.deploy.
:::

**Install Node.js and Yarn**

- [Install Node.js](https://nodejs.org/en)
- [Install Yarn](https://classic.yarnpkg.com/lang/en/docs/install)

**Install aelf-command**

<Tabs>
<TabItem value="Linux and macOs" label="Linux and macOs" default>
```bash title="Terminal"
sudo npm i -g aelf-command
```
</TabItem>

<TabItem value="Windows" label="Windows">
```bash title="Terminal"
npm i -g aelf-command
```
</TabItem>
</Tabs>

aelf-command is a CLI tool for interacting with the aelf blockchain, enabling tasks like creating wallets and managing transactions.
Provide required permissions while installing aelf-command globally.
</TabItem>

<TabItem value="codespaces" label="Codespaces">

1. Visit [aelf-devcontainer-template](https://github.com/AElfProject/aelf-devcontainer-template).
2. Click the `Use this template` button. Choose `Create a new repository`.
3. Enter a suitable repository name. Click `Create repository`.
4. Within the GitHub interface of your new repository, click on `Code`.
   Select `Codespaces`.
5. Click on the `+` sign to create a new Codespace.
6. After some time, your workspace will load with the contents of the repository.
   You can now continue your development using GitHub Codespaces.

</TabItem>
</Tabs>
