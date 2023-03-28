// Taken from:
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

//import { Vector } from "p5"
import * as React from "react"
import Victor from "victor"
import { Flock } from "../src/birds/flock"
import { FlowField } from "../src/birds/flowField"

export function Birds() {

    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)
    let width = 600
    let height = 300
    const updateIndex = 10
    let context : CanvasRenderingContext2D
    let timeStart = 0;
    //TODO: Flock size should depend on screen size
    let flock = new Flock(100)
    let target = new Victor(width, height/2)
    //let field = new FlowField(width, height)

    React.useEffect(()=>{
        if(canvasRef != null){
            const canvas : HTMLCanvasElement = canvasRef.current!
            context = canvas.getContext('2d') as CanvasRenderingContext2D
            if(context == null){
                return
            }
            animate(0)
        }
    }, [canvasRef])

    React.useEffect(()=>{
      const resize = () => {
        if(containerRef == null || containerRef.current == null) return
        [width, height] = [containerRef.current!.offsetWidth, containerRef.current!.offsetHeight]
        canvasRef.current!.width = width
        canvasRef.current!.height = height
        window.addEventListener("resize", resize, false);
        //target = new Vector(width, height/2)
        //field = new FlowField(width, height)
      };
      resize()
      
    })

    function animate(timestamp : DOMHighResTimeStamp){
        if(context == null) return
        const elapsed = timestamp - timeStart;
        if (elapsed > updateIndex) {
            timeStart = timestamp;
            context.clearRect(0, 0, width, height)
            
            flock.run(context)
            // bird.draw(context)
            // bird.update()
            // bird.field(field)
            // bird.seek(target)
          }
          requestAnimationFrame(animate);
    }

  return (
    <div className="z-20 absolute text-white w-full h-" ref={containerRef}>
        <canvas className="w-full h-full" ref={canvasRef}/> 
    </div>
  );
}