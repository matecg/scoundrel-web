export default function buildGameOverUI() {
    const room = document.querySelector(".room");
    const gameOverContainer = document.createElement("div");
    gameOverContainer.classList.add("game-over");
    
    const gameOverParagraph = document.createElement("p");
    gameOverParagraph.textContent = "GAME OVER!";
    gameOverParagraph.classList.add("game-over-text");

    const playAgainButton = document.createElement("button");
    playAgainButton.textContent = "Play again";
    playAgainButton.classList.add("play-again-button");

    gameOverContainer.appendChild(gameOverParagraph);
    gameOverContainer.appendChild(playAgainButton);

    room.parentElement.replaceChild(gameOverContainer, room);
}