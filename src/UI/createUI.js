import { MAX_HEALTH, ROOM_SIZE } from "../misc/helpers.js";

/**
 * Create the HTML elements for the scoundrel game.
 */
export default function createGameUI() {
    // Wipe any content that was left behind
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

    const roomContainer = document.createElement("div");
    roomContainer.classList.add("room");
    for (let i = 0; i < ROOM_SIZE; i++) {
        const entityButton = document.createElement("button");
        entityButton.classList.add("entity");
        entityButton.dataset["entity"] = "";
        roomContainer.appendChild(entityButton);
    }

    container.appendChild(playerPara);
    container.appendChild(healthPara);
    container.appendChild(weaponPara);
    container.appendChild(durabilityPara);
    container.appendChild(roomContainer);
    container.appendChild(nextRoomBtn);
    container.appendChild(skipRoomBtn);
}