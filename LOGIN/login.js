// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";

import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1AGi_XgjjnZ1wTCL8Je-7iKrJ1LqaXio",
    authDomain: "mompulse-d8682.firebaseapp.com",
    projectId: "mompulse-d8682",
    storageBucket: "mompulse-d8682.firebasestorage.app",
    messagingSenderId: "704978493194",
    appId: "1:704978493194:web:e055af318f4d839bc824f3",
    measurementId: "G-YD32YDX7D3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);



//submit button
const submit = document.getElementById('submit');
submit.addEventListener("click", (e) => {
    e.preventDefault();
    //inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
         // Signed up 
        const user = userCredential.user;
        alert("Logged in successfully");
        window.location.href = "../DASHBOARD/dashboard.html";
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
    });

})