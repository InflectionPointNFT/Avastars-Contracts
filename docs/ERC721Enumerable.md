# ERC-721 Non-Fungible Token with optional enumeration extension logic

View Source: [@openzeppelin/contracts/token/ERC721/ERC721Enumerable.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/@openzeppelin/contracts/token/ERC721/ERC721Enumerable.sol)

**ERC721Enumerable** **↗ Extends: [Context](Context.md), [ERC165](ERC165.md), [ERC721](ERC721.md), [IERC721Enumerable](IERC721Enumerable.md)**
**↘ Derived Contracts: [ERC721Full](ERC721Full.md)**

See https://eips.ethereum.org/EIPS/eip-721

## Contract Members
**Constants & Variables**

```solidity
mapping(address => uint256[]) private _ownedTokens;
mapping(uint256 => uint256) private _ownedTokensIndex;
uint256[] private _allTokens;
mapping(uint256 => uint256) private _allTokensIndex;
bytes4 private constant _INTERFACE_ID_ERC721_ENUMERABLE;

```

## **Functions**

- [tokenOfOwnerByIndex](#tokenofownerbyindex)
- [totalSupply](#totalsupply)
- [tokenByIndex](#tokenbyindex)
- [_transferFrom](#_transferfrom)
- [_mint](#_mint)
- [_burn](#_burn)
- [_tokensOfOwner](#_tokensofowner)
- [_addTokenToOwnerEnumeration](#_addtokentoownerenumeration)
- [_addTokenToAllTokensEnumeration](#_addtokentoalltokensenumeration)
- [_removeTokenFromOwnerEnumeration](#_removetokenfromownerenumeration)
- [_removeTokenFromAllTokensEnumeration](#_removetokenfromalltokensenumeration)

### tokenOfOwnerByIndex

⤾ overrides [IERC721Enumerable.tokenOfOwnerByIndex](IERC721Enumerable.md#tokenofownerbyindex)

Gets the token ID at a given index of the tokens list of the requested owner.

```solidity
function tokenOfOwnerByIndex(address owner, uint256 index) public view
returns(uint256)
```

**Returns**

uint256 token ID at the given index of the tokens list owned by the requested address

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address | address owning the tokens list to be accessed | 
| index | uint256 | uint256 representing the index to be accessed of the requested tokens list | 

### totalSupply

⤾ overrides [IERC721Enumerable.totalSupply](IERC721Enumerable.md#totalsupply)

Gets the total amount of tokens stored by the contract.

```solidity
function totalSupply() public view
returns(uint256)
```

**Returns**

uint256 representing the total amount of tokens

### tokenByIndex

⤾ overrides [IERC721Enumerable.tokenByIndex](IERC721Enumerable.md#tokenbyindex)

Gets the token ID at a given index of all the tokens in this contract
Reverts if the index is greater or equal to the total number of tokens.

```solidity
function tokenByIndex(uint256 index) public view
returns(uint256)
```

**Returns**

uint256 token ID at the given index of the tokens list

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| index | uint256 | uint256 representing the index to be accessed of the tokens list | 

### _transferFrom

⤾ overrides [ERC721._transferFrom](ERC721.md#_transferfrom)

Internal function to transfer ownership of a given token ID to another address.
As opposed to transferFrom, this imposes no restrictions on msg.sender.

```solidity
function _transferFrom(address from, address to, uint256 tokenId) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| from | address | current owner of the token | 
| to | address | address to receive the ownership of the given token ID | 
| tokenId | uint256 | uint256 ID of the token to be transferred | 

### _mint

⤾ overrides [ERC721._mint](ERC721.md#_mint)

Internal function to mint a new token.
Reverts if the given token ID already exists.

```solidity
function _mint(address to, uint256 tokenId) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| to | address | address the beneficiary that will own the minted token | 
| tokenId | uint256 | uint256 ID of the token to be minted | 

### _burn

⤾ overrides [ERC721._burn](ERC721.md#_burn)

Internal function to burn a specific token.
Reverts if the token does not exist.
Deprecated, use {ERC721-_burn} instead.

```solidity
function _burn(address owner, uint256 tokenId) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address | owner of the token to burn | 
| tokenId | uint256 | uint256 ID of the token being burned | 

### _tokensOfOwner

Gets the list of token IDs of the requested owner.

```solidity
function _tokensOfOwner(address owner) internal view
returns(uint256[])
```

**Returns**

uint256[] List of token IDs owned by the requested address

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address | address owning the tokens | 

### _addTokenToOwnerEnumeration

Private function to add a token to this extension's ownership-tracking data structures.

```solidity
function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| to | address | address representing the new owner of the given token ID | 
| tokenId | uint256 | uint256 ID of the token to be added to the tokens list of the given address | 

### _addTokenToAllTokensEnumeration

Private function to add a token to this extension's token tracking data structures.

```solidity
function _addTokenToAllTokensEnumeration(uint256 tokenId) private nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | uint256 ID of the token to be added to the tokens list | 

### _removeTokenFromOwnerEnumeration

Private function to remove a token from this extension's ownership-tracking data structures. Note that
while the token is not assigned a new owner, the `_ownedTokensIndex` mapping is _not_ updated: this allows for
gas optimizations e.g. when performing a transfer operation (avoiding double writes).
This has O(1) time complexity, but alters the order of the _ownedTokens array.

```solidity
function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| from | address | address representing the previous owner of the given token ID | 
| tokenId | uint256 | uint256 ID of the token to be removed from the tokens list of the given address | 

### _removeTokenFromAllTokensEnumeration

Private function to remove a token from this extension's token tracking data structures.
This has O(1) time complexity, but alters the order of the _allTokens array.

```solidity
function _removeTokenFromAllTokensEnumeration(uint256 tokenId) private nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | uint256 ID of the token to be removed from the tokens list | 

