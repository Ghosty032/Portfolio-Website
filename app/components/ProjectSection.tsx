"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        title: "Twitter Sentiment Analysis",
        description: "Created a tweet sentiment analysis application using Python and use Twitter API to fetch tweets.",
        tech: ["Python", "Twitter API", "Tailwind"],
    },
    {
        title: "Retinal OCT Classification",
        description: "Devloped a Deep learning model using Convolutional Neural Network(CNN) to classify retinal damage using Optical Coherence Tomography(OCT) test scans and hosted it on a web platform using Flask API.",
        tech: ["Python", "TensorFlow", "Keras", "OpenCV", "Flask", "Tailwind"],
    },
    {
        title: "Stock Market Prediction",
        description: "Devolved a model that uses yfinance API for retrieval of historical stock prices (Open, High, Low, Close, Volume) for companies like AAPL, TSLA, etc.",
        tech: ["Python", "TensorFlow", "Keras", "OpenCV"],
    },
    {
        title: "Web Scrapper",
        description: "A web scrapper that uses BeautifulSoup to scrape data from a website and store it in a database for my company (NexEdge Pvt. Ltd) where i interned in summer for 2 months .",
        tech: ["Python", "BeautifulSoup", "Flask",],
    },
]

export default function ProjectSection() {
    const pathRef = useRef<SVGPathElement>(null)
    const sectionRef = useRef<HTMLDivElement>(null)
    const cardsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const path = pathRef.current
        if (!path) return

        const pathLength = path.getTotalLength()

        // Set initial state: path fully hidden
        gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
        })

        // Animate path draw on scroll
        gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 60%",
                end: "bottom 20%",
                scrub: 1.5,
            },
        })

        // Animate cards fading in as they enter viewport
        cardsRef.current.forEach((card, i) => {
            if (!card) return
            gsap.fromTo(
                card,
                {
                    opacity: 0,
                    x: i % 2 === 0 ? 80 : -80,
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "top 50%",
                        scrub: 1,
                    },
                }
            )
        })

        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill())
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            className="relative bg-transparent py-32 overflow-hidden"
        >
            {/* Section title */}
            <h2 className="font-clash text-white text-6xl font-bold text-center mb-32 tracking-tight">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl inline-block">PROJECTS</span>
            </h2>

            {/* Cards + SVG wrapper */}
            <div className="relative max-w-5xl mx-auto px-8">
                {/* SVG Line running through the cards area */}
                <div className="absolute inset-0 flex justify-center pointer-events-none">
                    <svg
                        className="w-full h-full"
                        viewBox="0 0 500 1100"
                        preserveAspectRatio="none"
                        fill="none"
                    >
                        <path
                            ref={pathRef}
                            d="M 183 28 C 412 106 53 214 299 276 C 545 338 -12 446 183 528 C 412 610 53 718 299 780 C 545 842 -12 950 183 1072"
                            stroke="#24d41eff"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* Project cards */}
                <div className="relative z-10 space-y-45">
                    {projects.map((project, i) => (
                        <div
                            key={i}
                            ref={(el) => { cardsRef.current[i] = el }}
                            className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}
                        >
                            <div className="w-full max-w-md group">
                                {/* Card */}
                                <div className="relative border border-white/10 rounded-2xl p-8 bg-white/[0.03] backdrop-blur-sm hover:border-[#2bdace]/40 transition-all duration-500 hover:bg-white/[0.06]">
                                    {/* Project number */}
                                    <span className="font-new-title text-[#2bdace]/30 text-8xl font-bold absolute -top-10 -left-4 select-none group-hover:text-[#2bdace]/50 transition-colors duration-500">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    {/* Title */}
                                    <h3 className="font-clash text-white text-3xl font-bold mb-3 mt-4">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="font-chillax text-white/60 text-base leading-relaxed mb-6">
                                        {project.description}
                                    </p>

                                    {/* Tech stack */}
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((t) => (
                                            <span
                                                key={t}
                                                className="font-chillax text-xs text-[#2bdace] border border-[#2bdace]/30 rounded-full px-3 py-1 uppercase tracking-wider"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Hover glow */}
                                    <div className="absolute inset-0 rounded-2xl bg-[#2bdace]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
