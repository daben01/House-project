from flask import Flask, render_template, request, redirect, url_for, session
from cryptography.fernet import Fernet
import base64

app = Flask(__name__)
app.secret_key = "xK9pQzM7nW2vR5tY"  # Secret key for session

# Encryption setup
key = base64.urlsafe_b64encode(b"xK9pQzM7nW2vR5tY1234567890abcdef")
cipher = Fernet(key)

# Encrypted house data
listings = {
    "chateau-plateau": {
        "title": cipher.encrypt(b"Chateau Plateau").decode(),
        "description": cipher.encrypt(b"A luxurious mountain retreat").decode(),
        "images": ["images/chateau-plateau.jpg"]
    }
}

# Decrypt helper
def decrypt_data(encrypted_text):
    return cipher.decrypt(encrypted_text.encode()).decode()

@app.route("/", methods=["GET", "POST"])
def landing():
    if "guest_name" in session:
        return redirect(url_for("home"))
    if request.method == "POST":
        name = request.form.get("guest_name", "").strip()
        parts = [p for p in name.split() if p]
        if len(parts) >= 2 and all(len(p) >= 2 for p in parts):
            session["guest_name"] = name
            return redirect(url_for("home"))
        return render_template("landing.html", error="Please enter a valid full name (at least two parts, 2+ characters each)")
    return render_template("landing.html", error=None)

@app.route("/home")
def home():
    if "guest_name" not in session:
        return redirect(url_for("landing"))
    return render_template("home.html", listings={k: {"title": decrypt_data(v["title"])} for k, v in listings.items()})

@app.route("/details/<house_id>")
def details(house_id):
    if "guest_name" not in session:
        return redirect(url_for("landing"))
    if house_id not in listings:
        return "House not found", 404
    house = listings[house_id]
    decrypted_house = {
        "title": decrypt_data(house["title"]),
        "description": decrypt_data(house["description"]),
        "images": house["images"]
    }
    return render_template("details.html", house=decrypted_house)

if __name__ == "__main__":
    app.run(debug=True)
