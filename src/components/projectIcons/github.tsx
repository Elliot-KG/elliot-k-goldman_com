import React from "react";


export function Github({link} : {link : string}) {
  return (
    <a href={link} target="_blank" className="fill-white w-8 flex flex-col justify-center items-center">
        <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <path d="m50.03,17.22c-18.45,0-33.36,15.02-33.36,33.61,0,14.86,9.56,27.43,22.81,31.89,1.66.33,2.26-.72,2.26-1.61,0-.78-.05-3.45-.05-6.23-9.28,2-11.21-4.01-11.21-4.01-1.49-3.9-3.7-4.9-3.7-4.9-3.04-2.06.22-2.06.22-2.06,3.37.22,5.14,3.45,5.14,3.45,2.98,5.12,7.79,3.67,9.72,2.78.28-2.17,1.16-3.67,2.1-4.51-7.4-.78-15.19-3.67-15.19-16.58,0-3.67,1.32-6.68,3.42-9.01-.33-.83-1.49-4.29.33-8.9,0,0,2.82-.89,9.17,3.45,2.72-.74,5.52-1.11,8.34-1.11,2.82,0,5.69.39,8.34,1.11,6.35-4.34,9.17-3.45,9.17-3.45,1.82,4.62.66,8.07.33,8.9,2.15,2.34,3.42,5.34,3.42,9.01,0,12.91-7.79,15.75-15.25,16.58,1.22,1.06,2.26,3.06,2.26,6.23,0,4.51-.05,8.12-.05,9.24,0,.89.61,1.95,2.26,1.61,13.26-4.45,22.81-17.03,22.81-31.89.05-18.59-14.91-33.61-33.31-33.61Z"/>
        </svg> 
        <p className="underline text-xs whitespace-nowrap font-light">Github</p>
    </a>
  );
}