# Avastars Contracts
Ethereum-based collectible avatars with on-chain artwork

## Status
#### Contract lineage with:
 * Role based access control and SafeMath via Open Zeppelin
 * Upgradeability
 * Pauseability
 * Trait storage with SVG
 * Avastar NFT minting with serial that resets to 0 with generation
 * Separate minter contract
 * [Hashing algorithm](README_Trait_Hash.md) for storage of all traits (up to 32 'genes' with up to 256 'variations') in a single 256bit integer
 * _And much more!_
 
 ![UML](AvastarsUML.png)

#### Unit tests that prove:
```
  Contract: AccessControl
    ✓ should not allow non-sysadmins to pause the contract (79ms)
    ✓ should allow sysadmin to pause the contract when unpaused (68ms)
    ✓ should not allow non-sysadmins to unpause the contract (57ms)
    ✓ should allow sysadmin to unpause the contract when paused (53ms)
    ✓ should allow sysadmin to add a minter (62ms)
    ✓ should allow sysadmin to add an owner (61ms)
    ✓ should not allow non-sysadmins to set upgrade the contract when unpaused (64ms)
    ✓ should not allow sysadmin to upgrade the contract when unpaused (88ms)
    ✓ should not allow non-sysadmins to upgrade the contract when paused (161ms)
    ✓ should allow sysadmin to upgrade the contract when paused (102ms)
    ✓ should not allow sysadmin to unpause contract after the contract is upgraded (61ms)

  Contract: AvastarMinter
    ✓ should allow anyone to deposit ETH (64ms)
    ✓ should allow another depositor to deposit ETH (66ms)
    ✓ should allow a depositor to check their balance
    ✓ should allow a depositor to deposit more ETH (94ms)
    ✓ should show increased balance for a depositor after depositing more ETH
    ✓ should allow an owner to check the franchise balance, (zero if nothing has been purchased)
    ✓ should allow minter to purchase a prime if purchaser has already deposited ETH (175ms)
    ✓ should allow minter to purchase another prime if purchaser has sufficient ETH remaining (167ms)
    ✓ should show appropriately decreased balance for depositor after purchasing primes
    ✓ should allow a depositor to withdraw a non-zero balance (66ms)
    ✓ should not allow minter to purchase a prime if purchaser has withdrawn their balance (49ms)
    ✓ should allow an owner to check the franchise balance, (has value after purchases)
    ✓ should allow an owner to withdraw the franchise balance (76ms)
    ✓ should allow another depositor to check their balance
    ✓ should allow another depositor to withdraw a non-zero balance (82ms)
    ✓ should not allow non-sysadmins to set current series (68ms)
    ✓ should not allow system administrator to set current series if contract not paused (57ms)
    ✓ should allow system administrator to set current series if paused (166ms)
    ✓ should reflect change of series in newly minted primes (208ms)
    ✓ should not allow non-sysadmins to set current generation (48ms)
    ✓ should not allow system administrator to set current generation if contract not paused (55ms)
    ✓ should allow system administrator to set current generation if paused; series is reset (141ms)
    ✓ should reflect change of generation and series in newly minted primes (224ms)
    ✓ should allow minting of replicants from generation other than current generation (181ms)

  Contract: AvastarTransporter
    ✓ should not allow system administrator to approve trait access for another user's primes (55ms)
    ✓ should not allow minter to approve trait access for another user's primes (84ms)
    ✓ should allow owner to approve trait access for a specific set of their primes (119ms)
    ✓ should allow a handler to use traits for primes they are approved for (279ms)
    ✓ should not allow a handler to use more traits on a prime without being approved again (54ms)

  Contract: PrimeFactory
    ✓ should not allow system administrator to create a prime (82ms)
    ✓ should not allow non-minters to create a prime (64ms)
    ✓ should allow minter to create a prime (106ms)
    ✓ should allow minter to create a prime in same generation but different series, token id and serial both increase (132ms)
    ✓ should allow minter to create a prime different generation first series, token id increases and serial resets (139ms)
    ✓ should not allow minter to create a prime in the same generation with the same trait hash (69ms)
    ✓ should allow minter to create a prime in a different generation with same trait hash (144ms)
    ✓ should allow anyone to retrieve a prime by generation and serial number (58ms)
    ✓ should allow anyone to retrieve a prime by token id (62ms)

  Contract: ReplicantFactory
    ✓ should not allow system administrator to create a replicant (51ms)
    ✓ should not allow non-minters to create a replicant (140ms)
    ✓ should not allow minter to create a replicant with a hash used by a prime in same generation (55ms)
    ✓ should allow minter to create a replicant (99ms)
    ✓ should allow minter to create a replicant same generation, serial increases (132ms)
    ✓ should allow minter to create a replicant different generation, token id increases and serial resets (105ms)
    ✓ should not allow minter to create a replicant in the same generation with the same trait hash (56ms)
    ✓ should allow minter to create a replicant in a different generation with same trait hash (106ms)
    ✓ should allow anyone to retrieve a replicant by generation and serial number
    ✓ should allow anyone to retrieve a replicant by token id

  Contract: TraitFactory
    ✓ should allow sysadmin to create a trait (840ms)
    ✓ should allow sysadmin to retrieve a trait (133ms)
    ✓ should not allow non-sysadmins to create traits (63ms)
    ✓ should allow non-sysadmins to retrieve a trait (144ms)
    ✓ should allow sysadmin to create and retrieve another trait (605ms)
    ✓ should not allow sysadmin to create trait with bad value for generation (66ms)
    ✓ should not allow sysadmin to create trait with bad value for gender (61ms)
    ✓ should not allow sysadmin to create trait with bad value for gene (80ms)
    ✓ should not allow sysadmin to create trait with empty array for series (60ms)
    ✓ should not allow sysadmin to create trait with bad value for series (88ms)
    ✓ should not allow sysadmin to create trait with bad value for variation (64ms)
    ✓ should not allow sysadmin to create traits when contract is paused (166ms)
    ✓ should allow anyone to retrieve a trait id by generation, gene, and variation
    ✓ should allow anyone to assemble artwork by generation and trait hash (8892ms)

  73 passing (21s)
```

#  Developer Setup
## Build / Run / Deploy Prerequisites
### Install Node (also installs NPM)
 * [Node](https://nodejs.org/en/download/) ([DO NOT INSTALL VERSION 12](https://github.com/trufflesuite/truffle/issues/2070)! - use 11 or below.)

## Install required Node modules for project
All NPM resources are project-local. No global installs required. We use `npx` to run any npm
executables that needs to be started (e.g., Ganache, etc.)

```
cd path/to/avastars
npm install
```

# Development Tasks
### Generate Contract UML
Generates a [UML diagram](AvastarsUML.png) of the Avastars contracts. Only local files, doesn't include inherited Open Zeppelin stuff unfortunately.

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