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
     * @notice Event emitted when AvastarMetadata contract is set
     * @param contractAddress the address of the AvastarMetadata contract
     */
    event MetadataContractSet(address contractAddress);

    /**
 * @notice Address of the AvastarTeleporter contract
 */
    IAvastarMetadata private metadataContract ;

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
    function setMetadataContract(address _address)
    external onlySysAdmin whenPaused whenNotUpgraded
    {
        // Cast the candidate contract to the IAvastarMetadata interface
        IAvastarMetadata candidateContract = IAvastarMetadata(_address);

        // Verify that we have the appropriate address
        require(candidateContract.isAvastarMetadata());

        // Set the contract address
        metadataContract = IAvastarMetadata(_address);

        // Emit the event
        emit MetadataContractSet(_address);
    }

    /**
     * @notice Get view URI for a given Avastar Token ID.
     * Reverts if given token id is not a valid Avastar Token ID.
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return uri the off-chain URI to view the Avastar on the Avastars website
     */
    function viewURI(uint _tokenId)
    external view
    returns (string memory uri)
    {
        require(_tokenId < avastars.length);
        return metadataContract.viewURI(_tokenId);
    }

    /**
     * @notice Get media URI for a given Avastar Token ID.
     * Reverts if given token id is not a valid Avastar Token ID.
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return uri the off-chain URI to the Avastar image
     */
    function mediaURI(uint _tokenId)
    external view
    returns (string memory uri)
    {
        require(_tokenId < avastars.length);
        return metadataContract.mediaURI(_tokenId);
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
        return metadataContract.tokenURI(_tokenId);
    }

    /**
     * @notice Get human-readable metadata for a given Avastar by Token ID.
     * @param _tokenId the token id of the given Avastar
     * @return metadata the Avastar's human-readable metadata
     */
    function getAvastarMetadata(uint256 _tokenId)
    public view
    returns (string memory metadata)
    {
        return metadataContract.getAvastarMetadata(_tokenId);
    }

    /**
     * @notice Approve a handler to manage Trait replication for a set of Avastar Primes.
     * If successful, emits a `TraitAccessApproved` event.
     * @param _handler the address approved for Trait access
     * @param _primeIds the token ids for which to approve the handler
     */
    function approveTraitAccess(address _handler, uint256[] calldata _primeIds)
    external
    {
        require(_handler != address(0));
        uint256 primeId;
        for (uint8 i = 0; i < _primeIds.length; i++) {
            primeId = _primeIds[i];
            require(msg.sender == super.ownerOf(primeId));
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
        // Make certain caller is token owner OR approved handler
        require(msg.sender == super.ownerOf(_primeId) || msg.sender == traitHandlerByPrimeTokenId[_primeId]);

        // Get the Avastar and make sure it's a Prime
        Avastar memory avastar = avastars[_primeId];
        require(avastar.wave == Wave.PRIME);

        // Get the Prime
        Prime memory prime = primesByGeneration[uint8(avastar.generation)][avastar.serial];

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
        require(usedAtLeast1);

        // Clear trait handler
        traitHandlerByPrimeTokenId[_primeId] = address(0);

        // Emit the TraitsUsed event
        emit TraitsUsed(msg.sender, _primeId, prime.replicated);
    }

}