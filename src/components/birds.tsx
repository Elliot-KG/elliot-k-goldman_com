import * as React from "react"
import { Flock } from "../src/birds/flock"
import BirdConstants from "../src/birds/bird_values"

export function Birds() {

    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const containerRef = React.useRef<HTMLDivElement>(null)

    let width = React.useRef<number>(600)
    let height = React.useRef<number>(300)

    React.useEffect(()=>{
      function animate(timestamp : DOMHighResTimeStamp){
            if(context == null) return
            const elapsed = timestamp - timeStart;
            if (elapsed > updateIndex) {
                timeStart = timestamp;
                context.clearRect(0, 0, width.current, height.current)
                
                flock.run(context, width.current, height.current)
              }
              requestAnimationFrame(animate);
        }

      //Flock size depends on screen size otherwise it's scary
      let flock : Flock
      if(width.current < BirdConstants.SMALL_WIDTH){
        flock = new Flock(BirdConstants.SMALL_FLOCK)
      }else if(width.current < BirdConstants.MEDIUM_WIDTH){
        flock = new Flock(BirdConstants.MEDIUM_FLOCK)
      }else{
        flock = new Flock(BirdConstants.LARGE_FLOCK)
      }

      let context : CanvasRenderingContext2D
      let timeStart = 0
      const updateIndex = 10

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
        [width.current, height.current] = [containerRef.current!.offsetWidth, containerRef.current!.offsetHeight]
        canvasRef.current!.width = width.current
        canvasRef.current!.height = height.current
        window.addEventListener("resize", resize, false)
      };
      resize()
      
    }, [width, height])

  return (
    <div className="z-20 absolute w-full h-4/5" ref={containerRef}>
        <canvas className="w-full h-full" ref={canvasRef}/> 
    </div>
  );
}