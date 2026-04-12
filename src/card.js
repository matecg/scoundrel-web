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
     * Compare instances of Card returning true when they are the same.
     * @param {Card} card - The card to compare to.
     */
    equal(card) {
        return this.#rank === card.rank && this.#suit === card.suit
    }
}