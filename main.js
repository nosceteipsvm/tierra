let container = document.querySelector('#container');
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;
const TEXTURE = './8k_earth_nightmap'; // https://www.solarsystemscope.com/textures/download/8k_earth_nightmap.jpg;

// sphere attributes
const RADIUS = 250;
const SEGMENTS = 50;
const RINGS = 50;

// instantiate scene
var scene = new THREE.Scene();
//scene.background = new THREE.Color(0x000000);

//  instantiate camera
var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

// instantiate renderer
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(WIDTH, HEIGHT);

camera.position.set( 0, 0, 120 );

// instantiate globes
var globe = new THREE.Object3D();
scene.add(globe);

var loader = new THREE.TextureLoader();
loader.crossOrigin = '';

loader.load(TEXTURE, (map) => {
  // Create the sphere
  var sphere = new THREE.SphereGeometry( RADIUS, SEGMENTS, RINGS );

  // Map the texture to the material. 
  var material = new THREE.MeshBasicMaterial({ map, overdraw: 0.5 });

  // Create a new mesh with sphere geometry.
  var mesh = new THREE.Mesh( sphere, material );

  // Add mesh to globe
  globe.add(mesh);
});

// positioning globe
globe.position.x = 0;
globe.position.y = 0;
globe.position.z = -900;


// Add lighting

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.x = 100;
pointLight.position.y = 500;
pointLight.position.z = -860;
scene.add(pointLight);

container.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.update();

var animate = function () {
  requestAnimationFrame(animate);

  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);

  //globe.rotation.x += 0.0003;
  globe.rotation.y -= 0.0003;
  camera.updateProjectionMatrix();

  //update orbit controls
  controls.update();

  renderer.render(scene, camera);
};

// Handle dom events
document.onkeydown = onKeyPress;

let state = false;

var domEvents = new THREEx.DomEvents(camera, renderer.domElement);
domEvents.addEventListener(globe, 'dblclick', function(e){
  setScale(); state = !state;
}, false);

const setScale = () => {
  if (state === true)
  {
    globe.scale.set(1, 1, 1);
  } else {
    globe.scale.set(2.5, 2.5, 2.5);
  }
}


// Rendering Loop
animate();