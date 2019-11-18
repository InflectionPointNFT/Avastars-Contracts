# Contract Unit Test Output
```
  Contract: AccessControl
    ✓ should not allow non-sysadmins to pause the contract (21803 gas)
    ✓ should allow sysadmin to pause the contract when unpaused (43025 gas)
    ✓ should not allow non-sysadmins to unpause the contract (21804 gas)
    ✓ should allow sysadmin to unpause the contract when paused (14127 gas)
    ✓ should allow sysadmin to add a minter (45116 gas)
    ✓ should allow sysadmin to add an owner (45161 gas)
    ✓ should not allow non-sysadmins to set upgrade the contract when unpaused (23337 gas)
    ✓ should not allow sysadmin to upgrade the contract when unpaused (23560 gas)
    ✓ should not allow non-sysadmins to upgrade the contract when paused (80489 gas)
    ✓ should allow sysadmin to upgrade the contract when paused (73189 gas)
    ✓ should not allow sysadmin to unpause contract after the contract is upgraded (22264 gas)

  Contract: AvastarMinter
    ✓ should allow anyone to deposit ETH (64191 gas)
    ✓ should allow another depositor to deposit ETH (49191 gas)
    ✓ should allow a depositor to check their balance
    ✓ should allow a depositor to deposit more ETH (34191 gas)
    ✓ should show increased balance for a depositor after depositing more ETH
    ✓ should allow an owner to check the franchise balance, (zero if nothing has been purchased)
    ✓ should allow minter to purchase a prime if purchaser has already deposited ETH (522666 gas)
    ✓ should allow minter to purchase another prime if purchaser has sufficient ETH remaining (597986 gas)
    ✓ should show appropriately decreased balance for depositor after purchasing primes
    ✓ should allow a depositor to withdraw a non-zero balance (26939 gas)
    ✓ should not allow minter to purchase a prime if purchaser has withdrawn their balance (25613 gas)
    ✓ should allow an owner to check the franchise balance, (has value after purchases)
    ✓ should allow an owner to withdraw the franchise balance (31684 gas)
    ✓ should allow another depositor to check their balance
    ✓ should allow another depositor to withdraw a non-zero balance (20970 gas)
    ✓ should not allow non-sysadmins to set current series (22111 gas)
    ✓ should not allow system administrator to set current series if contract not paused (22334 gas)
    ✓ should allow system administrator to set current series if paused (101376 gas)
    ✓ should reflect change of series in newly minted primes (662049 gas)
    ✓ should not allow non-sysadmins to set current generation (22088 gas)
    ✓ should not allow system administrator to set current generation if contract not paused (22311 gas)
    ✓ should allow system administrator to set current generation if paused; series is reset (93807 gas)
    ✓ should reflect change of generation and series in newly minted primes (632049 gas)
    ✓ should allow minting of replicants from generation other than current generation (432221 gas)

  Contract: AvastarTeleporter
    ✓ should not allow system administrator to approve trait access for another user's primes (24662 gas)
    ✓ should not allow minter to approve trait access for another user's primes (24662 gas)
    ✓ should allow owner to approve trait access for a specific set of their primes (89326 gas)
    ✓ should allow a handler to use traits for primes they are approved for (43995 gas)
    ✓ should not allow a handler to use more traits on a prime without being approved again (23236 gas)

  Contract: PrimeFactory
    ✓ should not allow system administrator to create a prime (24572 gas)
    ✓ should not allow non-minters to create a prime (24572 gas)
    ✓ should allow minter to create a prime (505748 gas)
    ✓ should allow minter to create a prime in same generation but different series, token id and serial both increase (581132 gas)
    ✓ should allow minter to create a prime different generation first series, token id increases and serial resets (581004 gas)
    ✓ should not allow minter to create a prime in the same generation with the same trait hash (25593 gas)
    ✓ should allow minter to create a prime in a different generation with same trait hash (581068 gas)
    ✓ should allow anyone to retrieve a prime by generation and serial number
    ✓ should allow anyone to retrieve a prime by token id

  Contract: ReplicantFactory
    ✓ should not allow system administrator to create a replicant (24497 gas)
    ✓ should not allow non-minters to create a replicant (24497 gas)
    ✓ should not allow minter to create a replicant with a hash used by a prime in same generation (25518 gas)
    ✓ should allow minter to create a replicant (380860 gas)
    ✓ should allow minter to create a replicant same generation, serial increases (396180 gas)
    ✓ should allow minter to create a replicant different generation, token id increases and serial resets (381116 gas)
    ✓ should not allow minter to create a replicant in the same generation with the same trait hash (25454 gas)
    ✓ should allow minter to create a replicant in a different generation with same trait hash (381116 gas)
    ✓ should allow anyone to retrieve a replicant by generation and serial number
    ✓ should allow anyone to retrieve a replicant by token id

  Contract: TraitFactory
    ✓ should allow sysadmin to create a trait (2435985 gas)
    ✓ should allow sysadmin to retrieve a trait
    ✓ should not allow non-sysadmins to create traits (180495 gas)
    ✓ should allow non-sysadmins to retrieve a trait
    ✓ should allow sysadmin to create and retrieve another trait (1925067 gas)
    ✓ should not allow sysadmin to create trait with bad value for generation (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for gender (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for gene (6721975 gas)
    ✓ should not allow sysadmin to create trait with empty array for series (180482 gas)
    ✓ should not allow sysadmin to create trait with bad value for series (6721975 gas)
    ✓ should not allow sysadmin to create trait with bad value for variation (180862 gas)
    ✓ should not allow sysadmin to create traits when contract is paused (238041 gas)
    ✓ should allow anyone to retrieve a trait id by generation, gene, and variation
    ✓ should allow anyone to assemble artwork by generation and trait hash

·--------------------------------------------------|---------------------------|-------------|----------------------------·
|       Solc version: 0.5.12+commit.7709ece9       ·  Optimizer enabled: true  ·  Runs: 200  ·  Block limit: 8000000 gas  │
···················································|···························|·············|·····························
|  Methods                                         ·               1 gwei/gas                ·       180.03 usd/eth       │
······················|····························|·············|·············|·············|··············|··············
|  Contract           ·  Method                    ·  Min        ·  Max        ·  Avg        ·  # calls     ·  usd (avg)  │
······················|····························|·············|·············|·············|··············|··············
|  AccessControl      ·  addMinter                 ·          -  ·          -  ·      45116  ·           2  ·       0.01  │
······················|····························|·············|·············|·············|··············|··············
|  AccessControl      ·  addOwner                  ·          -  ·          -  ·      45161  ·           2  ·       0.01  │
······················|····························|·············|·············|·············|··············|··············
|  AccessControl      ·  pause                     ·          -  ·          -  ·      43025  ·           4  ·       0.01  │
······················|····························|·············|·············|·············|··············|··············
|  AccessControl      ·  unpause                   ·          -  ·          -  ·      14127  ·           5  ·       0.00  │
······················|····························|·············|·············|·············|··············|··············
|  AccessControl      ·  upgradeContract           ·          -  ·          -  ·      30164  ·           2  ·       0.01  │
······················|····························|·············|·············|·············|··············|··············
|  AvastarMinter      ·  deposit                   ·      34191  ·      64191  ·      45441  ·          12  ·       0.01  │
······················|····························|·············|·············|·············|··············|··············
|  AvastarMinter      ·  pause                     ·          -  ·          -  ·      43070  ·           2  ·       0.01  │
······················|····························|·············|·············|·············|··············|··············
|  AvastarMinter      ·  purchasePrime             ·     522666  ·     597986  ·     581191  ·           9  ·       0.10  │
······················|····························|·············|·············|·············|··············|··············
|  AvastarMinter      ·  purchaseReplicant         ·          -  ·          -  ·     398030  ·           1  ·       0.07  │
······················|····························|·············|·············|·············|··············|··············
|  AvastarMinter      ·  setCurrentGeneration      ·          -  ·          -  ·      36599  ·           1  ·       0.01  │
······················|····························|·············|·············|·············|··············|··············
|  AvastarMinter      ·  setCurrentSeries          ·          -  ·          -  ·      44168  ·           1  ·       0.01  │
······················|····························|·············|·············|·············|··············|··············
|  AvastarMinter      ·  unpause                   ·          -  ·          -  ·      14138  ·           4  ·       0.00  │
······················|····························|·············|·············|·············|··············|··············
|  AvastarMinter      ·  withdrawDepositorBalance  ·      20970  ·      26939  ·      23955  ·           4  ·       0.00  │
······················|····························|·············|·············|·············|··············|··············
|  AvastarMinter      ·  withdrawFranchiseBalance  ·          -  ·          -  ·      31684  ·           3  ·       0.01  │
······················|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter  ·  approveTraitAccess        ·          -  ·          -  ·      89326  ·           2  ·       0.02  │
······················|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter  ·  mintPrime                 ·          -  ·          -  ·     581115  ·           1  ·       0.10  │
······················|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter  ·  unpause                   ·          -  ·          -  ·      14172  ·           1  ·       0.00  │
······················|····························|·············|·············|·············|··············|··············
|  AvastarTeleporter  ·  useTraits                 ·          -  ·          -  ·      43995  ·           2  ·       0.01  │
······················|····························|·············|·············|·············|··············|··············
|  PrimeFactory       ·  addMinter                 ·          -  ·          -  ·      45161  ·           1  ·       0.01  │
······················|····························|·············|·············|·············|··············|··············
|  PrimeFactory       ·  mintPrime                 ·     505748  ·     581132  ·     564330  ·           9  ·       0.10  │
······················|····························|·············|·············|·············|··············|··············
|  ReplicantFactory   ·  mintPrime                 ·          -  ·          -  ·     506179  ·           1  ·       0.09  │
······················|····························|·············|·············|·············|··············|··············
|  ReplicantFactory   ·  mintReplicant             ·     380860  ·     396180  ·     384407  ·           9  ·       0.07  │
······················|····························|·············|·············|·············|··············|··············
|  TraitFactory       ·  createTrait               ·    1925067  ·    2435985  ·    2231618  ·           5  ·       0.40  │
······················|····························|·············|·············|·············|··············|··············
|  TraitFactory       ·  pause                     ·          -  ·          -  ·      43137  ·           1  ·       0.01  │
······················|····························|·············|·············|·············|··············|··············
|  TraitFactory       ·  unpause                   ·          -  ·          -  ·      14183  ·           4  ·       0.00  │
······················|····························|·············|·············|·············|··············|··············
|  Deployments                                     ·                                         ·  % of limit  ·             │
···················································|·············|·············|·············|··············|··············
|  AvastarMinter                                   ·          -  ·          -  ·    1341742  ·      16.8 %  ·       0.24  │
···················································|·············|·············|·············|··············|··············
|  AvastarTeleporter                               ·          -  ·          -  ·    5419187  ·      67.7 %  ·       0.98  │
·--------------------------------------------------|-------------|-------------|-------------|--------------|-------------·

  73 passing (36s)
```

