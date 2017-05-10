var canvas,context;
canvas = document.createElement("canvas");
//canvas.width = window.innerWidth;
//canvas.height = window.innerHeight;

canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight - 200;

context = canvas.getContext("2d");

var totalIteration = 0;
var backgroundPos = 0;
var BirdLife = 1; //
var mouseDown = 0;
var TopHeightRation = 0.3;
var BottomHeightRation = 0.6
var BarInTop = 4;
var BarInBottom = 6;
var AllBars = new Array();
var Bar = function(){
	
	
	this.x = 0;
	this.y = 0;
	this.width = 100;
	this.height = Math.random() * (canvas.height * TopHeightRation);
	this.dx = 2;
	this.position = "top";
	this.color = "red";
	this.strokecolor = "yellow";
	this.draw = drawBar;
	
}


var Bird = function(){

	this.index = 1; 
	this.x = 300;
	this.y = 300;
	this.dx = 2;
	this.dy = 2;
	this.gravity = 1.05;
	this.antigravity = 0.5;
	this.timer = 1;
	
	this.folder = "image";
	this.name = "bird" + this.index + ".png";
	this.draw = drawBird;
	
	this.img = new Image();
	
	this.img.src = this.folder + "/" + this.name;
	
	
}





var Point = function(maxHeight){
this.x = Math.random() * canvas.width;
this.y = Math.random() * maxHeight;
this.dx = 2;
//this.x = canvas.width/2;
//this.y = canvas.height/2;
this.r = 2;
this.color = "yellow";
this.index = 0;
this.draw = putPoint;



}






var bird = new Bird();	

window.onload = function(){
	

var birdcanvas = document.getElementById("birdcanvas");	
birdcanvas.appendChild(canvas);

init();



requestAnimationFrame(run);
//setInterval(updateBird,200);
//requestAnimationFrame(updateBird);





}



function run(){

	totalIteration++;

	context.clearRect(0,0,canvas.width,canvas.height);
	bird.draw();
	drawAllBar();
	
	// if Bird is live
	if(BirdLife){
		
		updateAllBar();
		updateBackground();
	
		if(totalIteration % 10 == 0){
			
			
			updateBird();
			
		}
		
		// long number
		if(totalIteration > (Number.MAX_VALUE - 20) ) totalIteration = 0;
	
		
		if(mouseDown){
		bird.y -= bird.antigravity * bird.dy;
		}else{
		bird.y += bird.gravity * bird.dy;	
		}
		
		
		
	}
	
	// repeat animation
	requestAnimationFrame(run);
	
}




