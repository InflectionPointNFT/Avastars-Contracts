pragma solidity ^0.5.12;

import "./IAvastarTeleporter.sol";
import "./AvastarTypes.sol";
import "./AvastarBase.sol";
import "./AccessControl.sol";

/**
 * @title Avastar Metadata Generator
 * @author Cliff Hall
 * @notice Generate Avastar metadata from on-chain data.
 * Don't call this contract directly. It is used by `AvastarTeleporter` to generate
 * the human and machine readable metadata for a given Avastar token Id. Since this
 * functionality is not built into the `AvastarTeleporter` contract, it can be upgraded
 * in that contract by setting a new address for this contract.
 */
contract AvastarMetadata is AvastarBase, AvastarTypes, AccessControl {

    /**
     * @notice Event emitted when TokenURI base changes
     * @param tokenUriBase the base URI for tokenURI calls
     */
    event TokenUriBaseSet(string tokenUriBase);

    /**
     * @notice Event emitted when the `mediaUriBase` is set.
     * Only emitted when the `mediaUriBase` is set after contract deployment.
     * @param mediaUriBase the new URI
     */
    event MediaUriBaseSet(string mediaUriBase);

    /**
     * @notice Event emitted when the `viewUriBase` is set.
     * Only emitted when the `viewUriBase` is set after contract deployment.
     * @param viewUriBase the new URI
     */
    event ViewUriBaseSet(string viewUriBase);

    /**
     * @notice Address of the AvastarTeleporter contract
     */
    IAvastarTeleporter private teleporterContract ;

    /**
     * @notice The base URI for an Avastar's off-chain metadata
     */
    string internal tokenUriBase;

    /**
     * @notice Base URI for an Avastar's off-chain image
     */
    string private mediaUriBase;

    /**
     * @notice Base URI to view an Avastar on the Avastars website
     */
    string private viewUriBase;

    /**
     * @notice Construct AvastarMetadata contract.
     * @param _teleporter address of the `AvastarTeleporter` contract
     * @param _mediaUriBase base uri for an Avastar image
     * @param _viewUriBase base uri to view an Avastar on the Avastars website
     */
    constructor (
        address _teleporter,
        string memory _mediaUriBase,
        string memory _viewUriBase,
        string memory _tokenUriBase) public
    {
        // Cast the candidate contract to the IAvastarTeleporter interface
        IAvastarTeleporter candidateContract = IAvastarTeleporter(_teleporter);

        // Verify that we have the appropriate address
        require(candidateContract.isAvastarTeleporter());

        // Set the contract address
        teleporterContract = IAvastarTeleporter(_teleporter);

        // Media URI
        mediaUriBase = _mediaUriBase;

        // View URI
        viewUriBase = _viewUriBase;

        // Token URI
        tokenUriBase = _tokenUriBase;
    }

    /**
     * @notice Acknowledge contract is `AvastarMetadata`
     * @return always true
     */
    function isAvastarMetadata() external pure returns (bool) {return true;}

    /**
     * @notice Set the base URI for creating `tokenURI` for each Avastar.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * If successful, emits an `TokenUriBaseSet` event.
     * @param _tokenUriBase base for the ERC721 tokenURI
     */
    function setTokenUriBase(string calldata _tokenUriBase)
    external onlySysAdmin whenPaused whenNotUpgraded
    {
        // Set the base for metadata tokenURI
        tokenUriBase = _tokenUriBase;

        // Emit the event
        emit TokenUriBaseSet(_tokenUriBase);
    }

    /**
     * @notice Set the base URI for the image of each Avastar.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * If successful, emits an `MediaUriBaseSet` event.
     * @param _mediaUriBase base for the mediaURI shown in metadata for each Avastar
     */
    function setMediaUriBase(string calldata _mediaUriBase)
    external onlySysAdmin whenPaused whenNotUpgraded
    {
        // Set the base for metadata tokenURI
        mediaUriBase = _mediaUriBase;

        // Emit the event
        emit MediaUriBaseSet(_mediaUriBase);
    }

    /**
     * @notice Set the base URI for the image of each Avastar.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * If successful, emits an `MediaUriBaseSet` event.
     * @param _viewUriBase base URI for viewing an Avastar on the Avastars website
     */
    function setViewUriBase(string calldata _viewUriBase)
    external onlySysAdmin whenPaused whenNotUpgraded
    {
        // Set the base for metadata tokenURI
        viewUriBase = _viewUriBase;

        // Emit the event
        emit ViewUriBaseSet(_viewUriBase);
    }

    /**
     * @notice Get view URI for a given Avastar Token ID.
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return uri the off-chain URI to view the Avastar on the Avastars website
     */
    function viewURI(uint _tokenId)
    public view
    returns (string memory uri)
    {
        uri = strConcat(viewUriBase, uintToStr(_tokenId));
    }

    /**
     * @notice Get media URI for a given Avastar Token ID.
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return uri the off-chain URI to the Avastar image
     */
    function mediaURI(uint _tokenId)
    public view
    returns (string memory uri)
    {
        uri = strConcat(mediaUriBase, uintToStr(_tokenId));
    }

    /**
     * @notice Get token URI for a given Avastar Token ID.
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return uri the Avastar's off-chain JSON metadata URI
     */
    function tokenURI(uint _tokenId)
    public view
    returns (string memory uri)
    {
        uri = strConcat(tokenUriBase, uintToStr(_tokenId));
    }

    /**
     * @notice Get human-readable metadata for a given Avastar by Token ID.
     * @param _tokenId the token id of the given Avastar
     * @return metadata the Avastar's human-readable metadata
     */
    function getAvastarMetadata(uint256 _tokenId)
    public view
    returns (string memory metadata) {

        // Combined Avastar, Prime, and Replicant props
        uint256 id;
        uint256 serial;
        uint256 traits;
        Generation generation;
        Wave wave;
        bool[] memory replicated;
        Series series;
        Gender gender;
        uint8 ranking;

        // Get the Avastar
        wave = teleporterContract.getAvastarWaveByTokenId(_tokenId);

        // Get Prime or Replicant depending on Avastar's Wave
        if (wave == Wave.PRIME) {
            //(id, serial, traits, replicated, generation, series, gender, ranking) = teleporterContract.getPrimeByTokenId(_tokenId);
        } else {
            //(id, serial, traits, generation, gender, ranking)  = teleporterContract.getReplicantByTokenId(_tokenId);
        }

        // Description
        metadata = strConcat('{\n  "description": "Avastar ',
            (wave == Wave.PRIME)
                ? 'Prime",\n'
                : 'Replicant",\n'
        );

        // View URI
        metadata = strConcat(metadata, '  "external_url": "');
        metadata = strConcat(metadata, viewURI(_tokenId));
        metadata = strConcat(metadata, '",\n');

        // Media URI
        metadata = strConcat(metadata, '  "image": "');
        metadata = strConcat(metadata, mediaURI(_tokenId));
        metadata = strConcat(metadata, '",\n');

        // Attributes (ala OpenSea)
        metadata = strConcat(metadata, '  "attributes": [\n');

        // Generation
        metadata = strConcat(metadata, '    {\n');
        metadata = strConcat(metadata, '      "display_type": "number",\n');
        metadata = strConcat(metadata, '      "trait_type": "generation",\n');
        metadata = strConcat(metadata, '      "value": ');
        metadata = strConcat(metadata, uintToStr(uint8(generation) + 1));
        metadata = strConcat(metadata, '\n    },\n');

        // Series
        metadata = strConcat(metadata, '    {\n');
        metadata = strConcat(metadata, '      "display_type": "number",\n');
        metadata = strConcat(metadata, '      "trait_type": "series",\n');
        metadata = strConcat(metadata, '      "value": ');
        metadata = strConcat(metadata, uintToStr(uint8(series) + 1));
        metadata = strConcat(metadata, '\n    }\n');


        metadata = strConcat(metadata, '  ]');

        // Finish JSON object
        metadata = strConcat(metadata, '\n}');
    }




    /**
     * @notice Assemble the artwork for a given Trait hash with art from the given Generation
     * @param _generation the generation the Avastar belongs to
     * @param _traitHash the Avastar's trait hash
     * @return svg the fully rendered SVG for the Avastar
    function assembleTraitMetadata(Generation _generation, uint256 _traitHash)
    internal view
    returns (string memory svg)
    {
        require(_traitHash > 0);
        string memory accumulator = '\t"attributes": [\n';
        uint256 slotConst = 256;
        uint256 slotMask = 255;
        uint256 bitMask;
        uint256 slottedValue;
        uint256 slotMultiplier;
        uint256 variation;
        uint256 traitId;
        Trait memory trait;

        // Iterate trait hash by Gene and assemble trait attribute data
        for (uint8 slot = 0; slot <= uint8(Gene.HAIR_STYLE); slot++){
            slotMultiplier = uint256(slotConst**slot);  // Create slot multiplier
            bitMask = slotMask * slotMultiplier;        // Create bit mask for slot
            slottedValue = _traitHash & bitMask;        // Extract slotted value from hash
            if (slottedValue > 0) {
                variation = (slot > 0)                  // Extract variation from slotted value
                ? slottedValue / slotMultiplier
                : slottedValue;
                if (variation > 0) {
                    traitId = teleporterContract.traitIdByGenerationGeneAndVariation[uint8(_generation)][slot][uint8(variation)];
                    trait = traits[traitId];
                    accumulator = strConcat(accumulator, trait.svg);
                }
            }
        }

        return strConcat(accumulator, '\t]');
    }
    */

}
