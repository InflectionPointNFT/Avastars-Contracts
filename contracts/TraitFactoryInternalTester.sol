pragma solidity ^0.5.12;

import "./TraitFactory.sol";

/**
 * @title TraitFactory Internal Function Tester
 * @notice Side contract (not deployed or inherited) that extends
 * `TraitFactory` and exposes methods for testing its internal functions.
 * @author Cliff Hall
 */
contract TraitFactoryInternalTester is TraitFactory {

    /**
     * @notice Passthrough function for testing `TraitFactory.assembleArtwork`.
     * @param _generation the generation the Avastar belongs to
     * @param _traitHash the Avastar's trait hash
     * @return svg the fully rendered SVG for the Avastar
     */
    function _assembleArtwork(Generation _generation, uint256 _traitHash)
    public view
    returns (string memory svg){
        svg = assembleArtwork(_generation, _traitHash);
    }

    /**
     * @notice Passthrough function for testing `TraitFactory.strConcat`.
     * @param _a the first string
     * @param _b the second string
     * @return result the concatenation of `_a` and `_b`
     */
    function _strConcat(string memory _a, string memory _b)
    public pure
    returns(string memory result) {
        result = strConcat(_a, _b);
    }

}