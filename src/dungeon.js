import Card from "./card.js";
import Deck from "./deck.js";
import { RANKS, SUITS } from "./helpers.js";
import { REMOVE_POTS_AND_WEAPONS, ROOM_SIZE } from "./helpers.js";


export default class Dungeon {
    constructor() {
        this.content = this.#createDungeon();
        this.canSkip = true;
        this.next = [];
    }

    getNextRoom(current = []) {
        // Game about to start *ONLY*
        if (this.#isEmpty(this.next) && this.#isEmpty(current)) {
            this.next = this.content.draw(ROOM_SIZE);
        }
        if (current.length === ROOM_SIZE) {
            if (this.canSkip && this.#isSameRoom(current)) {
                this.canSkip = false;
                this.content.push(this.next);
                this.next = this.content.draw(ROOM_SIZE)
            } else {
                throw new Error("Invalid skip usage. A room cannot be skipped twice in a row.")
            }
        }
        if (current.length === 1) {
            this.canSkip = false ? true : this.canSkip;
            this.next = current.concat(this.content.draw(ROOM_SIZE - 1));
        }
        return this.next.slice();
    }

    #createDungeon() {
        const deck = new Deck();
        const ranksToRemove = RANKS.filter(r => REMOVE_POTS_AND_WEAPONS.some(icon => r.icon === icon));
        const hearts = ranksToRemove.map(rank => new Card(SUITS[0], rank));
        const diamonds = ranksToRemove.map(rank => new Card(SUITS[1], rank));
        const toRemove = hearts.concat(diamonds);
        deck.remove(toRemove);
        deck.shuffle();
        return deck;
    }

    #isEmpty(room = []) {
        return room.length === 0
    }
     
    #isSameRoom(target) {
        return target.every(c => this.next.some(card => card.equal(c)))
    }
}