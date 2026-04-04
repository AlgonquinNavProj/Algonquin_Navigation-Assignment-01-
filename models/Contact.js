// =====================
// Contact Message Model
// =====================
const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true }, 
    message: { type: String, required: true },
    CreatedAt: { type: Date, default: Date.now } 
});

module.exports = mongoose.model("Message", contactSchema);