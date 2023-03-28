//Adapted from Vector from p5.js


export default class Vector{

    x : number
    y : number

  constructor(x : number, y: number) {
    this.x = x;
    this.y = y;
  }

  copy () {
      return new Vector(this.x, this.y);
  }

  add (x : number | Vector, y? : number | Vector) {
    if (x instanceof Vector) {
      this.x += x.x || 0;
      this.y += x.y || 0;
      return this;
    }else if (Array.isArray(x)) {
      this.x += x[0] || 0;
      this.y += x[1] || 0;
      return this;
    }else{
        this.x += x || 0;
        this.y += y  as number || 0;
        return this;
    }
  }

  sub(x : number | Vector, y? : number | Vector) {
    if (x instanceof Vector) {
      this.x -= x.x || 0;
      this.y -= x.y || 0;
      return this;
    }else if (Array.isArray(x)) {
      this.x -= x[0] || 0;
      this.y -= x[1] || 0;
      return this;
    }else{
        this.x -= x || 0;
        this.y -= y as number || 0;
        return this;
    }
  }

  mult(x : number | Vector, y? : number | Vector) {
    if (x instanceof Vector) {
    // new Vector will check that values are valid upon construction but it's possible
    // that someone could change the value of a component after creation, which is why we still
    // perform this check
      if (
        Number.isFinite(x.x) &&
      Number.isFinite(x.y) &&
      typeof x.x === 'number' &&
      typeof x.y === 'number'
      ) {
        this.x *= x.x;
        this.y *= x.y;
      } else {
        console.warn(
          'Vector.prototype.mult:',
          'x contains components that are either undefined or not finite numbers'
        );
      }
      return this;
    }else if (Array.isArray(x)) {
      if (
        x.every(element => Number.isFinite(element)) &&
      x.every(element => typeof element === 'number')
      ) {
        if (x.length === 1) {
          this.x *= x[0];
          this.y *= x[0];
        } else if (x.length === 2) {
          this.x *= x[0];
          this.y *= x[1];
        } else if (x.length === 3) {
          this.x *= x[0];
          this.y *= x[1];
        }
      } else {
        console.warn(
          'Vector.prototype.mult:',
          'x contains elements that are either undefined or not finite numbers'
        );
      }
      return this;
    }else{
        this.x *= x;
        this.y *= x;
    
        return this;
    }
  }

  
  div(x : number | Vector, y? : number | Vector) {
    if (x instanceof Vector) {
    // new Vector will check that values are valid upon construction but it's possible
    // that someone could change the value of a component after creation, which is why we still
    // perform this check
      if (
        Number.isFinite(x.x) &&
      Number.isFinite(x.y) &&
      typeof x.x === 'number' &&
      typeof x.y === 'number'
      ) {
        if (x.x === 0 || x.y === 0) {
          console.warn('Vector.prototype.div:', 'divide by 0');
          return this;
        }
        this.x /= x.x;
        this.y /= x.y;
      } else {
        console.warn(
          'Vector.prototype.div:',
          'x contains components that are either undefined or not finite numbers'
        );
      }
      return this;
    }else if (Array.isArray(x)) {
      if (
        x.every(element => Number.isFinite(element)) &&
      x.every(element => typeof element === 'number')
      ) {
        if (x.some(element => element === 0)) {
          console.warn('Vector.prototype.div:', 'divide by 0');
          return this;
        }

        if (x.length === 1) {
          this.x /= x[0];
          this.y /= x[0];
        } else if (x.length === 2) {
          this.x /= x[0];
          this.y /= x[1];
        } else if (x.length === 3) {
          this.x /= x[0];
          this.y /= x[1];
        }
      } else {
        console.warn(
          'Vector.prototype.div:',
          'x contains components that are either undefined or not finite numbers'
        );
      }

      return this;
    }else{
        this.x /= x;
        this.y /= x;
        return this;
    }
  }

  mag() {
    return Math.sqrt(this.magSq());
  }

  magSq() {
    const x = this.x;
    const y = this.y;
    return x * x + y * y;
  }

  dot(x : number | Vector, y : number | Vector) : any {
    if (x instanceof Vector) {
      return this.dot(x.x, x.y);
    }
    return this.x * (x || 0) + this.y * (y as number || 0);
  }

  dist(v : Vector) {
    return v
      .copy()
      .sub(this)
      .mag();
  }


  normalize() {
    const len = this.mag();
    // here we multiply by the reciprocal instead of calling 'div()'
    // since div duplicates this zero check.
    if (len !== 0) this.mult(1 / len);
    return this;
  }

  limit(max : number) {
    const mSq = this.magSq();
    if (mSq > max * max) {
      this.div(Math.sqrt(mSq)) //normalize it
        .mult(max);
    }
    return this;
  }

  
  setMag(n : number) {
    return this.normalize().mult(n);
  }


  heading() {
    const h = Math.atan2(this.y, this.x);
    return h;
  }

  setHeading(a : number) {
    let m = this.mag();
    this.x = m * Math.cos(a);
    this.y = m * Math.sin(a);
    return this;
  }

  
  rotate(a : number) {
    let newHeading = this.heading() + a;
    const mag = this.mag();
    this.x = Math.cos(newHeading) * mag;
    this.y = Math.sin(newHeading) * mag;
    return this;
  }

  equals(x : number | Vector, y : number | Vector) {
    let a, b, c;
    if (x instanceof Vector) {
      a = x.x || 0;
      b = x.y || 0;
    } else if (Array.isArray(x)) {
      a = x[0] || 0;
      b = x[1] || 0;
      c = x[2] || 0;
    } else {
      a = x || 0;
      b = y || 0;
    }
    return this.x === a && this.y === b;
  }

  static sub(v1 : Vector, v2: Vector) {
    let target = v1.copy();
    target.sub(v2);
    return target;
  }

  static dist(v1 : Vector, v2 : Vector) {
    return v1.dist(v2);
  }
}