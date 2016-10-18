'use strict';

var Playback = function(file_name) {
	this.audio = new Audio(file_name);
	this.audioAnalyser = require('web-audio-analyser')(this.audio);
	this.audioAnalyser.analyser.fftSize = Playback.get('FFT_SIZE');
};

Playback.get = function(name) {
	var constants = {
		'FFT_SIZE': 2048
	};

	return constants[name];
};

module.exports = Playback;
