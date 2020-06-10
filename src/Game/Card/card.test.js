import Card, { RANK, SUIT } from './index';

it('should correctly compare various single cards', () => {
  expect(
    new Card(RANK.TWO, SUIT.H).value > new Card(RANK.TWO, SUIT.D).value
  ).toBeTruthy();
  expect(
    new Card(RANK.ACE, SUIT.H).value > new Card(RANK.TWO, SUIT.S).value
  ).toBeFalsy();

  expect(
    new Card(RANK.THREE, SUIT.S).value < new Card(RANK.THREE, SUIT.C).value
  ).toBeTruthy();
  expect(
    new Card(RANK.EIGHT, SUIT.D).value < new Card(RANK.NINE, SUIT.D).value
  ).toBeTruthy();
  expect(
    new Card(RANK.KING, SUIT.C).value < new Card(RANK.TEN, SUIT.S).value
  ).toBeFalsy();
});

it('should evaluate cards to numeric values', () => {
  expect(new Card(RANK.THREE, SUIT.S).value).toBe(0);
  expect(new Card(RANK.THREE, SUIT.C).value).toBe(1);
  expect(new Card(RANK.TWO, SUIT.D).value).toBe(50);
  expect(new Card(RANK.TWO, SUIT.H).value).toBe(51);
});
