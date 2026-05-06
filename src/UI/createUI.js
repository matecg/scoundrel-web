import { MAX_HEALTH, ROOM_SIZE } from "../misc/constants.js";

/**
 * Create the HTML elements for the scoundrel game.
 */
export default function createGameUI() {
    document.querySelector('.content').replaceChildren();

    const container = document.querySelector(".content");

    const playerPara = document.createElement("p");
    playerPara.classList.add('player-name');

    const healthPara = document.createElement("p");
    healthPara.textContent = `Health: ${MAX_HEALTH}/${MAX_HEALTH}`;
    healthPara.classList.add("player-health");

    const nextRoomBtn = document.createElement("button");
    nextRoomBtn.textContent = "Next Room";
    nextRoomBtn.classList.add("room-next");

    const skipRoomBtn = document.createElement("button");
    skipRoomBtn.textContent = "Skip Room";
    skipRoomBtn.classList.add("room-skip");

    const weaponPara = document.createElement("p");
    weaponPara.classList.add("weapon-value");

    const durabilityPara = document.createElement("p");
    durabilityPara.classList.add("weapon-durability");

    const completionPara = document.createElement("p");
    completionPara.classList.add("completion");
    completionPara.textContent = "0%";

    const selectedContainer = document.createElement("div");
    selectedContainer.classList.add("selected");

    const roomContainer = document.createElement("div");
    roomContainer.classList.add("room");
    for (let i = 0; i < ROOM_SIZE; i++) {
        const entityButton = document.createElement("button");
        entityButton.classList.add("entity");
        entityButton.dataset["entity"] = "";
        roomContainer.appendChild(entityButton);
    }
    roomContainer.appendChild(nextRoomBtn);
    roomContainer.appendChild(skipRoomBtn);

    container.appendChild(playerPara);
    container.appendChild(healthPara);
    container.appendChild(weaponPara);
    container.appendChild(durabilityPara);
    container.appendChild(completionPara);
    container.appendChild(roomContainer);
    container.appendChild(selectedContainer);

    createEntitySelectionUI(selectedContainer);
}

/**
 * Renders details about an entity after being selected.
 * @param {HTMLDivElement} container - Container HTML element
 */
function createEntitySelectionUI(container) {
    container.replaceChildren();

    const entityParagraph = document.createElement("p");
    entityParagraph.classList.add("entity-name");

    const entityValueParagraph = document.createElement("p");
    entityValueParagraph.classList.add("entity-value");

    const interactButton = document.createElement("button");
    interactButton.classList.add("interact-button");

    const extraButton = document.createElement("button");
    extraButton.classList.add("extra-button");
    extraButton.style.display = "none";
   
    container.appendChild(entityParagraph);
    container.appendChild(entityValueParagraph);
    container.appendChild(interactButton);
    container.appendChild(extraButton);
    container.style.display = "none";
}