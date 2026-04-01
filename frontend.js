//Contact Form
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const firstName = document.querySelector('input[name="fname"]').value;
    const lastName = document.querySelector('input[name="lname"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    if (!firstName || !lastName || !message) {
        alert("Please fill all fields");
        return;
    }

    const response = await fetch("/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName,
            lastName,
            message
        })
    });

    const data = await response.json();
    alert(data.message);

    this.reset();
});

//Search and Filtering:

function goToPage() {
    const input = document.getElementById("searchBox").value.toLowerCase().trim();
 
    // Don't search if the box is empty
    if (!input) return;
 
    // Map keywords → pages
    if (input.includes("home")) {
        window.location.href = "index.html";
    }
    else if (input.includes("about")) {
        window.location.href = "About.html";
    }
    else if (input.includes("schedule") || input.includes("class") || input.includes("timetable")|| input.includes("courses")|| input.includes("cst")+) {
        window.location.href = "schedule.html";
    }
    else if (input.includes("contact") || input.includes("email") || input.includes("help")) {
        window.location.href = "Contact.html";
    }
    else if (input.includes("resource") || input.includes("map") || input.includes("link")) {
        window.location.href = "Resources.html";
    }
    else if (input.includes("algonquin")) {
        window.location.href = "index.html#home";
    }
    else {
        // Friendlier than an alert — shows a message on the page instead
        const errorMsg = document.getElementById("searchError");
        if (errorMsg) errorMsg.style.display = "block";
    }
}
 