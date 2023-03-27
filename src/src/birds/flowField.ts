import { Vector } from "p5"
import p5 from "p5"

export class FlowField{
    readonly field : Array<Array<Vector>>
    readonly cols : number
    readonly rows : number

    constructor(cols : number, rows : number){
        this.cols = cols
        this.rows = rows
        this.field = Array(cols).fill(Array(rows).fill(new Vector(0, 0)))

        let xoff = 0
        for (let i = 0; i < cols; i++) {
          let yoff = 0
          for (let j = 0; j < rows; j++) {
            let theta = p5.prototype.map(p5.prototype.noise(xoff,yoff),0,1,0,p5.prototype.TWO_PI);
            //Polar to Cartesian coordinate transformation to get x and y components of the vector
            this.field[i][j] = new Vector(p5.prototype.cos(theta),p5.prototype.sin(theta));
            yoff += 0.1;
          }
          xoff += 0.1;
        }
    }

    lookup(lookup : Vector):Vector{
        //let t = this.field[Math.abs(Math.floor(lookup.x))][Math.floor(lookup.y)]

        let col = Math.floor(p5.prototype.constrain(lookup.x, 0, this.cols-1))
        let row = Math.floor(p5.prototype.constrain(lookup.y, 0, this.rows-1))
        let t = this.field[col][row]
        return t//new Vector(1,1)
    }
}


/*class FlowField {
      void init() {
        float xoff = 0;
        for (int i = 0; i < cols; i++) {
          float yoff = 0;
          for (int j = 0; j < rows; j++) {
    In this example, we use Perlin noise to seed the vectors.
            float theta = map(noise(xoff,yoff),0,1,0,TWO_PI);
    Polar to Cartesian coordinate transformation to get x and y components of the vector
            field[i][j] = new PVector(cos(theta),sin(theta));
            yoff += 0.1;
          }
          xoff += 0.1;
        }
      }
     
    A function to return a PVector based on a location
      PVector lookup(PVector lookup) {
     
        int column = int(constrain(lookup.x/resolution,0,cols-1));
        int row = int(constrain(lookup.y/resolution,0,rows-1));
        return field[column][row].get();
      }
    }*/