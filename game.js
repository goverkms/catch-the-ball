document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript loaded and DOM fully parsed");
    // Your existing game code here
});

const girl = document.getElementById("girl");
const phone = document.getElementById("phone1");

// Move character function
window.addEventListener("keydown", function(event) {
    switch(event.key) {
        case "ArrowUp":
            girl.style.top = `${girl.offsetTop - 10}px`;
            break;
        case "ArrowDown":
            girl.style.top = `${girl.offsetTop + 10}px`;
            break;
        case "ArrowLeft":
            girl.style.left = `${girl.offsetLeft - 10}px`;
            break;
        case "ArrowRight":
            girl.style.left = `${girl.offsetLeft + 10}px`;
            break;
    }
});

console.log('Game script loaded successfully!');
