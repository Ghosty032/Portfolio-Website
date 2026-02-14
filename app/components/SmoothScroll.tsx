"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const lenisRef = useRef<Lenis | null>(null)

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.5,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            // Keep native scrollbar so webkit scrollbar customization works

            syncTouch: false,
        })

        lenisRef.current = lenis

        // Sync Lenis scroll position with GSAP ScrollTrigger
        lenis.on("scroll", ScrollTrigger.update)

        // Use GSAP ticker to drive Lenis — this keeps them perfectly in sync
        const tickerCallback = (time: number) => {
            lenis.raf(time * 1000)
        }
        gsap.ticker.add(tickerCallback)

        // Disable Lenis's own RAF since GSAP ticker drives it
        gsap.ticker.lagSmoothing(0)

        return () => {
            gsap.ticker.remove(tickerCallback)
            lenis.destroy()
            lenisRef.current = null
        }
    }, [])

    return <>{children}</>
}
