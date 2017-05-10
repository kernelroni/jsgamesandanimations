var result = {
	
	
};
var lavelIntervel = 3000; // 3 sec

var youhave = 15.00;




jQuery(document).ready(function(){
	
	jQuery(".youhavetotal").html(youhave);
	jQuery("#transferingamount").val("");
	
	//showScreen(1);

	
	
	jQuery(document).on("click","a.clicktobegin", function(){
	showScreen(2);
	});	

	jQuery(document).on("click","button.btnNextOverview", function(){
	var nextscreen = $(this).attr("data-next-screen");
	showScreen(nextscreen);
	});	

	jQuery(document).on("click","a.finishbtn", function(){
	var nextscreen = $(this).attr("data-next-screen");
	
	var radionchecked = jQuery("input.entrustradion:checked").length;
	jQuery("tr.radiostr").removeClass("redborder");
	
	if(radionchecked>0){
		showScreen(nextscreen);
	}else{
		jQuery("tr.radiostr").addClass("redborder");
	}
	
	console.log(radionchecked);
	
	
	});	
	
	jQuery(document).on("click",".transferbtn", function(){
	
	var nextscreen = $(this).attr("data-next-screen");
	jQuery(".transfersection .input-group").removeClass("error");
	
	var transferingamount = parseFloat(jQuery("#transferingamount").val());
	if(isNaN(transferingamount)) {
		transferingamount = 0;
		jQuery(".transfersection .input-group").addClass("error");
	}
	
	transferingamount = transferingamount.toFixed(2); 
	
if(transferingamount<=0 || transferingamount>15 ){
		return false;
	}
	
	youhave = youhave - transferingamount;
	
	jQuery(".youhavenow").html(youhave);
	
	var lisaamount = transferingamount * 3;
	lisaamount = lisaamount.toFixed(2); 
	
	var lisasent = 1 + Math.random() * 14;
	
	lisasent = lisasent.toFixed(2);
	var lisahas = lisaamount - lisasent;
	lisahas = lisahas.toFixed(2); 
	
	jQuery(".transferamountlabel").html(transferingamount);
	jQuery(".lisaamount").html(lisaamount);
	jQuery(".lisasent").html(lisasent);
	jQuery(".lisahas").html(lisahas);
	
	var youhavetotal = parseFloat(youhave) + parseFloat(lisasent);
	youhavetotal = youhavetotal.toFixed(2);
	
	jQuery(".yourtotal").html(youhavetotal);
	
	
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
