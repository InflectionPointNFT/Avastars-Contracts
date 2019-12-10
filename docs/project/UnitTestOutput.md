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
    ✓ should not allow system administrator to approve trait access for another user's primes (24551 gas)
    ✓ should not allow minter to approve trait access for another user's primes (24551 gas)
    ✓ should not allow an unapproved stranger to use traits on a prime (23325 gas)
    ✓ should allow owner to approve trait access for a specific set of their primes (89215 gas)
    ✓ should allow a handler to use traits for primes they are approved for (44084 gas)
    ✓ should not allow a handler to use more traits on a prime without being approved again (23325 gas)
    ✓ should allow anyone to render the art for a given Avastar

  Contract: PrimeFactory
    ✓ should not allow system administrator to create a prime (24572 gas)
    ✓ should not allow non-minters to create a prime (24572 gas)
    ✓ should allow minter to create a prime (505737 gas)
    ✓ should allow minter to create a prime in same generation but different series, token id and serial both increase (581121 gas)
    ✓ should allow minter to create a prime different generation first series, token id increases and serial resets (580993 gas)
    ✓ should not allow minter to create a prime in the same generation with the same trait hash (25593 gas)
    ✓ should allow minter to create a prime in a different generation with same trait hash (581057 gas)
    ✓ should allow anyone to retrieve a prime by generation and serial number
    ✓ should allow anyone to retrieve a prime by token id

  Contract: ReplicantFactory
    ✓ should not allow system administrator to create a replicant (24453 gas)
    ✓ should not allow non-minters to create a replicant (24453 gas)
    ✓ should not allow minter to create a replicant with a hash used by a prime in same generation (25474 gas)
    ✓ should allow minter to create a replicant (380805 gas)
    ✓ should allow minter to create a replicant same generation, serial increases (396125 gas)
    ✓ should allow minter to create a replicant different generation, token id increases and serial resets (381061 gas)
    ✓ should not allow minter to create a replicant in the same generation with the same trait hash (25410 gas)
    ✓ should allow minter to create a replicant in a different generation with same trait hash (381061 gas)
    ✓ should allow anyone to retrieve a replicant by generation and serial number
    ✓ should allow anyone to retrieve a replicant by token id

  Contract: TraitFactory
    ✓ should allow sysadmin to create a trait (2436256 gas)
    ✓ should allow sysadmin to retrieve a trait
    ✓ should not allow non-sysadmins to create traits (181219 gas)
    ✓ should not allow non-sysadmins to retrieve a trait
    ✓ should allow sysadmin to create and retrieve another trait (1941395 gas)
    ✓ should allow sysadmin to create a trait and extend its art (39292044 gas)
    ✓ should not allow sysadmin to create trait with bad value for generation (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for gender (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for gene (6721975 gas)
    ✓ should not allow sysadmin to create trait with empty array for series (180438 gas)
    ✓ should not allow sysadmin to create trait with bad value for series (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for variation (180818 gas)
    ✓ should not allow sysadmin to create traits when contract is paused (238688 gas)
    ✓ should allow anyone to retrieve a trait id by generation, gene, and variation
    ✓ should allow descendent contracts to assemble artwork by generation and trait hash
    ✓ should allow descendent contracts to concatenate two strings
    ✓ should allow the sysadmin to set the artist attribution for a generation (117107 gas)
    ✓ should allow anyone to retrieve the artist attribution for a generation

  79 passing (1m)

```

#### ** Gas by Contract Method **
```
·----------------------------------------------------|---------------------------|-------------|----------------------------·
|        Solc version: 0.5.12+commit.7709ece9        ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 8000000 gas  │
·····················································|···························|·············|·····························
|  Methods                                           ·               1 gwei/gas                ·       145.11 usd/eth       │
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
|  AvastarPrimeMinter   ·  purchasePrime             ·     522312  ·     597632  ·     578754  ·           8  ·       0.08  │
························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter   ·  setCurrentGeneration      ·          -  ·          -  ·      36760  ·           1  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter   ·  setCurrentSeries          ·          -  ·          -  ·      29243  ·           1  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter   ·  unpause                   ·          -  ·          -  ·      14138  ·           4  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter   ·  withdrawDepositorBalance  ·      20953  ·      26906  ·      23930  ·           4  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  AvastarPrimeMinter   ·  withdrawFranchiseBalance  ·          -  ·          -  ·      31684  ·           3  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter    ·  approveTraitAccess        ·          -  ·          -  ·      89215  ·           2  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter    ·  createTrait               ·          -  ·          -  ·    4594071  ·           1  ·       0.67  │
························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter    ·  unpause                   ·          -  ·          -  ·      14161  ·           1  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter    ·  useTraits                 ·          -  ·          -  ·      44084  ·           2  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  PrimeFactory         ·  addMinter                 ·          -  ·          -  ·      45139  ·           1  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  PrimeFactory         ·  mintPrime                 ·     505737  ·     581121  ·     564319  ·           9  ·       0.08  │
························|····························|·············|·············|·············|··············|··············
|  ReplicantFactory     ·  mintPrime                 ·          -  ·          -  ·     506146  ·           1  ·       0.07  │
························|····························|·············|·············|·············|··············|··············
|  ReplicantFactory     ·  mintReplicant             ·     380805  ·     396125  ·     384352  ·           9  ·       0.06  │
························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper  ·  createTrait               ·    1941395  ·    6618756  ·    2968386  ·           6  ·       0.43  │
························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper  ·  extendTraitArt            ·    3010826  ·    5159696  ·    4082043  ·           9  ·       0.59  │
························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper  ·  pause                     ·          -  ·          -  ·      43093  ·           1  ·       0.01  │
························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper  ·  setAttribution            ·          -  ·          -  ·     117107  ·           2  ·       0.02  │
························|····························|·············|·············|·············|··············|··············
|  TraitFactoryWrapper  ·  unpause                   ·          -  ·          -  ·      14150  ·           6  ·       0.00  │
························|····························|·············|·············|·············|··············|··············
|  Deployments                                       ·                                         ·  % of limit  ·             │
·····················································|·············|·············|·············|··············|··············
|  AvastarPrimeMinter                                ·          -  ·          -  ·    1231922  ·      15.4 %  ·       0.18  │
·····················································|·············|·············|·············|··············|··············
|  AvastarTeleporter                                 ·          -  ·          -  ·    5640155  ·      70.5 %  ·       0.82  │
·----------------------------------------------------|-------------|-------------|-------------|--------------|-------------·
```
<!-- tabs:end -->

