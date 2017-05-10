var result = {
	
	
};
var level1task=
[

	[0,1,1,1,0],
	[1,1,1,1,1],
	[0,1,1,1,0]
];
var level1objects=
[
	[[1,1],[1,0]],
	[[1,1],[1,0],[1,0]],
	[[0,1],[1,1],[0,1]]
]
var level1imgs=
[
	"11c","10c","12c"
]
var level2task=
[
	[0,0,1,1,0],
	[1,1,1,1,1],
	[0,1,1,1,1],
	[0,1,1,1,1]
];
var level2objects=
[
	[[1,1],[1,0]],
	[[0,0,1],[1,1,1]],
	[[1,0],[1,1]],
	[[0,1,1],[1,1,0]],
	[[1]],
];
var level2imgs=
[
	"15c","6c","16c","8c","9c"
]
var level3task=
[
	[0,0,1,0,1,0],
	[1,1,1,1,1,1],
	[0,1,1,1,1,1],
	[1,1,1,1,1,0],
	[0,0,1,1,0,0],
];
var level3objects=
[
	[[1,1,1],[0,0,1]],
	[[1,0],[1,1],[0,1]],
	[[1,1]],
	[[1,1],[1,0]],
	[[1,0],[1,1]],
	[[0,1],[0,1],[1,1]]
];
var level3imgs=
[
	"1c","3c","2c","15c","5c","4c"
]


var levelIntro=
[
	[0,1,0],
	[1,1,1],
	[1,1,1]
];
var levelIntroObjects=
[
	[[1]],
	[[1,1],[1,0]],
	[[0,1],[1,1]]
];
var Introimgs=
[
	"13c","15c","14c"
]
var cursorTrack=null;


var lavelIntervel = 3000; // 3 sec
function int(inn){
	return Math.floor(inn);
}
function getCont(x,y)
{
	for(var i=0;i<containers.length;i++){
    	var rect=containers[i].div.getBoundingClientRect();
		if(rect.left<x&&rect.right>x&&rect.top<y&&rect.bottom>y)
			return containers[i];
	}
	return null;
}



var containers=[];
var pieces=[];
var checkIfmathced=null;
var sqareSize=35.0;
function testBoard(piece)
{
	var rect=piece.div.getBoundingClientRect();
	var cont=getCont(rect.left+sqareSize,rect.top+sqareSize);
	if(!cont)return false;
	var y=piece.div.offsetTop-piece.div.parentNode.offsetTop+sqareSize/2;
	var x=piece.div.offsetLeft-piece.div.parentNode.offsetLeft+sqareSize/2;
	return cont.testPos(int(x/sqareSize),int(y/sqareSize),piece);
}
function findPiece(x,y)
{
	for(var i=0;i<pieces.length;i++){
		var pic=pieces[i];
		if(pic.isOver(x,y)) return pic;
	}
	return null;
}
function checkComplete()
{
	return containers[0].complete();
}

function detachPiece(piece)
{
	for(var i=0;i<containers.length;i++){
		var cont=containers[i]
	if(cont)
	 	cont.remove(piece);
	}
}
function getPiece(id)
{
	return pieces.filter(function(el){ return id==el.div.id})[0];
}

function setToBoard(piece)
{
	var rect=piece.div.getBoundingClientRect();
	var cont=getCont(rect.left+sqareSize,rect.top+sqareSize);
	if(!cont)return false;
	var y=piece.div.offsetTop-piece.div.parentNode.offsetTop+sqareSize/2;
	var x=piece.div.offsetLeft-piece.div.parentNode.offsetLeft+sqareSize/2;
	return cont.setPos(int(x/sqareSize),int(y/sqareSize),piece);
}

