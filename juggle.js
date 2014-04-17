var bars = [];
var acc = 1;

function Bar(y, r, g, b, a, ctx) {
  this.y = y;
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
  this.ctx = ctx;
  this.v = -10;
  this.acc = acc;
}

Bar.prototype.draw = function () {
  this.fillStyle =
    "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a +")";
  this.ctx.fillStyle = this.fillStyle;
  this.ctx.fillRect(0, this.y, 500, 50);
};

Bar.prototype.move = function () {
  this.ctx.clearRect(0,this.y,500,50);
  this.y = this.y + this.v;
  if (this.y > 250) {
    this.v = -this.v;
  } else {
    this.v = this.v + this.acc;
  }
  $("debug").html(""+ this.y);
};

function update() {
  for (var i = 0, bar; bar = bars[i++];) {
  bar.move();
  }
  for (var i = 0, bar; bar = bars[i++];) {
  bar.draw();
  }
}

function draw() {
  var canvas = document.getElementById("bg");
  var ctx = canvas.getContext("2d");
  var red_box = new Bar(100, 255, 255, 0, 0.5, ctx);
  bars.push(red_box);
  var green_box = new Bar(50, 0, 255, 255, 0.5, ctx);
  bars.push(green_box);
  var blue_box = new Bar(150, 255, 0, 255, 0.5, ctx);
  bars.push(blue_box);
  window.setInterval(update, 30);
}

$(document).ready(draw);
