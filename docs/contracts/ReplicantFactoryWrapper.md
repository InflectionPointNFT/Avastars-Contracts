# ReplicantFactoryWrapper Wrapper

View Source: [contracts/ReplicantFactoryWrapper.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/ReplicantFactoryWrapper.sol)

**ReplicantFactoryWrapper** **↗ Extends: [ReplicantFactory](contracts/ReplicantFactory.md)**

Side contract (not deployed or inherited) that extends
`ReplicantFactory` and exposes methods for testing minting caps.

## **Functions**

- [setPrimeCount](#setprimecount)
- [setReplicantCount](#setreplicantcount)

### setPrimeCount

```solidity
function setPrimeCount(
	enum AvastarTypes.Generation _generation,
	enum AvastarTypes.Series _series,
	uint16 _count
)
external nonpayable onlySysAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation |  | 
| _series | enum AvastarTypes.Series |  | 
| _count | uint16 |  | 

### setReplicantCount

```solidity
function setReplicantCount(enum AvastarTypes.Generation _generation, uint16 _count)
external nonpayable onlySysAdmin 
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation |  | 
| _count | uint16 |  | 

