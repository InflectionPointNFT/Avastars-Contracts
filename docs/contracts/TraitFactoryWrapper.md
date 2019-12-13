# TraitFactory Wrapper

View Source: [contracts/TraitFactoryWrapper.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/TraitFactoryWrapper.sol)

**TraitFactoryWrapper** **↗ Extends: [TraitFactory](contracts/TraitFactory.md)**

Side contract (not deployed or inherited) that extends
`TraitFactory` and exposes methods for testing its internal functions.

## **Functions**

- [_assembleArtwork](#_assembleartwork)

### _assembleArtwork

Passthrough function for testing `TraitFactory.assembleArtwork`.

```solidity
function _assembleArtwork(enum AvastarTypes.Generation _generation, uint256 _traitHash)
public view
returns (string svg)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| _generation | enum AvastarTypes.Generation | the generation the Avastar belongs to | 
| _traitHash | uint256 | the Avastar's trait hash | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| svg | string | the fully rendered SVG for the Avastar | 

