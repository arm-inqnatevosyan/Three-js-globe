import * as THREE from "../js/three.module.js"
import { OrbitControls } from '../js/OrbitControls.js'

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(50,window.innerWidth/window.innerHeight,1,1000);
camera.position.set(0,0,500);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
var c =  document.body.appendChild( renderer.domElement );

var controls = new OrbitControls( camera, c );
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
controls.enableDamping = true;
controls.enableZoom = true
controls.minDistance = 5;
controls.maxDistance = 20;

var geometry = new THREE.SphereGeometry( 1, 30, 30 );

const textured = new THREE.TextureLoader().load( "./img/imgs.jpg" );
var material = new THREE.MeshBasicMaterial( { map: textured } );
var cube = new THREE.Mesh( geometry, material );
var gui = new dat.GUI();

//var ball = {
	//rotationX:0,
	//rotationY:0,
	//rotationZ:0,
	//camerapositionz: 5,
	//wireframe:true
//}

//gui.add(ball,'rotationX',0,0.5,0.001).name("X Rotation")
//gui.add(ball,'rotationY',0,0.2,0.001).name("Y Rotation")
//gui.add(ball,'rotationZ',0,0.2,0.001).name("Z Rotation")
//gui.add(ball,'camerapositionz',5,10,0.001).name("Camera")
gui.add(cube.material,'wireframe').name("Visibility")

var folder = gui.addFolder("RGB")

folder.add(cube.material.color,"r",0,1).name("color red")
folder.add(cube.material.color,"g",0,1).name("color green")
folder.add(cube.material.color,"b",0,1).name("color blue")

let colors = {
	color: [0,255,255]
}
folder.addColor(colors,'color').onChange(function(value){
	cube.material.color.r = value[0]/255;
	cube.material.color.g = value[1]/255;
	cube.material.color.b = value[2]/255;
})
scene.add( cube );
camera.position.z = 5;

const texture = new THREE.TextureLoader().load( "./img/img.png" );
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );

var update = function (){
	cube.rotation.y += 0.001
}

var animate = function () {
	requestAnimationFrame( animate );
	update()
	renderer.render( scene, camera );
	controls.update();
};

//var loop = function (){
	//cube.rotation.x += ball.rotationX
	//cube.rotation.y += ball.rotationY
	//camera.position.z = ball.camerapositionz
	//cube.rotation.z += ball.rotationZ
//}
//loop()
animate();