export default function buildGameOverUI(iconText = "💀") {
    const room = document.querySelector(".room");
    const gameOverContainer = document.createElement("div");
    gameOverContainer.classList.add("game-over");

    const gameOverIcon = document.createElement("p");
    gameOverIcon.textContent = iconText;
    gameOverIcon.classList.add("icon");
    
    const gameOverParagraph = document.createElement("h2");
    gameOverParagraph.textContent = "GAME OVER!";
    gameOverParagraph.classList.add("game-over-text");

    const scoreContainer = document.createElement("div");
    scoreContainer.classList.add("score-container");

    const scoreLabel = document.createElement("p")
    scoreLabel.classList.add("score-label", "label");
    scoreLabel.textContent = "Final score:"

    const scoreValue = document.createElement("p");
    scoreValue.classList.add("score-value");
    scoreContainer.appendChild(scoreLabel);
    scoreContainer.appendChild(scoreValue);

    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play again";
    playAgainButton.classList.add("play-again-button", "fill-btn");

    gameOverContainer.appendChild(gameOverIcon);
    gameOverContainer.appendChild(gameOverParagraph);
    gameOverContainer.appendChild(scoreContainer);
    gameOverContainer.appendChild(playAgainButton);

    if (!room) return;
    room.parentElement.replaceChild(gameOverContainer, room);
}