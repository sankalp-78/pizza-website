let carouselIndex = 1;  // Start from the first real item (not the cloned ones)
const carouselItems = document.querySelectorAll('.menu-card');
const totalItems = carouselItems.length;

// Clone the first and last items for continuous scrolling
const firstItem = carouselItems[0].cloneNode(true);
const lastItem = carouselItems[totalItems - 1].cloneNode(true);

const menuContainer = document.querySelector('.menu-container');
menuContainer.appendChild(firstItem);  // Add the first item at the end
menuContainer.insertBefore(lastItem, carouselItems[0]);  // Add the last item at the beginning

const updatedItems = document.querySelectorAll('.menu-card');
const updatedTotalItems = updatedItems.length;

function moveCarousel(direction) {
    carouselIndex += direction;

    // Loop the index if it goes out of bounds
    if (carouselIndex >= updatedTotalItems) {
        carouselIndex = 1;  // Skip to the first real item (not the cloned one)
        menuContainer.style.transition = 'none';  // Remove transition for instant switch
        setTimeout(() => {
            menuContainer.style.transition = 'transform 1s ease-in-out';  // Re-enable transition after the switch
            updateCarousel();
        }, 50);
    } else if (carouselIndex < 0) {
        carouselIndex = updatedTotalItems - 2;  // Skip to the last real item
        menuContainer.style.transition = 'none';  // Remove transition for instant switch
        setTimeout(() => {
            menuContainer.style.transition = 'transform 1s ease-in-out';  // Re-enable transition after the switch
            updateCarousel();
        }, 50);
    }

    updateCarousel();
}

function updateCarousel() {
    const container = document.querySelector('.menu-container');
    const itemWidth = updatedItems[0].offsetWidth + 20;  // Including the margin between items
    const offset = carouselIndex * itemWidth * -1;  // Move to the next item

    container.style.transform = `translateX(${offset}px)`;

    updatedItems.forEach((item) => {
        item.classList.remove('active');
    });

    updatedItems[carouselIndex].classList.add('active');  // Highlight the current item
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.reservation-form form');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const name = form.querySelector('input[placeholder="Name"]').value;
        const email = form.querySelector('input[placeholder="Email"]').value;
        const date = form.querySelector('input[type="date"]').value;
        const time = form.querySelector('input[type="time"]').value;

        // Simple validation
        if (name && email && date && time) {
            // Display confirmation message
            alert(`Congratulations, ${name}! Your reservation on ${date} at ${time} is confirmed. We look forward to your visit.`);
        } else {
            // Display error message
            alert('Error: Please enter correct details.');
        }
    });
});


// Set up auto scrolling (optional)
setInterval(() => {
    moveCarousel(1);  // Automatically move to the next item every 3 seconds
}, 3000);

// Initialize carousel
updateCarousel();

// Add event listeners for manual control
document.querySelector('.next').addEventListener('click', () => moveCarousel(1));
document.querySelector('.prev').addEventListener('click', () => moveCarousel(-1));
