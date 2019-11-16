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
string public constant TOKEN_NAME;
string public constant TOKEN_SYMBOL;
struct AvastarTypes.Avastar[] public avastars;
struct AvastarTypes.Trait[] public traits;
mapping(uint8 => mapping(uint256 => bool)) public isHashUsedByGeneration;
mapping(uint8 => mapping(uint256 => uint256)) public tokenIdByGenerationAndHash;
mapping(uint8 => struct AvastarTypes.Prime[]) public primesByGeneration;
mapping(uint8 => struct AvastarTypes.Replicant[]) public replicantsByGeneration;
mapping(uint8 => mapping(uint8 => mapping(uint8 => uint256))) public traitIdByGenerationGeneAndVariation;
mapping(uint8 => mapping(uint8 => mapping(uint256 => uint256))) public tokenIdByGenerationWaveAndSerial;
mapping(uint256 => address) public traitHandlerByPrimeTokenId;

```

## **Functions**

- [trackAvastar](#trackavastar)

### trackAvastar

```solidity
function trackAvastar(struct AvastarTypes.Avastar _avastar) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _avastar | struct AvastarTypes.Avastar |  | 

