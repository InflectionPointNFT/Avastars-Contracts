# Roles

View Source: [@openzeppelin/contracts/access/Roles.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/@openzeppelin/contracts/access/Roles.sol)

**Roles**

Library for managing addresses assigned to a Role.

## Structs
### Role

```solidity
struct Role {
 mapping(address => bool) bearer
}
```

## Functions

- [add](#add)
- [remove](#remove)
- [has](#has)

### add

Give an account access to this role.

```solidity
function add(struct Roles.Role role, address account) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| account | address |  | 

### remove

Remove an account's access to this role.

```solidity
function remove(struct Roles.Role role, address account) internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| role | struct Roles.Role |  | 
| account | address |  | 

### has

Check if an account has this role.

```solidity
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

