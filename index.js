import createGameUI from "./src/UI/createUI.js";
import setGameEvents from "./src/UI/eventsUI.js";
import startUI from "./src/UI/startUI.js";
import { updateAllUI } from "./src/UI/updateUI.js";
import { createDungeon, getNextRoom } from "./src/entity/dungeon.js";
import { createPlayer } from "./src/entity/player.js";

(function () {
    let state = { player: null, dungeon: null };
    startUI(onGameStart);

    function onGameStart(username) {
        const player = createPlayer(username);
        const dungeon = createDungeon();
        state = { player, dungeon };

        createGameUI();
        setGameEvents(state);
        updateAllUI(state);
    }
})()

