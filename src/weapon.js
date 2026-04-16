import { REMOVE_POTS_AND_WEAPONS } from "./helpers.js";
import ScoundrelCard from "./scoundrelcard.js";

export default class Weapon extends ScoundrelCard {
    #durability = [];

    constructor(card) {
        if (card.suit.label !== "diamonds" ||
            REMOVE_POTS_AND_WEAPONS.includes(card.rank.icon)
        )
        throw new Error("Weapons must be 2s to 10s from Diamonds suit");

        super(card);
    }

    /**
     * Store the creatures already defeated using this weapon.
     */
    get durability() {
        return this.#durability.slice();
    }

    /**
     * Check if the current creature's power is less than the last defeated one.
     * @param {import("./creature.js").default} creaturePower - The attacked creature
     * @returns {Boolean}
     */
    #canAttack(creaturePower) {
        if (this.#durability.length === 0) return true;
        return this.#durability.at(-1) > creaturePower;
    }

    /**
     * Tries to attack a creature, throwing an error if its beyond its durability capacity.
     * An attack is calculated by the creaturePower - weaponPower, therefore it might be negative.
     * @param {import("./creature.js").default} creaturePower - The creature being attacked
     * @returns {number} - The damage after reducing it with the weapons power.
     */
    attack(creaturePower) {
        if (!this.#canAttack(creaturePower))
            throw new Error("This weapon can not attack the creature.");
        this.#durability.push(creaturePower);
        return creaturePower - this.getValue();
    }

    /**
     * Equips the weapon on the player.
     * @param {import("./player.js").default} player - The player instance
     */
    interact(player) {
        if (this.interacted) return;

        player.equipWeapon(this);
        this.interacted = true;
    }
}