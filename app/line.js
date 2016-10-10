'use strict';

var THREE    = require('three');
var TweenMax = require('gsap');
var perlin   = require('perlin-noise');
var Noise    = require('./noise');
var Order    = require('./order');
var Range    = require('./range');
var Ratio    = require('./ratio');

var Line = function(y, amp, index, size, startCounter, fftData) {
	this.size              = size;
	this.amp               = amp;
	this.index             = index;
	this.noise             = new Noise();
	this.points            = this.generatedPoints(fftData);
	
	this.geometry          = new THREE.Geometry();
	this.geometry.vertices = this.points;
	
	this.material          = new THREE.LineBasicMaterial({color: 0xFFFFFF, linewidth: Line.get('LINE_WIDTH')});
	
	this.mesh              = new THREE.Line(this.geometry, this.material);
	this.mesh.position.y   = Line.get('PADDING') + (y || 0);
	this.mesh.position.z   = (16 - index) * Line.get('PADDING') || 0;
	
	this.counter           = 0;
};

Line.get = function(name) {
	var constants = {
		'DIVISOR': 11,
		'LINE_WIDTH': 3,
		'MULTIPLIER': 0.04,
		'PADDING': -20,

		//number of points in the calculation of a smooth spline curve
		'POINTS': 511 
	};

	return constants[name];
};

Line.prototype.update = function( fftData ) 
{
	// return
	if(!this.geometry.vertices) return;

	this.points = this.generatedPoints( fftData );

	for (var i = this.geometry.vertices.length - 1; i >= 0; i--) {
		this.geometry.vertices[i].y += (this.points[i].y - this.geometry.vertices[i].y) * Line.get('MULTIPLIER');
	}

	this.mesh.geometry.verticesNeedUpdate = true;
};

Line.prototype.generatedPoints = function(array) {

	if(!array) return;

	var i;
	var range = Range.getRange();
	var start = range * (Order.createOrder(this.index) % Line.get('DIVISOR'));
	var noise = this.noise.initializeNoise(perlin, range, start, array);

	var invertedPerlin = noise.slice(0); //shallow copy
	invertedPerlin = invertedPerlin.reverse();

	noise = noise.concat(invertedPerlin);

	var spline = this.createSplines(noise, this.size, Ratio.getRatio(this.size.x, noise.length));

	var curve = new THREE.SplineCurve3(spline);

	return curve.getPoints(Line.get('POINTS'));
};

Line.prototype.createSplines = function(noise, size, ratio) {
	var spline = [];
	var i = 0;

	while(i < noise.length) {
		spline.push(new THREE.Vector3( -size.x/2 + (ratio * i), noise[i], 0 ) );

		i++;
	}

	return spline;
};

module.exports = Line;

