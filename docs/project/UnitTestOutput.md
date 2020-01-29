# Unit Test Output
<!-- tabs:start -->

#### ** Tests by Contract **
```
  Contract: AccessControl
    ✓ should not allow non-sysadmins to pause the contract (22195 gas)
    ✓ should allow sysadmin to pause the contract when unpaused (44617 gas)
    ✓ should not allow non-sysadmins to unpause the contract (22196 gas)
    ✓ should allow sysadmin to unpause the contract when paused (15446 gas)
    ✓ should allow sysadmin to add a minter (45656 gas)
    ✓ should allow sysadmin to add an owner (45713 gas)
    ✓ should allow sysadmin to add a sysadmin (45690 gas)
    ✓ should not allow non-sysadmins to set upgrade the contract when unpaused (22711 gas)
    ✓ should not allow sysadmin to upgrade the contract when unpaused (23534 gas)
    ✓ should not allow non-sysadmins to upgrade the contract when paused (82774 gas)
    ✓ should allow sysadmin to upgrade the contract when paused (75955 gas)
    ✓ should not allow sysadmin to unpause contract after the contract is upgraded (23856 gas)

  Contract: AvastarBase
    ✓ should allow descendent contracts to concatenate two strings
    ✓ should allow descendent contracts to convert a uint to a string

  Contract: AvastarFactory
    ✓ should not mint an Avastar if the given Generation is invalid / out of range (6721975 gas)
    ✓ should not mint an Avastar if the given Prime serial is incorrect for the Generation (26264 gas)
    ✓ should not mint an Avastar if the given Replicant serial is incorrect for the Generation (26289 gas)
    ✓ should allow descendant contracts to mint an Avastar (186622 gas)
    ✓ should allow anyone to retrieve the wave for a given Avastar by Token ID

  Contract: AvastarMetadata
    ✓ should not allow non-sysadmins to change the token URI base regardless of contract pause state (106943 gas)
    ✓ should not allow system administrator to change the token URI base when contract is not paused (24207 gas)
    ✓ should allow the sysadmin to change the token URI base when contract is paused (103476 gas)
    ✓ should not allow non-sysadmins to change the media URI base regardless of contract pause state (106705 gas)
    ✓ should not allow system administrator to change the media URI base when contract is not paused (24088 gas)
    ✓ should allow the sysadmin to change the media URI base when contract is paused (93772 gas)
    ✓ should not allow non-sysadmins to change the media URI base regardless of contract pause state (106965 gas)
    ✓ should not allow system administrator to change the view URI base when contract is not paused (24218 gas)
    ✓ should allow the sysadmin to change the view URI base when contract is paused (118487 gas)
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
    ✓ should allow minter to purchase a prime if purchaser has already deposited ETH (383578 gas)
    ✓ should allow minter to purchase another prime if purchaser has sufficient ETH remaining (485638 gas)
    ✓ should show appropriately decreased balance for depositor after purchasing primes
    ✓ should allow a depositor to withdraw a non-zero balance (28798 gas)
    ✓ should not allow minter to purchase a prime if purchaser has withdrawn their balance (25281 gas)
    ✓ should allow an owner to check the franchise balance, (has value after purchases)
    ✓ should allow an owner to withdraw the franchise balance (32976 gas)
    ✓ should allow another depositor to check their balance
    ✓ should allow another depositor to withdraw a non-zero balance (21899 gas)
    ✓ should not allow non-sysadmins to set current series (22451 gas)
    ✓ should not allow system administrator to set current series if contract not paused (23274 gas)
    ✓ should allow system administrator to set current series if paused (92056 gas)
    ✓ should reflect change of series in newly minted primes (566986 gas)
    ✓ should not allow non-sysadmins to set current generation (22428 gas)
    ✓ should not allow system administrator to set current generation if contract not paused (23251 gas)
    ✓ should allow system administrator to set current generation if paused; series is reset (98373 gas)
    ✓ should reflect change of generation and series in newly minted primes (532786 gas)

  Contract: AvastarTeleporter
    ✓ should not allow changing of attribution once avastars have been produced for a given generation (25384 gas)
    ✓ should not allow adding of traits once avastars have been produced for a given generation (27027 gas)
    ✓ should not allow extending of trait art once avastars have been produced for a given generation (26808 gas)
    ✓ should allow anyone to retrieve the AvastarMetadata contract address
    ✓ should not allow system administrator to approve trait access for another user's primes (24625 gas)
    ✓ should not allow minter to approve trait access for another user's primes (24613 gas)
    ✓ should not allow an unapproved stranger to use traits on a prime (25051 gas)
    ✓ should allow owner to approve trait access for a specific set of their primes (93840 gas)
    ✓ should allow a handler to use traits for primes they are approved for (189478 gas)
    ✓ should not allow a handler to use more traits on a prime without being approved again (25051 gas)
    ✓ should not allow an approved handler to set a previously used trait to unused (90453 gas)
    ✓ should allow anyone to see a prime's replication flags reflect authorized usage
    ✓ should allow anyone to render the art for a given Avastar
    ✓ should allow anyone to retrieve the wave for a given Avastar by Token ID
    ✓ should allow anyone to render the art for a given Avastar
    ✓ should allow anyone to retrieve the tokenURI for a given Avastar by Token ID
    ✓ should revert when trying to retrieve the tokenURI for an invalid Token ID

  Contract: PrimeFactory
    ✓ should not allow system administrator to create a prime (23609 gas)
    ✓ should not allow non-minters to create a prime (23609 gas)
    ✓ should allow minter to create a prime (363149 gas)
    ✓ should increase countByGenerationAndSeries after minting a prime
    ✓ should allow minter to create a prime in same generation but different series, token id and serial both increase (480209 gas)
    ✓ should allow minter to create a prime different generation first series, token id increases and serial resets (475997 gas)
    ✓ should not allow minter to create a prime in the same generation with the same trait hash (25558 gas)
    ✓ should allow minter to create a prime in a different generation with same trait hash (475997 gas)
    ✓ should allow anyone to retrieve a prime by generation and serial number
    ✓ should allow anyone to retrieve a prime by token id
    ✓ should allow anyone to retrieve a prime's replication flags by token id

  Contract: ReplicantFactory
    ✓ should not allow system administrator to create a replicant (23411 gas)
    ✓ should not allow non-minters to create a replicant (23411 gas)
    ✓ should not allow minter to create a replicant with a hash used by a prime in same generation (25372 gas)
    ✓ should allow minter to create a replicant (371951 gas)
    ✓ should allow minter to create a replicant same generation, serial increases (395411 gas)
    ✓ should allow minter to create a replicant different generation, token id increases and serial resets (371999 gas)
    ✓ should not allow minter to create a replicant in the same generation with the same trait hash (25360 gas)
    ✓ should allow minter to create a replicant in a different generation with same trait hash (371999 gas)
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
    ✓ should allow sysadmin to create a trait and extend its art (23320088 gas)
    ✓ should not allow sysadmin to create trait with bad value for generation (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for gender (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for gene (6721975 gas)
    ✓ should not allow sysadmin to create trait with empty array for series (63942 gas)
    ✓ should not allow sysadmin to create trait with bad value for series (6721975 gas)
    ✓ should not allow sysadmin to create traits when contract is paused (122962 gas)
    ✓ should allow anyone to retrieve a trait id by generation, gene, and variation
    ✓ should allow descendent contracts to assemble artwork by generation and trait hash
    ✓ should allow the sysadmin to set the artist attribution for a generation (114110 gas)
    ✓ should allow anyone to retrieve the combined artist attribution for a generation

  119 passing (2m)

```

