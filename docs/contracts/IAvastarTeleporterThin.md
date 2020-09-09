# Limited AvastarTeleporter Interface

View Source: [contracts/IAvastarTeleporterThin.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/IAvastarTeleporterThin.sol)

**IAvastarTeleporterThin** **↗ Extends: [AvastarTypes](contracts/AvastarTypes.md)**

Declared as abstract contract rather than interface as it must inherit for enum types.
Used by `AvastarReplicantMinter` contract to interact with limited subset of `AvastarTeleporter` contract functions.

## **Functions**

- [isAvastarTeleporter](#isavastarteleporter)
- [tokenOfOwnerByIndex](#tokenofownerbyindex)
- [getAvastarWaveByTokenId](#getavastarwavebytokenid)
- [ownerOf](#ownerof)
- [totalSupply](#totalsupply)
- [mintReplicant](#mintreplicant)

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

### tokenOfOwnerByIndex

IERC721Enumerable - Gets the owner of the specified token ID.

```solidity
function tokenOfOwnerByIndex(address owner, uint256 index)
public view
returns (uint256 tokenId)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 
| index | uint256 |  | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | owner the owner of the given token ID | 

### getAvastarWaveByTokenId

Get an Avastar's Wave by token ID.

```solidity
function getAvastarWaveByTokenId(uint256 _tokenId)
external view
returns (enum AvastarTypes.Wave wave)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the token id of the given Avastar | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| wave | enum AvastarTypes.Wave | the Avastar's wave (Prime/Replicant) | 

### ownerOf

Gets the owner of the specified token ID.

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

### totalSupply

IERC721 - Gets the total amount of tokens stored by the contract.

```solidity
function totalSupply()
public view
returns (uint256 count)
```

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| count | uint256 | total number of tokens | 

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
returns (uint256 tokenId, uint256 serial)
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
| tokenId | uint256 | the newly minted Replicant's token ID | 
| serial | uint256 | the newly minted Replicant's serial | 

