# Unit Test Output
<!-- tabs:start -->

#### ** Tests by Contract **
```
  Contract: AccessControl
    ✓ should not allow non-sysadmins to pause the contract (22195 gas)
    ✓ should allow a sysadmin to pause the contract when unpaused (44617 gas)
    ✓ should not allow non-sysadmins to unpause the contract (22218 gas)
    ✓ should allow a sysadmin to unpause the contract when paused (15468 gas)
    ✓ should allow a sysadmin to add a minter (45570 gas)
    ✓ should allow a sysadmin to add a sysadmin (45604 gas)
    ✓ should allow a sysadmin to add an owner (45649 gas)
    ✓ should allow a sysadmin to add another owner (45649 gas)
    ✓ should not allow non-sysadmins to set upgrade the contract when unpaused (22711 gas)
    ✓ should not allow a sysadmin to upgrade the contract when unpaused (23534 gas)
    ✓ should not allow non-sysadmins to upgrade the contract when paused (82796 gas)
    ✓ should not allow sysadmins to upgrade the contract with a zero address even if paused (84251 gas)
    ✓ should allow a sysadmin to upgrade the contract when paused (75990 gas)
    ✓ should not allow a sysadmin to unpause contract after the contract is upgraded (23878 gas)
    ✓ should not allow a sysadmin to remove an owner (22624 gas)
    ✓ should not allow a sysadmin to remove a minter (22612 gas)
    ✓ should not allow a sysadmin to remove a sysadmin (22624 gas)
    ✓ should not allow a minter to remove an owner (22624 gas)
    ✓ should not allow a minter to remove a minter (22612 gas)
    ✓ should not allow a minter to remove a sysadmin (22624 gas)
    ✓ should allow an owner to remove a sysadmin (17627 gas)
    ✓ should allow an owner to remove a minter (17615 gas)
    ✓ should allow an owner to remove an owner (17627 gas)
    ✓ should not allow owner to remove own roles (22667 gas)

  Contract: AvastarBase
    ✓ should allow descendent contracts to concatenate two strings
    ✓ should allow descendent contracts to convert a uint to a string

  Contract: AvastarFactory
    ✓ should not mint an Avastar if the given Generation is invalid / out of range (9930000 gas)
    ✓ should not mint an Avastar if the given Prime serial is incorrect for the Generation (26242 gas)
    ✓ should not mint an Avastar if the given Replicant serial is incorrect for the Generation (26267 gas)
    ✓ should allow descendant contracts to mint an Avastar (186600 gas)
    ✓ should allow anyone to retrieve the wave for a given Avastar by Token ID

  Contract: AvastarMetadata
    ✓ should not allow non-sysadmins to change the token URI base regardless of contract pause state (107031 gas)
    ✓ should not allow system administrator to change the token URI base when contract is not paused (24229 gas)
    ✓ should allow the sysadmin to change the token URI base when contract is paused (103542 gas)
    ✓ should not allow non-sysadmins to change the media URI base regardless of contract pause state (106793 gas)
    ✓ should not allow system administrator to change the media URI base when contract is not paused (24110 gas)
    ✓ should allow the sysadmin to change the media URI base when contract is paused (93838 gas)
    ✓ should not allow non-sysadmins to change the media URI base regardless of contract pause state (107053 gas)
    ✓ should not allow system administrator to change the view URI base when contract is not paused (24240 gas)
    ✓ should allow the sysadmin to change the view URI base when contract is paused (118553 gas)
    ✓ should allow anyone to retrieve the tokenURI for a given Avastar by Token ID
    ✓ should revert when trying to retrieve the tokenURI for an invalid Token ID
    ✓ should allow anyone to retrieve the mediaURI for a given Avastar by Token ID
    ✓ should revert when trying to retrieve the mediaURI for an invalid Token ID
    ✓ should allow anyone to retrieve the viewURI for a given Avastar by Token ID
    ✓ should revert when trying to retrieve the viewURI for an invalid Token ID
    ✓ should allow anyone to get the metadata for an avastar prime
    ✓ should allow anyone to get the metadata for an avastar replicant
    ✓ should revert when trying to retrieve the metadata for an invalid Token ID

  Contract: AvastarPrimeMinter
    ✓ should allow anyone to deposit ETH (66356 gas)
    ✓ should allow another depositor to deposit ETH (51356 gas)
    ✓ should allow a depositor to check their balance
    ✓ should allow a depositor to deposit more ETH (36356 gas)
    ✓ should show increased balance for a depositor after depositing more ETH
    ✓ should allow an owner to check the franchise balance, (zero if nothing has been purchased)
    ✓ should not allow minter to purchase a prime if AvastarTeleporter.mintPrime reverts (43494 gas)
    ✓ should allow minter to purchase a prime if purchaser has already deposited ETH (362492 gas)
    ✓ should allow minter to purchase another prime if purchaser has sufficient ETH remaining (464552 gas)
    ✓ should show appropriately decreased balance for depositor after purchasing primes
    ✓ should allow a depositor to withdraw a non-zero balance (27207 gas)
    ✓ should not allow minter to purchase a prime if purchaser has withdrawn their balance (25281 gas)
    ✓ should allow an owner to check the franchise balance, (has value after purchases)
    ✓ should allow an owner to withdraw the franchise balance (32301 gas)
    ✓ should allow another depositor to check their balance
    ✓ should allow another depositor to withdraw a non-zero balance (21104 gas)
    ✓ should not allow non-sysadmins to set current series (22451 gas)
    ✓ should not allow system administrator to set current series if contract not paused (23274 gas)
    ✓ should allow system administrator to set current series if paused (92100 gas)
    ✓ should reflect change of series in newly minted primes (545884 gas)
    ✓ should not allow non-sysadmins to set current generation (22450 gas)
    ✓ should not allow system administrator to set current generation if contract not paused (23273 gas)
    ✓ should allow system administrator to set current generation if paused; series is reset (98439 gas)
    ✓ should reflect change of generation and series in newly minted primes (511684 gas)

  Contract: AvastarTeleporter
    ✓ should not allow changing of attribution once avastars have been produced for a given generation (25384 gas)
    ✓ should not allow adding of traits once avastars have been produced for a given generation (27027 gas)
    ✓ should not allow extending of trait art once avastars have been produced for a given generation (26808 gas)
    ✓ should allow anyone to retrieve the AvastarMetadata contract address
    ✓ should not allow system administrator to approve trait access for another user's primes (24685 gas)
    ✓ should not allow minter to approve trait access for another user's primes (24673 gas)
    ✓ should revert if empty array is sent to approve trait access (22210 gas)
    ✓ should not allow an unapproved stranger to use traits on a prime (25932 gas)
    ✓ should not allow owner to pass more than 256 prime ids for trait access approval at once (55144 gas)
    ✓ should not allow owner to pass zero prime ids for trait access approval (22210 gas)
    ✓ should allow owner to approve trait access for a specific set of their primes (96691 gas)
    ✓ should not allow owner to approve trait handler for primes they are already approved for (28390 gas)
    ✓ should allow a handler to use traits for primes they are approved for (79643 gas)
    ✓ should not allow a handler to use more traits on a prime without being approved again (25968 gas)
    ✓ should not allow an approved handler to set a previously used trait to unused (100701 gas)
    ✓ should allow anyone to see a prime's replication flags reflect authorized usage
    ✓ should allow anyone to render the art for a given Avastar
    ✓ should allow anyone to retrieve the wave for a given Avastar by Token ID
    ✓ should allow anyone to render the art for a given Avastar
    ✓ should allow anyone to retrieve the tokenURI for a given Avastar by Token ID
    ✓ should revert when trying to retrieve the tokenURI for an invalid Token ID

  Contract: ReplicantFactoryWrapper
    ✓ should allow minter to create a replicant (300313 gas)
    ✓ should increase replicantCountByGeneration after minting a replicant
    ✓ should allow sysadmin setting of replicantCountByGeneration (28606 gas)
    ✓ should not allow minter to create more replicants than the capped amount (26292 gas)
    ✓ should allow minter to create a prime (435679 gas)
    ✓ should increase primeCountByGenAndSeries after minting a prime
    ✓ should allow sysadmin setting of primeCountByGenAndSeries (28937 gas)
    ✓ should not allow minter to create more primes per series than the capped amount (26700 gas)
    ✓ should not allow minter to create more promo primes per generation than the capped amount (70602 gas)

  Contract: PrimeFactory
    ✓ should not allow system administrator to create a prime (23609 gas)
    ✓ should not allow non-minters to create a prime (23609 gas)
    ✓ should allow minter to create a prime (342063 gas)
    ✓ should increase primeCountByGenAndSeries after minting a prime
    ✓ should allow minter to create a prime in same generation but different series, token id and serial both increase (459123 gas)
    ✓ should allow minter to create a prime different generation first series, token id increases and serial resets (454911 gas)
    ✓ should not allow minter to create a prime in the same generation with the same trait hash (25558 gas)
    ✓ should allow minter to create a prime in a different generation with same trait hash (454911 gas)
    ✓ should allow anyone to retrieve a prime by generation and serial number
    ✓ should allow anyone to retrieve a prime by token id
    ✓ should allow anyone to retrieve a prime's replication flags by token id

  Contract: ReplicantFactory
    ✓ should not allow system administrator to create a replicant (23434 gas)
    ✓ should not allow non-minters to create a replicant (23434 gas)
    ✓ should not allow minter to create a replicant with a hash used by a prime in same generation (25360 gas)
    ✓ should allow minter to create a replicant (393875 gas)
    ✓ should increase replicantCountByGeneration after minting a replicant
    ✓ should allow minter to create a replicant same generation, serial increases (402335 gas)
    ✓ should allow minter to create a replicant different generation, token id increases and serial resets (393923 gas)
    ✓ should not allow minter to create a replicant in the same generation with the same trait hash (25348 gas)
    ✓ should allow minter to create a replicant in a different generation with same trait hash (393923 gas)
    ✓ should allow anyone to retrieve a replicant by generation and serial number
    ✓ should allow anyone to retrieve a replicant by token id
    ✓ should revert if trying to retrieve a replicant with a prime token id
    ✓ should revert if trying to retrieve a prime with a replicant token id
    ✓ should revert if trying to retrieve a prime's replication flags with a replicant token id

  Contract: TraitFactory
    ✓ should allow sysadmin to create a trait (2157674 gas)
    ✓ should allow anyone to retrieve a trait's info
    ✓ should allow sysadmin to retrieve a trait's art
    ✓ should not allow non-sysadmins to create traits (61916 gas)
    ✓ should not allow non-sysadmins to retrieve a trait's art
    ✓ should allow sysadmin to create and retrieve another trait (1708393 gas)
    ✓ should allow sysadmin to create a trait and extend its art (23319927 gas)
    ✓ should not allow sysadmin to create trait with bad value for generation (9930000 gas)
    ✓ should not allow sysadmin to create trait with bad value for gender (9930000 gas)
    ✓ should not allow sysadmin to create trait with bad value for gene (9930000 gas)
    ✓ should not allow sysadmin to create trait with empty array for series (63942 gas)
    ✓ should not allow sysadmin to create trait with bad value for series (9930000 gas)
    ✓ should not allow sysadmin to create traits when contract is paused (122962 gas)
    ✓ should allow anyone to retrieve a trait id by generation, gene, and variation
    ✓ should allow descendent contracts to assemble artwork by generation and trait hash
    ✓ should not allow sysadmin to set the artist name for a generation to an empty string (25952 gas)
    ✓ should not allow sysadmin to set the artist infoURI for a generation to an empty string (25607 gas)
    ✓ should allow the sysadmin to set the artist attribution for a generation (114164 gas)
    ✓ should allow anyone to retrieve the combined artist attribution for a generation
    ✓ should revert when trying to retrieve the combined artist attribution for a generation

  148 passing (2m)

```

