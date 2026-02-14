"use client"
import Image from "next/image";
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useRef, useState, useEffect } from "react"
import { ArrowDown, Clock } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function HeroBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [time, setTime] = useState<string>("")

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const istTime = new Intl.DateTimeFormat("en-IN", {
                timeZone: "Asia/Kolkata",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            }).format(now)
            setTime(istTime)
        }

        updateTime()
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    useGSAP(() => {
        if (!contentRef.current || !containerRef.current) return

        // Fade out hero content as you scroll down
        gsap.to(contentRef.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            },
        })

        // Fade out hero background as well
        gsap.to(containerRef.current, {
            opacity: 0,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
            },
        })
    })

    return (
        <div ref={containerRef} className="h-screen w-full relative overflow-hidden bg-black">
            {/*<Image
                src="/image.png"
                alt="Hero background"
                fill
                className="object-cover"
            />*/}

            <div
                ref={contentRef}
                className="mt-72 flex flex-col items-center justify-end mb-125 text-9xl text-white font-plus-jakarta-sans font-bold ">
                WELCOME
                <span className="pt-12 text-4xl font-chillax">To my Portfolio</span>
            </div>

            {/* Resume Button */}
            <div className="absolute top-8 right-8 z-50">
                <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-chillax font-medium text-lg transition-all duration-300 hover:scale-105 bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 shadow-lg shadow-black/20"
                >
                    <span className="relative z-10">Resume</span>
                </a>
            </div>

            {/* Bottom Left Arrow */}
            <div className="absolute bottom-8 left-8 text-white animate-bounce">
                <ArrowDown className="w-8 h-8" />
            </div>

            {/* Bottom Right Arrow */}
            <div className="absolute bottom-8 right-8 text-white animate-bounce">
                <ArrowDown className="w-8 h-8" />
            </div>

            {/* Gradient Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-600/40 via-emerald-900/40 to-green-950/40 rounded-full blur-[100px] opacity-60 pointer-events-none" />

            {/* Grainy Noise Overlay */}
            <div className="absolute inset-0 opacity-40 pointer-events-none mix-blend-overlay z-[5]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Live Clock */}
            <div className="absolute top-10 left-10 flex flex-col items-start z-10 mix-blend-difference">
                <div className="flex items-center gap-2 text-zinc-400 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="font-chillax text-sm uppercase tracking-widest">Local Time</span>
                </div>
                <div className="font-new-title text-4xl text-white tabular-nums leading-none">
                    {time || "00:00:00 AM"}
                </div>
            </div>
        </div>
    );
}
