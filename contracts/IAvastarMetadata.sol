pragma solidity ^0.5.12;

/**
 * @title Interface for Avastar Metadata Generator contract
 * @author Cliff Hall
 * @notice Generates Avastar metadata from on-chain data.
 * Used by `AvastarTeleporter` contract to generate metdata in an upgradable way.
 */
interface IAvastarMetadata {

    /**
     * @notice Acknowledge contract is `AvastarMetadata`
     * @return always true
     */
    function isAvastarMetadata() external pure returns (bool);

    /**
     * @notice Get human-readable metadata for a given Avastar by Token ID.
     * @param _tokenId the token id of the given Avastar
     * @return metadata the Avastar's human-readable metadata
     */
    function getAvastarMetadata(uint256 _tokenId) external view returns (string memory metadata);

}
