canvas.addEventListener("mouseup", onMouseUp, false);
canvas.addEventListener("mousemove", onMouseMove, false);



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
		
		BallArray[k].x = mouseX;
		BallArray[k].y = mouseY;
		
		//BallArray[k].dy =  BallArray[k].gravity * BallArray[k].timer ;
		//BallArray[k].dx = BallArray[k].dx * BallArray[k].timer;	
		
		BallArray[k].gravity = Math.random()*10;
	}
	
	console.log(BallArray);
	
}


function onMouseMove(event){
	
	var mouseX,MouseY;
	mouseX = event.pageX;
	mouseY = event.pageY;
	/*
	for(var k = 0; k<=totalBall-1; ++k){
		
		
		if(BallArray[k].x > mouseX){			
			BallArray[k].x = -1 * BallArray[k].x;			
		}else{			
			BallArray[k].x = Math.abs(BallArray[k].x);	
		}
		
		
		if(BallArray[k].y > mouseY){			
			BallArray[k].y = -1 * BallArray[k].y;			
		}else{			
			BallArray[k].y = Math.abs(BallArray[k].y);	
		}
	}
	*/
	
}






