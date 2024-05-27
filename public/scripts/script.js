function getCurrentDate(){
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October","November", "December"];
    let date = new Date();
    document.getElementById("date").innerText=days[date.getDay()]+", "+months[date.getMonth()]+" "+date.getDate()+", "+date.getFullYear()+"\n"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();;
}
setInterval(getCurrentDate,1000);
getCurrentDate();

function disable(id){
    document.getElementById(id).disabled=true;
}

document.getElementById("findPets").addEventListener("submit", (event) => validateForm("findPets", event));
document.getElementById("givePets").addEventListener("submit", (event) => validateForm("givePets", event));
function validateForm(formName,event) {
    let form = document.forms[formName];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let isValid=true;
    for (let i = 0; i < form.elements.length; i++) {
        if (form.elements[i].tagName === "INPUT" && !form.elements[i].disabled) {
            if (!form.elements[i].value.trim()) {
                isValid=false;
                alert("Incomplete form");
                break;
            }
        }
        if(form.elements[i].type==="email"&&!emailPattern.test(form.elements[i].value)){
            isValid=false;
            alert("Invalid email");
            break;
        }
    }
    if(!isValid){
        event.preventDefault();
    }
    return isValid;
}
document.getElementById("createAccountForm").addEventListener("submit", (event) => validateCreation(event));
function validateCreation(event) {
    console.log("Validating creation");
    const form = document.forms['createAccountForm']; 
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let isValid = true;
    if (!/^[A-Za-z0-9]+$/.test(username)) {
        alert('Invalid username format. Only letters and digits are allowed.');
        isValid = false;
    }

    if (!/(?=.*\d)(?=.*[a-zA-Z]).{4,}/.test(password)) {
        alert('Invalid password format. Must be at least 4 characters long, include at least one letter and one digit.');
        isValid = false;
    }
    if(!isValid){
        event.preventDefault();
    }
    return isValid;
};



