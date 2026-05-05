import { DECK } from "../misc/constants.js";

export default class Entity {
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
                throw new Error("Invalid entity type");
        }
    }
}