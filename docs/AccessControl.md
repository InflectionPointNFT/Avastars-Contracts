# AccessControl

View Source: [contracts/AccessControl.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AccessControl.sol)

**↘ Derived Contracts: [AvastarMinter](AvastarMinter.md), [AvastarState](AvastarState.md)**

**AccessControl**

Role-based access control and related functions, function modifiers, and events

## Contract Members
**Constants & Variables**

```solidity
//private members
struct Roles.Role private admins;
struct Roles.Role private minters;
struct Roles.Role private owners;

//public members
bool public paused;
bool public upgraded;
address public newContractAddress;

```

## Events

```solidity
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

```solidity
modifier onlySysAdmin() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlyMinter

Modifier to scope access to minters

```solidity
modifier onlyMinter() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### onlyOwner

Modifier to scope access to owners

```solidity
modifier onlyOwner() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### whenNotPaused

Modifier to make a function callable only when the contract is not paused.

```solidity
modifier whenNotPaused() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### whenPaused

Modifier to make a function callable only when the contract is paused.

```solidity
modifier whenPaused() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### whenNotUpgraded

Modifier to make a function callable only when the contract not upgraded.

```solidity
modifier whenNotUpgraded() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

- [upgradeContract](#upgradecontract)
- [addMinter](#addminter)
- [addOwner](#addowner)
- [pause](#pause)
- [unpause](#unpause)

### upgradeContract

```solidity
function upgradeContract(address _newAddress) external nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _newAddress | address | address of new contract | 

### addMinter

Called by a system administrator to add a minter

```solidity
function addMinter(address _minterAddress) external nonpayable onlySysAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _minterAddress | address |  | 

### addOwner

Called by a system administrator to add an owner

```solidity
function addOwner(address _ownerAddress) external nonpayable onlySysAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _ownerAddress | address |  | 

### pause

Called by a system administrator to pause, triggers stopped state

```solidity
function pause() public nonpayable onlySysAdmin whenNotPaused 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### unpause

Called by a system administrator to un-pause, returns to normal state

```solidity
function unpause() public nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

