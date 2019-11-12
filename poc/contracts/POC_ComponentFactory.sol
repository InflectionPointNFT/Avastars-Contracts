pragma solidity ^0.5.0;

import "./POC_AvaStarsBase.sol";


/**
 * @title ComponentFactory
 * @notice Defines functions and events related to management of Components
 */
contract POC_ComponentFactory is POC_AvaStarsBase {

    /**
     * @notice emitted upon the creation of a Component
     */
    event NewComponent(uint256 componentId, string name);

    // @notice Get the Component associated with a given Component ID
    function getComponent(uint256 _componentId)
        external
        view
        onlySysAdmin()
        returns (
            uint256,
            string memory,
            string memory
        )
    {
        require(_componentId < components.length);
        Component memory component = components[_componentId];
        return ( component.componentId, component.name, component.svg );
    }

    // @dev Testing the ability to concatenate two components
    function getSandwich(uint256 _comp1Id, uint256 _comp2Id)
        external
        view
        onlySysAdmin()
        returns (string memory)
    {
        require(_comp1Id < components.length && _comp2Id < components.length);
        Component memory comp1 = components[_comp1Id];
        Component memory comp2 = components[_comp2Id];
        string memory svgTagOpen = "<svg>";
        string memory svgTagClose = "</svg>";
        return strConcat(svgTagOpen, comp1.svg, comp2.svg, svgTagClose);
    }

    /**
     * @notice Create a Component
     * @dev Can only be run by system admin
     */
    function createComponent(string memory _name, string memory _svg)
        public
        whenNotPaused
        onlySysAdmin()
        returns(uint256)
    {
        // Get Component ID
        uint256 componentId = components.length;

        // Create and store Component
        components.push(Component(componentId, _name, _svg));

        // Emit Event with name of the new Component
        emit NewComponent(componentId, _name);

        // Return the new Component ID
        return componentId;
    }


    function strConcat(string memory _a, string memory _b) internal pure returns (string memory _concatenatedString) {
        return strConcat(_a, _b, "", "", "");
    }

    function strConcat(string memory _a, string memory _b, string memory _c) internal pure returns (string memory _concatenatedString) {
        return strConcat(_a, _b, _c, "", "");
    }

    function strConcat(string memory _a, string memory _b, string memory _c, string memory _d) internal pure returns (string memory _concatenatedString) {
        return strConcat(_a, _b, _c, _d, "");
    }

    function strConcat(string memory _a, string memory _b, string memory _c, string memory _d, string memory _e) internal pure returns (string memory _concatenatedString) {
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        uint i = 0;
        for (i = 0; i < _ba.length; i++) {
            babcde[k++] = _ba[i];
        }
        for (i = 0; i < _bb.length; i++) {
            babcde[k++] = _bb[i];
        }
        for (i = 0; i < _bc.length; i++) {
            babcde[k++] = _bc[i];
        }
        for (i = 0; i < _bd.length; i++) {
            babcde[k++] = _bd[i];
        }
        for (i = 0; i < _be.length; i++) {
            babcde[k++] = _be[i];
        }
        return string(babcde);
    }

}