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
            throw new Error("Potions must be from Hearts suit");

        super(card);
    }

    interact(player) {
        if (this.interacted) return;

        player.heal(this.getValue());
        this.interacted = true;
    }
}