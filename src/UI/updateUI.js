import Entity from "../classes/entity.js";
import { capitalize } from "../misc/helpers.js";
import { MAX_HEALTH, ROOM_SIZE } from "../misc/constants.js";
import buildGameOverUI from "./gameOverUI.js";

/**
 * Update all UI components of the game at once.
 * @param {import ("../classes/gameState.js").default} state - Current state of the game
 */
export function updateAllUI(state) {
    const { player, dungeon } = state;
    if (!player || !dungeon) return;
    console.log(dungeon);
    updatePlayerName(player.name);
    updatePlayerHealth(player.health);
    updateWeapon(player.weapon);
    updateRoom(dungeon.room, dungeon.canSkip);
    updateCompletion(state.donePercentage);
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
    healthParagraph.textContent = `Health: ${newValue}/${MAX_HEALTH}`;
}

/**
 * Updates the HTML representation for player's current weapon.
 * @param {{damage: number, durability: number[]}} weapon - An weapon object
 */
export function updateWeapon(weapon) {
    const weaponDmgParagraph = document.querySelector(".weapon-value");

    if (!weapon) {
        weaponDmgParagraph.textContent = "Weapon Damage: 0 (unarmed)";
        return;
    }

    const durabilityParagraph = document.querySelector(".weapon-durability");
    weaponDmgParagraph.textContent = `${weapon.damage} damage`;
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
 * @param {import ("../classes/entity.js").default[]} room - A 4 size array of entities
 * @param {boolean} canSkip 
 */
export function updateRoom(room, canSkip) {
    const entityButtons = document.querySelectorAll(".entity");
    const roomLength = room.filter(entity => !entity.interacted).length;
    for (let i = 0; i < ROOM_SIZE; i++) {
        const next = entityButtons[i];
        next.dataset["type"] = room[i].type;
        next.dataset["value"] = room[i].value;
        next.dataset["index"] = i;

        
        next.disabled = roomLength === 1 || room[i].interacted;
        const ranks = Array.from(next.querySelectorAll(".card-rank"));
        console.log(ranks);
        ranks.forEach(rankEl => rankEl.textContent = room[i].rank);
        next.querySelector(".card-suit").textContent = room[i].suit;
    }

    const nextBtn = document.querySelector(".room-next");
    const skipBtn = document.querySelector(".room-skip");
    nextBtn.disabled = roomLength !== 1;
    skipBtn.disabled = !(roomLength === ROOM_SIZE) || !canSkip;
    document.querySelector(".selected").style.display = "none";
}

/**
 * Updates the dungeon percentage paragraph with latest value.
 * @param {string} completion - Current completion provided by the state
 */
export function updateCompletion(completion) {
    document.querySelector(".completion").textContent = completion;
}

export function updateEntitySelection({ type, value, index }, canUseWeapon = false) {
    const nameParagraph = document.querySelector(".entity-name");
    const valueParagraph = document.querySelector(".entity-value");
    const interactButton = document.querySelector(".interact-button");
    const extraButton = document.querySelector(".extra-button");

    extraButton.style.display = "none";
    nameParagraph.textContent = capitalize(type);
    [interactButton, extraButton].forEach((btn) => {
        btn.dataset["type"] = type;
        btn.dataset["value"] = value;
        btn.dataset["index"] = index;
    });

    switch (type) {
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

export function updateGameOverState(score) {
    buildGameOverUI();
    document.querySelector(".score").textContent = `Your score: ${score}`;
    document.querySelector(".selected").style.display = "none";
}

