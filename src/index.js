import THREE from 'three.js';
import gsap from 'gsap';
import TweenLite from 'gsap/all'
import vertex from './js/shaders1/vertex.glsl';
import fragment from './js/shaders1/fragment.glsl';
import { OrbitControls } from './js/orbitControls';

import debounce from './js/helpers/helpers';
const scene = new THREE.Scene();
const aspectRatio = window.innerWidth / window.innerHeight;
const fieldOfView = 60;
const nearPlane = 1;
const farPlane = 10000;
const camera = new THREE.PerspectiveCamera(
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane
);
const INNER_WIDTH = window.innerWidth;
const INNER_HEIGHT = window.innerHeight;

const geometry = new THREE.PlaneGeometry(INNER_WIDTH, INNER_HEIGHT);
THREE.ImageUtils.crossOrigin = '';// Позволяет загружать внешнее изображение

var tex = THREE.ImageUtils.loadTexture( "./img/KP_VIEW_4_FINAL.jpg" );
// var tex1 = THREE.ImageUtils.loadTexture( "./img/KP_VIEW_4_FINAL.jpg" );
var tex1 = THREE.ImageUtils.loadTexture( "./img/KP_VIEW_1_FINAL.jpg" );
var tex2 = THREE.ImageUtils.loadTexture( "./img/smoke.png" );

const radius = {
    min: Number(10000).toFixed(1),
    max: Number(100000).toFixed(1),
}


window.mouseShader =  new THREE.Vector2(0,0);
window.dist = radius.min;
function changeValue(val) {
    TweenLite.to(window, 0.5, {dist: val});
}
const changeValueDeb = debounce(changeValue, 500);
const imageShader = new THREE.ShaderMaterial({
    uniforms: {
        resolution: { value: new THREE.Vector2(INNER_WIDTH, INNER_HEIGHT) },
        u_mouse: { value:  new THREE.Vector2(10, 10)},
        texture: {type: 't', value: tex},
        texture1: {type: 't', value: tex1},
        texture2: {type: 't', value: tex2},

        light: {type:'v3', value:new THREE.Vector3()},
        dist: { value: radius.min },
        offset1: { value: 0.01 },
        offset2: { value: 0.02 },
        channelOffsets:  { value: [
            new THREE.Vector2(),
            new THREE.Vector2(),
            new THREE.Vector2(),
            new THREE.Vector2(),
          ]},
          channelMults: { value: [
            new THREE.Vector4(1, 0, 0, 0),
            new THREE.Vector4(0, 1, 0, 0),
            new THREE.Vector4(0, 0, 1, 0),
            new THREE.Vector4(0, 0, 0, 1),
          ]},

    },
    vertexShader: vertex,
	fragmentShader: fragment
})
const imageMesh = new THREE.Mesh(geometry, imageShader);
scene.add(imageMesh);

const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});
renderer.setSize( INNER_WIDTH, INNER_HEIGHT );
renderer.setPixelRatio(window.devicePixelRatio);
const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
		time: { value: 0.5 },
        time1: { value: 0.5 },
        u_time: { type: "f", value: 0 },
		resolution: { value: new THREE.Vector2()
        },
        vertexColor: { value:  new THREE.Color( 0xff0000 )}
    
	},
    vertexColors: new THREE.Color( 0xff0000 ),
	vertexShader: vertex,
	fragmentShader: fragment
});
const cube = new THREE.Mesh( geometry, shaderMaterial);
// scene.add(cube);

camera.position.z = 500;
// camera.rotation.x = 10 * Math.PI / 180;
// const controls = new OrbitControls( camera, renderer.domElement );
// controls.autoRotate=true;
// controls.addEventListener('change', render);
// controls.enableZoom = false;
const container = document.getElementById('world');
container.appendChild(renderer.domElement);



