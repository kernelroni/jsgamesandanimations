
// functions


function wrapCanvas(){
    context.beginPath();
    context.rect(0, 0, canvasWidth, canvasHeight);

    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.stroke();
 }


// initialization function
function init(){

var object;
	for(i = 0; i<=totalBall-1; ++i){
		//var randomcolor = getRandomColor();
		object = new Ball();
		object.color = getRandomColor();
		object.dx = Math.random() * 50;
		BallArray.push(object);
		//BallArray[i].color = getRandomColor();
		
	}

}


function getRandomColor(){
	
	var color = "0123456789ABCDEF".split("");
	var colorhex = "#";
	
	
	for(var j=0; j<=5; ++j){
		
		colorhex += color[Math.round(Math.random()*15)];
	}
	
	return colorhex;
	
}
function drawBall() {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI*2);
    context.fillStyle = this.color;
    context.fill();
    context.closePath();
}


function collision(){
	
	this.dy +=  this.gravity * this.timer;
	this.y += this.dy;// * this.timer;
	
	if(this.y + this.r > canvasHeight) 
		{
		this.dy *= -1 * this.gravity;
		this.y = canvasHeight - this.r;
		}
	
	this.x += this.dx * this.timer;
	
	
	if(this.x + this.r > canvasWidth) this.dx *= -1;
	
	if(this.x - this.r < 0) this.dx = Math.abs(this.dx);
	
	console.log(this.y);
	
}

function draw_everything(){
	
	context.clearRect(0,0,canvasWidth,canvasHeight);
	
	for(i = 0; i<=totalBall-1; ++i){
		
		BallArray[i].move();
		BallArray[i].draw();
		
	}
	
	
}




console.log(getRandomColor());


init();
wrapCanvas();
//draw_everything();
setInterval(draw_everything,1000/60);