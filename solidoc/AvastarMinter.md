# Avastar Minter (AvastarMinter.sol)

View Source: [contracts/AvastarMinter.sol](../contracts/AvastarMinter.sol)

**↗ Extends: [AvastarTypes](AvastarTypes.md), [AccessControl](AccessControl.md)**

**AvastarMinter**

Mints Avastars using the AvastarTeleporter contract on behalf of depositors

## Contract Members
**Constants & Variables**

```js
//private members
contract IAvastarTeleporter private teleporterContract;
uint256 private unspentDeposits;
enum AvastarTypes.Generation private currentGeneration;
enum AvastarTypes.Series private currentSeries;

//internal members
mapping(address => uint256) internal depositsByAddress;

```

**Events**

```js
event CurrentGenerationSet(enum AvastarTypes.Generation  currentGeneration);
event CurrentSeriesSet(enum AvastarTypes.Series  currentSeries);
event DepositorBalance(address indexed depositor, uint256  balance);
event FranchiseBalanceWithdrawn(address indexed owner, uint256  amount);
event TeleporterContractSet(address  contractAddress);
```

## Functions

- [setTeleporterContract(address _address)](#setteleportercontract)
- [setCurrentGeneration(enum AvastarTypes.Generation _generation)](#setcurrentgeneration)
- [setCurrentSeries(enum AvastarTypes.Series _series)](#setcurrentseries)
- [deposit()](#deposit)
- [checkDepositorBalance()](#checkdepositorbalance)
- [withdrawDepositorBalance()](#withdrawdepositorbalance)
- [checkFranchiseBalance()](#checkfranchisebalance)
- [withdrawFranchiseBalance()](#withdrawfranchisebalance)
- [purchasePrime(address _purchaser, uint256 _price, uint256 _traits, enum AvastarTypes.Gender _gender, uint8 _ranking)](#purchaseprime)
- [purchaseReplicant(address _purchaser, uint256 _price, uint256 _traits, enum AvastarTypes.Generation _generation, enum AvastarTypes.Gender _gender, uint8 _ranking)](#purchasereplicant)

### setTeleporterContract

Set the address of the AvastarTeleporter contract

```js
function setTeleporterContract(address _address) external nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _address | address | address of AvastarTeleporter contract | 

### setCurrentGeneration

Set the Generation to be minted

```js
function setCurrentGeneration(enum AvastarTypes.Generation _generation) external nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation | the new value for currentGeneration | 

### setCurrentSeries

Set the Series to be minted

```js
function setCurrentSeries(enum AvastarTypes.Series _series) public nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _series | enum AvastarTypes.Series | the new value for currentSeries | 

### deposit

Allow anyone to deposit ETH

```js
function deposit() external payable whenNotPaused 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### checkDepositorBalance

Allow anyone to check their deposit balance

```js
function checkDepositorBalance() external view
returns(uint256)
```

**Returns**

the depositor's current ETH balance in the contract

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### withdrawDepositorBalance

Allow a depositor with a balance to withdraw it

```js
function withdrawDepositorBalance() external nonpayable
returns(uint256)
```

**Returns**

amount withdrawn

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### checkFranchiseBalance

Allow owner to check the withdrawable franchise balance

```js
function checkFranchiseBalance() external view onlyOwner 
returns(uint256)
```

**Returns**

the available franchise balance

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### withdrawFranchiseBalance

Allow an owner to withdraw the franchise balance

```js
function withdrawFranchiseBalance() external nonpayable onlyOwner 
returns(uint256)
```

**Returns**

amount withdrawn

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### purchasePrime

Mint an Avastar Prime for a purchaser who has previously deposited funds

```js
function purchasePrime(address _purchaser, uint256 _price, uint256 _traits, enum AvastarTypes.Gender _gender, uint8 _ranking) external nonpayable onlyMinter whenNotPaused 
returns(uint256, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _purchaser | address | address that will own the token | 
| _price | uint256 | price in ETH of token, removed from purchaser's deposit balance | 
| _traits | uint256 | the Avastar's Trait hash | 
| _gender | enum AvastarTypes.Gender | the Avastar's Gender | 
| _ranking | uint8 | the Avastar's Ranking | 

### purchaseReplicant

Mint an Avastar Replicant for a purchaser who has previously deposited funds

```js
function purchaseReplicant(address _purchaser, uint256 _price, uint256 _traits, enum AvastarTypes.Generation _generation, enum AvastarTypes.Gender _gender, uint8 _ranking) external nonpayable onlyMinter whenNotPaused 
returns(uint256, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _purchaser | address | address that will own the token | 
| _price | uint256 | price in ETH of token, removed from purchaser's deposit balance | 
| _traits | uint256 | the Avastar's Trait hash | 
| _generation | enum AvastarTypes.Generation | the Avastar's Generation | 
| _gender | enum AvastarTypes.Gender | the Avastar's Gender | 
| _ranking | uint8 | the Avastar's Ranking | 

## Contracts

* [AccessControl](AccessControl.md)
* [Address](Address.md)
* [AvastarMinter](AvastarMinter.md)
* [AvastarState](AvastarState.md)
* [AvastarTeleporter](AvastarTeleporter.md)
* [AvastarTypes](AvastarTypes.md)
* [Context](Context.md)
* [Counters](Counters.md)
* [ERC165](ERC165.md)
* [ERC721](ERC721.md)
* [ERC721Enumerable](ERC721Enumerable.md)
* [ERC721Full](ERC721Full.md)
* [ERC721Metadata](ERC721Metadata.md)
* [IAvastarTeleporter](IAvastarTeleporter.md)
* [IERC165](IERC165.md)
* [IERC721](IERC721.md)
* [IERC721Enumerable](IERC721Enumerable.md)
* [IERC721Metadata](IERC721Metadata.md)
* [IERC721Receiver](IERC721Receiver.md)
* [Migrations](Migrations.md)
* [PrimeFactory](PrimeFactory.md)
* [ReplicantFactory](ReplicantFactory.md)
* [Roles](Roles.md)
* [SafeMath](SafeMath.md)
* [TraitFactory](TraitFactory.md)
