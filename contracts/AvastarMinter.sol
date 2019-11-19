pragma solidity ^0.5.12;

import "./AvastarTypes.sol";
import "./IAvastarTeleporter.sol";
import "./AccessControl.sol";

/**
 * @title Avastar Minter Proxy
 * @author Cliff Hall
 * @notice Mints Avastars using the `AvastarTeleporter` contract on behalf of depositors.
 * Allows system admin to set current generation and series.
 * Manages accounting of depositor and franchise balances.
 */
contract AvastarMinter is AvastarTypes, AccessControl {

    /**
     * @notice Event emitted when the current Generation is changed
     * @param currentGeneration the new value of currentGeneration
     */
    event CurrentGenerationSet(Generation currentGeneration);

    /**
     * @notice Event emitted when the current Series is changed
     * @param currentSeries the new value of currentSeries
     */
    event CurrentSeriesSet(Series currentSeries);

    /**
     * @notice Event emitted when ETH is deposited or withdrawn by a depositor
     * @param depositor the address who deposited or withdrew ETH
     * @param balance the depositor's resulting ETH balance in the contract
     */
    event DepositorBalance(address indexed depositor, uint256 balance);

    /**
     * @notice Event emitted upon the withdrawal of the franchise's balance
     * @param owner the contract owner
     * @param amount total ETH withdrawn
     */
    event FranchiseBalanceWithdrawn(address indexed owner, uint256 amount);

    /**
     * @notice Event emitted when AvastarTeleporter contract is set
     * @param contractAddress the address of the AvastarTeleporter contract
     */
    event TeleporterContractSet(address contractAddress);

    /**
     * @notice Address of the AvastarTeleporter contract
     */
    IAvastarTeleporter private teleporterContract ;

    /**
     * @notice The current Generation of Avastars being minted
     */
    Generation private currentGeneration;

    /**
     * @notice The current Series of Avastars being minted
     */
    Series private currentSeries;

    /**
     * @notice Track the deposits made by address
     */
    mapping (address => uint256) private depositsByAddress;

    /**
     * @notice Current total of unspent deposits by all depositors
     */
    uint256 private unspentDeposits;

    /**
     * @notice Set the address of the AvastarTeleporter contract.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * @param _address address of AvastarTeleporter contract
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
     * @notice Set the Generation to be minted.
     * Resets `currentSeries` to `Series.ONE`.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * Emits `GenerationSet` event with new value of `currentGeneration`.
     * @param _generation the new value for currentGeneration
     */
    function setCurrentGeneration(Generation _generation) external onlySysAdmin whenPaused whenNotUpgraded {
        currentGeneration = _generation;
        emit CurrentGenerationSet(currentGeneration);
        setCurrentSeries(Series.ONE);
    }

    /**
     * @notice Set the Series to be minted.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * Emits `CurrentSeriesSet` event with new value of `currentSeries`.
     * @param _series the new value for currentSeries
     */
    function setCurrentSeries(Series _series) public onlySysAdmin whenPaused whenNotUpgraded {
        currentSeries = _series;
        emit CurrentSeriesSet(currentSeries);
    }

    /**
     * @notice Allow owner to check the withdrawable franchise balance.
     * Remaining balance must be enough for all unspent deposits to be withdrawn by depositors.
     * Invokable only by owner role.
     * @return the available franchise balance
     */
    function checkFranchiseBalance() external view onlyOwner returns (uint256) {
        return uint256(address(this).balance).sub(unspentDeposits);
    }

    /**
     * @notice Allow an owner to withdraw the franchise balance.
     * Invokable only by owner role.
     * Entire franchise balance is transferred to `msg.sender`.
     * Emits `FranchiseBalanceWithdrawn` event with amount withdrawn.
     * @return amount withdrawn
     */
    function withdrawFranchiseBalance() external onlyOwner returns (uint256) {
        uint256 franchiseBalance = uint256(address(this).balance).sub(unspentDeposits);
        require(franchiseBalance > 0);
        msg.sender.transfer(franchiseBalance);
        emit FranchiseBalanceWithdrawn(msg.sender, franchiseBalance);
        return franchiseBalance;
    }

    /**
     * @notice Allow anyone to deposit ETH.
     * Before contract will mint on behalf of a user, they must have sufficient ETH on deposit.
     * Invokable by any address (other than 0) when contract is not paused.
     * Must have a non-zero ETH value.
     * Emits DepositorBalance event with depositor's resulting balance.
     */
    function deposit() external payable whenNotPaused {
        require(msg.value > 0);
        require(msg.sender != address(0));
        depositsByAddress[msg.sender] = depositsByAddress[msg.sender].add(msg.value);
        unspentDeposits = unspentDeposits.add(msg.value);
        emit DepositorBalance(msg.sender, depositsByAddress[msg.sender]);
    }

    /**
     * @notice Allow anyone to check their deposit balance.
     * Invokable by any address (other than 0).
     * @return the depositor's current ETH balance in the contract
     */
    function checkDepositorBalance() external view returns (uint256){
        require(msg.sender != address(0));
        return depositsByAddress[msg.sender];
    }

    /**
     * @notice Allow a depositor with a balance to withdraw it.
     * Invokable by any address (other than 0) with an ETH balance on deposit.
     * Entire depositor balance is transferred to `msg.sender`.
     * Emits `DepositorBalance` event of 0 amount once transfer is complete.
     * @return amount withdrawn
     */
    function withdrawDepositorBalance() external returns (uint256) {
        require(msg.sender != address(0));
        uint256 depositorBalance = depositsByAddress[msg.sender];
        require(depositorBalance > 0 && address(this).balance >= depositorBalance);
        depositsByAddress[msg.sender] = 0;
        unspentDeposits = unspentDeposits.sub(depositorBalance);
        msg.sender.transfer(depositorBalance);
        emit DepositorBalance(msg.sender, depositsByAddress[msg.sender]);
        return depositorBalance;
    }

    /**
     * @notice Mint an Avastar Prime for a purchaser who has previously deposited funds.
     * Invokable only by minter role, when contract is not paused.
     * Minted token will be owned by `_purchaser` address.
     * This function does not emit an event, but if successful, the `AvastarTeleporter` contract will emit a `NewPrime` event.
     * @param _purchaser address that will own the token
     * @param _price price in ETH of token, removed from purchaser's deposit balance
     * @param _traits the Avastar's Trait hash
     * @param _gender the Avastar's Gender
     * @param _ranking the Avastar's Ranking
     */
    function purchasePrime(
        address _purchaser,
        uint256 _price,
        uint256 _traits,
        Gender _gender,
        uint8 _ranking
    )
    external
    onlyMinter
    whenNotPaused
    returns (uint256, uint256)
    {
        require(_purchaser != address(0));
        require (depositsByAddress[_purchaser] >= _price);
        require(_gender > Gender.ANY);
        depositsByAddress[_purchaser] = depositsByAddress[_purchaser].sub(_price);
        unspentDeposits = unspentDeposits.sub(_price);
        uint256 tokenId;
        uint256 serial;
        (tokenId, serial) = teleporterContract.mintPrime(_purchaser, _traits, currentGeneration, currentSeries, _gender, _ranking);
        emit DepositorBalance(_purchaser, depositsByAddress[_purchaser]);
        return (tokenId, serial);
    }

    /**
     * @notice Mint an Avastar Replicant for a purchaser who has previously deposited funds.
     * Invokable only by minter role, when contract is not paused.
     * Minted token will be owned by `_purchaser` address.
     * This function does not emit an event, but if successful, the `AvastarTeleporter` contract will emit a `NewReplicant` event.
     * @param _purchaser address that will own the token
     * @param _price price in ETH of token, removed from purchaser's deposit balance
     * @param _traits the Avastar's Trait hash
     * @param _generation the Avastar's Generation
     * @param _gender the Avastar's Gender
     * @param _ranking the Avastar's Ranking
     */
    function purchaseReplicant(
        address _purchaser,
        uint256 _price,
        uint256 _traits,
        Generation _generation,
        Gender _gender,
        uint8 _ranking
    )
    external
    onlyMinter
    whenNotPaused
    returns (uint256, uint256)
    {
        require(_purchaser != address(0));
        require (depositsByAddress[_purchaser] >= _price);
        require(_gender > Gender.ANY);
        depositsByAddress[_purchaser] = depositsByAddress[_purchaser].sub(_price);
        unspentDeposits = unspentDeposits.sub(_price);
        uint256 tokenId;
        uint256 serial;
        (tokenId, serial) = teleporterContract.mintReplicant(_purchaser, _traits, _generation, _gender, _ranking);
        emit DepositorBalance(_purchaser, depositsByAddress[_purchaser]);
        return (tokenId, serial);
    }

}