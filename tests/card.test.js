import { expect, test } from "@jest/globals";
import Card from "../src/card.js";
import { SUITS, RANKS } from "../src/helpers.js";

test('can create a card', () => {
    const card = new Card(SUITS[2], RANKS[2]);

    expect(card).toBeDefined();
    expect(card.suit).toBe(SUITS[2]);
    expect(card.rank).toBe(RANKS[2]);
});

test('correctly prints the card as an icon', () => {
    const card = new Card(SUITS[3], RANKS[10]);
    const actual = card.printIcon();
    const expected = "♣️Q";

    expect(card).toBeDefined();
    expect(actual).toBe(expected);
});

test('correctly prints the card', () => {
    const card = new Card(SUITS[0], RANKS[4]);
    const actual = card.print();
    const expected = "Six of Hearts";

    expect(card).toBeDefined();
    expect(actual).toBe(expected);
});

test('correctly compare two cards for equality', () => {
    const cardA = new Card(SUITS[2], RANKS[0]);
    const cardB = new Card(SUITS[2], RANKS[0]);
    const cardC = new Card(SUITS[1], RANKS[0]);
    const cardD = new Card(SUITS[2], RANKS[1]);
    const cardE = new Card(SUITS[0], RANKS[2]);

    expect(cardA.equal(cardB)).toBe(true);
    expect(cardB.equal(cardA)).toBe(true);
    expect(cardA.equal(cardC)).toBe(false);
    expect(cardA.equal(cardD)).toBe(false);
    expect(cardA.equal(cardE)).toBe(false);
});