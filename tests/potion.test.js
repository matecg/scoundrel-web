import { expect, test } from "@jest/globals";
import Potion from "../src/potion.js";
import { SUITS, RANKS } from "../src/helpers.js";
import Card from "../src/card.js";

test('can create potions of rank 2 to 10 of hearts', () => {
    const suit = SUITS.find(s => s.label === "hearts");
    for (let i = 0; i < 9; i++) {
        expect(
            () => new Potion(new Card(suit, RANKS[i]))
        ).not.toThrow();
    }
});

test('can not create potions using J, Q, K, A', () => {
    const suit = SUITS.find(s => s.label === "hearts");

    for (let i = 9; i < RANKS.length; i++) {
        expect(
            () => new Potion(new Card(suit, RANKS[i]))
        ).toThrow("Potions must be 2s to 10s from Hearts suit");
    }
})

test("can not create potions using suits other than hearts", () => {
    const suits = SUITS.filter(s => s.label !== "hearts");

    suits.forEach(s => {
        expect(
            () => new Potion(new Card(s, RANKS[0]))
        ).toThrow("Potions must be 2s to 10s from Hearts suit");
    })
});

test("correctly heals the player on interaction", () => {
    const suit = SUITS.find(s => s.label === "hearts");
    const initialHealth = 0;
    const mockPlayer = {
        health: initialHealth,
        heal: (amount) => {mockPlayer.health += amount}
    }
    const potion = new Potion(new Card(suit, RANKS[0]));
    potion.interact(mockPlayer);

    expect(mockPlayer.health).toBe(initialHealth + potion.getValue());
});

test("can not be interacted twice", () => {
    const suit = SUITS.find(s => s.label === "hearts");
    const initialHealth = 5;
    const mockPlayer = {
        health: initialHealth,
        heal: (amount) => {mockPlayer.health += amount}
    }
    const potion = new Potion(new Card(suit, RANKS[0]));
    potion.interact(mockPlayer);
    expect(mockPlayer.health).toBe(initialHealth + potion.getValue());
    potion.interact(mockPlayer);
    expect(mockPlayer.health).toBe(initialHealth + potion.getValue());
})