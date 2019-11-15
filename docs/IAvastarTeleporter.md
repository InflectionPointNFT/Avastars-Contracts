# AvastarTeleporter Interface

View Source: [contracts/IAvastarTeleporter.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/contracts/IAvastarTeleporter.sol)

**↗ Extends: [AvastarTypes](AvastarTypes.md)**

**IAvastarTeleporter**

Declared with contract rather than interface as it must inherit for enum types

## Functions

- [isAvastarTeleporter](#isavastarteleporter)
- [mintPrime](#mintprime)
- [mintReplicant](#mintreplicant)
- [ownerOf](#ownerof)

### isAvastarTeleporter

```solidity
function isAvastarTeleporter() external pure
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### mintPrime

```solidity
function mintPrime(address _owner, uint256 _traits, enum AvastarTypes.Generation _generation, enum AvastarTypes.Series _series, enum AvastarTypes.Gender _gender, uint8 _ranking) external nonpayable
returns(uint256, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address |  | 
| _traits | uint256 |  | 
| _generation | enum AvastarTypes.Generation |  | 
| _series | enum AvastarTypes.Series |  | 
| _gender | enum AvastarTypes.Gender |  | 
| _ranking | uint8 |  | 

### mintReplicant

```solidity
function mintReplicant(address _owner, uint256 _traits, enum AvastarTypes.Generation _generation, enum AvastarTypes.Gender _gender, uint8 _ranking) external nonpayable
returns(uint256, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address |  | 
| _traits | uint256 |  | 
| _generation | enum AvastarTypes.Generation |  | 
| _gender | enum AvastarTypes.Gender |  | 
| _ranking | uint8 |  | 

### ownerOf

```solidity
function ownerOf(uint256 tokenId) external view
returns(owner address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 |  | 

