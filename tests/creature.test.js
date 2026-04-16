import { expect, test } from "@jest/globals";
import Creature from "../src/creature.js";
import { RANKS, SUITS } from "../src/helpers.js";
import Card from "../src/card.js";

test('can only create instances using Spades or Clubs cards', () => {
    const oneOfEach = SUITS.map((x) => new Card(x, RANKS[1]));
    for (const card of oneOfEach) {
        if (card.suit.label === "diamonds" 
            || card.suit.label === "hearts") {
                expect(() => new Creature(card))
                    .toThrow("Creatures may only be spades or clubs.");
                continue;
        } 
        const creature = new Creature(card);

        expect(creature).toBeInstanceOf(Creature);
    }
});

test('can be interacted only once', () => {
    const creature = new Creature(new Card(SUITS[2], RANKS[10]));
    const mockPlayer = {
        damage: 0,
        combat: (value) => mockPlayer.damage = value
    }

    creature.interact(mockPlayer);
    expect(mockPlayer.damage).toBe(creature.getValue());
    expect(creature.interacted).toBe(true);

    mockPlayer.damage = 0;
    creature.interact(mockPlayer);
    expect(mockPlayer.damage).toBe(0);
})