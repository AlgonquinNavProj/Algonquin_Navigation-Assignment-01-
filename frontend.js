// Adding 'Enter' key support for the search box
document.getElementById("searchBox")?.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        goToPage();
    }
});
//Search and Filtering
function goToPage() {
    const input = document.getElementById("searchBox").value.toLowerCase().trim();
    const errorMsg = document.getElementById("searchError");

    if (!input) return;

    // Reset error message visibility on new search
    if (errorMsg) errorMsg.style.display = "none";

    if (input.includes("home")) {
        window.location.href = "index.html";
    } 
    else if (input.includes("about")) {
        window.location.href = "About.html";
    } 
    else if (["schedule", "class", "timetable", "courses", "cst"].some(keyword => input.includes(keyword))) {
        window.location.href = "schedule.html";
    } 
    else if (["contact", "email", "help"].some(keyword => input.includes(keyword))) {
        window.location.href = "Contact.html";
    } 
    else if (["resource", "map", "link"].some(keyword => input.includes(keyword))) {
        window.location.href = "Resources.html";
    } 
    else if (input.includes("algonquin")) {
        window.location.href = "index.html#home";
    } 
    else {
        if (errorMsg) errorMsg.style.display = "block";
    }
}
//Contact
//Contact
document.getElementById("contactForm")?.addEventListener("submit", async function(event) {
    event.preventDefault();

    const firstName = document.querySelector('input[name="fname"]').value;
    const lastName = document.querySelector('input[name="lname"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    if (!firstName || !lastName || !message) {
        alert("Please fill all fields");
        return;
    }

    try {
        const response = await fetch("/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, message })
        });

        const data = await response.json();
        alert(data.message);
        
        if (response.ok) {
            this.reset(); // Clears the form on success
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong. Please try again.");
    }
});