import { expect, test } from "@jest/globals";
import Weapon from "../src/weapon.js";
import { SUITS, RANKS } from "../src/helpers.js";
import Card from "../src/card.js";

test("can create weapons of rank 2 to 10 of diamonds", () => {
    const diamond = SUITS.find(s => s.label === "diamonds");
    for (let i = 0; i < 9; i++) {
        expect(
            () => new Weapon(new Card(diamond, RANKS[i]))
        ).not.toThrow();
    }
});

test("can not create weapons using J, Q, K, A", () => {
    const diamond = SUITS.find(s => s.label === "diamonds");

    for (let i = 9; i < RANKS.length; i++) {
        expect(
            () => new Weapon(new Card(diamond, RANKS[i]))
        ).toThrow("Weapons must be 2s to 10s from Diamonds suit");
    }
})

test("can not create weapons using suits other than diamonds", () => {
    const otherSuits = SUITS.filter(s => s.label !== "diamonds");

    otherSuits.forEach(s => {
        expect(
            () => new Weapon(new Card(s, RANKS[0]))
        ).toThrow("Weapons must be 2s to 10s from Diamonds suit");
    })
});

test("durability property can not be mutated outside of the class", () => {
    const diamond = SUITS.find(s => s.label === "diamonds");
    const weapon = new Weapon(new Card(diamond, RANKS[0]));
    const durability = weapon.durability;

    durability.push("invalid");
    weapon.durability.push("also invalid");

    expect(weapon.durability.length).toBe(0);
});

test("can attack a creature from empty state", () => {
    const creaturePower = 5;
    const diamond = SUITS.find(s => s.label === "diamonds");
    const weapon = new Weapon(new Card(diamond, RANKS[3]));

    const actual = weapon.attack(creaturePower);

    expect(actual).toBe(creaturePower - weapon.getValue());
    expect(weapon.durability.length).toBe(1);
});

test("can attack multiple valid creatures", () => {
    const creaturesPowers = [10, 7, 4];
    const diamond = SUITS.find(s => s.label === "diamonds");
    const weapon = new Weapon(new Card(diamond, RANKS[5]));

    for (let i = 0; i < creaturesPowers.length; i++) {
        const actual = weapon.attack(creaturesPowers[i]);

        expect(actual).toBe(creaturesPowers[i] - weapon.getValue());
        expect(weapon.durability.length).toBe(i + 1);
    }
});

test("throws an error when an invalid creature is attacked", () => {
    const creaturesPowers = [4, 10];
    const diamond = SUITS.find(s => s.label === "diamonds");
    const weapon = new Weapon(new Card(diamond, RANKS[0]));

    weapon.attack(creaturesPowers[0]);
    
    expect(() => weapon.attack(creaturesPowers[1])).toThrow(
        "This weapon can not attack the creature."
    );
});

test("equips itself on the player when interacted with", () => {
    const playerMock = {
        equipWeapon: (wep) => {
            playerMock.weapon = wep;
        }
    }
    const diamond = SUITS.find(s => s.label === "diamonds");
    const weapon = new Weapon(new Card(diamond, RANKS[0]));

    weapon.interact(playerMock);

    expect(weapon.interacted).toBe(true);
    expect(playerMock.weapon).toBeInstanceOf(Weapon);
    expect(playerMock.weapon.getValue()).toBe(weapon.getValue());
})