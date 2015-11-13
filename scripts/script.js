var canvas = document.createElement('canvas');
var canvasWidth = 750;
var canvasHeight = 500;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');
var player = new Player();
var computer = new Computer();
var ball = new Ball(70,50);

var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     ||
        function(callback) { window.setTimeout(callback, 1000/60) };

window.onload = function () {
  document.getElementById('container').appendChild(canvas);
  animate(step);
}

var keysDown = {};

window.addEventListener("keydown", function(event) {
  keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
  delete keysDown[event.keyCode];
});

var render = function() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  player.render();
  computer.render();
  ball.render();
};

var step = function() {
  //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  update();
  render();
  animate(step);
};

var update = function() {
  player.update();
  ball.update();
};


/**** BUILD PADDLES ****/
function Paddle(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.x_speed = 0;
  this.y_speed = 0;
}

Paddle.prototype.render = function() {
  ctx.fillStyle = "#fff";
  ctx.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function (diff) {
  this.y += diff;
};

function Computer() {
  this.paddle = new Paddle(720, 10, 10, 70);
}

Computer.prototype.render = function() {
  this.paddle.render();
};

function Player() {
  this.paddle = new Paddle(10, 10, 10, 70);
}

Player.prototype.update = function() {
  for(var key in keysDown) {
    var value = Number(key);
    if(value == 38) { // up 
      this.paddle.move(0, -4);
    } else if (value == 40) { // down 
      this.paddle.move(0, 4);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

Paddle.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  this.x_speed = x;
  this.y_speed = y;
  if(this.y < 0) { 
    this.y = 0;
    this.y_speed = 0;
  } else if (this.y + this.height > 500) { // all the way to the right
    this.y = 500 - this.height;
    this.y_speed = 0;
  }
}

Player.prototype.render = function() {
  this.paddle.render();
};

function Ball(x, y) {
  this.x = x;
  this.y = y;
  this.x_speed = 3;
  this.y_speed = 0;
}

Ball.prototype.render = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 7, 2 * Math.PI, false);
    ctx.fillStyle = "#fff";
    ctx.fill();
};

Ball.prototype.update = function() {
  this.x += this.x_speed;
  this.y += this.y_speed;
};