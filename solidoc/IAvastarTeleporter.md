# AvastarTeleporter Interface (IAvastarTeleporter.sol)

View Source: [contracts/IAvastarTeleporter.sol](../contracts/IAvastarTeleporter.sol)

**↗ Extends: [AvastarTypes](AvastarTypes.md)**

**IAvastarTeleporter**

Declared with contract rather than interface as it must inherit for enum types

## Functions

- [isAvastarTeleporter()](#isavastarteleporter)
- [mintPrime(address _owner, uint256 _traits, enum AvastarTypes.Generation _generation, enum AvastarTypes.Series _series, enum AvastarTypes.Gender _gender, uint8 _ranking)](#mintprime)
- [mintReplicant(address _owner, uint256 _traits, enum AvastarTypes.Generation _generation, enum AvastarTypes.Gender _gender, uint8 _ranking)](#mintreplicant)
- [ownerOf(uint256 tokenId)](#ownerof)

### isAvastarTeleporter

```js
function isAvastarTeleporter() external pure
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### mintPrime

```js
function mintPrime(address _owner, uint256 _traits, enum AvastarTypes.Generation _generation, enum AvastarTypes.Series _series, enum AvastarTypes.Gender _gender, uint8 _ranking) external nonpayable
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

### mintReplicant

```js
function mintReplicant(address _owner, uint256 _traits, enum AvastarTypes.Generation _generation, enum AvastarTypes.Gender _gender, uint8 _ranking) external nonpayable
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

### ownerOf

```js
function ownerOf(uint256 tokenId) external view
returns(owner address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 |  | 

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
