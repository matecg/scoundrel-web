import { MAX_HEALTH } from "../misc/helpers.js";

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
        },
        canUsePotion: true
    }
};

/**
 * Check whether or not the current weapon can be used in combat against a creature.
 * @param {{value: number, durability: number[]}} weapon - A weapon representation
 * @param {number} creatureStrength - The creatures strength value
 * @returns {boolean}
 */
export function canUseWeapon(weapon, creatureStrength) {
    const {durability, value} = weapon;
    return value && (durability.length == 0 || durability.at(-1) > creatureStrength);
}