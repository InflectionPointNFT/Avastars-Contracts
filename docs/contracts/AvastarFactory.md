# Avastar Token Factory

View Source: [contracts/AvastarFactory.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AvastarFactory.sol)

**AvastarFactory** **↗ Extends: [TraitFactory](contracts/TraitFactory.md)**
**↘ Derived Contracts: [AvastarFactoryWrapper](contracts/AvastarFactoryWrapper.md), [PrimeFactory](contracts/PrimeFactory.md)**

## **Functions**

- [mintAvastar](#mintavastar)
- [getAvastarWaveByTokenId](#getavastarwavebytokenid)
- [renderAvastar](#renderavastar)

### mintAvastar

Mint an Avastar.
Only invokable by descendant contracts when contract is not paused.
Adds new `Avastar` to `avastars` array.
Doesn't emit an event, the calling method does (`NewPrime` or `NewReplicant`).
Sets `isHashUsedByGeneration` mapping to true for `avastar.generation` and `avastar.traits`.
Sets `tokenIdByGenerationAndHash` mapping to `avastar.id` for `avastar.generation` and `avastar.traits`.
Sets `tokenIdByGenerationWaveAndSerial` mapping to `avastar.id` for `avastar.generation`, `avastar.wave`, and `avastar.serial`.

```solidity
function mintAvastar(
	address _owner,
	uint256 _serial,
	uint256 _traits,
	enum AvastarTypes.Generation _generation,
	enum AvastarTypes.Wave _wave
)
internal nonpayable whenNotPaused 
returns (uint256 tokenId)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | the address of the new Avastar's owner | 
| _serial | uint256 | the new Avastar's Prime or Replicant serial number | 
| _traits | uint256 | the new Avastar's trait hash | 
| _generation | enum AvastarTypes.Generation | the new Avastar's generation | 
| _wave | enum AvastarTypes.Wave | the new Avastar's wave (Prime/Replicant) | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | the newly minted Prime's token ID | 

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

### renderAvastar

Render the Avastar Prime or Replicant from the original on-chain art.

```solidity
function renderAvastar(uint256 _tokenId)
external view
returns (string svg)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the token ID of the Prime or Replicant | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| svg | string | the fully rendered SVG representation of the Avastar | 

