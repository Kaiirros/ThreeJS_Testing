import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { degToRad } from 'three/src/math/MathUtils.js';




if ( WebGL.isWebGLAvailable() ) {

	const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xADD8E6)
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const mouse = new THREE.Vector2();
    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const floor = new THREE.CircleGeometry(100,16);
    const floorMesh = new THREE.Mesh( floor );
    floorMesh.rotateX(degToRad(-90))
    scene.add(floorMesh)

    const originGeo = new THREE.SphereGeometry(5, 16, 16)
    const originMat = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
    const origin = new THREE.Mesh( originGeo, originMat );
    scene.add(origin);

    const sphereOneParent = new THREE.Object3D();
    const sphereOneGeo = new THREE.SphereGeometry( 10, 16, 16 );
    const sphereOneMat = new THREE.MeshBasicMaterial( { color: 0x3187A2 } );
    const sphereOne = new THREE.Mesh( sphereOneGeo, sphereOneMat );
    sphereOne.translateZ(100)
    sphereOneParent.add(sphereOne)
    scene.add(sphereOneParent)

    const sphereTwoParent = new THREE.Object3D();
    const sphereTwoGeo = new THREE.SphereGeometry( 10, 16, 16 );
    const sphereTwoMat = new THREE.MeshBasicMaterial( { color: 0x00FF00 } );
    const sphereTwo = new THREE.Mesh( sphereTwoGeo, sphereTwoMat );
    sphereTwo.translateZ(220)
    sphereTwoParent.add(sphereTwo)
    scene.add( sphereTwoParent );




camera.position.z = 80;

function animate() {
	requestAnimationFrame( animate );

    origin.rotateY(.02)
    sphereOneParent.rotateY(.03)

    sphereTwoParent.rotateY(0.009);
    controls.update();


	renderer.render( scene, camera );
}

animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}


/*
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
    ); */