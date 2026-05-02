import { capitalize, getEntityLabel, ROOM_SIZE } from "../misc/helpers.js";

/**
 * Update all UI components of the game at once.
 * @param {{player: any, dungeon: any}} state - Current state of the game
 */
export function updateAllUI(state) {
    const { player, dungeon } = state;
    if (!player || !dungeon) return;

    updatePlayerName(player.name);
    updatePlayerHealth(player.health);
    updateWeapon(player.weapon);
    updateRoom(dungeon.nextRoom, dungeon.canSkip);
}

/**
 * Update the player's username UI.
 * @param {string} name - Players username
 */
export function updatePlayerName(name) {
    const nameParagraph = document.querySelector(".player-name");
    nameParagraph.textContent = capitalize(name);
}

/**
 * Update the player health UI.
 * @param {number} newValue - Player's health value
 */
export function updatePlayerHealth(newValue) {
    const healthParagraph = document.querySelector(".player-health");
    const oldValue = healthParagraph.textContent
    healthParagraph.textContent = oldValue.replace(/^\d{1,2}\/$/, `${newValue}/`);
}

/**
 * Updates the HTML representation for player's current weapon.
 * @param {{value: number, durability: number[]}} weapon - An weapon object
 */
export function updateWeapon(weapon) {
    const weaponDmgParagraph = document.querySelector(".weapon-value");
    weaponDmgParagraph.textContent = weapon.value ? `${weapon.value} damage` : "Weapon Damage: 0 (unarmed)";
    const durabilityParagraph = document.querySelector(".weapon-durability");
    durabilityParagraph.textContent = "";
    if (weapon.durability.length > 0) {
        const creaturesDefeated = weapon.durability.reduce((prev, curr, i) => {
            if (i < weapon.durability.length - 1) curr += `${prev}, `;
            else curr += `${prev}.`;
            return curr;
        }, "Creatures defeated: ");
        durabilityParagraph.textContent = creaturesDefeated;
    }
}

/**
 * Update the room the entities and room control buttons, Next and Skip.
 * @param {{suit: string, rank: string}[]} room - A 4 size array of entities
 * @param {boolean} canSkip 
 */
export function updateRoom(room, canSkip) {
    const entityButtons = document.querySelectorAll(".entity");
    const entityLabels = room.map(getEntityLabel);
    for (let i = 0; i < ROOM_SIZE; i++) {
        const next = entityButtons[i];
        if (!next.dataset["entity"]) {
            next.dataset["entity"] = entityLabels[i];
        }
        next.disabled = room.length === 1 || !entityLabels.includes(next.dataset["entity"]);
        next.textContent = entityLabels[i];
    }
    
    const nextBtn = document.querySelector(".room-next");
    const skipBtn = document.querySelector(".room-skip");
    nextBtn.disabled = room.length !== 1;
    skipBtn.disabled = !(room.length === ROOM_SIZE) || !canSkip;
}

export function updateEntitySelection(entity, canUseWeapon) {
    const {name, value} = entity;
    const nameParagraph = document.querySelector(".entity-name");
    const valueParagraph = document.querySelector(".entity-value");
    const interactButton = document.querySelector(".interact-button");
    const extraButton = document.querySelector(".extra-button");

    extraButton.style.display = "none";
    nameParagraph.textContent = capitalize(name);
    switch (name) {
        case "potion":
            valueParagraph.textContent = `Heals for ${value} points`        
            interactButton.textContent = "Drink";
            break;
        case "weapon":
            valueParagraph.textContent = `Damage: ${value}`  
            interactButton.textContent = "Equip";
            break;
        case "creature":
            if (canUseWeapon) {
                extraButton.textContent = "Use weapon";
                extraButton.style.display = "inline-block";
            }
            valueParagraph.textContent = `Strength: ${value}`;
            interactButton.textContent = "Fight unarmed";
            break;
        default:
            return;
    }

    document.querySelector(".selected").style.display = "block";
}