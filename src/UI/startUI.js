import GameState from "../classes/gameState.js";
import createGameUI from "./createUI.js";
import setGameEvents from "./eventsUI.js";
import { updateAllUI } from "./updateUI.js";

/**
 * Assign events to initial page game buttons "Start" and "Rules".
 * @param {Function} onGameStart - Callback function called when game start
 */
export function setGameStartEvents(onGameStart) {
    document.querySelector(".start-btn")
        .addEventListener('click', (e) => {
            const username = document.querySelector("#username").value;
            if (username.length === 0) {
                document.querySelector(".input-feedback").textContent = "Required"
                return;
            }
            onGameStart(username);
        });
    document.querySelector(".rules-btn")
        .addEventListener('click', () => {
            document.querySelector(".rules").showModal();
        });
    document.querySelector(".rules > button")
        .addEventListener('click', () => {
            document.querySelector('.rules').close();
        })

    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        document.body.classList.add("dark-mode");
    }
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches
    ) {
        document.body.classList.add("light-mode");
    }
}


export function playGame(username) {
    const state = new GameState(username);

    createGameUI();
    setGameEvents(state);
    updateAllUI(state);
}