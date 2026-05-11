import { DECK, ROOM_SIZE, SKIP_RANKS } from "../misc/constants.js";
import { shuffleInPlace } from "../misc/helpers.js";
import Entity from "./entity.js";

export default class Dungeon {
    #entities;
    #isSkipAvailable;
    #room;
    #interacted;

    constructor() {
        /**@type {Entity[]} */
        this.#entities = this.#createEntities();
        /**@type {Entity[]} */
        this.#room = this.#entities.splice(0, ROOM_SIZE);
        /**@type {boolean} */
        this.#isSkipAvailable = true;
        /**@type {Entity[]} */
        this.#interacted = [];
    }

    static SIZE = 44;

    get canSkip() {
        return this.#isSkipAvailable 
            && this.#interactedInRoom() === 0
            && this.#entities.length >= 1;
    }

    get canGetNext() {
        if (this.#interactedInRoom() < (ROOM_SIZE - 1)) return false;
        if (this.#entities.length === 0) return false;
        return true;
    }

    get room() {
        return this.#room.slice(0);
    }

    get cardsLeft() {
        return this.#entities.length;
    }

    /**
     * Generate the dungeons next room if the player interacted with
     * a minimum of 3 cards, otherwise returns an empty array.
     * @returns {Entity[]}
     */
    getNextRoom() {
        if (!this.canGetNext) return [];

        const draftAmount = Math.min(ROOM_SIZE - 1, this.#entities.length);
        const newEntities = this.#entities.splice(0, draftAmount);
        const toKeep = this.#room.filter(ent => !ent.interacted);
        const newRoom = [...toKeep, ...newEntities];
        this.#isSkipAvailable = true;

        if (newRoom.length < ROOM_SIZE) {
            for (let i = 0; newRoom.length < ROOM_SIZE; i++) {
                if (this.#room[i].interacted) {
                    newRoom.push(this.#room[i]);
                }
            }
        }
        this.#interacted.push(...this.#room.filter(card => card.interacted));
        this.#room = newRoom;
        return this.#room.slice(0);
    }

    /**
     * Tries to skip a room if possible, drafting 4 new entities.
     * @returns {Entity[]}
     */
    skipRoom() {
        if (!this.canSkip) return [];

        this.#isSkipAvailable = false;
        shuffleInPlace(this.#room);
        this.#entities.push(...this.#room);
        this.#room = this.#entities.splice(0, ROOM_SIZE);
        return this.#room.slice(0);
    }

    /**
     * Returns a percentage ranging from 0 to 1 representing the 
     * current dungeon completeness status.
     * @returns {number}
     */
    getCompletionPercent() {
        return (this.#interacted.length + this.#interactedInRoom()) / Dungeon.SIZE;
    }

    /**
     * Return the number of entities not interacted yet.
     * @returns {number}
     */
    getEntitiesLeft() {
        return this.#entities.length;
    }

    /**
     * Return the dungeon score value.
     * @returns {number}
     */
    getScore() {
        let score = 0;
        for (const card of this.#entities) {
            if (card.type === "creature") {
                score -= card.value;
            }
        }
        if (this.#entities.length == 1 && this.#entities[0].type === "potion") {
            score +=  this.#entities[0].value;
        }
        return score;
    }

    /**
     * Return the number of cards already interacted in the current room.
     * @returns {number}
     */
    #interactedInRoom() {
        return this.#room.filter(ent => ent.interacted).length;
    }

    /**
     * Creates a new shuffled deck of Entities.
     * @returns {Entity[]}
     */
    #createEntities() {
        const { suits, ranks } = DECK;
        let entities = [];
        for (const suit of suits) {
            for (const rank of ranks) {
                if ((suit == "♥️" || suit == "♦️") &&
                    SKIP_RANKS.includes(rank)) continue;

                entities.push(new Entity(suit, rank));
            }
        }
        entities = shuffleInPlace(entities);
        return entities;
    }
}