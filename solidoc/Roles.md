# Roles (Roles.sol)

View Source: [@openzeppelin/contracts/access/Roles.sol](../@openzeppelin/contracts/access/Roles.sol)

**Roles**

Library for managing addresses assigned to a Role.

## Structs
### Role

```js
struct Role {
 mapping(address => bool) bearer
}
```

## Functions

- [add(struct Roles.Role role, address account)](#add)
- [remove(struct Roles.Role role, address account)](#remove)
- [has(struct Roles.Role role, address account)](#has)

### add

Give an account access to this role.

```js
function add(struct Roles.Role role, address account) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| account | address |  | 

### remove

Remove an account's access to this role.

```js
function remove(struct Roles.Role role, address account) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| account | address |  | 

### has

Check if an account has this role.

```js
function has(struct Roles.Role role, address account) internal view
returns(bool)
```

**Returns**

bool

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| account | address |  | 

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
