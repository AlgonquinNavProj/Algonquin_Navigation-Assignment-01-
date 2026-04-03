console.log("APP IS STARTING...");
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// =====================
// MIDDLEWARE
// =====================

// Static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Parse form data
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

// Login
app.get("/login", (req, res) => {
    res.render("login");
});

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