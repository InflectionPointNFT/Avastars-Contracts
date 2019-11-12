pragma solidity ^0.5.12;

import "./AvastarTypes.sol";

/**
 * @title Avastar Transporter Interface
 * @author Cliff Hall
 * @dev Declared with contract rather than interface as it must inherit for enum types
 * @dev Used by AvastarMinter contract to interact with subset of AvastarTransporter contract functions
 */
contract IAvastarTransporter is AvastarTypes {

    function isAvastarTransporter() external pure returns (bool);

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