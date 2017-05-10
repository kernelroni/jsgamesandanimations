var questionIndex = 0;
var levelTimeInterval = null;
var lavelTimerTimeout = null;
var timerInterval = 100;
var progressWidth = 300;
var lavelDuration = 0; 


var totalSquares = 30; // 6x6 = 0 - 35
var level1SquareFlag = [];
var levelIndex = 1; // max 3
var canClick = 0;
var currentround = 0;


var levelSettings = [
	{},
	{
		"level" : 1,
		"orangeSquare" : 7,
		"currentround" : 0,
		"roundCompleted" : 0,
		"duration" : 5, // seconds
		"clickCount" : 0,
		"wrongAttempt" : 0
	},
	{
		"level" : 2,
		"orangeSquare" : 8,
		"currentround" : 0,
		"roundCompleted" : 0,
		"duration" : 5, // seconds	
		"clickCount" : 0,
		"wrongAttempt" : 0		
	},
	{
		"level" : 3,
		"orangeSquare" : 9,
		"currentround" : 0,
		"roundCompleted" : 0,
		"duration" : 5, // seconds
		"clickCount" : 0,
		"wrongAttempt" : 0		
		
		
	},	

];

function consolelog(msg){
	
	console.log(msg);
}

function getRandomSquare(n){
	var arr = [];
	while(arr.length < n){
	  var randomnumber=Math.ceil(Math.random() * (totalSquares-1))
	  var found=false;
	  for(var i=0;i<arr.length;i++){
		if(arr[i]==randomnumber){found=true;break}
	  }
	  if(!found)arr[arr.length]=randomnumber;
	}
	
	return arr;
}


function loadSquaresInOverview(nSquare){
	var i=0;
	var div = jQuery("<div class='square'></div>");
	var random7 = getRandomSquare(nSquare);
	//console.log(random7);
	for(i=0; i<totalSquares; ++i){
		jQuery(div).attr("data-id",i);
		var cloneDiv = jQuery(div).clone();
		
		jQuery(cloneDiv).attr("data-id",i);
		if(random7.indexOf(i)>=0){
			jQuery(cloneDiv).addClass("orange activeSquare");
			jQuery(cloneDiv).attr("data-active",1);
		}
		
		jQuery(".overview").append(cloneDiv);
		
	}
	
}

function loadEmptySquaresIn(){
	consolelog("loadEmptySquaresIn");
	var i=0;
	var div = jQuery("<div class='square'></div>");

	for(i=0; i<totalSquares; ++i){		
		var cloneDiv = jQuery(div).clone();		
		jQuery("#squaresGameBoard").append(cloneDiv);		
	}
	
}

function emptyGameBoard(){

	consolelog("emptyGameBoard");
	jQuery("#memorizeInfo").hide();
	jQuery("#clickInfo").hide();
	jQuery("#squaresGameBoard").empty();
	loadEmptySquaresIn();	
}




function loadSquaresIn(nSquare){
	consolelog("loadSquaresIn");
	var i=0;
	var div = jQuery("<div class='square'></div>");
	var random7 = getRandomSquare(nSquare);
	
	currentround++;// = 
	++levelSettings[levelIndex].currentround;	
	
	if(currentround>=7) { 
	levelSettings[levelIndex].currentround = 0;	
	}
	jQuery("#currentround").html(currentround);
	//console.log(random7);
	for(i=0; i<totalSquares; ++i){
		jQuery(div).attr("data-id",i);
		var cloneDiv = jQuery(div).clone();
		
		jQuery(cloneDiv).attr("data-id",i);
		if(random7.indexOf(i)>=0){
			jQuery(cloneDiv).addClass("orange activeSquare");
			jQuery(cloneDiv).attr("data-active",1);
		}
		
		jQuery("#squaresGameBoard").append(cloneDiv);
		
	}
	
}




function showClickableBoard(){
	
	consolelog("showClickableBoard");
	var duration = lavelDuration = levelSettings[levelIndex].duration * 1000;
	

	
	if(currentround<=1){
	jQuery("#memorizeInfo").hide();
	jQuery("#clickInfo").show();
	}
	jQuery("#squaresGameBoard div").removeClass("orange");
	
	canClick = true;
	levelTimeInterval = setInterval(updateProgressBar,timerInterval);
	lavelTimerTimeout = setTimeout(lavelTimeout,duration);	
	
	
}

function showGameBoard(){	
	
	consolelog("showGameBoard");
	levelSettings[levelIndex].clickCount = 0;
	
	jQuery("#squaresGameBoard").empty();
	
	jQuery(".lavelprogressbar").attr("data-width",progressWidth).css("width","100%");
	if(currentround<=1){
	jQuery("#memorizeInfo").show();
	jQuery("#clickInfo").hide();
	}
	
		loadSquaresIn(levelSettings[levelIndex].orangeSquare); // load board with 7 orange square;
		
		setTimeout(showClickableBoard,3000);
		
}




