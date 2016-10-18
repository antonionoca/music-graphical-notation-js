var Animation = require('../app/animation.js');

describe('animation.js module', function() {

	it('should initialize the constants', function() {
		expect(Animation.get('FRUSTUM')).toEqual(45);
		expect(Animation.get('CAMERA_X')).toEqual(0);
		expect(Animation.get('CAMERA_Y')).toEqual(45);
		expect(Animation.get('CAMERA_Z')).toEqual(240);
		expect(Animation.get('CAMERA_NEAR')).toEqual(0.01);
		expect(Animation.get('CAMERA_FAR')).toEqual(4000);
		expect(Animation.get('NUM_LINES')).toEqual(22);
		expect(Animation.get('SIZE_Y')).toEqual(30);
	});

	describe('object construction', function() {

		var animation, THREE;
		beforeAll(function() {
			THREE = {
				WebGLRenderer: function() {},
				PerspectiveCamera: function() {},
				Scene: function() {}
			};

			spyOn(THREE, 'WebGLRenderer').and.callFake(function() {});

			spyOn(THREE, 'PerspectiveCamera').and.callFake(function() { 
				return { 
					position: { 
						set: function() {}
					}
				} 
			});

			spyOn(THREE, 'Scene').and.callFake(function() {});
		});

		it('should initialize three.js camera and scene', function() {
			animation = new Animation(THREE);
			
			expect(THREE.WebGLRenderer).toHaveBeenCalled();
			expect(THREE.PerspectiveCamera).toHaveBeenCalled();
			expect(THREE.Scene).toHaveBeenCalled();
		});

		it('should set lines on object construction', function() {
			animation = new Animation(THREE);

			expect(animation.lines.length).toEqual(Animation.get('NUM_LINES'));
		});
	});
});
