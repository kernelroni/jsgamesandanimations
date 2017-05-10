var canvasDiv = document.getElementById('canvasDiv');
var innerWidth = window.innerWidth;
var innerHeight = window.innerHeight - 5;	
var canvas = document.createElement('canvas');


canvasDiv.appendChild(canvas);
canvas.setAttribute('width', innerWidth);
canvas.setAttribute('height', innerHeight);
canvas.setAttribute('id', 'thecanvas');
context = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var Ball = function(){
		
		this.x = Math.random() * canvasWidth;
		this.y = Math.random() * canvasHeight;
		this.d = 1;
		this.r = Math.random() * 5;
		this.dx = 2;
		this.dy = -2;
		this.m = 1;
		this.color = "yellow";
		this.gravity = 0.9;
		this.timer = 0.1;
		this.forcefactor = 0.3;
		this.draw = drawBall;
		this.move = collision;
};
var BallArray = new Array();
var totalBall = 500;

var i = 0;








