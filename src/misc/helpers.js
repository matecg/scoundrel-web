export const DECK = {
    ranks: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
    suits: ["♥️", "♠️", "♣️", "♦️"]
}
export const SKIP_FROM = ["J", "Q", "K", "A"];
export const MAX_HEALTH = 20;
export const ROOM_SIZE = 4;
export const ENTITIES = {
    "potion": (player, value) => {
        player.health = Math.min(player.health + value, MAX_HEALTH);
    },
    "weapon": (player, value) => {
        player.weapon = {
            value,
            durability: []
        }
    },
    "creature": (player, value) => {
        let damage = value;
        if (player.weapon.value) {
            const lastCreatureValue = player.weapon.durability.at(-1);
            if (lastCreatureValue && lastCreatureValue > value) {
                damage = Math.max(value - player.weapon.value, 0);
                player.weapon.durability.push(value);
            }
        }
        player.health = Math.max(player.health - damage, 0);
    }
}

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