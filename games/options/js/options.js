var roundIndex = 0;
var levelTimeInterval = null;
var lavelTimerTimeout = null;
var timerInterval = 100;
var progressWidth = 300;
 


var totalSquares = 30; // 6x6 = 0 - 35
var level1SquareFlag = [];
var levelIndex = 1; // max 3
var canClick = 0;
var cardIndex = 0;
var currentCard = null;
var resultCard = [];
var duration = 5100; // 5 second
var lavelDuration = 5000; // 5 second

var leftAmounts = ["2.00","1.75","8.25","3.80","6.00","3.50","9.25","4.75","7.50","2.75"];
var rightAmounts = ["9.00","5.00","13.50","5.75","11.50","27.00","10.00","8.25","9.85","49.00"];
var rightPercents = ["15","25","35","70","52","6","89","65","62","4"];



function singleOption(){
	
	this.card = {
		"index" : 0,
		"leftAmount" : 0,
		"rightAmount" : 0,
		"leftPercent" : 100,
		"rightPercent" : 0,
		"leftClicked" : 0,
		"rightClicked" : 0,
		"timeout" : 0,
		"taken" : 0
	}
	
	this.card.leftAmount = "$"+leftAmounts[cardIndex];	
	this.card.rightAmount = "$"+rightAmounts[cardIndex];
	this.card.rightPercent = rightPercents[cardIndex];
	this.card.index = cardIndex;
	cardIndex++;
	
	
}

var resultCards = [];

function consolelog(msg){
	
	console.log(msg);
}

function loadNewCard(){

	var optionCard = new singleOption();
	optionCard = optionCard.card;
	currentCard = optionCard;
	
	jQuery("#leftCard .amountdoller").html(currentCard.leftAmount);
	jQuery("#leftCard .amountpercent").html(currentCard.leftPercent);
	
	jQuery("#rightCard .amountdoller").html(currentCard.rightAmount);
	jQuery("#rightCard .amountpercent").html(currentCard.rightPercent);	
	
	jQuery("#currentround").html(cardIndex);
	
	
}


function startTheGame(){
	
	if(cardIndex>9){
		
		setTimeout(showThankyouPage,1000);
		return false;
	}
	hideCard();
	loadNewCard();
	setTimeout(showCard,1000);
	
}

function getCardCalculation(){
	
	var taken = 0;
	if(currentCard.leftClicked){
		taken = 1;
	}else{		
		var percentVal = Math.ceil(Math.random() * 100);
		console.log(percentVal);
		if(percentVal <= currentCard.rightPercent){
			taken = 1;
		}
		
	}
	
	return taken;	
}


function highlightCard(){
	
	if(currentCard.leftClicked){
		if(currentCard.taken){
			jQuery("#leftCard").addClass("taken");
			jQuery("#rightCard").addClass("nottaken");
		}
		
	}
	
	if(currentCard.rightClicked){
		if(currentCard.taken){
			jQuery("#rightCard").addClass("taken");
			jQuery("#leftCard").addClass("nottaken");
		}else{
			jQuery("#rightCard").addClass("notlucky");
			jQuery("#leftCard").addClass("nottaken");			
			
		}
		
	}
	
	
}

jQuery(document).ready(function(){
	
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
		startTheGame();
		
	});	
	
	jQuery(document).on("click","#cardboard .gamecard", function(){

		clearInterval(levelTimeInterval);		
		clearTimeout(lavelTimerTimeout);
		
		
	if(!canClick) {
		return false;
	}
	canClick = false;
	
	

	var thecard = jQuery(this).attr("data-which");
		if(thecard == "left"){
			// left card clicked
			//alert("left card clicked");
			currentCard.leftClicked = 1;
			
			
			
		}else{
			// right card clicked
			//alert("right card clicked");
			currentCard.rightClicked = 1;
			
		}
		currentCard.taken = getCardCalculation();
		highlightCard();
		resultCard[currentCard.index] = currentCard;
		setTimeout(startTheGame,1000);
		console.log(resultCard);
	
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
		
		hideCard();
		clearInterval(levelTimeInterval);		
		clearTimeout(lavelTimerTimeout);
		setTimeout(startTheGame,1000);
		
}
	
function hideCard(){	
	
	canClick = false;
	jQuery("#rightCard").removeClass("taken");
	jQuery("#rightCard").removeClass("nottaken");
	jQuery("#rightCard").removeClass("notlucky");	
	
	jQuery("#leftCard").removeClass("taken");	
	jQuery("#leftCard").removeClass("nottaken");
	
	jQuery("#cardboard").hide();
	
	
	
}
function showCard(){
	
	jQuery("#cardboard").show();	
	canClick = true;
	
	jQuery(".lavelprogressbar").attr("data-width",progressWidth).css("width","100%");
	levelTimeInterval = setInterval(updateProgressBar,timerInterval);
	lavelTimerTimeout = setTimeout(lavelTimeout,duration);	

	
	
	
}

function showThankyouPage(){	
showScreen(6);	
}




