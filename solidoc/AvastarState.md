# Avastar State (AvastarState.sol)

View Source: [contracts/AvastarState.sol](../contracts/AvastarState.sol)

**↗ Extends: [AvastarTypes](AvastarTypes.md), [AccessControl](AccessControl.md), [ERC721Full](ERC721Full.md)**
**↘ Derived Contracts: [TraitFactory](TraitFactory.md)**

**AvastarState**

## Contract Members
**Constants & Variables**

```js
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

## Functions

- [()](#)
- [trackAvastar(struct AvastarTypes.Avastar _avastar)](#trackavastar)

### 

Constructor

```js
function () public nonpayable ERC721Full 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### trackAvastar

```js
function trackAvastar(struct AvastarTypes.Avastar _avastar) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _avastar | struct AvastarTypes.Avastar |  | 

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
