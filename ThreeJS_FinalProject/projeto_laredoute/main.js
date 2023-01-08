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
var clock = new THREE.Clock()
let doorLeftAni
let doorRightAni
let drawerDownAni
let drawerUpAni
//etc...
//--------------------------


new THREE.GLTFLoader().load(
    'models/TV10.gltf',
    function ( gltf ) {
    scene.add( gltf.scene )

    scene.traverse( function(x) {
        if (x.isMesh) {
            x.castShadow = true
            x.receiveShadow = true			
        }

    })

    //to see the animations available on the object, uncoment line bellow and see animations property
    console.log(gltf.scene)

    //here we define the paused atributte of the animations to true because we want them to be loaded, but not played
    //so that pressing the button in website just starts the animation instead of loading it

    clipeTeste = THREE.AnimationClip.findByName(gltf.animations, 'drawerUpAction')
    drawerUpAni = mixer.clipAction(clipeTeste)
    drawerUpAni.paused = true

    clipeTeste2 = THREE.AnimationClip.findByName(gltf.animations, 'drawerDownAction')
    drawerDownAni = mixer.clipAction(clipeTeste2)
    drawerDownAni.paused = true

    clipeTeste3 = THREE.AnimationClip.findByName(gltf.animations, 'doorLeftAction')
    doorLeftAni = mixer.clipAction(clipeTeste3)
    doorLeftAni.paused = true

    clipeTeste4 = THREE.AnimationClip.findByName(gltf.animations, 'doorRightAction')
    doorRightAni = mixer.clipAction(clipeTeste4)
    doorRightAni.paused = true
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

document.getElementById('btn_ld').addEventListener("click", function() {
    if (doorLeftAni.paused) {
        doorLeftAni.paused = false
    } else {
        doorLeftAni.paused = true
    }

    console.log('play')
    doorLeftAni.setLoop(THREE.LoopPingPong)
    doorLeftAni.play()
})
document.getElementById('btn_rd').addEventListener("click", function() {
    if (doorRightAni.paused) {
        doorRightAni.paused = false
    } else {
        doorRightAni.paused = true
    }

    console.log('play')
    doorRightAni.setLoop(THREE.LoopPingPong)
    doorRightAni.play()
})
document.getElementById('btn_td').addEventListener("click", function() {
    if (drawerUpAni.paused) {
        drawerUpAni.paused = false
    } else {
        drawerUpAni.paused = true
    }

    console.log('play')
    drawerUpAni.setLoop(THREE.LoopPingPong)
    drawerUpAni.play()
})
document.getElementById('btn_bd').addEventListener("click", function() {
    if (drawerDownAni.paused) {
        drawerDownAni.paused = false
    } else {
        drawerDownAni.paused = true
    }

    console.log('play')
    drawerDownAni.setLoop(THREE.LoopPingPong)
    drawerDownAni.play()
})

addLights()
animate()

function animate() {
    requestAnimationFrame( animate )
    renderer.render( scene, camera )
    mixer.update(clock.getDelta())
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

