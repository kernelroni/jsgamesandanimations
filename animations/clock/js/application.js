var canvas,context;
canvas = document.createElement("canvas");
canvas.width = window.innerWidth-20;
canvas.height = window.innerHeight-130;
context = canvas.getContext("2d");

var Point = function(){
this.x = Math.random() * canvas.width;
this.y = Math.random() * canvas.height;

this.x = canvas.width/2;
this.y = canvas.height/2;

this.r = 5;

this.width = 100;

this.dx = 2;
this.dy = -2;
this.gravity = 0.1 + Math.random();
this.timer = 0.5;
this.m = 1;

//this.theta = Math.random() * 360;

this.T = 270;
this.theta = 270 ;
this.thetaUnit = 6;

this.drawCircle = drawCircle;
this.drawSecond = drawSecond;
this.drawMinute = drawMinute;
this.drawHour = drawHour;

}

var points = new Array();

var second = new Point();
var minute = new Point();
var hour = new Point();


second.width = 120;
minute.width = 100;
hour.width = 80;


var clockImg = new Image();
clockImg.src = "image/clock.jpg";

window.onload = function(){
var curvecanvas = document.getElementById("coincanvas");	
curvecanvas.appendChild(canvas);


setInterval(animate,1000);




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
context.lineCap="round";
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
	//context.drawImage(clockImg,0 ,-30);
	
	
	second.drawSecond();
	minute.drawMinute();
	hour.drawHour();
	

}
