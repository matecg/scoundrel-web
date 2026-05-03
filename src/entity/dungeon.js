import { DECK, ROOM_SIZE, SKIP_FROM } from "../misc/helpers.js";

/**
 * Generates the next room, based on the current room state.
 * @param {Object} dg - A dungeon object
 * @returns {Object[]}
 */
export function getNextRoom(dg) {
    const roomLength = dg.nextRoom.filter(entity => !entity.interacted).length;
    
    if (roomLength == 0 || roomLength == 1) {
        dg.canSkip = true;
        const next = dg.elements.splice(0, ROOM_SIZE - roomLength);
        const cardsLeft = dg.nextRoom.filter(card => !card.interacted);
        dg.interacted.push(...dg.nextRoom);    
        dg.nextRoom = [...cardsLeft, ...next];
    } else if (roomLength == ROOM_SIZE && dg.canSkip) {
        dg.canSkip = false;
        dg.elements.push(...dg.nextRoom);
        dg.nextRoom = dg.elements.splice(0, ROOM_SIZE);
    }
    return dg.nextRoom;
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
        interacted: []
    };
    getNextRoom(dungeon);
    return dungeon;
}