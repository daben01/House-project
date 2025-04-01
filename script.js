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
            description: "Heart of downtown Montreal + parking",
            location: "Montréal, Québec",
            citq: "CITQ#297014",
            images: [
                "images/chateau-plateau.jpg",
                "images/chateau-plateau-living.jpg"
            ],
            captions: [
                "Exterior View",
                "Living Room"
            ],
            bookingConfirmation: "Your booking for Chateau Plateau is confirmed. You will receive a confirmation email with your reservation details shortly.",
            checkinDay: "Check-in is on April 1, 2025, at 3:00 PM. Please arrive on time to ensure a smooth check-in process.",
            houseRules: "No smoking, no pets, quiet hours after 10 PM. Please respect the property and neighbors.",
            propertyAccess: "You will receive a key code via email 24 hours before check-in. Use the code to access the front door lockbox."
        },
        "paris-house": {
            title: "Paris House",
            description: "Step away from downtown Bell Center",
            location: "Montréal, Québec",
            citq: "CITQ#297014",
            images: [
                "images/paris-house.jpg",
                "images/paris-house-bedroom.jpg"
            ],
            captions: [
                "Exterior View",
                "Bedroom"
            ],
            bookingConfirmation: "Your booking for Paris House is confirmed. You will receive a confirmation email with your reservation details shortly.",
            checkinDay: "Check-in is on April 1, 2025, at 4:00 PM. Please let us know if you’ll be arriving late.",
            houseRules: "No parties, no loud music, maximum 4 guests. Keep the property clean and tidy.",
            propertyAccess: "A lockbox code will be provided on the day of check-in. The lockbox is located at the front entrance."
        },
        "chateau-milton": {
            title: "Chateau Milton",
            description: "Victorian house, heart of downtown",
            location: "Montréal, Québec",
            citq: "CITQ#301085",
            images: [
                "images/chateau-milton.jpg",
                "images/chateau-milton-exterior.jpg"
            ],
            captions: [
                "Exterior View",
                "Side Exterior"
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
            img.alt = `${listings[houseId].title} - ${listings[houseId].captions[index]}`;
            img.onclick = () => openFullscreen(houseId, index);

            const caption = document.createElement("p");
            caption.classList.add("gallery-caption");
            caption.textContent = listings[houseId].captions[index];

            imageContainer.appendChild(img);
            imageContainer.appendChild(caption);
            gallery.appendChild(imageContainer);
        });

        // Set the instructions
        bookingConfirmation.textContent = listings[houseId].bookingConfirmation;
        checkinDay.textContent = listings[houseId].checkinDay;
        houseRules.textContent = listings[houseId].houseRules;
        propertyAccess.textContent = listings[houseId].propertyAccess;

        // Add description, location, and CITQ
        const description = document.querySelector(".house-description");
        const location = document.querySelector(".house-location");
        const citq = document.querySelector(".house-citq");
        description.textContent = listings[houseId].description;
        location.textContent = listings[houseId].location;
        citq.textContent = listings[houseId].citq;

        // Store images and captions for fullscreen
        gallery.dataset.images = JSON.stringify(listings[houseId].images);
        gallery.dataset.captions = JSON.stringify(listings[houseId].captions);
        gallery.dataset.title = listings[houseId].title;

        // Show the details view
        details.classList.remove("hidden");
        details.classList.add("visible");
    } else {
        console.error(`No listing found for ${houseId}`);
    }
}

function goBack() {
    const homeView = document.getElementById("home-view");
    const details = document.getElementById("details");

    // Show the home view
    homeView.classList.remove("hidden");

    // Hide the details view
    details.classList.remove("visible");
    details.classList.add("hidden");
}

function openFullscreen(houseId, index) {
    const fullscreen = document.getElementById("fullscreen");
    const fullscreenImage = document.getElementById("fullscreen-image");
    const fullscreenCaption = document.getElementById("fullscreen-caption");
    const gallery = document.querySelector(".gallery");
    const images = JSON.parse(gallery.dataset.images);
    const captions = JSON.parse(gallery.dataset.captions);
    const title = gallery.dataset.title;

    fullscreenImage.src = images[index];
    fullscreenImage.alt = title + " - Image " + (index + 1);
    fullscreenCaption.textContent = captions[index];
    fullscreen.dataset.currentIndex = index;
    fullscreen.dataset.images = JSON.stringify(images);
    fullscreen.dataset.captions = JSON.stringify(captions);
    fullscreen.dataset.title = title;

    fullscreen.classList.remove("hidden");
    fullscreen.classList.add("visible");
}

function changeFullscreenImage(direction) {
    const fullscreen = document.getElementById("fullscreen");
    const fullscreenImage = document.getElementById("fullscreen-image");
    const fullscreenCaption = document.getElementById("fullscreen-caption");
    let currentIndex = parseInt(fullscreen.dataset.currentIndex);
    const images = JSON.parse(fullscreen.dataset.images);
    const captions = JSON.parse(fullscreen.dataset.captions);
    const title = fullscreen.dataset.title;

    currentIndex += direction;

    // Loop around if at the start or end
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    // Update the image and caption
    fullscreenImage.src = images[currentIndex];
    fullscreenImage.alt = title + " - Image " + (currentIndex + 1);
    fullscreenCaption.textContent = captions[currentIndex];
    fullscreen.dataset.currentIndex = currentIndex;
}

function closeFullscreen() {
    const fullscreen = document.getElementById("fullscreen");
    fullscreen.classList.remove("visible");
    fullscreen.classList.add("hidden");
}
