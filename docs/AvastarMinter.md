# Avastar Minter

View Source: [contracts/AvastarMinter.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AvastarMinter.sol)

**AvastarMinter** **↗ Extends: [AvastarTypes](AvastarTypes.md), [AccessControl](AccessControl.md)**

Mints Avastars using the `AvastarTeleporter` contract on behalf of depositors.
Allows system admin to set current generation and series.
Manages accounting of depositor and franchise balances.

## Contract Members
**Constants & Variables**

```solidity
contract IAvastarTeleporter private teleporterContract;
enum AvastarTypes.Generation private currentGeneration;
enum AvastarTypes.Series private currentSeries;
mapping(address => uint256) private depositsByAddress;
uint256 private unspentDeposits;

```

## Events

```solidity
event CurrentGenerationSet(enum AvastarTypes.Generation currentGeneration);
event CurrentSeriesSet(enum AvastarTypes.Series currentSeries);
event DepositorBalance(address indexed depositor, uint256 balance);
event FranchiseBalanceWithdrawn(address indexed owner, uint256 amount);
event TeleporterContractSet(address contractAddress);
```

## **Functions**

- [setTeleporterContract](#setteleportercontract)
- [setCurrentGeneration](#setcurrentgeneration)
- [setCurrentSeries](#setcurrentseries)
- [deposit](#deposit)
- [checkDepositorBalance](#checkdepositorbalance)
- [withdrawDepositorBalance](#withdrawdepositorbalance)
- [checkFranchiseBalance](#checkfranchisebalance)
- [withdrawFranchiseBalance](#withdrawfranchisebalance)
- [purchasePrime](#purchaseprime)
- [purchaseReplicant](#purchasereplicant)

### setTeleporterContract

Set the address of the AvastarTeleporter contract.
Only invokable by system admin, when contract is paused and not upgraded.

```solidity
function setTeleporterContract(address _address) external nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _address | address | address of AvastarTeleporter contract | 

### setCurrentGeneration

Set the Generation to be minted.
Resets `currentSeries` to `Series.ONE`.
Only invokable by system admin role, when contract is paused and not upgraded.
Emits `GenerationSet` event with new value of `currentGeneration`.

```solidity
function setCurrentGeneration(enum AvastarTypes.Generation _generation) external nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation | the new value for currentGeneration | 

### setCurrentSeries

Set the Series to be minted.
Only invokable by system admin, when contract is paused and not upgraded.
Emits `CurrentSeriesSet` event with new value of `currentSeries`.

```solidity
function setCurrentSeries(enum AvastarTypes.Series _series) public nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _series | enum AvastarTypes.Series | the new value for currentSeries | 

### deposit

Allow anyone to deposit ETH
Before contract will mint on behalf of a user, they must have sufficient ETH on deposit.
Invokable by any address (other than 0) when contract is not paused.
Must have a non-zero ETH value.
Emits DepositorBalance event with depositor's resulting balance.

```solidity
function deposit() external payable whenNotPaused 
```

### checkDepositorBalance

Allow anyone to check their deposit balance.
Invokable by any address (other than 0).

```solidity
function checkDepositorBalance() external view
returns(uint256)
```

**Returns**

the depositor's current ETH balance in the contract

### withdrawDepositorBalance

Allow a depositor with a balance to withdraw it.
Invokable by any address (other than 0) with an ETH balance on deposit.
Entire depositor balance is transferred to their address.
Emits `DepositorBalance` event of 0 amount once transfer is complete.

```solidity
function withdrawDepositorBalance() external nonpayable
returns(uint256)
```

**Returns**

amount withdrawn

### checkFranchiseBalance

Allow owner to check the withdrawable franchise balance.
Remaining balance must be enough for all unspent deposits to be withdrawn by depositors.
Invokable only by owner.

```solidity
function checkFranchiseBalance() external view onlyOwner 
returns(uint256)
```

**Returns**

the available franchise balance

### withdrawFranchiseBalance

Allow an owner to withdraw the franchise balance.
Invokable only by owner.
Emits `FranchiseBalanceWithdrawn` event with amount withdrawn.

```solidity
function withdrawFranchiseBalance() external nonpayable onlyOwner 
returns(uint256)
```

**Returns**

amount withdrawn

### purchasePrime

Mint an Avastar Prime for a purchaser who has previously deposited funds.
Invokable only by minter, when contract is not paused.

```solidity
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

Mint an Avastar Replicant for a purchaser who has previously deposited funds.
Invokable only by minter, when contract is not paused.

```solidity
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

