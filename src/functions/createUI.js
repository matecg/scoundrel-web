import { MAX_HEALTH } from "../helpers.js";

/**
 * Render HTML elements representing a player and the dungeon.
 * @param {{player: import("./player.js").default, dungeon: import("./dungeon.js").default}} state
 */
export default function createGameUI(state) {
    const {player, dungeon} = state;
    const container = document.querySelector(".content");

    const playerPara = document.createElement("p");
    playerPara.textContent = `${player.name}`;

    const healthPara = document.createElement("p");
    healthPara.textContent = `Health: ${player.health}/${MAX_HEALTH}`;
    healthPara.classList.add("health-p");

    const nextRoomBtn = document.createElement("button");
    nextRoomBtn.textContent = "Next Room";
    nextRoomBtn.classList.add("next-btn");

    const skipRoomBtn = document.createElement("button");
    skipRoomBtn.textContent = "Skip Room";
    skipRoomBtn.classList.add("skip-btn");

    const weaponPara = document.createElement("p");
    weaponPara.textContent = `Weapon: ${player.weapon ? player.weapon.card.printIcon() : "None"}`;
    weaponPara.classList.add("weapon-p");
    weaponPara.addEventListener('weaponEquipped', (e) => {
        const {weaponIcon} = e.detail;
        weaponPara.textContent = `Weapon: ${weaponIcon}`;
    });

    const durabilityPara = document.createElement("p");
    durabilityPara.addEventListener('weaponEquipped', () => {
        durabilityPara.textContent = "Can be used on creatures of all power levels.";
    });
    durabilityPara.addEventListener('weaponUsed', (e) => {
        const newDurability = e.detail.creatureValue - 1;
        if (newDurability <= 2) {
            durabilityPara.textContent = "The weapon is broken."
            return;
        }
        durabilityPara.textContent = `Can be used on creatures with power up to ${newDurability}.`
    });

    const roomContainer = document.createElement("div");
    for (const entity of dungeon.room) {
        const dgEntity = document.createElement("button");
        dgEntity.textContent =`${entity.label()} - ${entity.getValue()} | 
        [${entity.card.printIcon()}]`;
        dgEntity.addEventListener('click', (e) => {
            if (dungeon.isFullyExplored()) {
                return;
            }
            // Instead dispatch an event that a card was interacted and send the card.
             const entityInteractedEvent = new CustomEvent("entityInteracted", {
                detail: { entity, onInteractionComplete: () => dgEntity.disabled = entity.interacted },
                cancelable: true,
                bubbles: true
            });
            dgEntity.dispatchEvent(entityInteractedEvent);
        });
        roomContainer.appendChild(dgEntity);
    }

    container.appendChild(playerPara);
    container.appendChild(healthPara);
    container.appendChild(weaponPara);
    container.appendChild(durabilityPara);
    container.appendChild(roomContainer);
    container.appendChild(nextRoomBtn);
    container.appendChild(skipRoomBtn);
}