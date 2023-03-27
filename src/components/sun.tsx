import * as React from "react"


//TODO: The color should rise with the sun


export function Sun() {
    return (
        // Box around sun
        <div className="z-30 w-full h-full animate-sun absolute px-[12%] flex justify-end items-center">
            {/* Sun*/}
            <div className="w-1/4">
                <svg className="relative linecap-round stroke-white stroke-[20px] fill-none origin-center animate-spin-slow" width="100%" viewBox="0 0 1000 1000" >
                    <circle className="fill-pink" cx="500.74" cy="499.12" r="74.5" />
                    <path d="M673.24,564.62c-12-8-39-1-32,24s25,18.02,32,15.51c0,0-38,13.49-12,37.49s59.38-11.01,70.19-38.5" />
                    <path d="M592.24,579.63c0,0,31,19.99,49-6.01" />
                    <path d="M360.8,293.62c0,0,59.16,10.88,20.88,62.55s-5.54,77.88,12.89,82.45" />
                    <path d="M512.24,616.62c0,0,46.36,26.83-1.27,59.14c-47.64,32.32-28.04,64.25-13.95,73.61" />
                    <path d="M744.1,445.52c0,0-0.37,54.11-52.14,28.29c-51.77-25.82-35.72,31.81-71.02,24.34" />
                    <path d="M376.86,504.4c0,0-51.25,14.91-67.61-21.03c-23.64-51.94-71.64-15.65-46.03,6.33" />
                    <path d="M305.45,652.7c0,0,44.42-15.17,61.37-54.9c16.95-39.74-41.48-38.19-30.16,13.06
                        c11.32,51.25,76.65,28.48,88.17-18.82"/>
                    <path d="M504.18,377.67c0,0,8.62-46.14-17.66-80.43s-53.65,17.36-3.45,32.69c50.2,15.33,68.7-46.03,33.17-79.3" />
                    <path d="M591.87,420.62c0,0-6.17-56.48,69.42-42.6c75.59,13.88,27.77-76.98,0-20.36" />
                </svg>
            </div >
        </div>
    );
}