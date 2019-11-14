# ERC-721 Non-Fungible Token Standard, optional metadata extension (IERC721Metadata.sol)

View Source: [@openzeppelin/contracts/token/ERC721/IERC721Metadata.sol](../@openzeppelin/contracts/token/ERC721/IERC721Metadata.sol)

**↗ Extends: [IERC721](IERC721.md)**
**↘ Derived Contracts: [ERC721Metadata](ERC721Metadata.md)**

**IERC721Metadata**

See https://eips.ethereum.org/EIPS/eip-721

## Functions

- [name()](#name)
- [symbol()](#symbol)
- [tokenURI(uint256 tokenId)](#tokenuri)

### name

⤿ Overridden Implementation(s): [ERC721Metadata.name](ERC721Metadata.md#name)

```js
function name() external view
returns(string)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### symbol

⤿ Overridden Implementation(s): [ERC721Metadata.symbol](ERC721Metadata.md#symbol)

```js
function symbol() external view
returns(string)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### tokenURI

⤿ Overridden Implementation(s): [ERC721Metadata.tokenURI](ERC721Metadata.md#tokenuri)

```js
function tokenURI(uint256 tokenId) external view
returns(string)
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
