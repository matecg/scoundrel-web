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
    updatePlayerName(player.name);
    updatePlayerHealth(player.health);
    updateWeapon(player.weapon);
    updateRoom(dungeon);
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
    const healthParagraph = document.querySelector(".health-value");
    healthParagraph.textContent = `${newValue}/${MAX_HEALTH}`;
    const healthBar = document.querySelector(".health-bar");
    healthBar.style.width = Math.round(newValue/MAX_HEALTH * 100) + "%";
}

/**
 * Updates the HTML representation for player's current weapon.
 * @param {{damage: number, durability: number[]}} weapon - An weapon object
 */
export function updateWeapon(weapon) {
    const weaponDmgParagraph = document.querySelector(".weapon-value");

    if (!weapon) {
        weaponDmgParagraph.textContent = "0 (unarmed)";
        return;
    }

    const durabilityParagraph = document.querySelector(".weapon-durability");
    weaponDmgParagraph.textContent = `${weapon.damage}`;
    if (weapon.durability.length > 0) {
        durabilityParagraph.textContent = "";
        weapon.durability.forEach((value) => {
            durabilityParagraph.textContent += `${value} `
        });
    } else {
        durabilityParagraph.textContent = "";
    }
}

/**
 * Update the room the entities and room control buttons, Next and Skip.
 * @param {Object} dungeon - An data object representing the current dungeon state.
 */
export function updateRoom(dungeon) {
    const {room, canSkip, entitiesLeft, canGetNext} = dungeon;
    const entityButtons = document.querySelectorAll(".entity");
    const notInteractedCount = room.filter(entity => !entity.interacted).length;
    for (let i = 0; i < ROOM_SIZE; i++) {
        const next = entityButtons[i];
        next.dataset["type"] = room[i].type;
        next.dataset["value"] = room[i].value;
        next.dataset["index"] = i;
        
        next.classList.remove("entity-selected");
        next.disabled = (notInteractedCount === 1 && entitiesLeft > 1) || room[i].interacted;
        const ranks = Array.from(next.querySelectorAll(".card-rank"));
        ranks.forEach(rankEl => rankEl.textContent = room[i].rank);
        next.querySelector(".card-suit").textContent = room[i].suit;
    }

    const nextBtn = document.querySelector(".room-next");
    const skipBtn = document.querySelector(".room-skip");
    // console.log(notInteractedCount, entitiesLeft);
    nextBtn.disabled = notInteractedCount !== 1 && entitiesLeft > 1;
    skipBtn.disabled = !canSkip;
    document.querySelector(".selected").style.display = "none";
}

/**
 * Updates the dungeon percentage paragraph with latest value.
 * @param {string} completion - Current completion provided by the state
 */
export function updateCompletion(completion) {
    document.querySelector(".completed-value").textContent = `${completion}%`;
    document.querySelector(".completed-bar").style.width = completion + "%";
}

export function updateEntitySelection({ type, value, index }, canUseWeapon = false, canUsePotion = true) {
    const nameParagraph = document.querySelector(".entity-name");
    const valueParagraph = document.querySelector(".entity-value");
    const interactButton = document.querySelector(".interact-button");
    const extraButton = document.querySelector(".extra-button");

    extraButton.textContent = "";
    extraButton.disabled = false;
    interactButton.disabled = false;
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
            interactButton.disabled = !canUsePotion;
            extraButton.textContent = "Discard";
            break;
        case "weapon":
            valueParagraph.textContent = `Damage: ${value}`
            interactButton.textContent = "Equip";
            extraButton.textContent = "Discard";
            break;
        case "creature":
            extraButton.textContent = "Fight unarmed";
            valueParagraph.textContent = `Strength: ${value}`;
            interactButton.textContent = "Use weapon";
            interactButton.disabled = !canUseWeapon;
            break;
        default:
            return;
    }

    document.querySelector(".selected").style.display = "grid";
}

export function updateGameOverState(score, completion) {
    const icon = score >= 0 ? "🏆" : "💀";
    updateCompletion(completion);
    buildGameOverUI(icon);
    document.querySelector(".score-value").textContent = `${score}`;
    document.querySelector(".selected").style.display = "none";
}

