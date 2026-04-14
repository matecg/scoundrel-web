export default class ScoundrelCard {
    #card = null;

    /**
     * A scoundrel game entity base class. Must not be used directly.
     * @param {import("./card.js").default} card - The card representing this entity.
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
     * Interacts with the player executing an specific action.
     * @param {import("./player.js").default} player - An instance to the player
     */
    interact(player) {
        throw new Error("Not implemented.");
    }
}