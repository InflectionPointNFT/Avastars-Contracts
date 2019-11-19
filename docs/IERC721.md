# IERC721.sol

View Source: [@openzeppelin/contracts/token/ERC721/IERC721.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/@openzeppelin/contracts/token/ERC721/IERC721.sol)

**IERC721** **↗ Extends: [IERC165](IERC165.md)**
**↘ Derived Contracts: [ERC721](ERC721.md), [IERC721Enumerable](IERC721Enumerable.md), [IERC721Metadata](IERC721Metadata.md)**

Required interface of an ERC721 compliant contract.

## Events

```solidity
event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
```

## **Functions**

- [balanceOf](#balanceof)
- [ownerOf](#ownerof)
- [safeTransferFrom](#safetransferfrom)
- [transferFrom](#transferfrom)
- [approve](#approve)
- [getApproved](#getapproved)
- [setApprovalForAll](#setapprovalforall)
- [isApprovedForAll](#isapprovedforall)
- [safeTransferFrom](#safetransferfrom)

### balanceOf

⤿ Overridden Implementation(s): [ERC721.balanceOf](ERC721.md#balanceof)

Returns the number of NFTs in `owner`'s account.

```solidity
function balanceOf(address owner)
public view
returns (uint256 balance)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| balance | uint256 |  | 

### ownerOf

⤿ Overridden Implementation(s): [ERC721.ownerOf](ERC721.md#ownerof)

Returns the owner of the NFT specified by `tokenId`.

```solidity
function ownerOf(uint256 tokenId)
public view
returns (address owner)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 |  | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 

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

```solidity
function safeTransferFrom(
	address from,
	address to,
	uint256 tokenId
)
public nonpayable
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

```solidity
function transferFrom(
	address from,
	address to,
	uint256 tokenId
)
public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| from | address |  | 
| to | address |  | 
| tokenId | uint256 |  | 

### approve

⤿ Overridden Implementation(s): [ERC721.approve](ERC721.md#approve)

```solidity
function approve(address to, uint256 tokenId)
public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| to | address |  | 
| tokenId | uint256 |  | 

### getApproved

⤿ Overridden Implementation(s): [ERC721.getApproved](ERC721.md#getapproved)

```solidity
function getApproved(uint256 tokenId)
public view
returns (address operator)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 |  | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| operator | address |  | 

### setApprovalForAll

⤿ Overridden Implementation(s): [ERC721.setApprovalForAll](ERC721.md#setapprovalforall)

```solidity
function setApprovalForAll(address operator, bool _approved)
public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| operator | address |  | 
| _approved | bool |  | 

### isApprovedForAll

⤿ Overridden Implementation(s): [ERC721.isApprovedForAll](ERC721.md#isapprovedforall)

```solidity
function isApprovedForAll(address owner, address operator)
public view
returns (bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 
| operator | address |  | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | bool |  | 

### safeTransferFrom

⤿ Overridden Implementation(s): [ERC721.safeTransferFrom](ERC721.md#safetransferfrom)

```solidity
function safeTransferFrom(
	address from,
	address to,
	uint256 tokenId,
	bytes data
)
public nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| from | address |  | 
| to | address |  | 
| tokenId | uint256 |  | 
| data | bytes |  | 

