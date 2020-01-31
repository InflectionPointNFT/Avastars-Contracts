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
    ✓ should allow an owner to remove a sysadmin (17584 gas)
    ✓ should allow an owner to remove a minter (17572 gas)
    ✓ should allow an owner to remove an owner (17584 gas)

  Contract: AvastarBase
    ✓ should allow descendent contracts to concatenate two strings
    ✓ should allow descendent contracts to convert a uint to a string

  Contract: AvastarFactory
    ✓ should not mint an Avastar if the given Generation is invalid / out of range (6721975 gas)
    ✓ should not mint an Avastar if the given Prime serial is incorrect for the Generation (26286 gas)
    ✓ should not mint an Avastar if the given Replicant serial is incorrect for the Generation (26311 gas)
    ✓ should allow descendant contracts to mint an Avastar (186644 gas)
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
    ✓ should allow anyone to deposit ETH (66372 gas)
    ✓ should allow another depositor to deposit ETH (51372 gas)
    ✓ should allow a depositor to check their balance
    ✓ should allow a depositor to deposit more ETH (36372 gas)
    ✓ should show increased balance for a depositor after depositing more ETH
    ✓ should allow an owner to check the franchise balance, (zero if nothing has been purchased)
    ✓ should not allow minter to purchase a prime if AvastarTeleporter.mintPrime reverts (43494 gas)
    ✓ should allow minter to purchase a prime if purchaser has already deposited ETH (362478 gas)
    ✓ should allow minter to purchase another prime if purchaser has sufficient ETH remaining (464538 gas)
    ✓ should show appropriately decreased balance for depositor after purchasing primes
    ✓ should allow a depositor to withdraw a non-zero balance (27226 gas)
    ✓ should not allow minter to purchase a prime if purchaser has withdrawn their balance (25281 gas)
    ✓ should allow an owner to check the franchise balance, (has value after purchases)
    ✓ should allow an owner to withdraw the franchise balance (32301 gas)
    ✓ should allow another depositor to check their balance
    ✓ should allow another depositor to withdraw a non-zero balance (21113 gas)
    ✓ should not allow non-sysadmins to set current series (22451 gas)
    ✓ should not allow system administrator to set current series if contract not paused (23274 gas)
    ✓ should allow system administrator to set current series if paused (92100 gas)
    ✓ should reflect change of series in newly minted primes (545886 gas)
    ✓ should not allow non-sysadmins to set current generation (22450 gas)
    ✓ should not allow system administrator to set current generation if contract not paused (23273 gas)
    ✓ should allow system administrator to set current generation if paused; series is reset (98439 gas)
    ✓ should reflect change of generation and series in newly minted primes (511686 gas)

  Contract: AvastarTeleporter
    ✓ should not allow changing of attribution once avastars have been produced for a given generation (25384 gas)
    ✓ should not allow adding of traits once avastars have been produced for a given generation (27027 gas)
    ✓ should not allow extending of trait art once avastars have been produced for a given generation (26763 gas)
    ✓ should allow anyone to retrieve the AvastarMetadata contract address
    ✓ should not allow system administrator to approve trait access for another user's primes (24685 gas)
    ✓ should not allow minter to approve trait access for another user's primes (24673 gas)
    ✓ should revert if empty array is sent to approve trait access (22210 gas)
    ✓ should not allow an unapproved stranger to use traits on a prime (25865 gas)
    ✓ should not allow owner to pass more than 256 prime ids for trait access approval at once (55144 gas)
    ✓ should not allow owner to pass zero prime ids for trait access approval (22210 gas)
    ✓ should allow owner to approve trait access for a specific set of their primes (96691 gas)
    ✓ should not allow owner to approve trait handler for primes they are already approved for (28390 gas)
    ✓ should allow a handler to use traits for primes they are approved for (79576 gas)
    ✓ should not allow a handler to use more traits on a prime without being approved again (25901 gas)
    ✓ should not allow an approved handler to set a previously used trait to unused (100634 gas)
    ✓ should allow anyone to see a prime's replication flags reflect authorized usage
    ✓ should allow anyone to render the art for a given Avastar
    ✓ should allow anyone to retrieve the wave for a given Avastar by Token ID
    ✓ should allow anyone to render the art for a given Avastar
    ✓ should allow anyone to retrieve the tokenURI for a given Avastar by Token ID
    ✓ should revert when trying to retrieve the tokenURI for an invalid Token ID

  Contract: PrimeFactory
    ✓ should not allow system administrator to create a prime (23609 gas)
    ✓ should not allow non-minters to create a prime (23609 gas)
    ✓ should allow minter to create a prime (342049 gas)
    ✓ should increase countByGenerationAndSeries after minting a prime
    ✓ should allow minter to create a prime in same generation but different series, token id and serial both increase (459109 gas)
    ✓ should allow minter to create a prime different generation first series, token id increases and serial resets (454897 gas)
    ✓ should not allow minter to create a prime in the same generation with the same trait hash (25558 gas)
    ✓ should allow minter to create a prime in a different generation with same trait hash (454897 gas)
    ✓ should allow anyone to retrieve a prime by generation and serial number
    ✓ should allow anyone to retrieve a prime by token id
    ✓ should allow anyone to retrieve a prime's replication flags by token id

  Contract: ReplicantFactory
    ✓ should not allow system administrator to create a replicant (23433 gas)
    ✓ should not allow non-minters to create a replicant (23433 gas)
    ✓ should not allow minter to create a replicant with a hash used by a prime in same generation (25394 gas)
    ✓ should allow minter to create a replicant (371973 gas)
    ✓ should allow minter to create a replicant same generation, serial increases (395433 gas)
    ✓ should allow minter to create a replicant different generation, token id increases and serial resets (372021 gas)
    ✓ should not allow minter to create a replicant in the same generation with the same trait hash (25382 gas)
    ✓ should allow minter to create a replicant in a different generation with same trait hash (372021 gas)
    ✓ should allow anyone to retrieve a replicant by generation and serial number
    ✓ should allow anyone to retrieve a replicant by token id
    ✓ should revert if trying to retrieve a replicant with a prime token id
    ✓ should revert if trying to retrieve a prime with a replicant token id
    ✓ should revert if trying to retrieve a prime's replication flags with a replicant token id

  Contract: TraitFactory
    ✓ should allow sysadmin to create a trait (2157659 gas)
    ✓ should allow anyone to retrieve a trait's info
    ✓ should allow sysadmin to retrieve a trait's art
    ✓ should not allow non-sysadmins to create traits (61916 gas)
    ✓ should not allow non-sysadmins to retrieve a trait's art
    ✓ should allow sysadmin to create and retrieve another trait (1708378 gas)
    ✓ should allow sysadmin to create a trait and extend its art (23320264 gas)
    ✓ should not allow sysadmin to create trait with bad value for generation (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for gender (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for gene (6721975 gas)
    ✓ should not allow sysadmin to create trait with empty array for series (63942 gas)
    ✓ should not allow sysadmin to create trait with bad value for series (6721975 gas)
    ✓ should not allow sysadmin to create traits when contract is paused (123006 gas)
    ✓ should allow anyone to retrieve a trait id by generation, gene, and variation
    ✓ should allow descendent contracts to assemble artwork by generation and trait hash
    ✓ should not allow sysadmin to set the artist name for a generation to an empty string (25952 gas)
    ✓ should not allow sysadmin to set the artist infoURI for a generation to an empty string (25607 gas)
    ✓ should allow the sysadmin to set the artist attribution for a generation (114164 gas)
    ✓ should allow anyone to retrieve the combined artist attribution for a generation

  136 passing (2m)

```

#### ** Gas by Contract Method **
```
·------------------------------------------------------|---------------------------|-------------|----------------------------·
|         Solc version: 0.5.14+commit.01f1aaa4         ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 8000000 gas  │
·······················································|···························|·············|·····························
|  Methods                                             ·               1 gwei/gas                ·       184.82 usd/eth       │
··························|····························|·············|·············|·············|··············|··············
|  Contract               ·  Method                    ·  Min        ·  Max        ·  Avg        ·  # calls     ·  usd (avg)  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  addMinter                 ·          -  ·          -  ·      45570  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  addOwner                  ·          -  ·          -  ·      45649  ·           4  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  addSysAdmin               ·          -  ·          -  ·      45604  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  pause                     ·          -  ·          -  ·      44617  ·           5  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  stripRoles                ·      17572  ·      17584  ·      17579  ·           5  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  unpause                   ·          -  ·          -  ·      15468  ·           7  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  upgradeContract           ·          -  ·          -  ·      31373  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarFactoryWrapper  ·  _mintAvastar              ·          -  ·          -  ·     186644  ·           2  ·       0.03  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarFactoryWrapper  ·  unpause                   ·          -  ·          -  ·      15513  ·           1  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  pause                     ·          -  ·          -  ·      44728  ·           6  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  setMediaUriBase           ·          -  ·          -  ·      33619  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  setTokenUriBase           ·          -  ·          -  ·      43323  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  setViewUriBase            ·          -  ·          -  ·      58334  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  unpause                   ·          -  ·          -  ·      15491  ·          20  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  deposit                   ·      36372  ·      66372  ·      48645  ·          11  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  pause                     ·          -  ·          -  ·      44684  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  purchasePrime             ·     362478  ·     479514  ·     444114  ·           8  ·       0.08  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  setCurrentGeneration      ·          -  ·          -  ·      38265  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  setCurrentSeries          ·          -  ·          -  ·      31926  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  unpause                   ·          -  ·          -  ·      15490  ·           4  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  withdrawDepositorBalance  ·      21113  ·      27226  ·      24170  ·           4  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  withdrawFranchiseBalance  ·          -  ·          -  ·      32301  ·           3  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  approveTraitAccess        ·      54835  ·      96691  ·      82739  ·           3  ·       0.02  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  mintPrime                 ·          -  ·          -  ·     444099  ·           1  ·       0.08  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  mintReplicant             ·          -  ·          -  ·     372035  ·           1  ·       0.07  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  unpause                   ·          -  ·          -  ·      15513  ·           1  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  useTraits                 ·          -  ·          -  ·      79576  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  PrimeFactory           ·  addMinter                 ·          -  ·          -  ·      45593  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  PrimeFactory           ·  mintPrime                 ·     342049  ·     459109  ·     424886  ·          11  ·       0.08  │
··························|····························|·············|·············|·············|··············|··············
|  ReplicantFactory       ·  mintPrime                 ·          -  ·          -  ·     342065  ·           1  ·       0.06  │
··························|····························|·············|·············|·············|··············|··············
|  ReplicantFactory       ·  mintReplicant             ·     371973  ·     395433  ·     375915  ·          12  ·       0.07  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  createTrait               ·    1708378  ·    6051404  ·    2585542  ·           7  ·       0.48  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  extendTraitArt            ·    1407739  ·    2627943  ·    2075178  ·           9  ·       0.38  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  pause                     ·          -  ·          -  ·      44751  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  setAttribution            ·          -  ·          -  ·     114110  ·           2  ·       0.02  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  unpause                   ·          -  ·          -  ·      15513  ·           5  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  Deployments                                         ·                                         ·  % of limit  ·             │
·······················································|·············|·············|·············|··············|··············
|  AvastarBaseWrapper                                  ·          -  ·          -  ·     264098  ·       3.3 %  ·       0.05  │
·······················································|·············|·············|·············|··············|··············
|  AvastarMetadata                                     ·          -  ·          -  ·    2453283  ·      30.7 %  ·       0.45  │
·······················································|·············|·············|·············|··············|··············
|  AvastarPrimeMinter                                  ·          -  ·          -  ·    1059587  ·      13.2 %  ·       0.20  │
·······················································|·············|·············|·············|··············|··············
|  AvastarTeleporter                                   ·          -  ·          -  ·    5491861  ·      68.6 %  ·       1.02  │
·------------------------------------------------------|-------------|-------------|-------------|--------------|-------------·
```
<!-- tabs:end -->