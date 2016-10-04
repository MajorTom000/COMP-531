const timeFrame = 20

var createGame = function(canvas){

    var c = canvas.getContext("2d")

    const toRadian = (Math.PI/180)

    var batx = canvas.width/2
    var baty = canvas.height - 40
    var batwidth = 100
    var batheight = 10

    const reflectAngle = 75

    var score = 0
    var time = 0

    var paused = false
    //all the balls currently in the game
    var balls = [] 

    //function that returns a new ball
    var getNewBall = function(){
        return {
            outofbound : false,
            ballx : canvas.width/2,
            bally : canvas.height/2,
            ballradius : 20,
            ballVM : 10,
            ballVA : (Math.random()*90 - 90)%360,
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
                    if (element.ballx-element.ballradius < element.ballradius/10 || element.ballx+element.ballradius > canvas.width - element.ballradius/10){
                        element.ballVA = (360 - element.ballVA)%360
                    }
                    if (element.bally-element.ballradius < element.ballradius/10 ){
                        element.ballVA = (180 - element.ballVA ) % 360
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

    var update = function(){
        if(!paused){
            c.clearRect(0,0,canvas.width,canvas.height)
            drawBall(balls)
            drawBat()
            drawScore()
            drawTime()
            updateSpeed()
        }
    }

	canvas.addEventListener('mousemove',function(e){
		var x = e.pageX - canvas.offsetLeft
		batx = x
	})

    canvas.addEventListener('click',function(e){
        balls.push(getNewBall())
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