#!/bin/bash
npx truffle-flattener contracts/AvastarTeleporter.sol > flat/AvastarTeleporter.flat.sol &&
npx truffle-flattener contracts/AvastarPrimeMinter.sol > flat/AvastarPrimeMinter.flat.sol &&
npx truffle-flattener contracts/AvastarMetadata.sol > flat/AvastarMetadata.flat.sol
