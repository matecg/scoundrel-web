import { capitalize } from "./helpers.js";

export default class Card {
    #suit = "";
    #rank = "";

    constructor(suit, rank) {
        this.#suit = suit;
        this.#rank = rank;
    }

    get rank() {
        return this.#rank;
    }

    get suit() {
        return this.#suit;
    }

    printIcon() {
        return `${this.#suit.icon}${this.#rank.icon}`
    }

    print() {
        return `${capitalize(this.#rank.label)} of ${capitalize(this.#suit.label)}`
    }

    /**
     * Compare Cards returning true when they have the same label on their suit and rank.
     * @param {Card} card - The card to compare to.
     */
    equal(card) {
        return this.#rank.label === card.rank.label && 
            this.#suit.label === card.suit.label;
    }
}