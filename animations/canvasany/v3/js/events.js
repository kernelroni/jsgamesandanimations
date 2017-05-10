canvas.addEventListener("mouseup", onMouseUp, false);


function onMouseUp(event){
	
	var mouseX,MouseY;
	mouseX = event.pageX;
	mouseY = event.pageY;
	
	for(var k = 0; k<=totalBall-1; ++k){
		/*
		if(BallArray[k].x > mouseX) BallArray[k].x = -1 * Math.random() * (BallArray[k].x - mouseX);
		
		if(BallArray[k].x < mouseX) BallArray[k].x =  Math.random() * (mouseX - BallArray[k].x);
		
		if(BallArray[k].y >  mouseY) BallArray[k].y = Math.random() * mouseY;
		*/
		
		//BallArray[k].x = mouseX;
		BallArray[k].y = mouseY;
		
		BallArray[k].gravity = Math.random();
	}
	
	console.log(BallArray);
	
}









