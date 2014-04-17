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
      for (var k = -3; k < 3; k++) {
        vertex = new THREE.Vector3(i * 10, j * 10, k * 10);
        geometry.vertices.push(vertex);
      }
    }
  }

  material = new THREE.ParticleSystemMaterial({size: 10, opacity:0.5, transparent:true, color: 0xFF00FF});
  mesh = new THREE.ParticleSystem(geometry, material);
  scene.add(mesh)

  console.log(renderer.getClearAlpha());
  render();
}

function render() {
  requestAnimationFrame(render);
  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  mesh.rotation.z += 0.01;

  for (var i = 0, len = mesh.geometry.vertices.length; i < len; i++) {
    var vertex = mesh.geometry.vertices[i];
    var dx = 2;
    vertex.setX(vertex.x + Math.random() * dx - 0.5 * dx);
    vertex.setY(vertex.y + Math.random() * dx - 0.5 * dx);
    vertex.setZ(vertex.z + Math.random() * dx - 0.5 * dx);
  }
  mesh.geometry.verticesNeedUpdate = true;
  renderer.render(scene, camera);

}

$(document).ready(init);
