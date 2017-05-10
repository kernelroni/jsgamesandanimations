var screen = 1;
var lastKey = 1;
var result = {
	reaction : []
};
var start = 1;
var baseTime = 500;
var randomTimeMax = 1500;
var timerFlag = null;
var images = new Array("imgBlueSingle","imgOrangeSingle");
var attempt = {};
var reactionTimer = null;
var Clock = function(){
	this.start = 0,
	this.end = 0
}
var gameDuration = 60000; // millisecond ;
var gameTimeout = false;
var clockObj = null;

var totalCircleToShow = 2
var circleShowCount = 0;

var timerInterval = 100;
var lavelDuration = 60000; // seconds
var progressWidth = 310;

function log(msg){
	console.log(msg);
}

// show game screens having screen{id}
function showScreen(n){
	
	$(".container").hide();
	$("div#screen"+n).show();
}


// On key up calculate game result
function gameOnKeyUp(e){
	log("key up")
	var code = e.keyCode || e.which;
	lastKey = code;
	if(screen == 1){
	screen = 2 ;
	showScreen(2);
	log("screen 2 showing");
	}else if(screen == 2){

		
	}else if(screen == 3){

		calculateResult();
		
	}else if(screen == 4){
		
		alert("Will be redirected to the game page now.");
	}
	//console.log(screen);
	//console.log(code);

}

// document ready
jQuery(document).ready(function(){
	
	$(document).on("keyup",gameOnKeyUp);
	
	jQuery(document).on("click","button.btnNextOverview", function(){
	var nextscreen = $(this).attr("data-next-screen");
	showScreen(nextscreen);
	});		
	
	jQuery(document).on("click","a.clicktobegin",function(){
		
		screen = 3;
		showScreen(3);
		
		jQuery("img.singleImage").hide();
	
		
		log("screen 3 showing");
		result.startTime = new Date().getTime();
		startTheGameLoop();
		
		
		lavel1timer = setInterval(updateProgressBar,timerInterval);
		lavel1timeovertimer = setTimeout(lavel1Timeout,lavelDuration);			
		
		// game ending time
		setTimeout(gameEnd,lavelDuration);
		
	})
	
});


// Game loop
function startTheGameLoop(){
	

	
	var randomTime = getRandomTime();
	
	if(!gameTimeout){
		setTimeout(displayRandomImage,randomTime);
		reactionTimer = setTimeout(noReactionTaken,2*randomTime);
		
		
	
		++circleShowCount;
	}
}

function calculateResult(){
	
	log("Calculate Result");
	clockObj.end = new Date().getTime();
	if(reactionTimer){
		
	  hideAllSingleImage();
	  clearTimeout(reactionTimer);
	  
	  reaction();
	  startTheGameLoop();
	}
	
	
	
	
}

function hideAllSingleImage(){
	$("img.singleImage").hide();
	log("hideAllSingleImage");
}


function displayRandomImage(){
	clockObj = new Clock();
	log("displayRandomImage");
	var imgId =  images[Math.floor(Math.random()*images.length)];
	hideAllSingleImage();
	$("img#"+imgId).show();
	clockObj.start = new Date().getTime();
	clockObj.imgId = imgId;
	
	
}

function noReactionTaken(){
	clockObj.key = 0;
	clockObj.end = new Date().getTime();
	log("noReactionTaken");
	result.reaction.push(clockObj);
	hideAllSingleImage();
	startTheGameLoop();
	
}


function updateProgressBar(){
		
	var pwidth = parseFloat(jQuery("#screen3 .lavelprogressbar").attr("data-width"));
	pwidth -=  parseFloat(progressWidth/(lavelDuration/timerInterval) );
	jQuery("#screen3 .lavelprogressbar").css({width:pwidth+"px"});
	jQuery("#screen3 .lavelprogressbar").attr("data-width",pwidth);
		
		
}

function lavel1Timeout(){		
	
	
	console.log("lael 1 Timeout");
	
	if(currentLevel<=9){
		playLevel(currentLevel-1);
	}else{
		setTimeout(showThankyouPage,numberIntervel);
	}
			
}

// when user hit any key on game 
function reaction(){
	clockObj.key = lastKey;	
	result.reaction.push(clockObj);
	log(result);
	
}

function reactionTimeout(){
	
}

function getRandomTime(){
	
	return ( Math.random() * randomTimeMax ) + baseTime;
}


// Post result to server from this function
function gameOver(){
	//console.log(result);
	//alert(JSON.stringify(result));
	//alert("game is over");
	
	screen = 4;
	showScreen(4);

}

function gameEnd(){
	console.log("game end");
	clearTimeout(reactionTimer);
	gameTimeout = true;
	
	result.endTime = new Date().getTime();
	gameOver();
}
