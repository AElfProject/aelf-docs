import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="local" label="Local" default>

* Basic knowledge of terminal commands
* **IDE** - Install [VS Code](https://code.visualstudio.com/)

**Install Required Packages**

* [Install dotnet 6.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
* Install aelf contract templates

```bash
dotnet new --install AElf.ContractTemplates
```

AELF.ContractTemplates contains various predefined templates for the ease of developing smart contracts on the aelf blockchain.

* Install aelf deploy tool

```bash
dotnet tool install --global aelf.deploy
```

aelf.deploy is a utility tool for deploying smart contracts on the aelf blockchain.
Please remember to export PATH after installing aelf.deploy.

ℹ️ Note: If you have installed aelf.deploy and your terminal says that there is no such command available, please uninstall and install aelf.deploy.

**Install Node.js and Yarn**

* [Install Node.js](https://nodejs.org/en)
* Install aelf-command

```bash
sudo npm i -g aelf-command
```

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