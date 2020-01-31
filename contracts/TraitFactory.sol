pragma solidity 0.5.14;

import "./AvastarState.sol";

/**
 * @title Avastar Trait Factory
 * @author Cliff Hall
 */
contract TraitFactory is AvastarState {

    /**
     * @notice Event emitted when a new Trait is created.
     * @param id the Trait ID
     * @param generation the generation of the trait
     * @param gene the gene that the trait is a variation of
     * @param rarity the rarity level of this trait
     * @param variation variation of the gene the trait represents
     * @param name the name of the trait
     */
    event NewTrait(uint256 id, Generation generation, Gene gene, Rarity rarity, uint8 variation, string name);

    /**
     * @notice Event emitted when artist attribution is set for a generation.
     * @param generation the generation that attribution was set for
     * @param artist the artist who created the artwork for the generation
     * @param infoURI the artist's website / portfolio URI
     */
    event AttributionSet(Generation generation, string artist, string infoURI);

    /**
     * @notice Event emitted when a Trait's art is created.
     * @param id the Trait ID
     */
    event TraitArtExtended(uint256 id);

    /**
     * @notice Modifier to ensure no trait modification after a generation's
     * Avastar production has begun.
     * @param _generation the generation to check production status of
     */
    modifier onlyBeforeProd(Generation _generation) {
        require(primesByGeneration[uint8(_generation)].length == 0 && replicantsByGeneration[uint8(_generation)].length == 0);
        _;
    }

    /**
     * @notice Get Trait ID by Generation, Gene, and Variation.
     * @param _generation the generation the trait belongs to
     * @param _gene gene the trait belongs to
     * @param _variation the variation of the gene
     * @return traitId the ID of the specified trait
     */
    function getTraitIdByGenerationGeneAndVariation(
        Generation _generation,
        Gene _gene,
        uint8 _variation
    )
    external view
    returns (uint256 traitId)
    {
        return traitIdByGenerationGeneAndVariation[uint8(_generation)][uint8(_gene)][_variation];
    }

    /**
     * @notice Retrieve a Trait's info by ID.
     * @param _traitId the ID of the Trait to retrieve
     * @return id the ID of the trait
     * @return generation generation of the trait
     * @return series list of series the trait may appear in
     * @return gender gender(s) the trait is valid for
     * @return gene gene the trait belongs to
     * @return variation variation of the gene the trait represents
     * @return rarity the rarity level of this trait
     * @return name name of the trait
     */
    function getTraitInfoById(uint256 _traitId)
    external view
    returns (
        uint256 id,
        Generation generation,
        Series[] memory series,
        Gender gender,
        Gene gene,
        Rarity rarity,
        uint8 variation,
        string memory name
    ) {
        require(_traitId < traits.length);
        Trait memory trait = traits[_traitId];
        return (
            trait.id,
            trait.generation,
            trait.series,
            trait.gender,
            trait.gene,
            trait.rarity,
            trait.variation,
            trait.name
        );
    }

    /**
     * @notice Retrieve a Trait's name by ID.
     * @param _traitId the ID of the Trait to retrieve
     * @return name name of the trait
     */
    function getTraitNameById(uint256 _traitId)
    external view
    returns (string memory name) {
        require(_traitId < traits.length);
        name = traits[_traitId].name;
    }

    /**
     * @notice Retrieve a Trait's art by ID.
     * Only invokable by a system administrator.
     * @param _traitId the ID of the Trait to retrieve
     * @return art the svg layer representation of the trait
     */
    function getTraitArtById(uint256 _traitId)
    external view onlySysAdmin
    returns (string memory art) {
        require(_traitId < traits.length);
        Trait memory trait = traits[_traitId];
        art = trait.svg;
    }

    /**
     * @notice Get the artist Attribution info for a given Generation, combined into a single string.
     * @param _generation the generation to retrieve artist attribution for
     * @return attrib a single string with the artist and artist info URI
     */
    function getAttributionByGeneration(Generation _generation)
    external view
    returns (
        string memory attribution
    ){
        Attribution memory attrib = attributionByGeneration[uint8(_generation)];
        attribution = strConcat(attribution, 'Original art by: ');
        attribution = strConcat(attribution, attrib.artist);
        attribution = strConcat(attribution, ' (');
        attribution = strConcat(attribution, attrib.infoURI);
        attribution = strConcat(attribution, ')');
    }

    /**
     * @notice Set the artist Attribution for a given Generation
     * @param _generation the generation to set artist attribution for
     * @param _artist the artist who created the art for the generation
     * @param _infoURI the URI for the artist's website / portfolio
     */
    function setAttribution(
        Generation _generation,
        string calldata _artist,
        string calldata _infoURI
    )
    external onlySysAdmin onlyBeforeProd(_generation)
    {
        require(bytes(_artist).length > 0 && bytes(_infoURI).length > 0);
        attributionByGeneration[uint8(_generation)] = Attribution(_generation, _artist, _infoURI);
        emit AttributionSet(_generation, _artist, _infoURI);
    }

    /**
     * @notice Create a Trait
     * @param _generation the generation the trait belongs to
     * @param _series list of series the trait may appear in
     * @param _gender gender the trait is valid for
     * @param _gene gene the trait belongs to
     * @param _rarity the rarity level of this trait
     * @param _variation the variation of the gene the trait belongs to
     * @param _name the name of the trait
     * @param _svg svg layer representation of the trait
     * @return traitId the token ID of the newly created trait
     */
    function createTrait(
        Generation _generation,
        Series[] calldata _series,
        Gender _gender,
        Gene _gene,
        Rarity _rarity,
        uint8 _variation,
        string calldata _name,
        string calldata _svg
    )
    external onlySysAdmin whenNotPaused onlyBeforeProd(_generation)
    returns (uint256 traitId)
    {
        require(_series.length > 0);
        require(bytes(_name).length > 0);
        require(bytes(_svg).length > 0);

        // Get Trait ID
        traitId = traits.length;

        // Create and store trait
        traits.push(
            Trait(traitId, _generation, _series, _gender, _gene, _rarity, _variation, _name, _svg)
        );

        // Create generation/gene/variation to traitId mapping required by assembleArtwork
        traitIdByGenerationGeneAndVariation[uint8(_generation)][uint8(_gene)][uint8(_variation)] = traitId;

        // Send the NewTrait event
        emit NewTrait(traitId, _generation, _gene, _rarity, _variation, _name);

        // Return the new Trait ID
        return traitId;
    }

    /**
     * @notice Extend a Trait's art.
     * Only invokable by a system administrator.
     * If successful, emits a `TraitArtExtended` event with the resultant artwork.
     * @param _traitId the ID of the Trait to retrieve
     * @param _svg the svg content to be concatenated to the existing svg property
     */
    function extendTraitArt(uint256 _traitId, string calldata _svg)
    external onlySysAdmin whenNotPaused onlyBeforeProd(traits[_traitId].generation)
    {
        require(_traitId < traits.length);
        string memory art = strConcat(traits[_traitId].svg, _svg);
        traits[_traitId].svg = art;
        emit TraitArtExtended(_traitId);
    }

    /**
     * @notice Assemble the artwork for a given Trait hash with art from the given Generation
     * @param _generation the generation the Avastar belongs to
     * @param _traitHash the Avastar's trait hash
     * @return svg the fully rendered SVG for the Avastar
     */
    function assembleArtwork(Generation _generation, uint256 _traitHash)
    internal view
    returns (string memory svg)
    {
        require(_traitHash > 0);
        string memory accumulator = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="1000px" width="1000px" viewBox="0 0 1000 1000">';
        uint256 slotConst = 256;
        uint256 slotMask = 255;
        uint256 bitMask;
        uint256 slottedValue;
        uint256 slotMultiplier;
        uint256 variation;
        uint256 traitId;
        Trait memory trait;

        // Iterate trait hash by Gene and assemble SVG sandwich
        for (uint8 slot = 0; slot <= uint8(Gene.HAIR_STYLE); slot++){
            slotMultiplier = uint256(slotConst**slot);  // Create slot multiplier
            bitMask = slotMask * slotMultiplier;        // Create bit mask for slot
            slottedValue = _traitHash & bitMask;        // Extract slotted value from hash
            if (slottedValue > 0) {
                variation = (slot > 0)                  // Extract variation from slotted value
                    ? slottedValue / slotMultiplier
                    : slottedValue;
                if (variation > 0) {
                    traitId = traitIdByGenerationGeneAndVariation[uint8(_generation)][slot][uint8(variation)];
                    trait = traits[traitId];
                    accumulator = strConcat(accumulator, trait.svg);
                }
            }
        }

        return strConcat(accumulator, '</svg>');
    }

}