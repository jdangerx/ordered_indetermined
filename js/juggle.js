var bars = [];

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
    var v0 = wh/(ncolumns);
    var acc = wh/(ncolumns * 50);
    var cwidth = window.innerWidth/ncolumns;
    var bheight = window.innerHeight/5;
    var npasses = 2;
    var opacity = 1/(npasses*50);
    var c_box = new Bar(i*cwidth, Math.random()*wh/2+wh/8, 0, 255, 255, opacity, cwidth, bheight, Math.random()*v0-v0/2, Math.random()*acc - acc/2, ctx);
    var y_box = new Bar(i*cwidth, Math.random()*wh/2+wh/8, 255, 255, 0, opacity, cwidth, bheight, Math.random()*v0-v0/2, Math.random()*acc - acc/2, ctx);
    var m_box = new Bar(i*cwidth, Math.random()*wh/2+wh/8, 255, 0, 255, opacity, cwidth, bheight, Math.random()*v0-v0/2, Math.random()*acc - acc/2, ctx);
    var w_box = new Bar(i*cwidth, Math.random()*wh/2+wh/8, 255, 255, 255, opacity, cwidth, bheight, Math.random()*v0-v0/2, Math.random()*acc - acc/2, ctx);
    for (var j = 0; j < npasses; j++){
      bars.push(w_box);
      bars.push(y_box);
      bars.push(c_box);
      bars.push(m_box);
    }
  }
  update();
}

$(document).ready(init);
