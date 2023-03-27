import * as THREE from 'three'
import * as React from "react"
import { Cloth } from '../src/cloth'

// declare module 'three/examples/jsm/geometries/ParametricGeometry' {
// 	export const ParametricGeometry: typeof THREE.ParametricGeometry
// }

export function ThreeDProjects() {

    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const width = 600
    const height = 600
    let scene : THREE.Scene
    let camera : THREE.PerspectiveCamera
    let renderer: THREE.WebGLRenderer
    let cloth : Cloth

    React.useEffect(() => {
        cloth = new Cloth()
        initTHREE()
        camera.position.z = 4
        //ADD RENDERER
        if (canvasRef.current == null) return
        renderer = new THREE.WebGLRenderer({ 
            canvas: canvasRef.current!, 
            antialias: true,
            alpha: true,
            premultipliedAlpha: false,
         })
        renderer.setClearColor( 0x000000, 0 ); // the default

        const color = 0xFFFFFF
        const intensity = 1
        const light = new THREE.DirectionalLight(color, intensity)
        light.position.set(-1, 2, 4)
        scene.add(light)
        animate()
    })

    function initTHREE(){
        // Camera
        camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.5, 10000)
        camera.position.set(Math.cos(Math.PI / 4) * 3, 0, Math.sin(Math.PI / 4) * 3)

        // Scene
        scene = new THREE.Scene()
        scene.fog = new THREE.Fog(0x000000, 500, 10000)

        // Renderer
        renderer = new THREE.WebGLRenderer({ antialias: true })
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setClearColor(scene.fog.color)

        renderer.outputEncoding = THREE.sRGBEncoding

        document.body.appendChild(renderer.domElement)

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
        scene.add(ambientLight)

        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.75)
        directionalLight.position.set(5, 5, 5)
        scene.add(directionalLight)
        scene.add(cloth.clothMesh)

    }


    function resizeRendererToDisplaySize(renderer : THREE.WebGLRenderer) : boolean {
        const canvas = renderer.domElement
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false)
        }
        return needResize
      }

    const animate = () => {
        // Step the physics world
        cloth.world.fixedStep()

        // Sync the three.js meshes with the bodies
        cloth.updateMeshes()

        // Render three.js
        renderer.render(scene, camera)

        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        renderScene()
        window.requestAnimationFrame(animate)
    }
    const renderScene = () => {
        renderer.render(scene, camera)
    }

    return (
        <canvas className='block w-full h-full' ref={canvasRef} />
    );
}