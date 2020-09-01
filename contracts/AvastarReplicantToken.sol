pragma solidity ^0.5.14;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Enumerable.sol";
import "./AvastarTypes.sol";
import "./IAvastarTeleporterThin.sol";
import "./ReentrancyGuard.sol";

/**
 * @title Avastar Replicant Token
 * @author Nate Hart & Cliff Hall
 */
contract AvastarReplicantToken is ERC20, ReentrancyGuard, Ownable, AvastarTypes {

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
    mapping(uint256 => bool) private artClaimed;

    /**
     * @notice Scale factor for computing single tokens from a fraction
     */
    uint256 private constant scaleFactor = uint256(10) ** uint256(decimals);

    /**
     * @notice Hard cap for number of tokens that can be minted.
     * One ART per Avastar Prime. (25,200 Primes per Series x 5 Generations)
     */
    uint256 public constant ART_HARD_CAP = 126000;

    /**
     * @notice Set the address of the `AvastarTeleporter` contract.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * To be used if the Teleporter contract has to be upgraded and a new instance deployed.
     * If successful, emits an `TeleporterContractSet` event.
     * @param _address address of `AvastarTeleporter` contract
     */
    function setTeleporterContract(address _address) external onlyOwner {

        // Cast the candidate contract to the IAvastarTeleporterThin interface
        IAvastarTeleporterThin candidateContract = IAvastarTeleporterThin(_address);

        // Verify that we have the appropriate address
        require(candidateContract.isAvastarTeleporter());

        // Set the contract address
        teleporterContract = IAvastarTeleporterThin(_address);

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
    function claimArt(uint256[] memory _primeIds) public nonReentrant {

        // Cannot mint more tokens than the hard cap
        require(getCirculatingArt() <= ART_HARD_CAP, "Hard cap reached, no more tokens can be minted.");

        uint256 amountToMint;
        for (uint256 i = 0; i < _primeIds.length; i++) {

            // If unclaimed, claim and increase tally to mint
            require(artClaimed[_primeIds[i]] == false, "Token previously claimed for Prime");

            // Caller must own the Avastar
            require(teleporterContract.ownerOf(_primeIds[i]) == msg.sender, "You must own the specified Primes");

            // Avastar tokens must be Primes
            require(teleporterContract.getAvastarWaveByTokenId(_primeIds[i]) == Wave.PRIME, "Specified Avastars must be Primes");

            // Claim and bump amount to mint by one
            artClaimed[_primeIds[i]] = true;
            amountToMint = amountToMint.add(1);
        }

        // Mint the tokens
        _mint(msg.sender, amountToMint.mul(scaleFactor));

        // Send the event identifying the amount minted for the caller
        emit ARTMinted(msg.sender, amountToMint);
    }

    /**
     * @notice Burn a given amount of the holder's ART tokens
     * The caller must have an allowance of the holder's tokens equal to or greater than amount to burn
     */
    function burnArt(address _holder, uint256 _amount) external nonReentrant {

        // Holder must have tokens equal to or greater than burn amount
        // Caller must have an allowance of amount tokens of holder
        _burnFrom(_holder, _amount.mul(scaleFactor));

        // Send event identifying the amount burned
        emit ARTBurned(_holder, _amount);
    }

    /**
     * @notice Check the current circulation of ART tokens
     * @return Number of tokens currently minted
     */
    function getCirculatingArt() public view returns (uint256 circulatingArt) {
        circulatingArt = totalSupply().div(scaleFactor);
    }

}