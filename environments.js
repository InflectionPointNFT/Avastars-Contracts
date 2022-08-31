const ENV = {

    DEV: {
        NAME: "DEV",
        NETWORK: "development"
    },

    TEST: {
        NAME: "TEST",
        NETWORK: "goerli"
    },

    PROD: {
        NAME: "PROD",
        NETWORK: "mainnet"
    }

};

module.exports = {

    ENV,

    [ENV.DEV.NAME]: {
        url: "http://localhost:7545",
        mnemonic: "supreme banner leisure dinosaur fold text friend ivory vacant city room poet",
        accounts: {
            admins: [ // ACCOUNT                              // PRIVATE KEY
                "0xd9D45b75ac74962d74dc5F24Dd02E1e1E828A7d0", // 0x634ffc3ab4f1d5027ec1f29a837f75e845d107bbd3f39eb84645fcd5c3574cdd
                "0x551080F74bCe16282c7Af89A65D62A1Ad1790cF0"  // 0x1a1ac4de566b1f2db4b7ad4fea2626619b3eb5f2bb4fbd99f9ea9f26df2fc146
            ],
            owners: [
                "0xf7ce8E73B9F91F00bF86646998593cD05b9edEE7", // 0x0b5f41ea1fbc033206635c6b2cc4a18780dc99c17c094b814ab2d050b38bd95a
                "0xf8F4D055Bc2142a4e04875C814Ba1b3491828C69"  // 0xfd4ae97bc33d0c82bf8e8017666aa6d9fdf58112c8a4cd94e5a5774b29fed350
            ],
            minters: [
                "0xF7687f2d8a4309D63ceDaF1BAA33e350DD829742", // 0xb88e7d0a3bc168a739faa66fdd07ae773bd3a5e2a1b18d7354bca45e85f13e4b
                "0x86C34D0415bB426830089F7e587F789531c2c074", // 0xd4aa9c6be8ed19add7032886e7811757e41e9a297a4eac2f14329f0d2ecf0def
                "0x99Fc2f4419FDe8AE920c35357EbC0e42A85C76D5", // 0x684122bfbcbe54878c6b01e52660aceeeceb16cfaa1a65502c5fad07ec422213
                "0xdf61516F6834993f280E66330028169349757975", // 0x593559b416becc0a7007df8ad5cff7ae8323f6a5ab73daae660da1f1a4e415cf
                "0x95cB05d130DD24B073BE1fC6F23cCC611469277c", // 0x3de8e01febbd9d87f3f91bde80ce373d73e243c4a90ef56dc736438811e7dbcb
                "0xC67423e54CF6AEe8d30C77D2D9aC4705ddD8bA8d"  // 0xedb1cfe4486eb3c75088f0b5edc73fedf34dbc70a3b25f87ed1ae946bbb1c6cd
            ]
        }
    },

    [ENV.TEST.NAME]: {
        url: "",
        mnemonic: "",
        accounts: {
            admins: [ // ACCOUNT                              // PRIVATE KEY
            ],
            owners: [
            ],
            minters: [
            ]
        }
    },

    [ENV.PROD.NAME]: {
        url: "",
        mnemonic: "",
        accounts: {
            admins: [ // ACCOUNT                              // PRIVATE KEY
            ],
            owners: [
            ],
            minters: [
            ]
        }
    }

};