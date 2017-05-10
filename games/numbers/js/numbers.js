var result = {
	
	
};
var lavel1timer = null;
var lavel1timeovertimer = null;
var timerInterval = 100;
var lavelDuration = 1000 * 12; // seconds
var progressWidth = 310;

var levelNumber = new Array();
var levelPlayed = new Array();
var numbers = new Array(1,2,3,4,5,6,7,8,9,0);
var currentLevel = 3;
var totalNinLevel = 0 ;
var index = 0;
var numberIntervel = 2000; // 2 sec


function getRandomArray(count){
	var randomArray = new Array();
	var item = 0;
	
	if(!count || count<3) count = 3;
	
	while(count>0){
		item = numbers[Math.floor(Math.random() * numbers.length)];
		randomArray.push(item);
		count--;
	}
	
	//console.log(randomArray);
	return randomArray;
}


function initLevel(){

	showScreen("01");
	
	for(var i=0; i<=9; ++i){
		levelNumber[i] = getRandomArray(i);
	}

	
	
	return levelNumber;
}


function startLevel(){
	
	
		
	
	playLevel(3);
}

function playLevel(level){
	
	

	
	clearTimeout(lavel1timeovertimer);
	clearInterval(lavel1timer);
	
	showScreen(2);
	if(level <3 ) level = 3;
	
	currentLevel = level;
	index = 0;
	levelNumber[level] = getRandomArray(level);
	totalNinLevel = levelNumber[level].length;
	
	setTimeout(showLevelNumbers,numberIntervel);
	setTimeout(hideLevelNumbers,numberIntervel-1000);
	
	
	
}


function showLevelNumbers(){
	
	if(index < totalNinLevel){
		jQuery("#numberboard").html(levelNumber[currentLevel][index]);
		console.log(levelNumber[currentLevel][index]);
		index++;
		setTimeout(showLevelNumbers,numberIntervel);
		setTimeout(hideLevelNumbers,numberIntervel-1000);
	}else{
		
		
		jQuery("#lavel1 .lavelprogressbar").attr("data-width",progressWidth);
		lavel1timer = setInterval(updateProgressBar,timerInterval);
		lavel1timeovertimer = setTimeout(lavel1Timeout,lavelDuration);
		
		
		showScreen(3);
		jQuery("table.number .numbertd").hide();
		jQuery("table.number .numbertd input").val("");
		jQuery("table.number .numbertd input").removeAttr("style");
		
		for(var i=0; i<totalNinLevel; ++i){
			jQuery("table.number .numbertd"+i).show();
		}
		
		
		jQuery("input#number0").focus();
	}
	
	
	
}

function hideLevelNumbers(){
		jQuery("#numberboard").html("");	
}

function checkAndChangeLevel(){
	
	var inputArray = new Array();
	var levelNumberRow = levelNumber[currentLevel];
	var levelLength = levelNumber[currentLevel].length;
	
	for(var i=0; i<levelLength; ++i){
		var val = jQuery("table.number .numbertd" + i + " input").val();
			inputArray.push(parseInt(val));
	}
	
	console.log(levelNumberRow);	
	console.log(inputArray);
	
	if(ifHasEmptyBox(inputArray)){
		return false;
	}
	
	if(arraysEqual(levelNumberRow, inputArray)){
		
		if(currentLevel >=9){
			showThankyouPage();
			clearTimeout(lavel1timeovertimer);
			clearInterval(lavel1timer);
			
			
		}else{		
			playLevel(currentLevel+1);
		}
	}else{
		playLevel(currentLevel-1);
	}
	
}

function ifHasEmptyBox(array){
	
	var hasEmpty = false;
	
	for(var i = array.length; i--;) {
        if(isNaN(array[i])){
            hasEmpty = true;
		}
    }
	
	return hasEmpty;
}


function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}


function updateProgressBar(){
		
	var pwidth = parseFloat(jQuery("#lavel1 .lavelprogressbar").attr("data-width"));
	pwidth -=  parseFloat(progressWidth/(lavelDuration/timerInterval) );
	jQuery("#lavel1 .lavelprogressbar").css({width:pwidth+"px"});
	jQuery("#lavel1 .lavelprogressbar").attr("data-width",pwidth);
		
		
}

function lavel1Timeout(){		
	
	
	console.log("lael 1 Timeout");
	
	if(currentLevel<=9){
		playLevel(currentLevel-1);
	}else{
		setTimeout(showThankyouPage,numberIntervel);
	}
			
}



jQuery(document).ready(function(){
	
	initLevel()

	jQuery(document).on("click","a.clicktobegin", function(){	
		startLevel();
	});	
	
	jQuery(document).on("click",".btnNext", function(){	
		checkAndChangeLevel();
		
		
	});		
	
	jQuery(document).on("click","button.btnNextOverview", function(evt){
		
	var nextScreen = $(this).attr("data-next-screen");
	showScreen(nextScreen);
	
	});	
	
	jQuery(document).on("keyup","input.numberentered",function(){
		
		var value = jQuery(this).val();
		var index = parseInt(jQuery(this).attr("data-index"));
		
		if(levelNumber[currentLevel][index] == value){
			jQuery(this).css("border","1px solid green");
			jQuery(this).parent().next().find("input.numberentered").focus();
		}else{
			jQuery(this).css("border","1px solid red");
		}
		
		
		console.log(jQuery(this).val());
		
	});
	
	
});

// show game screens having screen{id}
function showScreen(n){	
	$(".container").hide();
	$("div#screen"+n).show();
}



function showThankyouPage(){
	clearInterval(lavel1timer);	
	showScreen(6);	
}
