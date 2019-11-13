pragma solidity ^0.5.12;

import "./AvastarTypes.sol";

/**
 * @title AvastarTeleporter Interface
 * @author Cliff Hall
 * @dev Declared with contract rather than interface as it must inherit for enum types
 * @dev Used by AvastarMinter contract to interact with subset of AvastarTeleporter contract functions
 */
contract IAvastarTeleporter is AvastarTypes {

    function isAvastarTeleporter() external pure returns (bool);

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

    function mintReplicant(
        address _owner,
        uint256 _traits,
        Generation _generation,
        Gender _gender,
        uint8 _ranking
    )
    external
    returns (uint256, uint256);

    function ownerOf(uint256 tokenId) external view returns (address owner);

}