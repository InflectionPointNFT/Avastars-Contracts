# AvastarMinter
*Manages current generation and series*
Mints Avastars using the AvastarTeleporter contract on behalf of depositors
## setTeleporterContract

*Only invokable by sysAdmin role, when contract is paused and not upgraded*

Set the address of the AvastarTeleporter contract


|Input/Output|Data Type|Variable Name|Comment|
|----------|----------|----------|----------|
|input|address|_address|address of AvastarTeleporter contract|

## setCurrentGeneration

*Emits GenerationSet event with new value of currentGeneration*

Set the Generation to be minted


|Input/Output|Data Type|Variable Name|Comment|
|----------|----------|----------|----------|
|input|undefined|_generation|the new value for currentGeneration|

## setCurrentSeries

*Emits CurrentSeriesSet event with new value of currentSeries*

Set the Series to be minted


|Input/Output|Data Type|Variable Name|Comment|
|----------|----------|----------|----------|
|input|undefined|_series|the new value for currentSeries|

## deposit

*Emits DepositorBalance event with depositor's resulting balance*

Allow anyone to deposit ETH


## checkDepositorBalance

*Invokable by any address (other than 0)*

Allow anyone to check their deposit balance


|Input/Output|Data Type|Variable Name|Comment|
|----------|----------|----------|----------|
|output|uint256|N/A|the depositor's current ETH balance in the contract|

## withdrawDepositorBalance

*Emits DepositorBalance event of 0 amount once transfer is complete*

Allow a depositor with a balance to withdraw it


|Input/Output|Data Type|Variable Name|Comment|
|----------|----------|----------|----------|
|output|uint256|N/A|amount withdrawn|

## checkFranchiseBalance

*Invokable only by owner address*

Allow owner to check the withdrawable franchise balance


|Input/Output|Data Type|Variable Name|Comment|
|----------|----------|----------|----------|
|output|uint256|N/A|the available franchise balance|

## withdrawFranchiseBalance

*Emits FranchiseBalanceWithdrawn event with amount withdrawn*

Allow an owner to withdraw the franchise balance


|Input/Output|Data Type|Variable Name|Comment|
|----------|----------|----------|----------|
|output|uint256|N/A|amount withdrawn|

## purchasePrime

*Invokable only by minter address, when contract is not paused*

Mint an Avastar Prime for a purchaser who has previously deposited funds


|Input/Output|Data Type|Variable Name|Comment|
|----------|----------|----------|----------|
|input|address|_purchaser|address that will own the token|
|input|uint256|_price|price in ETH of token, removed from purchaser's deposit balance|
|input|uint256|_traits|the Avastar's Trait hash|
|input|undefined|_gender|the Avastar's Gender|
|input|uint8|_ranking|the Avastar's Ranking|
|output|uint256|N/A|N/A|
|output|uint256|N/A|N/A|

## purchaseReplicant

*Invokable only by minter address, when contract is not paused*

Mint an Avastar Replicant for a purchaser who has previously deposited funds


|Input/Output|Data Type|Variable Name|Comment|
|----------|----------|----------|----------|
|input|address|_purchaser|address that will own the token|
|input|uint256|_price|price in ETH of token, removed from purchaser's deposit balance|
|input|uint256|_traits|the Avastar's Trait hash|
|input|undefined|_generation|the Avastar's Generation|
|input|undefined|_gender|the Avastar's Gender|
|input|uint8|_ranking|the Avastar's Ranking|
|output|uint256|N/A|N/A|
|output|uint256|N/A|N/A|

