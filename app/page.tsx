"use client"

import { ReactLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Hero from './components/Hero'
import WhoWeAre from './components/WhoWeAre'

gsap.registerPlugin(ScrollTrigger)

const page = () => {
  return (
    <>
      <ReactLenis />
      <main>
        <Hero />
        <WhoWeAre />
      </main>
    </>
  )
}

export default page