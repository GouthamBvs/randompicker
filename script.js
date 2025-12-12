let totalNumbers = 17;

let assigned = JSON.parse(localStorage.getItem("assigned") || "[]");
let usedEmails = JSON.parse(localStorage.getItem("usedEmails") || "[]");
let tracking = JSON.parse(localStorage.getItem("tracking") || "[]");

const adminEmail = "admin@accenture.com"; // YOUR ADMIN LOGIN


// SAVE DATA
function saveData() {
    localStorage.setItem("assigned", JSON.stringify(assigned));
    localStorage.setItem("usedEmails", JSON.stringify(usedEmails));
    localStorage.setItem("tracking", JSON.stringify(tracking));
}


// USER + ADMIN LOGIN PROCESS
function processLogin() {

    let email = document.getElementById("email").value.trim().toLowerCase();

    // Admin Login
    if (email === adminEmail) {
        showAdminPanel();
        return;
    }

    // Validate user email
    if (!email.endsWith("@accenture.com")) {
        alert("❌ Only @accenture.com emails allowed!");
        return;
    }

    // Already logged user
    if (usedEmails.includes(email)) {
        let old = tracking.find(t => t.email === email);
        alert("You already received your number: " + old.number);
        return;
    }

    // Assign unique number
    let number;
    do {
        number = Math.floor(Math.random() * totalNumbers) + 1;
    } while (assigned.includes(number));

    assigned.push(number);
    usedEmails.push(email);
    tracking.push({ email, number });
    saveData();

    alert("🎁 Your Secret Santa number is: " + number);

    document.getElementById("loginDiv").innerHTML =
        "<h3>Your number is assigned!</h3>";
}


// ADMIN PANEL LOADING
function showAdminPanel() {
    document.getElementById("loginDiv").classList.add("hidden");
    document.getElementById("adminDiv").classList.remove("hidden");

    let table = document.getElementById("dataTable");

    table.innerHTML = "<tr><th>Email</th><th>Number</th></tr>";

    tracking.forEach(row => {
        table.innerHTML += `<tr><td>${row.email}</td><td>${row.number}</td></tr>`;
    });
}


// RESET BUTTON
function resetAll() {
    if (!confirm("Do you really want to RESET all data?")) return;

    localStorage.removeItem("assigned");
    localStorage.removeItem("usedEmails");
    localStorage.removeItem("tracking");

    assigned = [];
    usedEmails = [];
    tracking = [];

    alert("All Data Reset Successful!");

    // Reload admin table
    showAdminPanel();
}
