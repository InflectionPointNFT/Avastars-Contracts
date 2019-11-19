pragma solidity ^0.5.12;

import "./AvastarState.sol";

/**
 * @title Avastar Trait Factory
 * @author Cliff Hall
 */
contract TraitFactory is AvastarState {

    event NewTrait(uint256 id, Gene gene, uint8 variation, string name);

    /**
     * @notice Retrieve a Trait by ID
     * @param _traitId the ID of the Trait to retrieve
     * @return id the ID of the trait
     * @return generation
     * @return series
     * @return gender
     * @return gene
     * @return variation
     * @return name
     * @return svg
     */
    function getTrait(uint256 _traitId)
        external
        view
        returns (
            uint256 id,
            Generation generation,
            Series[] memory series,
            Gender gender,
            Gene gene,
            uint8 variation,
            string memory name,
            string memory svg
        )
    {
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
            trait.svg);
    }

    /**
     * @notice Get Trait ID by Generation and Variation
     */
    function getTraitIdByGenerationGeneAndVariation(
        Generation _generation,
        Gene _gene,
        uint256 _variationSafe)
            external
            view
            returns (
            uint256
        )
    {
        require(_variationSafe >=0 && _variationSafe <=255);
        uint8 variation = uint8(_variationSafe);
        return traitIdByGenerationGeneAndVariation[uint8(_generation)][uint8(_gene)][uint8(variation)];
    }

    /**
     * @notice Create a Trait
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
        external
        onlySysAdmin()
        whenNotPaused
        returns (uint256)
    {
        require(_series.length > 0);
        require(bytes(_name).length > 0);
        require(bytes(_svg).length > 0);

        // Downcast _variation_safe from uint256 to uint8
        // argument was made larger than needed to avoid undetectable overflow/wrapping
        require(_variationSafe >=0 && _variationSafe <=255);
        uint8 variation = uint8(_variationSafe);

        // Get Trait ID
        uint256 traitId = traits.length;

        // Create and store trait
        traits.push(
            Trait(traitId, _generation, _series, _gender, _gene, variation, _name, _svg)
        );

        // Create generation/gene/variation to traitId mapping
        traitIdByGenerationGeneAndVariation[uint8(_generation)][uint8(_gene)][uint8(variation)] = traitId;

        // Send the NewTrait event
        emit NewTrait(traitId, _gene, variation, _name);

        // Return the new Trait ID
        return traitId;
    }

    /**
     * @notice Assemble the artwork for a given Trait hash with art from the given Generation
     */
    function assembleArt(Generation _generation, uint256 _traitHash) public view returns (string memory) {
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
     */
    function strConcat(
        string memory _a,
        string memory _b
    )
        private
        pure
        returns (string memory result)
    {
        bytes memory bA = bytes(_a);
        bytes memory bB = bytes(_b);
        string memory sChunk = new string(bA.length + bB.length);
        bytes memory bChunk = bytes(sChunk);
        uint k = 0;
        uint i = 0;
        for (i = 0; i < bA.length; i++) {
            bChunk[k++] = bA[i];
        }
        for (i = 0; i < bB.length; i++) {
            bChunk[k++] = bB[i];
        }
        return string(bChunk);
    }

}