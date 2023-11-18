import * as THREE from 'three';

export class CameraControl {
	constructor(camera, scene) {
		this.camera = camera;
		this.scene = scene;
		this.isLocked = false;
		this.moveForward = false;
		this.moveBackward = false;
		this.moveLeft = false;
		this.moveRight = false;
		this.velocity = new THREE.Vector3();
		this.direction = new THREE.Vector3();
		this.yawObject = new THREE.Object3D();
		this.pitchObject = new THREE.Object3D();
		this.init();
	}

	init() {
		this.yawObject.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
		this.camera.position.set(0, 0, 0); // Reset camera's position relative to yawObject

		this.pitchObject.add(this.camera);
		this.yawObject.add(this.pitchObject);
		this.scene.add(this.yawObject);

		document.addEventListener('mousemove', this.onMouseMove.bind(this), false);
		document.addEventListener('click', this.onClick.bind(this), false);
		document.addEventListener('keydown', this.onKeyDown.bind(this), false);
		document.addEventListener('keyup', this.onKeyUp.bind(this), false);
	}
	onMouseMove(event) {
		if (!this.isLocked) return;

		const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
		const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

		this.yawObject.rotation.y -= movementX * 0.002;
		this.pitchObject.rotation.x -= movementY * 0.002;
		this.pitchObject.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.pitchObject.rotation.x));
	}

	onClick() {
		if (document.pointerLockElement === document.body) {
			this.isLocked = false;
			document.exitPointerLock();
		} else {
			document.body.requestPointerLock();
			this.isLocked = true;
		}
	}

	onKeyDown(event) {
		switch (event.code) {
			case 'ArrowDown':
			case 'KeyS':
				this.moveForward = true;
				break;
			case 'ArrowLeft':
			case 'KeyA':
				this.moveLeft = true;
				break;
			case 'ArrowUp':
			case 'KeyW':
				this.moveBackward = true;
				break;
			case 'ArrowRight':
			case 'KeyD':
				this.moveRight = true;
				break;
		}
	}

	onKeyUp(event) {
		switch (event.code) {
			case 'ArrowDown':
			case 'KeyS':
				this.moveForward = false;
				break;
			case 'ArrowLeft':
			case 'KeyA':
				this.moveLeft = false;
				break;
			case 'ArrowUp':
			case 'KeyW':
				this.moveBackward = false;
				break;
			case 'ArrowRight':
			case 'KeyD':
				this.moveRight = false;
				break;
		}
	}

	update(delta) {
		const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(this.yawObject.quaternion);
		const right = new THREE.Vector3(1, 0, 0).applyQuaternion(this.yawObject.quaternion);

		this.velocity.x -= this.velocity.x * 10.0 * delta;
		this.velocity.z -= this.velocity.z * 10.0 * delta;

		this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
		this.direction.x = Number(this.moveRight) - Number(this.moveLeft);
		this.direction.normalize();

		if (this.moveForward || this.moveBackward)
			this.velocity.addScaledVector(forward, -this.direction.z * 400.0 * delta);
		if (this.moveLeft || this.moveRight) this.velocity.addScaledVector(right, this.direction.x * 400.0 * delta);

		this.yawObject.position.addScaledVector(this.velocity, delta);
	}

	getYawObject() {
		return this.yawObject;
	}
}
