window.onload = function() {

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

document.getElementById("addBtn").onclick = () => {

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

};


// EDIT ITEM

document.getElementById("editBtn").onclick = () => {

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

};


// DELETE ITEM

document.getElementById("deleteBtn").onclick = () => {

if (!selectedCell) {

alert("Select a cell!");

return;

}


selectedCell.innerText = "";

};

/* Login system */

//Register
document.getElementById("registerForm")?.addEventListener("submit", function(e){
    e.preventDefault();


    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value.trim();

    if(email == "" || username == "" || password == ""){
        alert("All fields required");
        return;
    }

    if(!email.includes("@")){
        alert("Invalid email");
        return;
    }

    if(localStorage.getItem(username)){
        alert("Username already exists");
        return;
    }

    const userData = {
        email: email,
        password: password
    };

    localStorage.setItem(username, JSON.stringify(userData));
    alert("Registered")
});

//Login
document.getElementById("loginForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const stored = localStorage.getItem(username);

    if(!stored){
        alert("User not found");
        return;
    }

    const userData = JSON.parse(stored);

    if(userData.password == password){
        localStorage.setItem("loggedInUser", username);
        alert("Login was successful");
        window.location.href = "index.html";
    } else {
        alert("Wrong password");
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

};

function logout(){
    localStorage.removeItem("loggedInUser");
    location.reload();
}
