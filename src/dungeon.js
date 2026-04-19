import Card from "./card.js";
import Creature from "./creature.js";
import Deck from "./deck.js";
import { RANKS, SUITS } from "./helpers.js";
import { REMOVE_POTS_AND_WEAPONS, ROOM_SIZE } from "./helpers.js";
import Potion from "./potion.js";
import Weapon from "./weapon.js";


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
        const dungeon = deck.cards.map(card => {
            switch(card.suit.label) {
                case "spades":
                case "clubs":
                    return new Creature(card);
                case "diamonds":
                    return new Weapon(card);
                case "hearts":
                    return new Potion(card);
                default:
                    throw new Error("Invalid card received");
            }
        })
        return dungeon;
    }

    #isEmpty(room = []) {
        return room.length === 0
    }
     
    #isSameRoom(target) {
        return target.every(c => this.next.some(card => card.equal(c)))
    }
}