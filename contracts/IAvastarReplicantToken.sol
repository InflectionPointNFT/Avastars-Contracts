pragma solidity 0.5.14;

/**
 * @title AvastarReplicantToken Interface
 * @author Nate Hart & Cliff Hall
 * @notice Declared as abstract contract rather than interface as it must inherit for enum types.
 * Used by AvastarReplicantMinter contract to interact with subset of AvastarReplicantToken contract functions.
 */
contract IAvastarReplicantToken {

    /**
     * @notice Acknowledge contract is `AvastarReplicantToken`
     * @return always true if the contract is in fact `AvastarReplicantToken`
     */
    function isAvastarReplicantToken()
    external
    pure
    returns (bool);

    /**
     * @notice Burn a given amount of the holder's ART tokens
     * The caller must have an allowance of the holder's tokens equal to or greater than amount to burn
     */
    function burnArt(address _holder, uint256 _amount) external;

    /**
     * @dev See {IERC20-balanceOf}.
     * @notice Check the given account's token balance
     * @return the amount of tokens owned by account.
     */
    function balanceOf(address account)
    external
    view
    returns (uint256);

    /**
     * @dev See {IERC20-allowance}.
     * @notice Check the amount the spender is controls of the owner's token balance
     * @return the remaining number of tokens that spender will be allowed to spend on behalf of owner through transferFrom
     */
    function allowance(address owner, address spender)
    external
    view
    returns (uint256);

}