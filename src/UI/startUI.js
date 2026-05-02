export function startUIStepUp(onGameStart) {
    document.querySelector(".start-btn")
        .addEventListener('click', (e) => {
            const username = document.querySelector("#username").value;
            if (username.length === 0) {
                document.querySelector(".input-feedback").textContent = "Required"
                return;
            }
            onGameStart(username);
        });
    document.querySelector(".rules-btn")
        .addEventListener('click', () => {
            document.querySelector(".rules").showModal();
        });
    document.querySelector(".rules > button")
        .addEventListener('click', () => {
            document.querySelector('.rules').close();
        })
}
