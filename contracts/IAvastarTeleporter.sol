pragma solidity ^0.5.12;

import "./AvastarTypes.sol";

/**
 * @title AvastarTeleporter Interface
 * @author Cliff Hall
 * @notice Declared as abstract contract rather than interface as it must inherit for enum types.
 * Used by AvastarMinter contract to interact with subset of AvastarTeleporter contract functions.
 */
contract IAvastarTeleporter is AvastarTypes {

    /**
     * @notice Acknowledge contract is `AvastarTeleporter`
     * @return always true if the contract is in fact `AvastarTeleporter`
     */
    function isAvastarTeleporter() external pure returns (bool);

    /**
     * @notice Get token URI for a given Avastar Token ID.
     * Reverts if given token id is not a valid Avastar Token ID.
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return uri the off-chain URI to the JSON metadata for the given Avastar
     */
    function tokenURI(uint _tokenId)
    external view
    returns (string memory uri);

    /**
     * @notice Get an Avastar's Wave by token ID.
     * @param _tokenId the token id of the given Avastar
     * @return wave the Avastar's wave (Prime/Replicant)
     */
    function getAvastarWaveByTokenId(uint256 _tokenId)
    external view
    returns (Wave wave);

    /**
     * @notice Get the Avastar Prime metadata associated with a given Token ID.
     * @param _tokenId the Token ID of the specified Prime
     * @return tokenId the Prime's token ID
     * @return serial the Prime's serial
     * @return traits the Prime's trait hash
     * @return replicated the Prime's trait replication indicators
     * @return generation the Prime's generation
     * @return series the Prime's series
     * @return gender the Prime's gender
     * @return ranking the Prime's ranking
     */
    function getPrimeByTokenId(uint256 _tokenId)
    public view
    returns (
        uint256 tokenId,
        uint256 serial,
        uint256 traits,
        bool[] memory replicated,
        Generation generation,
        Series series,
        Gender gender,
        uint8 ranking
    );

    /**
     * @notice Get the Avastar Replicant metadata associated with a given Token ID
     * @param _tokenId the token ID of the specified Replicant
     * @return tokenId the Replicant's token ID
     * @return serial the Replicant's serial
     * @return traits the Replicant's trait hash
     * @return generation the Replicant's generation
     * @return gender the Replicant's gender
     * @return ranking the Replicant's ranking
     */
    function getReplicantByTokenId(uint256 _tokenId)
    public view
    returns (
        uint256 tokenId,
        uint256 serial,
        uint256 traits,
        Generation generation,
        Gender gender,
        uint8 ranking
    );

    /**
     * @notice Retrieve a Trait's info by ID.
     * @param _traitId the ID of the Trait to retrieve
     * @return id the ID of the trait
     * @return generation generation of the trait
     * @return series list of series the trait may appear in
     * @return gender gender(s) the trait is valid for
     * @return gene gene the trait belongs to
     * @return variation variation of the gene the trait represents
     * @return rarity the rarity level of this trait
     * @return name name of the trait
     */
    function getTraitInfo(uint256 _traitId)
    external view
    returns (
        uint256 id,
        Generation generation,
        Series[] memory series,
        Gender gender,
        Gene gene,
        Rarity rarity,
        uint8 variation,
        string memory name
    );

    /**
     * @notice Mint an Avastar Prime
     * Only invokable by minter role, when contract is not paused.
     * If successful, emits a `NewPrime` event.
     * @param _owner the address of the new Avastar's owner
     * @param _traits the new Prime's trait hash
     * @param _generation the new Prime's generation
     * @return _series the new Prime's series
     * @param _gender the new Prime's gender
     * @param _ranking the new Prime's rarity ranking
     * @return tokenId the newly minted Prime's token ID
     * @return serial the newly minted Prime's serial
     */

    function mintPrime(
        address _owner,
        uint256 _traits,
        Generation _generation,
        Series _series,
        Gender _gender,
        uint8 _ranking
    )
    external
    returns (uint256, uint256);

    /**
     * @notice Mint an Avastar Replicant.
     * Only invokable by minter role, when contract is not paused.
     * If successful, emits a `NewReplicant` event.
     * @param _owner the address of the new Avastar's owner
     * @param _traits the new Replicant's trait hash
     * @param _generation the new Replicant's generation
     * @param _gender the new Replicant's gender
     * @param _ranking the new Replicant's rarity ranking
     * @return tokenId the newly minted Replicant's token ID
     * @return serial the newly minted Replicant's serial
     */
    function mintReplicant(
        address _owner,
        uint256 _traits,
        Generation _generation,
        Gender _gender,
        uint8 _ranking
    )
    external
    returns (uint256, uint256);

    /**
     * Gets the owner of the specified token ID.
     * @param tokenId the token ID to search for the owner of
     * @return owner the owner of the given token ID
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);


}