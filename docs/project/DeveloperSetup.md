#  Developer Setup
## Build / Run / Deploy Prerequisites
### Install Node (also installs NPM)
 * [Node](https://nodejs.org/en/download/) 
   - Do not use version 10 or below since there is no support for `Array.flat()`
   - Do not use version 12 because [Truffle has a conflict](https://github.com/trufflesuite/truffle/issues/2070)
   - Version 11 works fine
   
## Install required Node modules for project
All NPM resources are project-local. No global installs required. We use `npx` to run any npm
executables that needs to be started (e.g., Ganache, etc.)

```
cd path/to/avastars
npm install
```

# Development Tasks
### Generate Contract UML
Generates a [UML diagram](https://dapp-wizards.github.io/Avastars-Contracts/#/project/ContractArchitecture?id=full-system-uml-diagram) of the Avastars contracts. Only local files, doesn't include inherited Open Zeppelin stuff unfortunately.

```npm run uml:generate```

### Start Ganache
An Ethereum client on 127.0.0.1:7545, will start up a local blockchain for testing. It will
create 10 accounts with 100ETH each. We deploy our contract with Account 0.

```npm run ganache:start```

### Start Truffle console
Communicates with the Ethereum client. It provides us with an interactive console for testing
and migrating contracts, etc. May be a little slow to come up, but it will, eventually.

```npm run truffle:start```

#### Compile and migrate contracts, replacing previous deployments
*truffle(development)>* ```migrate --reset```

#### Compile contracts and run tests
*truffle(development)>* ```test```

#### Execute data scripts
*truffle(development)>* ```exec data/<script-name>.js```