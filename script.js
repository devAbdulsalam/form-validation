const registerForm = document.getElementById("register_form");
const loginForm = document.getElementById("login_form");
const alertmsg = document.getElementById("alertmsg");
const buttons = document.querySelectorAll("button");

// to open and close various form 
buttons.forEach((button) => {
        button.addEventListener('click', (e)=>{
        if (e.currentTarget.classList == "showLogin") {
            loginForm.classList.add("open")
            loginForm.classList.remove("hide")
            registerForm.classList.toggle("hide")
        } 
        else if (e.currentTarget.classList == "showRegister"){
            registerForm.classList.open("open")
            registerForm.classList.toggle("hide")
            loginForm.classList.add("hide")
            loginForm.classList.remove("open")
        } 
        else if (e.currentTarget.classList == "showAlert"){
            signUp();
        }
        else if (e.currentTarget.classList == "logIn"){
            logIn();
        }
        else if (e.currentTarget.classList == "refresh"){
            // i will submit form to dataBase
            console.log("i will refresh")
            // window.location.reload();
        } 
    });
})



var firstName = document.getElementById("firstName");
var lastName = document.getElementById("lastName");
var email = document.getElementById("email");
var password = document.getElementById("password");
var confirmPswd = document.getElementById("confirmPswd");
var newsletter = document.getElementById("newsletter").checked;

// Validating register Form
const signUp = function(){
// Empty form input message
    if( firstName.value ==="" ||
        lastName.value ==="" ||
        email.value ==="" ||
        password.value ==="" ||
        confirmPswd.value ==="" ||
        confirmPswd.value ===""
    ){
        // errorMsg
        errorMsg("Please fill all in input fileds", "danger");
    }
    else{
        checknewsletter();
        confirmPassword();
        // AddToDataBase();
    }
}; 

// for showing alert
const showAlert = function(){
    alertmsg.classList.add("open")
    loginForm.classList.add("hide")
    loginForm.classList.remove("open")
    registerForm.classList.add("hide")
}

// for error message
let errorMsg = function(message, color){
    const errMsg = document.getElementById("errmsg")
    errMsg.innerHTML = message;
    errMsg.classList.add(color);
    // console.log(errMsg);
   setTimeout(() => errMsg.remove(), 3000);
    } 
    
    
    // password strenght
let weak = document.getElementById("weak");
let medium = document.getElementById("medium");
let strong = document.getElementById("strong");
let passwordtext = document.querySelector(".pswdtext");
let passwordalert = document.querySelector(".passwordalert");
// //password.addEventListener to check the  PasswordStrenght




function trigger(){
    let strenght = password.value;
    //show the password strenght
    if(strenght != ""){
        passwordalert.classList.add("showPM")
        passwordalert.classList.remove("hidePM")
     if (strenght.length <= 3){
        weak.classList.add("weak")
        passwordtext.innerHTML = "Your password is weak" 
     }  if (strenght.length > 3 && strenght.match(/[a-z]/g) || strenght.match(/[A-Z]/g)){
        medium.classList.add("medium")
        passwordtext.innerHTML = "Your password is Medium"
        passwordtext.classList.add("textmedium")
        } if (strenght.length < 3 && strenght.length <=7){
                medium.classList.remove("medium")
                passwordtext.innerHTML = "Your password is weak"
                passwordtext.classList.remove("textmedium")
            }
        if (strenght.length > 8  && strenght.match(/[a-z]/g) && strenght.match(/[A-Z]/g) && strenght.match(/[0-9]/g) && strenght.match(/[^A-Za-z0-9]/g) ){
        strong.classList.add("strong")
        passwordtext.innerHTML = "Your password is Strong"
        passwordtext.classList.add("textstrong")
        } if
        (strenght.length <=7){
            strong.classList.remove("strong")
            passwordtext.classList.remove("textstrong")
        }
    }else {
        passwordalert.classList.add("hidePM")
        passwordalert.classList.remove("showPM")
    };
};

// Check for character weakness
// function lowwerCase(){
//     let strenght = password.value;
//     const matches = strenght.match(/[a-z]/g)
// }


// confirm Password
function confirmPassword(){
    let strenght = password.value;
    if(password.value === confirmPswd.value && strenght.length > 8){
        console.log("both are ok")
        showAlert()
    }
    if(password.value === confirmPswd.value && strenght.length <= 7){
        passwordtext.innerHTML = "Your passwords is not strong"
        passwordtext.style.color = "red"
        // setTimeout(() => passwordtext.toggle(), 3000);
    }
    else{
        // errorMsg
        passwordtext.innerHTML = "Your passwords does not match"
        passwordtext.style.color = "red"
        setTimeout(() => passwordtext.toggle(), 3000);
    }
};

// check if Customer subscribing to newsletter
const msgInfo = document.getElementById("msg");
const newsBtn = document.getElementById("newsletterBtn");
function checknewsletter(){
    if (newsletter === true){
        msgInfo.innerHTML =
            ` <h1>Hello Mr. ${firstName.value} ${lastName.value}</h1>
                <p>You are login</p>
                <p>You have sucessfully subscrib for our Newsletter</p>
                <p>You will now get the latest update of our products and services</p>`
        // // AddToDataBase
        AddToDataBase();
    }else if (newsletter === false){
        msgInfo.innerHTML =
            `<h1>Hello Mr. ${firstName.value} ${lastName.value}</h1>`
            newsBtn.style.display = "block"
            const subscribForNewsletter = document.getElementById("subscribForNewsletter").checked;
            console.log(subscribForNewsletter)
            //AddToDataBase
            AddToDataBase(subscribForNewsletter);
            return subscribForNewsletter
        };
    };

class Customer{

    constructor(firstName, lastName, email, password, newsletter){
    this.firstNname = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.newsletter = newsletter;
    }
};



function AddToDataBase(subscribForNewsletter){
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    var newsletter = subscribForNewsletter;
    console.log(subscribForNewsletter);
    
    // //initiating new Customer
    const customer = new Customer(firstName, lastName, email, password, newsletter);
    // console.log(customer);

    // //saveCustomerToLocalStorage
    saveCustomerToLocalStorage(customer)
    return customer
}

function saveCustomerToLocalStorage(customer){
    const customers = customer;
     let items = getlocalStorage();    

    items.push(customers);
    localStorage.setItem("customers", JSON.stringify(items))
        console.log("customer has been saved");
};    


function getlocalStorage(){
    const fromLocal = JSON.parse(localStorage.getItem("customers"));
    if (fromLocal === null) {
        return []
    } else {
        return fromLocal
    }
}





// Validating Login form
let loginEmail = document.getElementById("loginEmail").value;
let loginPassword = document.getElementById("loginPswd").value;
const logIn = function(){

    showAlert();
    //  errorMsg("password is weak", "danger");
    //  errorMsg("password is strong", "success");
};

