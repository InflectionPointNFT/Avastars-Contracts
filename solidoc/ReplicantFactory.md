# Avastar Replicant Factory (ReplicantFactory.sol)

View Source: [contracts/ReplicantFactory.sol](../contracts/ReplicantFactory.sol)

**↗ Extends: [PrimeFactory](PrimeFactory.md)**
**↘ Derived Contracts: [AvastarTeleporter](AvastarTeleporter.md)**

**ReplicantFactory**

**Events**

```js
event NewReplicant(uint256  id, uint256  serial, enum AvastarTypes.Generation  generation, enum AvastarTypes.Gender  gender, uint256  traits);
```

## Functions

- [getReplicantByGenerationAndSerial(enum AvastarTypes.Generation _generation, uint256 _serial)](#getreplicantbygenerationandserial)
- [getReplicantByTokenId(uint256 _tokenId)](#getreplicantbytokenid)
- [mintReplicant(address _owner, uint256 _traits, enum AvastarTypes.Generation _generation, enum AvastarTypes.Gender _gender, uint8 _ranking)](#mintreplicant)

### getReplicantByGenerationAndSerial

Get the Avastar Replicant associated by Generation and Serial

```js
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

```js
function getReplicantByTokenId(uint256 _tokenId) external view
returns(uint256, uint256, uint256, enum AvastarTypes.Generation, enum AvastarTypes.Gender, uint8)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 |  | 

### mintReplicant

Mint an Avastar Replicant

```js
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

## Contracts

* [AccessControl](AccessControl.md)
* [Address](Address.md)
* [AvastarMinter](AvastarMinter.md)
* [AvastarState](AvastarState.md)
* [AvastarTeleporter](AvastarTeleporter.md)
* [AvastarTypes](AvastarTypes.md)
* [Context](Context.md)
* [Counters](Counters.md)
* [ERC165](ERC165.md)
* [ERC721](ERC721.md)
* [ERC721Enumerable](ERC721Enumerable.md)
* [ERC721Full](ERC721Full.md)
* [ERC721Metadata](ERC721Metadata.md)
* [IAvastarTeleporter](IAvastarTeleporter.md)
* [IERC165](IERC165.md)
* [IERC721](IERC721.md)
* [IERC721Enumerable](IERC721Enumerable.md)
* [IERC721Metadata](IERC721Metadata.md)
* [IERC721Receiver](IERC721Receiver.md)
* [Migrations](Migrations.md)
* [PrimeFactory](PrimeFactory.md)
* [ReplicantFactory](ReplicantFactory.md)
* [Roles](Roles.md)
* [SafeMath](SafeMath.md)
* [TraitFactory](TraitFactory.md)
