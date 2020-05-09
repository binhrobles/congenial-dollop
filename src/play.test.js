import Card, { RANK, SUIT } from './cards';
import { COMBO, Play } from './play';

const H2 = new Card(RANK.TWO, SUIT.H);
const D2 = new Card(RANK.TWO, SUIT.D);
const C2 = new Card(RANK.TWO, SUIT.C);
const S2 = new Card(RANK.TWO, SUIT.S);
const H3 = new Card(RANK.THREE, SUIT.H);
const D3 = new Card(RANK.THREE, SUIT.D);
const S3 = new Card(RANK.THREE, SUIT.S);

const SH2 = new Play(COMBO.SINGLE, [H2]);
const SD2 = new Play(COMBO.SINGLE, [D2]);
const SH3 = new Play(COMBO.SINGLE, [H3]);
const SD3 = new Play(COMBO.SINGLE, [D3]);
const SS3 = new Play(COMBO.SINGLE, [S3]);

const PH2 = new Play(COMBO.PAIR, [D2, H2]);
const PC2 = new Play(COMBO.PAIR, [S2, C2]);

const TH2 = new Play(COMBO.TRIPLE, [D2, H2, C2]);
const TD2 = new Play(COMBO.TRIPLE, [S2, C2, D2]);

const QH2 = new Play(COMBO.QUAD, [S2, D2, H2, C2]);

it('should eval a stronger single to beat a weaker single', () => {
  expect(SH2 > SH3).toBeTruthy();
  expect(SD2 > SD3).toBeTruthy();

  expect(SH2 > SD2).toBeTruthy();
  expect(SH2 < SD2).toBeFalsy();

  expect(SH3 > SS3).toBeTruthy();
  expect(SH3 < SS3).toBeFalsy();
});

it('should sort pairs, trips, quads with highest card lowest', () => {
  expect(PH2.cards[0]).toBe(H2);
  expect(PC2.cards[0]).toBe(C2);

  expect(TH2.cards[0]).toBe(H2);
  expect(TD2.cards[0]).toBe(D2);

  expect(QH2.cards[0]).toBe(H2);
});
