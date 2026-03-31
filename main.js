window.onload = function() {
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


};
