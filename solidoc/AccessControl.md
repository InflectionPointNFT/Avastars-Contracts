# AccessControl (AccessControl.sol)

View Source: [contracts/AccessControl.sol](../contracts/AccessControl.sol)

**↘ Derived Contracts: [AvastarMinter](AvastarMinter.md), [AvastarState](AvastarState.md)**

**AccessControl**

Role-based access control and related functions, function modifiers, and events

## Contract Members
**Constants & Variables**

```js
//private members
struct Roles.Role private admins;
struct Roles.Role private minters;
struct Roles.Role private owners;

//public members
bool public paused;
bool public upgraded;
address public newContractAddress;

```

**Events**

```js
event ContractUpgrade(address  newContract);
event ContractPaused();
event ContractUnpaused();
event MinterAdded(address  minterAddress);
event OwnerAdded(address  ownerAddress);
```

## Modifiers

- [onlySysAdmin](#onlysysadmin)
- [onlyMinter](#onlyminter)
- [onlyOwner](#onlyowner)
- [whenNotPaused](#whennotpaused)
- [whenPaused](#whenpaused)
- [whenNotUpgraded](#whennotupgraded)

### onlySysAdmin

Modifier to scope access to system administrators

```js
modifier onlySysAdmin() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlyMinter

Modifier to scope access to minters

```js
modifier onlyMinter() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlyOwner

Modifier to scope access to owners

```js
modifier onlyOwner() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### whenNotPaused

Modifier to make a function callable only when the contract is not paused.

```js
modifier whenNotPaused() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### whenPaused

Modifier to make a function callable only when the contract is paused.

```js
modifier whenPaused() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### whenNotUpgraded

Modifier to make a function callable only when the contract not upgraded.

```js
modifier whenNotUpgraded() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [()](#)
- [upgradeContract(address _newAddress)](#upgradecontract)
- [addMinter(address _minterAddress)](#addminter)
- [addOwner(address _ownerAddress)](#addowner)
- [pause()](#pause)
- [unpause()](#unpause)

### 

Constructor.

```js
function () public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### upgradeContract

```js
function upgradeContract(address _newAddress) external nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _newAddress | address | address of new contract | 

### addMinter

Called by a system administrator to add a minter

```js
function addMinter(address _minterAddress) external nonpayable onlySysAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _minterAddress | address |  | 

### addOwner

Called by a system administrator to add an owner

```js
function addOwner(address _ownerAddress) external nonpayable onlySysAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _ownerAddress | address |  | 

### pause

Called by a system administrator to pause, triggers stopped state

```js
function pause() public nonpayable onlySysAdmin whenNotPaused 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### unpause

Called by a system administrator to un-pause, returns to normal state

```js
function unpause() public nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

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
