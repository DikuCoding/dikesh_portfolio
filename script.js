AOS.init();

// INTRO ANIMATION
window.onload = () => {
    setTimeout(() => {
        document.getElementById("intro").style.display = "none";
    }, 800); // under 1 second
};

// THEME TOGGLE
document.getElementById("theme-toggle").onclick = () => {
    document.body.classList.toggle("light");
};

// TYPING EFFECT
const text = "Hi, I’m Dikesh Khagi — crafting modern digital experiences.";
let i = 0;

function type() {
    if (i < text.length) {
        document.getElementById("typing").innerHTML += text.charAt(i);
        i++;
        setTimeout(type, 50);
    }
}
type();