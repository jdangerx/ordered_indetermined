// var scene, camera, renderer, geometry, material, mesh, particles, polyline;
var camera, renderer;
var scene = new THREE.Scene();
var people = [];
var elevators = [];
var dS = 100;
var elevator_spacing = 100;
var elevator_capacity = 4;
var floor_spacing = 25;
var num_people = 40;
var taillen = 200;
var rotation = true;

function init() {
  scene.fog = new THREE.Fog(0x111111, 150, 600);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 300;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor(0x181818, 1)

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  for (var i = 0; i < num_people; i++) {
    people.push(new Person());
  }

  elev_per_row = dS/elevator_spacing + 1;
  for (var i = 0; i < elev_per_row; i++) {
    for (var j = 0; j < elev_per_row; j++) {
      elevators.push(new Elevator(i*elevator_spacing - dS, j*elevator_spacing - dS, 0));
    }
  }
  render();
}

// function Elevator(x, y, z) {
  // this.velocity = 1;
  // this.passengers = [];
  // this.pos = new THREE.Vector3(x, y, z);
// }

// Elevator.move = function () {
  // if (Math.abs(this.pos.y) > dS) {
    // this.velocity = -this.velocity;
  // }
  // this.pos.y += this.velocity;
// }

function Person() {
  var geometry = new THREE.Geometry();
  var init_pos = new THREE.Vector3(Math.round(Math.random()*2*dS-dS),
                                   Math.round(Math.random()*2*dS/floor_spacing-1*dS/floor_spacing)*floor_spacing,
                                   Math.round(Math.random()*2*dS-dS));
  for (var i = 0; i < taillen; i++) {
    var vertex = new THREE.Vector3(0, 0, 0);
    vertex.add(init_pos);
    geometry.vertices.push(vertex);
  }
  var color = new THREE.Color(Math.random()*0.4+0.2,
                              Math.random()*0.5+0.5,
                              Math.random()*0.4+0.2);
  var material = new THREE.LineBasicMaterial({color: color.getHex(),
                                              linewidth: 1,
                                              fog:true});
  this.polyline = new THREE.Line(geometry, material);
  scene.add(this.polyline);
  this.velocity = new THREE.Vector3(1, 0, 0);
  this.dests = [];
}

function nearest_elevator(dest) {
  var new_dest = dest.clone();
  new_dest.divideScalar(elevator_spacing);
  new_dest.setX(Math.round(new_dest.x));
  new_dest.setZ(Math.round(new_dest.y));
  new_dest.multiplyScalar(elevator_spacing);
  return new_dest;
}
Person.prototype.move = function () {
  if (this.dests.length == 0) {
    var final_dest = new THREE.Vector3(Math.round(Math.random()*2*dS-dS),
                                       Math.round(Math.random()*2*dS/floor_spacing-1*dS/floor_spacing)*floor_spacing,
                                       Math.round(Math.random()*2*dS-dS));
    this.dests.push(final_dest);
    var elevator_top = nearest_elevator(final_dest);
    this.dests.push(elevator_top);
    // var elevator_bottom = nearest_elevator(final_dest);
  }
  var cur_dest = this.dests[this.dests.length-1]
  var vertices = this.polyline.geometry.vertices
  var last_vertex = vertices[vertices.length - 1];
  var dX = clamp(cur_dest.x - last_vertex.x, -1, 1);
  var dY = clamp(cur_dest.y - last_vertex.y, -1, 1);
  var dZ = clamp(cur_dest.z - last_vertex.z, -1, 1);

  for (var i = 0, len = vertices.length; i < len; i++) {
    if (i < len - 1) {
      vertices[i].copy(vertices[i+1]);
    } else {
      if (dX != 0) {
        this.velocity.set(dX, 0, 0);
      } else if (dZ != 0) {
        this.velocity.set(0, 0, dZ);
      } else if (dY != 0) {
        // for (i in elevators) {
        //   var elevator = elevators[i];
        //   // is there an elevator?
        //   if (elevator.passengers.length < elevator_capacity && elevator.pos.y == last_vertex.y) {
        //     this.velocity.set(0, dY, 0);
        //     // this.elevator = elevator;
        //   } else {
        //     this.velocity.set(0, 0, 0); // wait for an elevator
        //   }
        // }
        this.velocity.set(0, dY, 0);
      } else {
        // this.velocity.set(0, 0, 0);
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
    if (rotation == true) {
      people[i].polyline.rotation.y += 0.003;
      people[i].polyline.rotation.x = 0.5;
    }
  }

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

$(document).ready(init);
