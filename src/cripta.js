import * as THREE from 'three';
let scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0x23272A );
const textures = [];
const loader = new THREE.TextureLoader();
console.log(loader);
loader.crossOrigin = "anonymous";
for (let i = 1; i <= 389; i++) {
    
    // console.log(`./img/cripta/${i}.jpg`);
    loader.load(
        // resource URL
        `./img/cripta-2/${i}.jpg`,
        // Function when resource is loaded
        function ( texture ) {
            // do something with the texture
            // console.log(texture);
            texture.minFilter = THREE.NearestFilter;
            texture.magFilter = THREE.NearestFilter;
            textures[i] = texture;
        },
        // Function called when download progresses
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        // Function called when download errors
        function ( xhr ) {
            console.log( 'An error happened' );
        }
    );
};

// loader.load(`./img/cripta/0.jpg`, (texture) => {
//     // textures[i] = texture;
//     console.log(texture);
// })
// window.textures = textures;


let canvasWidth = innerWidth;
let renderWidth = innerWidth;
let renderHeight = innerWidth / 1245 * 1920;

let renderW, renderH;

let camera = new THREE.OrthographicCamera(
    renderWidth / -2,
    renderWidth / 2,
    renderHeight / 2,
    renderHeight / -2,
    1,
    1000
);

camera.position.z = 1;
window.camera = camera;

let renderer = new THREE.WebGLRenderer({
    antialias: false,
    canvas: document.querySelector('#cripta-canvas'),
    alpha: true,
    autoClear: true
});

renderer.setPixelRatio( window.devicePixelRatio );
// renderer.setClearColor( 0x23272A, 0.0 );
renderer.setSize( innerWidth, innerWidth / 1245 * 1920 );
document.body.appendChild( renderer.domElement );


let mat = new THREE.ShaderMaterial({
    uniforms: {
        image: { type: "t", value: new THREE.CubeTexture() },
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `,
    fragmentShader:  `
        
        varying vec2 vUv;
        uniform sampler2D image;
        void main() {
            vec2 uv = vUv;
            vec4 orig1 = texture2D(image, uv);

            vec3 col = orig1.rgb;
            //float a = 1.0 - col.r ; // make white transparent

            // gl_FragColor = vec4(col, a);
            // rgb(154,54,50)
            float red = 120.0 / 255.0;
            float green = 130.0 / 255.0;
            float blue = 120.0 / 255.0;
            if (col.r < red && col.g > green && col.b < blue) discard;
            gl_FragColor = orig1;
        }
    `,
    transparent: true,
    autoClear: true,
    opacity: 1.0
});

// const mat = new THREE.MeshBasicMaterial({
//     map: new THREE.CubeTexture(),
//   });

let geometry = new THREE.PlaneGeometry(
    innerWidth,
    // innerWidth / 1245 * 1920 ,
    innerWidth,
    1
);
let object = new THREE.Mesh(geometry, mat);
object.position.set(0, 0, 0);
scene.add(object);

let currentIndex = 1;
let animate = function() {
    renderer.renderLists.dispose();
    geometry.dispose();
    mat.dispose();
    object.clear();
    if (textures[currentIndex]) {
        // console.dir(textures[currentIndex]);
        // console.log(mat.uniforms);
        mat.uniforms.image.value.dispose();
        mat.uniforms.image.value = textures[currentIndex];
        mat.uniforms.needsUpdate = true;
        // mat.map.dispose();
        // mat.map = textures[currentIndex];
        // mat.needsUpdate = true;

    } else {
        console.log('fail');
        // renderer.render(scene, camera);
        // renderer.render(scene, camera);
    }
    // console.log(mat.map );
    currentIndex = currentIndex === textures.length ? 1 : currentIndex+1; 
    renderer.clear();
    renderer.render(object, camera);
    // console.log(scene);
    requestAnimationFrame(animate);
    // setTimeout(() => {
    // }, 1000 / 25);
    // console.log(mat.uniforms.image);
};

animate();

console.log(scene);