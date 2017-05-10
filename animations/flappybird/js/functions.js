

function init(){
	
	var barGapInTop = (canvas.width - bird.x) / BarInTop;
	var barGapInBottom = (canvas.width - bird.x) / BarInBottom;
	
	for(var i=0; i<=BarInTop-1; ++i){
		
		var tbar = new Bar();
		tbar.x = (i+1) * barGapInTop;
		tbar.color = getRandomColor();
		tbar.strokecolor = getRandomColor();
		tbar.position = "top";
		AllBars.push(tbar);
		
	}
	
	
	for(var i=0; i<=BarInBottom-1; ++i){
		
		var bbar = new Bar();
		bbar.x = (i+1) * barGapInBottom;
		bbar.y = canvas.height;
		bbar.height = -Math.random() * (canvas.height * BottomHeightRation);
		bbar.color = getRandomColor();
		bbar.strokecolor = getRandomColor();
		bbar.position = "bottom";
		AllBars.push(bbar);
		
	}	
	
	
	console.log(AllBars.length)
	
}


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


function putCircle(x,y){
	
context.beginPath();
context.fillStyle = "black";
context.strokeStyle = "white";
context.lineWidth = 2;
context.arc(x , y , 2, 0,  Math.PI * 2);
context.stroke();
context.fill();
context.closePath();


//console.log(x + " " + y);
}


function drawBar(){
	
context.beginPath();
context.fillStyle = this.color;
context.strokeStyle = this.strokecolor;
context.lineWidth = 10;
context.rect(this.x,this.y,this.width,this.height);
context.stroke();
context.fill();
context.closePath();

isBirdInsideBar(context);

	//console.log(this);
}


function drawAllBar(){
	
	for(var i=0; i<=AllBars.length-1; ++i){
		
		AllBars[i].draw();
	}
	
	
	
}



function updateAllBar(){
	
	for(var i=0; i<=AllBars.length-1; ++i){
		
		
		AllBars[i].x -= AllBars[i].dx;
		
		
		if(((AllBars[i].x + AllBars[i].width) < 0)){
			
			//console.log(AllBars.length);	
			
			if(AllBars[i].position == "top"){
				
			AllBars[i].x = Math.random() * 300 + canvas.width;	
			AllBars[i].height = Math.random() * (canvas.height * TopHeightRation);	
					
			}else if(AllBars[i].position == "bottom"){
				
			AllBars[i].x = Math.random() * 300 + canvas.width;			
			AllBars[i].height = -Math.random() * (canvas.height * BottomHeightRation);
			
			}
			
		}
	}
	
	
}


function drawBird(){
	
	
	context.beginPath();
	context.drawImage(this.img,this.x,this.y,80,60);
	
	putCircle(this.x + 20 ,this.y + 10);
	context.closePath();
	
	
	
	//console.log(this);
	
	
}



function updateBird(){
	
	
	
	bird.index = (bird.index%4);
	bird.index++;
	bird.name = "bird" + bird.index + ".png";
	bird.img.src = bird.folder + "/" + bird.name;
	

	

	
	//console.log(bird);

}

function updateBackground(){
	canvas.style.backgroundPosition = backgroundPos + "px bottom" ;
	backgroundPos-=1;
	
}

function isBirdInsideBar(context){
	
	
		
		if(context.isPointInPath(bird.x+20,bird.y+10)){
			//BirdLife = 0;
		}
			
	
	
}