var canvas,context;
canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

//canvas.width = 500;
canvas.height = window.innerHeight - 15;

context = canvas.getContext("2d");

var Mouse = {
		x:0,
		y:0,
		clickx :0,
		clicky : 0,
		angle : 0,
		yByx : 0,
}
var TOTAL_BUBBLE = 50;

var NumberOfRow = 5;
var Balls = new Array(NumberOfRow);
var BallRadius = 20;
var ArrowSize = 100;
var Incrementer  = 0;

console.log(Balls);

var ballWidth = BallRadius * 2;
var ballHeight = BallRadius * 2;
var ballPerRow = Math.floor(canvas.width / ballWidth);


var Bubble = function(){
this.x = Math.random() * canvas.width;
this.y = Math.random() * canvas.height/5;
this.i = 0;
this.j = 0;


this.r = BallRadius;
this.color = "yellow";
this.strokecolor = "red";
this.index = 0;
this.draw = putBubble;

}


var TargetBall = function(){
	
	this.x = canvas.width/2;
	this.y = canvas.height - BallRadius*2;
	this.dx = -2;
	this.dy = -2;
	this.r = BallRadius;
	this.color = "yellow";
	this.strokecolor = "red";
	this.index = 0;
	this.draw = putBubble;
	
	
}

var Target = new TargetBall();
var Bullet = new TargetBall();

var clockImg = new Image();
clockImg.src = "image/clock4.jpg";

window.onload = function(){
var bubblecanvas = document.getElementById("bubblecanvas");	
bubblecanvas.appendChild(canvas);

prepareAllBalls();
putBubbles();

Target.draw();

setInterval(run,1000/60);

}

function run(){
	
	context.clearRect(0,0,canvas.width,canvas.height);
	
	//prepareAllBalls();
	putBubbles();
	drawArrow();
	Target.draw();
	
	Bullet.draw();
	shoot();
}

function shoot(){
	
	var newx,newy;

	var tanYbyX = Mouse.yByx;

	var theTheta = 270; 
	var theTheta = Math.atan(tanYbyX) * 180 / Math.PI;

		if(theTheta>0){
		theTheta = 180 + Math.atan(tanYbyX) * 180 / Math.PI;
		}


		Bullet.x = Bullet.x + Math.cos(theTheta * Math.PI/180) * Incrementer;
		
		
		Bullet.y = Bullet.y + Math.sin(theTheta * Math.PI/180) * Incrementer;
		

	
		
		
		
	Incrementer+=0.5;
}


function getRandomColor(){
	
	var color = "0123456789ABCDEF".split("");
	var rgb = "#";
	for(var i=0; i<=5; ++i){
	
	rgb += color[Math.round(Math.random()*15)];
		
	}


	return rgb;
}


function drawCircle(newx,newy){
	
context.beginPath();
context.fillStyle = "black";
context.strokeStyle = "white";
context.lineWidth = 2;
context.arc(newx, newy, this.r, 0,  Math.PI * 2);
context.stroke();
context.closePath();
	//console.log(this);
}


function drawArrow(){
	
var Theta = 270;
var mouseX = Mouse.x;
var mouseY = Mouse.y;
var BaseX = Target.x;
var BaseY = Target.y;
var newx,newy;

var tanYbyX = (BaseY - mouseY)/(BaseX - mouseX);

var theTheta = 270; 
var theTheta = Math.atan(tanYbyX) * 180 / Math.PI;

	if(theTheta>0){
	theTheta = 180 + Math.atan(tanYbyX) * 180 / Math.PI;
	}



newy = Target.y + Math.sin(theTheta * Math.PI/180) * ArrowSize;
newx = Target.x + Math.cos(theTheta * Math.PI/180) * ArrowSize;


context.beginPath();
context.fillStyle = "yellow";
context.strokeStyle = "yellow";
context.lineWidth = 10;
context.lineCap="round";
context.moveTo(Target.x, Target.y);
context.lineTo(newx,newy);

context.stroke();
context.closePath();


	
}


function updateBallPos(){
	
	
}

