// get random rgb color;
function getRandomColor(){	
	
	var color = "0123456789ABCDEF".split("");
	var rgb = "#";
	
	for(var i=0; i<=5; ++i){	
	rgb += color[Math.round(Math.random()*15)];		
	}

	return rgb;
}


// get bubble color;

function getFixedRandomColor(){	
	
	var colors = new Array("white","red","green","blue","yellow","pink", "magenta", "teal");
		
	var totalcolor = colors.length;	
	return colors[Math.ceil(Math.random() * totalcolor)];
}


// initialize all bubbles
function prepareAllBalls(){

var ball;	
var ballWidth = BallRadius * 2;
var ballHeight = BallRadius * 2;
var ballPerRow = canvas.width / ballWidth;
var NumberOfRow = 5;
	
	for(var i=0; i<=NumberOfRow-1; ++i){
		

		
		for(var j=0; j<=ballPerRow-1; ++j){
			ball = new Bubble();
			ball.color = getFixedRandomColor();
			ball.strokecolor = getRandomColor();
			
			
			ball.x = BallRadius + (j*ballWidth);
			ball.y = BallRadius + (i*ballHeight);
			
			Balls.push(ball);
			//if(i == NumberOfRow-1) break;
		}
		
		
		
	}
	
	console.log(Balls);
	
}


// put single bubble inside canvas

function putBubble(){
	
context.beginPath();
context.fillStyle = this.color;
context.strokeStyle = this.strokecolor;
context.lineWidth = 2;
context.arc(this.x, this.y, this.r, 0,  Math.PI * 2);
context.stroke();
context.fill();
context.closePath();
	//console.log(this);
}


// put all bubbles 

function putBubbles(){
	
	for(var i=0; i<=Balls.length-1; ++i){
		
		Balls[i].draw();
	}
}

