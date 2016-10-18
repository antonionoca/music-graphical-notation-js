var Playback = require('../app/playback.js');

describe('playback.js module', function() {

	it('should initialize the constants', function() {
		expect(Playback.get('FFT_SIZE')).toEqual(2048);
	});
});
