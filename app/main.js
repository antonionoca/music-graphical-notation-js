'use strict';

var THREE = require('three');

var Playback = require('./playback');
var playback = new Playback();

var Animation = require('./animation');
var animation = new Animation(THREE);

playback.audio.addEventListener('canplaythrough', init.bind(window));

function init()
{
    playback.audio.play();
    update();
}

document.body.appendChild(animation.renderer.domElement);

//TODO animation code
animation.initializeLines(animation.lines, playback.audioAnalyser);

//TODO window
onResize();
window.onresize = onResize;

//TODO animation and scene
update();

function update()
{
    for (var i = animation.lines.length - 1; i >= 0; i--) {
        animation.lines[i].update( playback.audioAnalyser.frequencies() );
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
