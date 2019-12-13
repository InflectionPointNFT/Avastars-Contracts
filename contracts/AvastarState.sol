pragma solidity ^0.5.12;

import "./AvastarTypes.sol";
import "./AvastarBase.sol";
import "./AccessControl.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

/**
 * @title Avastar State
 * @author Cliff Hall
 * @notice This contract maintains the state variables for the Avastar Teleporter
 * and inherits the ERC7121, Access Control, Avastar Types, and Avastar Base utils
 * contract functionalities.
 */
contract AvastarState is AvastarBase, AvastarTypes, AccessControl, ERC721Full {

    /**
     * @notice Calls ERC721Full constructor with token name and symbol.
     */
    constructor() public ERC721Full(TOKEN_NAME, TOKEN_SYMBOL) {}

    string public constant TOKEN_NAME = "Avastars";
    string public constant TOKEN_SYMBOL = "AVAST";

    /**
     * @notice The base of the Token URI
     */
    string internal tokenUriBase;

    /**
     * @notice All Avastars across all Waves and Generations
     */
    Avastar[] internal avastars;

    /**
     * @notice List of all Traits across all Generations
     */
    Trait[] internal traits;

    /**
     * @notice  Retrieve Primes by Generation
     * Prime[] primes = primesByGeneration[Prime(_generation)]
     */
    mapping(uint8 => Prime[]) internal primesByGeneration;

    /**
     * @notice Retrieve Replicants by Generation
     * Replicant[] replicants = replicantsByGeneration[Replicant(_generation)]
     */
    mapping(uint8 => Replicant[]) internal replicantsByGeneration;

    /**
     * @notice Retrieve Artist Attribution by Generation
     * Attribution attribution = attributionByGeneration[Generation(_generation)]
     */
    mapping(uint8 => Attribution) internal attributionByGeneration;

    /**
     * @notice Retrieve the approved Trait handler for a given Avastar Prime by Token ID
     */
    mapping(uint256 => address) internal traitHandlerByPrimeTokenId;

    /**
     * @notice Is a given Trait Hash used within a given Generation
     * bool used = isHashUsedByGeneration[uint8(_generation)][uint256(_traits)]
     * This mapping ensures that within a Generation, a given Trait Hash is unique and can only be used once
     */
    mapping(uint8 => mapping(uint256 => bool)) internal isHashUsedByGeneration;

    /**
     * @notice Retrieve Token ID for a given Trait Hash within a given Generation
     * uint256 tokenId = tokenIdByGenerationAndHash[uint8(_generation)][uint256(_traits)]
     * Since Token IDs start at 0 and empty mappings for uint256 return 0, check isHashUsedByGeneration first
     */
    mapping(uint8 => mapping(uint256 => uint256)) internal tokenIdByGenerationAndHash;

    /**
     * @notice Retrieve the Token ID for an Avastar by a given Generation, Wave, and Serial
     * uint256 tokenId = tokenIdByGenerationWaveAndSerial[uint8(_generation)][uint256(_wave)][uint256(_serial)]
     */
    mapping(uint8 => mapping(uint8 => mapping(uint256 => uint256))) internal tokenIdByGenerationWaveAndSerial;

    /**
     * @notice Retrieve the Trait ID for a Trait from a given Generation by Gene and Variation
     * uint256 traitId = traitIdByGenerationGeneAndVariation[uint8(_generation)][uint8(_gene)][uint8(_variation)]
     */
    mapping(uint8 => mapping(uint8 => mapping(uint8 => uint256))) public traitIdByGenerationGeneAndVariation;

    /**
     * Store an Avastar and track its Token ID by various dimensions.
     * Adds `_avastar` to `avastars` array.
     * Sets `isHashUsedByGeneration` mapping to true for `_avastar.generation` and `_avastar.traits`.
     * Sets `tokenIdByGenerationAndHash` mapping to `_avastar.id` for `_avastar.generation` and `_avastar.traits`.
     * Sets `tokenIdByGenerationWaveAndSerial` mapping to `_avastar.id` for `_avastar.generation`, `_avastar.wave`, and `_avastar.serial`.
     * @param _avastar the new Avastar to store and track
     */
    function trackAvastar(Avastar memory _avastar) internal {

        // Store the avastar
        avastars.push(_avastar);

        // Indicate use of Trait Hash within given generation
        isHashUsedByGeneration[uint8(_avastar.generation)][_avastar.traits] = true;

        // Store token ID by Generation and Trait Hash
        tokenIdByGenerationAndHash[uint8(_avastar.generation)][_avastar.traits] = _avastar.id;

        // Create generation/wave/serial to tokenId mapping
        tokenIdByGenerationWaveAndSerial[uint8(_avastar.generation)][uint8(_avastar.wave)][uint256(_avastar.serial)] = _avastar.id;
    }

}