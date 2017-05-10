var screen = 0;
var result = {
	
	
};

// On key up calculate game result
function gameOnKeyUp(e){
	
	var code = e.keyCode || e.which;
	lastKey = code;
	if(screen == 0){
	screen = 1 ;
	showScreen(screen);	
	}

}

function onLabelAnswerClicked(labelanswer){
	
	var wrappingTable = jQuery(labelanswer).closest("table.questionsanswers");
	
	jQuery(wrappingTable).find(".labelanswer").removeClass("selected");
	jQuery(wrappingTable).find(".labelanswer").removeClass("error");
	jQuery(labelanswer).addClass("selected");
	

	
}


function showNextQuestion(nextBtn){
	
	var wrappingTable = jQuery(nextBtn).parent().parent().find("table.questionsanswers");
	var selectedRadio = jQuery(wrappingTable).find(".selected");
	var nextScreen = $(nextBtn).attr("data-next-screen");

	
	if(selectedRadio.length){
		showScreen(nextScreen);
	}else{
		jQuery(wrappingTable).find(".labelanswer").addClass("error");
	}
	
}


jQuery(document).ready(function(){
	
	showScreen("01");

	
	
	jQuery(document).on("click","label.labelanswer", function(evt){
		
	jQuery(this).find("input").prop('checked', true);
	jQuery(this).addClass("selected");
	onLabelAnswerClicked($(this));
	
	evt.stopPropagation();
	evt.preventDefault();
	
	});



	
	jQuery(document).on("click","button.btnNextOverview", function(evt){
		
	var nextScreen = $(this).attr("data-next-screen");
	showScreen(nextScreen);
	
	});	

	
	jQuery(document).on("click","button.navigation-next", function(evt){
		

	
	showNextQuestion($(this));
	evt.stopPropagation();
	evt.preventDefault();
	
	});	
	
	
	
	jQuery(document).on("click","a.clicktobegin", function(){
	
	showScreen(1);
	});	
	
	
});

// show game screens having screen{id}
function showScreen(n){
	
	$(".container").hide();
	$("div#screen"+n).show();
}







