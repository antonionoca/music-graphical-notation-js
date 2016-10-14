'use strict';

var Playback = function() {
	this.audio = new Audio('mp3/lazerhawk.mp3');
	this.audioAnalyser = require('web-audio-analyser')(this.audio);
};

module.exports = Playback;
