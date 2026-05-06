import { DECK, ROOM_SIZE, SKIP_RANKS } from "../misc/constants.js";
import { shuffleInPlace } from "../misc/helpers.js";
import Entity from "./entity.js";

export default class Dungeon {
    #entities; 
    #canSkip;
    #room;

    constructor() {
        /**@type {Entity[]} */
        this.#entities = this.#createEntities();
        /**@type {Entity[]} */
        this.#room = this.#entities.slice(0, 4);
        /**@type {boolean} */
        this.#canSkip = true;
    }

    get canSkip() {
        return this.#canSkip;
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
        if (this.interactedInRoom() < (ROOM_SIZE - 1)) return [];

        this.#canSkip = true;
        const newEntities = this.#draftEntities(ROOM_SIZE - 1);
        const toKeep = this.#room.filter(ent => !ent.interacted);
        this.#room = [...toKeep, ...newEntities];
        return this.#room.slice(0);
    }

    /**
     * Tries to skip a room if possible, drafting 4 new entities.
     * @returns {Entity[]}
     */
    skipRoom() {
        if (!this.#canSkip
            || this.interactedInRoom() !== 0
        ) return [];

        this.#canSkip = false;
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

    /**
     * Return the number of cards already interacted in the current room.
     * @returns {number}
     */
    interactedInRoom() {
        return this.#room.filter(ent => ent.interacted).length;
    }

    getScore() {
        let score = 0;
        const leftCreatures = this.#entities.filter(ent => ent.type === "creature" && !ent.interacted);
        for (const creature of leftCreatures) {
            score -= creature.value;
        }
        if (leftCreatures.length == 1 || leftCreatures.length == 0) {
            const lastCard = this.#entities.find(ent => !ent.interacted);
            if (lastCard.type == "potion") {
                score += lastCard.value;
            }
        }
        return score;
    }

    /**
     * Draft new not interacted entities from the dungeon deck.
     * @param {number} amount - The number of new entities.
     * @returns {Entity[]}
     */
    #draftEntities(amount = ROOM_SIZE) {
        const next = [];
        for (const entity of this.#entities) {
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