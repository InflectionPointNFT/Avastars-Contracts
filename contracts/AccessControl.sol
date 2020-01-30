pragma solidity ^0.5.12;

import "@openzeppelin/contracts/access/Roles.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

/**
 * @title Access Control
 * @author Cliff Hall
 * @notice Role-based access control and contract upgrade functionality.
 */
contract AccessControl {

    using SafeMath for uint256;
    using SafeMath for uint16;
    using Roles for Roles.Role;

    Roles.Role private admins;
    Roles.Role private minters;
    Roles.Role private owners;

    /**
     * @notice Sets `msg.sender` as system admin by default.
     * Starts paused. System admin must unpause, and add other roles after deployment.
     */
    constructor() public {
        admins.add(msg.sender);
    }

    /**
     * @notice Emitted when contract is paused by system administrator.
     */
    event ContractPaused();

    /**
     * @notice Emitted when contract is unpaused by system administrator.
     */
    event ContractUnpaused();

    /**
     * @notice Emitted when contract is upgraded by system administrator.
     * @param newContract address of the new version of the contract.
     */
    event ContractUpgrade(address newContract);


    bool public paused = true;
    bool public upgraded = false;
    address public newContractAddress;

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
     * @notice Modifier to scope access to system administrators
     */
    modifier onlySysAdmin() {
        require(admins.has(msg.sender));
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
        require(_newAddress != address(0));
        upgraded = true;
        newContractAddress = _newAddress;
        emit ContractUpgrade(_newAddress);
    }

    /**
     * @notice Called by a system administrator to add a minter.
     * Reverts if `_minterAddress` already has minter role
     * @param _minterAddress approved minter
     */
    function addMinter(address _minterAddress) external onlySysAdmin {
        minters.add(_minterAddress);
        require(minters.has(_minterAddress));
    }

    /**
     * @notice Called by a system administrator to add an owner.
     * Reverts if `_ownerAddress` already has owner role
     * @param _ownerAddress approved owner
     * @return added boolean indicating whether the role was granted
     */
    function addOwner(address _ownerAddress) external onlySysAdmin {
        owners.add(_ownerAddress);
        require(owners.has(_ownerAddress));
    }

    /**
     * @notice Called by a system administrator to add another system admin.
     * Reverts if `_sysAdminAddress` already has sysAdmin role
     * @param _sysAdminAddress approved owner
     */
    function addSysAdmin(address _sysAdminAddress) external onlySysAdmin {
        admins.add(_sysAdminAddress);
        require(admins.has(_sysAdminAddress));
    }

    /**
     * @notice Called by an owner to remove all roles from an address.
     * Reverts if address had no roles to be removed.
     * @param _address address having its roles stripped
     */
    function stripRoles(address _address) external onlyOwner {
        bool stripped = false;
        if (admins.has(_address)) {
            admins.remove(_address);
            stripped = true;
        }
        if (minters.has(_address)) {
            minters.remove(_address);
            stripped = true;
        }
        if (owners.has(_address)) {
            owners.remove(_address);
            stripped = true;
        }
        require(stripped == true);
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