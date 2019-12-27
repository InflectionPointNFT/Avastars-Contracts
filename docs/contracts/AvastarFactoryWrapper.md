# Avastar Factory Wrapper

View Source: [contracts/AvastarFactoryWrapper.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AvastarFactoryWrapper.sol)

**AvastarFactoryWrapper** **↗ Extends: [AvastarFactory](contracts/AvastarFactory.md)**

Side contract (not deployed or inherited) that extends
`AvastarFactory` and exposes methods for testing its internal functions.

## **Functions**

- [_mintAvastar](#_mintavastar)

### _mintAvastar

Mint an Avastar.
Only invokable by descendant contracts when contract is not paused.
Adds new `Avastar` to `avastars` array.
Doesn't emit an event, the calling method does (`NewPrime` or `NewReplicant`).
Sets `isHashUsedByGeneration` mapping to true for `avastar.generation` and `avastar.traits`.
Sets `tokenIdByGenerationAndHash` mapping to `avastar.id` for `avastar.generation` and `avastar.traits`.
Sets `tokenIdByGenerationWaveAndSerial` mapping to `avastar.id` for `avastar.generation`, `avastar.wave`, and `avastar.serial`.

```solidity
function _mintAvastar(
	address _owner,
	uint256 _serial,
	uint256 _traits,
	enum AvastarTypes.Generation _generation,
	enum AvastarTypes.Wave _wave
)
external nonpayable whenNotPaused 
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

