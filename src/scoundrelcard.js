export default class ScoundrelCard {
    #card = null;

    constructor(card) {
        this.#card = card;
    }

    get card() {
        return this.#card;
    }

    interact(player) {
        throw new Error("Not implemented.");
    }
}