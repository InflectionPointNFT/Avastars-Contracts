# Interface for Avastar Metadata Generator contract

View Source: [contracts/IAvastarMetadata.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/IAvastarMetadata.sol)

**IAvastarMetadata** 

Generates Avastar metadata from on-chain data.
Used by `AvastarTeleporter` contract to generate metdata in an upgradable way.

## **Functions**

- [isAvastarMetadata](#isavastarmetadata)
- [getAvastarMetadata](#getavastarmetadata)

### isAvastarMetadata

Acknowledge contract is `AvastarMetadata`

```solidity
function isAvastarMetadata()
external pure
returns (bool)
```

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | bool | always true | 

### getAvastarMetadata

Get human-readable metadata for a given Avastar by Token ID.

```solidity
function getAvastarMetadata(uint256 _tokenId)
external view
returns (string metadata)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the token id of the given Avastar | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| metadata | string | the Avastar's human-readable metadata | 

