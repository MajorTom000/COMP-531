function submitForm(){
    var flag = true;
    var d = new Date();
    document.getElementById("timeStamp").value = d.getTime();
    //validate if 18 years old

    document.getElementById("warning").textContent = "";
    var bString = document.getElementById("DOB").value;
    var bTime = new Date(bString);
    var timeString = d.getFullYear()-18 + "-" + (d.getMonth()-(-1)) + "-" + d.getDate();
    var timeBar = new Date(timeString);
    var comparison = timeBar.getTime() >= bTime.getTime();
    if (bTime.getTime() === bTime.getTime() &&!comparison){
        document.getElementById("warning").innerHTML += "You need to be 18 years old or older to register!<br>";
        flag = false;
    }
    //validate passwords
    var p1 = document.getElementById("pass1").value;
    var p2 = document.getElementById("pass2").value;
    if (p1!==p2){
        document.getElementById("warning").innerHTML += "Passwords don't match!<br>";
        flag = false;
    }
    return flag;
}

function clearForm(){
    document.getElementById("warning").innerHTML = "";
    document.getElementById("registrationForm").reset();
}

function login(component){
    var s = "";
    if (component.id=="login1") s="1";
    else s = "2";
    var q = document.getElementById
    var username = document.getElementById("username"+s)
    var pass = document.getElementById("password"+s)

    username.style.border = ""
    pass.style.border = ""

    if (username.value != "" && pass.value != "") 
    window.location = "main.html"

    if (username.value == "") username.style.border = "solid 2px red"
    if (pass.value == "") pass.style.border = "solid 2px red"
}

window.onload = function(){
    var d = new Date();
    document.getElementById("timeStamp").value = d.getTime();

    //This part is for css component initialization
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 200 // Creates a dropdown of 15 years to control year
    });
}