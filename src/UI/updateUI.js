import { capitalize, getEntityAndValue, getEntityLabel, MAX_HEALTH, ROOM_SIZE } from "../misc/helpers.js";

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
    healthParagraph.textContent = `Health: ${newValue}/${MAX_HEALTH}`;
}

/**
 * Updates the HTML representation for player's current weapon.
 * @param {{value: number, durability: number[]}} weapon - An weapon object
 */
export function updateWeapon(weapon) {
    const weaponDmgParagraph = document.querySelector(".weapon-value");
    weaponDmgParagraph.textContent = weapon.value ? `${weapon.value} damage` : "Weapon Damage: 0 (unarmed)";
    const durabilityParagraph = document.querySelector(".weapon-durability");
    if (weapon.durability.length > 0) {
        durabilityParagraph.textContent = "Defeated: ";
        weapon.durability.forEach((value, i) => {
            durabilityParagraph.textContent += i < weapon.durability.length - 1 
            ? `${value}, ` 
            : `${value}.`
        });
    } else {
         durabilityParagraph.textContent = "";
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
    const roomLength = room.filter(entity => !entity.interacted).length;
    for (let i = 0; i < ROOM_SIZE; i++) {
        const next = entityButtons[i];
        next.dataset["entity"] = entityLabels[i];
        
        next.disabled = roomLength === 1 || room[i].interacted;
        next.textContent = entityLabels[i];
    }

    const nextBtn = document.querySelector(".room-next");
    const skipBtn = document.querySelector(".room-skip");
    nextBtn.disabled = roomLength !== 1;
    skipBtn.disabled = !(roomLength === ROOM_SIZE) || !canSkip;
    document.querySelector(".selected").style.display = "none";
}

export function updateEntitySelection(entityCard, canUseWeapon) {
    const { name, value } = getEntityAndValue(entityCard);
    const nameParagraph = document.querySelector(".entity-name");
    const valueParagraph = document.querySelector(".entity-value");
    const interactButton = document.querySelector(".interact-button");
    const extraButton = document.querySelector(".extra-button");

    extraButton.style.display = "none";
    nameParagraph.textContent = capitalize(name);
    [interactButton, extraButton].forEach(btn => {
        btn.dataset["name"] = name;
        btn.dataset["value"] = value;
        btn.dataset["suit"] = entityCard.suit;
        btn.dataset["rank"] = entityCard.rank;
    });

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

export function updateGameOverState(state) {
    document.querySelector(".selected").style.display = "none";
    document.querySelector(".room").style.display = "none";
    document.querySelector(".game-over").style.display = "block";
}