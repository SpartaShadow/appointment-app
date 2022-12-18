const form = document.querySelector("#my-form");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#number");

const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

let edit = [false, ""];
// Adding existing data from local Storage
window.addEventListener("DOMContentLoaded", retrieveFromDatabase);

/*
 * --- Event Listeners ---
 */

// Submit Event
form.addEventListener("submit", onSubmit);

// Delete Item Event
userList.addEventListener("click", deleteItem);

// Edit Item Event
userList.addEventListener("click", editItem);

function onSubmit(e) {
  e.preventDefault();

  if (
    nameInput.value === "" ||
    emailInput.value === "" ||
    phoneInput.value === ""
  ) {
    errorMsgEmptyField();
  } else if (edit[0]) {
    // Editing Existing data in crud crud
    editToCrudCrud(edit[1]);

    // Clearing the fields
    clearFields();
  } else {
    // Storing to local Storage and creating new Node
    storeToDatabase();

    // Clearing the fields
    clearFields();
  }
}

/*
 * --- Stroring, Retrieving and Editing Data ---
 */

function storeToDatabase() {
  // Making the user object
  let userDetails = {
    name: nameInput.value,
    email: emailInput.value,
    phoneNumber: phoneInput.value,
  };

  // Sending Data to crud crud
  axios
    .post("http://localhost:4000/users/add-user", userDetails)
    .then((response) => {
      createNode(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function editToCrudCrud(url) {
  // Making the user object
  let userDetails = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
  };

  // Making edit false for next user
  edit = [false, ""];

  axios
    .put(url, userDetails)
    .then((response) => {
      axios
        .get(url)
        .then((response) => createNode(response.data))
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      console.log(err);
    });
}

function retrieveFromDatabase() {
  axios
    .get("http://localhost:4000/users/get-users")
    .then((response) => {
      response.data.forEach((data) => {
        createNode(data);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

/*
 * --- Create Functions ---
 */

function createNode(data) {
  const li = document.createElement("li");

  console.log(data.id);
  li.id = data.id;
  console.log(data.phoneNumber);
  // Creating edit and delete buttons
  var editButton = createEditButton();
  var deleteButton = createDeleteButton();

  // Creating Node with user details
  li.appendChild(
    document.createTextNode(
      `• ${data.name} : ${data.email} : ${data.phoneNumber}`
    )
  );

  li.appendChild(deleteButton);
  li.appendChild(editButton);

  // Appending to ul
  userList.appendChild(li);
}

function createDeleteButton() {
  // Delete button
  var deleteButton = document.createElement("button");

  // Adding Classes to Delete Button
  deleteButton.className = "delete";

  // Adding X to the button
  deleteButton.appendChild(document.createTextNode("X"));

  return deleteButton;
}

function createEditButton() {
  // Edit Button
  var editButton = document.createElement("button");

  // Adding Class to Edit Button
  editButton.className = "EditButton";

  //Adding Edit text to the button
  editButton.appendChild(document.createTextNode("Edit"));

  return editButton;
}

/*
 * --- Edit, Delete functions ---
 */

function deleteItem(e) {
  e.preventDefault();

  if (e.target.classList.contains("delete")) {
    let li = e.target.parentElement;
    let url = "http://localhost:4000/users/delete-user/" + li.id;

    axios
      .post(url)
      .then((response) => {
        userList.removeChild(li);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function editItem(e) {
  e.preventDefault();

  if (e.target.classList.contains("EditButton")) {
    let li = e.target.parentElement;
    let url = "http://localhost:4000/users/get-users/" + li.id;

    // Getting the value from crud crud first
    axios
      .get(url)
      .then((response) => {
        nameInput.value = response.data.name;
        emailInput.value = response.data.email;
        phoneInput.value = response.data.phone;
      })
      .catch((err) => {
        console.log(err);
      });

    // Chaning input values to the userDetails
    edit = [true, url];

    // Deleting the item
    userList.removeChild(li);
  }
}

/*
 * --- Miscellenous Functions ---
 */

function errorMsgEmptyField() {
  msg.classList.add("error");

  msg.innerHTML = "Please Enter All The Fields";

  // Removing Error Message
  setTimeout(() => msg.remove(), 3000);
}

function clearFields() {
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value = "";
}
