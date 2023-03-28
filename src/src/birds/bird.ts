//Heavily inspired from:
//https://natureofcode.com/book/chapter-6-autonomous-agents/

import { randomInt } from "../random"
import Victor from "victor"
import { FlowField } from "./flowField"


//modifying
function limit1(vec : Victor, max : number) {
    const mSq = Math.sqrt(vec.length())
    if (mSq > max * max) {
        vec.divideScalar(Math.sqrt(mSq)) //normalize it
        vec.multiplyScalar(max)
    }
    return vec;
  }

function magSq(vec : Victor) {
    const x = vec.x;
    const y = vec.y;
    return x * x + y * y;
}

function limit(vec : Victor, max : number) {
    const mSq = magSq(vec);
    if (mSq > max * max) {
      vec.divideScalar(Math.sqrt(mSq)) //normalize it
      vec.multiplyScalar(max);
    }
    return vec;
}




export class Bird {

    location: Victor
    velocity: Victor
    acceleration: Victor
    maxSpeed: number
    maxForce: number
    scale: number
    wingsClosed: boolean
    wingCount: number
    wingCountTo : number


    readonly RAND_AMOUNT = 1 // * 2 for negative and positive

    constructor() {
        this.location = new Victor(200, 200)
        this.velocity = new Victor(randomInt(-1, 1), randomInt(-1, 1))
        this.acceleration = new Victor(0, 0)
        this.scale = randomInt(3,4)
        this.maxSpeed = 3
        this.maxForce = 0.05
        this.wingsClosed = false
        this.wingCountTo = randomInt(12, 20)
        this.wingCount = randomInt(0, this.wingCountTo)
    }

    run(context: CanvasRenderingContext2D, birds: Array<Bird>) {
        this.flock(birds)
        this.update()
        this.borders()
        this.draw(context)
        this.flap()
    }

    flap() {
        this.wingCount+= 1
        if (this.wingCount >= this.wingCountTo) {
            this.wingsClosed = !this.wingsClosed
            this.wingCount = 0
            //Wings are closed shorter than when they're open
            if(this.wingsClosed){
                this.wingCountTo = randomInt(10,12)
            }else{
                this.wingCountTo = randomInt(12, 20)
            }
            
        }
    }

    applyForce(force: Victor) {
        this.acceleration.add(force)
    }

    flock(birds: Array<Bird>) {
        let sep = this.seperate(birds)   // Separation
        let ali = this.align(birds)      // Alignment
        let coh = this.cohesion(birds)   // Cohesion
        // Arbitrarily weight these forces
        sep.multiplyScalar(1.5)
        ali.multiplyScalar(1.0)
        coh.multiplyScalar(1.0)
        // Add the force Victors to acceleration
        this.applyForce(sep)
        this.applyForce(ali)
        this.applyForce(coh)
    }

    seek(target: Victor) {
        let desired = target.subtract(this.location)
        desired.normalize()
        desired.multiplyScalar(this.maxSpeed)

        let steer = desired.subtract(this.velocity)
        limit(steer, this.maxForce)  // Limit to maximum steering force
        return steer

    }

    // field(field: FlowField) {
    //     this.acceleration = field.lookup(this.location)
    // }

    update() {
        this.velocity.add(this.acceleration)
        limit(this.velocity, this.maxSpeed)
        this.location.add(this.velocity)
        this.acceleration.multiplyScalar(0)
    }

    //For now
    borders() {
        //TEMP VALUES
        let width = 1400
        let height = 600


        if (this.location.x < -this.scale) this.location.x = width + this.scale
        if (this.location.y < -this.scale) this.location.y = height + this.scale
        if (this.location.x > width + this.scale) this.location.x = -this.scale
        if (this.location.y > height + this.scale) this.location.y = -this.scale
    }

    seperate(birds: Array<Bird>) {
        let desiredseparation = 25.0
        let steer = new Victor(0, 0)
        let count = 0
        // For every boid in the system, check if it's too close
        for (let i = 0; i < birds.length; i++) {
            let d = this.location.distance(birds[i].location)
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate Victor pointing away from neighbor
                let diff = this.location.subtract(birds[i].location)
                diff.normalize()
                diff.divideScalar(d)        // Weight by distance
                steer.add(diff)
                count++            // Keep track of how many
            }
        }
        // Average -- divide by how many
        if (count > 0) {
            steer.divideScalar(count)
        }

        // As long as the Victor is greater than 0
        if (steer.length() > 0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.normalize()
            steer.multiplyScalar(this.maxSpeed)
            steer.subtract(this.velocity)
            limit(steer, this.maxForce)
        }
        return steer
    }

    align(birds: Array<Bird>) {
        let neighbordist = 50
        let sum = new Victor(0, 0)
        let count = 0
        for (let i = 0; i < birds.length; i++) {
            let d = this.location.distance(birds[i].location)
            if ((d > 0) && (d < neighbordist)) {
                sum.add(birds[i].velocity)
                count++
            }
        }
        if (count > 0) {
            sum.divideScalar(count)
            sum.normalize()
            sum.multiplyScalar(this.maxSpeed)
            let steer = sum.subtract(this.velocity)
            limit(steer, this.maxForce)
            return steer
        } else {
            return new Victor(0, 0)
        }
    }

    // Cohesion
    // For the average location (i.e. center) of all nearby birds, calculate steering Victor towards that location
    cohesion(birds: Array<Bird>) {
        let neighbordist = 50
        let sum = new Victor(0, 0)   // Start with empty Victor to accumulate all locations
        let count = 0
        for (let i = 0; i < birds.length; i++) {
            let d = this.location.distance(birds[i].location)
            if ((d > 0) && (d < neighbordist)) {
                sum.add(birds[i].location) // Add location
                count++
            }
        }
        if (count > 0) {
            sum.divideScalar(count)
            return this.seek(sum) // Steer towards the location
        } else {
            return new Victor(0, 0)
        }
    }




    draw(context: CanvasRenderingContext2D) {

        //Draw wings with random "rotation"
        context.strokeStyle = "white"
        context.beginPath()
        context.moveTo(this.location.x, this.location.y)

        if (!this.wingsClosed) {
            let rx = this.location.x + this.scale//let rx = this.location.x + this.scale + randInt((-1 * this.RAND_AMOUNT), this.RAND_AMOUNT)
            let ry = this.location.y + this.scale//let ry = this.location.y + this.scale + randInt((-1 * this.RAND_AMOUNT), this.RAND_AMOUNT)
            context.lineTo(rx, ry)
            context.stroke()
            context.beginPath()
            context.moveTo(this.location.x, this.location.y)
            rx = this.location.x - this.scale//rx = this.location.x - this.scale + randInt((-1 * this.RAND_AMOUNT), this.RAND_AMOUNT)
            ry = this.location.y + this.scale//ry = this.location.y - this.scale + randInt((-1 * this.RAND_AMOUNT), this.RAND_AMOUNT)
            context.lineTo(rx, ry)
        } else {
            let rx = this.location.x//let rx = this.location.x + this.scale + randInt((-1 * this.RAND_AMOUNT), this.RAND_AMOUNT)
            let ry = this.location.y + this.scale//let ry = this.location.y + this.scale + randInt((-1 * this.RAND_AMOUNT), this.RAND_AMOUNT)
            context.lineTo(rx, ry)
        }

        context.stroke()

    }
}