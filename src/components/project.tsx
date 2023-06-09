import * as React from "react"
import Image from 'next/image'
import { nameToImage } from "../src/nameToImage";
import ProjectType from "../src/projects/project.interface";
import { Github } from "./projectIcons/github";
import { Link } from "./projectIcons/link";
import { SoloTeam } from "./projectIcons/soloTeam";
import { Josefin_Sans } from "next/font/google"

const Josefin = Josefin_Sans({subsets:['latin']})

export function Project({project, selected, click, hover} : {project : ProjectType, selected : ProjectType | null, click :(e : React.MouseEvent, project : ProjectType)=>void,   hover: (project : ProjectType, mouseOut : boolean)=>void}){
  
  //Ring only to be shown when project is selected
  let ring = "ring-4 ring-offset-8 ring-white ring-offset-night"

  let github = <></>
  if(project.github){
    github = (
      <span className={`transtion-all delay-200 duration-300 ${(project == selected)? "" : "scale-y-0 opacity-0"}`}>
        <Github link={project.github} />
      </span>
    )
  }
  
  return (
    <div className={`${Josefin.className} select-none inline-block m-10 w-60 rounded-lg ${(selected == project)? ring : ""}`}>
      <div className={`cursor-pointer z-20 rounded-lg h-60 flex justify-center items-center overflow-hidden ${(project.image == "")? "bg-slate-200" : ""}`} onClick={(e)=>{
        e.stopPropagation()
        click(e, project)
      }} onMouseEnter={(()=>hover(project, false))} onMouseOut={(()=>hover(project, true))} >
        <Image className="min-w-full min-h-full object-cover shrink-0" src={project.image != ""? nameToImage(project.image) : ""} alt={project.name} />
      </div>
      {/* Project (normally) hidden info */}
      <div className={`overflow-hidden transition-all duration-400 ease-in-out text-white ${(project == selected)? "" : "opacity-0 h-0"}`}>
        {/* Project info icon bar */}
        <div className={`flex justify-around my-4`}>
            <span className={`transtion-all duration-300 ${(project == selected)? "" : "scale-y-0 opacity-0"}`}>
              <Link link={project.link} />
            </span>

            <span className={`transtion-all delay-100 duration-300 ${(project == selected)? "" : "scale-y-0 opacity-0"}`}>
              <SoloTeam solo={project.solo} />
            </span>

            {github}
        </div>
        <h2 className="text-sm font-bold">{project.name}</h2>
        <h3 className="font-light">{project.description}</h3>
      </div>
    </div>
  );
}