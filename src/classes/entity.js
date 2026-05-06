import { DECK } from "../misc/constants.js";

export default class EntityCard {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.interacted = false;
        this.type = this.#setType();
        this.value = this.#setValue();
        this.label = `${this.suit}${this.rank}`
    }

    #setValue() {
        const idx = DECK.ranks.findIndex(r => r === this.rank);
        if (idx == -1) return idx;
        return idx + 2;
    }

    #setType() {
        switch (this.suit) {
            case "♥️":
                return "potion";
            case "♦️":
                return "weapon";
            case "♠️":
            case "♣️":
                return "creature";
            default:
                return "none";
        }
    }
}