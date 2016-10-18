'use strict';

var THREE = require('three');

var Playback = require('./playback');
var playback = new Playback('REPLACEME');

var Animation = require('./animation');
var animation = new Animation(THREE);

var Main = function() { };

Main.onResize = function() {
	animation.onResize(window);
}

Main.update = function() {
	animation.updateLines(playback.audioAnalyser);
	animation.render();

    requestAnimationFrame(Main.update);
}

Main.init = function()
{
    playback.audio.play();
    Main.update();
}

Main.initialize = function() {

	document.body.appendChild(animation.renderer.domElement);

	playback.audio.addEventListener('canplaythrough', Main.init.bind(window));

	animation.initializeLines(animation.lines, playback.audioAnalyser);

	Main.onResize();
	window.onresize = Main.onResize;

	Main.update();
};

module.exports = Main;

//application start
Main.initialize();
