pragma solidity 0.5.14;

import "./AvastarTypes.sol";
import "./AccessControl.sol";
import "./IAvastarTeleporter.sol";
import "./IAvastarReplicantToken.sol";

/**
 * @title Avastar Replicant Minter Proxy
 * @author Cliff Hall
 * @notice Mints Avastar Replicants using the `AvastarTeleporter` contract on behalf of purchasers.
 */
contract AvastarReplicantMinter is AvastarTypes, AccessControl {

    /**
     * @notice Event emitted when `AvastarTeleporter` contract is set
     * @param contractAddress the address of the `AvastarTeleporter` contract
     */
    event TeleporterContractSet(address contractAddress);

    /**
     * @notice Event emitted when `AvastarReplicantToken` contract is set
     * @param contractAddress the address of the `AvastarReplicantToken` contract
     */
    event ARTContractSet(address contractAddress);

    /**
     * @notice Address of the `AvastarTeleporter` contract
     */
    IAvastarTeleporter private teleporterContract ;

    /**
     * @notice Address of the `AvastarReplicantToken` contract
     */
    IAvastarReplicantToken private artContract ;

    /**
     * @notice Set the address of the `AvastarTeleporter` contract.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * To be used if the Teleporter contract has to be upgraded and a new instance deployed.
     * If successful, emits an `TeleporterContractSet` event.
     * @param _address address of `AvastarTeleporter` contract
     */
    function setTeleporterContract(address _address) external onlySysAdmin whenPaused whenNotUpgraded {

        // Cast the candidate contract to the IAvastarTeleporter interface
        IAvastarTeleporter candidateContract = IAvastarTeleporter(_address);

        // Verify that we have the appropriate address
        require(candidateContract.isAvastarTeleporter());

        // Set the contract address
        teleporterContract = IAvastarTeleporter(_address);

        // Emit the event
        emit TeleporterContractSet(_address);
    }

    /**
     * @notice Set the address of the `AvastarReplicantToken` contract.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * To be used if the ART contract has to be upgraded and a new instance deployed.
     * If successful, emits an `ARTContractSet` event.
     * @param _address address of `AvastarReplicantToken` contract
     */
    function setArtContract(address _address) external onlySysAdmin whenPaused whenNotUpgraded {

        // Cast the candidate contract to the IAvastarTeleporter interface
        IAvastarReplicantToken candidateContract = IAvastarTeleporter(_address);

        // Verify that we have the appropriate address
        require(candidateContract.isAvastarReplicantToken());

        // Set the contract address
        artContract = IAvastarReplicantToken(_address);

        // Emit the event
        emit ArtContractSet(_address);
    }

    /**
     * @notice Mint an Avastar Replicant for a purchaser who has previously deposited funds.
     * Invokable only by minter role, when contract is not paused.
     * Minted token will be owned by `_purchaser` address.
     * If successful, the `AvastarRepicantToken` contract will emit a `ARTBurned` event,
     * and the `AvastarTeleporter` contract will emit a `NewReplicant` event.
     * @param _purchaser address that will own the token
     * @param _traits the Avastar's Trait hash
     * @param _generation the Avastar's Generation
     * @param _gender the Avastar's Gender
     * @param _ranking the Avastar's Ranking
     * @return tokenId the Avastar's tokenId
     * @return serial the Avastar's serial
     */
    function purchaseReplicant(
        address _purchaser,
        uint256 _traits,
        Generation _generation,
        Gender _gender,
        uint8 _ranking
    )
    external
    onlyMinter
    whenNotPaused
    returns (uint256 tokenId, uint256 serial)
    {
        require(_purchaser != address(0));

        // Require purchaser has at least one full ART token
        require(artContract.balanceOf(_purchaser).div(scaleFactor) >= 1);

        // Require this contract to have an allowance of at least one of the purchaser's tokens
        require(artContract.allowance(_purchaser, address(this)).div(scaleFactor) >= 1);

        // Require gender to be Gender.MALE or Gender.FEMALE
        require(_gender > Gender.ANY);

        // Burn one of purchaser's ART tokens
        artContract.burnArt(_purchaser, 1);

        // Mint Replicant and return tokenId / serial
        (tokenId, serial) = teleporterContract.mintReplicant(_purchaser, _traits, _generation, _gender, _ranking);
        return (tokenId, serial);
    }

}