pragma solidity ^0.5.12;

import "@openzeppelin/contracts/access/Roles.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @title Access Control
 * @author Cliff Hall
 * @notice Role-based access control and related functions, function modifiers, and events
 */
contract AccessControl {

    using SafeMath for uint256;
    using Roles for Roles.Role;

    Roles.Role private admins;
    Roles.Role private minters;
    Roles.Role private owners;

    /**
     * @notice Sets msg.sender as owner and system admin by default
     */
    constructor() public {
        paused = true; // Start paused. un-paused after full migration
        admins.add(msg.sender);
    }

    event ContractPaused();
    event ContractUnpaused();
    event ContractUpgrade(address newContract);
    event MinterAdded(address minterAddress);
    event OwnerAdded(address ownerAddress);

    bool public paused = false;
    bool public upgraded = false;
    address public newContractAddress;

    /**
     * @notice Modifier to scope access to system administrators
     */
    modifier onlySysAdmin() {
        require(admins.has(msg.sender));
        _;
    }

    /**
     * @notice Modifier to scope access to minters
     */
    modifier onlyMinter() {
        require(minters.has(msg.sender));
        _;
    }

    /**
     * @notice Modifier to scope access to owners
     */
    modifier onlyOwner() {
        require(owners.has(msg.sender));
        _;
    }

    /**
     * @notice Modifier to make a function callable only when the contract is not paused.
     */
    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    /**
     * @notice Modifier to make a function callable only when the contract is paused.
     */
    modifier whenPaused() {
        require(paused);
        _;
    }

    /**
     * @notice Modifier to make a function callable only when the contract not upgraded.
     */
    modifier whenNotUpgraded() {
        require(!upgraded);
        _;
    }

    /**
     * @notice Called by a system administrator to  mark the smart contract as upgraded,
     * in case there is a serious breaking bug. This method stores the new contract
     * address and emits an event to that effect. Clients of the contract should
     * update to the new contract address upon receiving this event. This contract will
     * remain paused indefinitely after such an upgrade.
     * @param _newAddress address of new contract
     */
    function upgradeContract(address _newAddress) external onlySysAdmin whenPaused whenNotUpgraded {
        upgraded = true;
        newContractAddress = _newAddress;
        emit ContractUpgrade(_newAddress);
    }

    /**
     * @notice Called by a system administrator to add a minter
     * @param _minterAddress approved minter
     */
    function addMinter(address _minterAddress) external onlySysAdmin {
        minters.add(_minterAddress);
        emit MinterAdded(_minterAddress);
    }

    /**
     * @notice Called by a system administrator to add an owner
     * @param _ownerAddress approved owner
     */
    function addOwner(address _ownerAddress) external onlySysAdmin {
        owners.add(_ownerAddress);
        emit OwnerAdded(_ownerAddress);
    }

    /**
     * @notice Called by a system administrator to pause, triggers stopped state
     */
    function pause() public onlySysAdmin whenNotPaused {
        paused = true;
        emit ContractPaused();
    }

    /**
     * @notice Called by a system administrator to un-pause, returns to normal state
     */
    function unpause() public onlySysAdmin whenPaused whenNotUpgraded {
        paused = false;
        emit ContractUnpaused();
    }

}