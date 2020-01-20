# Unit Test Output
<!-- tabs:start -->

#### ** Tests by Contract **
```
  Contract: AccessControl
    ✓ should not allow non-sysadmins to pause the contract (21803 gas)
    ✓ should allow sysadmin to pause the contract when unpaused (43025 gas)
    ✓ should not allow non-sysadmins to unpause the contract (21804 gas)
    ✓ should allow sysadmin to unpause the contract when paused (14127 gas)
    ✓ should allow sysadmin to add a minter (45116 gas)
    ✓ should allow sysadmin to add an owner (45161 gas)
    ✓ should allow sysadmin to add a sysadmin (45138 gas)
    ✓ should not allow non-sysadmins to set upgrade the contract when unpaused (23359 gas)
    ✓ should not allow sysadmin to upgrade the contract when unpaused (23582 gas)
    ✓ should not allow non-sysadmins to upgrade the contract when paused (80511 gas)
    ✓ should allow sysadmin to upgrade the contract when paused (73211 gas)
    ✓ should not allow sysadmin to unpause contract after the contract is upgraded (22264 gas)

  Contract: AvastarBase
    ✓ should allow descendent contracts to concatenate two strings
    ✓ should allow descendent contracts to convert a uint to a string

  Contract: AvastarFactory
    ✓ should not mint an Avastar if the given Generation is invalid / out of range (6721975 gas)
    ✓ should not mint an Avastar if the given Prime serial is incorrect for the Generation (25714 gas)
    ✓ should not mint an Avastar if the given Replicant serial is incorrect for the Generation (25843 gas)
    ✓ should allow descendant contracts to mint an Avastar (221760 gas)
    ✓ should allow anyone to retrieve the wave for a given Avastar by Token ID

  Contract: AvastarMetadata
    ✓ should not allow non-sysadmins to change the token URI base regardless of contract pause state (106981 gas)
    ✓ should not allow system administrator to change the token URI base when contract is not paused (25087 gas)
    ✓ should allow the sysadmin to change the token URI base when contract is paused (100234 gas)
    ✓ should not allow non-sysadmins to change the media URI base regardless of contract pause state (106431 gas)
    ✓ should not allow system administrator to change the media URI base when contract is not paused (24812 gas)
    ✓ should allow the sysadmin to change the media URI base when contract is paused (94574 gas)
    ✓ should not allow non-sysadmins to change the media URI base regardless of contract pause state (106899 gas)
    ✓ should not allow system administrator to change the view URI base when contract is not paused (25046 gas)
    ✓ should allow the sysadmin to change the view URI base when contract is paused (115193 gas)
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
    ✓ should allow anyone to deposit ETH (64180 gas)
    ✓ should allow another depositor to deposit ETH (49180 gas)
    ✓ should allow a depositor to check their balance
    ✓ should allow a depositor to deposit more ETH (34180 gas)
    ✓ should show increased balance for a depositor after depositing more ETH
    ✓ should allow an owner to check the franchise balance, (zero if nothing has been purchased)
    ✓ should allow minter to purchase a prime if purchaser has already deposited ETH (524544 gas)
    ✓ should allow minter to purchase another prime if purchaser has sufficient ETH remaining (599864 gas)
    ✓ should show appropriately decreased balance for depositor after purchasing primes
    ✓ should allow a depositor to withdraw a non-zero balance (26906 gas)
    ✓ should not allow minter to purchase a prime if purchaser has withdrawn their balance (25613 gas)
    ✓ should allow an owner to check the franchise balance, (has value after purchases)
    ✓ should allow an owner to withdraw the franchise balance (31684 gas)
    ✓ should allow another depositor to check their balance
    ✓ should allow another depositor to withdraw a non-zero balance (20953 gas)
    ✓ should not allow non-sysadmins to set current series (22111 gas)
    ✓ should not allow system administrator to set current series if contract not paused (22334 gas)
    ✓ should allow system administrator to set current series if paused (86394 gas)
    ✓ should reflect change of series in newly minted primes (663916 gas)
    ✓ should not allow non-sysadmins to set current generation (22088 gas)
    ✓ should not allow system administrator to set current generation if contract not paused (22311 gas)
    ✓ should allow system administrator to set current generation if paused; series is reset (93911 gas)
    ✓ should reflect change of generation and series in newly minted primes (633916 gas)

  Contract: AvastarTeleporter
    ✓ should not allow changing of attribution once avastars have been produced for a given generation (27178 gas)
    ✓ should not allow adding of traits once avastars have been produced for a given generation (27567 gas)
    ✓ should not allow extending of trait art once avastars have been produced for a given generation (25086 gas)
    ✓ should allow anyone to retrieve the AvastarMetadata contract address
    ✓ should not allow system administrator to approve trait access for another user's primes (24903 gas)
    ✓ should not allow minter to approve trait access for another user's primes (24903 gas)
    ✓ should not allow an unapproved stranger to use traits on a prime (23681 gas)
    ✓ should allow owner to approve trait access for a specific set of their primes (89918 gas)
    ✓ should allow a handler to use traits for primes they are approved for (113264 gas)
    ✓ should not allow a handler to use more traits on a prime without being approved again (23681 gas)
    ✓ should not allow an approved handler to set a previously used trait to unused (86909 gas)
    ✓ should allow anyone to see a prime's replication flags reflect authorized usage
    ✓ should allow anyone to render the art for a given Avastar
    ✓ should allow anyone to retrieve the wave for a given Avastar by Token ID
    ✓ should allow anyone to render the art for a given Avastar
    ✓ should allow anyone to retrieve the tokenURI for a given Avastar by Token ID
    ✓ should revert when trying to retrieve the tokenURI for an invalid Token ID

  Contract: PrimeFactory
    ✓ should not allow system administrator to create a prime (24703 gas)
    ✓ should not allow non-minters to create a prime (24703 gas)
    ✓ should allow minter to create a prime (508055 gas)
    ✓ should allow minter to create a prime in same generation but different series, token id and serial both increase (583375 gas)
    ✓ should allow minter to create a prime different generation first series, token id increases and serial resets (583311 gas)
    ✓ should not allow minter to create a prime in the same generation with the same trait hash (25660 gas)
    ✓ should allow minter to create a prime in a different generation with same trait hash (583311 gas)
    ✓ should allow anyone to retrieve a prime by generation and serial number
    ✓ should allow anyone to retrieve a prime by token id
    ✓ should allow anyone to retrieve a prime's replication flags by token id

  Contract: ReplicantFactory
    ✓ should not allow system administrator to create a replicant (24453 gas)
    ✓ should not allow non-minters to create a replicant (24453 gas)
    ✓ should not allow minter to create a replicant with a hash used by a prime in same generation (25474 gas)
    ✓ should allow minter to create a replicant (382005 gas)
    ✓ should allow minter to create a replicant same generation, serial increases (397325 gas)
    ✓ should allow minter to create a replicant different generation, token id increases and serial resets (382261 gas)
    ✓ should not allow minter to create a replicant in the same generation with the same trait hash (25410 gas)
    ✓ should allow minter to create a replicant in a different generation with same trait hash (382261 gas)
    ✓ should allow anyone to retrieve a replicant by generation and serial number
    ✓ should allow anyone to retrieve a replicant by token id

  Contract: TraitFactory
    ✓ should allow sysadmin to create a trait (2442737 gas)
    ✓ should allow anyone to retrieve a trait's info
    ✓ should allow sysadmin to retrieve a trait's art
    ✓ should not allow non-sysadmins to create traits (181414 gas)
    ✓ should not allow non-sysadmins to retrieve a trait's art
    ✓ should allow sysadmin to create and retrieve another trait (1947876 gas)
    ✓ should allow sysadmin to create a trait and extend its art (39323102 gas)
    ✓ should not allow sysadmin to create trait with bad value for generation (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for gender (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for gene (6721975 gas)
    ✓ should not allow sysadmin to create trait with empty array for series (181380 gas)
    ✓ should not allow sysadmin to create trait with bad value for series (6721975 gas)
    ✓ should not allow sysadmin to create traits when contract is paused (238905 gas)
    ✓ should allow anyone to retrieve a trait id by generation, gene, and variation
    ✓ should allow descendent contracts to assemble artwork by generation and trait hash
    ✓ should allow the sysadmin to set the artist attribution for a generation (117704 gas)
    ✓ should allow anyone to retrieve the combined artist attribution for a generation

  114 passing (2m)

```

