/**
 * Returns the provided string with the first character in uppercase.
 * @param {string} word - A regular word.
 * @returns {string}
 */
export function capitalize(word) {
    if (typeof word !== "string") return;
    return `${word[0].toLocaleUpperCase()}${word.slice(1)}`;
}

/**
 * Transforms an entity object into a string label.
 * @param {{suit:string, rank: string}} entity - An entity from the dungeon
 * @returns {string}
 */
export function getEntityLabel(entity) {
    return `${entity.suit}${entity.rank}`;
}

/**
 * Extracts an entity object representation from its label.
 * @param {string} label - An entity label
 * @returns {{suit: string, rank: string}}
 */
export function getEntityFromLabel(label) {
    const output = {};
    for (const suit of DECK.suits) {
        if (label.includes(suit)) output.suit = suit;
    }
    output.rank = label.replace(output.suit, "");
    return output;
}

/**
 * Extract the current value and entity name from a card.
 * @param {{suit: string, rank: string}} card - A card to transform
 * @returns {{name: string, value: number}}
 */
export function getEntityAndValue(card) {
    const output = {}
    switch (card.suit) {
        case "♥️":
            output.name = "potion";
            break;
        case "♦️":
            output.name = "weapon";
            break;
        case "♣️":
        case "♠️":
            output.name = "creature";
            break;
        default:
            break;
    }
    const rankIdx = DECK.ranks.findIndex(rank => rank === card.rank);
    output.value = rankIdx + 2;
    return output;
}

/**
 * @typedef {Object} Weapon
 * @property {number} damage - Weapon's damage power.
 * @property {number[]} durability - Previously defeated creatures.
 */

/**
 * Shuffles an array of any type in place.
 * @param {any[]} array - An array of any type
 * @returns {any[]}
 */
export function shuffleInPlace(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

/**
 * Creates a new Weapon object if the provided entity is valid, otherwise returns null.
 * @param {import ("../classes/entity.js").default} entity - An entity from rank Diamonds.
 * @returns {Weapon | null}
 */
export function createWeapon(entity) {
    if (entity.suit !== "♦️" || entity.interacted) return null;
    return {
        damage: entity.value,
        durability: []
    }
}