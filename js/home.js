// Import Firebase Functions to get data and remove if wants
import {
  onValue,
  get,
  child,
  remove
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

// Import functions From Firebase
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// Import Database Reference and Auth From main.js
import { usersRef, auth } from "./main.js";

// Selection of Elements in HTML
let tableBody = document.querySelector(".table-body"),
  search = document.querySelector("input[type=search]");

// id number of the table
let id = 1;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    // Read Data from database and Create table showing it
    onValue(usersRef, (snapshot) => {
      // users is an object of all database data
      const users = snapshot.val();
      tableBody.innerHTML = "";
      // looping in the data object to create extract each user from it
      for (let user in users) {
        // Show data in table
        showData(id, users, user);
        id++;
      }

      // Select all Edit and View Buttons in Table
      let editButtons = document.querySelectorAll(".edit"),
        viewButtons = document.querySelectorAll(".view"),
        delBtns = document.querySelectorAll("#delete-trainee"),
        dels = document.querySelectorAll(".del"); // Delete Btns in Modal

      // Edit user data
      editView(editButtons);
      // View user data
      editView(viewButtons);
      // Delete User
      removeUser(dels, delBtns);

      search.addEventListener("keyup", () => {
        tableBody.innerHTML = "";
        id = 1;
        // looping in the data object to create extract each user from it
        for (let user in users) {
          if (
            users[user].name.includes(search.value) ||
            users[user].phone.includes(search.value)
          ) {
            showData(id, users, user);

            id++;
          }

          // Select all Edit and View Buttons in Table
          let editButtons = document.querySelectorAll(".edit"),
            viewButtons = document.querySelectorAll(".view"),
            delBtns = document.querySelectorAll("#delete-trainee"),
            dels = document.querySelectorAll(".del"); // Delete Btns in Modal

          // Edit user data
          editView(editButtons);
          // View user data
          editView(viewButtons);
          // Delete User
          removeUser(dels, delBtns);
        }
      });
    });
  } else {
    // User Is Log Out
    window.location.href = "index.html";
  }
});

// Function to create the table and show data in the
function showData(id, users, user) {
  let tr = `
          <tr data-id = ${user}>
            <th scope="row" class = "idNumber">${id}</th>
              <td>${users[user].name}</td>
              <td>${users[user].phone}</td>
              <td>${users[user].gender}</td>
              <td>${users[user].age}</td>
              <td data-idnum = ${id}>
                <a
                  href="view.html"
                  class="btn btn-primary text-bg-primary me-1 rounded-3 actions view"
                  >View</a
                >
                <a
                href="edit.html"
                  class="btn btn-success text-bg-success me-1 rounded-3 actions edit"
                  >Edit</a
                >
                <button
                class="btn btn-danger rounded-3 del "
                id="del"
                data-bs-toggle="modal"
                data-bs-target="#modal"
              >
                Delete
              </button>
              <div class="modal-container">
                <div
                  class="modal fade"
                  id="modal"
                  tabindex="-1"
                  
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content bg-dark text-bg-dark">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" >
                          Delete Trainee
                        </h1>
                        <button
                          type="button"
                          class="btn-close bg-light"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        Are You Sure You Want To Delete This Trainee?
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Close
                        </button>
                        <button
                          type="button"
                          class="btn btn-danger"
                          id="delete-trainee"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </td>
          </tr>
`;
  tableBody.innerHTML += tr;
}

// Function To Edit Or View The User Details
function editView(param) {
  param.forEach((el) => {
    el.addEventListener("click", () => {
      // id of the user clicked on the table
      let userIdAttr = el.parentElement.parentElement.dataset.id;
      // id number from the table
      let idNumb = el.parentElement.dataset.idnum;

      // Get function to the user clicked details from its id number to edit or view it
      get(child(usersRef, userIdAttr)).then((snapshot) => {
        // object of user information
        let userDetails = snapshot.val();
        // Save user information in local storage to use them in edit or view page
        localStorage.setItem("userId", userIdAttr);
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        localStorage.setItem("idNumber", idNumb);
      });
    });
  });
}

// Function To Delete user from table and database
function removeUser(dels, delBtns) {
  dels.forEach((dele) => {
    dele.addEventListener("click", () => {
      let userIdAtt = dele.parentElement.parentElement.dataset.id;
      delBtns.forEach((del) => {
        del.addEventListener("click", () => {
          // Remove Function to delete user from database
          remove(child(usersRef, userIdAtt))
            .then((result) => {
              // Reload page to read the new data
              window.location.reload();
            })
            .catch((err) => {
              console.log("Error");
            });
        });
      });
    });
  });
}
