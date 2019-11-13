# Trait Hash Bitmasking

## Axioms
- Genes describe features e.g., Nose
- Gene variations describe specific Traits, e.g., Aquiline Nose
- There will be no more than 255 Variations of any given Gene, with 0 representing no Trait.
- A single Solidity uint256 value (256 bits) can be used as 32 8-bit slots, each of which can store a value from 0 to 255.
- Each slot will represent a specific Gene (up to 32 Genes)
- Slots are zero based, genes are one based, e.g. Gene 1 is stored in Slot 0.
- A single uint256 value representing up to 32 combined Genes will be referred to hereinafter as a hash.
 
## Storing Values In Slots
To store a value n (where n >= 0 and n < 256), into slot s (where s >= 0 and s < 32): n x (256 ^ s)
```
n x (256^0  = 1)             = slotted value
n x (256^1  = 256)           = slotted value
n x (256^2  = 65536)         = slotted value
n x (256^3  = 16777216)      = slotted value
n x (256^4  = 4294967296)    = slotted value
n x (256^5  = 1.0995116e+12) = slotted value
n x (256^6  = 2.8147498e+14) = slotted value
n x (256^7  = 7.2057594e+16) = slotted value
n x (256^8  = 1.8446744e+19) = slotted value
n x (256^9  = 4.7223665e+21) = slotted value
n x (256^10 = 1.2089258e+24) = slotted value
n x (256^11 = 3.0948501e+26) = slotted value
n x (256^12 = 7.9228163e+28) = slotted value
n x (256^13 = 2.028241e+31)  = slotted value
n x (256^14 = 5.1922969e+33) = slotted value
n x (256^15 = 1.329228e+36)  = slotted value
n x (256^16 = 3.4028237e+38) = slotted value
n x (256^17 = 8.7112286e+40) = slotted value
n x (256^18 = 2.2300745e+43) = slotted value
n x (256^19 = 5.7089908e+45) = slotted value
n x (256^20 = 1.4615016e+48) = slotted value
n x (256^21 = 3.7414442e+50) = slotted value
n x (256^22 = 9.5780971e+52) = slotted value
n x (256^23 = 2.4519929e+55) = slotted value
n x (256^24 = 6.2771017e+57) = slotted value
n x (256^25 = 1.606938e+60)  = slotted value
n x (256^26 = 4.1137614e+62) = slotted value
n x (256^27 = 1.0531229e+65) = slotted value
n x (256^28 = 2.6959947e+67) = slotted value
n x (256^29 = 6.9017463e+69) = slotted value
n x (256^30 = 1.7668471e+72) = slotted value
n x (256^31 = 4.5231285e+74) = slotted value
```

## Combining Slotted Traits Into a Hash
Combine up to 32 slotted Traits into a single hash for storage and comparison by simply storing them in the appropriate slots and adding them all up.

### Example:
#### Gene 1, Variation 12
```
(0000 0000 0000 1100 = 12) x 256^0 = 0000 0000 0000 1100 = 12
```

#### Gene 2, Variation 86
```
(0000 0000 0101 0110 = 86) x 256^1 = 0101 0110 0000 0000 = 22016
```

#### Gene 1, Variation 12 + Gene 2, Variation 86:
```
                        12 + 22016 = 0101 0110 0000 1100 = 22028
```

## Extracting a Trait From a Hash
Extract a slotted Trait by performing a logical AND of the hash with a mask that has all 1s in the Gene slot for the Trait.

### Step 1) Create the mask for slot s (where s >= 0 and s < 32): 255 x (256 ^ s)

#### Example:
#### Mask for Gene 1
```
(0000 0000 1111 1111 = 255) x 256^0 = 0000 0000 1111 1111 = 255
```

#### Mask for Gene 2
```
(0000 0000 1111 1111 = 255) x 256^1 = 1111 1111 0000 0000 = 65280
```

### Step 2) Perform logical AND of the hash with the mask.

#### Example:
#### Hash for Gene 1, Variation 12 + Gene 2, Variation 86:
```
0101 0110 0000 1100 = 22028
```

#### Gene 2 Mask:
```
1111 1111 0000 0000 = 65280
```

#### Hash AND Gene 2 Mask
```
0101 0110 0000 0000 = 22016
```
 
### Step 3) Divide result by 256 ^ s

#### Example:
#### Masked Gene 2, Variation 86 Result
```
(0101 0110 0000 0000 = 22016) / (256^1 = 256) = (0000 0000 0101 0110 = 86)
```
