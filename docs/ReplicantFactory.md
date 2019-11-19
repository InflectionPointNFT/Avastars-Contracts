# Avastar Replicant Factory

View Source: [contracts/ReplicantFactory.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/ReplicantFactory.sol)

**ReplicantFactory** **↗ Extends: [PrimeFactory](PrimeFactory.md)**
**↘ Derived Contracts: [AvastarTeleporter](AvastarTeleporter.md)**

## Events

```solidity
event NewReplicant(uint256 id, uint256 serial, enum AvastarTypes.Generation generation, enum AvastarTypes.Gender gender, uint256 traits)
```

## **Functions**

- [getReplicantByGenerationAndSerial](#getreplicantbygenerationandserial)
- [getReplicantByTokenId](#getreplicantbytokenid)
- [mintReplicant](#mintreplicant)

### getReplicantByGenerationAndSerial

Get the Avastar Replicant metadata associated with a given Generation and Serial

```solidity
function getReplicantByGenerationAndSerial(enum AvastarTypes.Generation _generation, uint256 _serial)
external view
returns (
	uint256 id,
	uint256 serial,
	uint256 traits,
	enum AvastarTypes.Generation generation,
	enum AvastarTypes.Gender gender,
	uint8 ranking
)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation | the generation of the specified Replicant | 
| _serial | uint256 | the serial of the specified Replicant | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| id | uint256 | the Replicant's token ID | 
| serial | uint256 | the Replicant's serial | 
| traits | uint256 | the Replicant's trait hash | 
| generation | enum AvastarTypes.Generation | the Replicant's generation | 
| gender | enum AvastarTypes.Gender | the Replicant's gender | 
| ranking | uint8 | the Replicant's ranking | 

### getReplicantByTokenId

Get the Avastar Replicant metadata associated with a given Token ID

```solidity
function getReplicantByTokenId(uint256 _tokenId)
external view
returns (
	uint256,
	uint256,
	uint256,
	enum AvastarTypes.Generation,
	enum AvastarTypes.Gender,
	uint8
)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the token ID of the specified Replicant | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | uint256 | id the Replicant's token ID | 
|  | uint256 | id the Replicant's token ID | 
|  | uint256 | id the Replicant's token ID | 
|  | enum AvastarTypes.Generation | id the Replicant's token ID | 
|  | enum AvastarTypes.Gender | id the Replicant's token ID | 
|  | uint8 | id the Replicant's token ID | 

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
external nonpayable onlyMinter whenNotPaused 
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
| tokenId | uint256 |  | 
| serial | uint256 | the newly minted Replicant's serial | 

