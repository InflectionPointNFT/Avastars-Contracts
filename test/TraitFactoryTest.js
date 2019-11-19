const TraitFactory = artifacts.require("./TraitFactory.sol");
const truffleAssert = require('truffle-assertions');
const exceptions = require ("./util/Exceptions");
const constants = require("./util/Constants");
const traitMath = require("./util/TraitMath");
const BN = require('bn.js');

contract('TraitFactory', function(accounts) {

    let contract ;
    const sysAdmin = accounts[0];
    const nonSysAdmin = accounts[1];

    const trait1 = {
        "generation": constants.GENERATION.ONE,
        "gender" : constants.GENDER.MALE,
        "gene" : constants.GENE.EARS,
        "name" : "Square",
        "series" : [ constants.SERIES.TWO, constants.SERIES.THREE ],
        "svg" : "<pattern id=\"ear_i\" width=\"48\" height=\"48\" y=\"1000\" overflow=\"visible\" patternUnits=\"userSpaceOnUse\" viewBox=\"4.8 -52.8 48 48\"><defs><path id=\"ear_a\" d=\"M4.8-52.8h48v48h-48z\"/></defs><clipPath id=\"ear_b\"><use overflow=\"visible\" xlink:href=\"#ear_a\"/></clipPath><g class=\"skin_dark\" clip-path=\"url(#ear_b)\"><path d=\"M28.8-57.6c2.7 0 4.8 2.1 4.8 4.8S31.5-48 28.8-48 24-50.2 24-52.8c0-2.7 2.1-4.8 4.8-4.8zM52.8-57.6c2.7 0 4.8 2.1 4.8 4.8S55.5-48 52.8-48 48-50.2 48-52.8c0-2.7 2.1-4.8 4.8-4.8zM28.8-33.6c2.7 0 4.8 2.1 4.8 4.8S31.5-24 28.8-24 24-26.1 24-28.8s2.1-4.8 4.8-4.8zM52.8-33.6c2.7 0 4.8 2.1 4.8 4.8S55.5-24 52.8-24 48-26.1 48-28.8s2.1-4.8 4.8-4.8zM40.8-45.6c2.7 0 4.8 2.1 4.8 4.8S43.5-36 40.8-36 36-38.2 36-40.8c0-2.7 2.1-4.8 4.8-4.8zM16.8-45.6c2.7 0 4.8 2.1 4.8 4.8S19.5-36 16.8-36 12-38.2 12-40.8c0-2.7 2.1-4.8 4.8-4.8zM40.8-21.6c2.7 0 4.8 2.1 4.8 4.8S43.5-12 40.8-12 36-14.1 36-16.8s2.1-4.8 4.8-4.8zM16.8-21.6c2.7 0 4.8 2.1 4.8 4.8S19.5-12 16.8-12 12-14.1 12-16.8s2.1-4.8 4.8-4.8z\"/></g><defs><path id=\"ear_c\" d=\"M4.8-52.8h48v48h-48z\"/></defs><clipPath id=\"ear_d\"><use overflow=\"visible\" xlink:href=\"#ear_c\"/></clipPath><g class=\"skin_dark\" clip-path=\"url(#ear_d)\"><path d=\"M4.8-57.6c2.7 0 4.8 2.1 4.8 4.8S7.5-48 4.8-48 0-50.1 0-52.8s2.1-4.8 4.8-4.8zM4.8-33.6c2.7 0 4.8 2.1 4.8 4.8S7.5-24 4.8-24 0-26.1 0-28.8s2.1-4.8 4.8-4.8z\"/></g><g><defs><path id=\"ear_e\" d=\"M4.8-52.8h48v48h-48z\"/></defs><clipPath id=\"ear_f\"><use overflow=\"visible\" xlink:href=\"#ear_e\"/></clipPath><g class=\"skin_dark\" clip-path=\"url(#ear_f)\"><path d=\"M28.8-9.6c2.7 0 4.8 2.1 4.8 4.8S31.5 0 28.8 0 24-2.2 24-4.8c0-2.7 2.1-4.8 4.8-4.8zM52.8-9.6c2.7 0 4.8 2.1 4.8 4.8S55.5 0 52.8 0 48-2.2 48-4.8c0-2.7 2.1-4.8 4.8-4.8z\"/></g></g><g><defs><path id=\"ear_g\" d=\"M4.8-52.8h48v48h-48z\"/></defs><clipPath id=\"ear_h\"><use overflow=\"visible\" xlink:href=\"#ear_g\"/></clipPath><path class=\"skin_dark\" d=\"M4.8-9.6c2.7 0 4.8 2.1 4.8 4.8S7.5 0 4.8 0 0-2.2 0-4.8c0-2.7 2.1-4.8 4.8-4.8z\" clip-path=\"url(#ear_h)\"/></g></pattern><g class=\"skin_fill\"><path d=\"M304.4 411.2l-2.9 54.7s25.4 58.7 34.4 79.4l20.5 6.1 20.9-80.1c-43.1-50.8-31.3-35.7-53.7-67.7l-19.2 7.6zM695.6 411.2l-19.2-7.6c-22.4 32-10.5 16.9-54.1 67.7l21.3 80.1 20.5-6.1c9-20.7 34.4-79.4 34.4-79.4l-2.9-54.7z\"/></g><pattern id=\"ear_j\" patternTransform=\"matrix(-.226 0 0 .226 -57013.102 11849.382)\" xlink:href=\"#ear_i\"/><path fill=\"url(#ear_j)\" d=\"M339.3 472.9c.1 0 .5 1.3-20.5-54.3-7.8 8.3-5.3-17-7.8 46.7l31.2 68c-1-30.1.9-19.2-9.5-47.6-2-5.4 1.1-11.3 6.6-12.8z\"/><pattern id=\"ear_k\" patternTransform=\"matrix(-.226 0 0 .226 -57013.102 11849.382)\" xlink:href=\"#ear_i\"/><path fill=\"url(#ear_k)\" d=\"M657.8 533.3l31.2-68c-2.5-63.7 0-38.4-7.8-46.7-21 55.6-20.6 54.3-20.5 54.3 5.5 1.5 8.6 7.4 6.6 12.8-10.4 28.4-8.5 17.5-9.5 47.6z\"/><g class=\"skin_outline\"><path d=\"M339.4 469.9c-42.1-112.3-7.8-7.7-2.9 2-1.4 0-8.4 5.9-4.9 13.7 12 26 13.2 25 2.8-1-3.2-7.7 6.6-10 5-14.7zM663.6 471.7c4.6-9.3 38.6-112.6-2.9-2-1.6 5 8.1 6.7 5 14.7-10.7 26.7-9.1 26.9 2.8 1 3.4-7.6-3.3-13.7-4.9-13.7z\"/></g>",
        "variation" : 1
    };
    const trait2 = {
        "generation": constants.GENERATION.ONE,
        "gender" : constants.GENDER.FEMALE,
        "gene" : constants.GENE.FACIAL_FEATURE,
        "name" : "Circuit Board Makeup",
        "series" : [ constants.SERIES.ONE ],
        "svg" : "<g fill=\"none\" stroke=\"#219860\" stroke-miterlimit=\"10\"><path d=\"M402.6 463.7c-13.7 0-10.1-1.3-16.2 4.8H380\"/><path d=\"M377.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM394.6 457.8c-20.4 0-15.7 1.3-21.9-4.9h-16\"/><path d=\"M353.9 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M388.6 451.8c-13.2 0-9.7 1.2-15.9-4.8h-6.4\"/><path d=\"M363.6 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M438 468.2c0 10.1-1.2 7.2 4.8 13.2v18.4M442.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM432 468.2c0 14.5-1.2 10.9 4.8 16.9v29.4M436.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM426.1 468.2c0 14.5-1.2 10.9 4.8 16.9v10.4\"/><path d=\"M431.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M420.1 468.2c0 14.5 1.2 10.9-4.8 16.9v18.4\"/><path d=\"M415.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M414.1 468.2c0 10.1 1.2 7.2-4.8 13.2v14.1\"/><path d=\"M409.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M424.1 390.6c0-26.5 1.6-20.5-4.8-26.9v-46.8\"/><path d=\"M419.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M418.1 384.6c0-14.9 1.2-11.2-4.8-17.2v-25.1M413.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M597 463.7c13.7 0 10.1-1.3 16.2 4.8h6.4\"/><path d=\"M622.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM605 457.8c20.4 0 15.7 1.3 21.9-4.9h16\"/><path d=\"M645.7 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M611 451.8c13.2 0 9.7 1.2 15.9-4.8h6.4\"/><path d=\"M636 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M561.6 468.2c0 10.1 1.2 7.2-4.8 13.2v18.4M556.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM567.6 468.2c0 14.5 1.2 10.9-4.8 16.9v29.4M562.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM573.5 468.2c0 14.5 1.2 10.9-4.8 16.9v10.4\"/><path d=\"M568.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M579.5 468.2c0 14.5-1.2 10.9 4.8 16.9v18.4\"/><path d=\"M584.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M585.5 468.2c0 10.1-1.2 7.2 4.8 13.2v14.1\"/><path d=\"M590.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M575.5 390.6c0-26.5-1.6-20.5 4.8-26.9v-46.8\"/><path d=\"M580.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M581.5 384.6c0-14.9-1.2-11.2 4.8-17.2v-25.1M586.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g></g></g>",
        "variation" : 2
    };
    const badGeneration = {
        "generation": 6,
        "gender" : constants.GENDER.FEMALE,
        "gene" : constants.GENE.FACIAL_FEATURE,
        "name" : "Circuit Board Makeup",
        "series" : [ constants.SERIES.ONE ],
        "svg" : "<g fill=\"none\" stroke=\"#219860\" stroke-miterlimit=\"10\"><path d=\"M402.6 463.7c-13.7 0-10.1-1.3-16.2 4.8H380\"/><path d=\"M377.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM394.6 457.8c-20.4 0-15.7 1.3-21.9-4.9h-16\"/><path d=\"M353.9 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M388.6 451.8c-13.2 0-9.7 1.2-15.9-4.8h-6.4\"/><path d=\"M363.6 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M438 468.2c0 10.1-1.2 7.2 4.8 13.2v18.4M442.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM432 468.2c0 14.5-1.2 10.9 4.8 16.9v29.4M436.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM426.1 468.2c0 14.5-1.2 10.9 4.8 16.9v10.4\"/><path d=\"M431.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M420.1 468.2c0 14.5 1.2 10.9-4.8 16.9v18.4\"/><path d=\"M415.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M414.1 468.2c0 10.1 1.2 7.2-4.8 13.2v14.1\"/><path d=\"M409.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M424.1 390.6c0-26.5 1.6-20.5-4.8-26.9v-46.8\"/><path d=\"M419.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M418.1 384.6c0-14.9 1.2-11.2-4.8-17.2v-25.1M413.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M597 463.7c13.7 0 10.1-1.3 16.2 4.8h6.4\"/><path d=\"M622.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM605 457.8c20.4 0 15.7 1.3 21.9-4.9h16\"/><path d=\"M645.7 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M611 451.8c13.2 0 9.7 1.2 15.9-4.8h6.4\"/><path d=\"M636 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M561.6 468.2c0 10.1 1.2 7.2-4.8 13.2v18.4M556.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM567.6 468.2c0 14.5 1.2 10.9-4.8 16.9v29.4M562.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM573.5 468.2c0 14.5 1.2 10.9-4.8 16.9v10.4\"/><path d=\"M568.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M579.5 468.2c0 14.5-1.2 10.9 4.8 16.9v18.4\"/><path d=\"M584.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M585.5 468.2c0 10.1-1.2 7.2 4.8 13.2v14.1\"/><path d=\"M590.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M575.5 390.6c0-26.5-1.6-20.5 4.8-26.9v-46.8\"/><path d=\"M580.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M581.5 384.6c0-14.9-1.2-11.2 4.8-17.2v-25.1M586.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g></g></g>",
        "variation" : 2
    };
    const badGender = {
        "generation": constants.GENERATION.ONE,
        "gender" : 12,
        "gene" : constants.GENE.FACIAL_FEATURE,
        "name" : "Circuit Board Makeup",
        "series" : [ constants.SERIES.ONE ],
        "svg" : "<g fill=\"none\" stroke=\"#219860\" stroke-miterlimit=\"10\"><path d=\"M402.6 463.7c-13.7 0-10.1-1.3-16.2 4.8H380\"/><path d=\"M377.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM394.6 457.8c-20.4 0-15.7 1.3-21.9-4.9h-16\"/><path d=\"M353.9 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M388.6 451.8c-13.2 0-9.7 1.2-15.9-4.8h-6.4\"/><path d=\"M363.6 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M438 468.2c0 10.1-1.2 7.2 4.8 13.2v18.4M442.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM432 468.2c0 14.5-1.2 10.9 4.8 16.9v29.4M436.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM426.1 468.2c0 14.5-1.2 10.9 4.8 16.9v10.4\"/><path d=\"M431.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M420.1 468.2c0 14.5 1.2 10.9-4.8 16.9v18.4\"/><path d=\"M415.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M414.1 468.2c0 10.1 1.2 7.2-4.8 13.2v14.1\"/><path d=\"M409.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M424.1 390.6c0-26.5 1.6-20.5-4.8-26.9v-46.8\"/><path d=\"M419.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M418.1 384.6c0-14.9 1.2-11.2-4.8-17.2v-25.1M413.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M597 463.7c13.7 0 10.1-1.3 16.2 4.8h6.4\"/><path d=\"M622.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM605 457.8c20.4 0 15.7 1.3 21.9-4.9h16\"/><path d=\"M645.7 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M611 451.8c13.2 0 9.7 1.2 15.9-4.8h6.4\"/><path d=\"M636 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M561.6 468.2c0 10.1 1.2 7.2-4.8 13.2v18.4M556.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM567.6 468.2c0 14.5 1.2 10.9-4.8 16.9v29.4M562.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM573.5 468.2c0 14.5 1.2 10.9-4.8 16.9v10.4\"/><path d=\"M568.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M579.5 468.2c0 14.5-1.2 10.9 4.8 16.9v18.4\"/><path d=\"M584.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M585.5 468.2c0 10.1-1.2 7.2 4.8 13.2v14.1\"/><path d=\"M590.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M575.5 390.6c0-26.5-1.6-20.5 4.8-26.9v-46.8\"/><path d=\"M580.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M581.5 384.6c0-14.9-1.2-11.2 4.8-17.2v-25.1M586.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g></g></g>",
        "variation" : 2
    };
    const badGene = {
        "generation": constants.GENERATION.ONE,
        "gender" : constants.GENDER.FEMALE,
        "gene" : 82,
        "name" : "Circuit Board Makeup",
        "series" : [ constants.SERIES.ONE ],
        "svg" : "<g fill=\"none\" stroke=\"#219860\" stroke-miterlimit=\"10\"><path d=\"M402.6 463.7c-13.7 0-10.1-1.3-16.2 4.8H380\"/><path d=\"M377.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM394.6 457.8c-20.4 0-15.7 1.3-21.9-4.9h-16\"/><path d=\"M353.9 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M388.6 451.8c-13.2 0-9.7 1.2-15.9-4.8h-6.4\"/><path d=\"M363.6 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M438 468.2c0 10.1-1.2 7.2 4.8 13.2v18.4M442.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM432 468.2c0 14.5-1.2 10.9 4.8 16.9v29.4M436.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM426.1 468.2c0 14.5-1.2 10.9 4.8 16.9v10.4\"/><path d=\"M431.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M420.1 468.2c0 14.5 1.2 10.9-4.8 16.9v18.4\"/><path d=\"M415.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M414.1 468.2c0 10.1 1.2 7.2-4.8 13.2v14.1\"/><path d=\"M409.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M424.1 390.6c0-26.5 1.6-20.5-4.8-26.9v-46.8\"/><path d=\"M419.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M418.1 384.6c0-14.9 1.2-11.2-4.8-17.2v-25.1M413.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M597 463.7c13.7 0 10.1-1.3 16.2 4.8h6.4\"/><path d=\"M622.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM605 457.8c20.4 0 15.7 1.3 21.9-4.9h16\"/><path d=\"M645.7 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M611 451.8c13.2 0 9.7 1.2 15.9-4.8h6.4\"/><path d=\"M636 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M561.6 468.2c0 10.1 1.2 7.2-4.8 13.2v18.4M556.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM567.6 468.2c0 14.5 1.2 10.9-4.8 16.9v29.4M562.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM573.5 468.2c0 14.5 1.2 10.9-4.8 16.9v10.4\"/><path d=\"M568.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M579.5 468.2c0 14.5-1.2 10.9 4.8 16.9v18.4\"/><path d=\"M584.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M585.5 468.2c0 10.1-1.2 7.2 4.8 13.2v14.1\"/><path d=\"M590.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M575.5 390.6c0-26.5-1.6-20.5 4.8-26.9v-46.8\"/><path d=\"M580.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M581.5 384.6c0-14.9-1.2-11.2 4.8-17.2v-25.1M586.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g></g></g>",
        "variation" : 2
    };
    const badSeries = {
        "generation": constants.GENERATION.ONE,
        "gender" : constants.GENDER.FEMALE,
        "gene" : constants.GENE.FACIAL_FEATURE,
        "name" : "Circuit Board Makeup",
        "series" : [ constants.SERIES.ONE, 36 ],
        "svg" : "<g fill=\"none\" stroke=\"#219860\" stroke-miterlimit=\"10\"><path d=\"M402.6 463.7c-13.7 0-10.1-1.3-16.2 4.8H380\"/><path d=\"M377.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM394.6 457.8c-20.4 0-15.7 1.3-21.9-4.9h-16\"/><path d=\"M353.9 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M388.6 451.8c-13.2 0-9.7 1.2-15.9-4.8h-6.4\"/><path d=\"M363.6 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M438 468.2c0 10.1-1.2 7.2 4.8 13.2v18.4M442.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM432 468.2c0 14.5-1.2 10.9 4.8 16.9v29.4M436.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM426.1 468.2c0 14.5-1.2 10.9 4.8 16.9v10.4\"/><path d=\"M431.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M420.1 468.2c0 14.5 1.2 10.9-4.8 16.9v18.4\"/><path d=\"M415.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M414.1 468.2c0 10.1 1.2 7.2-4.8 13.2v14.1\"/><path d=\"M409.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M424.1 390.6c0-26.5 1.6-20.5-4.8-26.9v-46.8\"/><path d=\"M419.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M418.1 384.6c0-14.9 1.2-11.2-4.8-17.2v-25.1M413.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M597 463.7c13.7 0 10.1-1.3 16.2 4.8h6.4\"/><path d=\"M622.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM605 457.8c20.4 0 15.7 1.3 21.9-4.9h16\"/><path d=\"M645.7 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M611 451.8c13.2 0 9.7 1.2 15.9-4.8h6.4\"/><path d=\"M636 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M561.6 468.2c0 10.1 1.2 7.2-4.8 13.2v18.4M556.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM567.6 468.2c0 14.5 1.2 10.9-4.8 16.9v29.4M562.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM573.5 468.2c0 14.5 1.2 10.9-4.8 16.9v10.4\"/><path d=\"M568.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M579.5 468.2c0 14.5-1.2 10.9 4.8 16.9v18.4\"/><path d=\"M584.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M585.5 468.2c0 10.1-1.2 7.2 4.8 13.2v14.1\"/><path d=\"M590.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M575.5 390.6c0-26.5-1.6-20.5 4.8-26.9v-46.8\"/><path d=\"M580.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M581.5 384.6c0-14.9-1.2-11.2 4.8-17.2v-25.1M586.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g></g></g>",
        "variation" : 2
    };
    const noSeries = {
        "generation": constants.GENERATION.ONE,
        "gender" : constants.GENDER.FEMALE,
        "gene" : constants.GENE.FACIAL_FEATURE,
        "name" : "Circuit Board Makeup",
        "series" : [ ],
        "svg" : "<g fill=\"none\" stroke=\"#219860\" stroke-miterlimit=\"10\"><path d=\"M402.6 463.7c-13.7 0-10.1-1.3-16.2 4.8H380\"/><path d=\"M377.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM394.6 457.8c-20.4 0-15.7 1.3-21.9-4.9h-16\"/><path d=\"M353.9 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M388.6 451.8c-13.2 0-9.7 1.2-15.9-4.8h-6.4\"/><path d=\"M363.6 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M438 468.2c0 10.1-1.2 7.2 4.8 13.2v18.4M442.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM432 468.2c0 14.5-1.2 10.9 4.8 16.9v29.4M436.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM426.1 468.2c0 14.5-1.2 10.9 4.8 16.9v10.4\"/><path d=\"M431.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M420.1 468.2c0 14.5 1.2 10.9-4.8 16.9v18.4\"/><path d=\"M415.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M414.1 468.2c0 10.1 1.2 7.2-4.8 13.2v14.1\"/><path d=\"M409.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M424.1 390.6c0-26.5 1.6-20.5-4.8-26.9v-46.8\"/><path d=\"M419.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M418.1 384.6c0-14.9 1.2-11.2-4.8-17.2v-25.1M413.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M597 463.7c13.7 0 10.1-1.3 16.2 4.8h6.4\"/><path d=\"M622.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM605 457.8c20.4 0 15.7 1.3 21.9-4.9h16\"/><path d=\"M645.7 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M611 451.8c13.2 0 9.7 1.2 15.9-4.8h6.4\"/><path d=\"M636 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M561.6 468.2c0 10.1 1.2 7.2-4.8 13.2v18.4M556.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM567.6 468.2c0 14.5 1.2 10.9-4.8 16.9v29.4M562.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM573.5 468.2c0 14.5 1.2 10.9-4.8 16.9v10.4\"/><path d=\"M568.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M579.5 468.2c0 14.5-1.2 10.9 4.8 16.9v18.4\"/><path d=\"M584.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M585.5 468.2c0 10.1-1.2 7.2 4.8 13.2v14.1\"/><path d=\"M590.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M575.5 390.6c0-26.5-1.6-20.5 4.8-26.9v-46.8\"/><path d=\"M580.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M581.5 384.6c0-14.9-1.2-11.2 4.8-17.2v-25.1M586.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g></g></g>",
        "variation" : 2
    };
    const badVariation = {
        "generation": constants.GENERATION.ONE,
        "gender" : constants.GENDER.FEMALE,
        "gene" : constants.GENE.FACIAL_FEATURE,
        "name" : "Circuit Board Makeup",
        "series" : [ constants.SERIES.ONE ],
        "svg" : "<g fill=\"none\" stroke=\"#219860\" stroke-miterlimit=\"10\"><path d=\"M402.6 463.7c-13.7 0-10.1-1.3-16.2 4.8H380\"/><path d=\"M377.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM394.6 457.8c-20.4 0-15.7 1.3-21.9-4.9h-16\"/><path d=\"M353.9 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M388.6 451.8c-13.2 0-9.7 1.2-15.9-4.8h-6.4\"/><path d=\"M363.6 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M438 468.2c0 10.1-1.2 7.2 4.8 13.2v18.4M442.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM432 468.2c0 14.5-1.2 10.9 4.8 16.9v29.4M436.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM426.1 468.2c0 14.5-1.2 10.9 4.8 16.9v10.4\"/><path d=\"M431.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M420.1 468.2c0 14.5 1.2 10.9-4.8 16.9v18.4\"/><path d=\"M415.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M414.1 468.2c0 10.1 1.2 7.2-4.8 13.2v14.1\"/><path d=\"M409.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M424.1 390.6c0-26.5 1.6-20.5-4.8-26.9v-46.8\"/><path d=\"M419.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M418.1 384.6c0-14.9 1.2-11.2-4.8-17.2v-25.1M413.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M597 463.7c13.7 0 10.1-1.3 16.2 4.8h6.4\"/><path d=\"M622.3 465.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM605 457.8c20.4 0 15.7 1.3 21.9-4.9h16\"/><path d=\"M645.7 450.1c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M611 451.8c13.2 0 9.7 1.2 15.9-4.8h6.4\"/><path d=\"M636 443.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M561.6 468.2c0 10.1 1.2 7.2-4.8 13.2v18.4M556.8 499.8c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM567.6 468.2c0 14.5 1.2 10.9-4.8 16.9v29.4M562.8 514.5c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6zM573.5 468.2c0 14.5 1.2 10.9-4.8 16.9v10.4\"/><path d=\"M568.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M579.5 468.2c0 14.5-1.2 10.9 4.8 16.9v18.4\"/><path d=\"M584.3 503.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g><g><path d=\"M585.5 468.2c0 10.1-1.2 7.2 4.8 13.2v14.1\"/><path d=\"M590.3 495.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g><g><path d=\"M575.5 390.6c0-26.5-1.6-20.5 4.8-26.9v-46.8\"/><path d=\"M580.3 311.4c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/><g><path d=\"M581.5 384.6c0-14.9-1.2-11.2 4.8-17.2v-25.1M586.3 336.7c3.7 0 3.7 5.6 0 5.6s-3.7-5.6 0-5.6z\"/></g></g></g></g>",
        "variation" : 300
    };

    before(async () => {
        // Get the contract instance for this suite
        contract = await TraitFactory.new();

        // Unpause the contract
        await contract.unpause();

    });

    it("should allow sysadmin to create a trait", async function() {

        const {generation, gender, gene, name, series, svg, variation} = trait1;
        let id = new BN(0, 10);

        // Get the Trait ID (using call, to avoid receiving a transaction)
        const traitId = (await contract.createTrait.call(generation, series, gender, gene, variation, name, svg, {from: sysAdmin})).toNumber();
        assert.equal(traitId, id, "Trait id wasn't returned");

        // Now call the function for real and write the data
        let result = await contract.createTrait(generation, series, gender, gene, variation, name, svg, {from: sysAdmin});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'NewTrait', (ev) => {
            return (
                ev.id.eq(id) &&
                ev.gene.toNumber() === gene &&
                ev.variation.toNumber() === variation &&
                ev.name === name
            );
        }, 'NewTrait event should be emitted with correct info');

    });

    it("should allow sysadmin to retrieve a trait", async function() {

        const {generation, gender, gene, name, series, svg, variation} = trait1;
        let id = new BN(0,10);

        // Make sure the stored trait is correct
        const trait = await contract.getTrait(id, {from: sysAdmin});
        assert.ok(trait[0].eq(id), "Trait ID field wasn't correct");
        assert.equal(trait[1], generation, "Generation field wasn't correct");
        assert.equal(trait[2].length, series.length, "Series field wasn't correct");
        trait[2].forEach((sNum, index) => assert.equal(sNum.toNumber(), series[index], "Series content wasn't correct"));
        assert.equal(trait[3], gender, "Gender field wasn't correct");
        assert.equal(trait[4].toNumber(), gene, "Gene field wasn't correct");
        assert.equal(trait[5], variation, "Variation field wasn't correct");
        assert.equal(trait[6], name, "Name field wasn't correct");
        assert.equal(trait[7], svg, "SVG field wasn't correct");

    });

    it("should not allow non-sysadmins to create traits", async function() {

        const {generation, gender, gene, name, series, svg, variation} = trait2;

        // Try to let non-sysadmin create a trait
        await exceptions.catchRevert(
            contract.createTrait(generation, series, gender, gene, variation, name, svg, {from: nonSysAdmin})
        );

    });

    it("should allow non-sysadmins to retrieve a trait", async function() {

        const {generation, gender, gene, name, series, svg, variation} = trait1;
        let id = new BN(0,10);

        // Make sure the stored trait is correct
        const trait = await contract.getTrait(id, {from: nonSysAdmin});
        assert.ok(trait[0].eq(id), "Trait ID field wasn't correct");
        assert.equal(trait[1], generation, "Generation field wasn't correct");
        assert.equal(trait[2].length, series.length, "Series field wasn't correct");
        trait[2].forEach((sNum, index) => assert.equal(sNum.toNumber(), series[index], "Series content wasn't correct"));
        assert.equal(trait[3], gender, "Gender field wasn't correct");
        assert.equal(trait[4].toNumber(), gene, "Gene field wasn't correct");
        assert.equal(trait[5], variation, "Variation field wasn't correct");
        assert.equal(trait[6], name, "Name field wasn't correct");
        assert.equal(trait[7], svg, "SVG field wasn't correct");

    });

    it("should allow sysadmin to create and retrieve another trait", async function() {

        const {generation, gender, gene, name, series, svg, variation} = trait2;
        let id = new BN(1,10);

        // Get the Trait ID (using call, to avoid receiving a transaction)
        const traitId = (await contract.createTrait.call(generation, series, gender, gene, variation, name, svg, {from: sysAdmin})).toNumber();
        assert.equal(traitId, id, "Trait id wasn't returned");

        // Now call the function for real and write the data
        let result = await contract.createTrait(generation, series, gender, gene, variation, name, svg, {from: sysAdmin});

        // Test that appropriate event was emitted
        truffleAssert.eventEmitted(result, 'NewTrait', (ev) => {
            return (
                ev.id.eq(id) &&
                ev.gene.toNumber() === gene &&
                ev.variation.toNumber() === variation &&
                ev.name === name
            );
        }, 'NewTrait event should be emitted with correct info');

        // Make sure the stored trait is correct
        const trait = await contract.getTrait(id, {from: sysAdmin});
        assert.ok(trait[0].eq(id), "Trait ID field wasn't correct");
        assert.equal(trait[1], generation, "Generation field wasn't correct");
        assert.equal(trait[2].length, series.length, "Series field wasn't correct");
        trait[2].forEach((sNum, index) => assert.equal(sNum.toNumber(), series[index], "Series content wasn't correct"));
        assert.equal(trait[3], gender, "Gender field wasn't correct");
        assert.equal(trait[4].toNumber(), gene, "Gene field wasn't correct");
        assert.equal(trait[5], variation, "Variation field wasn't correct");
        assert.equal(trait[6], name, "Name field wasn't correct");
        assert.equal(trait[7], svg, "SVG field wasn't correct");
    });

    it("should not allow sysadmin to create trait with bad value for generation", async function() {

        const {generation, gender, gene, name, series, svg, variation} = badGeneration;

        // Try to let sysadmin create a trait with a bad value for generation
        await exceptions.catchInvalidOpcode(
            contract.createTrait(generation, series, gender, gene, variation, name, svg, {from: sysAdmin})
        );

    });

    it("should not allow sysadmin to create trait with bad value for gender", async function() {

        const {generation, gender, gene, name, series, svg, variation} = badGender;

        // Try to let sysadmin create a trait with a bad value for gender
        await exceptions.catchInvalidOpcode(
            contract.createTrait(generation, series, gender, gene, variation, name, svg, {from: sysAdmin})
        );

    });

    it("should not allow sysadmin to create trait with bad value for gene", async function() {

        const {generation, gender, gene, name, series, svg, variation} = badGene;

        // Try to let sysadmin create a trait with a bad value for gene
        await exceptions.catchInvalidOpcode(
            contract.createTrait(generation, series, gender, gene, variation, name, svg, {from: sysAdmin})
        );

    });

    it("should not allow sysadmin to create trait with empty array for series", async function() {

        const {generation, gender, gene, name, series, svg, variation} = noSeries;

        // Try to let sysadmin create a trait with empty array for series
        await exceptions.catchRevert(
            contract.createTrait(generation, series, gender, gene, variation, name, svg, {from: sysAdmin})
        );

    });

    it("should not allow sysadmin to create trait with bad value for series", async function() {

        const {generation, gender, gene, name, series, svg, variation} = badSeries;

        // Try to let sysadmin create a trait with a bad value for series
        await exceptions.catchInvalidOpcode(
            contract.createTrait(generation, series, gender, gene, variation, name, svg, {from: sysAdmin})
        );

    });

    it("should not allow sysadmin to create trait with bad value for variation", async function() {

        const {generation, gender, gene, name, series, svg, variation} = badVariation;

        // Try to let sysadmin create a trait with a bad value for variation
        await exceptions.catchRevert(
            contract.createTrait(generation, series, gender, gene, variation, name, svg, {from: sysAdmin})
        );

    });

    it("should not allow sysadmin to create traits when contract is paused", async function() {

        const {generation, gender, gene, name, series, svg, variation} = trait2;

        // Pause contract
        await contract.pause({from: sysAdmin});

        // Try to let sysadmin create a trait
        await exceptions.catchRevert(
            contract.createTrait(generation, series, gender, gene, variation, name, svg, {from: sysAdmin})
        );

        // Un-pause contract
        await contract.unpause({from: sysAdmin});

    });

    it("should allow anyone to retrieve a trait id by generation, gene, and variation", async function() {

        const {generation, gene, variation} = trait2;
        let id = new BN(1,10);

        // Get the trait id via generation, gene, and variation
        let traitId = await contract.getTraitIdByGenerationGeneAndVariation(generation, gene, variation, {from: nonSysAdmin});

        // Make sure the retrieved trait id is correct
        assert.ok(traitId.eq(id),  "Trait ID wasn't correct");

    });

    it("should allow anyone to assemble artwork by generation and trait hash", async function() {

        const traits = [trait1, trait2];

        // Get the hash for traits 1 and 2
        const traitHash = traitMath.computeHash(traits);

        // Compute the
        const expected = traitMath.computeArt(traits);

        // Get the rendered artwork
        const art = await contract.renderAvastar(constants.GENERATION.ONE, traitHash, {from: nonSysAdmin});

        assert.equal(art, expected, "Assembled art wasn't correct");

    });

});
