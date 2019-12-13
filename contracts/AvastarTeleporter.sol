pragma solidity ^0.5.12;

import "./ReplicantFactory.sol";

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
     * @notice Event emitted when metadata base changes
     * @param tokenUriBase the base URI for tokenURI calls
     */
    event TokenUriBaseSet(string tokenUriBase);

    /**
     * @notice Acknowledge contract is `AvastarTeleporter`
     * @return always true
     */
    function isAvastarTeleporter() external pure returns (bool) {return true;}

    /**
     * @notice Approve a handler to manage Trait replication for a set of Avastar Primes.
     * If successful, emits a `TraitAccessApproved` event.
     * @param _handler the address approved for Trait access
     * @param _primeIds the token ids for which to approve the handler
     */
    function approveTraitAccess(address _handler, uint256[] calldata _primeIds) external {

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
    function useTraits(uint256 _primeId, bool[] calldata _traitFlags) external {

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

    /**
     * @notice Render the Avastar Prime or Replicant from the original on-chain art.
     * @param _tokenId the token ID of the Prime or Replicant
     * @return svg the fully rendered SVG representation of the Avastar
     */
    function renderAvastar(uint256 _tokenId)
    external view
    returns (string memory svg) {
        require(_tokenId < avastars.length);
        Avastar memory avastar = avastars[_tokenId];
        uint256 traits = (avastar.wave == Wave.PRIME)
            ? primesByGeneration[uint8(avastar.generation)][uint256(avastar.serial)].traits
            : replicantsByGeneration[uint8(avastar.generation)][uint256(avastar.serial)].traits;
        svg = assembleArtwork(avastar.generation, traits);
    }

    /**
     * @notice Get token URI for a given Avastar Token ID.
     * Reverts if given token id is not a valid Avastar Token ID.
     * @param _tokenId the Token ID of a previously minted Avastar Prime or Replicant
     * @return uri the off-chain URI to the JSON metadata for the given Avastar
     */
    function tokenURI(uint _tokenId)
    external view
    returns (string memory uri)
    {
        require(_tokenId < avastars.length);
        string memory id = uintToStr(_tokenId);
        uri = strConcat(tokenUriBase, id);
    }

    /**
      * @notice Set the address of the AvastarMetadata contract.
      * Only invokable by system admin role, when contract is paused and not upgraded.
      * If successful, emits an `MetadataContractSet` event.
      * @param _tokenUriBase base for the tokenURI
      */
    function setTokenUriBase(string calldata _tokenUriBase)
    external onlySysAdmin whenPaused whenNotUpgraded
    {
        // Set the base for metadata tokenURI
        tokenUriBase = _tokenUriBase;

        // Emit the event
        emit TokenUriBaseSet(_tokenUriBase);
    }



}