jQuery(document).ready(function(){
	
	
	initIntro();
	showScreen(1);

	//startLavel1();
	//startLavel2();
	//startLavel3();
	
	// play tutorial
	/*jQuery(document).on("click","#lavelx", function(){
		showScreen(2);
	});*/
	var onlyOnce=true;
	jQuery(document).on("click","#clicktobegin a", function(){
		if(!onlyOnce) return;
			onlyOnce=false;
		showScreen(3);
		prepereLevel();
		setTimeout(function(){
			startLavel1();
		},1000);
	});	
	jQuery(document).on("click","#navigation-next", function(){
	
	moveIntro(true)
	});	
	jQuery(document).on("click","#navigation-back", function(){
	
	moveIntro(false)
	})
	

});

var currentIntro=0;
function initIntro()
{

	var objects=levelIntroObjects;

	var level=levelIntro;

	var imgs=Introimgs;

	currentIntro=1;
	$("#lavelx .success").hide();
	containers=[];
	pieces=[];
	//$("#lavelx .success").show();
	var boardcon=$( "#lavelx .gameboard" )[0];
	boardcon.innerHTML="";
	var board=new Board(level,false);
	containers.push(board);
	boardcon.appendChild(board.div);
	var palete=$( "#lavelx .botompaletecenter" )[0];
	palete.innerHTML="";
	for(var k=0;k<objects.length;k++){
		var obj=objects[k];
	 	var board1=new Board(obj,imgs[k]);
		 board1.div.style.float="left";
		 board1.div.style.marginLeft="25px";
		containers.push(board1);
		palete.appendChild(board1.div);
		var piece=new Piece(obj,imgs[k]);
		pieces.push(piece);
		board1.setPos(0,0,piece);
		piece.stable={left:0,top:0,div:board1.div};
		board1.div.appendChild(piece.div);
	}	
}
function moveIntro(next)
{
	if(next)
		currentIntro++;
	else currentIntro--;
	if(currentIntro<1)currentIntro=1;
	if(currentIntro>5)currentIntro=5;
	if(1==currentIntro)
	{
		$( "#lavelx span" )[0].innerHTML="1/5";
		jQuery("#lavelx .tutorialdemotxt")[0].innerHTML="<a href=\"#\">OVERVIEW</a>: A set of shapes will appear at the bottom of the screen";
		jQuery("#lavelx .tutorialdemotxt1")[0].innerHTML="&nbsp";
		if(pieces[0].div.parentNode)
				pieces[0].div.parentNode.removeChild(pieces[0].div);
		pieces[0].div.style.marginLeft=0+"px";
		pieces[0].div.style.marginTop=0+"px";
		containers[1].div.appendChild(pieces[0].div);
		if(pieces[1].div.parentNode)
				pieces[1].div.parentNode.removeChild(pieces[1].div);
		pieces[1].div.style.marginLeft=0+"px";
		pieces[1].div.style.marginTop=0+"px";
		containers[2].div.appendChild(pieces[1].div);
		if(pieces[2].div.parentNode)
				pieces[2].div.parentNode.removeChild(pieces[2].div);
		pieces[2].div.style.marginLeft=0+"px";
		pieces[2].div.style.marginTop=0+"px";
		containers[3].div.appendChild(pieces[2].div);
	}
	if(2==currentIntro)
	{
		$( "#lavelx span" )[0].innerHTML="2/5";
		jQuery("#lavelx .tutorialdemotxt")[0].innerHTML=
		"<a href=\"#\">GOAL:</a> Fill the cubes above using the shapes from the bottom as quickly as you can.";
		jQuery("#lavelx .tutorialdemotxt1")[0].innerHTML=
		"Simply click-and-drag each shape into the correct position (click next to see how it works).";

		if(pieces[0].div.parentNode)
				pieces[0].div.parentNode.removeChild(pieces[0].div);
		pieces[0].div.style.marginLeft=sqareSize+"px";
		pieces[0].div.style.marginTop=0+"px";
		containers[0].div.appendChild(pieces[0].div);
		if(pieces[1].div.parentNode)
				pieces[1].div.parentNode.removeChild(pieces[1].div);
		pieces[1].div.style.marginLeft=0+"px";
		pieces[1].div.style.marginTop=0+"px";
		containers[2].div.appendChild(pieces[1].div);
		if(pieces[2].div.parentNode)
				pieces[2].div.parentNode.removeChild(pieces[2].div);
		pieces[2].div.style.marginLeft=0+"px";
		pieces[2].div.style.marginTop=0+"px";
		containers[3].div.appendChild(pieces[2].div);
		
	}
	if(3==currentIntro)
	{
		$( "#lavelx span" )[0].innerHTML="3/5";
		jQuery("#lavelx .tutorialdemotxt")[0].innerHTML=
		"&nbsp";
		jQuery("#lavelx .tutorialdemotxt1")[0].innerHTML=
		"(Continue next)";

		if(pieces[0].div.parentNode)
				pieces[0].div.parentNode.removeChild(pieces[0].div);
		pieces[0].div.style.marginLeft=sqareSize+"px";
		pieces[0].div.style.marginTop=0+"px";
		containers[0].div.appendChild(pieces[0].div);
		if(pieces[1].div.parentNode)
				pieces[1].div.parentNode.removeChild(pieces[1].div);
		pieces[1].div.style.marginLeft=0+"px";
		pieces[1].div.style.marginTop=sqareSize+"px";
		containers[0].div.appendChild(pieces[1].div);
		if(pieces[2].div.parentNode)
				pieces[2].div.parentNode.removeChild(pieces[2].div);
		pieces[2].div.style.marginLeft=0+"px";
		pieces[2].div.style.marginTop=0+"px";
		containers[3].div.appendChild(pieces[2].div);



		$("#lavelx .success").hide();
	}
	if(4==currentIntro)
	{
		$( "#lavelx span" )[0].innerHTML="4/5";
		jQuery("#lavelx .tutorialdemotxt")[0].innerHTML=
		"&nbsp";
		jQuery("#lavelx .tutorialdemotxt1")[0].innerHTML=
		"(Continue next for the Guidelines)";
		$("#lavelx .success").show();


				if(pieces[0].div.parentNode)
				pieces[0].div.parentNode.removeChild(pieces[0].div);
		pieces[0].div.style.marginLeft=sqareSize+"px";
		pieces[0].div.style.marginTop=0+"px";
		containers[0].div.appendChild(pieces[0].div);
		if(pieces[1].div.parentNode)
				pieces[1].div.parentNode.removeChild(pieces[1].div);
		pieces[1].div.style.marginLeft=0+"px";
		pieces[1].div.style.marginTop=sqareSize+"px";
		containers[0].div.appendChild(pieces[1].div);
		if(pieces[2].div.parentNode)
				pieces[2].div.parentNode.removeChild(pieces[2].div);
		pieces[2].div.style.marginLeft=sqareSize+"px";
		pieces[2].div.style.marginTop=sqareSize+"px";
		containers[0].div.appendChild(pieces[2].div);
		showScreen(1);
	}
	if(5==currentIntro)
	{
		showScreen(2);
	}
}
// show game screens having screen{id}
function showScreen(n){
	
	$(".container").hide();
	$("div#screen"+n).show();
}

