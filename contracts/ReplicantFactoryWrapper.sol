pragma solidity 0.5.14;

import "./ReplicantFactory.sol";

/**
 * @title ReplicantFactoryWrapper Wrapper
 * @author Cliff Hall
 * @notice Side contract (not deployed or inherited) that extends
 * `ReplicantFactory` and exposes methods for testing minting caps.
 */
contract ReplicantFactoryWrapper is ReplicantFactory {

    function setPrimeCount(Generation _generation, Series _series, uint16 _count)
    external onlySysAdmin {
        primeCountByGenAndSeries[uint8(_generation)][uint8(_series)] = _count;
    }

    function setReplicantCount(Generation _generation, uint16 _count)
    external onlySysAdmin {
        replicantCountByGeneration[uint8(_generation)] = _count;
    }
}