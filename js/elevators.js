var scene, camera, renderer, geometry, material, mesh, particles, polyline;
var DX = 30;

function init() {
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x111111);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  camera.position.z = 200;
  geometry = new THREE.Geometry();

  // renderer = new THREE.CanvasRenderer();
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x111111, 1);

  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  for (var i = -5; i < 5; i++) {
    vertex = new THREE.Vector3(i, 0, 0);
    geometry.vertices.push(vertex);
  }
  material = new THREE.LineBasicMaterial({color: 0xFF2233, linewidth: 10, fog:true});
  polyline = new THREE.Line(geometry, material);
  scene.add(polyline);
  // for (var i = -3; i < 3; i++){
  //   for (var j = -3; j < 3; j++) {
  //     for (var k = -3; k < 3; k++) {
  //       vertex = new THREE.Vector3(i * 10, j * 10, k * 10);
  //       geometry.vertices.push(vertex);
  //     }
  //   }
  // }

  // material = new THREE.ParticleSystemMaterial({size: 10, opacity:0.5, transparent:true, color: 0xFF00FF});
  // mesh = new THREE.ParticleSystem(geometry, material);
  // scene.add(mesh)

  console.log(renderer.getClearAlpha());
  render();
}

var velocity = new THREE.Vector3(1, 0, 0);
var sign = 1;
function render() {
  // polyline.rotation.x += 0.01;
  // polyline.rotation.y += 0.01;
  // polyline.rotation.z += 0.01;
  for (var i = 0, len = polyline.geometry.vertices.length; i < len; i++) {
    if (i < len - 1) {
      var ith = polyline.geometry.vertices[i];
      var iplusone = polyline.geometry.vertices[i+1];
      ith.setX(iplusone.x);
      ith.setY(iplusone.y);
      ith.setZ(iplusone.z);
    } else {
      var last_vertex = polyline.geometry.vertices[i];
      if (Math.abs(last_vertex.x) < 100) {
        velocity.setX(Math.random()*5);
        last_vertex.add(velocity.multiplyScalar(sign));
      } else {
        sign = sign * -1;
        last_vertex.add(velocity.multiplyScalar(sign));
      }
    }
  }
  polyline.geometry.verticesNeedUpdate = true;
  // for (var i = 0, len = mesh.geometry.vertices.length; i < len; i++) {
  //   var vertex = mesh.geometry.vertices[i];
  //   var dx = 2;
  //   vertex.setX(vertex.x + Math.random() * dx - 0.5 * dx);
  //   vertex.setY(vertex.y + Math.random() * dx - 0.5 * dx);
  //   vertex.setZ(vertex.z + Math.random() * dx - 0.5 * dx);
  // }
  // mesh.geometry.verticesNeedUpdate = true;



  renderer.render(scene, camera);
  requestAnimationFrame(render);
  // window.setInterval(render, 500);
}

$(document).ready(init);
