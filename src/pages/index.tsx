import Head from 'next/head';
import { Projects } from "../components/projects"
import { MountainRange } from "../components/mountainRange"
import { Footer } from "../components/footer"
import { StrictMode } from 'react';
import { Josefin_Sans } from "next/font/google"

const Josefin = Josefin_Sans({subsets:['latin']})

//TODO: Weird issue on mobile with white bar

export default function Home() {
  return (
  <StrictMode>
      <Head>
        <title>Elliot K. Goldman</title>
        <meta name="description" content="The portfolio site of Elliot K. Goldman" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="image" property="og:image" content="./ElliotKGoldman.png"></meta>
        <meta name="author" content="Elliot K. Goldman"></meta>
        <meta property="og:description" content="The portfolio site of Elliot K. Goldman" />
        <meta property="og:type" content="website" />
      </Head>
      <main className="font-main font-black bg-night animate-sky w-full h-full">
        <MountainRange />
        <h1 className={`${Josefin.className} px-6 sm:px-20 py-10 font-bold text-white text-xl md:text-4xl lg:text-6xl my-14`}>Hi, I&rsquo;m Elliot—a Developer, Illustrator, and Motion Designer passionate about creating beautiful, human-centered experiences.</h1>
        <Projects />
        <Footer />
      </main>
    </StrictMode>
  )
}