function prepereLevel()
{

//tracking mouse movement for user defind drag and drop
$(document).mousemove(function(e){
	processTouchMove(e);
})
//checking piece position and moveing it if can
$('#screen3').mouseup(function()
{
	processTouchEnd();
});
$('#screen3')[0].addEventListener("touchmove", function(e){processTouchMove({pageX:e.touches[0].pageX,pageY:e.touches[0].pageY});}, false);
$('#screen3')[0].addEventListener("touchend",processTouchEnd,false);
function processTouchMove(e)
{
	    mm = {
        x: e.pageX ,
        y: e.pageY 
    };
	if(cursorTrack)
	{
		
		var cont=getCont(mm.x,mm.y);
		if(!cont) 
			 cont={div:$('.cheetSheet')[0]};
		if(cont){
		var off=cont.div.getBoundingClientRect();
		if(cursorTrack.div.parentNode!=cont.div)
		{
			if(cursorTrack.div.parentNode)
					cursorTrack.div.parentNode.removeChild(cursorTrack.div);
			cont.div.appendChild(cursorTrack.div);
		}
		cursorTrack.div.style.marginLeft=mm.x-off.left-cursorTrack.x+'px';
		cursorTrack.div.style.marginTop=mm.y-off.top-cursorTrack.y+'px';
		}
	}
}
function processTouchEnd()
{
	if(!cursorTrack)return;
	if(!testBoard(getPiece(cursorTrack.div.id)))
	{
		getPiece(cursorTrack.div.id).restore();
		detachPiece(getPiece(cursorTrack.div.id));
		setToBoard(getPiece(cursorTrack.div.id));
	}
	else
	{
		if(cursorTrack){
			detachPiece(getPiece(cursorTrack.div.id));
			setToBoard(getPiece(cursorTrack.div.id));
			if(checkIfmathced)
				checkIfmathced();
		}
	}
	cursorTrack=null;
}
}
// lavel setting up level procedure
function startLavel(level,objects,imgs){
	showScreen(3);
	jQuery("#lavel1 .lavelprogressbar").attr("data-width","310");
	jQuery("#lavel1 .lavelprogressbar").css({width:310+"px"});
	$("#lavel1 .success").hide();
	var boardcon=$( "#lavel1 .gameboard" )[0];
	boardcon.innerHTML="";
	containers=[];
	pieces=[];
	var board=new Board(level,true);
	containers.push(board);
	boardcon.appendChild(board.div);
	var palete=$( "#lavel1 .botompaletecenter" )[0];
	palete.innerHTML="";
	for(var k=0;k<objects.length;k++){
		var obj=objects[k];
 	function scope(){
	 	var board1=new Board(obj,imgs[k]);
		containers.push(board1);
		board1.div.style.float="left";
		board1.div.style.marginLeft="25px";
		palete.appendChild(board1.div);
		var piece=new Piece(obj,imgs[k]);
		pieces.push(piece);
		board1.setPos(0,0,piece);
		piece.stable={left:0,top:0,div:board1.div};
		board1.div.appendChild(piece.div);
		piece.div.onmousedown=function(event)
		{
			 processTouchMouse(event);
 		}
		piece.div.addEventListener("touchstart", function(e){e.preventDefault(); processTouchMouse({pageX:e.touches[0].pageX,pageY:e.touches[0].pageY})}, false);
		piece.div.ondragstart=function(event){return false;};
		piece.div.ondrop=function(event){return false;};
		function processTouchMouse(event)
		{
			var ev=findPiece(event.pageX,event.pageY);
			console.log(" "+event.pageX+":"+event.pageY+"-"+ev+" "+piece.div.id);
			if(ev&&!cursorTrack){
				var rect=ev.div.getBoundingClientRect();
				cursorTrack={div:ev.div,x:event.pageX-rect.left,y:event.pageY-rect.top};
			}
		}
	}scope();
}	

}
//start level 1
function startLavel1()
{
	$( "#lavel1 span" )[0].innerHTML="1/3";
	var lavel1timer = null;
	var lavel1timeovertimer = null;
	var timerInterval = 1000;
	var lavelDuration = 1000 * 2 * 60; // 3 minutes
	var progressWidth = 310;
	var startStamp=Date.now();


	lavel1timer = setInterval(updateProgressBar1,timerInterval);
	lavel1timeovertimer = setTimeout(lavel1Timeout,lavelDuration);

	startLavel(level1task,level1objects,level1imgs);


		function updateProgressBar1(){
		
		var pwidth = parseFloat(jQuery("#lavel1 .lavelprogressbar").attr("data-width"));
		pwidth -=  parseFloat(progressWidth/(lavelDuration/timerInterval) );
		jQuery("#lavel1 .lavelprogressbar").css({width:pwidth+"px"});
		jQuery("#lavel1 .lavelprogressbar").attr("data-width",pwidth);

	}

	function lavel1Timeout(){
		
		clearInterval(lavel1timer);
		setTimeout(startLavel2,lavelIntervel);
		result.level1=
		{
			starttime : startStamp,
			endtime : Date.now(),
			completed : false,
			timeout : true	
		}
		
	}

	
	checkIfmathced=function (){
		if(!checkComplete()) return false;
		// lavel 1 passed 
		$("#lavel1 .success").show();
		result.level1=
		{
			starttime : startStamp,
			endtime : Date.now(),
			completed : true,
			timeout : false	
		}
		
		clearInterval(lavel1timer);
		clearTimeout(lavel1timeovertimer);
		setTimeout(startLavel2,lavelIntervel);
	}
}
//start level 2
function startLavel2()
{
	$( "#lavel1 span" )[0].innerHTML="2/3";
		var lavel2timer = null;
	var lavel2timeovertimer = null;
	var timerInterval = 1000;
	var lavelDuration = 1000 * 3 * 60; // 3 minutes
	var progressWidth = 310;
	var startStamp=Date.now();


	lavel2timer = setInterval(updateProgressBar2,timerInterval);
	lavel2timeovertimer = setTimeout(lavel2Timeout,lavelDuration);

	startLavel(level2task,level2objects,level2imgs);


		function updateProgressBar2(){
		
		var pwidth = parseFloat(jQuery("#lavel1 .lavelprogressbar").attr("data-width"));
		pwidth -=  parseFloat(progressWidth/(lavelDuration/timerInterval) );
		jQuery("#lavel1 .lavelprogressbar").css({width:pwidth+"px"});
		jQuery("#lavel1 .lavelprogressbar").attr("data-width",pwidth);

	}

	function lavel2Timeout(){
		
		clearInterval(lavel2timer);
		setTimeout(startLavel3,lavelIntervel);
		result.level2=
		{
			starttime : startStamp,
			endtime : Date.now(),
			completed : false,
			timeout : true	
		}
		
	}

	
	checkIfmathced= function(){
		if(!checkComplete()) return false;
		// lavel 1 passed 
		$("#lavel1 .success").show();
		result.level2=
		{
			starttime : startStamp,
			endtime : Date.now(),
			completed : true,
			timeout : false	
		}
		
		clearInterval(lavel2timer);
		clearTimeout(lavel2timeovertimer);
		setTimeout(startLavel3,lavelIntervel);
	}
	
}
//start level 3
function startLavel3()
{
	$( "#lavel1 span" )[0].innerHTML="3/3";
	var lavel3timer = null;
	var lavel3timeovertimer = null;
	var timerInterval = 1000;
	var lavelDuration = 1000 * 3 * 60; // 3 minutes
	var progressWidth = 310;
	var startStamp=Date.now();

	lavel3timer = setInterval(updateProgressBar3,timerInterval);
	lavel3timeovertimer = setTimeout(lavel3Timeout,lavelDuration);

	startLavel(level3task,level3objects,level3imgs);


		function updateProgressBar3(){
		
		var pwidth = parseFloat(jQuery("#lavel1 .lavelprogressbar").attr("data-width"));
		pwidth -=  parseFloat(progressWidth/(lavelDuration/timerInterval) );
		jQuery("#lavel1 .lavelprogressbar").css({width:pwidth+"px"});
		jQuery("#lavel1 .lavelprogressbar").attr("data-width",pwidth);

	}

	function lavel3Timeout(){
		
		clearInterval(lavel3timer);
		setTimeout(thankYou,lavelIntervel);
		result.level3=
		{
			starttime : startStamp,
			endtime : Date.now(),
			completed : false,
			timeout : true	
		}
		
	}

	
	checkIfmathced= function(){
		if(!checkComplete()) return false;
		// lavel 1 passed 
		$("#lavel1 .success").show();
		result.level3=
		{
			starttime : startStamp,
			endtime : Date.now(),
			completed : true,
			timeout : false	
		}
		
		clearInterval(lavel3timer);
		clearTimeout(lavel3timeovertimer);
		setTimeout(thankYou,lavelIntervel);
	}
	
}
function thankYou()
{
	showScreen(6);
}

if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}