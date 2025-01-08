// js/auth.js
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjTGgnXRskg1c4jGHosGiSj-M-SoMdMfo",
  authDomain: "meetinginsights-f905c.firebaseapp.com",
  projectId: "meetinginsights-f905c",
  storageBucket: "meetinginsights-f905c.firebasestorage.app",
  messagingSenderId: "668135871958",
  appId: "1:668135871958:web:2f50dd807aa3a8da930077"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Toggle between sign in and sign up forms
document.getElementById('showSignUp')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signInForm').classList.add('hidden');
    document.getElementById('signUpForm').classList.remove('hidden');
});

document.getElementById('showSignIn')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('signUpForm').classList.add('hidden');
    document.getElementById('signInForm').classList.remove('hidden');
});

// Sign In with Email/Password
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const recaptchaResponse = grecaptcha.getResponse();
    
    if (!recaptchaResponse) {
        alert('Please complete the reCAPTCHA');
        return;
    }

    try {
        await auth.signInWithEmailAndPassword(email, password);
        // Store remember me preference
        if (document.getElementById('rememberMe').checked) {
            auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        } else {
            auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        }
        // Redirect to home or previous page
        const returnUrl = sessionStorage.getItem('returnUrl') || '/';
        window.location.href = returnUrl;
    } catch (error) {
        alert(error.message);
    }
});

// Sign Up with Email/Password
document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const recaptchaResponse = grecaptcha.getResponse();
    
    if (!recaptchaResponse) {
        alert('Please complete the reCAPTCHA');
        return;
    }

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        // Automatically sign in after successful registration
        await auth.signInWithEmailAndPassword(email, password);
        window.location.href = '/';
    } catch (error) {
        alert(error.message);
    }
});

// Google Sign In
const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.signInWithPopup(provider);
        window.location.href = '/';
    } catch (error) {
        alert(error.message);
    }
};

document.getElementById('googleSignIn')?.addEventListener('click', handleGoogleSignIn);
document.getElementById('googleSignUp')?.addEventListener('click', handleGoogleSignIn);

// Auth state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        console.log('User signed in:', user.email);
    } else {
        // User is signed out
        console.log('User signed out');
    }
});
