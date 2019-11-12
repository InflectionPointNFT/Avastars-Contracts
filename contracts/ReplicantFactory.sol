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
     * @notice Get the Avastar Replicant associated by Generation and Serial
     */
    function getReplicantByGenerationAndSerial(Generation _generation, uint256 _serial)
    external
    view
    returns (
        uint256,
        uint256,
        uint256,
        Generation,
        Gender,
        uint8
    )
    {
        require(_serial < replicantsByGeneration[uint8(_generation)].length);
        Replicant memory replicant = replicantsByGeneration[uint8(_generation)][uint256(_serial)];
        return ( replicant.id, replicant.serial, replicant.traits, replicant.generation, replicant.gender, replicant.ranking );
    }

    /**
     * @notice Get the Avastar Replicant associated with a given Token ID
     */
    function getReplicantByTokenId(uint256 _tokenId)
    external
    view
    returns (
        uint256,
        uint256,
        uint256,
        Generation,
        Gender,
        uint8
    )
    {
        require(_tokenId < avastars.length);
        Avastar memory avastar = avastars[_tokenId];
        Replicant memory replicant = replicantsByGeneration[uint8(avastar.generation)][uint256(avastar.serial)];
        return ( replicant.id, replicant.serial, replicant.traits, replicant.generation, replicant.gender, replicant.ranking );
    }

    /**
     * @notice Mint an Avastar Replicant
     * @dev Only invokable by minter role, when contract is not paused
     */
    function mintReplicant(
        address _owner,
        uint256 _traits,
        Generation _generation,
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
        uint256 serial = replicantsByGeneration[uint8(_generation)].length;
        uint256 tokenId = avastars.length;

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