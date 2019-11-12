pragma solidity ^0.5.0;

import "./AccessControl.sol";


/**
 * @title AvaStars
 * @notice Base contract for AvaStars System
 */
contract POC_AvaStarsBase is AccessControl {

    /**
     * @notice All of the Components
     */
    Component[] public components;

    /**
     * @notice Structure of a AvaStars Component
     */
    struct Component {

        // ID of the component
        uint256 componentId;

        // The name of this component
        string name;

        // svg representation of the component
        string svg;

    }

}