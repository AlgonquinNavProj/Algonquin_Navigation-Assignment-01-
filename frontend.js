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
