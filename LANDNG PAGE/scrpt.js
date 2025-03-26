// Get the navbar element
const navbar = document.getElementById('navbar');

// Function to change navbar style on scroll
function onScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Add scroll event listener
window.addEventListener('scroll', onScroll);
