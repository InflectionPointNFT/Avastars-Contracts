pragma solidity ^0.5.12;

import "./AvastarFactory.sol";

/**
 * @title Avastar Factory Wrapper
 * @author Cliff Hall
 * @notice Side contract (not deployed or inherited) that extends
 * `AvastarFactory` and exposes methods for testing its internal functions.
 */
contract AvastarFactoryWrapper is AvastarFactory {

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
    function _mintAvastar(
        address _owner,
        uint256 _serial,
        uint256 _traits,
        Generation _generation,
        Wave _wave
    )
    external whenNotPaused
    returns (uint256 tokenId)
    {
        return mintAvastar(_owner, _serial, _traits, _generation, _wave);
    }

}