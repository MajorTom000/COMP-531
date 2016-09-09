'use strict'

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")


	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	var allBlg = []

	var sunx = 0;
	var suny = canvas.height/4;

	var carh = 20;
	var carw = 40;
	var carx = 0;
	var cary = floor - carh - 4; 

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2
		var blgColor = blgColors[ Math.floor(Math.random()*blgColors.length)]
		allBlg.push({x0:x0,blgWidth:blgWidth,blgHeight:blgHeight,blgColor:blgColor})

		update();
	}

	var drawBuilding = function(){
		allBlg.forEach(function(building){
			c.fillStyle= building.blgColor
			c.fillRect(building.x0, floor - building.blgHeight, building.blgWidth, building.blgHeight)

			for (var y = floor - floorSpacing; y > floor - building.blgHeight; y -= floorSpacing + windowHeight) {
				for (var x = windowSpacing; x < building.blgWidth - windowWidth; x += windowSpacing + windowWidth) {
					c.fillStyle= Math.random() > 0.5 ? "yellow" : "black";
					c.fillRect(building.x0 + x, y - windowHeight, windowWidth, windowHeight)
				}
			}
		})

	}

	var drawSun = function(){
		sunx = (sunx + canvas.width/10)%canvas.width;
		suny = 60 + Math.sin(sunx)*30;
		drawCircle(sunx,suny,c);
	}

	var drawCar = function(){
		carx = (carx + canvas.width/12)%canvas.width
		c.fillStyle = 'blue'
		c.fillRect(carx,cary,carw,carh);
		c.fillRect(carx+carw,cary+carh/2,carw/4,carh/2);
		c.fillStyle = 'black'
		c.beginPath()
		c.arc(carx+10,floor,8,0,2*Math.PI)
		c.closePath()
		c.fill()
		c.beginPath()
		c.arc(carx+30,floor,8,0,2*Math.PI)
		c.closePath()
		c.fill()
	}

	var update = function(){
		c.clearRect(0,0,canvas.width,canvas.height);
		c.fillStyle=grad
		c.fillRect(0, floor, canvas.width, canvas.height)
		
		drawSun();
		drawBuilding();
		drawCar();
	}


	canvas.addEventListener('click',function(e){
		var x = e.pageX - canvas.offsetLeft;
		var y = e.pageY - canvas.offsetTop;
		allBlg.forEach(function(building){
			if (y>floor-building.blgHeight && y < floor && x >building.x0 && x < building.x0 + building.blgWidth){
				building.blgHeight += 20
			}
		})
	})

	return {
		build: build,
		update: update
	}
}

function drawCircle(x,y,ctx){
  ctx.beginPath();
  ctx.arc(x,y,20,0,Math.PI*2);
  ctx.closePath();
  ctx.fillStyle='yellow';
  ctx.fill();
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = app.build
	setInterval(app.update, 200)
}


