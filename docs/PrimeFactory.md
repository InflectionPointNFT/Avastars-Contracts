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

Get the Avastar Prime metadata associated with a given Generation and Serial

```solidity
function getPrimeByGenerationAndSerial(enum AvastarTypes.Generation _generation, uint256 _serial)
external view
returns (
	uint256,
	uint256,
	uint256,
	bool[],
	enum AvastarTypes.Generation,
	enum AvastarTypes.Series,
	enum AvastarTypes.Gender,
	uint8
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
|  | uint256 |  | 
|  | uint256 |  | 
|  | uint256 |  | 
|  | bool[] |  | 
|  | enum AvastarTypes.Generation |  | 
|  | enum AvastarTypes.Series |  | 
|  | enum AvastarTypes.Gender |  | 
|  | uint8 |  | 

### getPrimeByTokenId

Get the Avastar Prime metadata associated with a given Token ID

```solidity
function getPrimeByTokenId(uint256 _tokenId)
external view
returns (
	uint256,
	uint256,
	uint256,
	bool[],
	enum AvastarTypes.Generation,
	enum AvastarTypes.Series,
	enum AvastarTypes.Gender,
	uint8
)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the Token ID of the Prime | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | uint256 |  | 
|  | uint256 |  | 
|  | uint256 |  | 
|  | bool[] |  | 
|  | enum AvastarTypes.Generation |  | 
|  | enum AvastarTypes.Series |  | 
|  | enum AvastarTypes.Gender |  | 
|  | uint8 |  | 

### mintPrime

Mint an Avastar Prime

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
returns (uint256, uint256)
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

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | uint256 |  | 
|  | uint256 |  | 

