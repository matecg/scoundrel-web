import { describe, expect, test } from "@jest/globals";

import Dungeon from "../src/classes/dungeon.js";

describe("Dungeon Class Test Suit", () => {
    test("can create an instance correctly", () => {
        const dungeon = new Dungeon();

        expect(dungeon).toBeInstanceOf(Dungeon)
        expect(dungeon.canSkip).toBe(true);
        expect(dungeon.getCompletionPercent()).toBe(0);
        expect(dungeon.room.length).toBe(4);
        expect(dungeon.getScore()).toBe(-208);
    });

    test("returns an empty array with next room is called improperly", () => {
        const dungeon = new Dungeon();
        const current = dungeon.room;
        const newRoom = dungeon.getNextRoom();

        expect(newRoom).toEqual([]);
        expect(current.length).toBe(4);
    });

    test("correctly move to the next room after 3 interactions", () => {
        const dungeon = new Dungeon();
        const initialRoom = dungeon.room;
        dungeon.room[0].interacted = true;
        dungeon.room[1].interacted = true;
        dungeon.room[2].interacted = true;
        const carryOver = dungeon.room[3];
        const nextRoom = dungeon.getNextRoom();
        
        expect(initialRoom).not.toEqual(nextRoom);
        expect(nextRoom.includes(carryOver)).toBe(true);
    });

    test("correctly skip a room", () => {
        const dungeon = new Dungeon();
        const initialRoom = dungeon.room;
        
        dungeon.skipRoom();
        const isDifferent = dungeon.room.every((el) => !initialRoom.some(card => card === el));

        expect(dungeon.canSkip).toBe(false);
        expect(isDifferent).toBe(true);
    });

    test("can not skip a room twice in a roll", () => {
        const dungeon = new Dungeon();
        const newRoom = dungeon.skipRoom();
        const skipAgainRoom = dungeon.skipRoom();

        expect(skipAgainRoom).toEqual([]);
        expect(dungeon.room).toEqual(newRoom);
        expect(dungeon.canSkip).toBe(false);
    });

    test("completion method returns correct value for the entire dungeon", () => {
        const dungeon = new Dungeon();
        const deckSize = 44;
        let room = dungeon.room;

        expect(dungeon.getCompletionPercent()).toBe(0);

        for (let i = 0; i < deckSize; i++) {
            if (i > 0 && i % 3 == 0) {
                room = dungeon.getNextRoom();
            }
            room[i % 3].interacted = true;
            expect(dungeon.getCompletionPercent()).toBeCloseTo((i + 1)/deckSize);
        }
    });

    // test("score returns correct value for the entire dungeon", () => {
    //     const dungeon = new Dungeon();
    //     const deckSize = 44;
    //     let room = dungeon.room;
    //     let score = -208

    //     expect(dungeon.getScore()).toBe(score);

    //     for (let i = 0; i < deckSize; i++) {
    //         if (i > 0 && i % 3 == 0) {
    //             room = dungeon.getNextRoom();
    //             // console.log(room);
    //         }
            
    //         room[i % 3].interacted = true;
    //         if (room[i%3].type === "creature") {
    //             score += room[i%3].value;
    //         }
    //         if (i === deckSize - 1 && room[(i + 1)%3].type === "potion") {
    //             score += room[(i + 1)%3].value;
    //         }
    //         expect(dungeon.getScore()).toBe(score);
    //     }
    // });
})