import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { Projects } from "../components/projects"
import { SkillsBar } from "../components/skillsBar"
import { ThreeDProjects } from "../components/3dProjects"
import { MountainRange } from "../components/mountainRange"
import { Footer } from "../components/footer"

const IndexPage: React.FC<PageProps> = () => (
  <React.StrictMode>
    <main className="font-main font-black bg-night animate-sky w-full h-full">
      <MountainRange />
      <h1 className="px-6 sm:px-20 py-10 text-white text-xl md:text-4xl lg:text-6xl my-14">Hi, I&rsquo;m Elliot—a Developer, Illustrator, and Motion Designer passionate about creating beautiful, human-centered experiences.</h1>
      <Projects />
      <Footer />
    </main>
  </React.StrictMode>
)

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>Elliot K. Goldman</title>
    <meta name="description" content="The portfolio site of Elliot K. Goldman" />
    <link id="icon" rel="icon" href="global-icon" />
  </>
)