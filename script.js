let editId = null;
let loggedUser = null;

const $ = id => document.getElementById(id);

function getData() {
  return JSON.parse(localStorage.getItem("santa") || "[]");
}
function setData(d) {
  localStorage.setItem("santa", JSON.stringify(d));
}

/* LOGIN */
function login() {
  const email = $("loginEmail").value.trim().toLowerCase();
  if (!email) return alert("Enter email");

  if (email === "admin@accenture.com") {
    $("loginCard").classList.add("hidden");
    $("adminCard").classList.remove("hidden");
    render();
    return;
  }

  const user = getData().find(x => x.accentureEmail === email);
  if (!user) return alert("Not registered");

  loggedUser = user;
  $("loginCard").classList.add("hidden");
  $("userCard").classList.remove("hidden");
  $("userAssigned").innerText = user.assignedTo || "Not Assigned";
}

/* USER DETAILS */
function showMainDetails() {
  $("paidMsg").innerHTML = "";

  if (!loggedUser.assignedTo) {
    $("mainDetails").innerHTML = "<p>No assignment yet</p>";
    return;
  }

  const p = getData().find(x => x.id === loggedUser.assignedTo);
  if (!p) return;

  $("mainDetails").innerHTML = `
    <p><b>Name:</b> ${p.name}</p>
    <p><b>Email:</b> ${p.accentureEmail}</p>
    <p><b>Office:</b> ${p.location}</p>
    <p><b>Gift:</b> ${p.category}</p>
    <p><b>Preference:</b> ${p.preference}</p>
    <p><b>Mode:</b> ${p.mode}</p>
  `;
}

function showPaidMessage() {
  const d = getData();
  const u = d.find(x => x.id === loggedUser.id);
  u.paidClick = true;
  setData(d);

  const p = d.find(x => x.id === loggedUser.assignedTo);
  $("paidMsg").innerHTML = `
  
    Wellcome to the curiosity board!!! 🤣🤣 I know you will come😅.... so to see the others DETAILS 💰 Pay 100 Rs ( Fully Commercial!!! with help of this i'll buy a gift to my assigned person😁😁)... sorry to say your already catched!!!😁😛<br>
  `;
  renderPaid();
}

/* ADMIN SAVE */
function save() {
  const d = getData();
  const name = $("name").value.trim();
  const accEmail = $("accentureEmail").value.trim().toLowerCase();

  if (!name || !accEmail)
    return alert("Name & Accenture email required");

  if (editId === null) {
    d.push({
      id: d.length + 1,
      name,
      personalEmail: $("personalEmail").value,
      accentureEmail: accEmail,
      location: $("location").value,
      category: $("category").value,
      preference: $("preference").value,
      mode: $("mode").value,
      assignedTo: $("manualAssign").value ? Number($("manualAssign").value) : "",
      extra: $("extra").value,
      address: $("address").value,
      paidClick: false
    });
  } else {
    const p = d.find(x => x.id === editId);
    p.name = name;
    p.personalEmail = $("personalEmail").value;
    p.accentureEmail = accEmail;
    p.location = $("location").value;
    p.category = $("category").value;
    p.preference = $("preference").value;
    p.mode = $("mode").value;
    if ($("manualAssign").value) p.assignedTo = Number($("manualAssign").value);
    p.extra = $("extra").value;
    p.address = $("address").value;
  }

  setData(d);
  clearForm();
  render();
}

/* AUTO ASSIGN */
function assignSanta() {
  let d = getData();
  if (d.length < 2) {
    alert("At least 2 participants required");
    return;
  }

  let ids = d.map(p => p.id);
  let assigned = [];

  // keep shuffling until no one gets themselves
  do {
    assigned = [...ids].sort(() => Math.random() - 0.5);
  } while (assigned.some((id, i) => id === ids[i]));

  d.forEach((p, i) => {
    p.assignedTo = assigned[i] || "";
  });

  setData(d);
  render();
}


/* RENDER */
function render() {
  $("list").innerHTML = "";
  getData().forEach(p => {
    $("list").innerHTML += `
      <tr>
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.accentureEmail}</td>
        <td>${p.assignedTo || "Blank"}</td>
        <td><button onclick="edit(${p.id})">Edit</button></td>
        <td><button onclick="del(${p.id})">Delete</button></td>
      </tr>`;
  });
  renderPaid();
}

function renderPaid() {
  $("paidList").innerHTML = "";
  getData().filter(x => x.paidClick).forEach(p => {
    $("paidList").innerHTML += `<tr><td>${p.accentureEmail}</td></tr>`;
  });
}

/* EDIT */
function edit(id) {
  const p = getData().find(x => x.id === id);
  editId = id;

  $("pid").value = p.id;
  $("name").value = p.name;
  $("personalEmail").value = p.personalEmail;
  $("accentureEmail").value = p.accentureEmail;
  $("location").value = p.location;
  $("category").value = p.category;
  $("preference").value = p.preference;
  $("mode").value = p.mode;
  $("manualAssign").value = p.assignedTo;
  $("extra").value = p.extra;
  $("address").value = p.address;
}

/* DELETE */
function del(id) {
  let d = getData().filter(x => x.id !== id);
  d.forEach((x, i) => x.id = i + 1);
  setData(d);
  render();
}

/* RESET */
function resetAll() {
  if (confirm("Reset all data?")) {
    localStorage.clear();
    location.reload();
  }
}

function clearForm() {
  editId = null;
  ["pid","name","personalEmail","accentureEmail","location",
   "category","preference","mode","manualAssign","extra","address"]
   .forEach(i => $(i).value = "");
}
