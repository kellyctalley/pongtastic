var canvas = document.createElement('canvas');
var canvasWidth = 750;
var canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');
var player = new Player();
var computer = new Computer();
var ball = new Ball(50,50);

window.onload = function () {
  document.getElementById('container').appendChild(canvas);
  render();
}

/**** CANVAS GRID ****/
/*for (var x = 0; x < 750; x += 10) {
	ctx.moveTo(x,0);
	ctx.lineTo(x,500);
}

for (var y = 0; y < 500; y += 10) {
	ctx.moveTo(0,y);
	ctx.lineTo(750,y);
}

ctx.strokeStyle = "#ddd";
ctx.stroke();*/

var render = function() {
  player.render();
  computer.render();
  ball.render();
};

/**** BUILD PADDLES ****/
function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Paddle.prototype.render = function() {
  ctx.fillStyle = "#000";
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

function Computer() {
  this.paddle = new Paddle(720, 10, 20, 60);
}

Computer.prototype.render = function() {
  this.paddle.render();
};

function Player() {
  this.paddle = new Paddle(10, 10, 20, 60);
}

Player.prototype.render = function() {
  this.paddle.render();
};

function Ball(x, y) {
  this.x = x;
  this.y = y;
}

Ball.prototype.render = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 10, 2 * Math.PI, false);
    ctx.fillStyle = "#000";
    ctx.fill();
  };



/*ctx.beginPath();
ctx.arc(x, y, radius, 2 * Math.PI, false);
ctx.fillStyle = 'green';
ctx.fill();*/
