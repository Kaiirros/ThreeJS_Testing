import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';




if ( WebGL.isWebGLAvailable() ) {

	const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xADD8E6)
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const mouse = new THREE.Vector2();

    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    const geometry = new THREE.BoxGeometry( 10, 10, 10 );
    const material = new THREE.MeshBasicMaterial( { color: 0x3187A2 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    const loader = new FontLoader();
    loader.load(
        // resource URL
        'node_modules/three/examples/fonts/helvetiker_bold.typeface.json',

        // onLoad callback
        function ( font ) {
            const textGeo = new TextGeometry( 'Daniel', {

                font: font,
        
                size: 30,
                depth: 1,
                curveSegments: 4,
        
                bevelThickness: 2,
                bevelSize: 1,
                bevelEnabled: true
        
            } );

            

            const mesh = new THREE.Mesh( textGeo, material );

            scene.add( mesh );
        },

        // onProgress callback
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },

        // onError callback
        function ( err ) {
            console.log( 'An error happened' );
        }
    );
camera.position.z = 50;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    controls.update();


	renderer.render( scene, camera );
}

animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}