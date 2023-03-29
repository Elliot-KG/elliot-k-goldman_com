import React from "react";


export function SoloTeam({ solo }: { solo: boolean }) {
    let svg
    if (solo) {
        svg = (
            <div className="flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    <circle cx="50" cy="32" r="12" />
                    <path d="m62,80h-24v-25.03c0-3.3,2.67-5.97,5.97-5.97h12.07c3.3,0,5.97,2.67,5.97,5.97v25.03Z" />
                </svg>
                <p className="text-xs font-light">Solo</p>
            </div>
        )
    } else {
        svg=(
            <div className="flex flex-col justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                    {/* First person */}
                    <circle cx="33.25" cy="32" r="12"/>
                    <path  d="m21.25,80h24s0-23.9,0-23.9c0-3.92-3.18-7.1-7.1-7.1h-10.94c-3.3,0-5.97,2.67-5.97,5.97v25.03Z"/>
                    {/* Second person */}
                    <path className="fill-gray-200" d="m48.5,54.97c0-1.43-.38-2.76-1.04-3.92-.52-.91.08-2.05,1.13-2.05h7.44c3.3,0,5.97,2.67,5.97,5.97v25.03h-13.5v-25.03Z"/>
                    <path className="fill-gray-200" d="m48.5,32c0-4.09-1.78-7.77-4.58-10.33,1.79-1.05,3.86-1.67,6.08-1.67,6.63,0,12,5.37,12,12s-5.37,12-12,12c-2.22,0-4.3-.62-6.08-1.67,2.81-2.56,4.58-6.24,4.58-10.33Z"/>
                    {/* Third person */}
                    <path className="fill-gray-300" d="m65.25,54.97c0-1.43-.38-2.76-1.04-3.92-.52-.91.08-2.05,1.13-2.05h7.44c3.3,0,5.97,2.67,5.97,5.97v25.03h-13.5v-25.03Z"/>
                    <path className="fill-gray-300" d="m65.25,32c0-4.09-1.78-7.77-4.58-10.33,1.79-1.05,3.86-1.67,6.08-1.67,6.63,0,12,5.37,12,12s-5.37,12-12,12c-2.22,0-4.3-.62-6.08-1.67,2.81-2.56,4.58-6.24,4.58-10.33Z"/>
                </svg>
                <p className="text-xs font-light">Team</p>
            </div>
        )
    }
    return(
        <div className="fill-white w-8">
            {svg}
        </div>
    )

}