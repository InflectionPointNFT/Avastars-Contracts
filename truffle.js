const HDWalletProvider = require("truffle-hdwallet-provider");

const config = require('./environments');

module.exports = {
    compilers: {
        solc: {
            version: "0.5.14",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }
    },
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*",
            from: "0xd9D45b75ac74962d74dc5F24Dd02E1e1E828A7d0"
        },
        rinkeby: {
            provider: () => new HDWalletProvider(
                config[config.ENV.TEST.NAME].mnemonic,
                config[config.ENV.TEST.NAME].url,
                0, 10, true,     // 0 = start with first address, 10 = derive 10 addresses, true = sharedNonce
                "m/44'/1'/0'/0/" // BIP44 derivation path that is used for test networks (across all coins)
            ),
            network_id: "4"
        },
        mainnet: {
            provider: () => new HDWalletProvider(
                config[config.ENV.PROD.NAME].mnemonic,
                config[config.ENV.PROD.NAME].url,
                0, 10, true,      // 0 = start with first address, 10 = derive 10 addresses, true = sharedNonce
                "m/44'/60'/0'/0/" // BIP44 derivation path that is used for main net
            ),
            network_id: "1"
        }
    },
    mocha: {
        reporter: 'eth-gas-reporter',
        reporterOptions : {
            excludeContracts: ['Migrations'],
            currency: "USD"
        }
    },
};