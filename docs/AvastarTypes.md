# Avastar Data Types

View Source: [contracts/AvastarTypes.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/contracts/AvastarTypes.sol)

**↘ Derived Contracts: [AvastarMinter](AvastarMinter.md), [AvastarState](AvastarState.md), [IAvastarTeleporter](IAvastarTeleporter.md)**

**AvastarTypes**

## **Enums**
### Generation

```solidity
enum Generation {
 ONE,
 TWO,
 THREE,
 FOUR,
 FIVE
}
```

### Series

```solidity
enum Series {
 ONE,
 TWO,
 THREE,
 FOUR,
 FIVE
}
```

### Wave

```solidity
enum Wave {
 PRIME,
 REPLICANT
}
```

### Gene

```solidity
enum Gene {
 BACKGROUND,
 SKIN_TONE,
 HAIR_COLOR,
 EYE_COLOR,
 EARS,
 FACE,
 NOSE,
 MOUTH,
 FACIAL_FEATURE,
 EYES,
 HAIR_STYLE
}
```

### Gender

```solidity
enum Gender {
 ANY,
 MALE,
 FEMALE
}
```

## Structs
### Trait

```solidity
struct Trait {
 uint256 id,
 enum AvastarTypes.Generation generation,
 enum AvastarTypes.Series[] series,
 enum AvastarTypes.Gender gender,
 enum AvastarTypes.Gene gene,
 uint8 variation,
 string name,
 string svg
}
```

### Prime

```solidity
struct Prime {
 uint256 id,
 uint256 serial,
 uint256 traits,
 bool[] replicated,
 enum AvastarTypes.Generation generation,
 enum AvastarTypes.Series series,
 enum AvastarTypes.Gender gender,
 uint8 ranking
}
```

### Replicant

```solidity
struct Replicant {
 uint256 id,
 uint256 serial,
 uint256 traits,
 enum AvastarTypes.Generation generation,
 enum AvastarTypes.Gender gender,
 uint8 ranking
}
```

### Avastar

```solidity
struct Avastar {
 uint256 id,
 uint256 serial,
 uint256 traits,
 enum AvastarTypes.Generation generation,
 enum AvastarTypes.Wave wave
}
```

## Functions

