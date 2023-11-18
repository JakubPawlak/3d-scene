import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function createScene() {
	const scene = new THREE.Scene();

	const cubeGeometry = new THREE.BoxGeometry();
	const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.position.y = 1;
	// scene.add(cube);

	const planeGeometry = new THREE.PlaneGeometry(10, 10);
	const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x808080, side: THREE.DoubleSide });
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -Math.PI / 2;
	plane.position.y = -2;
	// scene.add(plane);

	const ambientLight = new THREE.AmbientLight(0xffffff, 3); // Soft overall light
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Sun-like light
	directionalLight.position.set(10, 10, 10); // Adjust for desired angle and position
	scene.add(directionalLight);

	const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1); // Sun-like light
	directionalLight2.position.set(-10, 10, -10); // Adjust for desired angle and position
	scene.add(directionalLight2);

	const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.6); // Sky and ground colors, intensity
	scene.add(hemisphereLight);

	loadModel(scene);

	return scene;
}

function loadModel(scene) {
	const loader = new GLTFLoader();

	loader.load(
		'./models/untitled.glb',
		function (gltf) {
			const model = gltf.scene;
			model.position.set(0, -7, 0);

			scene.add(model);
		},
		undefined,
		function (error) {
			console.error(error);
		}
	);
}
