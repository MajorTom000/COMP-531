const timeFrame = 20

var createGame = function(canvas){

    var c = canvas.getContext("2d")

    const toRadian = (Math.PI/180)

    var batx = canvas.width/2
    var baty = canvas.height - 40
    var batwidth = 100
    var batheight = 10
    var originalBatWitdh = 100
    //max reflecting angle for the bat
    const reflectAngle = 75

    //score and time
    var totalBallsAdded = 1
    var ballsLeftInScene = 1
    var score = 0
    var time = 0
    var lastTimeAdded = 0

    //if the game is paused
    var paused = false
    var gameover = false

    //all the balls currently in the game
    var balls = [] 

    //bat power up 
    var powerUpTimeLeft = 0

    //function that returns a new ball
    //the ball's speed is based on the unit vector in a unit circle
    var getNewBall = function(){
        return {
            outofbound : false,
            ballx : canvas.width/2,
            bally : canvas.height/2,
            ballradius : 20,
            ballVM : 10,
            ballVA : (Math.random()*90 - 45)%360,
            ballvx : Math.sin(this.ballVA*toRadian)*this.ballVM,
            ballvy : Math.cos(this.ballVA*toRadian)*this.ballVM
        }
    }

    balls.push(getNewBall())

    var drawBall = function(items){
        items.forEach(
            function(element, index){
                if (!element.outofbound){
                    element.ballvx = Math.sin(element.ballVA*toRadian)*element.ballVM
                    element.ballvy = Math.cos(element.ballVA*toRadian)*element.ballVM
                    element.ballx += element.ballvx
                    element.bally += element.ballvy
                    if (element.ballx-element.ballradius < 0){
                        element.ballVA = (360 - element.ballVA)%360
                        element.ballx = element.ballradius
                    }
                    if (element.ballx+element.ballradius > canvas.width){
                        element.ballVA = (360 - element.ballVA)%360
                        element.ballx = canvas.width - element.ballradius
                    }
                    if (element.bally-element.ballradius < 0 ){
                        element.ballVA = (180 - element.ballVA )%360
                        element.bally = element.ballradius
                    }

                    if (element.ballx-element.ballradius < batx + batwidth/2 && element.ballx+element.ballradius > batx - batwidth/2 && element.bally >= baty-element.ballradius && !(element.bally > baty+element.ballradius)) {
                        var halfbat = batwidth/2
                        var diffCenter = Math.abs(element.ballx - batx)
                        var fraction = diffCenter/halfbat
                        if (element.ballx < batx){
                            element.ballVA = 180 + fraction * reflectAngle
                        }
                        else if (element.ballx > batx){
                            element.ballVA = 180 - fraction * reflectAngle
                        }
                        else{
                            element.ballVA = 180
                        }
                        score += element.ballVM
                    }

                    c.beginPath()
                    c.arc(element.ballx,element.bally,element.ballradius,0,Math.PI*2)
                    c.closePath()
                    c.fillStyle='black'
                    c.fill()
                }
            }
        )
    }


    var drawBat = function(){
        c.fillStyle = 'black'
        c.fillRect(batx-batwidth/2, baty-batheight/2, batwidth, batheight);
    }

    var drawScore = function(){
        c.font = "48px sans-serif"
        c.fillText("Score: " + Math.floor(score), 10, 50)
    }

    var updateSpeed = function(){
        balls.forEach((e)=>{e.ballVM += 0.002})
    }

    var drawTime = function(){
        c.font = "48px sans-serif"
        c.fillText("Time: " + Math.floor(time/1000), 500, 50)
        time += timeFrame
    }

    var markGarbageBalls = function(items){
        items.forEach((element)=>{
            if (!element.outofbound  && element.bally > canvas.height + 40) {
                element.outofbound = true
                ballsLeftInScene--
            }
        })
    }

    var updatePowerUp = function(){
        if (Math.floor(time/1000)%60 == 0){
            powerUpTimeLeft = 10000
        }
        else{
            powerUpTimeLeft -= timeFrame
        }

        if (powerUpTimeLeft >= 0){
            batwidth = 200
        }
        else{
            batwidth = originalBatWitdh
        }
    }

    var drawGameOver = function(){
        c.font = "60px sans-serif"
        c.fillText("Game Over", 250, canvas.height/2)
        c.fillText("Score: " + Math.floor(score), 250, canvas.height/2+60)
        c.fillText("Time:  " + Math.floor(time/1000), 250, canvas.height/2+120)
    }

    var addBall = function(){
        if (time - lastTimeAdded > 20000 && totalBallsAdded <= 6){
            lastTimeAdded = time
            balls.push(getNewBall())
            totalBallsAdded++
            ballsLeftInScene++
        }
    }

    var update = function(){
        
        if(!paused && !gameover){
            c.clearRect(0,0,canvas.width,canvas.height)
            addBall()
            drawBall(balls)
            drawBat()
            drawScore()
            drawTime()
            updateSpeed()
            updatePowerUp()
            markGarbageBalls(balls)
        }

        if (gameover){
            c.clearRect(0,0,canvas.width,canvas.height)
            drawGameOver()
        }

        if (ballsLeftInScene == 0){
            gameover = true
        }
    }

	canvas.addEventListener('mousemove',function(e){
		var x = e.pageX - canvas.offsetLeft

        if (x < batwidth/2){
            batx = batwidth/2 + 2
        }
        else if (x > canvas.width - batwidth/2){
            batx = canvas.width - batwidth/2 -2
        }
        else{
            batx = x
        }

		

	})

    canvas.addEventListener('click',function(e){
        balls.push(getNewBall())
        ballsLeftInScene++
    })

    var togglePause = function(){
        paused = !paused
    }

    return {
        update,
        togglePause
    }
}


window.onload = function(){
	var app = createGame(document.querySelector("canvas"))

    document.getElementById('pause').addEventListener('click',app.togglePause)
	setInterval(app.update, timeFrame)
}