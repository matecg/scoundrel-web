import { DECK, SKIP_FROM } from "./helpers.js";

/**
 * Extract the current value and entity name from a card.
 * @param {{suit: string, rank: string}} card - A card to transform
 * @returns {{entity: string, value: number}}
 */
export function getEntityAndValue(card) {
    const output = {}
    switch (card.suit) {
        case "♥️":
            output.entity = "potion";
            break;
        case "♦️":
            output.entity = "weapon";
            break;
        case "♣️":
        case "♠️":
            output.entity = "creature";
            break;
        default:
            break;
    }
    const rankIdx = DECK.ranks.findIndex(rank => rank === card.rank);
    output.value = rankIdx + 2;
    return output;
}

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
            elements.push({ suit: DECK.suits[i], rank: DECK.ranks[j] });
        }
    }
    for (let i = 0; i < 1000; i++) {
        const randomIdx = Math.floor(Math.random() * elements.length);
        const fromIdx = i % elements.length;
        [elements[randomIdx], elements[fromIdx]] = [elements[fromIdx], elements[randomIdx]]
    }
    return {
        elements,
        canSkip: true,
        nextRoom: [],
        interacted: []
    }
}