# Avastar Data Types (AvastarTypes.sol)

View Source: [contracts/AvastarTypes.sol](../contracts/AvastarTypes.sol)

**↘ Derived Contracts: [AvastarMinter](AvastarMinter.md), [AvastarState](AvastarState.md), [IAvastarTeleporter](IAvastarTeleporter.md)**

**AvastarTypes**

**Enums**
### Generation

```js
enum Generation {
 ONE,
 TWO,
 THREE,
 FOUR,
 FIVE
}
```

### Series

```js
enum Series {
 ONE,
 TWO,
 THREE,
 FOUR,
 FIVE
}
```

### Wave

```js
enum Wave {
 PRIME,
 REPLICANT
}
```

### Gene

```js
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

```js
enum Gender {
 ANY,
 MALE,
 FEMALE
}
```

## Structs
### Trait

```js
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

```js
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

```js
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

```js
struct Avastar {
 uint256 id,
 uint256 serial,
 uint256 traits,
 enum AvastarTypes.Generation generation,
 enum AvastarTypes.Wave wave
}
```

## Functions

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
