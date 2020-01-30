pragma solidity 0.5.14;

import "./TraitFactory.sol";

/**
 * @title Avastar Token Factory
 * @author Cliff Hall
 */
contract AvastarFactory is TraitFactory {

    /**
     * @notice Mint an Avastar.
     * Only invokable by descendant contracts when contract is not paused.
     * Adds new `Avastar` to `avastars` array.
     * Doesn't emit an event, the calling method does (`NewPrime` or `NewReplicant`).
     * Sets `isHashUsedByGeneration` mapping to true for `avastar.generation` and `avastar.traits`.
     * Sets `tokenIdByGenerationAndHash` mapping to `avastar.id` for `avastar.generation` and `avastar.traits`.
     * Sets `tokenIdByGenerationWaveAndSerial` mapping to `avastar.id` for `avastar.generation`, `avastar.wave`, and `avastar.serial`.
     * @param _owner the address of the new Avastar's owner
     * @param _serial the new Avastar's Prime or Replicant serial number
     * @param _traits the new Avastar's trait hash
     * @param _generation the new Avastar's generation
     * @param _wave the new Avastar's wave (Prime/Replicant)
     * @return tokenId the newly minted Prime's token ID
     */
    function mintAvastar(
        address _owner,
        uint256 _serial,
        uint256 _traits,
        Generation _generation,
        Wave _wave
    )
    internal whenNotPaused
    returns (uint256 tokenId)
    {
        // Mapped Token Id for given generation and serial should always be 0 (uninitialized)
        require(tokenIdByGenerationWaveAndSerial[uint8(_generation)][uint8(_wave)][uint256(_serial)] == 0);

        // Serial should always be the current length of the primes or replicants array for the given generation
        if (_wave == Wave.PRIME){
            require(_serial == primesByGeneration[uint8(_generation)].length);
        } else {
            require(_serial == replicantsByGeneration[uint8(_generation)].length);
        }

        // Get Token ID
        tokenId = avastars.length;

        // Create and store Avastar token
        Avastar memory avastar = Avastar(tokenId, _serial, _traits, _generation, _wave);

        // Store the avastar
        avastars.push(avastar);

        // Indicate use of Trait Hash within given generation
        isHashUsedByGeneration[uint8(avastar.generation)][avastar.traits] = true;

        // Store token ID by Generation and Trait Hash
        tokenIdByGenerationAndHash[uint8(avastar.generation)][avastar.traits] = avastar.id;

        // Create generation/wave/serial to tokenId mapping
        tokenIdByGenerationWaveAndSerial[uint8(avastar.generation)][uint8(avastar.wave)][uint256(avastar.serial)] = avastar.id;

        // Mint the token
        super._mint(_owner, tokenId);
    }

    /**
     * @notice Get an Avastar's Wave by token ID.
     * @param _tokenId the token id of the given Avastar
     * @return wave the Avastar's wave (Prime/Replicant)
     */
    function getAvastarWaveByTokenId(uint256 _tokenId)
    external view
    returns (Wave wave)
    {
        require(_tokenId < avastars.length);
        wave = avastars[_tokenId].wave;
    }

    /**
     * @notice Render the Avastar Prime or Replicant from the original on-chain art.
     * @param _tokenId the token ID of the Prime or Replicant
     * @return svg the fully rendered SVG representation of the Avastar
     */
    function renderAvastar(uint256 _tokenId)
    external view
    returns (string memory svg)
    {
        require(_tokenId < avastars.length);
        Avastar memory avastar = avastars[_tokenId];
        uint256 traits = (avastar.wave == Wave.PRIME)
        ? primesByGeneration[uint8(avastar.generation)][uint256(avastar.serial)].traits
        : replicantsByGeneration[uint8(avastar.generation)][uint256(avastar.serial)].traits;
        svg = assembleArtwork(avastar.generation, traits);
    }
}