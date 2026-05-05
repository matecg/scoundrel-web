import { playGame } from "./startUI.js";
import { updateAllUI, updateEntitySelection, updateGameOverState, updateRoom } from "./updateUI.js";

/**
 * Program the events require for the game into the HTML elements.
 * @param {import ("../classes/gameState.js").default} state - Current game state
 */
export default function setGameEvents(state) {
    setEntitySelectionEvent(state);
    setEntityInteractionEvent(state);
    setRoomControlEvent(state);
    setGameOverEvent(state);
}

/**
 * Event fired when a game card is clicked, before being interacted with.
 * @param {import ("../classes/gameState.js").default} state - Current game state
 */
function setEntitySelectionEvent(state) {
    const { player } = state;
    const roomButtons = document.querySelectorAll(".entity");

    for (const btn of roomButtons) {
        btn.addEventListener('click', (e) => {
            const { type, value, index } = e.target.dataset;
            let canUseWeapon = false;

            if (type === "creature") {
                canUseWeapon = player.canUseWeapon(value);
            }
            updateEntitySelection({ type, value: +value, index: +index }, canUseWeapon);
        });
    }
}

/**
 * Main game function that interacts with a card from the current room.
 * @param {import ("../classes/gameState.js").default} state - Current game state 
 */
function setEntityInteractionEvent(state) {
    const { player, dungeon } = state;

    document.querySelector(".interact-button")
        .addEventListener('click', (e) => {
            const {value, index} = e.target.dataset;
            state.runTurn({type: "interact", data: {index}})
            updateAllUI(state);
            if (state.isGameOver()) {
                e.target.dispatchEvent(new CustomEvent("game-over", {bubbles:true}));
            }
        });

    document.querySelector(".extra-button")
        .addEventListener('click', (e) => {
            const {value, index} = e.target.dataset;
            state.runTurn({type: "interact", data: {index, useWeapon: true}});
            updateAllUI(state);
            if (state.isGameOver()) {
                e.target.dispatchEvent(new CustomEvent("game-over", {bubbles:true}));
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
            state.runTurn({type:"next"});
            updateRoom(state.dungeon.room, state.dungeon.canSkip);
        })

    document.querySelector(".room-skip")
        .addEventListener('click', (e) => {
            state.runTurn({type:"skip"});
            updateRoom(state.dungeon.room, state.dungeon.room);
        });
}

/**
 * Stop the game when it's over.
 * @param {import ("../classes/gameState.js").default} state 
 */
function setGameOverEvent(state) {
    document.querySelector(".content")
        .addEventListener("game-over", (e) => {
            updateGameOverState(state.dungeon.score);

            document.querySelector(".play-again-button")
                .addEventListener("click", (e) => {
                    playGame(state.player.name);
                })
        });
}