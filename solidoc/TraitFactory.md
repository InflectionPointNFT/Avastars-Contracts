# Avastar Trait Factory (TraitFactory.sol)

View Source: [contracts/TraitFactory.sol](../contracts/TraitFactory.sol)

**↗ Extends: [AvastarState](AvastarState.md)**
**↘ Derived Contracts: [PrimeFactory](PrimeFactory.md)**

**TraitFactory**

**Events**

```js
event NewTrait(uint256  id, enum AvastarTypes.Gene  gene, uint8  variation, string  name);
```

## Functions

- [getTrait(uint256 _traitId)](#gettrait)
- [getTraitIdByGenerationGeneAndVariation(enum AvastarTypes.Generation _generation, enum AvastarTypes.Gene _gene, uint256 _variationSafe)](#gettraitidbygenerationgeneandvariation)
- [createTrait(enum AvastarTypes.Generation _generation, enum AvastarTypes.Series[] _series, enum AvastarTypes.Gender _gender, enum AvastarTypes.Gene _gene, uint256 _variationSafe, string _name, string _svg)](#createtrait)
- [assembleArt(enum AvastarTypes.Generation _generation, uint256 _traitHash)](#assembleart)
- [strConcat(string _a, string _b)](#strconcat)

### getTrait

Get the Trait data associated with a given Trait ID

```js
function getTrait(uint256 _traitId) external view
returns(uint256, enum AvastarTypes.Generation, enum AvastarTypes.Series[], enum AvastarTypes.Gender, enum AvastarTypes.Gene, uint8, string, string)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _traitId | uint256 |  | 

### getTraitIdByGenerationGeneAndVariation

Get Trait ID by Generation and Variation

```js
function getTraitIdByGenerationGeneAndVariation(enum AvastarTypes.Generation _generation, enum AvastarTypes.Gene _gene, uint256 _variationSafe) external view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation |  | 
| _gene | enum AvastarTypes.Gene |  | 
| _variationSafe | uint256 |  | 

### createTrait

Create a Trait

```js
function createTrait(enum AvastarTypes.Generation _generation, enum AvastarTypes.Series[] _series, enum AvastarTypes.Gender _gender, enum AvastarTypes.Gene _gene, uint256 _variationSafe, string _name, string _svg) external nonpayable onlySysAdmin whenNotPaused 
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation |  | 
| _series | enum AvastarTypes.Series[] |  | 
| _gender | enum AvastarTypes.Gender |  | 
| _gene | enum AvastarTypes.Gene |  | 
| _variationSafe | uint256 |  | 
| _name | string |  | 
| _svg | string |  | 

### assembleArt

Assemble the artwork for a given Trait hash with art from the given Generation

```js
function assembleArt(enum AvastarTypes.Generation _generation, uint256 _traitHash) public view
returns(string)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation |  | 
| _traitHash | uint256 |  | 

### strConcat

Concatenate two strings

```js
function strConcat(string _a, string _b) private pure
returns(result string)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _a | string |  | 
| _b | string |  | 

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
