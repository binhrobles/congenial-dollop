// TODO: should these cards be classes?
// would hold { suit: [HDCS], rank: [3 -> ..a, 2]
// would make easy combo id for runs, pairs, trips, etc
// would allow for easier > < =, rather than string comparison
// heavier (?) what's our real performance impact vs strings?
export const STANDARD_DECK = [
  'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 'HA',
  'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 'DA', 
  'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 'CA',
  'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK', 'SA'
];

export const COMBOS = Object.freeze({
  SINGLE: 'SINGLE',
  PAIR: 'PAIR',
  TRIPLE: 'TRIPLE',
  RUN: 'RUN', // TODO: ideally, prompted after play if suited or not
  QUAD: 'QUAD',
  BOMB: 'BOMB',
  INVALID: null,
});
