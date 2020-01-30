pragma solidity 0.5.14;

import "./TraitFactory.sol";

/**
 * @title TraitFactory Wrapper
 * @author Cliff Hall
 * @notice Side contract (not deployed or inherited) that extends
 * `TraitFactory` and exposes methods for testing its internal functions.
 */
contract TraitFactoryWrapper is TraitFactory {

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

}