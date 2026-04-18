export function startUIStepUp() {
    document.querySelector(".start-btn")
        .addEventListener('click', onClickStartGame);
    document.querySelector(".rules-btn")
        .addEventListener('click', () => {
            document.querySelector(".rules").showModal();
        });
    document.querySelector(".rules > button")
        .addEventListener('click', () => {
            document.querySelector('.rules').close();
        })

    // check localStorage for previous saves and dynamically load a table of previous usernames/best scores.
}

function onClickStartGame(e) {
    const username = document.querySelector("#username").value;
    // Check if the user entered a username
    if (username.length === 0) {
        // If not render a warning message and return
        document.querySelector(".input-feedback").textContent = "Required"
        return;
    }
    // Check if the provided username is already saved to localStorage
    // If it is prompt the user if they want to continue
    // If not simply start the game
}