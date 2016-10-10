var Noise = require('../app/noise.js');
var perlin = require('perlin-noise');

var noise;

describe('Noise class', function() {

    beforeAll(function() {
        noise = new Noise();
    });

	it('should initialize the constants', function() {
		expect(Noise.get('DIVIDER')).toEqual(5);
		expect(Noise.get('THRESHOLD')).toEqual(20);
		expect(Noise.get('MULTIPLIER')).toEqual(1.5);
		expect(Noise.get('NOISE_DIVIDER')).toEqual(50);
	});

    describe('initializeNoise function', function() {
        it('should initialize noise object without NaN', function() {
            expect(noise.initializeNoise(perlin, 0, 0, [])).not.toContain([NaN]);
        });
    });

    describe('createNoises function', function() {
        it('should return array of NaN on invalid scenarios', function() {
            expect(noise.createNoises(0, 0, [])).toEqual([NaN]);
            expect(noise.createNoises(1, 0, [])).toEqual([NaN, NaN]);
            expect(noise.createNoises(0, 1, [])).toEqual([NaN]);
        });        

        it('should return array of 5 when min value is not reached', function() {
            expect(noise.createNoises(0, 0, [0])).toEqual([5]);
            expect(noise.createNoises(0, 0, [0,1])).toEqual([5]);
        });

        it('should calculate noise of a multiple of 5', function() {
            expect(noise.createNoises(1, 0, [110])).toEqual([NaN, 33]);
            expect(noise.createNoises(0, 2, [110])).toEqual([NaN]);
        });

        it('should calculate noise of a non-multiple of 5', function() {
            expect(noise.createNoises(1, 0, [112])).toEqual([NaN, 33.599999999999994]);
        });

        it('should return the minimum noise of a negative number: 5', function() {
            expect(noise.createNoises(1, 0, [-1])).toEqual([NaN, 5]);
        });
    });

    describe('createNoise function', function() {
        it('should return the minimum value: 5', function() {
            expect(noise.createNoise(0, [0])).toEqual(5);
            expect(noise.createNoise(0, [0,1])).toEqual(5);
        });

        it('should return NaN when index out of bounds', function() {
            expect(noise.createNoise(1, [0])).toEqual(NaN);
            expect(noise.createNoise(1, [1])).toEqual(NaN);
            expect(noise.createNoise(2, [1])).toEqual(NaN);
        });

        it('should calculate noise of a multiple of 5', function() {
            expect(noise.createNoise(0, [110])).toEqual(33);
        });

        it('should calculate noise of a non-multiple of 5', function() {
            expect(noise.createNoise(0, [112])).toEqual(33.599999999999994);
        });

        it('should return the minimum noise of a negative number: 5', function() {
            expect(noise.createNoise(0, [-1])).toEqual(5);
        });
    });
});
