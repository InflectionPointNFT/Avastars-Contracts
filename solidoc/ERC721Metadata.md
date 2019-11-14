# ERC721Metadata.sol

View Source: [@openzeppelin/contracts/token/ERC721/ERC721Metadata.sol](../@openzeppelin/contracts/token/ERC721/ERC721Metadata.sol)

**↗ Extends: [Context](Context.md), [ERC165](ERC165.md), [ERC721](ERC721.md), [IERC721Metadata](IERC721Metadata.md)**
**↘ Derived Contracts: [ERC721Full](ERC721Full.md)**

**ERC721Metadata**

## Contract Members
**Constants & Variables**

```js
string private _name;
string private _symbol;
mapping(uint256 => string) private _tokenURIs;
bytes4 private constant _INTERFACE_ID_ERC721_METADATA;

```

## Functions

- [(string name, string symbol)](#)
- [name()](#name)
- [symbol()](#symbol)
- [tokenURI(uint256 tokenId)](#tokenuri)
- [_setTokenURI(uint256 tokenId, string uri)](#_settokenuri)
- [_burn(address owner, uint256 tokenId)](#_burn)

### 

Constructor function

```js
function (string name, string symbol) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| name | string |  | 
| symbol | string |  | 

### name

⤾ overrides [IERC721Metadata.name](IERC721Metadata.md#name)

Gets the token name.

```js
function name() external view
returns(string)
```

**Returns**

string representing the token name

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### symbol

⤾ overrides [IERC721Metadata.symbol](IERC721Metadata.md#symbol)

Gets the token symbol.

```js
function symbol() external view
returns(string)
```

**Returns**

string representing the token symbol

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### tokenURI

⤾ overrides [IERC721Metadata.tokenURI](IERC721Metadata.md#tokenuri)

Returns an URI for a given token ID.
Throws if the token ID does not exist. May return an empty string.

```js
function tokenURI(uint256 tokenId) external view
returns(string)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | uint256 ID of the token to query | 

### _setTokenURI

Internal function to set the token URI for a given token.
Reverts if the token ID does not exist.

```js
function _setTokenURI(uint256 tokenId, string uri) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | uint256 ID of the token to set its URI | 
| uri | string | string URI to assign | 

### _burn

⤾ overrides [ERC721._burn](ERC721.md#_burn)

Internal function to burn a specific token.
Reverts if the token does not exist.
Deprecated, use _burn(uint256) instead.

```js
function _burn(address owner, uint256 tokenId) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address | owner of the token to burn | 
| tokenId | uint256 | uint256 ID of the token being burned by the msg.sender | 

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
