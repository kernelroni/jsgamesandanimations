var result = {
	
	
};
var planeTimer = null;
var planeTimerHideF = null;

var totalPlane = 15 ;
var imgIndex = 0;
var planeIntervel = 4000; // 2 sec
var imgDirection = [0,40,39,38,39,39,38,40,40,37,39,39,37,38,37,39];
var imgResult = [0] ;
var keyhitted = false;
var freeToHit = true;


function showPlane(){
	
	keyhitted = false;
	freeToHit = true;
	
	if(imgIndex < totalPlane){
		imgIndex++;
		jQuery(".imgplane").hide();
		jQuery("img#image-" + imgIndex).show();
		
		planeTimer = setTimeout(showPlane,planeIntervel);
		planeTimerHideF = setTimeout(hidePlane,planeIntervel-1000);
	}else{
		
		setTimeout(showThankyouPage,planeIntervel-2000);
		
	}
	
	
	
}

function hidePlane(){
		keyhitted = false;
		freeToHit = false;
		
		if(!imgResult[imgIndex]){
		imgResult[imgIndex] = 0;
		}
		
		
		jQuery(".imgplane").hide();
}

function checkAndChange(e){
	
	var dir = e.which;
	
	if(!keyhitted) return false;
	
	if(dir == imgDirection[imgIndex]){
		
		//console.log("Right");
		imgResult[imgIndex] = dir;

	}else{
		imgResult[imgIndex] = 0;
		//console.log("Wrong");
	}
	
		clearTimeout(planeTimer);
		clearTimeout(planeTimerHideF);
		//showPlane();
		hidePlane();
		setTimeout(showPlane,1000);
	
	
	
	//console.log(e.which);
}



jQuery(document).ready(function(){
	

	showScreen("01");
	jQuery(document).on("click","a.clicktobegin", function(){	
	
		showScreen(2);	
		setTimeout(showPlane,planeIntervel-2000);
	});	
	
	jQuery(document).on("click","button.btnNextOverview", function(evt){
		
	var nextScreen = $(this).attr("data-next-screen");
	showScreen(nextScreen);
	
	});		
	
	$(document).keyup(function(e) {
		
		if(!freeToHit) return false;
		
		if(imgDirection.indexOf(e.which)>0){
			keyhitted = true;
			freeToHit = false;
		}else{
			return false;
		}
		
		
		
		checkAndChange(e);
		e.preventDefault(); // prevent the default action (scroll / move caret)
	});
	
	
	
});

// show game screens having screen{id}
function showScreen(n){	
	$(".container").hide();
	$("div#screen"+n).show();
}



function showThankyouPage(){
	freeToHit = false;
	clearTimeout(planeTimer);
	
	console.log(imgDirection);
	console.log(imgResult);
	showScreen(3);	
}
