var result = {
	level1 : {
			attempt : 0,
			temporary : 0,
			permanent : 0
		
		},
	level2 : {
			attempt : 0,
			temporary : 0,
			permanent : 0
		
		},
	level3 : {
			attempt : 0,
			temporary : 0,
			permanent : 0
		
		}
};
var laveIntervel = 1000; // 1 sec
var level1Screen = 7;
var level2Screen = 8;
var level3Screen = 9;
var whiteScreen = 11;


var caseValues = [1,1,1,1,1,0,0,0.5,0.5,0.5,"X","X"];

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


function setupGameLavel(){
	
	jQuery(".caseSingle").attr("data-clicked",0);
	
	setTimeout(setupLevel1,1000);
	setTimeout(setupLevel2,2000);
	setTimeout(setupLevel3,3000);
	
}


function setupLevel1(){
	
	var values1 = shuffleArray(caseValues);
	var allCases1 = jQuery("#lavel1 .caseSingle");
	
	for(var i=0; i<=allCases1.length-1; i++){
		jQuery(allCases1[i]).attr("data-value",values1[i]);		
	}
}

function setupLevel2(){
	
	var values2 = shuffleArray(caseValues);
	var allCases2 = jQuery("#lavel2 .caseSingle");
	
	for(var j=0; j<=allCases2.length-1; j++){
		jQuery(allCases2[j]).attr("data-value",values2[j]);	
	}
}

function setupLevel3(){
	
	var values3 = shuffleArray(caseValues);
	var allCases3 = jQuery("#lavel3 .caseSingle");
	
	for(var k=0; k<=allCases3.length-1; k++){
		jQuery(allCases3[k]).attr("data-value",values3[k]);		
	}
}





