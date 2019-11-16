# ERC-721 Non-Fungible Token Standard, optional enumeration extension

View Source: [@openzeppelin/contracts/token/ERC721/IERC721Enumerable.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/@openzeppelin/contracts/token/ERC721/IERC721Enumerable.sol)

**IERC721Enumerable** **↗ Extends: [IERC721](IERC721.md)**
**↘ Derived Contracts: [ERC721Enumerable](ERC721Enumerable.md)**

See https://eips.ethereum.org/EIPS/eip-721

## **Functions**

- [totalSupply](#totalsupply)
- [tokenOfOwnerByIndex](#tokenofownerbyindex)
- [tokenByIndex](#tokenbyindex)

### totalSupply

⤿ Overridden Implementation(s): [ERC721Enumerable.totalSupply](ERC721Enumerable.md#totalsupply)

```solidity
function totalSupply() public view
returns(uint256)
```

### tokenOfOwnerByIndex

⤿ Overridden Implementation(s): [ERC721Enumerable.tokenOfOwnerByIndex](ERC721Enumerable.md#tokenofownerbyindex)

```solidity
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

```solidity
function tokenByIndex(uint256 index) public view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| index | uint256 |  | 

