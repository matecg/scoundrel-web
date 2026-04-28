/**
 * Creates a new player object.
 * @param {string} name - Player's name
 * @returns {Object}
 */
export function createPlayer(name) {
    return {
        name,
        health: MAX_HEALTH,
        weapon: {
            value: 0,
            durability: []
        }
    }
}

/**
 * Tries to interact with a given index card from the current dungeon room.
 * @param {Object} dg - A dungeon object
 * @param {Object} player - A player object
 * @param {number} index - The index to interact with
 */
export function interactWithEntity(dg, player, index) {
    if (dg.interacted.includes(dg.nextRoom[index])) return;
    if (index >= dg.nextRoom.length) return;
    if (dg.nextRoom.length === 1) return;

    const next = dg.nextRoom.splice(index, 1)[0];
    dg.interacted.push(next);
    const { entity, value } = getEntityAndValue(next);
    ENTITIES[entity](player, value);
}