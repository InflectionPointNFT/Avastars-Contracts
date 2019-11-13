pragma solidity ^0.5.12;

import "./ReplicantFactory.sol";

/**
 * @title AvastarTeleporter
 * @author Cliff Hall
 * @notice Management of Avastar Primes, Replicants, and Traits
 */
contract AvastarTeleporter is ReplicantFactory {

    /**
     * @notice Event emitted when a handler is approved for Trait replication
     */
    event TraitAccessApproved(address indexed handler, uint256[] primeIds);

    /**
     * @notice Event emitted when a handler replicates Traits
     * @param handler the address marking the Traits as used
     * @param primeId the token id of the Prime supplying the Traits
     * @param used the array of flags representing the Primes resulting Trait usage
     */
    event TraitsUsed(address indexed handler, uint256 primeId, bool[] used);

    /**
     * @notice Acknowledge contract is AvastarTeleporter
     * @return always true
     */
    function isAvastarTeleporter() external pure returns (bool) {return true;}

    /**
     * @notice Approve a handler to manage trait access for a set of Avastar Primes
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
     * @dev Caller must be token owner OR the approved handler
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

}