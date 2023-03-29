import * as React from "react"
import { Skill } from "./skill"
import SkillsJson from "../src/skills/skills.json"
import { SkillDictionaryType } from "../src/skills/skill.interface"
 
export function SkillsBar({highlighted} : {highlighted : Array<string>}) {

  let noneSelected = (highlighted.length == 0)
  const skillsDictionary = SkillsJson as SkillDictionaryType

  return (
    <div className="z-20 inline-block sticky top-1/4 h-0">
        <div className="left-2 relative top-[-100%] flex flex-col">
            { Object.keys(skillsDictionary).map((skillKey : string)=>(
                <Skill key={skillsDictionary[skillKey].name} showText={!noneSelected} skill={skillsDictionary[skillKey]} activated={noneSelected ? true : highlighted.includes(skillKey)} />
              )
            )
            }
        </div>
    </div>
  );
}



