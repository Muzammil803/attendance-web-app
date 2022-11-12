import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  query,
  where,
  getDoc,
  getDocs,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";



const firebaseConfig = {
    apiKey: "AIzaSyBbgvZbJUlqtLMFv9Lkmlr_5IO8Arsww0c",
    authDomain: "attendance-app-b4407.firebaseapp.com",
    projectId: "attendance-app-b4407",
    storageBucket: "attendance-app-b4407.appspot.com",
    messagingSenderId: "527891989847",
    appId: "1:527891989847:web:e866993ae5f1560c612a12",
    measurementId: "G-RJ5Z0628QP"
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  



//////////////// Login Admin///////////////////////////////



const login = () => {
    let email = document.getElementById("l-email")
    let password = document.getElementById("l-password")
  
    if (emailReg.test(email.value) == false) {
  
      swal({
        title: "invalid Email",
        text: "Please enter correct email  .",
        icon: "warning",
        button: "ok",
      });
    } else if (Password_regex.test(password.value) == false) {
  
      swal({
        title: "invalid password",
        text: "Please enter correct email  .",
        icon: "warning",
        button: "ok",
      });
  
  
  
    } else {
  
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async(userCredential) => {
          // Signed in 
          document.getElementById("loader").style.display = "block"
  
          const  user =await userCredential.user;
          if (user) {
            window.location.href = "home.html"
            document.getElementById("loader").style.display = "none"
  
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
          if (errorMessage) {
            swal({
              title: "invalid Email or Password",
              text: "Please enter correct email or Password  .",
              icon: "warning",
              button: "ok",
            });
          }
        });
    }
  
  }
  
  try {
    let loginBtn = document.getElementById("login")
    loginBtn.addEventListener("click", login)
  } catch (err) {
    console.log("loginbtn", err)
  }
// ////////////////////// login end ///////////////////////////////  