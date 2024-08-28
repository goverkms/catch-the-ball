document.addEventListener("DOMContentLoaded", function() {
    console.log("Game script loaded!");

    const girl = document.getElementById("girl");
    const phones = document.querySelectorAll(".phone");
    const ringtone = document.getElementById("ringtone");

    // Function to move the character
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

    // Function to simulate a phone ringing
    function ringPhone(phone) {
        ringtone.play();
        phone.classList.add("ringing");

        setTimeout(() => {
            phone.classList.remove("ringing");
            phone.style.backgroundColor = 'red'; // Indicate missed call
        }, 3000);
    }

    // Randomly select a phone to ring
    setInterval(() => {
        const randomPhone = phones[Math.floor(Math.random() * phones.length)];
        ringPhone(randomPhone);
    }, 5000); // Ring a phone every 5 seconds
});
