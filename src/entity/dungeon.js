import { DECK, SKIP_FROM } from "../misc/helpers.js";



/**
 * Generates the next room, based on the current room state.
 * @param {Object} dg - A dungeon object
 */
export function getNextRoom(dg) {
    if (dg.nextRoom.length == 0 || dg.nextRoom.length == 1) {
        dg.canSkip = true;
        dg.nextRoom = dg.elements.splice(0, 4);
    } else if (dg.nextRoom.length == 4 && dg.canSkip) {
        dg.canSkip = false;
        dg.elements.push(...dg.nextRoom);
        dg.nextRoom = dg.elements.splice(0, 4);
    }
}

/**
 * Creates a new dungeon object instance.
 * @returns {Object}
 */
export function createDungeon() {
    const elements = [];
    for (let i = 0; i < DECK.suits.length; i++) {
        for (let j = 0; j < DECK.ranks.length; j++) {
            if ((DECK.suits[i] == "♥️" || DECK.suits[i] == "♦️")
                && SKIP_FROM.includes(DECK.ranks[j])) continue;
            elements.push({ suit: DECK.suits[i], rank: DECK.ranks[j], interacted: false });
        }
    }
    for (let i = 0; i < 1000; i++) {
        const randomIdx = Math.floor(Math.random() * elements.length);
        const fromIdx = i % elements.length;
        [elements[randomIdx], elements[fromIdx]] = [elements[fromIdx], elements[randomIdx]]
    }
    const dungeon = {
        elements,
        canSkip: true,
        nextRoom: [],
    };
    getNextRoom(dungeon);
    return dungeon;
}