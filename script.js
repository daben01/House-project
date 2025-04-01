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
        // Hide home view
        homeView.classList.remove("visible");
        homeView.classList.add("hidden");

        // Set house title
        houseTitle.textContent = listings[houseId].title;

        // Clear gallery
        gallery.innerHTML = "";

        // Add 2 images
        listings[houseId].images.forEach(imageSrc => {
            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");

            const img = document.createElement("img");
            img.classList.add("gallery-image");
            img.src = imageSrc;
            img.alt = listings[houseId].title;

            imageContainer.appendChild(img);
            gallery.appendChild(imageContainer);
        });

        // Set instructions
        bookingConfirmation.textContent = listings[houseId].bookingConfirmation;
        checkinDay.textContent = listings[houseId].checkinDay;
        houseRules.textContent = listings[houseId].houseRules;
        propertyAccess.textContent = listings[houseId].propertyAccess;

        // Show details view
        details.classList.remove("hidden");
        setTimeout(() => {
            details.classList.add("visible");
        }, 10); // Trigger transition
    } else {
        console.error(`No listing found for ${houseId}`);
    }
}

function goBack() {
    const homeView = document.getElementById("home-view");
    const details = document.getElementById("details");

    // Hide details view
    details.classList.remove("visible");
    setTimeout(() => {
        details.classList.add("hidden");
        // Show home view
        homeView.classList.remove("hidden");
        setTimeout(() => {
            homeView.classList.add("visible");
        }, 10);
    }, 300); // Match CSS transition duration
}

// Fade in on page load
window -webkit-animation: fadeIn 1s;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}
