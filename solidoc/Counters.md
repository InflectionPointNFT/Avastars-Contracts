# Counters (Counters.sol)

View Source: [@openzeppelin/contracts/drafts/Counters.sol](../@openzeppelin/contracts/drafts/Counters.sol)

**Counters**

Provides counters that can only be incremented or decremented by one. This can be used e.g. to track the number
of elements in a mapping, issuing ERC721 ids, or counting request ids.
 * Include with `using Counters for Counters.Counter;`
Since it is not possible to overflow a 256 bit integer with increments of one, `increment` can skip the {SafeMath}
overflow check, thereby saving gas. This does assume however correct usage, in that the underlying `_value` is never
directly accessed.

## Structs
### Counter

```js
struct Counter {
 uint256 _value
}
```

## Functions

- [current(struct Counters.Counter counter)](#current)
- [increment(struct Counters.Counter counter)](#increment)
- [decrement(struct Counters.Counter counter)](#decrement)

### current

```js
function current(struct Counters.Counter counter) internal view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| counter | struct Counters.Counter |  | 

### increment

```js
function increment(struct Counters.Counter counter) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| counter | struct Counters.Counter |  | 

### decrement

```js
function decrement(struct Counters.Counter counter) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| counter | struct Counters.Counter |  | 

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
