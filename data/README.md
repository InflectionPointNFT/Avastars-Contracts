# Avastars Preloaded Contract Data
Once contracts are migrated to a network, and at the beginning of each subsequent Generation, 
there are a few scripts that need to be run to prepare for operation. 

The scripts are run from within the truffle console, started with the appropriate network name 
as described in the [Truffle Config](../truffle.js), e.g., `truffle console --network 'ropsten'`

It is important to do the following steps in order
* Set Artist Attribution
* Create Traits
* Create Promos

If you create the Promos first, then the contract will no longer allow changes to the traits
or artist attribution for the given generation. Doing the artist attribution first ensures
you don't forget it between the two much longer and more laborious processes of creating 
traits and promos.


## Set Artist Attribution
This is quick and easy, and just sets the artist name and website address for the generation.
First, edit the `data/attribution/set-attribution.js` file and edit the attribution constant:
```
const attribution = {
    "generation": constants.GENERATION.ONE,
    "artist": "Marmota vs Milky",
    "infoURI": "https://www.twine.fm/marmotavsmilky"

};
```

#### truffle(ropsten)> `exec data/attribution/set-attribution.js`

The output will indicate success and you can move on.

## Create Traits
We start with a [JSON dump](data/create-traits.json) of traits for a given generation from the 
dashboard database.

Then we use a restartable script to create the corresponding trait data on the contract. It will 
likely fail several times during operation, and can take 5 hours or more, depending upon the gas 
price you set in the target network's section of [Truffle Config](../truffle.js).
 
Unfortunately, due to the fact that truffle executed scripts can't be sent arguments, we have
to manually set the network at the top of the file before executing the script:

```
//--------------------------{SET ME FIRST}---------------------
const NETWORK = 'development';
//const NETWORK = 'ropsten';
//const NETWORK = 'rinkeby';
//const NETWORK = 'mainnet';
//--------------------------{SET ME FIRST}---------------------
```

And just in case you've fired off the script on the wrong network, there's also a safety catch 
a little further down into the script, after it prints the network it's about to do stuff to:

```
// ------------------------{SAFETY CATCH: Comment out to run}------------------
process.exit();
// ------------------------{SAFETY CATCH: Comment out to run}------------------
```

By default, the gasPrice is set in the config file to `2000000000, // 2 GWei`, however you should
go to Eth Gas Station's [Tx Calculator](https://ethgasstation.info/calculatorTxV.php) if you are
running against mainnet and check to see how long a transaction using `5619913` gas would take
at various gas prices. This can make the difference between hours and days to complete. If you
have several days, you might run it at a low gas price like 2 gwei, but if you need it done in 
6 hours or less, you might have to pay 4 or 5 gwei for gas. Also, if you set it too high, you 
can pay an astronomically high price, so it's key to get this value right before launching the
script.

#### truffle(ropsten)> `exec data/traits/create-traits.js`

As it progresses, output will go to the console, and to a file with the network name in it,
e.g., `data/trats/create-traits.mainnet.txt`. Delete the file or rename it if it exists when 
starting a new generation's trait creation.

If the process fails, and remove *everything* after the last successful trait completed before
the error message, including the newline character at the end of the last successful trait's line.
DO NOT leave a blank line at the end of the file or it will be overwritten upon restarting the 
script. 

When restarting the script, it will read the log file and add up all the gas spent so far, the
costliest trait encountered so far, and most importantly, the last trait successfully written.
Then it will resume where it left off.

It is possible that the trait IDs assigned after a restart will not be the next number you expect.
This is because the traits are sometimes broken into several pieces and sent up with multiple
transactions. The first transaction calls the `createTrait` function on the contract while the
rest call `extendTraitArt`. If it failed in the middle of extending a trait, then that id will
be abandoned. It will create a new trait with the next id after the failed trait, and then extend
that. Trait ids don't have to be contiguous, so this is not a problem. 

## Verify Traits
Since the traits are so important to the proper operation of the contract, it is worthwhile to 
verify the traits once they have been created.

#### truffle(ropsten)> `exec data/traits/verify-traits.js`

It will output afile with the network name in it, e.g., `data/trats/verivy-traits.mainnet.txt`
and there will be a checkbox at the end of each line with a + or - sign indicating whether
the trait verified properly or not.

If there are traits that did not verify, you will need to temporarily remove all other traits
from the JSON file manually and then rerun the `create-traits.js` script to recreate the invalid
traits. The information will be added to the end of the corresponding log file. Once you've done
that, run `verify-traits.js` again, and it will only attempt to verify the traits in the JSON
input file, and will add their status to the end of the verification log file.

## Create Promos
This process also begins with a [JSON dump](data/promos/create-promos.json) from the dashboard
database of the Series 0 hand-crafted promo avastars for the given generation. 

Unfortunately, due to the fact that truffle executed scripts can't be sent arguments, we have
to manually set the network at the top of the file before executing the script:

```
//--------------------------{SET ME FIRST}---------------------
const NETWORK = 'development';
//const NETWORK = 'ropsten';
//const NETWORK = 'rinkeby';
//const NETWORK = 'mainnet';
//--------------------------{SET ME FIRST}---------------------
```

And just in case you've fired off the script on the wrong network, there's also a safety catch 
a little further down into the script, after it prints the network it's about to do stuff to:

```
// ------------------------{SAFETY CATCH: Comment out to run}------------------
process.exit();
// ------------------------{SAFETY CATCH: Comment out to run}------------------
```

Then we use a restartable script to generate the promos. Because network conditions and gas
prices can change between time you start the trait creation script and the time you begin creating
promos, it's a good idea to revisit Eth Gas Station's [Tx Calculator](https://ethgasstation.info/calculatorTxV.php)
for guidance, and adjust your gas price in [Truffle Config](../truffle.js) for the network you're
working with, particularly mainnet.

#### truffle(ropsten)> `exec data/promos/create-promos.js`

As it progresses, output will go to the console, and to a file with the network name in it,
e.g., `data/promos/create-promos.mainnet.txt`. Delete the file if it exists when starting a new
generation's promo creation.

Compared to trait creation, this process will go much faster, and more reliably. It still might
fail, so, if it does, remove *everything* after the last successful promo minted before
the error message, including the newline character at the end of the last successful promo's line.
DO NOT leave a blank line at the end of the file or it will be overwritten upon restarting the 
script. 

Unlike the trait creation script, when restarting, the script *should* begin at the next token ID
after the last successful one, since it's not a multi-transaction process.