window.onload = function(){

    var button = document.createElement("INPUT");
    button.type = 'button';
    button.value = 'Click Me!';

    var containers = document.getElementsByClassName("button-container");
    var current = 0;
    containers[current].appendChild(button);

    function avoid(){

        if (button.value == 'Play again') return false;
        var rand = 0;
        while(rand == current){
            rand = getRandomInt(0,3);
        }
        containers[rand].appendChild(button);
        current = rand;
        console.log("hoverover");
    } 

    button.onmouseover = avoid;

    window.onkeydown = function(e){
        if (e.keyCode == 16){
            button.onmouseover = function(){
                return false;
            }
        }
    }

    window.onkeyup = function(e){
        if(e.keyCode ==16){
            button.onmouseover = avoid;
        }
    }


    button.onclick = function(){
        var win = document.getElementById('winning');
        if (button.value == 'Click Me!'){
            win.style.display = 'inline-block';
            button.value = 'Play again';
        }
        else{
            win.style.display = 'none';
            button.value = 'Click Me!';
        }
    }

}

function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min)) + min;
}