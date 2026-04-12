import Card from "./card.js";
import { RANKS, SUITS } from "./helpers.js";

export default class Deck {
    #cards = [];

    constructor() {
        this.#cards = this.#getDeck();
    }

    get cards() {
        return this.#cards.slice(0);
    }

    /**
     * Complete the deck with all 52 standard cards again.
     */
    reset() {
        this.#cards = this.#getDeck();
    }

    /**
     * Shuffles the deck in place to a pseudo-random order.
     */
    shuffle() {
        const length = this.#cards.length;
        for (let i = 0; i < 1000; i++) {
            const to = Math.floor(Math.random() * length);
            const from = Math.floor(Math.random() * length);
            const temp = this.#cards[from];
            this.#cards[from] = this.#cards[to];
            this.#cards[to] = temp;
        }
    }

    /**
     * Draws the topmost card(s) and remove them from the deck.
     * @param {number} amount - The number of cards that will drafted
     */
    draw(amount = 1) {
        if (typeof amount !== "number") return;
        if (amount <= 0) return;

        const cards = this.#cards.splice(0, amount);
        return cards;
    }

    /**
     * Removes specific cards from the deck.
     * @param {Card[]} cards  - An array of cards to be removed
     */
    remove(cards) {
        this.#cards = this.#cards.filter((card) => !cards.some(c => c.equal(card)));
    }

    /**
     * Returns an array containing the printing string for all cards in the deck.
     * @returns {string[]}
     */
    print() {
        return this.#cards.map(card => card.print());
    }

    /**
     * Helper method that creates an array containing all 52 regular cards from a deck.
     * @returns {Card[]}
     */
    #getDeck() {
        return [].concat(SUITS.map(suit => {
            return [].concat(RANKS.map(rank => new Card(suit, rank)))
        })).flat();
    }
}