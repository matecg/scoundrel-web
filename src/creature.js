import ScoundrelCard from "./scoundrelcard.js";

export default class Creature extends ScoundrelCard {
    /**
     * Represents creatures that dwell in the dungeon.
     * @param {import("./card.js").default} card 
     */
    constructor(card) {
        if (card.suit.label !== "spades" && card.suit.label !== "clubs")
            throw new Error("Creatures may only be spades or clubs.");

        super(card);
    }

    /**
     * Combat against the player
     * @param {import("./player.js").default} player 
     */
    interact(player) {
        if (this.interacted) return;
        
        this.interacted = true;
        player.combat(this.getValue());
    }
}