function roundCehck(div){
	
	consolelog("roundCehck");
	var orangeTotal = jQuery("#squaresGameBoard").find(".orange").length;
	var totalAllowed = levelSettings[levelIndex].orangeSquare;
	
	if(orangeTotal >= totalAllowed){
		// round complete;
		levelSettings[levelIndex].roundCompleted++;
		canClick = false;
		
		clearInterval(levelTimeInterval);		
		clearTimeout(lavelTimerTimeout);
		setTimeout(showSuccessCheckMark,1000);
		
	}
	
	//console.log(orangeTotal);
}


function wrongSquareClicked(div){

	consolelog("wrongSquareClicked");
	clearInterval(levelTimeInterval);		
	clearTimeout(lavelTimerTimeout);
	
	levelSettings[levelIndex].wrongAttempt++;
	jQuery(div).addClass("wrong");
	
	if(levelSettings[levelIndex].wrongAttempt >= 2){
		levelIndex--;
		refreshLevelIndex();
	}
	
	if(levelIndex<1){		
		// go back one level
		levelIndex = 1;	
		refreshLevelIndex();
	}
	
	
	
	setTimeout(showLightOrangeSquares,1000);
	
	
	
}


function showSuccessCheckMark(){
	
	consolelog("showSuccessCheckMark");
	levelSettings[levelIndex].wrongAttempt = 0;
	jQuery(".success").show();
	
	if(levelSettings[levelIndex].roundCompleted >=2){
		levelIndex++;
		refreshLevelIndex();
	}
	
	if(levelIndex>3){
		// game over
		setTimeout(showThankyouPage,1000);
	}else{
		setTimeout(startMemoryMatchGame,1000);
	}
	
}





function refreshLevelIndex(){	

	consolelog("refreshLevelIndex");
	if((levelIndex >= 2) && (levelIndex <= 3)){
	levelSettings[levelIndex].wrongAttempt = 0;
	levelSettings[levelIndex].roundCompleted = 0;
	}
	
}


function showLightOrangeSquares(){
	
	consolelog("showLightOrangeSquares");
	jQuery("#squaresGameBoard").find(".activeSquare").each(function(index,div){
		
		if(!jQuery(div).hasClass("orange")){
			jQuery(div).addClass("orangelite");
		}
		
	})
	
	setTimeout(startMemoryMatchGame,1000);
}


function startMemoryMatchGame(){
	
	consolelog("startMemoryMatchGame");
	jQuery(".success").hide();
	// clear all previous timer if any;
	clearInterval(levelTimeInterval);		
	clearTimeout(lavelTimerTimeout);
	
	if(currentround<=6){		
		emptyGameBoard();	
		setTimeout(showGameBoard,1000);		
	}else{
		setTimeout(showThankyouPage,1000);
	}
	

	
}


jQuery(document).ready(function(){

	loadSquaresInOverview(7);
	showScreen(1);
	

	jQuery(document).on("click",".nextbtn", function(){
	var nextscreen = $(this).attr("data-next-screen");
	showScreen(nextscreen);
	});	

	jQuery(document).on("click",".backbtn", function(){
	var nextscreen = $(this).attr("data-next-screen");
	showScreen(nextscreen);
	});		
	
	jQuery(document).on("click","a.clicktobegin", function(){
		
		showScreen(5);
		startMemoryMatchGame();
	});	
	
	jQuery(document).on("click","#squaresGameBoard .square", function(){

		if(!canClick) return false;
		
		// active orange square clicked
		if(jQuery(this).hasClass("activeSquare")){
			
			levelSettings[levelIndex].clickCount++;
			jQuery(jQuery(this)).addClass("orange");
			roundCehck(jQuery(this));
			
		}else{
			// wrong square clicked.
			canClick = false;
			wrongSquareClicked(jQuery(this));

		}
	
	});	
	
	
	
});

// show game screens having screen{id}
function showScreen(n){
	
	$(".container").hide();
	$("div#screen"+n).show();
}

function updateProgressBar(){		
		var pwidth = parseFloat(jQuery("#gameboard .lavelprogressbar").attr("data-width"));
		pwidth -=  parseFloat(progressWidth/(lavelDuration/timerInterval) );
		jQuery("#gameboard .lavelprogressbar").css({width:pwidth+"px"});
		jQuery("#gameboard .lavelprogressbar").attr("data-width",pwidth);
		
}

function lavelTimeout(){	
		canClick = false;
		clearInterval(levelTimeInterval);		
		clearTimeout(lavelTimerTimeout);
		setTimeout(showLightOrangeSquares,1000);
		
}
	
function hideBoard(){	

}
function showBoard(){


}

function showThankyouPage(){	
showScreen(6);	
}

function startEquationGame(){


}

function playNextLevel(){


	
}

function startNextLevel(){
	
	
	
}

function loadEquationInBoard(){

}

