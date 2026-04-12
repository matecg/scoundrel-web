import { REMOVE_POTS_AND_WEAPONS } from "./helpers.js";
import ScoundrelCard from "./scoundrelcard.js";

export default class Weapon extends ScoundrelCard{
    #durability = [];

    constructor(card) {
        if (card.suit.label !== "diamonds" ||
            REMOVE_POTS_AND_WEAPONS.includes(card.rank.icon)
        )
        throw new Error("Weapons must be from Diamonds suit");

        super(card);
    }

    get durability() {
        return this.#durability.slice();
    }

    canAttack(creature) {
        if (this.#durability.length === 0) return true;
        return this.#durability.at(-1).getValue() < creature.getValue();
    }

    addToDurability(creature) {
        this.#durability.push(creature);
    }

    interact(player) {
        player.equipWeapon(this);
        this.interacted = true;
    }
}