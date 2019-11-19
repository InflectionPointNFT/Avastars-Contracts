# Avastar State

View Source: [contracts/AvastarState.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AvastarState.sol)

**AvastarState** **↗ Extends: [AvastarTypes](AvastarTypes.md), [AccessControl](AccessControl.md), [ERC721Full](ERC721Full.md)**
**↘ Derived Contracts: [TraitFactory](TraitFactory.md)**

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
mapping(uint8 => mapping(uint8 => mapping(uint8 => uint256))) public traitIdByGenerationGeneAndVariation;

// internal members
struct AvastarTypes.Avastar[] internal avastars;
struct AvastarTypes.Trait[] internal traits;
mapping(uint8 => struct AvastarTypes.Prime[]) internal primesByGeneration;
mapping(uint8 => struct AvastarTypes.Replicant[]) internal replicantsByGeneration;
mapping(uint256 => address) internal traitHandlerByPrimeTokenId;
mapping(uint8 => mapping(uint256 => bool)) internal isHashUsedByGeneration;
mapping(uint8 => mapping(uint256 => uint256)) internal tokenIdByGenerationAndHash;
mapping(uint8 => mapping(uint8 => mapping(uint256 => uint256))) internal tokenIdByGenerationWaveAndSerial;

```

## **Functions**

- [trackAvastar](#trackavastar)

### trackAvastar

```solidity
function trackAvastar(struct AvastarTypes.Avastar _avastar)
internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _avastar | struct AvastarTypes.Avastar | the new Avastar to store and track | 

