pragma solidity 0.5.14;

import "./AvastarBase.sol";

/**
 * @title Avastar Base Wrapper
 * @author Cliff Hall
 * @notice Side contract (not deployed or inherited) that extends
 * `AvastarBase` and exposes methods for testing its internal functions.
 */
contract AvastarBaseWrapper is AvastarBase {

    /**
     * @notice Passthrough function for testing `AvastarBase.strConcat`.
     * @param _a the first string
     * @param _b the second string
     * @return result the concatenation of `_a` and `_b`
     */
    function _strConcat(string memory _a, string memory _b)
    public pure
    returns(string memory result) {
        result = strConcat(_a, _b);
    }

    /**
     * @notice Passthrough function for testing `AvastarBase.uintToStr`.
     * @param _value the `uint` value to be converted
     * @return result the `string` representation of the given `uint` value
     */
    function _uintToStr(uint _value)
    public pure
    returns (string memory result) {
        result = uintToStr(_value);
    }
}