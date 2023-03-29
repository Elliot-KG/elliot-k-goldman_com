import { Bird } from "./bird"

export class Flock{

    flock : Array<Bird>

    constructor(numOfBirds : number){
        this.flock = []
        for(let i = 0; i < numOfBirds + 1; i ++){
            let b = new Bird()
            this.flock.push(b)
        }
    }

    run(context: CanvasRenderingContext2D, width : number, height : number){
        this.flock.forEach((bird : Bird)=>{
            bird.run(context, this.flock, width, height)
        })
    }
}