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
    function isAvastarReplicantToken() external pure returns (bool);



}