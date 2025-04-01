function showDetails(houseId) {
    const homeView = document.getElementById("home-view");
    const details = document.getElementById("details");
    const houseTitle = document.getElementById("house-title");
    const gallery = document.querySelector(".gallery");
    const bookingConfirmation = document.getElementById("booking-confirmation");
    const checkinDay = document.getElementById("checkin-day");
    const houseRules = document.getElementById("house-rules");
    const propertyAccess = document.getElementById("property-access");

    const listings = {
        "chateau-plateau": {
            title: "Chateau Plateau",
            images: [
                "images/chateau-plateau.jpg",
                "images/chateau-plateau-living.jpg"
            ],
            bookingConfirmation: "Your booking for Chateau Plateau is confirmed. You will receive a confirmation email with your reservation details shortly.",
            checkinDay: "Check-in is on April 1, 2025, at 3:00 PM. Please arrive on time to ensure a smooth check-in process.",
            houseRules: "No smoking, no pets, quiet hours after 10 PM. Please respect the property and neighbors.",
            propertyAccess: "You will receive a key code via email 24 hours before check-in. Use the code to access the front door lockbox."
        },
        "paris-house": {
            title: "Paris House",
            images: [
                "images/paris-house.jpg",
                "images/paris-house-bedroom.jpg"
            ],
            bookingConfirmation: "Your booking for Paris House is confirmed. You will receive a confirmation email with your reservation details shortly.",
            checkinDay: "Check-in is on April 1, 2025, at 4:00 PM. Please let us know if you’ll be arriving late.",
            houseRules: "No parties, no loud music, maximum 4 guests. Keep the property clean and tidy.",
            propertyAccess: "A lockbox code will be provided on the day of check-in. The lockbox is located at the front entrance."
        },
        "chateau-milton": {
            title: "Chateau Milton",
            images: [
                "images/chateau-milton.jpg",
                "images/chateau-milton-exterior.jpg"
            ],
            bookingConfirmation: "Your booking for Chateau Milton is confirmed. You will receive a confirmation email with your reservation details shortly.",
            checkinDay: "Check-in is on April 1, 2025, at 2:00 PM. The host will meet you at the property.",
            houseRules: "No pets, no outside visitors after 8 PM. Please remove shoes at the entrance.",
            propertyAccess: "The host will meet you at the property to provide the keys and a brief tour."
        }
    };

    if (listings[houseId]) {
        // Hide the home view
        homeView.classList.add("hidden");
        homeView.classList.remove("visible");

        // Set the house title
        houseTitle.textContent = listings[houseId].title;

        // Clear the gallery
        gallery.innerHTML = "";

        // Create a simple gallery with 2 images
        listings[houseId].images.forEach((imageSrc, index) => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");

            const img = document.createElement("img");
            img.classList.add("gallery-image");
            img.src = imageSrc;
            img.alt = listings[houseId].title;
            img.onclick = () => openFullscreen(houseId, index);

            imageContainer.appendChild(img);
            gallery.appendChild(imageContainer);
        });

        // Set the instructions
        bookingConfirmation.textContent = listings[houseId].bookingConfirmation;
        checkinDay.textContent = listings[houseId].checkinDay;
        houseRules.textContent = listings[houseId].houseRules;
        propertyAccess.textContent = listings[houseId].propertyAccess;

        // Store images for fullscreen
        gallery.dataset.images = JSON.stringify(listings[houseId].images);
        gallery.dataset.title = listings[houseId].title;

        // Show the details view with animation
        details.classList.remove("hidden");
        setTimeout(() => {
            details.classList.add("visible");
        }, 10); // Small delay to trigger transition
    } else {
        console.error(`No listing found for ${houseId}`);
    }
}

function goBack() {
    const homeView = document.getElementById("home-view");
    const details = document.getElementById("details");

    // Hide the details view
    details.classList.remove("visible");
    setTimeout(() => {
        details.classList.add("hidden");
        // Show the home view
        homeView.classList.remove("hidden");
        setTimeout(() => {
            homeView.classList.add("visible");
        }, 10); // Small delay to trigger transition
    }, 300); // Match CSS transition duration
}

function openFullscreen(houseId, index) {
    const fullscreen = document.getElementById("fullscreen");
    const fullscreenImage = document.getElementById("fullscreen-image");
    const gallery = document.querySelector(".gallery");
    const images = JSON.parse(gallery.dataset.images);
    const title = gallery.dataset.title;

    fullscreenImage.src = images[index];
    fullscreenImage.alt = title;
    fullscreen.dataset.currentIndex = index;
    fullscreen.dataset.images = JSON.stringify(images);
    fullscreen.dataset.title = title;

    fullscreen.classList.remove("hidden");
    setTimeout(() => {
        fullscreen.classList.add("visible");
    }, 10);
}

function changeFullscreenImage(direction) {
    const fullscreen = document.getElementById("fullscreen");
    const fullscreenImage = document.getElementById("fullscreen-image");
    let currentIndex = parseInt(fullscreen.dataset.currentIndex);
    const images = JSON.parse(fullscreen.dataset.images);
    const title = fullscreen.dataset.title;

    currentIndex += direction;

    // Loop around if at the start or end
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    // Update the image
    fullscreenImage.src = images[currentIndex];
    fullscreenImage.alt = title;
    fullscreen.dataset.currentIndex = currentIndex;
}

function closeFullscreen() {
    const fullscreen = document.getElementById("fullscreen");
    fullscreen.classList.remove("visible");
    setTimeout(() => {
        fullscreen.classList.add("hidden");
    }, 300);
}

// Trigger initial fade-in animation on page load
window.addEventListener("load", () => {
    const homeView = document.getElementById("home-view");
    setTimeout(() => {
        homeView.classList.add("visible");
    }, 10);
});