#### ** Gas by Contract Method **
```
·------------------------------------------------------|---------------------------|-------------|----------------------------·
|         Solc version: 0.5.12+commit.7709ece9         ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 8000000 gas  │
·······················································|···························|·············|·····························
|  Methods                                             ·               1 gwei/gas                ·       172.88 usd/eth       │
··························|····························|·············|·············|·············|··············|··············
|  Contract               ·  Method                    ·  Min        ·  Max        ·  Avg        ·  # calls     ·  usd (avg)  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  addMinter                 ·          -  ·          -  ·      45116  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  addOwner                  ·          -  ·          -  ·      45161  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  addSysAdmin               ·          -  ·          -  ·      45138  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  pause                     ·          -  ·          -  ·      43025  ·           4  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  unpause                   ·          -  ·          -  ·      14127  ·           5  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AccessControl          ·  upgradeContract           ·          -  ·          -  ·      30186  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarFactoryWrapper  ·  _mintAvastar              ·          -  ·          -  ·     221760  ·           2  ·       0.04  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarFactoryWrapper  ·  unpause                   ·          -  ·          -  ·      14161  ·           1  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  pause                     ·          -  ·          -  ·      43114  ·           6  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  setMediaUriBase           ·          -  ·          -  ·      37321  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  setTokenUriBase           ·          -  ·          -  ·      42981  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  setViewUriBase            ·          -  ·          -  ·      57940  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarMetadata        ·  unpause                   ·          -  ·          -  ·      14139  ·          20  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  deposit                   ·      34180  ·      64180  ·      46453  ·          11  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  pause                     ·          -  ·          -  ·      43070  ·           2  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  purchasePrime             ·     524544  ·     599864  ·     580986  ·           8  ·       0.10  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  setCurrentGeneration      ·          -  ·          -  ·      36703  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  setCurrentSeries          ·          -  ·          -  ·      29186  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  unpause                   ·          -  ·          -  ·      14138  ·           4  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  withdrawDepositorBalance  ·      20953  ·      26906  ·      23930  ·           4  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter     ·  withdrawFranchiseBalance  ·          -  ·          -  ·      31684  ·           3  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  approveTraitAccess        ·      59918  ·      89918  ·      79918  ·           3  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  mintPrime                 ·          -  ·          -  ·     583417  ·           1  ·       0.10  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  mintReplicant             ·          -  ·          -  ·     382498  ·           1  ·       0.07  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  unpause                   ·          -  ·          -  ·      14183  ·           1  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter      ·  useTraits                 ·          -  ·          -  ·     113264  ·           2  ·       0.02  │
··························|····························|·············|·············|·············|··············|··············
|  PrimeFactory           ·  addMinter                 ·          -  ·          -  ·      45250  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  PrimeFactory           ·  mintPrime                 ·     508055  ·     583375  ·     568273  ·          10  ·       0.10  │
··························|····························|·············|·············|·············|··············|··············
|  ReplicantFactory       ·  mintPrime                 ·          -  ·          -  ·     508375  ·           1  ·       0.09  │
··························|····························|·············|·············|·············|··············|··············
|  ReplicantFactory       ·  mintReplicant             ·     382005  ·     397325  ·     385552  ·           9  ·       0.07  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  createTrait               ·    1947876  ·    6640238  ·    2900991  ·           7  ·       0.50  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  extendTraitArt            ·    3012023  ·    5160893  ·    4083240  ·           9  ·       0.71  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  pause                     ·          -  ·          -  ·      43115  ·           1  ·       0.01  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  setAttribution            ·          -  ·          -  ·     117704  ·           2  ·       0.02  │
··························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper    ·  unpause                   ·          -  ·          -  ·      14150  ·           5  ·       0.00  │
··························|····························|·············|·············|·············|··············|··············
|  Deployments                                         ·                                         ·  % of limit  ·             │
·······················································|·············|·············|·············|··············|··············
|  AvastarBaseWrapper                                  ·          -  ·          -  ·     313602  ·       3.9 %  ·       0.05  │
·······················································|·············|·············|·············|··············|··············
|  AvastarMetadata                                     ·          -  ·          -  ·    2966133  ·      37.1 %  ·       0.51  │
·······················································|·············|·············|·············|··············|··············
|  AvastarPrimeMinter                                  ·          -  ·          -  ·    1231986  ·      15.4 %  ·       0.21  │
·······················································|·············|·············|·············|··············|··············
|  AvastarTeleporter                                   ·          -  ·          -  ·    6683153  ·      83.5 %  ·       1.16  │
·------------------------------------------------------|-------------|-------------|-------------|--------------|-------------·
```
<!-- tabs:end -->

