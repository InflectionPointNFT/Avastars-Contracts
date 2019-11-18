# Avastar Trait Factory

View Source: [contracts/TraitFactory.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/TraitFactory.sol)

**TraitFactory** **↗ Extends: [AvastarState](AvastarState.md)**
**↘ Derived Contracts: [PrimeFactory](PrimeFactory.md)**

## Events

```solidity
event NewTrait(uint256 id, enum AvastarTypes.Gene gene, uint8 variation, string name);
```

## **Functions**

- [getTrait](#gettrait)
- [getTraitIdByGenerationGeneAndVariation](#gettraitidbygenerationgeneandvariation)
- [createTrait](#createtrait)
- [assembleArt](#assembleart)
- [strConcat](#strconcat)

### getTrait

Get the Trait data associated with a given Trait ID

```solidity
function getTrait(uint256 _traitId) external view
returns(uint256, enum AvastarTypes.Generation, enum AvastarTypes.Series[], enum AvastarTypes.Gender, enum AvastarTypes.Gene, uint8, string, string)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _traitId | uint256 |  | 

### getTraitIdByGenerationGeneAndVariation

Get Trait ID by Generation and Variation

```solidity
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

```solidity
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

```solidity
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

```solidity
function strConcat(string _a, string _b) private pure
returns(result string)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _a | string |  | 
| _b | string |  | 

