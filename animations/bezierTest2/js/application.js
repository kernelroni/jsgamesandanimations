var canvas,context;
canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context = canvas.getContext("2d");

var Point = function(){
this.x = Math.random() * canvas.width;
this.y = Math.random() * canvas.height;
this.r = 50;

this.dx = 2;
this.dy = -2;
this.gravity = 5;//0.1 + Math.random();
this.timer = 0.5;
this.m = 5;

this.draw = drawCircle;
}

var points = new Array();


window.onload = function(){
var curvecanvas = document.getElementById("curvecanvas");	
curvecanvas.appendChild(canvas);

//context.beginPath();
//context.fillStyle = "black";
//context.fillRect(0,0,canvas.width,canvas.height);
//context.closePath();

var p1 = new Point();
var p2 = new Point();
var p3 = new Point();
var p4 = new Point();

points.push(p1);
points.push(p2);
points.push(p3);
points.push(p4);

p1.draw();
//p2.draw();
//p3.draw();
p4.draw();


//drawBezierCurve();

setInterval(animate,1000/60);
}


function drawCircle(){
	
context.beginPath();
context.fillStyle = "white";
context.strokeStyle = "white";
context.lineWidth = 2;
context.arc(this.x, this.y, this.r, 0,  Math.PI * 2);
context.stroke();
context.closePath();
	
}


function drawBezierCurve(){
context.beginPath();
context.fillStyle = "white";
//context.strokeStyle = randomHsl();
context.strokeStyle = "white";
context.lineWidth = 2;
context.moveTo(points[0].x,points[0].y)
context.bezierCurveTo(points[1].x,points[1].y,points[2].x,points[2].y,points[3].x,points[3].y);
/*
context.quadraticCurveTo(points[1].x,points[1].y,points[2].x,points[2].y);

context.moveTo(points[0].x,points[0].y)
context.quadraticCurveTo(points[1].x,points[1].y,points[3].x,points[3].y);


context.moveTo(points[0].x,points[0].y)
context.quadraticCurveTo(points[3].x,points[3].y,points[1].x,points[1].y);
*/

context.stroke();
context.closePath();
}


function updatePointXY(){
	
	for(var i = 0; i<=points.length-1; ++i){
		
		points[i].dy += points[i].gravity * points[i].timer;
		points[i].y += points[i].dy * points[i].timer;
		
		points[i].x += points[i].dx * points[i].timer;
		
		
		if(points[i].y>canvas.height){  
		points[i].dy *=-1;
		points[i].y = canvas.height;
		}
		
		
		if(points[i].y<0) {
			points[i].dy *= Math.abs(points[i].dy);
			
			
		}
		
		
		if(points[i].x>canvas.width) points[i].dx *=-1;
		if(points[i].x<0) points[i].dx = Math.abs(points[i].dx);
		
		
		
	}
	
	
}

function animate(){

context.beginPath();
context.fillStyle = "rgba(0,0,0,1)";
context.fillRect(0,0,canvas.width,canvas.height);
context.closePath();

points[0].draw();
//points[1].draw();
//points[2].draw();
points[3].draw();


//console.log(points);
updatePointXY();	
drawBezierCurve();
	
}

function randomHsl() {
    return 'hsla(' + (Math.random() * 360) + ', 100%, 50%,1)';
}
