import Card, { RANK, SUIT } from './index';

it('should correctly compare various single cards', () => {
  expect(
    Card.Get(RANK.TWO, SUIT.H).value > Card.Get(RANK.TWO, SUIT.D).value
  ).toBeTruthy();
  expect(
    Card.Get(RANK.ACE, SUIT.H).value > Card.Get(RANK.TWO, SUIT.S).value
  ).toBeFalsy();

  expect(
    Card.Get(RANK.THREE, SUIT.S).value < Card.Get(RANK.THREE, SUIT.C).value
  ).toBeTruthy();
  expect(
    Card.Get(RANK.EIGHT, SUIT.D).value < Card.Get(RANK.NINE, SUIT.D).value
  ).toBeTruthy();
  expect(
    Card.Get(RANK.KING, SUIT.C).value < Card.Get(RANK.TEN, SUIT.S).value
  ).toBeFalsy();
});

it('should evaluate cards to numeric values', () => {
  expect(Card.Get(RANK.THREE, SUIT.S).value).toBe(0);
  expect(Card.Get(RANK.THREE, SUIT.C).value).toBe(1);
  expect(Card.Get(RANK.TWO, SUIT.D).value).toBe(50);
  expect(Card.Get(RANK.TWO, SUIT.H).value).toBe(51);
});
