// Disable right-click and some DevTools shortcuts
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("keydown", e => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J"))) {
        e.preventDefault();
    }
});

// Decode Base64 function
function d(s) { return atob(s); }

// DOMContentLoaded for safety
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("guestName")) {
        const l = document.getElementById("landing-view"), h = document.getElementById("home-view");
        if (l && h) { l.classList.add("hidden"); h.classList.remove("hidden"); setTimeout(() => h.classList.add("visible"), 10); }
    }
});

function validateName() {
    const n = document.getElementById("guest-name"), l = document.getElementById("landing-view"), 
          h = document.getElementById("home-view"), e = document.getElementById("error-message");
    if (!n || !l || !h || !e) return console.error("DOM error");
    const v = n.value.trim(), p = v.split(" ").filter(x => x.length > 0);
    if (p.length >= 2 && p.every(x => x.length >= 2)) {
        localStorage.setItem("guestName", v); e.classList.add("hidden"); l.classList.add("hidden"); 
        h.classList.remove("hidden"); setTimeout(() => h.classList.add("visible"), 10);
    } else {
        e.classList.remove("hidden");
    }
}

function showDetails(houseId) {
    const hv = document.getElementById("home-view"), d = document.getElementById("details"), 
          l = document.getElementById("loader"), t = document.getElementById("house-title"), 
          g = document.getElementById("gallery"), bc = document.getElementById("booking-confirmation"), 
          cd = document.getElementById("checkin-day"), hr = document.getElementById("house-rules"), 
          pa = document.getElementById("property-access");
    if (!hv || !d || !l || !t || !g || !bc || !cd || !hr || !pa) return console.error("DOM error");

    const listings = {
        "chateau-plateau": {
            title: "Chateau Plateau",
            images: ["images/chateau-plateau.jpg", "images/chateau-plateau-living.jpg"],
            bookingConfirmation: d("WW91ciBib29raW5nIGZvciBDaGF0ZWF1IFBsYXRlYXUgaXMgY29uZmlybWVkLiBZb3Ugd2lsbCByZWNlaXZlIGEgY29uZmlybWF0aW9uIGVtYWlsIHdpdGggeW91ciByZXNlcnZhdGlvbiBkZXRhaWxzIHNob3J0bHku"),
            checkinDay: d("Q2hlY2staW4gaXMgb24gQXByaWwgMSwgMjAyNSwgYXQgMzowMCBQTS4gUGxlYXNlIGFycml2ZSBvbiB0aW1lIHRvIGVuc3VyZSBhIHNtb290aCBjaGVjay1pbiBwcm9jZXNzLg=="),
            houseRules: d("Tm8gc21va2luZywgbm8gcGV0cywgcXVpZXQgaG91cnMgYWZ0ZXIgMTAgUE0uIFBsZWFzZSByZXNwZWN0IHRoZSBwcm9wZXJ0eSBhbmQgbmVpZ2hib3JzLg=="),
            propertyAccess: d("WW91IHdpbGwgcmVjZWl2ZSBhIGtleSBjb2RlIHZpYSBlbWFpbCAyNCBob3VycyBiZWZvcmUgY2hlY2staW4uIFVzZSB0aGUgY29kZSB0byBhY2Nlc3MgdGhlIGZyb250IGRvb3IgbG9ja2JveC4=")
        },
        "paris-house": {
            title: "Paris House",
            images: ["images/paris-house.jpg", "images/paris-house-bedroom.jpg"],
            bookingConfirmation: d("WW91ciBib29raW5nIGZvciBQYXJpcyBIb3VzZSBpcyBjb25maXJtZWQuIFlvdSB3aWxsIHJlY2VpdmUgYSBjb25maXJtYXRpb24gZW1haWwgd2l0aCB5b3VyIHJlc2VydmF0aW9uIGRldGFpbHMgc2hvcnRseS4="),
            checkinDay: d("Q2hlY2staW4gaXMgb24gQXByaWwgMSwgMjAyNSwgYXQgNDowMCBQTS4gUGxlYXNlIGxldCB1cyBrbm93IGlmIHlvdeKAmWxsIGJlIGFycml2aW5nIGxhdGUu"),
            houseRules: d("Tm8gcGFydGllcywgbm8gbG91ZCBtdXNpYywgbWF4aW11bSA0IGd1ZXN0cy4gS2VlcCB0aGUgcHJvcGVydHkgY2xlYW4gYW5kIHRpZHku"),
            propertyAccess: d("QSBsb2NrYm94IGNvZGUgd2lsbCBiZSBwcm92aWRlZCBvbiB0aGUgZGF5IG9mIGNoZWNrLWluLiBUaGUgbG9ja2JveCBpcyBsb2NhdGVkIGF0IHRoZSBmcm9udCBlbnRyYW5jZS4=")
        },
        "chateau-milton": {
            title: "Chateau Milton",
            images: ["images/chateau-milton.jpg", "images/chateau-milton-exterior.jpg"],
            bookingConfirmation: d("WW91ciBib29raW5nIGZvciBDaGF0ZWF1IE1pbHRvbiBpcyBjb25maXJtZWQuIFlvdSB3aWxsIHJlY2VpdmUgYSBjb25maXJtYXRpb24gZW1haWwgd2l0aCB5b3VyIHJlc2VydmF0aW9uIGRldGFpbHMgc2hvcnRseS4="),
            checkinDay: d("Q2hlY2staW4gaXMgb24gQXByaWwgMSwgMjAyNSwgYXQgMjowMCBQTS4gVGhlIGhvc3Qgd2lsbCBtZWV0IHlvdSBhdCB0aGUgcHJvcGVydHku"),
            houseRules: d("Tm8gcGV0cywgbm8gb3V0c2lkZSB2aXNpdG9ycyBhZnRlciA4IFBNLiBQbGVhc2UgcmVtb3ZlIHNob2VzIGF0IHRoZSBlbnRyYW5jZS4="),
            propertyAccess: d("VGhlIGhvc3Qgd2lsbCBtZWV0IHlvdSBhdCB0aGUgcHJvcGVydHkgdG8gcHJvdmlkZSB0aGUga2V5cyBhbmQgYSBicmllZiB0b3VyLg==")
        }
    };

    if (listings[houseId]) {
        l.classList.remove("hidden"); hv.classList.remove("visible"); hv.classList.add("hidden");
        t.textContent = listings[houseId].title; g.innerHTML = "";
        listings[houseId].images.forEach(src => {
            const c = document.createElement("div"); c.classList.add("image-container");
            const i = document.createElement("img"); i.classList.add("gallery-image"); i.src = src; 
            i.alt = `Image of ${listings[houseId].title}`; 
            i.onerror = () => { i.src = "images/placeholder.jpg"; i.alt = "Image not available"; };
            c.appendChild(i); g.appendChild(c);
        });
        bc.textContent = d(listings[houseId].bookingConfirmation);
        cd.textContent = d(listings[houseId].checkinDay);
        hr.textContent = d(listings[houseId].houseRules);
        pa.textContent = d(listings[houseId].propertyAccess);
        setTimeout(() => { l.classList.add("hidden"); d.classList.remove("hidden"); d.classList.add("visible"); }, 500);
    } else {
        console.error(`No listing: ${houseId}`);
    }
}

function goBack() {
    const hv = document.getElementById("home-view"), d = document.getElementById("details"), l = document.getElementById("loader");
    if (!hv || !d || !l) return console.error("DOM error");
    l.classList.remove("hidden"); d.classList.remove("visible");
    setTimeout(() => {
        d.classList.add("hidden"); hv.classList.remove("hidden");
        setTimeout(() => { l.classList.add("hidden"); hv.classList.add("visible"); }, 10);
    }, 300);
}
