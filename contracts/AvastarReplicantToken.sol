pragma solidity ^0.5.14;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./IERC721Enumerable.sol";
import "./AvastarTypes.sol";
import "./IAvastarTeleporterThin.sol";
import "./ReentrancyGuard.sol";

/**
 * @title Avastar Replicant Token
 * @author Nate Hart & Cliff Hall
 */
contract AvastarRepicantToken is ERC20, ReentrancyGuard, Ownable, AvastarTypes {

    using SafeMath for uint256;

    /**
     * @notice Event emitted when AvastarTeleporter contract is set
     * @param contractAddress the address of the AvastarTeleporter contract
     */
    event TeleporterContractSet(address contractAddress);

    /**
     * @notice Event emitted when an amount of AvastarReplicantTokens are minted for a holder
     * @param holder the address of the holder of the new ART
     */
    event ARTMinted(address indexed holder, uint256 amount);

    /**
     * @notice Event emitted when an amount of a holder's AvastarReplicantTokens are burned
     * @param holder the address of the holder of the new ART
     */
    event ARTBurned(address indexed holder, uint256 amount);

    /**
     * @notice Address of the AvastarTeleporter contract
     */
    IAvastarTeleporterThin private teleporterContract ;

    /**
     * @notice ERC20 decimals
     */
    uint8 constant public decimals = 18;

    /**
     * @notice ERC20 name value
     */
    string constant public name = "Avastar Replicant Token";

    /**
     * @notice ERC20 symbol
     */
    string constant public symbol = "ART";

    /**
     * @notice Mapping of Prime ID to boolean indicating if an ART has been claimed for it yet
     */
    mapping (uint256 => bool) private artClaimed;

    /**
     * @notice Scale factor for computing single tokens from a fraction
     */
    uint256 constant scaleFactor = 10 ** decimals;

    /**
     * @notice Hard cap for number of tokens that can be minted.
     * One ART per Avastar Prime. (25,200 Primes per Series x 5 Generations)
     */
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
        require(candidateContract.isAvastarTeleporter());

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
     * @notice Claim ART tokens for an array of Prime IDs
     */
    function claimArt(uint256[] memory primeId) public nonReentrant {
        require(getCirculatingArt() <= ART_HARD_CAP);
        uint256 amountToMint;

        for(uint256 i = 0; i < primeId.length; i++) {
            if (teleporterContract.ownerOf(primeId[i]) == msg.sender) {

                // Avastar tokens must be Primes
                require (teleporterContract.getAvastarWaveByTokenId(primeId[i]) == Wave.PRIME);

                // If unclaimed, claim and increase tally to mint
                if (artClaimed[primeId[i]] == false) {
                    artClaimed[primeId[i]] = true;
                    amountToMint = amountToMint + 1;
                }
            }
        }

        // Mint the tokens
        _mint(msg.sender, amountToMint.mul(scaleFactor));
        emit MintART(msg.sender, amountToMint);
    }

    /**
     * @notice Burn a given amount of the holder's ART tokens
     * The caller must have an allowance of the holder's tokens equal to or greater than amount to burn
     */
    function burnArt(address holder, uint256 amount) external nonReentrant {

        // Caller must have an allowance of amount tokens of holder
        _burnFrom(holder, artToBurn.mul(scaleFactor));

        // Send event identifying the amount burned
        emit ARTBurned(holder, amount);
    }

    /**
     * @notice Check the current circulation of ART tokens
     * @return Number of tokens currently minted
     */
    function getCirculatingArt() public view returns (uint256 circulatingArt) {
        circulatingArt = totalSupply().div(scaleFactor);
    }

}