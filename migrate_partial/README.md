# Partial Migration of Avastars Contracts
These files are used to temporarily replace those in the migrations folder 
when deploying changes to the AvastarMetadata and/or AvastarPrimeMinter contracts.

# Why?
Once the AvastarTeleporter contract has been deployed, had traits uploaded, and
has promos and some real avastars uploaded, we don't want to redeploy it, even though
the AvastarPrimeMinter and/or the AvastarMetadata contract might need replacement.

# What happens?
* Doesn't replace the Migrations contract or the AvastarTeleporter contract
* Deploys and configures the the AvastarMetadata and/or AvastarPrimeMinter contracts
* Sets the new AvastarMetadata contract address on the AvastarTeleporter contract