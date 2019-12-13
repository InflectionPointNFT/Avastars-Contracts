# Avastar Base Wrapper

View Source: [contracts/AvastarBaseWrapper.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AvastarBaseWrapper.sol)

**AvastarBaseWrapper** **↗ Extends: [AvastarBase](contracts/AvastarBase.md)**

Side contract (not deployed or inherited) that extends
`AvastarBase` and exposes methods for testing its internal functions.

## **Functions**

- [_strConcat](#_strconcat)
- [_uintToStr](#_uinttostr)

### _strConcat

Passthrough function for testing `AvastarBase.strConcat`.

```solidity
function _strConcat(string _a, string _b)
public pure
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

### _uintToStr

Passthrough function for testing `AvastarBase.uintToStr`.

```solidity
function _uintToStr(uint256 _value)
public pure
returns (string result)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _value | uint256 | the `uint` value to be converted | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| result | string | the `string` representation of the given `uint` value | 

