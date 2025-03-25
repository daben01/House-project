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
            bookingConfirmation: "[Booking confirmation text will be added later]",
            checkinDay: "[Check-in day text will be added later]",
            houseRules: "[House rules text will be added later]",
            propertyAccess: "[Property access text will be added later]"
        },
        "paris-house": {
            title: "Step away from downtown Bell Center CITQ#297014",
            images: [
                "images/paris-house.jpg",
                "images/paris-house-bedroom.jpg",
                "images/paris-house-dining.jpg"
            ],
            bookingConfirmation: "[Booking confirmation text will be added later]",
            checkinDay: "[Check-in day text will be added later]",
            houseRules: "[House rules text will be added later]",
            propertyAccess: "[Property access text will be added later]"
        },
        "chateau-milton": {
            title: "Victorian house, heart of downtown CITQ#301085",
            images: [
                "images/chateau-milton.jpg",
                "images/chateau-milton-exterior.jpg",
                "images/chateau-milton-bathroom.jpg"
            ],
            bookingConfirmation: "[Booking confirmation text will be added later]",
            checkinDay: "[Check-in day text will be added later]",
            houseRules: "[House rules text will be added later]",
            propertyAccess: "[Property access text will be added later]"
        }
    };

    if (listings[houseId]) {
        houseTitle.textContent = listings[houseId].title;

        // Clear the gallery
        gallery.innerHTML = "";

        // Add all pictures to the gallery
        listings[houseId].images.forEach((imageSrc, index) => {
            const img = document.createElement("img");
            img.src = imageSrc;
            img.alt = listings[houseId].title + " - Image " + (index + 1);
            img.classList.add("gallery-image");
            gallery.appendChild(img);
        });

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

function closeDetails() {
    const details = document.getElementById("details");
    details.classList.remove("visible");
    details.classList.add("hidden");
}
