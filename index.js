import { startUIStepUp } from "./src/UI/startUI.js";
import createGameUI from "./src/functions/createUI.js";
import { createDungeon } from "./src/entity/dungeon.js";
import { createPlayer } from "./src/entity/player.js";

(function () {
    let state = { player: null, dungeon: null };
    startUIStepUp(onGameStart);

    function onGameStart(username) {
        const player = createPlayer(username);
        const dungeon = createDungeon();

        state = { player, dungeon };
        createGameUI();
    }
})()

