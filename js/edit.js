// Import Firebase Functions to get data and remove if wants
import {
  update,
  remove,
  child
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

// Import Database Reference From main.js
import { usersRef } from "./main.js";

import {
  name,
  phone,
  age,
  address,
  gender,
  plan,
  validateName,
  validatePhone,
  validateAge,
  validateAddress,
  validateGender,
  validatePlan
} from "./add.js";

// user id from local storage
let uId = localStorage.getItem("userId");

document.addEventListener("DOMContentLoaded", () => {
  // Selection of HTML Elements
  const idContainer = document.querySelector(".user-id span"),
    breadName = document.querySelector("#username"),
    alertDiv = document.querySelector(".alert"),
    modal = document.querySelector(".modal-container"),
    updat = document.querySelector("#update"),
    delet = document.querySelector("#delete"),
    delUser = document.querySelector("#delete-trainee");

  // Check if local storage has data
  if (localStorage.getItem("userId") && localStorage.getItem("userDetails")) {
    idContainer.innerHTML = localStorage.getItem("userId");
    let user = JSON.parse(localStorage.getItem("userDetails"));
    breadName.innerHTML = user.name;
    name.value = user.name;
    phone.value = user.phone;
    age.value = user.age;
    address.value = user.address;
    gender.value = user.gender;
    plan.value = user.plan;
  }

  updat.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      validatePhone() &&
      validateName() &&
      validateAge() &&
      validateAddress() &&
      validateGender() &&
      validatePlan()
    ) {
      // Update the user information
      update(child(usersRef, uId), {
        name: name.value,
        phone: phone.value,
        age: age.value,
        address: address.value,
        gender: gender.value,
        plan: plan.value
      })
        .then((result) => {
          alertDiv.style.display = "block";
          setTimeout(() => {
            alertDiv.style.display = "none";
            window.location.href = "home.html";
          }, 1500);
        })
        .catch((err) => {
          console.log("Error");
        });
    } else {
      validatePhone();
      validateName();
      validateAge();
      validateAddress();
      validateGender();
      validatePlan();
    }
  });

  delet.addEventListener("click", (e) => {
    e.preventDefault();
  });

  delUser.addEventListener("click", (e) => {
    remove(child(usersRef, uId))
      .then((result) => {
        alertDiv.style.display = "block";
        modal.style.display = "none";
        setTimeout(() => {
          alertDiv.style.display = "none";
          window.location.href = "home.html";
        }, 1500);
      })
      .catch((err) => {
        console.log("Error");
      });
  });
});
