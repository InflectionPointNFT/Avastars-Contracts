pragma solidity ^0.5.14;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Enumerable.sol";
import "./AvastarTypes.sol";
import "./IAvastarTeleporterThin.sol";
import "./AccessControl.sol";

/**
 * @title Avastar Replicant Token
 * @author Nate Hart & Cliff Hall
 */
contract AvastarReplicantToken is ERC20, AccessControl, AvastarTypes {

    using SafeMath for uint256;

    /**
     * @notice Event emitted when AvastarTeleporter contract is set
     * @param contractAddress the address of the AvastarTeleporter contract
     */
    event TeleporterContractSet(address contractAddress);

    /**
     * @notice Event emitted when an amount of AvastarReplicantTokens are minted for a holder
     * @param holder the address of the holder of the new ART
     * @param amount the number of ART tokens minted for the holder
     */
    event ARTMinted(address indexed holder, uint256 amount);

    /**
     * @notice Event emitted when an amount of a holder's AvastarReplicantTokens are burned
     * @param holder the address of the holder of the new ART
     * @param amount the number of the holder's ART tokens burned
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
    function setTeleporterContract(address _address) external onlySysAdmin {

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
     * @notice Claim and mint ART tokens for an array of Prime IDs
     * If successful, emits an ARTMinted event
     * @param _holder address of holder to claim ART for
     * @param _primeIds an array of Avastar Prime IDs owned by the holder
     */
    function claimArtBulk(address _holder, uint256[] memory _primeIds) public onlySysAdmin {

        // Cannot mint more tokens than the hard cap
        require(getCirculatingArt() <= ART_HARD_CAP, "Hard cap reached, no more tokens can be minted.");

        uint256 amountToMint;
        for (uint256 i = 0; i < _primeIds.length; i++) {

            // If unclaimed, claim and increase tally to mint
            require(artClaimed[_primeIds[i]] == false, "Token previously claimed for Prime");

            // Caller must own the Avastar
            require(teleporterContract.ownerOf(_primeIds[i]) == _holder, "Specified holder must own the specified Primes");

            // Avastar tokens must be Primes
            require(teleporterContract.getAvastarWaveByTokenId(_primeIds[i]) == Wave.PRIME, "Specified Avastars must all be Primes");

            // Claim and bump amount to mint by one
            artClaimed[_primeIds[i]] = true;
            amountToMint = amountToMint.add(1);
        }

        // Mint the tokens
        _mint(_holder, amountToMint.mul(scaleFactor));

        // Send the event identifying the amount minted for the holder
        emit ARTMinted(_holder, amountToMint);
    }

    /**
     * @notice Claim and mint a single ART token
     * If successful, emits an ARTMinted event
     * @param _holder address of holder to claim ART for
     * @param _primeId ID of an Avastar Prime owned by the holder
     */
    function claimArt(address _holder, uint256 _primeId) public onlyMinter {

        // Revert when hard cap is reached
        require(getCirculatingArt() <= ART_HARD_CAP, "Hard cap reached, no more tokens can be minted.");

        // Revert if already claimed
        require(artClaimed[_primeId] == false, "Token previously claimed for Prime");

        // Revert if holder does not own prime
        require(teleporterContract.ownerOf(_primeId) == _holder, "Specified holder must own the specified Prime");

        // Avastar tokens must be Primes
        require(teleporterContract.getAvastarWaveByTokenId(_primeId) == Wave.PRIME, "Specified Avastar must be a Prime");

        // Claim token
        uint256 amountToMint = 1;
        artClaimed[_primeId] = true;

        // Mint the tokens
        _mint(_holder, amountToMint.mul(scaleFactor));

        // Send the event identifying the amount minted for the holder
        emit ARTMinted(_holder, amountToMint);
    }

    /**
     * @notice Burn a given amount of the holder's ART tokens
     * The caller must have an allowance of the holder's tokens equal to or greater than amount to burn
     * If successful, emits an ARTBurned event
     * @param _holder address of holder to burn ART for
     * @param _amount amount of holder's ART to burn
     */
    function burnArt(address _holder, uint256 _amount) external {

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