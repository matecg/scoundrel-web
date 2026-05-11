import { playGame } from "./startUI.js";
import { updateAllUI, updateEntitySelection, updateGameOverState, updateRoom } from "./updateUI.js";

/**
 * Program the events require for the game into the HTML elements.
 * @param {import ("../classes/gameState.js").default} state - Current game state
 */
export default function setGameEvents(state) {
    setCardClickEvent(state);
    setEntityInteractionEvent(state);
    setRoomControlEvent(state);
    setGameOverEvent(state);
}

/**
 * Event fired when a game card is clicked, before being interacted with.
 * @param {import ("../classes/gameState.js").default} state - Current game state
 */
function setCardClickEvent(state) {
    const { player } = state;
    const roomButtons = document.querySelectorAll(".entity");

    for (const btn of roomButtons) {
        btn.addEventListener('click', (e) => {
            let target = e.target;
            while (target && !target.classList.contains("entity")) {
                target = e.target.parentElement;
            }
            const { type, value, index } = target.dataset;
            let canUseWeapon = false;
            Array.from(roomButtons).forEach(el => el.classList.remove("entity-selected"));
            btn.classList.add("entity-selected");

            if (type === "creature") {
                canUseWeapon = player.canUseWeapon(value);
            }
            updateEntitySelection({ type, value: +value, index: +index }, canUseWeapon, state.player.canUsePotion);
        });
    }
}

/**
 * Main game function that interacts with a card from the current room.
 * @param {import ("../classes/gameState.js").default} state - Current game state 
 */
function setEntityInteractionEvent(state) {

    document.querySelector(".interact-button")
        .addEventListener('click', (e) => {
            const { value, index, type } = e.target.dataset;
            let data = { index };
            if (type === "creature") {
                data = { index, useWeapon: true }
            }
            state.runTurn({ type: "interact", data });
            updateAllUI(state);
            if (state.isGameOver()) {
                e.target.dispatchEvent(new CustomEvent("game-over", { bubbles: true }));
            }
        });

    document.querySelector(".extra-button")
        .addEventListener('click', (e) => {
            const { value, index, type } = e.target.dataset;
            const actionType = type === "creature" ? "interact" : "discard";
            state.runTurn({ type: actionType, data: { index } });
            updateAllUI(state);
            if (state.isGameOver()) {
                e.target.dispatchEvent(new CustomEvent("game-over", { bubbles: true }));
            }
        });
}

/**
 * Set the events for Skip Room and Next Room buttons.
 * @param {import ("../classes/gameState.js").default} state 
 */
function setRoomControlEvent(state) {

    document.querySelector(".room-next")
        .addEventListener('click', (e) => {
            state.runTurn({ type: "next" });
            // console.log(state);
            updateRoom(state.dungeon);
        })

    document.querySelector(".room-skip")
        .addEventListener('click', (e) => {
            state.runTurn({ type: "skip" });
            updateRoom(state.dungeon);
        });
}

/**
 * Stop the game when it's over.
 * @param {import ("../classes/gameState.js").default} state 
 */
function setGameOverEvent(state) {
    document.querySelector(".content")
        .addEventListener("game-over", (e) => {
            updateGameOverState(state.getScore(), state.donePercentage);

            document.querySelector(".play-again-button")
                .addEventListener("click", (e) => {
                    playGame(state.player.name);
                })
        });
}