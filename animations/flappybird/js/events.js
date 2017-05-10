canvas.addEventListener("mouseup",function(event){
	
	//bird.dy += bird.gravity * bird.timer * 10;
	bird.y -= 10;
	
	bird.dy = 2;
	
	mouseDown = 0;
	
	//BirdLife = 0;
	
	
});



canvas.addEventListener("mousedown",function(event){
	
	mouseDown = 1;
	//bird.dy = -2;
	
});