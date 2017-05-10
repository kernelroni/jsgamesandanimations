var result = {
	
	
};
var lavelIntervel = 3000; // 3 sec


jQuery(document).ready(function(){
	
	
	//showScreen(1);
	//setTimeout(playTutorial,7000);

	jQuery(document).on("click","button.btnNextOverview", function(){
	var nextscreen = $(this).attr("data-next-screen");
	showScreen(nextscreen);
	});	
	
	// play tutorial
	jQuery(document).on("click","a.replaytxt", function(){
	replayTutorial();	
	});
	
	jQuery(document).on("click","a.clicktobegin", function(){
	
	startLavel1();
	});	
	
	
});

// show game screens having screen{id}
function showScreen(n){
	
	$(".container").hide();
	$("div#screen"+n).show();
}


function replayTutorial(){
	$("#lavelx .success").hide();
	jQuery("td#tcell32 img").detach().appendTo("td#tcell21");
	jQuery("td#tcell22 img").detach().appendTo("td#tcell23");
	jQuery("td#tcell12 img").detach().appendTo("td#tcell22");
	playTutorial();
}
function playTutorial(){
	showScreen(1);
	setTimeout(function(){
		
		jQuery("td#tcell22 img").detach().appendTo("td#tcell12");
		
			setTimeout(function(){		
			jQuery("td#tcell21 img").detach().appendTo("td#tcell22");
			
					setTimeout(function(){		
					jQuery("td#tcell22 img").detach().appendTo("td#tcell32");
					
						setTimeout(function(){
						jQuery("td#tcell23 img").detach().appendTo("td#tcell22");						
							setTimeout(function(){						
							$("#lavelx .success").show();
							
								setTimeout(function(){						
								showScreen(2);
								},2000);
							
							
							
							},1000);
						},1000);
					
					
					},1000);
			
			},1000);
		
	},1000);
	
}

// lavel 1 procedure
function startLavel1(){

showScreen(3);

var lavel1timer = null;
var lavel1timeovertimer = null;
var timerInterval = 1000;
var lavelDuration = 1000 * 2 * 60; // 3 minutes
var progressWidth = 310;


	lavel1timer = setInterval(updateProgressBar1,timerInterval);
	lavel1timeovertimer = setTimeout(lavel1Timeout,lavelDuration);

	$( "#lavel1 .imgdrag" ).draggable({ revert: "invalid" });
    $( "#lavel1 .imgdrop" ).droppable({
		tolerance: "intersect",
      drop: function( event, ui ) {
      console.log($(this));
		console.log(ui);
		// [1-9] = 1,3 +- nth cell allowed to drop only.
		
		var cellHasImgAlready = $(this).find("img").size();
		var draggedImg = ui.draggable;
		
		var canDrop = 0;
		var cellId = parseInt($(this).attr("data-id")); // dropped cell id
		var cellImgId = parseInt(draggedImg.attr("data-id")); // dragged cell id
		var leftCellId = cellImgId - 1;
		var rightCellId = cellImgId + 1;
		var topCellId = cellImgId - 3;
		var bottomCellId = cellImgId + 3;
		
		
		console.log(rightCellId);
		if(cellId == leftCellId || cellId == rightCellId || cellId == topCellId || cellId == bottomCellId){
			canDrop = 1;
		}
		
		if((cellHasImgAlready == 0) && canDrop){
			$(draggedImg).css({"left":"0px","top":"0px"});
			draggedImg.attr("data-id",cellId);
			$(this).html(draggedImg);
			
			$(this).attr("data-img",draggedImg.attr("data-img"));
			
			checkIfmathced();
			
		}else{
			ui.draggable.draggable('option','revert',true); 
		}
		
      }
    });
	
	function updateProgressBar1(){
		
		var pwidth = parseFloat(jQuery("#lavel1 .lavelprogressbar").attr("data-width"));
		pwidth -=  parseFloat(progressWidth/(lavelDuration/timerInterval) );
		jQuery("#lavel1 .lavelprogressbar").css({width:pwidth+"px"});
		jQuery("#lavel1 .lavelprogressbar").attr("data-width",pwidth);
		
		
	}

	function lavel1Timeout(){
		
		clearInterval(lavel1timer);
		setTimeout(startLavel2,lavelIntervel);
		
	}

	
	function checkIfmathced(){
		var l1cell21 = 12;
		var l1cell31 = 8;
		var l1cell32 = 9;
		var l1cell22 = 10;
		
		var l1cell21img = $("td#l1cell21").find("img");
		var l1cell31img = $("td#l1cell31").find("img");
		var l1cell32img = $("td#l1cell32").find("img");
		var l1cell22img = $("td#l1cell22").find("img");
		
		if(l1cell21img.size()){			
			if(parseInt(l1cell21img.attr("data-img")) != l1cell21){
				return false;
			}		
		}else{
			return false;
		}
		

		if(l1cell31img.size()){			
			if(parseInt(l1cell31img.attr("data-img")) != l1cell31){
			return false;
			}			
		}else{
			return false;
		}
		
		if(l1cell32img.size()){			
			if(parseInt(l1cell32img.attr("data-img")) != l1cell32){
			return false;
			}			
		}else{
			return false;
		}		
		
		if(l1cell22img.size()){			
			if(parseInt(l1cell22img.attr("data-img")) != l1cell22){
			return false;
			}			
		}else{
			return false;
		}	


		// lavel 1 passed 
		$("#lavel1 .success").show();
		
		clearInterval(lavel1timer);
		clearTimeout(lavel1timeovertimer);
		setTimeout(startLavel2,lavelIntervel);

	}


	
}



