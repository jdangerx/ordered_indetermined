var bars = [];
var acc = 0.5;

function Bar(x, y, r, g, b, a, w, h, v, acc, ctx) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.g = g;
  this.b = b;
  this.a = a;
  this.ctx = ctx;
  this.w = w;
  this.h = h;
  this.v = v;
  this.acc = acc;
}

Bar.prototype.draw = function () {
  this.fillStyle =
    "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a +")";
  this.ctx.fillStyle = this.fillStyle;
  this.ctx.fillRect(this.x, this.y, this.w, this.h);
};

Bar.prototype.move = function () {
  // this.ctx.clearRect(this.x+1, this.y, this.w, this.h);
  this.y = this.y + this.v;
  if (this.y > window.innerHeight - this.h) {
    this.v = -this.v;
  } else if (this.y < 0) {
    this.v = -this.v;
  } else {
    this.v = this.v + this.acc;
  }
};

function update() {
  for (var i = 0, bar; bar = bars[i++];) {
  bar.move();
  }
  // this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (var i = 0, bar; bar = bars[i++];) {
  bar.draw();
  }
  window.requestAnimationFrame(update);
}

function init() {
  var canvas = document.getElementById("bg");
  var ctx = canvas.getContext("2d");
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
  var ncolumns = 200;
  for (var i = 0; i < ncolumns; i++) {
    var wh = window.innerHeight;
    var v0 = wh/(ncolumns / 2);
    var acc = wh/(ncolumns * 20);
    var cwidth = window.innerWidth/ncolumns;
    var bheight = window.innerHeight/5;
    // var bheight = cwidth;
    var y_box = new Bar(i*cwidth, Math.random()*wh/2+wh/4, 255, 255, 0, 0.33, cwidth, bheight, Math.random()*v0-v0/2, Math.random()*acc - acc/2, ctx);
    bars.push(y_box);
    var c_box = new Bar(i*cwidth, Math.random()*wh/2+wh/4, 0, 255, 255, 0.33, cwidth, bheight, Math.random()*v0-v0/2, Math.random()*acc - acc/2, ctx);
    bars.push(c_box);
    var m_box = new Bar(i*cwidth, Math.random()*wh/2+wh/4, 255, 0, 255, 0.33, cwidth, bheight, Math.random()*v0-v0/2, Math.random()*acc - acc/2, ctx);
    bars.push(m_box);
    var y_box = new Bar(i*cwidth, Math.random()*wh/2+wh/4, 255, 255, 0, 0.33, cwidth, bheight, Math.random()*v0-v0/2, Math.random()*acc - acc/2, ctx);
    bars.push(y_box);
    var c_box = new Bar(i*cwidth, Math.random()*wh/2+wh/4, 0, 255, 255, 0.33, cwidth, bheight, Math.random()*v0-v0/2, Math.random()*acc - acc/2, ctx);
    bars.push(c_box);
    var m_box = new Bar(i*cwidth, Math.random()*wh/2+wh/4, 255, 0, 255, 0.33, cwidth, bheight, Math.random()*v0-v0/2, Math.random()*acc - acc/2, ctx);
    bars.push(m_box);
  }
  update();
  // window.setInterval(update, 30);
}

$(document).ready(init);
