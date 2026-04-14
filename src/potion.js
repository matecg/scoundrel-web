import Card from "./card.js";
import { REMOVE_POTS_AND_WEAPONS } from "./helpers.js";
import ScoundrelCard from "./scoundrelcard.js";

export default class Potion extends ScoundrelCard {

    /**
     * Creates potions instances from Hearts suit cards.
     * @param {Card} card - The deck card for this potion
     */
    constructor(card) {
        if (card.suit.label !== "hearts" ||
            REMOVE_POTS_AND_WEAPONS.includes(card.rank.icon)
        )
            throw new Error("Potions must be 2s to 10s from Hearts suit");

        super(card);
    }

    /**
     * Heals the player.
     * @param {import("./player.js").default} player - The player instance
     */
    interact(player) {
        if (this.interacted) return;

        player.heal(this.getValue());
        this.interacted = true;
    }
}