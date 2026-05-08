import { MAX_HEALTH, ROOM_SIZE } from "../misc/constants.js";

/**
 * Create the HTML elements for the scoundrel game.
 */
export default function createGameUI() {
    const contentDiv = document.querySelector('.content');
    contentDiv.replaceChildren();
    contentDiv.classList.add("game-layout");

    const container = document.querySelector(".content");

    const dungeonInfoContainer = document.createElement("div");
    dungeonInfoContainer.classList.add("dungeon-info");

    const playerPara = document.createElement("p");
    playerPara.classList.add('player-name');

    const healthContainer = document.createElement("div");
    const healthPara = document.createElement("p");
    const heartIcon = document.createElement("p");
    heartIcon.textContent = "♥️";
    healthContainer.appendChild(heartIcon);
    healthContainer.appendChild(healthPara);
    healthContainer.classList.add("health-container");
    healthPara.textContent = `Health: ${MAX_HEALTH}/${MAX_HEALTH}`;
    healthPara.classList.add("player-health");

    const nextRoomBtn = document.createElement("button");
    nextRoomBtn.textContent = "Next Room";
    nextRoomBtn.classList.add("room-next", "fill-btn");

    const skipRoomBtn = document.createElement("button");
    skipRoomBtn.textContent = "Skip Room";
    skipRoomBtn.classList.add("room-skip", "fill-btn");

    const weaponPara = document.createElement("p");
    weaponPara.classList.add("weapon-value");

    const durabilityPara = document.createElement("p");
    durabilityPara.classList.add("weapon-durability");

    const completionPara = document.createElement("p");
    completionPara.classList.add("completion");
    completionPara.textContent = "0%";

    dungeonInfoContainer.appendChild(playerPara);
    dungeonInfoContainer.appendChild(healthContainer);
    dungeonInfoContainer.appendChild(weaponPara);
    dungeonInfoContainer.appendChild(durabilityPara);
    dungeonInfoContainer.appendChild(completionPara);

    const selectedContainer = document.createElement("div");
    selectedContainer.classList.add("selected");

    const roomContainer = document.createElement("div");
    roomContainer.classList.add("room");
    for (let i = 0; i < ROOM_SIZE; i++) {
        const entityButton = document.createElement("button");
        entityButton.classList.add("entity");
        entityButton.dataset["entity"] = "";

        const topSpan = document.createElement("span");
        topSpan.classList.add("top", "card-rank");
        const bottomSpan = document.createElement("span");
        bottomSpan.classList.add("bottom", "card-rank");
        const middlePara = document.createElement("p");
        middlePara.classList.add("card-suit");

        entityButton.appendChild(topSpan);
        entityButton.appendChild(middlePara);
        entityButton.appendChild(bottomSpan);
        roomContainer.appendChild(entityButton);
    }
    roomContainer.appendChild(nextRoomBtn);
    roomContainer.appendChild(skipRoomBtn);
   
    container.appendChild(dungeonInfoContainer);
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
    interactButton.classList.add("interact-button", "fill-btn");

    const extraButton = document.createElement("button");
    extraButton.classList.add("extra-button", "outline-btn");
    extraButton.disabled = true;
   
    container.appendChild(entityParagraph);
    container.appendChild(entityValueParagraph);
    container.appendChild(interactButton);
    container.appendChild(extraButton);
    container.style.display = "none";
}