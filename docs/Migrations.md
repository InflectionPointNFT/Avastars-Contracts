# Standard migrations management contract

View Source: [contracts/Migrations.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/contracts/Migrations.sol)

**Migrations**

## Contract Members
**Constants & Variables**

```solidity
address public owner;
uint256 public lastCompletedMigration;

```

## Modifiers

- [restricted](#restricted)

### restricted

```solidity
modifier restricted() internal
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

## Functions

- [](#)
- [setCompleted](#setcompleted)
- [upgrade](#upgrade)

### 

```solidity
function () public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### setCompleted

```solidity
function setCompleted(uint256 completed) public nonpayable restricted 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| completed | uint256 |  | 

### upgrade

```solidity
function upgrade(address newAddress) public nonpayable restricted 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| newAddress | address |  | 

