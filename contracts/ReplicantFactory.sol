pragma solidity ^0.5.12;

import "./PrimeFactory.sol";

/**
 * @title Avastar Replicant Factory
 * @author Cliff Hall
 */
contract ReplicantFactory is PrimeFactory {

    /**
     * @notice emitted upon the creation of an Avastar Replicant
     */
    event NewReplicant(uint256 id, uint256 serial, Generation generation, Gender gender, uint256 traits);

    /**
     * @notice Get the Avastar Replicant metadata associated with a given Generation and Serial
     * @param _generation the generation of the specified Replicant
     * @param _serial the serial of the specified Replicant
     * @return tokenId the Replicant's token ID
     * @return serial the Replicant's serial
     * @return traits the Replicant's trait hash
     * @return generation the Replicant's generation
     * @return gender the Replicant's gender
     * @return ranking the Replicant's ranking
     */
    function getReplicantByGenerationAndSerial(Generation _generation, uint256 _serial)
    external view
    returns (
        uint256 tokenId,
        uint256 serial,
        uint256 traits,
        Generation generation,
        Gender gender,
        uint8 ranking
    ) {
        require(_serial < replicantsByGeneration[uint8(_generation)].length);
        Replicant memory replicant = replicantsByGeneration[uint8(_generation)][uint256(_serial)];
        return (
            replicant.id,
            replicant.serial,
            replicant.traits,
            replicant.generation,
            replicant.gender,
            replicant.ranking
        );
    }

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
    external view
    returns (
        uint256 tokenId,
        uint256 serial,
        uint256 traits,
        Generation generation,
        Gender gender,
        uint8 ranking
    ) {
        require(_tokenId < avastars.length);
        Avastar memory avastar = avastars[_tokenId];
        Replicant memory replicant = replicantsByGeneration[uint8(avastar.generation)][uint256(avastar.serial)];
        return (
            replicant.id,
            replicant.serial,
            replicant.traits,
            replicant.generation,
            replicant.gender,
            replicant.ranking
        );
    }

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
    external onlyMinter whenNotPaused
    returns (uint256 tokenId, uint256 serial)
    {
        require(_owner != address(0));
        require(_traits != 0);
        require(isHashUsedByGeneration[uint8(_generation)][_traits] == false);
        require(_gender > Gender.ANY);
        require(_ranking >= 0 && _ranking <= 100);

        // Get Prime Serial and Token ID
        serial = replicantsByGeneration[uint8(_generation)].length;
        tokenId = avastars.length;

        // Create and store Replicant struct
        replicantsByGeneration[uint8(_generation)].push(
            Replicant(tokenId, serial, _traits, _generation, _gender, _ranking)
        );

        // Create and store Avastar token
        Avastar memory avastar = Avastar(tokenId, serial, _traits, _generation, Wave.REPLICANT);

        // Track the avastar by various dimensions
        trackAvastar(avastar);

        // Mint the token
        super._mint(_owner, tokenId);

        // Send the NewReplicant event
        emit NewReplicant(tokenId, serial, _generation, _gender, _traits);

        // Return the tokenId, serial
        return (tokenId, serial);
    }

}