var createGame = function(canvas){

    var c = canvas.getContext("2d")

    var ballx = canvas.width/2 //initial ball position
    var bally = canvas.height/2
    var ballradius = 20
    var ballVM = 10
    var ballVA = Math.random()*360
    var toRadian = (Math.PI/180)
    var ballvx = Math.sin(ballVA*toRadian)*ballVM //ball velocity are represented as unit vector multiply by magnitude
    var ballvy = Math.cos(ballVA*toRadian)*ballVM

    var batx = canvas.width/2
    var baty = canvas.height - 40
    var batwidth = 100
    var batheight = 10

    const reflectAngle = 75

    var score = 0

    var drawBall = function(){
        
        ballvx = Math.sin(ballVA*toRadian)*ballVM
        ballvy = Math.cos(ballVA*toRadian)*ballVM
        ballx += ballvx
        bally += ballvy
        if (ballx-ballradius < ballradius/10 || ballx+ballradius > canvas.width - ballradius/10){
            ballVA = (360 - ballVA)%360
        }
        if (bally-ballradius < ballradius/10 ){
            ballVA = (180 - ballVA ) % 360
        }

        if (ballx-ballradius < batx + batwidth/2 && ballx+ballradius > batx - batwidth/2 && bally >= baty-ballradius && !(bally > baty+ballradius)) {
            var halfbat = batwidth/2
            var diffCenter = Math.abs(ballx - batx)
            var fraction = diffCenter/halfbat
            if (ballx < batx){
                ballVA = 180 + fraction * reflectAngle
            }
            else if (ballx > batx){
                ballVA = 180 - fraction * reflectAngle
            }
            else{
                ballVA = 180
            }
            score += ballVM
        }

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

    var drawScore = function(){
        c.font = "48px sans-serif"
        c.fillText("Score: " + score, 10, 50)
    }

    var updateSpeed = function(){
        ballVM += 0.001
    }

    var update = function(){
        c.clearRect(0,0,canvas.width,canvas.height)
        drawBall()
        drawBat()
        drawScore()
        updateSpeed()
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
	setInterval(app.update, 20)
}