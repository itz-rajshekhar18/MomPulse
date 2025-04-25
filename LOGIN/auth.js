// Firebase imports commented out for prototype
/*
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
*/

// Simple authentication for prototype
document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    // Store users in localStorage for prototype
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const fullName = document.getElementById('fullName').value;
            const dueDate = document.getElementById('dueDate').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            // Check if user already exists
            const users = JSON.parse(localStorage.getItem('users'));
            if (users.some(user => user.email === email)) {
                alert('Email already in use');
                return;
            }

            // Add new user
            users.push({
                email,
                password,
                fullName,
                dueDate,
                createdAt: new Date().toISOString()
            });
            localStorage.setItem('users', JSON.stringify(users));
            
            // Store current user
            localStorage.setItem('currentUser', JSON.stringify({ email, fullName }));
            
            alert('Registration successful!');
            window.location.href = '../DASHBOARD/dashboard.html';
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const users = JSON.parse(localStorage.getItem('users'));
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // Store current user
                localStorage.setItem('currentUser', JSON.stringify({ 
                    email: user.email, 
                    fullName: user.fullName 
                }));
                
                // Redirect to dashboard
                window.location.href = '../DASHBOARD/dashboard.html';
            } else {
                alert('Invalid email or password');
            }
        });
    }
});

// Sign up function
export async function signUp(email, password, fullName, dueDate) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Create user profile in Firestore
        await setDoc(doc(db, "users", user.uid), {
            fullName: fullName,
            email: email,
            dueDate: dueDate,
            createdAt: new Date()
        });
        
        return user;
    } catch (error) {
        throw error;
    }
}

// Login function
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
} 