# Avastar Prime Factory (PrimeFactory.sol)

View Source: [contracts/PrimeFactory.sol](../contracts/PrimeFactory.sol)

**↗ Extends: [TraitFactory](TraitFactory.md)**
**↘ Derived Contracts: [ReplicantFactory](ReplicantFactory.md)**

**PrimeFactory**

**Events**

```js
event NewPrime(uint256  id, uint256  serial, enum AvastarTypes.Generation  generation, enum AvastarTypes.Series  series, enum AvastarTypes.Gender  gender, uint256  traits);
```

## Functions

- [getPrimeByGenerationAndSerial(enum AvastarTypes.Generation _generation, uint256 _serial)](#getprimebygenerationandserial)
- [getPrimeByTokenId(uint256 _tokenId)](#getprimebytokenid)
- [mintPrime(address _owner, uint256 _traits, enum AvastarTypes.Generation _generation, enum AvastarTypes.Series _series, enum AvastarTypes.Gender _gender, uint8 _ranking)](#mintprime)

### getPrimeByGenerationAndSerial

Get the Avastar Prime metadata associated with a given Generation and Serial

```js
function getPrimeByGenerationAndSerial(enum AvastarTypes.Generation _generation, uint256 _serial) external view
returns(uint256, uint256, uint256, bool[], enum AvastarTypes.Generation, enum AvastarTypes.Series, enum AvastarTypes.Gender, uint8)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation | the Generation of the Prime | 
| _serial | uint256 | the Serial of the Prime | 

### getPrimeByTokenId

Get the Avastar Prime metadata associated with a given Token ID

```js
function getPrimeByTokenId(uint256 _tokenId) external view
returns(uint256, uint256, uint256, bool[], enum AvastarTypes.Generation, enum AvastarTypes.Series, enum AvastarTypes.Gender, uint8)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the Token ID of the Prime | 

### mintPrime

Mint an Avastar Prime

```js
function mintPrime(address _owner, uint256 _traits, enum AvastarTypes.Generation _generation, enum AvastarTypes.Series _series, enum AvastarTypes.Gender _gender, uint8 _ranking) external nonpayable onlyMinter whenNotPaused 
returns(uint256, uint256)
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
