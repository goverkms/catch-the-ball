const character = document.getElementById("character");
const phones = document.querySelectorAll(".phone");
let activePhone = null;
let timer = null;

// Helper function to start ringing a random phone
function startRinging() {
    if (activePhone) return;

    const randomPhone = phones[Math.floor(Math.random() * phones.length)];
    randomPhone.classList.add("ringing");
    activePhone = randomPhone;

    // Start a timer for the ringing phone
    timer = setTimeout(() => {
        if (activePhone) {
            activePhone.classList.remove("ringing");
            activePhone.classList.add("missed");
            activePhone = null;
            startRinging();
        }
    }, 3000); // 3 seconds to pick up the phone
}

// Move character function
function moveCharacter(event) {
    if (!activePhone) return;

    const phoneRect = activePhone.getBoundingClientRect();
    const characterRect = character.getBoundingClientRect();

    switch(event.key) {
        case "ArrowUp":
            character.style.top = `${character.offsetTop - 50}px`;
            break;
        case "ArrowDown":
            character.style.top = `${character.offsetTop + 50}px`;
            break;
        case "ArrowLeft":
            character.style.left = `${character.offsetLeft - 50}px`;
            break;
        case "ArrowRight":
            character.style.left = `${character.offsetLeft + 50}px`;
            break;
    }

    // Check if character reaches the ringing phone
    if (characterRect.left < phoneRect.right &&
        characterRect.right > phoneRect.left &&
        characterRect.top < phoneRect.bottom &&
        characterRect.bottom > phoneRect.top) {
            activePhone.classList.remove("ringing");
            activePhone = null;
            clearTimeout(timer);
            startRinging();
    }
}

// Event listener for character movement
window.addEventListener("keydown", moveCharacter);

// Start the game
startRinging();
