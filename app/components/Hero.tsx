"use client"

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Hero = () => {

  const containerRef = useRef<HTMLDivElement>(null)
  const heroImgRef = useRef<HTMLDivElement>(null)
  const heroImgElementRef = useRef<HTMLImageElement>(null)
  const heroMaskRef = useRef<HTMLDivElement>(null)
  const heroGridOverlayRef = useRef<HTMLDivElement>(null)
  const marker1Ref = useRef<HTMLDivElement>(null)
  const marker2Ref = useRef<HTMLDivElement>(null)
  const heroContentRef = useRef<HTMLDivElement>(null)
  const heroScrollProgressBarRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const heroContent = heroContentRef.current
    const heroScrollProgressBar = heroScrollProgressBarRef.current
    const heroImg = heroImgRef.current
    const heroImgElement = heroImgElementRef.current
    const heroMask = heroMaskRef.current
    const heroGridOverlay = heroGridOverlayRef.current
    const marker1 = marker1Ref.current
    const marker2 = marker2Ref.current

    const heroContentHeight = heroContent?.offsetHeight || 0
    const viewportHeight = window.innerHeight
    const heroContainerMoveDistance = heroContentHeight - viewportHeight

    const heroImgHeight = heroImg?.offsetHeight || 0
    const heroImgMoveDistance = heroImgHeight - viewportHeight

    const ease = (x: number) => x * x * (3 - 2 * x)

  }, { scope: containerRef })

  return (
    <section className="hero w-full h-full" ref={containerRef}>
      <div className='hero-img w-full' ref={heroImgRef}>
        <img src={'/hero.webp'} alt='hero image' className="w-full h-full object-cover" ref={heroImgElementRef} />
      </div>

      {/* hero mask */}
      <div className='hero-mask' ref={heroMaskRef}></div>

      {/* grid */}
      <div className="hero-grid-overlay" ref={heroGridOverlayRef}>
        <img src="/grid.svg" alt="grid" />
      </div>


      {/* map markers */}
      <div className="marker marker-1" ref={marker1Ref}>
        <span className="marker-icon"></span>
        <p className="marker-label">Anchor Field</p>
      </div>

      <div className="marker marker-2" ref={marker2Ref}>
        <span className="marker-icon"></span>
        <p className="marker-label">Drift Field</p>
      </div>

      <div className="hero-content" ref={heroContentRef}>
        <div className="hero-content-block">
          <div className="hero-content-copy">
            <h2>Location Framework</h2>
          </div>
        </div>
        <div className="hero-content-block">
          <div className="hero-content-copy">
            <h2>Coordinate Mapping</h2>
            <p>Key points are indexed within the field. Each location functions as a reference for spatial alignment and transitions logic.</p>
          </div>
        </div>
        <div className="hero-content-block">
          <div className="hero-content-copy">
            <h2>Active Locations</h2>
            <p>Key points are indexed within the field. Each location functions as a reference for spatial alignment and transitions logic.</p>
          </div>
        </div>
        <div className="hero-content-block">
          <div className="hero-content-copy">
            <h2>Spatial Center</h2>
            <p>Key points are indexed within the field. Each location functions as a reference for spatial alignment and transitions logic.</p>
          </div>
        </div>
      </div>

      <div className="hero-scroll-progress-bar" ref={heroScrollProgressBarRef} />

    </section>
  )
}

export default Hero