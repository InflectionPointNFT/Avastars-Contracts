# AvastarTeleporter

View Source: [contracts/AvastarTeleporter.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AvastarTeleporter.sol)

**AvastarTeleporter** **↗ Extends: [ReplicantFactory](contracts/ReplicantFactory.md)**

Management of Avastar Primes, Replicants, and Traits

## **Events**

- [TraitAccessApproved](#traitaccessapproved)
- [TraitsUsed](#traitsused)

### TraitAccessApproved

Event emitted when a handler is approved to manage Trait replication.

```solidity
event TraitAccessApproved(address indexed handler, uint256[] primeIds)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| handler | address | the address being approved to Trait replication | 
| primeIds | uint256[] | the array of Avastar Prime tokenIds the handler can use | 

### TraitsUsed

Event emitted when a handler replicates Traits.

```solidity
event TraitsUsed(
	address indexed handler,
	uint256 primeId,
	bool[] used
)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| handler | address | the address marking the Traits as used | 
| primeId | uint256 | the token id of the Prime supplying the Traits | 
| used | bool[] | the array of flags representing the Primes resulting Trait usage | 

## **Functions**

- [isAvastarTeleporter](#isavastarteleporter)
- [approveTraitAccess](#approvetraitaccess)
- [useTraits](#usetraits)

### isAvastarTeleporter

Acknowledge contract is `AvastarTeleporter`

```solidity
function isAvastarTeleporter()
external pure
returns (bool)
```

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | bool | always true | 

### approveTraitAccess

Approve a handler to manage Trait replication for a set of Avastar Primes.
If successful, emits a `TraitAccessApproved` event.

```solidity
function approveTraitAccess(address _handler, uint256[] _primeIds)
external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _handler | address | the address approved for Trait access | 
| _primeIds | uint256[] | the token ids for which to approve the handler | 

### useTraits

Mark some or all of an Avastar Prime's traits used.
Caller must be the token owner OR the approved handler.
If successful, emits a `TraitsUsed` event.

```solidity
function useTraits(uint256 _primeId, bool[] _traitFlags)
external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _primeId | uint256 | the token id for the Prime whose Traits are to be used | 
| _traitFlags | bool[] | an array of no more than 32 booleans representing the Traits to be used | 

