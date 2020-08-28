pragma solidity 0.5.14;

import "./AvastarTypes.sol";

/**
 * @title Limited AvastarTeleporter Interface
 * @author Cliff Hall
 * @notice Declared as abstract contract rather than interface as it must inherit for enum types.
 * Used by `AvastarReplicantToken` contract to interact with limited subset of `AvastarTeleporter` contract functions.
 */
contract IAvastarTeleporterThin is AvastarTypes {

    /**
     * @notice Acknowledge contract is `AvastarTeleporter`
     * @return always true if the contract is in fact `AvastarTeleporter`
     */
    function isAvastarTeleporter()
    external
    pure
    returns (bool);

    /**
     * @notice IERC721Enumerable - Gets the owner of the specified token ID.
     * @param tokenId the token ID to search for the owner of
     * @return owner the owner of the given token ID
     */
    function tokenOfOwnerByIndex(address owner, uint256 index)
    public
    view
    returns (uint256 tokenId);

    /**
     * @notice Get an Avastar's Wave by token ID.
     * @param _tokenId the token id of the given Avastar
     * @return wave the Avastar's wave (Prime/Replicant)
     */
    function getAvastarWaveByTokenId(uint256 _tokenId)
    external view
    returns (Wave wave);

    /**
     * @notice Gets the owner of the specified token ID.
     * @param tokenId the token ID to search for the owner of
     * @return owner the owner of the given token ID
     */
    function ownerOf(uint256 tokenId)
    external
    view
    returns (address owner);

    /**
     * @notice IERC721 - Gets the total amount of tokens stored by the contract.
     * @return count total number of tokens
     */
    function totalSupply()
    public
    view
    returns (uint256 count);
}