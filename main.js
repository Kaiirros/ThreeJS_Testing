import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { degToRad } from 'three/src/math/MathUtils.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { FilmPass } from 'three/addons/postprocessing/FilmPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { AsciiEffect } from 'three/addons/effects/AsciiEffect.js';

let camera, scene, renderer, effect;



if ( WebGL.isWebGLAvailable() ) {

	scene = new THREE.Scene();
    scene.background = new THREE.Color(0xADD8E6)
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1200 );

    renderer = new THREE.WebGLRenderer();
    renderer.setViewport(window.innerWidth, window.innerHeight )
    renderer.setSize( window.innerWidth, window.innerHeight );
    const composer = new EffectComposer( renderer );

    //document.body.appendChild( renderer.domElement );
    document.getElementById("viewport").appendChild(renderer.domElement)

    const pivot = new THREE.Group();



    const originGeo = new THREE.SphereGeometry(15, 16, 16)
    const originMat = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
    const origin = new THREE.Mesh( originGeo, originMat );
    origin.rotateY(45)
    pivot.add(origin);

    const sphereOneParent = new THREE.Object3D();
    const sphereGeo = new THREE.SphereGeometry( 5, 16, 16 );
    const sphereMat = new THREE.MeshBasicMaterial( { color: 0x3187A2 } );
    const sphereOne = new THREE.Mesh( sphereGeo, sphereMat );
    const sphereOne2 = new THREE.Mesh( sphereGeo, sphereMat );


    sphereOne2.translateZ(70)
    sphereOne.translateZ(-70)
    sphereOneParent.add(sphereOne)
    sphereOneParent.add(sphereOne2)

    sphereOneParent.rotateZ(degToRad(90))

    pivot.add(sphereOneParent)

    const sphereTwoParent = new THREE.Object3D();
    const sphereTwo = new THREE.Mesh( sphereGeo, sphereMat );
    const sphereTwo2 = new THREE.Mesh( sphereGeo, sphereMat );

    sphereTwo.translateZ(70)
    sphereTwo2.translateZ(-70)


    sphereTwoParent.rotateZ(degToRad(-45))
    sphereTwoParent.rotateX(degToRad(90))
    sphereTwoParent.add(sphereTwo)
    sphereTwoParent.add(sphereTwo2)
    pivot.add( sphereTwoParent );


    const sphereThreeParent = new THREE.Mesh(sphereGeo, sphereMat)
    const sphereThree = new THREE.Mesh( sphereGeo, sphereMat );
    const sphereThree2 = new THREE.Mesh( sphereGeo, sphereMat );


    sphereThree.translateZ(70)
    sphereThree2.translateZ(-70)

    sphereThreeParent.add(sphereThree)
    sphereThreeParent.add(sphereThree2)

    sphereThreeParent.rotateZ(degToRad(-135))
    sphereThreeParent.rotateX(degToRad(90))

    pivot.add( sphereThreeParent );

    const renderPass = new RenderPass( scene, camera );
    composer.addPass( renderPass );

    const newObject = new THREE.SphereGeometry(15, 16, 16)
    const newMat = new THREE.MeshBasicMaterial( { color: 0xFF0000 } );
    const pivotClone = new THREE.Mesh( newObject, newMat );
    pivotClone.scale.set(0, 0, 0)
    pivotClone.position.set(-150, -50, 0)
    scene.add(pivot)
    scene.add(pivotClone)



    const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera);
    outlinePass.selectedObjects = [origin, sphereOneParent, sphereTwoParent, sphereThreeParent];
    outlinePass.visibleEdgeColor = new THREE.Color(0xff00ff)
    composer.addPass( outlinePass );
    
     const glitchPass = new FilmPass();
    composer.addPass( glitchPass );
    
    const outputPass = new OutputPass();
    composer.addPass( outputPass );

    camera.position.set(0, -30, 200)

    window.addEventListener('resize', onWindowResize, false)
        function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        composer.render()
    }

    const body = document.body;
    const html = document.documentElement;
    const height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);

    const minVector = new THREE.Vector3(0, 0, 0)
    const maxVector = new THREE.Vector3(1000, 1000, 1000)

    window.addEventListener("wheel", function(e) {
        if (this.scrollY+this.innerHeight < height) {

            if (Math.round(e.deltaY) >= 0) {
                pivot.translateOnAxis(new THREE.Vector3(5, -3, 5), e.deltaY/50)
                pivotClone.scale.set(this.scrollY/500, this.scrollY/500, this.scrollY/500)

                //console.log(pivot.position)

            } else {
                pivot.translateOnAxis(new THREE.Vector3(5, -3, 5), e.deltaY/50)
                pivotClone.scale.set(-this.scrollY/500, -this.scrollY/500, -this.scrollY/500)


                if (pivot.position.y > 0){
                    pivot.position.set(0, 0, 0)
                    console.log(pivot.position.y);
                }

            }
        } else {
            //console.log("out of bounds")
        }
    })

function animate() {
	requestAnimationFrame( animate );

    sphereOneParent.rotateY(0.01)
    sphereOneParent.rotateX(0.01)


    sphereTwoParent.rotateX(0.01);
    sphereTwoParent.rotateY(0.01);


    sphereThreeParent.rotateY(0.01);
    sphereThreeParent.rotateX(0.01);


	composer.render();
}

animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}

    