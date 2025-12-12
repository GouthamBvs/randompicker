let totalNumbers = 17;
let assignedNumbers = JSON.parse(localStorage.getItem("assigned") || "[]");
let usedEmails = JSON.parse(localStorage.getItem("emails") || "[]");

function saveData() {
    localStorage.setItem("assigned", JSON.stringify(assignedNumbers));
    localStorage.setItem("emails", JSON.stringify(usedEmails));
}

function loginAndPick() {

    let email = document.getElementById("email").value.trim().toLowerCase();

    // Validate email
    if (!email.endsWith("@accenture.com")) {
        alert("❌ Only @accenture.com emails are allowed!");
        return;
    }

    // Check repeated attempt
    if (usedEmails.includes(email)) {
        alert("❌ You have already picked your Secret Santa number!");
        return;
    }

    // Pick unique number
    if (assignedNumbers.length >= totalNumbers) {
        alert("All numbers have already been assigned.");
        return;
    }

    let number;
    do {
        number = Math.floor(Math.random() * totalNumbers) + 1;
    } while (assignedNumbers.includes(number));

    // Save
    usedEmails.push(email);
    assignedNumbers.push(number);
    saveData();

    // Show result
    alert("🎁 Your Secret Santa number is: " + number);

    document.getElementById("loginDiv").innerHTML =
        "<h3>Thank you! Your number is assigned.</h3>";
}
