import React from "react";
import Image from 'next/image'

//Images
import Backpack from "../images/Backpack.png"
import LDC from "../images/LDC.png"
import LinkedIn from "../images/LinkedIn.png"
import Mail from "../images/Mail.png"

export function Footer() {
    return (
        <footer>
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
        </footer>
    );
}