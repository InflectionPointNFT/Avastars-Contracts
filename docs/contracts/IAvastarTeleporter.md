# AvastarTeleporter Interface

View Source: [contracts/IAvastarTeleporter.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/IAvastarTeleporter.sol)

**IAvastarTeleporter** **↗ Extends: [AvastarTypes](contracts/AvastarTypes.md)**

Declared as abstract contract rather than interface as it must inherit for enum types.
Used by AvastarMinter contract to interact with subset of AvastarTeleporter contract functions.

## **Functions**

- [isAvastarTeleporter](#isavastarteleporter)
- [mintPrime](#mintprime)
- [mintReplicant](#mintreplicant)
- [ownerOf](#ownerof)

### isAvastarTeleporter

Acknowledge contract is `AvastarTeleporter`

```solidity
function isAvastarTeleporter()
external pure
returns (bool)
```

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | bool | always true if the contract is in fact `AvastarTeleporter` | 

### mintPrime

Mint an Avastar Prime
Only invokable by minter role, when contract is not paused.
If successful, emits a `NewPrime` event.

```solidity
function mintPrime(
	address _owner,
	uint256 _traits,
	enum AvastarTypes.Generation _generation,
	enum AvastarTypes.Series _series,
	enum AvastarTypes.Gender _gender,
	uint8 _ranking
)
external nonpayable
returns (uint256, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | the address of the new Avastar's owner | 
| _traits | uint256 | the new Prime's trait hash | 
| _generation | enum AvastarTypes.Generation | the new Prime's generation | 
| _series | enum AvastarTypes.Series |  | 
| _gender | enum AvastarTypes.Gender | the new Prime's gender | 
| _ranking | uint8 | the new Prime's rarity ranking | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | uint256 | _series the new Prime's series | 
|  | uint256 | _series the new Prime's series | 

### mintReplicant

Mint an Avastar Replicant.
Only invokable by minter role, when contract is not paused.
If successful, emits a `NewReplicant` event.

```solidity
function mintReplicant(
	address _owner,
	uint256 _traits,
	enum AvastarTypes.Generation _generation,
	enum AvastarTypes.Gender _gender,
	uint8 _ranking
)
external nonpayable
returns (uint256, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | the address of the new Avastar's owner | 
| _traits | uint256 | the new Replicant's trait hash | 
| _generation | enum AvastarTypes.Generation | the new Replicant's generation | 
| _gender | enum AvastarTypes.Gender | the new Replicant's gender | 
| _ranking | uint8 | the new Replicant's rarity ranking | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | uint256 | tokenId the newly minted Replicant's token ID | 
|  | uint256 | tokenId the newly minted Replicant's token ID | 

### ownerOf

```solidity
function ownerOf(uint256 tokenId)
external view
returns (address owner)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | the token ID to search for the owner of | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address | the owner of the given token ID | 