// lavel 2 procedure
function startLavel2(){

showScreen(4);

var lavel1timer = null;
var lavel1timeovertimer = null;
var timerInterval = 1000;
var lavelDuration = 1000 * 2 * 60; // 3 minutes
var progressWidth = 310;


	lavel1timer = setInterval(updateProgressBar1,timerInterval);
	lavel1timeovertimer = setTimeout(lavel1Timeout,lavelDuration);

	$( "#lavel2 .imgdrag" ).draggable({ revert: "invalid" });
    $( "#lavel2 .imgdrop" ).droppable({
		tolerance: "intersect",
      drop: function( event, ui ) {
      console.log($(this));
		console.log(ui);
		// [1-9] = 1,3 +- nth cell allowed to drop only.
		
		var cellHasImgAlready = $(this).find("img").size();
		var draggedImg = ui.draggable;
		
		var canDrop = 0;
		var cellId = parseInt($(this).attr("data-id")); // dropped cell id
		var cellImgId = parseInt(draggedImg.attr("data-id")); // dragged cell id
		var leftCellId = cellImgId - 1;
		var rightCellId = cellImgId + 1;
		var topCellId = cellImgId - 3;
		var bottomCellId = cellImgId + 3;
		
		
		console.log(rightCellId);
		if(cellId == leftCellId || cellId == rightCellId || cellId == topCellId || cellId == bottomCellId){
			canDrop = 1;
		}
		
		if((cellHasImgAlready == 0) && canDrop){
			$(draggedImg).css({"left":"0px","top":"0px"});
			draggedImg.attr("data-id",cellId);
			$(this).html(draggedImg);
			
			$(this).attr("data-img",draggedImg.attr("data-img"));
			
			checkIfmathced();
			
		}else{
			ui.draggable.draggable('option','revert',true); 
		}
		
      }
    });
	
	function updateProgressBar1(){
		
		var pwidth = parseFloat(jQuery("#lavel2 .lavelprogressbar").attr("data-width"));
		pwidth -=  parseFloat(progressWidth/(lavelDuration/timerInterval) );
		jQuery("#lavel2 .lavelprogressbar").css({width:pwidth+"px"});
		jQuery("#lavel2 .lavelprogressbar").attr("data-width",pwidth);
		
		
	}

	function lavel1Timeout(){
		
		clearInterval(lavel1timer);
		setTimeout(startLavel3,lavelIntervel);
		
	}

	
	function checkIfmathced(){
		var l2cell12 = 11;
		var l2cell22 = 9;
		var l2cell21 = 10;
		
		
		var l2cell12img = $("td#l2cell12").find("img");
		var l2cell22img = $("td#l2cell22").find("img");
		var l2cell21img = $("td#l2cell21").find("img");
		
		if(l2cell12img.size()){			
			if(parseInt(l2cell12img.attr("data-img")) != l2cell12){
				return false;
			}		
		}else{
			return false;
		}
		

		if(l2cell22img.size()){			
			if(parseInt(l2cell22img.attr("data-img")) != l2cell22){
			return false;
			}			
		}else{
			return false;
		}
		
		if(l2cell21img.size()){			
			if(parseInt(l2cell21img.attr("data-img")) != l2cell21){
			return false;
			}			
		}else{
			return false;
		}		
		
		// lavel 1 passed 
		$("#lavel2 .success").show();
		
		clearInterval(lavel1timer);
		clearTimeout(lavel1timeovertimer);
		
		
		setTimeout(startLavel3,lavelIntervel);
		
		

	}


	
}


