# IERC20.sol

View Source: [@openzeppelin/contracts/token/ERC20/IERC20.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/@openzeppelin/contracts/token/ERC20/IERC20.sol)

**IERC20** 
**↘ Derived Contracts: [ERC20](contracts/ERC20.md)**

Interface of the ERC20 standard as defined in the EIP. Does not include
the optional functions; to access them see {ERC20Detailed}.

## **Events**

- [Transfer](#transfer)
- [Approval](#approval)

### Transfer

Emitted when `value` tokens are moved from one account (`from`) to
another (`to`).
     * Note that `value` may be zero.

```solidity
event Transfer(
	address indexed from,
	address indexed to,
	uint256 value
)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| from | address |  | 
| to | address |  | 
| value | uint256 |  | 

### Approval

Emitted when the allowance of a `spender` for an `owner` is set by
a call to {approve}. `value` is the new allowance.

```solidity
event Approval(
	address indexed owner,
	address indexed spender,
	uint256 value
)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 
| spender | address |  | 
| value | uint256 |  | 

## **Functions**

- [totalSupply](#totalsupply)
- [balanceOf](#balanceof)
- [transfer](#transfer)
- [allowance](#allowance)
- [approve](#approve)
- [transferFrom](#transferfrom)

### totalSupply

⤿ Overridden Implementation(s): [ERC20.totalSupply](contracts/ERC20.md#totalsupply)

Returns the amount of tokens in existence.

```solidity
function totalSupply()
external view
returns (uint256)
```

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | uint256 |  | 

### balanceOf

⤿ Overridden Implementation(s): [ERC20.balanceOf](contracts/ERC20.md#balanceof)

Returns the amount of tokens owned by `account`.

```solidity
function balanceOf(address account)
external view
returns (uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | uint256 |  | 

### transfer

⤿ Overridden Implementation(s): [ERC20.transfer](contracts/ERC20.md#transfer)

Moves `amount` tokens from the caller's account to `recipient`.
     * Returns a boolean value indicating whether the operation succeeded.
     * Emits a {Transfer} event.

```solidity
function transfer(address recipient, uint256 amount)
external nonpayable
returns (bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| recipient | address |  | 
| amount | uint256 |  | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | bool |  | 

### allowance

⤿ Overridden Implementation(s): [ERC20.allowance](contracts/ERC20.md#allowance)

Returns the remaining number of tokens that `spender` will be
allowed to spend on behalf of `owner` through {transferFrom}. This is
zero by default.
     * This value changes when {approve} or {transferFrom} are called.

```solidity
function allowance(address owner, address spender)
external view
returns (uint256)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| owner | address |  | 
| spender | address |  | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | uint256 |  | 

### approve

⤿ Overridden Implementation(s): [ERC20.approve](contracts/ERC20.md#approve)

Sets `amount` as the allowance of `spender` over the caller's tokens.
     * Returns a boolean value indicating whether the operation succeeded.
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
that someone may use both the old and the new allowance by unfortunate
transaction ordering. One possible solution to mitigate this race
condition is to first reduce the spender's allowance to 0 and set the
desired value afterwards:
https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     * Emits an {Approval} event.

```solidity
function approve(address spender, uint256 amount)
external nonpayable
returns (bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| spender | address |  | 
| amount | uint256 |  | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | bool |  | 

### transferFrom

⤿ Overridden Implementation(s): [ERC20.transferFrom](contracts/ERC20.md#transferfrom)

Moves `amount` tokens from `sender` to `recipient` using the
allowance mechanism. `amount` is then deducted from the caller's
allowance.
     * Returns a boolean value indicating whether the operation succeeded.
     * Emits a {Transfer} event.

```solidity
function transferFrom(
	address sender,
	address recipient,
	uint256 amount
)
external nonpayable
returns (bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| sender | address |  | 
| recipient | address |  | 
| amount | uint256 |  | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | bool |  | 

