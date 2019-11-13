# Contract Unit Test Output
```
  Contract: AccessControl
    ✓ should not allow non-sysadmins to pause the contract (299ms)
    ✓ should allow sysadmin to pause the contract when unpaused (62ms)
    ✓ should not allow non-sysadmins to unpause the contract (78ms)
    ✓ should allow sysadmin to unpause the contract when paused (71ms)
    ✓ should allow sysadmin to add a minter (58ms)
    ✓ should allow sysadmin to add an owner (61ms)
    ✓ should not allow non-sysadmins to set upgrade the contract when unpaused (59ms)
    ✓ should not allow sysadmin to upgrade the contract when unpaused (61ms)
    ✓ should not allow non-sysadmins to upgrade the contract when paused (169ms)
    ✓ should allow sysadmin to upgrade the contract when paused (131ms)
    ✓ should not allow sysadmin to unpause contract after the contract is upgraded (68ms)

  Contract: AvastarMinter
    ✓ should allow anyone to deposit ETH (57ms)
    ✓ should allow another depositor to deposit ETH (55ms)
    ✓ should allow a depositor to check their balance
    ✓ should allow a depositor to deposit more ETH (58ms)
    ✓ should show increased balance for a depositor after depositing more ETH
    ✓ should allow an owner to check the franchise balance, (zero if nothing has been purchased)
    ✓ should allow minter to purchase a prime if purchaser has already deposited ETH (154ms)
    ✓ should allow minter to purchase another prime if purchaser has sufficient ETH remaining (169ms)
    ✓ should show appropriately decreased balance for depositor after purchasing primes
    ✓ should allow a depositor to withdraw a non-zero balance (94ms)
    ✓ should not allow minter to purchase a prime if purchaser has withdrawn their balance (57ms)
    ✓ should allow an owner to check the franchise balance, (has value after purchases)
    ✓ should allow an owner to withdraw the franchise balance (79ms)
    ✓ should allow another depositor to check their balance
    ✓ should allow another depositor to withdraw a non-zero balance (70ms)
    ✓ should not allow non-sysadmins to set current series (65ms)
    ✓ should not allow system administrator to set current series if contract not paused (54ms)
    ✓ should allow system administrator to set current series if paused (142ms)
    ✓ should reflect change of series in newly minted primes (255ms)
    ✓ should not allow non-sysadmins to set current generation (50ms)
    ✓ should not allow system administrator to set current generation if contract not paused (62ms)
    ✓ should allow system administrator to set current generation if paused; series is reset (136ms)
    ✓ should reflect change of generation and series in newly minted primes (217ms)
    ✓ should allow minting of replicants from generation other than current generation (183ms)

  Contract: AvastarTeleporter
    ✓ should not allow system administrator to approve trait access for another user's primes (57ms)
    ✓ should not allow minter to approve trait access for another user's primes (52ms)
    ✓ should allow owner to approve trait access for a specific set of their primes (64ms)
    ✓ should allow a handler to use traits for primes they are approved for (92ms)
    ✓ should not allow a handler to use more traits on a prime without being approved again (51ms)

  Contract: PrimeFactory
    ✓ should not allow system administrator to create a prime (55ms)
    ✓ should not allow non-minters to create a prime (60ms)
    ✓ should allow minter to create a prime (115ms)
    ✓ should allow minter to create a prime in same generation but different series, token id and serial both increase (130ms)
    ✓ should allow minter to create a prime different generation first series, token id increases and serial resets (149ms)
    ✓ should not allow minter to create a prime in the same generation with the same trait hash (60ms)
    ✓ should allow minter to create a prime in a different generation with same trait hash (136ms)
    ✓ should allow anyone to retrieve a prime by generation and serial number (60ms)
    ✓ should allow anyone to retrieve a prime by token id (72ms)

  Contract: ReplicantFactory
    ✓ should not allow system administrator to create a replicant (54ms)
    ✓ should not allow non-minters to create a replicant (59ms)
    ✓ should not allow minter to create a replicant with a hash used by a prime in same generation (56ms)
    ✓ should allow minter to create a replicant (107ms)
    ✓ should allow minter to create a replicant same generation, serial increases (112ms)
    ✓ should allow minter to create a replicant different generation, token id increases and serial resets (115ms)
    ✓ should not allow minter to create a replicant in the same generation with the same trait hash (58ms)
    ✓ should allow minter to create a replicant in a different generation with same trait hash (113ms)
    ✓ should allow anyone to retrieve a replicant by generation and serial number
    ✓ should allow anyone to retrieve a replicant by token id

  Contract: TraitFactory
    ✓ should allow sysadmin to create a trait (647ms)
    ✓ should allow sysadmin to retrieve a trait (148ms)
    ✓ should not allow non-sysadmins to create traits (60ms)
    ✓ should allow non-sysadmins to retrieve a trait (144ms)
    ✓ should allow sysadmin to create and retrieve another trait (608ms)
    ✓ should not allow sysadmin to create trait with bad value for generation (68ms)
    ✓ should not allow sysadmin to create trait with bad value for gender (231ms)
    ✓ should not allow sysadmin to create trait with bad value for gene (141ms)
    ✓ should not allow sysadmin to create trait with empty array for series (74ms)
    ✓ should not allow sysadmin to create trait with bad value for series (90ms)
    ✓ should not allow sysadmin to create trait with bad value for variation (80ms)
    ✓ should not allow sysadmin to create traits when contract is paused (168ms)
    ✓ should allow anyone to retrieve a trait id by generation, gene, and variation
    ✓ should allow anyone to assemble artwork by generation and trait hash (7395ms)

  73 passing (18s)
```

