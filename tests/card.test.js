import { expect, test } from "@jest/globals";
import Card from "../src/card.js";

export const SUITS = [
    {label: "hearts", icon: "♥️"},
    {label: "diamonds", icon: "♦️"}, 
    {label: "spades", icon: "♠️"},
    {label:  "clubs", icon: "♣️"}
];

export const RANKS = [
    {label: "two", icon: "2"}, 
    {label: "three", icon: "3"}, 
    {label: "four", icon: "4"}, 
    {label: "five", icon: "5"}, 
    {label: "six", icon: "6"}, 
    {label: "seven", icon: "7"}, 
    {label: "eight", icon: "8"},
    {label: "nine", icon:  "9"},
    {label: "ten", icon:  "10"},
    {label: "valet", icon: "J"},
    {label: "queen", icon: "Q"},
    {label: "king", icon: "K"},
    {label: "ace", icon: "A"}
];

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