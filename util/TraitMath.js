const BN = require('bn.js');

module.exports = {
    computeHash: (traits) => {
        let hash = 0;
        if (traits && traits.length) {
            let slotMultiplier = new BN(256,0);
            hash = traits.reduce( (acc, trait) => {
                let variation = new BN(trait.variation, 10);
                let gene = new BN(trait.gene, 10);
                let slot = slotMultiplier.pow(gene);
                let value = variation.mul(slot);
                return acc.add(value);
            }, new BN(0,10) );
        }
        return hash;
    },
    computeArt: (traits) => {
        const svgOpen = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" height="1000px" width="1000px" viewBox="0 0 1000 1000">';
        const svgClose = '</svg>';
        let accumulator = svgOpen;

        if (traits.length) {
            traits.forEach(trait => accumulator += trait.svg);
        }

        accumulator += svgClose;
        return accumulator
    }

};

