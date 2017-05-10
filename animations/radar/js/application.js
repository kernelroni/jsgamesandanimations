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



var Rader = function(){
this.x = canvas.width/2;
this.y = canvas.height/2;


this.theta = 0;
this.r = canvas.height*0.80/2;
this.color = "yellow";
this.strokecolor = "red";
this.index = 0;
this.draw = drawRader;
this.drawScanner = drawScanner;

}


var RR = new Rader();
var RS = new Rader();
var RS2 = new Rader();

RS.strokecolor = "green";
RS2.strokecolor= "blue";
RS2.r = 50;


function run(){
	
	//context.clearRect(0,0,canvas.width,canvas.height);
	
	context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);

   
    context.fillStyle = 'rgba(0,0,0,0.01)';
    context.fill();
    context.closePath();
	
	RR.draw();
	RS.drawScanner();
	RS2.drawScanner();
	RS.theta-=0.5;
	RS2.theta+=2;
	
	if(RS.theta<= -360) { 
		RS.theta = 0;	
	}
	if(RS2.theta>=360){
		
		RS2.theta = 0;
	}
	
	
}


window.onload = function(){
	var radercanvas = document.getElementById("radercanvas");	
	radercanvas.appendChild(canvas);

	setInterval(run,1000/60);
	
	run();
	

}


function drawScanner(){
	
	var newx,newy;



	newy = this.y + Math.sin(this.theta * Math.PI/180) * this.r;
	newx = this.x + Math.cos(this.theta * Math.PI/180) * this.r;


	context.beginPath();
	context.fillStyle = "black";
	context.strokeStyle = this.strokecolor;
	context.lineWidth = 2;
	context.moveTo(this.x, this.y);
	context.lineTo(newx,newy);

	context.stroke();
	context.closePath();


	
		//console.log(this);
}

