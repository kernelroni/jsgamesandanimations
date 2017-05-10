var questionIndex = 0;
var levelTimeInterval = null;
var lavelTimerTimeout = null;
var timerInterval = 100;
var progressWidth = 300;
var lavelDuration = 0; 
var questions = [
{
	equation : "7 + 4 =",
	x: 11,
	y:10,
	z:24,
	answer:11,
	duration:5,
	isCorrect:false
},
{
	equation : "8 + 6 =",
	x: 12,
	y:14,
	z:17,
	answer:14,
	duration:5,
	isCorrect:false
},
{
	equation : "6 - 4 =",
	x: 4,
	y:10,
	z:2,
	answer:2,
	duration:5,
	isCorrect:false
},
{
	equation : "7 - 3 =",
	x: 5,
	y:10,
	z:4,
	answer:4,
	duration:5,
	isCorrect:false
},
{
	equation : "13 + 6 =",
	x: 17,
	y:20,
	z:19,
	answer:19,
	duration:5,
	isCorrect:false
},

{
	equation : "21 - 6 =",
	x: 17,
	y:15,
	z:16,
	answer:15,
	duration:5,
	isCorrect:false
},


{
	equation : "18 + 9 =",
	x: 27,
	y:31,
	z:25,
	answer:27,
	duration:5,
	isCorrect:false
},


{
	equation : "13 - 5 =",
	x:7,
	y:5,
	z:8,
	answer:8,
	duration:5,
	isCorrect:false
},

{
	equation : "7 x 3 =",
	x:21,
	y:10,
	z:14,
	answer:21,
	duration:7,
	isCorrect:false
},

{
	equation : "4 x 4 =",
	x:20,
	y:8,
	z:16,
	answer:16,
	duration:7,
	isCorrect:false
},

{
	equation : "9 &divide; 3 =",
	x:3,
	y:6,
	z:5,
	answer:3,
	duration:7,
	isCorrect:false
},

{
	equation : "12 &divide; 6 =",
	x:6,
	y:2,
	z:5,
	answer:2,
	duration:7,
	isCorrect:false
},

{
	equation : "6 x 5 =",
	x:11,
	y:30,
	z:24,
	answer:30,
	duration:7,
	isCorrect:false
},


{
	equation : "21 &divide; 3 =",
	x:6,
	y:9,
	z:7,
	answer:7,
	duration:7,
	isCorrect:false
},

{
	equation : "9 x 3 =",
	x:36,
	y:27,
	z:12,
	answer:27,
	duration:7,
	isCorrect:false
},

{
	equation : "16 &divide; 4 =",
	x:6,
	y:4,
	z:7,
	answer:4,
	duration:7,
	isCorrect:false
}


];




function startEquationGame(){
	showScreen(4);
	setTimeout(startNextLevel,1000);	
}

function playNextLevel(){
	
	
	setTimeout(hideBoard,1000);
	setTimeout(startNextLevel,2000);
	
}

function startNextLevel(){
	
	if(questionIndex >= questions.length){

		console.log(questions);
		setTimeout(showThankyouPage,1000);
		return false;
		
	}
	
	jQuery("#gameboard .lavelprogressbar").attr("data-width",300);
	jQuery("#currentLevel").html(questionIndex+1);
	var currentLevel = questions[questionIndex];
	var duration = lavelDuration = currentLevel.duration * 1000; 
	loadEquationInBoard();
	showBoard();
	levelTimeInterval = setInterval(updateProgressBar,timerInterval);
	lavelTimerTimeout = setTimeout(lavelTimeout,duration);
	
}

function loadEquationInBoard(){
var currentLevel = questions[questionIndex];	
	
	console.log(currentLevel);
	jQuery("#gameboard #questionequation").html(currentLevel.equation);
	jQuery("#gameboard #answerx").attr("data-value",currentLevel.x).html(currentLevel.x);
	jQuery("#gameboard #answery").attr("data-value",currentLevel.y).html(currentLevel.y);
	jQuery("#gameboard #answerz").attr("data-value",currentLevel.z).html(currentLevel.z);
}

jQuery(document).ready(function(){


	showScreen(1);

	
	jQuery(document).on("click","#gameboard .answeroption", function(){

		var currentLevel = questions[questionIndex];
		
		if(currentLevel.alreadyAnswered){
			
			return false;
		}
		// track if already answered.
		questions[questionIndex].alreadyAnswered = true;
		
		
		var answer = parseInt(jQuery(this).attr("data-value"));

		clearInterval(levelTimeInterval);		
		clearTimeout(lavelTimerTimeout);
		
		if(answer == currentLevel.answer){
			jQuery(this).addClass("correct");
			questions[questionIndex].isCorrect = true;
		}else{
			jQuery(this).addClass("wrong");
		}
		questions[questionIndex].userAnswer = answer;
		questionIndex++;
		playNextLevel();		
		
	});		
	
	jQuery(document).on("click",".nextbtn", function(){
	var nextscreen = $(this).attr("data-next-screen");
	showScreen(nextscreen);
	});	

	jQuery(document).on("click",".backbtn", function(){
	var nextscreen = $(this).attr("data-next-screen");
	showScreen(nextscreen);
	});		
	
	jQuery(document).on("click","a.clicktobegin", function(){
		hideBoard();
		showScreen(4);
		playNextLevel();
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
//console.log("tick");		
}

function lavelTimeout(){		
		clearInterval(levelTimeInterval);		
		clearTimeout(lavelTimerTimeout);
		//console.log("over");
		hideBoard();
		questionIndex++;
		playNextLevel();
}
	
function hideBoard(){	
	jQuery(".equationboard").hide();
	jQuery("#gameboard .lavelprogress").hide();
}
function showBoard(){
	jQuery("#gameboard .answeroption").removeClass("correct").removeClass("wrong");
	jQuery("#gameboard .lavelprogress").show();
	jQuery("#gameboard .lavelprogressbar").attr("data-width",300).width("298px");
	
	jQuery(".equationboard").show();
}

function showThankyouPage(){	
showScreen(6);	
}
