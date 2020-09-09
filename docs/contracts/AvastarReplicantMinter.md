# Avastar Replicant Minter Proxy

View Source: [contracts/AvastarReplicantMinter.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AvastarReplicantMinter.sol)

**AvastarReplicantMinter** **↗ Extends: [ERC20](contracts/ERC20.md), [AvastarTypes](contracts/AvastarTypes.md), [AccessControl](contracts/AccessControl.md)**

Mints Avastar Replicants using the `AvastarTeleporter` contract on behalf of purchasers.
Also implements the Avastar Replicant Token (ART) for purchasing Replicants

## Contract Members
**Constants & Variables**

```solidity
// private members
contract IAvastarTeleporterThin private teleporterContract;
mapping(uint256 => bool) private artClaimed;
uint256 private constant scaleFactor;

// public members
uint8 public constant decimals;
string public constant name;
string public constant symbol;
uint256 public constant ART_HARD_CAP;

```

## **Events**

- [TeleporterContractSet](#teleportercontractset)
- [ARTMinted](#artminted)
- [ARTBurned](#artburned)

### TeleporterContractSet

Event emitted when `AvastarTeleporter` contract is set

```solidity
event TeleporterContractSet(address contractAddress)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| contractAddress | address | the address of the `AvastarTeleporter` contract | 

### ARTMinted

Event emitted when an amount of ART tokens are minted for a holder

```solidity
event ARTMinted(address indexed holder, uint256 amount)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| holder | address | the address of the holder of the new ART | 
| amount | uint256 | the number of ART tokens minted for the holder | 

### ARTBurned

Event emitted when an amount of a holder's ART tokens are burned

```solidity
event ARTBurned(address indexed holder, uint256 amount)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| holder | address | the address of the holder of the new ART | 
| amount | uint256 | the number of the holder's ART tokens burned | 

## **Functions**

- [setTeleporterContract](#setteleportercontract)
- [getCirculatingArt](#getcirculatingart)
- [claimArtBulk](#claimartbulk)
- [claimArt](#claimart)
- [burnArt](#burnart)
- [purchaseReplicant](#purchasereplicant)

### setTeleporterContract

Set the address of the `AvastarTeleporter` contract.
Only invokable by system admin role, when contract is paused and not upgraded.
To be used if the Teleporter contract has to be upgraded and a new instance deployed.
If successful, emits an `TeleporterContractSet` event.

```solidity
function setTeleporterContract(address _address)
external nonpayable onlySysAdmin whenPaused whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _address | address | address of `AvastarTeleporter` contract | 

### getCirculatingArt

Check the current circulation of ART tokens

```solidity
function getCirculatingArt()
public view
returns (uint256 circulatingArt)
```

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| circulatingArt | uint256 | Number of tokens currently minted | 

### claimArtBulk

Claim and mint ART tokens for an array of Prime IDs
If successful, emits an ARTMinted event

```solidity
function claimArtBulk(address _holder, uint256[] _primeIds)
public nonpayable onlySysAdmin whenNotUpgraded 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _holder | address | address of holder to claim ART for | 
| _primeIds | uint256[] | an array of Avastar Prime IDs owned by the holder | 

### claimArt

Claim and mint a single ART token
If successful, emits an `ARTMinted` event

```solidity
function claimArt(address _holder, uint256 _primeId)
public nonpayable onlyMinter 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _holder | address | address of holder to claim ART for | 
| _primeId | uint256 | ID of an Avastar Prime owned by the holder | 

### burnArt

Burn one of the holder's ART tokens
If successful, emits an ARTBurned event

```solidity
function burnArt(address _holder)
internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _holder | address | address of holder to burn ART for | 

### purchaseReplicant

Mint an Avastar Replicant for a purchaser who has previously deposited funds.
Invokable only by minter role, when contract is not paused.
Minted token will be owned by `_purchaser` address.
If successful, the `AvastarRepicantToken` contract will emit a `ARTBurned` event,
and the `AvastarTeleporter` contract will emit a `NewReplicant` event.

```solidity
function purchaseReplicant(
	address _purchaser,
	uint256 _traits,
	enum AvastarTypes.Generation _generation,
	enum AvastarTypes.Gender _gender,
	uint8 _ranking
)
external nonpayable onlyMinter whenNotPaused 
returns (uint256 tokenId, uint256 serial)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _purchaser | address | address that will own the token | 
| _traits | uint256 | the Avastar's Trait hash | 
| _generation | enum AvastarTypes.Generation | the Avastar's Generation | 
| _gender | enum AvastarTypes.Gender | the Avastar's Gender | 
| _ranking | uint8 | the Avastar's Ranking | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| tokenId | uint256 | the Avastar's tokenId | 
| serial | uint256 | the Avastar's serial | 

