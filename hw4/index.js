var createGame = function(canvas){

    var c = canvas.getContext("2d")

    var ballx = canvas.width/2 //initial ball position
    var bally = canvas.height/2
    var ballradius = 20
    var ballvx = 50 //initial ball velocity
    var ballvy = 5



    var drawBall = function(){
        ballx += ballvx
        bally += ballvy
        if (ballx-ballradius < 0 || ballx+ballradius >canvas.width) ballvx *= -1
        if (bally-ballradius < 0 || bally+ballradius >canvas.height) ballvy *= -1

        c.beginPath()
        c.arc(ballx,bally,ballradius,0,Math.PI*2)
        c.closePath()
        c.fillStyle='black'
        c.fill()
    }


    var drawBat = function(){

    }


    var update = function(){
        c.clearRect(0,0,canvas.width,canvas.height)
        drawBall()
    }


    return {
        update
    }
}


window.onload = function(){
	var app = createGame(document.querySelector("canvas"))
	setInterval(app.update, 50)
}