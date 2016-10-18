'use strict';

var line = require('./line');

var Animation = function(THREE) {
	this.renderer = new THREE.WebGLRenderer({
		antialias : true,
		clearColor: 0
	});

	this.camera = new THREE.PerspectiveCamera(
		Animation.get('FRUSTUM'), 
		Animation.get('WINDOW_RATIO'), 
		Animation.get('CAMERA_NEAR'), 
		Animation.get('CAMERA_FAR')
	);

	this.camera.position.set(
		Animation.get('CAMERA_X'), 
		Animation.get('CAMERA_Y'), 
		Animation.get('CAMERA_Z')
	);

	this.scene = new THREE.Scene();
	this.SIZE = {
		x: Animation.get('SIZE_X'), 
		y: Animation.get('SIZE_Y')
	};

	this.lines = new Array(Animation.get('NUM_LINES'));
};

Animation.get = function(name) {
	var constants = {
		'FRUSTUM': 45,
		'WINDOW_RATIO': window.innerWidth / window.innerHeight,
		'CAMERA_X': 0,
		'CAMERA_Y': 45,
		'CAMERA_Z': 240,
		'CAMERA_NEAR': 0.01,
		'CAMERA_FAR': 4000,
		'NUM_LINES': 22,
		'SIZE_X': window.innerWidth / 2,
		'SIZE_Y': 30
	};

	return constants[name];
};

Animation.prototype.initializeLines = function(lines, audioAnalyser) {
	for (var i = lines.length - 1; i >= 0; i--) {
		lines[i] = new line(
			-this.SIZE.y/2 + i, 
			50, 
			i, 
			this.SIZE, 
			Math.random() * i >> 0, 
			audioAnalyser.frequencies());

		this.scene.add(lines[i].mesh);
	}
};

Animation.prototype.render = function() {
	this.renderer.render(this.scene, this.camera);
};

Animation.prototype.updateLines = function(audioAnalyser) {
    for (var i = this.lines.length - 1; i >= 0; i--) {
        this.lines[i].update( audioAnalyser.frequencies() );
    }
};

Animation.prototype.onResize = function(win) {
    this.renderer.setSize(win.innerWidth, win.innerHeight);
    this.camera.aspect = Animation.get('WINDOW_RATIO');
    this.camera.updateProjectionMatrix();
};

module.exports = Animation;
