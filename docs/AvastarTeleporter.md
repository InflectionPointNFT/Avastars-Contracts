# AvastarTeleporter

View Source: [contracts/AvastarTeleporter.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AvastarTeleporter.sol)

**↗ Extends: [ReplicantFactory](ReplicantFactory.md)**

**AvastarTeleporter**

Management of Avastar Primes, Replicants, and Traits

## Events

```solidity
event TraitAccessApproved(address indexed handler, uint256[]  primeIds);
event TraitsUsed(address indexed handler, uint256  primeId, bool[]  used);
```

- [isAvastarTeleporter](#isavastarteleporter)
- [approveTraitAccess](#approvetraitaccess)
- [useTraits](#usetraits)

### isAvastarTeleporter

Acknowledge contract is AvastarTeleporter

```solidity
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

```solidity
function approveTraitAccess(address _handler, uint256[] _primeIds) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _handler | address | the address approved for Trait access | 
| _primeIds | uint256[] | the token ids for which to approve the handler | 

### useTraits

Mark some or all of an Avastar Prime's traits used.

```solidity
function useTraits(uint256 _primeId, bool[] _traitFlags) external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _primeId | uint256 | the token id for the Prime whose Traits are to be used | 
| _traitFlags | bool[] | an array of no more than 32 booleans representing the Traits to be used | 

