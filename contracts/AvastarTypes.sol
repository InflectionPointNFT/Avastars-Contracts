pragma solidity ^0.5.12;

/**
 * @title Avastar Data Types
 * @author Cliff Hall
 */
contract AvastarTypes {

    enum Generation {
        ONE,
        TWO,
        THREE,
        FOUR,
        FIVE
    }

    enum Series {
        ONE,
        TWO,
        THREE,
        FOUR,
        FIVE
    }

    enum Wave {
        PRIME,
        REPLICANT
    }

    enum Gene {
        SKIN_TONE,
        HAIR_COLOR,
        EYE_COLOR,
        BG_COLOR,
        BACKDROP,
        EARS,
        FACE,
        NOSE,
        MOUTH,
        FACIAL_FEATURE,
        EYES,
        HAIR_STYLE
    }

    enum Gender {
        ANY,
        MALE,
        FEMALE
    }

    enum Rarity {
        COMMON,
        UNCOMMON,
        RARE,
        EPIC,
        LEGENDARY
    }

    struct Trait {

        // Trait ID
        uint256 id;

        // Generation this trait belongs to
        Generation generation;

        // Which series will this trait appear in
        Series[] series;

        // Gender this trait is expressed in
        Gender gender;

        // Gene this trait is a variation of (0-255)
        Gene gene;

        // The rarity of this trait
        Rarity rarity;

        // The variation number (0-255)
        uint8 variation;

        // Name of the trait
        string name;

        // SVG component
        string svg;

    }

    struct Prime {

        // Token ID
        uint256 id;

        // Serial #
        uint256 serial;

        // Traits Hash
        uint256 traits;

        // Trait usage flags
        bool[] replicated;

        // Generation
        Generation generation;

        // Series
        Series series;

        // Gender
        Gender gender;

        // Rarity Ranking
        uint8 ranking;

    }

    struct Replicant {

        // Token ID
        uint256 id;

        // Serial #
        uint256 serial;

        // Traits Hash
        uint256 traits;

        // Generation
        Generation generation;

        // Gender
        Gender gender;

        // Rarity Ranking
        uint8 ranking;
    }

    struct Avastar {

        // Token ID
        uint256 id;

        // Serial #
        uint256 serial;

        // Traits Hash
        uint256 traits;

        // Generation
        Generation generation;

        // Wave
        Wave wave;
    }

    struct Attribution {

        // Generation
        Generation generation;

        // Artist name
        string artist;

        // Artist Info URI
        string infoURI;

    }

}