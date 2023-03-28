import Head from 'next/head';
import { Projects } from "../components/projects"
import { MountainRange } from "../components/mountainRange"
import { Footer } from "../components/footer"
import { StrictMode } from 'react';

export default function Home() {
  return (
  <StrictMode>
      <Head>
        <title>Elliot K. Goldman</title>
        <meta name="description" content="The portfolio site of Elliot K. Goldman" />
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Head>
      <main className="font-main font-black bg-night animate-sky w-full h-full">
        <MountainRange />
        <h1 className="px-6 sm:px-20 py-10 text-white text-xl md:text-4xl lg:text-6xl my-14">Hi, I&rsquo;m Elliot—a Developer, Illustrator, and Motion Designer passionate about creating beautiful, human-centered experiences.</h1>
        <Projects />
        <Footer />
      </main>
    </StrictMode>
  )
}