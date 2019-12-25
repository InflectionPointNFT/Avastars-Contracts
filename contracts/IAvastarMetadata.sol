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
     * @notice Get view URI for a given Avastar Token ID.
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return uri the off-chain URI to view the Avastar on the Avastars website
     */
    function viewURI(uint _tokenId)
    external view
    returns (string memory uri);

    /**
     * @notice Get media URI for a given Avastar Token ID.
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return uri the off-chain URI to the Avastar image
     */
    function mediaURI(uint _tokenId)
    external view
    returns (string memory uri);

    /**
     * @notice Get token URI for a given Avastar Token ID.
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return uri the Avastar's off-chain JSON metadata URI
     */
    function tokenURI(uint _tokenId)
    external view
    returns (string memory uri);

    /**
     * @notice Get human-readable metadata for a given Avastar by Token ID.
     * @param _tokenId the token id of the given Avastar
     * @return metadata the Avastar's human-readable metadata
     */
    function getAvastarMetadata(uint256 _tokenId) external view returns (string memory metadata);

}
