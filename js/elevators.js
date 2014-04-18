// var scene, camera, renderer, geometry, material, mesh, particles, polyline;
var camera, renderer;
var scene = new THREE.Scene();
var people = [];
var DX = 30;

function init() {
  scene.fog = new THREE.Fog(0x111111);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 200;
  // geometry = new THREE.Geometry();

  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x111111, 1);

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  var person = new Person();
  people.push(person);
  // for (var i = 0; i < 10; i++) {
  //   var vertex = new THREE.Vector3(i, 0, 0);
  //   geometry.vertices.push(vertex);
  // }
  // material = new THREE.LineBasicMaterial({color: 0xFF2233, linewidth: 10, fog:true});
  // polyline = new THREE.Line(geometry, material);
  // scene.add(polyline);
  render();
}

function Person() {
  var geometry = new THREE.Geometry();
  var taillen = 10;
  for (var i = 0; i < taillen; i++) {
    var vertex = new THREE.Vector3(i, 0, 0);
    geometry.vertices.push(vertex);
  }
  var material = new THREE.LineBasicMaterial({color: 0xFF2233,
                                              linewidth: 10,
                                              fog:true});
  this.polyline = new THREE.Line(geometry, material);
  scene.add(this.polyline);
  this.velocity = new THREE.Vector3(1, 0, 0);
  this.sign = 1;
}

Person.prototype.move = function () {
  var vertices = this.polyline.geometry.vertices
  for (var i = 0, len = vertices.length; i < len; i++) {
    if (i < len - 1) {
      var ith = vertices[i];
      var iplusone = vertices[i+1];
      ith.copy(iplusone);
    } else {
      var last_vertex = vertices[i];
      if (Math.abs(last_vertex.x) < 100) {
        this.velocity.setX(Math.random()*5);
        last_vertex.add(this.velocity.multiplyScalar(this.sign));
      } else {
        this.sign = this.sign * -1;
        last_vertex.add(this.velocity.multiplyScalar(this.sign));
      }
    }
  }
  this.polyline.geometry.verticesNeedUpdate = true;
}

function render() {
  // polyline.rotation.x += 0.01;
  // polyline.rotation.y += 0.01;
  // polyline.rotation.z += 0.01;
  for (var i in people) {
    people[i].move();
  }


  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

$(document).ready(init);
