window.onload = function(){
    //this jQuery is purely used for reponsive side menu
    $(".button-collapse").sideNav();

    var update = document.getElementById("update");
    update.onclick = function(){
        var valid = true;

        //reset all input field class
        var inputs = document.getElementsByTagName("INPUT");
        var labels = document.getElementsByTagName("LABEL");

        //reset valid status
        Array.from(inputs).forEach(function(element){
            element.className="";
        })

        //validate each field
        //if not valid, set the flag and set the field invalid
        if (!isFieldEmpty('email') && !isFieldValid('email','email')){
            valid = false;
            setFieldInvalid('email');
        }

        if (!isFieldEmpty('phonenumber') && !isFieldValid('phone','phonenumber')){
            valid = false;
            setFieldInvalid('phonenumber');
        }

        if (!isFieldEmpty('zipcode') && !isFieldValid('zip','zipcode')){
            valid = false;
            setFieldInvalid('zipcode');
        }

        if (!isFieldEmpty('password') || !isFieldEmpty('passwordconf')){
            if(!isPasswordMatching()){
                valid = false;
                setFieldInvalid('password');
                document.getElementById('passlabel').className = "active";
            }
        }

        //if valid perform updates
        if(valid){
            if (!isFieldEmpty('displayname')){
                setFieldValueWithInput('p_dname','displayname');
            }
            if (!isFieldEmpty('email')){
                setFieldValueWithInput('p_email','email');
            }
            if (!isFieldEmpty('phonenumber')){
                setFieldValueWithInput('p_phone','phonenumber');
            }
            if (!isFieldEmpty('zipcode')){
                setFieldValueWithInput('p_zip','zipcode');
            }
            if (!isFieldEmpty('password')){
                setFieldValueWithInput('p_pass','password');
            }

            //clear the input
            Array.from(inputs).forEach(function(element){
                element.value = "";
            })

            //reset focus status on input fields
            Array.from(labels).forEach(function(element){
                element.className = "";
            })
        }

    }
}

function isFieldEmpty(fieldId){
    var flag = false;
    var component = document.getElementById(fieldId);
    if (component.value == null || component.value == ""){
        flag = true;
    }
    return flag;
}

function isFieldValid(type, fieldId){
    var component = document.getElementById(fieldId);
    var re;
    switch(type){
        case 'email':
            re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            break;
        case 'phone':
            re = /^\(?([0-9]{3})\)?[-]?([0-9]{3})[-]?([0-9]{4})$/;
            break;
        case 'zip':
            re = /[0-9]{5}$/;
    }
    return re.test(component.value);
}


function isPasswordMatching(){
    var p1 = document.getElementById('password').value;
    var p2 = document.getElementById('passwordconf').value;
    return (p1 === p2);
}


function setFieldInvalid(fieldId){
    document.getElementById(fieldId).className = "invalid";
}

function clearFieldClass(fieldId){
    document.getElementById(fieldId).className = "";
}

function setFieldValueWithInput(fieldId, inputId){
    document.getElementById(fieldId).innerHTML = document.getElementById(inputId).value;
}