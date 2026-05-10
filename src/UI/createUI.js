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

    const playerName = document.createElement("h2");
    playerName.classList.add('player-name');

    const healthContainer = document.createElement("div");
    const healthLabel = document.createElement("p");
    const healthValue = document.createElement("p");
    const healthIcon = document.createElement("p");
    const healthBar = document.createElement("div");
    const healthBarBg = document.createElement("div");

    healthIcon.textContent = "♥️";
    healthIcon.classList.add("health-icon", "icon");
    healthBar.classList.add("health-bar");
    healthValue.textContent = `${MAX_HEALTH}/${MAX_HEALTH}`;
    healthLabel.textContent = "Health:";
    healthLabel.classList.add("label");
    healthValue.classList.add("health-value");
    healthBarBg.classList.add("health-bar-bg", "bar-bg");
    healthContainer.classList.add("health-container");

    healthBarBg.appendChild(healthValue);
    healthContainer.appendChild(healthIcon);
    healthContainer.appendChild(healthLabel);
    healthBarBg.appendChild(healthBar);
    healthContainer.appendChild(healthBarBg);

    const nextRoomBtn = document.createElement("button");
    nextRoomBtn.textContent = "Next Room";
    nextRoomBtn.classList.add("room-next", "fill-btn");

    const skipRoomBtn = document.createElement("button");
    skipRoomBtn.textContent = "Skip Room";
    skipRoomBtn.classList.add("room-skip", "fill-btn");

    const weaponContainer = document.createElement("div");
    const weaponIcon = document.createElement("p");
    const weaponValue = document.createElement("p");
    const weaponDamageLabel = document.createElement("p");
    const durabilityLabel = document.createElement("p");
    const durabilityPara = document.createElement("p");

    durabilityPara.classList.add("weapon-durability");
    durabilityLabel.textContent = "Last uses:";
    durabilityLabel.classList.add("label");
    weaponDamageLabel.textContent = "Weapon damage:";
    weaponDamageLabel.classList.add("label");
    weaponContainer.classList.add("weapon-container");
    weaponValue.classList.add("weapon-value");
    weaponIcon.textContent = "⚔️";
    weaponIcon.classList.add("weapon-icon", "icon");

    weaponContainer.appendChild(weaponIcon);
    weaponContainer.appendChild(weaponDamageLabel);
    weaponContainer.appendChild(weaponValue);
    weaponContainer.appendChild(durabilityLabel);
    weaponContainer.appendChild(durabilityPara);

    const completedContainer = document.createElement("div");
    const completedLabel = document.createElement("p");
    const completedValue = document.createElement("p");
    const completedBar = document.createElement("div");
    const completedBarBg = document.createElement("div");

    completedContainer.classList.add("completed-container");
    completedLabel.textContent = "Explored:";
    completedLabel.classList.add("label");
    completedValue.classList.add("completed-value");
    completedBarBg.classList.add("bar-bg");
    completedBar.classList.add("completed-bar");

    completedContainer.appendChild(completedLabel);
    completedBarBg.appendChild(completedValue);
    completedBarBg.appendChild(completedBar);
    completedContainer.appendChild(completedBarBg);
    
    dungeonInfoContainer.appendChild(playerName);
    dungeonInfoContainer.appendChild(healthContainer);
    dungeonInfoContainer.appendChild(weaponContainer);
    dungeonInfoContainer.appendChild(completedContainer);

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
    extraButton.classList.add("extra-button", "fill-btn");
    extraButton.disabled = true;

    container.appendChild(entityParagraph);
    container.appendChild(entityValueParagraph);
    container.appendChild(interactButton);
    container.appendChild(extraButton);
    container.style.display = "none";
}