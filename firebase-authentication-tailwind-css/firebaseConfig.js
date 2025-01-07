import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKtSYzjRrYE41o_z6CX5rfdZZ3tYVinps",
  authDomain: "fir-auth-5e65c.firebaseapp.com",
  projectId: "fir-auth-5e65c",
  storageBucket: "fir-auth-5e65c.firebasestorage.app",
  messagingSenderId: "480968032868",
  appId: "1:480968032868:web:a2d9d1a5c8c14b08f61571",
  measurementId: "G-PRV37B8NCZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

function handleForm(event, formType) {
  event.preventDefault();

  // Declare variables
  let firstName, lastName, email, password, confirmPassword;

  // Get input fields
  if (formType === "Sign Up") {
    firstName = document.getElementById("firstName").value;
    lastName = document.getElementById("lastName").value;
  }

  if (formType === "Sign Up" || formType === "Sign In") {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
  }

  if (formType === "Sign Up") {
    confirmPassword = document.getElementById("confirmPassword").value;
  }

  console.log(`Form type: ${formType}, Email: ${email}, Password: ${password}`); // Debugging line

  // Sign Up logic
  if (formType === "Sign Up") {
    // Validation checks before calling Firebase
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      console.log("Validation failed: All fields are required.");
      alert("All fields are required.");
      return; // Stop further execution if validation fails
    }

    if (password !== confirmPassword) {
      console.log("Password mismatch.");
      alert("Passwords do not match.");
      return; // Stop further execution if passwords do not match
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Sign Up successful", user);
        alert("Sign Up successful!");

        // Empty input fields only after successful sign-up
        document.getElementById("firstName").value = "";
        document.getElementById("lastName").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("confirmPassword").value = "";

        // Redirect after successful sign up
        setTimeout(() => {
          window.location.href = "login.html";
        }, 1000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        alert(errorMessage); // Display error message to the user
      });
  }

  // Sign In logic
  if (formType === "Sign In") {
    if (!email || !password) {
      console.log("Validation failed: All fields are required for Sign In.");
      alert("All fields are required.");
      return; // Stop further execution if fields are missing
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Sign In successful", user);
        alert("Sign In successful!");

        // Empty input fields only after successful sign-in
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";

        // Redirect after successful sign-in
        window.location.href = "dashboard.html"; // Direct redirection without setTimeout
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Sign In error:", errorCode, errorMessage);
        alert(`Error: ${errorMessage}`);
      });
  }

  // Sign Out logic
  if (formType === "Sign Out") {
    signOut(auth)
      .then(() => {
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Sign-out error:", error.message);
        alert("Error during sign-out.");
      });
  }
}

// Call the signup and signin function after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const signOutButtons = document.getElementsByClassName("signOut");

  if (signUpButton) {
    signUpButton.addEventListener("click", (event) =>
      handleForm(event, "Sign Up")
    );
  }

  if (signInButton) {
    signInButton.addEventListener("click", (event) =>
      handleForm(event, "Sign In")
    );
  }

  if (signOutButtons.length > 0) {
    Array.from(signOutButtons).forEach((button) => {
      button.addEventListener("click", (event) =>
        handleForm(event, "Sign Out")
      );
    });
  }
});
