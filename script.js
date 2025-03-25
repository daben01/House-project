function showDetails(houseId) {
    const details = document.getElementById("details");
    const houseTitle = document.getElementById("house-title");
    const gallery = document.querySelector(".gallery");
    const bookingConfirmation = document.getElementById("booking-confirmation");
    const checkinDay = document.getElementById("checkin-day");
    const houseRules = document.getElementById("house-rules");
    const propertyAccess = document.getElementById("property-access");

    const listings = {
        "chateau-plateau": {
            title: "Heart of downtown Montreal + parking",
            images: [
                "images/chateau-plateau.jpg",
                "images/chateau-plateau-living.jpg",
                "images/chateau-plateau-kitchen.jpg"
            ],
            bookingConfirmation: "Your booking for Chateau Plateau is confirmed. You will receive a confirmation email with your reservation details shortly.",
            checkinDay: "Check-in is on April 1, 2025, at 3:00 PM. Please arrive on time to ensure a smooth check-in process.",
            houseRules: "No smoking, no pets, quiet hours after 10 PM. Please respect the property and neighbors.",
            propertyAccess: "You will receive a key code via email 24 hours before check-in. Use the code to access the front door lockbox."
        },
        "paris-house": {
            title: "Step away from downtown Bell Center CITQ#297014",
            images: [
                "images/paris-house.jpg",
                "images/paris-house-bedroom.jpg",
                "images/paris-house-dining.jpg"
            ],
            bookingConfirmation: "Your booking for Paris House is confirmed. You will receive a confirmation email with your reservation details shortly.",
            checkinDay: "Check-in is on April 1, 2025, at 4:00 PM. Please let us know if you’ll be arriving late.",
            houseRules: "No parties, no loud music, maximum 4 guests. Keep the property clean and tidy.",
            propertyAccess: "A lockbox code will be provided on the day of check-in. The lockbox is located at the front entrance."
        },
        "chateau-milton": {
            title: "Victorian house, heart of downtown CITQ#301085",
            images: [
                "images/chateau-milton.jpg",
                "images/chateau-milton-exterior.jpg",
                "images/chateau-milton-bathroom.jpg"
            ],
            bookingConfirmation: "Your booking for Chateau Milton is confirmed. You will receive a confirmation email with your reservation details shortly.",
            checkinDay: "Check-in is on April 1, 2025, at 2:00 PM. The host will meet you at the property.",
            houseRules: "No pets, no outside visitors after 8 PM. Please remove shoes at the entrance.",
            propertyAccess: "The host will meet you at the property to provide the keys and a brief tour."
        }
    };

    if (listings[houseId]) {
        houseTitle.textContent = listings[houseId].title;

        // Clear the gallery
        gallery.innerHTML = "";

        // Create the gallery structure with a single image and navigation buttons
        const img = document.createElement("img");
        img.classList.add("gallery-image");
        img.id = "current-image";
        img.src = listings[houseId].images[0];
        img.alt = listings[houseId].title + " - Image 1";

        const prevBtn = document.createElement("button");
        prevBtn.classList.add("gallery-btn", "prev-btn");
        prevBtn.textContent = "◄";
        prevBtn.onclick = () => changeImage(houseId, -1);

        const nextBtn = document.createElement("button");
        nextBtn.classList.add("gallery-btn", "next-btn");
        nextBtn.textContent = "►";
        nextBtn.onclick = () => changeImage(houseId, 1);

        gallery.appendChild(prevBtn);
        gallery.appendChild(img);
        gallery.appendChild(nextBtn);

        // Store the current image index and images array in the gallery for navigation
        gallery.dataset.currentIndex = 0;
        gallery.dataset.images = JSON.stringify(listings[houseId].images);
        gallery.dataset.title = listings[houseId].title;

        // Set the text for each section
        bookingConfirmation.textContent = listings[houseId].bookingConfirmation;
        checkinDay.textContent = listings[houseId].checkinDay;
        houseRules.textContent = listings[houseId].houseRules;
        propertyAccess.textContent = listings[houseId].propertyAccess;

        // Show the modal with a transition
        details.classList.remove("hidden");
        details.classList.add("visible");
    }
}

function changeImage(houseId, direction) {
    const gallery = document.querySelector(".gallery");
    const currentImage = document.getElementById("current-image");
    let currentIndex = parseInt(gallery.dataset.currentIndex);
    const images = JSON.parse(gallery.dataset.images);
    const title = gallery.dataset.title;

    currentIndex += direction;

    // Loop around if at the start or end
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    // Update the image
    currentImage.src = images[currentIndex];
    currentImage.alt = title + " - Image " + (currentIndex + 1);
    gallery.dataset.currentIndex = currentIndex;
}

function closeDetails() {
    const details = document.getElementById("details");
    details.classList.remove("visible");
    details.classList.add("hidden");
}
