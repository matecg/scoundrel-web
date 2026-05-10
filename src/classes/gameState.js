import { ROOM_SIZE } from "../misc/constants.js";
import { createWeapon } from "../misc/helpers.js";
import Dungeon from "./dungeon.js";
import Player from "./player.js";

export default class GameState {
    /**@type {Player} - A player instance. */
    #player;
    /**@type {Dungeon} - A dungeon instance. */
    #dungeon;
    /**@type {number} - Current turn number */
    #turn;

    constructor(playerName) {
        this.#player = new Player(playerName);
        this.#dungeon = new Dungeon();
        this.#turn = 0;
    }

    get turn() {
        return this.#turn;
    }

    get donePercentage() {
        const percentage =  Math.round(this.#dungeon.getCompletionPercent() * 1000) / 10;
        return percentage;
    }

    get dungeon() {
        const safeRoom = this.#dungeon.room.map(el => {
            return {...el}
        });
        return {
            room: safeRoom,
            canSkip: this.#dungeon.canSkip,
            score: this.#dungeon.getScore()
        }
    }

    get player() {
        const weapon = this.#player.weapon ? {...this.#player.weapon} : null;
        return {
            name: this.#player.name,
            weapon,
            health: this.#player.health,
            canUseWeapon: (creatureValue) => this.#player.canUseWeapon(creatureValue),
            canUsePotion: this.#player.canUsePotion
        }
    }

    runTurn(action) {
        if (this.isGameOver()) return false;

        const { type, data } = action;
        switch (type) {
            case "interact":
                this.#interactWithEntity(data);
                break;
            case "discard":
                this.#dungeon.room[+data.index].interacted = true;
                break;
            case "skip":
                this.#dungeon.skipRoom()
                break;
            case "next":
                this.#dungeon.getNextRoom();
                this.#player.canUsePotion = true;
                break;
            default:
                throw new Error(`Invalid action type: ${type}`);
        }
        this.#turn++;
    }

    isGameOver() {
        return this.#player.health === 0
            || this.#dungeon.getCompletionPercent() === 1;
    }

    #interactWithEntity(data) {
        const entity = this.#dungeon.room[+data.index];
        switch (entity.type) {
            case "potion":
                const succeed = this.#player.drinkPotion(entity.value);
                break;
            case "weapon":
                const weapon = createWeapon(entity);
                this.#player.equipWeapon(weapon);
                break;
            case "creature":
                this.#player.fightCreature(entity.value, data?.useWeapon);
                break;
            default:
                return "Invalid";
        }
        entity.interacted = true;
    }
}