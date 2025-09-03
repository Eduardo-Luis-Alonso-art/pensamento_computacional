let prevScrollPos = window.pageYOffset;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    const currentScrollPos = window.pageYOffset;
    header.style.top = prevScrollPos > currentScrollPos ? "0" : "-100px";
    prevScrollPos = currentScrollPos;
});