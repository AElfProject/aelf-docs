---
sidebar_position: 2
title: Development Environment
---

## Development Environment

### Before You Start
To develop smart contracts, you need to install the .NET SDK. Other tools for starting aelf nodes and publishing contracts are optional.

### macOS Setup
1. **Requirements**:
   - macOS 10.7 or higher
   - 2GHz processor (3GHz recommended)
   - 8 GB RAM (16 GB recommended)
   - 10 GB free space
   - Broadband internet

2. **Apple M1 Support**: Install Rosetta:
   ```bash title="Terminal"
   /usr/sbin/softwareupdate --install-rosetta --agree-to-license
   ```

3. Install Homebrew:
    ```sh title="Terminal"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    brew --version
    brew update
    ```

4. Install Git:
    ```sh title="Terminal"
    brew install git
    git --version
    ```
    
5. Install .NET SDK:
    ```sh title="Terminal"
    brew install --cask dotnet-sdk
    dotnet --version
    ```

6. Install protoBuf:
    ```sh title="Terminal"
    brew install protobuf
    protoc --version
    ```

7. Install Redis:
    ```sh title="Terminal"
    brew install redis
    redis-server
    ```
![mac_install_redis1](/img/mac_install_redis1.png)

8. Install Node.js:
    ```sh title="Terminal"
    brew install node
    npm --version
    ```

9. Install aelf-command:
    ```sh title="Terminal"
    npm i aelf-command -g
    ```

10. Create an aelf Account:
    ```sh title="Terminal"
    aelf-command create
    ```   

    Similar Output:
    ```sh title="Terminal"
    AElf [Info]: Your wallet info is :
    AElf [Info]: Mnemonic            : mirror among battle muffin cattle plunge tuition buzz hip mad surround recall
    AElf [Info]: Private Key         : 4bf625afea60e21aa5afcab5ea682b3dfb614941245698632d72a09ae13*****
    AElf [Info]: Public Key          : 04f9bb56a9eca921bd494e677307f0279c98f1d2ed6bdeaa6dd256878272eabd14e91ec61469d2a32ce5e63205930dabdc0b9f13fc80c1f4e31760618d182*****
    AElf [Info]: Address             : 21qciGwcaowwBttKMjMk86AW6WajhcodSHytY1vCyZb7p*****
    ```

### Linux Setup
1. **Requirements**:
    - Ubuntu 18.04
    - Broadband internet

2. Update Environment:
    ```sh title="Terminal"
    sudo apt-get update
    ```

3. Install Git:
    ```sh title="Terminal"
    sudo apt-get install git -y
    git --version
    ```

4. Install .NET SDK:
    ```sh title="Terminal"
    wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
    sudo dpkg -i packages-microsoft-prod.deb
    sudo apt-get update
    sudo apt-get install -y dotnet-sdk-6.0
    dotnet --version
    ```

5. Install protoBuf:
    ```sh title="Terminal"
    curl -OL https://github.com/google/protobuf/releases/download/v21.9/protoc-21.9-linux-x86_64.zip
    unzip protoc-21.9-linux-x86_64.zip -d protoc3
    sudo mv protoc3/bin/* /usr/local/bin/
    sudo mv protoc3/include/* /usr/local/include/
    protoc --version
    ```

6. Install Redis:
    ```sh title="Terminal"
    sudo apt-get install redis -y
    redis-server
    ```

7. Install Node.js:
    ```sh title="Terminal"
    curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
    npm --version
    ```

8. Install aelf-command:
    ```sh title="Terminal"
    npm i aelf-command -g
    ```

9. Create an aelf Account:
    ```sh title="Terminal"
    aelf-command create
    ```

### Windows Setup
1. **Requirements**:
    - Windows 10 or higher
    - Broadband internet

2. Install Chocolatey:
    ```sh title="Terminal"
    Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    choco
    ```

3. Install Git:
    ```sh title="Terminal"
    choco install git -y
    git --version
    ```

4. Install .NET SDK:
    ```sh title="Terminal"
    choco install dotnetcore-sdk -y
    dotnet --version
    ```

5. Install protoBuf:
    ```sh title="Terminal"
    choco install protoc -y
    protoc --version
    ```

6. Install Redis:
    ```sh title="Terminal"
    choco install redis-64 -y
    redis-server
    ```
![windows_install_redis1](/img/windows_install_redis1.webp)

7. Install Node.js:
    ```sh title="Terminal"
    choco install nodejs -y
    npm --version
    ```

8. Install aelf-command:
    ```sh title="Terminal"
    npm i aelf-command -g
    ```

9. Create an aelf Account:
    ```sh title="Terminal"
    aelf-command create
    ```

### Codespaces Setup
1. Open Codespaces:
![codespaces11](/img/codespaces11.webp)

2. Visit the aelfProject repo.

3. Click "Code" > "Codespaces" > "+" to create a new codespace.
![codespaces21](/img/codespaces21.webp)

4. Check Installed Versions:
    ```sh title="Terminal"
    git --version
    npm --version
    ```

5. Update Environment:
    ```sh title="Terminal"
    sudo apt-get update
    ```

6. Install .NET SDK:
    ```sh title="Terminal"
    wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
    sudo dpkg -i packages-microsoft-prod.deb
    sudo apt-get update
    sudo apt-get install -y dotnet-sdk-6.0
    dotnet --version
    ```

7. Install protoBuf:
    ```sh title="Terminal"
    curl -OL https://github.com/google/protobuf/releases/download/v21.9/protoc-21.9-linux-x86_64.zip
    unzip protoc-21.9-linux-x86_64.zip -d protoc3
    sudo mv protoc3/bin/* /usr/local/bin/
    sudo mv protoc3/include/* /usr/local/include/
    protoc --version
    ```

8. Install Redis:
    ```sh title="Terminal"
    sudo apt-get install redis -y
    redis-server
    ```

9. Install aelf-command:
    ```sh title="Terminal"
    npm i aelf-command -g
    ```

10. Create an aelf Account:
    ```sh title="Terminal"
    aelf-command create
    ```
