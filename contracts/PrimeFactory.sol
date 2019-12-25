pragma solidity ^0.5.12;

import "./AvastarFactory.sol";

/**
 * @title Avastar Prime Factory
 * @author Cliff Hall
 */
contract PrimeFactory is AvastarFactory {

    /**
     * @notice Event emitted upon the creation of an Avastar Prime
     * @param id the token ID of the newly minted Prime
     * @param serial the serial of the Prime
     * @param generation the generation of the Prime
     * @param series the series of the Prime
     * @param gender the gender of the Prime
     * @param traits the trait hash of the Prime
     */
    event NewPrime(uint256 id, uint256 serial, Generation generation, Series series, Gender gender, uint256 traits);

    /**
     * @notice Get the Avastar Prime metadata associated with a given Generation and Serial.
     * Does not include the trait replication flags.
     * @param _generation the Generation of the Prime
     * @param _serial the Serial of the Prime
     * @return tokenId the Prime's token ID
     * @return serial the Prime's serial
     * @return traits the Prime's trait hash
     * @return replicated the Prime's trait replication indicators
     * @return generation the Prime's generation
     * @return series the Prime's series
     * @return gender the Prime's gender
     * @return ranking the Prime's ranking
     */
    function getPrimeByGenerationAndSerial(Generation _generation, uint256 _serial)
    external view
    returns (
        uint256 tokenId,
        uint256 serial,
        uint256 traits,
        Generation generation,
        Series series,
        Gender gender,
        uint8 ranking
    ) {
        require(_serial < primesByGeneration[uint8(_generation)].length);
        Prime memory prime = primesByGeneration[uint8(_generation)][uint256(_serial)];
        return (
            prime.id,
            prime.serial,
            prime.traits,
            prime.generation,
            prime.series,
            prime.gender,
            prime.ranking
        );
    }

    /**
     * @notice Get the Avastar Prime associated with a given Token ID.
     * Does not include the trait replication flags.
     * @param _tokenId the Token ID of the specified Prime
     * @return tokenId the Prime's token ID
     * @return serial the Prime's serial
     * @return traits the Prime's trait hash
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
        Generation generation,
        Series series,
        Gender gender,
        uint8 ranking
    ) {
        require(_tokenId < avastars.length);
        Avastar memory avastar = avastars[_tokenId];
        Prime memory prime = primesByGeneration[uint8(avastar.generation)][uint256(avastar.serial)];
        return (
            prime.id,
            prime.serial,
            prime.traits,
            prime.generation,
            prime.series,
            prime.gender,
            prime.ranking
        );
    }

    /**
     * @notice Get an Avastar Prime's replication flags by token ID.
     * @param _tokenId the token ID of the specified Prime
     * @return tokenId the Prime's token ID
     * @return replicated the Prime's trait replication flags
     */
    function getPrimeReplicationByTokenId(uint256 _tokenId)
    public view
    returns (
        uint256 tokenId,
        bool[] memory replicated
    ) {
        require(_tokenId < avastars.length);
        Avastar memory avastar = avastars[_tokenId];
        Prime memory prime = primesByGeneration[uint8(avastar.generation)][uint256(avastar.serial)];
        return (
            prime.id,
            prime.replicated
        );
    }

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
    external onlyMinter whenNotPaused
    returns (uint256 tokenId, uint256 serial)
    {
        require(_owner != address(0));
        require(_traits != 0);
        require(isHashUsedByGeneration[uint8(_generation)][_traits] == false);
        require(_gender > Gender.ANY);
        require(_ranking >= 0 && _ranking <= 100);

        // Get Prime Serial and mint Avastar, getting tokenId
        serial = primesByGeneration[uint8(_generation)].length;
        tokenId = mintAvastar(_owner, serial, _traits, _generation, Wave.PRIME);

        // Create and store Prime struct
        primesByGeneration[uint8(_generation)].push(
            Prime(tokenId, serial, _traits, new bool[](32), _generation, _series, _gender, _ranking)
        );

        // Send the NewPrime event
        emit NewPrime(tokenId, serial, _generation, _series, _gender, _traits);

        // Return the tokenId, serial
        return (tokenId, serial);
    }

}