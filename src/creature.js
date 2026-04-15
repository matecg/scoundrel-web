import ScoundrelCard from "./scoundrelcard.js";

export default class Creature extends ScoundrelCard {
    /**
     * Represents creatures that dwell in the dungeon.
     * @param {import("./card.js").default} card 
     */
    constructor(card) {
        if (card.suit !== "spades" || card.suit !== "clubs")
            throw new Error(`Creatures may only be spades or clubs. Not ${card.suit}`);

        super(card);
    }

    /**
     * Combat against the player
     * @param {import("./player.js").default} player 
     */
    interact(player) {
        this.interacted = true;
        player.combat(this.getValue());
    }
}