// lavel 3 procedure
function startLavel3(){

showScreen(5);
var lavel1timer = null;
var lavel1timeovertimer = null;
var timerInterval = 1000;
var lavelDuration = 1000 * 2 * 60; // 3 minutes
var progressWidth = 310;


	lavel1timer = setInterval(updateProgressBar1,timerInterval);
	lavel1timeovertimer = setTimeout(lavel1Timeout,lavelDuration);

	$( "#lavel3 .imgdrag" ).draggable({ revert: "invalid" });
    $( "#lavel3 .imgdrop" ).droppable({
	  tolerance: "intersect",
      drop: function( event, ui ) {
      console.log($(this));
		console.log(ui);
		// [1-9] = 1,3 +- nth cell allowed to drop only.
		
		var cellHasImgAlready = $(this).find("img").size();
		var draggedImg = ui.draggable;
		
		var canDrop = 0;
		var cellId = parseInt($(this).attr("data-id")); // dropped cell id
		var cellImgId = parseInt(draggedImg.attr("data-id")); // dragged cell id
		var leftCellId = cellImgId - 1;
		var rightCellId = cellImgId + 1;
		var topCellId = cellImgId - 3;
		var bottomCellId = cellImgId + 3;
		
		
		console.log(rightCellId);
		if(cellId == leftCellId || cellId == rightCellId || cellId == topCellId || cellId == bottomCellId){
			canDrop = 1;
		}
		
		if((cellHasImgAlready == 0) && canDrop){
			$(draggedImg).css({"left":"0px","top":"0px"});
			draggedImg.attr("data-id",cellId);
			$(this).html(draggedImg);
			
			$(this).attr("data-img",draggedImg.attr("data-img"));
			
			checkIfmathced();
			
		}else{
			ui.draggable.draggable('option','revert',true); 
		}
		
      }
    });
	
	function updateProgressBar1(){
		
		var pwidth = parseFloat(jQuery("#lavel3 .lavelprogressbar").attr("data-width"));
		pwidth -=  parseFloat(progressWidth/(lavelDuration/timerInterval) );
		jQuery("#lavel3 .lavelprogressbar").css({width:pwidth+"px"});
		jQuery("#lavel3 .lavelprogressbar").attr("data-width",pwidth);
		
		
	}

	function lavel1Timeout(){
		
		clearInterval(lavel1timer);
		
		setTimeout(showThankyouPage,lavelIntervel);
		
	}

	
	function checkIfmathced(){
		var l3cell32 = 9;
		var l3cell22 = 10;
		var l3cell23 = 9;
		
		
		var l3cell32img = $("td#l3cell32").find("img");
		var l3cell22img = $("td#l3cell22").find("img");
		var l3cell23img = $("td#l3cell23").find("img");
		
		if(l3cell32img.size()){			
			if(parseInt(l3cell32img.attr("data-img")) != l3cell32){
				return false;
			}		
		}else{
			return false;
		}
		

		if(l3cell22img.size()){			
			if(parseInt(l3cell22img.attr("data-img")) != l3cell22){
			return false;
			}			
		}else{
			return false;
		}
		
		if(l3cell23img.size()){			
			if(parseInt(l3cell23img.attr("data-img")) != l3cell23){
			return false;
			}			
		}else{
			return false;
		}		
		
		// lavel 1 passed 
		$("#lavel3 .success").show();
		setTimeout(showThankyouPage,lavelIntervel);
		clearInterval(lavel1timer);
		clearTimeout(lavel1timeovertimer);
		

	}


	
}


function showThankyouPage(){	
showScreen(6);	
}
