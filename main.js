var THREE = require('three');

//--
//-- playback code
var audio = new Audio('mp3/lazerhawk.mp3');
audio.addEventListener('canplaythrough', init.bind(this));
function init()
{
    //audio.play();
    update();
}

var audioAnalyser = require('web-audio-analyser')(audio);
audioAnalyser.analyser.fftSize = 2048;
//--

//-- animation code
var renderer, camera, scene;
var counter = 0;
var line = require('./line');
var SIZE = {x: window.innerWidth / 2, y: 30}

renderer = new THREE.WebGLRenderer({
    antialias : true,
    clearColor: 0
});
document.body.appendChild(renderer.domElement)

camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 4000 );
camera.position.set(0, 45, 240);

scene = new THREE.Scene();

var lines = new Array(22)
for (var i = lines.length - 1; i >= 0; i--) {
    lines[i] = new line(-SIZE.y/2 + i, 50, i, SIZE, Math.random() * i >> 0, audioAnalyser.frequencies())
    scene.add(lines[i].mesh);
};

onResize();
update();
window.onresize = onResize;

function update()
{
    for (var i = lines.length - 1; i >= 0; i--) {
        lines[i].update( audioAnalyser.frequencies() );
    }
    renderer.render(scene, camera);
    requestAnimationFrame(update);
}

function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}
