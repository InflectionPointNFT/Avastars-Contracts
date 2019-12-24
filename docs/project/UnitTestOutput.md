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

  Contract: AvastarPrimeMinter
    ✓ should allow anyone to deposit ETH (64180 gas)
    ✓ should allow another depositor to deposit ETH (49180 gas)
    ✓ should allow a depositor to check their balance
    ✓ should allow a depositor to deposit more ETH (34180 gas)
    ✓ should show increased balance for a depositor after depositing more ETH
    ✓ should allow an owner to check the franchise balance, (zero if nothing has been purchased)
    ✓ should allow minter to purchase a prime if purchaser has already deposited ETH (522312 gas)
    ✓ should allow minter to purchase another prime if purchaser has sufficient ETH remaining (597632 gas)
    ✓ should show appropriately decreased balance for depositor after purchasing primes
    ✓ should allow a depositor to withdraw a non-zero balance (26906 gas)
    ✓ should not allow minter to purchase a prime if purchaser has withdrawn their balance (25613 gas)
    ✓ should allow an owner to check the franchise balance, (has value after purchases)
    ✓ should allow an owner to withdraw the franchise balance (31684 gas)
    ✓ should allow another depositor to check their balance
    ✓ should allow another depositor to withdraw a non-zero balance (20953 gas)
    ✓ should not allow non-sysadmins to set current series (22111 gas)
    ✓ should not allow system administrator to set current series if contract not paused (22334 gas)
    ✓ should allow system administrator to set current series if paused (86451 gas)
    ✓ should reflect change of series in newly minted primes (661684 gas)
    ✓ should not allow non-sysadmins to set current generation (22088 gas)
    ✓ should not allow system administrator to set current generation if contract not paused (22311 gas)
    ✓ should allow system administrator to set current generation if paused; series is reset (93968 gas)
    ✓ should reflect change of generation and series in newly minted primes (631684 gas)

  Contract: AvastarTeleporter
    ✓ should allow anyone to get the metadata for an avastar
    ✓ should not allow system administrator to approve trait access for another user's primes (24662 gas)
    ✓ should not allow minter to approve trait access for another user's primes (24662 gas)
    ✓ should not allow an unapproved stranger to use traits on a prime (23347 gas)
    ✓ should allow owner to approve trait access for a specific set of their primes (89326 gas)
    ✓ should allow a handler to use traits for primes they are approved for (44106 gas)
    ✓ should not allow a handler to use more traits on a prime without being approved again (23347 gas)
    ✓ should allow anyone to render the art for a given Avastar
    ✓ should allow anyone to retrieve the wave for a given Avastar by Token ID
    ✓ should not allow system administrator to change the token URI base when contract is not paused (25109 gas)
    ✓ should allow the sysadmin to change the token URI base when contract is paused (100224 gas)

  Contract: PrimeFactory
    ✓ should not allow system administrator to create a prime (24594 gas)
    ✓ should not allow non-minters to create a prime (24594 gas)
    ✓ should allow minter to create a prime (505759 gas)
    ✓ should allow minter to create a prime in same generation but different series, token id and serial both increase (581143 gas)
    ✓ should allow minter to create a prime different generation first series, token id increases and serial resets (581015 gas)
    ✓ should not allow minter to create a prime in the same generation with the same trait hash (25615 gas)
    ✓ should allow minter to create a prime in a different generation with same trait hash (581079 gas)
    ✓ should allow anyone to retrieve a prime by generation and serial number
    ✓ should allow anyone to retrieve a prime by token id

  Contract: ReplicantFactory
    ✓ should not allow system administrator to create a replicant (24475 gas)
    ✓ should not allow non-minters to create a replicant (24475 gas)
    ✓ should not allow minter to create a replicant with a hash used by a prime in same generation (25496 gas)
    ✓ should allow minter to create a replicant (380827 gas)
    ✓ should allow minter to create a replicant same generation, serial increases (396147 gas)
    ✓ should allow minter to create a replicant different generation, token id increases and serial resets (381083 gas)
    ✓ should not allow minter to create a replicant in the same generation with the same trait hash (25432 gas)
    ✓ should allow minter to create a replicant in a different generation with same trait hash (381083 gas)
    ✓ should allow anyone to retrieve a replicant by generation and serial number
    ✓ should allow anyone to retrieve a replicant by token id

  Contract: TraitFactory
    ✓ should allow sysadmin to create a trait (2442080 gas)
    ✓ should allow anyone to retrieve a trait's info
    ✓ should allow sysadmin to retrieve a trait's art
    ✓ should not allow non-sysadmins to create traits (181343 gas)
    ✓ should not allow non-sysadmins to retrieve a trait's art
    ✓ should allow sysadmin to create and retrieve another trait (1947155 gas)
    ✓ should allow sysadmin to create a trait and extend its art (39297981 gas)
    ✓ should not allow sysadmin to create trait with bad value for generation (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for gender (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for gene (6721975 gas)
    ✓ should not allow sysadmin to create trait with empty array for series (180690 gas)
    ✓ should not allow sysadmin to create trait with bad value for series (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for variation (181006 gas)
    ✓ should not allow sysadmin to create traits when contract is paused (238800 gas)
    ✓ should allow anyone to retrieve a trait id by generation, gene, and variation
    ✓ should allow descendent contracts to assemble artwork by generation and trait hash
    ✓ should allow the sysadmin to set the artist attribution for a generation (117107 gas)
    ✓ should allow anyone to retrieve the artist attribution for a generation

  85 passing (3m)
```

#### ** Gas by Contract Method **
```
·----------------------------------------------------|---------------------------|-------------|----------------------------·
|        Solc version: 0.5.12+commit.7709ece9        ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 8000000 gas  │
·····················································|···························|·············|·····························
|  Methods                                           ·               1 gwei/gas                ·       127.45 usd/eth       │
························|····························|·············|·············|·············|··············|··············
|  Contract             ·  Method                    ·  Min        ·  Max        ·  Avg        ·  # calls     ·  usd (avg)  │
························|····························|·············|·············|·············|··············|··············
|  AccessControl        ·  addMinter                 ·          -  ·          -  ·      45116  ·           2  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  AccessControl        ·  addOwner                  ·          -  ·          -  ·      45161  ·           2  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  AccessControl        ·  addSysAdmin               ·          -  ·          -  ·      45138  ·           2  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  AccessControl        ·  pause                     ·          -  ·          -  ·      43025  ·           4  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  AccessControl        ·  unpause                   ·          -  ·          -  ·      14127  ·           5  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  AccessControl        ·  upgradeContract           ·          -  ·          -  ·      30186  ·           2  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter   ·  deposit                   ·      34180  ·      64180  ·      46453  ·          11  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter   ·  pause                     ·          -  ·          -  ·      43070  ·           2  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter   ·  purchasePrime             ·     522312  ·     597632  ·     578754  ·           8  ·       0.07  │
························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter   ·  setCurrentGeneration      ·          -  ·          -  ·      36760  ·           1  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter   ·  setCurrentSeries          ·          -  ·          -  ·      29243  ·           1  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter   ·  unpause                   ·          -  ·          -  ·      14138  ·           4  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter   ·  withdrawDepositorBalance  ·      20953  ·      26906  ·      23930  ·           4  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter   ·  withdrawFranchiseBalance  ·          -  ·          -  ·      31684  ·           3  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter    ·  approveTraitAccess        ·          -  ·          -  ·      89326  ·           2  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter    ·  createTrait               ·          -  ·          -  ·    4599918  ·           2  ·       0.59  │
························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter    ·  pause                     ·          -  ·          -  ·      43071  ·           1  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter    ·  setTokenUriBase           ·          -  ·          -  ·      43003  ·           1  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter    ·  unpause                   ·          -  ·          -  ·      14150  ·           2  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter    ·  useTraits                 ·          -  ·          -  ·      44106  ·           2  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  PrimeFactory         ·  addMinter                 ·          -  ·          -  ·      45161  ·           1  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  PrimeFactory         ·  mintPrime                 ·     505759  ·     581143  ·     564341  ·           9  ·       0.07  │
························|····························|·············|·············|·············|··············|··············
|  ReplicantFactory     ·  mintPrime                 ·          -  ·          -  ·     506057  ·           1  ·       0.06  │
························|····························|·············|·············|·············|··············|··············
|  ReplicantFactory     ·  mintReplicant             ·     380827  ·     396147  ·     384374  ·           9  ·       0.05  │
························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper  ·  createTrait               ·    1947155  ·    6624517  ·    2898164  ·           7  ·       0.37  │
························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper  ·  extendTraitArt            ·    3010848  ·    5159718  ·    4082065  ·           9  ·       0.52  │
························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper  ·  pause                     ·          -  ·          -  ·      43070  ·           1  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper  ·  setAttribution            ·          -  ·          -  ·     117107  ·           2  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper  ·  unpause                   ·          -  ·          -  ·      14161  ·           5  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  Deployments                                       ·                                         ·  % of limit  ·             │
·····················································|·············|·············|·············|··············|··············
|  AvastarBaseWrapper                                ·          -  ·          -  ·     313602  ·       3.9 %  ·       0.04  │
·····················································|·············|·············|·············|··············|··············
|  AvastarMetadata                                   ·          -  ·          -  ·    1409189  ·      17.6 %  ·       0.18  │
·····················································|·············|·············|·············|··············|··············
|  AvastarPrimeMinter                                ·          -  ·          -  ·    1231922  ·      15.4 %  ·       0.16  │
·····················································|·············|·············|·············|··············|··············
|  AvastarTeleporter                                 ·          -  ·          -  ·    6169955  ·      77.1 %  ·       0.79  │
·----------------------------------------------------|-------------|-------------|-------------|--------------|-------------·
```
<!-- tabs:end -->

