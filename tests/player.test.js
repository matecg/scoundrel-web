import { expect, test } from "@jest/globals";
import Player from "../src/player.js";
import Weapon from "../src/weapon.js";
import Card from "../src/card.js";
import { RANKS, SUITS } from "../src/helpers.js";
import Creature from "../src/creature.js";
import { MAX_HEALTH } from "../src/helpers.js";

test('can create a player with all defaults correct', () => {
    const p = new Player("John");

    expect(p).toBeInstanceOf(Player);
    expect(p.name).toBe("John");
    expect(p.health).toBe(MAX_HEALTH);
    expect(p.weapon).toBeNull();
});

test('correctly heals player', () => {
    const p = new Player("John");
    const INITIAL_HEALTH = 10;
    const HEAL_AMOUNT = 5;

    p.health = INITIAL_HEALTH;
    p.heal(HEAL_AMOUNT);

    expect(p.health).toBe(INITIAL_HEALTH + HEAL_AMOUNT);
});

test("player's health won't go above MAX_HEALTH", () => {
    const p = new Player("John");

    expect(p.health).toBe(MAX_HEALTH);
    p.heal(10000);
    expect(p.health).toBe(MAX_HEALTH);
})

test('throws when heal is non numeric type', () => {
    const p = new Player("John");

    expect(() => {
        p.heal("2")
    }).toThrow("Invalid healing amount provided");
    expect(() => {
        p.heal([2]);
    }).toThrow("Invalid healing amount provided");
    expect(() => {
        p.heal({amount: 2})
    }).toThrow("Invalid healing amount provided");
});

test("throws when healing amount is negative", () => {
    const p = new Player("John");

    expect(() => p.heal(-1))
        .toThrow("Invalid healing amount provided");
});

test("can correctly equip a weapon", () => {
    const p = new Player("John");
    const w = new Weapon(new Card(SUITS[1], RANKS[3]));

    expect(p.weapon).toBeNull();
    p.equipWeapon(w);
    expect(p.weapon).toBeInstanceOf(Weapon);
    expect(p.weapon).toStrictEqual(w);
});

test("throws when weapon equipped is not a Weapon instance", () => {
    const p = new Player("John");

    expect(() => p.equipWeapon({damage: 2000}))
        .toThrow("Weapon must be an instance from Weapon class");
    expect(() => p.equipWeapon(["big bad sword"]))
        .toThrow("Weapon must be an instance from Weapon class");
    expect(() => p.equipWeapon("a bloody edge mate"))
        .toThrow("Weapon must be an instance from Weapon class");
});

test("combat method returns the creature power when unarmed", () => {
    const p = new Player("John");
    const c = new Creature(new Card(SUITS[3], RANKS[5]));

    const expected = c.getValue();
    const actual = p.combat(c.getValue());

    expect(actual).toBe(expected);
});

test("combat method return creature power - weapon power", () => {
    const p = new Player("John");
    const w = new Weapon(new Card(SUITS[1], RANKS[5]));
    const c = new Creature(new Card(SUITS[3], RANKS[10]));

    p.equipWeapon(w);
    const expected = c.getValue() - w.getValue();
    const actual = p.combat(c.getValue());

    expect(actual).toBe(expected);
});

test("combat method return zero when weapon power is greater than creature power", () => {
    const p = new Player("John");
    const w = new Weapon(new Card(SUITS[1], RANKS[5]));
    const c = new Creature(new Card(SUITS[3], RANKS[0]));

    p.equipWeapon(w);
    const expected = 0;
    const actual = p.combat(c.getValue());

    expect(actual).toBe(expected);
});

test("player health won't got to negative values", () => {
    const p = new Player("John");
    const c1 = new Creature(new Card(SUITS[3], RANKS[12]));
    const c2 = new Creature(new Card(SUITS[3], RANKS[12]));

    p.combat(c1.getValue());
    p.combat(c2.getValue());

    expect(p.health).toBe(0);
})



