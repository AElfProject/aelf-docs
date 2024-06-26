---
sidebar_position: 4
title: Browser Extension
description: Explore Portkey wallet and other extensions
image: /img/Logo.aelf.svg
---

# aelf-web-extension

### Introduction

aelf Web Extension provides an interface for DApp developers to interact with the aelf blockchain. This guide outlines the usage and implementation details for both users and developers.

### For Users

#### Release Version

Please wait for the official release.

#### Development Version

[dev version](https://chrome.google.com/webstore/detail/aelf-explorer-extension-d/mlmlhipeonlflbcclinpbmcjdnpnmkpf)
For those using QQ Browser and similar, you can add the extension manually.


#### Notice

   - **Note**: Using File:/// protocol may can not use the extenstion //. You must opt in to file access for each extension that requests it. For more details, visit the [Chrome Developer Documentation](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns).


### For DApp Developers

#### Interaction Flow

1. Ensure the user has installed the extension.
2. Connect to the blockchain.
3. Initialize the contract.
4. Call contract methods.


### How to Use

To access the complete data structure, [click here](#data-format). For an extension demo, refer to the provided examples.

-  [Check Extension Demo](#demo-of-checking-the-extension)
-  [GET_CHAIN_STATUS](#get-chain-status)
-  [CALL_AELF_CHAIN](#call-aelf-chain)
-  [LOGIN](#login)
-  [INIT_AELF_CONTRACT](#init-aelf-contract)
-  [CALL_AELF_CONTRACT / CALL_AELF_CONTRACT_READONLY](#call-aelf-contract-call-aelf-contract-readonly)
-  [CHECK_PERMISSION](#check-permission)
-  [SET_CONTRACT_PERMISSION](#set-contract-permission)
-  [REMOVE_CONTRACT_PERMISSION](#remove-contract-permission>)
-  [REMOVE_METHODS_WHITELIST](#remove-methods-whitelist>)


## Data Format

```javascript
{
  "histories": [],
  "keychain": {
    "keypairs": [
      {
        "name": "your keypairs name",
        "address": "your keypairs address",
        "mnemonic": "your keypairs mnemonic",
        "privateKey": "your keypairs privateKey",
        "publicKey": {
          "x": "your keypairs publicKey",
          "y": "your keypairs publicKey"
        }
      }
    ],
    "permissions": [
      {
        "chainId": "AELF",
        "contractAddress": "contract address",
        "contractName": "contract name",
        "description": "contract description",
        "github": "contract github",
        "whitelist": {
          "Approve": {
            "parameter1": "a",
            "parameter2": "b",
            "parameter3": "c"
          }
        }
      }
    ]
  }
}
```

## Demo of Checking the Extension


```javascript
let nightElfInstance = null;

class NightElfCheck {
  constructor() {
    const readyMessage = 'NightElf is ready';
    let resolveTemp = null;
    this.check = new Promise((resolve, reject) => {
      if (window.NightElf) {
        resolve(readyMessage);
      }
      setTimeout(() => {
        reject({
          error: 200001,
          message: 'timeout / cannot find NightElf / please install the extension'
        });
      }, 1000);
      resolveTemp = resolve;
    });
    document.addEventListener('NightElf', result => {
      console.log('Checking the status of extension named NightElf: ', result);
      resolveTemp(readyMessage);
    });
  }

  static getInstance() {
    if (!nightElfInstance) {
      nightElfInstance = new NightElfCheck();
      return nightElfInstance;
    }
    return nightElfInstance;
  }
}

const nightElfCheck = NightElfCheck.getInstance();
nightElfCheck.check.then(message => {
  // connectChain -> Login -> initContract -> call contract methods
});
```


## GET_CHAIN_STATUS

You can see the demo [./devDemos/test.html](https://github.com/hzz780/aelf-web-extension/tree/1.0/devDemos). [demo.js just a draft]

#### Token Transfer

If you want to check Token Transfer Demo. You can [Click Here](https://github.com/hzz780/aelf-web-extension/tree/master/demo/token)

The methods calls act the same as the methods call of the aelf-sdk.js

**Note**: `...` stands for omitted data.


```javascript
const aelf = new window.NightElf.AElf({
  httpProvider: ['http://192.168.197.56:8101/chain'],
  appName: 'Test'
});

aelf.chain.getChainStatus((error, result) => {
  console.log('Chain Status:', error, result);
});
```

##### Expected Result :

```javascript
result = {
     ChainId: "AELF"
     GenesisContractAddress: "61W3AF3Voud7cLY2mejzRuZ4WEN8mrDMioA9kZv3H8taKxF"
}
```


## CALL_AELF_CHAIN

Example of retrieving a transaction result:

```javascript
const txid = 'c45edfcca86f4f528cd8e30634fa4ac53801aae05365cfefc3bfe9b652fe5768';
aelf.chain.getTxResult(txid, (err, result) => {
  console.log('Transaction Result:', err, result);
});
```

##### Expected Result :

```javascript
 result = {
     Status: "NotExisted"
     TransactionId: "ff5bcd126f9b7f22bbfd0816324390776f10ccb3fe0690efc84c5fcf6bdd3fc6"
 }
```

## LOGIN

Example login call:

```javascript
aelf.login({
  appName: 'hzzTest',
  chainId: 'AELF',
  payload: {
    method: 'LOGIN',
    contracts: [
      {
        chainId: 'AELF',
        contractAddress: '4rkKQpsRFt1nU6weAHuJ6CfQDqo6dxruU3K3wNUFr6ZwZYc',
        contractName: 'token',
        description: 'token contract',
        github: ''
      },
      {
        chainId: 'AELF TEST',
        contractAddress: '2Xg2HKh8vusnFMQsHCXW1q3vys5JxG5ZnjiGwNDLrrpb9Mb',
        contractName: 'TEST contractName',
        description: 'contract description',
        github: ''
      }
    ]
  }
}, (error, result) => {
  console.log('Login Result:', result);
});

// keychain = {
//     keypairs: [{
//         name: 'your keypairs name',
//         address: 'your keypairs address',
//         mnemonic: 'your keypairs mnemonic',
//         privateKey: 'your keypairs privateKey'，
//         publicKey: {
//             x: 'f79c25eb......',
//             y: '7fa959ed......'
//         }
//     }],
//     permissions: [{
//         appName: 'hzzTest',
//         address: 'your keyparis address',
//         contracts: [{
//             chainId: 'AELF',
//             contractAddress: '4rkKQpsRFt1nU6weAHuJ6CfQDqo6dxruU3K3wNUFr6ZwZYc',
//             contractName: 'token',
//             description: 'token contract',
//             github: ''
//         }],
//         domain: 'Dapp domain'
//     }]
// }
```


## INIT_AELF_CONTRACT

Example of initializing a contract:

```javascript
// In aelf-sdk.js wallet is the realy wallet.
// But in extension sdk, we just need the address of the wallet.
const tokenContract;
const wallet = {
    address: '2JqnxvDiMNzbSgme2oxpqUFpUYfMjTpNBGCLP2CsWjpbHdu'
};
// It is different from the wallet created by Aelf.wallet.getWalletByPrivateKey();
// There is only one value named address;
aelf.chain.contractAtAsync(
    '4rkKQpsRFt1nU6weAHuJ6CfQDqo6dxruU3K3wNUFr6ZwZYc',
    wallet,
    (error, result) => {
        console.log('>>>>>>>>>>>>> contractAtAsync >>>>>>>>>>>>>');
        console.log(error, result);
        tokenContract = result;
    }
);
```

##### Expected Result :

```javascript
 result = {
    Approve: ƒ (),
     Burn: ƒ (),
     ChargeTransactionFees: ƒ (),
     ClaimTransactionFees: ƒ (),
     ....
 }
```

## CALL_AELF_CONTRACT / CALL_AELF_CONTRACT_READONLY

Example contract method calls:

```javascript
tokenContract.GetBalance.call(
  { symbol: 'AELF', owner: '65dDNxzcd35jESiidFXN5JV8Z7pCwaFnepuYQToNefSgqk9' },
  (err, result) => {
    console.log('Get Balance Result:', result);
  }
);

tokenContract.Approve(
  { symbol: 'AELF', spender: '4rkKQpsRFt1nU6weAHuJ6CfQDqo6dxruU3K3wNUFr6ZwZYc', amount: '100' },
  (err, result) => {
    console.log('Approve Result:', result);
  }
);

// If you use tokenContract.GetBalance.call  this method is only applicable to queries that do not require extended authorization validation.(CALL_AELF_CONTRACT_READONLY)
// If you use tokenContract.Approve this requires extended authorization validation (CALL_AELF_CONTRACT)

// tokenContract.GetBalance.call(payload, (error, result) => {})
// result = {
//     symbol: "AELF",
//     owner: "65dDNxzcd35jESiidFXN5JV8Z7pCwaFnepuYQToNefSgqk9",
//     balance: 0
// }
```

## CHECK_PERMISSION

Example permission check:


```javascript
aelf.checkPermission({
  appName: 'hzzTest',
  type: 'address',
  address: '4WBgSL2fSem9ABD4LLZBpwP8eEymVSS1AyTBCqXjt5cfxXK'
}, (error, result) => {
  console.log('Check Permission Result:', result);
});
```
##### Expected Result :

```javascript

 result = {
     ...,
     permissions:[
         {
             address: '...',
             appName: 'hzzTest',
             contracts: [{
                 chainId: 'AELF',
                 contractAddress: '4rkKQpsRFt1nU6weAHuJ6CfQDqo6dxruU3K3wNUFr6ZwZYc',
                 contractName: 'token',
                 description: 'token contract',
                 github: ''
             },
             {
                 chainId: 'AELF TEST',
                 contractAddress: 'TEST contractAddress',
                 contractName: 'TEST contractName',
                 description: 'contract description',
                 github: ''
             }],
             domian: 'Dapp domain'
         }
     ]
 }
```


## SET_CONTRACT_PERMISSION

Example of removing methods whitelist:

```javascript
aelf.removeContractPermission({
    appName: 'hzzTest',
    chainId: 'AELF',
    payload: {
        contractAddress: '2Xg2HKh8vusnFMQsHCXW1q3vys5JxG5ZnjiGwNDLrrpb9Mb'
    }
}, (error, result) => {
    console.log('removeContractPermission>>>>>>>>>>>>>>>>>>>', result);
});
```

##### Expected Result

```javascript
 keychain = {
     keypairs: {...},
     permissions: [{
         appName: 'hzzTest',
         address: 'your keyparis address',
         contracts: [{
             chainId: 'AELF',
             contractAddress: '4rkKQpsRFt1nU6weAHuJ6CfQDqo6dxruU3K3wNUFr6ZwZYc',
             contractName: 'token',
     description: 'token contract',
             github: ''
         }],
         domain: 'Dapp domain'
     }]
 }
```


## REMOVE_METHODS_WHITELIST

Example of removing contract permission:

```javascript
aelf.removeContractPermission({
  appName: 'hzzTest',
  chainId: 'AELF',
  payload: {
    contractAddress: '2Xg2HKh8vusnFMQsHCXW1q3vys5JxG5ZnjiGwNDLrrpb9Mb'
  }
}, (error, result) => {
  console.log('Remove Contract Permission Result:', result);
});
```

##### Expected Result

```javascript
keychain = {
    keypairs: {...},
    permissions: [{
        appName: 'hzzTest',
        address: 'your keyparis address',
        contracts: [{
            chainId: 'AELF',
            contractAddress: '4rkKQpsRFt1nU6weAHuJ6CfQDqo6dxruU3K3wNUFr6ZwZYc',
            contractName: 'token',
            description: 'token contract',
            github: '',
            whitelist: {}
        }],
        domain: 'Dapp domain'
    }]
}
```


## For Extension Developers

1. Download the code:

```base
git clone https://github.com/hzz780/aelf-web-extension.git
```

2. Install dependencies:

```base
npm install
```

3. Run webpack:

```base
webpack -w
```

4. Add to the browser:

```base
open development mode, add the webpack output app/public.
```

## Project Information

We use [ECDH](https://github.com/indutny/elliptic)` to use public key
to encryt data and private key to decrypt data.




