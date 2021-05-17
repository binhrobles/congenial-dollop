import Card, { RANK, SUIT } from '../Card';
import Play, { isRun, isBomb, COMBO } from './index';

const H2 = Card.Get(RANK.TWO, SUIT.H);
const D2 = Card.Get(RANK.TWO, SUIT.D);
const C2 = Card.Get(RANK.TWO, SUIT.C);
const S2 = Card.Get(RANK.TWO, SUIT.S);
const H3 = Card.Get(RANK.THREE, SUIT.H);
const D3 = Card.Get(RANK.THREE, SUIT.D);
const S3 = Card.Get(RANK.THREE, SUIT.S);

const SH2 = Play.Get(COMBO.SINGLE, [H2]);
const SD2 = Play.Get(COMBO.SINGLE, [D2]);
const SH3 = Play.Get(COMBO.SINGLE, [H3]);
const SD3 = Play.Get(COMBO.SINGLE, [D3]);
const SS3 = Play.Get(COMBO.SINGLE, [S3]);

const PH2 = Play.Get(COMBO.PAIR, [D2, H2]);
const PC2 = Play.Get(COMBO.PAIR, [S2, C2]);

const TH2 = Play.Get(COMBO.TRIPLE, [D2, H2, C2]);
const TD2 = Play.Get(COMBO.TRIPLE, [S2, C2, D2]);

const QH2 = Play.Get(COMBO.QUAD, [S2, D2, H2, C2]);

it('should eval a stronger single to beat a weaker single', () => {
  expect(SH2.value > SH3.value).toBeTruthy();
  expect(SD2.value > SD3.value).toBeTruthy();

  expect(SH2.value > SD2.value).toBeTruthy();
  expect(SH2.value < SD2.value).toBeFalsy();

  expect(SH3.value > SS3.value).toBeTruthy();
  expect(SH3.value < SS3.value).toBeFalsy();
});

it('should sort pairs, trips, quads with highest card lowest', () => {
  expect(PH2.cards[0]).toBe(H2);
  expect(PC2.cards[0]).toBe(C2);

  expect(TH2.cards[0]).toBe(H2);
  expect(TD2.cards[0]).toBe(D2);

  expect(QH2.cards[0]).toBe(H2);
});

it('should verify valid runs', () => {
  const R345 = [
    Card.Get(RANK.FIVE, SUIT.S),
    Card.Get(RANK.FOUR, SUIT.D),
    Card.Get(RANK.THREE, SUIT.H),
  ];

  const R346 = [
    Card.Get(RANK.SIX, SUIT.S),
    Card.Get(RANK.FOUR, SUIT.D),
    Card.Get(RANK.THREE, SUIT.H),
  ];

  const RJQKA = [
    Card.Get(RANK.ACE, SUIT.D),
    Card.Get(RANK.JACK, SUIT.S),
    Card.Get(RANK.QUEEN, SUIT.H),
    Card.Get(RANK.KING, SUIT.S),
  ];

  const RKA2akaTheJoey = [
    Card.Get(RANK.ACE, SUIT.D),
    Card.Get(RANK.KING, SUIT.S),
    Card.Get(RANK.TWO, SUIT.H),
  ];

  expect(isRun(R345)).toBeTruthy();
  expect(isRun(RJQKA)).toBeTruthy();
  expect(isRun(R346)).toBeFalsy();
  expect(isRun(RKA2akaTheJoey)).toBeFalsy();
});

it('should verify bombs', () => {
  const B345 = [
    Card.Get(RANK.FIVE, SUIT.S),
    Card.Get(RANK.FIVE, SUIT.H),
    Card.Get(RANK.FOUR, SUIT.H),
    Card.Get(RANK.FOUR, SUIT.D),
    Card.Get(RANK.THREE, SUIT.C),
    Card.Get(RANK.THREE, SUIT.H),
  ];
  const B3456 = [
    Card.Get(RANK.FIVE, SUIT.S),
    Card.Get(RANK.FIVE, SUIT.H),
    Card.Get(RANK.FOUR, SUIT.H),
    Card.Get(RANK.FOUR, SUIT.D),
    Card.Get(RANK.THREE, SUIT.C),
    Card.Get(RANK.THREE, SUIT.H),
    Card.Get(RANK.SIX, SUIT.C),
    Card.Get(RANK.SIX, SUIT.D),
  ];
  const B10JQKA = [
    Card.Get(RANK.TEN, SUIT.S),
    Card.Get(RANK.TEN, SUIT.H),
    Card.Get(RANK.JACK, SUIT.H),
    Card.Get(RANK.JACK, SUIT.D),
    Card.Get(RANK.QUEEN, SUIT.C),
    Card.Get(RANK.QUEEN, SUIT.H),
    Card.Get(RANK.KING, SUIT.C),
    Card.Get(RANK.KING, SUIT.D),
    Card.Get(RANK.ACE, SUIT.C),
    Card.Get(RANK.ACE, SUIT.H),
  ];

  expect(isBomb(B345)).toBeTruthy();
  expect(isBomb(B3456)).toBeTruthy();
  expect(isBomb(B10JQKA)).toBeTruthy();
});
