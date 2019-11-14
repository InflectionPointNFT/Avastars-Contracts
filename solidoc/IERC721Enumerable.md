# ERC-721 Non-Fungible Token Standard, optional enumeration extension (IERC721Enumerable.sol)

View Source: [@openzeppelin/contracts/token/ERC721/IERC721Enumerable.sol](../@openzeppelin/contracts/token/ERC721/IERC721Enumerable.sol)

**↗ Extends: [IERC721](IERC721.md)**
**↘ Derived Contracts: [ERC721Enumerable](ERC721Enumerable.md)**

**IERC721Enumerable**

See https://eips.ethereum.org/EIPS/eip-721

## Functions

- [totalSupply()](#totalsupply)
- [tokenOfOwnerByIndex(address owner, uint256 index)](#tokenofownerbyindex)
- [tokenByIndex(uint256 index)](#tokenbyindex)

### totalSupply

⤿ Overridden Implementation(s): [ERC721Enumerable.totalSupply](ERC721Enumerable.md#totalsupply)

```js
function totalSupply() public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### tokenOfOwnerByIndex

⤿ Overridden Implementation(s): [ERC721Enumerable.tokenOfOwnerByIndex](ERC721Enumerable.md#tokenofownerbyindex)

```js
function tokenOfOwnerByIndex(address owner, uint256 index) public view
returns(tokenId uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 
| index | uint256 |  | 

### tokenByIndex

⤿ Overridden Implementation(s): [ERC721Enumerable.tokenByIndex](ERC721Enumerable.md#tokenbyindex)

```js
function tokenByIndex(uint256 index) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| index | uint256 |  | 

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
