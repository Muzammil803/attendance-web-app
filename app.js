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
let emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const Password_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;



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
        text: "Please enter correct password  .",
        icon: "warning",
        button: "ok",
      });
  
  
  
    } else {
  
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then(async(userCredential) => {
          // Signed in 
        //   document.getElementById("loader").style.display = "block"
  
          const  user =await userCredential.user;
          if (user) {
            window.location.href = "admin.html"
            // document.getElementById("loader").style.display = "none"
  
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
          if (errorMessage) {
            swal({
              title: "Admin not found",
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

// /////////////////// create class start

const createClassBtn=()=>{

let container = document.getElementById("container")
container.innerHTML=`

<div class="class-form">
<div class="class-text">
    <h1>
        Create Class
    </h1>
</div>

<div>
    <input class="class-input" type="text" placeholder="Course name" id="course">
    <input class="class-input" type="text" placeholder="Batch number" id="batch">

</div>
<div>
    <input class="class-input" type="text" placeholder="Teacher name" id="teacher">
    <input class="class-input" type="text" placeholder="Section" id="section">

</div>
<div>
    <input class="class-input" type="text" placeholder=" Class timing" id="timing">
    <input class="class-input" type="text" placeholder="Class schedule" id="schedule">

</div>
<div class="class-btn">
    <button type="button" onclick="createClass()"> Create </button>
</div>
</div>

`


}
try{

    document.getElementById("create-class-btn").addEventListener("click",createClassBtn)
}catch(err){
    console.log(err)
}

// ///////////////////////////////

// /////////// add student

const addStudentBtn=()=>{

    let container = document.getElementById("container")
    container.innerHTML=
`
            
<div class="class-form">
<div class="class-text">
    <h1>
       Add Student
    </h1>
</div>

<div>
    <input class="class-input" type="text" placeholder="Student name" id="name">
    <input class="class-input" type="text" placeholder="Father name" id="father">

</div>
<div>
    <input class="class-input" type="text" placeholder="Roll number " id="roll">
    <input class="class-input" type="text" placeholder="Contact number" id="num">

</div>
<div>
    <input class="class-input" type="text" placeholder="CNIC number" id="cnic">
    <input class="class-input" type="text" placeholder="Course name" id="course">

</div>
<div class="student-last-input">
    <div class="choose-image-1">
        
    <label class="choose-image">
        Upload Image
        <input  type="file" placeholder=" Class timing">

    </label>
   
    </div>
    <div class="dropdown">
        <select name="" id="">
            <option >web app batch 8 </option>
            <option >web app batch 8 </option>
            <option >web app batch 8 </option>
        </select>
    </div>

</div>
<div class="class-btn">
    <button type="button" onclick="addStudent()"> Add student </button>
</div>
</div>

`

}
try{

    document.getElementById("add-student-btn").addEventListener("click",addStudentBtn)
}catch(err){
    console.log(err)
}

// ///////////////////////////////////////

/////////////////////////////////////// create class in database //////////////////////////

const createClass =()=>{

let course = document.getElementById("course").value 
let batch = document.getElementById("batch").value 
let teacher = document.getElementById("teacher").value 
let section = document.getElementById("section").value 
let timing = document.getElementById("timing").value 
let schedule = document.getElementById("schedule").value 

console.log(course)
console.log(batch)
console.log(teacher)
console.log(section)
console.log(timing)
let firDoc = doc(db, "classes", `${course} batch:${batch} (Sir ${teacher})` );
 setDoc(firDoc, {
    course: course,
    batch: batch,
    teacher: teacher,
    section: section,
    timing: timing,
    schedule: schedule,
    classId: `${course} batch:${batch} (Sir ${teacher})`
    // id: uid
    // profile:url

  });

}
window.createClass=createClass;

/////////////////////////////////////// create class in database end //////////////////////////

// ////////////////// print All Classes



const allClassBtn = async()=>{

    let container = document.getElementById("container")
    document.getElementById("none").style.display="none"
    const querySnapshot = await getDocs(collection(db,"classes"));
    querySnapshot.forEach((doc) => {
        console.log(doc.data())
        container.innerHTML=
    `
    <div class="all-classes">
    
    <h2>
     ${doc.data().course}
    </h2>
    <p>
        Batch :     ${doc.data().batch}

    <br>
    Sir :      ${doc.data().teacher}

    <br>
    Section :      ${doc.data().section}

    </p>
    
    </div>
    
    `
    })

}
try{

    document.getElementById("all-class-btn").addEventListener("click",allClassBtn)
}catch(err){
    console.log(err)
}














// /////////////////// create class end




const addStudent =()=>{

    let name = document.getElementById("name").value 
    let father = document.getElementById("father").value 
    let roll = document.getElementById("roll").value 
    let num = document.getElementById("num").value 
    let cnic = document.getElementById("cnic").value 
    let course = document.getElementById("course").value 
    
    let firDoc = doc(db, "allstudent", `${roll}` );
     setDoc(firDoc, {
        name: name,
        father: father,
        roll: roll,
        num: num,
        cnic: cnic,
        course: course,
        // id: uid
        // profile:url
    
      });
    
    }
    window.addStudent=addStudent;
    