#### ** Gas by Contract Method **
```
·------------------------------------------------------|---------------------------|-------------|----------------------------·
|         Solc version: 0.5.12+commit.7709ece9         ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 8000000 gas  │
·······················································|···························|·············|·····························
|  Methods                                             ·               1 gwei/gas                ·       176.52 usd/eth       │
··························|····························|·············|·············|·············|··············|··············
|  Contract               ·  Method                    ·  Min        ·  Max        ·  Avg        ·  # calls     ·  usd (avg)  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  addMinter                 ·          -  ·          -  ·      45656  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  addOwner                  ·          -  ·          -  ·      45713  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  addSysAdmin               ·          -  ·          -  ·      45690  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  pause                     ·          -  ·          -  ·      44617  ·           4  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  unpause                   ·          -  ·          -  ·      15446  ·           5  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  upgradeContract           ·          -  ·          -  ·      31338  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarFactoryWrapper  ·  _mintAvastar              ·          -  ·          -  ·     186622  ·           2  ·       0.03  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarFactoryWrapper  ·  unpause                   ·          -  ·          -  ·      15491  ·           1  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  pause                     ·          -  ·          -  ·      44706  ·           6  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  setMediaUriBase           ·          -  ·          -  ·      33597  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  setTokenUriBase           ·          -  ·          -  ·      43301  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  setViewUriBase            ·          -  ·          -  ·      58312  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  unpause                   ·          -  ·          -  ·      15469  ·          20  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  deposit                   ·      36372  ·      66372  ·      48645  ·          11  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  pause                     ·          -  ·          -  ·      44662  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  purchasePrime             ·     383578  ·     500614  ·     465214  ·           8  ·       0.08  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  setCurrentGeneration      ·          -  ·          -  ·      38243  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  setCurrentSeries          ·          -  ·          -  ·      31926  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  unpause                   ·          -  ·          -  ·      15468  ·           4  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  withdrawDepositorBalance  ·      21899  ·      28798  ·      25349  ·           4  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  withdrawFranchiseBalance  ·          -  ·          -  ·      32976  ·           3  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  approveTraitAccess        ·      55440  ·      93840  ·      81040  ·           3  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  mintPrime                 ·          -  ·          -  ·     465199  ·           1  ·       0.08  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  mintReplicant             ·          -  ·          -  ·     372013  ·           1  ·       0.07  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  unpause                   ·          -  ·          -  ·      15536  ·           1  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  useTraits                 ·          -  ·          -  ·     189478  ·           2  ·       0.03  │
··························|····························|·············|·············|·············|··············|··············
|  PrimeFactory           ·  addMinter                 ·          -  ·          -  ·      45679  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  PrimeFactory           ·  mintPrime                 ·     363149  ·     480209  ·     445986  ·          11  ·       0.08  │
··························|····························|·············|·············|·············|··············|··············
|  ReplicantFactory       ·  mintPrime                 ·          -  ·          -  ·     363187  ·           1  ·       0.06  │
··························|····························|·············|·············|·············|··············|··············
|  ReplicantFactory       ·  mintReplicant             ·     371951  ·     395411  ·     375893  ·          12  ·       0.07  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  createTrait               ·    1708378  ·    6051404  ·    2585542  ·           7  ·       0.46  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  extendTraitArt            ·    1407717  ·    2627921  ·    2075156  ·           9  ·       0.37  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  pause                     ·          -  ·          -  ·      44729  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  setAttribution            ·          -  ·          -  ·     114110  ·           2  ·       0.02  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  unpause                   ·          -  ·          -  ·      15491  ·           5  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  Deployments                                         ·                                         ·  % of limit  ·             │
·······················································|·············|·············|·············|··············|··············
|  AvastarBaseWrapper                                  ·          -  ·          -  ·     264098  ·       3.3 %  ·       0.05  │
·······················································|·············|·············|·············|··············|··············
|  AvastarMetadata                                     ·          -  ·          -  ·    2398811  ·        30 %  ·       0.42  │
·······················································|·············|·············|·············|··············|··············
|  AvastarPrimeMinter                                  ·          -  ·          -  ·    1006650  ·      12.6 %  ·       0.18  │
·······················································|·············|·············|·············|··············|··············
|  AvastarTeleporter                                   ·          -  ·          -  ·    5457656  ·      68.2 %  ·       0.96  │
·------------------------------------------------------|-------------|-------------|-------------|--------------|-------------·
```
<!-- tabs:end -->

