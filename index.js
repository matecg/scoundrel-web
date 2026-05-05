import GameState from "./src/classes/gameState.js";
import createGameUI from "./src/UI/createUI.js";
import setGameEvents from "./src/UI/eventsUI.js";
import { playGame, setGameStartEvents } from "./src/UI/startUI.js";
import { updateAllUI } from "./src/UI/updateUI.js";

setGameStartEvents(onGameStart);

function onGameStart(username) {
    playGame(username);
}