export const DECK = {
    ranks: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
    suits: ["♥️", "♠️", "♣️", "♦️"]
}
export const SKIP_FROM = ["J", "Q", "K", "A"];
export const MAX_HEALTH = 20;
export const ENTITIES = {
    "potion": (player, value) => {
        player.health = Math.min(player.health + value, MAX_HEALTH);
    },
    "weapon": (player, value) => {
        player.weapon = {
            value,
            durability: []
        }
    },
    "creature": (player, value) => {
        let damage = value;
        if (player.weapon.value) {
            const lastCreatureValue = player.weapon.durability.at(-1);
            if (lastCreatureValue && lastCreatureValue > value) {
                damage = Math.max(value - player.weapon.value, 0);
                player.weapon.durability.push(value);
            }
        }
        player.health = Math.max(player.health - damage, 0);
    }
}

export function capitalize(word) {
    if (typeof word !== "string") return;
    return `${word[0].toLocaleUpperCase()}${word.slice(1)}`;
}