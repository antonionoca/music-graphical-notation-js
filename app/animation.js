'use strict';

var line = require('./line');

var Animation = function(THREE) {
	this.renderer = new THREE.WebGLRenderer({
		antialias : true,
		clearColor: 0
	});
	this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 4000 );
	this.camera.position.set(0, 45, 240);

	this.scene = new THREE.Scene();
	this.SIZE = {x: window.innerWidth / 2, y: 30};
};

Animation.prototype.initializeLines = function(lines, audioAnalyser) {
	for (var i = lines.length - 1; i >= 0; i--) {
		//TODO ugly object instantiation
		lines[i] = new line(-this.SIZE.y/2 + i, 50, i, this.SIZE, Math.random() * i >> 0, audioAnalyser.frequencies());
		this.scene.add(lines[i].mesh);
	}
};

module.exports = Animation;
