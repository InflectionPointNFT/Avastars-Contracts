# AvastarTeleporter Interface

View Source: [contracts/IAvastarTeleporter.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/IAvastarTeleporter.sol)

**IAvastarTeleporter** **↗ Extends: [AvastarTypes](contracts/AvastarTypes.md)**

Declared as abstract contract rather than interface as it must inherit for enum types.
Used by AvastarMinter contract to interact with subset of AvastarTeleporter contract functions.

## **Functions**

- [isAvastarTeleporter](#isavastarteleporter)
- [tokenURI](#tokenuri)
- [getAvastarWaveByTokenId](#getavastarwavebytokenid)
- [getPrimeByTokenId](#getprimebytokenid)
- [getReplicantByTokenId](#getreplicantbytokenid)
- [getTraitInfoById](#gettraitinfobyid)
- [getTraitNameById](#gettraitnamebyid)
- [getTraitIdByGenerationGeneAndVariation](#gettraitidbygenerationgeneandvariation)
- [getCombinedAttributionByGeneration](#getcombinedattributionbygeneration)
- [mintPrime](#mintprime)
- [mintReplicant](#mintreplicant)
- [ownerOf](#ownerof)

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
|  | bool | always true if the contract is in fact `AvastarTeleporter` | 

### tokenURI

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

### getPrimeByTokenId

Get the Avastar Prime metadata associated with a given Token ID.

```solidity
function getPrimeByTokenId(uint256 _tokenId)
public view
returns (
	uint256 tokenId,
	uint256 serial,
	uint256 traits,
	enum AvastarTypes.Generation generation,
	enum AvastarTypes.Series series,
	enum AvastarTypes.Gender gender,
	uint8 ranking
)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the Token ID of the specified Prime | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | the Prime's token ID | 
| serial | uint256 | the Prime's serial | 
| traits | uint256 | the Prime's trait hash | 
| generation | enum AvastarTypes.Generation | the Prime's generation | 
| series | enum AvastarTypes.Series | the Prime's series | 
| gender | enum AvastarTypes.Gender | the Prime's gender | 
| ranking | uint8 | the Prime's ranking | 

### getReplicantByTokenId

Get the Avastar Replicant metadata associated with a given Token ID

```solidity
function getReplicantByTokenId(uint256 _tokenId)
public view
returns (
	uint256 tokenId,
	uint256 serial,
	uint256 traits,
	enum AvastarTypes.Generation generation,
	enum AvastarTypes.Gender gender,
	uint8 ranking
)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _tokenId | uint256 | the token ID of the specified Replicant | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | the Replicant's token ID | 
| serial | uint256 | the Replicant's serial | 
| traits | uint256 | the Replicant's trait hash | 
| generation | enum AvastarTypes.Generation | the Replicant's generation | 
| gender | enum AvastarTypes.Gender | the Replicant's gender | 
| ranking | uint8 | the Replicant's ranking | 

### getTraitInfoById

Retrieve a Trait's info by ID.

```solidity
function getTraitInfoById(uint256 _traitId)
external view
returns (
	uint256 id,
	enum AvastarTypes.Generation generation,
	enum AvastarTypes.Series[] series,
	enum AvastarTypes.Gender gender,
	enum AvastarTypes.Gene gene,
	enum AvastarTypes.Rarity rarity,
	uint8 variation,
	string name
)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _traitId | uint256 | the ID of the Trait to retrieve | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| id | uint256 | the ID of the trait | 
| generation | enum AvastarTypes.Generation | generation of the trait | 
| series | enum AvastarTypes.Series[] | list of series the trait may appear in | 
| gender | enum AvastarTypes.Gender | gender(s) the trait is valid for | 
| gene | enum AvastarTypes.Gene | ration generation of the trait | 
| rarity | enum AvastarTypes.Rarity | the rarity level of this trait | 
| variation | uint8 | variation of the gene the trait represents | 
| name | string | name of the trait | 

### getTraitNameById

Retrieve a Trait's name by ID.

```solidity
function getTraitNameById(uint256 _traitId)
external view
returns (string name)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _traitId | uint256 | the ID of the Trait to retrieve | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| name | string | name of the trait | 

### getTraitIdByGenerationGeneAndVariation

Get Trait ID by Generation, Gene, and Variation.

```solidity
function getTraitIdByGenerationGeneAndVariation(
	enum AvastarTypes.Generation _generation,
	enum AvastarTypes.Gene _gene,
	uint256 _variationSafe
)
external view
returns (uint256 traitId)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation | the generation the trait belongs to | 
| _gene | enum AvastarTypes.Gene | ration the generation the trait belongs to | 
| _variationSafe | uint256 | the variation of the gene | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| traitId | uint256 | the ID of the specified trait | 

### getCombinedAttributionByGeneration

Get the artist Attribution for a given Generation, combined into a single string.

```solidity
function getCombinedAttributionByGeneration(enum AvastarTypes.Generation _generation)
external view
returns (string combined)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation | the generation to retrieve artist attribution for | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| combined | string | attribution a single string with the artist and artist info URI | 

### mintPrime

Mint an Avastar Prime
Only invokable by minter role, when contract is not paused.
If successful, emits a `NewPrime` event.

```solidity
function mintPrime(
	address _owner,
	uint256 _traits,
	enum AvastarTypes.Generation _generation,
	enum AvastarTypes.Series _series,
	enum AvastarTypes.Gender _gender,
	uint8 _ranking
)
external nonpayable
returns (uint256, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | the address of the new Avastar's owner | 
| _traits | uint256 | the new Prime's trait hash | 
| _generation | enum AvastarTypes.Generation | the new Prime's generation | 
| _series | enum AvastarTypes.Series |  | 
| _gender | enum AvastarTypes.Gender | the new Prime's gender | 
| _ranking | uint8 | the new Prime's rarity ranking | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | uint256 | _series the new Prime's series | 
|  | uint256 | _series the new Prime's series | 

### mintReplicant

Mint an Avastar Replicant.
Only invokable by minter role, when contract is not paused.
If successful, emits a `NewReplicant` event.

```solidity
function mintReplicant(
	address _owner,
	uint256 _traits,
	enum AvastarTypes.Generation _generation,
	enum AvastarTypes.Gender _gender,
	uint8 _ranking
)
external nonpayable
returns (uint256, uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _owner | address | the address of the new Avastar's owner | 
| _traits | uint256 | the new Replicant's trait hash | 
| _generation | enum AvastarTypes.Generation | the new Replicant's generation | 
| _gender | enum AvastarTypes.Gender | the new Replicant's gender | 
| _ranking | uint8 | the new Replicant's rarity ranking | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | uint256 | tokenId the newly minted Replicant's token ID | 
|  | uint256 | tokenId the newly minted Replicant's token ID | 

### ownerOf

```solidity
function ownerOf(uint256 tokenId)
external view
returns (address owner)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | the token ID to search for the owner of | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address | the owner of the given token ID | 

