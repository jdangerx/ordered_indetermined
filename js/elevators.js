var scene, camera, renderer, geometry, material, mesh, particles;
var DX = 30;

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 100;
  geometry = new THREE.Geometry();

  renderer = new THREE.WebGLRenderer();

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  for (var i = -3; i < 3; i++){
    for (var j = -3; j < 3; j++) {
      vertex = new THREE.Vector3(i * 10, j * 10, 0);
      geometry.vertices.push(vertex);
    }
  }

  material = new THREE.ParticleSystemMaterial({size: 2, opacity:0.5, transparent:true});
  mesh = new THREE.ParticleSystem(geometry, material);
  scene.add(mesh)

  // var last_vertex = geometry.vertices[geometry.vertices.length-1];
  // var new_vertex = new THREE.Vector3(last_vertex.x + DX, last_vertex.y, last_vertex.z)
  // geometry.vertices.push(new_vertex);

  // var last_vertex = geometry.vertices[geometry.vertices.length-1];
  // var new_vertex = new THREE.Vector3(last_vertex.x, last_vertex.y + DX, last_vertex.z)
  // geometry.vertices.push(new_vertex);

  // geometry.computeLineDistances();
  // material = new THREE.LineBasicMaterial();
  // mesh = new THREE.Line(geometry, material, THREE.LineStrip);
  // scene.add(mesh)

  render();
}

function render() {
  requestAnimationFrame(render);
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y += 0.01;
  // mesh.rotation.z += 0.01;

  for (var i = 0; i < 36; i++) {
    var vertex = mesh.geometry.vertices[i];
    vertex.x += Math.random() * 2 - 1;
    vertex.y += Math.random() * 2 - 1;
  }
  mesh.geometry.__dirtyVertices = true;
  // mesh = new THREE.ParticleSystem(geometry, material);

  renderer.render(scene, camera);
}

$(document).ready(init);
