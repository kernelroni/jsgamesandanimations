var result = {
	grade:0
	
};

jQuery(document).ready(function(){
	
	
	
	//showScreen(1);

	
	
	jQuery(document).on("click","a.clicktobegin", function(){
	showScreen(2);
	});	

	jQuery(document).on("click","button.btnNextOverview", function(){
	var nextscreen = $(this).attr("data-next-screen");
	showScreen(nextscreen);
	});	

	jQuery(document).on("click","#gamefinish", function(){
	var nextscreen = $(this).attr("data-next-screen");
	
	 if (!$("input[name='grade']:checked").val()) {
		 
		jQuery("div.colorred").show();
        return false;
    }
	
	result.grade = $("input[name='grade']:checked").val();
	console.log(result);
	
	showScreen(nextscreen);
	});	
	
	
	
});

// show game screens having screen{id}
function showScreen(n){
	
	$(".container").hide();
	$("div#screen"+n).show();
}



function showThankyouPage(){	
showScreen(6);	
}
