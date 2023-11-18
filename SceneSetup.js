function createScene() {
	const scene = new THREE.Scene();

	const cubeGeometry = new THREE.BoxGeometry();
	const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
	const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	cube.position.y = 1;
	scene.add(cube);

	const planeGeometry = new THREE.PlaneGeometry(10, 10);
	const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x808080, side: THREE.DoubleSide });
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -Math.PI / 2;
	plane.position.y = -2;
	scene.add(plane);

	const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
	directionalLight.position.set(0, 1, 0);
	scene.add(directionalLight);

	return scene;
}
