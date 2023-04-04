pragma solidity 0.5.14;

import "./IAvastarTeleporter.sol";
import "./AvastarTypes.sol";
import "./AvastarBase.sol";
import "./AccessControl.sol";

/**
 * @title Avastar Metadata Generator
 * @author Cliff Hall
 * @notice Generate Avastar metadata from on-chain data.
 * Refers to the `AvastarTeleporter` for raw data to generate
 * the human and machine readable metadata for a given Avastar token Id.
 */
contract AvastarMetadata is AvastarBase, AvastarTypes, AccessControl {

    string public constant INVALID_TOKEN_ID = "Invalid Token ID";
    uint256 public constant HIGHEST_FREE_VRM_ID = 26700;

    /**
     * @notice Event emitted when AvastarTeleporter contract is set
     * @param contractAddress the address of the AvastarTeleporter contract
     */
    event TeleporterContractSet(address contractAddress);

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
     * @notice Event emitted when the `vrmUriBase` is set.
     * Only emitted when the `vrmUriBase` is set after contract deployment.
     * @param which the traunch for this base (founders, exclusive, prime, replicant)
     * @param vrmUriBase the new URI
     */
    event VrmUriBaseSet(uint8 which, string vrmUriBase);

    /**
     * @notice Event emitted when the `vrmUriOverride` is set for a token.
     * Only emitted when the `vrmUriOverride` is set after contract deployment.
     * @param vrmUri the new URI
     */
    event VrmUriOverrideSet(uint256 tokenId, string vrmUri);

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
     * @notice Base URI to an Avastar's off-chain 3d avatar indexed by 
     * 0: Founder
     * 1: Exclusive
     * 4: Prime
     * 3: Replicant
     */
    string[4] private vrmUriBase;

    /**
     * @notice a full override URI to a specific Avastar's custom off-chain 3d avatar
     */
    mapping(uint256 => string) private vrmUriOverride;

    /**
     * @notice Set the address of the `AvastarTeleporter` contract.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * To be used if the Teleporter contract has to be upgraded and a new instance deployed.
     * If successful, emits an `TeleporterContractSet` event.
     * @param _address address of `AvastarTeleporter` contract
     */
    function setTeleporterContract(address _address) external onlySysAdmin whenPaused whenNotUpgraded {

        // Cast the candidate contract to the IAvastarTeleporter interface
        IAvastarTeleporter candidateContract = IAvastarTeleporter(_address);

        // Verify that we have the appropriate address
        require(candidateContract.isAvastarTeleporter());

        // Set the contract address
        teleporterContract = IAvastarTeleporter(_address);

        // Emit the event
        emit TeleporterContractSet(_address);
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
     * @notice Set the base URI for the default 3d avatar of each avastar.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * If successful, emits an `VrmUriBaseSet` event.
     * @param _which the traunch for this base (founders, exclusive, prime, replicant)
     * @param _vrmUriBase base URI for the default 3d avatar of each avastar.
     */
    function setVrmUriBase(uint8 _which, string calldata _vrmUriBase)
    external onlySysAdmin whenPaused whenNotUpgraded
    {
        // Set the base for token vrms
        vrmUriBase[_which] = _vrmUriBase;

        // Emit the event
        emit VrmUriBaseSet(_which, _vrmUriBase);
    }

    /**
     * @notice Set the override full URI for the 3d avatar of a specific avastar.
     * Only invokable by system admin role, when contract is not upgraded.
     * If successful, emits an `VrmUriOverrideSet` event.
     * @param _tokenId the tokenID to set an override for.
     * @param _vrmUriOverride the override full URI for the 3d avatar of a specific avastar.
     */
    function setVrmUriOverride(uint256 _tokenId, string calldata _vrmUriOverride)
    external onlySysAdmin whenNotUpgraded
    {
        // Set the override for token's vrm
        vrmUriOverride[_tokenId] = _vrmUriOverride;

        // Emit the event
        emit VrmUriOverrideSet(_tokenId, _vrmUriOverride);
    }
    
    /**
     * @notice clear the override full URI for the 3d avatar of a specific avastar.
     * Only invokable by system admin role, when contract not upgraded.
     * If successful, emits an `VrmUriOverrideSet` event.
     * @param _tokenId the tokenID to clear an override for.
     */
    function setVrmUriOverride(uint256 _tokenId)
    external onlySysAdmin whenNotUpgraded
    {
        // Set the override for token's vrm
        delete(vrmUriOverride[_tokenId]);

        // Emit the event
        emit VrmUriOverrideSet(_tokenId, '');
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
        require(_tokenId < teleporterContract.totalSupply(), INVALID_TOKEN_ID);
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
        require(_tokenId < teleporterContract.totalSupply(), INVALID_TOKEN_ID);
        uri = strConcat(mediaUriBase, uintToStr(_tokenId));
    }

    /**
     * @notice Get determine if the token has a VRM
     * @param _wave the Token ID of a previously minted Avastar Prime or Replicant
     * @param _series the Token ID of a previously minted Avastar Prime or Replicant
     * @param _serial the Token ID of a previously minted Avastar Prime or Replicant
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return bool true if the avastar has a vrm
     */
    function hasVrm(Wave _wave, Series _series, uint256 _serial, uint _tokenId)
    public view
    returns (bool)
    {
        require(_tokenId < teleporterContract.totalSupply(), INVALID_TOKEN_ID);
        if (bytes(vrmUriOverride[_tokenId]).length > 0) {
            return true;
        } else {
            if (_wave == Wave.PRIME && _series == Series.PROMO) {
                return (_serial <100) ? bytes(vrmUriBase[0]).length > 0 : bytes(vrmUriBase[1]).length > 0;
            } else {
                return (_wave == Wave.PRIME) ? bytes(vrmUriBase[2]).length > 0 : bytes(vrmUriBase[3]).length > 0;
            }
        }
    }

    /**
     * @notice Get token URI for a given Avastar Token ID.
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return uri the Avastar's off-chain JSON metadata URI
     */
    function tokenURI(uint _tokenId)
    external view
    returns (string memory uri)
    {
        require(_tokenId < teleporterContract.totalSupply(), INVALID_TOKEN_ID);
        uri = strConcat(tokenUriBase, uintToStr(_tokenId));
    }

    /**
     * @notice Get human-readable metadata for a given Avastar by Token ID.
     * @param _tokenId the token id of the given Avastar
     * @return metadata the Avastar's human-readable metadata
     */
    function getAvastarMetadata(uint256 _tokenId)
    external view
    returns (string memory metadata) {

        require(_tokenId < teleporterContract.totalSupply(), INVALID_TOKEN_ID);

        uint256 id;
        uint256 serial;
        uint256 traits;
        Generation generation;
        Wave wave;
        Series series;
        Gender gender;
        uint8 ranking;
        string memory attribution;

        // Get the Avastar
        wave = teleporterContract.getAvastarWaveByTokenId(_tokenId);

        // Get Prime or Replicant info depending on Avastar's Wave
        if (wave == Wave.PRIME) {
            (id, serial, traits, generation, series, gender, ranking) = teleporterContract.getPrimeByTokenId(_tokenId);
        } else {
            (id, serial, traits, generation, gender, ranking)  = teleporterContract.getReplicantByTokenId(_tokenId);
        }

        // Get artist attribution
        attribution = teleporterContract.getAttributionByGeneration(generation);
        attribution = strConcat('Original art by: ', attribution);

        // Name
        metadata = strConcat('{\n  "name": "Avastar #', uintToStr(uint256(id)));
        metadata = strConcat(metadata, '",\n');

        // Description: Generation
        metadata = strConcat(metadata, '  "description": "Generation ');
        metadata = strConcat(metadata, uintToStr(uint8(generation) + 1));

        // Description: Series (if 1-5)
        if (wave == Wave.PRIME && series != Series.PROMO) {
            metadata = strConcat(metadata, ' Series ');
            metadata = strConcat(metadata, uintToStr(uint8(series)));
        }

        // Description: Gender
        if (gender == Gender.MALE) {
            metadata = strConcat(metadata, ' Male ');
        }
        else if (gender == Gender.FEMALE) {
            metadata = strConcat(metadata, ' Female ');
        }
        else {
            metadata = strConcat(metadata, ' Non-Binary ');
        }

        // Description: Founder, Exclusive, Prime, or Replicant
        if (wave == Wave.PRIME && series == Series.PROMO) {
            metadata = strConcat(metadata, (serial <100) ? 'Founder. ' : 'Exclusive. ');
        } else {
            metadata = strConcat(metadata, (wave == Wave.PRIME) ? 'Prime. ' : 'Replicant. ');
        }
        metadata = strConcat(metadata, attribution);
        metadata = strConcat(metadata, '",\n');

        if (hasVrm(wave, series, serial, _tokenId)) {
            // VRM URI
            metadata = strConcat(metadata, '  "metaverse_avatar": "');
            if (bytes(vrmUriOverride[_tokenId]).length > 0) {
                metadata = strConcat(metadata, vrmUriOverride[_tokenId]);
            } else {
                if (wave == Wave.PRIME && series == Series.PROMO) {
                    metadata = strConcat(metadata, (serial <100) ? vrmUriBase[0] : vrmUriBase[1]);
                } else {
                    metadata = strConcat(metadata, (wave == Wave.PRIME) ? vrmUriBase[2] : vrmUriBase[3]);
                }
                metadata = strConcat(metadata, uintToStr(_tokenId));
            }
            metadata = strConcat(metadata, '",\n');
        }
        
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

        // Gender
        metadata = strConcat(metadata, '    {\n');
        metadata = strConcat(metadata, '      "trait_type": "gender",\n');
        metadata = strConcat(metadata, '      "value": "');

        if (gender == Gender.MALE) {
            metadata = strConcat(metadata, 'male"');
        }
        else if (gender == Gender.FEMALE) {
            metadata = strConcat(metadata, 'female"');
        }
        else {
            metadata = strConcat(metadata, 'non-binary"');
        }

        metadata = strConcat(metadata, '\n    },\n');

        // Wave
        metadata = strConcat(metadata, '    {\n');
        metadata = strConcat(metadata, '      "trait_type": "wave",\n');
        metadata = strConcat(metadata, '      "value": "');
        metadata = strConcat(metadata, (wave == Wave.PRIME) ? 'prime"' : 'replicant"');
        metadata = strConcat(metadata, '\n    },\n');

        // Generation
        metadata = strConcat(metadata, '    {\n');
        metadata = strConcat(metadata, '      "display_type": "number",\n');
        metadata = strConcat(metadata, '      "trait_type": "generation",\n');
        metadata = strConcat(metadata, '      "value": ');
        metadata = strConcat(metadata, uintToStr(uint8(generation) + 1));
        metadata = strConcat(metadata, '\n    },\n');

        // Series
        if (wave == Wave.PRIME) {
            metadata = strConcat(metadata, '    {\n');
            metadata = strConcat(metadata, '      "display_type": "number",\n');
            metadata = strConcat(metadata, '      "trait_type": "series",\n');
            metadata = strConcat(metadata, '      "value": ');
            metadata = strConcat(metadata, uintToStr(uint8(series)));
            metadata = strConcat(metadata, '\n    },\n');
        }

        // Serial
        metadata = strConcat(metadata, '    {\n');
        metadata = strConcat(metadata, '      "display_type": "number",\n');
        metadata = strConcat(metadata, '      "trait_type": "serial",\n');
        metadata = strConcat(metadata, '      "value": ');
        metadata = strConcat(metadata, uintToStr(serial));
        metadata = strConcat(metadata, '\n    },\n');

        // Ranking
        metadata = strConcat(metadata, '    {\n');
        metadata = strConcat(metadata, '      "display_type": "number",\n');
        metadata = strConcat(metadata, '      "trait_type": "ranking",\n');
        metadata = strConcat(metadata, '      "value": ');
        metadata = strConcat(metadata, uintToStr(ranking));
        metadata = strConcat(metadata, '\n    },\n');

        // Level
        metadata = strConcat(metadata, '    {\n');
        metadata = strConcat(metadata, '      "trait_type": "level",\n');
        metadata = strConcat(metadata, '      "value": "');
        metadata = strConcat(metadata, getRankingLevel(ranking));
        metadata = strConcat(metadata, '"\n    },\n');

        if (hasVrm(wave, series, serial, _tokenId)) {
            metadata = strConcat(metadata, '    {\n      "trait_type": "3D Avatar",\n      "value": "true"\n    },\n');
        } else if (_tokenId <= HIGHEST_FREE_VRM_ID) {
            metadata = strConcat(metadata, '    {\n      "trait_type": "3D Avatar",\n      "value": "pending"\n    },\n');
        } else {
            metadata = strConcat(metadata, '    {\n      "trait_type": "3D Avatar",\n      "value": "false"\n    },\n');
        }

        // Traits
        metadata = strConcat(metadata, assembleTraitMetadata(generation, traits));

        // Finish JSON object
        metadata = strConcat(metadata, '  ]\n}');

    }

    /**
     * @notice Get the rarity level for a given Avastar Rank
     * @param ranking the ranking level (1-100)
     * @return level the rarity level (Common, Uncommon, Rare, Epic, Legendary)
     */
    function getRankingLevel(uint8 ranking)
    internal pure
    returns (string memory level) {
        require(ranking >0 && ranking <=100);
        uint8[4] memory breaks = [33, 41, 50, 60];
        if (ranking < breaks[0]) {level = "Common";}
        else if (ranking < breaks[1]) {level = "Uncommon";}
        else if (ranking < breaks[2]) {level = "Rare";}
        else if (ranking < breaks[3]) {level = "Epic";}
        else {level = "Legendary";}
    }

    /**
     * @notice Assemble the human-readable metadata for a given Trait hash.
     * Used internally by
     * @param _generation the generation the Avastar belongs to
     * @param _traitHash the Avastar's trait hash
     * @return metdata the JSON trait metadata for the Avastar
     */
    function assembleTraitMetadata(Generation _generation, uint256 _traitHash)
    internal view
    returns (string memory metadata)
    {
        require(_traitHash > 0);
        uint256 slotConst = 256;
        uint256 slotMask = 255;
        uint256 bitMask;
        uint256 slottedValue;
        uint256 slotMultiplier;
        uint256 variation;
        uint256 traitId;

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
                    traitId = teleporterContract.getTraitIdByGenerationGeneAndVariation(_generation, Gene(slot), uint8(variation));
                    metadata = strConcat(metadata, '    {\n');
                    metadata = strConcat(metadata, '      "trait_type": "');
                    if (slot == uint8(Gene.SKIN_TONE)) {
                        metadata = strConcat(metadata, 'skin_tone');
                    } else if (slot == uint8(Gene.HAIR_COLOR)) {
                        metadata = strConcat(metadata, 'hair_color');
                    } else if (slot == uint8(Gene.EYE_COLOR)) {
                        metadata = strConcat(metadata, 'eye_color');
                    } else if (slot == uint8(Gene.BG_COLOR)) {
                        metadata = strConcat(metadata, 'background_color');
                    } else if (slot == uint8(Gene.BACKDROP)) {
                        metadata = strConcat(metadata, 'backdrop');
                    } else if (slot == uint8(Gene.EARS)) {
                        metadata = strConcat(metadata, 'ears');
                    } else if (slot == uint8(Gene.FACE)) {
                        metadata = strConcat(metadata, 'face');
                    } else if (slot == uint8(Gene.NOSE)) {
                        metadata = strConcat(metadata, 'nose');
                    } else if (slot == uint8(Gene.MOUTH)) {
                        metadata = strConcat(metadata, 'mouth');
                    } else if (slot == uint8(Gene.FACIAL_FEATURE)) {
                        metadata = strConcat(metadata, 'facial_feature');
                    } else if (slot == uint8(Gene.EYES)) {
                        metadata = strConcat(metadata, 'eyes');
                    } else if (slot == uint8(Gene.HAIR_STYLE)) {
                        metadata = strConcat(metadata, 'hair_style');
                    }
                    metadata = strConcat(metadata, '",\n');
                    metadata = strConcat(metadata, '      "value": "');
                    metadata = strConcat(metadata, teleporterContract.getTraitNameById(traitId));
                    metadata = strConcat(metadata, '"\n    }');
                    if (slot < uint8(Gene.HAIR_STYLE))  metadata = strConcat(metadata, ',');
                    metadata = strConcat(metadata, '\n');

                }
            }
        }
    }

}
