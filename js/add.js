// Import the functions you need from the SDKs you need
import {
  set,
  child,
  push
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

// Import Database Reference From main.js
import { usersRef } from "./main.js";

// Select alert div
let alertDiv = document.querySelector(".alert");

// Select form inputs
export const name = document.querySelector("#name"),
  phone = document.querySelector("#phone"),
  age = document.querySelector("#age"),
  address = document.querySelector("#address"),
  gender = document.querySelector("#gender"),
  plan = document.querySelector("#plan");

// Add user to database when submit form
document.addEventListener("DOMContentLoaded", function () {
  const submit = document.querySelector("#submit");
  // Your code here
  submit.addEventListener("click", (e) => {
    e.preventDefault();

    // the Start Time of THe Trainee by milliseconds
    let startTime = Date.now();

    if (
      validatePhone() &&
      validateName() &&
      validateAge() &&
      validateAddress() &&
      validateGender() &&
      validatePlan()
      ) {
      // Write data to database
      writeUserData(name, phone, age, address, gender, plan, startTime);
    } else {
      validatePhone();
      validateName();
      validateAge();
      validateAddress();
      validateGender();
      validatePlan();
    }

    // let diffTime = Math.abs(endDate - startDate);
    // let duration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  });
});

// Write data to database
function writeUserData(name, phone, age, address, gender, plan, startTime) {
  // Create a random id for each user
  let userId = push(usersRef).key;

  // Set function to add object of information of every user to database
  set(child(usersRef, userId), {
    name: name.value,
    phone: phone.value,
    age: age.value,
    address: address.value,
    gender: gender.value,
    plan: plan.value,
    startTime: startTime,
    createTime: startTime,
    duration: ""
  })
    .then((result) => {
      alertDiv.style.display = "block";
      setTimeout(() => {
        alertDiv.style.display = "none";
        name.value = "";
        phone.value = "";
        age.value = "";
        address.value = "";
        name.style.boxShadow = "none";
        age.style.boxShadow = "none";
        phone.style.boxShadow = "none";
        address.style.boxShadow = "none";
        gender.style.boxShadow = "none";
        plan.style.boxShadow = "none";
      }, 1500);
    })
    .catch((err) => {
      console.log("Error");
    });
}

// Validation Form
function validateName() {
  if (name.value != "" && name.value.length < 70) {
    name.style.boxShadow = "0 0 8px green";
    return true;
  } else {
    name.style.boxShadow = "0 0 8px red";
    return false;
  }
}
function validatePhone() {
  const phoneNumberRegex = /^01\d{9}$/;
  if (phoneNumberRegex.test(phone.value)) {
    phone.style.boxShadow = "0 0 8px 1px green";
    return true;
  } else {
    phone.style.boxShadow = "0 0 8px 1px red";
    return false;
  }
}

function validateAge() {
  if (age.value != "" && age.value < 70) {
    age.style.boxShadow = "0 0 8px 1px green";
    return true;
  } else {
    age.style.boxShadow = "0 0 8px 1px red";
    return false;
  }
}

function validateAddress() {
  if (address.value != "" && address.value.length < 150) {
    address.style.boxShadow = "0 0 5px 1px green";
    return true;
  } else {
    address.style.boxShadow = "0 0 5px 1px red";
    return false;
  }
}

function validateGender() {
  if (gender.value != "choose") {
    gender.style.boxShadow = "0 0 5px 1px green";
    return true;
  } else {
    gender.style.boxShadow = "0 0 5px 1px red";
    return false;
  }
}

function validatePlan() {
  if (
    plan.value == "Month" ||
    plan.value == "3 Months" ||
    plan.value == "6 Months" ||
    plan.value == "Year" ||
    plan.value == "Day"
  ) {
    plan.style.boxShadow = "0 0 5px 1px green";
    return true;
  } else {
    plan.style.boxShadow = "0 0 5px 1px red";
    return false;
  }
}

export {
  validateName,
  validatePhone,
  validateAge,
  validateAddress,
  validateGender,
  validatePlan
};
