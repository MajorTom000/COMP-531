function getRandomInt(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min)) + min;
}



function card(cardDiv, imgFiles){
    var that = this;

    var timerID;

    this.timerInterval = getRandomInt(1000,5000);

    this.timer = function(){
        var imgTag = cardDiv.getElementsByTagName("IMG");

        timerID = setInterval(function(){
            imgTag[0].setAttribute("src", imgFiles[getRandomInt(1,imgFiles.length)]);
        },this.timerInterval);
    };

    this.setupToggle = function(){
        //if (!card.timer()) return;
        var button = cardDiv.getElementsByTagName("BUTTON")[0];
        console.log(button);
        if (!button) return;
        button.onclick = function(){
            if (button.innterHTML == "STOP"){
                clearInterval(that.timerID);
                button.innerHTML = "START";
                console.log(button.innerHTML);
                
            }
            else{
                button.innerHTML = "STOP";
                that.timer();
                console.log(button.innerHTML);
            }
        }
    };  

    this.setupToggle();

}


window.onload = function(){
    var cards = document.getElementsByClassName("card");
    var imageFiles = ["1.jpg","2.jpg","3.jpg","4.jpg"];
    Array.from(cards).forEach(function(element,value,index){
        element.card = new card(element, imageFiles);
    });
}