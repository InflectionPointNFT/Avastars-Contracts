# Avastar Base

View Source: [contracts/AvastarBase.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AvastarBase.sol)

**AvastarBase** 
**↘ Derived Contracts: [AvastarBaseWrapper](contracts/AvastarBaseWrapper.md), [AvastarState](contracts/AvastarState.md)**

Utilities used by contracts in the Avastars contract ecosystem

## **Functions**

- [uintToStr](#uinttostr)
- [strConcat](#strconcat)

### uintToStr

Convert a `uint` value to a `string`

```solidity
function uintToStr(uint256 _i)
internal pure
returns (string result)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _i | uint256 | the `uint` value to be converted | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| result | string | the `string` representation of the given `uint` value | 

### strConcat

Concatenate two strings

```solidity
function strConcat(string _a, string _b)
internal pure
returns (string result)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _a | string | the first string | 
| _b | string | the second string | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| result | string | the concatenation of `_a` and `_b` | 

