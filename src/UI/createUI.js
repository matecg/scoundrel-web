import { capitalize, DECK, getEntityAndValue, getEntityFromLabel, MAX_HEALTH, ROOM_SIZE } from "../misc/helpers.js";

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

    const selectedContainer = document.createElement("div");
    selectedContainer.classList.add("selected-card");

    const roomContainer = document.createElement("div");
    roomContainer.classList.add("room");
    for (let i = 0; i < ROOM_SIZE; i++) {
        const entityButton = document.createElement("button");
        entityButton.classList.add("entity");
        entityButton.dataset["entity"] = "";
        entityButton.addEventListener('click', (e) => {
            selectEntity(e.target.textContent, selectedContainer);
        })
        roomContainer.appendChild(entityButton);
    }

    container.appendChild(playerPara);
    container.appendChild(healthPara);
    container.appendChild(weaponPara);
    container.appendChild(durabilityPara);
    container.appendChild(roomContainer);
    container.appendChild(nextRoomBtn);
    container.appendChild(skipRoomBtn);
    container.appendChild(selectedContainer);
}

/**
 * Renders details about an entity after being selected.
 * @param {string} entityLabel - An entity label
 * @param {HTMLDivElement} container - Container HTML element
 */
function selectEntity(entityLabel, container) {
    container.replaceChildren();
    const entityCard = getEntityFromLabel(entityLabel);
    const entity = getEntityAndValue(entityCard);
    const entityParagraph = document.createElement("p");
    const descriptionParagraph = document.createElement("p");
    const interactButton = document.createElement("button");

    entityParagraph.textContent = capitalize(entity.name);
    
    switch (entity.name) {
        case "potion":
            descriptionParagraph.textContent = `Heal: ${entity.value}.`
            interactButton.textContent = "Drink";
            break;
        case "weapon":
            descriptionParagraph.textContent = `Damage: ${entity.value}.`
            interactButton.textContent = "Equip";
            break;
        case "creature":
            descriptionParagraph.textContent = `Strength: ${entity.value}.`
            interactButton.textContent = "Fight";
            break;
    }
    container.appendChild(entityParagraph);
    container.appendChild(descriptionParagraph);
    container.appendChild(interactButton);
}