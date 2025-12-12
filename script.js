let totalNumbers = 17;

function loadData() {
    return JSON.parse(localStorage.getItem("santaData") || "{}");
}

function saveData(data) {
    localStorage.setItem("santaData", JSON.stringify(data));
}

function loginUser() {
    let email = document.getElementById("email").value.trim().toLowerCase();

    if (!email.endsWith("@accenture.com")) {
        document.getElementById("login-message").innerText = "Only Accenture emails allowed!";
        return;
    }

    if (email === "admin@accenture.com") {
        showAdmin();
        return;
    }

    let data = loadData();

    if (data[email]) {
        showUserResult(data[email]);
        return;
    }

    let assigned = assignNumber(data);
    data[email] = assigned;
    saveData(data);
    showUserResult(assigned);
}

function assignNumber(data) {
    let used = Object.values(data);
    let available = [];

    for (let i = 1; i <= totalNumbers; i++) {
        if (!used.includes(i)) available.push(i);
    }

    return available[Math.floor(Math.random() * available.length)];
}

function showUserResult(number) {
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("user-result-container").classList.remove("hidden");
    document.getElementById("user-number").innerText = number;
}

function showAdmin() {
    document.getElementById("login-container").classList.add("hidden");
    document.getElementById("admin-container").classList.remove("hidden");
    loadAdminTable();
}

function loadAdminTable() {
    let data = loadData();
    let table = document.getElementById("admin-table");
    table.innerHTML = "";

    for (let email in data) {
        table.innerHTML += `
            <tr>
                <td>${email}</td>
                <td>${data[email]}</td>
                <td><button class="action-btn" onclick="editEntry('${email}')">Edit</button></td>
                <td><button class="action-btn" onclick="deleteEntry('${email}')">Delete</button></td>
            </tr>
        `;
    }
}

function editEntry(email) {
    let data = loadData();
    let newNumber = prompt("Enter new number:", data[email]);

    if (!newNumber) return;
    newNumber = parseInt(newNumber);

    if (newNumber < 1 || newNumber > totalNumbers) {
        alert("Invalid number!");
        return;
    }

    data[email] = newNumber;
    saveData(data);
    loadAdminTable();
}

function deleteEntry(email) {
    let data = loadData();
    delete data[email];
    saveData(data);
    loadAdminTable();
}

function manualAdd() {
    let email = document.getElementById("manual-email").value.trim().toLowerCase();
    let number = parseInt(document.getElementById("manual-number").value);

    if (!email.endsWith("@accenture.com")) {
        alert("Invalid email!");
        return;
    }

    if (number < 1 || number > totalNumbers) {
        alert("Invalid number!");
        return;
    }

    let data = loadData();
    data[email] = number;
    saveData(data);
    loadAdminTable();
}

function resetAll() {
    if (!confirm("Are you sure you want to reset everything?")) return;
    localStorage.removeItem("santaData");
    loadAdminTable();
}
