require("dotenv").config();
console.log("APP IS STARTING...");
const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

const session = require("express-session");

app.use(session({
    secret: 'your_secret_key', 
    resave: false,
    saveUninitialized: false
}));

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



app.get("/register", (req, res) => {
    res.render("register"); // Renders your register.pug
});

app.post("/register", async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.send("All fields are required.");
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.send("User already exists.");
        }

        const newUser = new User({ email, username, password });
        await newUser.save();

        res.redirect("/login"); // Send them to login after success
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during registration.");
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.send("User not found.");
    }

    if (user.password !== password) {
        return res.send("Wrong password.");
    }


    req.session.userId = user._id; 
    res.redirect("/"); 
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
    process.exit(1); 
}

mongoose.connect(dbURI)
    .then(() => console.log("MongoDB connected!"))
    .catch((err) => console.error("Failed to connect to MongoDB:", err));