import {GLTFLoader} from './GLTFLoader'
import {mapcontrols} from './mapcontrols'
import {OrbitControls} from './OrbitControls'
import {THREE} from 'three'


const previous = document.querySelector('.left');
const next = document.querySelector('.right')

let scene, camera, renderer, hlight, modelSofa, directionalLight, controls;
let i = 0;
let arrayModel = ["../blend/pcportable.gltf", "../blend/chandelle.gltf", "../blend/pcportable.gltf", "../blend/pcportable.gltf"];
//declare GTLFloader
const loader = new GLTFLoader();

function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x29A5B4);
	let distance = 0.5;
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.rotation.y = 50 / 180 * Math.PI;
	camera.position.x = 8*distance;
	camera.position.y = 1*distance;
	camera.position.z = 10*distance;

	directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(0, 0, 1);
	scene.add(directionalLight);

	hlight = new THREE.AmbientLight(0x404040, 100);			

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	controls = new THREE.OrbitControls(camera, renderer.domElement);
	controls.addEventListener('change', renderer);
	controls.minDistance = 5;
	controls.maxDistance = 10;
	controls.enableZoom = true;
	controls.enableDamping = true;
	controls.enableRotate = false;
	controls.panSpeed = 0;

    loader.load(arrayModel[i], function (gltf) {
        modelSofa = gltf.scene.children[0];
        //modelSofa.scale.set(0.85, 50, 40);
        modelSofa.rotation.y = Math.PI * 2;
        scene.add(gltf.scene);
        renderer.render(scene, camera);
        rotation();
    });
}
	
function mouvement() {
	renderer.render(scene, camera);
	requestAnimationFrame(mouvement);
}

function rotation() {
	renderer.render(scene, camera);
	requestAnimationFrame(rotation);
	modelSofa.rotation.z += 0.03;
};

function incrementModel() {
    i++;
    
    loader.load(arrayModel[i], function (gltf) {
        modelSofa = gltf.scene.children[0];
        //modelSofa.scale.set(0.85, 50, 40);
        modelSofa.rotation.y = Math.PI * 2;
        scene.add(gltf.scene);
        renderer.render(scene, camera);
        rotation();
    });

    console.log(i);
}

function decrementModel() {
    i--;
    console.log(i);
}

init();

next.addEventListener('click', incrementModel);
previous.addEventListener('click', decrementModel);