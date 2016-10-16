'use strict';

var Playback = function() {
	this.audio = new Audio('mp3/lazerhawk.mp3');
	this.audioAnalyser = require('web-audio-analyser')(this.audio);
	this.audioAnalyser.analyser.fftSize = 2048;
};

module.exports = Playback;
