function showDetails(houseId) {
    const details = document.getElementById("details");
    const houseTitle = document.getElementById("house-title");
    const mainImage = document.getElementById("main-image");
    const houseRules = document.getElementById("house-rules");
    const checkinInfo = document.getElementById("checkin-info");

    const listings = {
        "chateau-plateau": {
            title: "Heart of downtown Montreal+ parking",
            image: "images/chateau-plateau.jpg",
            rules: "No smoking, no pets, quiet hours after 10 PM.",
            checkin: "Check-in: 3 PM | Check-out: 11 AM"
        },
        "paris-house": {
            title: "Step away from downtown Bell Center CITQ#297014",
            image: "images/paris-house.jpg",
            rules: "No parties, no loud music, maximum 4 guests.",
            checkin: "Check-in: 4 PM | Check-out: 10 AM"
        },
        "chateau-milton": {
            title: "Victorian house, heart of downtown CITQ#301085",
            image: "images/chateau-milton.jpg",
            rules: "No pets, no outside visitors after 8 PM.",
            checkin: "Check-in: 2 PM | Check-out: 12 PM"
        }
    };

    if (listings[houseId]) {
        houseTitle.textContent = listings[houseId].title;
        mainImage.src = listings[houseId].image;
        houseRules.textContent = listings[houseId].rules;
        checkinInfo.textContent = listings[houseId].checkin;
    }

    details.style.display = "flex";
}

function closeDetails() {
    document.getElementById("details").style.display = "none";
}
