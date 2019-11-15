# IERC165.sol

View Source: [@openzeppelin/contracts/introspection/IERC165.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/@openzeppelin/contracts/introspection/IERC165.sol)

**↘ Derived Contracts: [ERC165](ERC165.md), [IERC721](IERC721.md)**

**IERC165**

Interface of the ERC165 standard, as defined in the
https://eips.ethereum.org/EIPS/eip-165[EIP].
 * Implementers can declare support of contract interfaces, which can then be
queried by others ({ERC165Checker}).
 * For an implementation, see {ERC165}.

## Functions

- [supportsInterface](#supportsinterface)

### supportsInterface

⤿ Overridden Implementation(s): [ERC165.supportsInterface](ERC165.md#supportsinterface)

Returns true if this contract implements the interface defined by
`interfaceId`. See the corresponding
https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]
to learn more about how these ids are created.
     * This function call must use less than 30 000 gas.

```solidity
function supportsInterface(bytes4 interfaceId) external view
returns(bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| interfaceId | bytes4 |  | 

