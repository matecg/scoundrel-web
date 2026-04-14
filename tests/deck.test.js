import Card from "../src/card.js";
import Deck from "../src/deck.js";
import { expect, test } from "@jest/globals";
import { SUITS, RANKS } from "../src/helpers.js";

test('can create standard deck of 52 cards', () => {
    const deck = new Deck();

    expect(deck).toBeDefined();
    expect(deck.cards.length).toBe(52);
    
    for (let i = 0; i < SUITS.length; i++) {
        for (let j = 0; j < RANKS.length; j++) {
            const card = new Card(SUITS[i], RANKS[j]);
            const actual = deck.cards.some(c => c.equal(card));

            expect(actual).toBe(true);
        }
    }
});

test('remove specific cards correctly', () => {
    const deck = new Deck();
    const toRemove = [
        new Card(SUITS[1], RANKS[1]),
        new Card(SUITS[0], RANKS[4]),
        new Card(SUITS[3], RANKS[11])
    ];
    deck.remove(toRemove);

    expect(deck.cards.length).toBe(49);
})

test('can draw different quantity of cards', () => {
    const deck = new Deck();
    const drawFour = deck.draw(4);

    expect(drawFour.length).toBe(4);
    expect(deck.cards.length).toBe(48);

    const drawDefault = deck.draw();

    expect(drawDefault.length).toBe(1);
    expect(deck.cards.length).toBe(47);
})

test('Throws an error when amount is less or equal to zero', () => {
    const deck = new Deck();

    expect(
        () => deck.draw(-1)
    ).toThrow('draw amount must be greater than zero');
    expect(
        () => deck.draw(0)
    ).toThrow('draw amount must be greater than zero');
})

test('shuffles the deck on a pseudo-random order', () => {
    const deck = new Deck();
    const originalOrder = deck.cards.slice();
    deck.shuffle();
    let nonEquals = 0;
    for (let i = 0; i < originalOrder.length; i++) {
        if (!originalOrder[i].equal(deck.cards[i]))
            nonEquals++;
    }

    expect(nonEquals).toBeGreaterThanOrEqual(40);
})

test('correctly resets the deck with the original 52 cards in order', () => {
    const deck = new Deck();
    deck.draw(10);

    expect(deck.cards.length).toBe(42);

    deck.reset();

    const first = new Card(SUITS[0], RANKS[0]);
    const last = new Card(SUITS[3], RANKS[12]);

    expect(deck.cards.length).toBe(52);
    expect(deck.cards[0].equal(first)).toBe(true);
    expect(deck.cards.at(-1).equal(last)).toBe(true);
})