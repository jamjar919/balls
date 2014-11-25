//BEGIN LIBRARY CODE
var x;
var y;
var dx;
var dy;
var q;
var w;
var dq;
var dw;
var g = 0.98;
var bounce = 0.9;
var mew = 0.9;
var radius;
var WIDTH;
var HEIGHT;
var ctx;
var collisions;
var distance;
var angle;
var gravity = true;
var collisions = true;
function Randomise () {
	x = Math.random() * (650) + 50;
	y = Math.random() * (650) + 50;
	q = Math.random() * (650) + 50;
	w = Math.random() * (650) + 50;
	dx = (Math.random() * (20)) -10;
	dy = (Math.random() * (20)) -10;
	dq = (Math.random() * (20)) -10;
	dw = (Math.random() * (20)) -10;
}
function init() {
	collisons = 0;
	radius = 50;
	angle=0;
	Randomise();
	ctx = $('#balls')[0].getContext("2d");
	WIDTH = $("#balls").width();
	HEIGHT = $("#balls").height();
	return setInterval(draw, 10);
}
function UpdateValues() {
	document.getElementById("x1").textContent = Math.round(x);
	document.getElementById("y1").textContent = Math.round(y);
	document.getElementById("x2").textContent = Math.round(q);
	document.getElementById("y2").textContent = Math.round(w);
	document.getElementById("dx").textContent = Math.round(dx*10)/10;
	document.getElementById("dy").textContent = Math.round(dy*10)/10;
	document.getElementById("dq").textContent = Math.round(dq*10)/10;
	document.getElementById("dw").textContent = Math.round(dw*10)/10;
	document.getElementById("g").textContent = g;
	document.getElementById("mew").textContent = mew;
	document.getElementById("mew2").textContent = bounce;
	document.getElementById("angle").textContent = Math.round((angle * (180 / Math.PI))*10)/10;
}
function circle(x,y,r,fillstyle) {
  ctx.beginPath();
  ctx.fillStyle = fillstyle;
  ctx.arc(x, y, r, 0, Math.PI*2, true);
  ctx.closePath();
  ctx.fill();
}
function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}
function CheckBounce() {  
distance = Math.sqrt((((x+dx)-(q+dq))*((x+dx)-(q+dq)) + ((y+dy)-(w+dw))*((y+dy)-(w+dw))));
	if (distance < 2*radius) {
	angle = Math.asin((dx-dq)/(Math.sqrt(((dx-dq)*(dx-dq))+((dy-dw)*(dy-dw)))));
	UpdateValues();
	//dx = -(dx-dq)*(bounce/2);
	//dq = -(dq-dx)*(bounce/2);
	//dw = -(dw-dy)*(bounce/2);
	//dy = -(dy-dw)*(bounce/2);
	dx = ((dq-dx)*(Math.cos(angle)))*(bounce);
	dy = ((dw-dy)*(Math.sin(angle)))*(bounce);
	dq = ((dq-dx)*(Math.cos(angle)))*(bounce);
	dw = ((dw-dy)*(Math.sin(angle)))*(bounce);
	distance = Math.sqrt((((x+dx)-(q+dq))*((x+dx)-(q+dq)) + ((y+dy)-(w+dw))*((y+dy)-(w+dw))));
	}
}
var upDown;
var downDown;
var leftDown;
var rightDown;
function OnKeyUp(evt) {
	if (evt.keyCode == 39) { rightDown = false; }
	if (evt.keyCode == 37) { leftDown = false; }
	if (evt.keyCode == 38) { upDown = false; }
	if (evt.keyCode == 40) { downDown = false; }	
}
function OnKeyDown(evt) {
	if (evt.keyCode == 39) { rightDown = true; }
	if (evt.keyCode == 37) { leftDown = true; }
	if (evt.keyCode == 38) { upDown = true; }
	if (evt.keyCode == 40) { downDown = true; }	
}
function GravityCheck() {
	var chkBox = document.getElementById('GravityCheck');
	if (chkBox.checked) {
		g = 0.98;
		gravity = true;
	} else {
		g = 0;
		gravity = false;
	}
	UpdateValues();
}
function CollisionCheck() {
	var chkBox = document.getElementById('CollisionCheck');
	if (chkBox.checked) {
		collisions = true;
	} else {
		collisions = false;
	}
	UpdateValues();
}
function FrictionCheck() {
	var chkBox = document.getElementById('FrictionCheck');
	if (chkBox.checked) {
		mew = 0.9;
		bounce = 0.9;
	} else {
		mew = 1;
		bounce = 1;
	}
	UpdateValues();
}
//END LIBRARY CODE
function draw() {
  clear();
  circle(x, y, radius, 'black');
  circle(q, w, radius, 'grey');
 
 if ((x+radius) + dx > WIDTH || (x-radius) + dx < 0){
    dx = -dx*(mew);
}
  if ((y+radius) + dy > HEIGHT || (y-radius) + dy < 0){
	dy = dy - g;
    dy = -dy*(bounce);
}
	
  if ((q+radius) + dq > WIDTH || (q-radius) + dq < 0){
    dq = -dq*(mew);	
}
  if ((w+radius) + dw > HEIGHT || (w-radius) + dw < 0) {
	dw = dw - g;
    dw = -dw*(bounce);
}
	jQuery(document).bind('keydown', function (evt){
		OnKeyDown(evt);
	});
	jQuery(document).bind('keyup', function (evt){
		OnKeyUp(evt);
	});
	if (upDown) { dy = dy - 1;}
	else if (downDown) {dy = dy + 1;}
	else if (rightDown) {dx = dx + 1;}
	else if (leftDown) {dx = dx - 1;}
	
	if (collisions) {
		CheckBounce();
	}
	UpdateValues();
	
  x += dx;
  y += dy;
  
  q += dq;
  w += dw;
  
  dy = dy + (g);
  dw = dw + (g);
  
}
		//window.addEventListener("load", init, false);
