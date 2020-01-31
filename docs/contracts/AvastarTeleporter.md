# AvastarTeleporter

View Source: [contracts/AvastarTeleporter.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AvastarTeleporter.sol)

**AvastarTeleporter** **↗ Extends: [ReplicantFactory](contracts/ReplicantFactory.md)**

Management of Avastar Primes, Replicants, and Traits

## Contract Members
**Constants & Variables**

```solidity
// private members
address private metadataContractAddress;

```

## **Events**

- [TraitAccessApproved](#traitaccessapproved)
- [TraitsUsed](#traitsused)
- [MetadataContractAddressSet](#metadatacontractaddressset)

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
	bool[12] used
)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| handler | address | the address marking the Traits as used | 
| primeId | uint256 | the token id of the Prime supplying the Traits | 
| used | bool[12] | the array of flags representing the Primes resulting Trait usage | 

### MetadataContractAddressSet

Event emitted when AvastarMetadata contract address is set

```solidity
event MetadataContractAddressSet(address contractAddress)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| contractAddress | address | the address of the new AvastarMetadata contract | 

## **Functions**

- [isAvastarTeleporter](#isavastarteleporter)
- [setMetadataContractAddress](#setmetadatacontractaddress)
- [getMetadataContractAddress](#getmetadatacontractaddress)
- [tokenURI](#tokenuri)
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

### setMetadataContractAddress

Set the address of the `AvastarMetadata` contract.
Only invokable by system admin role, when contract is paused and not upgraded.
If successful, emits an `MetadataContractAddressSet` event.

```solidity
function setMetadataContractAddress(address _address)
external nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _address | address | address of AvastarTeleporter contract | 

### getMetadataContractAddress

Get the current address of the `AvastarMetadata` contract.
return contractAddress the address of the `AvastarMetadata` contract

```solidity
function getMetadataContractAddress()
external view
returns (address contractAddress)
```

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| contractAddress | address |  | 

### tokenURI

⤾ overrides [ERC721Metadata.tokenURI](contracts/ERC721Metadata.md#tokenuri)

Get token URI for a given Avastar Token ID.
Reverts if given token id is not a valid Avastar Token ID.

```solidity
function tokenURI(uint256 _tokenId)
external view
returns (string uri)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the Token ID of a previously minted Avastar Prime or Replicant | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| uri | string | the Avastar's off-chain JSON metadata URI | 

### approveTraitAccess

Approve a handler to manage Trait replication for a set of Avastar Primes.
Accepts up to 256 primes for approval per call.
Reverts if caller is not owner of all Primes specified.
Reverts if no Primes are specified.
Reverts if given handler already has approval for all Primes specified.
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
Caller must send all 12 flags with those to be used set to true, the rest to false.
The position of each flag in the `_traitFlags` array corresponds to a Gene, of which Traits are variations.
The flag order is: [ SKIN_TONE, HAIR_COLOR, EYE_COLOR, BG_COLOR, BACKDROP, EARS, FACE, NOSE, MOUTH, FACIAL_FEATURE, EYES, HAIR_STYLE ].
Reverts if no usable traits are indicated.
If successful, emits a `TraitsUsed` event.

```solidity
function useTraits(uint256 _primeId, bool[12] _traitFlags)
external nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _primeId | uint256 | the token id for the Prime whose Traits are to be used | 
| _traitFlags | bool[12] | an array of no more than 12 booleans representing the Traits to be used | 

