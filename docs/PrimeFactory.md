# Avastar Prime Factory

View Source: [contracts/PrimeFactory.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/PrimeFactory.sol)

**PrimeFactory** **↗ Extends: [TraitFactory](TraitFactory.md)**
**↘ Derived Contracts: [ReplicantFactory](ReplicantFactory.md)**

## Events

```solidity
event NewPrime(uint256 id, uint256 serial, enum AvastarTypes.Generation generation, enum AvastarTypes.Series series, enum AvastarTypes.Gender gender, uint256 traits)
```

## **Functions**

- [getPrimeByGenerationAndSerial](#getprimebygenerationandserial)
- [getPrimeByTokenId](#getprimebytokenid)
- [mintPrime](#mintprime)

### getPrimeByGenerationAndSerial

Get the Avastar Prime metadata associated with a given Generation and Serial.

```solidity
function getPrimeByGenerationAndSerial(enum AvastarTypes.Generation _generation, uint256 _serial)
external view
returns (
	uint256 tokenId,
	uint256 serial,
	uint256 traits,
	bool[] replicated,
	enum AvastarTypes.Generation generation,
	enum AvastarTypes.Series series,
	enum AvastarTypes.Gender gender,
	uint8 ranking
)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation | the Generation of the Prime | 
| _serial | uint256 | the Serial of the Prime | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | the Prime's token ID | 
| serial | uint256 | the Prime's serial | 
| traits | uint256 | the Prime's trait hash | 
| replicated | bool[] | the Prime's trait replication indicators | 
| generation | enum AvastarTypes.Generation | the Prime's generation | 
| series | enum AvastarTypes.Series | the Prime's series | 
| gender | enum AvastarTypes.Gender | the Prime's gender | 
| ranking | uint8 | the Prime's ranking | 

### getPrimeByTokenId

Get the Avastar Prime metadata associated with a given Token ID.

```solidity
function getPrimeByTokenId(uint256 _tokenId)
external view
returns (
	uint256 tokenId,
	uint256 serial,
	uint256 traits,
	bool[] replicated,
	enum AvastarTypes.Generation generation,
	enum AvastarTypes.Series series,
	enum AvastarTypes.Gender gender,
	uint8 ranking
)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the Token ID of the specified Prime | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | the Prime's token ID | 
| serial | uint256 | the Prime's serial | 
| traits | uint256 | the Prime's trait hash | 
| replicated | bool[] | the Prime's trait replication indicators | 
| generation | enum AvastarTypes.Generation | the Prime's generation | 
| series | enum AvastarTypes.Series | the Prime's series | 
| gender | enum AvastarTypes.Gender | the Prime's gender | 
| ranking | uint8 | the Prime's ranking | 

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
external nonpayable onlyMinter whenNotPaused 
returns (uint256 tokenId, uint256 serial)
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
| tokenId | uint256 | the newly minted Prime's token ID | 
| serial | uint256 | the newly minted Prime's serial | 

