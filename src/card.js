import { capitalize } from "./helpers.js";

export default class Card {
    constructor(suit, rank) {
        this._suit = suit;
        this._rank = rank;
    }

    get rank() {
        return this._rank;
    }

    get suit() {
        return this._suit;
    }

    printIcon() {
        return `${this._suit.icon}${this._rank.icon}`
    }

    print() {
        return `${capitalize(this._rank.label)} of ${capitalize(this._suit.label)}`
    }
}