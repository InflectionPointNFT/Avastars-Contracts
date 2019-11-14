# AvastarTeleporter (AvastarTeleporter.sol)

View Source: [contracts/AvastarTeleporter.sol](../contracts/AvastarTeleporter.sol)

**↗ Extends: [ReplicantFactory](ReplicantFactory.md)**

**AvastarTeleporter**

Management of Avastar Primes, Replicants, and Traits

**Events**

```js
event TraitAccessApproved(address indexed handler, uint256[]  primeIds);
event TraitsUsed(address indexed handler, uint256  primeId, bool[]  used);
```

## Functions

- [isAvastarTeleporter()](#isavastarteleporter)
- [approveTraitAccess(address _handler, uint256[] _primeIds)](#approvetraitaccess)
- [useTraits(uint256 _primeId, bool[] _traitFlags)](#usetraits)

### isAvastarTeleporter

Acknowledge contract is AvastarTeleporter

```js
function isAvastarTeleporter() external pure
returns(bool)
```

**Returns**

always true

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|

### approveTraitAccess

Approve a handler to manage trait access for a set of Avastar Primes

```js
function approveTraitAccess(address _handler, uint256[] _primeIds) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _handler | address | the address approved for Trait access | 
| _primeIds | uint256[] | the token ids for which to approve the handler | 

### useTraits

Mark some or all of an Avastar Prime's traits used.

```js
function useTraits(uint256 _primeId, bool[] _traitFlags) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _primeId | uint256 | the token id for the Prime whose Traits are to be used | 
| _traitFlags | bool[] | an array of no more than 32 booleans representing the Traits to be used | 

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
