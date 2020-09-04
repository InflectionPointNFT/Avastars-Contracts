pragma solidity ^0.5.14;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Enumerable.sol";
import "./AvastarTypes.sol";
import "./IAvastarTeleporterThin.sol";
import "./IAvastarReplicantMinter.sol";
import "./AccessControl.sol";
import "./AvastarReplicantMinter.sol";

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
     * @notice Event emitted when AvastarReplicantMinter contract is set
     * @param contractAddress the address of the AvastarReplicantMinter contract
     */
    event ReplicantMinterContractSet(address contractAddress);

    /**
     * @notice Event emitted when an amount of AvastarReplicantTokens are minted for a holder
     * @param holder the address of the holder of the new ART
     * @param amount the number of ART tokens minted for the holder
     */
    event ARTMinted(address indexed holder, uint256 amount);

    /**
     * @notice Event emitted when an amount of a holder's ART tokens are burned
     * @param holder the address of the holder of the new ART
     * @param amount the number of the holder's ART tokens burned
     */
    event ARTBurned(address indexed holder, uint256 amount);

    /**
     * @notice Address of the `AvastarTeleporter` contract
     */
    IAvastarTeleporterThin private teleporterContract ;

    /**
     * @notice Address of the `AvastarReplicantMinter` contract
     */
    address private replicantMinterContract ;

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
     * @notice Set the address of the `AvastarReplicantMinter` contract.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * To be used if the Teleporter contract has to be upgraded and a new instance deployed.
     * If successful, emits an `ReplicantMinterContractSet` event.
     * @param _address address of `AvastarReplicantMinter` contract
     */
    function setReplicantMinterContract(address _address) external whenPaused onlySysAdmin {

        // Cast the candidate contract to the IAvastarReplicantMinter interface
        IAvastarReplicantMinter candidateContract = IAvastarReplicantMinter(_address);

        // Verify that we have the appropriate address
        require(candidateContract.isAvastarReplicantMinter());

        // Set the contract address
        replicantMinterContract = _address;

        // Emit the event
        emit ReplicantMinterContractSet(_address);
    }

    /**
     * @notice Set the address of the `AvastarTeleporter` contract.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * To be used if the Teleporter contract has to be upgraded and a new instance deployed.
     * If successful, emits an `TeleporterContractSet` event.
     * @param _address address of `AvastarTeleporter` contract
     */
    function setTeleporterContract(address _address) external whenPaused onlySysAdmin {

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
    function claimArtBulk(address _holder, uint256[] memory _primeIds, uint256 _allowance) public onlySysAdmin {

        // Cannot mint more tokens than the hard cap
        require(getCirculatingArt() <= ART_HARD_CAP, "Hard cap reached, no more tokens can be minted.");

        uint256 tokensToMint;
        for (uint256 i = 0; i < _primeIds.length; i++) {

            // If unclaimed, claim and increase tally to mint
            require(artClaimed[_primeIds[i]] == false, "Token previously claimed for Prime");

            // Caller must own the Avastar
            require(teleporterContract.ownerOf(_primeIds[i]) == _holder, "Specified holder must own the specified Primes");

            // Avastar tokens must be Primes
            require(teleporterContract.getAvastarWaveByTokenId(_primeIds[i]) == Wave.PRIME, "Specified Avastars must all be Primes");

            // Claim and bump amount to mint by one
            artClaimed[_primeIds[i]] = true;
            tokensToMint = tokensToMint.add(1);
        }

        // The scaled amount of ART to mint
        uint256 scaledAmount = tokensToMint.mul(scaleFactor);

        // Mint the tokens
        _mint(_holder, scaledAmount);

        // Approve AvastarReplicantMinter contract to burn the tokens when it mints a Replicant for the holder
        // Auto-approval use case doesn't really run afoul of the known `approve` issue
        _approve(_holder, replicantMinterContract, _allowance.add(scaledAmount));

        // Send the event identifying the amount minted for the holder
        emit ARTMinted(_holder, tokensToMint);
    }

    /**
     * @notice Claim and mint a single ART token
     * If successful, emits an `ARTMinted` event
     * @param _holder address of holder to claim ART for
     * @param _primeId ID of an Avastar Prime owned by the holder
     * @param _allowance the current allowance of the `AvastarReplicantMinter` for the holder
     */
    function claimArt(address _holder, uint256 _primeId, uint256 _allowance) public onlyMinter {

        // Revert when hard cap is reached
        require(getCirculatingArt() <= ART_HARD_CAP, "Hard cap reached, no more tokens can be minted.");

        // Revert if already claimed
        require(artClaimed[_primeId] == false, "Token previously claimed for Prime");

        // Revert if holder does not own prime
        require(teleporterContract.ownerOf(_primeId) == _holder, "Specified holder must own the specified Prime");

        // Avastar tokens must be Primes
        require(teleporterContract.getAvastarWaveByTokenId(_primeId) == Wave.PRIME, "Specified Avastar must be a Prime");

        // Claim token
        uint256 tokensToMint = 1;
        artClaimed[_primeId] = true;

        // The scaled amount of ART to mint
        uint256 scaledAmount = tokensToMint.mul(scaleFactor);

        // Mint the token
        _mint(_holder, scaledAmount);

        // Approve AvastarReplicantMinter contract to burn the tokens when it mints a Replicant for the holder
        // Auto-approval use case doesn't really run afoul of the known `approve` issue
        _approve(_holder, replicantMinterContract, _allowance.add(scaledAmount));

        // Send the event identifying the amount minted for the holder
        emit ARTMinted(_holder, tokensToMint);
    }

    /**
     * @notice Burn one of the holder's ART tokens
     * If successful, emits an ARTBurned event
     * The caller must have an allowance equal to one of the holder's tokens
     * @param _holder address of holder to burn ART for
     */
    function burnArt(address _holder) external {

        // Single token
        uint256 token = 1;

        // Holder must have tokens equal to or greater than burn amount
        // Caller must have an allowance of amount tokens of holder
        _burnFrom(_holder, token.mul(scaleFactor));

        // Send event identifying the amount burned
        emit ARTBurned(_holder, token);
    }

    /**
     * @notice Check the current circulation of ART tokens
     * @return Number of tokens currently minted
     */
    function getCirculatingArt() public view returns (uint256 circulatingArt) {
        circulatingArt = totalSupply().div(scaleFactor);
    }

}