pragma solidity 0.5.14;

/**
 * @title Identification interface for Avastar Metadata generator contract
 * @author Cliff Hall
 * @notice Used by `AvastarTeleporter` contract to validate the address of the contract.
 */
interface IAvastarMetadata {

    /**
     * @notice Acknowledge contract is `AvastarMetadata`
     * @return always true
     */
    function isAvastarMetadata() external pure returns (bool);

    /**
     * @notice Get token URI for a given Avastar Token ID.
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return uri the Avastar's off-chain JSON metadata URI
     */
    function tokenURI(uint _tokenId)
    external view
    returns (string memory uri);
}
