import * as React from "react"
import { Flock } from "../src/birds/flock"

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
          }
          requestAnimationFrame(animate);
    }

  return (
    <div className="z-20 absolute text-white w-full h-" ref={containerRef}>
        <canvas className="w-full h-full" ref={canvasRef}/> 
    </div>
  );
}