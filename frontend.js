const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(__dirname, "WebsiteAssignment02"));

app.post("/submit", (req,res) =>{
    const newEntry = req.body;

    // Read existing data
    let data = JSON.parse(fs.readFileSync("data.json"));

    // Add new entry
    data.push(newEntry);

    // Save back to file
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

    res.json({ message: "Data saved successfully!" });
});

//To start the server
app.listen(PORT, () =>{
    console.log('Server running on http://localhost:${PORT}');    
})
