import { DECK, ROOM_SIZE, SKIP_RANKS } from "../misc/constants.js";
import { shuffleInPlace } from "../misc/helpers.js";
import Entity from "./entity.js";

export default class Dungeon {
    #entities;
    #isSkipAvailable;
    #room;

    constructor() {
        /**@type {Entity[]} */
        this.#entities = this.#createEntities();
        /**@type {Entity[]} */
        this.#room = this.#entities.slice(0, 4);
        /**@type {boolean} */
        this.#isSkipAvailable = true;
    }

    get canSkip() {
        return this.#isSkipAvailable 
            && this.#interactedInRoom() === 0
            && this.#entities.filter(ent => !ent.interacted).length >= 8;
    }

    get room() {
        return this.#room.slice(0);
    }

    /**
     * Generate the dungeons next room if the player interacted with
     * a minimum of 3 cards, otherwise returns an empty array.
     * @returns {Entity[]}
     */
    getNextRoom() {
        if (this.#interactedInRoom() < (ROOM_SIZE - 1)) return [];
        const cardsLeft = this.#entities.filter(ent => !ent.interacted);
        const draftAmount = Math.min(ROOM_SIZE - 1, cardsLeft.length);

        this.#isSkipAvailable = true;
        const newEntities = this.#draftEntities(draftAmount);
        const toKeep = this.#room.filter(ent => !ent.interacted);
        const newRoom = [...toKeep, ...newEntities];
        if (newRoom.length < ROOM_SIZE) {
            const interacted = this.#room.filter(ent => ent.interacted);
            for (let i = 0; newRoom.length < ROOM_SIZE; i++) {
                newRoom.push(interacted[i]);
            }
        }
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
        this.#entities = this.#entities.filter(ent => !this.#room.includes(ent));
        shuffleInPlace(this.#room);
        this.#entities.push(...this.#room);
        this.#room = this.#draftEntities();
        return this.#room.slice(0);
    }

    /**
     * Returns a percentage ranging from 0 to 1 representing the 
     * current dungeon completeness status.
     * @returns {number}
     */
    getCompletionPercent() {
        const interacted = this.#entities.filter(entity => entity.interacted);
        return interacted.length / this.#entities.length;
    }

    getScore() {
        let score = 0;
        const leftCards = this.#entities.filter(ent =>  !ent.interacted);
        for (const card of leftCards) {
            if (card.type === "creature")
                score -= card.value;
        }
        if (leftCards.length == 1 && leftCards[0].type === "potion") {
            score +=  leftCards[0].value;
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
     * Draft new not interacted entities from the dungeon deck.
     * @param {number} amount - The number of new entities.
     * @returns {Entity[]}
     */
    #draftEntities(amount = ROOM_SIZE) {
        const next = [];
        const leftCards = this.#entities.filter(ent => !ent.interacted);

        for (const entity of leftCards) {
            if (!entity.interacted && !this.#room.includes(entity))
                next.push(entity);
            if (next.length === amount) break;
        }
        return next;
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