import { expect, test } from "@jest/globals";
import ScoundrelCard from "../src/scoundrelcard.js";
import Card from "../src/card.js";
import { SUITS, RANKS } from "../src/helpers.js";

test('can create new instances', () => {
    const card = new Card(SUITS[0], RANKS[0]);
    const scdCard = new ScoundrelCard(card);

    expect(scdCard).toBeDefined();
    expect(scdCard.card.equal(card)).toBe(true);
    expect(scdCard.interacted).toBe(false);
    expect(() => scdCard.interact({})).toThrow("Not implemented.");
});

test('getValue method returns all the correct values', () => {
    const fullSuit = RANKS.map(rank => new ScoundrelCard(new Card(SUITS[0], rank)));

    expect(fullSuit[0].getValue()).toBe(2);
    expect(fullSuit[1].getValue()).toBe(3);
    expect(fullSuit[2].getValue()).toBe(4);
    expect(fullSuit[3].getValue()).toBe(5);
    expect(fullSuit[4].getValue()).toBe(6);
    expect(fullSuit[5].getValue()).toBe(7);
    expect(fullSuit[6].getValue()).toBe(8);
    expect(fullSuit[7].getValue()).toBe(9);
    expect(fullSuit[8].getValue()).toBe(10);
    expect(fullSuit[9].getValue()).toBe(11);
    expect(fullSuit[10].getValue()).toBe(12);
    expect(fullSuit[11].getValue()).toBe(13);
    expect(fullSuit[12].getValue()).toBe(14);
})

