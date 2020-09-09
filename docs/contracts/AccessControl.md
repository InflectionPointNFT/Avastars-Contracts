# Access Control

View Source: [contracts/AccessControl.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AccessControl.sol)

**AccessControl** 
**↘ Derived Contracts: [AvastarMetadata](contracts/AvastarMetadata.md), [AvastarPrimeMinter](contracts/AvastarPrimeMinter.md), [AvastarReplicantMinter](contracts/AvastarReplicantMinter.md), [AvastarState](contracts/AvastarState.md)**

Role-based access control and contract upgrade functionality.

## Constructor

Sets `msg.sender` as system admin by default.
Starts paused. System admin must unpause, and add other roles after deployment.

```solidity
constructor() public
```

## Contract Members
**Constants & Variables**

```solidity
// private members
struct Roles.Role private admins;
struct Roles.Role private minters;
struct Roles.Role private owners;

// public members
bool public paused;
bool public upgraded;
address public newContractAddress;

```

## **Events**

- [ContractPaused](#contractpaused)
- [ContractUnpaused](#contractunpaused)
- [ContractUpgrade](#contractupgrade)

### ContractPaused

Emitted when contract is paused by system administrator.

```solidity
event ContractPaused()
```

### ContractUnpaused

Emitted when contract is unpaused by system administrator.

```solidity
event ContractUnpaused()
```

### ContractUpgrade

Emitted when contract is upgraded by system administrator.

```solidity
event ContractUpgrade(address newContract)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newContract | address | address of the new version of the contract. | 

## Modifiers

- [onlyMinter](#onlyminter)
- [onlyOwner](#onlyowner)
- [onlySysAdmin](#onlysysadmin)
- [whenNotPaused](#whennotpaused)
- [whenPaused](#whenpaused)
- [whenNotUpgraded](#whennotupgraded)

### onlyMinter

Modifier to scope access to minters

```solidity
modifier onlyMinter() internal
```

### onlyOwner

Modifier to scope access to owners

```solidity
modifier onlyOwner() internal
```

### onlySysAdmin

Modifier to scope access to system administrators

```solidity
modifier onlySysAdmin() internal
```

### whenNotPaused

Modifier to make a function callable only when the contract is not paused.

```solidity
modifier whenNotPaused() internal
```

### whenPaused

Modifier to make a function callable only when the contract is paused.

```solidity
modifier whenPaused() internal
```

### whenNotUpgraded

Modifier to make a function callable only when the contract not upgraded.

```solidity
modifier whenNotUpgraded() internal
```

## **Functions**

- [upgradeContract](#upgradecontract)
- [addMinter](#addminter)
- [addOwner](#addowner)
- [addSysAdmin](#addsysadmin)
- [stripRoles](#striproles)
- [pause](#pause)
- [unpause](#unpause)

### upgradeContract

Called by a system administrator to  mark the smart contract as upgraded,
in case there is a serious breaking bug. This method stores the new contract
address and emits an event to that effect. Clients of the contract should
update to the new contract address upon receiving this event. This contract will
remain paused indefinitely after such an upgrade.

```solidity
function upgradeContract(address _newAddress)
external nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _newAddress | address | address of new contract | 

### addMinter

Called by a system administrator to add a minter.
Reverts if `_minterAddress` already has minter role

```solidity
function addMinter(address _minterAddress)
external nonpayable onlySysAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _minterAddress | address | approved minter | 

### addOwner

Called by a system administrator to add an owner.
Reverts if `_ownerAddress` already has owner role

```solidity
function addOwner(address _ownerAddress)
external nonpayable onlySysAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _ownerAddress | address | approved owner | 

### addSysAdmin

Called by a system administrator to add another system admin.
Reverts if `_sysAdminAddress` already has sysAdmin role

```solidity
function addSysAdmin(address _sysAdminAddress)
external nonpayable onlySysAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _sysAdminAddress | address | approved owner | 

### stripRoles

Called by an owner to remove all roles from an address.
Reverts if address had no roles to be removed.

```solidity
function stripRoles(address _address)
external nonpayable onlyOwner 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _address | address | address having its roles stripped | 

### pause

Called by a system administrator to pause, triggers stopped state

```solidity
function pause()
external nonpayable onlySysAdmin whenNotPaused 
```

### unpause

Called by a system administrator to un-pause, returns to normal state

```solidity
function unpause()
external nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

