const BN = require('bn.js');

module.exports = async function(web3, gasUsed) {
    let gasPrice, gasCost, result;
    try {
        const gasPriceAsStr = await web3.eth.getGasPrice();
        gasPrice = new BN(gasPriceAsStr, 10);
        gasCost = gasPrice.mul(new BN(gasUsed, 10));
        result = `Gas Used: ${gasUsed} units\t`;
        result += `Gas Price: ${gasPrice} wei\t`;
        result += `Gas Cost: ${web3.utils.fromWei(gasCost, 'ether')} ether`;

    } catch(e){
        console.log(e);
    }
    return result;
    
};