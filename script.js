let totalNumbers = 17;
let assignedNumbers = JSON.parse(localStorage.getItem("assigned") || "[]");
let usedEmails = JSON.parse(localStorage.getItem("emails") || "[]");
let tracking = JSON.parse(localStorage.getItem("tracking") || "[]");

function saveData() {
    localStorage.setItem("assigned", JSON.stringify(assignedNumbers));
    localStorage.setItem("emails", JSON.stringify(usedEmails));
    localStorage.setItem("tracking", JSON.stringify(tracking));
}

function loginAndPick() {

    let email = document.getElementById("email").value.trim().toLowerCase();

    // Validate email domain
    if (!email.endsWith("@accenture.com")) {
        alert("❌ Only @accenture.com emails allowed!");
        return;
    }

    // Stop repeat attempts
    if (usedEmails.includes(email)) {
        alert("❌ You already picked your number!");
        return;
    }

    // Unique number selection
    if (assignedNumbers.length >= totalNumbers) {
        alert("All numbers assigned already.");
        return;
    }

    let number;
    do {
        number = Math.floor(Math.random() * totalNumbers) + 1;
    } while (assignedNumbers.includes(number));

    // Save assignment
    usedEmails.push(email);
    assignedNumbers.push(number);

    tracking.push({ email: email, number: number });

    saveData();

    alert("🎁 Your Secret Santa number is: " + number);

    document.getElementById("loginDiv").innerHTML =
        "<h3>Thank you! Your number is assigned.</h3>";
}
