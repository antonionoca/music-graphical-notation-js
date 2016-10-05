'use strict';

var THREE    = require('three');
var TweenMax = require('gsap');
var perlin   = require('perlin-noise');
var Range    = require('./range');
var Order    = require('./order');
var Noise    = require('./noise');

var Line = function(y, amp, index, size, startCounter, fftData) {
	this.size              = size;
	this.amp               = amp;
	this.index             = index;
	this.noise             = new Noise();
	this.points            = this.generatedPoints(fftData);
	
	this.geometry          = new THREE.Geometry();
	this.geometry.vertices = this.points;
	
	this.material          = new THREE.LineBasicMaterial({color: 0xFFFFFF, linewidth: 3});
	
	this.mesh              = new THREE.Line(this.geometry, this.material);
	this.mesh.position.y   = -20 + (y || 0);
	this.mesh.position.z   = (16 - index) * -20 || 0;
	
	this.counter           = 0;
};

Line.prototype.update = function( fftData ) 
{
	// return
	if(!this.geometry.vertices) return;

	this.points = this.generatedPoints( fftData );

	for (var i = this.geometry.vertices.length - 1; i >= 0; i--) {
		this.geometry.vertices[i].y += (this.points[i].y - this.geometry.vertices[i].y) * 0.04;
	}

	this.mesh.geometry.verticesNeedUpdate = true;
};

Line.prototype.generatedPoints = function(array) {

	if(!array) return;

	var i;
	var range = new Range().getRange();
	var start = range * (new Order().createOrder(this.index) % 11);
	var noise = this.noise.initializeNoise(perlin, range, start, array);

	var invertedPerlin = noise.slice(0);
	invertedPerlin = invertedPerlin.reverse();

	noise = noise.concat(invertedPerlin);

	var spline = this.createSplines(noise, this.size, this.getRatio(this.size.x, noise.length));

	var curve = new THREE.SplineCurve3(spline);

	//TODO magic number
	return curve.getPoints(511);
};

//TODO export it to another module
Line.prototype.getRatio = function(x, noiseLength) {
	return !noiseLength ? null : x / noiseLength;
};

//TODO add documentation
Line.prototype.createSplines = function(noise, size, ratio) {
	var spline = [];
	var i = 0;

	while(i < noise.length) {
		//TODO ugly push
		spline.push(new THREE.Vector3( -size.x/2 + (ratio * i), noise[i], 0 ) );

		i++;
	}

	return spline;
};

module.exports = Line;

