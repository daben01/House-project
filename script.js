function validateName() {
    const nameInput = document.getElementById("guest-name").value.trim();
    const landingView = document.getElementById("landing-view");
    const homeView = document.getElementById("home-view");
    const errorMessage = document.getElementById("error-message");

    // Basic validation: at least two words, min 2 characters each
    const nameParts = nameInput.split(" ").filter(part => part.length > 0);
    if (nameParts.length >= 2 && nameParts.every(part => part.length >= 2)) {
        landingView.classList.add("hidden");
        homeView.classList.remove("hidden");
        setTimeout(() => {
            homeView.classList.add("visible");
        }, 10);
    } else {
        errorMessage.classList.remove("hidden");
    }
}

function showDetails(houseId) {
    const homeView = document.getElementById("home-view");
    const details = document.getElementById("details");
    const houseTitle = document.getElementById("house-title");
    const gallery = document.getElementById("gallery");
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
        homeView.classList.remove("visible");
        homeView.classList.add("hidden");

        houseTitle.textContent = listings[houseId].title;

        gallery.innerHTML = "";
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

        bookingConfirmation.textContent = listings[houseId].bookingConfirmation;
        checkinDay.textContent = listings[houseId].checkinDay;
        houseRules.textContent = listings[houseId].houseRules;
        propertyAccess.textContent = listings[houseId].propertyAccess;

        details.classList.remove("hidden");
        setTimeout(() => {
            details.classList.add("visible");
        }, 10);
    } else {
        console.error(`No listing found for ${houseId}`);
    }
}

function goBack() {
    const homeView = document.getElementById("home-view");
    const details = document.getElementById("details");

    details.classList.remove("visible");
    setTimeout(() => {
        details.classList.add("hidden");
        homeView.classList.remove("hidden");
        setTimeout(() => {
            homeView.classList.add("visible");
        }, 10);
    }, 300);
}
