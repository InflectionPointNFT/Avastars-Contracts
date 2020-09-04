pragma solidity 0.5.14;

/**
 * @title Limited AvastarReplicantMinter Interface
 * @author Cliff Hall
 * Used by `AvastarReplicantToken` contract to interact with limited subset of `AvastarReplicantMinter` contract functions.
 */
interface IAvastarReplicantMinter {

    /**
     * @notice Acknowledge contract is `AvastarReplicantMinter`
     * @return always true
     */
    function isAvastarReplicantMinter()
    external
    pure
    returns (bool);

}