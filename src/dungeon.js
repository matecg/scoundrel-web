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
        this.room = this.moveToNextRoom();
    }

    moveToNextRoom(current = []) {
        // Game about to start *ONLY*
        if (this.#isEmpty(this.room) && this.#isEmpty(current)) {
            this.room = this.content.draw(ROOM_SIZE);
        }
        if (current.length === ROOM_SIZE) {
            if (this.canSkip && this.#isSameRoom(current)) {
                this.canSkip = false;
                this.content.push(this.room);
                this.room = this.content.draw(ROOM_SIZE)
            } else {
                throw new Error("Invalid skip usage. A room cannot be skipped twice in a row.")
            }
        }
        if (current.length === 1) {
            this.canSkip = false ? true : this.canSkip;
            this.room = current.concat(this.content.draw(ROOM_SIZE - 1));
        }
        this.room = this.room.map(card => {
            switch (card.suit.label) {
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
        });
        return this.room.slice();
    }

    isFullyExplored() {
        return this.room.filter(entity => entity.interacted).length === 3;
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
        return target.every(c => this.room.some(card => card.equal(c)))
    }
}