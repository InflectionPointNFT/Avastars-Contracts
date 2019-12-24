# AvastarTeleporter

View Source: [contracts/AvastarTeleporter.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AvastarTeleporter.sol)

**AvastarTeleporter** **↗ Extends: [ReplicantFactory](contracts/ReplicantFactory.md)**

Management of Avastar Primes, Replicants, and Traits

## Contract Members
**Constants & Variables**

```solidity
// private members
contract IAvastarMetadata private metadataContract;

```

## **Events**

- [TraitAccessApproved](#traitaccessapproved)
- [TraitsUsed](#traitsused)
- [TokenUriBaseSet](#tokenuribaseset)
- [MetadataContractSet](#metadatacontractset)

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

### TokenUriBaseSet

Event emitted when TokenURI base changes

```solidity
event TokenUriBaseSet(string tokenUriBase)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenUriBase | string | the base URI for tokenURI calls | 

### MetadataContractSet

Event emitted when AvastarMetadata contract is set

```solidity
event MetadataContractSet(address contractAddress)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| contractAddress | address | the address of the AvastarMetadata contract | 

## **Functions**

- [isAvastarTeleporter](#isavastarteleporter)
- [setMetadataContract](#setmetadatacontract)
- [setTokenUriBase](#settokenuribase)
- [getAvastarMetadata](#getavastarmetadata)
- [getAvastarWaveByTokenId](#getavastarwavebytokenid)
- [approveTraitAccess](#approvetraitaccess)
- [useTraits](#usetraits)
- [renderAvastar](#renderavastar)
- [tokenURI](#tokenuri)

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

### setMetadataContract

Set the address of the `AvastarMetadata` contract.
Only invokable by system admin role, when contract is paused and not upgraded.
If successful, emits an `TeleporterContractSet` event.

```solidity
function setMetadataContract(address _address)
external nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _address | address | address of AvastarTeleporter contract | 

### setTokenUriBase

Set the base URI for creating `tokenURI` for each Avastar.
Only invokable by system admin role, when contract is paused and not upgraded.
If successful, emits an `TokenUriBaseSet` event.

```solidity
function setTokenUriBase(string _tokenUriBase)
external nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenUriBase | string | base for the tokenURI | 

### getAvastarMetadata

Get human-readable metadata for a given Avastar by Token ID.

```solidity
function getAvastarMetadata(uint256 _tokenId)
public view
returns (string metadata)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the token id of the given Avastar | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| metadata | string | the Avastar's human-readable metadata | 

### getAvastarWaveByTokenId

Get an Avastar's Wave by token ID.

```solidity
function getAvastarWaveByTokenId(uint256 _tokenId)
external view
returns (enum AvastarTypes.Wave wave)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the token id of the given Avastar | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| wave | enum AvastarTypes.Wave | the Avastar's wave (Prime/Replicant) | 

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

### renderAvastar

Render the Avastar Prime or Replicant from the original on-chain art.

```solidity
function renderAvastar(uint256 _tokenId)
external view
returns (string svg)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the token ID of the Prime or Replicant | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| svg | string | the fully rendered SVG representation of the Avastar | 

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
| uri | string | the off-chain URI to the JSON metadata for the given Avastar | 