#### ** Gas by Contract Method **
```
·--------------------------------------------------------|---------------------------|-------------|----------------------------·
|          Solc version: 0.5.14+commit.01f1aaa4          ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 9930000 gas  │
·························································|···························|·············|·····························
|  Methods                                               ·               3 gwei/gas                ·       202.78 usd/eth       │
····························|····························|·············|·············|·············|··············|··············
|  Contract                 ·  Method                    ·  Min        ·  Max        ·  Avg        ·  # calls     ·  usd (avg)  │
····························|····························|·············|·············|·············|··············|··············
|  AccessControl            ·  addMinter                 ·          -  ·          -  ·      45570  ·           2  ·       0.03  │
····························|····························|·············|·············|·············|··············|··············
|  AccessControl            ·  addOwner                  ·          -  ·          -  ·      45649  ·           4  ·       0.03  │
····························|····························|·············|·············|·············|··············|··············
|  AccessControl            ·  addSysAdmin               ·          -  ·          -  ·      45604  ·           2  ·       0.03  │
····························|····························|·············|·············|·············|··············|··············
|  AccessControl            ·  pause                     ·          -  ·          -  ·      44617  ·           5  ·       0.03  │
····························|····························|·············|·············|·············|··············|··············
|  AccessControl            ·  stripRoles                ·      17615  ·      17627  ·      17623  ·           6  ·       0.01  │
····························|····························|·············|·············|·············|··············|··············
|  AccessControl            ·  unpause                   ·          -  ·          -  ·      15468  ·           7  ·       0.01  │
····························|····························|·············|·············|·············|··············|··············
|  AccessControl            ·  upgradeContract           ·          -  ·          -  ·      31373  ·           2  ·       0.02  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarFactoryWrapper    ·  _mintAvastar              ·          -  ·          -  ·     186600  ·           2  ·       0.11  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarFactoryWrapper    ·  unpause                   ·          -  ·          -  ·      15513  ·           1  ·       0.01  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata          ·  pause                     ·          -  ·          -  ·      44728  ·           6  ·       0.03  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata          ·  setMediaUriBase           ·          -  ·          -  ·      33619  ·           1  ·       0.02  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata          ·  setTokenUriBase           ·          -  ·          -  ·      43323  ·           1  ·       0.03  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata          ·  setViewUriBase            ·          -  ·          -  ·      58334  ·           1  ·       0.04  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata          ·  unpause                   ·          -  ·          -  ·      15491  ·          20  ·       0.01  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter       ·  deposit                   ·      36356  ·      66356  ·      48629  ·          11  ·       0.03  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter       ·  pause                     ·          -  ·          -  ·      44684  ·           2  ·       0.03  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter       ·  purchasePrime             ·     362492  ·     479528  ·     444128  ·           8  ·       0.27  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter       ·  setCurrentGeneration      ·          -  ·          -  ·      38265  ·           1  ·       0.02  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter       ·  setCurrentSeries          ·          -  ·          -  ·      31926  ·           1  ·       0.02  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter       ·  unpause                   ·          -  ·          -  ·      15490  ·           4  ·       0.01  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter       ·  withdrawDepositorBalance  ·      21104  ·      27207  ·      24156  ·           4  ·       0.01  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter       ·  withdrawFranchiseBalance  ·          -  ·          -  ·      32301  ·           3  ·       0.02  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter        ·  approveTraitAccess        ·      54835  ·      96691  ·      82739  ·           3  ·       0.05  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter        ·  mintPrime                 ·          -  ·          -  ·     444113  ·           1  ·       0.27  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter        ·  mintReplicant             ·          -  ·          -  ·     393914  ·           1  ·       0.24  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter        ·  unpause                   ·          -  ·          -  ·      15558  ·           1  ·       0.01  │
····························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter        ·  useTraits                 ·          -  ·          -  ·      79643  ·           2  ·       0.05  │
····························|····························|·············|·············|·············|··············|··············
|  PrimeFactory             ·  addMinter                 ·          -  ·          -  ·      45616  ·           1  ·       0.03  │
····························|····························|·············|·············|·············|··············|··············
|  PrimeFactory             ·  mintPrime                 ·     342063  ·     459123  ·     424900  ·          11  ·       0.26  │
····························|····························|·············|·············|·············|··············|··············
|  ReplicantFactory         ·  mintPrime                 ·          -  ·          -  ·     342079  ·           1  ·       0.21  │
····························|····························|·············|·············|·············|··············|··············
|  ReplicantFactory         ·  mintReplicant             ·     393875  ·     402335  ·     395206  ·          13  ·       0.24  │
····························|····························|·············|·············|·············|··············|··············
|  ReplicantFactoryWrapper  ·  addMinter                 ·          -  ·          -  ·      45638  ·           1  ·       0.03  │
····························|····························|·············|·············|·············|··············|··············
|  ReplicantFactoryWrapper  ·  mintPrime                 ·          -  ·          -  ·     435679  ·           3  ·       0.27  │
····························|····························|·············|·············|·············|··············|··············
|  ReplicantFactoryWrapper  ·  mintReplicant             ·          -  ·          -  ·     300313  ·           3  ·       0.18  │
····························|····························|·············|·············|·············|··············|··············
|  ReplicantFactoryWrapper  ·  setPrimeCount             ·      28937  ·      43913  ·      33929  ·           3  ·       0.02  │
····························|····························|·············|·············|·············|··············|··············
|  ReplicantFactoryWrapper  ·  setReplicantCount         ·          -  ·          -  ·      28606  ·           2  ·       0.02  │
····························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper      ·  createTrait               ·    1708393  ·    6051419  ·    2585557  ·           7  ·       1.57  │
····························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper      ·  extendTraitArt            ·    1407695  ·    2627899  ·    2075134  ·           9  ·       1.26  │
····························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper      ·  pause                     ·          -  ·          -  ·      44729  ·           1  ·       0.03  │
····························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper      ·  setAttribution            ·          -  ·          -  ·     114164  ·           3  ·       0.07  │
····························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper      ·  unpause                   ·          -  ·          -  ·      15491  ·           5  ·       0.01  │
····························|····························|·············|·············|·············|··············|··············
|  Deployments                                           ·                                         ·  % of limit  ·             │
·························································|·············|·············|·············|··············|··············
|  AvastarBaseWrapper                                    ·          -  ·          -  ·     264110  ·       2.7 %  ·       0.16  │
·························································|·············|·············|·············|··············|··············
|  AvastarMetadata                                       ·          -  ·          -  ·    2501056  ·      25.2 %  ·       1.52  │
·························································|·············|·············|·············|··············|··············
|  AvastarPrimeMinter                                    ·          -  ·          -  ·    1056827  ·      10.6 %  ·       0.64  │
·························································|·············|·············|·············|··············|··············
|  AvastarTeleporter                                     ·          -  ·          -  ·    5540452  ·      55.8 %  ·       3.37  │
·--------------------------------------------------------|-------------|-------------|-------------|--------------|-------------·
```
<!-- tabs:end -->