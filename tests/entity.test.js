import { describe, expect, test } from "@jest/globals";
import EntityCard from "../src/classes/entity.js";

describe("Entity Class Test Suit", () => {
    test("can create Creature entities with spades suit", () => {
        const entity = new EntityCard("♠️", "5");

        expect(entity).toBeInstanceOf(EntityCard);
        expect(entity.rank).toBe("5");
        expect(entity.suit).toBe("♠️");
        expect(entity.label).toBe("♠️5");
        expect(entity.interacted).toBe(false);
        expect(entity.type).toBe("creature");
        expect(entity.value).toBe(5);
    })

    test("can create Creature entities with Clubs suit", () => {
        const entity = new EntityCard("♣️", "A");

        expect(entity).toBeInstanceOf(EntityCard);
        expect(entity.rank).toBe("A");
        expect(entity.suit).toBe("♣️");
        expect(entity.label).toBe("♣️A");
        expect(entity.interacted).toBe(false);
        expect(entity.type).toBe("creature");
        expect(entity.value).toBe(14);
    })

    test("can create Potion entities", () => {
        const entity = new EntityCard("♥️", "2");

        expect(entity).toBeInstanceOf(EntityCard);
        expect(entity.rank).toBe("2");
        expect(entity.suit).toBe("♥️");
        expect(entity.label).toBe("♥️2");
        expect(entity.interacted).toBe(false);
        expect(entity.type).toBe("potion");
        expect(entity.value).toBe(2);
    });

    test("can create Weapon entities", () => {
        const entity = new EntityCard("♦️", "4");

        expect(entity).toBeInstanceOf(EntityCard);
        expect(entity.rank).toBe("4");
        expect(entity.suit).toBe("♦️");
        expect(entity.label).toBe("♦️4");
        expect(entity.interacted).toBe(false);
        expect(entity.type).toBe("weapon");
        expect(entity.value).toBe(4);
    });

    test("assign all the correct values to entity ranks", () => {
        const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        for (let i = 0; i < ranks.length; i++) {
            const entity = new EntityCard("♣️", ranks[i]);

            expect(entity.value).toBe(i + 2);
        }
    });

    test("non conventional entities have no type or value", () => {
        const entity = new EntityCard("Sun", "9000");

        expect(entity).toBeInstanceOf(EntityCard);
        expect(entity.rank).toBe("9000");
        expect(entity.suit).toBe("Sun");
        expect(entity.label).toBe("Sun9000");
        expect(entity.interacted).toBe(false);
        expect(entity.type).toBe("none");
        expect(entity.value).toBe(-1);
    });

    test("can interact with an entity instance", () => {
        const entity = new EntityCard("", "");
        entity.interacted = true;

        expect(entity.interacted).toBe(true);
    })
})