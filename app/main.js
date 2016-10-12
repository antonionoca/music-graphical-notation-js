'use strict';

//TODO this code is full of magic numbers
var THREE = require('three');

var Playback = require('./playback');
var playback = new Playback();

var Animation = require('./animation');
var animation = new Animation(THREE);

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
var counter = 0;

document.body.appendChild(animation.renderer.domElement);

//TODO too many loose iterators and calculators
//TODO animation code
var lines = new Array(22);
animation.initializeLines(lines, audioAnalyser);

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
    animation.renderer.render(animation.scene, animation.camera);

    //TODO jshint global issue. who owns this?
    requestAnimationFrame(update);
}

function onResize() {
    animation.renderer.setSize(window.innerWidth, window.innerHeight);
    animation.camera.aspect = window.innerWidth / window.innerHeight;
    animation.camera.updateProjectionMatrix();
}
