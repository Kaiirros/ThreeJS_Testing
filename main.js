import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { degToRad } from 'three/src/math/MathUtils.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';




if ( WebGL.isWebGLAvailable() ) {

	const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xADD8E6)
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);
    renderer.setSize( window.innerWidth, window.innerHeight );
    const composer = new EffectComposer( renderer );

    document.body.appendChild( renderer.domElement );

    const originGeo = new THREE.SphereGeometry(15, 16, 16)
    const originMat = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
    const origin = new THREE.Mesh( originGeo, originMat );
    scene.add(origin);

    const sphereOneParent = new THREE.Object3D();
    const sphereGeo = new THREE.SphereGeometry( 5, 16, 16 );
    const sphereMat = new THREE.MeshBasicMaterial( { color: 0x3187A2 } );
    const sphereOne = new THREE.Mesh( sphereGeo, sphereMat );
    const sphereOne2 = new THREE.Mesh( sphereGeo, sphereMat );

    sphereOne2.translateZ(100)
    sphereOne.translateZ(-100)
    sphereOneParent.add(sphereOne)
    sphereOneParent.add(sphereOne2)

    sphereOneParent.rotateZ(degToRad(90))

    scene.add(sphereOneParent)

    const sphereTwoParent = new THREE.Object3D();
    const sphereTwo = new THREE.Mesh( sphereGeo, sphereMat );
    const sphereTwo2 = new THREE.Mesh( sphereGeo, sphereMat );

    sphereTwo.translateZ(100)
    sphereTwo2.translateZ(-100)


    sphereTwoParent.rotateZ(degToRad(-45))
    sphereTwoParent.rotateX(degToRad(90))
    sphereTwoParent.add(sphereTwo)
    sphereTwoParent.add(sphereTwo2)
    scene.add( sphereTwoParent );


    const sphereThreeParent = new THREE.Object3D();
    const sphereThree = new THREE.Mesh( sphereGeo, sphereMat );
    const sphereThree2 = new THREE.Mesh( sphereGeo, sphereMat );


    sphereThree.translateZ(100)
    sphereThree2.translateZ(-100)

    sphereThreeParent.add(sphereThree)
    sphereThreeParent.add(sphereThree2)

    sphereThreeParent.rotateZ(degToRad(-135))
    sphereThreeParent.rotateX(degToRad(90))

    scene.add( sphereThreeParent );

    const renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );

    let x = [];
    x.push(origin);

    const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    outlinePass.selectedObjects = [origin, sphereOneParent, sphereTwoParent, sphereThreeParent];
    outlinePass.visibleEdgeColor = new THREE.Color(0xff00ff)
    composer.addPass( outlinePass );
    
     const glitchPass = new FilmPass();
    composer.addPass( glitchPass );
    
    const outputPass = new OutputPass();
    composer.addPass( outputPass );

camera.position.z = 80;

function animate() {
	requestAnimationFrame( animate );

    sphereOneParent.rotateY(0.01)
    sphereOneParent.rotateX(0.01)


    sphereTwoParent.rotateX(0.01);
    sphereTwoParent.rotateY(0.01);


    sphereThreeParent.rotateY(0.01);
    sphereThreeParent.rotateX(0.01);

    controls.update();


	composer.render();
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