# Counters

View Source: [@openzeppelin/contracts/drafts/Counters.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/@openzeppelin/contracts/drafts/Counters.sol)

**Counters** 

Provides counters that can only be incremented or decremented by one. This can be used e.g. to track the number
of elements in a mapping, issuing ERC721 ids, or counting request ids.
 * Include with `using Counters for Counters.Counter;`
Since it is not possible to overflow a 256 bit integer with increments of one, `increment` can skip the {SafeMath}
overflow check, thereby saving gas. This does assume however correct usage, in that the underlying `_value` is never
directly accessed.

## Structs
### Counter

```solidity
struct Counter {
 uint256 _value
}
```

## **Functions**

- [current](#current)
- [increment](#increment)
- [decrement](#decrement)

### current

```solidity
function current(struct Counters.Counter counter) internal view
returns(uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| counter | struct Counters.Counter |  | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | uint256 |  | 

### increment

```solidity
function increment(struct Counters.Counter counter) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| counter | struct Counters.Counter |  | 

### decrement

```solidity
function decrement(struct Counters.Counter counter) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| counter | struct Counters.Counter |  | 

