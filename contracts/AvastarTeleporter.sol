pragma solidity ^0.5.12;

import "./ReplicantFactory.sol";
import "./IAvastarMetadata.sol";

/**
 * @title AvastarTeleporter
 * @author Cliff Hall
 * @notice Management of Avastar Primes, Replicants, and Traits
 */
contract AvastarTeleporter is ReplicantFactory {

    /**
     * @notice Event emitted when a handler is approved to manage Trait replication.
     * @param handler the address being approved to Trait replication
     * @param primeIds the array of Avastar Prime tokenIds the handler can use
     */
    event TraitAccessApproved(address indexed handler, uint256[] primeIds);

    /**
     * @notice Event emitted when a handler replicates Traits.
     * @param handler the address marking the Traits as used
     * @param primeId the token id of the Prime supplying the Traits
     * @param used the array of flags representing the Primes resulting Trait usage
     */
    event TraitsUsed(address indexed handler, uint256 primeId, bool[] used);

    /**
     * @notice Event emitted when AvastarMetadata contract address is set
     * @param contractAddress the address of the new AvastarMetadata contract
     */
    event MetadataContractAddressSet(address contractAddress);

    /**
     * @notice Address of the AvastarMetadata contract
     */
    address private metadataContractAddress;

    /**
     * @notice Acknowledge contract is `AvastarTeleporter`
     * @return always true
     */
    function isAvastarTeleporter() external pure returns (bool) {return true;}

    /**
     * @notice Set the address of the `AvastarMetadata` contract.
     * Only invokable by system admin role, when contract is paused and not upgraded.
     * If successful, emits an `TeleporterContractSet` event.
     * @param _address address of AvastarTeleporter contract
     */
    function setMetadataContractAddress(address _address)
    external onlySysAdmin whenPaused whenNotUpgraded
    {
        // Cast the candidate contract to the IAvastarMetadata interface
        IAvastarMetadata candidateContract = IAvastarMetadata(_address);

        // Verify that we have the appropriate address
        require(candidateContract.isAvastarMetadata());

        // Set the contract address
        metadataContractAddress = _address;

        // Emit the event
        emit MetadataContractAddressSet(_address);
    }

    /**
     * @notice Get the current address of the `AvastarMetadata` contract.
     * return contractAddress the address of the `AvastarMetadata` contract
     */
    function getMetadataContractAddress()
    external view
    returns (address contractAddress) {
        return metadataContractAddress;
    }

    /**
     * @notice Get token URI for a given Avastar Token ID.
     * Reverts if given token id is not a valid Avastar Token ID.
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return uri the Avastar's off-chain JSON metadata URI
     */
    function tokenURI(uint _tokenId)
    external view
    returns (string memory uri)
    {
        require(_tokenId < avastars.length);
        return IAvastarMetadata(metadataContractAddress).tokenURI(_tokenId);
    }

    /**
     * @notice Approve a handler to manage Trait replication for a set of Avastar Primes.
     * Accepts up to 256 primes for approval per call.
     * If successful, emits a `TraitAccessApproved` event.
     * @param _handler the address approved for Trait access
     * @param _primeIds the token ids for which to approve the handler
     */
    function approveTraitAccess(address _handler, uint256[] calldata _primeIds)
    external
    {
        require(_primeIds.length > 0 && _primeIds.length <= 256);
        uint256 primeId;
        for (uint8 i = 0; i < _primeIds.length; i++) {
            primeId = _primeIds[i];
            require(primeId < avastars.length);
            require(msg.sender == super.ownerOf(primeId), "Must be token owner");
            traitHandlerByPrimeTokenId[primeId] = _handler;
        }

        // Emit the event
        emit TraitAccessApproved(_handler, _primeIds);
    }

    /**
     * @notice Mark some or all of an Avastar Prime's traits used.
     * Caller must be the token owner OR the approved handler.
     * If successful, emits a `TraitsUsed` event.
     * @param _primeId the token id for the Prime whose Traits are to be used
     * @param _traitFlags an array of no more than 32 booleans representing the Traits to be used
     */
    function useTraits(uint256 _primeId, bool[] calldata _traitFlags)
    external
    {
        // Make certain token id is valid
        require(_primeId < avastars.length);

        // Make certain caller is token owner OR approved handler
        require(msg.sender == super.ownerOf(_primeId) || msg.sender == traitHandlerByPrimeTokenId[_primeId],
        "Must be token owner or approved handler" );

        // Get the Avastar and make sure it's a Prime
        Avastar memory avastar = avastars[_primeId];
        require(avastar.wave == Wave.PRIME);

        // Get the Prime
        Prime storage prime = primesByGeneration[uint8(avastar.generation)][avastar.serial];

        // Set the flags.
        // _traitFlags array need only have as many flags as the highest trait slot to use.
        bool usedAtLeast1;
        for (uint8 i = 0; i < prime.replicated.length; i++) {
            if (_traitFlags.length > i ) {
                if ( !prime.replicated[i] && _traitFlags[i] ) {
                    prime.replicated[i] = true;
                    usedAtLeast1 = true;
                }
            } else {
                break;
            }
        }

        // Revert if no flags changed
        require(usedAtLeast1, "No reusable traits specified");

        // Clear trait handler
        traitHandlerByPrimeTokenId[_primeId] = address(0);

        // Emit the TraitsUsed event
        emit TraitsUsed(msg.sender, _primeId, prime.replicated);
    }

}