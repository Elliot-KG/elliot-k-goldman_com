//Based off of the cannon-es cloth demo:
//https://github.com/pmndrs/cannon-es/blob/master/examples/threejs_cloth.html


import * as THREE from 'three'
import { ParametricGeometry } from 'three/examples/jsm/geometries/ParametricGeometry'
import * as CANNON from 'cannon-es'
import { World } from 'cannon-es'
import icon from '../images/icon.png'


export class Cloth {
    clothMass: number
    clothSize: number
    Nx: number
    Ny: number
    mass: number
    restDistance: number
    movementRadius: number
    clothGeometry : ParametricGeometry
    clothMesh : THREE.Mesh

    // cannon.js variables
    world: World
    particles: Array<Array<CANNON.Body>>

    constructor() {
        this.clothMass = 1  // 1 kg in total
        this.clothSize = 1 // 1 meter
        this.Nx = 12 // number of horizontal particles in the cloth
        this.Ny = 12 // number of vertical particles in the cloth
        this.mass = (this.clothMass / this.Nx) * this.Ny
        this.restDistance = this.clothSize / this.Nx
        this.movementRadius = 0.2

        this.world = new CANNON.World()
        this.world.gravity.set(0, -9.81, 0)

        // Max solver iterations: Use more for better force propagation, but keep in mind that it's not very computationally cheap!
        //this.world.solver.iterations = 20

        // Materials
        const clothMaterial = new CANNON.Material('cloth')
        const sphereMaterial = new CANNON.Material('sphere')
        const cloth_sphere = new CANNON.ContactMaterial(clothMaterial, sphereMaterial, {
            friction: 0,
            restitution: 0,
        })

        // Cloth geometry
        this.clothGeometry = new ParametricGeometry(()=>{this.clothFunction}, this.Nx, this.Ny)

        // Cloth material
        const clothTexture = new THREE.TextureLoader().load(icon)
        clothTexture.wrapS = THREE.RepeatWrapping
        clothTexture.wrapT = THREE.RepeatWrapping
        clothTexture.anisotropy = 16
        clothTexture.encoding = THREE.sRGBEncoding

        const threeClothMaterial = new THREE.MeshPhongMaterial({
            map: clothTexture,
            side: THREE.DoubleSide,
        })

        // Cloth mesh
        this.clothMesh = new THREE.Mesh(this.clothGeometry, threeClothMaterial)


        // Adjust constraint equation parameters
        // Contact stiffness - use to make softer/harder contacts
        cloth_sphere.contactEquationStiffness = 1e9
        // Stabilization time in number of timesteps
        cloth_sphere.contactEquationRelaxation = 3

        // Add contact material to the world
        this.world.addContactMaterial(cloth_sphere)

        // Create cannon particles
        this.particles = []
        for (let i = 0; i < this.Nx + 1; i++) {
            this.particles.push([])
            for (let j = 0; j < this.Ny + 1; j++) {
                const index = j * (this.Nx + 1) + i

                const point = this.clothFunction(i / (this.Nx + 1), j / (this.Ny + 1), new THREE.Vector3())
                const particle = new CANNON.Body({
                    // Fix in place the first row
                    mass: j === this.Ny ? 0 : this.mass,
                })
                particle.addShape(new CANNON.Particle())
                particle.linearDamping = 0.5
                particle.position.set(point.x, point.y - this.Ny * 0.9 * this.restDistance, point.z)
                particle.velocity.set(0, 0, -0.1 * (this.Ny - j))

                this.particles[i].push(particle)
                this.world.addBody(particle)
            }
        }

        // Connect the particles with distance constraints
        let connect = (i1 : number, j1 : number, i2 : number, j2 : number)=> {
            this.world.addConstraint(new CANNON.DistanceConstraint(this.particles[i1][j1], this.particles[i2][j2], this.restDistance))
        }
        for (let i = 0; i < this.Nx + 1; i++) {
            for (let j = 0; j < this.Ny + 1; j++) {
                if (i < this.Nx) connect(i, j, i + 1, j)
                if (j < this.Ny) connect(i, j, i, j + 1)
            }
        }
    }

    // Parametric function
    // https://threejs.org/docs/index.html#api/en/geometries/ParametricGeometry
    clothFunction(u : number, v : number, target : THREE.Vector3) {
        const x = (u - 0.5) * this.restDistance * this.Nx
        const y = (v + 0.5) * this.restDistance * this.Ny
        const z = 0

        target.set(x, y, z)

        return target
    }

    updateMeshes() {
        // Make the three.js cloth follow the cannon.js particles
        for (let i = 0; i < this.Nx + 1; i++) {
          for (let j = 0; j < this.Ny + 1; j++) {
            const index = j * (this.Nx + 1) + i
            //this.clothGeometry.vertices[index].copy(this.particles[i][j].position)
          }
        }

        //this.clothGeometry.normalsNeedUpdate = true
        //this.clothGeometry.verticesNeedUpdate = true
      }


}