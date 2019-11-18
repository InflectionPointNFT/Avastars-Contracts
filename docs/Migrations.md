# Standard migrations management contract

View Source: [contracts/Migrations.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/Migrations.sol)

**Migrations** 

## Contract Members
**Constants & Variables**

```solidity
// public members
address public owner;
uint256 public lastCompletedMigration;

```

## Modifiers

- [restricted](#restricted)

### restricted

```solidity
modifier restricted() internal
```

## **Functions**

- [setCompleted](#setcompleted)
- [upgrade](#upgrade)

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

