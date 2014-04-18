// var scene, camera, renderer, geometry, material, mesh, particles, polyline;
var camera, renderer;
var scene = new THREE.Scene();
var people = [];
var dS = 70;

function init() {
  scene.fog = new THREE.Fog(0x111111, 1, 500);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 200;

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x111111, 1);

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // var person = new Person();
  for (var i = 0; i < 100; i++) {
    people.push(new Person());
  }
  render();
}

function Person() {
  var geometry = new THREE.Geometry();
  var taillen = 30;
  var init_pos = new THREE.Vector3(Math.round(Math.random()*2*dS-dS),
                                   Math.round(Math.random()*2*dS-dS),
                                   Math.round(Math.random()*2*dS-dS));
  for (var i = 0; i < taillen; i++) {
    var vertex = new THREE.Vector3(i, 0, 0);
    vertex.add(init_pos);
    geometry.vertices.push(vertex);
  }
  var color = new THREE.Color(Math.random()*0.5+0.5,
                              Math.random()*0.5+0.5,
                              Math.random()*0.5+0.5);
  var material = new THREE.LineBasicMaterial({color: color.getHex(),
                                              linewidth: 2,
                                              fog:true});
  this.polyline = new THREE.Line(geometry, material);
  scene.add(this.polyline);
  this.velocity = new THREE.Vector3(1, 0, 0);
  this.sign = 1;
  this.dests = [];
}

Person.prototype.move = function () {
  if (this.dests.length == 0) {
    this.dests.push(new THREE.Vector3(Math.round(Math.random()*2*dS-dS),
                                      Math.round(Math.random()*2*dS-dS),
                                      Math.round(Math.random()*2*dS-dS)));
  }

  var vertices = this.polyline.geometry.vertices
  for (var i = 0, len = vertices.length; i < len; i++) {
    if (i < len - 1) {
      vertices[i].copy(vertices[i+1]);
    } else {
      var last_vertex = vertices[i];
      var dX = clamp(this.dests[0].x - last_vertex.x, -1, 1);
      var dY = clamp(this.dests[0].y - last_vertex.y, -1, 1);
      var dZ = clamp(this.dests[0].z - last_vertex.z, -1, 1);
      if (dX != 0) {
        this.velocity.set(dX, 0, 0);
      } else if (dY != 0) {
        this.velocity.set(0, dY, 0);
      } else if (dZ != 0) {
        this.velocity.set(0, 0, dZ);
      } else {
        this.velocity.set(0, 0, 0);
        this.dests.pop();
      }
      last_vertex.add(this.velocity);
    }
  }
  this.polyline.geometry.verticesNeedUpdate = true;
}

function clamp(x, a, b) {
  return Math.max(a, Math.min(x, b));
}

function render() {
  for (var i in people) {
    people[i].move();
    people[i].polyline.rotation.y += 0.003;
    // people[i].polyline.rotation.x = 0.5;
    // people[i].polyline.rotation.z += 0.01;
  }


  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

$(document).ready(init);
