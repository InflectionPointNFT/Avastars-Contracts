module.exports = async function(web3) {

    const accounts = await web3.eth.getAccounts();
    return {
        admins: [
            accounts[0],
            accounts[1]
        ],
        owners: [
            accounts[2],
            accounts[3]
        ],
        minters: [
            accounts[4],
            accounts[5],
            accounts[6],
            accounts[7],
            accounts[8],
            accounts[9]
        ]
    };

};