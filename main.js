document.addEventListener("DOMContentLoaded", function() {

/* Schedule */

let selectedCell = null;


// Select a cell when clicked

document.querySelectorAll("td").forEach(cell => {

cell.addEventListener("click", () => {

// Ignore time column

if (cell.cellIndex === 0) return;


if (selectedCell) {

selectedCell.style.background = "";

}


selectedCell = cell;

cell.style.background = "#d0e7ff";

});

});


// ADD ITEM

document.getElementById("addBtn")?.addEventListener("click", () => {

if (!selectedCell) {

alert("Select a cell first!");

return;

}


let text = prompt("Enter schedule item:");


if (!text || text.trim() === "") {

this.alert("Invalid input!");

return;

}

selectedCell.innerText = text.trim();

});


// EDIT ITEM

document.getElementById("editBtn")?.addEventListener("click", () => {

if (!selectedCell || selectedCell.innerText === "") {

alert("Select a filled cell!");

return;

}


let text = prompt("Edit item:", selectedCell.innerText);

if (text == null) {

return;

}

if(text.trim() === ""){

this.alert("Cannot be empty!");

return;

}

selectedCell.innerText = text.trim();

});


// DELETE ITEM

document.getElementById("deleteBtn")?.addEventListener("click", () => {

if (!selectedCell) {

alert("Select a cell!");

return;

}


selectedCell.innerText = "";

});

/* Login system */

//Register
document.getElementById("registerForm")?.addEventListener("submit", async function (e){
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    if (!email || !username || !password) {
        return alert("All fields required")
    }

    const res = await fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, username, password})
    });

    const data = await res.json();
    alert(data.message);
});

//Login
document.getElementById("loginForm")?.addEventListener("submit", async function(e){
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const res = await fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password})
    });

    const data = await res.json();

    if (data.success){
        localStorage.setItem("loggedInUser", username);
        alert("Login Successful");
        window.location.href = "/";
    } else {
        alert(data.message);
    }
});

// navbar logged in user display
const navUser = document.getElementById("navUser");
const loggedUser = localStorage.getItem("loggedInUser");

if(navUser && loggedUser){
    navUser.innerHTML = `
            <span style="color:white; margin-right:10px;">Welcome, ${loggedUser}</span>
            <button onclick="logout()" class="login-button">logout</button>
            `;
}

});

function logout(){
    localStorage.removeItem("loggedInUser");
    location.reload();
}
