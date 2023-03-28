//Heavily inspired from:
//https://natureofcode.com/book/chapter-6-autonomous-agents/

import { randomInt } from "../random"
import Vector from "./vector"



export class Bird {

    location: Vector
    velocity: Vector
    acceleration: Vector
    maxSpeed: number
    maxForce: number
    scale: number
    wingsClosed: boolean
    wingCount: number
    wingCountTo : number


    readonly RAND_AMOUNT = 1 // * 2 for negative and positive

    constructor() {
        this.location = new Vector(200, 200)
        this.velocity = new Vector(randomInt(-1, 1), randomInt(-1, 1))
        this.acceleration = new Vector(0, 0)
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

    applyForce(force: Vector) {
        this.acceleration.add(force)
    }

    flock(birds: Array<Bird>) {
        let sep = this.seperate(birds);   // Separation
        let ali = this.align(birds);      // Alignment
        let coh = this.cohesion(birds);   // Cohesion
        // Arbitrarily weight these forces
        sep.mult(1.5);
        ali.mult(1.0);
        coh.mult(1.0);
        // Add the force vectors to acceleration
        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);
    }

    seek(target: Vector) {
        let desired = Vector.sub(target, this.location)
        desired.normalize()
        desired.mult(this.maxSpeed)

        let steer = Vector.sub(desired, this.velocity);
        steer.limit(this.maxForce);  // Limit to maximum steering force
        return steer;

    }

    // field(field: FlowField) {
    //     this.acceleration = field.lookup(this.location)
    // }

    update() {
        this.velocity.add(this.acceleration)
        this.velocity.limit(this.maxSpeed)
        this.location.add(this.velocity)
        this.acceleration.mult(0)
    }

    //For now
    borders() {
        //TEMP VALUES
        let width = 1400
        let height = 600


        if (this.location.x < -this.scale) this.location.x = width + this.scale;
        if (this.location.y < -this.scale) this.location.y = height + this.scale;
        if (this.location.x > width + this.scale) this.location.x = -this.scale;
        if (this.location.y > height + this.scale) this.location.y = -this.scale;
    }

    seperate(birds: Array<Bird>) {
        let desiredseparation = 25.0
        let steer = new Vector(0, 0)
        let count = 0
        // For every boid in the system, check if it's too close
        for (let i = 0; i < birds.length; i++) {
            let d = Vector.dist(this.location, birds[i].location);
            // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                let diff = Vector.sub(this.location, birds[i].location);
                diff.normalize();
                diff.div(d);        // Weight by distance
                steer.add(diff);
                count++;            // Keep track of how many
            }
        }
        // Average -- divide by how many
        if (count > 0) {
            steer.div(count);
        }

        // As long as the vector is greater than 0
        if (steer.mag() > 0) {
            // Implement Reynolds: Steering = Desired - Velocity
            steer.normalize();
            steer.mult(this.maxSpeed);
            steer.sub(this.velocity);
            steer.limit(this.maxForce);
        }
        return steer;
    }

    align(birds: Array<Bird>) {
        let neighbordist = 50
        let sum = new Vector(0, 0)
        let count = 0
        for (let i = 0; i < birds.length; i++) {
            let d = Vector.dist(this.location, birds[i].location)
            if ((d > 0) && (d < neighbordist)) {
                sum.add(birds[i].velocity)
                count++
            }
        }
        if (count > 0) {
            sum.div(count)
            sum.normalize()
            sum.mult(this.maxSpeed)
            let steer = Vector.sub(sum, this.velocity)
            steer.limit(this.maxForce)
            return steer
        } else {
            return new Vector(0, 0)
        }
    }

    // Cohesion
    // For the average location (i.e. center) of all nearby birds, calculate steering vector towards that location
    cohesion(birds: Array<Bird>) {
        let neighbordist = 50
        let sum = new Vector(0, 0)   // Start with empty vector to accumulate all locations
        let count = 0
        for (let i = 0; i < birds.length; i++) {
            let d = Vector.dist(this.location, birds[i].location);
            if ((d > 0) && (d < neighbordist)) {
                sum.add(birds[i].location); // Add location
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            return this.seek(sum) // Steer towards the location
        } else {
            return new Vector(0, 0)
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