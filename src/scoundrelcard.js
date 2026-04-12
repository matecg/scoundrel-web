import Card from "./card.js";
import Player from "./player.js";

export default class ScoundrelCard {
    #card = null;

    /**
     * A scoundrel game entity base class. Must not be used directly.
     * @param {Card} card - The card representing this entity.
     */
    constructor(card) {
        this.#card = card;
        this.interacted = false;
    }

    get card() {
        return this.#card;
    }

    getValue() {
        const iconValue = +this.#card.rank.icon;
        if (!isNaN(iconValue)) return iconValue;
        
        switch (this.#card.rank.icon) {
            case "J":
                return 11;
            case "Q":
                return 12;
            case "K":
                return 13;
            case "A":
                return 14
            default:
                throw new Error("Invalid card provided");
        }
    }

    /**
     * Interacts with the player executing an specific action depending on the card type.
     * @param {Player} player - An instance to the player
     */
    interact(player) {
        throw new Error("Not implemented.");
    }
}