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
		clicky : 0
}
var TOTAL_BUBBLE = 50;
var Balls = new Array();
var BallRadius = 20;

var Bubble = function(){
this.x = Math.random() * canvas.width;
this.y = Math.random() * canvas.height/5;

//this.x = canvas.width/2;
//this.y = canvas.height/2;
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

var clockImg = new Image();
clockImg.src = "image/clock4.jpg";

window.onload = function(){
var bubblecanvas = document.getElementById("bubblecanvas");	
bubblecanvas.appendChild(canvas);

prepareAllBalls();
putBubbles();

Target.draw();


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

function drawSecond(){
	
var newx,newy;

var date = new Date();
var seconds = date.getSeconds();
var theTheta = this.T + (seconds*this.thetaUnit);


newy = this.y + Math.sin(theTheta * Math.PI/180) * this.width;
newx = this.x + Math.cos(theTheta * Math.PI/180) * this.width;


context.beginPath();
context.fillStyle = "black";
context.strokeStyle = "white";
context.lineWidth = 2;
context.moveTo(this.x, this.y);
context.lineTo(newx,newy);

context.stroke();
context.closePath();


this.drawCircle(newx,newy);
	//console.log(this);
}



function drawMinute(){
	
var newx,newy;

var date = new Date();
var minute = date.getMinutes();
var theTheta = this.T + (minute*this.thetaUnit);


newy = this.y + Math.sin(theTheta * Math.PI/180) * this.width;
newx = this.x + Math.cos(theTheta * Math.PI/180) * this.width;


context.beginPath();
context.fillStyle = "black";
context.strokeStyle = "yellow";
context.lineWidth = 4;
context.lineCap="round";
context.moveTo(this.x, this.y);
context.lineTo(newx,newy);

context.stroke();
context.closePath();


	//console.log(this);
}


function drawHour(){
	
var newx,newy;

var date = new Date();
var hour = date.getHours() % 12;
var theTheta = this.T + (hour*30) + date.getMinutes()/2 ;



newy = this.y + Math.sin(theTheta * Math.PI/180) * this.width;
newx = this.x + Math.cos(theTheta * Math.PI/180) * this.width;

context.beginPath();
context.fillStyle = "black";
context.strokeStyle = "yellow";
context.lineWidth = 8;
context.lineCap = "round";
context.moveTo(this.x, this.y);
context.lineTo(newx,newy);

context.stroke();
context.closePath();
	//console.log(this);
}






function updateBallPos(){
	
	
}


function animate(){
	
	
	context.clearRect(0,0,canvas.width,canvas.height);
	//context.drawImage(clockImg,canvas.width/2 - 240 ,canvas.height/2 - 243);
	context.drawImage(clockImg,0 ,-30);
	
	
	second.drawSecond();
	minute.drawMinute();
	hour.drawHour();
	

}
