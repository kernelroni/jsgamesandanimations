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
	}
	//console.log(screen);
	//console.log(code);

}

// document ready
jQuery(document).ready(function(){
	
	//$(document).on("keyup",gameOnKeyUp);
	
		jQuery(document).on("click","a.clicktobegin",function(){
			showScreen(2);
		});
	
	jQuery(document).on("click","button.btnNext",function(){
		
		var questionids = $(this).attr("data-questionids");
		var bothquestionid = questionids.split(",");
		
		var leftId = bothquestionid[0];
		var rightId = bothquestionid[1];
		
		$(".rowanswers td").removeClass("error");
		
		if (!$("input[name='question"+leftId+"']:checked").val()) {		  
		  $("td#question"+leftId).addClass("error");
		  return false;			
		}
		
		
		if (!$("input[name='question"+rightId+"']:checked").val()) {
		  $("td#question"+rightId).addClass("error");
		   return false;			
		}
		
		console.log(leftId +" " + rightId);
		
		var nextScreen = $(this).attr("data-next-screen");
		showScreen(nextScreen);
		
	});
	
	
	
	jQuery(document).on("click","button.btnNextOverview", function(evt){
		
	var nextScreen = $(this).attr("data-next-screen");
	showScreen(nextScreen);
	
	});	
	
});




function gameEnd(){
	console.log("game end");
	clearTimeout(reactionTimer);
	gameTimeout = true;
	
	result.endTime = new Date().getTime();
	gameOver();
}
