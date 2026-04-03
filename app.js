require("dotenv").config();
console.log("APP IS STARTING...");
const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const app = express();
const PORT = 3000;

// =====================
// User Model
// =====================
const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: String
});

const User = mongoose.model("User", userSchema)


// =====================
// VIEW ENGINE (PUG)
// =====================

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// =====================
// ROUTES
// =====================

// Home
app.get("/", (req, res) => {
    res.render("index");
});

// About
app.get("/about", (req, res) => {
    res.render("about");
});

// Contact
app.get("/contact", (req, res) => {
    res.render("contact");
});

// Schedule
app.get("/schedule", (req, res) => {
    res.render("schedule");
});

// Resources
app.get("/resources", (req, res) => {
    res.render("resources");
});

// Register
app.get("/register", async (req, res) => {
    const { email, username, password} = req.body;

    if (!email || !username || !password) {
        return res.json({ message: "All Fields Required"});
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.json({ message: "User already exists" });
    }

    const newUser = new User({ email, username, password });
    await newUser.save();

    res.json({ message: "Registered successfully" });
});

// Login
app.get("/login", async (req, res) => {
    const user = await User.findOne({ username });

    if (!user) {
        return res.json({ success: false, message: "User not found"});
    }

    if (user.password !== password) {
        return res.json({ success: false, message: "Wrong password"});
    }

    res.json({success: true });

});

// =====================
// FORM  
// =====================

app.post("/contact", (req, res) => {
    console.log(req.body);
    res.send("Form submitted successfully!");
});

// =====================
// SERVER
// =====================

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// =====================
// Database
// =====================

const dbURI = process.env.MONGO_URI;

if (!dbURI) {
    console.error("ERROR: MONGO_URI is not defined in the .env file.");
    process.exit(1); // Stop the app if there's no DB connection string
}

mongoose.connect(dbURI)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));