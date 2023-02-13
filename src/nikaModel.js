import  OBJLoader  from './js/loaders/OBJLoader.js';
import * as THREE from 'three';
// import { VRMLLoader } from './js/loaders/VRMLLoader.js';

import { OrbitControls } from'./js/orbitControls';

const container = document.querySelector('#nikaModel');

// create a Scene
const scene = new THREE.Scene();

// Set the background color
scene.background = new THREE.Color('skyblue');

// Create a camera
const fov = 35; // AKA Field of View
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1; // the near clipping plane
const far = 100; // the far clipping plane

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

// every object is initially created at ( 0, 0, 0 )
// move the camera back so we can view the scene
camera.position.set(0, 0, 10);

// create a geometry
const geometry = new THREE.BoxGeometry(2, 2, 2);

// create a default (white) Basic material
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
});

// create a Mesh containing the geometry and material
// const cube = new THREE.Mesh(geometry, material);

// add the mesh to the scene
// scene.add(cube);

// create the renderer
const renderer = new THREE.WebGLRenderer({ alpha: true });

// next, set the renderer to the same size as our container element
renderer.setSize(container.clientWidth, container.clientHeight);

// finally, set the pixel ratio so that our scene will look good on HiDPI displays
renderer.setPixelRatio(window.devicePixelRatio);

// add the automatically created <canvas> element to the page
container.append(renderer.domElement);

// render, or 'create a still image', of the scene
renderer.setClearColor( 0x000000, 1 );
renderer.render(scene, camera);
const controls = new OrbitControls( camera, renderer.domElement );
// camera.position.set( 0, 20, 100 );
controls.update();
function animate() {
    
    render();
}
animate();


function render() {

    // camera.position.x += ( mouseX - camera.position.x ) * .05;
    // camera.position.y += ( - mouseY - camera.position.y ) * .05;

    // camera.lookAt( scene.position );
    // console.log(camera.position);
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}
var loader = new OBJLoader();
loader.load('./ImageToStl.com_type005.obj', function(object){
    object.traverse( function ( child ) {

        if ( child instanceof THREE.Mesh ) {
            console.log('instanceoff');
            // child.material.color.setHex( '0xff0000' );

        }

    } );
    // OBJBoundingBox.center(object.position);
    object.position.multiplyScalar(-1);
    // object.position.x = -0.1;
    // object.position.y = 0;
    // object.position.z = -4;
    scene.add( object );
    console.log(object);
    controls.target = getCenterPoint(object.children[0]);
    controls.update();
});

function getCenterPoint(mesh) {
    var middle = new THREE.Vector3();
    var geometry = mesh.geometry;

    geometry.computeBoundingBox();

    middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
    middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
    middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;

    mesh.localToWorld( middle );
    return middle;
}

window.camera = camera;

