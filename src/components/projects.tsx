import * as React from "react"
import ProjectsJson from "../src/projects/projects.json"
import { Project } from "./project"
import ProjectType from "../src/projects/project.interface"
import { SkillsBar } from "./skillsBar";

export function Projects() {

    const [highlighted, setHighlighted] = React.useState(Array<string>)
    const [selected, setSelected] = React.useState<ProjectType | null>(null)

    function projectHover(project : ProjectType, mouseOut : boolean){
        if(mouseOut && selected !== null) setHighlighted(selected.skills)
        else if(mouseOut) setHighlighted([])
        else setHighlighted(project.skills)
    }

    function projectSelected(event : React.MouseEvent, project : ProjectType){
        setSelected(project)
        setHighlighted(project.skills)
    }

    return (
        <div className="" onClick={()=>{setSelected(null)}}>
            <SkillsBar highlighted={highlighted} />
            <div className="px-16 flex flex-wrap justify-around items-start">
                {ProjectsJson.map((project : ProjectType)=>(
                    <Project key={project.id} project={project} selected={selected} click={projectSelected}  hover={projectHover}/>
                ))}
            </div>
        </div>
  );
}