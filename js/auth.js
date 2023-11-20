// Import Auth from main.js
import { auth } from "./main.js";

// Import functions From Firebase
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

let email = "mostafa@admin.com",
  pass = "mostafaadmin1234";

// createUserWithEmailAndPassword(auth, email, pass)
//   .then((userCredential) => {})
//   .catch((error) => {
//     console.log(error.code, error.message);
//   });

const emailSignIn = document.querySelector("#emailSignIn"),
  password = document.querySelector("#pass"),
  signBtn = document.querySelector(".sign-in"),
  invalidText = document.querySelector(".invalid");

signBtn.addEventListener("click", () => {
  signInWithEmailAndPassword(auth, emailSignIn.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      signBtn.style.pointerEvents = "none";
      setTimeout(() => {
        window.location.href = "home.html";
      }, 500);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      invalidText.style.display = "block";
    });
});
