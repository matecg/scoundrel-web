// import { getEntityAndValue, getEntityFromLabel, MAX_HEALTH } from "../misc/helpers.js";
// import { playGame, updateEntitySelection, updateGameOverState, updatePlayerHealth, updateRoom, updateWeapon } from "./updateUI.js";

import { updateAllUI, updateEntitySelection } from "./updateUI.js";

/**
 * Program the events require for the game into the HTML elements.
 * @param {import ("../classes/gameState.js").default} state - Current game state
 */
export default function setGameEvents(state) {
    setEntitySelectionEvent(state);
    setEntityInteractionEvent(state);
    // setRoomControlEvent(state);
    // setGameOverEvent(state);
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
        });

    document.querySelector(".extra-button")
        .addEventListener('click', (e) => {
            const {value, index} = e.target.dataset;
            state.runTurn({type: "interact", data: {index, useWeapon: true}});
            updateAllUI(state);
        });
}

// function setRoomControlEvent(state) {
//     const { player, dungeon } = state;

//     document.querySelector(".room-next")
//         .addEventListener('click', (e) => {
//             player.canUsePotion = true;
//             const nextRoom = getNextRoom(dungeon);
//             updateRoom(nextRoom, dungeon.canSkip);
//         })

//     document.querySelector(".room-skip")
//         .addEventListener('click', (e) => {
//             player.canUsePotion = true;
//             const nextRoom = getNextRoom(dungeon);
//             updateRoom(nextRoom, dungeon.canSkip);
//         });
// }

// function setGameOverEvent(state) {
//     const { player, dungeon } = state;

//     document.querySelector(".content")
//         .addEventListener("game-over", (e) => {
//             updateGameOverState(state);

//             document.querySelector(".play-again-button")
//                 .addEventListener("click", (e) => {
//                     playGame(state.player.name);
//                 })
//         });
// }