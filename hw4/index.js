var createGame = function(canvas){

    var c = canvas.getContext("2d")

    var ballx = canvas.width/2 //initial ball position
    var bally = canvas.height/2
    var ballradius = 20
    var ballvx = 20 //initial ball velocity
    var ballvy = 20

    var batx = canvas.width/2
    var baty = canvas.height - 40
    var batwidth = 100
    var batheight = 20


    var drawBall = function(){
        ballx += ballvx
        bally += ballvy
        if (ballx-ballradius < 0 || ballx+ballradius >canvas.width) ballvx *= -1
        if (bally-ballradius < 0 ) ballvy *= -1

        if (ballx < batx + batwidth/2 && ballx > batx - batwidth/2 && bally >= baty-batheight && !(bally > baty+batheight)) ballvy *=-1

        c.beginPath()
        c.arc(ballx,bally,ballradius,0,Math.PI*2)
        c.closePath()
        c.fillStyle='black'
        c.fill()
    }


    var drawBat = function(){
        c.fillStyle = 'black'
        c.fillRect(batx-batwidth/2, baty-batheight/2, batwidth, batheight);
    }


    var update = function(){
        c.clearRect(0,0,canvas.width,canvas.height)
        drawBall()
        drawBat()
    }

	canvas.addEventListener('mousemove',function(e){
		var x = e.pageX - canvas.offsetLeft;
		//var y = e.pageY - canvas.offsetTop;
		batx = x
	})

    return {
        update
    }
}


window.onload = function(){
	var app = createGame(document.querySelector("canvas"))
	setInterval(app.update, 50)
}