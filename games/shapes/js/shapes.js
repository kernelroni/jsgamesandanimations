var roundIndex = 0;
var levelTimeInterval = null;
var lavelTimerTimeout = null;
var timerInterval = 100;
var progressWidth = 350;
 

 
var duration = 45000; // 5 second
var lavelDuration = 45000; // 5 second
var totalImages = 5;
var totalSlides = 80;
var slideImagesArray = [];
var slideIndex = totalSlides;
var shapeResult = [];

function prepareSlideImages(){
	var i;
	var img = 0;
	for(i = 0; i<=totalSlides; ++i){
		img = Math.ceil(Math.random() * totalImages);
		slideImagesArray.push(img);
	}
	
	console.log(slideImagesArray);
	return slideImagesArray;
	
}

function buildTheSlider(){
	var sliderList = jQuery("#sliderList");
	var i;
	var imglr = "";
	for(i = 0; i<=slideImagesArray.length -1; ++i){
		imglr = " data-img-left='"+slideImagesArray[i-1]+"' data-img-right='"+slideImagesArray[i+1]+"' ";
	var slide1 = jQuery("<li id='img_"+i+"' data-img='"+slideImagesArray[i]+"' "+ imglr +"data-index='"+i+"' ><img src='images/"+slideImagesArray[i]+".png' /></li>");	
	jQuery(sliderList).append(slide1);
	}
}


function showDemo(){
	
	jQuery("#shapeboard").show();
	setTimeout(loadNextSlide,1000);
	//setTimeout(loadNextSlide,2000);
	setTimeout(startTheGame,3000);
	
}

function startTheGame(){
	//jQuery("#shapeboard").show();

	
	canClick = true;
	
	jQuery(".lavelprogressbar").attr("data-width",progressWidth).css("width","100%");
	levelTimeInterval = setInterval(updateProgressBar,timerInterval);
	lavelTimerTimeout = setTimeout(lavelTimeout,duration);		
	
}

function checkAndHighlight(action){
	
	var currentItem = jQuery("#sliderList").find("li#img_"+slideIndex);
	var currentImg = parseInt(jQuery(currentItem).attr("data-img"));
	var rightImg = parseInt(jQuery(currentItem).attr("data-img-right"));
	
	if(action == "yes"){		
		if(currentImg ==  rightImg){			
			jQuery(currentItem).addClass("correct");
			shapeResult.push(1);
		}else{
			jQuery(currentItem).addClass("incorrect");
				shapeResult.push(0);
		}
		
	}else{
		if(currentImg ==  rightImg){			
			jQuery(currentItem).addClass("incorrect");
				shapeResult.push(0);
		}else{
			jQuery(currentItem).addClass("correct");
			shapeResult.push(1);
		}		
		
		
		
	}
	
	setTimeout(loadNextSlide,500);
	if(shapeResult.length>1){
		jQuery(".sliderHead").html("&nbsp;");
	}
	
}

function loadNextSlide(){
	
	canClick = true;
	shapeSlider.move(--slideIndex); 
	
}


jQuery(document).ready(function(){
	
	showScreen(1);
	prepareSlideImages()
	buildTheSlider();	
	$('#shapeSlider').tinycarousel({start:slideIndex});

	
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
		setTimeout(showDemo,1000);
		
	});	
	
	
	jQuery(document).on("click","#shapeboard div.yesno", function(){
		
		if(!canClick) return false;
		canClick = false;
		
		var action = jQuery(this).hasClass("actionyes") ? "yes" : "no";
		
		if(action == "yes"){
			// clicked yes
			
			
			
		}else{
			// clicked no
			
		}
		
		checkAndHighlight(action);

		
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
		//setTimeout(startTheGame,1000);
		showThankyouPage();
		
}
	

	

function showThankyouPage(){	
showScreen(6);	
}




