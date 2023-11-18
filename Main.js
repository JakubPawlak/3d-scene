import { CameraControl } from './CameraControl.js';
import { createScene } from './SceneSetup.js';
import * as THREE from 'three';

let scene, camera, renderer, cameraControl;

export function init() {
	scene = createScene();

	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 5;
	cameraControl = new CameraControl(camera, scene);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);
	animate();
}

function animate() {
	requestAnimationFrame(animate);
	const delta = 0.01;
	cameraControl.update(delta);
	renderer.render(scene, camera);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

init();
