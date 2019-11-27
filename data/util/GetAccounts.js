module.exports = async function(web3) {

    const accounts = await web3.eth.getAccounts();
    return {
        sysAdmin: accounts[0],
        owner: accounts[1],
        minter: accounts[2],
        tokenOwner: accounts[3],
        stranger: accounts[4]
    };

};