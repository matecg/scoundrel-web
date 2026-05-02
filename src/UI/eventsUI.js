import { canUseWeapon } from "../entity/player.js";
import { getEntityAndValue, getEntityFromLabel } from "../misc/helpers.js";
import { updateEntitySelection } from "./updateUI.js";

export default function setGameEvents(state) {
    setEntitySelectionEvent(state);
}

function setEntitySelectionEvent(state) {
    const {player, dungeon} = state;
    const roomButtons = document.querySelectorAll(".entity");

    function onEntityClick(e) {
        const entityCard = getEntityFromLabel(e.target.dataset["entity"]);
        const entity = getEntityAndValue(entityCard);
        updateEntitySelection(entity, canUseWeapon(player.weapon, entity.value));
    }

    for (const btn of roomButtons) {
        btn.addEventListener('click', onEntityClick);
    }
}