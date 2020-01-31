# Avastar Prime Factory

View Source: [contracts/PrimeFactory.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/PrimeFactory.sol)

**PrimeFactory** **↗ Extends: [AvastarFactory](contracts/AvastarFactory.md)**
**↘ Derived Contracts: [ReplicantFactory](contracts/ReplicantFactory.md)**

## Contract Members
**Constants & Variables**

```solidity
// public members
uint16 public constant MAX_PRIMES_PER_SERIES;
uint16 public constant MAX_PROMO_PRIMES_PER_GENERATION;

```

## **Events**

- [NewPrime](#newprime)

### NewPrime

Event emitted upon the creation of an Avastar Prime

```solidity
event NewPrime(
	uint256 id,
	uint256 serial,
	enum AvastarTypes.Generation generation,
	enum AvastarTypes.Series series,
	enum AvastarTypes.Gender gender,
	uint256 traits
)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| id | uint256 | the token ID of the newly minted Prime | 
| serial | uint256 | the serial of the Prime | 
| generation | enum AvastarTypes.Generation | the generation of the Prime | 
| series | enum AvastarTypes.Series | the series of the Prime | 
| gender | enum AvastarTypes.Gender | the gender of the Prime | 
| traits | uint256 | the trait hash of the Prime | 

## **Functions**

- [getPrimeByGenerationAndSerial](#getprimebygenerationandserial)
- [getPrimeByTokenId](#getprimebytokenid)
- [getPrimeReplicationByTokenId](#getprimereplicationbytokenid)
- [mintPrime](#mintprime)

### getPrimeByGenerationAndSerial

Get the Avastar Prime metadata associated with a given Generation and Serial.
Does not include the trait replication flags.

```solidity
function getPrimeByGenerationAndSerial(enum AvastarTypes.Generation _generation, uint256 _serial)
external view
returns (
	uint256 tokenId,
	uint256 serial,
	uint256 traits,
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
| generation | enum AvastarTypes.Generation | the Prime's generation | 
| series | enum AvastarTypes.Series | the Prime's series | 
| gender | enum AvastarTypes.Gender | the Prime's gender | 
| ranking | uint8 | the Prime's ranking | 

### getPrimeByTokenId

Get the Avastar Prime associated with a given Token ID.
Does not include the trait replication flags.

```solidity
function getPrimeByTokenId(uint256 _tokenId)
external view
returns (
	uint256 tokenId,
	uint256 serial,
	uint256 traits,
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
| generation | enum AvastarTypes.Generation | the Prime's generation | 
| series | enum AvastarTypes.Series | the Prime's series | 
| gender | enum AvastarTypes.Gender | the Prime's gender | 
| ranking | uint8 | the Prime's ranking | 

### getPrimeReplicationByTokenId

Get an Avastar Prime's replication flags by token ID.

```solidity
function getPrimeReplicationByTokenId(uint256 _tokenId)
external view
returns (uint256 tokenId, bool[12] replicated)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the token ID of the specified Prime | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | the Prime's token ID | 
| replicated | bool[12] | the Prime's trait replication flags | 

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

