// create the scene 
let scene = new THREE.Scene()
scene.background = new THREE.Color(0xE5E5DA)

//create camera
let camera = new THREE.PerspectiveCamera( 60, 800 / 600, 1, 1000 )

//create the renderer and place it in the canvas
let myCanvas = document.getElementById('myCanvas')
let renderer = new THREE.WebGLRenderer({canvas: myCanvas})
renderer.setSize(800, 600)
//renderer options for better visibility
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 4;
renderer.shadowMap.enabled = true

//create orbit controls
let controls = new THREE.OrbitControls(camera, renderer.domElement)

//create axes
let axes = new THREE.AxesHelper(10)
scene.add(axes)

//create grid
let grid = new THREE.GridHelper()
scene.add(grid)

//set camera position
camera.position.x = -5
camera.position.y = 8
camera.position.z = 13
camera.lookAt(0,2,0)



//define animation vars and a mixer here
let mixer = new THREE.AnimationMixer(scene)
let animation1
let animation2
let animation3
//etc...
//--------------------------


new THREE.GLTFLoader().load(
    'models/TV.gltf',
    function ( gltf ) {
    scene.add( gltf.scene )

    scene.traverse( function(x) {
        if (x.isMesh) {
            x.castShadow = true
            x.receiveShadow = true			
        }

    })

    //to see the animations available on the object, uncoment line bellow and see animations property
    //console.log(gltf.scene)

    //bind animation to vars here
    //clipAct = THREE.AnimationClip.findByName(gltf.animations, 'animation name')
    //animation1 = mixer.clipAction(clipAni)
}
)


//add events in buttons to trigger animations here

//document.getElementById('btn_play').addEventListener("click", function() {
//    animation1.play()
//})

//------------------------------------------------


addLights()
animate()

function animate() {
    requestAnimationFrame( animate )
    renderer.render( scene, camera )
}

function addLights(){
    const lightAmb = new THREE.AmbientLight( 0xffffff, 0.5); 
    scene.add( lightAmb );

    const lightDir = new THREE.DirectionalLight( 0xE5E5DA, 1 );
    lightDir.position.set(2,8,10)
    const dlHelper = new THREE.DirectionalLightHelper(lightDir, 1, 0xFF0000);
    scene.add(dlHelper);
    scene.add( lightDir );
}

