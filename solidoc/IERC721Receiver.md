# ERC721 token receiver interface (IERC721Receiver.sol)

View Source: [@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol](../@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol)

**IERC721Receiver**

Interface for any contract that wants to support safeTransfers
from ERC721 asset contracts.

## Functions

- [onERC721Received(address operator, address from, uint256 tokenId, bytes data)](#onerc721received)

### onERC721Received

Handle the receipt of an NFT

```js
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
