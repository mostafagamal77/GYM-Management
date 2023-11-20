// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";

// Import the functions to get database
import {
  getDatabase,
  ref
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

// Import Auth From Firebase
import {
  getAuth,
  signOut
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBadqoB0S2mShaB6QdTn0nab5p4-zGuCV8",
  authDomain: "gym-management-7d417.firebaseapp.com",
  databaseURL: "https://gym-management-7d417-default-rtdb.firebaseio.com",
  projectId: "gym-management-7d417",
  storageBucket: "gym-management-7d417.appspot.com",
  messagingSenderId: "458534438012",
  appId: "1:458534438012:web:5371ad8b8fd1731b7f75f9",
  measurementId: "G-ZVGYYM65D2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Database
const db = getDatabase(app);

// Create database Reference
export const usersRef = ref(db, "users/");

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth();

let signOutBtn = document.querySelector("#sign-out");

if (signOutBtn) {
  signOutBtn.addEventListener("click", () => {
    signOut(auth)
      .then((result) => {
        setTimeout(() => {
          window.location.href = "index.html"
        }, 500);
      })
      .catch((err) => {
        console.log(" An error happened.", err);
      });
  });
}
