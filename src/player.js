import Weapon from "./weapon.js";

export default class Player {
    constructor(name) {
        this.health = 20;
        this.weapon = null;
        this.name = name;
    }

    /**
     * Regenerates the players health.
     * @param {number} amount  - The amount to heal
     */
    heal(amount) {
        if (typeof amount !== "number" || amount <= 0)
            throw new Error("Invalid healing amount provided");
        this.health = amount + this.health > 20 ? 20 : amount + this.health;
    }

    /**
     * Equips a new weapon, discarding the previous.
     * @param {Weapon} weapon - The new weapon.
     */
    equipWeapon(weapon) {
        if (!(weapon instanceof Weapon)) 
            throw new Error("Weapon must be an instance from Weapon class");
        this.weapon = weapon;
    }

    /**
     * Fight against a creature from the dungeon.
     * @param {number} creaturePower - The creature's power level
     */
    combat(creaturePower) {
        let damage = 0;
        try {
            if (this.weapon) {
                damage = this.weapon.attack(creaturePower);
                if (damage < 0) damage = 0;
            }
            else
                damage = creaturePower;
        } catch (error) {
            damage = creaturePower;    
        } finally {
            this.health -= damage;    
            if (this.health <= 0)
                this.health = 0;
                // dispatch an event?
            return damage;
        }
    }
}