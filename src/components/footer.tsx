import React from "react";
import Image from 'next/image'

//Images
import Backpack from "../images/Backpack.png"
import LDC from "../images/LDC.png"
import LinkedIn from "../images/LinkedIn.png"
import Mail from "../images/Mail.png"

export function Footer() {
    return (
        <footer className="mt-20">
            <div className="flex justify-center items-center">
                <div className="relative">
                    <a className="invisible sm:visible absolute w-[100px] right-[92px] top-[228px] hover:shimmer" href="https://littledetailsclub.com/" target="_blank">
                        <Image src={LDC} alt="Little Details Club" />
                    </a>
                    <a className="invisible sm:visible absolute w-[90px] left-[122px] top-[232px] hover:shimmer" href="https://www.linkedin.com/in/elliot-k-goldman/" target="_blank">
                        <Image src={LinkedIn} alt="LinkedIn" />
                    </a>
                    <a className="invisible sm:visible absolute w-[120px] bottom-[35px] left-[168px] hover:shimmer" href="mailto:ElliotKGoldman@gmail.com" target="_blank">
                        <Image src={Mail} alt="Mail" />
                    </a>
                    <Image className="max-h-[500px] w-auto h-auto" src={Backpack} alt="Contact" />
                </div>
            </div>
            <div className="visible sm:hidden flex justify-around items-center p-14">
                <a className="w-30 hover:shimmer" href="https://littledetailsclub.com/" target="_blank">
                    <Image src={LDC} alt="Little Details Club" />
                </a>
                <a className="w-30 hover:shimmer" href="https://www.linkedin.com/in/elliot-k-goldman/" target="_blank">
                    <Image src={LinkedIn} alt="LinkedIn" />
                </a>
                <a className="w-30 hover:shimmer" href="mailto:ElliotKGoldman@gmail.com" target="_blank">
                    <Image src={Mail} alt="Mail" />
                </a>

            </div>
            <div className="hover:text-slate-300 text-white text-sm flex flex-row justify-end p-2">
                <a className="flex flex-row" href="http://www.recurse.com" title="Made with love at the Recurse Center">
                    <span className="pr-1">Made with </span>
                    <i><svg className="w-5 h-5 fill-red-600" viewBox="0 0 511.626 511.627">
                            <path d="M475.366,71.951c-24.175-23.606-57.575-35.404-100.215-35.404c-11.8,0-23.843,2.046-36.117,6.136 c-12.279,4.093-23.702,9.615-34.256,16.562c-10.568,6.945-19.65,13.467-27.269,19.556c-7.61,6.091-14.845,12.564-21.696,19.414 c-6.854-6.85-14.087-13.323-21.698-19.414c-7.616-6.089-16.702-12.607-27.268-19.556c-10.564-6.95-21.985-12.468-34.261-16.562 c-12.275-4.089-24.316-6.136-36.116-6.136c-42.637,0-76.039,11.801-100.211,35.404C12.087,95.552,0,128.288,0,170.162 c0,12.753,2.24,25.889,6.711,39.398c4.471,13.514,9.566,25.031,15.275,34.546c5.708,9.514,12.181,18.796,19.414,27.837 c7.233,9.042,12.519,15.27,15.846,18.699c3.33,3.422,5.948,5.899,7.851,7.419L243.25,469.937c3.427,3.429,7.614,5.144,12.562,5.144 s9.138-1.715,12.563-5.137l177.87-171.307c43.588-43.583,65.38-86.41,65.38-128.475C511.626,128.288,499.537,95.552,475.366,71.951 z" />
                        </svg>
                    </i>
                    <span className="pl-1"> at the </span>
                    <span className="pl-1 text-green-600">Recurse Center</span>
                </a>
            </div>
        </footer>
    );
}