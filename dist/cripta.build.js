/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/cripta.js":
/*!***********************!*\
  !*** ./src/cripta.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene(); // scene.background = new THREE.Color( 0x23272A );\n\nvar textures = [];\nvar loader = new three__WEBPACK_IMPORTED_MODULE_0__.TextureLoader();\nconsole.log(loader);\nloader.crossOrigin = \"anonymous\";\n\nvar _loop = function _loop(i) {\n  // console.log(`./img/cripta/${i}.jpg`);\n  loader.load( // resource URL\n  \"./img/cripta-2/\".concat(i, \".jpg\"), // Function when resource is loaded\n  function (texture) {\n    // do something with the texture\n    // console.log(texture);\n    texture.minFilter = three__WEBPACK_IMPORTED_MODULE_0__.NearestFilter;\n    texture.magFilter = three__WEBPACK_IMPORTED_MODULE_0__.NearestFilter;\n    textures[i] = texture;\n  }, // Function called when download progresses\n  function (xhr) {\n    console.log(xhr.loaded / xhr.total * 100 + '% loaded');\n  }, // Function called when download errors\n  function (xhr) {\n    console.log('An error happened');\n  });\n};\n\nfor (var i = 1; i <= 389; i++) {\n  _loop(i);\n}\n\n; // loader.load(`./img/cripta/0.jpg`, (texture) => {\n//     // textures[i] = texture;\n//     console.log(texture);\n// })\n// window.textures = textures;\n\nvar canvasWidth = innerWidth;\nvar renderWidth = innerWidth;\nvar renderHeight = innerWidth / 1245 * 1920;\nvar renderW, renderH;\nvar camera = new three__WEBPACK_IMPORTED_MODULE_0__.OrthographicCamera(renderWidth / -2, renderWidth / 2, renderHeight / 2, renderHeight / -2, 1, 1000);\ncamera.position.z = 1;\nwindow.camera = camera;\nvar renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({\n  antialias: false,\n  canvas: document.querySelector('#cripta-canvas'),\n  alpha: true,\n  autoClear: true\n});\nrenderer.setPixelRatio(window.devicePixelRatio); // renderer.setClearColor( 0x23272A, 0.0 );\n\nrenderer.setSize(innerWidth, innerWidth / 1245 * 1920);\ndocument.body.appendChild(renderer.domElement);\nvar mat = new three__WEBPACK_IMPORTED_MODULE_0__.ShaderMaterial({\n  uniforms: {\n    image: {\n      type: \"t\",\n      value: new three__WEBPACK_IMPORTED_MODULE_0__.CubeTexture()\n    }\n  },\n  vertexShader: \"\\n        varying vec2 vUv;\\n        void main() {\\n          vUv = uv;\\n          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\\n        }\\n    \",\n  fragmentShader: \"\\n        \\n        varying vec2 vUv;\\n        uniform sampler2D image;\\n        void main() {\\n            vec2 uv = vUv;\\n            vec4 orig1 = texture2D(image, uv);\\n\\n            vec3 col = orig1.rgb;\\n            //float a = 1.0 - col.r ; // make white transparent\\n\\n            // gl_FragColor = vec4(col, a);\\n            // rgb(154,54,50)\\n            float red = 120.0 / 255.0;\\n            float green = 130.0 / 255.0;\\n            float blue = 120.0 / 255.0;\\n            if (col.r < red && col.g > green && col.b < blue) discard;\\n            gl_FragColor = orig1;\\n        }\\n    \",\n  transparent: true,\n  autoClear: true,\n  opacity: 1.0\n}); // const mat = new THREE.MeshBasicMaterial({\n//     map: new THREE.CubeTexture(),\n//   });\n\nvar geometry = new three__WEBPACK_IMPORTED_MODULE_0__.PlaneGeometry(innerWidth, // innerWidth / 1245 * 1920 ,\ninnerWidth, 1);\nvar object = new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(geometry, mat);\nobject.position.set(0, 0, 0);\nscene.add(object);\nvar currentIndex = 1;\n\nvar animate = function animate() {\n  renderer.renderLists.dispose();\n  geometry.dispose();\n  mat.dispose();\n  object.clear();\n\n  if (textures[currentIndex]) {\n    // console.dir(textures[currentIndex]);\n    // console.log(mat.uniforms);\n    mat.uniforms.image.value.dispose();\n    mat.uniforms.image.value = textures[currentIndex];\n    mat.uniforms.needsUpdate = true; // mat.map.dispose();\n    // mat.map = textures[currentIndex];\n    // mat.needsUpdate = true;\n  } else {\n    console.log('fail'); // renderer.render(scene, camera);\n    // renderer.render(scene, camera);\n  } // console.log(mat.map );\n\n\n  currentIndex = currentIndex === textures.length ? 1 : currentIndex + 1;\n  renderer.clear();\n  renderer.render(object, camera); // console.log(scene);\n\n  requestAnimationFrame(animate); // setTimeout(() => {\n  // }, 1000 / 25);\n  // console.log(mat.uniforms.image);\n};\n\nanimate();\nconsole.log(scene);\n\n//# sourceURL=webpack://fake-3d/./src/cripta.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/cripta.js");
/******/ 	
/******/ })()
;