require("dotenv").config();
console.log("APP IS STARTING...");

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// =====================
// DATABASE
// =====================

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("failed to connect:", err));

// =====================
// MIDDLEWARE
// =====================

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// =====================
// VIEW ENGINE (PUG)
// =====================

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// =====================
// ROUTES
// =====================

app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/contact", (req, res) => res.render("contact"));
app.get("/schedule", (req, res) => res.render("schedule"));
app.get("/resources", (req, res) => res.render("resources"));
app.get("/login", (req, res) => res.render("login"));

// =====================
// FORM EXAMPLE (for marks)
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