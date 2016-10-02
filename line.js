'use strict';

var THREE    = require('three');
var TweenMax = require('gsap');
var perlin   = require('perlin-noise');

var Line = function(y, amp, index, size, startCounter, fftData)
{
    this.size              = size;
    this.amp               = amp;
    this.index             = index;
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
    var range = this.createRange();
    var start = range * (this.createOrder(this.index) % 11);
    var noise = this.initializeNoise(perlin, range, start, array);

    var invertedPerlin = noise.slice(0);
    invertedPerlin = invertedPerlin.reverse();

    noise = noise.concat(invertedPerlin);

    var spline = this.createSplines(noise, this.size, this.getRatio(this.size.x, noise.length));

    var curve = new THREE.SplineCurve3(spline);

    //TODO magic number
    return curve.getPoints(511);
};

//TODO understand magic numbers
//TODO refactor magic numbers
//TODO export it to a new module
Line.prototype.createRange = function() {
    return 512 / 8;
};

//TODO add tests
Line.prototype.initializeNoise = function(_perlin, range, start, array) {
    return this.createStraightLines(_perlin).concat(this.createNoises(range, start, array));
};

//TODO document this pure function
//TODO add tests
//TODO export it to another module
Line.prototype.createStraightLines = function(_perlin) {
    var straightLines = _perlin.generatePerlinNoise(1, 128);
    var i = 0;

    for (i = straightLines.length - 1; i >= 0; i--) {
        straightLines[i] *= 10;
    }
    
    return straightLines;
};

//TODO document this pure function
//TODO understand parameters
//TODO add tests
//TODO export it to another module
Line.prototype.createOrder = function(index) {
    return index < 11 ? 10 - index : index;
};

//TODO add documentation
//TODO add tests
Line.prototype.createNoises = function(range, start, array) {
    var noise = [];
    var i = 0;

    for (i = range + start; i >= start; i--) {
        noise.push(this.createNoise(i, array));
    }

    return noise;
};

//TODO understand parameters
//TODO add tests
//TODO export it to another module
Line.prototype.createNoise = function(i, array) {
    var noise = array[i] / 5;
    noise = noise > 20 ? noise * 1.5 : noise / 50; 
    noise = Math.max(5, noise);

    return noise;
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

