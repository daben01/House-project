function showDetails(houseId) {
    const details = document.getElementById("details");
    const houseTitle = document.getElementById("house-title");
    const gallery = document.querySelector(".gallery");
    const houseRules = document.getElementById("house-rules");
    const checkinInfo = document.getElementById("checkin-info");

    const listings = {
        "chateau-plateau": {
            title: "Heart of downtown Montreal + parking",
            images: [
                "images/chateau-plateau.jpg",
                "images/chateau-plateau-living.jpg",
                "images/chateau-plateau-kitchen.jpg"
            ],
            rules: "No smoking, no pets, quiet hours after 10 PM.",
            checkin: "Check-in: 3 PM | Check-out: 11 AM"
        },
        "paris-house": {
            title: "Step away from downtown Bell Center CITQ#297014",
            images: [
                "images/paris-house.jpg",
                "images/paris-house-bedroom.jpg",
                "images/paris-house-dining.jpg"
            ],
            rules: "No parties, no loud music, maximum 4 guests.",
            checkin: "Check-in: 4 PM | Check-out: 10 AM"
        },
        "chateau-milton": {
            title: "Victorian house, heart of downtown CITQ#301085",
            images: [
                "images/chateau-milton.jpg",
                "images/chateau-milton-exterior.jpg",
                "images/chateau-milton-bathroom.jpg"
            ],
            rules: "No pets, no outside visitors after 8 PM.",
            checkin: "Check-in: 2 PM | Check-out: 12 PM"
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

        houseRules.textContent = listings[houseId].rules;
        checkinInfo.textContent = listings[houseId].checkin;
    }

    details.style.display = "flex";
}

function closeDetails() {
    document.getElementById("details").style.display = "none";
}
