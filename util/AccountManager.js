const config = require('../environments');

module.exports = {

    getEnvByNetwork: function(network) {
        let env = Object.keys(config.ENV).find(e => config.ENV[e].NETWORK === network);
        return config.ENV[env].NAME;
    },

    getAccounts: function(env) {
        return config[env].accounts;
    }
};