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
            title: "Chateau Plateau",
            description: "Heart of downtown Montreal + parking",
            location: "Montréal, Québec",
            citq: "CITQ#297014",
            images: [
                "images/chateau-plateau.jpg",
                "images/chateau-plateau-living.jpg",
                "images/chateau-plateau-kitchen.jpg"
            ],
            captions: [
                "Exterior View",
                "Living Room",
                "Kitchen"
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
                "images/paris-house-bedroom.jpg",
                "images/paris-house-dining.jpg"
            ],
            captions: [
                "Exterior View",
                "Bedroom",
                "Dining Room"
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
                "images/chateau-milton-exterior.jpg",
                "images/chateau-milton-bathroom.jpg"
            ],
            captions: [
                "Exterior View",
                "Side Exterior",
                "Kitchen"
            ],
            bookingConfirmation: "Your booking for Chateau Milton is confirmed. You will receive a confirmation email with your reservation details shortly.",
            checkinDay: "Check-in is on April 1, 2025, at 2:00 PM. The host will meet you at the property.",
            houseRules: "No pets, no outside visitors after 8 PM. Please remove shoes at the entrance.",
            propertyAccess: "The host will meet you at the property to provide the keys and a brief tour."
        }
    };

    if (listings[houseId]) {
        // Set the house title
        houseTitle.textContent = listings[houseId].title;

        // Clear the gallery
        gallery.innerHTML = "";

        // Create a container for the image and caption
        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        // Create the gallery structure with a single image
        const img = document.createElement("img");
        img.classList.add("gallery-image");
        img.id = "current-image";
        img.src = listings[houseId].images[0];
        img.alt = listings[houseId].title + " - Image 1";
        img.onclick = () => openFullscreen(houseId, 0);

        // Create the caption element
        const caption = document.createElement("p");
        caption.classList.add("gallery-caption");
        caption.id = "current-caption";
        caption.textContent = listings[houseId].captions[0];

        // Add image and caption to the container
        imageContainer.appendChild(img);
        imageContainer.appendChild(caption);

        // Create navigation buttons
        const prevBtn = document.createElement("button");
        prevBtn.classList.add("gallery-btn", "prev-btn");
        prevBtn.textContent = "◄";
        prevBtn.onclick = () => changeImage(houseId, -1);

        const nextBtn = document.createElement("button");
        nextBtn.classList.add("gallery-btn", "next-btn");
        nextBtn.textContent = "►";
        nextBtn.onclick = () => changeImage(houseId, 1);

        gallery.appendChild(prevBtn);
        gallery.appendChild(imageContainer);
        gallery.appendChild(nextBtn);

        // Store the current image index and images array in the gallery for navigation
        gallery.dataset.currentIndex = 0;
        gallery.dataset.images = JSON.stringify(listings[houseId].images);
        gallery.dataset.captions = JSON.stringify(listings[houseId].captions);
        gallery.dataset.title = listings[houseId].title;

        // Set the text for each section, including the new details
        bookingConfirmation.textContent = listings[houseId].bookingConfirmation;
        checkinDay.textContent = listings[houseId].checkinDay;
        houseRules.textContent = listings[houseId].houseRules;
        propertyAccess.textContent = listings[houseId].propertyAccess;

        // Add the description, location, and CITQ number to the modal
        const description = document.createElement("p");
        description.classList.add("house-description");
        description.textContent = listings[houseId].description;

        const location = document.createElement("p");
        location.classList.add("hous-location");
        location.textContent = listings[houseId].location;

        const citq = document.createElement("p");
        citq.classList.add("house-citq");
        citq.textContent = listings[houseId].citq;

        // Insert the new details just below the house title
        houseTitle.insertAdjacentElement("afterend", description);
        description.insertAdjacentElement("afterend", location);
        location.insertAdjacentElement("afterend", citq);

        // Show the modal with a transition
        details.classList.remove("hidden");
        details.classList.add("visible");
    }
}

function changeImage(houseId, direction) {
    const gallery = document.querySelector(".gallery");
    const currentImage = document.getElementById("current-image");
    const currentCaption = document.getElementById("current-caption");
    let currentIndex = parseInt(gallery.dataset.currentIndex);
    const images = JSON.parse(gallery.dataset.images);
    const captions = JSON.parse(gallery.dataset.captions);
    const title = gallery.dataset.title;

    currentIndex += direction;

    // Loop around if at the start or end
    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    // Update the image and caption
    currentImage.src = images[currentIndex];
    currentImage.alt = title + " - Image " + (currentIndex + 1);
    currentCaption.textContent = captions[currentIndex];
    gallery.dataset.currentIndex = currentIndex;
}

function closeDetails() {
    const details = document.getElementById("details");
    details.classList.remove("visible");
    details.classList.add("hidden");

    // Remove the dynamically added description, location, and CITQ elements
    const description = document.querySelector(".house-description");
    const location = document.querySelector(".house-location");
    const citq = document.querySelector(".house-citq");
    if (description) description.remove();
    if (location) location.remove();
    if (citq) citq.remove();
}

function openFullscreen(houseId, index) {
    console.log(`Opening fullscreen for ${houseId} at index ${index}`);
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
