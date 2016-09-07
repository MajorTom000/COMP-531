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

        if (imgTag.length == 0) return;

        timerID = setInterval(function(){
            imgTag[0].setAttribute("src", imgFiles[getRandomInt(1,imgFiles.length)]);
        },this.timerInterval);

        var button = cardDiv.getElementsByTagName("BUTTON")[0];
        button.onclick = function(){
            if (button.innerText == "STOP"){
                clearInterval(timerID);
                button.innerText = "START";
                
            }
            else{
                that.timerInterval = getRandomInt(1000,5000);
                button.innerText = "STOP";
                that.timer();
            }
        }
    };

    this.timer();

}


window.onload = function(){
    var cards = document.getElementsByClassName("card");
    var imageFiles = ["1.jpg","2.jpg","3.jpg","4.jpg"];
    Array.from(cards).forEach(function(element,value,index){
        element.card = new card(element, imageFiles);
    });
}