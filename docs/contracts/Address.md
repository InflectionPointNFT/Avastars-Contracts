# Address.sol

View Source: [@openzeppelin/contracts/utils/Address.sol](https://github.com/Dapp-Wizards/Avastars-Contracts/blob/master/@openzeppelin/contracts/utils/Address.sol)

**Address** 

Collection of functions related to the address type

## **Functions**

- [isContract](#iscontract)
- [toPayable](#topayable)
- [sendValue](#sendvalue)

### isContract

Returns true if `account` is a contract.
     * This test is non-exhaustive, and there may be false-negatives: during the
execution of a contract's constructor, its address will be reported as
not containing a contract.
     * IMPORTANT: It is unsafe to assume that an address for which this
function returns false is an externally-owned account (EOA) and not a
contract.

```solidity
function isContract(address account)
internal view
returns (bool)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | bool |  | 

### toPayable

Converts an `address` into `address payable`. Note that this is
simply a type cast: the actual underlying value is not changed.
     * _Available since v2.4.0._

```solidity
function toPayable(address account)
internal pure
returns (address payable)
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| account | address |  | 

**Returns**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
|  | address payable |  | 

### sendValue

Replacement for Solidity's `transfer`: sends `amount` wei to
`recipient`, forwarding all available gas and reverting on errors.
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
of certain opcodes, possibly making contracts go over the 2300 gas limit
imposed by `transfer`, making them unable to receive funds via
`transfer`. {sendValue} removes this limitation.
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     * IMPORTANT: because control is transferred to `recipient`, care must be
taken to not create reentrancy vulnerabilities. Consider using
{ReentrancyGuard} or the
https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     * _Available since v2.4.0._

```solidity
function sendValue(address payable recipient, uint256 amount)
internal nonpayable
```

**Arguments**

| Name        | Type           | Description  |
| ------------- |------------- | -----|
| recipient | address payable |  | 
| amount | uint256 |  | 

