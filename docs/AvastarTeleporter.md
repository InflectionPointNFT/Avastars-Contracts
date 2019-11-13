# AvastarTeleporter
Management of Avastar Primes, Replicants, and Traits
## isAvastarTeleporter

Acknowledge contract is AvastarTeleporter


|Input/Output|Data Type|Variable Name|Comment|
|----------|----------|----------|----------|
|output|bool|N/A|always true|

## approveTraitAccess

Approve a handler to manage trait access for a set of Avastar Primes


|Input/Output|Data Type|Variable Name|Comment|
|----------|----------|----------|----------|
|input|address|_handler|the address approved for Trait access|
|input|undefined|_primeIds|the token ids for which to approve the handler|

## useTraits

*Caller must be token owner OR the approved handler*

Mark some or all of an Avastar Prime's traits used.


|Input/Output|Data Type|Variable Name|Comment|
|----------|----------|----------|----------|
|input|uint256|_primeId|the token id for the Prime whose Traits are to be used|
|input|undefined|_traitFlags|an array of no more than 32 booleans representing the Traits to be used|

