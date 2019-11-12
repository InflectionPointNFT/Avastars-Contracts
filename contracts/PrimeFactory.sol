pragma solidity ^0.5.12;

import "./TraitFactory.sol";

/**
 * @title Avastar Prime Factory
 * @author Cliff Hall
 */
contract PrimeFactory is TraitFactory {

    /**
     * @notice Event emitted upon the creation of an Avastar Prime
     */
    event NewPrime(uint256 id, uint256 serial, Generation generation, Series series, Gender gender, uint256 traits);

    /**
     * @notice Get the Avastar Prime metadata associated with a given Generation and Serial
     * @param _generation the Generation of the Prime
     * @param _serial the Serial of the Prime
     */
    function getPrimeByGenerationAndSerial(Generation _generation, uint256 _serial)
    external
    view
    returns (
        uint256,
        uint256,
        uint256,
        bool[] memory,
        Generation,
        Series,
        Gender,
        uint8
    )
    {
        require(_serial < primesByGeneration[uint8(_generation)].length);
        Prime memory prime = primesByGeneration[uint8(_generation)][uint256(_serial)];
        return ( prime.id, prime.serial, prime.traits, prime.replicated, prime.generation, prime.series, prime.gender, prime.ranking );
    }

    /**
     * @notice Get the Avastar Prime metadata associated with a given Token ID
     * @param _tokenId the Token ID of the Prime
     */
    function getPrimeByTokenId(uint256 _tokenId)
    external
    view
    returns (
        uint256,
        uint256,
        uint256,
        bool[] memory,
        Generation,
        Series,
        Gender,
        uint8
    )
    {
        require(_tokenId < avastars.length);
        Avastar memory avastar = avastars[_tokenId];
        Prime memory prime = primesByGeneration[uint8(avastar.generation)][uint256(avastar.serial)];
        return ( prime.id, prime.serial, prime.traits, prime.replicated, prime.generation, prime.series, prime.gender, prime.ranking );
    }

    /**
     * @notice Mint an Avastar Prime
     * @dev Only invokable by minter role, when contract is not paused
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
    onlyMinter
    whenNotPaused
    returns (uint256, uint256)
    {
        require(_owner != address(0));
        require(_traits != 0);
        require(isHashUsedByGeneration[uint8(_generation)][_traits] == false);
        require(_gender > Gender.ANY);
        require(_ranking >= 0 && _ranking <= 100);

        // Get Prime Serial and Token ID
        uint256 serial = primesByGeneration[uint8(_generation)].length;
        uint256 tokenId = avastars.length;

        // Create and store Prime struct
        primesByGeneration[uint8(_generation)].push(
            Prime(tokenId, serial, _traits, new bool[](32), _generation, _series, _gender, _ranking)
        );

        // Create and store Avastar token
        Avastar memory avastar = Avastar(tokenId, serial, _traits, _generation, Wave.PRIME);

        // Track the avastar by various dimensions
        trackAvastar(avastar);

        // Mint the token
        super._mint(_owner, tokenId);

        // Send the NewPrime event
        emit NewPrime(tokenId, serial, _generation, _series, _gender, _traits);

        // Return the tokenId, serial
        return (tokenId, serial);
    }

}