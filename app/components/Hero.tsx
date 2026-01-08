"use client"

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { ScrollTrigger } from 'gsap/all'

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


    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: () => `+=${window.innerHeight * 4}px`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      //on update is a method that is called every time the scroll trigger updates that moves from 0 to 1
      onUpdate: (self) => {
        gsap.set(heroScrollProgressBar, { '--progress': self.progress })

        gsap.set(heroContent, {
          y: -self.progress * heroContainerMoveDistance
        })

        let heroImgProgress;
        if (self.progress <= 0.45) {
          heroImgProgress = ease(self.progress / 0.45) * 0.65
        } else if (self.progress <= 0.75) {
          heroImgProgress = 0.65
        } else {
          heroImgProgress = 0.65 + ease((self.progress - 0.75) / 0.25) * 0.35
        }

        gsap.set(heroImgElement, {
          y: heroImgProgress * heroImgMoveDistance
        })

        let heroMaskScale;
        let heroImgSaturation;
        let heroImgOverlayOpacity;

        if (self.progress <= 0.4) {
          heroMaskScale = 2.5
          heroImgSaturation = 1
          heroImgOverlayOpacity = 0.35
        } else if (self.progress <= 0.5) {
          const phaseProgress = ease((self.progress - 0.4) / 0.1)
          heroMaskScale = 2.5 - phaseProgress * 1.5
          heroImgSaturation = 1 - phaseProgress
          heroImgOverlayOpacity = 0.35 + phaseProgress * 0.35
        } else if (self.progress <= 0.75) {
          heroMaskScale = 1
          heroImgSaturation = 0
          heroImgOverlayOpacity = 0.7
        } else if (self.progress <= 0.85) {
          const phaseProgress = ease((self.progress - 0.75) / 0.1)
          heroMaskScale = 1 + phaseProgress * 1.5
          heroImgSaturation = phaseProgress
          heroImgOverlayOpacity = 0.7 - phaseProgress * 0.35
        } else {
          heroMaskScale = 2.5
          heroImgSaturation = 1
          heroImgOverlayOpacity = 0.35
        }

        gsap.set(heroMask, {
          scale: heroMaskScale
        })

        gsap.set(heroImgElement, {
          filter: `saturate(${heroImgSaturation})`
        })

        gsap.set(heroImgElement, {
          "--overlay-opacity": heroImgOverlayOpacity
        })

        let heroGridOpacity;
        if (self.progress <= 0.475) {
          heroGridOpacity = 0;
        } else if (self.progress <= 0.5) {
          heroGridOpacity = ease((self.progress - 0.475) / 0.025)
        } else if (self.progress <= 0.75) {
          heroGridOpacity = 1
        } else if (self.progress <= 0.775) {
          heroGridOpacity = 1 - ease((self.progress - 0.75) / 0.025)
        } else {
          heroGridOpacity = 0
        }

        gsap.set(heroGridOverlay, {
          opacity: heroGridOpacity
        })

        let marker1Opacity;
        if (self.progress <= 0.5) {
          marker1Opacity = 0
        } else if (self.progress <= 0.525) {
          marker1Opacity = ease((self.progress - 0.5) / 0.025)
        } else if (self.progress <= 0.7) {
          marker1Opacity = 1
        } else if (self.progress <= 0.75) {
          marker1Opacity = 1 - ease((self.progress - 0.7) / 0.05)
        } else {
          marker1Opacity = 0
        }

        gsap.set(marker1, {
          opacity: marker1Opacity
        })

        let marker2Opacity;
        if (self.progress <= 0.55) {
          marker2Opacity = 0
        } else if (self.progress <= 0.575) {
          marker2Opacity = ease((self.progress - 0.55) / 0.025)
        } else if (self.progress <= 0.7) {
          marker2Opacity = 1
        } else if (self.progress <= 0.75) {
          marker2Opacity = 1 - ease((self.progress - 0.7) / 0.05)
        } else {
          marker2Opacity = 0
        }

        gsap.set(marker2, {
          opacity: marker2Opacity
        })
      }

    })

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
            <h1>Location Framework</h1>
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