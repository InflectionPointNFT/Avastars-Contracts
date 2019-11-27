pragma solidity ^0.5.12;

import "./AvastarState.sol";

/**
 * @title Avastar Trait Factory
 * @author Cliff Hall
 */
contract TraitFactory is AvastarState {

    /**
     * @notice Event emitted when a new Trait is created.
     * @param id the Trait ID
     * @param gene the gene that the trait is a variation of
     * @param name the name of the trait
     */
    event NewTrait(uint256 id, Gene gene, uint8 variation, string name);

    /**
     * @notice Event emitted when a Trait's art is created.
     * @param id the Trait ID
     */
    event TraitArtExtended(uint256 id);

    /**
     * @notice Retrieve a Trait by ID.
     * Only invokable by a system administrator.
     * @param _traitId the ID of the Trait to retrieve
     * @return id the ID of the trait
     * @return generation generation of the trait
     * @return series list of series the trait may appear in
     * @return gender gender(s) the trait is valid for
     * @return gene gene the trait belongs to
     * @return variation variation of the gene the trait represents
     * @return name name of the trait
     * @return svg svg layer representation of the trait
     */
    function getTrait(uint256 _traitId)
    external view onlySysAdmin
    returns (
        uint256 id,
        Generation generation,
        Series[] memory series,
        Gender gender,
        Gene gene,
        uint8 variation,
        string memory name,
        string memory svg
    ) {
        require(_traitId < traits.length);
        Trait memory trait = traits[_traitId];
        return (
            trait.id,
            trait.generation,
            trait.series,
            trait.gender,
            trait.gene,
            trait.variation,
            trait.name,
            trait.svg
        );
    }

    /**
     * @notice Get Trait ID by Generation, Gene, and Variation.
     * @param _generation the generation the trait belongs to
     * @param _gene gene the trait belongs to
     * @param _variationSafe the variation of the gene
     * @return traitId the ID of the specified trait
     */
    function getTraitIdByGenerationGeneAndVariation(
        Generation _generation,
        Gene _gene,
        uint256 _variationSafe
    )
    external view
    returns (uint256 traitId)
    {
        require(_variationSafe >=0 && _variationSafe <=255);
        uint8 variation = uint8(_variationSafe);
        return traitIdByGenerationGeneAndVariation[uint8(_generation)][uint8(_gene)][uint8(variation)];
    }

    /**
     * @notice Create a Trait
     * @param _generation the generation the trait belongs to
     * @param _series list of series the trait may appear in
     * @param _gender gender the trait is valid for
     * @param _gene gene the trait belongs to
     * @param _variationSafe the variation of the gene the trait belongs to
     * @param _name the name of the trait
     * @param _svg svg layer representation of the trait
     * @return traitId the token ID of the newly created trait
     */
    function createTrait(
        Generation _generation,
        Series[] calldata _series,
        Gender _gender,
        Gene _gene,
        uint256 _variationSafe,
        string calldata _name,
        string calldata _svg
    )
    external onlySysAdmin whenNotPaused
    returns (uint256 traitId)
    {
        require(_series.length > 0);
        require(bytes(_name).length > 0);
        require(bytes(_svg).length > 0);

        // Downcast _variation_safe from uint256 to uint8
        // argument was made larger than needed to avoid undetectable overflow/wrapping
        require(_variationSafe >=0 && _variationSafe <=255);
        uint8 variation = uint8(_variationSafe);

        // Get Trait ID
        traitId = traits.length;

        // Create and store trait
        traits.push(
            Trait(traitId, _generation, _series, _gender, _gene, variation, _name, _svg)
        );

        // Create generation/gene/variation to traitId mapping required by assembleArtwork
        traitIdByGenerationGeneAndVariation[uint8(_generation)][uint8(_gene)][uint8(variation)] = traitId;

        // Send the NewTrait event
        emit NewTrait(traitId, _gene, variation, _name);

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
    external onlySysAdmin whenNotPaused
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
        for (uint8 slot = uint8(Gene.BACKGROUND); slot <= uint8(Gene.HAIR_STYLE); slot++){
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

    /**
     * @notice Concatenate two strings
     * @param _a the first string
     * @param _b the second string
     * @return result the concatenation of `_a` and `_b`
     */
    function strConcat(string memory _a, string memory _b)
    internal pure
    returns(string memory result) {
        result = string(abi.encodePacked(bytes(_a), bytes(_b)));
    }

}