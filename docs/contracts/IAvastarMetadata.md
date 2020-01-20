# Identification interface for Avastar Metadata generator contract

View Source: [contracts/IAvastarMetadata.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/IAvastarMetadata.sol)

**IAvastarMetadata** 

Used by `AvastarTeleporter` contract to validate the address of the contract.

## **Functions**

- [isAvastarMetadata](#isavastarmetadata)
- [tokenURI](#tokenuri)

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

### tokenURI

Get token URI for a given Avastar Token ID.

```solidity
function tokenURI(uint256 _tokenId)
external view
returns (string uri)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the Token ID of a previously minted Avastar Prime or Replicant | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| uri | string | the Avastar's off-chain JSON metadata URI | 

