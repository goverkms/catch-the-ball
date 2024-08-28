const girl = document.getElementById("girl");
const phones = document.querySelectorAll(".phone");
let activePhone = null;
let timer = null;

// Function to randomly select a phone to start ringing
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

// Function to move the girl character
function moveCharacter(event) {
    if (!activePhone) return;

    const phoneRect = activePhone.getBoundingClientRect();
    const girlRect = girl.getBoundingClientRect();

    switch(event.key) {
        case "ArrowUp":
            if (girl.offsetTop > 0) girl.style.top = `${girl.offsetTop - 50}px`;
            break;
        case "ArrowDown":
            if (girl.offsetTop < 550) girl.style.top = `${girl.offsetTop + 50}px`;
            break;
        case "ArrowLeft":
            if (girl.offsetLeft > 0) girl.style.left = `${girl.offsetLeft - 50}px`;
            break;
        case "ArrowRight":
            if (girl.offsetLeft < 550) girl.style.left = `${girl.offsetLeft + 50}px`;
            break;
    }

    // Check if the character reaches the ringing phone
    if (girlRect.left < phoneRect.right &&
        girlRect.right > phoneRect.left &&
        girlRect.top < phoneRect.bottom &&
        girlRect.bottom > phoneRect.top) {
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
