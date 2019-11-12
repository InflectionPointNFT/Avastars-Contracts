const path = require('path');
const HDWalletProvider = require("truffle-hdwallet-provider");

// MetaMask or Ganache Seed Phrase
const keys = require('./.project_keys');

// Use your Infura project id
const url = `https://ropsten.infura.io/v3/${keys.infura_project}`;

module.exports = {
    compilers: {
        solc: {
            version: "0.5.12",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }        }
    },
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*"
        },
        ropsten: {
            provider: () => new HDWalletProvider(keys.mnemonic, url, 1),
            network_id: "3"
        }
    }
};