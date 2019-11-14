# IERC721.sol

View Source: [@openzeppelin/contracts/token/ERC721/IERC721.sol](../@openzeppelin/contracts/token/ERC721/IERC721.sol)

**↗ Extends: [IERC165](IERC165.md)**
**↘ Derived Contracts: [ERC721](ERC721.md), [IERC721Enumerable](IERC721Enumerable.md), [IERC721Metadata](IERC721Metadata.md)**

**IERC721**

Required interface of an ERC721 compliant contract.

**Events**

```js
event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
event ApprovalForAll(address indexed owner, address indexed operator, bool  approved);
```

## Functions

- [balanceOf(address owner)](#balanceof)
- [ownerOf(uint256 tokenId)](#ownerof)
- [safeTransferFrom(address from, address to, uint256 tokenId)](#safetransferfrom)
- [transferFrom(address from, address to, uint256 tokenId)](#transferfrom)
- [approve(address to, uint256 tokenId)](#approve)
- [getApproved(uint256 tokenId)](#getapproved)
- [setApprovalForAll(address operator, bool _approved)](#setapprovalforall)
- [isApprovedForAll(address owner, address operator)](#isapprovedforall)
- [safeTransferFrom(address from, address to, uint256 tokenId, bytes data)](#safetransferfrom)

### balanceOf

⤿ Overridden Implementation(s): [ERC721.balanceOf](ERC721.md#balanceof)

Returns the number of NFTs in `owner`'s account.

```js
function balanceOf(address owner) public view
returns(balance uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 

### ownerOf

⤿ Overridden Implementation(s): [ERC721.ownerOf](ERC721.md#ownerof)

Returns the owner of the NFT specified by `tokenId`.

```js
function ownerOf(uint256 tokenId) public view
returns(owner address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 |  | 

### safeTransferFrom

⤿ Overridden Implementation(s): [ERC721.safeTransferFrom](ERC721.md#safetransferfrom)

Transfers a specific NFT (`tokenId`) from one account (`from`) to
another (`to`).
     *
     * Requirements:
- `from`, `to` cannot be zero.
- `tokenId` must be owned by `from`.
- If the caller is not `from`, it must be have been allowed to move this
NFT by either {approve} or {setApprovalForAll}.

```js
function safeTransferFrom(address from, address to, uint256 tokenId) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| from | address |  | 
| to | address |  | 
| tokenId | uint256 |  | 

### transferFrom

⤿ Overridden Implementation(s): [ERC721.transferFrom](ERC721.md#transferfrom)

Transfers a specific NFT (`tokenId`) from one account (`from`) to
another (`to`).
     * Requirements:
- If the caller is not `from`, it must be approved to move this NFT by
either {approve} or {setApprovalForAll}.

```js
function transferFrom(address from, address to, uint256 tokenId) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| from | address |  | 
| to | address |  | 
| tokenId | uint256 |  | 

### approve

⤿ Overridden Implementation(s): [ERC721.approve](ERC721.md#approve)

```js
function approve(address to, uint256 tokenId) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| to | address |  | 
| tokenId | uint256 |  | 

### getApproved

⤿ Overridden Implementation(s): [ERC721.getApproved](ERC721.md#getapproved)

```js
function getApproved(uint256 tokenId) public view
returns(operator address)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 |  | 

### setApprovalForAll

⤿ Overridden Implementation(s): [ERC721.setApprovalForAll](ERC721.md#setapprovalforall)

```js
function setApprovalForAll(address operator, bool _approved) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| operator | address |  | 
| _approved | bool |  | 

### isApprovedForAll

⤿ Overridden Implementation(s): [ERC721.isApprovedForAll](ERC721.md#isapprovedforall)

```js
function isApprovedForAll(address owner, address operator) public view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 
| operator | address |  | 

### safeTransferFrom

⤿ Overridden Implementation(s): [ERC721.safeTransferFrom](ERC721.md#safetransferfrom)

```js
function safeTransferFrom(address from, address to, uint256 tokenId, bytes data) public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| from | address |  | 
| to | address |  | 
| tokenId | uint256 |  | 
| data | bytes |  | 

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
