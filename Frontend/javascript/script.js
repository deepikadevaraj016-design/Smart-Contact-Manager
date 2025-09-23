const API_BASE_URL = "https://smart-contact-manager-5qqw.onrender.com/api/contact";
const token = localStorage.getItem("token");

const contactModal = document.getElementById("contactModal");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const typeInput = document.getElementById("type");
const notesInput = document.getElementById("notes");
const contactsContainer = document.getElementById("contacts-container");
const openFormBtn = document.getElementById("openContactForm"); // Make sure this exists in HTML

let editingContactId = null;

function opencontactform() {
  contactModal.style.display = "block";
  clearForm();
  editingContactId = null;
}

function closecontactform() {
  contactModal.style.display = "none";
}

function saveContact() {
  const contact = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    type: typeInput.value,
    notes: notesInput.value,
  };

  if (editingContactId) {
    updateContact(editingContactId, contact);
  } else {
    createContact(contact);
  }

  closecontactform();
}

window.addEventListener("DOMContentLoaded", loadContacts);

async function loadContacts() {
  try {
    const res = await fetch(API_BASE_URL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text);
    }

    const data = await res.json();
    renderContacts(data);
  } catch (err) {
    console.error("Error loading contacts:", err);
    alert("Error loading contacts: " + err.message);
  }
}

async function createContact(contact) {
  try {
    const res = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contact),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to create contact");

    loadContacts();
  } catch (err) {
    console.error("Error creating contact:", err);
    alert("Error: " + err.message);
  }
}

async function updateContact(id, contact) {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(contact),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to update contact");

    loadContacts();
  } catch (err) {
    console.error("Error updating contact:", err);
    alert("Error: " + err.message);
  }
}

async function deleteContact(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.msg || "Failed to delete contact");

    loadContacts();
  } catch (err) {
    console.error("Error deleting contact:", err);
    alert("Error: " + err.message);
  }
}

function renderContacts(contacts) {
  contactsContainer.innerHTML = `
    <div class="contact-list">
      ${contacts
        .map(
          (c) => `
        <div class="contact-card">
          <h3>${c.name}</h3>
          <p>Email: ${c.email}</p>
          <p>Phone: ${c.phone}</p>
          <p>Type: ${c.type}</p>
          <p>Notes: ${c.notes}</p>
          <button onclick="editContact('${c._id}', '${c.name}', '${c.email}', '${c.phone}', '${c.type}', \`${c.notes}\`)">Edit</button>
          <button onclick="deleteContact('${c._id}')">Delete</button>
        </div>
      `
        )
        .join("")}
    </div>
  `;
}

function editContact(id, name, email, phone, type, notes) {
  editingContactId = id;
  nameInput.value = name;
  emailInput.value = email;
  phoneInput.value = phone;
  typeInput.value = type;
  notesInput.value = notes;
  contactModal.style.display = "block"; 
}

function clearForm() {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
  typeInput.value = "Work";
  notesInput.value = "";
}


document.getElementById("openContactForm").addEventListener("click", opencontactform);
