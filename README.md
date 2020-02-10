# Avastars Contracts
Ethereum-based collectible avatars with on-chain artwork
 
## Documentation
Developer setup, contract architecture, UML, and docs, trait hash bitmasking info, unit test output, 
and more are available at:
* https://dapp-wizards.github.io/Avastars-Contracts

## Repository Contents

### /contracts
Ethereum smart contracts for the Avastar project

### /data
Scripts, data, and logs for preparing deployed contracts for use

### /docs
The [project documentation](https://dapp-wizards.github.io/Avastars-Contracts), processed and redeployed upon each 
commit to Github.

### /flat
The source code for the deployed contracts and their dependencies, flattened into long files, for uploading to
etherscan.io for verification. Once Etherscan verifies the flattened file compiles to the exact bytecode of the
deployed contract, the world can view the source code and interact with the contract methods via their web interface.
These files were created with the shell script `flatten-contracts.sh`.

### /migrate_partial, /migrations
The scripts for deploying the contracts. The `AvastarMetadata` and `AvastarPrimeMinter` contracts may be upgraded, and 
so the `migrate_partial` folder contains copies of the `migrations` scripts edited so as not to overwrite the 
`AvastarTeleporter` contract once deployed.

### /poc
Our initial proof of concept, built in a single day, which gave us the confidence that we could do layered SVG on the
blockchain. Also contains our further thoughts about how we would handle traits that depended upon other traits,
such as a randomly chosen hair style using a randomly chosen hair color.

### /solidoc
Our own customized version of the [solidoc](https://github.com/CYBRToken/solidoc) Solidity documentation generator.
It is a great project, except it was abandoned in late 2018 and only included support for `^0.4.x` versions of
Solidity. After quite a bit of research, and no working projects satisfied our needs. So, upgrading this project seemed 
like the best approach. We put in a ton of effort to make it work but we're happy with the results. Of course now, 
there is Solidity `^0.6.x`, and this code might or might not work with it. It would be a good starting point for if 
nothing else emerges. We may publish this one in a separate repo if we have time and/or someone would like to help
push it forward to work with the latest Solidity versions.

### /test
Our truffle unit tests for the project's smart contracts.

### /util
Constants and various helper code used by tests and data processing scripts.
 
## Deployment Overview

### Migration (Rinkeby example)
```
truffle console --network rinkeby
truffle(rinkeby)> migrate --reset

Compiling your contracts...
===========================
> Everything is up to date, there is nothing to compile.


Starting migrations...
======================
> Network name:    'rinkeby'
> Network id:      4
> Block gas limit: 0x98705c


1_initial_migration.js
======================

   Replacing 'Migrations'
   ----------------------
   > transaction hash:    0xe0b6879b77a6b9f1b0f0c617b03d7b04b3836b9da01249939824c831e7a5c276
   > Blocks: 1            Seconds: 12
   > contract address:    0x3c204926311ff3a66D7CeAFcfe013F88D1Ea1888
   > block number:        5919726
   > block timestamp:     1580935975
   > account:             0x603158d642682E0D59b0Ab9d7e0c305EeA9C947a
   > balance:             9.443871763
   > gas used:            168286
   > gas price:           2 gwei
   > value sent:          0 ETH
   > total cost:          0.000336572 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:         0.000336572 ETH


2_deploy_contracts.js
=====================
Deploying contracts...

   Replacing 'AvastarTeleporter'
   -----------------------------
   > transaction hash:    0xa743237ade257f6284e52255cb4d3b70fd8555b279395d5239c2492311e9e9c3
   > Blocks: 0            Seconds: 12
   > contract address:    0x30E011460AB086a0daA117DF3c87Ec0c283A986E
   > block number:        5919728
   > block timestamp:     1580936005
   > account:             0x603158d642682E0D59b0Ab9d7e0c305EeA9C947a
   > balance:             9.432706301
   > gas used:            5540452
   > gas price:           2 gwei
   > value sent:          0 ETH
   > total cost:          0.011080904 ETH


   Replacing 'AvastarPrimeMinter'
   ------------------------------
   > transaction hash:    0x33c70c965c30c3190144448522400a38121f069c2ba856f1130ba8ea0ec982d9
   > Blocks: 0            Seconds: 12
   > contract address:    0x276c42D14067294747AA2f5d2F8E6e49864b306E
   > block number:        5919729
   > block timestamp:     1580936020
   > account:             0x603158d642682E0D59b0Ab9d7e0c305EeA9C947a
   > balance:             9.430592647
   > gas used:            1056827
   > gas price:           2 gwei
   > value sent:          0 ETH
   > total cost:          0.002113654 ETH


   Replacing 'AvastarMetadata'
   ---------------------------
   > transaction hash:    0x71a83f687fdae8b8aa4846761547f77274dd6b9e176e8731284be28087843cd9
   > Blocks: 0            Seconds: 12
   > contract address:    0x64f241F435bb11a035d4e2c139068A2ED979bb39
   > block number:        5919730
   > block timestamp:     1580936035
   > account:             0x603158d642682E0D59b0Ab9d7e0c305EeA9C947a
   > balance:             9.425590535
   > gas used:            2501056
   > gas price:           2 gwei
   > value sent:          0 ETH
   > total cost:          0.005002112 ETH

----------------------------------
Preparing AvastarMetadata contract
----------------------------------
Set teleporter contract address
Set Token URI Base
Set View URI Base
Set Media URI Base
Add admins
Unpause

------------------------------------
Preparing AvastarTeleporter contract
------------------------------------
Add admins, owners, minters
Set metadata contract address
Unpause

-------------------------------------
Preparing AvastarPrimeMinter contract
-------------------------------------
Set teleporter contract address
Add admins, owners, minters
Set current generation
Unpause


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.01819667 ETH


Summary
=======
> Total deployments:   4
> Final cost:          0.018533242 ETH
```

### Setup - [Artist Attribution](https://github.com/Dapp-Wizards/Avastars-Contracts/tree/master/data#set-artist-attribution) (Rinkeby example)
#### Must edit data/attribution/set-attribution.js, set artist info first!
```
truffle(rinkeby)> exec data/set-attribution.js
Using network 'rinkeby'.

Adding artist attribution for Generation 1...
Gas used: 114231
```

### Setup - [Create Traits](https://github.com/Dapp-Wizards/Avastars-Contracts/tree/master/data#create-traits) (Rinkeby example)
#### Must edit data/traits/create-traits.js, set NETWORK constant, and comment out safety catch first!
```
truffle(rinkeby)> exec data/create-traits.js
Using network 'rinkeby'.

Environment / network...
TEST rinkeby
Fetching accounts...
Start from scratch with new log.
Processing raw database dump...
614 traits processed.
Adding traits to contract...
.
.
.
```

### Setup - [Create Promos](https://github.com/Dapp-Wizards/Avastars-Contracts/tree/master/data#create-promos) (Rinkeby example)
#### Must edit data/promos/create-promos.js, set NETWORK constant, and comment out safety catch first!
```
truffle(rinkeby)> exec data/create-promos.js

Environment / network...
TEST rinkeby
Fetching accounts...
{ admins: [ '0x603158d642682E0D59b0Ab9d7e0c305EeA9C947a' ],
  owners: [ '0x0C3b27Fd4195E4C3849b96fDb8D1fB4846f7c198' ],
  minters: [ '0xC9063de7a2Db43EF77cf6C60DA2459426D89e78F' ] }
Cannot read property 'trim' of undefined
Start from scratch with new log.
Processing raw database dump...
200 promos processed.
Adding promos to contract...
.
.
.

```