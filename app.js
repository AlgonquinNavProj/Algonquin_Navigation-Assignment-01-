require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const session = require("express-session");

// Import Models
const Message = require("./models/Contact"); 

const app = express();
const PORT = 3000;

// =====================
// MIDDLEWARE
// =====================
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

// Session MUST come before routes and isAuthenticated
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24-hour persistence
}));

// Global user variable for Pug templates
app.use((req, res, next) => {
    res.locals.isLoggedIn = !!req.session.userId;
    res.locals.username = req.session.username;
    next();
});

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.redirect("/login");
};

// =====================
// User Model (Consider moving this to /models/User.js)
// =====================
const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    password: { type: String, required: true } 
});
const User = mongoose.model("User", userSchema);

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
app.get("/resources", (req, res) => res.render("resources"));

// Protected Route
app.get("/schedule", isAuthenticated, (req, res) => {
    res.render("schedule"); 
});

// Auth Routes
app.get("/register", (req, res) => res.render("register"));

app.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;
        if (!email || !username || !password) return res.send("All fields required.");

        const existingUser = await User.findOne({ username });
        if (existingUser) return res.send("User already exists.");

        // NOTE: You should use bcrypt.hash(password, 10) here!
        const newUser = new User({ email, username, password });
        await newUser.save();

        res.redirect("/login");
    } catch (err) {
        res.status(500).send("Error during registration.");
    }
});

app.get("/login", (req, res) => res.render("login"));

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    // NOTE: Use bcrypt.compare(password, user.password) here!
    if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    req.session.userId = user._id; 
    req.session.username = user.username; 
    res.json({ success: true });
});

app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

app.post("/contact", async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;
        const newMessage = new Message({ firstName, lastName, email, message });
        await newMessage.save();
        res.json({ message: "Message sent! We will get back to you soon." });
    } catch (err) {
        res.status(500).json({ message: "Error saving message." });
    }
});

// =====================
// DATABASE & SERVER START
// =====================
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
    .then(() => {
        console.log("MongoDB connected!");
        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
    })
    .catch((err) => console.error("Failed to connect to MongoDB:", err));