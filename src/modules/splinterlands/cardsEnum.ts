/* eslint-disable max-len */
/* eslint-disable no-magic-numbers */
const summoners = [{ 260: 'fire' }, { 257: 'water' }, { 437: 'water' }, { 224: 'dragon' }, { 189: 'earth' }, { 145: 'death' }, { 240: 'dragon' }, { 167: 'fire' }, { 438: 'death' }, { 156: 'life' }, { 440: 'fire' }, { 114: 'dragon' }, { 441: 'life' }, { 439: 'earth' }, { 262: 'dragon' }, { 261: 'life' }, { 178: 'water' }, { 258: 'death' }, { 27: 'earth' }, { 38: 'life' }, { 49: 'death' }, { 5: 'fire' }, { 70: 'fire' }, { 38: 'life' }, { 73: 'life' }, { 259: 'earth' }, { 74: 'death' }, { 72: 'earth' }, { 442: 'dragon' }, { 71: 'water' }, { 88: 'dragon' }, { 78: 'dragon' }, { 200: 'dragon' }, { 16: 'water' }, { 239: 'life' }, { 254: 'water' }, { 235: 'death' }, { 113: 'life' }, { 109: 'death' }, { 110: 'fire' }, { 291: 'dragon' }, { 278: 'earth' }, { 236: 'fire' }, { 56: 'dragon' }, { 112: 'earth' }, { 111: 'water' }, { 56: 'dragon' }, { 205: 'dragon' }, { 130: 'dragon' }];


export default {
    basic: [157, 158, 159, 160, 395, 396, 397, 398, 399, 161, 162, 163, 167, 400, 401, 402, 403, 440, 168, 169, 170, 171, 381, 382, 383, 384, 385, 172, 173, 174, 178, 386, 387, 388, 389, 437, 179, 180, 181, 182, 334, 367, 368, 369, 370, 371, 183, 184, 185, 189, 372, 373, 374, 375, 439, 146, 147, 148, 149, 409, 410, 411, 412, 413, 150, 151, 152, 156, 414, 415, 416, 417, 135, 135, 136, 137, 138, 353, 354, 355, 356, 357, 139, 140, 141, 145, 358, 359, 360, 361, 438, 224, 190, 191, 192, 157, 423, 424, 425, 426, 194, 195, 196, 427, 428, 429],
    summoners,
    elements: ['fire', 'life', 'earth', 'water', 'death', 'dragon'],
    summonersIdList: summoners.map((x) => Number(Object.keys(x)[0])),
};