# Avastar Replicant Factory

View Source: [contracts/ReplicantFactory.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/ReplicantFactory.sol)

**ReplicantFactory** **↗ Extends: [PrimeFactory](PrimeFactory.md)**
**↘ Derived Contracts: [AvastarTeleporter](AvastarTeleporter.md)**

## Events

```solidity
event NewReplicant(uint256  id, uint256  serial, enum AvastarTypes.Generation  generation, enum AvastarTypes.Gender  gender, uint256  traits);
```

## **Functions**

- [getReplicantByGenerationAndSerial](#getreplicantbygenerationandserial)
- [getReplicantByTokenId](#getreplicantbytokenid)
- [mintReplicant](#mintreplicant)

### getReplicantByGenerationAndSerial

Get the Avastar Replicant associated by Generation and Serial

```solidity
function getReplicantByGenerationAndSerial(enum AvastarTypes.Generation _generation, uint256 _serial) external view
returns(uint256, uint256, uint256, enum AvastarTypes.Generation, enum AvastarTypes.Gender, uint8)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation |  | 
| _serial | uint256 |  | 

### getReplicantByTokenId

Get the Avastar Replicant associated with a given Token ID

```solidity
function getReplicantByTokenId(uint256 _tokenId) external view
returns(uint256, uint256, uint256, enum AvastarTypes.Generation, enum AvastarTypes.Gender, uint8)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 |  | 

### mintReplicant

Mint an Avastar Replicant

```solidity
function mintReplicant(address _owner, uint256 _traits, enum AvastarTypes.Generation _generation, enum AvastarTypes.Gender _gender, uint8 _ranking) external nonpayable onlyMinter whenNotPaused 
returns(uint256, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address |  | 
| _traits | uint256 |  | 
| _generation | enum AvastarTypes.Generation |  | 
| _gender | enum AvastarTypes.Gender |  | 
| _ranking | uint8 |  | 

