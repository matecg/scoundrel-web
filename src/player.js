import Weapon from "./weapon.js";

export default class Player {
    constructor() {
        this.health = 20;
        this.weapon = null;
        this.canSkip = true;
    }

    heal(amount) {
        if (typeof amount !== "number" || amount <= 0)
            throw new Error("Invalid healing amount provided");
        this.health = amount + this.health > 20 ? 20 : amount + this.health;
    }

    equipWeapon(weapon) {
        if (!(weapon instanceof Weapon)) return;
        this.weapon = weapon;
    }
}