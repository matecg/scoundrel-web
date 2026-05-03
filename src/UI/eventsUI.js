import { canUseWeapon } from "../entity/player.js";
import { getEntityAndValue, getEntityFromLabel, MAX_HEALTH } from "../misc/helpers.js";
import { updateEntitySelection, updatePlayerHealth, updateRoom, updateWeapon } from "./updateUI.js";

export default function setGameEvents(state) {
    setEntitySelectionEvent(state);
    setEntityInteractionEvent(state);
}

function setEntitySelectionEvent(state) {
    const { player, dungeon } = state;
    const roomButtons = document.querySelectorAll(".entity");

    function onEntityClick(e) {
        const entityCard = getEntityFromLabel(e.target.dataset["entity"]);
        const entity = getEntityAndValue(entityCard);
        updateEntitySelection(entityCard, canUseWeapon(player.weapon, entity.value));
    }

    for (const btn of roomButtons) {
        btn.addEventListener('click', onEntityClick);
    }
}

function setEntityInteractionEvent(state) {
    const { player, dungeon } = state;

    document.querySelector(".interact-button")
        .addEventListener('click', (e) => {
            const data = e.target.dataset;
            const entityName = data["name"];
            const value = data["value"];
            const entityCard = { suit: data["suit"], rank: data["rank"] };
            
            dungeon.nextRoom.find(card => card.suit === entityCard.suit
               && card.rank === entityCard.rank).interacted = true;

            switch (entityName) {
                case "potion":
                    if (!player.canUsePotion) break;
                    player.health = Math.min(MAX_HEALTH, player.health + value);
                    player.canUsePotion = false;
                    updatePlayerHealth(player.health);
                    break;
                case "weapon":
                    player.weapon.value = value;
                    player.weapon.durability = [];
                    updateWeapon(player.weapon);
                    break;
                case "creature":
                    player.health = Math.max(0, player.health - value);
                    updatePlayerHealth(player.health);
                    break;
            }
            updateRoom(dungeon.nextRoom, dungeon.canSkip);
        });

    document.querySelector(".extra-button")
        .addEventListener('click', (e) => {
            const data = e.target.dataset;
            const value = data["value"];
            const entityCard = { suit: data["suit"], rank: data["rank"] };

            dungeon.nextRoom.find(card => card.suit === entityCard.suit
               && card.rank === entityCard.rank).interacted = true;
            const damage = Math.max(0, value - player.weapon.value);
            player.health = Math.max(0, player.health - damage);
            player.weapon.durability.push(value);

            updatePlayerHealth(player.health);
            updateWeapon(player.weapon);
            updateRoom(dungeon.nextRoom);
        })
}