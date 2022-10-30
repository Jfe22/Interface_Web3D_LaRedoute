//criar um cubo 1x1x1... 
var geometria = new THREE.BoxGeometry( 0.2, 0.2, 0.2 ); 
var material = new THREE.MeshNormalMaterial(); 
var cubo = new THREE.Mesh( geometria, material ); 

// criar uma cena... 
var cena = new THREE.Scene(); 

// adicionar o cubo à cena... 
cena.add( cubo ); 

// preparar um renderer WebGL e adicioná-lo à pagina 
var renderer = new THREE.WebGLRenderer(); 
renderer.setSize( window.innerWidth, window.innerHeight ); 
document.body.appendChild( renderer.domElement ); 

// criar uma camara... 
var camara = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 100 ); 
camara.position.z = 1; 

// iniciar animação... 
animar(); 

function animar() { 
    requestAnimationFrame( animar ); 

    // mostrar... 
    renderer.render( cena, camara ); 

    // atualizar posição do cubo... 
    cubo.rotateX( 0.01 ); 
    cubo.rotateY( 0.02 ); 
} 