jQuery(document).ready(function(){
	
	//showScreen(1);
	
	setupGameLavel();
	console.log(result);	
	
	jQuery(document).on("click","a.clicktobegin", function(){
		showScreen(7);
	});	

	jQuery(document).on("click","button.btnNextOverview", function(evt){
		
	var nextScreen = $(this).attr("data-next-screen");
	showScreen(nextScreen);
	
	});		

	// level 1 code
	jQuery(document).on("click","div.caseSingle.level1", function(){
		
		var caseId = $(this).attr("data-id");
		var caseValue = parseFloat($(this).attr("data-value"));
		var alreadyClicked = parseInt($(this).attr("data-clicked"));
		
		jQuery("div#level1PermanentBtn").attr("data-case-open",1);
		
		if(alreadyClicked){
			return false;
		}else{
			$(this).attr("data-clicked",1);
		}
		
		var temporaryButton = jQuery("#lavel1BankButtons").find(".btnTemporary");
		var tempTotalAmount = jQuery(temporaryButton).find(".totalAmount");
		
		result.level1.attempt++;
		
		// == x
		if(isNaN(caseValue)){			
			jQuery(this).find("span").html($(this).attr("data-value"));
			
			result.level1.temporary = 0.00;
			jQuery("#lavel1BankButtons .btnTemporary .totalAmount").html(result.level1.temporary);
			
			
			
			setTimeout(showWhiteScreen,laveIntervel);			
			setTimeout(showLevel2,laveIntervel*2);
		}else{
			// == $1
			
			jQuery(this).find("span").html("$" + caseValue);
			if(result.level1.attempt > 1){
				caseValue+=0.5;				
			}
			
			
			result.level1.temporary += caseValue;
			
			
			jQuery(tempTotalAmount).attr("data-value",result.level1.temporary);
			jQuery(tempTotalAmount).html(result.level1.temporary.toFixed(2));
			
			
		}
	
	
		$(this).find("span").show();
	
	});	
	
	jQuery(document).on("click","div#level1PermanentBtn", function(){		

		var anyCaseOpen = parseInt(jQuery(this).attr("data-case-open"));
		if(!anyCaseOpen) { return false }; 
	
		var tempValue = result.level1.permanent = result.level1.temporary.toFixed(2);
		result.level2.permanent = result.level1.permanent;
		
		var permTotalAmountSpan = $(this).find(".totalAmount");
		jQuery(permTotalAmountSpan).attr("data-value",tempValue);
		jQuery(permTotalAmountSpan).html(tempValue);
		
		
		jQuery("div#level2PermanentBtn .totalAmount").html(tempValue);
		jQuery("div#level3PermanentBtn .totalAmount").html(tempValue);
		
		setTimeout(showWhiteScreen,laveIntervel);			
		setTimeout(showLevel2,laveIntervel*2);

	});
	



// level 2 code
	jQuery(document).on("click","div.caseSingle.level2", function(){
		
		var caseId = $(this).attr("data-id");
		var caseValue = parseFloat($(this).attr("data-value"));

		var alreadyClicked = parseInt($(this).attr("data-clicked"));
		
		jQuery("div#level2PermanentBtn").attr("data-case-open",1);
		
		
		if(alreadyClicked){
			return false;
		}else{
			$(this).attr("data-clicked",1);
		}
		
		var temporaryButton = jQuery("#lavel2BankButtons").find(".btnTemporary");
		var tempTotalAmount = jQuery(temporaryButton).find(".totalAmount");
		
		result.level2.attempt++;
		
		// == x
		if(isNaN(caseValue)){			
			jQuery(this).find("span").html($(this).attr("data-value"));
			
			result.level2.temporary = 0.00;
			jQuery("#lavel2BankButtons .btnTemporary .totalAmount").html(result.level1.temporary);
			
			setTimeout(showWhiteScreen,laveIntervel);			
			setTimeout(showLevel3,laveIntervel*2);
		}else{
			// == $1
			
			jQuery(this).find("span").html("$" + caseValue);
			
			
			if(result.level2.attempt > 1){
				caseValue+=0.5;				
			}			
			result.level2.temporary += caseValue;
			
			jQuery(tempTotalAmount).attr("data-value",result.level2.temporary);
			jQuery(tempTotalAmount).html(result.level2.temporary.toFixed(2));
			
			
		}
	
	
		$(this).find("span").show();
	
	});	
	
	jQuery(document).on("click","div#level2PermanentBtn", function(){		

		var anyCaseOpen = parseInt(jQuery(this).attr("data-case-open"));
		if(!anyCaseOpen) { return false }; 	
	
		var tempValue = result.level2.permanent = result.level2.temporary.toFixed(2);
		result.level3.permanent = result.level2.permanent;
		
		tempValue = parseFloat(result.level1.permanent) + parseFloat(result.level2.permanent) ;
		tempValue = tempValue.toFixed(2);
		
		var permTotalAmountSpan = $(this).find(".totalAmount");
		jQuery(permTotalAmountSpan).attr("data-value",tempValue);
		jQuery(permTotalAmountSpan).html(tempValue);
		
		jQuery("div#level3PermanentBtn .totalAmount").html(tempValue);
		
		setTimeout(showWhiteScreen,laveIntervel);			
		setTimeout(showLevel3,laveIntervel*2);

	});





// level 3 code
	jQuery(document).on("click","div.caseSingle.level3", function(){
		
		var caseId = $(this).attr("data-id");
		var caseValue = parseFloat($(this).attr("data-value"));

		var alreadyClicked = parseInt($(this).attr("data-clicked"));
		
		jQuery("div#level3PermanentBtn").attr("data-case-open",1);
		
		if(alreadyClicked){
			return false;
		}else{
			$(this).attr("data-clicked",1);
		}

		
		var temporaryButton = jQuery("#lavel3BankButtons").find(".btnTemporary");
		var tempTotalAmount = jQuery(temporaryButton).find(".totalAmount");
		
		result.level3.attempt++;
		
		// == x
		if(isNaN(caseValue)){			
			jQuery(this).find("span").html($(this).attr("data-value"));
			result.level3.temporary = 0.00;
			jQuery("#lavel3BankButtons .btnTemporary .totalAmount").html(result.level1.temporary);			
			
			setTimeout(showWhiteScreen,laveIntervel);			
			setTimeout(showThankyouPage,laveIntervel*2);
		}else{
			// == $1

			
			jQuery(this).find("span").html("$" + caseValue);
					
			if(result.level3.attempt > 1){
				caseValue+=0.5;				
			}			
			result.level3.temporary += caseValue;	
			
			jQuery(tempTotalAmount).attr("data-value",result.level3.temporary);
			jQuery(tempTotalAmount).html(result.level3.temporary.toFixed(2));
			
			
		}
	
	
		$(this).find("span").show();
	
	});	
	
	jQuery(document).on("click","div#level3PermanentBtn", function(){		

		var anyCaseOpen = parseInt(jQuery(this).attr("data-case-open"));
		if(!anyCaseOpen) { return false }; 
		
		var tempValue = result.level3.permanent = result.level3.temporary.toFixed(2);
		
		tempValue = parseFloat(result.level1.permanent) + parseFloat(result.level2.permanent) + parseFloat(result.level3.permanent);
		
		tempValue = tempValue.toFixed(2);
		var permTotalAmountSpan = $(this).find(".totalAmount");
		jQuery(permTotalAmountSpan).attr("data-value",tempValue);
		jQuery(permTotalAmountSpan).html(tempValue);
		
		setTimeout(showWhiteScreen,laveIntervel);			
		setTimeout(showThankyouPage,laveIntervel*2);

	});












	
	
	
	
});

// show game screens having screen{id}
function showScreen(n){	
	$(".container").hide();
	$("div#screen"+n).show();
}

function showLevel2(){	
	showScreen(level2Screen);	
}

function showLevel3(){	
	showScreen(level3Screen);	
}

function showWhiteScreen(){	
	showScreen(whiteScreen);	
}

function showThankyouPage(){	
showScreen(10);	
}
