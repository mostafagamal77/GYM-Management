// Import Firebase Functions to get data and remove if wants
import {
  update,
  child
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

// Import Database Reference From main.js
import { usersRef } from "./main.js";

// Selection of Elements in HTML
const idContainer = document.querySelector(".user-id span"),
  breadName = document.querySelector("#username"),
  btnsContainer = document.querySelector(".btn-content"),
  tableContainer = document.querySelector("table"),
  alertDiv = document.querySelector(".alert");

// Check if there is data in local storage and get them
if (localStorage.getItem("userId") && localStorage.getItem("userDetails")) {
  // Get data From local storage
  let uId = localStorage.getItem("userId"),
    idNum = localStorage.getItem("idNumber"),
    user = JSON.parse(localStorage.getItem("userDetails"));

  // Nav Content
  idContainer.innerHTML = localStorage.getItem("userId");
  breadName.innerHTML = user.name;

  // The created Time of the user when added to database
  let createTime = new Date(user.createTime),
    createYear = createTime.getFullYear(),
    createMonth = createTime.getMonth() + 1,
    createDay = createTime.getDate(),
    createHour = createTime.getHours(),
    createMinute = createTime.getMinutes(),
    createSeconds = createTime.getSeconds(),
    formattedCreateDate = `${createYear}/${createMonth}/${createDay} ${createHour}:${createMinute}:${createSeconds}`;

  // the day, month, 3 Months , 6 Months and year in milliseconds
  const oneDay = 86400000,
    oneMonth = 2592000000,
    threeMonths = 7776000000,
    sixMonths = 15552000000,
    oneYear = 31536000000;

  // Create Start and End Date Based on the Start time when added the trainee or renew
  let endTime,
    startDate = new Date(user.startTime),
    startYear = startDate.getFullYear(),
    startMonth = startDate.getMonth() + 1,
    startDay = startDate.getDate(),
    startHour = startDate.getHours(),
    startMinute = startDate.getMinutes(),
    startSecond = startDate.getSeconds(),
    formattedStartDate = `${startYear}/${startMonth}/${startDay} ${startHour}:${startMinute}:${startSecond}`;

  // define the end date based on the plan chosen
  switch (user.plan) {
    case "Month":
      endTime = user.startTime + oneMonth;
      break;
    case "3 Months":
      endTime = user.startTime + threeMonths;
      break;
    case "6 Months":
      endTime = user.startTime + sixMonths;
      break;
    case "Year":
      endTime = user.startTime + oneYear;
      break;
    case "Day":
      endTime = user.startTime + oneDay;
      break;
  }

  // Create the Formatted End Date
  let endDate = new Date(endTime),
    endYear = endDate.getFullYear(),
    endMonth = endDate.getMonth() + 1,
    endDay = endDate.getDate(),
    endHour = endDate.getHours(),
    endMinute = endDate.getMinutes(),
    endSecond = endDate.getSeconds(),
    formattedEndDate = `${endYear}/${endMonth}/${endDay} ${endHour}:${endMinute}:${endSecond}`;

  // Create the table content of user details based on the object from local storage
  let tr = `
  <thead>
  <tr>
  <th scope="col">ID Number</th>
  <th class="fw-normal" scope="col">${idNum}</th>
  </tr>
  <tr>
  <th scope="col">Name</th>
  <th class="fw-normal" scope="col">${user.name}</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <th scope="row">Created on</th>
  <td>${formattedCreateDate}</td>
  </tr>
  <tr>
  <th scope="row">Phone</th>
  <td>${user.phone}</td>
  </tr>
  <tr>
                <th scope="row">Age</th>
                <td>${user.age}</td>
              </tr>
              <tr>
              <th scope="row">Address</th>
              <td>${user.address}</td>
              </tr>
              <tr>
              <th scope="row">Gender</th>
              <td>${user.gender}</td>
              </tr>
              <tr>
                <th scope="row">Plan</th>
                <td>${user.plan}</td>
                </tr>
                
                <tr>
                <th scope="row">Start Date</th>
                <td>${formattedStartDate}</td>
                </tr>
                <tr>
                <th scope="row">End Date</th>
                <td>${formattedEndDate}</td>
                </tr>
                </tbody>
                `;
  tableContainer.innerHTML = tr;

  // Create The renew Button
  btnsContainer.innerHTML = `
    <button class="btn btn-primary px-4 me-2 renew ">
    Renew
    </button>
    <button class="btn btn-success px-4 new-plan ">
    Start New Plan
    </button>
    `;

  // Renew the plan
  btnsContainer.addEventListener("click", (e) => {
    let newTime;
    if (e.target.classList.contains("renew")) {
      newTime = endTime;
      updatePlan(newTime);
    } else if (e.target.classList.contains("new-plan")) {
      newTime = Date.now();
      updatePlan(newTime);
    }
  });

  // update function to update the start time of the trainee to the current time or the end time
  function updatePlan(time) {
    update(child(usersRef, uId), {
      startTime: time
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
  }
}
