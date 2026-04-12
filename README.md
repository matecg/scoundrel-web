# Scoundrel Web

An implementation of the card game Scoundrel using simple web stack: HTML, CSS and JavaScript. The goal of this project is to simply practice web development!

Developed by Matecg.
Thank you for stepping by! 👋

## Game Rules

- **Setup**: Shuffle the deck (the Dungeon). Start with 20 HP (use a d20 or spare cards).
- **Rooms**: Draw 4 cards from the deck to create a "Room."
- **Turn Action**: You must interact with 3 out of the 4 cards in the room, one at a time.
- **Remaining Card**: The 4th, unchosen card carries over, and 3 new cards are drawn to make a new 4-card room.
- **Running Away**: You may skip a room, putting all 4 cards at the bottom of the deck, but you cannot skip two rooms in a row. 

### Card Types & Interaction

- **Hearts (♥️)** - Potions: Heal your health by the card's value. Only one potion can be used per room; others must be discarded.
- **Diamonds (♦️)** - Weapons: Equip to fight.
  - **Weapon Usage**: When you equip a new weapon, the old one is discarded.
  - **Durability**: A weapon's strength is its face value. It can only kill a monster with a value lower than the last monster it killed (or its initial value).
- **Clubs/Spades (♣️/♠️)** - Monsters: Face value is their damage (Jacks=11, Queens=12, Kings=13, Aces=14).
  - **Combat**: 
    - **Equipped**: Fight with a weapon to take damage equal to *Monster Value - Weapon Value*. **Minimum 0**.
    - **Barehanded**: Fight without a weapon to take full damage equal to the monster's value. 

### Game End

- **🏆 Victory**: You survive the entire deck.
- **❌ Loss**: Your health reaches zero.
- **Scoring**: If you win, your score is your remaining health. If you lose, your score is the total value of monsters not defeated.