'use strict';

//TODO this code is full of magic numbers
var THREE = require('three');

//--
//TODO playback code
//TODO Audio is a potential jshint global issue
var audio = new Audio('mp3/lazerhawk.mp3');
audio.addEventListener('canplaythrough', init.bind(window));

function init()
{
    audio.play();
    update();
}

var audioAnalyser = require('web-audio-analyser')(audio);
audioAnalyser.analyser.fftSize = 2048;
//--

//TODO animation code
var renderer, camera, scene;
var counter = 0;
var line = require('./line');
var SIZE = {x: window.innerWidth / 2, y: 30};

renderer = new THREE.WebGLRenderer({
    antialias : true,
    clearColor: 0
});
document.body.appendChild(renderer.domElement);

//TODO scene
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 4000 );
camera.position.set(0, 45, 240);

scene = new THREE.Scene();

//TODO too many loose iterators and calculators
//TODO animation code
var lines = new Array(22);
for (var i = lines.length - 1; i >= 0; i--) {
    //TODO ugly object instantiation
    lines[i] = new line(-SIZE.y/2 + i, 50, i, SIZE, Math.random() * i >> 0, audioAnalyser.frequencies());
    scene.add(lines[i].mesh);
}

//TODO window
onResize();
window.onresize = onResize;

//TODO animation and scene
update();

function update()
{
    for (var i = lines.length - 1; i >= 0; i--) {
        lines[i].update( audioAnalyser.frequencies() );
    }
    renderer.render(scene, camera);

    //TODO jshint global issue. who owns this?
    requestAnimationFrame(update);
}

function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
