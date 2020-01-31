# Avastar State

View Source: [contracts/AvastarState.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AvastarState.sol)

**AvastarState** **↗ Extends: [AvastarBase](contracts/AvastarBase.md), [AvastarTypes](contracts/AvastarTypes.md), [AccessControl](contracts/AccessControl.md), [ERC721Full](contracts/ERC721Full.md)**
**↘ Derived Contracts: [TraitFactory](contracts/TraitFactory.md)**

This contract maintains the state variables for the Avastar Teleporter.

## Constructor

Calls ERC721Full constructor with token name and symbol.

```solidity
constructor(string memory TOKEN_NAME, string memory TOKEN_SYMBOL) public
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| TOKEN_NAME | string memory |  | 
| TOKEN_SYMBOL | string memory |  | 

## Contract Members
**Constants & Variables**

```solidity
// public members
string public constant TOKEN_NAME;
string public constant TOKEN_SYMBOL;
mapping(uint8 => struct AvastarTypes.Attribution) public attributionByGeneration;
mapping(uint8 => mapping(uint256 => bool)) public isHashUsedByGeneration;
mapping(uint8 => mapping(uint256 => uint256)) public tokenIdByGenerationAndHash;
mapping(uint8 => mapping(uint8 => uint16)) public primeCountByGenAndSeries;
mapping(uint8 => uint16) public replicantCountByGeneration;
mapping(uint8 => mapping(uint8 => mapping(uint256 => uint256))) public tokenIdByGenerationWaveAndSerial;
mapping(uint8 => mapping(uint8 => mapping(uint8 => uint256))) public traitIdByGenerationGeneAndVariation;

// internal members
struct AvastarTypes.Avastar[] internal avastars;
struct AvastarTypes.Trait[] internal traits;
mapping(uint8 => struct AvastarTypes.Prime[]) internal primesByGeneration;
mapping(uint8 => struct AvastarTypes.Replicant[]) internal replicantsByGeneration;
mapping(uint256 => address) internal traitHandlerByPrimeTokenId;

```

