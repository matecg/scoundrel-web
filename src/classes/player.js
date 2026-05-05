import { MAX_HEALTH } from "../misc/constants.js";

/**
 * @typedef {Object} Weapon
 * @property {number} damage - Weapon's damage power.
 * @property {number[]} durability - Previously defeated creatures.
 */

export default class Player {
    #weapon;

    /**
     * Creates a new instance from Player class.
     * @param {string} name - Players name.
     */
    constructor(name) {
        /**@type {string} */
        this.name = name;

        /**@type {number}*/
        this.health = MAX_HEALTH;

        /**@type {Weapon | null}*/
        this.#weapon = null;

        /**@type {boolean} */
        this.canUsePotion = true;
    }

    get weapon() {
        return this.#weapon;
    }

    /**
     * Heals the player by drinking a potion, it does not accept
     * negative values or goes past maximum health.
     * @param {number} value - Potion healing value.
     */
    drinkPotion(value) {
        if (value < 0 || !this.canUsePotion) return false;

        this.health = Math.min(MAX_HEALTH, this.health + value);
        this.canUsePotion = false;
        return true;
    }

    /**
     * Equip a new weapon replacing the current one, if any.
     * @param {Weapon} weapon - Player's new weapon.
     */
    equipWeapon(weapon) {
        this.#weapon = weapon;
    }

    /**
     * Fights a creature barehanded or using the current weapon.
     * @param {number} strength - Creature's strength value.
     * @param {boolean} useWeapon - If set to true the current weapon will be used.
     */
    fightCreature(strength, useWeapon) {
        let damage = strength;
        if (useWeapon && this.canUseWeapon(strength)) {
            damage = Math.max(0, damage - this.#weapon.damage);
        }
        this.health = Math.max(0, this.health - damage);
    }

    /**
     * Verify if the current weapon can be used against a giving creature.
     * @returns {boolean}
     */
    canUseWeapon(creatureStrength) {
        if (!this.#weapon) return false;

        const lastCreature = this.#weapon.durability.at(-1);
        if (isNaN(+lastCreature)) return false;
        return +lastCreature > creatureStrength;
    }
}