export const SUITS = [
    {label: "hearts", icon: "♥️"},
    {label: "diamonds", icon: "♦️"}, 
    {label: "spades", icon: "♠️"},
    {label:  "clubs", icon: "♣️"}
];

export const RANKS = [
    {label: "two", icon: "2"}, 
    {label: "three", icon: "3"}, 
    {label: "four", icon: "4"}, 
    {label: "five", icon: "5"}, 
    {label: "six", icon: "6"}, 
    {label: "seven", icon: "7"}, 
    {label: "eight", icon: "8"},
    {label: "nine", icon:  "9"},
    {label: "ten", icon:  "10"},
    {label: "valet", icon: "J"},
    {label: "queen", icon: "Q"},
    {label: "king", icon: "K"},
    {label: "ace", icon: "A"}
];

export const REMOVE_POTS_AND_WEAPONS = ["J", "Q", "K", "A"];

export const ROOM_SIZE = 4;
export const MAX_HEALTH = 20;

export function capitalize(word) {
    if (typeof word !== "string") return;
    return `${word[0].toLocaleUpperCase()}${word.slice(1)}`;
}