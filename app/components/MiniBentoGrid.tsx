"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import { Rocket, Code2 } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const techStack = [
    {
        name: "Next.js",
        span: "col-span-2 row-span-2",
        icon: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
        ),
        glow: true,
    },
    {
        name: "Tailwind",
        span: "col-span-1",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.15 14.5 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.15 9.5 12 7 12z" />
            </svg>
        ),
    },
    {
        name: "GSAP",
        span: "col-span-1",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
    },
    {
        name: "TypeScript",
        span: "col-span-1",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 3h18v18H3V3zm3.5 13h2v-2h-2v2zm0-3h2V8h-2v5zm4 3h5v-2h-3v-1h3v-2h-3V9h3V7h-5v9z" />
            </svg>
        ),
    },
    {
        name: "Framer Motion",
        span: "col-span-2",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 12h10v10l10-10H12V2z" />
            </svg>
        ),
    },
    {
        name: "Antigravity",
        span: "col-span-1",
        icon: <Rocket className="w-6 h-6" />,
    },
    {
        name: "Python",
        span: "col-span-1",
        icon: <Code2 className="w-6 h-6" />,
    },
    {
        name: "TensorFlow",
        span: "col-span-1",
        icon: (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.66 2.05L6.03 5.3l-.22 9.53 5.85 3.38 5.85-3.38-.22-9.53-5.63-3.25zM7.5 13.92l.14-5.83 4.02-2.32v8.13L7.5 13.92zm8.18 5.8l-4.02 2.32V13.9l4.02-2.32-.14 8.13z" />
            </svg>
        ),
    },
]

export default function MiniBentoGrid() {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        // Keep ScrollTrigger for other potential animations, but remove opacity
        // The section is now always visible at full opacity

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === section) t.kill()
            })
        }
    }, [])

    return (<>
        <div className="flex flex-col items-center justify-center text-white text-4xl md:text-6xl mt-20 md:mt-35 font-clash font-semibold px-4">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 px-6 md:px-8 py-3 md:py-4 rounded-2xl text-center">ABOUT ME</span>
        </div>
        <div ref={sectionRef} className="min-h-screen bg-transparent flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-20 py-12 md:pt-12 gap-12 md:gap-16">
            {/* Left: Text Section */}
            <div className="flex flex-col items-start max-w-2xl text-center md:text-left">
                <div className="text-white text-4xl md:text-6xl font-clash mb-4 md:mb-6 w-full">Hey, I'm Sanskaar</div>
                <div className="text-white text-xl md:text-4xl font-chillax leading-relaxed">
                    I like building AI things that don't fall apart in production. RAG pipelines, multimodal agents, LLM apps — that's my zone. Finishing my B.Tech at MAIT this May and actively looking for remote AI/ML opportunities.
                </div>
            </div>

            {/* Right: Tech Stack Section */}
            <div className="w-full max-w-md mt-8 md:mt-0">
                <h2 className="font-clash text-[#E7EAE5] text-2xl md:text-4xl font-bold mb-6 text-center md:text-left">
                    <span className="bg-white/10 backdrop-blur-md border border-white/20 px-4 md:px-6 py-2 md:py-3 rounded-2xl inline-block">Tech Stack</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {techStack.map((tech) => (
                        <motion.div
                            key={tech.name}
                            className={`${tech.span} bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-3 flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer min-h-[80px]`}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {/* Glow effect for Next.js */}
                            {tech.glow && (
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            )}

                            {/* Icon */}
                            <div className="text-zinc-400 group-hover:text-white transition-colors duration-300 mb-2">
                                {tech.icon}
                            </div>

                            {/* Name */}
                            <span className="font-chillax text-zinc-300 text-xs font-medium text-center group-hover:text-white transition-colors duration-300">
                                {tech.name}
                            </span>
                        </motion.div>


                    ))}
                </div>
            </div>
        </div>
    </>
    )
}
