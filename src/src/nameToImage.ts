//SVGS for skills
import adobe from "../images/icons/adobe.svg"
import figma from "../images/icons/figma.svg"
import gatsby from "../images/icons/gatsby.svg"
import javascript from "../images/icons/javascript.svg"
import next from "../images/icons/next.svg"
import python from "../images/icons/python.svg"
import react from "../images/icons/react.svg"
import swift from "../images/icons/swift.svg"
import tailwind from "../images/icons/tailwind.svg"
import three from "../images/icons/three.svg"
import typescript from "../images/icons/typescript.svg"
import ui from "../images/icons/ui.svg"
import vue from "../images/icons/vue.svg"

//Images for projects
import illumitex from "../images/illumitex.gif"
import illumitexMobile from  "../images/illumitex-mobile.gif"
import fizzBuzz from  "../images/FizzBuzz.gif"
import gather from "../images/Gather.gif"
import notifications from "../images/Notifications.gif"
import { StaticImageData } from "next/image"

const svgs : Record<string, string>  = {
    adobe, figma, gatsby, javascript, 
    next, python, react, swift, tailwind, three, 
    typescript, ui, vue
}

const images : Record<string, StaticImageData> = {
    illumitex, illumitexMobile, fizzBuzz, gather, notifications
}

export function nameToSvg(name : string) : string {

    if(name == "") return ""

    if (!svgs.hasOwnProperty(name)){
        throw new Error(`Called for a name that doesn't have an svg: ${name}`);
    }
    return svgs[name]
}

export function nameToImage(name : string) : StaticImageData {

    if (name == "" || !images.hasOwnProperty(name)){
        throw new Error(`Called for a name that doesn't have an image: ${name}`);
    }
    return images[name]
}
