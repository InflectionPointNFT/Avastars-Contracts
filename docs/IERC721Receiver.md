# ERC721 token receiver interface (IERC721Receiver.sol)

View Source: [@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol](@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol)

**IERC721Receiver**

Interface for any contract that wants to support safeTransfers
from ERC721 asset contracts.

## Functions

- [onERC721Received](#onerc721received)

### onERC721Received

Handle the receipt of an NFT

```solidity
function onERC721Received(address operator, address from, uint256 tokenId, bytes data) public nonpayable
returns(bytes4)
```

**Returns**

bytes4 `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| operator | address | The address which called `safeTransferFrom` function | 
| from | address | The address which previously owned the token | 
| tokenId | uint256 | The NFT identifier which is being transferred | 
| data | bytes | Additional data with no specified format | 

