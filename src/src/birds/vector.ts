
export default class Vector{
    x : number
    y : number

    constructor(x : number, y : number){
        this.x = x
        this.y = y
    }

    //Modifying
    add(vec2 : Vector){
        this.x += vec2.x
        this.y += vec2.y
        return this
    }

    //Modifying
    sub(vec2 : Vector){
        this.x -= vec2.x
	    this.y -= vec2.y
        return this
    }

    //Modifying
    mult(num : number){
        this.x *= num
	    this.y *= num
        return this
    }

    normalize() {
        var length = this.length();
    
        if (length === 0) {
            this.x = 1;
            this.y = 0;
        } else {
            this.divide(Victor(length, length));
        }
        return this;
    };
}