window.addEventListener('mousemove',function(evt){
    window.mouseShader = new THREE.Vector2(evt.clientX, INNER_HEIGHT -  evt.clientY);

    const center = {
        x: INNER_WIDTH / 2,
        y: INNER_HEIGHT / 2,
    }
    const offset1 = (0.5 - evt.clientY / INNER_HEIGHT) * 0.020;
    const offset2 = (0.5 - evt.clientX / INNER_WIDTH) * 0.020;
    window.rgbOffset = offset1;
    window.rgbOffset2 = offset2;
});

window.addEventListener('click',function increase(evt){
    console.log(window.dist);
    TweenLite.to(window, 2.5, {dist: 1500000.00, ease: 'power4.easeInOut' ,onComplete: () => {
        // TweenLite.set(window, {dist: 5000.00});
        TweenLite.fromTo(window, {dist: 0.00}, {dist: 5000.00, ease: 'power4.easeIn'});
        const temp1 = Object.assign({}, imageShader.uniforms.texture);
        const temp2 = Object.assign({}, imageShader.uniforms.texture1);
        imageShader.uniforms.texture = temp2;
    imageShader.uniforms.texture1 = temp1;

    }});


    
    // window.removeEventListener('click', increase);
    // if (window.dist < radius.min) {
    //     TweenLite.to(window, 1.5, {dist: radius.max});
    // } else {
        
    //     TweenLite.to(window, 1.5, {dist: radius.min});
    // }
});
function render() {
    imageShader.uniforms.light.value.z = 0.2;// Радиус
    imageShader.uniforms.dist.value = window.dist;// Радиус
    imageShader.uniforms.u_mouse.value =  window.mouseShader;// Радиус
    imageShader.uniforms.offset1.value =  window.rgbOffset;// Радиус
    imageShader.uniforms.offset2.value =  window.rgbOffset2;// Радиус
    // console.log(imageShader.uniforms.offset1);
    // imageShader.uniforms.offset1.value += 0.001;
    // imageShader.uniforms.offset2.value += 0.001;


    
    // shaderMaterial.uniforms.time.value += 0.01;
    // shaderMaterial.uniforms.u_time.value += 0.01;
    // shaderMaterial.uniforms.time1.value += 0.001;
    // shaderMaterial.needsUpdate = true;
    imageShader.uniforms.needsUpdate = true;
    renderer.render( scene, camera );
    requestAnimationFrame(render);
}
requestAnimationFrame(render);


const checkScrollSpeed = (function(settings) {
    settings = settings || {};
  
    let lastPos, newPos, timer, delta,
        delay = settings.delay || 50;
  
    function clear() {
      lastPos = null;
      delta = 0;
    }
  
    clear();
  
    return function() {
      newPos = window.scrollY;
      if (lastPos != null) { // && newPos < maxScroll
        delta = newPos - lastPos;
      }
      lastPos = newPos;
      clearTimeout(timer);
      timer = setTimeout(clear, delay);
      return delta;
    };
  })();
  
  const container1 = document.querySelector('body');
  
  window.addEventListener('scroll', function() {
    var speed = checkScrollSpeed();
    window.rgbOffset = speed / 10000;
    console.log(speed);
    if (speed > 150) {
      console.log('150+');
      container1.classList.add('red');
    }
  });




  (function(){ 
    var timestamp = null;
    var lastMouseX = null;
    var lastMouseY = null;
    
    document.body.addEventListener("mousemove", function(e) {
        
        if (timestamp === null) {
            timestamp = Date.now();
            lastMouseX = e.screenX;
            lastMouseY = e.screenY;
            return;
        }
    
        var now = Date.now();
        var dt =  now - timestamp;
        var dx = e.screenX - lastMouseX;
        var dy = e.screenY - lastMouseY;
        var speedX = Math.round(dx / dt * 100);
        var speedY = Math.round(dy / dt * 100);
        console.log(Math.abs(speedY + speedX));
        
        timestamp = now;
        lastMouseX = e.screenX;
        lastMouseY = e.screenY;
    });
  })()