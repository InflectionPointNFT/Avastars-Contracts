pragma solidity ^0.5.14;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IERC721Enumerable.sol";
import "./IAvastarTeleporterThin.sol";
import "./ReentrancyGuard.sol";

/**
 * @title Avastar Replicant Token
 * @author Nate Hart & Cliff Hall
 */
contract AvastarRepicantToken is ERC20, ReentrancyGuard, Ownable {

    /**
     * @notice Event emitted when AvastarTeleporter contract is set
     * @param contractAddress the address of the AvastarTeleporter contract
     */
    event TeleporterContractSet(address contractAddress);

    /**
     * @notice Address of the AvastarTeleporter contract
     */
    IAvastarTeleporterThin private teleporterContract ;

    using SafeMath for uint256;

    event MintART(address mintingAddress, uint256 amount);
    event BurnART(uint256 amount);


    mapping (uint256 => bool) private artClaimed;

    uint8 constant public decimals = 18;
    string constant public name = "Avastar Replicant Token";
    string constant public symbol = "ART";


    uint256 constant scaleFactor = 10 ** decimals;

    // One ART per Avastar Prime. (25,200 Primes per Series x 5 Generations)
    uint256 constant public ART_HARD_CAP = 126000;

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
        require(candidateContract.isAvastarReplicantToken());

        // Set the contract address
        teleporterContract = IAvastarTeleporter(_address);

        // Emit the event
        emit TeleporterContractSet(_address);
    }

    /**
     * @notice Acknowledge contract is `isAvastarReplicantToken`
     * @return always true
     */
    function isAvastarReplicantToken() external pure returns (bool) {return true;}

    /**
     * TODO: Ensure that each token id refers to a Prime and not Replicant.
     * This method assumes the id is a Prime. As it stands, a user can get
     * an ART for every replicant they own in addition to the primes they own
     */
    function claimArt(uint256[] memory primeId) public nonReentrant {
        require(getCirculatingArt() <= ART_HARD_CAP);
        uint256 amountToMint;

        for(uint256 i = 0; i < primeId.length; i++){
            if (teleporterContract.ownerOf(primeId[i]) == msg.sender) {
                if (artClaimed[primeId[i]] == false) {
                    artClaimed[primeId[i]] = true;
                    amountToMint = amountToMint + 1;
                }
            }

            artClaimed[primeId[i]] = true;
        }

        _mint(msg.sender, amountToMint.mul(10**4));
        emit MintART(msg.sender, amountToMint);
    }

    /**
     * TODO: Ensure that only Prime token ids are counted
     * Two passes:
     * 1) get the owner's tokens with teleporterContract.tokenOfOwnerByIndex
     * 2) filter out the owners replicants from that list with teleporterContract.
     */
    function avastarsOwned(address userAddress) public view returns (uint256[] memory primeIds) {
        uint256 x = 0;

        for(uint256 i = 0; i < 25000; i++){
            if (teleporterContract.ownerOf(i) == userAddress) {
                primeIds[x] = i;
                x = x + 1;
            }
        }
    }

    function getCirculatingArt() public view returns (uint256 circulatingArt) {
        circulatingArt = totalSupply().div(scaleFactor);
    }

    /**
     * Burn a certain amount of the given holder's ART tokens
     * The caller must have an allowance of the holder's tokens equal to or greater than amount requested
     *
     */
    function burnArt(address holder, uint256 artToBurn) external nonReentrant {
        _burnFrom(holder, artToBurn.mul(scaleFactor));
        emit BurnART(artToBurn);
    }
}