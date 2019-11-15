# Solidoc: Documentation Generator for Solidity

This command-line utility creates markdown-based documentation for your Solidity project(s) for the following platforms:

* Ethereum
* Ethereum Classic
* Tron
* Qtum
* Wanchain
* Aeternity
* Counterparty
* Rootstock
* Ubiq
* Monax


## Getting Started

```npm
sudo npm install solidoc -g
```

**CLI Arguments**

1. Path to truffle project (or similar) root.
2. Path to generate documentation to.
3. Compile. Optional, default: false.
4. Language. Optional, default: en.


**How to Use Solidoc?**

On your project root, run the following command.

```npm
solidoc ./ ./doc true
```

This will compile the contracts and generate documentation to the `docs` directory.

**Or edit package.json**

```json
  "scripts": {
    "docgen": "solidoc ./ ./docs"
  }
```

and run

```npm
npm run docgen
```

**Note**

Do not use compile (third argument) if you are using this on a non truffle project.

## Configuration File

Alternatively, you can create `solidoc.json` configuration file in your project root.

```json
{
  "pathToRoot": "./",
  "outputPath": "./docs",
  "compile": false,
  "compiler": "truffle compile",
  "language": "en"
}
```

and then call `solidoc` instead of passing any command line argument.


## Overrides

If you wish to change bits and pieces of the documentation generated, place `solidoc templates` on the following directory:

`./.solidoc/templates/`

[Solidoc Templates](templates)


You can also override language literals by copying and editing `i18n` files on the following path:

`./.solidoc/i18n/`



## Before You Try

- [OpenZeppelin Solidity Documentation](https://github.com/binodnp/openzeppelin-solidity/blob/master/docs/ERC721.md)
- [Open Source Vesting Schedule by Binod](https://github.com/binodnp/vesting-schedule/blob/master/docs/VestingSchedule.md)
- [Virtual Rehab Token](https://github.com/ViRehab/VirtualRehabToken/blob/master/docs/VRHToken.md)
- [Virtual Rehab Private Sale](https://github.com/ViRehab/VirtualRehabPrivateSale/blob/master/docs/PrivateSale.md)