import Card, { RANK, SUIT } from '../Card';

export function GenerateStandardDeck() {
  const deck = [];
  Object.values(SUIT).forEach((suit) => {
    Object.values(RANK).forEach((rank) => {
      const card = Card.Get(rank, suit);
      deck.push(card);
    });
  });
  return deck;
}

export function DealCards(numPlayers, deck) {
  const hands = Array(numPlayers)
    .fill()
    .map(() => []); // fills `hands` with unique Array objects

  for (let i = 0; i <= 12; i += 1) {
    hands.forEach((hand) => hand.push(deck.pop()));
  }

  hands.forEach((hand) => hand.sort(Card.Compare));

  return hands;
}
