import * as React from "react"
import Image from 'next/image'
import { SkillType } from "../src/skills/skill.interface"
import nameToImage from "../src/nameToImage";

export function Skill({ showText, activated, skill }: { showText: boolean, activated: boolean, skill: SkillType }) {

  const [hovering, setHovering] = React.useState(false)

  return (
    <div className="flex">
      <div onMouseEnter={() => { setHovering(true) }} onMouseOut={() => { setHovering(false) }} className={`${(activated ? "" : "saturate-0")} w-8 h-8 rounded-md flex justify-center`}>
        <Image src={nameToImage(skill.image)} alt={skill.name} />
      </div>
      <div className={`bg-night rounded-full flex justify-center items-center px-2 invisible sm:visible text-sm text-white ml-2 transition-opacity ease-in-out duration-400 ${((showText && activated) || hovering) ? "opacity-100" : "opacity-0"}`}>
        {skill.name}

        {/* <svg className="stroke-white" xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" x="0px" y="0px" viewBox="0 0 75 75">
          <path id="curve" d="M0.5,27.5c39.6,0,75.9,18,99.4,46.2" />
          <text className="text-xl">
            <textPath href="#curve">
              {skill.name}
            </textPath>
          </text>
        </svg> */}

      </div>
    </div>
  );
}