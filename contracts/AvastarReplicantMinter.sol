pragma solidity 0.5.14;

import "./AvastarTypes.sol";
import "./AccessControl.sol";
import "./IAvastarTeleporterThin.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title Avastar Replicant Minter Proxy
 * @author Cliff Hall
 * @notice Mints Avastar Replicants using the `AvastarTeleporter` contract on behalf of purchasers.
 * Also implements the Avastar Replicant Token (ART) for purchasing Replicants
 */
contract AvastarReplicantMinter is ERC20, AvastarTypes, AccessControl {

    /**
     * @notice Event emitted when `AvastarTeleporter` contract is set
     * @param contractAddress the address of the `AvastarTeleporter` contract
     */
    event TeleporterContractSet(address contractAddress);

    /**
     * @notice Event emitted when an amount of ART tokens are minted for a holder
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
 * @notice Hard cap for number of tokens that can be minted.
 * One ART per Avastar Prime. (25,200 Primes per Series x 5 Generations)
 */
    uint256 public constant ART_HARD_CAP = 126000;

    /**
     * @notice Scale factor for computing single tokens from a fraction
     */
    uint256 private constant scaleFactor = uint256(10) ** uint256(decimals);

    /**
     * @notice Set the address of the `AvastarTeleporter` contract.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * To be used if the Teleporter contract has to be upgraded and a new instance deployed.
     * If successful, emits an `TeleporterContractSet` event.
     * @param _address address of `AvastarTeleporter` contract
     */
    function setTeleporterContract(address _address) external onlySysAdmin whenPaused whenNotUpgraded {

        // Cast the candidate contract to the IAvastarTeleporter interface
        IAvastarTeleporterThin candidateContract = IAvastarTeleporterThin(_address);

        // Verify that we have the appropriate address
        require(candidateContract.isAvastarTeleporter());

        // Set the contract address
        teleporterContract = IAvastarTeleporterThin(_address);

        // Emit the event
        emit TeleporterContractSet(_address);
    }

    /**
 * @notice Check the current circulation of ART tokens
 * @return Number of tokens currently minted
 */
    function getCirculatingArt() public view returns (uint256 circulatingArt) {
        circulatingArt = totalSupply().div(scaleFactor);
    }

    /**
     * @notice Claim and mint ART tokens for an array of Prime IDs
     * If successful, emits an ARTMinted event
     * @param _holder address of holder to claim ART for
     * @param _primeIds an array of Avastar Prime IDs owned by the holder
     */
    function claimArtBulk(address _holder, uint256[] memory _primeIds) public onlySysAdmin whenNotUpgraded {

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

        // Send the event identifying the amount minted for the holder
        emit ARTMinted(_holder, tokensToMint);
    }

    /**
     * @notice Claim and mint a single ART token
     * If successful, emits an `ARTMinted` event
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
        uint256 tokensToMint = 1;
        artClaimed[_primeId] = true;

        // The scaled amount of ART to mint
        uint256 scaledAmount = tokensToMint.mul(scaleFactor);

        // Mint the token
        _mint(_holder, scaledAmount);

        // Send the event identifying the amount minted for the holder
        emit ARTMinted(_holder, tokensToMint);
    }

    /**
     * @notice Burn one of the holder's ART tokens
     * If successful, emits an ARTBurned event
     * @param _holder address of holder to burn ART for
     */
    function burnArt(address _holder) internal {

        // Single token
        uint256 token = 1;

        // Holder must have tokens equal to or greater than burn amount
        _burn(_holder, token.mul(scaleFactor));

        // Send event identifying the amount burned
        emit ARTBurned(_holder, token);
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
        // Burn address can't mint
        require(_purchaser != address(0));

        // Require gender to be Gender.MALE or Gender.FEMALE
        require(_gender > Gender.ANY);

        // Burn one of purchaser's ART tokens
        burnArt(_purchaser);

        // Mint Replicant and return tokenId / serial
        (tokenId, serial) = teleporterContract.mintReplicant(_purchaser, _traits, _generation, _gender, _ranking);
        return (tokenId, serial);
    }

}