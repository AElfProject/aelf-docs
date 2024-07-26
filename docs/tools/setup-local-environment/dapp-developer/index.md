---
sidebar_position: 3
description: Developing decentralised applications (dApps)
---

# dApp Developer

## Setting up a development environment for developing dApps

Developing decentralised applications (dApps) requires a well-configured development environment. This guide walks you through setting up your environment to build, test, and debug dApps efficiently.

A typical dApp consists of the following components:

1. Smart contract
2. Frontend interface
3. Backend interface (optional)

## Prerequisites

Before diving into the setup, ensure you have the following:

- Operating System: Windows, macOS, or Linux.
- Internet Connection: For downloading and installing tools.

## Step-by-Step Setup

### 1. Install dependencies

<Tabs queryString="dapp-components">

  <TabItem value="smart-contract" label="Smart contract" default>

    **Install .NET SDK**

    The .NET SDK includes the runtime and tools needed to build and run .NET applications.

    - Visit the [.NET Downloads page](https://dotnet.microsoft.com/download).
    - Download the latest version of the .NET SDK installer.
    - Run the installer and follow the prompts.

  </TabItem>

  <TabItem value="frontend" label="Frontend interface">

    **Install Node.js**

    - Visit the [Node.js](https://nodejs.org/en) homepage.
    - Download the LTS version of Node.js.
    - Run the installer and follow the prompts.

  </TabItem>

  <TabItem value="backend" label="Backend interface">

The specific dependencies to install will depend on the programming language you choose for your backend service.

| Language   | Description                                                                                                                   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------- |
| C#         | See [Smart contract](/tools/setup-local-environment/dapp-developer/?dapp-components=smart-contract) tab.                      |
| JavaScript | See [Frontend interface](/tools/setup-local-environment/dapp-developer/?dapp-components=frontend) tab.                        |
| Go         | Visit the [Go install page](https://go.dev/doc/install) and download the installer. Run the installer and follow the prompts. |
| Java       | Visit the [Java page](https://www.java.com/en/) and download the installer. Run the installer and follow the prompts.         |
| PHP        | Visit the [PHP Manual installation and configuration page](https://www.php.net/manual/en/install.php) and follow the steps.   |
| Python     | Visit the [Python setup and usage page](https://docs.python.org/3/using/index.html) and follow the steps.                     |

  </TabItem>

</Tabs>

---

### 2. Install an IDE

A good IDE can significantly enhance your productivity. Here are the popular options:

#### Visual Studio (Windows):

- Visit the [Visual Studio](https://visualstudio.microsoft.com/downloads/) Downloads page and download the Community, Professional, or Enterprise edition.

#### Visual Studio Code (Cross-platform):

- Visit the Visual Studio Code Downloads page.
- Download and install the appropriate version for your operating system.
- After installation, install the C# extension from the Extensions view (`Ctrl`+`Shift`+`X`) by searching for C#.

### 3. Install Additional Tools

#### Git

If you plan to use version control, install Git from the [Git Downloads page](https://git-scm.com/downloads).
